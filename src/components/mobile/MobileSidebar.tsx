'use client';

import { useState } from 'react';
import {
  X,
  Plus,
  Search,
  Brain,
  Calculator,
  Library,
  FolderKanban,
  History,
  Settings,
  User,
  Moon,
  Sun,
  Bell,
  LogOut,
  Zap,
  Users,
  Percent,
  ClipboardCheck,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { useThemeStore } from '@/lib/theme';
import { Modal, Button, Select, toast } from '@/components/ui';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'new-proposal', label: 'New Proposal', icon: Plus, color: 'text-blue-600' },
  { id: 'search-my', label: 'Search My Proposals', icon: User },
  { id: 'search-all', label: 'Search All Proposals', icon: Users },
  { id: 'meta-learnings', label: 'Meta Learnings', icon: Brain },
  { id: 'divider-1', type: 'divider' },
  { id: 'moe-calculator', label: 'Margin of Error', icon: Percent },
  { id: 'demographics', label: 'Demographics & Quota', icon: Users },
  { id: 'feasibility', label: 'Feasibility Check', icon: ClipboardCheck },
  { id: 'divider-2', type: 'divider' },
  { id: 'library', label: 'Library', icon: Library },
];

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { activeSection, setActiveSection, currentUser, projects, setLoggedIn } = useAppStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-[70] h-full w-[85%] max-w-[320px] transform bg-white dark:bg-gray-900 transition-transform duration-300 ease-out shadow-xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">BoltInsight</span>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {menuItems.map((item) => {
              if (item.type === 'divider') {
                return <div key={item.id} className="my-3 h-px bg-gray-200 dark:bg-gray-800" />;
              }

              const Icon = item.icon!;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors mb-1',
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-800'
                  )}
                >
                  <Icon className={cn('h-5 w-5', item.color)} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}

            {/* Projects Section */}
            <div className="my-3 h-px bg-gray-200 dark:bg-gray-800" />

            <button
              onClick={() => setShowProjects(!showProjects)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="h-5 w-5" />
                <span className="font-medium">Projects</span>
              </div>
              <ChevronRight
                className={cn(
                  'h-5 w-5 transition-transform',
                  showProjects && 'rotate-90'
                )}
              />
            </button>

            {showProjects && (
              <div className="ml-4 mt-1 space-y-1">
                {projects.slice(0, 5).map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      setActiveSection(`project-${project.id}`);
                      onClose();
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-left',
                      activeSection === `project-${project.id}`
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
                        : 'text-gray-600 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800'
                    )}
                  >
                    <FolderKanban className="h-4 w-4" />
                    <span className="truncate">{project.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* History Section */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-800"
            >
              <div className="flex items-center gap-3">
                <History className="h-5 w-5" />
                <span className="font-medium">History</span>
              </div>
              <ChevronRight
                className={cn(
                  'h-5 w-5 transition-transform',
                  showHistory && 'rotate-90'
                )}
              />
            </button>
          </nav>

          {/* Footer - User Profile */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleDarkMode();
                toast.success(isDarkMode ? 'Light mode enabled' : 'Dark mode enabled');
              }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-gray-700 dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-800 mb-2"
            >
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow',
                    isDarkMode ? 'left-5' : 'left-0.5'
                  )}
                />
              </div>
            </button>

            {/* User Info */}
            <button
              onClick={() => {
                setSettingsOpen(true);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left active:bg-gray-100 dark:active:bg-gray-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</p>
              </div>
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Settings"
        size="md"
      >
        <div className="space-y-6">
          {/* User Info */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{currentUser.role}</p>
              </div>
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Language</h3>
            <Select
              options={[
                { value: 'en', label: 'English' },
              ]}
              value="en"
              onChange={() => {}}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between border-t dark:border-gray-700 pt-4">
            <Button
              variant="outline"
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => {
                setSettingsOpen(false);
                onClose();
                setLoggedIn(false);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
            <Button onClick={() => setSettingsOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
