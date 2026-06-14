import { useState, useRef } from 'react';
import { Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlaybooksDropdown } from '../playbooks/PlaybooksDropdown';

export function Header() {
  const { allPlaybooks } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen((v) => !v);
  };

  return (
    <header className="h-[52px] bg-[#0d0d0d] border-b border-[#1a1a1a] flex items-center justify-between px-4 shrink-0 z-30">
      {/* Left: red dot + wordmark */}
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full bg-[#b10000] shrink-0"
          style={{ boxShadow: '0 0 8px rgba(177,0,0,0.7)' }}
        />
        <span className="font-bold text-[15px] text-[#f2f2f2] tracking-[-0.02em]">
          Stance
        </span>
      </div>

      {/* Right: Playbooks button + Settings icon */}
      <div className="flex items-center gap-2">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border rounded-[7px] text-[12px] font-medium transition-colors ${
            isOpen
              ? 'border-[#333333] text-[#cccccc]'
              : 'border-[#222222] text-[#666666] hover:text-[#cccccc] hover:border-[#333333]'
          }`}
        >
          Playbooks
          <span className="bg-[rgba(177,0,0,0.15)] text-[#b10000] text-[10px] font-bold px-1.5 py-px rounded-[10px] leading-none">
            {allPlaybooks.length}
          </span>
        </button>

        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-[#141414] border border-[#1e1e1e] rounded-[7px] text-[#555555] hover:text-[#aaaaaa] hover:border-[#333333] transition-colors shrink-0"
          aria-label="Settings"
        >
          <Settings size={15} />
        </button>
      </div>

      {isOpen && (
        <PlaybooksDropdown
          triggerRef={triggerRef}
          top={dropdownPos.top}
          right={dropdownPos.right}
          onClose={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
