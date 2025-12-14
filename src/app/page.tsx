'use client';

import { useEffect } from 'react';
import { MainContent } from '@/components/MainContent';
import { LoginScreen } from '@/components/auth';
import { ToastContainer } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { useThemeStore } from '@/lib/theme';

export default function Home() {
  const { isLoggedIn, setLoggedIn } = useAppStore();
  const { isDarkMode } = useThemeStore();

  // Apply dark mode on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!isLoggedIn) {
    return (
      <>
        <LoginScreen onLogin={() => setLoggedIn(true)} />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <MainContent />
      <ToastContainer />
    </>
  );
}
