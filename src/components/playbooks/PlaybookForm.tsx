import { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { SITUATION_OPTIONS, OUTCOME_OPTIONS } from '../../types';
import type { Playbook, Situation, DesiredOutcome } from '../../types';

const ALL_ROLES = [
  'Freelancer / Contractor',
  'Founder / Business Owner',
  'Employee / Team Member',
  'Manager / Team Lead',
  'Sales / Account Manager',
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

const OTHER_ROLE = '__other__';

export interface PlaybookFormData {
  name: string;
  situation: Situation;
  desiredOutcome: DesiredOutcome;
  role: string;
  writingExamples: string[];
}

interface PlaybookFormProps {
  playbook?: Playbook;
  onSave: (data: PlaybookFormData) => void;
  onCancel: () => void;
}

export function PlaybookForm({ playbook, onSave, onCancel }: PlaybookFormProps) {
  const isEditing = !!playbook;
  const initRole = playbook?.role ?? '';
  const isRolePreset = initRole === '' || ALL_ROLES.includes(initRole);

  const [name, setName] = useState(playbook?.name ?? '');
  const [situation, setSituation] = useState<Situation | ''>(playbook?.situation ?? '');
  const [desiredOutcome, setDesiredOutcome] = useState<DesiredOutcome | ''>(playbook?.desiredOutcome ?? '');
  const [roleSelect, setRoleSelect] = useState<string>(isRolePreset ? initRole : OTHER_ROLE);
  const [customRole, setCustomRole] = useState<string>(!isRolePreset ? initRole : '');

  const initExamples = playbook?.writingExamples ?? [];
  const [examples, setExamples] = useState<string[]>([
    initExamples[0] ?? '',
    initExamples[1] ?? '',
    initExamples[2] ?? '',
  ]);
  const [visibleExamples, setVisibleExamples] = useState(() => Math.max(1, initExamples.length));
  const [styleOpen, setStyleOpen] = useState(initExamples.length > 0);

  const [errors, setErrors] = useState<{ name?: string; situation?: string; outcome?: string }>({});

  const handleSave = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!situation) newErrors.situation = 'Situation is required';
    if (!desiredOutcome) newErrors.outcome = 'Outcome is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const finalRole = roleSelect === OTHER_ROLE ? customRole.trim() : roleSelect;
    const finalExamples = examples.slice(0, visibleExamples).filter(Boolean);
    onSave({
      name: name.trim(),
      situation: situation as Situation,
      desiredOutcome: desiredOutcome as DesiredOutcome,
      role: finalRole,
      writingExamples: finalExamples,
    });
  };

  const updateExample = (i: number, val: string) => {
    const next = [...examples];
    next[i] = val;
    setExamples(next);
  };

  const inputBase = 'w-full bg-[#161616] border rounded-[8px] px-3 py-2.5 text-[13px] text-[#f2f2f2] placeholder:text-[#333333] focus:outline-none transition-all';
  const inputIdle = 'border-[#222222] focus:border-[#e8382a] focus:ring-2 focus:ring-[rgba(232,56,42,0.08)]';
  const inputError = 'border-[#e8382a] ring-1 ring-[rgba(232,56,42,0.2)]';

  return (
    <div className="flex flex-col" style={{ maxHeight: '82vh' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a] shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="w-6 h-6 flex items-center justify-center rounded text-[#555555] hover:text-[#aaaaaa] hover:bg-[#1a1a1a] transition-colors"
          aria-label="Back"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-[13px] font-semibold text-[#f2f2f2]">
          {isEditing ? 'Edit Playbook' : 'Create Playbook'}
        </span>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto flex-1 p-4 space-y-4">

        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-[#666666] uppercase tracking-[0.06em]">
            Name <span className="text-[#e8382a]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
            placeholder="Give your playbook a name"
            className={`${inputBase} ${errors.name ? inputError : inputIdle}`}
            autoFocus
          />
          {errors.name && <p className="text-[11px] text-[#e8382a]">{errors.name}</p>}
        </div>

        {/* Situation */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-[#666666] uppercase tracking-[0.06em]">
            Situation <span className="text-[#e8382a]">*</span>
          </label>
          <div className="relative">
            <select
              value={situation}
              onChange={(e) => { setSituation(e.target.value as Situation); setErrors((p) => ({ ...p, situation: undefined })); }}
              className={`${inputBase} appearance-none pr-8 cursor-pointer ${errors.situation ? inputError : inputIdle}`}
              style={{ color: situation === '' ? '#555555' : undefined }}
            >
              <option value="" disabled>Select a situation</option>
              {SITUATION_OPTIONS.filter((o) => o.value !== 'feedback-revision' && o.value !== 'custom').map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
          </div>
          {errors.situation && <p className="text-[11px] text-[#e8382a]">{errors.situation}</p>}
        </div>

        {/* Desired Outcome */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-[#666666] uppercase tracking-[0.06em]">
            Desired Outcome <span className="text-[#e8382a]">*</span>
          </label>
          <div className="relative">
            <select
              value={desiredOutcome}
              onChange={(e) => { setDesiredOutcome(e.target.value as DesiredOutcome); setErrors((p) => ({ ...p, outcome: undefined })); }}
              className={`${inputBase} appearance-none pr-8 cursor-pointer ${errors.outcome ? inputError : inputIdle}`}
              style={{ color: desiredOutcome === '' ? '#555555' : undefined }}
            >
              <option value="" disabled>Select an outcome</option>
              {OUTCOME_OPTIONS.filter((o) => o.value !== 'appear-confident').map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
          </div>
          {errors.outcome && <p className="text-[11px] text-[#e8382a]">{errors.outcome}</p>}
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-[#666666] uppercase tracking-[0.06em]">
            Your Role{' '}
            <span className="text-[#3a3a3a] font-normal normal-case">(optional)</span>
          </label>
          <div className="relative">
            <select
              value={roleSelect}
              onChange={(e) => setRoleSelect(e.target.value)}
              className={`${inputBase} appearance-none pr-8 cursor-pointer ${inputIdle}`}
            >
              <option value="">No specific role</option>
              {ALL_ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
              <option value={OTHER_ROLE}>Other — specify your role</option>
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none" />
          </div>
          {roleSelect === OTHER_ROLE && (
            <input
              type="text"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              placeholder="e.g. Freelance Illustrator, Fractional CMO…"
              className={`${inputBase} ${inputIdle}`}
            />
          )}
        </div>

        {/* Style Guide */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setStyleOpen((v) => !v)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-semibold text-[#666666] uppercase tracking-[0.06em]">Style Guide</span>
              <span className="text-[10px] text-[#3a3a3a]">(optional)</span>
            </div>
            <ChevronDown
              size={13}
              className={`text-[#555555] shrink-0 transition-transform duration-200 ${styleOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: styleOpen ? '500px' : '0', opacity: styleOpen ? 1 : 0 }}
          >
            <div className="pt-1 space-y-3">
              <p className="text-[11px] text-[#444444] leading-relaxed">
                Add examples of replies you have written before and we will match your tone.
              </p>

              {Array.from({ length: visibleExamples }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <label className="text-[10px] text-[#444444]">Example {i + 1}</label>
                  <textarea
                    value={examples[i]}
                    onChange={(e) => updateExample(i, e.target.value)}
                    placeholder="Paste a reply you've written before…"
                    rows={2}
                    className="w-full bg-[#111111] border border-[#222222] rounded-[8px] px-3 py-2.5 text-[12px] text-[#f2f2f2] placeholder:text-[#2a2a2a] focus:outline-none focus:border-[#e8382a] focus:ring-2 focus:ring-[rgba(232,56,42,0.08)] resize-none transition-all leading-relaxed"
                  />
                </div>
              ))}

              {visibleExamples < 3 && (
                <button
                  type="button"
                  onClick={() => setVisibleExamples((v) => Math.min(v + 1, 3))}
                  className="flex items-center gap-1.5 text-[12px] text-[#555555] hover:text-[#888888] transition-colors"
                >
                  <span className="text-base leading-none">+</span>
                  Add example
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1a1a1a] p-3 flex gap-2 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-[7px] text-[13px] font-medium text-[#555555] hover:text-[#888888] hover:bg-[#1a1a1a] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 py-2 rounded-[7px] text-[13px] font-semibold bg-[#e8382a] text-white hover:bg-[#c5251a] transition-colors"
          style={{ boxShadow: '0 0 12px rgba(232,56,42,0.25)' }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
