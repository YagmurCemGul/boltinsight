# BoltInsight Style Guide - Claude Artifact Prompt

Aşağıdaki prompt'u Claude.ai'ye yapıştırarak tam kapsamlı bir Style Guide artifact'i oluşturabilirsin.

---

## PROMPT (Bunu Claude.ai'ye kopyala)

```
Create a comprehensive, professional Style Guide as a single React component artifact for "BoltInsight". This will be exported to Figma, so make it visually polished with actual color swatches, typography samples, and component examples.

## COMPANY INFO
- Name: BoltInsight
- Logo: Display "BoltInsight" text in purple (#5B50BD) with a lightning bolt icon or just styled text
- Description: "A comprehensive guide to building consistent, accessible, and beautiful user interfaces for the BoltInsight platform."
- Tech badges to show: "Figma Ready", "React / Next.js", "Tailwind CSS"

---

## 1. COLOR PALETTE (Show actual color rectangles)

### Primary Brand Colors - Purple
Purple represents trust, innovation, and insight. This is the main brand color.

| Token | HEX Code | RGB | Usage | CSS Variable |
|-------|----------|-----|-------|--------------|
| Purple 900 | #100E28 | rgb(16, 14, 40) | Dark mode backgrounds | --bolt-purple-900 |
| Purple 800 | #1A163C | rgb(26, 22, 60) | Dark mode cards | --bolt-purple-800 |
| Purple 700 | #231E51 | rgb(35, 30, 81) | Dark mode foreground text | --bolt-purple-700 |
| Purple 600 | #5B50BD | rgb(91, 80, 189) | **PRIMARY - Buttons, links, actions** | --bolt-purple-600 |
| Purple 500 | #918AD3 | rgb(145, 138, 211) | Hover states, focus rings | --bolt-purple-500 |
| Purple 400 | #C8C4E9 | rgb(200, 196, 233) | Borders, muted backgrounds | --bolt-purple-400 |

### Secondary Colors - Teal (Success/Accent)
Teal is the accent color, used for success states and positive actions.

| Token | HEX Code | RGB | Usage | CSS Variable |
|-------|----------|-----|-------|--------------|
| Teal 900 | #0E6B5D | rgb(14, 107, 93) | Success text on light bg | --bolt-teal-900 |
| Teal 800 | #14A08C | rgb(20, 160, 140) | Success hover state | --bolt-teal-800 |
| Teal 600 | #1ED6BB | rgb(30, 214, 187) | **SUCCESS PRIMARY** | --bolt-teal-600 |
| Teal 400 | #73EBD9 | rgb(115, 235, 217) | Success light accent | --bolt-teal-400 |
| Teal 200 | #A1F1E6 | rgb(161, 241, 230) | Success background light | --bolt-teal-200 |
| Teal 100 | #D0F8F2 | rgb(208, 248, 242) | Success background | --bolt-teal-100 |

### Danger Colors - Red (Error/Destructive)
Red is used for errors, destructive actions, and critical alerts.

| Token | HEX Code | RGB | Usage | CSS Variable |
|-------|----------|-----|-------|--------------|
| Red 900 | #860E24 | rgb(134, 14, 36) | Error text on light bg | --bolt-red-900 |
| Red 800 | #CA1636 | rgb(202, 22, 54) | Error hover state | --bolt-red-800 |
| Red 600 | #EB3F5F | rgb(235, 63, 95) | **ERROR PRIMARY** | --bolt-red-600 |
| Red 400 | #F38B9F | rgb(243, 139, 159) | Error light accent | --bolt-red-400 |
| Red 200 | #F7B2BF | rgb(247, 178, 191) | Error background light | --bolt-red-200 |
| Red 100 | #FBD8DF | rgb(251, 216, 223) | Error background | --bolt-red-100 |

### Neutral Colors - Gray
Grays are used for text, borders, backgrounds, and general UI chrome.

| Token | HEX Code | RGB | Usage | CSS Variable |
|-------|----------|-----|-------|--------------|
| Gray 900 | #232323 | rgb(35, 35, 35) | **Primary text** | --bolt-gray-900 |
| Gray 700 | #393939 | rgb(57, 57, 57) | Secondary text | --bolt-gray-700 |
| Gray 600 | #5A5A5A | rgb(90, 90, 90) | Muted/tertiary text | --bolt-gray-600 |
| Gray 500 | #919191 | rgb(145, 145, 145) | Placeholder text | --bolt-gray-500 |
| Gray 300 | #C8C8C8 | rgb(200, 200, 200) | Borders, dividers | --bolt-gray-300 |
| Gray 100 | #E9E9E9 | rgb(233, 233, 233) | Backgrounds, hover | --bolt-gray-100 |

### Slate Colors (Alternative Neutrals)
| Token | HEX Code | Usage |
|-------|----------|-------|
| Slate 900 | #252A31 | Dark neutral |
| Slate 800 | #383F4A | Card backgrounds |
| Slate 600 | #4B5563 | Secondary elements |
| Slate 500 | #8C97A8 | Muted text |
| Slate 300 | #B1BAC5 | Light borders |
| Slate 100 | #D8DCE2 | Light backgrounds |

### Semantic Colors (Show 4 cards side by side)
| Type | Background | Text Color | Border | Use Case |
|------|------------|------------|--------|----------|
| Success | #D0F8F2 | #0E6B5D | #A1F1E6 | Confirmations, completed actions |
| Warning | #FEF3C7 | #B45309 | #FDE68A | Cautions, pending states |
| Error | #FBD8DF | #860E24 | #F7B2BF | Errors, destructive actions |
| Info | #EDE9F9 | #5B50BD | #C8C4E9 | Information, help text |

### CSS Variables for Theming
```css
/* Light Mode */
:root {
  --background: #ffffff;
  --foreground: #231E51;
  --card: #ffffff;
  --card-foreground: #231E51;
  --border: #C8C4E9;
  --input: #C8C4E9;
  --primary: #5B50BD;
  --primary-foreground: #ffffff;
  --secondary: #F6F8F8;
  --secondary-foreground: #231E51;
  --muted: #F6F8F8;
  --muted-foreground: #5A5A5A;
  --success: #1ED6BB;
  --success-foreground: #0E6B5D;
  --danger: #EB3F5F;
  --danger-foreground: #860E24;
}

/* Dark Mode */
.dark {
  --background: #100E28;
  --foreground: #E9E9E9;
  --card: #1A163C;
  --card-foreground: #E9E9E9;
  --border: #231E51;
  --input: #231E51;
  --primary: #918AD3;
  --primary-foreground: #100E28;
  --secondary: #1A163C;
  --secondary-foreground: #E9E9E9;
  --muted: #1A163C;
  --muted-foreground: #918AD3;
}
```

---

## 2. TYPOGRAPHY

### Font Family
- **Primary Font:** Montserrat
- **Import:** `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');`
- **CSS Variable:** `--font-sans: 'Montserrat', ui-sans-serif, system-ui, sans-serif`
- **Fallback Stack:** ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"

### Font Weights (Show large "Aa Bb Cc 123" samples for each)
| Weight | Value | Name | Usage |
|--------|-------|------|-------|
| Regular | 400 | font-normal | Body text, paragraphs, descriptions |
| Medium | 500 | font-medium | Labels, buttons, form labels |
| Semibold | 600 | font-semibold | Headings, card titles, emphasis |
| Bold | 700 | font-bold | Strong emphasis, hero text |

### Type Scale (Show actual rendered samples with "The quick brown fox jumps over the lazy dog")
| Name | Size | Line Height | CSS Class | Weight | Usage |
|------|------|-------------|-----------|--------|-------|
| Display | 36px (2.25rem) | 40px (2.5rem) | text-4xl | Bold (700) | Hero sections, main page titles |
| Heading 1 | 30px (1.875rem) | 36px (2.25rem) | text-3xl | Semibold (600) | Page titles |
| Heading 2 | 24px (1.5rem) | 32px (2rem) | text-2xl | Semibold (600) | Section titles |
| Heading 3 | 20px (1.25rem) | 28px (1.75rem) | text-xl | Semibold (600) | Card titles, subsections |
| Heading 4 | 18px (1.125rem) | 28px (1.75rem) | text-lg | Semibold (600) | Component headers |
| Body Large | 16px (1rem) | 24px (1.5rem) | text-base | Regular (400) | Important body text |
| Body | 14px (0.875rem) | 20px (1.25rem) | text-sm | Regular (400) | **DEFAULT body text**, labels |
| Caption | 12px (0.75rem) | 16px (1rem) | text-xs | Regular (400) | Captions, helper text, timestamps |

### Text Colors
| Purpose | Light Mode | Dark Mode | CSS Class |
|---------|------------|-----------|-----------|
| Primary text | #232323 | #F1F5F9 | text-gray-900 |
| Secondary text | #393939 | #E2E8F0 | text-gray-700 |
| Muted text | #5A5A5A | #94A3B8 | text-gray-600 |
| Placeholder | #919191 | #64748B | text-gray-500 |
| Links | #5B50BD | #918AD3 | text-purple-600 |

### Code Example
```tsx
// Headings
<h1 className="text-3xl font-semibold text-gray-900">Page Title</h1>
<h2 className="text-2xl font-semibold text-gray-900">Section Title</h2>
<h3 className="text-xl font-semibold text-gray-900">Card Title</h3>
<h4 className="text-lg font-semibold text-gray-900">Component Header</h4>

// Body Text
<p className="text-sm text-gray-900">Default body text</p>
<p className="text-sm text-gray-600">Secondary/muted text</p>
<span className="text-xs text-gray-500">Caption or helper text</span>

// Form Labels
<label className="text-sm font-medium text-gray-700">Form Label</label>

// Links
<a className="text-sm text-purple-600 hover:text-purple-700 underline">Link Text</a>
```

---

## 3. SPACING SYSTEM

### Base Unit
4px base unit. All spacing values are multiples of 4px for consistent rhythm.

### Spacing Scale (Show visual purple bars representing each size)
| Token | Pixels | Rem | Tailwind Class | Common Usage |
|-------|--------|-----|----------------|--------------|
| 0 | 0px | 0 | p-0, m-0 | Reset spacing |
| 0.5 | 2px | 0.125rem | p-0.5, m-0.5 | Tiny gaps |
| 1 | 4px | 0.25rem | p-1, m-1, gap-1 | Tight spacing |
| 1.5 | 6px | 0.375rem | p-1.5, space-y-1.5 | Card header spacing |
| 2 | 8px | 0.5rem | p-2, m-2, gap-2 | Small gaps |
| 2.5 | 10px | 0.625rem | p-2.5, px-2.5 | Badge padding |
| 3 | 12px | 0.75rem | p-3, px-3, gap-3 | Input padding |
| 4 | 16px | 1rem | p-4, m-4, gap-4 | **Default gap**, section spacing |
| 5 | 20px | 1.25rem | p-5, m-5 | Medium spacing |
| 6 | 24px | 1.5rem | p-6, m-6 | **Card padding**, large gaps |
| 8 | 32px | 2rem | p-8, m-8 | Extra large spacing |
| 10 | 40px | 2.5rem | p-10 | Section padding |
| 12 | 48px | 3rem | p-12, py-12 | Hero section padding |
| 16 | 64px | 4rem | p-16 | Major section breaks |
| 20 | 80px | 5rem | p-20 | Page-level spacing |

### Container Widths
| Token | Pixels | Tailwind Class | Usage |
|-------|--------|----------------|-------|
| sm | 384px | max-w-sm | Small modals |
| md | 448px | max-w-md | **Default modals** |
| lg | 512px | max-w-lg | Large modals |
| xl | 576px | max-w-xl | Extra large modals |
| 2xl | 672px | max-w-2xl | Wide modals |
| 3xl | 768px | max-w-3xl | Text content containers |
| 7xl | 1280px | max-w-7xl | **Main content area** |

### Common Spacing Patterns
```tsx
// Card Layout
<Card className="p-6">                    // 24px padding all sides
  <CardHeader className="space-y-1.5">   // 6px gap between children
  <CardContent className="pt-0">         // No top padding (continues from header)
</Card>

// Grid Layouts
<div className="grid grid-cols-3 gap-4">  // 16px gap between items
<div className="grid grid-cols-2 gap-6">  // 24px gap for larger items

// Stack Layouts
<div className="space-y-4">               // 16px vertical gap
<div className="space-y-2">               // 8px vertical gap (form fields)

// Flex with Gap
<div className="flex items-center gap-2"> // 8px horizontal gap
<div className="flex items-center gap-4"> // 16px horizontal gap
```

---

## 4. COMPONENTS

### 4.1 Buttons (Show actual rendered buttons)

**Variants:**
| Variant | Background | Text | Border | Hover BG | Usage |
|---------|------------|------|--------|----------|-------|
| Primary/Default | #5B50BD | #FFFFFF | none | #4A41A0 | Main actions, CTAs |
| Secondary | #F3F4F6 (gray-100) | #111827 (gray-900) | none | #E5E7EB (gray-200) | Secondary actions |
| Outline | transparent | #5B50BD | #D1D5DB (gray-300) | #F9FAFB (gray-50) | Tertiary actions |
| Ghost | transparent | #5B50BD | none | #F3F4F6 (gray-100) | Subtle actions, icon buttons |
| Destructive | #DC2626 (red-600) | #FFFFFF | none | #B91C1C (red-700) | Delete, remove actions |

**Sizes:**
| Size | Height | Horizontal Padding | Font Size | Usage |
|------|--------|-------------------|-----------|-------|
| sm | 32px (h-8) | 12px (px-3) | 14px (text-sm) | Compact UIs, tables |
| md | 40px (h-10) | 16px (px-4) | 14px (text-sm) | **Default size** |
| lg | 48px (h-12) | 24px (px-6) | 16px (text-base) | Hero CTAs, prominent actions |
| icon | 40px × 40px (h-10 w-10) | 0 (p-0) | - | Icon-only buttons |

**States:**
- Default: Normal appearance
- Hover: Darker background
- Focus: `ring-2 ring-[#918AD3] ring-offset-2`
- Disabled: `opacity-50 cursor-not-allowed pointer-events-none`

**Button Code:**
```tsx
// Component styles
className={cn(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#918AD3]',
  'disabled:pointer-events-none disabled:opacity-50',
  // Variants applied conditionally
)}

// Usage Examples
<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Learn More</Button>
<Button variant="ghost">Settings</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large Button</Button>
<Button disabled>Disabled</Button>

// With Icons
<Button><CheckIcon className="h-4 w-4 mr-2" />Confirm</Button>
<Button variant="outline"><CopyIcon className="h-4 w-4 mr-2" />Copy</Button>
```

### 4.2 Badges (Show actual rendered badges)

**Base Style:**
`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium`

**Variants:**
| Variant | Background | Text | Dark Mode BG | Dark Mode Text |
|---------|------------|------|--------------|----------------|
| Default | #F3F4F6 (gray-100) | #1F2937 (gray-800) | #374151 (gray-700) | #E5E7EB (gray-200) |
| Success | #D1FAE5 (green-100) | #065F46 (green-800) | green-900/50 | #86EFAC (green-300) |
| Warning | #FEF3C7 (yellow-100) | #92400E (yellow-800) | yellow-900/50 | #FDE047 (yellow-300) |
| Error | #FEE2E2 (red-100) | #991B1B (red-800) | red-900/50 | #FCA5A5 (red-300) |
| Info | #EDE9F9 | #5B50BD | #231E51 | #918AD3 |

**Status Badges (Custom colors via className):**
| Status | Background | Text | Tailwind Classes |
|--------|------------|------|------------------|
| Draft | #E9E9E9 | #393939 | bg-gray-200 text-gray-700 |
| Pending Approval | #FEF3C7 | #92400E | bg-amber-100 text-amber-800 |
| Approved | #D1FAE5 | #065F46 | bg-emerald-100 text-emerald-800 |
| Rejected | #FEE2E2 | #991B1B | bg-red-100 text-red-800 |
| On Hold | #E2E8F0 | #475569 | bg-slate-200 text-slate-800 |

**Code:**
```tsx
// Semantic variants
<Badge variant="default">Default</Badge>
<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">New</Badge>

// Custom status badges
<Badge className="bg-gray-200 text-gray-700">Draft</Badge>
<Badge className="bg-amber-100 text-amber-800">Pending Approval</Badge>
<Badge className="bg-emerald-100 text-emerald-800">Approved</Badge>
<Badge className="bg-red-100 text-red-800">Rejected</Badge>
```

### 4.3 Form Elements

**Input:**
| Property | Value |
|----------|-------|
| Height | 40px (h-10) |
| Border Radius | 8px (rounded-lg) |
| Border | 1px solid #D1D5DB (gray-300) |
| Background | #FFFFFF |
| Padding | 12px horizontal (px-3), 8px vertical (py-2) |
| Font Size | 14px (text-sm) |
| Placeholder Color | #9CA3AF (gray-400) |
| Focus Ring | 2px #5B50BD, border transparent |
| Disabled | opacity-50, cursor-not-allowed |

**Textarea:**
| Property | Value |
|----------|-------|
| Min Height | 80px (min-h-[80px]) |
| All other styles | Same as Input |
| Resize | none (resize-none) |

**Select:**
| Property | Value |
|----------|-------|
| Height | 40px (h-10) |
| All other styles | Same as Input |
| Icon | ChevronDown, h-4 w-4, positioned right |
| Icon Position | absolute right-3 |

**Code:**
```tsx
// Input
<input className={cn(
  'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
  'placeholder:text-gray-400',
  'focus:outline-none focus:ring-2 focus:ring-[#5B50BD] focus:border-transparent',
  'disabled:cursor-not-allowed disabled:opacity-50'
)} />

// With Label
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>
  <Input type="email" placeholder="you@example.com" />
</div>
```

### 4.4 Cards

**Structure & Styles:**
```tsx
// Card Container
<Card className="rounded-xl border border-gray-200 bg-white shadow-sm">

// Card Header
<CardHeader className="flex flex-col space-y-1.5 p-6">
  <CardTitle className="text-lg font-semibold leading-none tracking-tight">
  <CardDescription className="text-sm text-gray-500">
</CardHeader>

// Card Content
<CardContent className="p-6 pt-0">

// Card Footer
<CardFooter className="flex items-center p-6 pt-0">
```

**Card Variants:**
| Type | Border | Background | Shadow | Extra Classes |
|------|--------|------------|--------|---------------|
| Default | border-gray-200 | bg-white | shadow-sm | - |
| Interactive | border-gray-200 | bg-white | shadow-sm → shadow-md | hover:shadow-md transition-shadow cursor-pointer |
| Highlighted | border-purple-200 | bg-purple-50 | shadow-sm | - |
| Selected | border-purple-500 | bg-purple-50 | shadow-md | ring-2 ring-purple-500 |

### 4.5 Modal

**Sizes:**
| Size | Max Width | Tailwind Class |
|------|-----------|----------------|
| sm | 384px | max-w-sm |
| md | 448px | max-w-md (default) |
| lg | 512px | max-w-lg |
| xl | 672px | max-w-2xl |

**Styles:**
| Element | Styles |
|---------|--------|
| Backdrop | bg-black/50, z-[200] |
| Container | bg-white, rounded-xl, shadow-xl, mx-4 (mobile margin) |
| Close Button | absolute top-4 right-4, ghost button |
| Title | text-lg font-semibold |
| Content | p-4 or p-6 |
| Footer | flex justify-end gap-3, border-t pt-4 |

**Keyboard:** Escape closes modal
**Animation:** Fade in backdrop, scale up content

### 4.6 Tabs

**Styles:**
```tsx
// Tab List (container)
<TabsList className="border-b border-gray-200">

// Tab Trigger (individual tab)
<TabsTrigger className={cn(
  'px-4 py-2 text-sm font-medium',
  'text-gray-600 hover:text-gray-900',
  // Active state:
  'border-b-2 border-transparent',
  'data-[state=active]:border-[#5B50BD] data-[state=active]:text-[#5B50BD]'
)}>

// Tab Content
<TabsContent className="pt-4">
```

### 4.7 Toast Notifications

**Position:** fixed bottom-4 right-4 (bottom-right corner)
**Z-Index:** z-50
**Duration:** 4000ms default, 6000ms for errors

**Types:**
| Type | Background | Border | Text | Icon |
|------|------------|--------|------|------|
| Success | #F0FDF4 (green-50) | #86EFAC (green-300) | #166534 (green-800) | CheckCircle |
| Error | #FEF2F2 (red-50) | #FECACA (red-200) | #991B1B (red-800) | AlertCircle |
| Warning | #FFFBEB (amber-50) | #FDE68A (amber-200) | #92400E (amber-800) | AlertTriangle |
| Info | #EDE9F9 | #C8C4E9 | #5B50BD | Info |

**Code:**
```tsx
toast.success('Changes saved successfully!');
toast.error('Failed to save. Please try again.');
toast.warning('Your session will expire in 5 minutes.');
toast.info('New features are available.');
```

---

## 5. BORDER RADIUS

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| none | 0px | rounded-none | - |
| sm | 2px | rounded-sm | - |
| md | 6px | rounded-md | Small elements |
| lg | 8px | rounded-lg | **Buttons, inputs, dropdowns** |
| xl | 12px | rounded-xl | **Cards, modals** |
| 2xl | 16px | rounded-2xl | Large cards, hero sections |
| full | 9999px | rounded-full | **Badges, pills, avatars** |

---

## 6. SHADOWS

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| sm | 0 1px 2px rgba(0,0,0,0.05) | shadow-sm | **Cards**, subtle elevation |
| md | 0 4px 6px rgba(0,0,0,0.1) | shadow-md | Hover states, **dropdowns** |
| lg | 0 10px 15px rgba(0,0,0,0.1) | shadow-lg | Elevated elements |
| xl | 0 20px 25px rgba(0,0,0,0.1) | shadow-xl | **Modals, popovers, toasts** |

---

## 7. Z-INDEX SCALE

| Token | Value | Usage |
|-------|-------|-------|
| z-0 | 0 | Base/default |
| z-10 | 10 | Slightly elevated elements |
| z-40 | 40 | Sticky headers, fixed elements |
| z-50 | 50 | **Toast notifications** |
| z-[100] | 100 | **Inline dropdowns** |
| z-[200] | 200 | **Modals and overlays** |
| z-[9999] | 9999 | **Dropdown portals** (top layer) |

---

## 8. ICONS

**Library:** Lucide React (lucide-react)

**Sizes:**
| Size | Dimensions | Tailwind | Usage |
|------|------------|----------|-------|
| Small | 16px | h-4 w-4 | **Standard - in buttons, inline** |
| Medium | 20px | h-5 w-5 | Medium emphasis |
| Large | 24px | h-6 w-6 | Standalone, section headers |

**Common Icons:**
- Navigation: ChevronRight, ChevronDown, ChevronLeft, Menu, X
- Actions: Check, Copy, Edit, Trash, Plus, Minus, Search
- Status: AlertCircle, AlertTriangle, Info, CheckCircle, XCircle
- UI: Settings, User, Bell, Calendar, Filter

**Usage:**
```tsx
import { Check, X, AlertCircle, Info, Copy, ChevronRight } from 'lucide-react';

// In buttons
<Button><Check className="h-4 w-4 mr-2" />Confirm</Button>

// Standalone
<AlertCircle className="h-5 w-5 text-amber-600" />

// With color
<Check className="h-4 w-4 text-green-600" />
<X className="h-4 w-4 text-red-600" />
```

---

## 9. FOCUS STATES

**Global Focus Style:**
```css
:focus-visible {
  outline: 2px solid #5B50BD;
  outline-offset: 2px;
}
```

**Button Focus:**
`focus-visible:ring-2 focus-visible:ring-[#918AD3] focus-visible:ring-offset-2`

**Input Focus:**
`focus:ring-2 focus:ring-[#5B50BD] focus:border-transparent`

---

## 10. ANIMATIONS & TRANSITIONS

**Default Transition:**
`transition-colors` - 150ms ease for color changes

**Common Animations:**
| Name | Description | Usage |
|------|-------------|-------|
| transition-colors | Color transitions | Buttons, links, hover states |
| transition-shadow | Shadow transitions | Card hover states |
| transition-all | All properties | Modal open/close |

**Keyframe Animations:**
- `pulse`: Opacity 1 → 0.5 → 1 (loading states)
- `bounce`: translateY 0 → -4px → 0 (typing indicator)
- `slideUp`: translateY(100%) → 0 (mobile nav)

---

## 11. MOBILE CONSIDERATIONS

**Touch Targets:**
- Minimum: 44px × 44px
- Buttons, links, inputs all have min-height: 44px on mobile

**Font Size:**
- Minimum 16px for inputs (prevents iOS zoom)

**Safe Areas:**
- `padding-top: env(safe-area-inset-top)` for notch
- `padding-bottom: env(safe-area-inset-bottom)` for home indicator

**Scrolling:**
- `-webkit-overflow-scrolling: touch` for momentum
- Hide scrollbars on mobile

---

## 12. DO'S AND DON'TS (Show as green/red cards with check/X icons)

### Color Usage
**DO:**
✓ Use #5B50BD (purple-600) for primary actions and links
✓ Use semantic colors consistently (teal=success, red=error, amber=warning)
✓ Maintain WCAG 4.5:1 contrast ratio minimum for text
✓ Use #232323 (gray-900) for primary text on light backgrounds
✓ Apply teal (#1ED6BB) for success states and positive feedback

**DON'T:**
✗ Don't use pure black (#000000) for text - use gray-900 instead
✗ Don't mix multiple bright accent colors in one component
✗ Don't use color as the ONLY way to convey information (add icons/text)
✗ Don't use brand purple for error or warning states
✗ Don't use low contrast color combinations

### Typography
**DO:**
✓ Use Montserrat font family consistently throughout
✓ Apply font-semibold (600) for all headings
✓ Use text-sm (14px) as the default body text size
✓ Maintain clear visual hierarchy using size and weight
✓ Use font-medium (500) for labels and buttons

**DON'T:**
✗ Don't use more than 2-3 font weights per page
✗ Don't use font sizes smaller than 12px (text-xs)
✗ Don't center-align long paragraphs of text
✗ Don't use ALL CAPS for more than very short labels
✗ Don't mix multiple font families

### Spacing & Layout
**DO:**
✓ Use the consistent 4px base unit spacing scale
✓ Apply p-6 (24px) padding for card content
✓ Use gap-4 (16px) for standard grid and flex layouts
✓ Maintain 44px minimum touch targets on mobile
✓ Group related elements with tighter spacing (8px), separate sections with larger spacing (24px+)

**DON'T:**
✗ Don't use arbitrary spacing values (e.g., 13px, 17px)
✗ Don't crowd elements without adequate whitespace
✗ Don't mix different spacing systems
✗ Don't make clickable areas smaller than 44px on touch devices
✗ Don't nest containers with inconsistent padding

### Components
**DO:**
✓ Use variant="primary" buttons for the main action per view
✓ Apply rounded-xl for cards/modals, rounded-lg for buttons/inputs
✓ Show loading states during async operations
✓ Provide clear feedback on user actions (toasts, state changes)
✓ Use modals sparingly, only for focused tasks requiring attention

**DON'T:**
✗ Don't have multiple primary buttons in a single view
✗ Don't use destructive variant for non-destructive actions
✗ Don't leave users without feedback after actions
✗ Don't use modals for simple notifications (use toasts)
✗ Don't disable buttons without explaining why (use tooltips)

### Accessibility
**DO:**
✓ Provide visible focus states for ALL interactive elements
✓ Use semantic HTML elements (button, input, label, nav, main)
✓ Include alt text for all meaningful images
✓ Support full keyboard navigation throughout
✓ Ensure color is never the ONLY means of conveying information

**DON'T:**
✗ Don't remove focus outlines without providing alternatives
✗ Don't use div/span as buttons without proper ARIA roles
✗ Don't rely solely on color to indicate status (add icons/text)
✗ Don't trap keyboard focus inside components
✗ Don't use placeholder text as the only form field label

### Dark Mode
**DO:**
✓ Use CSS variables for all theme-aware colors
✓ Apply #100E28 (purple-900) for dark mode backgrounds
✓ Use lighter text colors (#E9E9E9, #F1F5F9) in dark mode
✓ Maintain the same semantic color meanings across themes
✓ Test all components in both light and dark modes

**DON'T:**
✗ Don't use pure white (#FFFFFF) text on dark backgrounds
✗ Don't hardcode color values - always use CSS variables
✗ Don't change what semantic colors mean in dark mode
✗ Don't forget to adjust shadows for dark mode (less visible)
✗ Don't use the same border colors in both light and dark modes

---

## VISUAL LAYOUT REQUIREMENTS

1. **Header:** Sticky with BoltInsight logo (purple text or icon) + "Style Guide" title
2. **Hero Section:** Purple gradient (from #100E28 via #1A163C to #231E51), white text, tech stack badges
3. **Navigation:** Sidebar or top tabs: Colors, Typography, Spacing, Components, Best Practices
4. **Color Swatches:** 80-96px tall rectangles showing actual colors, with hex code overlay
5. **Typography Samples:** Actual rendered text at each size/weight
6. **Spacing Visualization:** Purple bars showing relative spacing sizes
7. **Component Examples:** Actually render buttons, badges, inputs, cards (not just descriptions)
8. **Code Blocks:** Dark background (#1F2937), rounded-lg, monospace font, with copy button
9. **Do/Don't Cards:** Side by side - Green (#F0FDF4) for Do with checkmarks, Red (#FEF2F2) for Don't with X icons
10. **Footer:** Border-top, logo small, "Built with React, Next.js, and Tailwind CSS"

Make the entire guide scrollable, well-organized, and visually polished. Every color, size, and style mentioned should be demonstrated visually where possible.
```

---

## KULLANIM TALİMATLARI

1. Yukarıdaki prompt'u tamamen kopyala (``` işaretleri dahil değil, sadece içerik)
2. Claude.ai'ye yapıştır
3. Claude bir **React artifact** oluşturacak
4. Artifact tarayıcıda interaktif olarak render edilecek
5. Figma'ya aktarmak için:
   - Tam sayfa ekran görüntüsü al
   - Veya bölüm bölüm screenshot al
   - Browser'ın inspect tool'unu kullanarak stilleri kopyala

---

## ÖZET

Bu prompt şunları içerir:
- **24 renk** (Purple, Teal, Red, Gray, Slate paletleri)
- **CSS variables** (Light ve Dark mode)
- **8 font boyutu** (Display'den Caption'a)
- **4 font ağırlığı** (400, 500, 600, 700)
- **15+ spacing token** (0px - 80px)
- **5 button variant** + 4 size
- **5 badge variant** + status renkleri
- **Form elementleri** (Input, Textarea, Select)
- **Card, Modal, Tabs, Toast** komponentleri
- **Border radius scale** (sm - full)
- **Shadow scale** (sm - xl)
- **Z-index scale** (0 - 9999)
- **Icon guidelines** (Lucide React)
- **Focus states** ve **animations**
- **6 kategori Do's & Don'ts** (30+ kural)
- **Mobile considerations**
