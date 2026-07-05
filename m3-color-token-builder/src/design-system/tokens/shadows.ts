export const shadows = {
  xs: '0 1px 2px rgba(0,0,0,0.05)',
  sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)',
  lg: '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.03)',
  xl: '0 20px 25px rgba(0,0,0,0.10), 0 8px 10px rgba(0,0,0,0.04)',
  '2xl': '0 25px 50px rgba(0,0,0,0.15)',
  inner: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  glow: {
    primary: '0 0 20px hsla(256, 34%, 48%, 0.35)',
    secondary: '0 0 20px hsla(259, 11%, 40%, 0.35)',
    tertiary: '0 0 20px hsla(340, 21%, 41%, 0.35)',
    error: '0 0 20px hsla(0, 54%, 41%, 0.35)',
  },
} as const;

export const elevation = {
  0: 'none',
  1: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
  2: '0 3px 6px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
  3: '0 6px 12px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
  4: '0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.06)',
  5: '0 15px 30px rgba(0,0,0,0.14), 0 5px 10px rgba(0,0,0,0.08)',
} as const;
