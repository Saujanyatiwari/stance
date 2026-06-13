import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SITUATION_OPTIONS_DEFAULT, SITUATION_OPTIONS_MORE } from '../../types';
import type { Situation } from '../../types';

export function SituationSelector() {
  const { situation, setSituation } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click-outside — only active while the dropdown is open
  useEffect(() => {
    if (!isOpen) return;
    function handler(e: MouseEvent) {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !dropdownRef.current?.contains(t)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Close on scroll — but not when the user is scrolling inside the dropdown list itself
  useEffect(() => {
    if (!isOpen) return;
    const close = (e: Event) => {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [isOpen]);

  const allOptions = [...SITUATION_OPTIONS_DEFAULT, ...SITUATION_OPTIONS_MORE];
  const selectedOption = situation ? allOptions.find((o) => o.value === situation) : null;
  const isPlaceholder = !selectedOption;
  const selectedLabel = selectedOption?.label ?? 'Select a situation';

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setDropdownPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }
    setIsOpen((v) => !v);
  };

  const handleSelect = (value: Situation) => {
    setSituation(value);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text-primary">Situation</label>
      <p className="text-xs text-text-muted">What kind of conversation is this?</p>

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          className={`w-full flex items-center justify-between bg-surface-2 border rounded-[8px] px-4 py-3 transition-colors text-left ${
            isOpen
              ? 'border-[#e8382a] ring-2 ring-[rgba(232,56,42,0.12)]'
              : 'border-border hover:border-[#2a2a2a]'
          }`}
        >
          <span className={`text-[16px] flex-1 min-w-0 truncate pr-2 ${isPlaceholder ? 'text-[#444444]' : 'text-text-primary'}`}>
            {selectedLabel}
          </span>
          <ChevronDown
            size={16}
            className={`text-[#555555] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              zIndex: 9999,
            }}
            className="bg-[#111111] border border-[#1e1e1e] rounded-[8px] shadow-2xl overflow-hidden"
          >
            <div className="max-h-[320px] overflow-y-auto">
              {SITUATION_OPTIONS_DEFAULT.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${
                    situation === opt.value
                      ? 'text-[#e8382a] bg-[rgba(232,56,42,0.06)]'
                      : 'text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#f2f2f2]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}

              <div className="h-px bg-[#1e1e1e] mx-4" />

              {!showMore ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowMore(true); }}
                  className="w-full text-left px-4 py-3 text-[13px] text-[#555555] hover:text-[#888888] hover:bg-[#161616] transition-colors"
                >
                  + More situations
                </button>
              ) : (
                SITUATION_OPTIONS_MORE.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${
                      situation === opt.value
                        ? 'text-[#e8382a] bg-[rgba(232,56,42,0.06)]'
                        : 'text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#f2f2f2]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
