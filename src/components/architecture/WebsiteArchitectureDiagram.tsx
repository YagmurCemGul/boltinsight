'use client';

import { useState } from 'react';
import {
  Globe,
  Server,
  Database,
  Users,
  FileText,
  Shield,
  Cpu,
  Cloud,
  Smartphone,
  Monitor,
  Layout,
  Layers,
  ArrowRight,
  ArrowDown,
  MessageSquare,
  BarChart3,
  FolderOpen,
  Search,
  Calculator,
  BookOpen,
  Zap,
  Lock,
  RefreshCw,
  Download,
  CheckCircle2,
  Workflow,
  Settings,
  Palette,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Presentation Box Component - Clean and professional
function ArchBox({
  title,
  subtitle,
  icon: Icon,
  children,
  color = 'blue',
  size = 'md',
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan' | 'gray' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const colorStyles = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/25',
    green: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-500/25',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-purple-500/25',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-500/25',
    pink: 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-pink-500/25',
    cyan: 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-cyan-500/25',
    gray: 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-gray-500/25',
    gradient: 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-purple-500/25',
  };

  const sizeStyles = {
    sm: 'p-3 rounded-xl',
    md: 'p-4 rounded-2xl',
    lg: 'p-6 rounded-3xl',
  };

  return (
    <div
      className={cn(
        'shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl',
        colorStyles[color],
        sizeStyles[size],
        className
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={size === 'lg' ? 28 : size === 'md' ? 24 : 20} className="opacity-90" />}
        <div>
          <h3 className={cn('font-bold', size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base')}>
            {title}
          </h3>
          {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

// Connection Line Component
function ConnectionLine({
  direction = 'down',
  label,
  animated = true,
}: {
  direction?: 'down' | 'right' | 'both';
  label?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn('flex items-center justify-center', direction === 'right' ? 'px-2' : 'py-2')}>
      <div className="relative">
        {direction === 'down' && (
          <div className="flex flex-col items-center">
            <div className={cn('w-0.5 h-8 bg-gray-300 dark:bg-gray-600', animated && 'animate-pulse')} />
            <ArrowDown size={20} className="text-gray-400 dark:text-gray-500 -mt-1" />
          </div>
        )}
        {direction === 'right' && (
          <div className="flex items-center">
            <div className={cn('w-8 h-0.5 bg-gray-300 dark:bg-gray-600', animated && 'animate-pulse')} />
            <ArrowRight size={20} className="text-gray-400 dark:text-gray-500 -ml-1" />
          </div>
        )}
        {direction === 'both' && (
          <div className="flex items-center gap-1">
            <ArrowRight size={16} className="text-gray-400 rotate-180" />
            <div className={cn('w-6 h-0.5 bg-gray-300 dark:bg-gray-600', animated && 'animate-pulse')} />
            <ArrowRight size={16} className="text-gray-400" />
          </div>
        )}
        {label && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

// Feature Card for presentation
function FeatureCard({
  title,
  items,
  icon: Icon,
  color,
}: {
  title: string;
  items: string[];
  icon: React.ElementType;
  color: string;
}) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    green: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
    purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
    orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
    pink: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800',
    cyan: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800',
  };

  const iconColors: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-emerald-600 dark:text-emerald-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
  };

  return (
    <div className={cn('p-5 rounded-2xl border-2 transition-all hover:shadow-lg', bgColors[color])}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn('p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm', iconColors[color])}>
          <Icon size={24} />
        </div>
        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-lg">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <CheckCircle2 size={16} className={iconColors[color]} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Stat Card
function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  const bgColors: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className={cn('p-6 rounded-2xl bg-gradient-to-br text-white shadow-xl', bgColors[color])}>
      <Icon size={32} className="opacity-80 mb-3" />
      <div className="text-4xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}

// Main Component
export function WebsiteArchitectureDiagram() {
  const [activeView, setActiveView] = useState<'overview' | 'layers' | 'flow' | 'features'>('overview');

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <Layers size={18} />
            System Architecture
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            BoltInsight
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI-Powered Research Proposal Management Platform
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-2 p-1.5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            {[
              { id: 'overview', label: 'Overview', icon: Layers },
              { id: 'layers', label: 'Architecture Layers', icon: Server },
              { id: 'flow', label: 'Data Flow', icon: Workflow },
              { id: 'features', label: 'Features', icon: Zap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as typeof activeView)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all',
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeView === 'overview' && <OverviewSection />}
        {activeView === 'layers' && <LayersSection />}
        {activeView === 'flow' && <FlowSection />}
        {activeView === 'features' && <FeaturesSection />}
      </div>
    </div>
  );
}

// Overview Section - Main visual diagram
function OverviewSection() {
  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Components" value="34+" icon={Layout} color="blue" />
        <StatCard label="Lines of Code" value="5K+" icon={FileText} color="green" />
        <StatCard label="Features" value="25+" icon={Zap} color="purple" />
        <StatCard label="Data Models" value="8" icon={Database} color="orange" />
      </div>

      {/* Main Architecture Diagram */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          High-Level System Architecture
        </h2>

        <div className="flex flex-col items-center space-y-4">
          {/* Client Layer */}
          <div className="w-full max-w-4xl">
            <ArchBox title="Client Layer" subtitle="Multi-Device Support" icon={Globe} color="gradient" size="lg">
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="flex flex-col items-center p-3 bg-white/20 rounded-xl">
                  <Monitor size={24} />
                  <span className="text-sm mt-1">Desktop</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/20 rounded-xl">
                  <Smartphone size={24} />
                  <span className="text-sm mt-1">Mobile</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/20 rounded-xl">
                  <Layout size={24} />
                  <span className="text-sm mt-1">Tablet</span>
                </div>
              </div>
            </ArchBox>
          </div>

          <ConnectionLine direction="down" />

          {/* Application Layer */}
          <div className="w-full max-w-4xl">
            <ArchBox title="Application Layer" subtitle="Next.js 16 + React 19" icon={Server} color="blue" size="lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="p-3 bg-white/20 rounded-xl text-center">
                  <Shield size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Auth</span>
                </div>
                <div className="p-3 bg-white/20 rounded-xl text-center">
                  <MessageSquare size={20} className="mx-auto mb-1" />
                  <span className="text-xs">AI Chat</span>
                </div>
                <div className="p-3 bg-white/20 rounded-xl text-center">
                  <FileText size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Editor</span>
                </div>
                <div className="p-3 bg-white/20 rounded-xl text-center">
                  <BarChart3 size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Analytics</span>
                </div>
              </div>
            </ArchBox>
          </div>

          <ConnectionLine direction="down" />

          {/* State Management */}
          <div className="w-full max-w-4xl">
            <ArchBox title="State Management" subtitle="Zustand + TypeScript" icon={Cpu} color="purple" size="lg">
              <div className="grid grid-cols-5 gap-2 mt-4">
                {['Proposals', 'Projects', 'Users', 'Chat', 'UI'].map((item) => (
                  <div key={item} className="p-2 bg-white/20 rounded-lg text-center text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </ArchBox>
          </div>

          <ConnectionLine direction="down" />

          {/* Persistence Layer */}
          <div className="w-full max-w-4xl">
            <ArchBox title="Persistence Layer" subtitle="LocalStorage + Future API" icon={Database} color="green" size="lg">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-white/20 rounded-xl">
                  <div className="font-semibold mb-1">Current</div>
                  <div className="text-sm opacity-80">Browser LocalStorage</div>
                </div>
                <div className="p-4 bg-white/20 rounded-xl">
                  <div className="font-semibold mb-1">Planned</div>
                  <div className="text-sm opacity-80">PostgreSQL + Redis</div>
                </div>
              </div>
            </ArchBox>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Technology Stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: 'Next.js 16', color: 'bg-black text-white' },
            { name: 'React 19', color: 'bg-cyan-500 text-white' },
            { name: 'TypeScript 5', color: 'bg-blue-600 text-white' },
            { name: 'TailwindCSS 4', color: 'bg-teal-500 text-white' },
            { name: 'Zustand 5', color: 'bg-orange-500 text-white' },
            { name: 'Radix UI', color: 'bg-purple-600 text-white' },
            { name: 'Lucide Icons', color: 'bg-pink-500 text-white' },
            { name: 'jsPDF', color: 'bg-red-500 text-white' },
          ].map((tech) => (
            <span
              key={tech.name}
              className={cn('px-4 py-2 rounded-full font-medium text-sm shadow-md', tech.color)}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Layers Section - Detailed layer breakdown
function LayersSection() {
  const layers = [
    {
      title: 'Presentation Layer',
      subtitle: 'User Interface Components',
      icon: Layout,
      color: 'cyan' as const,
      components: [
        { name: 'Sidebar', desc: 'Navigation & Menu' },
        { name: 'MainContent', desc: 'Content Router' },
        { name: 'ProposalEditor', desc: '12-Section Editor' },
        { name: 'ChatInterface', desc: 'AI Conversation' },
      ],
    },
    {
      title: 'Business Logic Layer',
      subtitle: 'Core Application Logic',
      icon: Cpu,
      color: 'purple' as const,
      components: [
        { name: 'Proposal Management', desc: 'CRUD Operations' },
        { name: 'Project Organization', desc: 'Grouping Logic' },
        { name: 'Search & Filter', desc: 'Query Processing' },
        { name: 'Export Services', desc: 'PDF/Word Generation' },
      ],
    },
    {
      title: 'State Management Layer',
      subtitle: 'Zustand Store',
      icon: Database,
      color: 'green' as const,
      components: [
        { name: 'User State', desc: 'Auth & Profile' },
        { name: 'Proposal State', desc: 'All Proposals' },
        { name: 'UI State', desc: 'Layout Controls' },
        { name: 'Chat State', desc: 'Messages' },
      ],
    },
    {
      title: 'Persistence Layer',
      subtitle: 'Data Storage',
      icon: Cloud,
      color: 'orange' as const,
      components: [
        { name: 'LocalStorage', desc: 'Client-side Persistence' },
        { name: 'Theme Store', desc: 'Dark Mode Preference' },
        { name: 'Session Cache', desc: 'Temporary Data' },
        { name: 'Future: API', desc: 'Backend Integration' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Architecture Layers</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Clean separation of concerns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {layers.map((layer, index) => (
          <div key={layer.title}>
            <ArchBox title={layer.title} subtitle={layer.subtitle} icon={layer.icon} color={layer.color} size="lg">
              <div className="grid grid-cols-2 gap-2 mt-4">
                {layer.components.map((comp) => (
                  <div key={comp.name} className="p-3 bg-white/20 rounded-xl">
                    <div className="font-medium text-sm">{comp.name}</div>
                    <div className="text-xs opacity-70">{comp.desc}</div>
                  </div>
                ))}
              </div>
            </ArchBox>
            {index < layers.length - 1 && (
              <div className="flex justify-center my-4 lg:hidden">
                <ConnectionLine direction="down" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Flow Section - Data flow visualization
function FlowSection() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Data Flow</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">How data moves through the system</p>
      </div>

      {/* User Journey Flow */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">User Journey</h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <ArchBox title="User" icon={Users} color="blue" size="sm" />
          <ConnectionLine direction="right" />
          <ArchBox title="Login" icon={Shield} color="orange" size="sm" />
          <ConnectionLine direction="right" />
          <ArchBox title="Dashboard" icon={Layout} color="purple" size="sm" />
          <ConnectionLine direction="right" />
          <ArchBox title="Create" icon={FileText} color="green" size="sm" />
          <ConnectionLine direction="right" />
          <ArchBox title="Submit" icon={CheckCircle2} color="cyan" size="sm" />
        </div>
      </div>

      {/* Proposal Lifecycle */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">Proposal Lifecycle</h3>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium text-gray-600 dark:text-gray-400">
              DRAFT
            </div>
            <ArrowRight className="text-gray-400 self-center" size={24} />
            <div className="px-6 py-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl font-medium text-yellow-700 dark:text-yellow-400">
              PENDING
            </div>
            <ArrowRight className="text-gray-400 self-center" size={24} />
            <div className="flex flex-col gap-2">
              <div className="px-6 py-2 bg-green-100 dark:bg-green-900/50 rounded-xl font-medium text-green-700 dark:text-green-400 text-center">
                APPROVED
              </div>
              <div className="px-6 py-2 bg-orange-100 dark:bg-orange-900/50 rounded-xl font-medium text-orange-700 dark:text-orange-400 text-center">
                ON HOLD
              </div>
              <div className="px-6 py-2 bg-red-100 dark:bg-red-900/50 rounded-xl font-medium text-red-700 dark:text-red-400 text-center">
                REJECTED
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* State Update Flow */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">State Update Flow</h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <ArchBox title="User Action" subtitle="Click, Type, Submit" icon={Users} color="blue" size="md" />
          <ConnectionLine direction="right" />
          <ArchBox title="Component" subtitle="React Component" icon={Layout} color="purple" size="md" />
          <ConnectionLine direction="right" />
          <ArchBox title="Store" subtitle="Zustand Action" icon={Cpu} color="orange" size="md" />
          <ConnectionLine direction="right" />
          <ArchBox title="Persist" subtitle="LocalStorage" icon={Database} color="green" size="md" />
          <ConnectionLine direction="right" />
          <ArchBox title="Re-render" subtitle="UI Update" icon={RefreshCw} color="cyan" size="md" />
        </div>
      </div>
    </div>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      title: 'Proposal Management',
      icon: FileText,
      color: 'blue',
      items: ['AI-Powered Creation', '12 Content Sections', 'Version History', 'Approval Workflow', 'Export PDF/Word'],
    },
    {
      title: 'Project Organization',
      icon: FolderOpen,
      color: 'green',
      items: ['Create Projects', 'Group Proposals', 'Client Management', 'Quick Navigation'],
    },
    {
      title: 'Search & Discovery',
      icon: Search,
      color: 'purple',
      items: ['Full-text Search', 'Status Filters', 'Date Range', 'Author Filter', 'Client Filter'],
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      color: 'orange',
      items: ['Proposal Stats', 'Client Breakdown', 'Performance Metrics', 'Status Distribution'],
    },
    {
      title: 'Research Tools',
      icon: Calculator,
      color: 'pink',
      items: ['MOE Calculator', 'Sample Size', 'Demographics', 'Feasibility Check'],
    },
    {
      title: 'Resource Library',
      icon: BookOpen,
      color: 'cyan',
      items: ['Templates', 'Methodologies', 'Video Tutorials', 'Best Practices'],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Platform Features</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Comprehensive research proposal management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            items={feature.items}
            icon={feature.icon}
            color={feature.color}
          />
        ))}
      </div>

      {/* UX Highlights */}
      <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl text-white">
        <h3 className="text-2xl font-bold mb-6 text-center">User Experience</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Palette, label: 'Dark Mode' },
            { icon: Smartphone, label: 'Responsive' },
            { icon: Zap, label: 'Fast & Smooth' },
            { icon: Lock, label: 'Secure Auth' },
            { icon: Download, label: 'Export Options' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center p-4 bg-white/10 rounded-2xl">
              <item.icon size={32} className="mb-2" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <GitBranch className="text-blue-600 dark:text-blue-400" size={28} />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Future Roadmap</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl border border-blue-200 dark:border-blue-800">
            <Server className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Backend API</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">REST/GraphQL API Gateway with authentication</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 rounded-2xl border border-green-200 dark:border-green-800">
            <Database className="text-green-600 dark:text-green-400 mb-3" size={32} />
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Database</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">PostgreSQL for data, Redis for caching</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 rounded-2xl border border-purple-200 dark:border-purple-800">
            <MessageSquare className="text-purple-600 dark:text-purple-400 mb-3" size={32} />
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">AI Integration</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">OpenAI/Claude for intelligent assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebsiteArchitectureDiagram;
