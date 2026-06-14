import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function WritingExamples() {
  const { writingExamples: ctxExamples, setWritingExamples } = useApp();
  const [isOpen, setIsOpen] = useState(true);
  const [visible, setVisible] = useState(() => Math.max(1, ctxExamples.length));
  const [examples, setExamples] = useState<string[]>(() => {
    const base = ['', '', ''];
    ctxExamples.forEach((ex, i) => { if (i < 3) base[i] = ex; });
    return base;
  });

  const updateExample = (index: number, value: string) => {
    const next = [...examples];
    next[index] = value;
    setExamples(next);
    setWritingExamples(next.filter(Boolean));
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <span className="text-sm font-semibold text-text-primary">Style Guide</span>
          <span className="ml-2 text-xs font-normal text-text-muted">(optional)</span>
        </div>
        <ChevronDown
          size={15}
          className={`text-[#555555] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? '600px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pt-1 space-y-3">
          <p className="text-[11px] text-[#444444] leading-relaxed">
            Paste replies you've written before. We'll match your natural tone.
          </p>

          {Array.from({ length: visible }).map((_, i) => (
            <div key={i} className="space-y-1">
              <label className="text-[11px] text-[#555555]">Example {i + 1}</label>
              <textarea
                value={examples[i]}
                onChange={(e) => updateExample(i, e.target.value)}
                placeholder="Paste a reply you've written before…"
                rows={3}
                className="w-full bg-surface-2 border border-border rounded-[8px] px-4 py-3 text-[16px] text-text-primary placeholder:text-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-[rgba(224,48,48,0.15)] focus:border-[#e03030] resize-none transition-all leading-relaxed"
              />
            </div>
          ))}

          {visible < 3 && (
            <button
              type="button"
              onClick={() => setVisible((v) => Math.min(v + 1, 3))}
              className="flex items-center gap-1.5 text-[13px] text-[#555555] hover:text-[#888888] transition-colors"
            >
              <span className="text-base leading-none">+</span>
              Add example
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
