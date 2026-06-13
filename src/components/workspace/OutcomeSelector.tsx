import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OUTCOME_OPTIONS_DEFAULT, OUTCOME_OPTIONS_MORE } from '../../types';
import type { DesiredOutcome, OutcomeOption } from '../../types';

const MORE_VALUES = new Set(OUTCOME_OPTIONS_MORE.map((o) => o.value));

export function OutcomeSelector() {
  const { desiredOutcome, setDesiredOutcome } = useApp();
  const [showMore, setShowMore] = useState(false);

  // If the active outcome is a hidden "more" option, swap it into position 5
  // so it's always visible without needing to expand the section.
  const activeIsMore = MORE_VALUES.has(desiredOutcome);

  const visiblePills: OutcomeOption[] = activeIsMore
    ? [
        ...OUTCOME_OPTIONS_DEFAULT.slice(0, 4),
        OUTCOME_OPTIONS_MORE.find((o) => o.value === desiredOutcome)!,
      ]
    : OUTCOME_OPTIONS_DEFAULT;

  // When the swapped outcome is already visible above, hide it from the
  // expanded section to avoid showing it twice.
  const expandedPills = activeIsMore
    ? OUTCOME_OPTIONS_MORE.filter((o) => o.value !== desiredOutcome)
    : OUTCOME_OPTIONS_MORE;

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
        {visiblePills.map((opt) => (
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
          expandedPills.map((opt) => (
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
