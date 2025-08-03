import { Tournament } from '@/app/data/tournaments';

interface IconProps {
  className?: string;
}

interface TennisCourtIconProps extends IconProps {
  tournament: Tournament;
}

const TennisCourtIcon: React.FC<TennisCourtIconProps> = ({
  className,
  tournament: {
    court: { innerColor, outerColor, surfaceText },
    location: { city },
  },
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 280 380"
    aria-label="Tennis Court"
    className={className}
  >
    <rect width="280" height="380" fill={outerColor} />
    <rect x="50" y="50" width="180" height="280" fill={innerColor} />
    <g
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="5"
      transform="translate(50, 50)"
    >
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
    {(surfaceText || city) && (
      <text
        x="140"
        y="362"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="16"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        {(surfaceText || city).toUpperCase()}
      </text>
    )}
  </svg>
);

export default TennisCourtIcon;
