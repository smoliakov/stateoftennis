'use client';

import TennisCourtIcon from './TennisCourtIcon';
import Link from 'next/link';
import { downloadSVG, formatDateRange } from '@/app/utils';
import { Tournament } from '@/app/data/tournaments';

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const {
    location,
    startDate,
    endDate,
    name,
    tour,
    points,
    court: { innerColor, outerColor, surfaceText },
    links,
  } = tournament;

  const tourString = tour.join(' & ');

  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateString = formatDateRange(start, end);

  const link = links.atp ? links.atp : 'https://www.atptour.com/en/tournaments';

  return (
    <Link href={link} target={'_blank'} rel="noreferrer noopener">
      <div className="relative group p-8 hover:bg-zinc-50 dark:hover:bg-white/10">
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-auto mb-4">
            <TennisCourtIcon
              innerColor={innerColor}
              outerColor={outerColor}
              text={surfaceText}
              className="w-full h-full"
            />
            {/* Download button visible only on hover */}
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                downloadSVG(tournament);
              }}
              aria-label="Download tennis court icon SVG"
              className="absolute text-sm cursor-pointer flex items-center top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Download SVG"
            >
              {/* Simple download icon SVG */}
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#000000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="ml-1">Download SVG</span>
            </button>
          </div>
          <h3 className="text-xl font-semibold text-center text-zinc-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-zinc-500">{location.city}, {location.country}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {tourString} {points > 0 && points} • {dateString}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
