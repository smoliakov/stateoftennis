'use client';

import Link from 'next/link';

import { Tournament } from '@/app/data/tournaments';
import { downloadSVG, formatDateRange, isOngoing } from '@/app/utils';

import TennisCourtIcon from './TennisCourtIcon';

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const {
    location,
    startDate,
    endDate,
    name,
    tour,
    points,
    slug,
  } = tournament;

  const tourString = tour.join(' & ');

  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateString = formatDateRange(start, end);

  // const link = links.atp || links.wta || 'https://www.atptour.com/en/tournaments';
  const link = `/tournaments/${slug}`;
  const isOngoingTournament = isOngoing(startDate, endDate);

  return (
    <Link href={link}>
      <div className="relative group p-8 pb-7 hover:bg-zinc-50 dark:hover:bg-white/10">
        {isOngoingTournament && (
          <div className="absolute top-2 left-2 flex items-center rounded-lg bg-emerald-100 px-[6px] py-[1px] pl-[4px] text-[10px] font-bold text-emerald-600 uppercase">
            {/* Ripple Container */}
            <div className="relative mr-1 h-[8px] w-[8px]">
              {/* Pulsing Ring */}
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              {/* Static Dot */}
              <span className="relative top-[2px] mx-auto block h-[4px] w-[4px] rounded-full bg-emerald-700"></span>
            </div>
            Live
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 h-auto w-24">
            <TennisCourtIcon
              className="h-full w-full"
              tournament={tournament}
            />
            {/* Download button visible only on hover */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                downloadSVG(tournament);
              }}
              aria-label="Download tennis court icon SVG"
              className="absolute top-0 right-0 flex cursor-pointer items-center p-1 text-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Download SVG"
            >
              {/* Simple download icon SVG */}
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-1">Download SVG</span>
            </button>
          </div>
          <h3 className="text-center text-xl font-semibold text-zinc-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-zinc-500">
            {location.city}, {location.country}
          </p>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            {tourString} {points > 0 && points} • {dateString}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
