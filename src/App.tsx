import { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/ui/Toast';
import { AppProvider, useApp } from './context/AppContext';
import { IncomingMessage } from './components/workspace/IncomingMessage';
import { EmailThreadContext } from './components/workspace/EmailThreadContext';
import { SituationSelector } from './components/workspace/SituationSelector';
import { OutcomeSelector } from './components/workspace/OutcomeSelector';
import { RoleInput } from './components/workspace/RoleInput';
import { WritingExamples } from './components/workspace/WritingExamples';
import { GenerateButton } from './components/workspace/GenerateButton';

const MIN_WIDTH = 320;
const MAX_WIDTH = 560;
const DEFAULT_WIDTH = 480;
const STORAGE_KEY = 'stance_panel_width';

function LeftPanel({ width }: { width: number }) {
  return (
    <div
      className="relative flex flex-col w-full md:shrink-0 bg-[#0d0d0d] md:overflow-y-auto"
      style={{ width: `min(100%, ${width}px)` }}
    >
      <div className="flex-1 p-6 space-y-6">
        <IncomingMessage />
        <EmailThreadContext />
        <div className="h-px bg-[#1a1a1a]" />
        <SituationSelector />
        <OutcomeSelector />
        <RoleInput />
        <WritingExamples />
      </div>

      {/* Mobile: button in normal page flow */}
      <div className="md:hidden px-4 pb-6">
        <GenerateButton />
      </div>

      {/* Desktop: sticky generate button at bottom of left panel */}
      <div className="hidden md:block sticky bottom-0 bg-[#0d0d0d] border-t border-[#1a1a1a] p-4">
        <GenerateButton />
      </div>
    </div>
  );
}

function DragHandle({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  return (
    <div
      className="hidden md:flex w-[5px] shrink-0 cursor-col-resize items-stretch justify-center group"
      onMouseDown={onMouseDown}
    >
      <div className="w-px bg-[#1a1a1a] group-hover:bg-[#e8382a] group-hover:opacity-50 transition-colors duration-150" />
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
          <p className="text-[15px] font-semibold mb-2" style={{ color: '#333333' }}>
            Your replies will appear here
          </p>
          <p className="text-[12px] leading-[1.65] max-w-[200px]" style={{ color: '#2a2a2a' }}>
            Fill in the details on the left and hit Generate Replies
          </p>
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  const { toasts, removeToast } = useApp();

  const [panelWidth, setPanelWidth] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? parseInt(stored, 10) : NaN;
    return isNaN(parsed) ? DEFAULT_WIDTH : Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parsed));
  });

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStartX.current;
      setPanelWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragStartWidth.current + delta)));
    };
    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(panelWidth));
  }, [panelWidth]);

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current = panelWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div className="flex flex-col md:h-screen md:overflow-hidden bg-[#0d0d0d]">
      <Header />

      <div className="flex flex-col md:flex-row md:flex-1 md:overflow-hidden">
        <LeftPanel width={panelWidth} />
        <DragHandle onMouseDown={handleDragStart} />
        <RightPanel />
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
