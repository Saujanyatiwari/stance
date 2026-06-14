import React from 'react';
import { useApp } from '../../context/AppContext';
import { ReplyCard } from './ReplyCard';
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

  if (replies.length === 0) {
    const steps = [
      'Paste the message you received',
      'Select the situation type',
      'Hit Generate — get 3 replies instantly',
    ];
    return (
      <div
        style={{
          minHeight: '50vh',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080808',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* Icon ring */}
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '0.5px solid #1e1e1e', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V4z" stroke="#cc2424" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Title */}
          <p style={{ color: '#fff', fontSize: '22px', fontWeight: 500, margin: '0 0 12px 0', whiteSpace: 'nowrap' }}>
            Your replies will appear here
          </p>

          {/* Subtitle */}
          <p style={{ color: '#333', fontSize: '14px', lineHeight: 1.6, margin: '0 0 28px 0', maxWidth: '260px' }}>
            Fill in the message and situation on the left, then hit Generate.
          </p>

          {/* Divider */}
          <div style={{ width: '40px', height: '1px', background: '#1e1e1e', marginBottom: '28px' }} />

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '0.5px solid #1e1e1e', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', color: '#333' }}>
                  {i + 1}
                </div>
                <span style={{ color: '#333', fontSize: '14px', textAlign: 'left', lineHeight: 1.4 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          {replies.length} variation{replies.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Reply cards */}
      {replies.map((reply, i) => (
        <ReplyCard key={reply.id} reply={reply} index={i} />
      ))}
    </div>
  );
}
