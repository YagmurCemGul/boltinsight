'use client';

import { useState } from 'react';
import {
  Box,
  Layers,
  Database,
  Globe,
  Server,
  Layout,
  FileText,
  Users,
  FolderOpen,
  MessageSquare,
  BarChart3,
  Calculator,
  Library,
  Settings,
  Moon,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Workflow,
  Component,
  Palette,
  Shield,
  Smartphone,
  Monitor,
  Tablet,
  GitBranch,
  Package,
  Zap,
  Search,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Architecture Node Component
function ArchitectureNode({
  title,
  icon: Icon,
  children,
  color = 'blue',
  description,
  expandable = false,
  defaultExpanded = true,
}: {
  title: string;
  icon: React.ElementType;
  children?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan' | 'gray';
  description?: string;
  expandable?: boolean;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    green: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    purple: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800',
    orange: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800',
    pink: 'bg-pink-50 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800',
    cyan: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/30 dark:border-cyan-800',
    gray: 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700',
  };

  const iconColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    gray: 'text-gray-600 dark:text-gray-400',
  };

  return (
    <div className={cn('rounded-lg border-2 p-3', colorClasses[color])}>
      <div
        className={cn(
          'flex items-center gap-2',
          expandable && 'cursor-pointer'
        )}
        onClick={() => expandable && setExpanded(!expanded)}
      >
        {expandable && (
          <span className="text-gray-500">
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        <Icon size={18} className={iconColorClasses[color]} />
        <span className="font-semibold text-gray-800 dark:text-gray-200">{title}</span>
      </div>
      {description && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 ml-6">{description}</p>
      )}
      {children && (!expandable || expanded) && (
        <div className="mt-2 ml-6 space-y-2">{children}</div>
      )}
    </div>
  );
}

// Connection Arrow Component
function ConnectionArrow({ direction = 'down', label }: { direction?: 'down' | 'right' | 'both'; label?: string }) {
  return (
    <div className="flex items-center justify-center py-1">
      {direction === 'down' && <ArrowDown size={20} className="text-gray-400" />}
      {direction === 'right' && <ArrowRight size={20} className="text-gray-400" />}
      {direction === 'both' && (
        <div className="flex items-center gap-1">
          <ArrowRight size={16} className="text-gray-400" />
          <ArrowRight size={16} className="text-gray-400 rotate-180" />
        </div>
      )}
      {label && <span className="ml-2 text-xs text-gray-500">{label}</span>}
    </div>
  );
}

// Tech Badge Component
function TechBadge({ name, version }: { name: string; version?: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
      {name}
      {version && <span className="text-gray-500 dark:text-gray-400">v{version}</span>}
    </span>
  );
}

// Section Header Component
function SectionHeader({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
      <Icon size={24} className="text-blue-600 dark:text-blue-400" />
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status, color }: { status: string; color: string }) {
  const colorClasses: Record<string, string> = {
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
    red: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400',
  };

  return (
    <span className={cn('px-2 py-0.5 rounded text-xs font-medium', colorClasses[color])}>
      {status}
    </span>
  );
}

// Main Architecture Component
export function Architecture() {
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'state' | 'data' | 'features'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'components', label: 'Components', icon: Component },
    { id: 'state', label: 'State Management', icon: Database },
    { id: 'data', label: 'Data Models', icon: FileText },
    { id: 'features', label: 'Features', icon: Zap },
  ] as const;

  return (
    <div className="h-full overflow-auto bg-white dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            BoltInsight Architecture
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive overview of the application architecture, components, and data flow
          </p>
        </div>

        {/* Tech Stack Summary */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            <TechBadge name="Next.js" version="16" />
            <TechBadge name="React" version="19" />
            <TechBadge name="TypeScript" version="5" />
            <TechBadge name="TailwindCSS" version="4" />
            <TechBadge name="Zustand" version="5" />
            <TechBadge name="Radix UI" />
            <TechBadge name="Lucide Icons" />
            <TechBadge name="jsPDF" />
            <TechBadge name="docx" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'components' && <ComponentsTab />}
          {activeTab === 'state' && <StateManagementTab />}
          {activeTab === 'data' && <DataModelsTab />}
          {activeTab === 'features' && <FeaturesTab />}
        </div>
      </div>
    </div>
  );
}

// Overview Tab
function OverviewTab() {
  return (
    <div className="space-y-6">
      <SectionHeader title="High-Level Architecture" icon={Layers} />

      {/* Main Architecture Diagram */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Client Browser */}
        <ArchitectureNode title="Client Browser" icon={Globe} color="cyan">
          <div className="space-y-3">
            {/* Next.js App Router */}
            <ArchitectureNode title="Next.js App Router" icon={Server} color="purple" description="src/app/page.tsx">
              <ConnectionArrow direction="down" />

              {/* Auth Layer */}
              <ArchitectureNode title="Authentication Layer" icon={Shield} color="orange" description="LoginScreen - SSO & Email/Password">
                <div className="flex gap-2 mt-2">
                  <TechBadge name="Microsoft" />
                  <TechBadge name="Google" />
                  <TechBadge name="Okta" />
                </div>
              </ArchitectureNode>

              <ConnectionArrow direction="down" />

              {/* Main Application */}
              <ArchitectureNode title="Main Application" icon={Layout} color="blue">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <ArchitectureNode title="Sidebar" icon={FolderOpen} color="green" description="Navigation" />
                  <ArchitectureNode title="Main Content" icon={FileText} color="green" description="Dynamic Views" />
                  <ArchitectureNode title="Right Sidebar" icon={BookOpen} color="green" description="Section Nav" />
                </div>
              </ArchitectureNode>
            </ArchitectureNode>

            <ConnectionArrow direction="down" />

            {/* State Management */}
            <ArchitectureNode title="State Management (Zustand)" icon={Database} color="pink">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                <div className="text-xs text-center p-2 bg-white dark:bg-gray-800 rounded border">Proposals</div>
                <div className="text-xs text-center p-2 bg-white dark:bg-gray-800 rounded border">Projects</div>
                <div className="text-xs text-center p-2 bg-white dark:bg-gray-800 rounded border">Chat</div>
                <div className="text-xs text-center p-2 bg-white dark:bg-gray-800 rounded border">Library</div>
                <div className="text-xs text-center p-2 bg-white dark:bg-gray-800 rounded border">UI State</div>
              </div>
            </ArchitectureNode>

            <ConnectionArrow direction="down" />

            {/* Local Storage */}
            <ArchitectureNode title="Local Storage" icon={Database} color="gray" description="Persistence Layer">
              <div className="flex gap-2 mt-2">
                <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">boltinsight-storage</code>
                <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">boltinsight-theme</code>
              </div>
            </ArchitectureNode>
          </div>
        </ArchitectureNode>
      </div>

      {/* Application Flow */}
      <SectionHeader title="Application Flow" icon={Workflow} />
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <Users className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300">User Visit</span>
          </div>

          <ConnectionArrow direction="down" />

          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
            <span className="font-medium text-yellow-800 dark:text-yellow-300">Is Logged In?</span>
          </div>

          <div className="flex gap-8 items-start">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">NO</span>
              <ConnectionArrow direction="down" />
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg text-center">
                <Shield className="text-orange-600 dark:text-orange-400 mx-auto mb-1" size={20} />
                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">Login Screen</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-2">YES</span>
              <ConnectionArrow direction="down" />
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg text-center">
                <Layout className="text-green-600 dark:text-green-400 mx-auto mb-1" size={20} />
                <span className="text-sm font-medium text-green-800 dark:text-green-300">Main Content</span>
              </div>
            </div>
          </div>

          <ConnectionArrow direction="down" />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full">
            {[
              { name: 'New Proposal', icon: FileText },
              { name: 'View Proposal', icon: FileText },
              { name: 'Search', icon: Search },
              { name: 'Meta Learnings', icon: BarChart3 },
              { name: 'Tools', icon: Calculator },
              { name: 'Library', icon: Library },
              { name: 'Projects', icon: FolderOpen },
            ].map((item) => (
              <div key={item.name} className="p-2 bg-white dark:bg-gray-800 rounded-lg border text-center">
                <item.icon className="mx-auto mb-1 text-gray-600 dark:text-gray-400" size={16} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Design */}
      <SectionHeader title="Responsive Design" icon={Smartphone} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="text-blue-600" size={20} />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Mobile</span>
            <span className="text-xs text-gray-500">&lt; 768px</span>
          </div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg p-2">
            <div className="h-full bg-white dark:bg-gray-800 rounded flex flex-col">
              <div className="h-6 bg-blue-100 dark:bg-blue-900/50 rounded-t flex items-center px-2">
                <div className="w-4 h-3 bg-blue-400 rounded-sm"></div>
              </div>
              <div className="flex-1 p-2">
                <div className="h-full bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Sidebar as overlay</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Tablet className="text-green-600" size={20} />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Tablet</span>
            <span className="text-xs text-gray-500">768px - 1024px</span>
          </div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg p-2">
            <div className="h-full bg-white dark:bg-gray-800 rounded flex">
              <div className="w-12 bg-blue-100 dark:bg-blue-900/50 rounded-l"></div>
              <div className="flex-1 p-2">
                <div className="h-full bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Mini sidebar</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="text-purple-600" size={20} />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Desktop</span>
            <span className="text-xs text-gray-500">&gt; 1024px</span>
          </div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg p-2">
            <div className="h-full bg-white dark:bg-gray-800 rounded flex">
              <div className="w-16 bg-blue-100 dark:bg-blue-900/50 rounded-l"></div>
              <div className="flex-1 p-2">
                <div className="h-full bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="w-12 bg-green-100 dark:bg-green-900/50 rounded-r"></div>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Full sidebar + right nav</p>
        </div>
      </div>
    </div>
  );
}

// Components Tab
function ComponentsTab() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Component Hierarchy" icon={Component} />

      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <ArchitectureNode title="src/" icon={FolderOpen} color="gray" expandable defaultExpanded>
          <ArchitectureNode title="app/" icon={FolderOpen} color="purple" expandable>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <FileText size={14} className="text-purple-500" />
                <code>layout.tsx</code>
                <span className="text-xs text-gray-500">- Root Layout</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <FileText size={14} className="text-purple-500" />
                <code>page.tsx</code>
                <span className="text-xs text-gray-500">- Entry Point</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <Palette size={14} className="text-purple-500" />
                <code>globals.css</code>
                <span className="text-xs text-gray-500">- Global Styles</span>
              </div>
            </div>
          </ArchitectureNode>

          <ArchitectureNode title="components/" icon={FolderOpen} color="blue" expandable>
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded mb-2">
              <Component size={14} className="text-blue-500" />
              <code>MainContent.tsx</code>
              <span className="text-xs text-gray-500">- Content Router</span>
            </div>

            <ArchitectureNode title="auth/" icon={FolderOpen} color="orange" expandable defaultExpanded={false}>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <Shield size={14} className="text-orange-500" />
                <code>LoginScreen.tsx</code>
                <span className="text-xs text-gray-500">- Authentication UI</span>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="chat/" icon={FolderOpen} color="green" expandable defaultExpanded={false}>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <MessageSquare size={14} className="text-green-500" />
                <code>ChatInterface.tsx</code>
                <span className="text-xs text-gray-500">- AI Chat (600 lines)</span>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="proposal/" icon={FolderOpen} color="cyan" expandable defaultExpanded={false}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <FileText size={14} className="text-cyan-500" />
                  <code>ProposalEditor.tsx</code>
                  <span className="text-xs text-gray-500">- 12 Sections</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <Layout size={14} className="text-cyan-500" />
                  <code>RightSidebar.tsx</code>
                  <span className="text-xs text-gray-500">- Section Nav</span>
                </div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="sidebar/" icon={FolderOpen} color="pink" expandable defaultExpanded={false}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <Layout size={14} className="text-pink-500" />
                  <code>Sidebar.tsx</code>
                  <span className="text-xs text-gray-500">- Main Nav (415 lines)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <Search size={14} className="text-pink-500" />
                  <code>SearchSection.tsx</code>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <FolderOpen size={14} className="text-pink-500" />
                  <code>ProjectsList.tsx</code>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <FileText size={14} className="text-pink-500" />
                  <code>HistoryList.tsx</code>
                </div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="meta-learnings/" icon={FolderOpen} color="purple" expandable defaultExpanded={false}>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <BarChart3 size={14} className="text-purple-500" />
                <code>MetaLearnings.tsx</code>
                <span className="text-xs text-gray-500">- Analytics</span>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="tools/" icon={FolderOpen} color="orange" expandable defaultExpanded={false}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <Calculator size={14} className="text-orange-500" />
                  <code>MarginOfErrorCalculator.tsx</code>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <Users size={14} className="text-orange-500" />
                  <code>DemographicDistribution.tsx</code>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <BarChart3 size={14} className="text-orange-500" />
                  <code>FeasibilityCheck.tsx</code>
                </div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="library/" icon={FolderOpen} color="green" expandable defaultExpanded={false}>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <Library size={14} className="text-green-500" />
                <code>Library.tsx</code>
                <span className="text-xs text-gray-500">- Resources</span>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="ui/" icon={FolderOpen} color="gray" expandable defaultExpanded={false}>
              <div className="grid grid-cols-2 gap-1">
                {['button', 'input', 'textarea', 'select', 'modal', 'card', 'badge', 'tabs', 'dropdown', 'toast'].map(comp => (
                  <div key={comp} className="flex items-center gap-2 p-1.5 bg-white dark:bg-gray-800 rounded text-xs">
                    <Box size={12} className="text-gray-500" />
                    <code>{comp}.tsx</code>
                  </div>
                ))}
              </div>
            </ArchitectureNode>
          </ArchitectureNode>

          <ArchitectureNode title="lib/" icon={FolderOpen} color="pink" expandable>
            <div className="space-y-1">
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <Database size={14} className="text-pink-500" />
                <code>store.ts</code>
                <span className="text-xs text-gray-500">- Zustand (1,156 lines)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <Moon size={14} className="text-pink-500" />
                <code>theme.ts</code>
                <span className="text-xs text-gray-500">- Dark Mode</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
                <Settings size={14} className="text-pink-500" />
                <code>utils.ts</code>
                <span className="text-xs text-gray-500">- Utilities (139 lines)</span>
              </div>
            </div>
          </ArchitectureNode>

          <ArchitectureNode title="types/" icon={FolderOpen} color="cyan" expandable>
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
              <FileText size={14} className="text-cyan-500" />
              <code>index.ts</code>
              <span className="text-xs text-gray-500">- TypeScript Definitions</span>
            </div>
          </ArchitectureNode>
        </ArchitectureNode>
      </div>

      {/* Component Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">9</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Main Components</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800 text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">10</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">UI Components</div>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">15+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sub-Components</div>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800 text-center">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">1,908</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Lines</div>
        </div>
      </div>
    </div>
  );
}

// State Management Tab
function StateManagementTab() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Zustand Store Architecture" icon={Database} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Box className="text-blue-500" size={20} />
            State
          </h3>

          <div className="space-y-3">
            <ArchitectureNode title="User State" icon={Users} color="blue">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <div>• currentUser: User</div>
                <div>• isLoggedIn: boolean</div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="Proposal State" icon={FileText} color="green">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <div>• proposals: Proposal[]</div>
                <div>• currentProposal: Proposal | null</div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="Project State" icon={FolderOpen} color="purple">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <div>• projects: Project[]</div>
                <div>• currentProject: Project | null</div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="Chat State" icon={MessageSquare} color="cyan">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <div>• chatMessages: ChatMessage[]</div>
                <div>• isAiTyping: boolean</div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="UI State" icon={Layout} color="orange">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                <div>• sidebarOpen: boolean</div>
                <div>• sidebarCollapsed: boolean</div>
                <div>• rightSidebarCollapsed: boolean</div>
                <div>• activeSection: string</div>
              </div>
            </ArchitectureNode>
          </div>
        </div>

        {/* Actions Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" size={20} />
            Actions
          </h3>

          <div className="space-y-3">
            <ArchitectureNode title="Proposal Actions" icon={FileText} color="green">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                <div>addProposal()</div>
                <div>updateProposal()</div>
                <div>deleteProposal()</div>
                <div>submitForApproval()</div>
                <div>updateProposalStatus()</div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="Project Actions" icon={FolderOpen} color="purple">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                <div>addProject()</div>
                <div>updateProject()</div>
                <div>deleteProject()</div>
                <div>moveProposalToProject()</div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="Chat Actions" icon={MessageSquare} color="cyan">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                <div>addChatMessage()</div>
                <div>clearChat()</div>
                <div>setAiTyping()</div>
              </div>
            </ArchitectureNode>

            <ArchitectureNode title="UI Actions" icon={Layout} color="orange">
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-mono">
                <div>setSidebarOpen()</div>
                <div>setActiveSection()</div>
                <div>setLoggedIn()</div>
              </div>
            </ArchitectureNode>
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Data Flow</h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-center">
            <Users className="mx-auto mb-2 text-blue-600" size={24} />
            <div className="text-sm font-medium">User Action</div>
          </div>

          <ArrowRight className="text-gray-400 hidden md:block" size={24} />
          <ArrowDown className="text-gray-400 md:hidden" size={24} />

          <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-lg text-center">
            <Component className="mx-auto mb-2 text-green-600" size={24} />
            <div className="text-sm font-medium">Component</div>
          </div>

          <ArrowRight className="text-gray-400 hidden md:block" size={24} />
          <ArrowDown className="text-gray-400 md:hidden" size={24} />

          <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-center">
            <Database className="mx-auto mb-2 text-purple-600" size={24} />
            <div className="text-sm font-medium">Zustand Store</div>
          </div>

          <ArrowRight className="text-gray-400 hidden md:block" size={24} />
          <ArrowDown className="text-gray-400 md:hidden" size={24} />

          <div className="p-4 bg-orange-100 dark:bg-orange-900/50 rounded-lg text-center">
            <Database className="mx-auto mb-2 text-orange-600" size={24} />
            <div className="text-sm font-medium">localStorage</div>
          </div>

          <ArrowRight className="text-gray-400 hidden md:block" size={24} />
          <ArrowDown className="text-gray-400 md:hidden" size={24} />

          <div className="p-4 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg text-center">
            <Layout className="mx-auto mb-2 text-cyan-600" size={24} />
            <div className="text-sm font-medium">Re-render</div>
          </div>
        </div>
      </div>

      {/* Persistence */}
      <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-xl border border-pink-200 dark:border-pink-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Database className="text-pink-500" size={20} />
          Persistence Layer
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <code className="text-sm text-pink-600 dark:text-pink-400">boltinsight-storage</code>
            <p className="text-xs text-gray-500 mt-1">App state (proposals, projects, settings)</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <code className="text-sm text-purple-600 dark:text-purple-400">boltinsight-theme</code>
            <p className="text-xs text-gray-500 mt-1">Theme preference (dark mode)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Data Models Tab
function DataModelsTab() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Data Models" icon={FileText} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proposal Model */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
            <FileText size={20} />
            Proposal
          </h3>
          <div className="font-mono text-xs space-y-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div><span className="text-blue-500">id:</span> string</div>
            <div><span className="text-blue-500">code:</span> string <span className="text-gray-400">// BI-YYMM-XXXX</span></div>
            <div><span className="text-blue-500">projectId:</span> string</div>
            <div><span className="text-blue-500">status:</span> ProposalStatus</div>
            <div><span className="text-blue-500">content:</span> ProposalContent</div>
            <div><span className="text-blue-500">author:</span> User</div>
            <div><span className="text-blue-500">collaborators:</span> User[]</div>
            <div><span className="text-blue-500">createdAt:</span> string</div>
            <div><span className="text-blue-500">updatedAt:</span> string</div>
            <div><span className="text-blue-500">versions:</span> ProposalVersion[]</div>
            <div><span className="text-blue-500">approvalHistory:</span> ApprovalRecord[]</div>
          </div>
        </div>

        {/* Proposal Content Model */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
            <FileText size={20} />
            ProposalContent
          </h3>
          <div className="font-mono text-xs space-y-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div><span className="text-green-500">title:</span> string</div>
            <div><span className="text-green-500">client:</span> string</div>
            <div><span className="text-green-500">contact:</span> string</div>
            <div><span className="text-green-500">background:</span> string</div>
            <div><span className="text-green-500">businessObjectives:</span> string[]</div>
            <div><span className="text-green-500">researchObjectives:</span> string[]</div>
            <div><span className="text-green-500">burningQuestions:</span> string[]</div>
            <div><span className="text-green-500">targetDefinition:</span> string</div>
            <div><span className="text-green-500">sampleSize:</span> number</div>
            <div><span className="text-green-500">markets:</span> Market[]</div>
            <div><span className="text-green-500">quotas:</span> Quota[]</div>
            <div><span className="text-green-500">advancedAnalysis:</span> string[]</div>
          </div>
        </div>

        {/* User Model */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center gap-2">
            <Users size={20} />
            User
          </h3>
          <div className="font-mono text-xs space-y-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div><span className="text-purple-500">id:</span> string</div>
            <div><span className="text-purple-500">name:</span> string</div>
            <div><span className="text-purple-500">email:</span> string</div>
            <div><span className="text-purple-500">role:</span> &apos;admin&apos; | &apos;manager&apos; | &apos;researcher&apos; | &apos;viewer&apos;</div>
            <div><span className="text-purple-500">region:</span> string</div>
            <div><span className="text-purple-500">avatar:</span> string</div>
          </div>
        </div>

        {/* Project Model */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
            <FolderOpen size={20} />
            Project
          </h3>
          <div className="font-mono text-xs space-y-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div><span className="text-orange-500">id:</span> string</div>
            <div><span className="text-orange-500">name:</span> string</div>
            <div><span className="text-orange-500">description:</span> string</div>
            <div><span className="text-orange-500">client:</span> string</div>
            <div><span className="text-orange-500">proposals:</span> string[] <span className="text-gray-400">// IDs</span></div>
            <div><span className="text-orange-500">createdAt:</span> string</div>
            <div><span className="text-orange-500">updatedAt:</span> string</div>
            <div><span className="text-orange-500">isDefault:</span> boolean</div>
          </div>
        </div>

        {/* Library Item Model */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-4 flex items-center gap-2">
            <Library size={20} />
            LibraryItem
          </h3>
          <div className="font-mono text-xs space-y-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div><span className="text-cyan-500">id:</span> string</div>
            <div><span className="text-cyan-500">name:</span> string</div>
            <div><span className="text-cyan-500">description:</span> string</div>
            <div><span className="text-cyan-500">url:</span> string</div>
            <div><span className="text-cyan-500">category:</span> &apos;external_link&apos; | &apos;video&apos; | &apos;template&apos; | &apos;methodology&apos;</div>
            <div><span className="text-cyan-500">tags:</span> string[]</div>
            <div><span className="text-cyan-500">createdAt:</span> string</div>
          </div>
        </div>

        {/* Chat Message Model */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-4 flex items-center gap-2">
            <MessageSquare size={20} />
            ChatMessage
          </h3>
          <div className="font-mono text-xs space-y-1 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div><span className="text-pink-500">id:</span> string</div>
            <div><span className="text-pink-500">role:</span> &apos;user&apos; | &apos;assistant&apos; | &apos;system&apos;</div>
            <div><span className="text-pink-500">content:</span> string</div>
            <div><span className="text-pink-500">timestamp:</span> string</div>
            <div><span className="text-pink-500">attachments:</span> Attachment[]</div>
          </div>
        </div>
      </div>

      {/* Proposal Status Workflow */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Workflow size={20} className="text-blue-500" />
          Proposal Status Workflow
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="text-center">
            <StatusBadge status="DRAFT" color="gray" />
            <p className="text-xs text-gray-500 mt-1">Initial</p>
          </div>

          <ArrowRight className="text-gray-400" size={20} />

          <div className="text-center">
            <StatusBadge status="PENDING" color="yellow" />
            <p className="text-xs text-gray-500 mt-1">Submitted</p>
          </div>

          <ArrowRight className="text-gray-400" size={20} />

          <div className="flex flex-col gap-2">
            <div className="text-center">
              <StatusBadge status="APPROVED" color="green" />
            </div>
            <div className="text-center">
              <StatusBadge status="ON HOLD" color="orange" />
            </div>
            <div className="text-center">
              <StatusBadge status="REJECTED" color="red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Features Tab
function FeaturesTab() {
  const features = [
    {
      category: 'Proposal Management',
      icon: FileText,
      color: 'blue',
      items: [
        'Create via AI Chat or Manual Editor',
        '12 Comprehensive Sections',
        'Version History Tracking',
        'Submit for Approval Workflow',
        'Collaboration (Coworking)',
        'Export to PDF & Word',
      ],
    },
    {
      category: 'Project Organization',
      icon: FolderOpen,
      color: 'green',
      items: [
        'Create & Manage Projects',
        'Assign Proposals to Projects',
        'View by Project',
        'Default Project Support',
      ],
    },
    {
      category: 'Search & Discovery',
      icon: Search,
      color: 'purple',
      items: [
        'Full-text Search',
        'Filter by Status',
        'Filter by Client',
        'Filter by Author',
        'Date Range Filters',
        'Search Own vs All',
      ],
    },
    {
      category: 'Analytics (Meta Learnings)',
      icon: BarChart3,
      color: 'orange',
      items: [
        'Proposal Statistics',
        'Client Breakdown',
        'Author Performance',
        'Status Distribution',
        'AI Insights (Placeholder)',
      ],
    },
    {
      category: 'Research Tools',
      icon: Calculator,
      color: 'cyan',
      items: [
        'Margin of Error Calculator',
        'Sample Size Calculator',
        'Demographic Distribution',
        'Feasibility Assessment',
      ],
    },
    {
      category: 'Library',
      icon: Library,
      color: 'pink',
      items: [
        'External Links',
        'Video Resources',
        'Templates',
        'Methodologies',
        'Searchable & Tagged',
      ],
    },
  ];

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    green: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    purple: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800',
    orange: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800',
    cyan: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/30 dark:border-cyan-800',
    pink: 'bg-pink-50 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800',
  };

  const iconColorMap: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    pink: 'text-pink-600 dark:text-pink-400',
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Feature Map" icon={Zap} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.category}
            className={cn('p-4 rounded-xl border-2', colorMap[feature.color])}
          >
            <div className="flex items-center gap-2 mb-3">
              <feature.icon size={20} className={iconColorMap[feature.color]} />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{feature.category}</h3>
            </div>
            <ul className="space-y-1">
              {feature.items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* UX Features */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Palette size={20} className="text-gray-600" />
          User Experience
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
            <Moon className="mx-auto mb-2 text-gray-600 dark:text-gray-400" size={24} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
            <Smartphone className="mx-auto mb-2 text-gray-600 dark:text-gray-400" size={24} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Responsive</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
            <Layout className="mx-auto mb-2 text-gray-600 dark:text-gray-400" size={24} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Collapsible</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
            <MessageSquare className="mx-auto mb-2 text-gray-600 dark:text-gray-400" size={24} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Toast Alerts</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
            <Settings className="mx-auto mb-2 text-gray-600 dark:text-gray-400" size={24} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
          </div>
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <GitBranch size={20} className="text-blue-600" />
          Future Backend Integration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <Package className="mb-2 text-blue-500" size={20} />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">API Gateway</h4>
            <p className="text-xs text-gray-500">REST/GraphQL endpoints</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <Database className="mb-2 text-green-500" size={20} />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Database</h4>
            <p className="text-xs text-gray-500">PostgreSQL + Redis</p>
          </div>
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
            <MessageSquare className="mb-2 text-purple-500" size={20} />
            <h4 className="font-medium text-gray-800 dark:text-gray-200">AI Service</h4>
            <p className="text-xs text-gray-500">OpenAI / Claude API</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Architecture;
