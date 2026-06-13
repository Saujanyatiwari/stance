export const theme = {
  colors: {
    page:        '#0d0d0d',
    card:        '#111111',
    raised:      '#1a1a1a',
    hover:       '#222222',
    border:      '#1e1e1e',
    borderStrong:'#2a2a2a',

    textPrimary:     '#f2f2f2',
    textSecondary:   '#888888',
    textHint:        '#444444',
    textPlaceholder: '#2e2e2e',

    accent:          '#e8382a',
    accentDark:      '#c5251a',
    accentGlow:      'rgba(232, 56, 42, 0.35)',
    accentGlowSubtle:'rgba(232, 56, 42, 0.08)',

    firm: {
      color:   '#e8382a',
      glow:    'rgba(232, 56, 42, 0.16)',
      bgTint:  '#0f0c0c',
      border:  'rgba(232, 56, 42, 0.2)',
    },
    diplomatic: {
      color:   '#7a9fff',
      glow:    'rgba(122, 159, 255, 0.13)',
      bgTint:  '#0b0d10',
      border:  'rgba(122, 159, 255, 0.18)',
    },
    brief: {
      color:   '#30c88c',
      glow:    'rgba(48, 200, 140, 0.13)',
      bgTint:  '#0b100e',
      border:  'rgba(48, 200, 140, 0.18)',
    },

    statusSuccess: '#30c88c',
    statusWarning: '#ffb432',
    statusInfo:    '#7a9fff',
    statusDanger:  '#e8382a',
  },

  typography: {
    fontStack: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
    h1: { fontSize: '28px', fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' },
    body: { fontSize: '14px', fontWeight: 400, lineHeight: 1.65 },
    small: { fontSize: '12px', fontWeight: 400 },
  },

  radius: {
    card:       '13px',
    button:     '8px',
    pill:       '100px',
    input:      '8px',
    iconButton: '7px',
    tag:        '5px',
  },

  shadows: {
    ctaRest:         '0 0 18px rgba(232,56,42,0.35), 0 2px 8px rgba(232,56,42,0.25)',
    ctaHover:        '0 0 28px rgba(232,56,42,0.55), 0 4px 16px rgba(232,56,42,0.35)',
    inputFocus:      '0 0 0 3px rgba(232,56,42,0.07), 0 0 14px rgba(232,56,42,0.06)',
    cardFirmHover:       '0 0 32px rgba(232,56,42,0.16)',
    cardDiplomaticHover: '0 0 32px rgba(122,159,255,0.13)',
    cardBriefHover:      '0 0 32px rgba(48,200,140,0.13)',
  },

  buttons: {
    primary: {
      background: 'linear-gradient(135deg, #e8382a 0%, #c5251a 100%)',
      color:      '#ffffff',
      border:     '1px solid rgba(232,56,42,0.4)',
      shadowRest: '0 0 18px rgba(232,56,42,0.35), 0 2px 8px rgba(232,56,42,0.25)',
      shadowHover:'0 0 28px rgba(232,56,42,0.55), 0 4px 16px rgba(232,56,42,0.35)',
    },
    secondary: {
      background:      '#1a1a1a',
      color:           '#cccccc',
      border:          '1px solid #2a2a2a',
      hoverBorderColor:'rgba(232,56,42,0.25)',
    },
    ghost: {
      background:      'transparent',
      color:           '#555555',
      hoverBackground: '#161616',
    },
    pill: {
      background:   '#141414',
      color:        '#666666',
      border:       '1px solid #222222',
      borderRadius: '100px',
    },
    iconButton: {
      size:         '30px',
      background:   '#181818',
      border:       '1px solid #242424',
      borderRadius: '7px',
    },
    tonePill: {
      background:   '#161616',
      color:        '#555555',
      border:       '1px solid #222222',
      borderRadius: '100px',
      fontSize:     '11px',
    },
  },

  tags: {
    firm:       { background: 'rgba(232,56,42,0.1)',   color: '#e8382a', border: 'rgba(232,56,42,0.2)' },
    diplomatic: { background: 'rgba(122,159,255,0.1)', color: '#7a9fff', border: 'rgba(122,159,255,0.2)' },
    brief:      { background: 'rgba(48,200,140,0.1)',  color: '#30c88c', border: 'rgba(48,200,140,0.2)' },
  },

  topBar: {
    height:          '52px',
    background:      '#0d0d0d',
    borderBottom:    '1px solid #1a1a1a',
    logoFontWeight:  700,
    logoFontSize:    '16px',
    logoColor:       '#f2f2f2',
  },

  card: {
    bodyFontSize:  '13px',
    bodyColor:     '#666666',
    bodyLineHeight:1.68,
    dividerColor:  '#1c1c1c',
    toneLabel: {
      fontSize:      '10px',
      textTransform: 'uppercase' as const,
      color:         '#333333',
    },
  },
} as const;

export type Theme = typeof theme;
