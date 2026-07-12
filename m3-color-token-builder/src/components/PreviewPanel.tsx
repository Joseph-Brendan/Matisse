import React, { useState } from 'react';
import { useColorStore } from '../store/useColorStore';
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import { Card, CardHeader, CardContent } from '../design-system/components/Card/Card';
import { ShoppingBag, Star } from 'lucide-react';
import './PreviewPanel.css';

type Feature =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'shadows'
  | 'elevation'
  | 'borderRadius'
  | 'motion'
  | 'components';

interface PreviewPanelProps {
  activeFeature?: Feature;
}

type Preset = 'auth' | 'saas' | 'marketing' | 'ecommerce';

const featureToPreset: Record<Feature, Preset> = {
  color: 'auth',
  typography: 'marketing',
  spacing: 'saas',
  shadows: 'ecommerce',
  elevation: 'saas',
  borderRadius: 'ecommerce',
  motion: 'marketing',
  components: 'auth',
};

const featureLabel: Record<Feature, string> = {
  color: 'Color Token Preview',
  typography: 'Typography Specimen',
  spacing: 'Spacing Scale Preview',
  shadows: 'Shadow & Glow Previews',
  elevation: 'Elevation Tiers',
  borderRadius: 'Border Radius Samples',
  motion: 'Motion Preview',
  components: 'Component Preview',
};

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ activeFeature = 'color' }) => {
  const { roles, theme, spacing, borderRadius, shadows, elevation, keyColors } = useColorStore();

  const activeRoles = roles[theme];

  const previewStyle: React.CSSProperties = {
    padding: '2.5rem',
    borderRadius: '16px',
    backgroundColor: 'var(--role-surface)',
    color: 'var(--role-onSurface)',
    border: '1px solid var(--role-outlineVariant)',
    fontFamily: 'inherit',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    transition: 'all 0.3s ease',
  };

  activeRoles.forEach((r) => {
    (previewStyle as Record<string, string>)[`--role-${r.name}`] = r.resolvedValue;
  });

  const [showAnatomy, setShowAnatomy] = useState(false);
  const [preset, setPreset] = useState<Preset>(featureToPreset[activeFeature]);
  const [showPresetPreview, setShowPresetPreview] = useState(false);

  const handleToggleMockup = () => {
    const next = !showPresetPreview;
    setShowPresetPreview(next);
    if (next) {
      setPreset(featureToPreset[activeFeature]);
    }
  };

  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [isHoverEmail, setHoverEmail] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isHoverPwd, setHoverPwd] = useState(false);
  const [isFocusPwd, setFocusPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsError(true);
    }, 1500);
  };

  const getInputBorder = (isFocus: boolean, isHover: boolean, forceError: boolean = false) => {
    if (forceError) return '2px solid var(--role-error)';
    if (isFocus) return '2px solid var(--role-primary)';
    if (isHover) return '1px solid var(--role-onSurface)';
    return '1px solid var(--role-outline)';
  };

  const inputBg = 'var(--role-surfaceContainerHighest)';
  const inputColor = 'var(--role-onSurface)';

  return (
    <div className="preview-panel-wrapper">
      <div className="preview-header">
        <div>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{featureLabel[activeFeature]}</h2>
          <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
            {showPresetPreview
              ? 'Full mockup using your tokens'
              : 'Real-time preview of the active feature'}
          </p>
        </div>
        <div className="preview-header-controls">
          <GlossyButton variant="outline" size="sm" onClick={handleToggleMockup}>
            {showPresetPreview ? 'Feature Preview' : 'Full Mockup'}
          </GlossyButton>
          {showPresetPreview && (
            <div className="preview-preset-selector">
              <label>Preset:</label>
              <select value={preset} onChange={(e) => setPreset(e.target.value as Preset)}>
                <option value="auth">Auth Login Form</option>
                <option value="saas">SaaS App Dashboard</option>
                <option value="marketing">Marketing Hero Page</option>
                <option value="ecommerce">E-Commerce Product Card</option>
              </select>
            </div>
          )}
          <GlossyButton
            variant={showAnatomy ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowAnatomy(!showAnatomy)}
          >
            {showAnatomy ? 'Hide Color Anatomy' : 'Show Color Anatomy'}
          </GlossyButton>
        </div>
      </div>

      <div className="preview-display-area">
        <div className="preview-display-main">
          <div className="preview-container" style={previewStyle}>
            {showPresetPreview ? (
              preset === 'auth' ? (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    maxWidth: '320px',
                    margin: '0 auto',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--role-primary)' }}>
                      Welcome back
                    </h3>
                    <p
                      style={{
                        margin: '0.5rem 0 0',
                        color: 'var(--role-onSurfaceVariant)',
                        fontSize: '0.875rem',
                      }}
                    >
                      Sign in to continue to your dashboard
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: isError
                          ? 'var(--role-error)'
                          : isFocusEmail
                            ? 'var(--role-primary)'
                            : 'var(--role-onSurface)',
                      }}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onMouseEnter={() => setHoverEmail(true)}
                      onMouseLeave={() => setHoverEmail(false)}
                      onFocus={() => {
                        setFocusEmail(true);
                        setIsError(false);
                      }}
                      onBlur={() => setFocusEmail(false)}
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: inputBg,
                        color: inputColor,
                        border: getInputBorder(isFocusEmail, isHoverEmail, isError),
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '1rem',
                        transition: 'all 0.2s',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <label
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: isError
                            ? 'var(--role-error)'
                            : isFocusPwd
                              ? 'var(--role-primary)'
                              : 'var(--role-onSurface)',
                        }}
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--role-primary)',
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onMouseEnter={() => setHoverPwd(true)}
                      onMouseLeave={() => setHoverPwd(false)}
                      onFocus={() => {
                        setFocusPwd(true);
                        setIsError(false);
                      }}
                      onBlur={() => setFocusPwd(false)}
                      style={{
                        padding: '0.75rem 1rem',
                        backgroundColor: inputBg,
                        color: inputColor,
                        border: getInputBorder(isFocusPwd, isHoverPwd, isError),
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '1rem',
                        transition: 'all 0.2s',
                      }}
                    />
                    {isError && (
                      <span
                        style={{ color: 'var(--role-error)', fontSize: '0.75rem', fontWeight: 500 }}
                      >
                        Invalid email or password. Please try again.
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.75rem',
                      backgroundColor: 'var(--role-primary)',
                      color: 'var(--role-onPrimary)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s',
                      filter: btnHover && !isLoading ? 'brightness(0.9)' : 'none',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid var(--role-onPrimary)',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                          }}
                        />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </form>
              ) : preset === 'saas' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--role-outlineVariant)',
                      paddingBottom: '0.75rem',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--role-primary)' }}>
                      SaaS Analytics
                    </h3>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        background: 'var(--role-secondaryContainer)',
                        color: 'var(--role-onSecondaryContainer)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      Active
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--role-surfaceContainerLow)',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--role-outlineVariant)',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: 'var(--role-onSurfaceVariant)' }}>
                        Total Revenue
                      </span>
                      <h4
                        style={{
                          fontSize: '1.5rem',
                          margin: '0.25rem 0 0',
                          color: 'var(--role-primary)',
                        }}
                      >
                        $48,259
                      </h4>
                    </div>
                    <div
                      style={{
                        background: 'var(--role-surfaceContainerLow)',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--role-outlineVariant)',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: 'var(--role-onSurfaceVariant)' }}>
                        New Signups
                      </span>
                      <h4
                        style={{
                          fontSize: '1.5rem',
                          margin: '0.25rem 0 0',
                          color: 'var(--role-secondary)',
                        }}
                      >
                        +1,482
                      </h4>
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'var(--role-surfaceContainer)',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '1px solid var(--role-outlineVariant)',
                    }}
                  >
                    <h4
                      style={{
                        margin: '0 0 0.75rem 0',
                        fontSize: '0.9rem',
                        color: 'var(--role-onSurface)',
                      }}
                    >
                      Recent Activity
                    </h4>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        fontSize: '0.8125rem',
                      }}
                    >
                      <li
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid var(--role-outlineVariant)',
                          paddingBottom: '0.25rem',
                        }}
                      >
                        <span>User signup: admin@matisse.dev</span>
                        <span style={{ color: 'var(--role-outline)' }}>2m ago</span>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Payment received from Stripe</span>
                        <span style={{ color: 'var(--role-outline)' }}>10m ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : preset === 'marketing' ? (
                <div className="marketing-hero">
                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--role-onTertiaryContainer)',
                        background: 'var(--role-tertiaryContainer)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '99px',
                        fontWeight: 600,
                      }}
                    >
                      Matisse Release v1.0
                    </span>
                    <h3
                      style={{
                        margin: '0.75rem 0 0',
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: 'var(--role-primary)',
                        lineHeight: 1.2,
                      }}
                    >
                      Automate design scales
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        marginTop: '1rem',
                        justifyContent: 'center',
                      }}
                    >
                      <button
                        style={{
                          padding: '0.625rem 1.25rem',
                          border: 'none',
                          background: 'var(--role-primary)',
                          color: 'var(--role-onPrimary)',
                          borderRadius: '99px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Get Started Free
                      </button>
                      <button
                        style={{
                          padding: '0.625rem 1.25rem',
                          border: '1px solid var(--role-outline)',
                          background: 'transparent',
                          color: 'var(--role-primary)',
                          borderRadius: '99px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Documentation
                      </button>
                    </div>
                  </div>
                  <p
                    className="marketing-hero-summary"
                    style={{
                      margin: 0,
                      color: 'var(--role-onSurfaceVariant)',
                      fontSize: '0.9375rem',
                    }}
                  >
                    A visual token customizer for Material 3 design systems. Build perfect palettes
                    and export to CSS, JSON, and Tailwind.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: '300px',
                    margin: '0 auto',
                    background: 'var(--role-surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--role-outlineVariant)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '140px',
                      background:
                        'linear-gradient(135deg, var(--role-primaryContainer) 0%, var(--role-secondaryContainer) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShoppingBag size={48} style={{ color: 'var(--role-onPrimaryContainer)' }} />
                  </div>
                  <div
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--role-onTertiaryContainer)',
                          background: 'var(--role-tertiaryContainer)',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        Trend
                      </span>
                      <span
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--role-outline)',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <Star
                          size={12}
                          fill="currentColor"
                          style={{ color: 'var(--role-outline)' }}
                        />{' '}
                        4.8
                      </span>
                    </div>
                    <h4
                      style={{
                        margin: '0.25rem 0 0',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--role-onSurface)',
                      }}
                    >
                      Matisse Premium Cup
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.75rem',
                        color: 'var(--role-onSurfaceVariant)',
                        lineHeight: 1.4,
                      }}
                    >
                      Dynamic thermal cup supporting light and dark theme gradients.
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '0.75rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--role-primary)',
                        }}
                      >
                        $24.99
                      </span>
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          border: 'none',
                          background: 'var(--role-primary)',
                          color: 'var(--role-onPrimary)',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '0.8125rem',
                          cursor: 'pointer',
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )
            ) : activeFeature === 'typography' ? (
              <div style={{ fontFamily: 'var(--matisse-font-family-sans)' }}>
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
            ) : activeFeature === 'spacing' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                  Grid Layout Preview
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    color: 'var(--md-ref-role-onSurfaceVariant)',
                  }}
                >
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
            ) : activeFeature === 'shadows' ? (
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>
                  Glow Previews
                </h4>
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
            ) : activeFeature === 'elevation' ? (
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>
                  Elevation Tiers Specimen
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {Object.entries(elevation).map(([level, val]) => (
                    <div
                      key={level}
                      className="elevation-tier-row"
                      style={{
                        boxShadow: val,
                        border:
                          level === '0' ? '1px solid var(--md-ref-role-outlineVariant)' : 'none',
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
            ) : activeFeature === 'borderRadius' ? (
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 600 }}>
                  Corner Rounding Previews
                </h4>
                <div className="builder-preview-grid builder-preview-grid--br">
                  {Object.entries(borderRadius).map(([key, val]) => (
                    <div
                      key={key}
                      className="builder-preview-card"
                      style={{ borderRadius: val, gap: '0.5rem' }}
                    >
                      <span
                        className="builder-preview-card-title"
                        style={{ textTransform: 'none' }}
                      >
                        {key}
                      </span>
                      <span
                        className="builder-preview-card-sub"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Color Palette</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {keyColors.map((kc) => (
                    <div
                      key={kc.name}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: kc.value,
                          border: '1px solid var(--role-outlineVariant)',
                        }}
                      />
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          textTransform: 'capitalize',
                        }}
                      >
                        {kc.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          color: 'var(--role-onSurfaceVariant)',
                        }}
                      >
                        {kc.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <style>
              {`
                                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            `}
            </style>
          </div>
        </div>

        {showAnatomy && (
          <Card
            variant="outlined"
            className="preview-anatomy-panel"
            style={{ margin: 0 }}
            padding="lg"
          >
            <CardHeader
              title="Color Anatomy"
              subtitle="Design tokens mapped to interactive elements."
            />
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  marginTop: '1rem',
                }}
              >
                <AnatomyRow element="Form Background" role="surface" color="var(--role-surface)" />
                <AnatomyRow element="Primary Headings" role="primary" color="var(--role-primary)" />
                <AnatomyRow element="Body Text" role="onSurface" color="var(--role-onSurface)" />
                <AnatomyRow
                  element="Subtitle Text"
                  role="onSurfaceVariant"
                  color="var(--role-onSurfaceVariant)"
                />
                <AnatomyRow
                  element="Input Background"
                  role="surfaceContainerHighest"
                  color="var(--role-surfaceContainerHighest)"
                />
                <AnatomyRow
                  element="Input Border (Default)"
                  role="outline"
                  color="var(--role-outline)"
                />
                <AnatomyRow
                  element="Input Border (Hover)"
                  role="onSurface"
                  color="var(--role-onSurface)"
                />
                <AnatomyRow
                  element="Input Border (Focus)"
                  role="primary"
                  color="var(--role-primary)"
                />
                <AnatomyRow element="Error State" role="error" color="var(--role-error)" />
                <AnatomyRow
                  element="Button Background"
                  role="primary"
                  color="var(--role-primary)"
                />
                <AnatomyRow
                  element="Button Text/Spinner"
                  role="onPrimary"
                  color="var(--role-onPrimary)"
                />
                <AnatomyRow element="Text Links" role="primary" color="var(--role-primary)" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const AnatomyRow: React.FC<{ element: string; role: string; color: string }> = ({
  element,
  role,
  color,
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #e5e7eb',
    }}
  >
    <span style={{ fontWeight: 500, color: '#374151' }}>{element}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '0.75rem' }}>{role}</span>
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '4px',
          backgroundColor: color,
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      />
    </div>
  </div>
);
