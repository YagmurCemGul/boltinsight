'use client';

import { useState } from 'react';
import {
  Layers,
  Component,
  Database,
  FileText,
  Zap,
  ChevronDown,
  ChevronRight,
  Box,
  FolderOpen,
  Shield,
  Layout,
  MessageSquare,
  Users,
  BarChart3,
  Calculator,
  Library,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from '@/components/ui';

export function MobileArchitecture() {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          BoltInsight Architecture
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Application overview and structure
        </p>
      </div>

      {/* Tech Stack */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Zustand'].map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <Tabs defaultValue="overview">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
            <TabsTrigger value="components" className="flex-1 text-xs">Components</TabsTrigger>
            <TabsTrigger value="features" className="flex-1 text-xs">Features</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Application Layers
                </h3>

                <div className="space-y-3">
                  <LayerItem
                    icon={Shield}
                    title="Authentication"
                    description="SSO with Microsoft, Google, Okta"
                    color="orange"
                  />
                  <LayerItem
                    icon={Layout}
                    title="Main Application"
                    description="Sidebar + Content + Right Sidebar"
                    color="blue"
                  />
                  <LayerItem
                    icon={Database}
                    title="State Management"
                    description="Zustand with localStorage"
                    color="pink"
                  />
                  <LayerItem
                    icon={Box}
                    title="UI Components"
                    description="Custom + Radix UI primitives"
                    color="purple"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Data Models
                </h3>

                <div className="space-y-2">
                  <DataModel name="Proposal" fields={['id', 'code', 'status', 'content', 'author']} color="blue" />
                  <DataModel name="Project" fields={['id', 'name', 'client', 'proposals']} color="green" />
                  <DataModel name="User" fields={['id', 'name', 'email', 'role']} color="purple" />
                  <DataModel name="ChatMessage" fields={['id', 'role', 'content', 'timestamp']} color="pink" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Component className="h-4 w-4" />
                  Component Tree
                </h3>

                <div className="space-y-2">
                  <ComponentItem name="app/" color="purple" indent={0}>
                    <ComponentItem name="layout.tsx" color="purple" indent={1} />
                    <ComponentItem name="page.tsx" color="purple" indent={1} />
                  </ComponentItem>

                  <ComponentItem name="components/" color="blue" indent={0}>
                    <ComponentItem name="MainContent.tsx" color="blue" indent={1} />
                    <ComponentItem name="auth/LoginScreen" color="orange" indent={1} />
                    <ComponentItem name="chat/ChatInterface" color="green" indent={1} />
                    <ComponentItem name="proposal/ProposalEditor" color="cyan" indent={1} />
                    <ComponentItem name="sidebar/Sidebar" color="pink" indent={1} />
                    <ComponentItem name="meta-learnings/" color="purple" indent={1} />
                    <ComponentItem name="tools/" color="orange" indent={1} />
                    <ComponentItem name="library/" color="green" indent={1} />
                    <ComponentItem name="ui/ (10 components)" color="gray" indent={1} />
                  </ComponentItem>

                  <ComponentItem name="lib/" color="pink" indent={0}>
                    <ComponentItem name="store.ts (Zustand)" color="pink" indent={1} />
                    <ComponentItem name="theme.ts (Dark mode)" color="pink" indent={1} />
                    <ComponentItem name="utils.ts" color="pink" indent={1} />
                  </ComponentItem>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <StatBox title="Main Components" value="9" color="blue" />
              <StatBox title="UI Components" value="10" color="green" />
              <StatBox title="Sub-Components" value="15+" color="purple" />
              <StatBox title="Lines of Code" value="7.2k" color="orange" />
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <div className="space-y-3">
              <FeatureCard
                icon={FileText}
                title="Proposal Management"
                items={['AI Chat creation', 'Manual editor', 'Version history', 'Export PDF/Word']}
                color="blue"
              />
              <FeatureCard
                icon={FolderOpen}
                title="Project Organization"
                items={['Create & manage projects', 'Assign proposals', 'View by project']}
                color="green"
              />
              <FeatureCard
                icon={Search}
                title="Search & Discovery"
                items={['Full-text search', 'Status filters', 'Client filters', 'Date range']}
                color="purple"
              />
              <FeatureCard
                icon={BarChart3}
                title="Analytics"
                items={['Proposal statistics', 'Client breakdown', 'AI insights']}
                color="orange"
              />
              <FeatureCard
                icon={Calculator}
                title="Research Tools"
                items={['MOE Calculator', 'Demographics', 'Feasibility check']}
                color="cyan"
              />
              <FeatureCard
                icon={Library}
                title="Library"
                items={['Templates', 'Resources', 'Searchable & tagged']}
                color="pink"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LayerItem({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400',
    pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400',
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className={cn('p-2 rounded-lg', colorClasses[color])}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white text-sm">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function DataModel({
  name,
  fields,
  color,
}: {
  name: string;
  fields: string[];
  color: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    pink: 'text-pink-600 dark:text-pink-400',
  };

  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full"
      >
        <span className={cn('font-medium text-sm', colorClasses[color])}>{name}</span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {expanded && (
        <div className="mt-2 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
          {fields.map((field) => (
            <p key={field} className="text-xs text-gray-500 dark:text-gray-400 py-0.5">
              {field}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function ComponentItem({
  name,
  color,
  indent,
  children,
}: {
  name: string;
  color: string;
  indent: number;
  children?: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = !!children;

  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    gray: 'text-gray-600 dark:text-gray-400',
  };

  return (
    <div style={{ marginLeft: indent * 12 }}>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={cn(
          'flex items-center gap-1 text-sm',
          hasChildren && 'cursor-pointer'
        )}
      >
        {hasChildren && (
          expanded ? (
            <ChevronDown className="h-3 w-3 text-gray-400" />
          ) : (
            <ChevronRight className="h-3 w-3 text-gray-400" />
          )
        )}
        {!hasChildren && <span className="w-3" />}
        <code className={colorClasses[color]}>{name}</code>
      </button>
      {hasChildren && expanded && <div className="mt-1">{children}</div>}
    </div>
  );
}

function StatBox({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    green: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    purple: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800',
    orange: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800',
  };

  const textClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
  };

  return (
    <div className={cn('rounded-xl border p-3 text-center', colorClasses[color])}>
      <div className={cn('text-2xl font-bold', textClasses[color])}>{value}</div>
      <div className="text-xs text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  items,
  color,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    green: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    purple: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800',
    orange: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800',
    cyan: 'bg-cyan-50 border-cyan-200 dark:bg-cyan-950/30 dark:border-cyan-800',
    pink: 'bg-pink-50 border-pink-200 dark:bg-pink-950/30 dark:border-pink-800',
  };

  const iconClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    pink: 'text-pink-600 dark:text-pink-400',
  };

  return (
    <div className={cn('rounded-xl border p-4', colorClasses[color])}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn('h-4 w-4', iconClasses[color])} />
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{title}</h3>
      </div>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
            <span className="text-gray-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
