'use client';

import { useState } from 'react';
import {
  Library as LibraryIcon,
  Plus,
  FileText,
  Search,
  Trash2,
  ExternalLink,
  Link2,
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import {
  Button,
  Input,
  Select,
  Modal,
  Card,
  CardContent,
  Badge,
} from '@/components/ui';
import type { LibraryItem } from '@/types';

const CATEGORY_OPTIONS = [
  { value: 'external_link', label: 'External Link' },
  { value: 'document', label: 'Document' },
  { value: 'resource', label: 'Resource' },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  external_link: ExternalLink,
  document: FileText,
  resource: Link2,
};

export function Library() {
  const { libraryItems, addLibraryItem, deleteLibraryItem } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
              Resources and external links
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
        {filteredItems.length === 0 ? (
          <EmptyState onAdd={() => setIsAddModalOpen(true)} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <ResourceCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        )}
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
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <LibraryIcon className="mb-4 h-12 w-12 text-gray-300" />
      <h3 className="mb-2 text-lg font-medium text-gray-900">No resources</h3>
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

function ResourceCard({ item, onDelete }: { item: LibraryItem; onDelete: (id: string) => void }) {
  const Icon = CATEGORY_ICONS[item.category] || FileText;

  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]">
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
            {item.description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
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
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#5B50BD] hover:text-[#4A41A0] dark:text-[#918AD3] dark:hover:text-[#C8C4E9] font-medium"
              >
                <ExternalLink className="h-3 w-3" />
                Open
              </a>
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
