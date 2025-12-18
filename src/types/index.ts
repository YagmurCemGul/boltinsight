// BoltInsight Type Definitions

export type ProposalStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'on_hold' | 'deleted';

export type ResearchType =
  | 'concept_test'
  | 'usage_and_attitude'
  | 'brand_tracking'
  | 'segmentation'
  | 'customer_satisfaction'
  | 'ad_testing'
  | 'price_testing'
  | 'product_test'
  | 'qualitative'
  | 'quantitative'
  | 'mixed_methods';

export type ServiceType =
  | 'full_service'
  | 'diy'
  | 'assisted'
  | 'consulting'
  | 'bolt_chat_credits';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'researcher' | 'viewer';
  region?: string;
  avatar?: string;
}

export interface Market {
  country: string;
  language: string;
  sampleSize: number;
  quotas?: Quota[];
}

export interface Quota {
  dimension: string;
  categories: {
    name: string;
    percentage: number;
    count: number;
  }[];
}

export interface ProposalContent {
  title: string;
  client: string;
  contact?: string;
  background?: string;
  businessObjectives?: string[];
  researchObjectives?: string[];
  burningQuestions?: string[];
  targetDefinition?: string;
  sampleSize?: number;
  markets?: Market[];
  quotas?: Quota[];
  advancedAnalysis?: string[];
  referenceProjects?: string[];
  timeline?: Timeline;
  pricing?: Pricing;
}

export interface Timeline {
  startDate?: string;
  endDate?: string;
  milestones?: {
    name: string;
    date: string;
    completed: boolean;
  }[];
}

export interface Pricing {
  total: number;
  currency: string;
  breakdown?: {
    item: string;
    amount: number;
  }[];
}

export interface Proposal {
  id: string;
  code?: string; // Generated on first approval submission
  projectId?: string;
  status: ProposalStatus;
  content: ProposalContent;
  author: User;
  collaborators?: User[];
  createdAt: string;
  updatedAt: string;
  sentToClient?: boolean;
  versions: ProposalVersion[];
  approvalHistory?: ApprovalRecord[];
  comments?: Comment[];
}

export interface ProposalVersion {
  id: string;
  version: number;
  content: ProposalContent;
  createdAt: string;
  createdBy: User;
  note?: string;
}

export interface ApprovalRecord {
  id: string;
  action: 'submitted' | 'approved' | 'rejected' | 'on_hold' | 'comment';
  by: User;
  to?: User;
  comment?: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  resolved?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  client?: string;
  proposals: string[]; // Proposal IDs
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean; // For BoltChatAI Credit Sales
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
}

export interface LibraryItem {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'external_link' | 'video' | 'template' | 'methodology';
  tags?: string[];
  country?: string;
  createdAt: string | Date;
}

export interface MetaLearningFilter {
  clients?: string[];
  regions?: string[];
  countries?: string[];
  researchTypes?: ResearchType[];
  statuses?: ProposalStatus[];
  authors?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  keywords?: string[];
}

export interface AnalyticsData {
  totalProposals: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;
  byClient: { name: string; count: number }[];
  byRegion: { name: string; count: number }[];
  byResearchType: { name: string; count: number }[];
  byAuthor: { name: string; count: number }[];
  trends: { date: string; count: number }[];
}

export interface FeasibilityCheck {
  market: string;
  targetAudience: string;
  methodology: string;
  estimatedIncidenceRate: number;
  estimatedTimeline: string;
  estimatedCost: number;
  feasible: boolean;
  notes?: string;
}

export interface MarginOfErrorResult {
  sampleSize: number;
  populationSize?: number;
  confidenceLevel: number;
  marginOfError: number;
}

export interface DemographicDistribution {
  ageGroups: { range: string; percentage: number }[];
  gender: { category: string; percentage: number }[];
  region: { name: string; percentage: number }[];
  income?: { range: string; percentage: number }[];
}
