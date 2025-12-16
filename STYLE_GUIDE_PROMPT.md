# Claude Artifact Prompt: BoltInsight Style Guide

Use this prompt to generate a comprehensive, Figma-ready style guide artifact.

---

## PROMPT

```
Create a comprehensive, visually stunning Style Guide for "BoltInsight" as a React component artifact. This should be a complete design system documentation that can be exported to Figma.

## Brand Information
- **Company Name:** BoltInsight
- **Logo:** Use a purple lightning bolt icon or placeholder text "BoltInsight" with the brand purple color
- **Tagline:** "A comprehensive guide to building consistent, accessible, and beautiful user interfaces for the BoltInsight platform."
- **Tech Stack Badges:** Figma Ready, React / Next.js, Tailwind CSS

## Design Requirements
- Clean, professional layout with clear visual hierarchy
- Organized sections with consistent spacing
- Color swatches should be clickable/visual rectangles showing the actual color
- Include code examples in dark code blocks
- Use cards to group related content
- Add visual Do's and Don'ts sections with green checkmarks and red X icons

---

## SECTION 1: COLOR PALETTE

### Primary Colors (Purple) - Brand Color
Purple represents trust, innovation, and insight.

| Name | HEX | CSS Variable | Usage |
|------|-----|--------------|-------|
| Purple 900 | #100E28 | purple-900 | Dark backgrounds |
| Purple 800 | #1A163C | purple-800 | Cards (dark mode) |
| Purple 700 | #231E51 | purple-700 | Text (dark mode) |
| Purple 600 | #5B50BD | purple-600 | **Primary actions** (main brand color) |
| Purple 500 | #918AD3 | purple-500 | Hover states |
| Purple 400 | #C8C4E9 | purple-400 | Borders, muted elements |

### Secondary Colors (Teal) - Accent/Success
Teal is used for success states and positive actions.

| Name | HEX | CSS Variable | Usage |
|------|-----|--------------|-------|
| Teal 900 | #0E6B5D | teal-900 | Success text (dark) |
| Teal 800 | #14A08C | teal-800 | Success hover |
| Teal 600 | #1ED6BB | teal-600 | **Success primary** |
| Teal 400 | #73EBD9 | teal-400 | Success light |
| Teal 200 | #A1F1E6 | teal-200 | Success background light |
| Teal 100 | #D0F8F2 | teal-100 | Success background |

### Danger Colors (Red)
Red is used for error states, destructive actions, and warnings.

| Name | HEX | CSS Variable | Usage |
|------|-----|--------------|-------|
| Red 900 | #860E24 | red-900 | Error text (dark) |
| Red 800 | #CA1636 | red-800 | Error hover |
| Red 600 | #EB3F5F | red-600 | **Error primary** |
| Red 400 | #F38B9F | red-400 | Error light |
| Red 200 | #F7B2BF | red-200 | Error background light |
| Red 100 | #FBD8DF | red-100 | Error background |

### Neutral Colors (Gray)
Grays are used for text, borders, backgrounds, and UI chrome.

| Name | HEX | CSS Variable | Usage |
|------|-----|--------------|-------|
| Gray 900 | #232323 | gray-900 | **Primary text** |
| Gray 700 | #393939 | gray-700 | Secondary text |
| Gray 600 | #5A5A5A | gray-600 | Muted text |
| Gray 500 | #919191 | gray-500 | Placeholder text |
| Gray 300 | #C8C8C8 | gray-300 | Borders |
| Gray 100 | #E9E9E9 | gray-100 | Backgrounds |

### Semantic Colors
Show 4 cards side by side:

1. **Success** - Background: #1ED6BB, Text: #0E6B5D
   - Usage: Confirmations, completed actions, positive feedback

2. **Warning** - Background: #F59E0B, Text: #B45309
   - Usage: Cautions, pending states, attention needed

3. **Error** - Background: #EB3F5F, Text: #860E24
   - Usage: Errors, destructive actions, critical alerts

4. **Info** - Background: #5B50BD, Text: #231E51
   - Usage: Information, help text, neutral notifications

### Color Code Example
```tsx
// Using Tailwind classes
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
}
```

---

## SECTION 2: TYPOGRAPHY

### Font Family
- **Primary Font:** Montserrat
- **Fallback:** ui-sans-serif, system-ui, sans-serif
- **CSS Variable:** `--font-sans: 'Montserrat', ui-sans-serif, system-ui, sans-serif`

### Font Weights
Show each weight with a large sample text "Aa Bb Cc 123":

| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text, paragraphs |
| 500 | Medium | Labels, buttons |
| 600 | Semibold | Headings, emphasis |
| 700 | Bold | Strong emphasis |

### Type Scale
Display each with sample text "The quick brown fox jumps over the lazy dog":

| Name | Size | CSS Class | Usage |
|------|------|-----------|-------|
| Display | 36px / 2.25rem | text-4xl font-bold | Hero sections, main titles |
| Heading 1 | 30px / 1.875rem | text-3xl font-semibold | Page titles |
| Heading 2 | 24px / 1.5rem | text-2xl font-semibold | Section titles |
| Heading 3 | 20px / 1.25rem | text-xl font-semibold | Card titles, subsections |
| Heading 4 | 18px / 1.125rem | text-lg font-semibold | Component headers |
| Body Large | 16px / 1rem | text-base font-normal | Important body text |
| Body | 14px / 0.875rem | text-sm font-normal | **Default body text**, labels |
| Caption | 12px / 0.75rem | text-xs font-normal | Captions, helper text |

### Typography Code Example
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

// Labels
<label className="text-sm font-medium text-gray-700">Form Label</label>

// Links
<a className="text-sm text-purple-600 hover:text-purple-700 underline">
  Link Text
</a>
```

---

## SECTION 3: SPACING SYSTEM

### Base Unit
4px base unit for consistent rhythm and visual hierarchy.

### Spacing Scale
Show visual bars representing each spacing value:

| Token | Value | CSS Class | Visual |
|-------|-------|-----------|--------|
| 0 | 0px | p-0 | — |
| 0.5 | 2px | p-0.5 | ██ |
| 1 | 4px | p-1 | ████ |
| 1.5 | 6px | p-1.5 | ██████ |
| 2 | 8px | p-2 | ████████ |
| 2.5 | 10px | p-2.5 | ██████████ |
| 3 | 12px | p-3 | ████████████ |
| 4 | 16px | p-4 | ████████████████ |
| 5 | 20px | p-5 | ████████████████████ |
| 6 | 24px | p-6 | ████████████████████████ |
| 8 | 32px | p-8 | ████████████████████████████████ |
| 10 | 40px | p-10 | ████████████████████████████████████████ |
| 12 | 48px | p-12 | ████████████████████████████████████████████████ |

### Container Widths
| Token | Value | Usage |
|-------|-------|-------|
| max-w-7xl | 1280px | Main content |
| max-w-3xl | 768px | Text content |
| max-w-md | 448px | Modals default |
| max-w-sm | 384px | Small modals |

### Common Spacings
| Class | Usage |
|-------|-------|
| gap-4 | Default grid/flex gap |
| p-6 | Card padding |
| mb-4 | Section margin |
| space-y-2 | Stack spacing |

### Spacing Code Example
```tsx
// Card Layout
<Card className="p-6">
  <CardHeader className="space-y-1.5">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="pt-4">Content here</CardContent>
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
</div>
```

---

## SECTION 4: COMPONENTS

### 4.1 Buttons
Show visual examples of each:

**Variants:**
| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| Primary | #5B50BD | white | none | Main actions |
| Secondary | #F6F8F8 | #231E51 | none | Secondary actions |
| Outline | transparent | #5B50BD | #5B50BD | Tertiary actions |
| Ghost | transparent | #5B50BD | none | Subtle actions |
| Destructive | #EB3F5F | white | none | Destructive actions |

**Sizes:**
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 32px (h-8) | 12px (px-3) | 14px (text-sm) |
| md | 40px (h-10) | 16px (px-4) | 14px (text-sm) |
| lg | 48px (h-12) | 24px (px-6) | 16px (text-base) |

**States:** Default, Hover, Focused (ring-2 ring-purple-500), Disabled (opacity-50)

**With Icons:**
- Icon left: `<CheckIcon className="h-4 w-4 mr-2" />Confirm`
- Icon right: `Next<ChevronRightIcon className="h-4 w-4 ml-2" />`

### 4.2 Badges
Show visual examples:

**Semantic Variants:**
| Variant | Background | Text |
|---------|------------|------|
| Default | #E9E9E9 | #393939 |
| Success | #D0F8F2 | #0E6B5D |
| Warning | #FEF3C7 | #B45309 |
| Error | #FBD8DF | #860E24 |
| Info | #EDE9F9 | #5B50BD |

**Status Badges:**
| Status | Background | Text |
|--------|------------|------|
| Draft | #E9E9E9 | #393939 |
| Pending Approval | #FEF3C7 | #B45309 |
| Approved | #D1FAE5 | #065F46 |
| Rejected | #FBD8DF | #860E24 |
| On Hold | #E2E8F0 | #475569 |

**Style:** rounded-full, px-2.5, py-0.5, text-xs, font-medium

### 4.3 Form Elements

**Input:**
- Height: 40px (h-10)
- Border: 1px solid #C8C8C8
- Border Radius: 8px (rounded-lg)
- Padding: 12px horizontal (px-3)
- Focus: ring-2 ring-purple-600, border-transparent
- Placeholder: #919191

**Textarea:**
- Min Height: 80px
- Same styling as Input
- resize-none

**Select:**
- Same styling as Input
- ChevronDown icon on right (h-4 w-4)

### 4.4 Cards
**Structure:**
```tsx
<Card>              // rounded-xl, border, border-gray-200, bg-white, shadow-sm
  <CardHeader>      // p-6, space-y-1.5
    <CardTitle>     // font-semibold, text-lg
    <CardDescription> // text-sm, text-gray-600
  </CardHeader>
  <CardContent>     // p-6, pt-0
  <CardFooter>      // p-6, pt-0
</Card>
```

**Variants:**
- Default: border-gray-200, bg-white
- Interactive: hover:shadow-md, transition-shadow, cursor-pointer
- Highlighted: border-purple-200, bg-purple-50

### 4.5 Tabs
```tsx
<Tabs defaultValue="tab1">
  <TabsList>        // border-b border-gray-200
    <TabsTrigger>   // px-4 py-2 text-sm font-medium
                    // Active: border-b-2 border-purple-600 text-purple-600
                    // Inactive: text-gray-600 hover:text-gray-900
  </TabsList>
  <TabsContent>     // pt-4
</Tabs>
```

### 4.6 Modals
**Sizes:**
| Size | Max Width |
|------|-----------|
| sm | 384px (max-w-sm) |
| md | 448px (max-w-md) |
| lg | 512px (max-w-lg) |
| xl | 672px (max-w-2xl) |

**Style:**
- Backdrop: bg-black/50
- Container: rounded-xl, shadow-xl, bg-white
- Z-index: z-[200]
- Mobile margin: mx-4

### 4.7 Toast Notifications
**Types:**
| Type | Background | Border | Text | Icon |
|------|------------|--------|------|------|
| Success | #F0FDF4 | #86EFAC | #166534 | CheckCircle |
| Error | #FEF2F2 | #FECACA | #991B1B | AlertCircle |
| Warning | #FFFBEB | #FDE68A | #92400E | AlertTriangle |
| Info | #EDE9F9 | #C8C4E9 | #5B50BD | Info |

**Position:** fixed bottom-4 right-4, z-50
**Duration:** 4000ms default, 6000ms for errors

---

## SECTION 5: INTERACTIONS & STATES

### Focus States
- Focus Ring: ring-2 ring-purple-500 ring-offset-2
- Focus Outline: 2px solid #5B50BD, 2px offset

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| rounded-full | 9999px | Badges, pills, avatars |
| rounded-xl | 12px | Cards, modals |
| rounded-lg | 8px | Buttons, inputs |
| rounded-md | 6px | Small elements |

### Shadows
| Token | Usage |
|-------|-------|
| shadow-sm | Cards, subtle elevation |
| shadow-md | Hover states, dropdowns |
| shadow-xl | Modals, popovers, toasts |

### Z-Index Scale
| Token | Value | Usage |
|-------|-------|-------|
| z-[9999] | 9999 | Dropdown portals |
| z-[200] | 200 | Modals |
| z-[100] | 100 | Inline dropdowns |
| z-50 | 50 | Toasts |
| z-40 | 40 | Sticky headers |
| z-10 | 10 | Elevated elements |
| z-0 | 0 | Base |

---

## SECTION 6: ICONS

### Library
Lucide React (lucide-react)

### Sizes
| Class | Size | Usage |
|-------|------|-------|
| h-4 w-4 | 16px | Standard, in buttons |
| h-5 w-5 | 20px | Medium |
| h-6 w-6 | 24px | Large, standalone |

### Common Icons
Check, X, AlertCircle, AlertTriangle, Info, Copy, ChevronRight, ChevronDown, Search, Settings, User, Menu

### Usage Example
```tsx
import { Check, X, AlertCircle } from 'lucide-react';

<Check className="h-4 w-4 text-green-600" />
<X className="h-4 w-4 text-red-600" />
<AlertCircle className="h-5 w-5 text-amber-600" />
```

---

## SECTION 7: BEST PRACTICES (DO'S AND DON'TS)

Create side-by-side cards with green (Do) and red (Don't) backgrounds.

### Color Usage
**DO:**
- Use purple-600 (#5B50BD) for primary actions
- Use semantic colors consistently (green=success, red=error)
- Maintain sufficient contrast ratio (4.5:1 minimum)
- Use gray-900 for primary text, gray-600 for secondary
- Apply teal for success states and positive feedback

**DON'T:**
- Don't use pure black (#000000) for text
- Don't mix multiple bright colors in one component
- Don't use color as the only indicator (add icons/text)
- Don't use brand purple for error states
- Don't use low contrast color combinations

### Typography
**DO:**
- Use Montserrat font family consistently
- Apply font-semibold (600) for headings
- Use text-sm (14px) as default body size
- Maintain clear visual hierarchy with size/weight
- Use font-medium for labels and buttons

**DON'T:**
- Don't use more than 2-3 font weights per page
- Don't use font sizes smaller than 12px
- Don't center-align long paragraphs
- Don't use all caps for more than short labels
- Don't mix multiple font families

### Spacing & Layout
**DO:**
- Use consistent spacing scale (4px base unit)
- Apply p-6 padding for card content
- Use gap-4 for standard grid layouts
- Maintain touch targets of 44px minimum on mobile
- Group related elements with tighter spacing

**DON'T:**
- Don't use arbitrary spacing values
- Don't crowd elements without adequate whitespace
- Don't mix different spacing systems
- Don't make clickable areas too small
- Don't nest containers with inconsistent padding

### Components
**DO:**
- Use Button variant="primary" for main actions
- Apply rounded-xl for cards, rounded-lg for buttons
- Show loading states for async operations
- Provide clear feedback on user actions (toasts)
- Use modals for focused tasks requiring attention

**DON'T:**
- Don't have multiple primary buttons per view
- Don't use destructive variant for non-destructive actions
- Don't leave users without feedback on actions
- Don't use modals for simple notifications
- Don't disable buttons without explanation

### Accessibility
**DO:**
- Provide visible focus states for all interactive elements
- Use semantic HTML elements (button, input, label)
- Include alt text for all meaningful images
- Support keyboard navigation throughout
- Ensure color is not the only means of conveying info

**DON'T:**
- Don't remove focus outlines without alternatives
- Don't use div/span as buttons without ARIA roles
- Don't rely solely on color for status indication
- Don't trap keyboard focus in components
- Don't use placeholder text as the only label

### Dark Mode
**DO:**
- Use CSS variables for theme-aware colors
- Apply purple-900 (#100E28) for dark backgrounds
- Use lighter text colors (gray-100) in dark mode
- Maintain semantic color meanings across themes
- Test all components in both light and dark modes

**DON'T:**
- Don't use pure white (#fff) text on dark backgrounds
- Don't hardcode color values, use CSS variables
- Don't change semantic color meanings in dark mode
- Don't forget to update shadows for dark mode
- Don't use the same border colors in both modes

---

## Visual Design Requirements

1. **Header:** Sticky header with BoltInsight logo and "Style Guide" title
2. **Hero Section:** Purple gradient background (purple-900 to purple-700) with brand description
3. **Section Headers:** 24px semibold title, gray-600 description, horizontal divider
4. **Color Swatches:** 96px tall rectangles with rounded corners, showing hex code
5. **Code Blocks:** Dark background (#1F2937), rounded-lg, with copy button
6. **Do/Don't Cards:** Green (bg-green-50, border-green-200) and Red (bg-red-50, border-red-200)
7. **Footer:** Border top, logo, and "Built with React, Next.js, and Tailwind CSS"

Make the artifact scrollable and ensure all sections are clearly separated with adequate spacing.
```

---

## Usage Instructions

1. Copy the entire prompt above
2. Paste it into Claude.ai chat
3. Ask Claude to create a React artifact
4. The artifact will render as a complete, interactive style guide
5. You can screenshot sections or use browser dev tools to export to Figma

---

## Notes

- All color values are exact HEX codes from the BoltInsight design system
- Typography uses Montserrat from Google Fonts
- Spacing follows a 4px base unit system
- Components are built with Tailwind CSS
- The design supports both light and dark modes
