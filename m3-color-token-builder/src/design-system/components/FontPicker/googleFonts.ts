/**
 * Curated list of popular Google Fonts.
 * Covers the most-used families across sans-serif, serif, mono, display and handwriting categories.
 * Source: fonts.google.com — top 200 by popularity.
 */

export type FontCategory = 'sans-serif' | 'serif' | 'monospace' | 'display' | 'handwriting';

export interface GoogleFont {
  family: string;
  category: FontCategory;
  variants?: string; // e.g. "300;400;500;600;700" for the API weight query
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // ── Sans-serif ──────────────────────────────────────────────────────────
  { family: 'Inter', category: 'sans-serif', variants: '300;400;500;600;700;800' },
  { family: 'Roboto', category: 'sans-serif', variants: '300;400;500;700;900' },
  { family: 'Open Sans', category: 'sans-serif', variants: '300;400;500;600;700;800' },
  { family: 'Lato', category: 'sans-serif', variants: '300;400;700;900' },
  { family: 'Poppins', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Montserrat', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Nunito', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Outfit', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Plus Jakarta Sans', category: 'sans-serif', variants: '300;400;500;600;700;800' },
  { family: 'DM Sans', category: 'sans-serif', variants: '300;400;500;600;700' },
  { family: 'Raleway', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Ubuntu', category: 'sans-serif', variants: '300;400;500;700' },
  { family: 'Noto Sans', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Source Sans 3', category: 'sans-serif', variants: '300;400;500;600;700;900' },
  { family: 'Mulish', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Quicksand', category: 'sans-serif', variants: '300;400;500;600;700' },
  { family: 'Rubik', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Work Sans', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Figtree', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Manrope', category: 'sans-serif', variants: '200;300;400;500;600;700;800' },
  { family: 'Karla', category: 'sans-serif', variants: '300;400;500;600;700;800' },
  { family: 'IBM Plex Sans', category: 'sans-serif', variants: '300;400;500;600;700' },
  { family: 'Josefin Sans', category: 'sans-serif', variants: '300;400;500;600;700' },
  { family: 'Cabin', category: 'sans-serif', variants: '400;500;600;700' },
  { family: 'Barlow', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Exo 2', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Hind', category: 'sans-serif', variants: '300;400;500;600;700' },
  { family: 'Titillium Web', category: 'sans-serif', variants: '300;400;600;700;900' },
  { family: 'Oxygen', category: 'sans-serif', variants: '300;400;700' },
  { family: 'Catamaran', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Asap', category: 'sans-serif', variants: '300;400;500;600;700' },
  { family: 'Heebo', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Jost', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Be Vietnam Pro', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Sora', category: 'sans-serif', variants: '300;400;500;600;700;800' },
  { family: 'Lexend', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Urbanist', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Nunito Sans', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Overpass', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Fira Sans', category: 'sans-serif', variants: '300;400;500;600;700;800;900' },

  // ── Serif ────────────────────────────────────────────────────────────────
  { family: 'Merriweather', category: 'serif', variants: '300;400;700;900' },
  { family: 'Playfair Display', category: 'serif', variants: '400;500;600;700;800;900' },
  { family: 'Lora', category: 'serif', variants: '400;500;600;700' },
  { family: 'PT Serif', category: 'serif', variants: '400;700' },
  { family: 'EB Garamond', category: 'serif', variants: '400;500;600;700;800' },
  { family: 'Crimson Text', category: 'serif', variants: '400;600;700' },
  { family: 'Libre Baskerville', category: 'serif', variants: '400;700' },
  { family: 'Cormorant Garamond', category: 'serif', variants: '300;400;500;600;700' },
  { family: 'Spectral', category: 'serif', variants: '300;400;500;600;700;800' },
  { family: 'Noto Serif', category: 'serif', variants: '400;700' },
  { family: 'Source Serif 4', category: 'serif', variants: '300;400;500;600;700;900' },
  { family: 'Bitter', category: 'serif', variants: '300;400;500;600;700;800;900' },
  { family: 'Cardo', category: 'serif', variants: '400;700' },
  { family: 'Domine', category: 'serif', variants: '400;500;600;700' },
  { family: 'Arvo', category: 'serif', variants: '400;700' },
  { family: 'Zilla Slab', category: 'serif', variants: '300;400;500;600;700' },
  { family: 'Fraunces', category: 'serif', variants: '300;400;500;600;700;800;900' },
  { family: 'DM Serif Display', category: 'serif', variants: '400' },
  { family: 'Italiana', category: 'serif', variants: '400' },
  { family: 'Frank Ruhl Libre', category: 'serif', variants: '300;400;500;700;900' },

  // ── Monospace ────────────────────────────────────────────────────────────
  { family: 'JetBrains Mono', category: 'monospace', variants: '300;400;500;600;700;800' },
  { family: 'Fira Code', category: 'monospace', variants: '300;400;500;600;700' },
  { family: 'Source Code Pro', category: 'monospace', variants: '300;400;500;600;700;900' },
  { family: 'Roboto Mono', category: 'monospace', variants: '300;400;500;600;700' },
  { family: 'IBM Plex Mono', category: 'monospace', variants: '300;400;500;600;700' },
  { family: 'Space Mono', category: 'monospace', variants: '400;700' },
  { family: 'Inconsolata', category: 'monospace', variants: '300;400;500;600;700;800;900' },
  { family: 'Courier Prime', category: 'monospace', variants: '400;700' },
  { family: 'DM Mono', category: 'monospace', variants: '300;400;500' },
  { family: 'Noto Sans Mono', category: 'monospace', variants: '300;400;500;600;700;800;900' },
  { family: 'Red Hat Mono', category: 'monospace', variants: '300;400;500;600;700' },

  // ── Display ──────────────────────────────────────────────────────────────
  { family: 'Bebas Neue', category: 'display', variants: '400' },
  { family: 'Righteous', category: 'display', variants: '400' },
  { family: 'Abril Fatface', category: 'display', variants: '400' },
  { family: 'Archivo Black', category: 'display', variants: '400' },
  { family: 'Anton', category: 'display', variants: '400' },
  { family: 'Oswald', category: 'display', variants: '300;400;500;600;700' },
  { family: 'Russo One', category: 'display', variants: '400' },
  { family: 'Teko', category: 'display', variants: '300;400;500;600;700' },
  { family: 'Alfa Slab One', category: 'display', variants: '400' },
  { family: 'Black Han Sans', category: 'display', variants: '400' },
  { family: 'Cinzel', category: 'display', variants: '400;500;600;700;800;900' },
  { family: 'Yeseva One', category: 'display', variants: '400' },
  { family: 'Syne', category: 'display', variants: '400;500;600;700;800' },
  { family: 'Climate Crisis', category: 'display', variants: '400' },
  { family: 'Dela Gothic One', category: 'display', variants: '400' },

  // ── Handwriting ──────────────────────────────────────────────────────────
  { family: 'Dancing Script', category: 'handwriting', variants: '400;500;600;700' },
  { family: 'Pacifico', category: 'handwriting', variants: '400' },
  { family: 'Caveat', category: 'handwriting', variants: '400;500;600;700' },
  { family: 'Satisfy', category: 'handwriting', variants: '400' },
  { family: 'Great Vibes', category: 'handwriting', variants: '400' },
  { family: 'Kaushan Script', category: 'handwriting', variants: '400' },
  { family: 'Permanent Marker', category: 'handwriting', variants: '400' },
  { family: 'Cookie', category: 'handwriting', variants: '400' },
  { family: 'Courgette', category: 'handwriting', variants: '400' },
  { family: 'Sacramento', category: 'handwriting', variants: '400' },
  { family: 'Yellowtail', category: 'handwriting', variants: '400' },
  { family: 'Marck Script', category: 'handwriting', variants: '400' },
];

export const CATEGORY_LABELS: Record<FontCategory, string> = {
  'sans-serif': 'Sans-serif',
  'serif': 'Serif',
  'monospace': 'Monospace',
  'display': 'Display',
  'handwriting': 'Handwriting',
};

/** Build the Google Fonts embed URL for a given family + weights */
export function googleFontsUrl(family: string, variants = '400;700'): string {
  const encoded = encodeURIComponent(family).replace(/%20/g, '+');
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@${variants}&display=swap`;
}
