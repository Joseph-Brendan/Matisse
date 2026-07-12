import React from 'react';
import { useColorStore } from '../../../store/useColorStore';
import '../Dashboard.css';

export const ShadowsPanel: React.FC = () => {
  const { shadows, updateShadowValue, updateShadowGlow } = useColorStore();

  return (
    <div className="builder-split-grid">
      <div className="builder-controls-panel">
        <div className="builder-section">
          <h4 className="builder-section-title">Box Shadows</h4>
          <div className="builder-input-group">
            {Object.entries(shadows).map(([key, val]) => {
              if (typeof val !== 'string') return null;
              return (
                <div key={key} className="builder-field">
                  <label className="builder-field-label">{key}</label>
                  <input
                    className="builder-field-input"
                    value={val}
                    onChange={(e) => updateShadowValue(key, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="builder-section">
          <h4 className="builder-section-title">Shadow Glows</h4>
          <div className="builder-input-group">
            {Object.entries(shadows.glow).map(([key, val]) => (
              <div key={key} className="builder-field">
                <label className="builder-field-label">{key} glow</label>
                <input
                  className="builder-field-input"
                  value={val}
                  onChange={(e) => updateShadowGlow(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="builder-preview-panel">
        <h4 className="builder-section-title">Glow Previews</h4>
        <div className="builder-preview-grid builder-preview-grid--glows">
          {Object.entries(shadows.glow).map(([name, shadowValue]) => (
            <div
              key={name}
              className="builder-preview-card"
              style={{ boxShadow: shadowValue, borderRadius: 'var(--matisse-radius-md)' }}
            >
              <span className="builder-preview-card-title">{name}</span>
              <span className="builder-preview-card-sub">Active Glow</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
