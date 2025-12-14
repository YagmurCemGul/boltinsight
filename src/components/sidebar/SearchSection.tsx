'use client';

import { useState } from 'react';
import { Search, Filter, Calendar, Tag, X } from 'lucide-react';
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

export function SearchSection({ searchAll }: SearchSectionProps) {
  const { searchProposals, setCurrentProposal, setActiveSection } = useAppStore();
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchProposals>>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    let searchResults = searchProposals(query, searchAll);

    // Apply status filter
    if (statusFilter) {
      searchResults = searchResults.filter((p) => p.status === statusFilter);
    }

    // Apply date filter (last 7, 30, 90 days)
    if (dateFilter) {
      const days = parseInt(dateFilter);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      searchResults = searchResults.filter((p) => new Date(p.createdAt) >= cutoffDate);
    }

    setResults(searchResults);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (proposal: ReturnType<typeof searchProposals>[0]) => {
    setCurrentProposal(proposal);
    setActiveSection('view-proposal');
  };

  const clearFilters = () => {
    setStatusFilter('');
    setDateFilter('');
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder={searchAll ? 'Search all proposals...' : 'Search my proposals...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-9 pr-10"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition-colors',
            showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
          )}
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-2 rounded-lg bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Filters</span>
            {(statusFilter || dateFilter) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>

          <div className="grid gap-2">
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

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
      >
        Search
      </button>

      {/* Results */}
      {hasSearched && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>

          {results.length > 0 ? (
            <div className="max-h-60 space-y-1 overflow-y-auto">
              {results.map((proposal) => (
                <button
                  key={proposal.id}
                  onClick={() => handleResultClick(proposal)}
                  className="flex w-full flex-col items-start gap-1 rounded-lg bg-white p-2 text-left transition-colors hover:bg-gray-50"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs font-medium text-gray-900">
                      {proposal.code || 'Draft'}
                    </span>
                    <span className={cn('rounded px-1.5 py-0.5 text-[10px]', getStatusColor(proposal.status))}>
                      {getStatusLabel(proposal.status)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    {truncateText(proposal.content.title || 'Untitled', 35)}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {proposal.content.client} - {formatDate(proposal.createdAt)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-gray-400">No proposals found</p>
          )}
        </div>
      )}
    </div>
  );
}
