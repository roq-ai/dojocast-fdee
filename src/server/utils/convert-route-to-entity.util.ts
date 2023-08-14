const mapping: Record<string, string> = {
  'audio-files': 'audio_file',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
