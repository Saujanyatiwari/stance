import { useApp } from '../../context/AppContext';
import { ReplyCard } from './ReplyCard';
import { EmptyState } from '../ui/EmptyState';
import { theme } from '../../theme';

const SKELETON_COLORS = [
  { accent: theme.colors.firm.color,       border: theme.colors.firm.border,       bg: theme.colors.firm.bgTint       },
  { accent: theme.colors.diplomatic.color, border: theme.colors.diplomatic.border, bg: theme.colors.diplomatic.bgTint },
  { accent: theme.colors.brief.color,      border: theme.colors.brief.border,      bg: theme.colors.brief.bgTint      },
];

function CardSkeleton({ index }: { index: number }) {
  const c = SKELETON_COLORS[index];
  return (
    <div
      className="rounded-rf-card overflow-hidden"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      {/* accent line */}
      <div style={{ height: '1px', background: c.accent, opacity: 0.4 }} />
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-4 rounded-rf-tag animate-pulse" style={{ background: '#1e1e1e' }} />
          <div className="w-36 h-3.5 rounded animate-pulse" style={{ background: '#1a1a1a' }} />
        </div>
        <div className="flex gap-1.5">
          <div className="w-[30px] h-[30px] rounded-rf-icon-button animate-pulse" style={{ background: '#181818' }} />
          <div className="w-[30px] h-[30px] rounded-rf-icon-button animate-pulse" style={{ background: '#181818' }} />
        </div>
      </div>
      {/* body */}
      <div className="px-5 pb-4 space-y-2">
        <div className="h-3 rounded animate-pulse w-full"  style={{ background: '#161616' }} />
        <div className="h-3 rounded animate-pulse w-[92%]" style={{ background: '#161616' }} />
        <div className="h-3 rounded animate-pulse w-[85%]" style={{ background: '#161616' }} />
        <div className="h-3 rounded animate-pulse w-[78%]" style={{ background: '#161616' }} />
        <div className="h-3 rounded animate-pulse w-[60%]" style={{ background: '#161616' }} />
      </div>
      {/* divider */}
      <div style={{ height: '1px', background: '#1c1c1c', margin: '0 20px' }} />
      {/* pills */}
      <div className="px-5 pt-3 pb-4">
        <div className="h-2.5 w-16 rounded animate-pulse mb-2.5" style={{ background: '#1a1a1a' }} />
        <div className="flex gap-1.5">
          {[72, 80, 64, 76].map((w, i) => (
            <div key={i} className="h-6 rounded-rf-pill animate-pulse" style={{ background: '#161616', width: w }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// TODO (Prompt 5): remove DUMMY_REPLIES once real AI replies are wired in
const DUMMY_REPLIES = [
  {
    id: 'dummy-0',
    title: 'Firm',
    content: 'Thank you for the update. I understand you have moved in a different direction. I would appreciate any feedback on where our proposal fell short as it helps me improve for future work.',
  },
  {
    id: 'dummy-1',
    title: 'Diplomatic',
    content: 'Thank you for letting me know. I would love to understand more about your decision if you are open to sharing. Wishing you all the best with the project.',
  },
  {
    id: 'dummy-2',
    title: 'Brief',
    content: 'Understood, thanks for letting me know. Good luck with the project.',
  },
];

export function ReplyGrid() {
  const { replies, isLoading } = useApp();

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 space-y-4">
        {[0, 1, 2].map((i) => (
          <CardSkeleton key={i} index={i} />
        ))}
      </div>
    );
  }

  // TODO (Prompt 5): remove the DUMMY_REPLIES fallback — use `replies` directly
  const displayReplies = replies.length > 0 ? replies : DUMMY_REPLIES;

  return (
    <div className="p-6 md:p-8 space-y-5">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-[#444444]">
          Generated Replies
        </span>
        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-rf-pill"
          style={{
            color:      theme.colors.accent,
            background: theme.colors.accentGlowSubtle,
            border:     `1px solid ${theme.colors.accentGlow}`,
          }}
        >
          {displayReplies.length} variation{displayReplies.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Reply cards */}
      {displayReplies.map((reply, i) => (
        <ReplyCard key={reply.id} reply={reply} index={i} />
      ))}
    </div>
  );
}
