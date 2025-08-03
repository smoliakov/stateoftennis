import { MetadataRoute } from 'next';

import { tournaments } from '@/app/data/tournaments';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stateoftennis.vercel.app';

  const tournamentPages = tournaments.map((t) => ({
    url: `${baseUrl}/tournaments/${t.slug || ''}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    ...tournamentPages,
  ];
}
