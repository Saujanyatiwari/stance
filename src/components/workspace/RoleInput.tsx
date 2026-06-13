import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ROLES_DEFAULT = [
  'Freelancer / Contractor',
  'Founder / Business Owner',
  'Employee / Team Member',
  'Manager / Team Lead',
  'Sales / Account Manager',
];

const ROLES_MORE = [
  'Product Manager',
  'Designer',
  'Developer / Engineer',
  'Consultant',
  'Lawyer / Legal',
  'HR / People Ops',
  'Finance / Accountant',
  'Marketing',
  'Customer Success',
  'Operations',
];

const OTHER = 'Other — specify your role';

export function RoleInput() {
  const { role, setRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [customRole, setCustomRole] = useState('');
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click-outside — only active while dropdown is open
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

  // Close on scroll — but not when scrolling inside the dropdown list itself
  useEffect(() => {
    if (!isOpen) return;
    const close = (e: Event) => {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setDropdownPos({ top: r.bottom + 4, left: r.left, width: r.width });
    }
    setIsOpen((v) => !v);
  };

  const handlePreset = (label: string) => {
    setIsOther(false);
    setRole(label);
    setIsOpen(false);
  };

  const handleOther = () => {
    setIsOther(true);
    setRole(customRole);
    setIsOpen(false);
  };

  const handleCustomChange = (v: string) => {
    setCustomRole(v);
    setRole(v);
  };

  const displayLabel = isOther
    ? (customRole || 'Other — specify your role')
    : (role || 'Select your role');

  const isPlaceholder = !isOther && !role;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text-primary">
        Your Role
        <span className="ml-2 text-xs font-normal text-text-muted">(optional)</span>
      </label>
      <p className="text-xs text-text-muted">Helps tailor the tone for your professional context.</p>

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          className={`w-full flex items-center justify-between bg-surface-2 border rounded-[8px] px-4 py-3 transition-colors text-left ${
            isOpen
              ? 'border-[#e8382a]'
              : 'border-border hover:border-[#2a2a2a]'
          }`}
        >
          <span className={`text-[16px] flex-1 min-w-0 truncate pr-2 ${isPlaceholder ? 'text-[#444444]' : 'text-text-primary'}`}>
            {displayLabel}
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
            <div className="max-h-[300px] overflow-y-auto">
              {ROLES_DEFAULT.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handlePreset(label)}
                  className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${
                    !isOther && role === label
                      ? 'text-[#e8382a] bg-[rgba(232,56,42,0.06)]'
                      : 'text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#f2f2f2]'
                  }`}
                >
                  {label}
                </button>
              ))}

              <div className="h-px bg-[#1e1e1e] mx-4" />

              {!showMore ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowMore(true); }}
                  className="w-full text-left px-4 py-3 text-[13px] text-[#555555] hover:text-[#888888] hover:bg-[#161616] transition-colors"
                >
                  + More roles
                </button>
              ) : (
                ROLES_MORE.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handlePreset(label)}
                    className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${
                      !isOther && role === label
                        ? 'text-[#e8382a] bg-[rgba(232,56,42,0.06)]'
                        : 'text-[#cccccc] hover:bg-[#1a1a1a] hover:text-[#f2f2f2]'
                    }`}
                  >
                    {label}
                  </button>
                ))
              )}

              <div className="h-px bg-[#1e1e1e] mx-4" />

              <button
                type="button"
                onClick={handleOther}
                className={`w-full text-left px-4 py-3 text-[14px] transition-colors ${
                  isOther
                    ? 'text-[#e8382a] bg-[rgba(232,56,42,0.06)]'
                    : 'text-[#888888] hover:bg-[#1a1a1a] hover:text-[#f2f2f2]'
                }`}
              >
                {OTHER}
              </button>
            </div>
          </div>
        )}
      </div>

      {isOther && (
        <input
          type="text"
          value={customRole}
          onChange={(e) => handleCustomChange(e.target.value)}
          placeholder="e.g. Freelance Illustrator, Fractional CMO…"
          className="w-full bg-surface-2 border border-border rounded-[8px] px-4 py-3 text-[16px] text-text-primary placeholder:text-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-[rgba(232,56,42,0.15)] focus:border-[#e8382a] transition-all"
        />
      )}
    </div>
  );
}
