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
  ChevronLeft,
  Settings,
  User,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  Globe,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Percent,
  Users,
  ClipboardCheck,
  Check,
  FileText,
  MessageSquare,
  UserCheck,
  HelpCircle,
  LayoutDashboard,
  Briefcase,
  Clock,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { useThemeStore } from '@/lib/theme';
import { SearchSection } from './SearchSection';
import { ProjectsList } from './ProjectsList';
import { HistoryList } from './HistoryList';
import { Modal, Button, Input, Select, toast, BoltLogo } from '@/components/ui';

const menuItems = [
  {
    id: 'new-proposal',
    label: 'New Proposal',
    icon: Plus,
    expandable: false,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    expandable: false,
  },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: Briefcase,
    expandable: false,
  },
  {
    id: 'search-my',
    label: 'Search My Proposals',
    icon: User,
    expandable: true,
  },
  {
    id: 'search-all',
    label: 'Search All Proposals',
    icon: Users,
    expandable: true,
  },
  {
    id: 'calculators',
    label: 'Calculators',
    icon: Calculator,
    expandable: false,
  },
  {
    id: 'demographics',
    label: 'Demographics & Quota',
    icon: Users,
    expandable: false,
  },
  {
    id: 'feasibility',
    label: 'Feasibility Check',
    icon: ClipboardCheck,
    expandable: false,
  },
  {
    id: 'library',
    label: 'Library',
    icon: Library,
    expandable: false,
  },
];

export function Sidebar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    activeSection,
    setActiveSection,
    currentUser,
    sidebarCollapsed,
    setSidebarCollapsed,
    setLoggedIn,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    proposals,
    setCurrentProposal,
  } = useAppStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [expandedItems, setExpandedItems] = useState<string[]>(['projects', 'history']);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    markAllNotificationsRead();
  };

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    // Mark as read
    markNotificationRead(notification.id);

    // If it has a proposal, navigate to it
    if (notification.proposalId) {
      const proposal = proposals.find(p => p.id === notification.proposalId);
      if (proposal) {
        setCurrentProposal(proposal);
        setActiveSection('view-proposal');
        setNotificationsOpen(false);
      }
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval_request': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'approval_approved': return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'approval_rejected': return <X className="h-4 w-4 text-red-500" />;
      case 'approval_on_hold': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'comment': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

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
          'fixed left-0 top-0 z-40 h-screen transform border-r border-gray-200 bg-white transition-all duration-200 ease-in-out',
          sidebarCollapsed ? 'w-16' : 'w-72',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block cursor-pointer"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {!sidebarCollapsed && <BoltLogo className="h-9 w-auto" variant={isDarkMode ? 'dark' : 'light'} />}
              {sidebarCollapsed && <BoltLogo className="h-8 w-8" variant={isDarkMode ? 'dark' : 'light'} />}
            </button>
            <div className="lg:hidden">
              {!sidebarCollapsed && <BoltLogo className="h-9 w-auto" variant={isDarkMode ? 'dark' : 'light'} />}
              {sidebarCollapsed && <BoltLogo className="h-8 w-8" variant={isDarkMode ? 'dark' : 'light'} />}
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => setNotificationsOpen(true)}
                className="relative flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {/* New Proposal Button */}
            <button
              onClick={() => setActiveSection('new-proposal')}
              className={cn(
                'mb-4 flex w-full items-center rounded-lg bg-[#5B50BD] text-white transition-colors hover:bg-[#4A41A0]',
                sidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                activeSection === 'new-proposal' && 'ring-2 ring-[#918AD3]'
              )}
              title={sidebarCollapsed ? 'New Proposal' : undefined}
            >
              <Plus className="h-5 w-5" />
              {!sidebarCollapsed && <span className="font-medium">New Proposal</span>}
            </button>

            {/* Menu Items */}
            <div className="space-y-1">
              {menuItems.slice(1).map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id, item.expandable && !sidebarCollapsed)}
                    className={cn(
                      'flex w-full items-center rounded-lg text-sm transition-colors',
                      sidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5',
                      activeSection === item.id
                        ? 'bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <item.icon className="h-5 w-5" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.expandable && (
                          expandedItems.includes(item.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )
                        )}
                      </>
                    )}
                  </button>

                  {/* Search Panels */}
                  {!sidebarCollapsed && item.id === 'search-my' && expandedItems.includes(item.id) && (
                    <div className="mt-2 px-2">
                      <SearchSection searchAll={false} />
                    </div>
                  )}

                  {!sidebarCollapsed && item.id === 'search-all' && expandedItems.includes(item.id) && (
                    <div className="mt-2 px-2">
                      <SearchSection searchAll={true} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            {!sidebarCollapsed && <div className="my-4 h-px bg-gray-200" />}

            {/* Projects Section */}
            <div>
              <button
                onClick={() => !sidebarCollapsed && toggleExpand('projects')}
                className={cn(
                  'flex w-full items-center rounded-lg text-sm transition-colors',
                  sidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5',
                  activeSection === 'projects'
                    ? 'bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )}
                title={sidebarCollapsed ? 'Projects' : undefined}
              >
                <FolderKanban className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">Projects</span>
                    {expandedItems.includes('projects') ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </button>
              {!sidebarCollapsed && expandedItems.includes('projects') && (
                <div className="mt-2">
                  <ProjectsList />
                </div>
              )}
            </div>

            {/* Divider */}
            {!sidebarCollapsed && <div className="my-4 h-px bg-gray-200" />}

            {/* History Section */}
            <div>
              <button
                onClick={() => !sidebarCollapsed && toggleExpand('history')}
                className={cn(
                  'flex w-full items-center rounded-lg text-sm transition-colors',
                  sidebarCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5',
                  activeSection === 'history'
                    ? 'bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )}
                title={sidebarCollapsed ? 'History' : undefined}
              >
                <History className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">History</span>
                    {expandedItems.includes('history') ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </button>
              {!sidebarCollapsed && expandedItems.includes('history') && (
                <div className="mt-2">
                  <HistoryList />
                </div>
              )}
            </div>
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className={cn('flex items-center', sidebarCollapsed ? 'justify-center' : 'gap-3')}>
              <button
                onClick={() => setSettingsOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDE9F9] text-[#5B50BD] hover:bg-[#C8C4E9] dark:bg-[#231E51] dark:text-[#918AD3] dark:hover:bg-[#1A163C]"
                title={sidebarCollapsed ? 'Settings' : undefined}
              >
                {sidebarCollapsed ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
              </button>
              {!sidebarCollapsed && (
                <>
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
                </>
              )}
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
                <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
              </div>
            </div>
          </div>

          {/* My Analytics / Meta Learnings */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">My Analytics</h3>
            <button
              onClick={() => {
                setSettingsOpen(false);
                setActiveSection('meta-learnings');
              }}
              className="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 transition-colors"
            >
              <Brain className="h-4 w-4 text-[#5B50BD]" />
              <div className="flex-1 text-left">
                <span className="text-sm font-medium">Meta Learnings</span>
                <p className="text-xs text-gray-500">View your proposal analytics and performance</p>
              </div>
            </button>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">Appearance</h3>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="text-sm">Dark Mode</span>
              </div>
              <button
                onClick={() => {
                  toggleDarkMode();
                  toast.success(isDarkMode ? 'Light mode enabled' : 'Dark mode enabled');
                }}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  isDarkMode ? 'bg-[#5B50BD]' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow',
                    isDarkMode ? 'left-5' : 'left-0.5'
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
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors',
                  notificationsEnabled ? 'bg-[#5B50BD]' : 'bg-gray-200'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow',
                    notificationsEnabled ? 'left-5' : 'left-0.5'
                  )}
                />
              </button>
            </div>
          </div>

          {/* Help */}
          <div>
            <button
              onClick={() => toast.info('Help center coming soon')}
              className="flex w-full items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
            >
              <HelpCircle className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Help & Support</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              className="text-red-600 hover:bg-red-50"
              onClick={() => {
                setSettingsOpen(false);
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

      {/* Notifications Modal */}
      <Modal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Notifications"
        size="md"
      >
        <div className="space-y-4">
          {unreadCount > 0 && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                <Check className="mr-1 h-4 w-4" />
                Mark all read
              </Button>
            </div>
          )}

          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-lg p-3 transition-colors border text-left',
                    notification.read
                      ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      : 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                  )}
                >
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-xs font-semibold mb-0.5',
                      notification.read
                        ? 'text-gray-500 dark:text-gray-400'
                        : 'text-[#5B50BD] dark:text-[#918AD3]'
                    )}>
                      {notification.title}
                    </p>
                    <p className={cn(
                      'text-sm leading-relaxed',
                      notification.read
                        ? 'text-gray-600 dark:text-gray-300'
                        : 'text-gray-900 dark:text-gray-100'
                    )}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-purple-500 dark:bg-purple-400 mt-2 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="pt-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setNotificationsOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
