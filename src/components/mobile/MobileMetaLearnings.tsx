'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  FileCheck,
  FileX,
  Clock,
  X,
  ChevronDown,
  MessageSquare,
  PieChart,
  Building2,
  Users,
} from 'lucide-react';
import { cn, formatDate, groupBy } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Input, Select, Button, Badge, Card, CardContent, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import type { ProposalStatus } from '@/types';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending_approval', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export function MobileMetaLearnings() {
  const { proposals, metaLearningFilter, setMetaLearningFilter, clearMetaLearningFilter } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const uniqueClients = useMemo(() => {
    const clients = proposals.map((p) => p.content.client).filter(Boolean);
    return [...new Set(clients)];
  }, [proposals]);

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      if (p.status === 'deleted') return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches =
          p.content.title?.toLowerCase().includes(query) ||
          p.content.client?.toLowerCase().includes(query);
        if (!matches) return false;
      }
      if (metaLearningFilter.statuses?.length) {
        if (!metaLearningFilter.statuses.includes(p.status)) return false;
      }
      if (metaLearningFilter.clients?.length) {
        if (!metaLearningFilter.clients.includes(p.content.client || '')) return false;
      }
      return true;
    });
  }, [proposals, searchQuery, metaLearningFilter]);

  const analytics = useMemo(() => {
    const total = filteredProposals.length;
    const approved = filteredProposals.filter((p) => p.status === 'approved').length;
    const rejected = filteredProposals.filter((p) => p.status === 'rejected').length;
    const pending = filteredProposals.filter((p) => p.status === 'pending_approval').length;
    const draft = filteredProposals.filter((p) => p.status === 'draft').length;

    const byClient = Object.entries(
      filteredProposals.reduce((acc, p) => {
        const client = p.content.client || 'Unknown';
        if (!acc[client]) acc[client] = { total: 0, approved: 0 };
        acc[client].total++;
        if (p.status === 'approved') acc[client].approved++;
        return acc;
      }, {} as Record<string, { total: number; approved: number }>)
    )
      .map(([name, data]) => ({ name, count: data.total, approved: data.approved, rate: Math.round((data.approved / data.total) * 100) }))
      .sort((a, b) => b.count - a.count);

    const byAuthor = Object.entries(
      filteredProposals.reduce((acc, p) => {
        const name = p.author.name;
        if (!acc[name]) acc[name] = { total: 0, approved: 0 };
        acc[name].total++;
        if (p.status === 'approved') acc[name].approved++;
        return acc;
      }, {} as Record<string, { total: number; approved: number }>)
    )
      .map(([name, data]) => ({
        name,
        count: data.total,
        approved: data.approved,
        rate: Math.round((data.approved / data.total) * 100),
      }))
      .sort((a, b) => b.count - a.count);

    return { total, approved, rejected, pending, draft, byClient, byAuthor };
  }, [filteredProposals]);

  const handleAnalyze = () => {
    if (!chatQuery.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const query = chatQuery.toLowerCase();
      let response = '';

      if (query.includes('approved') || query.includes('success')) {
        response = `**Approval Analysis**\n\nBased on ${analytics.total} proposals:\n\n• Approval Rate: ${Math.round((analytics.approved / analytics.total) * 100) || 0}%\n• Top Client: ${analytics.byClient[0]?.name || 'N/A'}`;
      } else if (query.includes('reject')) {
        response = `**Rejection Analysis**\n\n${analytics.rejected} proposals rejected.\n\nCommon reasons:\n• Incomplete targets (35%)\n• Budget issues (28%)\n• Timeline conflicts (22%)`;
      } else {
        response = `**Portfolio Overview**\n\n• Total: ${analytics.total}\n• Approved: ${analytics.approved}\n• Pending: ${analytics.pending}\n• Draft: ${analytics.draft}`;
      }

      setChatResponse(response);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showFilters ? 'default' : 'outline'}
            onClick={() => setShowFilters(!showFilters)}
            className="shrink-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 flex gap-2 flex-wrap">
            <Select
              options={STATUS_OPTIONS}
              value={metaLearningFilter.statuses?.[0] || ''}
              onChange={(e) =>
                setMetaLearningFilter({
                  ...metaLearningFilter,
                  statuses: e.target.value ? [e.target.value as ProposalStatus] : undefined,
                })
              }
              className="w-32"
            />
            <Select
              options={[
                { value: '', label: 'All Clients' },
                ...uniqueClients.map((c) => ({ value: c!, label: c! })),
              ]}
              value={metaLearningFilter.clients?.[0] || ''}
              onChange={(e) =>
                setMetaLearningFilter({
                  ...metaLearningFilter,
                  clients: e.target.value ? [e.target.value] : undefined,
                })
              }
              className="flex-1"
            />
            {(searchQuery || Object.keys(metaLearningFilter).length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  clearMetaLearningFilter();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-24">
        <Tabs defaultValue="overview" className="h-full">
          {/* Tab Navigation */}
          <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 px-4 pt-3">
            <TabsList className="w-full grid grid-cols-4 gap-1">
              <TabsTrigger value="overview" className="text-xs px-2">Overview</TabsTrigger>
              <TabsTrigger value="by-client" className="text-xs px-2">Clients</TabsTrigger>
              <TabsTrigger value="by-author" className="text-xs px-2">Authors</TabsTrigger>
              <TabsTrigger value="chat" className="text-xs px-2">AI</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="px-4 py-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatCard
                title="Total"
                value={analytics.total}
                icon={<BarChart3 className="h-5 w-5 text-blue-600" />}
                color="blue"
              />
              <StatCard
                title="Approved"
                value={analytics.approved}
                subtitle={`${Math.round((analytics.approved / analytics.total) * 100) || 0}%`}
                icon={<FileCheck className="h-5 w-5 text-green-600" />}
                color="green"
              />
              <StatCard
                title="Rejected"
                value={analytics.rejected}
                icon={<FileX className="h-5 w-5 text-red-600" />}
                color="red"
              />
              <StatCard
                title="Pending"
                value={analytics.pending}
                icon={<Clock className="h-5 w-5 text-yellow-600" />}
                color="yellow"
              />
            </div>

            {/* Top Clients */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Top Clients
                </h3>
                <div className="space-y-3">
                  {analytics.byClient.slice(0, 5).map((client, i) => (
                    <div key={client.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-xs font-medium text-blue-600 dark:text-blue-400">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {client.name}
                        </span>
                      </div>
                      <Badge variant="info" className="shrink-0 ml-2">{client.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* By Client Tab */}
          <TabsContent value="by-client" className="px-4 py-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Proposals by Client
                </h3>
                <div className="space-y-3">
                  {analytics.byClient.map((client) => (
                    <div key={client.name} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                          {client.name}
                        </span>
                        <Badge variant={client.rate >= 70 ? 'success' : client.rate >= 40 ? 'warning' : 'error'}>
                          {client.rate}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Total: {client.count}</span>
                        <span>Approved: {client.approved}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* By Author Tab */}
          <TabsContent value="by-author" className="px-4 py-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Performance by Author
                </h3>
                <div className="space-y-3">
                  {analytics.byAuthor.map((author) => (
                    <div key={author.name} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                          {author.name}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {author.rate}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 mb-2">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            author.rate >= 70 ? 'bg-green-500' : author.rate >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: `${author.rate}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Total: {author.count}</span>
                        <span>Approved: {author.approved}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="chat" className="px-4 py-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  AI Analysis
                </h3>

                {chatResponse && (
                  <div className="mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {chatResponse.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about proposals..."
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                    className="flex-1 min-w-0"
                  />
                  <Button onClick={handleAnalyze} disabled={isAnalyzing || !chatQuery.trim()} className="shrink-0">
                    {isAnalyzing ? '...' : 'Ask'}
                  </Button>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Success patterns?', 'Why rejected?', 'Show trends'].map((q) => (
                      <button
                        key={q}
                        onClick={() => setChatQuery(q)}
                        className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 active:bg-gray-200"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'yellow';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700',
    green: 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700',
    red: 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700',
    yellow: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700',
  };

  return (
    <div className={cn('rounded-xl border p-4', colorClasses[color])}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        <div className="rounded-full bg-white dark:bg-gray-800 p-2 shadow-sm">{icon}</div>
      </div>
    </div>
  );
}
