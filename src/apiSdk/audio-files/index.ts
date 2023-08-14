import axios from 'axios';
import queryString from 'query-string';
import { AudioFileInterface, AudioFileGetQueryInterface } from 'interfaces/audio-file';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAudioFiles = async (
  query?: AudioFileGetQueryInterface,
): Promise<PaginatedInterface<AudioFileInterface>> => {
  const response = await axios.get('/api/audio-files', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAudioFile = async (audioFile: AudioFileInterface) => {
  const response = await axios.post('/api/audio-files', audioFile);
  return response.data;
};

export const updateAudioFileById = async (id: string, audioFile: AudioFileInterface) => {
  const response = await axios.put(`/api/audio-files/${id}`, audioFile);
  return response.data;
};

export const getAudioFileById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/audio-files/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAudioFileById = async (id: string) => {
  const response = await axios.delete(`/api/audio-files/${id}`);
  return response.data;
};
