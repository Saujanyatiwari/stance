import { useApp } from '../../context/AppContext';
import { OUTCOME_OPTIONS } from '../../types';
import { cn } from '../../utils/cn';

export function OutcomeSelector() {
  const { desiredOutcome, setDesiredOutcome } = useApp();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text-primary">
        Desired Outcome
      </label>
      <p className="text-xs text-text-muted">What do you want this reply to achieve?</p>
      <div className="grid grid-cols-2 gap-2">
        {OUTCOME_OPTIONS.map((opt) => {
          const isActive = desiredOutcome === opt.value;
          return (
            <button
              key={opt.value}
              id={`outcome-${opt.value}`}
              onClick={() => setDesiredOutcome(opt.value)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm text-left transition-all duration-150',
                isActive
                  ? 'bg-[rgba(232,56,42,0.08)] border-[rgba(232,56,42,0.25)] text-[#e8382a] shadow-sm shadow-[rgba(232,56,42,0.08)]'
                  : 'bg-surface-2 border-border text-text-muted hover:border-[rgba(232,56,42,0.2)] hover:text-text-primary hover:bg-surface-2'
              )}
            >
              <span className="text-base leading-none">{opt.icon}</span>
              <span className="font-medium text-xs leading-tight">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
