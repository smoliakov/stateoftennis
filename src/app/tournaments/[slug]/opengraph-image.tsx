import { ImageResponse } from 'next/og';
import { tournaments } from '@/app/data/tournaments';
import TennisCourtIcon from '@/app/components/TennisCourtIcon';

// Image metadata
export const size = {
  width: 500,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const tournament = tournaments.find(t => t.slug === params.slug);

  if (!tournament) {
    return new Response('Tournament not found', { status: 404 });
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <TennisCourtIcon tournament={tournament} />
    ),
  );
}