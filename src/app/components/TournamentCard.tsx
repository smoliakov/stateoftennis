'use client';

import TennisCourtIcon from './TennisCourtIcon';
import { Tournament } from '@/app/tournaments';
import Link from 'next/link';

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {
  const { name, tour, innerColor, outerColor, text } = tournament;

  // Function to generate SVG string (matching TennisCourtIcon output)
  const generateSVGString = () => {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 400" aria-label="Tennis Court">
        <metadata>
          Created by TennisCourtIcon component
          Source: https://tennis.com
          License: © Tennis.com
        </metadata>
        <rect width="280" height="380" fill="${outerColor}" />
        <rect x="50" y="50" width="180" height="280" fill="${innerColor}" />
        <g fill="none" stroke="#FFFFFF" stroke-width="5" transform="translate(50, 50)">
          <rect x="0" y="0" width="180" height="280" />
          <line x1="25" y1="0" x2="25" y2="280" />
          <line x1="155" y1="0" x2="155" y2="280" />
          <line x1="0" y1="140" x2="180" y2="140" />
          <line x1="25" y1="60" x2="155" y2="60" />
          <line x1="25" y1="220" x2="155" y2="220" />
          <line x1="90" y1="60" x2="90" y2="220" />
        </g>
        ${
      text
        ? `<text
                x="140"
                y="362"
                text-anchor="middle"
                fill="#ffffff"
                font-size="16"
                font-family="sans-serif"
                font-weight="bold">${text}</text>`
        : ''
    }
      </svg>
    `.trim();
  };

  // Handler to download SVG file
  const downloadSVG = () => {
    const svgContent = generateSVGString();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/\s+/g, '_').toLowerCase()}_tennis_court.svg`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Link href={`https://www.atptour.com${tournament.link}`} target={'_blank'} rel={'noreferrer'}>
      <div className="relative group p-8 hover:bg-zinc-50 dark:hover:bg-white/10">
        <div className="flex flex-col items-center justify-center">
          <div className="w-24 h-auto mb-4">
            <TennisCourtIcon
              innerColor={innerColor}
              outerColor={outerColor}
              text={text}
              className="w-full h-full"
            />
            {/* Download button visible only on hover */}
            <button
              type="button"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                downloadSVG();
              }}
              aria-label="Download tennis court icon SVG"
              className="absolute top-1 right-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Download SVG"
            >
              {/* Simple download icon SVG */}
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#000000" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <h3 className="text-xl font-semibold text-center text-neutral-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{tour}</p>
        </div>
      </div>
    </Link>
  );
};

export default TournamentCard;
