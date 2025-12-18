'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Tag, X, User, Users, UserCheck, MoreVertical, Copy, Trash2, FileText, FolderInput, Grid3X3, List } from 'lucide-react';
import { Input, Badge, Select, Card, CardHeader, CardTitle, CardContent, Dropdown, DropdownItem, DropdownSeparator, toast, MoveToProjectModal } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { cn, formatDate, getStatusColor, getStatusLabel, truncateText } from '@/lib/utils';
import type { ProposalStatus, Proposal } from '@/types';

interface SearchViewProps {
  searchAll: boolean;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending_approval', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'on_hold', label: 'On Hold' },
];

const ownershipOptions = [
  { value: '', label: 'All Authors' },
  { value: 'mine', label: 'Created by Me' },
  { value: 'others', label: 'Created by Others' },
];

export function SearchView({ searchAll }: SearchViewProps) {
  const { proposals, currentUser, setCurrentProposal, setActiveSection, deleteProposal, addProposal } = useAppStore();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [ownershipFilter, setOwnershipFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<{ id: string; title: string } | null>(null);

  const handleMoveProposal = (proposal: Proposal) => {
    setSelectedProposal({ id: proposal.id, title: proposal.content.title || 'Untitled' });
    setMoveModalOpen(true);
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

  // Filter proposals based on search criteria
  const results = useMemo(() => {
    let filtered = proposals.filter(p => p.status !== 'deleted');

    // For "My Proposals", filter by current user (author)
    if (!searchAll) {
      filtered = filtered.filter(p => p.author.id === currentUser.id);
    } else {
      // For "All Proposals", apply ownership filter if selected
      if (ownershipFilter === 'mine') {
        filtered = filtered.filter(p => p.author.id === currentUser.id);
      } else if (ownershipFilter === 'others') {
        filtered = filtered.filter(p => p.author.id !== currentUser.id);
      }
    }

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(p =>
        p.content.title?.toLowerCase().includes(lowerQuery) ||
        p.content.client?.toLowerCase().includes(lowerQuery) ||
        p.code?.toLowerCase().includes(lowerQuery) ||
        p.author.name?.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter) {
      const days = parseInt(dateFilter);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(p => new Date(p.createdAt) >= cutoffDate);
    }

    // Sort by most recent
    return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [proposals, currentUser.id, searchAll, query, statusFilter, dateFilter, ownershipFilter]);

  const handleResultClick = (proposal: typeof results[0]) => {
    setCurrentProposal(proposal);
    setActiveSection('view-proposal');
  };

  const clearFilters = () => {
    setQuery('');
    setStatusFilter('');
    setDateFilter('');
    setOwnershipFilter('');
  };

  // Calculate counts
  const myProposalsCount = proposals.filter(p => p.status !== 'deleted' && p.author.id === currentUser.id).length;
  const allProposalsCount = proposals.filter(p => p.status !== 'deleted').length;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {searchAll ? (
              <Users className="h-8 w-8 text-[#1ED6BB]" />
            ) : (
              <User className="h-8 w-8 text-[#5B50BD]" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {searchAll ? 'Search All Proposals' : 'Search My Proposals'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {searchAll
                  ? `Search through all ${allProposalsCount} proposals in the system`
                  : `Search through your ${myProposalsCount} proposals`}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={searchAll ? 'Search by title, client, code, author...' : 'Search by title, client, code...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12 py-3 text-base"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'absolute right-4 top-1/2 -translate-y-1/2 rounded p-1.5 transition-colors',
                  showFilters ? 'bg-[#EDE9F9] dark:bg-[#231E51] text-[#5B50BD] dark:text-[#918AD3]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                )}
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</span>
                  {(statusFilter || dateFilter || ownershipFilter) && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-sm text-[#5B50BD] dark:text-[#918AD3] hover:text-[#4A41A0] dark:hover:text-[#C8C4E9]"
                    >
                      <X className="h-4 w-4" />
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* Author filter - only show in "All Proposals" mode */}
                  {searchAll && (
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                        Author
                      </label>
                      <Select
                        options={ownershipOptions}
                        value={ownershipFilter}
                        onChange={(e) => setOwnershipFilter(e.target.value)}
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </label>
                    <Select
                      options={statusOptions}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
                      Date Range
                    </label>
                    <Select
                      options={[
                        { value: '', label: 'Any Time' },
                        { value: '7', label: 'Last 7 Days' },
                        { value: '30', label: 'Last 30 Days' },
                        { value: '90', label: 'Last 90 Days' },
                      ]}
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {results.length} {results.length === 1 ? 'proposal' : 'proposals'} {query || statusFilter || dateFilter || ownershipFilter ? 'found' : ''}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'rounded p-1.5 transition-colors',
                    viewMode === 'list' ? 'bg-[#EDE9F9] dark:bg-[#231E51] text-[#5B50BD] dark:text-[#918AD3]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  )}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'rounded p-1.5 transition-colors',
                    viewMode === 'grid' ? 'bg-[#EDE9F9] dark:bg-[#231E51] text-[#5B50BD] dark:text-[#918AD3]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  )}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 ? (
          viewMode === 'list' ? (
            <div className="space-y-3">
              {results.map((proposal) => (
                <Card
                  key={proposal.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 p-4">
                    <button
                      onClick={() => handleResultClick(proposal)}
                      className="flex flex-1 items-center gap-4 text-left min-w-0"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-medium text-[#5B50BD] dark:text-[#918AD3]">
                            {proposal.code || 'Draft'}
                          </span>
                          <span className={cn('rounded px-2 py-0.5 text-xs font-medium', getStatusColor(proposal.status))}>
                            {getStatusLabel(proposal.status)}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {proposal.content.title || 'Untitled'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {proposal.content.client || 'No client'} • {proposal.author.name} • {formatDate(proposal.updatedAt)}
                        </p>
                      </div>
                    </button>
                    <Dropdown
                      trigger={
                        <button className="flex-shrink-0 rounded p-2 text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700 group-hover:opacity-100">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      }
                      align="right"
                    >
                      <DropdownItem onClick={() => handleCopyProposal(proposal)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownItem>
                      <DropdownItem onClick={() => handleMoveProposal(proposal)}>
                        <FolderInput className="mr-2 h-4 w-4" />
                        Move to Project
                      </DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem
                        variant="destructive"
                        onClick={() => handleDeleteProposal(proposal.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((proposal) => (
                <Card
                  key={proposal.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-[#5B50BD] dark:text-[#918AD3]">
                          {proposal.code || 'Draft'}
                        </span>
                        <span className={cn('rounded px-2 py-0.5 text-xs font-medium', getStatusColor(proposal.status))}>
                          {getStatusLabel(proposal.status)}
                        </span>
                      </div>
                      <Dropdown
                        trigger={
                          <button className="flex-shrink-0 rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        }
                        align="right"
                      >
                        <DropdownItem onClick={() => handleCopyProposal(proposal)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownItem>
                        <DropdownItem onClick={() => handleMoveProposal(proposal)}>
                          <FolderInput className="mr-2 h-4 w-4" />
                          Move to Project
                        </DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem
                          variant="destructive"
                          onClick={() => handleDeleteProposal(proposal.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                    <button
                      onClick={() => handleResultClick(proposal)}
                      className="text-left w-full"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1">
                        {proposal.content.title || 'Untitled'}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">
                        {proposal.content.client || 'No client'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <User className="h-3 w-3" />
                        <span>{proposal.author.name}</span>
                        <span>•</span>
                        <span>{formatDate(proposal.updatedAt)}</span>
                      </div>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )
        ) : (
          <Card>
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No proposals found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {searchAll ? 'No proposals match your search criteria' : 'You have no proposals yet. Create your first one!'}
              </p>
            </div>
          </Card>
        )}
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
