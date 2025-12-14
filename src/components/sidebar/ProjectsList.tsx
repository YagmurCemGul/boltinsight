'use client';

import { useState } from 'react';
import { Plus, FolderKanban, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Input, Modal, Button, Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui';

export function ProjectsList() {
  const { projects, addProject, updateProject, deleteProject, setActiveSection } = useAppStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<typeof projects[0] | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;

    addProject({
      name: newProjectName.trim(),
      description: newProjectDescription.trim() || undefined,
      proposals: [],
    });

    setNewProjectName('');
    setNewProjectDescription('');
    setIsCreateModalOpen(false);
  };

  const handleEditProject = () => {
    if (!editingProject || !newProjectName.trim()) return;

    updateProject(editingProject.id, {
      name: newProjectName.trim(),
      description: newProjectDescription.trim() || undefined,
    });

    setEditingProject(null);
    setNewProjectName('');
    setNewProjectDescription('');
    setIsEditModalOpen(false);
  };

  const openEditModal = (project: typeof projects[0]) => {
    setEditingProject(project);
    setNewProjectName(project.name);
    setNewProjectDescription(project.description || '');
    setIsEditModalOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  return (
    <div className="space-y-2 px-2">
      {/* Project List */}
      <div className="space-y-1">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
          >
            <button
              onClick={() => setActiveSection(`project-${project.id}`)}
              className="flex flex-1 items-center gap-2 text-left"
            >
              <FolderKanban className={cn(
                'h-4 w-4',
                project.isDefault ? 'text-amber-500' : 'text-gray-400'
              )} />
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm text-gray-700">{project.name}</p>
                <p className="text-[10px] text-gray-400">
                  {project.proposals.length} {project.proposals.length === 1 ? 'proposal' : 'proposals'}
                </p>
              </div>
            </button>

            {!project.isDefault && (
              <Dropdown
                trigger={
                  <button className="rounded p-1 text-gray-400 opacity-0 transition-opacity hover:bg-gray-200 hover:text-gray-600 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                }
                align="right"
              >
                <DropdownItem onClick={() => openEditModal(project)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem
                  variant="destructive"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownItem>
              </Dropdown>
            )}
          </div>
        ))}
      </div>

      {/* Create Project Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-500 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
      >
        <Plus className="h-4 w-4" />
        <span>Create Project</span>
      </button>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Project"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Coca-Cola 2025"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              placeholder="Optional description"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
              Create Project
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Project"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Coca-Cola 2025"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              placeholder="Optional description"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProject} disabled={!newProjectName.trim()}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
