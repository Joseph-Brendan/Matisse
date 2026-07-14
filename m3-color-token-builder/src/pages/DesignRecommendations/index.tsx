import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Palette, Type, LayoutGrid, Layers, Box, Sparkles, Wind } from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import './DesignRecommendations.css';

interface LocationState {
  industry: string;
}

const industryMeta: Record<
  string,
  { label: string; description: string; colorTokens: { name: string; value: string }[] }
> = {
  FinTech: {
    label: 'FinTech',
    description:
      'Professional, trustworthy color recommendations for financial technology products.',
    colorTokens: [
      { name: 'Primary', value: '#1a56db' },
      { name: 'Secondary', value: '#0e9f6e' },
      { name: 'Accent', value: '#ff5a1f' },
      { name: 'Surface', value: '#f8fafc' },
    ],
  },
  Healthcare: {
    label: 'Healthcare',
    description: 'Calm, reassuring tones for health and medical applications.',
    colorTokens: [
      { name: 'Primary', value: '#0e9f6e' },
      { name: 'Secondary', value: '#3f83f8' },
      { name: 'Accent', value: '#e74c3c' },
      { name: 'Surface', value: '#f0fdf4' },
    ],
  },
  'E-commerce': {
    label: 'E-commerce',
    description: 'Vibrant, conversion-focused colors for online retail.',
    colorTokens: [
      { name: 'Primary', value: '#7c3aed' },
      { name: 'Secondary', value: '#f59e0b' },
      { name: 'Accent', value: '#ef4444' },
      { name: 'Surface', value: '#fefce8' },
    ],
  },
  Education: {
    label: 'Education',
    description: 'Friendly, approachable palettes for learning platforms.',
    colorTokens: [
      { name: 'Primary', value: '#2563eb' },
      { name: 'Secondary', value: '#10b981' },
      { name: 'Accent', value: '#f59e0b' },
      { name: 'Surface', value: '#eff6ff' },
    ],
  },
  AI: {
    label: 'AI',
    description: 'Futuristic, sophisticated tones for artificial intelligence products.',
    colorTokens: [
      { name: 'Primary', value: '#6366f1' },
      { name: 'Secondary', value: '#8b5cf6' },
      { name: 'Accent', value: '#06b6d4' },
      { name: 'Surface', value: '#f5f3ff' },
    ],
  },
  SaaS: {
    label: 'SaaS',
    description: 'Clean, modern colors for software-as-a-service platforms.',
    colorTokens: [
      { name: 'Primary', value: '#3b82f6' },
      { name: 'Secondary', value: '#6366f1' },
      { name: 'Accent', value: '#10b981' },
      { name: 'Surface', value: '#f8fafc' },
    ],
  },
  Travel: {
    label: 'Travel',
    description: 'Warm, inviting colors for travel and booking experiences.',
    colorTokens: [
      { name: 'Primary', value: '#0891b2' },
      { name: 'Secondary', value: '#f59e0b' },
      { name: 'Accent', value: '#e11d48' },
      { name: 'Surface', value: '#ecfdf5' },
    ],
  },
  Logistics: {
    label: 'Logistics',
    description: 'Reliable, efficient tones for supply chain and logistics tools.',
    colorTokens: [
      { name: 'Primary', value: '#0369a1' },
      { name: 'Secondary', value: '#475569' },
      { name: 'Accent', value: '#f97316' },
      { name: 'Surface', value: '#f1f5f9' },
    ],
  },
};

const designSections = [
  {
    icon: <Palette size={16} />,
    label: 'Color Palette',
    desc: 'Primary, secondary, and accent colors',
  },
  {
    icon: <Type size={16} />,
    label: 'Typography',
    desc: 'Font families and scale recommendations',
  },
  { icon: <LayoutGrid size={16} />, label: 'Spacing', desc: 'Layout and component spacing scale' },
  { icon: <Layers size={16} />, label: 'Shadows', desc: 'Elevation and depth system' },
  { icon: <Box size={16} />, label: 'Components', desc: 'Pre-styled UI component tokens' },
  { icon: <Wind size={16} />, label: 'Motion', desc: 'Transition and animation curves' },
];

export const DesignRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const industry = state?.industry ?? 'SaaS';
  const meta = industryMeta[industry] ?? industryMeta.SaaS;

  return (
    <div className="dr-root">
      <header className="dr-header">
        <button
          className="dr-header__back-btn"
          onClick={() => navigate('/dashboard')}
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
          Back to Color Builder
        </button>
        <h1 className="dr-header__title">Design Recommendations</h1>
      </header>

      <div className="dr-body">
        <div className="dr-industry-badge">
          <Sparkles size={13} />
          {meta.label} Industry
        </div>
        <p className="dr-intro">{meta.description}</p>

        <div className="dr-section">
          <h3 className="dr-section__title">Suggested Color Tokens</h3>
          <div className="dr-color-grid">
            {meta.colorTokens.map((token) => (
              <div key={token.name} className="dr-color-card">
                <div className="dr-color-swatch" style={{ background: token.value }} />
                <div className="dr-color-info">
                  <span className="dr-color-name">{token.name}</span>
                  <span className="dr-color-value">{token.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dr-section">
          <h3 className="dr-section__title">Design System Sections</h3>
          <p className="dr-section__desc">
            These are the token categories we'll configure for the {meta.label} industry.
          </p>
          <div className="dr-section-grid">
            {designSections.map((s) => (
              <div key={s.label} className="dr-section-card">
                <div className="dr-section-card__icon">{s.icon}</div>
                <div className="dr-section-card__info">
                  <span className="dr-section-card__label">{s.label}</span>
                  <span className="dr-section-card__desc">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dr-actions">
          <GlossyButton variant="outline" size="md" onClick={() => navigate('/dashboard')}>
            Back to Builder
          </GlossyButton>
          <GlossyButton
            variant="primary"
            size="md"
            icon={<Sparkles size={14} />}
            iconPosition="left"
          >
            Apply Recommendations
          </GlossyButton>
        </div>
      </div>
    </div>
  );
};
