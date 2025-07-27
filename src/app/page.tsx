import { Metadata } from 'next';

import ThemeToggle from './components/ThemeToggle';
import TournamentCard from './components/TournamentCard';
import { tournaments } from '@/app/data/tournaments';
import { getOngoingTournaments } from '@/app/utils';

// SEO Metadata export for Next.js 15+
export const metadata: Metadata = {
  title: 'The Global State of Tennis 2025 — Iconic Tournament Courts',
  description:
    'Explore the world\'s most prestigious tennis tournament courts with detailed insights, stunning visuals, and real-time updates. Discover ATP, WTA, and ongoing tennis events globally on our sleek, fast, and SEO-optimized platform.',
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
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-neutral-800 dark:text-neutral-200 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-8 relative">
        <ThemeToggle />

        <header className="text-center py-12 md:py-20">
          <h1
            className="leading-tight text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-neutral-600 dark:from-white dark:to-neutral-400"
          >
            The Global State of Tennis 2025
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A tribute to the iconic courts of the world&apos;s most prestigious tennis tournaments.
          </p>
        </header>

        <main>
          <h2 className="text-xl md:text-3xl font-bold mb-10 md:mb-16">Ongoing Tournaments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getOngoingTournaments(tournaments).map((tournament) => (
              <div key={tournament.name + tournament.startDate}>
                <TournamentCard tournament={tournament} />
              </div>
            ))}
          </div>

          <hr className="text-zinc-100 my-10 " />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.name + tournament.startDate} tournament={tournament} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
