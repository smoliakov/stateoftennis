import { Metadata } from 'next';

import OngoingTournaments from '@/app/components/OngoingTournaments';
import { tournaments } from '@/app/data/tournaments';

import ThemeToggle from './components/ThemeToggle';
import TournamentCard from './components/TournamentCard';

export const metadata: Metadata = {
  title: 'The Global State of Tennis 2025 — Iconic Tournament Courts',
  description:
    "Explore the world's most prestigious tennis tournament courts with detailed insights, stunning visuals, and real-time updates. Discover ATP, WTA, and ongoing tennis events globally on our sleek, fast, and SEO-optimized platform.",
  keywords:
    'tennis tournaments, ATP, WTA, tennis courts, tennis events, tennis tournament schedule, tennis venues, Grand Slam, tennis news, tennis rankings, tennis aggregator',
  openGraph: {
    title: 'The Global State of Tennis 2025',
    description:
      'Dive into the most iconic tennis courts and tournaments worldwide. Stay updated with ATP, WTA, and ongoing tennis events.',
    url: 'https://stateoftennis.vercel.app',
    siteName: 'Global Tennis Arena',
    // images: [
    //   {
    //     url: 'https://yourwebsite.com/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Global Tennis Tournament Courts',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Global State of Tennis 2025',
    description:
      'Explore iconic tennis courts and tournaments with real-time updates and insights.',
    // images: ['https://yourwebsite.com/og-image.jpg'],
    creator: '@YourTwitterHandle',
  },
  verification: {
    google: 'eNOI_1X8M9l5e8ogdABW4Qzg48inln19BdJyxfh',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

const LandingPage: React.FC = () => {
  const sortedTournaments = [...tournaments].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="min-h-screen bg-white text-neutral-800 dark:bg-black dark:text-neutral-200">
      <div className="relative mx-auto max-w-7xl p-4 sm:p-8">
        <ThemeToggle />

        <header className="py-12 text-center md:py-20">
          <h1 className="bg-gradient-to-b from-black to-neutral-600 bg-clip-text text-4xl leading-tight font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl dark:from-white dark:to-neutral-400">
            The Global State of Tennis 2025
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            A tribute to the iconic courts of the world&apos;s most prestigious
            tennis tournaments.
          </p>
        </header>

        <main>
          <OngoingTournaments tournaments={sortedTournaments} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedTournaments.map((tournament) => (
              <TournamentCard
                key={tournament.name + tournament.startDate}
                tournament={tournament}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
