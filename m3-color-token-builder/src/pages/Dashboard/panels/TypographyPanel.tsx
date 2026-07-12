import React from 'react';
import { GlossyButton } from '../../../design-system/components/Button/GlossyButton';
import { FontPicker } from '../../../design-system/components/FontPicker/FontPicker';
import { useColorStore } from '../../../store/useColorStore';
import { showAlert } from '../../../store/useConfirmStore';
import '../Dashboard.css';

interface TypographyPanelProps {
  markFeatureDone: (feature: 'color' | 'typography' | 'spacing') => void;
}

export const TypographyPanel: React.FC<TypographyPanelProps> = ({ markFeatureDone }) => {
  const { typography, updateTypographyFamily, updateTypographySize, updateTypographyWeight } =
    useColorStore();

  return (
    <div className="builder-split-grid">
      <div className="builder-controls-panel">
        <div className="builder-section">
          <h4 className="builder-section-title">Font Families</h4>
          <div className="builder-input-group">
            {Object.entries(typography.fontFamily).map(([key, val]) => (
              <div key={key} className="builder-field">
                <label className="builder-field-label">{key.toUpperCase()}</label>
                <FontPicker
                  id={`font-family-${key}`}
                  value={val}
                  onChange={(family) => {
                    updateTypographyFamily(key, family);
                    markFeatureDone('typography');
                  }}
                  placeholder={`Search ${key} font…`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="builder-section">
          <h4 className="builder-section-title">Scale Generator</h4>
          <p className="builder-section-desc">
            Generate standard typographic hierarchy sizes using a mathematical scale factor.
          </p>
          <div className="builder-row">
            <div className="builder-field">
              <label className="builder-field-label">Base Size (px)</label>
              <input
                type="number"
                className="builder-field-input"
                defaultValue={16}
                id="typo-base-input"
              />
            </div>
            <div className="builder-field">
              <label className="builder-field-label">Scale Factor</label>
              <select className="builder-field-input" id="typo-scale-select" defaultValue="1.25">
                <option value="1.067">Minor Second (1.067)</option>
                <option value="1.125">Major Second (1.125)</option>
                <option value="1.2">Minor Third (1.2)</option>
                <option value="1.25">Major Third (1.25)</option>
                <option value="1.333">Perfect Fourth (1.333)</option>
                <option value="1.5">Perfect Fifth (1.5)</option>
                <option value="1.618">Golden Ratio (1.618)</option>
              </select>
            </div>
          </div>
          <div className="builder-btn-row">
            <GlossyButton
              variant="outline"
              size="sm"
              onClick={() => {
                const base = parseFloat(
                  (document.getElementById('typo-base-input') as HTMLInputElement).value || '16',
                );
                const factor = parseFloat(
                  (document.getElementById('typo-scale-select') as HTMLSelectElement).value ||
                    '1.25',
                );
                const sizes = [
                  'xs',
                  'sm',
                  'base',
                  'lg',
                  'xl',
                  '2xl',
                  '3xl',
                  '4xl',
                  '5xl',
                  '6xl',
                  '7xl',
                ];
                sizes.forEach((sz, idx) => {
                  const power = idx - 2;
                  const valPx = base * Math.pow(factor, power);
                  const valRem = valPx / 16;
                  updateTypographySize(sz, `${valRem.toFixed(3)}rem`);
                });
                markFeatureDone('typography');
                showAlert('Scale Generated', 'Typography scale generated!', 'success');
              }}
            >
              Generate Typography Scale
            </GlossyButton>
          </div>
        </div>

        <div className="builder-section">
          <h4 className="builder-section-title">Manual Font Sizes</h4>
          <div className="builder-grid-2col">
            {Object.entries(typography.fontSize).map(([key, val]) => (
              <div key={key} className="builder-field">
                <label className="builder-field-label">{key}</label>
                <input
                  className="builder-field-input"
                  value={val}
                  onChange={(e) => {
                    updateTypographySize(key, e.target.value);
                    markFeatureDone('typography');
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="builder-section">
          <h4 className="builder-section-title">Font Weights</h4>
          <div className="builder-grid-2col">
            {Object.entries(typography.fontWeight).map(([key, val]) => (
              <div key={key} className="builder-field">
                <label className="builder-field-label">{key}</label>
                <input
                  type="number"
                  className="builder-field-input"
                  value={val}
                  onChange={(e) => {
                    updateTypographyWeight(key, Number(e.target.value));
                    markFeatureDone('typography');
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="builder-preview-panel">
        <h4 className="builder-section-title">Aesthetic Specimen</h4>
        <div
          className="builder-specimen-card"
          style={{ fontFamily: 'var(--matisse-font-family-sans)' }}
        >
          <span
            style={{
              fontSize: 'var(--matisse-font-size-xs)',
              fontWeight: 'var(--matisse-font-weight-bold)',
              color: 'var(--md-ref-role-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Typography Preview
          </span>
          <h1
            style={{
              fontSize: 'var(--matisse-font-size-4xl)',
              fontWeight: 'var(--matisse-font-weight-extrabold)',
              margin: '0.5rem 0 1rem 0',
              lineHeight: 'var(--matisse-line-height-tight)',
              fontFamily: 'var(--matisse-font-family-display)',
            }}
          >
            Building dynamic design scales.
          </h1>
          <p
            style={{
              fontSize: 'var(--matisse-font-size-base)',
              fontWeight: 'var(--matisse-font-weight-regular)',
              color: 'var(--md-ref-role-onSurfaceVariant)',
              lineHeight: 'var(--matisse-line-height-normal)',
              marginBottom: '1.5rem',
            }}
          >
            Matisse allows teams to customize typography, spacing, and colors in one real-time
            workspace. Adjust settings to see this preview card update instantly.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <GlossyButton size="sm">Primary Specimen</GlossyButton>
            <GlossyButton size="sm" variant="outline">
              Learn More
            </GlossyButton>
          </div>
        </div>
      </div>
    </div>
  );
};
