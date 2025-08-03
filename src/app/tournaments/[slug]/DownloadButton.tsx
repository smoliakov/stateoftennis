'use client';

import { Tournament } from '@/app/data/tournaments';
import { downloadSVG } from '@/app/utils';

const DownloadButton = ({
  tournament,
  className = '',
}: {
  tournament: Tournament;
  className?: string;
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        downloadSVG(tournament);
      }}
      aria-label="Download tennis court icon SVG"
      className={`ml-auto flex cursor-pointer items-center p-1 text-base font-medium hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 ${className}`}
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
  );
};

export default DownloadButton;
