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
      <div className="flex-1 p-6">
        <p className="text-[13px] text-[#2a2a2a]">Input panel — coming in Prompt 2</p>
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

  return (
    <div className="flex flex-col md:h-screen md:overflow-hidden bg-[#0d0d0d]">
      <Header />

      <div className="flex flex-col md:flex-row md:flex-1 md:overflow-hidden">
        <LeftPanel />
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
