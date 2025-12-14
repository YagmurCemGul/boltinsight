'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  Send,
  Download,
  Users,
  ClipboardCheck,
  History,
  RefreshCw,
  Wand2,
  ChevronRight,
  Globe,
  Target,
  BarChart3,
  FileQuestion,
  BookOpen,
  Link as LinkIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Button, Input, Textarea, Select, Badge, Modal } from '@/components/ui';
import type { Proposal, ProposalContent, User, Market } from '@/types';

interface ProposalEditorProps {
  proposal: Proposal;
  onSave: (content: ProposalContent) => void;
}

const SECTION_CONFIG = [
  { id: 'title', label: 'Title', icon: FileQuestion, required: true },
  { id: 'client', label: 'Client', icon: Users, required: true },
  { id: 'background', label: 'Background / Context', icon: BookOpen, required: false },
  { id: 'businessObjectives', label: 'Business Objectives', icon: Target, required: false },
  { id: 'researchObjectives', label: 'Research Objectives', icon: Target, required: false },
  { id: 'burningQuestions', label: 'Burning Questions', icon: FileQuestion, required: false },
  { id: 'targetDefinition', label: 'Target Definition', icon: Target, required: true },
  { id: 'sampleSize', label: 'Sample Size', icon: BarChart3, required: true },
  { id: 'markets', label: 'Markets', icon: Globe, required: true },
  { id: 'quotas', label: 'Quota Recommendations', icon: BarChart3, required: false },
  { id: 'advancedAnalysis', label: 'Advanced Analysis', icon: BarChart3, required: false },
  { id: 'referenceProjects', label: 'Reference Projects', icon: LinkIcon, required: false },
];

export function ProposalEditor({ proposal, onSave }: ProposalEditorProps) {
  const { projects, currentUser, submitForApproval, updateProposal } = useAppStore();
  const [content, setContent] = useState<ProposalContent>(proposal.content);
  const [activeSection, setActiveSection] = useState('title');
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [coworkingModalOpen, setCoworkingModalOpen] = useState(false);
  const [versionsModalOpen, setVersionsModalOpen] = useState(false);
  const [selectedApprover, setSelectedApprover] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const isDifferent = JSON.stringify(content) !== JSON.stringify(proposal.content);
    setHasChanges(isDifferent);
  }, [content, proposal.content]);

  const updateContent = <K extends keyof ProposalContent>(
    key: K,
    value: ProposalContent[K]
  ) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(content);
    updateProposal(proposal.id, { content, status: 'draft' });
    setHasChanges(false);
  };

  const handleSubmitForApproval = () => {
    if (!selectedApprover) return;

    const approver: User = {
      id: selectedApprover,
      name: 'Approver',
      email: 'approver@boltinsight.com',
      role: 'manager',
    };

    submitForApproval(proposal.id, approver);
    setApprovalModalOpen(false);
  };

  const handleExport = (format: 'word' | 'pdf') => {
    // In real app, this would generate and download the document
    alert(`Exporting as ${format.toUpperCase()}...`);
  };

  const handleAIRephrase = (sectionId: string) => {
    // In real app, this would call AI API to rephrase content
    alert(`AI rephrasing ${sectionId}...`);
  };

  const isProposalComplete = () => {
    return (
      content.title &&
      content.client &&
      content.targetDefinition &&
      content.sampleSize &&
      content.markets &&
      content.markets.length > 0
    );
  };

  const getSectionCompletion = () => {
    const requiredSections = SECTION_CONFIG.filter((s) => s.required);
    const completed = requiredSections.filter((s) => {
      const value = content[s.id as keyof ProposalContent];
      if (Array.isArray(value)) return value.length > 0;
      return !!value;
    });
    return Math.round((completed.length / requiredSections.length) * 100);
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Content Sections Navigation */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">Proposal Sections</h3>
          <div className="mb-4 h-2 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${getSectionCompletion()}%` }}
            />
          </div>
          <p className="mb-4 text-xs text-gray-500">{getSectionCompletion()}% complete</p>
        </div>

        <nav className="space-y-1 px-2">
          {SECTION_CONFIG.map((section) => {
            const value = content[section.id as keyof ProposalContent];
            const isComplete = Array.isArray(value) ? value.length > 0 : !!value;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <section.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{section.label}</span>
                {section.required && (
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      isComplete ? 'bg-green-500' : 'bg-red-400'
                    )}
                  />
                )}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setVersionsModalOpen(true)}>
              <History className="mr-2 h-4 w-4" />
              Versions
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCoworkingModalOpen(true)}>
              <Users className="mr-2 h-4 w-4" />
              Coworking
            </Button>
            <Button variant="outline" size="sm">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Feasibility Check
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="warning" className="mr-2">
                Unsaved changes
              </Badge>
            )}
            <Button variant="secondary" size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setApprovalModalOpen(true)}
              disabled={!isProposalComplete()}
            >
              <Send className="mr-2 h-4 w-4" />
              Send to Approval
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('word')}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Title Section */}
            {activeSection === 'title' && (
              <SectionEditor
                title="Proposal Title"
                description="Enter a clear, descriptive title for the proposal"
                onRephrase={() => handleAIRephrase('title')}
              >
                <Input
                  value={content.title || ''}
                  onChange={(e) => updateContent('title', e.target.value)}
                  placeholder="e.g., Brand Health Tracking Study Q1 2025"
                  className="text-lg font-medium"
                />
              </SectionEditor>
            )}

            {/* Client Section */}
            {activeSection === 'client' && (
              <SectionEditor
                title="Client Information"
                description="Enter the client name and contact details"
              >
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Client Name</label>
                    <Input
                      value={content.client || ''}
                      onChange={(e) => updateContent('client', e.target.value)}
                      placeholder="e.g., Coca-Cola"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">Contact Person</label>
                    <Input
                      value={content.contact || ''}
                      onChange={(e) => updateContent('contact', e.target.value)}
                      placeholder="e.g., John Smith"
                    />
                  </div>
                </div>
              </SectionEditor>
            )}

            {/* Background Section */}
            {activeSection === 'background' && (
              <SectionEditor
                title="Background / Context"
                description="Provide context about the project and why this research is needed"
                onRephrase={() => handleAIRephrase('background')}
              >
                <Textarea
                  value={content.background || ''}
                  onChange={(e) => updateContent('background', e.target.value)}
                  placeholder="Describe the background and context for this research..."
                  className="min-h-[200px]"
                />
              </SectionEditor>
            )}

            {/* Business Objectives */}
            {activeSection === 'businessObjectives' && (
              <SectionEditor
                title="Business Objectives"
                description="Short bullet list of marketing/business goals"
                onRephrase={() => handleAIRephrase('businessObjectives')}
              >
                <ListEditor
                  items={content.businessObjectives || []}
                  onChange={(items) => updateContent('businessObjectives', items)}
                  placeholder="Add a business objective..."
                />
              </SectionEditor>
            )}

            {/* Research Objectives */}
            {activeSection === 'researchObjectives' && (
              <SectionEditor
                title="Research Objectives"
                description='Use "To..." statements and research questions'
                onRephrase={() => handleAIRephrase('researchObjectives')}
              >
                <ListEditor
                  items={content.researchObjectives || []}
                  onChange={(items) => updateContent('researchObjectives', items)}
                  placeholder="Add a research objective (e.g., To understand...)"
                />
              </SectionEditor>
            )}

            {/* Burning Questions */}
            {activeSection === 'burningQuestions' && (
              <SectionEditor
                title="Burning Questions"
                description="Key questions the client wants answered"
                onRephrase={() => handleAIRephrase('burningQuestions')}
              >
                <ListEditor
                  items={content.burningQuestions || []}
                  onChange={(items) => updateContent('burningQuestions', items)}
                  placeholder="Add a burning question..."
                />
              </SectionEditor>
            )}

            {/* Target Definition */}
            {activeSection === 'targetDefinition' && (
              <SectionEditor
                title="Target Definition"
                description="Define the target audience for this research"
                onRephrase={() => handleAIRephrase('targetDefinition')}
              >
                <Textarea
                  value={content.targetDefinition || ''}
                  onChange={(e) => updateContent('targetDefinition', e.target.value)}
                  placeholder="e.g., Adults 18-45, primary grocery shoppers, who have purchased soft drinks in the past month..."
                  className="min-h-[150px]"
                />
              </SectionEditor>
            )}

            {/* Sample Size */}
            {activeSection === 'sampleSize' && (
              <SectionEditor
                title="Sample Size"
                description="Total sample size across all markets"
              >
                <Input
                  type="number"
                  value={content.sampleSize || ''}
                  onChange={(e) => updateContent('sampleSize', parseInt(e.target.value) || undefined)}
                  placeholder="e.g., 1000"
                />
              </SectionEditor>
            )}

            {/* Markets */}
            {activeSection === 'markets' && (
              <SectionEditor
                title="Markets"
                description="Add markets with sample sizes and languages"
              >
                <MarketsEditor
                  markets={content.markets || []}
                  onChange={(markets) => updateContent('markets', markets)}
                />
              </SectionEditor>
            )}

            {/* Quotas */}
            {activeSection === 'quotas' && (
              <SectionEditor
                title="Quota Recommendations"
                description="The system can recommend quotas based on census data"
              >
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-blue-700">
                    Quota recommendations will be automatically generated based on target definition and markets.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Recommendations
                  </Button>
                </div>
              </SectionEditor>
            )}

            {/* Advanced Analysis */}
            {activeSection === 'advancedAnalysis' && (
              <SectionEditor
                title="Advanced Analysis Recommendations"
                description="Suggested advanced analyses based on research objectives"
              >
                <ListEditor
                  items={content.advancedAnalysis || []}
                  onChange={(items) => updateContent('advancedAnalysis', items)}
                  placeholder="Add an analysis type..."
                />
                <div className="mt-3 rounded-lg bg-blue-50 p-4">
                  <p className="mb-2 text-sm font-medium text-blue-700">AI Recommendations:</p>
                  <ul className="space-y-1 text-sm text-blue-600">
                    <li>- MaxDiff Analysis for attribute importance</li>
                    <li>- Conjoint Analysis for price optimization</li>
                    <li>- Key Driver Analysis for satisfaction drivers</li>
                  </ul>
                </div>
              </SectionEditor>
            )}

            {/* Reference Projects */}
            {activeSection === 'referenceProjects' && (
              <SectionEditor
                title="Reference Projects"
                description="Link to similar past proposals for reference"
              >
                <ListEditor
                  items={content.referenceProjects || []}
                  onChange={(items) => updateContent('referenceProjects', items)}
                  placeholder="Add a reference project code or link..."
                />
              </SectionEditor>
            )}
          </div>
        </div>
      </div>

      {/* Send to Approval Modal */}
      <Modal
        isOpen={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        title="Send to Approval"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Select Approver</label>
            <Select
              options={[
                { value: 'user-manager', label: 'Team Manager' },
                { value: 'user-director', label: 'Research Director' },
                { value: 'user-admin', label: 'Admin' },
              ]}
              value={selectedApprover}
              onChange={(e) => setSelectedApprover(e.target.value)}
              placeholder="Choose approver"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setApprovalModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitForApproval} disabled={!selectedApprover}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      {/* Coworking Modal */}
      <Modal
        isOpen={coworkingModalOpen}
        onClose={() => setCoworkingModalOpen(false)}
        title="Coworking"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Invite team members to collaborate on this proposal in real-time.
          </p>
          <Input placeholder="Enter email address" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCoworkingModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Invite
            </Button>
          </div>
        </div>
      </Modal>

      {/* Versions Modal */}
      <Modal
        isOpen={versionsModalOpen}
        onClose={() => setVersionsModalOpen(false)}
        title="Version History"
        size="lg"
      >
        <div className="space-y-4">
          {proposal.versions.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No previous versions</p>
          ) : (
            proposal.versions.map((version) => (
              <div
                key={version.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">Version {version.version}</p>
                  <p className="text-sm text-gray-500">
                    {version.createdBy.name} - {new Date(version.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Restore
                </Button>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}

// Helper Components

interface SectionEditorProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onRephrase?: () => void;
}

function SectionEditor({ title, description, children, onRephrase }: SectionEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {onRephrase && (
          <Button variant="ghost" size="sm" onClick={onRephrase}>
            <Wand2 className="mr-2 h-4 w-4" />
            AI Rephrase
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

interface ListEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}

function ListEditor({ items, onChange, placeholder }: ListEditorProps) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="flex-1 rounded-lg bg-gray-50 px-3 py-2 text-sm">{item}</span>
          <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
            Remove
          </Button>
        </div>
      ))}
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <Button variant="outline" onClick={addItem}>
          Add
        </Button>
      </div>
    </div>
  );
}

interface MarketsEditorProps {
  markets: Market[];
  onChange: (markets: Market[]) => void;
}

function MarketsEditor({ markets, onChange }: MarketsEditorProps) {
  const [newMarket, setNewMarket] = useState({ country: '', language: '', sampleSize: 0 });

  const addMarket = () => {
    if (newMarket.country && newMarket.language && newMarket.sampleSize > 0) {
      onChange([...markets, newMarket]);
      setNewMarket({ country: '', language: '', sampleSize: 0 });
    }
  };

  const removeMarket = (index: number) => {
    onChange(markets.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {markets.length > 0 && (
        <div className="rounded-lg border">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Country</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Language</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Sample Size</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-sm">{market.country}</td>
                  <td className="px-4 py-2 text-sm">{market.language}</td>
                  <td className="px-4 py-2 text-sm">{market.sampleSize}</td>
                  <td className="px-4 py-2">
                    <Button variant="ghost" size="sm" onClick={() => removeMarket(index)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        <Input
          placeholder="Country"
          value={newMarket.country}
          onChange={(e) => setNewMarket({ ...newMarket, country: e.target.value })}
        />
        <Input
          placeholder="Language"
          value={newMarket.language}
          onChange={(e) => setNewMarket({ ...newMarket, language: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Sample Size"
          value={newMarket.sampleSize || ''}
          onChange={(e) => setNewMarket({ ...newMarket, sampleSize: parseInt(e.target.value) || 0 })}
        />
        <Button onClick={addMarket}>Add Market</Button>
      </div>
    </div>
  );
}
