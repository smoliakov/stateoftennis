'use client';

import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@/app/components/icons';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-8">
      <button
        onClick={toggleTheme}
        className="cursor-pointer p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default ThemeToggle;