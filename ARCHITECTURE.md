# BoltInsight Website Architecture

## Overview

BoltInsight is a modern proposal management platform built with Next.js 16, React 19, and TypeScript. The application provides AI-powered proposal creation, project management, analytics, and research tools for market research teams.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         NEXT.JS APP ROUTER                           │    │
│  │                          (src/app/page.tsx)                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        AUTHENTICATION LAYER                          │    │
│  │                    (LoginScreen Component)                           │    │
│  │          ┌─────────────────────────────────────────┐                 │    │
│  │          │  SSO: Microsoft │ Google │ Okta         │                 │    │
│  │          │  Email/Password Authentication          │                 │    │
│  │          └─────────────────────────────────────────┘                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          MAIN APPLICATION                            │    │
│  │  ┌──────────────┐    ┌─────────────────────────────────────────┐    │    │
│  │  │              │    │                                         │    │    │
│  │  │   SIDEBAR    │◄──►│            MAIN CONTENT                 │    │    │
│  │  │  (Navigation)│    │           (Dynamic Views)               │    │    │
│  │  │              │    │                                         │    │    │
│  │  └──────────────┘    └─────────────────────────────────────────┘    │    │
│  │         │                          │                                │    │
│  │         ▼                          ▼                                │    │
│  │  ┌──────────────┐    ┌─────────────────────────────────────────┐    │    │
│  │  │ - Search     │    │  ┌───────────────┬───────────────────┐  │    │    │
│  │  │ - Projects   │    │  │ CONTENT VIEW  │  RIGHT SIDEBAR    │  │    │    │
│  │  │ - History    │    │  │               │  (Navigation)     │  │    │    │
│  │  │ - Settings   │    │  └───────────────┴───────────────────┘  │    │    │
│  │  └──────────────┘    └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         STATE MANAGEMENT                             │    │
│  │                        (Zustand Store)                               │    │
│  │  ┌───────────┬───────────┬───────────┬───────────┬───────────┐     │    │
│  │  │ Proposals │ Projects  │   Chat    │  Library  │  UI State │     │    │
│  │  └───────────┴───────────┴───────────┴───────────┴───────────┘     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         LOCAL STORAGE                                │    │
│  │         boltinsight-storage  │  boltinsight-theme                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Application Flow Diagram

```
                                    ┌──────────────┐
                                    │    USER      │
                                    └──────┬───────┘
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │  Is User Logged In?    │
                              └────────────┬───────────┘
                                           │
                        ┌──────────────────┴──────────────────┐
                        │ NO                                   │ YES
                        ▼                                      ▼
              ┌─────────────────┐                   ┌─────────────────┐
              │  LOGIN SCREEN   │                   │  MAIN CONTENT   │
              │                 │                   │                 │
              │  - SSO Login    │                   │  - Sidebar      │
              │  - Email Login  │                   │  - Content Area │
              │  - Demo Info    │                   │  - Right Sidebar│
              └────────┬────────┘                   └────────┬────────┘
                       │                                     │
                       │ Login Success                       │
                       └─────────────────────────────────────┘
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │    ACTIVE SECTION      │
                              └────────────────────────┘
                                           │
            ┌──────────┬──────────┬────────┼────────┬──────────┬──────────┐
            ▼          ▼          ▼        ▼        ▼          ▼          ▼
      ┌──────────┐ ┌────────┐ ┌────────┐ ┌────┐ ┌────────┐ ┌────────┐ ┌────────┐
      │   NEW    │ │  VIEW  │ │ SEARCH │ │META│ │ TOOLS  │ │LIBRARY │ │PROJECT │
      │PROPOSAL  │ │PROPOSAL│ │  MY/   │ │LRNS│ │        │ │        │ │  VIEW  │
      │          │ │        │ │  ALL   │ │    │ │-MOE    │ │        │ │        │
      │ Chat UI  │ │ Editor │ │        │ │    │ │-Demo   │ │        │ │        │
      │          │ │        │ │        │ │    │ │-Feas   │ │        │ │        │
      └──────────┘ └────────┘ └────────┘ └────┘ └────────┘ └────────┘ └────────┘
```

---

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx ◄──────────────── Root Layout (metadata, fonts, providers)
│   ├── page.tsx ◄────────────────── Entry Point
│   └── globals.css ◄─────────────── Global Styles (Tailwind)
│
├── components/
│   │
│   ├── MainContent.tsx ◄─────────── Content Router/Controller
│   │        │
│   │        ├──► auth/
│   │        │     └── LoginScreen.tsx ◄── Authentication UI
│   │        │
│   │        ├──► chat/
│   │        │     └── ChatInterface.tsx ◄── AI Proposal Creation
│   │        │           │
│   │        │           ├── Template Selection
│   │        │           ├── Message History
│   │        │           ├── File Attachments
│   │        │           └── AI Response Simulation
│   │        │
│   │        ├──► proposal/
│   │        │     ├── ProposalEditor.tsx ◄── Proposal Editing
│   │        │     │     │
│   │        │     │     ├── 12 Editable Sections
│   │        │     │     ├── Version History
│   │        │     │     ├── Export (PDF/Word)
│   │        │     │     └── Approval Workflow
│   │        │     │
│   │        │     └── RightSidebar.tsx ◄── Section Navigator
│   │        │
│   │        ├──► sidebar/
│   │        │     ├── Sidebar.tsx ◄── Main Navigation
│   │        │     ├── SearchSection.tsx ◄── Search & Filters
│   │        │     ├── ProjectsList.tsx ◄── Project Management
│   │        │     └── HistoryList.tsx ◄── Proposal History
│   │        │
│   │        ├──► meta-learnings/
│   │        │     └── MetaLearnings.tsx ◄── Analytics Dashboard
│   │        │
│   │        ├──► tools/
│   │        │     ├── MarginOfErrorCalculator.tsx
│   │        │     ├── DemographicDistribution.tsx
│   │        │     └── FeasibilityCheck.tsx
│   │        │
│   │        └──► library/
│   │              └── Library.tsx ◄── Resource Management
│   │
│   └── ui/ ◄────────────────────── Reusable UI Components
│         ├── button.tsx
│         ├── input.tsx
│         ├── textarea.tsx
│         ├── select.tsx
│         ├── modal.tsx
│         ├── card.tsx
│         ├── badge.tsx
│         ├── tabs.tsx
│         ├── dropdown.tsx
│         └── toast.tsx
│
├── lib/
│   ├── store.ts ◄────────────────── Zustand State Store
│   ├── theme.ts ◄────────────────── Dark Mode Management
│   └── utils.ts ◄────────────────── Utility Functions
│
└── types/
    └── index.ts ◄────────────────── TypeScript Definitions
```

---

## State Management Architecture (Zustand)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ZUSTAND STORE (lib/store.ts)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                              STATE                                   │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                      │    │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐   │    │
│  │  │  USER STATE   │  │PROPOSAL STATE │  │    PROJECT STATE      │   │    │
│  │  │               │  │               │  │                       │   │    │
│  │  │ - currentUser │  │ - proposals[] │  │ - projects[]          │   │    │
│  │  │ - isLoggedIn  │  │ - current     │  │ - currentProject      │   │    │
│  │  │               │  │   Proposal    │  │                       │   │    │
│  │  └───────────────┘  └───────────────┘  └───────────────────────┘   │    │
│  │                                                                      │    │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐   │    │
│  │  │  CHAT STATE   │  │ LIBRARY STATE │  │      UI STATE         │   │    │
│  │  │               │  │               │  │                       │   │    │
│  │  │ - chatMessages│  │ - libraryItems│  │ - sidebarOpen         │   │    │
│  │  │ - isAiTyping  │  │               │  │ - sidebarCollapsed    │   │    │
│  │  │               │  │               │  │ - rightSidebarCollapsed│  │    │
│  │  │               │  │               │  │ - activeSection       │   │    │
│  │  └───────────────┘  └───────────────┘  └───────────────────────┘   │    │
│  │                                                                      │    │
│  │  ┌───────────────────────────────────────────────────────────────┐  │    │
│  │  │                       FILTER STATE                            │  │    │
│  │  │  - metaLearningFilter (status, client, author, dateRange)    │  │    │
│  │  └───────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                             ACTIONS                                  │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                      │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │    │
│  │  │ PROPOSAL ACTIONS│  │ PROJECT ACTIONS │  │    CHAT ACTIONS     │ │    │
│  │  │                 │  │                 │  │                     │ │    │
│  │  │ - addProposal   │  │ - addProject    │  │ - addChatMessage    │ │    │
│  │  │ - updateProposal│  │ - updateProject │  │ - clearChat         │ │    │
│  │  │ - deleteProposal│  │ - deleteProject │  │ - setAiTyping       │ │    │
│  │  │ - setCurrentProp│  │ - setCurrentProj│  │                     │ │    │
│  │  │ - submitApproval│  │ - moveProposal  │  │                     │ │    │
│  │  │ - updateStatus  │  │   ToProject     │  │                     │ │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │    │
│  │                                                                      │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │    │
│  │  │ LIBRARY ACTIONS │  │  FILTER ACTIONS │  │     UI ACTIONS      │ │    │
│  │  │                 │  │                 │  │                     │ │    │
│  │  │ - addLibraryItem│  │ - setMetaFilter │  │ - setSidebarOpen    │ │    │
│  │  │ - deleteLibItem │  │ - clearFilter   │  │ - setSidebarCollapse│ │    │
│  │  │                 │  │                 │  │ - setRightSidebar   │ │    │
│  │  │                 │  │                 │  │ - setActiveSection  │ │    │
│  │  │                 │  │                 │  │ - setLoggedIn       │ │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────┘ │    │
│  │                                                                      │    │
│  │  ┌───────────────────────────────────────────────────────────────┐  │    │
│  │  │                       SEARCH ACTIONS                          │  │    │
│  │  │  - searchProposals(query)  - getFilteredProposals()           │  │    │
│  │  └───────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          PERSISTENCE                                 │    │
│  │                                                                      │    │
│  │   persist middleware → localStorage ('boltinsight-storage')         │    │
│  │   Persisted: isLoggedIn, sidebarCollapsed, rightSidebarCollapsed    │    │
│  │   Version: 3 (with migration support)                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         THEME STORE (lib/theme.ts)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  State: isDarkMode (boolean)                                                 │
│  Action: toggleDarkMode()                                                    │
│  Persistence: localStorage ('boltinsight-theme')                             │
│  Effect: useThemeEffect() → syncs DOM classList                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW                                     │
└───────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────────────┐
                    │         USER INTERACTION        │
                    │                                 │
                    │  - Click button                 │
                    │  - Submit form                  │
                    │  - Type in input                │
                    │  - Navigate                     │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │       REACT COMPONENT           │
                    │                                 │
                    │  - Handle event                 │
                    │  - Call store action            │
                    │  - Local state updates          │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │       ZUSTAND STORE             │
                    │                                 │
                    │  - Execute action               │
                    │  - Update state                 │
                    │  - Trigger re-render            │
                    └───────────────┬─────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
          ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
          │  Component  │ │ Persistence │ │   Other     │
          │  Re-render  │ │ Middleware  │ │ Components  │
          │             │ │             │ │ Re-render   │
          └─────────────┘ └──────┬──────┘ └─────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────────────┐
                    │        LOCAL STORAGE            │
                    │                                 │
                    │  - boltinsight-storage          │
                    │  - boltinsight-theme            │
                    └─────────────────────────────────┘
```

---

## Proposal Workflow State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROPOSAL STATUS WORKFLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌───────────────┐
                              │    CREATE     │
                              │   PROPOSAL    │
                              └───────┬───────┘
                                      │
                                      ▼
                              ┌───────────────┐
                              │     DRAFT     │ ◄──────────────────────┐
                              │    (Gray)     │                        │
                              └───────┬───────┘                        │
                                      │                                │
                                      │ Submit for Approval            │
                                      ▼                                │
                              ┌───────────────┐                        │
                              │    PENDING    │                        │
                              │   APPROVAL    │                        │
                              │   (Yellow)    │                        │
                              └───────┬───────┘                        │
                                      │                                │
           ┌──────────────────────────┼──────────────────────────┐     │
           │                          │                          │     │
           ▼                          ▼                          ▼     │
   ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
   │   APPROVED    │          │   ON HOLD     │          │   REJECTED    │
   │    (Green)    │          │   (Orange)    │          │    (Red)      │
   └───────────────┘          └───────┬───────┘          └───────┬───────┘
                                      │                          │
                                      │ Resume Review            │ Revise
                                      │                          │
                                      └──────────────────────────┘
                                                  │
                                                  │
                                                  └─────────► Back to DRAFT
```

---

## Navigation Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SIDEBAR NAVIGATION                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────┐
│           BOLTINSIGHT               │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐│
│  │ ➕ New Proposal                 ││ ──► ChatInterface
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🔍 Search My Proposals          ││ ──► SearchSection (my)
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🔍 Search All Proposals         ││ ──► SearchSection (all)
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 📊 Meta Learnings               ││ ──► MetaLearnings
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🛠️ Tools                  ▼     ││
│  ├─────────────────────────────────┤│
│  │   ├── MOE Calculator            ││ ──► MarginOfErrorCalculator
│  │   ├── Demographics              ││ ──► DemographicDistribution
│  │   └── Feasibility               ││ ──► FeasibilityCheck
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 📚 Library                      ││ ──► Library
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 📁 PROJECTS                ▼    ││
│  ├─────────────────────────────────┤│
│  │   ├── Project 1                 ││ ──► ProjectView
│  │   ├── Project 2                 ││
│  │   └── + New Project             ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 📜 HISTORY                 ▼    ││
│  ├─────────────────────────────────┤│
│  │   ├── Recent Proposal 1         ││ ──► ProposalEditor
│  │   ├── Recent Proposal 2         ││
│  │   └── ...                       ││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │ 👤 User Profile                 ││
│  │    Settings | Dark Mode | Logout││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TECHNOLOGY STACK                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         FRAMEWORK LAYER                                │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │ │
│  │  │  Next.js 16  │  │  React 19    │  │ TypeScript 5 │                 │ │
│  │  │  App Router  │  │  Components  │  │  Type Safety │                 │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         UI LAYER                                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │ │
│  │  │ TailwindCSS 4│  │  Radix UI    │  │ Lucide Icons │                 │ │
│  │  │   Styling    │  │  Primitives  │  │    500+      │                 │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                      STATE MANAGEMENT                                  │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │  │              Zustand 5.0.9 (with persist middleware)             │ │ │
│  │  └──────────────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                       EXPORT/UTILITIES                                 │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │ │
│  │  │   jsPDF      │  │    docx      │  │  file-saver  │  │  date-fns  │ │ │
│  │  │ PDF Export   │  │ Word Export  │  │  Downloads   │  │   Dates    │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘ │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │ │
│  │  │     uuid     │  │    clsx      │  │tailwind-merge│                 │ │
│  │  │   ID Gen     │  │  Classnames  │  │ Class Merge  │                 │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                              STORAGE                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    Browser localStorage                                │ │
│  │  ┌──────────────────────────────┐  ┌─────────────────────────────┐    │ │
│  │  │    boltinsight-storage       │  │    boltinsight-theme        │    │ │
│  │  │    (App State)               │  │    (Theme Preference)       │    │ │
│  │  └──────────────────────────────┘  └─────────────────────────────┘    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Models

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA MODELS                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│           PROPOSAL              │      │            USER                 │
├─────────────────────────────────┤      ├─────────────────────────────────┤
│ id: string                      │      │ id: string                      │
│ code: string (BI-YYMM-XXXX)     │      │ name: string                    │
│ projectId: string               │◄─────│ email: string                   │
│ status: ProposalStatus          │      │ role: 'admin' | 'manager' |     │
│ content: ProposalContent        │      │       'researcher' | 'viewer'   │
│ author: User ──────────────────►│      │ region: string                  │
│ collaborators: User[]           │      │ avatar: string                  │
│ createdAt: string               │      └─────────────────────────────────┘
│ updatedAt: string               │
│ sentToClient: boolean           │      ┌─────────────────────────────────┐
│ versions: ProposalVersion[]     │      │         PROJECT                 │
│ approvalHistory: ApprovalRecord │      ├─────────────────────────────────┤
│ comments: Comment[]             │      │ id: string                      │
└─────────────────────────────────┘      │ name: string                    │
                │                        │ description: string             │
                │                        │ client: string                  │
                ▼                        │ proposals: string[] ◄───────────│
┌─────────────────────────────────┐      │ createdAt: string               │
│       PROPOSAL CONTENT          │      │ updatedAt: string               │
├─────────────────────────────────┤      │ isDefault: boolean              │
│ title: string                   │      └─────────────────────────────────┘
│ client: string                  │
│ contact: string                 │      ┌─────────────────────────────────┐
│ background: string              │      │        LIBRARY ITEM             │
│ businessObjectives: string[]    │      ├─────────────────────────────────┤
│ researchObjectives: string[]    │      │ id: string                      │
│ burningQuestions: string[]      │      │ name: string                    │
│ targetDefinition: string        │      │ description: string             │
│ sampleSize: number              │      │ url: string                     │
│ markets: Market[]               │      │ category: 'external_link' |     │
│ quotas: Quota[]                 │      │   'video' | 'template' |        │
│ advancedAnalysis: string[]      │      │   'methodology'                 │
│ referenceProjects: string[]     │      │ tags: string[]                  │
│ timeline: Timeline              │      │ createdAt: string               │
│ pricing: Pricing                │      └─────────────────────────────────┘
└─────────────────────────────────┘
                │                        ┌─────────────────────────────────┐
                ▼                        │        CHAT MESSAGE             │
┌─────────────────────────────────┐      ├─────────────────────────────────┤
│           MARKET                │      │ id: string                      │
├─────────────────────────────────┤      │ role: 'user' | 'assistant' |    │
│ country: string                 │      │       'system'                  │
│ language: string                │      │ content: string                 │
│ sampleSize: number              │      │ timestamp: string               │
│ quotas: Quota[]                 │      │ attachments: Attachment[]       │
└─────────────────────────────────┘      └─────────────────────────────────┘
```

---

## Feature Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            FEATURE MAP                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  PROPOSAL MANAGEMENT                                                         │
│  ├── Create (AI Chat / Manual)                                              │
│  ├── Edit (12 Sections)                                                     │
│  ├── Version History                                                        │
│  ├── Submit for Approval                                                    │
│  ├── Status Tracking                                                        │
│  ├── Collaboration (Coworking)                                              │
│  └── Export (PDF / Word)                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  PROJECT ORGANIZATION                                                        │
│  ├── Create Projects                                                        │
│  ├── Assign Proposals                                                       │
│  ├── View by Project                                                        │
│  └── Default Project Support                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  SEARCH & DISCOVERY                                                          │
│  ├── Full-text Search                                                       │
│  ├── Filter by Status                                                       │
│  ├── Filter by Client                                                       │
│  ├── Filter by Author                                                       │
│  ├── Filter by Date Range                                                   │
│  └── Search Own vs All                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ANALYTICS (META LEARNINGS)                                                  │
│  ├── Proposal Statistics                                                    │
│  ├── Client Breakdown                                                       │
│  ├── Author Performance                                                     │
│  ├── Status Distribution                                                    │
│  └── AI Insights (Placeholder)                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  RESEARCH TOOLS                                                              │
│  ├── Margin of Error Calculator                                             │
│  ├── Sample Size Calculator                                                 │
│  ├── Demographic Distribution                                               │
│  └── Feasibility Assessment                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  LIBRARY                                                                     │
│  ├── External Links                                                         │
│  ├── Video Resources                                                        │
│  ├── Templates                                                              │
│  └── Methodologies                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  USER EXPERIENCE                                                             │
│  ├── Dark Mode Toggle                                                       │
│  ├── Responsive Design                                                      │
│  ├── Collapsible Sidebars                                                   │
│  ├── Toast Notifications                                                    │
│  └── Settings Modal                                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Security & Authentication

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION ARCHITECTURE                               │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   LOGIN PAGE    │
                              └────────┬────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                                      │
                    ▼                                      ▼
          ┌─────────────────┐                    ┌─────────────────┐
          │   SSO OPTIONS   │                    │  EMAIL/PASSWORD │
          │                 │                    │                 │
          │  - Microsoft    │                    │  - Email input  │
          │  - Google       │                    │  - Password     │
          │  - Okta         │                    │  - Remember me  │
          └────────┬────────┘                    └────────┬────────┘
                   │                                      │
                   └──────────────────┬───────────────────┘
                                      │
                                      ▼
                           ┌─────────────────┐
                           │   SET LOGGED IN │
                           │   (Zustand)     │
                           └────────┬────────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │  MAIN APP VIEW  │
                           └─────────────────┘

Note: Currently mock authentication - ready for backend integration
```

---

## Responsive Design Breakpoints

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        RESPONSIVE BREAKPOINTS                                │
└─────────────────────────────────────────────────────────────────────────────┘

MOBILE (< 768px)
┌─────────────────────────────────────┐
│ ☰ BOLTINSIGHT                       │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │      FULL WIDTH CONTENT       │  │
│  │                               │  │
│  │      (Sidebar as overlay)     │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘

TABLET (768px - 1024px)
┌─────────────────────────────────────────────────┐
│ BOLTINSIGHT                                      │
├─────────┬───────────────────────────────────────┤
│         │                                        │
│ SIDEBAR │         MAIN CONTENT                   │
│ (mini)  │                                        │
│         │                                        │
└─────────┴───────────────────────────────────────┘

DESKTOP (> 1024px)
┌───────────────────────────────────────────────────────────────────┐
│ BOLTINSIGHT                                                        │
├───────────────┬────────────────────────────────────┬──────────────┤
│               │                                    │              │
│    SIDEBAR    │          MAIN CONTENT              │    RIGHT     │
│    (full)     │                                    │   SIDEBAR    │
│               │                                    │              │
│   - Menu      │                                    │  - Section   │
│   - Projects  │                                    │    Navigator │
│   - History   │                                    │              │
│               │                                    │              │
└───────────────┴────────────────────────────────────┴──────────────┘
```

---

## Build & Deployment

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BUILD & DEPLOYMENT                                    │
└─────────────────────────────────────────────────────────────────────────────┘

Development:
  npm run dev ──────► Next.js Dev Server (localhost:3000)

Production Build:
  npm run build ────► .next/ (Optimized Bundle)
  npm run start ────► Production Server

Linting:
  npm run lint ─────► ESLint Validation

┌─────────────────────────────────────────────────────────────────────────────┐
│                          BUILD OUTPUT                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  .next/                                                                      │
│  ├── cache/                    # Build cache                                 │
│  ├── server/                   # Server-side code                            │
│  ├── static/                   # Static assets                               │
│  │   ├── chunks/               # Code-split chunks                           │
│  │   ├── css/                  # Compiled CSS                                │
│  │   └── media/                # Images, fonts                               │
│  └── BUILD_ID                  # Unique build identifier                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Future Architecture (Backend Integration)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FUTURE ARCHITECTURE (With Backend)                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    FRONTEND     │◄───►│   API GATEWAY   │◄───►│    BACKEND      │
│   (Next.js)     │     │   (REST/GraphQL)│     │   (Node.js)     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                          ┌──────────────┼──────────────┐
                                          │              │              │
                                          ▼              ▼              ▼
                                   ┌───────────┐  ┌───────────┐  ┌───────────┐
                                   │           │  │           │  │           │
                                   │ PostgreSQL│  │   Redis   │  │    S3     │
                                   │ Database  │  │   Cache   │  │  Storage  │
                                   │           │  │           │  │           │
                                   └───────────┘  └───────────┘  └───────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI INTEGRATION                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐        │
│  │   Chat Service  │────►│   AI Gateway    │────►│   OpenAI /      │        │
│  │                 │     │                 │     │   Claude API    │        │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Summary

BoltInsight is a comprehensive proposal management platform with:

- **Modern Tech Stack**: Next.js 16, React 19, TypeScript, TailwindCSS
- **State Management**: Zustand with persistence
- **Rich UI**: Radix UI primitives, Lucide icons
- **Key Features**: AI chat, proposal editor, analytics, research tools, library
- **Export**: PDF and Word document generation
- **Responsive**: Mobile-first design with collapsible navigation
- **Theme**: Full dark mode support
- **Architecture**: Client-side first, ready for backend integration

---

*Last Updated: December 2024*
