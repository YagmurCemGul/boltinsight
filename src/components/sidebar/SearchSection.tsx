'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Tag, X, User, Users, UserCheck, MoreVertical, Copy, Trash2, FileText, FolderInput, ExternalLink, Plus } from 'lucide-react';
import { Input, Badge, Select, Dropdown, DropdownItem, DropdownSeparator, toast, MoveToProjectModal } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { cn, formatDate, getStatusLabel, truncateText } from '@/lib/utils';
import type { Proposal, LibraryItem } from '@/types';

interface SearchSectionProps {
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

export function SearchSection({ searchAll }: SearchSectionProps) {
  const { proposals, libraryItems, currentUser, setCurrentProposal, setActiveSection, deleteProposal, addProposal, deleteLibraryItem } = useAppStore();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [ownershipFilter, setOwnershipFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState(''); // 'proposals' | 'templates' | ''
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
  const proposalResults = useMemo(() => {
    if (searchAll && typeFilter === 'templates') return [];

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
  }, [proposals, currentUser.id, searchAll, query, statusFilter, dateFilter, ownershipFilter, typeFilter]);

  // Filter templates (only for searchAll mode)
  const templateResults = useMemo(() => {
    if (!searchAll || typeFilter === 'proposals') return [];

    let filtered = libraryItems.filter(item => item.category === 'template');

    // Apply text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Apply date filter
    if (dateFilter) {
      const days = parseInt(dateFilter);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(item => new Date(item.createdAt) >= cutoffDate);
    }

    // Sort by most recent
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [libraryItems, searchAll, query, dateFilter, typeFilter]);

  // Handle using a template
  const handleUseTemplate = (template: LibraryItem) => {
    const newProposal = addProposal({
      status: 'draft',
      content: {
        title: `New from ${template.name}`,
        client: '',
      },
      author: currentUser,
    });
    setCurrentProposal(newProposal);
    setActiveSection('view-proposal');
    toast.success('New proposal created from template');
  };

  const handleResultClick = (proposal: Proposal) => {
    setCurrentProposal(proposal);
    setActiveSection('view-proposal');
  };

  const clearFilters = () => {
    setQuery('');
    setStatusFilter('');
    setDateFilter('');
    setOwnershipFilter('');
    setTypeFilter('');
  };

  // Calculate counts for the mode indicator
  const myProposalsCount = proposals.filter(p => p.status !== 'deleted' && p.author.id === currentUser.id).length;
  const allProposalsCount = proposals.filter(p => p.status !== 'deleted').length;
  const templatesCount = libraryItems.filter(item => item.category === 'template').length;

  // Total results count
  const totalResults = proposalResults.length + templateResults.length;

  return (
    <div className="space-y-3">
      {/* Mode Indicator */}
      <div className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium',
        searchAll
          ? 'bg-[#1ED6BB]/10 dark:bg-[#1ED6BB]/20 text-[#0E6B5D] dark:text-[#1ED6BB] border border-[#1ED6BB]/30 dark:border-[#1ED6BB]/40'
          : 'bg-[#EDE9F9] dark:bg-[#231E51] text-[#5B50BD] dark:text-[#918AD3] border border-[#C8C4E9] dark:border-[#5B50BD]'
      )}>
        {searchAll ? (
          <>
            <Users className="h-4 w-4" />
            <span>All ({allProposalsCount} proposals, {templatesCount} templates)</span>
          </>
        ) : (
          <>
            <UserCheck className="h-4 w-4" />
            <span>My Proposals ({myProposalsCount})</span>
          </>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder={searchAll ? 'Search by title, client, code, author...' : 'Search by title, client, code...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-10"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors',
            showFilters ? 'bg-[#EDE9F9] dark:bg-[#231E51] text-[#5B50BD] dark:text-[#918AD3]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
          )}
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-2 rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Filters</span>
            {(statusFilter || dateFilter || ownershipFilter || typeFilter) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-[#5B50BD] dark:text-[#918AD3] hover:text-[#4A41A0] dark:hover:text-[#C8C4E9]"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>

          <div className="grid gap-2">
            {/* Type filter - only show in "All" mode */}
            {searchAll && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <Select
                  options={[
                    { value: '', label: 'All Types' },
                    { value: 'proposals', label: 'Proposals Only' },
                    { value: 'templates', label: 'Templates Only' },
                  ]}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="flex-1 text-xs"
                />
              </div>
            )}

            {/* Author filter - only show in "All" mode and when not filtering templates only */}
            {searchAll && typeFilter !== 'templates' && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <Select
                  options={ownershipOptions}
                  value={ownershipFilter}
                  onChange={(e) => setOwnershipFilter(e.target.value)}
                  className="flex-1 text-xs"
                />
              </div>
            )}

            {/* Status filter - only show when not filtering templates only */}
            {typeFilter !== 'templates' && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 text-xs"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <Select
                options={[
                  { value: '', label: 'Any Time' },
                  { value: '7', label: 'Last 7 Days' },
                  { value: '30', label: 'Last 30 Days' },
                  { value: '90', label: 'Last 90 Days' },
                ]}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="flex-1 text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {searchAll ? (
            <>
              {totalResults} {totalResults === 1 ? 'result' : 'results'} {query || statusFilter || dateFilter || ownershipFilter || typeFilter ? 'found' : ''}
              {typeFilter === '' && ` (${proposalResults.length} proposals, ${templateResults.length} templates)`}
            </>
          ) : (
            <>{proposalResults.length} {proposalResults.length === 1 ? 'proposal' : 'proposals'} {query || statusFilter || dateFilter ? 'found' : ''}</>
          )}
        </p>

        {totalResults > 0 || (!searchAll && proposalResults.length > 0) ? (
          <div className="max-h-60 space-y-1 overflow-y-auto">
            {/* Proposals */}
            {proposalResults.map((proposal) => (
              <div
                key={proposal.id}
                className={cn(
                  'group flex items-start gap-2 rounded-lg p-2 transition-colors',
                  'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <button
                  onClick={() => handleResultClick(proposal)}
                  className="flex flex-1 items-start gap-2 text-left min-w-0"
                >
                  <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-[#5B50BD] dark:text-[#918AD3]">
                        {proposal.code || 'Draft'}
                      </span>
                      <Badge status={proposal.status as 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'on_hold' | 'deleted'} className="text-[10px] px-1.5 py-0.5 whitespace-nowrap">
                        {getStatusLabel(proposal.status)}
                      </Badge>
                    </div>
                    <p className="truncate text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                      {truncateText(proposal.content.title || 'Untitled', 25)}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {proposal.content.client || 'No client'} - {formatDate(proposal.createdAt)}
                    </p>
                  </div>
                </button>
                <Dropdown
                  trigger={
                    <button className="flex-shrink-0 rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-200 dark:hover:bg-gray-600 group-hover:opacity-100">
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
                    Move
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
            ))}

            {/* Templates - only in searchAll mode */}
            {searchAll && templateResults.map((template) => (
              <div
                key={template.id}
                className={cn(
                  'group flex items-start gap-2 rounded-lg p-2 transition-colors',
                  'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <a
                  href={template.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-start gap-2 text-left min-w-0"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        Template
                      </span>
                    </div>
                    <p className="truncate text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                      {truncateText(template.name, 25)}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {template.description || 'No description'} - {formatDate(template.createdAt)}
                    </p>
                  </div>
                </a>
                <Dropdown
                  trigger={
                    <button className="flex-shrink-0 rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-200 dark:hover:bg-gray-600 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  }
                  align="right"
                >
                  <DropdownItem onClick={() => handleUseTemplate(template)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Use Template
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem
                    variant="destructive"
                    onClick={() => {
                      deleteLibraryItem(template.id);
                      toast.success('Template deleted');
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownItem>
                </Dropdown>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-4">
            {searchAll
              ? (typeFilter === 'templates' ? 'No templates found' : typeFilter === 'proposals' ? 'No proposals found' : 'No results found')
              : 'You have no proposals yet'}
          </p>
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
