'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Save,
  Send,
  Download,
  Trash2,
  Plus,
  X,
  Check,
  FileText,
  Target,
  Users,
  Globe,
  BarChart3,
  Clock,
  DollarSign,
  HelpCircle,
  Building2,
  MessageSquare,
  History,
  UserPlus,
  ClipboardCheck,
  MoreHorizontal,
  Share2,
  Edit3,
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Button, Input, Textarea, Select, Badge, Modal, toast } from '@/components/ui';
import type { Proposal, Market, Quota } from '@/types';

interface SectionConfig {
  id: string;
  title: string;
  icon: React.ElementType;
}

const SECTIONS: SectionConfig[] = [
  { id: 'basic', title: 'Basic Info', icon: FileText },
  { id: 'background', title: 'Background', icon: Building2 },
  { id: 'objectives', title: 'Objectives', icon: Target },
  { id: 'questions', title: 'Burning Questions', icon: HelpCircle },
  { id: 'audience', title: 'Target Audience', icon: Users },
  { id: 'markets', title: 'Markets & Quotas', icon: Globe },
  { id: 'methodology', title: 'Methodology', icon: BarChart3 },
  { id: 'timeline', title: 'Timeline & Budget', icon: Clock },
];

export function MobileProposalEditor() {
  const {
    currentProposal,
    currentUser,
    updateProposal,
    deleteProposal,
    submitForApproval,
    setCurrentProposal,
    setActiveSection,
  } = useAppStore();

  const [expandedSections, setExpandedSections] = useState<string[]>(['basic']);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [versionsModalOpen, setVersionsModalOpen] = useState(false);
  const [coworkingModalOpen, setCoworkingModalOpen] = useState(false);
  const [addMarketModalOpen, setAddMarketModalOpen] = useState(false);
  const [newMarket, setNewMarket] = useState({ name: '', language: '', sampleSize: '' });

  if (!currentProposal) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <FileText className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Proposal Selected
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Create a new proposal or select one from the library
        </p>
        <Button onClick={() => setActiveSection('new-proposal')}>
          <Plus className="mr-2 h-4 w-4" />
          New Proposal
        </Button>
      </div>
    );
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast.success('Proposal saved');
      setIsSaving(false);
    }, 500);
  };

  const handleSubmit = () => {
    submitForApproval(currentProposal.id, currentUser);
    toast.success('Submitted for approval');
  };

  const handleDelete = () => {
    deleteProposal(currentProposal.id);
    setCurrentProposal(null);
    setActiveSection('library');
    setDeleteModalOpen(false);
    toast.success('Proposal deleted');
  };

  const handleExport = () => {
    toast.success('Exporting proposal...');
    // In a real app, this would generate a PDF or other format
    setTimeout(() => toast.success('Export completed'), 1000);
  };

  const handleFeasibilityCheck = () => {
    setActiveSection('feasibility');
  };

  const addMarket = () => {
    if (!newMarket.name) return;
    const markets = currentProposal.content.markets || [];
    const newMarketObj: Market = {
      country: newMarket.name,
      language: newMarket.language || 'English',
      sampleSize: parseInt(newMarket.sampleSize) || 100,
      quotas: [],
    };
    updateContent('markets', [...markets, newMarketObj]);
    setNewMarket({ name: '', language: '', sampleSize: '' });
    setAddMarketModalOpen(false);
    toast.success('Market added');
  };

  const removeMarket = (index: number) => {
    const markets = currentProposal.content.markets || [];
    updateContent('markets', markets.filter((_, i) => i !== index));
    toast.success('Market removed');
  };

  const addQuota = (marketIndex: number) => {
    const markets = currentProposal.content.markets || [];
    const updatedMarkets = markets.map((m, i) => {
      if (i === marketIndex) {
        return {
          ...m,
          quotas: [...(m.quotas || []), { dimension: 'Gender', categories: [{ name: 'Male', percentage: 50, count: Math.floor(m.sampleSize * 0.5) }] }],
        };
      }
      return m;
    });
    updateContent('markets', updatedMarkets);
  };

  const removeQuota = (marketIndex: number, quotaIndex: number) => {
    const markets = currentProposal.content.markets || [];
    const updatedMarkets = markets.map((m, i) => {
      if (i === marketIndex) {
        return {
          ...m,
          quotas: (m.quotas || []).filter((_, qi) => qi !== quotaIndex),
        };
      }
      return m;
    });
    updateContent('markets', updatedMarkets);
  };

  const updateContent = (field: string, value: any) => {
    updateProposal(currentProposal.id, {
      content: { ...currentProposal.content, [field]: value },
    });
  };

  const addArrayItem = (field: string, defaultValue: string = '') => {
    const current = currentProposal.content[field as keyof typeof currentProposal.content] as string[] || [];
    updateContent(field, [...current, defaultValue]);
  };

  const removeArrayItem = (field: string, index: number) => {
    const current = currentProposal.content[field as keyof typeof currentProposal.content] as string[] || [];
    updateContent(field, current.filter((_, i) => i !== index));
  };

  const updateArrayItem = (field: string, index: number, value: string) => {
    const current = currentProposal.content[field as keyof typeof currentProposal.content] as string[] || [];
    updateContent(field, current.map((item, i) => (i === index ? value : item)));
  };

  const statusColor: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    pending_approval: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    on_hold: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Compact Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {currentProposal.code && (
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{currentProposal.code}</span>
              )}
              <Badge className={cn('text-xs', statusColor[currentProposal.status])}>
                {currentProposal.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-lg text-gray-500 active:bg-gray-100 dark:active:bg-gray-700"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons Row */}
        {showActions && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setVersionsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
            >
              <History className="h-4 w-4" />
              Versions
            </button>
            <button
              onClick={() => setCoworkingModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
            >
              <UserPlus className="h-4 w-4" />
              Coworking
            </button>
            <button
              onClick={handleFeasibilityCheck}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
            >
              <ClipboardCheck className="h-4 w-4" />
              Feasibility
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.includes(section.id);

          return (
            <div key={section.id} className="border-b border-gray-200 dark:border-gray-800">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between px-4 py-4 bg-white dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">{section.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="bg-white dark:bg-gray-800 px-4 pb-4">
                  {section.id === 'basic' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title
                        </label>
                        <Input
                          value={currentProposal.content.title || ''}
                          onChange={(e) => updateContent('title', e.target.value)}
                          placeholder="Proposal title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Client
                        </label>
                        <Input
                          value={currentProposal.content.client || ''}
                          onChange={(e) => updateContent('client', e.target.value)}
                          placeholder="Client name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Contact
                        </label>
                        <Input
                          value={currentProposal.content.contact || ''}
                          onChange={(e) => updateContent('contact', e.target.value)}
                          placeholder="Client contact person"
                        />
                      </div>
                    </div>
                  )}

                  {section.id === 'background' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Background
                      </label>
                      <Textarea
                        value={currentProposal.content.background || ''}
                        onChange={(e) => updateContent('background', e.target.value)}
                        placeholder="Describe the context and background..."
                        rows={4}
                      />
                    </div>
                  )}

                  {section.id === 'objectives' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Business Objectives
                        </label>
                        <div className="space-y-2">
                          {(currentProposal.content.businessObjectives || []).map((obj, i) => (
                            <div key={i} className="flex gap-2">
                              <Input
                                value={obj}
                                onChange={(e) => updateArrayItem('businessObjectives', i, e.target.value)}
                                placeholder="Business objective"
                                className="flex-1"
                              />
                              <button
                                onClick={() => removeArrayItem('businessObjectives', i)}
                                className="p-2 text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addArrayItem('businessObjectives')}
                            className="w-full"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Objective
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Research Objectives
                        </label>
                        <div className="space-y-2">
                          {(currentProposal.content.researchObjectives || []).map((obj, i) => (
                            <div key={i} className="flex gap-2">
                              <Input
                                value={obj}
                                onChange={(e) => updateArrayItem('researchObjectives', i, e.target.value)}
                                placeholder="Research objective"
                                className="flex-1"
                              />
                              <button
                                onClick={() => removeArrayItem('researchObjectives', i)}
                                className="p-2 text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addArrayItem('researchObjectives')}
                            className="w-full"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Objective
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === 'questions' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Burning Questions
                      </label>
                      <div className="space-y-2">
                        {(currentProposal.content.burningQuestions || []).map((q, i) => (
                          <div key={i} className="flex gap-2">
                            <Textarea
                              value={q}
                              onChange={(e) => updateArrayItem('burningQuestions', i, e.target.value)}
                              placeholder="What do you want to learn?"
                              rows={2}
                              className="flex-1"
                            />
                            <button
                              onClick={() => removeArrayItem('burningQuestions', i)}
                              className="p-2 text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addArrayItem('burningQuestions')}
                          className="w-full"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  )}

                  {section.id === 'audience' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Target Definition
                        </label>
                        <Textarea
                          value={currentProposal.content.targetDefinition || ''}
                          onChange={(e) => updateContent('targetDefinition', e.target.value)}
                          placeholder="Describe your target audience..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Sample Size
                        </label>
                        <Input
                          type="number"
                          value={currentProposal.content.sampleSize || ''}
                          onChange={(e) => updateContent('sampleSize', parseInt(e.target.value) || 0)}
                          placeholder="Total sample size"
                        />
                      </div>
                    </div>
                  )}

                  {section.id === 'markets' && (
                    <div className="space-y-4">
                      {/* Markets List */}
                      {(currentProposal.content.markets || []).length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                          No markets added yet
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {(currentProposal.content.markets || []).map((market, marketIndex) => (
                            <div
                              key={`${market.country}-${marketIndex}`}
                              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{market.country}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {market.language} • n={market.sampleSize}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeMarket(marketIndex)}
                                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Quotas */}
                              {(market.quotas || []).length > 0 && (
                                <div className="mt-2 space-y-1">
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Quotas:</p>
                                  {(market.quotas || []).map((quota, quotaIndex) => (
                                    <div key={`${quota.dimension}-${quotaIndex}`} className="flex items-center justify-between text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">
                                      <span className="text-gray-700 dark:text-gray-300">
                                        {quota.dimension}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-gray-500">{quota.categories?.length || 0} categories</span>
                                        <button
                                          onClick={() => removeQuota(marketIndex, quotaIndex)}
                                          className="text-red-400 hover:text-red-600"
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <button
                                onClick={() => addQuota(marketIndex)}
                                className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1"
                              >
                                <Plus className="h-3 w-3" />
                                Add Quota
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAddMarketModalOpen(true)}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Market
                      </Button>
                    </div>
                  )}

                  {section.id === 'methodology' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Advanced Analysis
                        </label>
                        <div className="space-y-2">
                          {(currentProposal.content.advancedAnalysis || []).map((a, i) => (
                            <div key={i} className="flex gap-2">
                              <Input
                                value={a}
                                onChange={(e) => updateArrayItem('advancedAnalysis', i, e.target.value)}
                                placeholder="e.g., MaxDiff, Conjoint"
                                className="flex-1"
                              />
                              <button
                                onClick={() => removeArrayItem('advancedAnalysis', i)}
                                className="p-2 text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addArrayItem('advancedAnalysis')}
                            className="w-full"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Analysis
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === 'timeline' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Start Date
                          </label>
                          <Input
                            type="date"
                            value={currentProposal.content.timeline?.startDate || ''}
                            onChange={(e) =>
                              updateContent('timeline', {
                                ...currentProposal.content.timeline,
                                startDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            End Date
                          </label>
                          <Input
                            type="date"
                            value={currentProposal.content.timeline?.endDate || ''}
                            onChange={(e) =>
                              updateContent('timeline', {
                                ...currentProposal.content.timeline,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex gap-3">
        <Button
          variant="outline"
          onClick={() => setDeleteModalOpen(true)}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={handleSave} disabled={isSaving} className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
        {currentProposal.status === 'draft' && (
          <Button onClick={handleSubmit} className="flex-1">
            <Send className="mr-2 h-4 w-4" />
            Submit
          </Button>
        )}
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Proposal"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this proposal? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700">
            Delete
          </Button>
        </div>
      </Modal>

      {/* Versions Modal */}
      <Modal
        isOpen={versionsModalOpen}
        onClose={() => setVersionsModalOpen(false)}
        title="Version History"
        size="md"
      >
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Current Version</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(currentProposal.updatedAt)}</p>
              </div>
              <Badge variant="info">Active</Badge>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Initial Version</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(currentProposal.createdAt)}</p>
              </div>
              <Button variant="ghost" size="sm">Restore</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => setVersionsModalOpen(false)}>Close</Button>
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
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Invite team members to collaborate on this proposal.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter email address" className="flex-1" />
              <Button>
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 pt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Collaborators</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {currentProposal.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{currentProposal.author.name}</p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={() => setCoworkingModalOpen(false)}>Done</Button>
        </div>
      </Modal>

      {/* Add Market Modal */}
      <Modal
        isOpen={addMarketModalOpen}
        onClose={() => setAddMarketModalOpen(false)}
        title="Add Market"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <Input
              value={newMarket.name}
              onChange={(e) => setNewMarket({ ...newMarket, name: e.target.value })}
              placeholder="e.g., United States, Germany"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <Select
              options={[
                { value: 'English', label: 'English' },
                { value: 'German', label: 'German' },
                { value: 'French', label: 'French' },
                { value: 'Spanish', label: 'Spanish' },
                { value: 'Chinese', label: 'Chinese' },
                { value: 'Japanese', label: 'Japanese' },
              ]}
              value={newMarket.language || 'English'}
              onChange={(e) => setNewMarket({ ...newMarket, language: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sample Size
            </label>
            <Input
              type="number"
              value={newMarket.sampleSize}
              onChange={(e) => setNewMarket({ ...newMarket, sampleSize: e.target.value })}
              placeholder="e.g., 500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setAddMarketModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={addMarket} disabled={!newMarket.name} className="flex-1">
              Add Market
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
