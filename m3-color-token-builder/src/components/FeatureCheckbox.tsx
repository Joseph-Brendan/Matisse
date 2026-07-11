import React from 'react';
import { Check } from 'lucide-react';

interface FeatureCheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

export const FeatureCheckbox: React.FC<FeatureCheckboxProps> = ({ checked, label, onChange }) => {
  return (
    <div
      className={`checklist-item${checked ? ' done' : ''}`}
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(); } }}
    >
      <div className={`checklist-box${checked ? ' checked' : ''}`}>
        {checked && <Check size={11} strokeWidth={3} />}
      </div>
      <span className="checklist-label">{label}</span>
    </div>
  );
};
