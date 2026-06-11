import React, { createContext, useContext, useState, useCallback, type Dispatch, type SetStateAction } from 'react';
import type { Situation, DesiredOutcome, Reply } from '../types';
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
  playbooks: ReturnType<typeof usePlaybooks>['playbooks'];
  activePlaybook: ReturnType<typeof usePlaybooks>['activePlaybook'];
  activePlaybookId: string | null;
  addPlaybook: ReturnType<typeof usePlaybooks>['addPlaybook'];
  deletePlaybook: ReturnType<typeof usePlaybooks>['deletePlaybook'];
  selectPlaybook: ReturnType<typeof usePlaybooks>['selectPlaybook'];
  clearPlaybookSelection: ReturnType<typeof usePlaybooks>['clearSelection'];

  // Workspace form state
  incomingMessage: string;
  setIncomingMessage: (v: string) => void;
  situation: Situation;
  setSituation: (v: Situation) => void;
  desiredOutcome: DesiredOutcome;
  setDesiredOutcome: (v: DesiredOutcome) => void;
  role: string;
  setRole: (v: string) => void;
  writingExamples: string[];
  addWritingExample: (example: string) => void;
  removeWritingExample: (index: number) => void;

  // Generation
  replies: Reply[];
  riskAnalysis: string[];
  isLoading: boolean;
  generationError: string | null;
  generate: () => Promise<void>;
  refineReply: (replyId: string, action: import('../types').QuickAction) => Promise<void>;

  // UI state
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;

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
    playbooks,
    activePlaybook,
    activePlaybookId,
    addPlaybook,
    deletePlaybook,
    selectPlaybook,
    clearSelection,
  } = usePlaybooks();
  const { replies, riskAnalysis, isLoading, error: generationError, generate: generateReplies, refineReply: refineReplyBase } = useGeneration();
  const { toasts, addToast, removeToast } = useToast();

  // ─── Workspace State ────────────────────────────────────────────────────────
  const [incomingMessage, setIncomingMessage] = useState('');
  const [situation, setSituation] = useState<Situation>('payment-invoice');
  const [desiredOutcome, setDesiredOutcome] = useState<DesiredOutcome>('get-a-response');
  const [role, setRole] = useState('');
  const [writingExamples, setWritingExamples] = useState<string[]>([]);

  // ─── UI State ───────────────────────────────────────────────────────────────
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ─── Sync playbook selection into workspace ─────────────────────────────────
  const handleSelectPlaybook = useCallback(
    (id: string) => {
      selectPlaybook(id);

      const pb = playbooks.find((p) => p.id === id);
      if (pb) {
        setTimeout(() => {
          setSituation(pb.situation || 'payment-invoice');
          setDesiredOutcome(pb.desiredOutcome || 'get-a-response');
          setWritingExamples(pb.writingExamples ? [...pb.writingExamples] : []);
        }, 0);
      }
      setIsSidebarOpen(false);
    },
    [selectPlaybook, playbooks]
  );

  // ─── Writing examples ───────────────────────────────────────────────────────
  const addWritingExample = useCallback((example: string) => {
    const trimmed = example.trim();
    if (!trimmed) return;
    setWritingExamples((prev) => [...prev, trimmed]);
  }, []);

  const removeWritingExample = useCallback((index: number) => {
    setWritingExamples((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ─── Generation ─────────────────────────────────────────────────────────────
  const generate = useCallback(async () => {
    if (!incomingMessage.trim()) {
      addToast('error', 'Please paste the incoming message you want to reply to.');
      return;
    }
    await generateReplies({
      incomingMessage,
      situation,
      desiredOutcome,
      role,
      writingExamples,
    });
  }, [incomingMessage, situation, desiredOutcome, role, writingExamples, generateReplies, addToast]);

  const refineReply = useCallback(
    async (replyId: string, action: import('../types').QuickAction) => {
      await refineReplyBase(replyId, action, situation, desiredOutcome);
    },
    [refineReplyBase, situation, desiredOutcome]
  );

  const value: AppContextValue = {
    theme,
    toggleTheme,
    playbooks,
    activePlaybook,
    activePlaybookId,
    addPlaybook,
    deletePlaybook,
    selectPlaybook: handleSelectPlaybook,
    clearPlaybookSelection: clearSelection,
    incomingMessage,
    setIncomingMessage,
    situation,
    setSituation,
    desiredOutcome,
    setDesiredOutcome,
    role,
    setRole,
    writingExamples,
    addWritingExample,
    removeWritingExample,
    replies,
    riskAnalysis,
    isLoading,
    generationError,
    generate,
    refineReply,
    isSidebarOpen,
    setIsSidebarOpen,
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
