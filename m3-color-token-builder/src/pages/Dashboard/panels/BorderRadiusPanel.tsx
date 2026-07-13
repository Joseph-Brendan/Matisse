import React from 'react';
import { useColorStore } from '../../../store/useColorStore';
import '../Dashboard.css';

export const BorderRadiusPanel: React.FC = () => {
  const { borderRadius, updateBorderRadiusValue } = useColorStore();

  return (
    <div className="builder-split-grid">
      <div className="builder-controls-panel">
        <div className="builder-section">
          <h4 className="builder-section-title">Border Radius Scale</h4>
          <p className="builder-section-desc">
            Customize container corner rounding presets used in inputs, cards, and buttons.
          </p>
          <div className="builder-input-group">
            {Object.entries(borderRadius).map(([key, val]) => (
              <div key={key} className="builder-field">
                <label className="builder-field-label">{key}</label>
                <input
                  className="builder-field-input"
                  value={val}
                  onChange={(e) => updateBorderRadiusValue(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="builder-preview-panel">
        <h4 className="builder-section-title">Corner Rounding Previews</h4>
        <div className="builder-preview-grid builder-preview-grid--br">
          {Object.entries(borderRadius).map(([key, val]) => (
            <div
              key={key}
              className="builder-preview-card"
              style={{ borderRadius: val, gap: '0.5rem' }}
            >
              <span className="builder-preview-card-title" style={{ textTransform: 'none' }}>
                {key}
              </span>
              <span className="builder-preview-card-sub" style={{ fontFamily: 'monospace' }}>
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
