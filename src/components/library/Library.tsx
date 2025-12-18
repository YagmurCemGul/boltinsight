'use client';

import { useState } from 'react';
import {
  Library as LibraryIcon,
  Plus,
  FileText,
  Search,
  Trash2,
  FolderOpen,
  Eye,
  ExternalLink,
  Globe,
  Tag,
} from 'lucide-react';
import { cn, formatDate, getStatusColor } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import {
  Button,
  Input,
  Select,
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import type { LibraryItem, Proposal } from '@/types';

const CATEGORY_OPTIONS = [
  { value: 'template', label: 'Template' },
  { value: 'external_link', label: 'External Link' },
];

const COUNTRY_OPTIONS = [
  { value: '', label: 'All Countries' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'germany', label: 'Germany' },
  { value: 'france', label: 'France' },
  { value: 'turkey', label: 'Turkey' },
  { value: 'spain', label: 'Spain' },
  { value: 'italy', label: 'Italy' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'japan', label: 'Japan' },
  { value: 'australia', label: 'Australia' },
  { value: 'canada', label: 'Canada' },
  { value: 'global', label: 'Global' },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  template: FileText,
  external_link: ExternalLink,
};

// Mock external links data
const MOCK_EXTERNAL_LINKS: LibraryItem[] = [
  {
    id: 'ext-1',
    name: 'US Census Bureau - Population Data',
    description: 'Official US population statistics, demographics, and economic data',
    url: 'https://www.census.gov/data.html',
    category: 'external_link',
    tags: ['population', 'demographics', 'census', 'usa'],
    country: 'usa',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'ext-2',
    name: 'TurkStat - Turkish Statistical Institute',
    description: 'Official statistics on Turkey - population, economy, social data',
    url: 'https://www.tuik.gov.tr',
    category: 'external_link',
    tags: ['population', 'demographics', 'census', 'turkey'],
    country: 'turkey',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'ext-3',
    name: 'Eurostat - European Statistics',
    description: 'Statistical office of the European Union',
    url: 'https://ec.europa.eu/eurostat',
    category: 'external_link',
    tags: ['population', 'economy', 'europe'],
    country: 'global',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'ext-4',
    name: 'UK Office for National Statistics',
    description: 'UK official statistics on population, economy and society',
    url: 'https://www.ons.gov.uk',
    category: 'external_link',
    tags: ['population', 'demographics', 'uk'],
    country: 'uk',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'ext-5',
    name: 'Statista - Market Research Portal',
    description: 'Global market and consumer data across industries',
    url: 'https://www.statista.com',
    category: 'external_link',
    tags: ['market-research', 'trends', 'industry'],
    country: 'global',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'ext-6',
    name: 'SurveyMonkey - Sample Size Calculator',
    description: 'Calculate the right sample size for your survey',
    url: 'https://www.surveymonkey.com/mp/sample-size-calculator/',
    category: 'external_link',
    tags: ['calculator', 'sample-size', 'methodology'],
    country: 'global',
    createdAt: new Date('2024-03-01'),
  },
];

export function Library() {
  const { libraryItems, addLibraryItem, deleteLibraryItem, proposals, setCurrentProposal, setActiveSection } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [proposalStatusFilter, setProposalStatusFilter] = useState('');
  const [externalLinks, setExternalLinks] = useState<LibraryItem[]>(MOCK_EXTERNAL_LINKS);
  const [newItem, setNewItem] = useState<{
    name: string;
    description: string;
    url: string;
    category: string;
    tags: string;
  }>({
    name: '',
    description: '',
    url: '',
    category: 'external_link',
    tags: '',
  });
  const [newLink, setNewLink] = useState<{
    name: string;
    description: string;
    url: string;
    country: string;
    tags: string;
  }>({
    name: '',
    description: '',
    url: '',
    country: 'global',
    tags: '',
  });

  // Filter proposals
  const filteredProposals = proposals.filter((p) => {
    if (p.status === 'deleted') return false;
    if (proposalStatusFilter && p.status !== proposalStatusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        p.content.title?.toLowerCase().includes(query) ||
        p.content.client?.toLowerCase().includes(query) ||
        p.code?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Filter items
  const filteredItems = libraryItems.filter((item) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !item.name.toLowerCase().includes(query) &&
        !item.description.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    if (categoryFilter && item.category !== categoryFilter) {
      return false;
    }
    return true;
  });

  // Group items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, LibraryItem[]>);

  // Filter external links
  const filteredExternalLinks = externalLinks.filter((link) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !link.name.toLowerCase().includes(query) &&
        !link.description.toLowerCase().includes(query) &&
        !link.tags?.some(tag => tag.toLowerCase().includes(query))
      ) {
        return false;
      }
    }
    if (countryFilter && link.country !== countryFilter) {
      return false;
    }
    if (tagFilter && !link.tags?.includes(tagFilter)) {
      return false;
    }
    return true;
  });

  // Get unique tags from external links
  const allTags = Array.from(new Set(externalLinks.flatMap(link => link.tags || [])));

  const handleAddLink = () => {
    if (!newLink.name || !newLink.url) return;

    const newLinkItem: LibraryItem = {
      id: `ext-${Date.now()}`,
      name: newLink.name,
      description: newLink.description,
      url: newLink.url,
      category: 'external_link',
      tags: newLink.tags.split(',').map((t) => t.trim()).filter(Boolean),
      country: newLink.country,
      createdAt: new Date(),
    };

    setExternalLinks([newLinkItem, ...externalLinks]);
    setNewLink({
      name: '',
      description: '',
      url: '',
      country: 'global',
      tags: '',
    });
    setIsAddLinkModalOpen(false);
  };

  const handleDeleteLink = (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      setExternalLinks(externalLinks.filter(link => link.id !== id));
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.url) return;

    addLibraryItem({
      name: newItem.name,
      description: newItem.description,
      url: newItem.url,
      category: newItem.category as LibraryItem['category'],
      tags: newItem.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });

    setNewItem({
      name: '',
      description: '',
      url: '',
      category: 'external_link',
      tags: '',
    });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteLibraryItem(id);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Library</h1>
            <p className="text-sm text-gray-500">
              Proposals and templates
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            options={[{ value: '', label: 'All Categories' }, ...CATEGORY_OPTIONS]}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="proposals">
          <TabsList className="mb-6">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="template">Templates</TabsTrigger>
            <TabsTrigger value="external_links" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              External Links
            </TabsTrigger>
          </TabsList>

          {/* Proposals Tab */}
          <TabsContent value="proposals">
            <div className="mb-4 flex gap-4">
              <Select
                options={[
                  { value: '', label: 'All Statuses' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'pending_approval', label: 'Pending Approval' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'rejected', label: 'Rejected' },
                  { value: 'on_hold', label: 'On Hold' },
                ]}
                value={proposalStatusFilter}
                onChange={(e) => setProposalStatusFilter(e.target.value)}
                className="w-48"
              />
            </div>
            {filteredProposals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FolderOpen className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">No proposals found</h3>
                <p className="mb-4 text-sm text-gray-500">
                  Create a new proposal to get started
                </p>
                <Button onClick={() => setActiveSection('new-proposal')}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Proposal
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProposals.map((proposal) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    onView={() => {
                      setCurrentProposal(proposal);
                      setActiveSection('view-proposal');
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="template">
            {!groupedItems['template'] || groupedItems['template'].length === 0 ? (
              <EmptyState onAdd={() => setIsAddModalOpen(true)} category="template" />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupedItems['template'].map((item) => (
                  <TemplateCard key={item.id} item={item} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* External Links Tab */}
          <TabsContent value="external_links">
            <div className="mb-4 flex flex-wrap gap-4">
              <Select
                options={COUNTRY_OPTIONS}
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-48"
              />
              <Select
                options={[
                  { value: '', label: 'All Tags' },
                  ...allTags.map(tag => ({ value: tag, label: tag })),
                ]}
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-48"
              />
              <Button onClick={() => setIsAddLinkModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>

            {filteredExternalLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ExternalLink className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-lg font-medium text-gray-900">No external links found</h3>
                <p className="mb-4 text-sm text-gray-500">
                  Add links to external resources like census data, statistics portals, and research tools
                </p>
                <Button onClick={() => setIsAddLinkModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Link
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredExternalLinks.map((link) => (
                  <ExternalLinkCard key={link.id} link={link} onDelete={handleDeleteLink} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Resource"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g., Margin of Error Calculator"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Short description of the resource"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              URL <span className="text-red-500">*</span>
            </label>
            <Input
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select
              options={CATEGORY_OPTIONS}
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tags
            </label>
            <Input
              value={newItem.tags}
              onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
              placeholder="comma, separated, tags"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem} disabled={!newItem.name || !newItem.url}>
              Add Resource
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add External Link Modal */}
      <Modal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
        title="Add External Link"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={newLink.name}
              onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
              placeholder="e.g., US Census Bureau"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              value={newLink.description}
              onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
              placeholder="Brief description of the resource"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              URL <span className="text-red-500">*</span>
            </label>
            <Input
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Country
            </label>
            <Select
              options={COUNTRY_OPTIONS.filter(c => c.value !== '')}
              value={newLink.country}
              onChange={(e) => setNewLink({ ...newLink, country: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tags
            </label>
            <Input
              value={newLink.tags}
              onChange={(e) => setNewLink({ ...newLink, tags: e.target.value })}
              placeholder="population, demographics, census (comma separated)"
            />
            <p className="mt-1 text-xs text-gray-500">
              Add tags to help categorize and find this link
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsAddLinkModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLink} disabled={!newLink.name || !newLink.url}>
              Add Link
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EmptyState({ onAdd, category }: { onAdd: () => void; category?: string }) {
  const categoryLabel = category ?
    CATEGORY_OPTIONS.find((c) => c.value === category)?.label || category :
    'resources';

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <LibraryIcon className="mb-4 h-12 w-12 text-gray-300" />
      <h3 className="mb-2 text-lg font-medium text-gray-900">No {categoryLabel.toLowerCase()}</h3>
      <p className="mb-4 text-sm text-gray-500">
        Add your first resource to start building your library
      </p>
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Resource
      </Button>
    </div>
  );
}

function ProposalCard({ proposal, onView }: { proposal: Proposal; onView: () => void }) {
  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]">
            <FileText className="h-5 w-5" />
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              {proposal.code && (
                <span className="text-xs font-medium text-[#5B50BD] dark:text-[#918AD3]">{proposal.code}</span>
              )}
              <Badge className={cn('text-xs', getStatusColor(proposal.status))}>
                {proposal.status.replace('_', ' ')}
              </Badge>
            </div>
            <h3 className="font-medium text-gray-900 truncate">
              {proposal.content.title || 'Untitled Proposal'}
            </h3>
            {proposal.content.client && (
              <p className="mt-1 text-sm text-gray-500">{proposal.content.client}</p>
            )}

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onView}
                className="inline-flex items-center gap-1 text-sm text-[#5B50BD] hover:text-[#4A41A0] dark:text-[#918AD3] dark:hover:text-[#C8C4E9]"
              >
                <Eye className="h-3 w-3" />
                View
              </button>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-400">
                {formatDate(proposal.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TemplateCard({ item, onDelete }: { item: LibraryItem; onDelete: (id: string) => void }) {
  const { addProposal, setCurrentProposal, setActiveSection, currentUser } = useAppStore();

  const handleUseTemplate = () => {
    // Template content mapping based on template name
    const templateContent: Record<string, Partial<Proposal['content']>> = {
      'Brand Health Tracking Template': {
        businessObjectives: ['Track brand awareness over time', 'Monitor brand perception changes', 'Measure competitive positioning'],
        researchObjectives: ['To measure aided and unaided brand awareness', 'To track brand funnel metrics', 'To assess brand image attributes'],
        burningQuestions: ['How has brand awareness changed since last quarter?', 'What are the key drivers of brand preference?'],
      },
      'Customer Satisfaction Survey Template': {
        businessObjectives: ['Measure overall customer satisfaction', 'Identify improvement areas', 'Track NPS over time'],
        researchObjectives: ['To measure satisfaction with products/services', 'To identify key drivers of satisfaction', 'To calculate Net Promoter Score'],
        burningQuestions: ['What is our current NPS score?', 'Which touchpoints need improvement?'],
      },
      'Concept Testing Template': {
        businessObjectives: ['Identify winning concept', 'Understand improvement areas', 'Validate pricing strategy'],
        researchObjectives: ['To evaluate concept appeal', 'To measure purchase intent', 'To assess price sensitivity'],
        burningQuestions: ['Which concept has the highest purchase intent?', 'What improvements would increase appeal?'],
        advancedAnalysis: ['MaxDiff Analysis', 'Conjoint Analysis'],
      },
      'U&A Study Template': {
        businessObjectives: ['Understand category usage patterns', 'Identify growth opportunities', 'Map competitive landscape'],
        researchObjectives: ['To understand usage frequency and occasions', 'To identify unmet needs', 'To map brand funnel'],
        burningQuestions: ['What drives category choice?', 'Where are the growth opportunities?'],
      },
      'Ad Testing Template': {
        businessObjectives: ['Evaluate ad effectiveness', 'Optimize creative elements', 'Measure brand lift'],
        researchObjectives: ['To measure ad recall and recognition', 'To assess message comprehension', 'To evaluate emotional response'],
        burningQuestions: ['Does the ad communicate the key message?', 'What elements drive engagement?'],
      },
      'Price Sensitivity Template': {
        businessObjectives: ['Determine optimal price point', 'Understand price elasticity', 'Assess competitive pricing'],
        researchObjectives: ['To identify price thresholds', 'To measure price-value perception', 'To model demand curves'],
        burningQuestions: ['What is the optimal price for maximizing revenue?', 'How price sensitive are our customers?'],
        advancedAnalysis: ['Van Westendorp PSM', 'Gabor-Granger Analysis'],
      },
    };

    const templateData = templateContent[item.name] || {};

    // Create a new proposal based on the template
    const newProposal = addProposal({
      status: 'draft',
      content: {
        title: `New ${item.name.replace(' Template', '')}`,
        client: '',
        ...templateData,
      },
      author: currentUser,
    });

    setCurrentProposal(newProposal);
    setActiveSection('view-proposal');
  };

  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <FileText className="h-5 w-5" />
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            {item.description && (
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleUseTemplate}
                className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <Plus className="h-3 w-3" />
                Use Template
              </button>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-400">
                Added {formatDate(item.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(item.id)}
          className="absolute right-2 top-2 rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 hover:text-red-600 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}

function ExternalLinkCard({ link, onDelete }: { link: LibraryItem; onDelete: (id: string) => void }) {
  const countryLabel = COUNTRY_OPTIONS.find(c => c.value === link.country)?.label || link.country;

  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
            <ExternalLink className="h-5 w-5" />
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="font-medium text-gray-900 dark:text-white">{link.name}</h3>
            {link.description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{link.description}</p>
            )}

            {/* Country Badge */}
            {link.country && (
              <div className="mt-2 flex items-center gap-1">
                <Globe className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{countryLabel}</span>
              </div>
            )}

            {/* Tags */}
            {link.tags && link.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {link.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {link.tags.length > 4 && (
                  <Badge variant="default" className="text-xs">
                    +{link.tags.length - 4}
                  </Badge>
                )}
              </div>
            )}

            <div className="mt-3 flex items-center gap-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                <ExternalLink className="h-3 w-3" />
                Open Link
              </a>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-400">
                Added {formatDate(link.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(link.id)}
          className="absolute right-2 top-2 rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-100 hover:text-red-600 group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
