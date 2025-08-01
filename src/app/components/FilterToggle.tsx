// components/FilterToggle.tsx
import React from 'react';

export type FilterType = 'ongoing' | 'wta' | 'atp';

interface FilterToggleProps {
  activeFilters: FilterType[];
  onToggle: (filter: FilterType) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'WTA', value: 'wta' },
  { label: 'ATP', value: 'atp' },
];

const FilterToggle: React.FC<FilterToggleProps> = ({
  activeFilters,
  onToggle,
}) => {
  return (
    <div className="mb-6 flex flex-wrap justify-center gap-2">
      {FILTERS.map((filter) => {
        const isActive = activeFilters.includes(filter.value);
        return (
          <button
            key={filter.value}
            onClick={() => onToggle(filter.value)}
            className={`rounded-md border px-3 py-1 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
            } hover:bg-neutral-200 dark:hover:bg-neutral-700`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterToggle;
