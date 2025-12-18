'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  FileText,
  ExternalLink,
  Link2,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Input, Button, Badge, Card, CardContent, Modal, Select, Dropdown, DropdownItem, DropdownSeparator, toast } from '@/components/ui';
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

export function MobileLibrary() {
  const {
    libraryItems,
    addLibraryItem,
    deleteLibraryItem,
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    url: '',
    category: 'external_link',
    tags: '',
  });

  // Filter resources
  const filteredItems = libraryItems.filter((item) => {
    if (categoryFilter && item.category !== categoryFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
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
    setNewItem({ name: '', description: '', url: '', category: 'external_link', tags: '' });
    setAddModalOpen(false);
    toast.success('Resource added');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <Select
          options={[{ value: '', label: 'All Categories' }, ...CATEGORY_OPTIONS]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Link2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Add your first resource
            </p>
            <Button onClick={() => setAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const Icon = CATEGORY_ICONS[item.category] || FileText;
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EDE9F9] dark:bg-[#231E51] text-[#5B50BD] dark:text-[#918AD3]"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0"
                      >
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        )}
                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="default" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Added {formatDate(item.createdAt)}
                        </p>
                      </a>
                      <Dropdown
                        trigger={
                          <button className="flex-shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        }
                        align="right"
                      >
                        <DropdownItem
                          variant="destructive"
                          onClick={() => {
                            deleteLibraryItem(item.id);
                            toast.success('Resource deleted');
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Resource"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Resource name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <Input
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Brief description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL <span className="text-red-500">*</span>
            </label>
            <Input
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <Select
              options={CATEGORY_OPTIONS}
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags
            </label>
            <Input
              value={newItem.tags}
              onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
              placeholder="comma, separated, tags"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setAddModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAddItem} disabled={!newItem.name || !newItem.url} className="flex-1">
              Add
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
