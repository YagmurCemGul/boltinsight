'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect dark mode state
 * Watches for changes to the 'dark' class on the document element
 */
export function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

/**
 * Helper to get the current mode key for design tokens
 */
export function useThemeMode(): 'light' | 'dark' {
  const isDark = useDarkMode();
  return isDark ? 'dark' : 'light';
}
