
import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('theme') === 'light') return 'light';
    if (localStorage.getItem('theme') === 'dark') return 'dark';
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'dark'; // Default to dark
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
};
