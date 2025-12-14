'use client';

import { useState } from 'react';
import { FileText, MoreVertical, Copy, Trash2, FolderInput } from 'lucide-react';
import { cn, formatDate, getStatusColor, truncateText } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Badge, Dropdown, DropdownItem, DropdownSeparator, Modal, Select, Button } from '@/components/ui';

export function HistoryList() {
  const {
    proposals,
    projects,
    setCurrentProposal,
    setActiveSection,
    deleteProposal,
    moveProposalToProject,
    addProposal,
    currentUser,
  } = useAppStore();

  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [targetProject, setTargetProject] = useState('');

  // Filter out deleted proposals and sort by date
  const visibleProposals = proposals
    .filter((p) => p.status !== 'deleted')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleProposalClick = (proposal: typeof proposals[0]) => {
    setCurrentProposal(proposal);
    setActiveSection('view-proposal');
  };

  const handleCopy = (proposal: typeof proposals[0]) => {
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
  };

  const handleDelete = (proposalId: string) => {
    if (confirm('Are you sure you want to delete this proposal?')) {
      deleteProposal(proposalId);
    }
  };

  const openMoveModal = (proposalId: string) => {
    setSelectedProposal(proposalId);
    setTargetProject('');
    setMoveModalOpen(true);
  };

  const handleMove = () => {
    if (selectedProposal && targetProject) {
      moveProposalToProject(selectedProposal, targetProject);
      setMoveModalOpen(false);
      setSelectedProposal(null);
      setTargetProject('');
    }
  };

  const getStatusBadge = (proposal: typeof proposals[0]) => {
    if (proposal.sentToClient && proposal.code) {
      return (
        <span className="text-xs font-medium text-blue-600">{proposal.code}</span>
      );
    }
    return (
      <span className="text-xs font-medium text-gray-400">Draft</span>
    );
  };

  return (
    <div className="space-y-1 px-2">
      {visibleProposals.length === 0 ? (
        <p className="py-4 text-center text-xs text-gray-400">No proposals yet</p>
      ) : (
        visibleProposals.map((proposal) => (
          <div
            key={proposal.id}
            className="group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
          >
            <button
              onClick={() => handleProposalClick(proposal)}
              className="flex flex-1 items-start gap-2 text-left"
            >
              <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  {getStatusBadge(proposal)}
                  <span className={cn(
                    'rounded px-1.5 py-0.5 text-[10px]',
                    getStatusColor(proposal.status)
                  )}>
                    {proposal.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="truncate text-sm text-gray-700">
                  {truncateText(proposal.content.title || 'Untitled Proposal', 30)}
                </p>
                <p className="text-[10px] text-gray-400">
                  {proposal.content.client || 'No client'} - {formatDate(proposal.updatedAt)}
                </p>
              </div>
            </button>

            <Dropdown
              trigger={
                <button className="rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-200 hover:text-gray-600 group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              }
              align="right"
            >
              <DropdownItem onClick={() => handleCopy(proposal)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownItem>
              <DropdownItem onClick={() => openMoveModal(proposal.id)}>
                <FolderInput className="mr-2 h-4 w-4" />
                Move to Project
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem
                variant="destructive"
                onClick={() => handleDelete(proposal.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        ))
      )}

      {/* Move to Project Modal */}
      <Modal
        isOpen={moveModalOpen}
        onClose={() => setMoveModalOpen(false)}
        title="Move to Project"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Select Project
            </label>
            <Select
              options={projects.map((p) => ({ value: p.id, label: p.name }))}
              value={targetProject}
              onChange={(e) => setTargetProject(e.target.value)}
              placeholder="Choose a project"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setMoveModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMove} disabled={!targetProject}>
              Move
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
