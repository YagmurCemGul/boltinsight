'use client';

import { useMemo } from 'react';
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  PauseCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Users,
  FolderOpen,
  Bell,
  Eye,
  Share2,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button, Card, CardContent, Badge } from '@/components/ui';
import { cn, formatDate, getStatusColor, getStatusLabel, truncateText } from '@/lib/utils';
import type { Proposal } from '@/types';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

function StatCard({ title, value, icon: Icon, color, bgColor, onClick }: StatCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]',
        onClick && 'hover:ring-2 hover:ring-[#5B50BD]/30'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', bgColor)}>
            <Icon className={cn('h-6 w-6', color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProposalRowProps {
  proposal: Proposal;
  onClick: () => void;
}

function ProposalRow({ proposal, onClick }: ProposalRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDE9F9] dark:bg-[#231E51]">
        <FileText className="h-5 w-5 text-[#5B50BD] dark:text-[#918AD3]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[#5B50BD] dark:text-[#918AD3]">
            {proposal.code || 'Draft'}
          </span>
          <Badge variant="default" className={cn('text-[10px]', getStatusColor(proposal.status))}>
            {getStatusLabel(proposal.status)}
          </Badge>
        </div>
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {truncateText(proposal.content.title || 'Untitled', 40)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {proposal.content.client || 'No client'} • {formatDate(proposal.updatedAt)}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400" />
    </button>
  );
}

interface ApprovalRequestCardProps {
  proposal: Proposal;
  onClick: () => void;
}

function ApprovalRequestCard({ proposal, onClick }: ApprovalRequestCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {truncateText(proposal.content.title || 'Untitled', 30)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {proposal.content.client} • Submitted {formatDate(proposal.updatedAt)}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Button size="sm" onClick={onClick}>
                <Eye className="mr-1 h-3 w-3" />
                Review
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  proposal: Proposal;
  action: string;
  timestamp: string;
}

function ActivityItem({ proposal, action, timestamp }: ActivityItemProps) {
  const getActionIcon = () => {
    switch (action) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending_approval':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'on_hold':
        return <PauseCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'approved':
        return 'was approved';
      case 'rejected':
        return 'was rejected';
      case 'pending_approval':
        return 'submitted for approval';
      case 'on_hold':
        return 'put on hold';
      default:
        return 'was updated';
    }
  };

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="mt-0.5">{getActionIcon()}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">{truncateText(proposal.content.title || 'Untitled', 25)}</span>{' '}
          {getActionText()}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(timestamp)}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { proposals, projects, currentUser, setActiveSection, setCurrentProposal } = useAppStore();

  // Calculate stats
  const stats = useMemo(() => {
    const active = proposals.filter((p) => p.status !== 'deleted');
    return {
      total: active.length,
      approved: active.filter((p) => p.status === 'approved').length,
      pending: active.filter((p) => p.status === 'pending_approval').length,
      rejected: active.filter((p) => p.status === 'rejected').length,
      onHold: active.filter((p) => p.status === 'on_hold').length,
      drafts: active.filter((p) => p.status === 'draft').length,
    };
  }, [proposals]);

  // Get recent proposals (sorted by updatedAt)
  const recentProposals = useMemo(() => {
    return [...proposals]
      .filter((p) => p.status !== 'deleted')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }, [proposals]);

  // Get pending approvals
  const pendingApprovals = useMemo(() => {
    return proposals
      .filter((p) => p.status === 'pending_approval')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);
  }, [proposals]);

  // Get recent activity from approval history
  const recentActivity = useMemo(() => {
    const activities: { proposal: Proposal; action: string; timestamp: string }[] = [];

    proposals.forEach((proposal) => {
      if (proposal.approvalHistory && proposal.approvalHistory.length > 0) {
        const lastAction = proposal.approvalHistory[proposal.approvalHistory.length - 1];
        activities.push({
          proposal,
          action: lastAction.action,
          timestamp: lastAction.timestamp,
        });
      }
    });

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }, [proposals]);

  // Get my proposals count
  const myProposalsCount = useMemo(() => {
    return proposals.filter((p) => p.status !== 'deleted' && p.author.id === currentUser.id).length;
  }, [proposals, currentUser.id]);

  // Get proposals shared with me (where I'm a collaborator but not the author)
  const sharedWithMe = useMemo(() => {
    return proposals
      .filter(
        (p) =>
          p.status !== 'deleted' &&
          p.author.id !== currentUser.id &&
          p.collaborators?.some((c) => c.id === currentUser.id)
      )
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [proposals, currentUser.id]);

  const handleProposalClick = (proposal: Proposal) => {
    setCurrentProposal(proposal);
    setActiveSection('view-proposal');
  };

  const handleNewProposal = () => {
    setActiveSection('new-proposal');
  };

  const handleViewAllProposals = () => {
    setActiveSection('library');
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDE9F9] dark:bg-[#231E51]">
              <LayoutDashboard className="h-5 w-5 text-[#5B50BD] dark:text-[#918AD3]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back, {currentUser.name}
              </p>
            </div>
          </div>
          <Button onClick={handleNewProposal}>
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats Grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard
            title="Total Proposals"
            value={stats.total}
            icon={FileText}
            color="text-[#5B50BD]"
            bgColor="bg-[#EDE9F9] dark:bg-[#231E51]"
            onClick={handleViewAllProposals}
          />
          <StatCard
            title="Approved"
            value={stats.approved}
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-100 dark:bg-green-900/30"
          />
          <StatCard
            title="Pending Approval"
            value={stats.pending}
            icon={Clock}
            color="text-amber-600"
            bgColor="bg-amber-100 dark:bg-amber-900/30"
          />
          <StatCard
            title="Rejected"
            value={stats.rejected}
            icon={XCircle}
            color="text-red-600"
            bgColor="bg-red-100 dark:bg-red-900/30"
          />
          <StatCard
            title="On Hold"
            value={stats.onHold}
            icon={PauseCircle}
            color="text-blue-600"
            bgColor="bg-blue-100 dark:bg-blue-900/30"
          />
          <StatCard
            title="Drafts"
            value={stats.drafts}
            icon={AlertCircle}
            color="text-gray-600"
            bgColor="bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Proposals */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <h2 className="font-semibold text-gray-900 dark:text-white">Recent Proposals</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleViewAllProposals}>
                    View All
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentProposals.length > 0 ? (
                    recentProposals.map((proposal) => (
                      <ProposalRow
                        key={proposal.id}
                        proposal={proposal}
                        onClick={() => handleProposalClick(proposal)}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <FileText className="mb-2 h-8 w-8 text-gray-300" />
                      <p className="text-sm text-gray-500">No proposals yet</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={handleNewProposal}>
                        Create your first proposal
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shared with Me */}
            {sharedWithMe.length > 0 && (
              <Card>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-[#5B50BD] dark:text-[#918AD3]" />
                      <h2 className="font-semibold text-gray-900 dark:text-white">Shared with Me</h2>
                      <Badge variant="default" className="bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]">
                        {sharedWithMe.length}
                      </Badge>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {sharedWithMe.slice(0, 5).map((proposal) => (
                      <div key={proposal.id} className="relative">
                        <ProposalRow
                          proposal={proposal}
                          onClick={() => handleProposalClick(proposal)}
                        />
                        <div className="absolute right-12 top-1/2 -translate-y-1/2">
                          <span className="text-xs text-gray-400">
                            by {proposal.author.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <h2 className="font-semibold text-gray-900 dark:text-white">Quick Stats</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">My Proposals</span>
                    <span className="font-medium text-gray-900 dark:text-white">{myProposalsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Shared with Me</span>
                    <span className="font-medium text-[#5B50BD] dark:text-[#918AD3]">{sharedWithMe.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Active Projects</span>
                    <span className="font-medium text-gray-900 dark:text-white">{projects.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Approval Rate</span>
                    <span className="font-medium text-green-600">
                      {stats.total > 0
                        ? Math.round((stats.approved / (stats.approved + stats.rejected || 1)) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            {pendingApprovals.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="h-4 w-4 text-amber-500" />
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      Pending Approvals
                    </h2>
                    <Badge variant="default" className="bg-amber-100 text-amber-700">
                      {pendingApprovals.length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {pendingApprovals.map((proposal) => (
                      <ApprovalRequestCard
                        key={proposal.id}
                        proposal={proposal}
                        onClick={() => handleProposalClick(proposal)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-gray-500" />
                  <h2 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                </div>
                {recentActivity.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {recentActivity.map((activity, index) => (
                      <ActivityItem
                        key={`${activity.proposal.id}-${index}`}
                        proposal={activity.proposal}
                        action={activity.action}
                        timestamp={activity.timestamp}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
