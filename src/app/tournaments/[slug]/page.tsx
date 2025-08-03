import { notFound } from 'next/navigation';
import { tournaments } from '@/app/data/tournaments';
import TennisCourtIcon from '@/app/components/TennisCourtIcon';
import DownloadButton from '@/app/tournaments/[slug]/DownloadButton';
import { formatDateRange } from '@/app/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const tournament = tournaments.find(t => t.slug === p.slug);

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

export default async function TournamentPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const tournament = tournaments.find(t => t.slug === p.slug);

  if (!tournament) {
    return notFound();
  }

  const start = new Date(tournament.startDate);
  const end = new Date(tournament.endDate);
  const dateString = formatDateRange(start, end);

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <Link href="/">
        <header className="h-[60px] text-xl font-bold flex items-center justify-center mb-8">
          The Global State of Tennis 2025
        </header>
      </Link>
      <h1 className="text-3xl  font-bold mb-10">{tournament.name}</h1>
      <p className="text-gray-600 flex items-center">{tournament.location.city}, {dateString}<DownloadButton tournament={tournament} /></p>
      <section className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left: SVG */}
          <div className="col-span-2">
            <TennisCourtIcon tournament={tournament} />
          </div>

          {/* Right: Info */}
          <div>
            <p className="text-gray-600 mb-4">
              <strong>Location:</strong> {tournament.location.city}, {tournament.location.country}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Dates:</strong> {dateString}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Surface:</strong> {tournament.court.surface}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Points:</strong> {tournament.points}
            </p>
            {tournament.links.atp && (
              <a
                href={tournament.links.atp || tournament.links.wta || tournament.links.officialSite}
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
