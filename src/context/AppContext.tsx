import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Situation, DesiredOutcome, Reply, Playbook } from '../types';
import { useTheme } from '../hooks/useTheme';
import { usePlaybooks } from '../hooks/usePlaybooks';
import { useGeneration } from '../hooks/useGeneration';
import { useToast } from '../hooks/useToast';

// ─── Context Shape ────────────────────────────────────────────────────────────

interface AppContextValue {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Playbooks
  allPlaybooks: Playbook[];
  customCount: number;
  canAddPlaybook: boolean;
  addPlaybook: (data: Omit<Playbook, 'id' | 'createdAt' | 'isBuiltIn'>) => Playbook;
  updatePlaybook: (id: string, data: Omit<Playbook, 'id' | 'createdAt' | 'isBuiltIn'>) => void;
  deletePlaybook: (id: string) => void;
  loadPlaybook: (id: string) => void;
  playbookLoadKey: number;

  // Workspace form state
  incomingMessage: string;
  setIncomingMessage: (v: string) => void;
  emailThread: string;
  setEmailThread: (v: string) => void;
  situation: Situation | '';
  setSituation: (v: Situation | '') => void;
  desiredOutcome: DesiredOutcome;
  setDesiredOutcome: (v: DesiredOutcome) => void;
  role: string;
  setRole: (v: string) => void;
  writingExamples: string[];
  setWritingExamples: (examples: string[]) => void;
  addWritingExample: (example: string) => void;
  removeWritingExample: (index: number) => void;

  // Generation
  replies: Reply[];
  riskAnalysis: string[];
  isLoading: boolean;
  generationError: string | null;
  generate: () => Promise<void>;
  refineReply: (replyId: string, action: import('../types').QuickAction) => Promise<void>;

  // Toasts
  toasts: ReturnType<typeof useToast>['toasts'];
  addToast: ReturnType<typeof useToast>['addToast'];
  removeToast: ReturnType<typeof useToast>['removeToast'];
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const {
    allPlaybooks,
    customCount,
    canAdd,
    addPlaybook,
    updatePlaybook,
    deletePlaybook,
  } = usePlaybooks();
  const { replies, riskAnalysis, isLoading, error: generationError, generate: generateReplies, refineReply: refineReplyBase } = useGeneration();
  const { toasts, addToast, removeToast } = useToast();

  // ─── Workspace State ────────────────────────────────────────────────────────
  const [incomingMessage, setIncomingMessage] = useState('');
  const [emailThread, setEmailThread] = useState('');
  const [situation, setSituation] = useState<Situation | ''>('');
  const [desiredOutcome, setDesiredOutcome] = useState<DesiredOutcome>('get-a-response');
  const [role, setRole] = useState('');
  const [writingExamples, setWritingExamplesState] = useState<string[]>([]);
  const [playbookLoadKey, setPlaybookLoadKey] = useState(0);

  // ─── Load playbook into workspace ───────────────────────────────────────────
  const loadPlaybook = useCallback((id: string) => {
    const pb = allPlaybooks.find((p) => p.id === id);
    if (!pb) return;
    setSituation(pb.situation);
    setDesiredOutcome(pb.desiredOutcome);
    setRole(pb.role ?? '');
    setWritingExamplesState(pb.writingExamples ? [...pb.writingExamples] : []);
    setPlaybookLoadKey((k) => k + 1);
    addToast('success', `Playbook loaded — ${pb.name}`);
  }, [allPlaybooks, addToast]);

  // ─── Writing examples ───────────────────────────────────────────────────────
  const setWritingExamples = useCallback((examples: string[]) => {
    setWritingExamplesState(examples);
  }, []);

  const addWritingExample = useCallback((example: string) => {
    const trimmed = example.trim();
    if (!trimmed) return;
    setWritingExamplesState((prev) => [...prev, trimmed]);
  }, []);

  const removeWritingExample = useCallback((index: number) => {
    setWritingExamplesState((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ─── Generation ─────────────────────────────────────────────────────────────
  const generate = useCallback(async () => {
    if (!incomingMessage.trim()) {
      addToast('error', 'Please paste the incoming message you want to reply to.');
      return;
    }
    if (!situation) {
      addToast('error', 'Please select a situation before generating.');
      return;
    }
    await generateReplies({
      incomingMessage,
      situation: situation as Situation,
      desiredOutcome,
      role,
      writingExamples,
      threadContext: emailThread,
    });
  }, [incomingMessage, emailThread, situation, desiredOutcome, role, writingExamples, generateReplies, addToast]);

  const refineReply = useCallback(
    async (replyId: string, action: import('../types').QuickAction) => {
      await refineReplyBase(replyId, action, situation as Situation, desiredOutcome);
    },
    [refineReplyBase, situation, desiredOutcome]
  );

  const value: AppContextValue = {
    theme,
    toggleTheme,
    allPlaybooks,
    customCount,
    canAddPlaybook: canAdd,
    addPlaybook,
    updatePlaybook,
    deletePlaybook,
    loadPlaybook,
    playbookLoadKey,
    incomingMessage,
    setIncomingMessage,
    emailThread,
    setEmailThread,
    situation,
    setSituation,
    desiredOutcome,
    setDesiredOutcome,
    role,
    setRole,
    writingExamples,
    setWritingExamples,
    addWritingExample,
    removeWritingExample,
    replies,
    riskAnalysis,
    isLoading,
    generationError,
    generate,
    refineReply,
    toasts,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
