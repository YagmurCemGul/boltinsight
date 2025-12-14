'use client';

import { MainContent } from '@/components/MainContent';
import { LoginScreen } from '@/components/auth';
import { ToastContainer } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { useThemeEffect } from '@/lib/theme';

export default function Home() {
  const { isLoggedIn, setLoggedIn } = useAppStore();

  // Apply dark mode after hydration
  useThemeEffect();

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
