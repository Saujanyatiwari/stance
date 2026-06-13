import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export function EmailThreadContext() {
  const { emailThread, setEmailThread } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-[13px] font-medium transition-colors text-left ${
          isOpen
            ? 'bg-[#111111] border border-[#1e1e1e] text-[#777777] hover:text-[#999999]'
            : 'bg-transparent border border-dashed border-[#222222] text-[#555555] hover:border-[#2e2e2e] hover:text-[#777777]'
        }`}
      >
        <span
          className="text-base leading-none shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}
        >
          +
        </span>
        {isOpen ? 'Email thread context' : 'Add email thread context'}
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? '360px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pt-1 space-y-2">
          <p className="text-[11px] text-[#444444] leading-relaxed">
            Paste the prior email chain so we have the full picture.
          </p>
          <textarea
            value={emailThread}
            onChange={(e) => setEmailThread(e.target.value)}
            placeholder="Paste the email thread here…"
            rows={5}
            className="w-full bg-surface-2 border border-border rounded-[8px] px-4 py-3 text-[16px] text-text-primary placeholder:text-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-[rgba(232,56,42,0.15)] focus:border-[#e8382a] resize-none transition-all leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
