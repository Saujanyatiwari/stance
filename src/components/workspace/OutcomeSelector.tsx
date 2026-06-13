import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OUTCOME_OPTIONS_DEFAULT, OUTCOME_OPTIONS_MORE } from '../../types';
import type { DesiredOutcome } from '../../types';

export function OutcomeSelector() {
  const { desiredOutcome, setDesiredOutcome } = useApp();
  const [showMore, setShowMore] = useState(false);

  const pillClass = (value: DesiredOutcome) =>
    `px-3 py-2 rounded-[8px] border text-[14px] font-medium transition-all duration-150 cursor-pointer text-left ${
      desiredOutcome === value
        ? 'bg-[rgba(232,56,42,0.12)] border-[rgba(232,56,42,0.35)] text-[#e8382a]'
        : 'bg-[#111111] border-[#1e1e1e] text-[#888888] hover:border-[#2a2a2a] hover:text-[#bbbbbb]'
    }`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text-primary">Desired Outcome</label>
      <p className="text-xs text-text-muted">What do you want this reply to achieve?</p>

      <div className="flex flex-wrap gap-2">
        {OUTCOME_OPTIONS_DEFAULT.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setDesiredOutcome(opt.value)}
            className={pillClass(opt.value)}
          >
            {opt.label}
          </button>
        ))}

        {showMore &&
          OUTCOME_OPTIONS_MORE.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setDesiredOutcome(opt.value)}
              className={pillClass(opt.value)}
            >
              {opt.label}
            </button>
          ))}

        {!showMore && (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="px-3 py-2 rounded-[8px] border border-dashed border-[#222222] text-[13px] text-[#555555] hover:border-[#2e2e2e] hover:text-[#777777] transition-colors"
          >
            + More outcomes
          </button>
        )}
      </div>
    </div>
  );
}
