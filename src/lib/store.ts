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
    projectId: 'project-2',
    content: {
      title: 'Brand Health Tracking Q1 2025',
      client: 'Coca-Cola',
      contact: 'John Smith',
      background: 'Annual brand health measurement study to track key brand metrics and consumer perceptions across major markets.',
      businessObjectives: [
        'Measure brand awareness levels',
        'Track brand perception changes',
        'Monitor competitive positioning',
      ],
      researchObjectives: [
        'To understand current brand positioning',
        'To identify key purchase drivers',
        'To measure brand equity metrics',
      ],
      burningQuestions: [
        'How has brand awareness changed since last quarter?',
        'What are the key drivers of brand preference?',
      ],
      targetDefinition: 'Adults 18-45, primary grocery shoppers who consume soft drinks at least once per week',
      sampleSize: 1000,
      markets: [
        { country: 'USA', language: 'English', sampleSize: 500 },
        { country: 'UK', language: 'English', sampleSize: 500 },
      ],
      advancedAnalysis: ['Brand Funnel Analysis', 'Key Driver Analysis', 'Competitive Mapping'],
    },
    author: currentUser,
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-10T14:30:00Z',
    sentToClient: true,
    versions: [
      {
        id: 'v1',
        version: 1,
        content: { title: 'Brand Health Study', client: 'Coca-Cola' },
        createdAt: '2024-12-01T10:00:00Z',
        createdBy: currentUser,
      },
    ],
    approvalHistory: [
      {
        id: 'approval-1',
        action: 'approved',
        by: { ...currentUser, id: 'manager-1', name: 'Team Manager', role: 'manager' },
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
      contact: 'Marie Dupont',
      background: 'Identify key consumer segments for new product launch in the yogurt category',
      businessObjectives: [
        'Understand consumer segments',
        'Identify growth opportunities',
      ],
      researchObjectives: [
        'To identify distinct consumer segments based on health attitudes',
        'To understand purchase drivers by segment',
        'To map brand positioning vs competitors',
      ],
      burningQuestions: [
        'What percentage of consumers prioritize health over taste?',
        'How price sensitive are health-conscious segments?',
        'What is the optimal pack size for different occasions?',
      ],
      targetDefinition: 'Adults 25-54, health-conscious consumers',
      sampleSize: 2000,
      markets: [
        { country: 'France', language: 'French', sampleSize: 800 },
        { country: 'Germany', language: 'German', sampleSize: 600 },
        { country: 'UK', language: 'English', sampleSize: 600 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-12T09:00:00Z',
    updatedAt: '2024-12-12T09:00:00Z',
    versions: [
      {
        id: 'v2-1',
        version: 1,
        content: { title: 'Consumer Study', client: 'Danone' },
        createdAt: '2024-12-11T10:00:00Z',
        createdBy: currentUser,
      },
      {
        id: 'v2-2',
        version: 2,
        content: { title: 'Consumer Segmentation Study', client: 'Danone', targetDefinition: 'Adults 25-54' },
        createdAt: '2024-12-12T09:00:00Z',
        createdBy: currentUser,
      },
    ],
  },
  {
    id: 'proposal-3',
    code: 'BI-2412-0002',
    status: 'pending_approval',
    content: {
      title: 'Concept Testing - New Product Line',
      client: 'Nestle',
      contact: 'Sarah Johnson',
      background: 'Testing 3 new product concepts for European market launch in Q2 2025',
      businessObjectives: ['Identify winning concept', 'Understand improvement areas', 'Validate pricing strategy'],
      researchObjectives: ['To evaluate concept appeal', 'To measure purchase intent', 'To assess price sensitivity'],
      burningQuestions: [
        'Which concept has the highest purchase intent?',
        'What improvements would increase appeal?',
      ],
      targetDefinition: 'Young adults 18-35, health conscious, interested in sustainable products',
      sampleSize: 1500,
      markets: [
        { country: 'Germany', language: 'German', sampleSize: 500 },
        { country: 'France', language: 'French', sampleSize: 500 },
        { country: 'Spain', language: 'Spanish', sampleSize: 500 },
      ],
      advancedAnalysis: ['MaxDiff Analysis', 'Conjoint Analysis'],
    },
    author: currentUser,
    createdAt: '2024-12-13T11:00:00Z',
    updatedAt: '2024-12-14T08:00:00Z',
    versions: [
      {
        id: 'v3-1',
        version: 1,
        content: { title: 'Concept Testing', client: 'Nestle', sampleSize: 1000 },
        createdAt: '2024-12-13T11:00:00Z',
        createdBy: currentUser,
      },
      {
        id: 'v3-2',
        version: 2,
        content: { title: 'Concept Testing - New Product Line', client: 'Nestle', sampleSize: 1500 },
        createdAt: '2024-12-13T15:00:00Z',
        createdBy: currentUser,
      },
      {
        id: 'v3-3',
        version: 3,
        content: { title: 'Concept Testing - New Product Line', client: 'Nestle', sampleSize: 1500, markets: [{ country: 'Germany', language: 'German', sampleSize: 500 }] },
        createdAt: '2024-12-14T08:00:00Z',
        createdBy: currentUser,
      },
    ],
  },
  {
    id: 'proposal-4',
    code: 'BI-2412-0003',
    status: 'approved',
    projectId: 'project-1',
    content: {
      title: 'Customer Satisfaction Survey - Banking',
      client: 'HSBC',
      contact: 'Michael Chen',
      background: 'Quarterly customer satisfaction tracking for retail banking services',
      businessObjectives: [
        'Track NPS score',
        'Identify pain points in customer journey',
        'Benchmark against competitors',
      ],
      researchObjectives: [
        'To measure overall satisfaction',
        'To identify drivers of loyalty',
        'To evaluate service touchpoints',
      ],
      targetDefinition: 'HSBC retail banking customers, active account holders',
      sampleSize: 3000,
      markets: [
        { country: 'UK', language: 'English', sampleSize: 1500 },
        { country: 'USA', language: 'English', sampleSize: 1500 },
      ],
      advancedAnalysis: ['NPS Analysis', 'Key Driver Analysis', 'Customer Journey Mapping'],
    },
    author: currentUser,
    createdAt: '2024-12-05T14:00:00Z',
    updatedAt: '2024-12-08T16:00:00Z',
    sentToClient: true,
    versions: [],
    approvalHistory: [
      {
        id: 'approval-2',
        action: 'approved',
        by: { ...currentUser, id: 'director-1', name: 'Research Director', role: 'manager' },
        timestamp: '2024-12-08T16:00:00Z',
      },
    ],
  },
  {
    id: 'proposal-5',
    status: 'rejected',
    content: {
      title: 'Ad Effectiveness Study',
      client: 'BMW',
      contact: 'Hans Mueller',
      background: 'Measure effectiveness of new TV campaign',
      businessObjectives: ['Evaluate ad recall', 'Measure brand impact'],
      researchObjectives: ['To measure campaign effectiveness'],
      targetDefinition: 'Luxury car intenders, household income $100k+',
      sampleSize: 800,
      markets: [
        { country: 'Germany', language: 'German', sampleSize: 400 },
        { country: 'USA', language: 'English', sampleSize: 400 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-10T10:00:00Z',
    updatedAt: '2024-12-11T09:00:00Z',
    versions: [],
    approvalHistory: [
      {
        id: 'approval-3',
        action: 'rejected',
        by: { ...currentUser, id: 'manager-1', name: 'Team Manager', role: 'manager' },
        comment: 'Sample size too small for the target audience. Please revise.',
        timestamp: '2024-12-11T09:00:00Z',
      },
    ],
  },
  {
    id: 'proposal-6',
    status: 'on_hold',
    projectId: 'project-1',
    content: {
      title: 'Market Entry Study - Southeast Asia',
      client: 'Unilever',
      contact: 'Emma Watson',
      background: 'Evaluate market potential for new skincare line in Southeast Asian markets',
      businessObjectives: [
        'Assess market opportunity',
        'Understand competitive landscape',
        'Identify distribution channels',
      ],
      researchObjectives: [
        'To evaluate market size and potential',
        'To understand consumer preferences',
        'To identify key success factors',
      ],
      targetDefinition: 'Women 18-45, interested in skincare, SEC A/B',
      sampleSize: 2400,
      markets: [
        { country: 'Thailand', language: 'Thai', sampleSize: 600 },
        { country: 'Vietnam', language: 'Vietnamese', sampleSize: 600 },
        { country: 'Indonesia', language: 'Indonesian', sampleSize: 600 },
        { country: 'Philippines', language: 'English', sampleSize: 600 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-08T11:00:00Z',
    updatedAt: '2024-12-12T15:00:00Z',
    versions: [],
    approvalHistory: [
      {
        id: 'approval-4',
        action: 'on_hold',
        by: { ...currentUser, id: 'director-1', name: 'Research Director', role: 'manager' },
        comment: 'Waiting for budget confirmation from client.',
        timestamp: '2024-12-12T15:00:00Z',
      },
    ],
  },
  {
    id: 'proposal-7',
    code: 'BI-2412-0004',
    status: 'approved',
    projectId: 'project-3',
    content: {
      title: 'Usage & Attitude Study - Snacking',
      client: 'PepsiCo',
      contact: 'Robert Brown',
      background: 'Comprehensive U&A study to understand snacking behaviors and attitudes across demographics',
      businessObjectives: [
        'Map snacking occasions',
        'Understand brand perceptions',
        'Identify unmet needs',
      ],
      researchObjectives: [
        'To understand snacking habits and occasions',
        'To measure brand awareness and consideration',
        'To identify growth opportunities',
      ],
      burningQuestions: [
        'What drives snack choice in different occasions?',
        'How do health concerns impact snacking behavior?',
      ],
      targetDefinition: 'Adults 18-54, snack consumers (at least weekly)',
      sampleSize: 4000,
      markets: [
        { country: 'USA', language: 'English', sampleSize: 1500 },
        { country: 'UK', language: 'English', sampleSize: 1000 },
        { country: 'Mexico', language: 'Spanish', sampleSize: 750 },
        { country: 'Brazil', language: 'Portuguese', sampleSize: 750 },
      ],
      advancedAnalysis: ['Occasion Mapping', 'Segmentation', 'Brand Positioning'],
    },
    author: currentUser,
    createdAt: '2024-11-25T09:00:00Z',
    updatedAt: '2024-12-02T11:00:00Z',
    sentToClient: true,
    versions: [],
    approvalHistory: [
      {
        id: 'approval-5',
        action: 'approved',
        by: { ...currentUser, id: 'director-1', name: 'Research Director', role: 'manager' },
        timestamp: '2024-12-02T11:00:00Z',
      },
    ],
  },
  {
    id: 'proposal-8',
    code: 'BI-2412-0005',
    status: 'pending_approval',
    projectId: 'project-samsung',
    content: {
      title: 'Mobile App UX Research',
      client: 'Samsung',
      contact: 'Kim Min-ji',
      background: 'Evaluate user experience of new mobile banking app features before global rollout',
      businessObjectives: [
        'Optimize user onboarding flow',
        'Improve feature discoverability',
        'Increase user retention rates',
      ],
      researchObjectives: [
        'To identify UX pain points in current app design',
        'To measure task completion rates for key features',
        'To understand user mental models for navigation',
      ],
      burningQuestions: [
        'Which features are users struggling to find?',
        'What causes users to abandon the onboarding process?',
      ],
      targetDefinition: 'Adults 18-55, smartphone users with active mobile banking accounts',
      sampleSize: 800,
      markets: [
        { country: 'South Korea', language: 'Korean', sampleSize: 400 },
        { country: 'USA', language: 'English', sampleSize: 400 },
      ],
      advancedAnalysis: ['Heuristic Evaluation', 'Task Flow Analysis', 'Eye Tracking'],
    },
    author: currentUser,
    createdAt: '2024-12-13T14:00:00Z',
    updatedAt: '2024-12-14T09:00:00Z',
    versions: [],
  },
  {
    id: 'proposal-9',
    status: 'draft',
    projectId: 'project-louis-vuitton',
    content: {
      title: 'Price Elasticity Study - Premium Segment',
      client: 'Louis Vuitton',
      contact: 'Pierre Dubois',
      background: 'Understand price sensitivity among luxury consumers for new product line pricing strategy',
      businessObjectives: [
        'Determine optimal price points',
        'Understand willingness to pay by segment',
      ],
      targetDefinition: 'High-net-worth individuals, household income $200k+, luxury brand purchasers',
      sampleSize: 500,
      markets: [
        { country: 'France', language: 'French', sampleSize: 150 },
        { country: 'USA', language: 'English', sampleSize: 150 },
        { country: 'China', language: 'Mandarin', sampleSize: 200 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-14T08:00:00Z',
    updatedAt: '2024-12-14T08:00:00Z',
    versions: [],
  },
  {
    id: 'proposal-10',
    code: 'BI-2412-0006',
    status: 'approved',
    projectId: 'project-microsoft',
    content: {
      title: 'Employee Engagement Survey',
      client: 'Microsoft',
      contact: 'Sarah Williams',
      background: 'Annual employee satisfaction and engagement measurement for EMEA region',
      businessObjectives: [
        'Measure employee NPS',
        'Identify areas for improvement',
        'Track year-over-year changes',
      ],
      researchObjectives: [
        'To measure overall engagement levels',
        'To identify key drivers of satisfaction',
        'To benchmark against industry standards',
      ],
      targetDefinition: 'Microsoft EMEA employees, all departments and levels',
      sampleSize: 5000,
      markets: [
        { country: 'UK', language: 'English', sampleSize: 1500 },
        { country: 'Germany', language: 'German', sampleSize: 1200 },
        { country: 'France', language: 'French', sampleSize: 1000 },
        { country: 'Netherlands', language: 'Dutch', sampleSize: 700 },
        { country: 'Ireland', language: 'English', sampleSize: 600 },
      ],
      advancedAnalysis: ['eNPS Analysis', 'Driver Analysis', 'Text Analytics'],
    },
    author: currentUser,
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-28T14:00:00Z',
    sentToClient: true,
    versions: [],
    approvalHistory: [
      {
        id: 'approval-6',
        action: 'approved',
        by: { ...currentUser, id: 'director-1', name: 'Research Director', role: 'manager' },
        timestamp: '2024-11-28T14:00:00Z',
      },
    ],
  },
  {
    id: 'proposal-11',
    status: 'draft',
    projectId: 'project-kraft-heinz',
    content: {
      title: 'Packaging Innovation Test',
      client: 'Kraft Heinz',
      contact: 'Amanda Johnson',
      background: 'Test consumer response to 3 new sustainable packaging designs',
      businessObjectives: ['Select winning packaging concept', 'Validate sustainability messaging'],
      targetDefinition: 'Primary grocery shoppers, aged 25-65, environmentally conscious consumers',
      sampleSize: 1200,
      markets: [
        { country: 'USA', language: 'English', sampleSize: 600 },
        { country: 'Canada', language: 'English', sampleSize: 300 },
        { country: 'Canada', language: 'French', sampleSize: 300 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-13T16:00:00Z',
    updatedAt: '2024-12-13T16:00:00Z',
    versions: [],
  },
  {
    id: 'proposal-12',
    code: 'BI-2411-0007',
    status: 'approved',
    projectId: 'project-disney-plus',
    content: {
      title: 'Streaming Service Competitive Analysis',
      client: 'Disney+',
      contact: 'Michael Torres',
      background: 'Comprehensive competitive landscape study of streaming services market',
      businessObjectives: [
        'Understand competitive positioning',
        'Identify content gaps',
        'Map subscriber journey',
      ],
      researchObjectives: [
        'To measure brand awareness vs competitors',
        'To understand switching behavior',
        'To identify content preferences by segment',
      ],
      burningQuestions: [
        'What would make subscribers switch to Disney+?',
        'How does Disney+ compare on value perception?',
      ],
      targetDefinition: 'Adults 18-54, current streaming service subscribers (any platform)',
      sampleSize: 3000,
      markets: [
        { country: 'USA', language: 'English', sampleSize: 1500 },
        { country: 'UK', language: 'English', sampleSize: 750 },
        { country: 'Australia', language: 'English', sampleSize: 750 },
      ],
      advancedAnalysis: ['Competitive Mapping', 'MaxDiff', 'Customer Journey Analysis'],
    },
    author: currentUser,
    createdAt: '2024-11-20T09:00:00Z',
    updatedAt: '2024-12-01T15:00:00Z',
    sentToClient: true,
    versions: [],
    approvalHistory: [
      {
        id: 'approval-7',
        action: 'approved',
        by: { ...currentUser, id: 'manager-1', name: 'Team Manager', role: 'manager' },
        timestamp: '2024-12-01T15:00:00Z',
      },
    ],
  },
  {
    id: 'proposal-13',
    status: 'pending_approval',
    projectId: 'project-pfizer',
    content: {
      title: 'Healthcare Provider Satisfaction Study',
      client: 'Pfizer',
      contact: 'Dr. Elizabeth Chen',
      background: 'Measure HCP satisfaction with medical rep interactions and educational resources',
      businessObjectives: [
        'Improve HCP engagement',
        'Optimize resource allocation',
        'Strengthen relationships',
      ],
      targetDefinition: 'Healthcare professionals - physicians, pharmacists, nurse practitioners',
      sampleSize: 600,
      markets: [
        { country: 'USA', language: 'English', sampleSize: 300 },
        { country: 'Germany', language: 'German', sampleSize: 150 },
        { country: 'Japan', language: 'Japanese', sampleSize: 150 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-12T11:00:00Z',
    updatedAt: '2024-12-14T10:00:00Z',
    versions: [],
  },
  {
    id: 'proposal-14',
    status: 'on_hold',
    projectId: 'project-toyota',
    content: {
      title: 'Electric Vehicle Purchase Journey',
      client: 'Toyota',
      contact: 'Yuki Tanaka',
      background: 'Map the EV purchase decision journey from awareness to purchase',
      businessObjectives: [
        'Understand EV consideration triggers',
        'Map touchpoints in purchase journey',
        'Identify barriers to EV adoption',
      ],
      targetDefinition: 'Adults 25-60, in-market for new vehicle purchase within 12 months',
      sampleSize: 2000,
      markets: [
        { country: 'Japan', language: 'Japanese', sampleSize: 800 },
        { country: 'USA', language: 'English', sampleSize: 700 },
        { country: 'Germany', language: 'German', sampleSize: 500 },
      ],
    },
    author: currentUser,
    createdAt: '2024-12-10T13:00:00Z',
    updatedAt: '2024-12-13T09:00:00Z',
    versions: [],
    approvalHistory: [
      {
        id: 'approval-8',
        action: 'on_hold',
        by: { ...currentUser, id: 'director-1', name: 'Research Director', role: 'manager' },
        comment: 'Budget reallocation pending Q1 planning.',
        timestamp: '2024-12-13T09:00:00Z',
      },
    ],
  },
];

const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'BoltChatAI Credit Sales',
    description: 'Default project for credit sales and financial services research',
    client: 'Various',
    proposals: ['proposal-4', 'proposal-6'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-08T00:00:00Z',
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
    client: 'PepsiCo',
    proposals: ['proposal-7'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-12-02T00:00:00Z',
  },
  {
    id: 'project-samsung',
    name: 'Samsung',
    description: 'Samsung mobile and technology research projects',
    client: 'Samsung',
    proposals: ['proposal-8'],
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-12-14T00:00:00Z',
  },
  {
    id: 'project-louis-vuitton',
    name: 'Louis Vuitton',
    description: 'Louis Vuitton luxury brand and pricing research projects',
    client: 'Louis Vuitton',
    proposals: ['proposal-9'],
    createdAt: '2024-07-01T00:00:00Z',
    updatedAt: '2024-12-14T00:00:00Z',
  },
  {
    id: 'project-microsoft',
    name: 'Microsoft',
    description: 'Microsoft employee engagement and enterprise research projects',
    client: 'Microsoft',
    proposals: ['proposal-10'],
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-11-28T00:00:00Z',
  },
  {
    id: 'project-kraft-heinz',
    name: 'Kraft Heinz',
    description: 'Kraft Heinz packaging and product innovation research projects',
    client: 'Kraft Heinz',
    proposals: ['proposal-11'],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-12-13T00:00:00Z',
  },
  {
    id: 'project-disney-plus',
    name: 'Disney+',
    description: 'Disney+ streaming service and content research projects',
    client: 'Disney+',
    proposals: ['proposal-12'],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
  },
  {
    id: 'project-pfizer',
    name: 'Pfizer',
    description: 'Pfizer healthcare provider and pharmaceutical research projects',
    client: 'Pfizer',
    proposals: ['proposal-13'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-12-14T00:00:00Z',
  },
  {
    id: 'project-toyota',
    name: 'Toyota',
    description: 'Toyota automotive and electric vehicle research projects',
    client: 'Toyota',
    proposals: ['proposal-14'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-13T00:00:00Z',
  },
];

const mockLibraryItems: LibraryItem[] = [
  // Templates
  {
    id: 'template-1',
    name: 'Brand Health Tracking Template',
    description: 'Standard template for brand awareness, perception, and NPS studies',
    url: '/templates/brand-health',
    category: 'template',
    tags: ['brand', 'tracking', 'NPS'],
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'template-2',
    name: 'Customer Satisfaction Survey Template',
    description: 'CSAT and customer experience measurement template',
    url: '/templates/csat',
    category: 'template',
    tags: ['CSAT', 'customer experience', 'satisfaction'],
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'template-3',
    name: 'Concept Testing Template',
    description: 'Template for new product/concept evaluation studies',
    url: '/templates/concept-test',
    category: 'template',
    tags: ['concept', 'product', 'innovation'],
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'template-4',
    name: 'U&A Study Template',
    description: 'Usage and Attitude study template with standard modules',
    url: '/templates/ua-study',
    category: 'template',
    tags: ['U&A', 'usage', 'attitude'],
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'template-5',
    name: 'Ad Testing Template',
    description: 'Creative and advertising effectiveness testing template',
    url: '/templates/ad-test',
    category: 'template',
    tags: ['advertising', 'creative', 'testing'],
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'template-6',
    name: 'Price Sensitivity Template',
    description: 'Van Westendorp and Gabor-Granger pricing research template',
    url: '/templates/pricing',
    category: 'template',
    tags: ['pricing', 'Van Westendorp', 'Gabor-Granger'],
    createdAt: '2024-04-01T00:00:00Z',
  },
  // Methodologies
  {
    id: 'method-1',
    name: 'MaxDiff Analysis Guide',
    description: 'Best practices for MaxDiff design and analysis',
    url: '/methodologies/maxdiff',
    category: 'methodology',
    tags: ['MaxDiff', 'preference', 'analysis'],
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'method-2',
    name: 'Conjoint Analysis Handbook',
    description: 'Complete guide to conjoint analysis for product optimization',
    url: '/methodologies/conjoint',
    category: 'methodology',
    tags: ['conjoint', 'choice modeling', 'optimization'],
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 'method-3',
    name: 'Segmentation Best Practices',
    description: 'Guidelines for market segmentation studies',
    url: '/methodologies/segmentation',
    category: 'methodology',
    tags: ['segmentation', 'clustering', 'targeting'],
    createdAt: '2024-03-05T00:00:00Z',
  },
  // Videos
  {
    id: 'video-1',
    name: 'BoltInsight Platform Tutorial',
    description: 'Complete walkthrough of the proposal creation process',
    url: '/videos/platform-tutorial',
    category: 'video',
    tags: ['tutorial', 'training', 'onboarding'],
    createdAt: '2024-04-01T00:00:00Z',
  },
  {
    id: 'video-2',
    name: 'Sample Size Calculator Demo',
    description: 'How to use the margin of error calculator effectively',
    url: '/videos/sample-size-demo',
    category: 'video',
    tags: ['sample size', 'MOE', 'calculator'],
    createdAt: '2024-04-15T00:00:00Z',
  },
  // External Links
  {
    id: 'link-1',
    name: 'ESOMAR Guidelines',
    description: 'International standards for market research ethics',
    url: 'https://www.esomar.org/codes-and-guidelines',
    category: 'external_link',
    tags: ['ethics', 'standards', 'ESOMAR'],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'link-2',
    name: 'Survey Design Best Practices',
    description: 'Qualtrics guide to effective survey design',
    url: 'https://www.qualtrics.com/experience-management/research/survey-design/',
    category: 'external_link',
    tags: ['survey', 'design', 'best practices'],
    createdAt: '2024-02-01T00:00:00Z',
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
  sidebarCollapsed: boolean;
  rightSidebarCollapsed: boolean;
  activeSection: string;
  isLoggedIn: boolean;

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
  setSidebarCollapsed: (collapsed: boolean) => void;
  setRightSidebarCollapsed: (collapsed: boolean) => void;
  setActiveSection: (section: string) => void;
  setLoggedIn: (loggedIn: boolean) => void;

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
      sidebarCollapsed: false,
      rightSidebarCollapsed: false,
      activeSection: 'new-proposal',
      isLoggedIn: false,

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
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setRightSidebarCollapsed: (collapsed) => set({ rightSidebarCollapsed: collapsed }),
      setActiveSection: (section) => set({ activeSection: section }),
      setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),

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
      version: 3,
      migrate: (persistedState: unknown, version: number) => {
        // Reset to default state when version changes
        return {
          isLoggedIn: false,
          sidebarCollapsed: false,
          rightSidebarCollapsed: false,
        };
      },
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        sidebarCollapsed: state.sidebarCollapsed,
        rightSidebarCollapsed: state.rightSidebarCollapsed,
      }),
    }
  )
);
