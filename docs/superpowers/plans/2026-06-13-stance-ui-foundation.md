# Stance UI Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely replace the purple/indigo design system and fixed sidebar with a dark red-accent design system and a two-panel layout featuring a new top bar.

**Architecture:** Rebuild `Header.tsx` into a new top bar design, delete `Sidebar.tsx`, remove `isSidebarOpen` from context, replace the `App.tsx` shell with a two-panel layout (420px left / flex-1 right), and do minimal color-token replacements in existing component files to eliminate all indigo/violet/purple references.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v3 (arbitrary values), Lucide React

---

## File Map

**Delete:**
- `src/components/layout/Sidebar.tsx`

**Rewrite (whole file):**
- `index.html`
- `README.md`
- `src/index.css`
- `src/components/layout/Header.tsx`
- `src/App.tsx`

**Modify (targeted edits only):**
- `tailwind.config.js` — remove `indigo-glow` box-shadow
- `src/context/AppContext.tsx` — remove `isSidebarOpen`/`setIsSidebarOpen`
- `src/components/ui/Button.tsx` — replace indigo variants
- `src/components/ui/Toast.tsx` — replace indigo info style
- `src/components/ui/EmptyState.tsx` — replace indigo icon/text colors
- `src/components/results/ReplyCard.tsx` — replace indigo/violet/purple card accents
- `src/components/results/ReplyGrid.tsx` — replace indigo icon color
- `src/components/results/RiskMeter.tsx` — replace indigo icon/dot colors
- `src/components/playbooks/SavePlaybookModal.tsx` — replace indigo focus rings
- `src/components/workspace/IncomingMessage.tsx` — replace indigo focus ring
- `src/components/workspace/SituationSelector.tsx` — replace indigo focus ring
- `src/components/workspace/OutcomeSelector.tsx` — replace indigo active/hover states
- `src/components/workspace/RoleInput.tsx` — replace indigo focus ring
- `src/components/workspace/WritingExamples.tsx` — replace indigo badge/focus/button colors

---

## Task 1: Branding cleanup — index.html and README.md

**Files:**
- Modify: `index.html`
- Modify: `README.md`

- [ ] **Step 1: Update index.html**

Replace the entire file content with:

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Paste the message. Pick your outcome. Get 3 ready-to-send replies in seconds — free, no signup required." />
    <meta name="theme-color" content="#e8382a" />
    <title>Stance — Handle Difficult Professional Conversations</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Update README.md**

Replace every instance of `ReplyForge` with `Stance` in README.md. The file has these occurrences:
- Line 1: `# ReplyForge` → `# Stance`
- Line 5: `ReplyForge is a private...` → `Stance is a private...`
- Line 36: `git clone .../replyforge.git` → `git clone .../stance.git`
- Line 38: `cd replyforge` → `cd stance`
- Line 68: `ReplyForge uses the [Google Gemini API]...` → `Stance uses the [Google Gemini API]...`
- Line 73: `Open ReplyForge in your browser` → `Open Stance in your browser`
- Line 76: `Your API key...` — replace `ReplyForge` mention

Also update the project structure comment to remove `Sidebar` from the layout listing (line 113):
```
│   ├── layout/        # Header, ThemeToggle
```

- [ ] **Step 3: Verify zero ReplyForge references remain**

```bash
grep -r "ReplyForge" . --include="*.{html,md,tsx,ts,css,js}" --exclude-dir=node_modules
```

Expected: no output (zero matches)

- [ ] **Step 4: Commit**

```bash
git add index.html README.md
git commit -m "chore: rename ReplyForge → Stance in html and readme"
```

---

## Task 2: Design system foundation — tailwind.config.js and index.css

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Remove indigo-glow from tailwind.config.js**

In `tailwind.config.js`, find and remove the `'indigo-glow'` entry from `boxShadow`:

Old:
```js
boxShadow: {
  'indigo-glow': '0 8px 32px rgba(99, 102, 241, 0.25)',
  'rf-cta': ...
```

New (remove just the `indigo-glow` line):
```js
boxShadow: {
  'rf-cta':       '0 0 18px rgba(232,56,42,0.35), 0 2px 8px rgba(232,56,42,0.25)',
  'rf-cta-hover': '0 0 28px rgba(232,56,42,0.55), 0 4px 16px rgba(232,56,42,0.35)',
  'rf-input-focus':           '0 0 0 3px rgba(232,56,42,0.07), 0 0 14px rgba(232,56,42,0.06)',
  'rf-card-firm-hover':       '0 0 32px rgba(232,56,42,0.16)',
  'rf-card-diplomatic-hover': '0 0 32px rgba(122,159,255,0.13)',
  'rf-card-brief-hover':      '0 0 32px rgba(48,200,140,0.13)',
},
```

- [ ] **Step 2: Rewrite index.css**

Replace the entire file with the dark-only design system. The light-mode CSS variables are no longer needed — the app is always dark.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── CSS Custom Properties ─────────────────────────────────── */

:root {
  --color-bg:           #0d0d0d;
  --color-surface:      #111111;
  --color-surface-2:    #1a1a1a;
  --color-border:       #1e1e1e;
  --color-text-primary: #f2f2f2;
  --color-text-muted:   #888888;
  --color-primary:      #e8382a;
  --color-primary-hover:#c5251a;
}

/* ─── Base Reset ─────────────────────────────────────────────── */

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  line-height: 1.65;
}

/* ─── Scrollbar ──────────────────────────────────────────────── */

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #1e1e1e;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #2a2a2a;
}

/* ─── Select Styling ─────────────────────────────────────────── */

select option {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

/* ─── Animations ─────────────────────────────────────────────── */

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.animate-fade-in        { animation: fadeIn 0.25s ease forwards; }
.animate-slide-up       { animation: slideUp 0.3s ease forwards; }
.animate-slide-in-right { animation: slideInRight 0.3s ease forwards; }

/* ─── Focus Styles ───────────────────────────────────────────── */

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ─── Tailwind Component Layer ───────────────────────────────── */

@layer components {
  .card {
    @apply bg-surface border border-border rounded-[13px];
  }

  .input-base {
    @apply bg-surface-2 border border-border rounded-[8px] px-4 py-2.5 text-sm text-text-primary
           placeholder:text-[#2e2e2e] focus:outline-none
           focus:ring-2 focus:ring-[rgba(232,56,42,0.15)]
           focus:border-[#e8382a] transition-all;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js src/index.css
git commit -m "chore: update design system tokens — dark-only, red accent, remove indigo"
```

---

## Task 3: Remove sidebar — delete file, clean context and App

**Files:**
- Delete: `src/components/layout/Sidebar.tsx`
- Modify: `src/context/AppContext.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Delete Sidebar.tsx**

```bash
rm src/components/layout/Sidebar.tsx
```

- [ ] **Step 2: Remove isSidebarOpen from AppContext.tsx**

In `src/context/AppContext.tsx`:

Remove from the `AppContextValue` interface (lines 46-47):
```ts
  // Remove these two lines:
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
```

Remove the import of `Dispatch` and `SetStateAction` if they are only used for `isSidebarOpen`. The updated import line should be:
```ts
import React, { createContext, useContext, useState, useCallback } from 'react';
```

Remove the state declaration (line 81):
```ts
  // Remove this line:
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
```

Remove the `setIsSidebarOpen(false)` call inside `handleSelectPlaybook` (line 97):
```ts
  // Remove this line inside handleSelectPlaybook:
  setIsSidebarOpen(false);
```

Remove from the `value` object (near line 162):
```ts
  // Remove these two lines:
  isSidebarOpen,
  setIsSidebarOpen,
```

- [ ] **Step 3: Remove Sidebar import and usage from App.tsx**

In `src/App.tsx`, remove the Sidebar import line:
```ts
// Remove:
import { Sidebar } from './components/layout/Sidebar';
```

Remove the `<Sidebar />` JSX line from inside `AppShell`:
```tsx
// Remove:
{/* Sidebar */}
<Sidebar />
```

Remove the wrapping `div.flex.h-screen` and its children structure — do NOT rebuild the layout yet (that is Task 5). Just make the app compile without the Sidebar. The minimal working App.tsx after this step should still render the existing Header and workspace panels.

- [ ] **Step 4: Verify the app compiles**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds with zero errors (warnings about unused imports are okay)

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/context/AppContext.tsx src/App.tsx
git commit -m "feat: remove sidebar — delete component, strip isSidebarOpen from context"
```

---

## Task 4: Rebuild Header.tsx — new top bar design

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Replace Header.tsx entirely**

```tsx
import { Settings } from 'lucide-react';

export function Header() {
  return (
    <header
      className="h-[52px] bg-[#0d0d0d] border-b border-[#1a1a1a] flex items-center justify-between px-4 shrink-0 z-30"
    >
      {/* Left: red dot + wordmark */}
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full bg-[#e8382a] shrink-0"
          style={{ boxShadow: '0 0 8px rgba(232,56,42,0.7)' }}
        />
        <span className="font-bold text-[15px] text-[#f2f2f2] tracking-[-0.02em]">
          Stance
        </span>
      </div>

      {/* Right: Playbooks button + Settings icon */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#222222] rounded-[7px] text-[12px] font-medium text-[#666666] hover:text-[#cccccc] hover:border-[#333333] transition-colors"
        >
          Playbooks
          <span className="bg-[rgba(232,56,42,0.15)] text-[#e8382a] text-[10px] font-bold px-1.5 py-px rounded-[10px] leading-none">
            3
          </span>
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center bg-[#141414] border border-[#1e1e1e] rounded-[7px] text-[#555555] hover:text-[#aaaaaa] hover:border-[#333333] transition-colors shrink-0"
          aria-label="Settings"
        >
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify Header renders without errors**

```bash
npm run build 2>&1 | tail -10
```

Expected: zero errors

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: rebuild top bar — red dot wordmark, Playbooks button, Settings icon"
```

---

## Task 5: Rebuild App.tsx — two-panel layout with placeholders

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace App.tsx entirely**

```tsx
import { MessageSquare } from 'lucide-react';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/ui/Toast';
import { AppProvider, useApp } from './context/AppContext';

function GenerateButton() {
  return (
    <button
      className="w-full py-3 rounded-[9px] text-[14px] font-semibold text-white border-none tracking-[-0.01em] transition-all duration-200"
      style={{
        background: 'linear-gradient(135deg, #e8382a 0%, #c5251a 100%)',
        boxShadow: '0 0 18px rgba(232,56,42,0.30), 0 2px 8px rgba(232,56,42,0.20)',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.boxShadow = '0 0 28px rgba(232,56,42,0.50), 0 4px 16px rgba(232,56,42,0.30)';
        btn.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.boxShadow = '0 0 18px rgba(232,56,42,0.30), 0 2px 8px rgba(232,56,42,0.20)';
        btn.style.transform = 'translateY(0)';
      }}
    >
      ✦ Generate Replies
    </button>
  );
}

function LeftPanel() {
  return (
    <div className="relative flex flex-col w-full md:w-[420px] md:shrink-0 bg-[#0d0d0d] md:border-r md:border-[#1a1a1a] md:overflow-y-auto">
      <div className="flex-1 p-6 pb-20 md:pb-24">
        <p className="text-[13px] text-[#2a2a2a]">Input panel — coming in Prompt 2</p>
      </div>

      {/* Desktop: sticky generate button at bottom of panel */}
      <div className="hidden md:block sticky bottom-0 bg-[#0d0d0d] border-t border-[#1a1a1a] p-4">
        <GenerateButton />
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center min-h-[50vh] md:min-h-0 md:overflow-y-auto">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-11 h-11 bg-[#141414] border border-[#1e1e1e] rounded-[10px] flex items-center justify-center">
          <MessageSquare size={18} color="#2a2a2a" />
        </div>
        <div>
          <p
            className="text-[15px] font-semibold mb-2"
            style={{ color: '#333333' }}
          >
            Your replies will appear here
          </p>
          <p
            className="text-[12px] leading-[1.65] max-w-[200px]"
            style={{ color: '#2a2a2a' }}
          >
            Fill in the details on the left and hit Generate Replies
          </p>
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="flex flex-col md:h-screen md:overflow-hidden bg-[#0d0d0d]">
      <Header />

      <div className="flex flex-col md:flex-row md:flex-1 md:overflow-hidden">
        <LeftPanel />
        <RightPanel />
      </div>

      {/* Mobile: fixed generate button pinned to bottom of viewport */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0d0d0d] border-t border-[#1a1a1a] px-4 py-3 z-10">
        <GenerateButton />
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: zero errors

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: rebuild App shell — two-panel layout, placeholder panels, sticky generate button"
```

---

## Task 6: Fix indigo/violet/purple in UI components

These are shared UI components — not workspace or results. They're safe to modify freely.

**Files:**
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Toast.tsx`
- Modify: `src/components/ui/EmptyState.tsx`

- [ ] **Step 1: Fix Button.tsx**

Replace the `base` string and `variants.primary` in `src/components/ui/Button.tsx`:

Old `base`:
```ts
const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none';
```

New `base`:
```ts
const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-[8px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8382a] select-none';
```

Old `variants.primary`:
```ts
primary:
  'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 focus:ring-indigo-500',
```

New `variants.primary`:
```ts
primary:
  'bg-[#e8382a] hover:bg-[#c5251a] active:bg-[#a81d13] text-white focus:ring-[#e8382a]',
```

- [ ] **Step 2: Fix Toast.tsx**

Read the file to find the info toast style, then replace:

Old:
```tsx
info: <Info size={16} className="text-indigo-400 shrink-0" />,
```
New:
```tsx
info: <Info size={16} className="text-[#7a9fff] shrink-0" />,
```

Old:
```tsx
info: 'border-indigo-500/30 bg-indigo-500/10',
```
New:
```tsx
info: 'border-[rgba(122,159,255,0.3)] bg-[rgba(122,159,255,0.08)]',
```

- [ ] **Step 3: Fix EmptyState.tsx**

Replace the icon container class (indigo bg/border):
Old:
```tsx
<div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
  <MessageSquarePlus size={28} className="text-indigo-400" />
```
New:
```tsx
<div className="w-16 h-16 rounded-[13px] bg-[#141414] border border-[#1e1e1e] flex items-center justify-center mb-5">
  <MessageSquarePlus size={28} className="text-[#2a2a2a]" />
```

Replace any `text-indigo-400` text/links inside EmptyState.tsx with `text-[#e8382a]`.

- [ ] **Step 4: Verify zero indigo/violet/purple remain in src/components/ui/**

```bash
grep -r "indigo\|violet\|purple" src/components/ui/ --include="*.tsx"
```

Expected: no output

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Toast.tsx src/components/ui/EmptyState.tsx
git commit -m "chore: replace indigo/violet/purple in shared UI components"
```

---

## Task 7: Fix indigo in workspace components (color-only changes)

**IMPORTANT:** Only change color class names. Do not change component structure, logic, or layout.

**Files:**
- Modify: `src/components/workspace/IncomingMessage.tsx`
- Modify: `src/components/workspace/SituationSelector.tsx`
- Modify: `src/components/workspace/OutcomeSelector.tsx`
- Modify: `src/components/workspace/RoleInput.tsx`
- Modify: `src/components/workspace/WritingExamples.tsx`

- [ ] **Step 1: Fix IncomingMessage.tsx**

Find and replace in `src/components/workspace/IncomingMessage.tsx`:

```
focus:ring-indigo-500/40   →  focus:ring-[rgba(232,56,42,0.15)]
focus:border-indigo-500/50 →  focus:border-[#e8382a]
```

- [ ] **Step 2: Fix SituationSelector.tsx**

Find and replace in `src/components/workspace/SituationSelector.tsx`:

```
focus:ring-indigo-500/40   →  focus:ring-[rgba(232,56,42,0.15)]
focus:border-indigo-500/50 →  focus:border-[#e8382a]
```

- [ ] **Step 3: Fix OutcomeSelector.tsx**

Find and replace in `src/components/workspace/OutcomeSelector.tsx`:

```
bg-indigo-500/10 border-indigo-500/40 text-indigo-300 shadow-sm shadow-indigo-500/10
→
bg-[rgba(232,56,42,0.08)] border-[rgba(232,56,42,0.25)] text-[#e8382a] shadow-sm shadow-[rgba(232,56,42,0.08)]

hover:border-indigo-500/30
→
hover:border-[rgba(232,56,42,0.2)]
```

- [ ] **Step 4: Fix RoleInput.tsx**

Find and replace in `src/components/workspace/RoleInput.tsx`:

```
focus:ring-indigo-500/40   →  focus:ring-[rgba(232,56,42,0.15)]
focus:border-indigo-500/50 →  focus:border-[#e8382a]
```

- [ ] **Step 5: Fix WritingExamples.tsx**

Find and replace in `src/components/workspace/WritingExamples.tsx`:

```
bg-indigo-500/15            →  bg-[rgba(232,56,42,0.1)]
text-indigo-400             →  text-[#e8382a]
focus:ring-indigo-500/40    →  focus:ring-[rgba(232,56,42,0.15)]
focus:border-indigo-500/50  →  focus:border-[#e8382a]
bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20
→
bg-[rgba(232,56,42,0.08)] border border-[rgba(232,56,42,0.15)] hover:bg-[rgba(232,56,42,0.12)]
```

- [ ] **Step 6: Verify zero indigo/violet/purple in workspace/**

```bash
grep -r "indigo\|violet\|purple" src/components/workspace/ --include="*.tsx"
```

Expected: no output

- [ ] **Step 7: Commit**

```bash
git add src/components/workspace/
git commit -m "chore: replace indigo focus/active colors in workspace components"
```

---

## Task 8: Fix indigo/violet/purple in results and playbooks components

**IMPORTANT:** Only change color class names in results files. Do not change component structure or logic.

**Files:**
- Modify: `src/components/results/ReplyCard.tsx`
- Modify: `src/components/results/ReplyGrid.tsx`
- Modify: `src/components/results/RiskMeter.tsx`
- Modify: `src/components/playbooks/SavePlaybookModal.tsx`

- [ ] **Step 1: Fix ReplyCard.tsx**

In `src/components/results/ReplyCard.tsx`, replace the `cardAccents` and `badgeColors` arrays and two inline className strings:

Old `cardAccents`:
```tsx
const cardAccents = [
  'border-indigo-500/20 hover:border-indigo-500/40',
  'border-violet-500/20 hover:border-violet-500/40',
  'border-purple-500/20 hover:border-purple-500/40',
];
```
New `cardAccents` (firm red / diplomatic blue / brief green):
```tsx
const cardAccents = [
  'border-[rgba(232,56,42,0.2)] hover:border-[rgba(232,56,42,0.4)]',
  'border-[rgba(122,159,255,0.18)] hover:border-[rgba(122,159,255,0.35)]',
  'border-[rgba(48,200,140,0.18)] hover:border-[rgba(48,200,140,0.35)]',
];
```

Old `badgeColors`:
```tsx
const badgeColors = [
  'bg-indigo-500/10 text-indigo-400',
  'bg-violet-500/10 text-violet-400',
  'bg-purple-500/10 text-purple-400',
];
```
New `badgeColors`:
```tsx
const badgeColors = [
  'bg-[rgba(232,56,42,0.1)] text-[#e8382a]',
  'bg-[rgba(122,159,255,0.1)] text-[#7a9fff]',
  'bg-[rgba(48,200,140,0.1)] text-[#30c88c]',
];
```

Old copy button hover:
```tsx
: 'text-text-muted bg-surface-2 border-border hover:text-text-primary hover:border-indigo-500/30'
```
New:
```tsx
: 'text-text-muted bg-surface-2 border-border hover:text-text-primary hover:border-[#2a2a2a]'
```

Old quick action active state:
```tsx
refiningAction === action.value
  ? 'text-indigo-300 bg-indigo-500/15 border-indigo-500/30'
  : 'text-text-muted bg-surface-2 border-border hover:border-indigo-500/30 hover:text-text-primary hover:bg-indigo-500/5 disabled:opacity-40 disabled:cursor-not-allowed'
```
New:
```tsx
refiningAction === action.value
  ? 'text-[#e8382a] bg-[rgba(232,56,42,0.1)] border-[rgba(232,56,42,0.2)]'
  : 'text-text-muted bg-surface-2 border-border hover:border-[rgba(232,56,42,0.2)] hover:text-text-primary hover:bg-[rgba(232,56,42,0.05)] disabled:opacity-40 disabled:cursor-not-allowed'
```

- [ ] **Step 2: Fix ReplyGrid.tsx**

Find the `text-indigo-400` className in `src/components/results/ReplyGrid.tsx` (on an Eye icon) and replace:

```
text-indigo-400  →  text-[#888888]
```

- [ ] **Step 3: Fix RiskMeter.tsx**

In `src/components/results/RiskMeter.tsx`, replace:

```
text-indigo-400  →  text-[#888888]
bg-indigo-400    →  bg-[#888888]
```

(There are two occurrences: one on the MessageCircle icon and one on the dot span.)

- [ ] **Step 4: Fix SavePlaybookModal.tsx**

In `src/components/playbooks/SavePlaybookModal.tsx`, replace all three occurrences:

```
focus:ring-indigo-500/50   →  focus:ring-[rgba(232,56,42,0.15)]
focus:border-indigo-500/50 →  focus:border-[#e8382a]
```

- [ ] **Step 5: Verify zero indigo/violet/purple remain in results/ and playbooks/**

```bash
grep -r "indigo\|violet\|purple" src/components/results/ src/components/playbooks/ --include="*.tsx"
```

Expected: no output

- [ ] **Step 6: Final check — zero indigo/violet/purple anywhere in src/**

```bash
grep -r "indigo\|violet\|purple" src/ --include="*.{tsx,ts,css}" --exclude-dir=node_modules
```

Expected: no output

- [ ] **Step 7: Commit**

```bash
git add src/components/results/ src/components/playbooks/
git commit -m "chore: replace indigo/violet/purple in results and playbooks components"
```

---

## Verification Checklist (run after all tasks complete)

Before reporting done, confirm each point:

1. `grep -r "ReplyForge" . --include="*.{html,md,tsx,ts}" --exclude-dir=node_modules` → zero results
2. `grep -r "indigo\|violet\|purple" src/ --include="*.{tsx,ts,css}"` → zero results
3. `ls src/components/layout/Sidebar.tsx` → "No such file"
4. `grep -r "isSidebarOpen" src/` → zero results
5. Start dev server (`npm run dev`), open localhost — confirm top bar: red dot, "Stance" wordmark, "Playbooks" button with badge "3", settings gear icon
6. On desktop viewport — confirm two-panel layout with left panel (420px) and right panel (flex-1) separated by a vertical line
7. Resize to 375px — confirm single column: left panel above, right panel below
8. Desktop: confirm Generate Replies button is sticky at bottom of left panel
9. Mobile (375px): confirm Generate Replies button is fixed to bottom of viewport; right panel shows centered empty state
