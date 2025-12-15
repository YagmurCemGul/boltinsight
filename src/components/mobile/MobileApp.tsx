'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { MobileNavigation } from './MobileNavigation';
import { MobileSidebar } from './MobileSidebar';
import { MobileHeader } from './MobileHeader';
import { MobileLoginScreen } from './MobileLoginScreen';
import { MobileChatInterface } from './MobileChatInterface';
import { MobileProposalEditor } from './MobileProposalEditor';
import { MobileMetaLearnings } from './MobileMetaLearnings';
import { MobileLibrary } from './MobileLibrary';
import { MobileSearch } from './MobileSearch';
import { MobileMOECalculator, MobileDemographics, MobileFeasibility } from './MobileTools';

export function MobileApp() {
  const { isLoggedIn, activeSection, setActiveSection, currentProposal } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'chat' | 'editor'>('chat');

  // If not logged in, show login screen
  if (!isLoggedIn) {
    return <MobileLoginScreen />;
  }

  // Determine if we need back button and which section we're in
  const needsBackButton = ['view-proposal', 'moe-calculator', 'demographics', 'feasibility'].includes(activeSection) ||
    activeSection.startsWith('project-');

  const handleBack = () => {
    if (activeSection === 'view-proposal') {
      setActiveSection('library');
    } else if (activeSection.startsWith('project-')) {
      setActiveSection('library');
    } else {
      setActiveSection('new-proposal');
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'new-proposal':
        if (editorMode === 'chat') {
          return <MobileChatInterface onSwitchToEditor={() => setEditorMode('editor')} />;
        }
        return <MobileProposalEditor />;

      case 'view-proposal':
        return <MobileProposalEditor />;

      case 'search-my':
        return <MobileSearch mode="my" />;

      case 'search-all':
        return <MobileSearch mode="all" />;

      case 'meta-learnings':
        return <MobileMetaLearnings />;

      case 'moe-calculator':
        return <MobileMOECalculator />;

      case 'demographics':
        return <MobileDemographics />;

      case 'feasibility':
        return <MobileFeasibility />;

      case 'library':
        return <MobileLibrary />;

      default:
        if (activeSection.startsWith('project-')) {
          return <MobileLibrary />;
        }
        // Default to chat interface
        return <MobileChatInterface onSwitchToEditor={() => setEditorMode('editor')} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <MobileHeader
        onOpenMenu={() => setSidebarOpen(true)}
        showBack={needsBackButton}
        onBack={handleBack}
        showSearch={activeSection === 'search-my' || activeSection === 'search-all'}
      />

      {/* Mobile Sidebar (Slide-out menu) */}
      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden pt-14 pb-16">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <MobileNavigation onOpenMenu={() => setSidebarOpen(true)} />
    </div>
  );
}
