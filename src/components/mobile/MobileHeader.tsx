'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Zap, ArrowLeft, Search, MoreVertical, X, Check, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

interface Notification {
  id: string;
  type: 'approval' | 'comment' | 'mention' | 'system';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

// Mock notifications for demo
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Proposal Approved',
    message: 'Brand Health Tracking Q1 2025 has been approved',
    time: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: 'John added a comment on your proposal',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'System Update',
    message: 'New features available in the mobile app',
    time: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
];

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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationsOpen]);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'comment':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'mention':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

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
      <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 safe-area-top">
        <div className="flex items-center gap-2 px-3 py-3">
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 safe-area-top">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Side */}
        <div className="flex items-center gap-2 shrink-0">
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
          <h1 className="flex-1 text-center font-semibold text-gray-900 dark:text-white truncate px-2">
            {getTitle()}
          </h1>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-1 shrink-0">
          {showSearch && (
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="rounded-lg p-2 text-gray-500 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800 relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 dark:text-blue-400"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          'w-full flex items-start gap-3 p-4 text-left border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50',
                          !notification.read && 'bg-blue-50/50 dark:bg-blue-900/20'
                        )}
                      >
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            'text-sm',
                            !notification.read ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                          )}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {formatDate(notification.time)}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
