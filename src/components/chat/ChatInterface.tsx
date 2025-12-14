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

    // Simple pattern matching for demo
    if (lowerMessage.includes('brand') && lowerMessage.includes('track')) {
      return `I understand you're looking to set up a brand tracking study. Here's what I've gathered:

**Research Type:** Brand Health Tracking

I'll need a few more details:
1. Which markets/countries should this cover?
2. What's the target audience definition?
3. What sample size are you considering per market?
4. Are there specific competitors to track?

Please provide these details so I can build out the complete proposal.`;
    }

    if (lowerMessage.includes('concept') && lowerMessage.includes('test')) {
      return `Great! A concept test is a solid approach. Let me help structure this:

**Research Type:** Concept Testing

To proceed, I'll need:
1. How many concepts are being tested?
2. Target audience description
3. Markets/regions for the study
4. Desired sample size
5. Any specific metrics beyond standard appeal/purchase intent?

Share what you have and I'll fill in the proposal sections.`;
    }

    if (lowerMessage.includes('sample') && lowerMessage.includes('size')) {
      return `For sample size recommendations, I consider:

- **Margin of error tolerance** (typically 3-5% for quantitative)
- **Subgroup analysis needs** (min n=100 per subgroup)
- **Statistical power requirements**

Based on typical brand tracking studies:
- Single market: n=500-1000
- Multi-market: n=300-500 per market

Would you like me to calculate a specific margin of error, or shall we proceed with standard recommendations?`;
    }

    // Default response
    return `Thank you for that information. I'm processing the details you've provided.

Based on what you've shared, I'm building out the proposal sections. Here's what I have so far:

**Completed Sections:**
- Basic project information captured
- Initial context noted

**Still Needed:**
- Target Definition
- Sample Size
- Markets (with languages)

Would you like to continue providing details, or should I show you the current draft?`;
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
