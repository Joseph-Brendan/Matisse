# Matisse — Design System

A comprehensive design system built with React, TypeScript, and Vite. Features a full Material 3 tonal palette, glossy component library, multi-format token export, and a color token builder powered by Google's HCT color science.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19 + TypeScript |
| Build | Vite 8 |
| State | Zustand 5 |
| Color Science | @material/material-color-utilities |
| Icons | lucide-react |
| Color Picker | react-colorful |
| Font | Open Sans + Playfair Display |
| Routing | react-router-dom |

## Project Structure

```
m3-color-token-builder/
├── src/
│   ├── design-system/
│   │   ├── tokens/
│   │   │   ├── colors.ts         # Full M3 tonal palette + light/dark roles
│   │   │   ├── typography.ts     # Open Sans scale (11 sizes, 8 weights)
│   │   │   ├── spacing.ts        # 4px spacing scale + radii + breakpoints
│   │   │   └── shadows.ts        # Box shadows + elevation system
│   │   ├── components/
│   │   │   ├── Button/           # GlossyButton (6 variants, 5 sizes)
│   │   │   ├── Alert/            # Alert (4 variants, dismissible)
│   │   │   ├── Modal/            # Modal (5 sizes, animated)
│   │   │   ├── Toast/            # Toast (4 variants, zustand-backed)
│   │   │   ├── Tabs/             # Tabs (underline/pills/segmented)
│   │   │   ├── Badge/            # Badge (8 colors, dot, removable)
│   │   │   ├── Card/             # Card (elevated/filled/outlined)
│   │   │   └── Input/            # Input (3 variants, password toggle)
│   │   └── utils/
│   │       └── cn.ts             # clsx + tailwind-merge utility
│   ├── pages/
│   │   ├── Landing/              # Hero + feature grid + button showcase
│   │   ├── Auth/                 # Login + Signup with segmented tabs
│   │   ├── Dashboard/            # Sidebar + stats + projects
│   │   └── ColorBuilder/         # M3 color token builder tool
│   ├── components/               # Legacy color builder components
│   ├── store/
│   │   ├── useColorStore.ts      # Color state (seed colors, palettes, roles)
│   │   └── useToastStore.ts      # Toast notification state
│   ├── lib/
│   │   ├── designTokens.ts       # Export: JSON, CSS, Tailwind, Dart
│   │   ├── material.ts           # HCT color palette generation
│   │   ├── colorUtils.ts         # HSL/hex conversion
│   │   └── defaults.ts           # Default key colors + role mappings
│   └── types/
│       └── index.ts              # TypeScript type definitions
```

## Getting Started

```bash
cd m3-color-token-builder
npm install
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Design Tokens

### Color System

The color system is based on Material 3's HCT color science. Each key color generates a 18-step tonal palette (0–100). Semantic role tokens map these palette tones to UI roles for both light and dark themes.

**Key Colors:**
| Role | Tone 40 | Hex |
|------|---------|-----|
| Primary | hsl(256, 34%, 48%) | #5F4F9A |
| Secondary | hsl(259, 11%, 40%) | #655C6F |
| Tertiary | hsl(340, 21%, 41%) | #7D525F |
| Neutral | hsl(276, 3%, 37%) | #5E5B60 |
| Neutral Variant | hsl(260, 4%, 38%) | #5E5A65 |

### Typography

- **Primary:** Open Sans — 300 to 800 weight range
- **Display:** Playfair Display (italic, 600 weight)
- **Mono:** JetBrains Mono for code

### Spacing

4px-based scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128

## Components

### GlossyButton

Six glossy variants with gradient backgrounds and subtle shine overlay.

| Variant | Usage |
|---------|-------|
| `primary` | Primary actions (brand color) |
| `secondary` | Secondary actions |
| `tertiary` | Tertiary/alternative actions |
| `error` | Destructive actions |
| `ghost` | Low-emphasis, no border |
| `outline` | Medium-emphasis, bordered |

All variants support: 5 sizes (xs–xl), loading spinner, left/right icons, fullWidth, and disabled state.

### Alert

Four variants (`info`, `success`, `warning`, `error`) with optional title, dismiss button, auto-close timer, and custom icon.

### Modal

Five sizes (`sm`–`full`) with animated overlay, keyboard dismiss (Escape), click-outside-to-close, optional footer, and close button.

### Toast

Zustand-powered notification system with `info`, `success`, `warning`, `error` variants. Auto-dismiss with configurable duration. Accessible via `showToast(variant, message, title?, duration?)`.

### Tabs

Three variants (`underline`, `pills`, `segmented`) with optional badges, icons, and disabled tabs. Controlled or uncontrolled usage.

## Export Formats

The design system can export tokens in multiple formats via `src/lib/designTokens.ts`:

| Format | Function | Use Case |
|--------|----------|----------|
| JSON | `exportAsJSON()` | Programmatic consumption |
| CSS | `exportAsCSS()` | Drop-in CSS custom properties |
| Tailwind | `exportAsTailwindConfig()` | Tailwind CSS v4 theme |
| Dart | `exportAsDart()` | Flutter mobile apps |

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Landing | Hero, button showcase, features |
| `/auth` | Auth | Login + Signup with tab switch |
| `/dashboard` | Dashboard | Stats, projects, activity |
| `/color-builder` | Color Builder | M3 color token editor |

## Theming

Toggle between light and dark themes via the dashboard's theme switch or programmatically through `useColorStore`. All components automatically respond to `[data-theme]` attribute changes.

## License

MIT © Joseph Brendan
