'use client';

import { useState, useCallback } from 'react';
import {
  Globe,
  Home,
  ShoppingCart,
  User,
  FileText,
  Mail,
  Settings,
  Search,
  Menu,
  ChevronDown,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  Database,
  Server,
  Cloud,
  Lock,
  CreditCard,
  Image,
  Video,
  MessageSquare,
  Bell,
  BarChart3,
  Layers,
  GitBranch,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  Download,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  Move
} from 'lucide-react';

// Default website structure
const DEFAULT_STRUCTURE = {
  id: 'root',
  name: 'Website',
  icon: 'Globe',
  type: 'root',
  children: [
    {
      id: 'home',
      name: 'Home',
      icon: 'Home',
      type: 'page',
      url: '/',
      children: [
        { id: 'hero', name: 'Hero Section', icon: 'Image', type: 'section' },
        { id: 'features', name: 'Features', icon: 'Layers', type: 'section' },
        { id: 'testimonials', name: 'Testimonials', icon: 'MessageSquare', type: 'section' },
        { id: 'cta', name: 'Call to Action', icon: 'Bell', type: 'section' },
      ]
    },
    {
      id: 'products',
      name: 'Products',
      icon: 'ShoppingCart',
      type: 'page',
      url: '/products',
      children: [
        { id: 'product-list', name: 'Product Listing', icon: 'Layers', type: 'section' },
        { id: 'product-detail', name: 'Product Detail', icon: 'FileText', type: 'page', url: '/products/:id' },
        { id: 'product-search', name: 'Search & Filter', icon: 'Search', type: 'section' },
      ]
    },
    {
      id: 'about',
      name: 'About Us',
      icon: 'User',
      type: 'page',
      url: '/about',
      children: [
        { id: 'team', name: 'Our Team', icon: 'User', type: 'section' },
        { id: 'history', name: 'Company History', icon: 'FileText', type: 'section' },
        { id: 'values', name: 'Values & Mission', icon: 'Layers', type: 'section' },
      ]
    },
    {
      id: 'services',
      name: 'Services',
      icon: 'Settings',
      type: 'page',
      url: '/services',
      children: [
        { id: 'service-1', name: 'Service A', icon: 'FileText', type: 'page', url: '/services/a' },
        { id: 'service-2', name: 'Service B', icon: 'FileText', type: 'page', url: '/services/b' },
        { id: 'service-3', name: 'Service C', icon: 'FileText', type: 'page', url: '/services/c' },
      ]
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: 'FileText',
      type: 'page',
      url: '/blog',
      children: [
        { id: 'blog-list', name: 'Article List', icon: 'Layers', type: 'section' },
        { id: 'blog-post', name: 'Article Detail', icon: 'FileText', type: 'page', url: '/blog/:slug' },
        { id: 'blog-categories', name: 'Categories', icon: 'GitBranch', type: 'section' },
      ]
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: 'Mail',
      type: 'page',
      url: '/contact',
      children: [
        { id: 'contact-form', name: 'Contact Form', icon: 'FileText', type: 'section' },
        { id: 'map', name: 'Location Map', icon: 'Globe', type: 'section' },
        { id: 'social', name: 'Social Links', icon: 'MessageSquare', type: 'section' },
      ]
    },
    {
      id: 'auth',
      name: 'Authentication',
      icon: 'Lock',
      type: 'page',
      url: '/auth',
      children: [
        { id: 'login', name: 'Login', icon: 'User', type: 'page', url: '/auth/login' },
        { id: 'register', name: 'Register', icon: 'User', type: 'page', url: '/auth/register' },
        { id: 'forgot-password', name: 'Forgot Password', icon: 'Lock', type: 'page', url: '/auth/forgot-password' },
      ]
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'BarChart3',
      type: 'page',
      url: '/dashboard',
      protected: true,
      children: [
        { id: 'overview', name: 'Overview', icon: 'BarChart3', type: 'section' },
        { id: 'profile', name: 'Profile', icon: 'User', type: 'page', url: '/dashboard/profile' },
        { id: 'orders', name: 'Orders', icon: 'ShoppingCart', type: 'page', url: '/dashboard/orders' },
        { id: 'settings', name: 'Settings', icon: 'Settings', type: 'page', url: '/dashboard/settings' },
      ]
    },
  ]
};

// Icon mapping
const iconMap = {
  Globe, Home, ShoppingCart, User, FileText, Mail, Settings, Search,
  Menu, Monitor, Smartphone, Tablet, Database, Server, Cloud, Lock,
  CreditCard, Image, Video, MessageSquare, Bell, BarChart3, Layers, GitBranch
};

const getIcon = (iconName, className = "w-4 h-4") => {
  const IconComponent = iconMap[iconName] || Globe;
  return <IconComponent className={className} />;
};

// Node colors based on type
const nodeColors = {
  root: { bg: 'bg-purple-100 dark:bg-purple-900', border: 'border-purple-400 dark:border-purple-600', text: 'text-purple-800 dark:text-purple-200' },
  page: { bg: 'bg-blue-100 dark:bg-blue-900', border: 'border-blue-400 dark:border-blue-600', text: 'text-blue-800 dark:text-blue-200' },
  section: { bg: 'bg-green-100 dark:bg-green-900', border: 'border-green-400 dark:border-green-600', text: 'text-green-800 dark:text-green-200' },
  component: { bg: 'bg-amber-100 dark:bg-amber-900', border: 'border-amber-400 dark:border-amber-600', text: 'text-amber-800 dark:text-amber-200' },
};

// Tree Node Component
function TreeNode({ node, level = 0, expandedNodes, toggleNode, selectedNode, setSelectedNode, viewMode }) {
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedNode?.id === node.id;
  const hasChildren = node.children && node.children.length > 0;
  const colors = nodeColors[node.type] || nodeColors.page;

  return (
    <div className="select-none">
      <div
        className={`
          flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200
          ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
          ${colors.bg} ${colors.border} border-2
          hover:shadow-md
        `}
        style={{ marginLeft: `${level * 24}px` }}
        onClick={() => setSelectedNode(node)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleNode(node.id);
            }}
            className={`p-0.5 rounded hover:bg-white/50 dark:hover:bg-black/20 transition-colors ${colors.text}`}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
        {!hasChildren && <span className="w-5" />}

        <span className={colors.text}>{getIcon(node.icon)}</span>
        <span className={`font-medium text-sm ${colors.text}`}>{node.name}</span>

        {node.protected && (
          <Lock className={`w-3 h-3 ${colors.text} opacity-60`} />
        )}

        {node.url && viewMode === 'detailed' && (
          <span className="text-xs opacity-60 ml-auto font-mono">{node.url}</span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1 relative">
          <div
            className="absolute left-4 top-0 bottom-2 w-px bg-gray-300 dark:bg-gray-600"
            style={{ marginLeft: `${level * 24 + 8}px` }}
          />
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Visual Node for Diagram View
function DiagramNode({ node, x, y, onSelect, isSelected, scale }) {
  const colors = nodeColors[node.type] || nodeColors.page;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => onSelect(node)}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x="-60"
        y="-20"
        width="120"
        height="40"
        rx="8"
        className={`${isSelected ? 'stroke-blue-500' : ''} transition-all`}
        fill={node.type === 'root' ? '#a855f7' : node.type === 'page' ? '#3b82f6' : node.type === 'section' ? '#22c55e' : '#f59e0b'}
        fillOpacity="0.2"
        stroke={node.type === 'root' ? '#a855f7' : node.type === 'page' ? '#3b82f6' : node.type === 'section' ? '#22c55e' : '#f59e0b'}
        strokeWidth={isSelected ? 3 : 2}
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-xs font-medium fill-gray-800 dark:fill-gray-200"
        style={{ pointerEvents: 'none' }}
      >
        {node.name.length > 14 ? node.name.substring(0, 12) + '...' : node.name}
      </text>
    </g>
  );
}

// Main Component
export function WebsiteArchitecture({
  initialStructure = DEFAULT_STRUCTURE,
  title = "Website Architecture",
  editable = true,
  showLegend = true,
  defaultView = 'tree'
}) {
  const [structure, setStructure] = useState(initialStructure);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root', 'home', 'products', 'dashboard']));
  const [selectedNode, setSelectedNode] = useState(null);
  const [viewMode, setViewMode] = useState(defaultView); // 'tree', 'diagram', 'detailed'
  const [zoom, setZoom] = useState(1);
  const [editingNode, setEditingNode] = useState(null);
  const [newNodeName, setNewNodeName] = useState('');

  const toggleNode = useCallback((nodeId) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const getAllIds = (node) => {
      let ids = [node.id];
      if (node.children) {
        node.children.forEach(child => {
          ids = [...ids, ...getAllIds(child)];
        });
      }
      return ids;
    };
    setExpandedNodes(new Set(getAllIds(structure)));
  }, [structure]);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set(['root']));
  }, []);

  // Calculate positions for diagram view
  const calculatePositions = useCallback((node, startX = 400, startY = 40, levelHeight = 80) => {
    const positions = [];
    const connections = [];

    const processNode = (n, x, y, parentPos = null) => {
      positions.push({ node: n, x, y });

      if (parentPos) {
        connections.push({
          from: parentPos,
          to: { x, y }
        });
      }

      if (n.children && n.children.length > 0) {
        const totalWidth = n.children.length * 140;
        let childX = x - totalWidth / 2 + 70;

        n.children.forEach((child) => {
          processNode(child, childX, y + levelHeight, { x, y });
          childX += 140;
        });
      }
    };

    processNode(node, startX, startY);
    return { positions, connections };
  }, []);

  const { positions, connections } = calculatePositions(structure);

  // Export function
  const exportStructure = useCallback(() => {
    const dataStr = JSON.stringify(structure, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-architecture.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [structure]);

  // Count statistics
  const countNodes = useCallback((node, counts = { pages: 0, sections: 0, total: 0 }) => {
    counts.total++;
    if (node.type === 'page') counts.pages++;
    if (node.type === 'section') counts.sections++;
    if (node.children) {
      node.children.forEach(child => countNodes(child, counts));
    }
    return counts;
  }, []);

  const stats = countNodes(structure);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stats.pages} pages, {stats.sections} sections
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Selector */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === 'tree'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Tree
            </button>
            <button
              onClick={() => setViewMode('diagram')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === 'diagram'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Diagram
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                viewMode === 'detailed'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Detailed
            </button>
          </div>

          {/* Zoom Controls (for diagram view) */}
          {viewMode === 'diagram' && (
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(z => Math.min(2, z + 0.1))}
                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Expand/Collapse Buttons */}
          {viewMode !== 'diagram' && (
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={expandAll}
                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Expand All"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={collapseAll}
                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                title="Collapse All"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Export Button */}
          <button
            onClick={exportStructure}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tree/Diagram View */}
        <div className="flex-1 overflow-auto p-4">
          {viewMode === 'diagram' ? (
            <div className="w-full h-full overflow-auto">
              <svg
                width={Math.max(800, positions.length * 100)}
                height={Math.max(500, Math.max(...positions.map(p => p.y)) + 100)}
                style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
              >
                {/* Connections */}
                {connections.map((conn, i) => (
                  <path
                    key={i}
                    d={`M ${conn.from.x} ${conn.from.y + 20}
                        Q ${conn.from.x} ${(conn.from.y + conn.to.y) / 2},
                          ${(conn.from.x + conn.to.x) / 2} ${(conn.from.y + conn.to.y) / 2}
                        T ${conn.to.x} ${conn.to.y - 20}`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                ))}

                {/* Nodes */}
                {positions.map(({ node, x, y }) => (
                  <DiagramNode
                    key={node.id}
                    node={node}
                    x={x}
                    y={y}
                    onSelect={setSelectedNode}
                    isSelected={selectedNode?.id === node.id}
                    scale={zoom}
                  />
                ))}
              </svg>
            </div>
          ) : (
            <div className="space-y-1">
              <TreeNode
                node={structure}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                viewMode={viewMode}
              />
            </div>
          )}
        </div>

        {/* Details Panel */}
        {selectedNode && (
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Details</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Node Info */}
              <div className="p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <span className={nodeColors[selectedNode.type]?.text || 'text-gray-600'}>
                    {getIcon(selectedNode.icon, "w-5 h-5")}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{selectedNode.name}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Type:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${nodeColors[selectedNode.type]?.bg} ${nodeColors[selectedNode.type]?.text}`}>
                      {selectedNode.type}
                    </span>
                  </div>

                  {selectedNode.url && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">URL:</span>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {selectedNode.url}
                      </code>
                    </div>
                  )}

                  {selectedNode.protected && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Access:</span>
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <Lock className="w-3 h-3" />
                        Protected
                      </span>
                    </div>
                  )}

                  {selectedNode.children && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Children:</span>
                      <span className="text-gray-900 dark:text-gray-100">{selectedNode.children.length}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Children List */}
              {selectedNode.children && selectedNode.children.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Children</h4>
                  <div className="space-y-1">
                    {selectedNode.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => setSelectedNode(child)}
                        className="w-full flex items-center gap-2 p-2 text-left bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                      >
                        <span className={nodeColors[child.type]?.text || 'text-gray-600'}>
                          {getIcon(child.icon, "w-4 h-4")}
                        </span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">{child.name}</span>
                        <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center gap-6 p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Legend:</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-purple-400 dark:bg-purple-600" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Root</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-blue-400 dark:bg-blue-600" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Page</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-green-400 dark:bg-green-600" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Section</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-400 dark:bg-amber-600" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Component</span>
            </div>
            <div className="flex items-center gap-1.5 ml-4">
              <Lock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Protected Route</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export for use in other components
export default WebsiteArchitecture;
