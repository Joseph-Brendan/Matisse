import React from 'react';
import { useColorStore } from '../../../store/useColorStore';
import '../Dashboard.css';

export const ElevationPanel: React.FC = () => {
  const { elevation, updateElevationValue } = useColorStore();

  return (
    <div className="builder-split-grid">
      <div className="builder-controls-panel">
        <div className="builder-section">
          <h4 className="builder-section-title">Elevation Layers</h4>
          <div className="builder-input-group">
            {Object.entries(elevation).map(([key, val]) => (
              <div key={key} className="builder-field">
                <label className="builder-field-label">Level {key}</label>
                <input
                  className="builder-field-input"
                  value={val}
                  onChange={(e) => updateElevationValue(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="builder-preview-panel">
        <h4 className="builder-section-title">Elevation Tiers Specimen</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {Object.entries(elevation).map(([level, val]) => (
            <div
              key={level}
              className="elevation-tier-row"
              style={{
                boxShadow: val,
                border: level === '0' ? '1px solid var(--md-ref-role-outlineVariant)' : 'none',
              }}
            >
              <span className="elevation-tier-row-label">Elevation Tier {level}</span>
              <span className="elevation-tier-row-value" title={val}>
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
