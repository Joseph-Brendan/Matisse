import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Contrast, Activity, Grid3x3, Eye, Sun, Moon,
  Play, Square, Palette, Info
} from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { useColorStore } from '../../store/useColorStore';
import { showToast } from '../../store/useToastStore';
import './Tools.css';

function hexToRgb(hex: string) {
  const c = hex.replace('#', '');
  if (c.length < 6) return null;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function luminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(fg: string, bg: string) {
  const f = hexToRgb(fg); const b = hexToRgb(bg);
  if (!f || !b) return null;
  const l1 = luminance(f.r, f.g, f.b);
  const l2 = luminance(b.r, b.g, b.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getWCAG(ratio: number) {
  if (ratio >= 7) return { level: 'AAA', class: 'aaa', label: 'AAA' };
  if (ratio >= 4.5) return { level: 'AA', class: 'aa', label: 'AA' };
  return { level: 'FAIL', class: 'fail', label: 'FAIL' };
}

const EASINGS: Record<string, string> = {
  'ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
  'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
  'linear': 'linear',
  'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

const COMPARE_EASINGS = ['ease', 'ease-in', 'ease-out', 'spring'];

function parseCubicBezier(value: string) {
  const match = value.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) return null;
  const nums = match[1].split(',').map(Number);
  if (nums.length !== 4 || nums.some(isNaN)) return null;
  return { x1: nums[0], y1: nums[1], x2: nums[2], y2: nums[3] };
}

function EasingCurve({ easing }: { easing: string }) {
  const params = parseCubicBezier(easing);
  if (!params) return null;
  const { x1, y1, x2, y2 } = params;
  const path = `M 0,100 C ${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect x="0" y="0" width="100" height="100" fill="none" />
      <line x1="0" y1="100" x2="100" y2="0" stroke="var(--md-ref-role-outlineVariant)" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="0" y1="0" x2="0" y2="100" stroke="var(--md-ref-role-outlineVariant)" strokeWidth="1" />
      <line x1="0" y1="100" x2="100" y2="100" stroke="var(--md-ref-role-outlineVariant)" strokeWidth="1" />
      <circle cx={x1 * 100} cy={100 - y1 * 100} r="3" fill="var(--md-ref-role-onSurfaceVariant)" />
      <circle cx={x2 * 100} cy={100 - y2 * 100} r="3" fill="var(--md-ref-role-onSurfaceVariant)" />
      <line x1="0" y1="100" x2={x1 * 100} y2={100 - y1 * 100} stroke="var(--md-ref-role-onSurfaceVariant)" strokeWidth="0.5" />
      <line x1="100" y1="0" x2={x2 * 100} y2={100 - y2 * 100} stroke="var(--md-ref-role-onSurfaceVariant)" strokeWidth="0.5" />
      <path d={path} fill="none" stroke="var(--md-ref-role-primary)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const CB_TYPES = [
  { id: 'normal', label: 'Normal', filter: 'none' },
  { id: 'protanopia', label: 'Protanopia', filter: 'url(#protanopia)' },
  { id: 'deuteranopia', label: 'Deuteranopia', filter: 'url(#deuteranopia)' },
  { id: 'tritanopia', label: 'Tritanopia', filter: 'url(#tritanopia)' },
  { id: 'achromatopsia', label: 'Achromatopsia', filter: 'grayscale(1)' },
];

type ToolTab = 'accessibility' | 'motion' | 'grid' | 'colorblind' | 'theme';

const TOOLS: { id: ToolTab; label: string; icon: React.ReactNode }[] = [
  { id: 'accessibility', label: 'Accessibility', icon: <Contrast size={16} /> },
  { id: 'motion', label: 'Motion Lab', icon: <Activity size={16} /> },
  { id: 'grid', label: 'Grid Builder', icon: <Grid3x3 size={16} /> },
  { id: 'colorblind', label: 'Color Blindness', icon: <Eye size={16} /> },
  { id: 'theme', label: 'Theme Studio', icon: <Palette size={16} /> },
];

const BREAKPOINTS = [
  { label: 'sm', width: 640, desc: 'Mobile' },
  { label: 'md', width: 768, desc: 'Tablet' },
  { label: 'lg', width: 1024, desc: 'Desktop' },
  { label: 'xl', width: 1280, desc: 'Wide' },
];

const COLORS = ['var(--md-ref-role-primary)', 'var(--md-ref-role-tertiary)', 'var(--md-ref-role-secondary)', 'var(--md-ref-role-error)'];

export const Tools: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme, roles } = useColorStore();
  const [activeTool, setActiveTool] = useState<ToolTab>('accessibility');

  // Accessibility
  const [fgColor, setFgColor] = useState('#1f2937');
  const [bgColor, setBgColor] = useState('#ffffff');
  const ratio = contrastRatio(fgColor, bgColor);
  const wcag = ratio ? getWCAG(ratio) : null;

  // Motion
  const [activeEasing, setActiveEasing] = useState('ease-in-out');
  const [duration, setDuration] = useState(1500);
  const [animating, setAnimating] = useState(false);

  // Grid
  const [columns, setColumns] = useState(4);
  const [gridGap, setGridGap] = useState(12);
  const [gridMaxWidth, setGridMaxWidth] = useState(1200);
  const [activeBp, setActiveBp] = useState<string | null>(null);

  // Color Blindness
  const [cbType, setCbType] = useState('normal');

  // Theme Studio
  const [searchVal, setSearchVal] = useState('');

  const toggleMotion = useCallback(() => {
    setAnimating(prev => !prev);
  }, []);

  const activeRoles = theme === 'light' ? roles.light : roles.dark;

  const roleSwatches = [
    { label: 'Primary', value: activeRoles?.find(r => r.name === 'primary')?.resolvedValue ?? '' },
    { label: 'On Primary', value: activeRoles?.find(r => r.name === 'onPrimary')?.resolvedValue ?? '' },
    { label: 'Primary Container', value: activeRoles?.find(r => r.name === 'primaryContainer')?.resolvedValue ?? '' },
    { label: 'Secondary', value: activeRoles?.find(r => r.name === 'secondary')?.resolvedValue ?? '' },
    { label: 'Tertiary', value: activeRoles?.find(r => r.name === 'tertiary')?.resolvedValue ?? '' },
    { label: 'Error', value: activeRoles?.find(r => r.name === 'error')?.resolvedValue ?? '' },
    { label: 'Surface', value: activeRoles?.find(r => r.name === 'surface')?.resolvedValue ?? '' },
    { label: 'On Surface', value: activeRoles?.find(r => r.name === 'onSurface')?.resolvedValue ?? '' },
  ];

  const handleBpPreset = (w: number, label: string) => {
    setGridMaxWidth(w);
    setActiveBp(label);
  };

  const handlePrimaryClick = () => {
    showToast('success', 'Primary action clicked');
  };

  const handleSecondaryClick = () => {
    showToast('info', 'Secondary action clicked');
  };

  return (
    <div className="tools-root">
      <header className="tools-header">
        <div className="tools-header-left">
          <GlossyButton variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
            Back
          </GlossyButton>
          <h1>Design Tools</h1>
        </div>
        <GlossyButton
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </GlossyButton>
      </header>

      <div className="tools-body">
        <div className="tools-tabs">
          {TOOLS.map(t => (
            <button
              key={t.id}
              className={`tools-tab-btn${activeTool === t.id ? ' active' : ''}`}
              onClick={() => setActiveTool(t.id)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div className="tools-panel">
          {/* ───────────── ACCESSIBILITY AUDITOR ───────────── */}
          {activeTool === 'accessibility' && (
            <div>
              <div className="tool-card">
                <h2>Accessibility Auditor</h2>
                <p>Check WCAG contrast ratios between any two colors.</p>
                <div className="tool-help">
                  <Info size={16} />
                  <span>Enter two hex colors or use the pickers. Pass AA (4.5:1) for normal text, AAA (7:1) for enhanced contrast.</span>
                </div>
                <div className="tool-grid-2">
                  <div>
                    <label className="field-label">Foreground Color</label>
                    <div className="color-input-row">
                      <div className="color-swatch" style={{ background: fgColor }} />
                      <input type="color" className="color-native-picker" value={fgColor} onChange={e => setFgColor(e.target.value)} />
                      <input type="text" className="color-hex-input" value={fgColor} onChange={e => setFgColor(e.target.value)} placeholder="#1f2937" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Background Color</label>
                    <div className="color-input-row">
                      <div className="color-swatch" style={{ background: bgColor }} />
                      <input type="color" className="color-native-picker" value={bgColor} onChange={e => setBgColor(e.target.value)} />
                      <input type="text" className="color-hex-input" value={bgColor} onChange={e => setBgColor(e.target.value)} placeholder="#ffffff" />
                    </div>
                  </div>
                </div>
              </div>

              {ratio && wcag && (
                <div className="tool-card">
                  <div className="tool-grid-2">
                    <div className="contrast-result">
                      <span className="field-label">Contrast Ratio</span>
                      <span className={`contrast-ratio ${wcag.class}`}>{ratio.toFixed(2)}:1</span>
                      <span className={`contrast-badge ${wcag.class}`}>WCAG {wcag.label}</span>
                    </div>
                    <div className="contrast-result">
                      <span className="field-label">Preview</span>
                      <div className="contrast-preview" style={{ background: bgColor, color: fgColor }}>
                        The quick brown fox jumps over the lazy dog. 123 ABC
                      </div>
                      <span className="field-label">Large Text (18px+ / 14px bold+)</span>
                      <span className={`contrast-badge ${ratio >= 3 ? (ratio >= 4.5 ? 'aaa' : 'aa') : 'fail'}`}>
                        {ratio >= 3 ? (ratio >= 4.5 ? 'AAA Pass' : 'AA Pass') : 'FAIL'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ───────────── MOTION LAB ───────────── */}
          {activeTool === 'motion' && (
            <div>
              <div className="tool-card">
                <h2>Motion Lab</h2>
                <p>Preview and compare easing curves for animations.</p>
                <div className="tool-help">
                  <Info size={16} />
                  <span>Select an easing to see its curve graph. Use the compare section to see multiple easings side by side.</span>
                </div>

                <div className="motion-compare">
                  <div className="motion-col">
                    <label className="field-label">Curve</label>
                    <div className="easing-selector">
                      {Object.keys(EASINGS).map(e => (
                        <button key={e} className={`easing-btn${activeEasing === e ? ' active' : ''}`} onClick={() => setActiveEasing(e)}>
                          {e}
                        </button>
                      ))}
                    </div>
                    <div className="easing-curve-svg">
                      <EasingCurve easing={EASINGS[activeEasing]} />
                    </div>
                    <div className="duration-slider">
                      <input type="range" min="200" max="3000" step="100" value={duration} onChange={e => setDuration(Number(e.target.value))} />
                      <label>{duration}ms</label>
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      <GlossyButton variant="primary" size="sm" onClick={toggleMotion}>
                        {animating ? <Square size={14} /> : <Play size={14} />}
                        {animating ? 'Stop' : 'Animate'}
                      </GlossyButton>
                    </div>
                  </div>

                  <div className="motion-col">
                    <label className="field-label">Compare</label>
                    <div className="motion-lanes">
                      {COMPARE_EASINGS.map((e, i) => (
                        <div key={e} className="motion-lane">
                          <span className="motion-lane-label">{e}</span>
                          <div
                            className={`motion-dot${animating ? ' animate' : ''}`}
                            style={{
                              '--motion-duration': `${duration}ms`,
                              '--motion-easing': EASINGS[e],
                              background: COLORS[i % COLORS.length],
                            } as React.CSSProperties}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───────────── GRID BUILDER ───────────── */}
          {activeTool === 'grid' && (
            <div>
              <div className="tool-card">
                <h2>Grid Builder</h2>
                <p>Design a responsive grid and preview it at different breakpoints.</p>
                <div className="tool-help">
                  <Info size={16} />
                  <span>Adjust columns, gap, and max-width. Use the breakpoint presets to preview responsive behavior.</span>
                </div>

                <div className="grid-controls">
                  <div className="grid-control">
                    <label>Columns</label>
                    <input type="range" min="1" max="12" value={columns} onChange={e => setColumns(Number(e.target.value))} />
                    <span className="value">{columns}</span>
                  </div>
                  <div className="grid-control">
                    <label>Gap</label>
                    <input type="range" min="0" max="48" step="4" value={gridGap} onChange={e => setGridGap(Number(e.target.value))} />
                    <span className="value">{gridGap}px</span>
                  </div>
                  <div className="grid-control">
                    <label>Max Width</label>
                    <input type="range" min="640" max="1440" step="80" value={gridMaxWidth} onChange={e => { setGridMaxWidth(Number(e.target.value)); setActiveBp(null); }} />
                    <span className="value">{gridMaxWidth}px</span>
                  </div>
                </div>

                <label className="field-label" style={{ marginBottom: '0.5rem' }}>Breakpoint Presets</label>
                <div className="breakpoint-presets">
                  {BREAKPOINTS.map(bp => (
                    <button key={bp.label} className={`bp-btn${activeBp === bp.label ? ' active' : ''}`} onClick={() => handleBpPreset(bp.width, bp.label)}>
                      {bp.label} <span style={{ opacity: 0.6 }}>({bp.width}px)</span>
                    </button>
                  ))}
                </div>

                <div className="grid-canvas" style={{ maxWidth: `${gridMaxWidth}px` }}>
                  <span className="bp-label">Container: {gridMaxWidth}px &middot; {columns}-col grid &middot; {gridGap}px gap</span>
                  <div className="grid-demo" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${gridGap}px` }}>
                    {Array.from({ length: columns }).map((_, i) => (
                      <div key={i} className="grid-cell">{i + 1}</div>
                    ))}
                    {Array.from({ length: Math.min(columns, 3) }).map((_, i) => {
                      const span = Math.max(1, Math.floor(columns / (i + 2)));
                      return <div key={`span-${i}`} className="grid-cell" style={{ gridColumn: `span ${span}` }}>Span {span}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───────────── COLOR BLINDNESS SIMULATOR ───────────── */}
          {activeTool === 'colorblind' && (
            <div>
              <div className="tool-card">
                <h2>Color Blindness Simulator</h2>
                <p>Preview your current theme colors under different types of color vision deficiency.</p>
                <div className="tool-help">
                  <Info size={16} />
                  <span>Select a deficiency type to apply the filter. Colors are read directly from your current theme. Switch the app theme to test both light and dark modes.</span>
                </div>

                <svg width="0" height="0" style={{ position: 'absolute' }}>
                  <filter id="protanopia" colorInterpolationFilters="linearRGB">
                    <feColorMatrix type="matrix" values="
                      0.152286,1.052583,-0.204868,0,0
                      0.114503,0.786281,0.099216,0,0
                      -0.003882,-0.048116,1.051998,0,0
                      0,0,0,1,0" />
                  </filter>
                  <filter id="deuteranopia" colorInterpolationFilters="linearRGB">
                    <feColorMatrix type="matrix" values="
                      0.367322,0.860646,-0.227968,0,0
                      0.280085,0.672501,0.047413,0,0
                      -0.011820,0.042940,0.968881,0,0
                      0,0,0,1,0" />
                  </filter>
                  <filter id="tritanopia" colorInterpolationFilters="linearRGB">
                    <feColorMatrix type="matrix" values="
                      1.255528,-0.076749,-0.178779,0,0
                      -0.078411,0.930809,0.147602,0,0
                      0.004733,-0.569765,1.565032,0,0
                      0,0,0,1,0" />
                  </filter>
                </svg>

                <div className="cb-toolbar">
                  {CB_TYPES.map(cb => (
                    <button key={cb.id} className={`cb-btn${cbType === cb.id ? ' active' : ''}`} onClick={() => setCbType(cb.id)}>
                      {cb.label}
                    </button>
                  ))}
                </div>

                <div className={`cb-preview-area cb-${cbType}`}>
                  {roleSwatches.map(s => (
                    <div key={s.label} className="cb-swatch-card">
                      <div className="cb-swatch" style={{ background: s.value }} />
                      <span className="cb-swatch-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ───────────── THEME STUDIO ───────────── */}
          {activeTool === 'theme' && (
            <div>
              <div className="tool-card">
                <h2>Theme Studio</h2>
                <p>See how your light and dark tokens render a real UI side by side. Try typing in the input or clicking the buttons.</p>
                <div className="tool-help">
                  <Info size={16} />
                  <span>Both cards use your current design tokens. The input accepts text, and buttons trigger toast notifications to show interactivity.</span>
                </div>

                <div className="theme-studio-split">
                  <div className="theme-preview-card" style={{ background: 'var(--md-ref-role-surface)', color: 'var(--md-ref-role-onSurface)' }} data-theme="light">
                    <div className="theme-preview-header">
                      <Sun size={14} />
                      Light Theme
                    </div>
                    <div className="theme-preview-body">
                      <h3 className="theme-preview-title">Project Dashboard</h3>
                      <p className="theme-preview-text">Welcome back! Try typing in the search field below.</p>
                      <input className="theme-preview-input" placeholder="Search tokens..." value={searchVal} onChange={e => setSearchVal(e.target.value)} />
                      <div className="theme-preview-btn-row">
                        <button className="theme-preview-btn" style={{ background: 'var(--md-ref-role-primary)', color: 'var(--md-ref-role-onPrimary)' }} onClick={handlePrimaryClick}>
                          Primary
                        </button>
                        <button className="theme-preview-btn" style={{ background: 'var(--md-ref-role-secondaryContainer)', color: 'var(--md-ref-role-onSecondaryContainer)' }} onClick={handleSecondaryClick}>
                          Secondary
                        </button>
                        <button className="theme-preview-btn" style={{ background: 'transparent', color: 'var(--md-ref-role-onSurface)', border: '1px solid var(--md-ref-role-outline)' }}>
                          Outline
                        </button>
                      </div>
                      <div className="theme-preview-card-stack">
                        {[
                          { name: 'Elena Rostova', role: 'Design Lead', color: 'var(--md-ref-role-primary)' },
                          { name: 'Marcus Chen', role: 'Frontend Engineer', color: 'var(--md-ref-role-tertiary)' },
                          { name: 'Sarah Jenkins', role: 'Product Manager', color: 'var(--md-ref-role-secondary)' },
                        ].map(p => (
                          <div key={p.name} className="theme-mini-card">
                            <div className="theme-mini-card-avatar" style={{ background: p.color }}>{p.name.charAt(0)}</div>
                            <div className="theme-mini-card-content">
                              <p className="theme-mini-card-name">{p.name}</p>
                              <p className="theme-mini-card-role">{p.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="theme-preview-card" style={{ background: 'var(--md-ref-role-surface)', color: 'var(--md-ref-role-onSurface)' }} data-theme="dark">
                    <div className="theme-preview-header">
                      <Moon size={14} />
                      Dark Theme
                    </div>
                    <div className="theme-preview-body">
                      <h3 className="theme-preview-title">Project Dashboard</h3>
                      <p className="theme-preview-text">Welcome back! Try typing in the search field below.</p>
                      <input className="theme-preview-input" placeholder="Search tokens..." value={searchVal} onChange={e => setSearchVal(e.target.value)} />
                      <div className="theme-preview-btn-row">
                        <button className="theme-preview-btn" style={{ background: 'var(--md-ref-role-primary)', color: 'var(--md-ref-role-onPrimary)' }} onClick={handlePrimaryClick}>
                          Primary
                        </button>
                        <button className="theme-preview-btn" style={{ background: 'var(--md-ref-role-secondaryContainer)', color: 'var(--md-ref-role-onSecondaryContainer)' }} onClick={handleSecondaryClick}>
                          Secondary
                        </button>
                        <button className="theme-preview-btn" style={{ background: 'transparent', color: 'var(--md-ref-role-onSurface)', border: '1px solid var(--md-ref-role-outline)' }}>
                          Outline
                        </button>
                      </div>
                      <div className="theme-preview-card-stack">
                        {[
                          { name: 'Elena Rostova', role: 'Design Lead', color: 'var(--md-ref-role-primary)' },
                          { name: 'Marcus Chen', role: 'Frontend Engineer', color: 'var(--md-ref-role-tertiary)' },
                          { name: 'Sarah Jenkins', role: 'Product Manager', color: 'var(--md-ref-role-secondary)' },
                        ].map(p => (
                          <div key={p.name} className="theme-mini-card">
                            <div className="theme-mini-card-avatar" style={{ background: p.color }}>{p.name.charAt(0)}</div>
                            <div className="theme-mini-card-content">
                              <p className="theme-mini-card-name">{p.name}</p>
                              <p className="theme-mini-card-role">{p.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
