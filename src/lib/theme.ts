'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';

interface ThemeState {
  isDarkMode: boolean;
  _hasHydrated: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      _hasHydrated: false,
      toggleDarkMode: () => set((state) => {
        const newValue = !state.isDarkMode;
        return { isDarkMode: newValue };
      }),
      setDarkMode: (isDark: boolean) => set(() => {
        return { isDarkMode: isDark };
      }),
      setHasHydrated: (state: boolean) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: 'boltinsight-theme',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Custom hook to sync dark mode with DOM after hydration
export function useThemeEffect() {
  const { isDarkMode, _hasHydrated } = useThemeStore();

  useEffect(() => {
    if (_hasHydrated) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode, _hasHydrated]);
}
