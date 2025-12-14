'use client';

import { useMemo } from 'react';
import {
  FileText,
  Building2,
  User,
  BookOpen,
  Target,
  HelpCircle,
  Users,
  BarChart3,
  Globe,
  PieChart,
  TrendingUp,
  Link as LinkIcon,
  CheckCircle,
  Circle,
  ChevronRight,
  PanelRightClose,
  PanelRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProposalContent } from '@/types';

interface RightSidebarProps {
  content: ProposalContent;
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

interface SectionField {
  key: string;
  label: string;
  required: boolean;
  isArray?: boolean;
}

interface Section {
  id: string;
  label: string;
  icon: typeof FileText;
  description?: string;
  fields: SectionField[];
}

const SECTIONS: Section[] = [
  {
    id: 'header',
    label: 'Header Information',
    icon: FileText,
    fields: [
      { key: 'title', label: 'Title (Proposal Name)', required: true },
      { key: 'client', label: 'Client', required: true },
      { key: 'contact', label: 'Contact', required: false },
    ],
  },
  {
    id: 'background',
    label: '1. Background / Context',
    icon: BookOpen,
    fields: [{ key: 'background', label: 'Background', required: false }],
  },
  {
    id: 'businessObjectives',
    label: '2. Business Objectives',
    icon: Target,
    description: 'Short bullet list (marketing goals)',
    fields: [{ key: 'businessObjectives', label: 'Business Objectives', required: false, isArray: true }],
  },
  {
    id: 'researchObjectives',
    label: '3. Research Objectives',
    icon: Target,
    description: '"To..." statements + research questions',
    fields: [{ key: 'researchObjectives', label: 'Research Objectives', required: false, isArray: true }],
  },
  {
    id: 'burningQuestions',
    label: 'Burning Questions',
    icon: HelpCircle,
    fields: [{ key: 'burningQuestions', label: 'Burning Questions', required: false, isArray: true }],
  },
  {
    id: 'targetDefinition',
    label: '4. Target Definition',
    icon: Users,
    fields: [{ key: 'targetDefinition', label: 'Target Definition', required: true }],
  },
  {
    id: 'sampleSize',
    label: '5. Sample Size',
    icon: BarChart3,
    fields: [{ key: 'sampleSize', label: 'Sample Size', required: true }],
  },
  {
    id: 'markets',
    label: '6. Markets',
    icon: Globe,
    description: 'Should include language',
    fields: [{ key: 'markets', label: 'Markets', required: true, isArray: true }],
  },
  {
    id: 'quotas',
    label: '7. Quota',
    icon: PieChart,
    description: 'System should recommend',
    fields: [{ key: 'quotas', label: 'Quotas', required: false, isArray: true }],
  },
  {
    id: 'advancedAnalysis',
    label: 'Advanced Analysis',
    icon: TrendingUp,
    description: 'System should recommend',
    fields: [{ key: 'advancedAnalysis', label: 'Advanced Analysis', required: false, isArray: true }],
  },
  {
    id: 'referenceProjects',
    label: '8. Reference Projects',
    icon: LinkIcon,
    description: 'Reference proposal list',
    fields: [{ key: 'referenceProjects', label: 'Reference Projects', required: false, isArray: true }],
  },
];

export function RightSidebar({ content, activeSection, onSectionClick, collapsed = false, onToggle }: RightSidebarProps) {
  const sectionStatus = useMemo(() => {
    const status: Record<string, { complete: boolean; hasContent: boolean }> = {};

    SECTIONS.forEach((section) => {
      let hasContent = false;
      let allRequiredComplete = true;

      section.fields.forEach((field) => {
        const value = content[field.key as keyof ProposalContent];

        if (field.isArray) {
          hasContent = hasContent || (Array.isArray(value) && value.length > 0);
          if (field.required && (!Array.isArray(value) || value.length === 0)) {
            allRequiredComplete = false;
          }
        } else {
          hasContent = hasContent || (value !== undefined && value !== null && value !== '');
          if (field.required && !value) {
            allRequiredComplete = false;
          }
        }
      });

      status[section.id] = {
        complete: allRequiredComplete && hasContent,
        hasContent,
      };
    });

    return status;
  }, [content]);

  const completionStats = useMemo(() => {
    const requiredSections = SECTIONS.filter((s) =>
      s.fields.some((f) => f.required)
    );
    const completedRequired = requiredSections.filter(
      (s) => sectionStatus[s.id]?.complete
    ).length;

    return {
      total: SECTIONS.length,
      completed: Object.values(sectionStatus).filter((s) => s.hasContent).length,
      requiredTotal: requiredSections.length,
      requiredCompleted: completedRequired,
    };
  }, [sectionStatus]);

  const getPreviewValue = (section: typeof SECTIONS[0]): string => {
    const field = section.fields[0];
    const value = content[field.key as keyof ProposalContent];

    if (!value) return '-';

    if (field.isArray && Array.isArray(value)) {
      if (field.key === 'markets') {
        return `${value.length} market${value.length !== 1 ? 's' : ''}`;
      }
      return `${value.length} item${value.length !== 1 ? 's' : ''}`;
    }

    if (typeof value === 'number') {
      return `n=${value.toLocaleString()}`;
    }

    if (typeof value === 'string') {
      return value.length > 30 ? value.substring(0, 30) + '...' : value;
    }

    return '-';
  };

  return (
    <aside className={cn(
      "border-l border-gray-200 bg-white flex flex-col h-full transition-all duration-200",
      collapsed ? "w-12" : "w-80"
    )}>
      {/* Header */}
      <div className={cn("border-b border-gray-200", collapsed ? "p-2" : "p-4")}>
        <div className="flex items-center justify-between">
          {!collapsed && <h2 className="text-sm font-semibold text-gray-900">Section Content</h2>}
          {onToggle && (
            <button
              onClick={onToggle}
              className="flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <PanelRight className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
            </button>
          )}
        </div>
        {!collapsed && (
          <>
            <p className="mt-1 text-xs text-gray-500">
              {completionStats.requiredCompleted}/{completionStats.requiredTotal} required sections complete
            </p>

            {/* Progress Bar */}
            <div className="mt-3 h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${(completionStats.requiredCompleted / completionStats.requiredTotal) * 100}%`,
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto">
        <nav className={cn("space-y-1", collapsed ? "p-1" : "p-2")}>
          {SECTIONS.map((section) => {
            const status = sectionStatus[section.id];
            const isActive = activeSection === section.id;
            const hasRequired = section.fields.some((f) => f.required);

            return (
              <button
                key={section.id}
                onClick={() => onSectionClick?.(section.id)}
                className={cn(
                  'w-full rounded-lg text-left transition-all',
                  collapsed ? 'p-2 flex items-center justify-center' : 'p-3',
                  isActive
                    ? 'bg-blue-50 ring-1 ring-blue-200'
                    : 'hover:bg-gray-50'
                )}
                title={collapsed ? section.label : undefined}
              >
                {collapsed ? (
                  /* Collapsed: show only icon */
                  <div className="relative">
                    <section.icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    )} />
                    {status?.complete && (
                      <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-green-500 bg-white rounded-full" />
                    )}
                  </div>
                ) : (
                  /* Expanded: show full content */
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className="mt-0.5">
                      {status?.complete ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : hasRequired ? (
                        <Circle className="h-4 w-4 text-gray-300" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-200" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <section.icon className={cn(
                          'h-4 w-4 flex-shrink-0',
                          isActive ? 'text-blue-600' : 'text-gray-400'
                        )} />
                        <span className={cn(
                          'text-sm font-medium truncate',
                          isActive ? 'text-blue-900' : 'text-gray-700'
                        )}>
                          {section.label}
                        </span>
                        {hasRequired && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                      </div>

                      {section.description && (
                        <p className="mt-0.5 text-xs text-gray-400 truncate">
                          {section.description}
                        </p>
                      )}

                      {/* Preview Value */}
                      <p className={cn(
                        'mt-1 text-xs truncate',
                        status?.hasContent ? 'text-gray-600' : 'text-gray-300'
                      )}>
                        {getPreviewValue(section)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className={cn(
                      'h-4 w-4 flex-shrink-0 transition-transform',
                      isActive ? 'text-blue-600 rotate-90' : 'text-gray-300'
                    )} />
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer - Quick Stats */}
      {!collapsed ? (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-white p-2 shadow-sm">
              <p className="text-lg font-semibold text-gray-900">
                {content.sampleSize?.toLocaleString() || '-'}
              </p>
              <p className="text-xs text-gray-500">Total Sample</p>
            </div>
            <div className="rounded-lg bg-white p-2 shadow-sm">
              <p className="text-lg font-semibold text-gray-900">
                {content.markets?.length || 0}
              </p>
              <p className="text-xs text-gray-500">Markets</p>
            </div>
          </div>

          {/* Client Info */}
          {content.client && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
              <Building2 className="h-3 w-3" />
              <span className="truncate">{content.client}</span>
              {content.contact && (
                <>
                  <span className="text-gray-300">|</span>
                  <User className="h-3 w-3" />
                  <span className="truncate">{content.contact}</span>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="border-t border-gray-200 p-2 bg-gray-50">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="rounded-lg bg-white p-1.5 shadow-sm" title="Sample Size">
              <BarChart3 className="h-4 w-4 text-gray-400 mx-auto" />
              <p className="text-xs font-semibold text-gray-900">
                {content.sampleSize ? (content.sampleSize >= 1000 ? `${(content.sampleSize / 1000).toFixed(0)}k` : content.sampleSize) : '-'}
              </p>
            </div>
            <div className="rounded-lg bg-white p-1.5 shadow-sm" title="Markets">
              <Globe className="h-4 w-4 text-gray-400 mx-auto" />
              <p className="text-xs font-semibold text-gray-900">
                {content.markets?.length || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
