import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import type { Reply, QuickAction } from '../../types';
import { QUICK_ACTION_OPTIONS } from '../../types';
import { useApp } from '../../context/AppContext';
import { cn } from '../../utils/cn';

interface ReplyCardProps {
  reply: Reply;
  index: number;
}

export function ReplyCard({ reply, index }: ReplyCardProps) {
  const { refineReply } = useApp();
  const [copied, setCopied] = useState(false);
  const [refiningAction, setRefiningAction] = useState<QuickAction | null>(null);

  const isRefining = reply.title.includes('(refining…)');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reply.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = reply.content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleQuickAction = async (action: QuickAction) => {
    if (isRefining || refiningAction) return;
    setRefiningAction(action);
    await refineReply(reply.id, action);
    setRefiningAction(null);
  };

  const cardAccents = [
    'border-[rgba(232,56,42,0.2)] hover:border-[rgba(232,56,42,0.4)]',
    'border-[rgba(122,159,255,0.18)] hover:border-[rgba(122,159,255,0.35)]',
    'border-[rgba(48,200,140,0.18)] hover:border-[rgba(48,200,140,0.35)]',
  ];

  const badgeColors = [
    'bg-[rgba(232,56,42,0.1)] text-[#e8382a]',
    'bg-[rgba(122,159,255,0.1)] text-[#7a9fff]',
    'bg-[rgba(48,200,140,0.1)] text-[#30c88c]',
  ];

  return (
    <div
      className={cn(
        'flex flex-col gap-0 bg-surface border rounded-2xl overflow-hidden shadow-sm transition-all duration-200 animate-fade-in',
        cardAccents[index % 3],
        isRefining && 'opacity-70 pointer-events-none'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2.5">
          {isRefining ? (
            <RefreshCw size={13} className="text-text-muted animate-spin" />
          ) : (
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-md', badgeColors[index % 3])}>
              {index + 1}
            </span>
          )}
          <h3 className="text-sm font-semibold text-text-primary leading-tight">
            {isRefining ? 'Refining…' : reply.title}
          </h3>
        </div>
        <button
          id={`copy-reply-${index + 1}`}
          onClick={handleCopy}
          disabled={isRefining}
          className={cn(
            'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 font-medium shrink-0',
            copied
              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
              : 'text-text-muted bg-surface-2 border-border hover:text-text-primary hover:border-[#2a2a2a]'
          )}
          aria-label="Copy reply to clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Reply content */}
      <div className="px-4 py-4 flex-1">
        <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
          {reply.content}
        </p>
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-4 pt-1">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">Refine</p>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_ACTION_OPTIONS.map((action) => (
            <button
              key={action.value}
              id={`quick-action-${reply.id}-${action.value}`}
              onClick={() => handleQuickAction(action.value)}
              disabled={!!refiningAction || isRefining}
              className={cn(
                'flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg border transition-all duration-150',
                refiningAction === action.value
                  ? 'text-[#e8382a] bg-[rgba(232,56,42,0.1)] border-[rgba(232,56,42,0.2)]'
                  : 'text-text-muted bg-surface-2 border-border hover:border-[rgba(232,56,42,0.2)] hover:text-text-primary hover:bg-[rgba(232,56,42,0.05)] disabled:opacity-40 disabled:cursor-not-allowed'
              )}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
