'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Calendar, Tag, X, User, Users, UserCheck } from 'lucide-react';
import { Input, Badge, Select } from '@/components/ui';
import { useAppStore } from '@/lib/store';
import { cn, formatDate, getStatusColor, getStatusLabel, truncateText } from '@/lib/utils';
import type { ProposalStatus } from '@/types';

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
  const { proposals, currentUser, setCurrentProposal, setActiveSection } = useAppStore();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [ownershipFilter, setOwnershipFilter] = useState('');

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

  // Calculate counts for the mode indicator
  const myProposalsCount = proposals.filter(p => p.status !== 'deleted' && p.author.id === currentUser.id).length;
  const allProposalsCount = proposals.filter(p => p.status !== 'deleted').length;

  return (
    <div className="space-y-3">
      {/* Mode Indicator */}
      <div className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium',
        searchAll
          ? 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
          : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
      )}>
        {searchAll ? (
          <>
            <Users className="h-4 w-4" />
            <span>All Proposals ({allProposalsCount})</span>
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
            showFilters ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
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
            {(statusFilter || dateFilter || ownershipFilter) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>

          <div className="grid gap-2">
            {/* Author filter - only show in "All Proposals" mode */}
            {searchAll && (
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

            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 text-xs"
              />
            </div>

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
          {results.length} {results.length === 1 ? 'proposal' : 'proposals'} {query || statusFilter || dateFilter || ownershipFilter ? 'found' : ''}
        </p>

        {results.length > 0 ? (
          <div className="max-h-60 space-y-1 overflow-y-auto">
            {results.map((proposal) => (
              <button
                key={proposal.id}
                onClick={() => handleResultClick(proposal)}
                className={cn(
                  'flex w-full flex-col items-start gap-1 rounded-lg p-2 text-left transition-colors',
                  'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {proposal.code || 'Draft'}
                  </span>
                  <span className={cn('rounded px-1.5 py-0.5 text-[10px]', getStatusColor(proposal.status))}>
                    {getStatusLabel(proposal.status)}
                  </span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {truncateText(proposal.content.title || 'Untitled', 35)}
                </span>
                <div className="flex w-full items-center justify-between">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">
                    {proposal.content.client} - {formatDate(proposal.createdAt)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-4">
            {searchAll ? 'No proposals found in the system' : 'You have no proposals yet'}
          </p>
        )}
      </div>
    </div>
  );
}
