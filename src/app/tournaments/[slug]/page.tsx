import { notFound } from 'next/navigation';
import { tournaments } from '@/app/data/tournaments';
import TennisCourtIcon from '@/app/components/TennisCourtIcon';
import DownloadButton from '@/app/tournaments/[slug]/DownloadButton';
import { formatDateRange } from '@/app/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const tournament = tournaments.find((t) => t.slug === p.slug);

  if (!tournament) {
    return {
      title: 'Tournament Not Found',
    };
  }

  const title = `${tournament.name} — Free Tennis Court SVG Download`;
  const description = `Download a high-quality SVG of the ${tournament.name} tennis court. Perfect for presentations, graphics, and tennis projects. 100% free.`;
  const pageUrl = `https://stateoftennis.vercel.app/tournaments/${tournament.slug}`;

  return {
    title,
    description,
    keywords: [
      'tennis court svg',
      'free svg download',
      `${tournament.name} svg`,
      `${tournament.location.city} tennis court`,
      `${tournament.court.surface} surface svg`,
      'tournament court vector',
      'free tennis graphics',
    ],
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Tennis Court SVGs',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL('https://stateoftennis.vercel.app'),
  };
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const tournament = tournaments.find((t) => t.slug === p.slug);

  if (!tournament) {
    return notFound();
  }

  const start = new Date(tournament.startDate);
  const end = new Date(tournament.endDate);
  const dateString = formatDateRange(start, end);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/">
        <header className="mb-8 flex h-[60px] items-center justify-center text-xl font-bold">
          The Global State of Tennis 2025
        </header>
      </Link>
      <h1 className="mb-10 text-3xl font-bold">{tournament.name}</h1>
      <p className="flex items-center text-gray-600">
        {tournament.location.city}, {dateString}
        <DownloadButton tournament={tournament} />
      </p>
      <section className="my-6">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {/* Left: SVG */}
          <div className="col-span-2">
            <TennisCourtIcon tournament={tournament} />
          </div>

          {/* Right: Info */}
          <div>
            <p className="mb-4 text-gray-600">
              <strong>Location:</strong> {tournament.location.city},{' '}
              {tournament.location.country}
            </p>
            <p className="mb-4 text-gray-600">
              <strong>Dates:</strong> {dateString}
            </p>
            <p className="mb-4 text-gray-600">
              <strong>Surface:</strong> {tournament.court.surface}
            </p>
            <p className="mb-4 text-gray-600">
              <strong>Points:</strong> {tournament.points}
            </p>
            {tournament.links.atp && (
              <a
                href={
                  tournament.links.atp ||
                  tournament.links.wta ||
                  tournament.links.officialSite
                }
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Website
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
