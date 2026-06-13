import { useState, useEffect } from 'react';
import { Copy, Check, Pencil, RefreshCw } from 'lucide-react';
import type { Reply, QuickAction } from '../../types';
import { useApp } from '../../context/AppContext';
import { theme } from '../../theme';

interface TonePill {
  label: string;
  action: QuickAction | null; // null = TODO: wire to AI in Prompt 5
}

interface CardConfig {
  tag: string;
  title: string;
  color: string;
  bgTint: string;
  border: string;
  borderHover: string;
  shadowHover: string;
  tagBg: string;
  tonePills: TonePill[];
}

const CARD_CONFIGS: CardConfig[] = [
  {
    tag: 'FIRM',
    title: 'Direct and assertive',
    color: theme.colors.firm.color,
    bgTint: theme.colors.firm.bgTint,
    border: theme.colors.firm.border,
    borderHover: 'rgba(232, 56, 42, 0.45)',
    shadowHover: theme.shadows.cardFirmHover,
    tagBg: theme.tags.firm.background,
    tonePills: [
      { label: 'Make shorter',   action: 'shorter'    },
      { label: 'Make warmer',    action: 'more-human' },
      { label: 'More formal',    action: null         }, // TODO: wire to AI in Prompt 5
      { label: 'Add a question', action: null         }, // TODO: wire to AI in Prompt 5
    ],
  },
  {
    tag: 'DIPLOMATIC',
    title: 'Balanced and professional',
    color: theme.colors.diplomatic.color,
    bgTint: theme.colors.diplomatic.bgTint,
    border: theme.colors.diplomatic.border,
    borderHover: 'rgba(122, 159, 255, 0.42)',
    shadowHover: theme.shadows.cardDiplomaticHover,
    tagBg: theme.tags.diplomatic.background,
    tonePills: [
      { label: 'Make shorter',  action: 'shorter'    },
      { label: 'Make firmer',   action: 'firmer'     },
      { label: 'Less formal',   action: 'more-polite'},
      { label: 'Add gratitude', action: null         }, // TODO: wire to AI in Prompt 5
    ],
  },
  {
    tag: 'BRIEF',
    title: 'Short and clean',
    color: theme.colors.brief.color,
    bgTint: theme.colors.brief.bgTint,
    border: theme.colors.brief.border,
    borderHover: 'rgba(48, 200, 140, 0.42)',
    shadowHover: theme.shadows.cardBriefHover,
    tagBg: theme.tags.brief.background,
    tonePills: [
      { label: 'Expand it',      action: null         }, // TODO: wire to AI in Prompt 5
      { label: 'Make warmer',    action: 'more-human' },
      { label: 'More formal',    action: null         }, // TODO: wire to AI in Prompt 5
      { label: 'Add next steps', action: null         }, // TODO: wire to AI in Prompt 5
    ],
  },
];

interface ReplyCardProps {
  reply: Reply;
  index: number;
}

export function ReplyCard({ reply, index }: ReplyCardProps) {
  const { refineReply } = useApp();
  const config = CARD_CONFIGS[index % 3];

  const [copied, setCopied]                 = useState(false);
  const [isCopyHovered, setIsCopyHovered]   = useState(false);
  const [isEditing, setIsEditing]           = useState(false);
  const [editedText, setEditedText]         = useState(reply.content);
  const [refiningAction, setRefiningAction] = useState<QuickAction | null>(null);
  const [hoveredPill, setHoveredPill]       = useState<string | null>(null);
  const [isHovered, setIsHovered]           = useState(false);

  const isRefining = reply.title.includes('(refining…)');

  // Fix 4: only sync when reply.content itself changes (e.g. after a refine),
  // NOT when isEditing changes — removing isEditing from deps prevents the
  // effect from wiping out the user's edits when they click Done.
  useEffect(() => {
    setEditedText(reply.content);
  }, [reply.content]);

  const handleCopy = async () => {
    // Fix 3: clear hover state on click so glow doesn't linger
    setIsCopyHovered(false);
    try {
      await navigator.clipboard.writeText(editedText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = editedText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTonePill = async (action: QuickAction) => {
    if (isRefining || refiningAction || isEditing) return;
    setRefiningAction(action);
    await refineReply(reply.id, action);
    setRefiningAction(null);
  };

  // Fix 3: copy button style fully driven by React state — no direct DOM mutation
  const copyButtonStyle = copied
    ? { color: config.color, borderColor: config.border, background: config.tagBg }
    : isCopyHovered
    ? { color: config.color, boxShadow: `0 0 10px ${config.color}`, borderColor: config.border }
    : {};

  return (
    <div
      className="flex flex-col rounded-rf-card overflow-hidden animate-fade-in"
      style={{
        animationDelay:  `${index * 90}ms`,
        background:      config.bgTint,
        border:          `1px solid ${isHovered ? config.borderHover : config.border}`,
        boxShadow:       isHovered ? config.shadowHover : 'none',
        transition:      'border-color 0.2s ease, box-shadow 0.2s ease',
        opacity:         isRefining ? 0.7 : 1,
        pointerEvents:   isRefining ? 'none' : 'auto',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line */}
      <div style={{ height: '1px', background: config.color, boxShadow: `0 0 6px ${config.color}`, opacity: 0.65 }} />

      {/* Header row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span
            className="text-[10px] font-bold tracking-widest shrink-0 px-2 py-0.5 rounded-rf-tag"
            style={{ color: config.color, background: config.tagBg }}
          >
            {config.tag}
          </span>
          {/* Fix 1: 16px / 600 weight */}
          <span className="text-[16px] font-semibold text-[#888888] truncate">
            {config.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-3">
          {/* Edit / Done */}
          <button
            onClick={() => setIsEditing((v) => !v)}
            disabled={isRefining}
            className="w-[30px] h-[30px] flex items-center justify-center rounded-rf-icon-button bg-[#181818] border border-[#242424] text-[#444444] hover:text-[#888888] hover:border-[#333333] transition-colors"
            aria-label={isEditing ? 'Save edits' : 'Edit reply'}
          >
            {isEditing ? <Check size={13} /> : <Pencil size={13} />}
          </button>

          {/* Copy — Fix 3: all hover/active styling through React state */}
          <button
            onClick={handleCopy}
            disabled={isRefining}
            onMouseEnter={() => !copied && setIsCopyHovered(true)}
            onMouseLeave={() => setIsCopyHovered(false)}
            className="w-[30px] h-[30px] flex items-center justify-center rounded-rf-icon-button bg-[#181818] border border-[#242424] text-[#444444] transition-all duration-150"
            style={copyButtonStyle}
            aria-label="Copy reply"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>

          {/* Copied confirmation */}
          {copied && (
            <span className="text-[10px] font-medium animate-fade-in" style={{ color: config.color }}>
              Copied
            </span>
          )}
        </div>
      </div>

      {/* Reply body */}
      <div className="px-5 pb-4">
        {isRefining ? (
          <div className="flex items-center gap-2 text-[13px] text-[#555555]">
            <RefreshCw size={12} className="animate-spin shrink-0" />
            <span>Refining…</span>
          </div>
        ) : isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={6}
            autoFocus
            className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-rf-input px-3 py-3 text-[13px] text-[#cccccc] leading-[1.68] resize-none focus:outline-none focus:border-[#3a3a3a] transition-colors"
          />
        ) : (
          <p
            className="text-[13px] leading-[1.68] whitespace-pre-wrap"
            style={{ color: theme.card.bodyColor }}
          >
            {editedText}
          </p>
        )}
      </div>

      {/* Divider + tone pills — hidden while editing or refining */}
      {!isEditing && !isRefining && (
        <>
          <div style={{ height: '1px', background: theme.card.dividerColor, margin: '0 20px' }} />

          <div className="px-5 pt-3 pb-4">
            <p
              className="mb-2 tracking-widest font-medium"
              style={{
                fontSize:      theme.card.toneLabel.fontSize,
                textTransform: theme.card.toneLabel.textTransform,
                color:         theme.card.toneLabel.color,
              }}
            >
              Adjust tone
            </p>
            <div className="flex flex-wrap gap-1.5">
              {config.tonePills.map((pill) => {
                const isActive  = refiningAction === pill.action && pill.action !== null;
                // Fix 2: hover driven by JS state so it overrides the inline style correctly
                const isHovering = hoveredPill === pill.label && !isActive && !refiningAction;
                return (
                  <button
                    key={pill.label}
                    type="button"
                    disabled={!!refiningAction}
                    onClick={() => {
                      if (pill.action) handleTonePill(pill.action);
                      // TODO: wire non-mapped pills to AI in Prompt 5
                    }}
                    onMouseEnter={() => setHoveredPill(pill.label)}
                    onMouseLeave={() => setHoveredPill(null)}
                    className="flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-rf-pill border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: isActive   ? config.tagBg
                                : isHovering ? `${config.tagBg}`
                                :              theme.buttons.tonePill.background,
                      color:      isActive   ? config.color
                                : isHovering ? config.color
                                :              theme.buttons.tonePill.color,
                      border:     isActive   ? `1px solid ${config.border}`
                                : isHovering ? `1px solid ${config.border}`
                                :              theme.buttons.tonePill.border,
                    }}
                  >
                    {isActive && <RefreshCw size={9} className="animate-spin shrink-0" />}
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
