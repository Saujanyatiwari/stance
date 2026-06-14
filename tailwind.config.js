/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy CSS-var tokens (kept for backward compat)
        bg:              'var(--color-bg)',
        surface:         'var(--color-surface)',
        'surface-2':     'var(--color-surface-2)',
        border:          'var(--color-border)',
        'text-primary':  'var(--color-text-primary)',
        'text-muted':    'var(--color-text-muted)',
        primary:         'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',

        // Design-system tokens — use bg-rf-page, text-rf-primary, etc.
        'rf-page':        '#0d0d0d',
        'rf-card':        '#111111',
        'rf-raised':      '#1a1a1a',
        'rf-hover':       '#222222',
        'rf-border':      '#1e1e1e',
        'rf-border-strong':'#2a2a2a',

        'rf-primary':     '#f2f2f2',
        'rf-secondary':   '#888888',
        'rf-hint':        '#444444',
        'rf-placeholder': '#2e2e2e',

        'rf-accent':      '#8b0000',
        'rf-accent-dark': '#6e0000',

        'rf-firm':        '#8b0000',
        'rf-diplomatic':  '#7a9fff',
        'rf-brief':       '#30c88c',

        'rf-success':     '#30c88c',
        'rf-warning':     '#ffb432',
        'rf-info':        '#7a9fff',
        'rf-danger':      '#8b0000',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'rf-h1':    ['28px', { fontWeight: '700', letterSpacing: '-0.03em' }],
        'rf-h2':    ['18px', { fontWeight: '600', letterSpacing: '-0.01em' }],
        'rf-body':  ['14px', { fontWeight: '400', lineHeight: '1.65' }],
        'rf-small': ['12px', { fontWeight: '400' }],
        'rf-card-body': ['13px', { lineHeight: '1.68' }],
        'rf-tone-label': ['10px', { fontWeight: '400' }],
        'rf-tone-pill':  ['11px', { fontWeight: '400' }],
      },
      borderRadius: {
        // Legacy tokens
        xl:    '12px',
        '2xl': '16px',
        '3xl': '20px',
        // Design-system tokens
        'rf-card':        '13px',
        'rf-button':      '8px',
        'rf-pill':        '100px',
        'rf-input':       '8px',
        'rf-icon-button': '7px',
        'rf-tag':         '5px',
      },
      boxShadow: {
        // Design-system tokens
        'rf-cta':                  '0 0 22px rgba(139,0,0,0.55), 0 2px 12px rgba(139,0,0,0.40)',
        'rf-cta-hover':            '0 0 32px rgba(139,0,0,0.75), 0 4px 18px rgba(139,0,0,0.55)',
        'rf-input-focus':          '0 0 0 3px rgba(139,0,0,0.1), 0 0 14px rgba(139,0,0,0.08)',
        'rf-card-firm-hover':      '0 0 32px rgba(139,0,0,0.22)',
        'rf-card-diplomatic-hover':'0 0 32px rgba(122,159,255,0.13)',
        'rf-card-brief-hover':     '0 0 32px rgba(48,200,140,0.13)',
      },
      animation: {
        'fade-in':        'fadeIn 0.25s ease forwards',
        'slide-up':       'slideUp 0.3s ease forwards',
        'slide-in-right': 'slideInRight 0.3s ease forwards',
        'pulse-soft':     'pulse-soft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
