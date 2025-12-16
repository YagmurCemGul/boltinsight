'use client';

import { useState } from 'react';
import { Menu, Bell, Zap, ArrowLeft, Search, MoreVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

interface MobileHeaderProps {
  onOpenMenu: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
}

export function MobileHeader({
  onOpenMenu,
  title,
  showBack = false,
  onBack,
  showSearch = false
}: MobileHeaderProps) {
  const { activeSection, setActiveSection, currentProposal } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);

  // Dynamic title based on activeSection
  const getTitle = () => {
    if (title) return title;

    switch (activeSection) {
      case 'new-proposal':
        return 'New Proposal';
      case 'view-proposal':
        return currentProposal?.content.title || 'View Proposal';
      case 'meta-learnings':
        return 'Meta Learnings';
      case 'moe-calculator':
        return 'Margin of Error';
      case 'demographics':
        return 'Demographics';
      case 'feasibility':
        return 'Feasibility Check';
      case 'library':
        return 'Library';
      case 'search-my':
        return 'My Proposals';
      case 'search-all':
        return 'All Proposals';
      default:
        if (activeSection.startsWith('project-')) {
          return 'Project';
        }
        return 'BoltInsight';
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setActiveSection('new-proposal');
    }
  };

  if (searchOpen) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 safe-area-top">
        <div className="flex items-center gap-2 px-3 h-full">
          <button
            onClick={() => setSearchOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Search proposals..."
            autoFocus
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 safe-area-top">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={handleBack}
              className="rounded-lg p-2 -ml-2 text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={onOpenMenu}
              className="rounded-lg p-2 -ml-2 text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-800"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {!showBack && activeSection === 'new-proposal' && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-blue-600">BoltInsight</span>
            </div>
          )}
        </div>

        {/* Center - Title */}
        {(showBack || activeSection !== 'new-proposal') && (
          <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold text-gray-900 dark:text-white truncate max-w-[50%]">
            {getTitle()}
          </h1>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-1">
          {showSearch && (
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          <button className="rounded-lg p-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
