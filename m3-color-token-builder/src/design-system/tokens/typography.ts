export const typography = {
  fontFamily: {
    sans: 'Open Sans',
    display: 'Playfair Display',
    mono: 'JetBrains Mono',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export const typographyTokensToCSS = () => {
  const lines: string[] = [];
  for (const [family, value] of Object.entries(typography.fontFamily)) {
    lines.push(`  --md-ref-font-family-${family}: ${value};`);
  }
  for (const [size, value] of Object.entries(typography.fontSize)) {
    lines.push(`  --md-ref-font-size-${size}: ${value};`);
  }
  for (const [weight, value] of Object.entries(typography.fontWeight)) {
    lines.push(`  --md-ref-font-weight-${weight}: ${value};`);
  }
  for (const [height, value] of Object.entries(typography.lineHeight)) {
    lines.push(`  --md-ref-line-height-${height}: ${value};`);
  }
  return lines.map(l => `  ${l}`).join('\n');
};
