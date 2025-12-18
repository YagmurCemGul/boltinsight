'use client';

import { useState, useMemo, DragEvent } from 'react';
import {
  Briefcase,
  FileText,
  FolderKanban,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  MoreVertical,
  Copy,
  Trash2,
  FolderInput,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle,
  AlertCircle,
  Users,
  Calendar,
  Tag,
  Plus,
  ChevronDown,
  ChevronRight,
  Share2,
  GripVertical,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import {
  Button,
  Card,
  CardContent,
  Badge,
  Input,
  Select,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  toast,
  MoveToProjectModal,
} from '@/components/ui';
import { cn, formatDate, getStatusColor, getStatusLabel, truncateText } from '@/lib/utils';
import type { Proposal, ProposalStatus } from '@/types';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending_approval', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'on_hold', label: 'On Hold' },
];

const sortOptions = [
  { value: 'updatedAt-desc', label: 'Recently Updated' },
  { value: 'updatedAt-asc', label: 'Oldest Updated' },
  { value: 'createdAt-desc', label: 'Recently Created' },
  { value: 'createdAt-asc', label: 'Oldest Created' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
];

const ownershipOptions = [
  { value: 'all', label: 'All Proposals' },
  { value: 'mine', label: 'My Proposals' },
  { value: 'shared', label: 'Shared with Me' },
];

function getStatusIcon(status: ProposalStatus) {
  switch (status) {
    case 'approved':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'pending_approval':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'on_hold':
      return <PauseCircle className="h-4 w-4 text-blue-500" />;
    case 'draft':
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
    default:
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
}

interface ProposalCardProps {
  proposal: Proposal;
  onClick: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onMove: () => void;
  isOwner: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>, proposal: Proposal) => void;
  onDragEnd: () => void;
  isDragging?: boolean;
}

function ProposalCard({ proposal, onClick, onCopy, onDelete, onMove, isOwner, onDragStart, onDragEnd, isDragging }: ProposalCardProps) {
  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md hover:ring-1 hover:ring-[#5B50BD]/20 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 ring-2 ring-[#5B50BD] shadow-lg"
      )}
      draggable
      onDragStart={(e) => onDragStart(e, proposal)}
      onDragEnd={onDragEnd}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-shrink-0 text-gray-300 dark:text-gray-600">
            <GripVertical className="h-4 w-4" />
          </div>
          <button onClick={onClick} className="flex-1 text-left min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-[#5B50BD] dark:text-[#918AD3]">
                {proposal.code || 'Draft'}
              </span>
              <Badge variant="default" className={cn('text-[10px]', getStatusColor(proposal.status))}>
                {getStatusLabel(proposal.status)}
              </Badge>
              {!isOwner && (
                <Badge variant="custom" className="text-[10px] border border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-gray-400">
                  <Share2 className="h-2.5 w-2.5 mr-1" />
                  Shared
                </Badge>
              )}
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {proposal.content.title || 'Untitled Proposal'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
              {proposal.content.client || 'No client'}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(proposal.updatedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {proposal.author.name}
              </span>
            </div>
          </button>
          <Dropdown
            trigger={
              <button className="flex-shrink-0 rounded p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            }
            align="right"
          >
            <DropdownItem onClick={onClick}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownItem>
            <DropdownItem onClick={onCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownItem>
            <DropdownItem onClick={onMove}>
              <FolderInput className="mr-2 h-4 w-4" />
              Move to Project
            </DropdownItem>
            {isOwner && (
              <>
                <DropdownSeparator />
                <DropdownItem variant="destructive" onClick={onDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownItem>
              </>
            )}
          </Dropdown>
        </div>
      </CardContent>
    </Card>
  );
}

export function Workspace() {
  const {
    proposals,
    projects,
    currentUser,
    setCurrentProposal,
    setActiveSection,
    addProposal,
    deleteProposal,
    moveProposalToProject,
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt-desc');
  const [ownershipFilter, setOwnershipFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<{ id: string; title: string } | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [draggingProposalId, setDraggingProposalId] = useState<string | null>(null);
  const [dragOverProjectId, setDragOverProjectId] = useState<string | null>(null);

  // Filter and sort proposals
  const filteredProposals = useMemo(() => {
    let filtered = proposals.filter((p) => p.status !== 'deleted');

    // Ownership filter
    if (ownershipFilter === 'mine') {
      filtered = filtered.filter((p) => p.author.id === currentUser.id);
    } else if (ownershipFilter === 'shared') {
      filtered = filtered.filter(
        (p) => p.author.id !== currentUser.id && p.collaborators?.some((c) => c.id === currentUser.id)
      );
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.content.title?.toLowerCase().includes(query) ||
          p.content.client?.toLowerCase().includes(query) ||
          p.code?.toLowerCase().includes(query) ||
          p.author.name.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // Sort
    const [sortField, sortDirection] = sortBy.split('-');
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'title') {
        comparison = (a.content.title || '').localeCompare(b.content.title || '');
      } else if (sortField === 'updatedAt') {
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      } else if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [proposals, currentUser.id, searchQuery, statusFilter, sortBy, ownershipFilter]);

  // Stats
  const stats = useMemo(() => {
    const active = proposals.filter((p) => p.status !== 'deleted');
    const mine = active.filter((p) => p.author.id === currentUser.id);
    return {
      total: active.length,
      mine: mine.length,
      approved: mine.filter((p) => p.status === 'approved').length,
      pending: mine.filter((p) => p.status === 'pending_approval').length,
      drafts: mine.filter((p) => p.status === 'draft').length,
    };
  }, [proposals, currentUser.id]);

  const handleProposalClick = (proposal: Proposal) => {
    setCurrentProposal(proposal);
    setActiveSection('view-proposal');
  };

  const handleCopyProposal = (proposal: Proposal) => {
    addProposal({
      ...proposal,
      status: 'draft',
      code: undefined,
      content: {
        ...proposal.content,
        title: `${proposal.content.title} (Copy)`,
      },
      author: currentUser,
      sentToClient: false,
      approvalHistory: [],
      comments: [],
      collaborators: [],
    });
    toast.success('Proposal duplicated');
  };

  const handleDeleteProposal = (proposalId: string) => {
    deleteProposal(proposalId);
    toast.success('Proposal deleted');
  };

  const handleMoveProposal = (proposal: Proposal) => {
    setSelectedProposal({ id: proposal.id, title: proposal.content.title || 'Untitled' });
    setMoveModalOpen(true);
  };

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  // Drag & Drop handlers
  const handleDragStart = (e: DragEvent<HTMLDivElement>, proposal: Proposal) => {
    setDraggingProposalId(proposal.id);
    e.dataTransfer.setData('proposalId', proposal.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggingProposalId(null);
    setDragOverProjectId(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, projectId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverProjectId(projectId);
  };

  const handleDragLeave = () => {
    setDragOverProjectId(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, projectId: string) => {
    e.preventDefault();
    const proposalId = e.dataTransfer.getData('proposalId');

    if (proposalId && projectId) {
      moveProposalToProject(proposalId, projectId);
      const proposal = proposals.find(p => p.id === proposalId);
      const project = projects.find(p => p.id === projectId);
      if (proposal && project) {
        toast.success(`Moved "${truncateText(proposal.content.title || 'Untitled', 20)}" to "${project.name}"`);
      }
    }

    setDraggingProposalId(null);
    setDragOverProjectId(null);
  };

  const getProjectProposals = (projectId: string) => {
    return proposals.filter(
      (p) => p.status !== 'deleted' && (p.projectId === projectId || projects.find((pr) => pr.id === projectId)?.proposals.includes(p.id))
    );
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDE9F9] dark:bg-[#231E51]">
              <Briefcase className="h-5 w-5 text-[#5B50BD] dark:text-[#918AD3]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Workspace</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage all your proposals and projects
              </p>
            </div>
          </div>
          <Button onClick={() => setActiveSection('new-proposal')}>
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Quick Stats */}
        <div className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-5">
          <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Proposals</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">My Proposals</p>
            <p className="text-xl font-bold text-[#5B50BD] dark:text-[#918AD3]">{stats.mine}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Approved</p>
            <p className="text-xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Drafts</p>
            <p className="text-xl font-bold text-gray-600">{stats.drafts}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main Content - Proposals */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search proposals by title, client, code, or author..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      options={ownershipOptions}
                      value={ownershipFilter}
                      onChange={(e) => setOwnershipFilter(e.target.value)}
                      className="w-40"
                    />
                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-44"
                    />
                    <Button
                      variant={showFilters ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <Select
                          options={statusOptions}
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-40"
                        />
                      </div>
                      {(statusFilter || searchQuery) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setStatusFilter('');
                            setSearchQuery('');
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredProposals.length} {filteredProposals.length === 1 ? 'proposal' : 'proposals'} found
              </p>
            </div>

            {/* Proposals Grid */}
            {filteredProposals.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredProposals.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    onClick={() => handleProposalClick(proposal)}
                    onCopy={() => handleCopyProposal(proposal)}
                    onDelete={() => handleDeleteProposal(proposal.id)}
                    onMove={() => handleMoveProposal(proposal)}
                    isOwner={proposal.author.id === currentUser.id}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isDragging={draggingProposalId === proposal.id}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {searchQuery || statusFilter ? 'No proposals match your filters' : 'No proposals yet'}
                  </p>
                  <Button onClick={() => setActiveSection('new-proposal')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Proposal
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Projects */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-gray-500" />
                    <h2 className="font-semibold text-gray-900 dark:text-white">Projects</h2>
                  </div>
                  <Badge variant="default" className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {projects.length}
                  </Badge>
                </div>

                {projects.length > 0 ? (
                  <div className="space-y-2">
                    {projects.map((project) => {
                      const projectProposals = getProjectProposals(project.id);
                      const isExpanded = expandedProjects.includes(project.id);
                      const isDragOver = dragOverProjectId === project.id;

                      return (
                        <div
                          key={project.id}
                          className={cn(
                            "rounded-lg border transition-all",
                            isDragOver
                              ? "border-[#5B50BD] bg-[#EDE9F9] dark:bg-[#231E51] ring-2 ring-[#5B50BD]/50"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                          onDragOver={(e) => handleDragOver(e, project.id)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, project.id)}
                        >
                          <button
                            onClick={() => toggleProjectExpand(project.id)}
                            className="flex w-full items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              )}
                              <span className={cn(
                                "text-sm font-medium",
                                isDragOver ? "text-[#5B50BD] dark:text-[#918AD3]" : "text-gray-900 dark:text-white"
                              )}>
                                {project.name}
                              </span>
                            </div>
                            <Badge variant="custom" className={cn(
                              "text-xs border bg-transparent",
                              isDragOver
                                ? "border-[#5B50BD] text-[#5B50BD] dark:text-[#918AD3]"
                                : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                            )}>
                              {projectProposals.length}
                            </Badge>
                          </button>

                          {isExpanded && projectProposals.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 p-2">
                              {projectProposals.slice(0, 5).map((proposal) => (
                                <button
                                  key={proposal.id}
                                  onClick={() => handleProposalClick(proposal)}
                                  className="flex w-full items-center gap-2 p-2 text-left rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  {getStatusIcon(proposal.status)}
                                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate flex-1">
                                    {truncateText(proposal.content.title || 'Untitled', 25)}
                                  </span>
                                </button>
                              ))}
                              {projectProposals.length > 5 && (
                                <p className="text-xs text-gray-500 text-center py-1">
                                  +{projectProposals.length - 5} more
                                </p>
                              )}
                            </div>
                          )}

                          {isExpanded && projectProposals.length === 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                              <p className="text-xs text-gray-500 text-center">No proposals in this project</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                    No projects yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Tips</h3>
                <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5B50BD]">•</span>
                    Drag proposals and drop them into projects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5B50BD]">•</span>
                    Use filters to find specific proposals quickly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5B50BD]">•</span>
                    Duplicate proposals to reuse content
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Move to Project Modal */}
      {selectedProposal && (
        <MoveToProjectModal
          isOpen={moveModalOpen}
          onClose={() => {
            setMoveModalOpen(false);
            setSelectedProposal(null);
          }}
          proposalId={selectedProposal.id}
          proposalTitle={selectedProposal.title}
        />
      )}
    </div>
  );
}
