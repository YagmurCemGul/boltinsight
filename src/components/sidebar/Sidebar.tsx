'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Brain,
  Calculator,
  Library,
  FolderKanban,
  History,
  ChevronDown,
  ChevronRight,
  Settings,
  User,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Globe,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { SearchSection } from './SearchSection';
import { ProjectsList } from './ProjectsList';
import { HistoryList } from './HistoryList';
import { Modal, Button, Input, Select } from '@/components/ui';

const menuItems = [
  {
    id: 'new-proposal',
    label: 'New Proposal',
    icon: Plus,
    expandable: false,
  },
  {
    id: 'search-my',
    label: 'Search My Proposals',
    icon: Search,
    expandable: true,
  },
  {
    id: 'search-all',
    label: 'Search All Proposals',
    icon: Search,
    expandable: true,
  },
  {
    id: 'meta-learnings',
    label: 'Meta Learnings',
    icon: Brain,
    expandable: false,
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: Calculator,
    expandable: true,
    children: [
      { id: 'moe-calculator', label: 'Margin of Error Calculator' },
      { id: 'demographics', label: 'Demographic Distribution' },
      { id: 'feasibility', label: 'Feasibility Check' },
    ],
  },
  {
    id: 'library',
    label: 'Library',
    icon: Library,
    expandable: false,
  },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activeSection, setActiveSection, currentUser } = useAppStore();
  const [expandedItems, setExpandedItems] = useState<string[]>(['projects', 'history']);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleItemClick = (id: string, expandable: boolean) => {
    if (expandable) {
      toggleExpand(id);
    }
    setActiveSection(id);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-lg lg:hidden"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-72 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-gray-200 px-6">
            <h1 className="text-xl font-bold text-blue-600">BoltInsight</h1>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {/* New Proposal Button */}
            <button
              onClick={() => setActiveSection('new-proposal')}
              className={cn(
                'mb-4 flex w-full items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700',
                activeSection === 'new-proposal' && 'ring-2 ring-blue-300'
              )}
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">New Proposal</span>
            </button>

            {/* Menu Items */}
            <div className="space-y-1">
              {menuItems.slice(1).map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id, item.expandable)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors',
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.expandable && (
                      expandedItems.includes(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )
                    )}
                  </button>

                  {/* Search Panels */}
                  {item.id === 'search-my' && expandedItems.includes(item.id) && (
                    <div className="mt-2 px-2">
                      <SearchSection searchAll={false} />
                    </div>
                  )}

                  {item.id === 'search-all' && expandedItems.includes(item.id) && (
                    <div className="mt-2 px-2">
                      <SearchSection searchAll={true} />
                    </div>
                  )}

                  {/* Tools Sub-menu */}
                  {item.children && expandedItems.includes(item.id) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => setActiveSection(child.id)}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors',
                            activeSection === child.id
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-100'
                          )}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-gray-200" />

            {/* Projects Section */}
            <div>
              <button
                onClick={() => toggleExpand('projects')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors',
                  activeSection === 'projects'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <FolderKanban className="h-5 w-5" />
                <span className="flex-1 text-left font-medium">Projects</span>
                {expandedItems.includes('projects') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedItems.includes('projects') && (
                <div className="mt-2">
                  <ProjectsList />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-gray-200" />

            {/* History Section */}
            <div>
              <button
                onClick={() => toggleExpand('history')}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors',
                  activeSection === 'history'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <History className="h-5 w-5" />
                <span className="flex-1 text-left font-medium">History</span>
                {expandedItems.includes('history') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {expandedItems.includes('history') && (
                <div className="mt-2">
                  <HistoryList />
                </div>
              )}
            </div>
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
              <button
                onClick={() => setSettingsOpen(true)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Settings Modal */}
      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Settings"
        size="md"
      >
        <div className="space-y-6">
          {/* User Info */}
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
                <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">Appearance</h3>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="text-sm">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow',
                    darkMode ? 'left-5' : 'left-0.5'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">Notifications</h3>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="text-sm">Email Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  notifications ? 'bg-blue-600' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow',
                    notifications ? 'left-5' : 'left-0.5'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">Language</h3>
            <Select
              options={[
                { value: 'en', label: 'English' },
                { value: 'tr', label: 'Türkçe' },
                { value: 'de', label: 'Deutsch' },
                { value: 'fr', label: 'Français' },
              ]}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between border-t pt-4">
            <Button variant="outline" className="text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
            <Button onClick={() => setSettingsOpen(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
