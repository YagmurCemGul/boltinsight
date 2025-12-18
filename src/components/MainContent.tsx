'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Sidebar } from '@/components/sidebar';
import { ChatInterface } from '@/components/chat';
import { ProposalEditor, RightSidebar } from '@/components/proposal';
import { MetaLearnings } from '@/components/meta-learnings';
import { Calculators, DemographicDistribution, FeasibilityCheck, SearchView } from '@/components/tools';
import { Library } from '@/components/library';
import { Architecture } from '@/components/architecture';
import { Dashboard } from '@/components/dashboard';
import { Workspace } from '@/components/workspace';
import { cn, getStatusColor } from '@/lib/utils';
import type { Proposal, ProposalContent } from '@/types';

export function MainContent() {
  const {
    activeSection,
    sidebarOpen,
    sidebarCollapsed,
    rightSidebarCollapsed,
    setRightSidebarCollapsed,
    currentProposal,
    setCurrentProposal,
    addProposal,
    updateProposal,
    currentUser,
    clearChat,
  } = useAppStore();

  const [proposalMode, setProposalMode] = useState<'chat' | 'editor'>('chat');
  const [workingProposal, setWorkingProposal] = useState<Proposal | null>(null);
  const [activeSidebarSection, setActiveSidebarSection] = useState<string | undefined>();

  // Get current proposal content for RightSidebar
  const currentProposalContent: ProposalContent = workingProposal?.content || {
    title: '',
    client: '',
  };

  // Create new proposal when starting from chat
  const handleStartNewProposal = () => {
    clearChat();
    setProposalMode('chat');
    setWorkingProposal(null);
  };

  // Switch to editor mode with current proposal
  const handleSwitchToEditor = () => {
    if (!workingProposal) {
      // Create a new draft proposal
      const newProposal = addProposal({
        status: 'draft',
        content: {
          title: '',
          client: '',
        },
        author: currentUser,
      });
      setWorkingProposal(newProposal);
    }
    setProposalMode('editor');
  };

  // Save proposal from editor
  const handleSaveProposal = (content: ProposalContent) => {
    if (workingProposal) {
      updateProposal(workingProposal.id, { content });
      setWorkingProposal({ ...workingProposal, content });
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'new-proposal':
        return (
          <div className="flex h-full overflow-hidden">
            {/* Main Content Area */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
              {/* Mode Toggle */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    {proposalMode === 'chat' ? 'Create New Proposal' : 'Edit Proposal'}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {proposalMode === 'chat'
                      ? 'Start a conversation to build your proposal'
                      : 'Edit and refine your proposal content'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setProposalMode('chat')}
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                      proposalMode === 'chat'
                        ? 'bg-[#5B50BD] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    )}
                  >
                    Chat Mode
                  </button>
                  <button
                    onClick={handleSwitchToEditor}
                    className={cn(
                      'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                      proposalMode === 'editor'
                        ? 'bg-[#5B50BD] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    )}
                  >
                    Editor Mode
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {proposalMode === 'chat' ? (
                  <ChatInterface />
                ) : workingProposal ? (
                  <ProposalEditor
                    proposal={workingProposal}
                    onSave={handleSaveProposal}
                    externalActiveSection={activeSidebarSection}
                    onSectionChange={setActiveSidebarSection}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-gray-500">Loading...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <RightSidebar
              content={currentProposalContent}
              activeSection={activeSidebarSection}
              onSectionClick={setActiveSidebarSection}
              collapsed={rightSidebarCollapsed}
              onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
            />
          </div>
        );

      case 'view-proposal':
        return currentProposal ? (
          <div className="flex h-full overflow-hidden">
            <div className="flex-1 min-w-0 overflow-hidden">
              <ProposalEditor
                proposal={currentProposal}
                onSave={(content) => updateProposal(currentProposal.id, { content })}
                externalActiveSection={activeSidebarSection}
                onSectionChange={setActiveSidebarSection}
              />
            </div>
            <RightSidebar
              content={currentProposal.content}
              activeSection={activeSidebarSection}
              onSectionClick={setActiveSidebarSection}
              collapsed={rightSidebarCollapsed}
              onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
            />
          </div>
        ) : (
          <EmptyState message="Select a proposal to view" />
        );

      case 'meta-learnings':
        return <MetaLearnings />;

      case 'calculators':
        return <Calculators />;

      case 'demographics':
        return <DemographicDistribution />;

      case 'feasibility':
        return <FeasibilityCheck />;

      case 'library':
        return <Library />;

      case 'architecture':
        return <Architecture />;

      case 'dashboard':
        return <Dashboard />;

      case 'workspace':
        return <Workspace />;

      case 'search-my':
        return <SearchView searchAll={false} />;

      case 'search-all':
        return <SearchView searchAll={true} />;

      default:
        // Handle project views
        if (activeSection.startsWith('project-')) {
          return <ProjectView projectId={activeSection.replace('project-', '')} />;
        }

        // Default to Dashboard as the landing page
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content Area */}
      <main
        className={cn(
          'flex-1 transition-all duration-200',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        )}
      >
        <div className="h-full overflow-hidden">{renderContent()}</div>
      </main>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}

function ProjectView({ projectId }: { projectId: string }) {
  const { projects, proposals, setCurrentProposal, setActiveSection } = useAppStore();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <EmptyState message="Project not found" />;
  }

  const projectProposals = proposals.filter(
    (p) => p.projectId === projectId || project.proposals.includes(p.id)
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
        {project.description && (
          <p className="mt-1 text-sm text-gray-500">{project.description}</p>
        )}
        {project.client && (
          <p className="mt-1 text-sm text-gray-500">Client: {project.client}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectProposals.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No proposals in this project yet
          </p>
        ) : (
          projectProposals.map((proposal) => (
            <button
              key={proposal.id}
              onClick={() => {
                setCurrentProposal(proposal);
                setActiveSection('view-proposal');
              }}
              className="rounded-lg border border-gray-200 bg-white p-4 text-left transition-shadow hover:shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-[#5B50BD] dark:text-[#918AD3]">
                  {proposal.code || 'Draft'}
                </span>
                <span
                  className={cn(
                    'rounded px-2 py-0.5 text-xs font-medium',
                    getStatusColor(proposal.status)
                  )}
                >
                  {proposal.status.replace('_', ' ')}
                </span>
              </div>
              <h3 className="font-medium text-gray-900">
                {proposal.content.title || 'Untitled Proposal'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {proposal.content.client || 'No client'}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
