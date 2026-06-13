// ─── Enums & Union Types ────────────────────────────────────────────────────

export type Situation =
  // Default 5 shown in UI
  | 'payment-invoice'
  | 'negotiation-raise'
  | 'complaint-response'
  | 'declining-scope-creep'
  | 'polite-rejection'
  // More situations
  | 'follow-up-no-reply'
  | 'pushing-back-pricing'
  | 'deadline-extension'
  | 'unfair-feedback'
  | 'resignation'
  | 'workplace-conflict'
  | 'reconnecting'
  | 'cold-outreach'
  | 'vendor-dispute'
  // Legacy (kept for stored playbooks)
  | 'feedback-revision'
  | 'custom';

export type DesiredOutcome =
  // Default 5 shown in UI
  | 'get-a-response'
  | 'resolve-professionally'
  | 'set-boundaries'
  | 'maintain-relationship'
  | 'close-conversation'
  // More outcomes
  | 'get-paid-faster'
  | 'buy-time'
  | 'escalate-urgency'
  | 'apologise-recover'
  | 'negotiate-better-terms'
  | 'decline-no-damage'
  | 'request-feedback'
  // Legacy
  | 'appear-confident';

export type QuickAction =
  | 'firmer'
  | 'more-polite'
  | 'shorter'
  | 'more-human'
  | 'more-confident';

export type Theme = 'light' | 'dark';

// ─── Core Interfaces ─────────────────────────────────────────────────────────

export interface Reply {
  id: string;
  title: string;
  content: string;
}

export interface Playbook {
  id: string;
  name: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  role?: string;
  writingExamples: string[];
  isBuiltIn: boolean;
  createdAt: number;
}

export interface Settings {
  theme: Theme;
}

export interface GenerationResponse {
  replies: Array<{
    title: string;
    content: string;
  }>;
  risk_analysis: string[];
}

// ─── Form State ───────────────────────────────────────────────────────────────

export interface WorkspaceState {
  incomingMessage: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  role: string;
  writingExamples: string[];
}

// ─── UI State ────────────────────────────────────────────────────────────────

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ─── Display Data ────────────────────────────────────────────────────────────

export interface SituationOption {
  value: Situation;
  label: string;
  description: string;
}

export interface OutcomeOption {
  value: DesiredOutcome;
  label: string;
  icon: string;
}

export interface QuickActionOption {
  value: QuickAction;
  label: string;
  icon: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const SITUATION_OPTIONS_DEFAULT: SituationOption[] = [
  { value: 'payment-invoice',       label: 'Unpaid invoice or late payment',            description: 'Chase an overdue or outstanding payment' },
  { value: 'negotiation-raise',     label: 'Salary or rate negotiation',                description: 'Negotiate salary, rates, or project terms' },
  { value: 'complaint-response',    label: 'Client complaint or dissatisfaction',        description: 'Respond to a complaint or unhappy client' },
  { value: 'declining-scope-creep', label: 'Declining Additional Unagreed Requests',    description: 'Push back on scope creep or extra work' },
  { value: 'polite-rejection',      label: 'Declining a request or proposal',           description: 'Say no professionally without damaging trust' },
];

export const SITUATION_OPTIONS_MORE: SituationOption[] = [
  { value: 'follow-up-no-reply',   label: 'No response to my follow-up',      description: 'Chase a non-responsive contact' },
  { value: 'pushing-back-pricing', label: 'Pushing back on pricing',           description: 'Defend your rates when challenged on price' },
  { value: 'deadline-extension',   label: 'Requesting a deadline extension',   description: 'Ask for more time professionally' },
  { value: 'unfair-feedback',      label: 'Unfair feedback or review',         description: 'Respond to criticism you disagree with' },
  { value: 'resignation',          label: 'Resignation or leaving a role',     description: 'Resign or end a working relationship professionally' },
  { value: 'workplace-conflict',   label: 'Workplace conflict or HR issue',    description: 'Navigate a difficult colleague or HR situation' },
  { value: 'reconnecting',         label: 'Reconnecting after a long gap',     description: 'Re-engage a dormant contact or relationship' },
  { value: 'cold-outreach',        label: 'Cold outreach follow-up',           description: 'Follow up on an unanswered cold message' },
  { value: 'vendor-dispute',       label: 'Vendor or supplier dispute',        description: 'Resolve a dispute with a vendor or supplier' },
];

export const SITUATION_OPTIONS: SituationOption[] = [
  ...SITUATION_OPTIONS_DEFAULT,
  ...SITUATION_OPTIONS_MORE,
  // Legacy options kept for stored playbooks backward compat
  { value: 'feedback-revision', label: 'Feedback or revision request', description: 'Request or respond to revisions' },
  { value: 'custom',            label: 'Custom',                       description: 'Any other professional situation' },
];

export const OUTCOME_OPTIONS_DEFAULT: OutcomeOption[] = [
  { value: 'get-a-response',        label: 'Get a response',             icon: '💬' },
  { value: 'resolve-professionally', label: 'Resolve it professionally', icon: '🤝' },
  { value: 'set-boundaries',        label: 'Hold my position firmly',    icon: '🛡️' },
  { value: 'maintain-relationship', label: 'Preserve the relationship',  icon: '🌱' },
  { value: 'close-conversation',    label: 'Close the conversation',     icon: '✅' },
];

export const OUTCOME_OPTIONS_MORE: OutcomeOption[] = [
  { value: 'get-paid-faster',      label: 'Get paid immediately',              icon: '💰' },
  { value: 'buy-time',             label: 'Buy more time',                     icon: '⏳' },
  { value: 'escalate-urgency',     label: 'Escalate the urgency',              icon: '🔥' },
  { value: 'apologise-recover',    label: 'Apologise and recover',             icon: '🙏' },
  { value: 'negotiate-better-terms', label: 'Negotiate better terms',          icon: '📋' },
  { value: 'decline-no-damage',    label: 'Decline without damaging trust',    icon: '🎯' },
  { value: 'request-feedback',     label: 'Request honest feedback',           icon: '💡' },
];

export const OUTCOME_OPTIONS: OutcomeOption[] = [
  ...OUTCOME_OPTIONS_DEFAULT,
  ...OUTCOME_OPTIONS_MORE,
  // Legacy
  { value: 'appear-confident', label: 'Appear confident', icon: '💪' },
];

export const QUICK_ACTION_OPTIONS: QuickActionOption[] = [
  { value: 'firmer',          label: 'Make Firmer',     icon: '🔒' },
  { value: 'more-polite',     label: 'More Polite',     icon: '🌸' },
  { value: 'shorter',         label: 'Make Shorter',    icon: '✂️' },
  { value: 'more-human',      label: 'More Human',      icon: '👤' },
  { value: 'more-confident',  label: 'More Confident',  icon: '⚡' },
];

export const BUILT_IN_PLAYBOOKS: Playbook[] = [
  {
    id: 'builtin-invoice',
    name: 'Chasing an Unpaid Invoice',
    situation: 'payment-invoice',
    desiredOutcome: 'get-paid-faster',
    role: 'Freelancer',
    writingExamples: [],
    isBuiltIn: true,
    createdAt: 0,
  },
  {
    id: 'builtin-scope-creep',
    name: 'Declining Additional Unagreed Requests',
    situation: 'declining-scope-creep',
    desiredOutcome: 'set-boundaries',
    role: '',
    writingExamples: [],
    isBuiltIn: true,
    createdAt: 0,
  },
  {
    id: 'builtin-complaint',
    name: 'Handling a Client Complaint',
    situation: 'complaint-response',
    desiredOutcome: 'resolve-professionally',
    role: 'Business Owner',
    writingExamples: [],
    isBuiltIn: true,
    createdAt: 0,
  },
];
