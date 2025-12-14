'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => {
        const newValue = !state.isDarkMode;
        if (typeof window !== 'undefined') {
          if (newValue) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { isDarkMode: newValue };
      }),
      setDarkMode: (isDark: boolean) => set(() => {
        if (typeof window !== 'undefined') {
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { isDarkMode: isDark };
      }),
    }),
    {
      name: 'boltinsight-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.isDarkMode && typeof window !== 'undefined') {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);
