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

    accent:          '#8b0000',
    accentDark:      '#6e0000',
    accentGlow:      'rgba(139, 0, 0, 0.5)',
    accentGlowSubtle:'rgba(139, 0, 0, 0.12)',

    firm: {
      color:   '#8b0000',
      glow:    'rgba(139, 0, 0, 0.22)',
      bgTint:  '#0c0808',
      border:  'rgba(139, 0, 0, 0.28)',
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
    statusDanger:  '#8b0000',
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
    ctaRest:         '0 0 22px rgba(139,0,0,0.55), 0 2px 12px rgba(139,0,0,0.40)',
    ctaHover:        '0 0 32px rgba(139,0,0,0.75), 0 4px 18px rgba(139,0,0,0.55)',
    inputFocus:      '0 0 0 3px rgba(139,0,0,0.1), 0 0 14px rgba(139,0,0,0.08)',
    cardFirmHover:       '0 0 32px rgba(139,0,0,0.22)',
    cardDiplomaticHover: '0 0 32px rgba(122,159,255,0.13)',
    cardBriefHover:      '0 0 32px rgba(48,200,140,0.13)',
  },

  buttons: {
    primary: {
      background: 'linear-gradient(135deg, #8b0000 0%, #6e0000 100%)',
      color:      '#ffffff',
      border:     '1px solid rgba(139,0,0,0.5)',
      shadowRest: '0 0 22px rgba(139,0,0,0.55), 0 2px 12px rgba(139,0,0,0.40)',
      shadowHover:'0 0 32px rgba(139,0,0,0.75), 0 4px 18px rgba(139,0,0,0.55)',
    },
    secondary: {
      background:      '#1a1a1a',
      color:           '#cccccc',
      border:          '1px solid #2a2a2a',
      hoverBorderColor:'rgba(139,0,0,0.3)',
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
    firm:       { background: 'rgba(139,0,0,0.15)',    color: '#8b0000', border: 'rgba(139,0,0,0.28)' },
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
