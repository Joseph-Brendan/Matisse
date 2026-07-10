import { palette, colorRoles, type ColorRoleKey } from '../design-system/tokens/colors';
import { typography } from '../design-system/tokens/typography';
import { spacing, borderRadius, breakpoints } from '../design-system/tokens/spacing';
import { shadows, elevation } from '../design-system/tokens/shadows';

// ── JSON Export ──────────────────────────────────────────
export interface DesignTokensJSON {
  color: {
    palette: typeof palette;
    roles: typeof colorRoles;
  };
  typography: typeof typography;
  spacing: {
    scale: typeof spacing;
    borderRadius: typeof borderRadius;
    breakpoints: typeof breakpoints;
  };
  shadows: {
    boxShadow: typeof shadows;
    elevation: typeof elevation;
  };
}

export function exportAsJSON(): DesignTokensJSON {
  return {
    color: {
      palette,
      roles: colorRoles,
    },
    typography,
    spacing: {
      scale: spacing,
      borderRadius,
      breakpoints,
    },
    shadows: {
      boxShadow: shadows,
      elevation,
    },
  };
}

// ── CSS Variables Export ─────────────────────────────────
export function exportAsCSS(): string {
  const lines: string[] = [];

  lines.push('/* ── Matisse Design System Tokens ── */');
  lines.push('');

  lines.push(':root {');

  lines.push('  /* Typography */');
  for (const [key, val] of Object.entries(typography.fontFamily)) {
    lines.push(`  --matisse-font-family-${key}: ${val};`);
  }
  for (const [key, val] of Object.entries(typography.fontSize)) {
    lines.push(`  --matisse-font-size-${key}: ${val};`);
  }
  for (const [key, val] of Object.entries(typography.fontWeight)) {
    lines.push(`  --matisse-font-weight-${key}: ${val};`);
  }
  for (const [key, val] of Object.entries(typography.lineHeight)) {
    lines.push(`  --matisse-line-height-${key}: ${val};`);
  }

  lines.push('');
  lines.push('  /* Spacing */');
  for (const [key, val] of Object.entries(spacing)) {
    lines.push(`  --matisse-spacing-${key}: ${val};`);
  }

  lines.push('');
  lines.push('  /* Border Radius */');
  for (const [key, val] of Object.entries(borderRadius)) {
    lines.push(`  --matisse-radius-${key}: ${val};`);
  }

  lines.push('');
  lines.push('  /* Shadows */');
  for (const [key, val] of Object.entries(shadows)) {
    if (typeof val === 'string') {
      lines.push(`  --matisse-shadow-${key}: ${val};`);
    }
  }

  lines.push('');
  lines.push('  /* Breakpoints */');
  for (const [key, val] of Object.entries(breakpoints)) {
    lines.push(`  --matisse-breakpoint-${key}: ${val};`);
  }

  lines.push('}');

  // Color themes
  const writeTheme = (theme: 'light' | 'dark') => {
    lines.push('');
    lines.push(`[data-theme="${theme}"] {`);
    const roles = colorRoles[theme] as Record<ColorRoleKey, string>;
    for (const [key, val] of Object.entries(roles)) {
      lines.push(`  --matisse-${key}: ${val};`);
    }
    lines.push('}');
  };

  writeTheme('light');
  writeTheme('dark');

  return lines.join('\n');
}

// ── Tailwind Config Export ───────────────────────────────
export function exportAsTailwindConfig(): string {
  const roles = { ...colorRoles.light };

  return `// Matisse Design System — Tailwind CSS v4 Config
// Paste this into your app.css or tailwind config

@import "tailwindcss";

@theme {
  /* Colors */
${Object.entries(roles)
  .map(([key, val]) => `  --color-${key}: ${val};`)
  .join('\n')}

${Object.entries(typography.fontFamily)
  .map(([key, val]) => `  --font-${key}: ${val};`)
  .join('\n')}

${Object.entries(typography.fontSize)
  .map(([key, val]) => `  --text-${key}: ${val};`)
  .join('\n')}

${Object.entries(spacing)
  .filter(([k]) => !k.includes('.') && !isNaN(Number(k)) || k === 'px')
  .map(([key, val]) => `  --spacing-${key}: ${val};`)
  .join('\n')}

${Object.entries(borderRadius)
  .map(([key, val]) => `  --radius-${key}: ${val};`)
  .join('\n')}
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
${(Object.entries(colorRoles.dark) as [string, string][])
  .map(([key, val]) => `    --color-${key}: ${val};`)
  .join('\n')}
  }
}
`;
}

// ── Flutter / Dart Export ────────────────────────────────
export function exportAsDart(): string {
  const lines: string[] = [];
  lines.push('// Matisse Design System Tokens');
  lines.push('// Generated for Flutter / Dart');
  lines.push('');
  lines.push('class MatisseColors {');
  lines.push('  MatisseColors._();');
  lines.push('');

  const roles = { ...colorRoles.light };
  for (const [key, val] of Object.entries(roles)) {
    const dartKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    const hslMatch = val.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
      const h = parseInt(hslMatch[1]);
      const s = parseInt(hslMatch[2]) / 100;
      const l = parseInt(hslMatch[3]) / 100;
      lines.push(`  static const Color ${dartKey} = Color.fromARGB(255, ${h.toFixed(0)}, ${(s * 255).toFixed(0)}, ${(l * 255).toFixed(0)});`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

export type ExportFormat = 'json' | 'css' | 'tailwind' | 'dart';

export function exportTokens(format: ExportFormat): string {
  switch (format) {
    case 'json':
      return JSON.stringify(exportAsJSON(), null, 2);
    case 'css':
      return exportAsCSS();
    case 'tailwind':
      return exportAsTailwindConfig();
    case 'dart':
      return exportAsDart();
    default:
      return '';
  }
}
