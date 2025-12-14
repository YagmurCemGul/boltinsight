'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Upload,
  Paperclip,
  Bot,
  User,
  Loader2,
  FileText,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { cn, formatDateTime } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { Button, Textarea } from '@/components/ui';
import type { ChatMessage } from '@/types';

interface ChatInterfaceProps {
  onProposalGenerated?: (content: string) => void;
}

const templateOptions = [
  { id: 'blank', label: 'Blank Proposal' },
  { id: 'concept-test', label: 'Concept Testing Template' },
  { id: 'brand-tracking', label: 'Brand Tracking Template' },
  { id: 'segmentation', label: 'Segmentation Study Template' },
  { id: 'uat', label: 'Usage & Attitude Template' },
];

const SYSTEM_PROMPTS = {
  welcome: `Welcome! I'm here to help you create a research proposal.

You can start by:
1. Uploading a brief document
2. Pasting client requirements
3. Describing your research needs

I'll help you fill in all the required sections including:
- Background & Context
- Business Objectives
- Research Objectives
- Target Definition
- Sample Size & Markets
- Quotas & Analysis Recommendations

What would you like to start with?`,

  askForMissing: (missing: string[]) =>
    `Great progress! To complete the proposal, I still need information about:\n\n${missing.map(m => `- ${m}`).join('\n')}\n\nCould you provide details for these?`,
};

export function ChatInterface({ onProposalGenerated }: ChatInterfaceProps) {
  const { chatMessages, addChatMessage, isAiTyping, setAiTyping, clearChat } = useAppStore();
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({
        role: 'assistant',
        content: SYSTEM_PROMPTS.welcome,
      });
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0) return;

    // Add user message
    addChatMessage({
      role: 'user',
      content: input,
      attachments: attachments.map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        type: f.type,
        url: URL.createObjectURL(f),
      })),
    });

    setInput('');
    setAttachments([]);
    setAiTyping(true);

    // Simulate AI response (in real app, this would call an API)
    setTimeout(() => {
      const response = generateAIResponse(input);
      addChatMessage({
        role: 'assistant',
        content: response,
      });
      setAiTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Brand tracking study
    if (lowerMessage.includes('brand') && (lowerMessage.includes('track') || lowerMessage.includes('health'))) {
      return `I understand you're looking to set up a **Brand Health Tracking** study. This is great for measuring brand awareness, perception, and equity over time.

**Recommended Structure:**
- Frequency: Quarterly or Monthly waves
- Core metrics: Awareness, Consideration, Usage, NPS
- Competitive benchmarking included

**I'll need a few details:**
1. **Markets:** Which countries should this cover?
2. **Target Audience:** Who are we surveying? (e.g., Adults 18-54, category users)
3. **Sample Size:** Typically n=500-1000 per market for ±3-4% margin of error
4. **Competitors:** Any specific brands to track alongside?

Please share these details and I'll build out the complete proposal.`;
    }

    // Concept testing
    if (lowerMessage.includes('concept') && lowerMessage.includes('test')) {
      return `Great choice! **Concept Testing** is ideal for evaluating new ideas before launch.

**Recommended Approach:**
- Monadic or Sequential Monadic design
- Key metrics: Appeal, Relevance, Uniqueness, Purchase Intent
- Include open-ends for improvement ideas

**To proceed, I need:**
1. **Number of concepts:** How many are we testing?
2. **Target Audience:** Who should evaluate these?
3. **Markets:** Where will this launch?
4. **Sample Size:** Min n=150-200 per concept for robust results
5. **Comparison:** Any benchmark or control concept?

Share what you have and I'll structure the proposal!`;
    }

    // U&A / Usage and Attitude
    if (lowerMessage.includes('u&a') || lowerMessage.includes('usage') && lowerMessage.includes('attitude')) {
      return `**Usage & Attitude (U&A)** studies are perfect for deep-diving into consumer behavior and market dynamics.

**Typical U&A Structure:**
- Category usage behavior
- Brand funnel metrics
- Need states and occasions
- Attitudes and perceptions
- Demographics and segmentation variables

**What I need from you:**
1. **Category:** What product/service category?
2. **Markets:** Which countries?
3. **Target:** Category users or broader population?
4. **Sample Size:** Usually n=1000+ for segmentation capability
5. **Key Questions:** What business decisions will this inform?

Let me know these details to build your proposal!`;
    }

    // Sample size questions
    if (lowerMessage.includes('sample') && lowerMessage.includes('size')) {
      return `Great question! **Sample size** depends on several factors:

**Key Considerations:**
| Margin of Error | Sample Size (95% CI) |
|-----------------|---------------------|
| ±5% | n=385 |
| ±4% | n=600 |
| ±3% | n=1,067 |
| ±2% | n=2,401 |

**My Recommendations:**
- **Brand Tracking:** n=500-1000 per market
- **Concept Test:** n=150-200 per concept
- **U&A Study:** n=1000+ for segmentation
- **Subgroup Analysis:** Min n=100 per subgroup

Would you like me to calculate a specific sample size for your needs? Just tell me:
1. Desired margin of error
2. Number of subgroups to analyze
3. Population size (if limited)`;
    }

    // Segmentation
    if (lowerMessage.includes('segment')) {
      return `**Segmentation** studies help identify distinct consumer groups for targeted marketing.

**Common Approaches:**
- Attitudinal segmentation (needs/motivations)
- Behavioral segmentation (usage patterns)
- Hybrid approach (combining both)

**Requirements:**
1. **Sample Size:** Minimum n=1000-1500 for robust segments
2. **Segmentation Base:** What should define segments?
3. **Profiling Variables:** Demographics, media, shopping behavior
4. **Deliverables:** Segment personas, sizing, targeting recommendations

What category or brand is this for? I'll tailor the approach accordingly.`;
    }

    // Pricing / price research
    if (lowerMessage.includes('price') || lowerMessage.includes('pricing')) {
      return `For **Pricing Research**, I recommend considering these methodologies:

**Options:**
1. **Van Westendorp PSM:** Quick price sensitivity meter (n=200+)
2. **Gabor-Granger:** Direct price acceptance (n=300+)
3. **Conjoint Analysis:** Trade-off based pricing (n=400+)

**Key Questions:**
- New product or existing?
- Do you need competitive price positioning?
- Is this for a single market or multi-market?

Let me know your specific pricing questions and I'll recommend the best approach!`;
    }

    // Client name detection
    if (lowerMessage.includes('coca-cola') || lowerMessage.includes('nestle') || lowerMessage.includes('unilever') || lowerMessage.includes('pepsico')) {
      const clientMatch = lowerMessage.match(/coca-cola|nestle|unilever|pepsico|danone|p&g|procter/i);
      const client = clientMatch ? clientMatch[0] : 'the client';
      return `I see this is for **${client.charAt(0).toUpperCase() + client.slice(1)}**. I've noted this in the proposal.

**Client:** ${client.charAt(0).toUpperCase() + client.slice(1)}

Now I need to understand the research objectives:
1. What business decision will this research inform?
2. What type of study is needed? (Brand tracking, Concept test, U&A, etc.)
3. Which markets should we include?
4. What's the timeline for this project?

Please share more details!`;
    }

    // Market/country mention
    if (lowerMessage.includes('usa') || lowerMessage.includes('uk') || lowerMessage.includes('germany') || lowerMessage.includes('france') || lowerMessage.includes('market')) {
      return `Great, I'm capturing the market information.

**For each market, please confirm:**
1. **Country name**
2. **Language** for the survey
3. **Sample size** allocation

**Typical Sample Distribution:**
- Lead market: 40-50% of total sample
- Secondary markets: 25-30% each
- Tertiary markets: 10-15% each

Would you like me to suggest a sample distribution, or do you have specific allocations in mind?`;
    }

    // Default contextual response
    return `Thank you for that information! I'm analyzing what you've shared.

**Here's what I've captured:**
✓ Initial project context received
✓ Building proposal structure

**To complete the proposal, I'll need:**
- **Client Name:** Who is this research for?
- **Research Type:** Brand tracking, Concept test, U&A, Segmentation?
- **Target Audience:** Who should we survey?
- **Sample Size:** Total completes needed
- **Markets:** Countries and languages

You can share these in any order, or click **Editor Mode** above to fill in the details manually. What would you like to provide next?`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Template Selection */}
      <div className="border-b border-gray-200 px-4 py-3">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Start with a template (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {templateOptions.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm transition-colors',
                selectedTemplate === template.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {chatMessages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}

          {isAiTyping && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5"
              >
                {file.type.startsWith('image/') ? (
                  <ImageIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <FileText className="h-4 w-4 text-gray-500" />
                )}
                <span className="max-w-[150px] truncate text-sm text-gray-700">
                  {file.name}
                </span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              title="Attach files"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            <div className="relative flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message or paste brief content..."
                className="min-h-[44px] resize-none pr-12"
                rows={1}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() && attachments.length === 0}
                className="absolute bottom-1 right-1"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-gray-400">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

function ChatMessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full',
          isUser ? 'bg-gray-200' : 'bg-blue-100'
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-gray-600" />
        ) : (
          <Bot className="h-5 w-5 text-blue-600" />
        )}
      </div>

      <div className={cn('max-w-[80%]', isUser && 'text-right')}>
        <div
          className={cn(
            'rounded-lg px-4 py-3',
            isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
          )}
        >
          <div className="whitespace-pre-wrap text-sm">{message.content}</div>

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className={cn(
                    'flex items-center gap-2 rounded px-2 py-1',
                    isUser ? 'bg-blue-500' : 'bg-gray-200'
                  )}
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-xs">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <span className="mt-1 block text-xs text-gray-400">
          {formatDateTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
