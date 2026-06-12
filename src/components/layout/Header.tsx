import { Menu, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { setIsSidebarOpen } = useApp();

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shrink-0 z-30 relative">
      {/* Left: Mobile menu + Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-2 transition-colors md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap size={15} className="text-white" fill="white" />
          </div>
          <div className="leading-none">
            <span className="text-base font-bold text-text-primary tracking-tight">Stance</span>
            <p className="text-[10px] text-text-muted hidden sm:block mt-0.5">Handle difficult conversations with confidence</p>
          </div>
        </div>
      </div>

      {/* Right: Theme toggle */}
      <div className="flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}
