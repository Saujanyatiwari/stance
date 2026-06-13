import { Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="h-[52px] bg-[#0d0d0d] border-b border-[#1a1a1a] flex items-center justify-between px-4 shrink-0 z-30">
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
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#222222] rounded-[7px] text-[12px] font-medium text-[#666666] hover:text-[#cccccc] hover:border-[#333333] transition-colors">
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
