import React from 'react';
import { useColorStore } from '../../../store/useColorStore';
import '../Dashboard.css';

interface SpacingPanelProps {
  markFeatureDone: (feature: 'color' | 'typography' | 'spacing') => void;
}

export const SpacingPanel: React.FC<SpacingPanelProps> = ({ markFeatureDone }) => {
  const { spacing, updateSpacingValue, updateSpacingUnit } = useColorStore();

  return (
    <div className="builder-split-grid">
      <div className="builder-controls-panel">
        <div className="builder-section">
          <h4 className="builder-section-title">Base Spacing Unit</h4>
          <p className="builder-section-desc">
            Change the base grid step (in pixels) to scale the layout spacing steps mathematically.
          </p>
          <div className="builder-field">
            <label className="builder-field-label">Base Step Unit (slider)</label>
            <input
              type="range"
              min="2"
              max="16"
              step="1"
              defaultValue="4"
              className="builder-slider"
              id="spacing-unit-slider"
              onChange={(e) => {
                const unit = parseInt(e.target.value);
                updateSpacingUnit(unit);
                markFeatureDone('spacing');
              }}
            />
          </div>
        </div>

        <div className="builder-section">
          <h4 className="builder-section-title">Manual Spacing Steps</h4>
          <div className="builder-grid-2col spacing-steps-grid">
            {Object.entries(spacing).map(([key, val]) => (
              <div key={key} className="builder-field">
                <label className="builder-field-label">Step {key}</label>
                <input
                  className="builder-field-input"
                  value={val}
                  onChange={(e) => {
                    updateSpacingValue(key, e.target.value);
                    markFeatureDone('spacing');
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="builder-preview-panel">
        <h4 className="builder-section-title">Grid Layout Preview</h4>
        <div
          className="builder-specimen-card"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <p className="builder-section-desc" style={{ margin: 0 }}>
            Visual representation of spacer tokens:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['1', '2', '3', '4', '6', '8', '12'].map((step) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    width: '60px',
                    fontFamily: 'monospace',
                  }}
                >
                  Step {step}
                </span>
                <div
                  style={{
                    height: '24px',
                    width: spacing[step] || '1rem',
                    background:
                      'linear-gradient(90deg, var(--md-ref-role-primary), var(--md-ref-role-secondary))',
                    borderRadius: 'var(--matisse-radius-sm)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--md-ref-role-onSurfaceVariant)',
                    fontFamily: 'monospace',
                  }}
                >
                  {spacing[step]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
