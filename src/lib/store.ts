'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Proposal,
  Project,
  User,
  ChatMessage,
  LibraryItem,
  MetaLearningFilter,
  ProposalStatus,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { generateProposalCode } from './utils';

// Mock current user
const currentUser: User = {
  id: 'user-1',
  name: 'Demo User',
  email: 'demo@boltinsight.com',
  role: 'researcher',
  region: 'EMEA',
};

// Initial mock data
const mockProposals: Proposal[] = [
  {
    id: 'proposal-1',
    code: 'BI-2412-0001',
    status: 'approved',
    content: {
      title: 'Brand Health Tracking Q1 2025',
      client: 'Coca-Cola',
      contact: 'John Smith',
      background: 'Annual brand health measurement study',
      businessObjectives: [
        'Measure brand awareness levels',
        'Track brand perception changes',
      ],
      researchObjectives: [
        'To understand current brand positioning',
        'To identify key purchase drivers',
      ],
      targetDefinition: 'Adults 18-45, primary grocery shoppers',
      sampleSize: 1000,
      markets: [
        { country: 'USA', language: 'English', sampleSize: 500 },
        { country: 'UK', language: 'English', sampleSize: 500 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    sentToClient: true,
    versions: [],
    approvalHistory: [
      {
        id: 'approval-1',
        action: 'approved',
        by: { ...currentUser, name: 'Manager' },
        timestamp: '2024-12-10T14:30:00Z',
      },
    ],
  },
  {
    id: 'proposal-2',
    status: 'draft',
    content: {
      title: 'Consumer Segmentation Study',
      client: 'Danone',
      background: 'Identify key consumer segments for new product launch',
      targetDefinition: 'Adults 25-54',
      sampleSize: 2000,
    },
    author: currentUser,
    createdAt: '2024-12-12T09:00:00Z',
    updatedAt: '2024-12-12T09:00:00Z',
    versions: [],
  },
  {
    id: 'proposal-3',
    code: 'BI-2412-0002',
    status: 'pending_approval',
    content: {
      title: 'Concept Testing - New Product Line',
      client: 'Nestle',
      contact: 'Sarah Johnson',
      background: 'Testing 3 new product concepts for European market',
      businessObjectives: ['Identify winning concept', 'Understand improvement areas'],
      researchObjectives: ['To evaluate concept appeal', 'To measure purchase intent'],
      targetDefinition: 'Young adults 18-35, health conscious',
      sampleSize: 1500,
      markets: [
        { country: 'Germany', language: 'German', sampleSize: 500 },
        { country: 'France', language: 'French', sampleSize: 500 },
        { country: 'Spain', language: 'Spanish', sampleSize: 500 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-13T11:00:00Z',
    updatedAt: '2024-12-14T08:00:00Z',
    versions: [],
  },
];

const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'BoltChatAI Credit Sales',
    description: 'Default project for credit sales',
    proposals: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    isDefault: true,
  },
  {
    id: 'project-2',
    name: 'Coca-Cola 2024',
    description: 'All Coca-Cola projects for 2024',
    client: 'Coca-Cola',
    proposals: ['proposal-1'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
  },
  {
    id: 'project-3',
    name: 'U&A Studies',
    description: 'Usage and Attitude research projects',
    proposals: [],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
];

const mockLibraryItems: LibraryItem[] = [
  {
    id: 'lib-1',
    name: 'Margin of Error Calculator',
    description: 'Calculate statistical margin of error for sample sizes',
    url: 'https://www.questionpro.com/margin-of-error-calculator/',
    category: 'external_link',
    tags: ['statistics', 'sample size'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'lib-2',
    name: 'Kano Model Guide',
    description: 'Understanding and applying the Kano model in research',
    url: '/resources/kano-model',
    category: 'methodology',
    tags: ['methodology', 'product research'],
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'lib-3',
    name: 'Census Data Portal',
    description: 'Access demographic data for quota calculations',
    url: 'https://data.census.gov/',
    category: 'external_link',
    tags: ['demographics', 'quota'],
    createdAt: '2024-03-01T00:00:00Z',
  },
];

interface AppState {
  // Current user
  currentUser: User;

  // Proposals
  proposals: Proposal[];
  currentProposal: Proposal | null;

  // Projects
  projects: Project[];
  currentProject: Project | null;

  // Chat
  chatMessages: ChatMessage[];
  isAiTyping: boolean;

  // Library
  libraryItems: LibraryItem[];

  // Filters
  metaLearningFilter: MetaLearningFilter;

  // UI State
  sidebarOpen: boolean;
  activeSection: string;

  // Actions
  setCurrentUser: (user: User) => void;

  // Proposal actions
  addProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt' | 'versions'>) => Proposal;
  updateProposal: (id: string, updates: Partial<Proposal>) => void;
  deleteProposal: (id: string) => void;
  setCurrentProposal: (proposal: Proposal | null) => void;
  submitForApproval: (id: string, approver: User) => void;
  updateProposalStatus: (id: string, status: ProposalStatus, comment?: string) => void;

  // Project actions
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (project: Project | null) => void;
  moveProposalToProject: (proposalId: string, projectId: string) => void;

  // Chat actions
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setAiTyping: (typing: boolean) => void;

  // Library actions
  addLibraryItem: (item: Omit<LibraryItem, 'id' | 'createdAt'>) => void;
  deleteLibraryItem: (id: string) => void;

  // Filter actions
  setMetaLearningFilter: (filter: MetaLearningFilter) => void;
  clearMetaLearningFilter: () => void;

  // UI actions
  setSidebarOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;

  // Search
  searchProposals: (query: string, searchAll: boolean) => Proposal[];
  getFilteredProposals: () => Proposal[];
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser,
      proposals: mockProposals,
      currentProposal: null,
      projects: mockProjects,
      currentProject: null,
      chatMessages: [],
      isAiTyping: false,
      libraryItems: mockLibraryItems,
      metaLearningFilter: {},
      sidebarOpen: true,
      activeSection: 'new-proposal',

      setCurrentUser: (user) => set({ currentUser: user }),

      // Proposal actions
      addProposal: (proposalData) => {
        const newProposal: Proposal = {
          ...proposalData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          versions: [],
        };
        set((state) => ({
          proposals: [...state.proposals, newProposal],
        }));
        return newProposal;
      },

      updateProposal: (id, updates) => {
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
          currentProposal:
            state.currentProposal?.id === id
              ? { ...state.currentProposal, ...updates, updatedAt: new Date().toISOString() }
              : state.currentProposal,
        }));
      },

      deleteProposal: (id) => {
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === id ? { ...p, status: 'deleted' as ProposalStatus } : p
          ),
        }));
      },

      setCurrentProposal: (proposal) => set({ currentProposal: proposal }),

      submitForApproval: (id, approver) => {
        const proposal = get().proposals.find((p) => p.id === id);
        if (!proposal) return;

        const code = proposal.code || generateProposalCode();
        const approvalRecord = {
          id: uuidv4(),
          action: 'submitted' as const,
          by: get().currentUser,
          to: approver,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === id
              ? {
                  ...p,
                  code,
                  status: 'pending_approval' as ProposalStatus,
                  approvalHistory: [...(p.approvalHistory || []), approvalRecord],
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      updateProposalStatus: (id, status, comment) => {
        const approvalRecord = {
          id: uuidv4(),
          action: status as 'approved' | 'rejected' | 'on_hold',
          by: get().currentUser,
          comment,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status,
                  approvalHistory: [...(p.approvalHistory || []), approvalRecord],
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      // Project actions
      addProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: uuidv4(),
          proposals: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
        return newProject;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },

      setCurrentProject: (project) => set({ currentProject: project }),

      moveProposalToProject: (proposalId, projectId) => {
        set((state) => ({
          proposals: state.proposals.map((p) =>
            p.id === proposalId ? { ...p, projectId } : p
          ),
          projects: state.projects.map((p) => {
            if (p.id === projectId && !p.proposals.includes(proposalId)) {
              return { ...p, proposals: [...p.proposals, proposalId] };
            }
            return {
              ...p,
              proposals: p.proposals.filter((id) => id !== proposalId),
            };
          }),
        }));
      },

      // Chat actions
      addChatMessage: (messageData) => {
        const newMessage: ChatMessage = {
          ...messageData,
          id: uuidv4(),
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          chatMessages: [...state.chatMessages, newMessage],
        }));
      },

      clearChat: () => set({ chatMessages: [] }),

      setAiTyping: (typing) => set({ isAiTyping: typing }),

      // Library actions
      addLibraryItem: (itemData) => {
        const newItem: LibraryItem = {
          ...itemData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          libraryItems: [...state.libraryItems, newItem],
        }));
      },

      deleteLibraryItem: (id) => {
        set((state) => ({
          libraryItems: state.libraryItems.filter((item) => item.id !== id),
        }));
      },

      // Filter actions
      setMetaLearningFilter: (filter) => set({ metaLearningFilter: filter }),
      clearMetaLearningFilter: () => set({ metaLearningFilter: {} }),

      // UI actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setActiveSection: (section) => set({ activeSection: section }),

      // Search
      searchProposals: (query, searchAll) => {
        const { proposals, currentUser } = get();
        const lowerQuery = query.toLowerCase();

        return proposals.filter((p) => {
          // Filter by ownership if not searching all
          if (!searchAll && p.author.id !== currentUser.id) {
            return false;
          }

          // Search in title, client, background
          return (
            p.content.title?.toLowerCase().includes(lowerQuery) ||
            p.content.client?.toLowerCase().includes(lowerQuery) ||
            p.content.background?.toLowerCase().includes(lowerQuery) ||
            p.code?.toLowerCase().includes(lowerQuery)
          );
        });
      },

      getFilteredProposals: () => {
        const { proposals, metaLearningFilter } = get();

        return proposals.filter((p) => {
          if (p.status === 'deleted') return false;

          if (metaLearningFilter.clients?.length) {
            if (!metaLearningFilter.clients.includes(p.content.client || '')) {
              return false;
            }
          }

          if (metaLearningFilter.statuses?.length) {
            if (!metaLearningFilter.statuses.includes(p.status)) {
              return false;
            }
          }

          if (metaLearningFilter.authors?.length) {
            if (!metaLearningFilter.authors.includes(p.author.id)) {
              return false;
            }
          }

          if (metaLearningFilter.dateRange) {
            const proposalDate = new Date(p.createdAt);
            const startDate = new Date(metaLearningFilter.dateRange.start);
            const endDate = new Date(metaLearningFilter.dateRange.end);
            if (proposalDate < startDate || proposalDate > endDate) {
              return false;
            }
          }

          return true;
        });
      },
    }),
    {
      name: 'boltinsight-storage',
      partialize: (state) => ({
        proposals: state.proposals,
        projects: state.projects,
        libraryItems: state.libraryItems,
      }),
    }
  )
);
