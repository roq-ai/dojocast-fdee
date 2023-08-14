import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { audioFileValidationSchema } from 'validationSchema/audio-files';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.audio_file
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAudioFileById();
    case 'PUT':
      return updateAudioFileById();
    case 'DELETE':
      return deleteAudioFileById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAudioFileById() {
    const data = await prisma.audio_file.findFirst(convertQueryToPrismaUtil(req.query, 'audio_file'));
    return res.status(200).json(data);
  }

  async function updateAudioFileById() {
    await audioFileValidationSchema.validate(req.body);
    const data = await prisma.audio_file.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteAudioFileById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.audio_file.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
