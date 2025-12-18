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
  FileText,
  FileDown,
  Presentation,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Button, Input, Textarea, Select, Badge, Modal, toast } from '@/components/ui';
import type { Proposal, ProposalContent, User, Market } from '@/types';

interface ProposalEditorProps {
  proposal: Proposal;
  onSave: (content: ProposalContent) => void;
  externalActiveSection?: string;
  onSectionChange?: (sectionId: string) => void;
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
  { id: 'loi', label: 'LOI (Length of Interview)', icon: BarChart3, required: true },
  { id: 'markets', label: 'Markets', icon: Globe, required: true },
  { id: 'quotas', label: 'Quota Recommendations', icon: BarChart3, required: false },
  { id: 'advancedAnalysis', label: 'Advanced Analysis', icon: BarChart3, required: false },
  { id: 'referenceProjects', label: 'Reference Projects', icon: LinkIcon, required: false },
];

export function ProposalEditor({ proposal, onSave, externalActiveSection, onSectionChange }: ProposalEditorProps) {
  const { projects, currentUser, submitForApproval, updateProposal, setActiveSection: setGlobalActiveSection } = useAppStore();
  const [content, setContent] = useState<ProposalContent>(proposal.content);
  const [activeSection, setActiveSectionInternal] = useState('title');
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [coworkingModalOpen, setCoworkingModalOpen] = useState(false);
  const [versionsModalOpen, setVersionsModalOpen] = useState(false);
  const [feasibilityModalOpen, setFeasibilityModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedApprover, setSelectedApprover] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [coworkingEmail, setCoworkingEmail] = useState('');
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  // Wrapper for setActiveSection that also calls callback
  const setActiveSection = (sectionId: string) => {
    setActiveSectionInternal(sectionId);
    onSectionChange?.(sectionId);
  };

  // Sync with external active section (from RightSidebar)
  useEffect(() => {
    if (externalActiveSection) {
      // Map RightSidebar section IDs to ProposalEditor section IDs
      const sectionMap: Record<string, string> = {
        'header': 'title',
        'background': 'background',
        'businessObjectives': 'businessObjectives',
        'researchObjectives': 'researchObjectives',
        'burningQuestions': 'burningQuestions',
        'targetDefinition': 'targetDefinition',
        'sampleSize': 'sampleSize',
        'loi': 'loi',
        'markets': 'markets',
        'quotas': 'quotas',
        'advancedAnalysis': 'advancedAnalysis',
        'referenceProjects': 'referenceProjects',
      };
      const mappedSection = sectionMap[externalActiveSection] || externalActiveSection;
      if (mappedSection && SECTION_CONFIG.some(s => s.id === mappedSection)) {
        setActiveSectionInternal(mappedSection);
      }
    }
  }, [externalActiveSection]);

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
    toast.success('Draft saved', 'Your proposal has been saved successfully.');
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
    toast.success('Submitted for approval', 'Your proposal has been sent to the approver.');
  };

  const handleExport = async (format: 'word' | 'pdf' | 'ppt') => {
    toast.info(`Exporting as ${format.toUpperCase()}`, 'Your document is being prepared for download...');

    const fileName = `${content.title || 'proposal'}_${proposal.code || proposal.id}`;

    try {
      if (format === 'ppt') {
        // Generate PowerPoint using pptxgenjs (dynamic import for SSR compatibility)
        const pptxgenModule = await import('pptxgenjs');
        const pptxgen = pptxgenModule.default;
        const pptx = new pptxgen();

        // Set presentation properties
        pptx.title = content.title || 'Untitled Proposal';
        pptx.author = proposal.author.name;

        // Title Slide
        const titleSlide = pptx.addSlide();
        titleSlide.addText(content.title || 'Untitled Proposal', {
          x: 0.5,
          y: 2,
          w: 9,
          h: 1.5,
          fontSize: 36,
          bold: true,
          color: '5B50BD',
          align: 'center',
        });
        titleSlide.addText(`Client: ${content.client || 'N/A'}`, {
          x: 0.5,
          y: 3.5,
          w: 9,
          h: 0.5,
          fontSize: 18,
          color: '666666',
          align: 'center',
        });
        titleSlide.addText(`${proposal.code || 'Draft'} | ${new Date().toLocaleDateString()}`, {
          x: 0.5,
          y: 4.2,
          w: 9,
          h: 0.5,
          fontSize: 12,
          color: '999999',
          align: 'center',
        });

        // Background Slide
        if (content.background) {
          const bgSlide = pptx.addSlide();
          bgSlide.addText('Background / Context', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.6,
            fontSize: 24,
            bold: true,
            color: '5B50BD',
          });
          bgSlide.addText(content.background, {
            x: 0.5,
            y: 1.3,
            w: 9,
            h: 4,
            fontSize: 14,
            color: '333333',
            valign: 'top',
          });
        }

        // Business Objectives Slide
        if (content.businessObjectives && content.businessObjectives.length > 0) {
          const boSlide = pptx.addSlide();
          boSlide.addText('Business Objectives', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.6,
            fontSize: 24,
            bold: true,
            color: '5B50BD',
          });
          content.businessObjectives.forEach((obj, i) => {
            boSlide.addText(`${i + 1}. ${obj}`, {
              x: 0.5,
              y: 1.3 + i * 0.5,
              w: 9,
              h: 0.5,
              fontSize: 14,
              color: '333333',
              bullet: true,
            });
          });
        }

        // Research Objectives Slide
        if (content.researchObjectives && content.researchObjectives.length > 0) {
          const roSlide = pptx.addSlide();
          roSlide.addText('Research Objectives', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.6,
            fontSize: 24,
            bold: true,
            color: '5B50BD',
          });
          content.researchObjectives.forEach((obj, i) => {
            roSlide.addText(obj, {
              x: 0.5,
              y: 1.3 + i * 0.5,
              w: 9,
              h: 0.5,
              fontSize: 14,
              color: '333333',
              bullet: true,
            });
          });
        }

        // Target & Sample Slide
        const targetSlide = pptx.addSlide();
        targetSlide.addText('Target & Sample', {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.6,
          fontSize: 24,
          bold: true,
          color: '5B50BD',
        });
        targetSlide.addText('Target Definition:', {
          x: 0.5,
          y: 1.3,
          w: 9,
          h: 0.4,
          fontSize: 14,
          bold: true,
          color: '333333',
        });
        targetSlide.addText(content.targetDefinition || 'Not specified', {
          x: 0.5,
          y: 1.7,
          w: 9,
          h: 1,
          fontSize: 12,
          color: '666666',
        });
        targetSlide.addText(`Total Sample Size: ${content.sampleSize?.toLocaleString() || 'N/A'}`, {
          x: 0.5,
          y: 3,
          w: 9,
          h: 0.5,
          fontSize: 16,
          bold: true,
          color: '5B50BD',
        });

        // Markets Slide
        if (content.markets && content.markets.length > 0) {
          const marketsSlide = pptx.addSlide();
          marketsSlide.addText('Markets', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.6,
            fontSize: 24,
            bold: true,
            color: '5B50BD',
          });

          const tableData = [
            [{ text: 'Country', options: { bold: true, fill: { color: 'EDE9F9' } } }, { text: 'Language', options: { bold: true, fill: { color: 'EDE9F9' } } }, { text: 'Sample Size', options: { bold: true, fill: { color: 'EDE9F9' } } }],
            ...content.markets.map(m => [m.country, m.language, m.sampleSize.toString()]),
          ];

          marketsSlide.addTable(tableData as any[], {
            x: 0.5,
            y: 1.3,
            w: 9,
            colW: [3, 3, 3],
            fontSize: 12,
            border: { pt: 0.5, color: 'CCCCCC' },
          });
        }

        // Save the presentation
        await pptx.writeFile({ fileName: `${fileName}.pptx` });
      } else if (format === 'pdf') {
        // Generate PDF using jsPDF
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 20;
        const lineHeight = 7;
        const margin = 20;
        const maxWidth = pageWidth - 2 * margin;

        // Helper to add text and handle page breaks
        const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
          doc.setFontSize(fontSize);
          doc.setFont('helvetica', isBold ? 'bold' : 'normal');
          const lines = doc.splitTextToSize(text, maxWidth);
          lines.forEach((line: string) => {
            if (y > 270) {
              doc.addPage();
              y = 20;
            }
            doc.text(line, margin, y);
            y += lineHeight;
          });
        };

        const addSection = (title: string, content: string | string[] | undefined) => {
          y += 5;
          addText(title, 14, true);
          y += 2;
          if (Array.isArray(content)) {
            content.forEach((item, i) => addText(`${i + 1}. ${item}`));
          } else {
            addText(content || 'Not specified');
          }
        };

        // Title
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(content.title || 'Untitled Proposal', margin, y);
        y += 10;

        // Meta info
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text(`Code: ${proposal.code || 'Draft'} | Status: ${proposal.status} | Generated: ${new Date().toLocaleDateString()}`, margin, y);
        y += 15;
        doc.setTextColor(0);

        // Client
        addSection('CLIENT INFORMATION', `Client: ${content.client || 'N/A'}\nContact: ${content.contact || 'N/A'}`);

        // Background
        addSection('BACKGROUND / CONTEXT', content.background);

        // Business Objectives
        addSection('BUSINESS OBJECTIVES', content.businessObjectives);

        // Research Objectives
        addSection('RESEARCH OBJECTIVES', content.researchObjectives);

        // Burning Questions
        addSection('BURNING QUESTIONS', content.burningQuestions);

        // Target Definition
        addSection('TARGET DEFINITION', content.targetDefinition);

        // Sample Size
        addSection('SAMPLE SIZE', `Total: ${content.sampleSize?.toLocaleString() || 'N/A'}`);

        // Markets
        if (content.markets && content.markets.length > 0) {
          y += 5;
          addText('MARKETS', 14, true);
          y += 2;
          content.markets.forEach(m => addText(`• ${m.country} (${m.language}): n=${m.sampleSize}`));
        }

        // Advanced Analysis
        addSection('ADVANCED ANALYSIS', content.advancedAnalysis);

        // Footer
        y += 10;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Author: ${proposal.author.name}`, margin, y);

        doc.save(`${fileName}.pdf`);
      } else {
        // Generate DOCX using docx library
        const docChildren: Paragraph[] = [];

        // Title
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: content.title || 'Untitled Proposal', bold: true, size: 48 })],
            heading: HeadingLevel.TITLE,
            spacing: { after: 200 },
          })
        );

        // Meta info
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: `Code: ${proposal.code || 'Draft'} | Status: ${proposal.status} | Generated: ${new Date().toLocaleDateString()}`, size: 20, color: '666666' }),
            ],
            spacing: { after: 400 },
          })
        );

        // Helper to add sections
        const addDocSection = (title: string, items: string | string[] | undefined) => {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: title, bold: true, size: 28 })],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            })
          );

          if (Array.isArray(items) && items.length > 0) {
            items.forEach((item, i) => {
              docChildren.push(
                new Paragraph({
                  children: [new TextRun({ text: `${i + 1}. ${item}`, size: 24 })],
                  spacing: { after: 100 },
                })
              );
            });
          } else if (typeof items === 'string' && items) {
            docChildren.push(
              new Paragraph({
                children: [new TextRun({ text: items, size: 24 })],
                spacing: { after: 100 },
              })
            );
          } else {
            docChildren.push(
              new Paragraph({
                children: [new TextRun({ text: 'Not specified', size: 24, italics: true, color: '999999' })],
                spacing: { after: 100 },
              })
            );
          }
        };

        // Add sections
        addDocSection('Client Information', `Client: ${content.client || 'N/A'}\nContact: ${content.contact || 'N/A'}`);
        addDocSection('Background / Context', content.background);
        addDocSection('Business Objectives', content.businessObjectives);
        addDocSection('Research Objectives', content.researchObjectives);
        addDocSection('Burning Questions', content.burningQuestions);
        addDocSection('Target Definition', content.targetDefinition);
        addDocSection('Sample Size', `Total: ${content.sampleSize?.toLocaleString() || 'N/A'}`);

        // Markets
        if (content.markets && content.markets.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [new TextRun({ text: 'Markets', bold: true, size: 28 })],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            })
          );
          content.markets.forEach(m => {
            docChildren.push(
              new Paragraph({
                children: [new TextRun({ text: `• ${m.country} (${m.language}): n=${m.sampleSize}`, size: 24 })],
                spacing: { after: 100 },
              })
            );
          });
        }

        addDocSection('Advanced Analysis', content.advancedAnalysis);

        // Author footer
        docChildren.push(
          new Paragraph({
            children: [new TextRun({ text: `Author: ${proposal.author.name}`, size: 20, color: '666666' })],
            spacing: { before: 400 },
          })
        );

        const doc = new Document({
          sections: [{
            properties: {},
            children: docChildren,
          }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${fileName}.docx`);
      }

      toast.success('Export complete', `Your ${format.toUpperCase()} file has been downloaded.`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed', 'There was an error generating your document.');
    }
  };

  const handleAIRephrase = (sectionId: string) => {
    // In real app, this would call AI API to rephrase content
    toast.info('AI Processing', `Rephrasing ${sectionId} content...`);
  };

  const isProposalComplete = () => {
    return (
      content.title &&
      content.client &&
      content.targetDefinition &&
      content.sampleSize &&
      content.loi &&
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
    <div className="flex h-full min-w-0 overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header Actions */}
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 px-4 py-2 gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setVersionsModalOpen(true)} className="whitespace-nowrap px-2.5">
              <History className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Versions</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCoworkingModalOpen(true)} className="whitespace-nowrap px-2.5">
              <Users className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Coworking</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFeasibilityModalOpen(true)} className="whitespace-nowrap px-2.5">
              <ClipboardCheck className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Feasibility</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="warning" className="mr-1 hidden sm:flex">
                Unsaved
              </Badge>
            )}
            <Button variant="secondary" size="sm" onClick={handleSave} className="whitespace-nowrap px-3">
              <Save className="h-4 w-4 sm:mr-1.5 flex-shrink-0" />
              <span className="hidden sm:inline">Save Draft</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setApprovalModalOpen(true)}
              disabled={!isProposalComplete()}
              className="whitespace-nowrap px-3"
            >
              <Send className="h-4 w-4 sm:mr-1.5 flex-shrink-0" />
              <span className="hidden sm:inline">Submit</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setExportModalOpen(true)} className="whitespace-nowrap px-3">
              <Download className="h-4 w-4 sm:mr-1.5 flex-shrink-0" />
              <span className="hidden sm:inline">Export</span>
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

            {/* LOI (Length of Interview) */}
            {activeSection === 'loi' && (
              <SectionEditor
                title="LOI (Length of Interview)"
                description="Survey duration in minutes - affects pricing and respondent experience"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={content.loi || ''}
                      onChange={(e) => updateContent('loi', parseInt(e.target.value) || undefined)}
                      placeholder="e.g., 15"
                      className="w-32"
                    />
                    <span className="text-sm text-gray-500">minutes</span>
                  </div>
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Pricing Impact:</strong> Survey duration directly affects respondent costs.
                      A 5-minute survey costs significantly less than a 20-minute survey.
                    </p>
                    <ul className="mt-2 text-xs text-blue-600 dark:text-blue-400 space-y-1">
                      <li>• 5-10 min: Lower cost, higher response rates</li>
                      <li>• 10-15 min: Standard duration</li>
                      <li>• 15-20 min: Premium pricing</li>
                      <li>• 20+ min: May require incentive adjustments</li>
                    </ul>
                  </div>
                </div>
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
                <div className="mt-3 rounded-lg bg-[#EDE9F9] dark:bg-[#231E51] p-4">
                  <p className="mb-2 text-sm font-medium text-[#5B50BD] dark:text-[#918AD3]">AI Recommendations:</p>
                  <ul className="space-y-1 text-sm text-[#5B50BD] dark:text-[#918AD3]">
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
          <div className="flex gap-2">
            <Input
              placeholder="Enter email address"
              value={coworkingEmail}
              onChange={(e) => setCoworkingEmail(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => {
                if (coworkingEmail && !invitedUsers.includes(coworkingEmail)) {
                  setInvitedUsers([...invitedUsers, coworkingEmail]);
                  setCoworkingEmail('');
                }
              }}
            >
              Add
            </Button>
          </div>
          {invitedUsers.length > 0 && (
            <div className="rounded-lg border p-3">
              <p className="mb-2 text-xs font-medium text-gray-500">Invited Users</p>
              <div className="space-y-2">
                {invitedUsers.map((email, i) => (
                  <div key={i} className="flex items-center justify-between rounded bg-gray-50 px-3 py-2 text-sm">
                    <span>{email}</span>
                    <button
                      onClick={() => setInvitedUsers(invitedUsers.filter((_, idx) => idx !== i))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCoworkingModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast.success('Invitations sent', `${invitedUsers.length} team member(s) have been invited.`);
                setInvitedUsers([]);
                setCoworkingModalOpen(false);
              }}
              disabled={invitedUsers.length === 0}
            >
              <Users className="mr-2 h-4 w-4" />
              Send Invites
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
            <div className="text-center py-8">
              <History className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No previous versions</p>
              <p className="text-xs text-gray-400 mt-1">Versions are created when you save changes</p>
            </div>
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setContent(version.content);
                    setVersionsModalOpen(false);
                    toast.success('Version restored', 'Click Save Draft to keep changes.');
                  }}
                >
                  Restore
                </Button>
              </div>
            ))
          )}
        </div>
      </Modal>

      {/* Feasibility Check Modal */}
      <Modal
        isOpen={feasibilityModalOpen}
        onClose={() => setFeasibilityModalOpen(false)}
        title="Quick Feasibility Check"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Based on current proposal details, here's a quick feasibility assessment.
          </p>

          <div className="rounded-lg bg-gray-50 p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Sample Size</span>
              <span className="font-medium">{content.sampleSize?.toLocaleString() || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Markets</span>
              <span className="font-medium">{content.markets?.length || 0} countries</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Target Audience</span>
              <span className="font-medium text-right max-w-[200px] truncate">
                {content.targetDefinition || 'Not defined'}
              </span>
            </div>
          </div>

          {content.sampleSize && content.markets && content.markets.length > 0 ? (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <div className="flex items-center gap-2 text-green-700">
                <ClipboardCheck className="h-5 w-5" />
                <span className="font-medium">Likely Feasible</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Estimated timeline: 2-4 weeks for {content.sampleSize} completes
              </p>
            </div>
          ) : (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm text-amber-700">
                Please complete sample size and markets to get feasibility estimate.
              </p>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setFeasibilityModalOpen(false);
                setGlobalActiveSection('feasibility');
              }}
            >
              Full Feasibility Tool
            </Button>
            <Button onClick={() => setFeasibilityModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Export Modal */}
      <Modal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title="Export Proposal"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Choose a format to export your proposal.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => {
                handleExport('word');
                setExportModalOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-8 w-8 text-[#5B50BD] dark:text-[#918AD3]" />
              <div>
                <p className="font-medium">Word Document</p>
                <p className="text-sm text-gray-500">Export as .docx file</p>
              </div>
            </button>

            <button
              onClick={() => {
                handleExport('pdf');
                setExportModalOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <FileDown className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-medium">PDF Document</p>
                <p className="text-sm text-gray-500">Export as .pdf file</p>
              </div>
            </button>

            <button
              onClick={() => {
                handleExport('ppt');
                setExportModalOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <Presentation className="h-8 w-8 text-orange-600" />
              <div>
                <p className="font-medium">PowerPoint Presentation</p>
                <p className="text-sm text-gray-500">Export as .pptx file</p>
              </div>
            </button>
          </div>

          <Button variant="outline" onClick={() => setExportModalOpen(false)} className="w-full">
            Cancel
          </Button>
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
