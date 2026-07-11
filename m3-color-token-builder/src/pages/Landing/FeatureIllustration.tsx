import React from 'react';

/* ── Shared primitive components ── */

const s: { [key: string]: React.CSSProperties } = {
  base: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  panel: {
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  chip: {
    borderRadius: 6,
    padding: '3px 8px',
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
  badge: {
    borderRadius: 20,
    padding: '2px 10px',
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
  },
};

/* ── 1. Build Your Color System ── */
export const ColorSystemIllustration: React.FC = () => (
  <div style={s.base}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', alignItems: 'center' }}>
      {/* Swatch row */}
      <div style={{ display: 'flex', gap: 6, width: '100%', justifyContent: 'center' }}>
        {[
          { hue: 260, name: 'Primary' },
          { hue: 170, name: 'Secondary' },
          { hue: 330, name: 'Tertiary' },
          { hue: 0, name: 'Error' },
        ].map((c, i) => (
          <div key={i} style={{ ...s.panel, background: '#fff', padding: 6, width: 52, textAlign: 'center' as const }}>
            <div style={{ height: 22, borderRadius: 5, background: `hsl(${c.hue}, 34%, 50%)`, marginBottom: 4 }} />
            <div style={{ fontSize: 8, fontWeight: 500, color: '#666' }}>{c.name}</div>
          </div>
        ))}
      </div>
      {/* Token chips card */}
      <div style={{ ...s.panel, background: 'rgba(255,255,255,0.75)', padding: '7px 10px', width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {['--md-primary', '--md-secondary', '--md-surface', '--md-outline'].map((t, i) => (
            <span key={i} style={{ ...s.chip, background: `color-mix(in srgb, var(--icon-color) 12%, white)`, color: 'var(--icon-color)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      {/* Floating swatch */}
      <div style={{ ...s.panel, position: 'absolute', top: 4, right: 6, background: 'rgba(255,255,255,0.85)', padding: '5px 7px', display: 'flex', gap: 3 }}>
        {[260, 260, 260].map((h, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 3, background: `hsl(${h}, 34%, ${60 + i * 10}%)` }} />
        ))}
      </div>
      {/* Neutral swatches */}
      <div style={{ display: 'flex', gap: 3 }}>
        {['#f9f9fb', '#e8e8ee', '#c4c4cd', '#909099', '#50505a'].map((c, i) => (
          <div key={i} style={{ width: 18, height: 10, borderRadius: 3, background: c, border: '1px solid rgba(0,0,0,0.04)' }} />
        ))}
      </div>
    </div>
  </div>
);

/* ── 2. Create a Scalable Typography System ── */
export const TypographyIllustration: React.FC = () => (
  <div style={s.base}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%', alignItems: 'center' }}>
      {/* Type scale card */}
      <div style={{ ...s.panel, background: 'rgba(255,255,255,0.78)', padding: '8px 12px', width: '100%' }}>
        {[
          { size: 22, weight: 700, label: 'Heading XL' },
          { size: 16, weight: 600, label: 'Heading Lg' },
          { size: 13, weight: 500, label: 'Body Text' },
          { size: 10, weight: 400, label: 'Caption' },
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1px 0' }}>
            <span style={{ fontSize: t.size, fontWeight: t.weight, color: '#333' }}>{t.label}</span>
            <span style={{ fontSize: 8, color: '#999' }}>{t.size}px</span>
          </div>
        ))}
      </div>
      {/* Weight chips */}
      <div style={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}>
        {['Light 300', 'Regular 400', 'Medium 500', 'Bold 700'].map((w, i) => (
          <span key={i} style={{ ...s.chip, background: `color-mix(in srgb, var(--icon-color) 10%, white)`, color: 'var(--icon-color)', fontWeight: 300 + i * 200, fontSize: 8 }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ── 3. Design Reusable Components ── */
export const ComponentsIllustration: React.FC = () => (
  <div style={s.base}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', alignItems: 'center' }}>
      {/* Component row */}
      <div style={{ display: 'flex', gap: 5, width: '100%', justifyContent: 'center' }}>
        {[
          { label: 'Button', w: 44 },
          { label: 'Chip', w: 36 },
          { label: 'Badge', w: 40 },
        ].map((c, i) => (
          <div key={i} style={{ ...s.panel, background: `color-mix(in srgb, var(--icon-color) 10%, white)`, padding: '5px 0', width: c.w, textAlign: 'center' as const, borderColor: 'rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: 8, fontWeight: 600, color: 'var(--icon-color)' }}>{c.label}</span>
          </div>
        ))}
      </div>
      {/* Input + card row */}
      <div style={{ display: 'flex', gap: 6, width: '100%', justifyContent: 'center' }}>
        <div style={{ ...s.panel, background: 'rgba(255,255,255,0.75)', padding: '6px 8px', flex: 1, maxWidth: 70 }}>
          <div style={{ fontSize: 7, color: '#999', marginBottom: 3 }}>Input</div>
          <div style={{ height: 10, borderRadius: 4, background: '#f0f0f5', border: '1px solid #e0e0e8' }} />
        </div>
        <div style={{ ...s.panel, background: 'rgba(255,255,255,0.75)', padding: '6px 8px', flex: 1, maxWidth: 60 }}>
          <div style={{ height: 8, borderRadius: 3, background: `color-mix(in srgb, var(--icon-color) 20%, white)`, marginBottom: 3, width: '60%' }} />
          <div style={{ height: 4, borderRadius: 2, background: '#eee', width: '90%' }} />
        </div>
      </div>
      {/* Toggle + Icon row */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <div style={{ width: 20, height: 10, borderRadius: 10, background: 'var(--icon-color)', position: 'relative' as const }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', position: 'absolute', top: 1, right: 1 }} />
        </div>
        <div style={{ width: 14, height: 14, borderRadius: 4, background: `color-mix(in srgb, var(--icon-color) 15%, white)`, border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: 1, background: 'var(--icon-color)' }} />
        </div>
        <span style={{ ...s.badge, background: `color-mix(in srgb, var(--icon-color) 12%, white)`, color: 'var(--icon-color)' }}>New</span>
      </div>
    </div>
  </div>
);

/* ── 4. Define Spacing & Layout ── */
export const SpacingIllustration: React.FC = () => (
  <div style={s.base}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, width: '100%', alignItems: 'center' }}>
      {/* Grid overlay */}
      <div style={{ ...s.panel, background: 'rgba(255,255,255,0.7)', padding: '7px 10px', width: '100%' }}>
        <div style={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 22, borderRadius: 4, background: `color-mix(in srgb, var(--icon-color) ${8 + i * 2}%, white)`, border: '1px solid rgba(0,0,0,0.03)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, padding: '0 2px' }}>
          {['4px', '8px', '16px', '32px', '64px'].map((s, i) => (
            <span key={i} style={{ fontSize: 7, color: '#888', fontWeight: 500 }}>{s}</span>
          ))}
        </div>
      </div>
      {/* Spacing tokens */}
      <div style={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}>
        {[
          { label: '--space-xs', v: 4 },
          { label: '--space-sm', v: 8 },
          { label: '--space-md', v: 16 },
          { label: '--space-lg', v: 32 },
        ].map((t, i) => (
          <span key={i} style={{ ...s.chip, background: `color-mix(in srgb, var(--icon-color) 8%, white)`, color: 'var(--icon-color)', fontSize: 7 }}>
            {t.label}
          </span>
        ))}
      </div>
      {/* Ruler */}
      <div style={{ ...s.panel, background: 'rgba(255,255,255,0.6)', padding: '3px 8px', width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
        <div style={{ width: 4, height: 6, borderRadius: 1, background: 'var(--icon-color)', opacity: 0.3 }} />
        <div style={{ flex: 1, height: 2, background: 'var(--icon-color)', opacity: 0.15, borderRadius: 1 }} />
        <div style={{ width: 4, height: 6, borderRadius: 1, background: 'var(--icon-color)', opacity: 0.3 }} />
        <span style={{ fontSize: 7, color: '#999', margin: '0 4px' }}>8px</span>
        <div style={{ width: 4, height: 6, borderRadius: 1, background: 'var(--icon-color)', opacity: 0.3 }} />
        <div style={{ flex: 1, height: 2, background: 'var(--icon-color)', opacity: 0.15, borderRadius: 1 }} />
        <div style={{ width: 4, height: 6, borderRadius: 1, background: 'var(--icon-color)', opacity: 0.3 }} />
      </div>
    </div>
  </div>
);

/* ── 5. Export Developer-Ready Tokens ── */
export const ExportIllustration: React.FC = () => (
  <div style={s.base}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', alignItems: 'center' }}>
      {/* JSON panel */}
      <div style={{ ...s.panel, background: 'rgba(255,255,255,0.82)', padding: '7px 10px', width: '100%', fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 7 }}>
        {[
          { k: 'primary', v: 'hsl(260,34%,48%)' },
          { k: 'spacing', v: '4px' },
          { k: 'borderRadius', v: '12px' },
          { k: 'fontFamily', v: 'Inter, sans-serif' },
        ].map((t, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, padding: '1px 0' }}>
            <span style={{ color: '#881391' }}>"{t.k}"</span>
            <span style={{ color: '#888' }}>:</span>
            <span style={{ color: '#1a7a5a' }}>"{t.v}"</span>
            {i < 3 && <span style={{ color: '#ccc' }}>,</span>}
          </div>
        ))}
      </div>
      {/* Export button + success */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <div style={{ ...s.panel, background: 'var(--icon-color)', padding: '4px 14px' }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#fff' }}>Export</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <span style={{ fontSize: 8, color: '#22c55e', fontWeight: 600 }}>Exported</span>
        </div>
      </div>
      {/* Floating token chips */}
      <div style={{ position: 'absolute', bottom: 4, left: 6, display: 'flex', gap: 3 }}>
        {['JSON', 'CSS', 'Tailwind'].map((f, i) => (
          <span key={i} style={{ ...s.chip, background: `color-mix(in srgb, var(--icon-color) 10%, white)`, color: 'var(--icon-color)', fontSize: 7, padding: '2px 6px' }}>{f}</span>
        ))}
      </div>
    </div>
  </div>
);

/* ── 6. Track Every Version ── */
export const VersionHistoryIllustration: React.FC = () => (
  <div style={s.base}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', alignItems: 'center' }}>
      {[
        { v: 'v2.3.0', tag: 'Latest', color: 'var(--icon-color)' },
        { v: 'v2.2.0', tag: '', color: '#aaa' },
        { v: 'v2.1.0', tag: 'Stable', color: '#aaa' },
        { v: 'v2.0.0', tag: '', color: '#aaa' },
      ].map((ver, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '2px 6px', position: 'relative' as const }}>
          {/* Timeline line */}
          {i < 3 && <div style={{ position: 'absolute', left: 12, top: 14, width: 2, height: 12, background: '#e0e0e8', zIndex: 0 }} />}
          {/* Dot */}
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: ver.color, border: '2px solid rgba(255,255,255,0.8)', zIndex: 1, flexShrink: 0 }} />
          {/* Version card */}
          <div style={{ ...s.panel, background: 'rgba(255,255,255,0.72)', padding: '3px 8px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: '#333' }}>{ver.v}</span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {ver.tag && <span style={{ ...s.badge, background: i === 0 ? `color-mix(in srgb, var(--icon-color) 15%, white)` : '#f0f0f5', color: i === 0 ? 'var(--icon-color)' : '#888', fontSize: 7, padding: '1px 7px' }}>{ver.tag}</span>}
              {i === 0 && <span style={{ fontSize: 8, color: '#999', cursor: 'default' }}>↻</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── 8. Preview Your Design System ── */
export const PreviewIllustration: React.FC = () => (
  <div style={s.base}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', alignItems: 'center' }}>
      {/* Preview window */}
      <div style={{ ...s.panel, background: 'rgba(255,255,255,0.78)', padding: '6px 8px', width: '100%' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 5 }}>
          {['Colors', 'Type', 'Spacing', 'Components'].map((tab, i) => (
            <span key={i} style={{ fontSize: 7, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: i === 0 ? 'var(--icon-color)' : 'transparent', color: i === 0 ? '#fff' : '#999' }}>{tab}</span>
          ))}
        </div>
        {/* Preview content */}
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
              {[260, 170, 330].map((h, i) => (
                <div key={i} style={{ flex: 1, height: 8, borderRadius: 3, background: `hsl(${h}, 34%, 50%)` }} />
              ))}
            </div>
            <div style={{ height: 4, borderRadius: 2, background: '#eee', width: '80%', marginBottom: 3 }} />
            <div style={{ height: 4, borderRadius: 2, background: '#eee', width: '60%', marginBottom: 3 }} />
            <div style={{ display: 'flex', gap: 3 }}>
              <div style={{ flex: 1, height: 10, borderRadius: 4, background: `color-mix(in srgb, var(--icon-color) 20%, white)`, border: '1px solid rgba(0,0,0,0.04)' }} />
              <div style={{ width: 24, height: 10, borderRadius: 4, background: 'var(--icon-color)' }} />
            </div>
          </div>
          <div style={{ width: 40, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 14, borderRadius: 5, background: '#f0f0f5', border: '1px solid rgba(0,0,0,0.04)', padding: 2 }}>
              <div style={{ height: 4, borderRadius: 2, background: `color-mix(in srgb, var(--icon-color) 20%, white)`, width: '70%' }} />
            </div>
            <div style={{ height: 16, borderRadius: 5, background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.04)', padding: 2 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--icon-color)' }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ccc' }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ccc' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Status badges */}
      <div style={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}>
        <span style={{ ...s.badge, background: '#22c55e', color: '#fff', fontSize: 7, padding: '1px 7px' }}>● Live</span>
        <span style={{ ...s.badge, background: `color-mix(in srgb, var(--icon-color) 10%, white)`, color: 'var(--icon-color)', fontSize: 7, padding: '1px 7px' }}>Synced</span>
        <span style={{ ...s.badge, background: '#f0f0f5', color: '#888', fontSize: 7, padding: '1px 7px' }}>Ready</span>
      </div>
    </div>
  </div>
);

/* ── 7. Start Faster with Smart Presets ── */
export const PresetsIllustration: React.FC = () => {
  const presets = [
    { name: 'Fintech', hue: 220, selected: false },
    { name: 'Health', hue: 160, selected: false },
    { name: 'E-com', hue: 30, selected: false },
  ];
  return (
    <div style={s.base}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', alignItems: 'center' }}>
        {/* Preset cards row */}
        <div style={{ display: 'flex', gap: 5, width: '100%', justifyContent: 'center' }}>
          {presets.map((p, i) => (
            <div key={i} style={{ ...s.panel, background: 'rgba(255,255,255,0.72)', padding: '5px 6px', width: 50, textAlign: 'center' as const }}>
              <div style={{ height: 18, borderRadius: 5, background: `hsl(${p.hue}, 30%, 92%)`, marginBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 12, height: 8, borderRadius: 2, background: `hsl(${p.hue}, 35%, 50%)` }} />
              </div>
              <span style={{ fontSize: 7, fontWeight: 600, color: '#555' }}>{p.name}</span>
            </div>
          ))}
        </div>
        {/* Highlighted preset */}
        <div style={{ ...s.panel, background: `color-mix(in srgb, var(--icon-color) 8%, white)`, padding: '6px 10px', width: '100%', borderColor: 'var(--icon-color)', display: 'flex', alignItems: 'center', gap: 8, maxWidth: 180 }}>
          <div style={{ width: 28, height: 20, borderRadius: 5, background: `color-mix(in srgb, var(--icon-color) 25%, white)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 12, height: 8, borderRadius: 2, background: 'var(--icon-color)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: 'var(--icon-color)', marginBottom: 1 }}>SaaS Starter</div>
            <div style={{ fontSize: 7, color: '#999' }}>Landing + Dashboard + API</div>
          </div>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--icon-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="5"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};
