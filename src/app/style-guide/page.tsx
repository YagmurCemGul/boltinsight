'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/toast';
import { Logo } from '@/components/ui/Logo';
import { BoltLogo } from '@/components/ui/BoltLogo';
import {
  Check,
  X,
  AlertCircle,
  Info,
  Copy,
  ChevronRight,
  Palette,
  Type,
  Layout,
  Square,
  MousePointer2,
  Sparkles
} from 'lucide-react';

// ============================================================================
// BOLTINSIGHT STYLE GUIDE
// Comprehensive Design System Documentation
// ============================================================================

export default function StyleGuidePage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BoltLogo className="h-10 w-auto" />
            <div className="h-8 w-px bg-gray-300" />
            <h1 className="text-xl font-semibold text-purple-700">Style Guide</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {['overview', 'colors', 'typography', 'spacing', 'components', 'patterns'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-sm font-medium capitalize transition-colors ${
                  activeSection === section
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 rounded-2xl p-12 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Logo size={80} className="opacity-90" />
              </div>
              <h2 className="text-4xl font-bold mb-4">BoltInsight Design System</h2>
              <p className="text-xl text-purple-200 mb-8">
                A comprehensive guide to building consistent, accessible, and beautiful
                user interfaces for the BoltInsight platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-teal-500 text-white px-4 py-2">Figma Ready</Badge>
                <Badge className="bg-purple-500 text-white px-4 py-2">React / Next.js</Badge>
                <Badge className="bg-purple-500 text-white px-4 py-2">Tailwind CSS</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Palette, title: 'Color Palette', desc: 'Brand colors, semantic colors, and usage guidelines' },
              { icon: Type, title: 'Typography', desc: 'Font families, sizes, weights, and text styles' },
              { icon: Layout, title: 'Spacing', desc: 'Margins, paddings, and layout grid system' },
              { icon: Square, title: 'Components', desc: 'Buttons, cards, inputs, and UI elements' },
              { icon: MousePointer2, title: 'Interactions', desc: 'States, transitions, and animations' },
              { icon: Sparkles, title: 'Best Practices', desc: 'Do\'s and Don\'ts for consistent design' },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <item.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* COLOR PALETTE */}
        {/* ================================================================== */}
        <section id="colors" className="mb-20">
          <SectionHeader
            title="Color Palette"
            description="Our color system is built on a foundation of purple and teal, creating a modern and trustworthy aesthetic."
          />

          {/* Primary Colors - Purple */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
              Primary Colors (Purple)
            </h4>
            <p className="text-gray-600 mb-6">
              Purple is our primary brand color, representing trust, innovation, and insight.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Purple 900', hex: '#100E28', css: 'purple-900', usage: 'Dark backgrounds' },
                { name: 'Purple 800', hex: '#1A163C', css: 'purple-800', usage: 'Cards (dark mode)' },
                { name: 'Purple 700', hex: '#231E51', css: 'purple-700', usage: 'Text (dark mode)' },
                { name: 'Purple 600', hex: '#5B50BD', css: 'purple-600', usage: 'Primary actions' },
                { name: 'Purple 500', hex: '#918AD3', css: 'purple-500', usage: 'Hover states' },
                { name: 'Purple 400', hex: '#C8C4E9', css: 'purple-400', usage: 'Borders, muted' },
              ].map((color) => (
                <ColorSwatch
                  key={color.hex}
                  {...color}
                  onCopy={() => copyToClipboard(color.hex, color.name)}
                  copied={copiedColor === color.name}
                />
              ))}
            </div>
          </div>

          {/* Secondary Colors - Teal */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-teal-500 rounded-full"></span>
              Secondary Colors (Teal)
            </h4>
            <p className="text-gray-600 mb-6">
              Teal is our accent color, used for success states and positive actions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Teal 900', hex: '#0E6B5D', css: 'teal-900', usage: 'Success text (dark)' },
                { name: 'Teal 800', hex: '#14A08C', css: 'teal-800', usage: 'Success hover' },
                { name: 'Teal 600', hex: '#1ED6BB', css: 'teal-600', usage: 'Success primary' },
                { name: 'Teal 400', hex: '#73EBD9', css: 'teal-400', usage: 'Success light' },
                { name: 'Teal 200', hex: '#A1F1E6', css: 'teal-200', usage: 'Success bg light' },
                { name: 'Teal 100', hex: '#D0F8F2', css: 'teal-100', usage: 'Success bg' },
              ].map((color) => (
                <ColorSwatch
                  key={color.hex}
                  {...color}
                  onCopy={() => copyToClipboard(color.hex, color.name)}
                  copied={copiedColor === color.name}
                />
              ))}
            </div>
          </div>

          {/* Danger Colors - Red */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              Danger Colors (Red)
            </h4>
            <p className="text-gray-600 mb-6">
              Red is used for error states, destructive actions, and warnings.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Red 900', hex: '#860E24', css: 'red-900', usage: 'Error text (dark)' },
                { name: 'Red 800', hex: '#CA1636', css: 'red-800', usage: 'Error hover' },
                { name: 'Red 600', hex: '#EB3F5F', css: 'red-600', usage: 'Error primary' },
                { name: 'Red 400', hex: '#F38B9F', css: 'red-400', usage: 'Error light' },
                { name: 'Red 200', hex: '#F7B2BF', css: 'red-200', usage: 'Error bg light' },
                { name: 'Red 100', hex: '#FBD8DF', css: 'red-100', usage: 'Error bg' },
              ].map((color) => (
                <ColorSwatch
                  key={color.hex}
                  {...color}
                  onCopy={() => copyToClipboard(color.hex, color.name)}
                  copied={copiedColor === color.name}
                />
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
              Neutral Colors (Gray)
            </h4>
            <p className="text-gray-600 mb-6">
              Grays are used for text, borders, backgrounds, and UI chrome.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Gray 900', hex: '#232323', css: 'gray-900', usage: 'Primary text' },
                { name: 'Gray 700', hex: '#393939', css: 'gray-700', usage: 'Secondary text' },
                { name: 'Gray 600', hex: '#5A5A5A', css: 'gray-600', usage: 'Muted text' },
                { name: 'Gray 500', hex: '#919191', css: 'gray-500', usage: 'Placeholder' },
                { name: 'Gray 300', hex: '#C8C8C8', css: 'gray-300', usage: 'Borders' },
                { name: 'Gray 100', hex: '#E9E9E9', css: 'gray-100', usage: 'Backgrounds' },
              ].map((color) => (
                <ColorSwatch
                  key={color.hex}
                  {...color}
                  onCopy={() => copyToClipboard(color.hex, color.name)}
                  copied={copiedColor === color.name}
                />
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Semantic Color Usage</h4>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SemanticColorCard
                  title="Success"
                  color="#1ED6BB"
                  textColor="#0E6B5D"
                  description="Confirmations, completed actions, positive feedback"
                />
                <SemanticColorCard
                  title="Warning"
                  color="#F59E0B"
                  textColor="#B45309"
                  description="Cautions, pending states, attention needed"
                />
                <SemanticColorCard
                  title="Error"
                  color="#EB3F5F"
                  textColor="#860E24"
                  description="Errors, destructive actions, critical alerts"
                />
                <SemanticColorCard
                  title="Info"
                  color="#5B50BD"
                  textColor="#231E51"
                  description="Information, help text, neutral notifications"
                />
              </div>
            </div>
          </div>

          {/* Color Usage Code Example */}
          <CodeExample
            title="Color Usage Example"
            code={`// Using Tailwind classes
<div className="bg-purple-600 text-white">Primary Background</div>
<div className="text-gray-900">Primary Text</div>
<div className="border-gray-300">Default Border</div>

// Using CSS Variables
.custom-element {
  background-color: var(--primary);      /* #5B50BD */
  color: var(--primary-foreground);      /* #ffffff */
  border-color: var(--border);           /* #C8C4E9 */
}

// Dark Mode Support
.dark .custom-element {
  background-color: var(--primary);      /* #918AD3 */
  color: var(--primary-foreground);      /* #100E28 */
}`}
          />
        </section>

        {/* ================================================================== */}
        {/* TYPOGRAPHY */}
        {/* ================================================================== */}
        <section id="typography" className="mb-20">
          <SectionHeader
            title="Typography"
            description="Montserrat is our primary typeface, chosen for its modern, clean aesthetic and excellent readability."
          />

          {/* Font Family */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Font Family</h4>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="mb-8">
                <p className="text-6xl font-bold text-gray-900 mb-2">Montserrat</p>
                <p className="text-gray-600">Primary font family for all UI elements</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="font-normal text-2xl text-gray-900">Regular 400</p>
                  <p className="text-sm text-gray-600 mt-1">Body text, paragraphs</p>
                </div>
                <div>
                  <p className="font-medium text-2xl text-gray-900">Medium 500</p>
                  <p className="text-sm text-gray-600 mt-1">Labels, buttons</p>
                </div>
                <div>
                  <p className="font-semibold text-2xl text-gray-900">Semibold 600</p>
                  <p className="text-sm text-gray-600 mt-1">Headings, emphasis</p>
                </div>
                <div>
                  <p className="font-bold text-2xl text-gray-900">Bold 700</p>
                  <p className="text-sm text-gray-600 mt-1">Strong emphasis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Type Scale */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Type Scale</h4>
            <div className="space-y-6">
              <TypeScaleItem
                name="Display"
                className="text-4xl font-bold"
                size="36px / 2.25rem"
                usage="Hero sections, main titles"
              />
              <TypeScaleItem
                name="Heading 1"
                className="text-3xl font-semibold"
                size="30px / 1.875rem"
                usage="Page titles"
              />
              <TypeScaleItem
                name="Heading 2"
                className="text-2xl font-semibold"
                size="24px / 1.5rem"
                usage="Section titles"
              />
              <TypeScaleItem
                name="Heading 3"
                className="text-xl font-semibold"
                size="20px / 1.25rem"
                usage="Card titles, subsections"
              />
              <TypeScaleItem
                name="Heading 4"
                className="text-lg font-semibold"
                size="18px / 1.125rem"
                usage="Component headers"
              />
              <TypeScaleItem
                name="Body Large"
                className="text-base font-normal"
                size="16px / 1rem"
                usage="Important body text"
              />
              <TypeScaleItem
                name="Body"
                className="text-sm font-normal"
                size="14px / 0.875rem"
                usage="Default body text, labels"
              />
              <TypeScaleItem
                name="Caption"
                className="text-xs font-normal"
                size="12px / 0.75rem"
                usage="Captions, helper text"
              />
            </div>
          </div>

          {/* Typography Code Example */}
          <CodeExample
            title="Typography Usage"
            code={`// Headings
<h1 className="text-3xl font-semibold text-gray-900">Page Title</h1>
<h2 className="text-2xl font-semibold text-gray-900">Section Title</h2>
<h3 className="text-xl font-semibold text-gray-900">Card Title</h3>
<h4 className="text-lg font-semibold text-gray-900">Component Header</h4>

// Body Text
<p className="text-sm text-gray-900">Default body text</p>
<p className="text-sm text-gray-600">Secondary/muted text</p>
<span className="text-xs text-gray-500">Caption or helper text</span>

// Labels
<label className="text-sm font-medium text-gray-700">Form Label</label>

// Links
<a className="text-sm text-purple-600 hover:text-purple-700 underline">
  Link Text
</a>`}
          />
        </section>

        {/* ================================================================== */}
        {/* SPACING */}
        {/* ================================================================== */}
        <section id="spacing" className="mb-20">
          <SectionHeader
            title="Spacing System"
            description="Our spacing system uses a 4px base unit, creating consistent rhythm and visual hierarchy."
          />

          {/* Spacing Scale */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Spacing Scale</h4>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-4">
                {[
                  { name: '0', value: '0px', class: 'p-0' },
                  { name: '0.5', value: '2px', class: 'p-0.5' },
                  { name: '1', value: '4px', class: 'p-1' },
                  { name: '1.5', value: '6px', class: 'p-1.5' },
                  { name: '2', value: '8px', class: 'p-2' },
                  { name: '2.5', value: '10px', class: 'p-2.5' },
                  { name: '3', value: '12px', class: 'p-3' },
                  { name: '4', value: '16px', class: 'p-4' },
                  { name: '5', value: '20px', class: 'p-5' },
                  { name: '6', value: '24px', class: 'p-6' },
                  { name: '8', value: '32px', class: 'p-8' },
                  { name: '10', value: '40px', class: 'p-10' },
                  { name: '12', value: '48px', class: 'p-12' },
                ].map((space) => (
                  <div key={space.name} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-mono text-gray-600">{space.class}</div>
                    <div className="w-16 text-sm text-gray-500">{space.value}</div>
                    <div className="flex-1 h-8 bg-white rounded border border-gray-200 flex items-center">
                      <div
                        className="h-full bg-purple-500 rounded-l"
                        style={{ width: space.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layout Grid */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Layout Guidelines</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Container Widths</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">max-w-7xl</code> - Main content (1280px)</li>
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">max-w-3xl</code> - Text content (768px)</li>
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">max-w-md</code> - Modals default (448px)</li>
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">max-w-sm</code> - Small modals (384px)</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Common Spacings</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">gap-4</code> - Default grid/flex gap</li>
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">p-6</code> - Card padding</li>
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">mb-4</code> - Section margin</li>
                  <li><code className="bg-gray-200 px-2 py-0.5 rounded">space-y-2</code> - Stack spacing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Spacing Code Example */}
          <CodeExample
            title="Spacing Usage"
            code={`// Card Layout
<Card className="p-6">
  <CardHeader className="space-y-1.5">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="pt-4">
    Content here
  </CardContent>
</Card>

// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>

// Stack Layout
<div className="space-y-4">
  <Input placeholder="Name" />
  <Input placeholder="Email" />
  <Button>Submit</Button>
</div>

// Flex Layout
<div className="flex items-center gap-2">
  <Icon />
  <span>Label</span>
</div>`}
          />
        </section>

        {/* ================================================================== */}
        {/* COMPONENTS */}
        {/* ================================================================== */}
        <section id="components" className="mb-20">
          <SectionHeader
            title="Components"
            description="Our component library provides consistent, accessible UI building blocks."
          />

          {/* Buttons */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Buttons</h4>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Variants</h5>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Sizes</h5>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">States</h5>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button className="hover:bg-purple-700">Hover</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-3">With Icons</h5>
                  <div className="flex flex-wrap gap-3">
                    <Button><Check className="h-4 w-4 mr-2" />Confirm</Button>
                    <Button variant="outline"><Copy className="h-4 w-4 mr-2" />Copy</Button>
                    <Button variant="ghost">Next<ChevronRight className="h-4 w-4 ml-2" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CodeExample
              title="Button Usage"
              code={`import { Button } from '@/components/ui/button';

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// With Icons
<Button>
  <CheckIcon className="h-4 w-4 mr-2" />
  Confirm
</Button>

// Disabled State
<Button disabled>Cannot Click</Button>

// Full Width
<Button className="w-full">Full Width Button</Button>`}
            />
          </div>

          {/* Badges */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Badges</h4>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Variants</h5>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Status Badges</h5>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-gray-200 text-gray-700">Draft</Badge>
                    <Badge className="bg-amber-100 text-amber-800">Pending Approval</Badge>
                    <Badge className="bg-emerald-100 text-emerald-800">Approved</Badge>
                    <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                    <Badge className="bg-slate-200 text-slate-800">On Hold</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <CodeExample
              title="Badge Usage"
              code={`import { Badge } from '@/components/ui/badge';

// Semantic Variants
<Badge variant="default">Default</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">New</Badge>

// Custom Colors (Status)
<Badge className="bg-gray-200 text-gray-700">Draft</Badge>
<Badge className="bg-amber-100 text-amber-800">Pending Approval</Badge>
<Badge className="bg-emerald-100 text-emerald-800">Approved</Badge>
<Badge className="bg-red-100 text-red-800">Rejected</Badge>

// With Icons
<Badge>
  <StatusIcon className="h-3 w-3 mr-1" />
  Active
</Badge>`}
            />
          </div>

          {/* Form Elements */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Form Elements</h4>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select</label>
                    <Select
                      options={[
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                        { value: '3', label: 'Option 3' },
                      ]}
                      value="1"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Textarea</label>
                    <Textarea placeholder="Enter longer text..." />
                  </div>
                </div>
              </CardContent>
            </Card>

            <CodeExample
              title="Form Elements Usage"
              code={`import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

// Input
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>
  <Input
    type="email"
    placeholder="you@example.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

// Textarea
<Textarea
  placeholder="Enter description..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

// Select
<Select
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
  ]}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  placeholder="Select an option"
/>`}
            />
          </div>

          {/* Cards */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description text</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Card content goes here with supporting text.</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>Hover to see shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Cards can have hover states for clickable items.</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-900">Highlighted Card</CardTitle>
                  <CardDescription className="text-purple-700">With brand colors</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-600">Use for featured or selected states.</p>
                </CardContent>
              </Card>
            </div>

            <CodeExample
              title="Card Usage"
              code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Interactive Card
<Card className="hover:shadow-md transition-shadow cursor-pointer">
  <CardContent className="p-6">
    Clickable card content
  </CardContent>
</Card>

// Highlighted Card
<Card className="border-purple-200 bg-purple-50">
  <CardContent className="p-6">
    Featured content
  </CardContent>
</Card>`}
            />
          </div>

          {/* Tabs */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Tabs</h4>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Overview</TabsTrigger>
                    <TabsTrigger value="tab2">Details</TabsTrigger>
                    <TabsTrigger value="tab3">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    <p className="text-sm text-gray-600 p-4">Overview content appears here.</p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p className="text-sm text-gray-600 p-4">Details content appears here.</p>
                  </TabsContent>
                  <TabsContent value="tab3">
                    <p className="text-sm text-gray-600 p-4">Settings content appears here.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <CodeExample
              title="Tabs Usage"
              code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>

  <TabsContent value="overview">
    <p>Overview content...</p>
  </TabsContent>

  <TabsContent value="details">
    <p>Details content...</p>
  </TabsContent>

  <TabsContent value="settings">
    <p>Settings content...</p>
  </TabsContent>
</Tabs>`}
            />
          </div>

          {/* Modals */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Modals</h4>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <Button onClick={() => setShowModal(true)}>Open Modal</Button>
                <Modal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  title="Modal Title"
                >
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      This is modal content. Modals are used for focused tasks, confirmations,
                      or displaying additional information without leaving the current context.
                    </p>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                      <Button onClick={() => setShowModal(false)}>Confirm</Button>
                    </div>
                  </div>
                </Modal>
              </CardContent>
            </Card>

            <CodeExample
              title="Modal Usage"
              code={`import { Modal } from '@/components/ui/modal';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md" // sm | md | lg | xl
      >
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to proceed?
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}`}
            />
          </div>

          {/* Toast Notifications */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Toast Notifications</h4>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => toast.success('Action completed successfully!')}>
                    Success Toast
                  </Button>
                  <Button variant="outline" onClick={() => toast.error('Something went wrong!')}>
                    Error Toast
                  </Button>
                  <Button variant="outline" onClick={() => toast.warning('Please review your changes')}>
                    Warning Toast
                  </Button>
                  <Button variant="outline" onClick={() => toast.info('New updates available')}>
                    Info Toast
                  </Button>
                </div>
              </CardContent>
            </Card>

            <CodeExample
              title="Toast Usage"
              code={`import { toast } from '@/components/ui/toast';

// Success
toast.success('Changes saved successfully!');

// Error
toast.error('Failed to save changes. Please try again.');

// Warning
toast.warning('Your session will expire in 5 minutes');

// Info
toast.info('New features have been added');

// Custom Duration (default: 4000ms, errors: 6000ms)
// Duration is managed internally by the toast store`}
            />
          </div>
        </section>

        {/* ================================================================== */}
        {/* INTERACTIONS & STATES */}
        {/* ================================================================== */}
        <section id="interactions" className="mb-20">
          <SectionHeader
            title="Interactions & States"
            description="Consistent interaction patterns create intuitive and predictable user experiences."
          />

          {/* Focus States */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Focus States</h4>
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  All interactive elements have visible focus states for keyboard navigation and accessibility.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Button Focus</p>
                    <Button className="ring-2 ring-purple-500 ring-offset-2">Focused Button</Button>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Input Focus</p>
                    <Input className="ring-2 ring-purple-500 border-transparent" placeholder="Focused input" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Border Radius */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Border Radius</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'rounded-full', value: '9999px', desc: 'Badges, pills' },
                { name: 'rounded-xl', value: '12px', desc: 'Cards, modals' },
                { name: 'rounded-lg', value: '8px', desc: 'Buttons, inputs' },
                { name: 'rounded-md', value: '6px', desc: 'Small elements' },
              ].map((radius) => (
                <div key={radius.name} className="bg-gray-50 p-4 rounded-xl">
                  <div
                    className={`w-full h-16 bg-purple-600 mb-3 ${radius.name}`}
                  />
                  <p className="font-mono text-sm text-gray-900">{radius.name}</p>
                  <p className="text-xs text-gray-500">{radius.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{radius.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shadows */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Shadows</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'shadow-sm', desc: 'Cards, subtle elevation' },
                { name: 'shadow-md', desc: 'Hover states, dropdowns' },
                { name: 'shadow-xl', desc: 'Modals, popovers, toasts' },
              ].map((shadow) => (
                <div key={shadow.name} className="bg-gray-50 p-6 rounded-xl">
                  <div className={`w-full h-24 bg-white rounded-lg ${shadow.name} flex items-center justify-center`}>
                    <span className="font-mono text-sm text-gray-600">{shadow.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{shadow.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* DO'S AND DON'TS */}
        {/* ================================================================== */}
        <section id="best-practices" className="mb-20">
          <SectionHeader
            title="Best Practices"
            description="Follow these guidelines to maintain consistency and quality across the application."
          />

          {/* Color Do's and Don'ts */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Color Usage</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DoCard items={[
                'Use purple-600 (#5B50BD) for primary actions',
                'Use semantic colors consistently (green=success, red=error)',
                'Maintain sufficient contrast ratio (4.5:1 minimum)',
                'Use gray-900 for primary text, gray-600 for secondary',
                'Apply teal for success states and positive feedback',
              ]} />
              <DontCard items={[
                'Don\'t use pure black (#000000) for text',
                'Don\'t mix multiple bright colors in one component',
                'Don\'t use color as the only indicator (add icons/text)',
                'Don\'t use brand purple for error states',
                'Don\'t use low contrast color combinations',
              ]} />
            </div>
          </div>

          {/* Typography Do's and Don'ts */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Typography</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DoCard items={[
                'Use Montserrat font family consistently',
                'Apply font-semibold (600) for headings',
                'Use text-sm (14px) as default body size',
                'Maintain clear visual hierarchy with size/weight',
                'Use font-medium for labels and buttons',
              ]} />
              <DontCard items={[
                'Don\'t use more than 2-3 font weights per page',
                'Don\'t use font sizes smaller than 12px',
                'Don\'t center-align long paragraphs',
                'Don\'t use all caps for more than short labels',
                'Don\'t mix multiple font families',
              ]} />
            </div>
          </div>

          {/* Spacing Do's and Don'ts */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Spacing & Layout</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DoCard items={[
                'Use consistent spacing scale (4px base unit)',
                'Apply p-6 padding for card content',
                'Use gap-4 for standard grid layouts',
                'Maintain touch targets of 44px minimum on mobile',
                'Group related elements with tighter spacing',
              ]} />
              <DontCard items={[
                'Don\'t use arbitrary spacing values',
                'Don\'t crowd elements without adequate whitespace',
                'Don\'t mix different spacing systems',
                'Don\'t make clickable areas too small',
                'Don\'t nest containers with inconsistent padding',
              ]} />
            </div>
          </div>

          {/* Component Do's and Don'ts */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Components</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DoCard items={[
                'Use Button variant="primary" for main actions',
                'Apply rounded-xl for cards, rounded-lg for buttons',
                'Show loading states for async operations',
                'Provide clear feedback on user actions (toasts)',
                'Use modals for focused tasks requiring attention',
              ]} />
              <DontCard items={[
                'Don\'t have multiple primary buttons per view',
                'Don\'t use destructive variant for non-destructive actions',
                'Don\'t leave users without feedback on actions',
                'Don\'t use modals for simple notifications',
                'Don\'t disable buttons without explanation',
              ]} />
            </div>
          </div>

          {/* Accessibility Do's and Don'ts */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Accessibility</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DoCard items={[
                'Provide visible focus states for all interactive elements',
                'Use semantic HTML elements (button, input, label)',
                'Include alt text for all meaningful images',
                'Support keyboard navigation throughout',
                'Ensure color is not the only means of conveying info',
              ]} />
              <DontCard items={[
                'Don\'t remove focus outlines without alternatives',
                'Don\'t use div/span as buttons without ARIA roles',
                'Don\'t rely solely on color for status indication',
                'Don\'t trap keyboard focus in components',
                'Don\'t use placeholder text as the only label',
              ]} />
            </div>
          </div>

          {/* Dark Mode Do's and Don'ts */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Dark Mode</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DoCard items={[
                'Use CSS variables for theme-aware colors',
                'Apply purple-900 (#100E28) for dark backgrounds',
                'Use lighter text colors (gray-100) in dark mode',
                'Maintain semantic color meanings across themes',
                'Test all components in both light and dark modes',
              ]} />
              <DontCard items={[
                'Don\'t use pure white (#fff) text on dark backgrounds',
                'Don\'t hardcode color values, use CSS variables',
                'Don\'t change semantic color meanings in dark mode',
                'Don\'t forget to update shadows for dark mode',
                'Don\'t use the same border colors in both modes',
              ]} />
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* Z-INDEX SCALE */}
        {/* ================================================================== */}
        <section id="z-index" className="mb-20">
          <SectionHeader
            title="Z-Index Scale"
            description="Proper layering ensures UI elements stack correctly."
          />

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { value: 'z-[9999]', name: 'Dropdown Portals', desc: 'Dropdowns rendered via portals' },
                  { value: 'z-[200]', name: 'Modals', desc: 'Modal dialogs and overlays' },
                  { value: 'z-[100]', name: 'Inline Dropdowns', desc: 'Dropdowns within components' },
                  { value: 'z-50', name: 'Toasts', desc: 'Toast notifications' },
                  { value: 'z-40', name: 'Sticky Headers', desc: 'Fixed navigation elements' },
                  { value: 'z-10', name: 'Elevated', desc: 'Slightly elevated elements' },
                  { value: 'z-0', name: 'Base', desc: 'Default stacking context' },
                ].map((layer, index) => (
                  <div key={layer.value} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <code className="font-mono text-sm bg-gray-200 px-2 py-1 rounded w-24 text-center">
                      {layer.value}
                    </code>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{layer.name}</p>
                      <p className="text-sm text-gray-600">{layer.desc}</p>
                    </div>
                    <div
                      className="w-8 h-8 rounded bg-purple-600 opacity-90"
                      style={{ transform: `translateX(${index * 4}px)` }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ================================================================== */}
        {/* ICONS */}
        {/* ================================================================== */}
        <section id="icons" className="mb-20">
          <SectionHeader
            title="Icons"
            description="We use Lucide React for consistent, accessible iconography."
          />

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Icon Sizes</h5>
                <div className="flex items-end gap-6">
                  <div className="text-center">
                    <AlertCircle className="h-4 w-4 text-gray-900 mx-auto" />
                    <p className="text-xs text-gray-500 mt-2">h-4 w-4</p>
                    <p className="text-xs text-gray-400">16px</p>
                  </div>
                  <div className="text-center">
                    <AlertCircle className="h-5 w-5 text-gray-900 mx-auto" />
                    <p className="text-xs text-gray-500 mt-2">h-5 w-5</p>
                    <p className="text-xs text-gray-400">20px</p>
                  </div>
                  <div className="text-center">
                    <AlertCircle className="h-6 w-6 text-gray-900 mx-auto" />
                    <p className="text-xs text-gray-500 mt-2">h-6 w-6</p>
                    <p className="text-xs text-gray-400">24px</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-3">Common Icons</h5>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {[
                    { icon: Check, name: 'Check' },
                    { icon: X, name: 'X (Close)' },
                    { icon: AlertCircle, name: 'AlertCircle' },
                    { icon: Info, name: 'Info' },
                    { icon: Copy, name: 'Copy' },
                    { icon: ChevronRight, name: 'ChevronRight' },
                    { icon: Palette, name: 'Palette' },
                    { icon: Type, name: 'Type' },
                  ].map((item) => (
                    <div key={item.name} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                      <item.icon className="h-5 w-5 text-gray-700" />
                      <p className="text-xs text-gray-500 mt-2 text-center">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <CodeExample
            title="Icon Usage"
            code={`import { Check, X, AlertCircle, Info } from 'lucide-react';

// Standard Size (16px)
<Check className="h-4 w-4" />

// Medium Size (20px)
<AlertCircle className="h-5 w-5" />

// Large Size (24px)
<Info className="h-6 w-6" />

// With Color
<Check className="h-4 w-4 text-green-600" />
<X className="h-4 w-4 text-red-600" />

// In Buttons
<Button>
  <Check className="h-4 w-4 mr-2" />
  Confirm
</Button>`}
          />
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-12 mt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <BoltLogo className="h-8 w-auto" />
              <span className="text-sm text-gray-600">Design System Documentation</span>
            </div>
            <p className="text-sm text-gray-500">
              Built with React, Next.js, and Tailwind CSS
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-3xl">{description}</p>
      <div className="h-px bg-gray-200 mt-4" />
    </div>
  );
}

function ColorSwatch({
  name,
  hex,
  css,
  usage,
  onCopy,
  copied
}: {
  name: string;
  hex: string;
  css: string;
  usage: string;
  onCopy: () => void;
  copied: boolean;
}) {
  const isLight = hex.toLowerCase() > '#888888';

  return (
    <div
      className="group cursor-pointer"
      onClick={onCopy}
    >
      <div
        className="h-24 rounded-lg mb-2 flex items-end p-2 transition-transform group-hover:scale-105"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-xs font-mono ${isLight ? 'text-gray-800' : 'text-white'}`}>
          {copied ? 'Copied!' : hex}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <p className="text-xs text-gray-500 font-mono">{css}</p>
      <p className="text-xs text-gray-500 mt-1">{usage}</p>
    </div>
  );
}

function SemanticColorCard({
  title,
  color,
  textColor,
  description
}: {
  title: string;
  color: string;
  textColor: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div
        className="w-12 h-12 rounded-lg mb-3"
        style={{ backgroundColor: color }}
      />
      <h5 className="font-semibold text-gray-900">{title}</h5>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
      <div className="mt-3 space-y-1">
        <p className="text-xs font-mono text-gray-500">Background: {color}</p>
        <p className="text-xs font-mono text-gray-500">Text: {textColor}</p>
      </div>
    </div>
  );
}

function TypeScaleItem({
  name,
  className,
  size,
  usage
}: {
  name: string;
  className: string;
  size: string;
  usage: string;
}) {
  return (
    <div className="flex items-baseline gap-6 py-4 border-b border-gray-100">
      <div className="w-32 shrink-0">
        <p className="text-sm font-medium text-gray-600">{name}</p>
        <p className="text-xs text-gray-400 font-mono">{size}</p>
      </div>
      <p className={`flex-1 text-gray-900 ${className}`}>
        The quick brown fox jumps over the lazy dog
      </p>
      <p className="text-sm text-gray-500 w-48 shrink-0 hidden lg:block">{usage}</p>
    </div>
  );
}

function CodeExample({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-sm font-medium text-gray-700">{title}</h5>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <Copy className="h-3 w-3" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DoCard({ items }: { items: string[] }) {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-green-600 rounded-full">
            <Check className="h-4 w-4 text-white" />
          </div>
          <h5 className="font-semibold text-green-900">Do</h5>
        </div>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-green-800">
              <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function DontCard({ items }: { items: string[] }) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-red-600 rounded-full">
            <X className="h-4 w-4 text-white" />
          </div>
          <h5 className="font-semibold text-red-900">Don&apos;t</h5>
        </div>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-red-800">
              <X className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
