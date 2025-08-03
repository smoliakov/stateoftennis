import { Tournament } from '@/app/data/tournaments';

export const generateSVGString = ({
  court: { outerColor, innerColor, surfaceText },
}: Tournament) => {
  return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 380" aria-label="Tennis Court">
        <metadata>
          Source: https://stateoftennis.vercel.app
          License: © State of Tennis
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
          <line x1="90" y1="0" x2="90" y2="6" />
          <line x1="90" y1="274" x2="90" y2="280" />
        </g>
        ${
          surfaceText
            ? `<text
                  x="140"
                  y="362"
                  text-anchor="middle"
                  fill="#ffffff"
                  font-size="16"
                  font-family="sans-serif"
                  font-weight="bold">
                    ${surfaceText.toUpperCase()}
               </text>`
            : ''
        }
      </svg>
    `.trim();
};

export const downloadSVG = (tournament: Tournament) => {
  const svgContent = generateSVGString(tournament);
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${tournament.name.replace(/\s+/g, '_').toLowerCase()}_tennis_court.svg`;
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function formatDateRange(startDate: Date, endDate: Date): string {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  // Same month and year: "Mar 1–13"
  if (startMonth === endMonth && startYear === endYear) {
    return `${monthNames[startMonth]} ${startDay}–${endDay}`;
  }

  // Same year, different months: "Mar 28–Apr 3"
  if (startYear === endYear) {
    return `${monthNames[startMonth]} ${startDay}–${monthNames[endMonth]} ${endDay}`;
  }

  // Different years: "Dec 30, 2025–Jan 2, 2026"
  return `${monthNames[startMonth]} ${startDay}, ${startYear}–${monthNames[endMonth]} ${endDay}, ${endYear}`;
}

export function getOngoingTournaments(
  tournaments: Tournament[],
  currentDate: string = new Date().toISOString().split('T')[0]
): Tournament[] {
  return tournaments.filter((tournament) => {
    return (
      tournament.startDate <= currentDate && tournament.endDate >= currentDate
    );
  });
}

export const isOngoing = (startDate: string, endDate: string): boolean => {
  const now = new Date();

  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T23:59:59');

  return start <= now && end >= now;
};
