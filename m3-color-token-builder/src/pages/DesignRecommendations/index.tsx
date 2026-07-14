import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, Save, Download, Bell, LogOut, Settings } from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { useColorStore } from '../../store/useColorStore';
import { useAuthStore } from '../../store/useAuthStore';
import { showAlert } from '../../store/useConfirmStore';
import { Dropdown } from '../../design-system/components';
import { ExportPanel } from '../../components/ExportPanel';
import { hexToHsl } from '../../lib/colorUtils';
import '../Dashboard/Dashboard.css';
import './DesignRecommendations.css';

interface LocationState {
  industry: string;
}

interface IndustryPreset {
  label: string;
  description: string;
  colorTokens: { name: string; value: string }[];
  typography: {
    sans: string;
    display: string;
    mono: string;
  };
  spacingUnit: number;
  borderRadius: Record<string, string>;
  shadows?: Record<string, string>;
  elevation?: Record<string, string>;
}

const industryMeta: Record<string, IndustryPreset> = {
  FinTech: {
    label: 'FinTech',
    description:
      'Professional, trustworthy color, type, and spacing recommendations for financial technology products.',
    colorTokens: [
      { name: 'Primary', value: '#1a56db' },
      { name: 'Secondary', value: '#0e9f6e' },
      { name: 'Accent', value: '#ff5a1f' },
      { name: 'Surface', value: '#f8fafc' },
    ],
    typography: {
      sans: 'Inter',
      display: 'Inter',
      mono: 'JetBrains Mono',
    },
    spacingUnit: 14,
    borderRadius: {
      none: '0',
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 2px rgba(0,0,0,0.03)',
      sm: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)',
      md: '0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)',
      lg: '0 4px 8px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.02)',
      xl: '0 8px 16px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.02)',
      '2xl': '0 12px 24px rgba(0,0,0,0.08)',
    },
    elevation: {
      '0': 'none',
      '1': '0 1px 2px rgba(0,0,0,0.04)',
      '2': '0 2px 4px rgba(0,0,0,0.05)',
      '3': '0 4px 8px rgba(0,0,0,0.06)',
      '4': '0 8px 16px rgba(0,0,0,0.06)',
      '5': '0 12px 24px rgba(0,0,0,0.08)',
    },
  },
  Healthcare: {
    label: 'Healthcare',
    description:
      'Calm, reassuring tones and soft, highly-accessible scales for health and medical applications.',
    colorTokens: [
      { name: 'Primary', value: '#0e9f6e' },
      { name: 'Secondary', value: '#3f83f8' },
      { name: 'Accent', value: '#e74c3c' },
      { name: 'Surface', value: '#f0fdf4' },
    ],
    typography: {
      sans: 'Open Sans',
      display: 'Lora',
      mono: 'Roboto Mono',
    },
    spacingUnit: 18,
    borderRadius: {
      none: '0',
      xs: '0.25rem',
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 2px rgba(0,0,0,0.02)',
      sm: '0 1px 3px rgba(0,0,0,0.04)',
      md: '0 4px 8px rgba(0,0,0,0.04)',
      lg: '0 8px 16px rgba(0,0,0,0.05)',
      xl: '0 16px 24px rgba(0,0,0,0.06)',
      '2xl': '0 24px 32px rgba(0,0,0,0.08)',
    },
    elevation: {
      '0': 'none',
      '1': '0 1px 3px rgba(0,0,0,0.04)',
      '2': '0 2px 6px rgba(0,0,0,0.04)',
      '3': '0 4px 8px rgba(0,0,0,0.04)',
      '4': '0 8px 16px rgba(0,0,0,0.05)',
      '5': '0 16px 24px rgba(0,0,0,0.06)',
    },
  },
  'E-commerce': {
    label: 'E-commerce',
    description:
      'Vibrant, conversion-focused color palettes and snappy responsive scales for online retail.',
    colorTokens: [
      { name: 'Primary', value: '#7c3aed' },
      { name: 'Secondary', value: '#f59e0b' },
      { name: 'Accent', value: '#ef4444' },
      { name: 'Surface', value: '#fefce8' },
    ],
    typography: {
      sans: 'Poppins',
      display: 'Montserrat',
      mono: 'Source Code Pro',
    },
    spacingUnit: 16,
    borderRadius: {
      none: '0',
      xs: '0.1875rem',
      sm: '0.375rem',
      md: '0.625rem',
      lg: '0.875rem',
      xl: '1.25rem',
      '2xl': '1.75rem',
      '3xl': '2.25rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 2px rgba(0,0,0,0.04)',
      sm: '0 2px 4px rgba(0,0,0,0.06)',
      md: '0 4px 8px rgba(0,0,0,0.07)',
      lg: '0 8px 16px rgba(0,0,0,0.08)',
      xl: '0 16px 24px rgba(0,0,0,0.10)',
      '2xl': '0 24px 36px rgba(0,0,0,0.12)',
    },
    elevation: {
      '0': 'none',
      '1': '0 1px 3px rgba(0,0,0,0.06)',
      '2': '0 2px 5px rgba(0,0,0,0.07)',
      '3': '0 4px 8px rgba(0,0,0,0.07)',
      '4': '0 8px 16px rgba(0,0,0,0.08)',
      '5': '0 16px 24px rgba(0,0,0,0.10)',
    },
  },
  Education: {
    label: 'Education',
    description:
      'Friendly, approachable typography and generous layouts for digital learning platforms.',
    colorTokens: [
      { name: 'Primary', value: '#2563eb' },
      { name: 'Secondary', value: '#10b981' },
      { name: 'Accent', value: '#f59e0b' },
      { name: 'Surface', value: '#eff6ff' },
    ],
    typography: {
      sans: 'Outfit',
      display: 'Quicksand',
      mono: 'Fira Code',
    },
    spacingUnit: 18,
    borderRadius: {
      none: '0',
      xs: '0.375rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 3px rgba(0,0,0,0.02)',
      sm: '0 2px 5px rgba(0,0,0,0.04)',
      md: '0 6px 12px rgba(0,0,0,0.04)',
      lg: '0 10px 20px rgba(0,0,0,0.05)',
      xl: '0 15px 30px rgba(0,0,0,0.06)',
      '2xl': '0 25px 40px rgba(0,0,0,0.08)',
    },
    elevation: {
      '0': 'none',
      '1': '0 1px 3px rgba(0,0,0,0.03)',
      '2': '0 3px 6px rgba(0,0,0,0.04)',
      '3': '0 6px 12px rgba(0,0,0,0.04)',
      '4': '0 10px 20px rgba(0,0,0,0.05)',
      '5': '0 15px 30px rgba(0,0,0,0.06)',
    },
  },
  AI: {
    label: 'AI',
    description:
      'Futuristic, sophisticated dark-mode optimized colors and glowing elevation systems for AI products.',
    colorTokens: [
      { name: 'Primary', value: '#6366f1' },
      { name: 'Secondary', value: '#8b5cf6' },
      { name: 'Accent', value: '#06b6d4' },
      { name: 'Surface', value: '#f5f3ff' },
    ],
    typography: {
      sans: 'Plus Jakarta Sans',
      display: 'Space Grotesk',
      mono: 'JetBrains Mono',
    },
    spacingUnit: 16,
    borderRadius: {
      none: '0',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '0.875rem',
      lg: '1.25rem',
      xl: '1.75rem',
      '2xl': '2.25rem',
      '3xl': '2.75rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 2px rgba(99,102,241,0.05)',
      sm: '0 2px 4px rgba(99,102,241,0.08), 0 1px 2px rgba(99,102,241,0.04)',
      md: '0 6px 12px rgba(99,102,241,0.12), 0 2px 4px rgba(99,102,241,0.06)',
      lg: '0 12px 24px rgba(99,102,241,0.15), 0 4px 8px rgba(99,102,241,0.08)',
      xl: '0 20px 40px rgba(99,102,241,0.20), 0 8px 16px rgba(99,102,241,0.10)',
      '2xl': '0 28px 56px rgba(99,102,241,0.25)',
    },
    elevation: {
      '0': 'none',
      '1': '0 2px 4px rgba(99,102,241,0.08)',
      '2': '0 6px 12px rgba(99,102,241,0.12)',
      '3': '0 12px 24px rgba(99,102,241,0.15)',
      '4': '0 20px 40px rgba(99,102,241,0.20)',
      '5': '0 28px 56px rgba(99,102,241,0.25)',
    },
  },
  SaaS: {
    label: 'SaaS',
    description:
      'Clean, modern colors and industry-standard grids for scalable software-as-a-service platforms.',
    colorTokens: [
      { name: 'Primary', value: '#3b82f6' },
      { name: 'Secondary', value: '#6366f1' },
      { name: 'Accent', value: '#10b981' },
      { name: 'Surface', value: '#f8fafc' },
    ],
    typography: {
      sans: 'Inter',
      display: 'Plus Jakarta Sans',
      mono: 'JetBrains Mono',
    },
    spacingUnit: 16,
    borderRadius: {
      none: '0',
      xs: '0.1875rem',
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 2px rgba(0,0,0,0.05)',
      sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)',
      lg: '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.03)',
      xl: '0 20px 25px rgba(0,0,0,0.10), 0 8px 10px rgba(0,0,0,0.04)',
      '2xl': '0 25px 50px rgba(0,0,0,0.15)',
    },
    elevation: {
      '0': 'none',
      '1': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      '2': '0 3px 6px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)',
      '3': '0 6px 12px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
      '4': '0 10px 20px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.06)',
      '5': '0 15px 30px rgba(0,0,0,0.14), 0 5px 10px rgba(0,0,0,0.08)',
    },
  },
  Travel: {
    label: 'Travel',
    description:
      'Warm, organic tones, beautiful serifs, and spacious layouts for travel and discovery experiences.',
    colorTokens: [
      { name: 'Primary', value: '#0891b2' },
      { name: 'Secondary', value: '#f59e0b' },
      { name: 'Accent', value: '#e11d48' },
      { name: 'Surface', value: '#ecfdf5' },
    ],
    typography: {
      sans: 'Outfit',
      display: 'Playfair Display',
      mono: 'Source Code Pro',
    },
    spacingUnit: 18,
    borderRadius: {
      none: '0',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 3px rgba(8,145,178,0.02)',
      sm: '0 2px 6px rgba(8,145,178,0.04)',
      md: '0 6px 12px rgba(8,145,178,0.04)',
      lg: '0 12px 24px rgba(8,145,178,0.05)',
      xl: '0 18px 36px rgba(8,145,178,0.06)',
      '2xl': '0 30px 48px rgba(8,145,178,0.08)',
    },
    elevation: {
      '0': 'none',
      '1': '0 1px 4px rgba(0,0,0,0.03)',
      '2': '0 3px 8px rgba(0,0,0,0.04)',
      '3': '0 6px 12px rgba(0,0,0,0.04)',
      '4': '0 12px 24px rgba(0,0,0,0.05)',
      '5': '0 18px 36px rgba(0,0,0,0.06)',
    },
  },
  Logistics: {
    label: 'Logistics',
    description:
      'Reliable, blocky styles and ultra-compact layouts designed for optimal supply chain utility and density.',
    colorTokens: [
      { name: 'Primary', value: '#0369a1' },
      { name: 'Secondary', value: '#475569' },
      { name: 'Accent', value: '#f97316' },
      { name: 'Surface', value: '#f1f5f9' },
    ],
    typography: {
      sans: 'Roboto',
      display: 'Work Sans',
      mono: 'IBM Plex Mono',
    },
    spacingUnit: 12,
    borderRadius: {
      none: '0',
      xs: '0.0625rem',
      sm: '0.125rem',
      md: '0.25rem',
      lg: '0.375rem',
      xl: '0.5rem',
      '2xl': '0.75rem',
      '3xl': '1rem',
      full: '9999px',
    },
    shadows: {
      xs: '0 1px 2px rgba(0,0,0,0.03)',
      sm: '0 1px 2px rgba(0,0,0,0.04)',
      md: '0 2px 4px rgba(0,0,0,0.04)',
      lg: '0 4px 6px rgba(0,0,0,0.05)',
      xl: '0 6px 12px rgba(0,0,0,0.06)',
      '2xl': '0 10px 18px rgba(0,0,0,0.08)',
    },
    elevation: {
      '0': 'none',
      '1': '0 1px 2px rgba(0,0,0,0.04)',
      '2': '0 2px 4px rgba(0,0,0,0.04)',
      '3': '0 4px 6px rgba(0,0,0,0.05)',
      '4': '0 6px 12px rgba(0,0,0,0.06)',
      '5': '0 10px 18px rgba(0,0,0,0.08)',
    },
  },
};

export const DesignRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const industry = state?.industry ?? 'SaaS';
  const meta = industryMeta[industry] ?? industryMeta.SaaS;

  const {
    projectName,
    setProjectName,
    history,
    pushHistory,
    updateMultipleKeyColors,
    updateTypographyFamily,
    updateSpacingUnit,
    updateBorderRadiusValue,
    updateShadowValue,
    updateElevationValue,
  } = useColorStore();
  const { user, logout } = useAuthStore();

  const [exportScope, setExportScope] = useState<'all' | 'color' | null>(null);

  // Dynamically load Google Fonts for preview specimen
  useEffect(() => {
    if (!meta.typography) return;
    const fonts = [meta.typography.sans, meta.typography.display, meta.typography.mono];
    fonts.forEach((name) => {
      if (!name) return;
      const encoded = encodeURIComponent(name).replace(/%20/g, '+');
      const id = `gf-${encoded}`;
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700;800&display=swap`;
        document.head.appendChild(link);
      }
    });
  }, [meta.typography]);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSave = useCallback(() => {
    if (saveTimerRef.current) return;
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = null;
    }, 300);
    const last = history[0];
    if (last && last.name === projectName && Date.now() - last.timestamp < 5000) {
      showAlert('Already Saved', `"${projectName}" was just saved. No duplicate created.`, 'info');
      return;
    }
    const snapshot = {
      id: Date.now().toString(),
      name: projectName,
      timestamp: Date.now(),
    };
    pushHistory(snapshot);
    showAlert('Project Saved', `"${projectName}" has been saved to your history.`, 'success');
  }, [projectName, history, pushHistory]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApplyRecommendations = () => {
    // 1. Apply Colors
    const primary = meta.colorTokens.find((t) => t.name === 'Primary')?.value;
    const secondary = meta.colorTokens.find((t) => t.name === 'Secondary')?.value;
    const tertiary = meta.colorTokens.find((t) => t.name === 'Accent')?.value;
    const neutral = meta.colorTokens.find((t) => t.name === 'Surface')?.value;

    const colorsToUpdate: Record<string, string> = {};
    if (primary) colorsToUpdate['primary'] = hexToHsl(primary);
    if (secondary) colorsToUpdate['secondary'] = hexToHsl(secondary);
    if (tertiary) colorsToUpdate['tertiary'] = hexToHsl(tertiary);
    if (neutral) {
      colorsToUpdate['neutral'] = hexToHsl(neutral);
      colorsToUpdate['neutralVariant'] = hexToHsl(neutral);
    }

    if (Object.keys(colorsToUpdate).length > 0) {
      updateMultipleKeyColors(colorsToUpdate);
    }

    // 2. Apply Typography
    if (meta.typography) {
      updateTypographyFamily('sans', meta.typography.sans);
      updateTypographyFamily('display', meta.typography.display);
      updateTypographyFamily('mono', meta.typography.mono);
    }

    // 3. Apply Spacing Unit
    if (meta.spacingUnit) {
      updateSpacingUnit(meta.spacingUnit);
    }

    // 4. Apply Border Radius
    if (meta.borderRadius) {
      for (const [key, val] of Object.entries(meta.borderRadius)) {
        updateBorderRadiusValue(key, val);
      }
    }

    // 5. Apply Shadows and Elevation if custom ones exist
    if (meta.shadows) {
      for (const [key, val] of Object.entries(meta.shadows)) {
        updateShadowValue(key, val);
      }
    }
    if (meta.elevation) {
      for (const [key, val] of Object.entries(meta.elevation)) {
        updateElevationValue(key, val);
      }
    }

    showAlert(
      'Recommendations Applied',
      `Design recommendations for the ${meta.label} industry have been applied.`,
      'success',
    );
    navigate('/dashboard');
  };

  const displayName = user?.name ?? 'User';
  const displayInitials = user?.initials ?? 'U';
  const displayEmail = user?.email ?? '';

  return (
    <div className="dr-root">
      {/* ── Dark Header (Dashboard Header) ──────────────── */}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <button
            className="dash-header-menu-btn"
            onClick={() => navigate('/dashboard')}
            aria-label="Go back to dashboard"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowLeft size={20} />
          </button>
          <img
            src="/logo-wt.svg"
            alt="Matisse"
            className="dash-logo-img"
            onClick={() => navigate('/')}
          />
          <input
            className="dashboard-project-name desktop-only"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            aria-label="Project name"
          />
        </div>

        <div className="dashboard-header-right">
          <button className="dash-header-btn" onClick={handleSave}>
            <Save size={14} />
            <span className="dash-header-btn-label">Save</span>
          </button>

          <button
            className="dash-header-btn dash-header-btn--primary"
            onClick={() => setExportScope('all')}
          >
            <Download size={14} />
            <span className="dash-header-btn-label">Export</span>
          </button>

          <button
            className="dash-header-icon-btn desktop-only"
            onClick={() => navigate('/settings')}
            aria-label="Settings &amp; notifications"
          >
            <Bell size={15} />
            <span className="dash-notif-dot" />
          </button>

          <Dropdown
            align="right"
            trigger={
              <div
                className="dash-user-avatar"
                style={{ background: user?.avatarColor ?? 'hsl(256, 34%, 48%)' }}
                title={displayName}
              >
                {displayInitials}
              </div>
            }
            header={
              <div className="dash-user-info">
                <p className="dash-user-name">{displayName}</p>
                <p className="dash-user-email">{displayEmail}</p>
              </div>
            }
            items={[
              {
                label: 'Settings',
                icon: <Settings size={14} />,
                onClick: () => navigate('/settings'),
              },
              {
                label: 'Sign out',
                icon: <LogOut size={14} />,
                danger: true,
                onClick: handleLogout,
              },
            ]}
          />
        </div>
      </header>

      <div className="dr-body">
        <div className="dr-industry-badge">
          <Sparkles size={13} />
          {meta.label} Industry
        </div>
        <p className="dr-intro">{meta.description}</p>

        {/* 1. Suggested Colors */}
        <div className="dr-section">
          <h3 className="dr-section__title">Suggested Color Tokens</h3>
          <p className="dr-intro" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
            Professionally selected base color keys to express branding and state.
          </p>
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

        {/* 2. Suggested Typography */}
        <div className="dr-section">
          <h3 className="dr-section__title">Typography Configuration</h3>
          <p className="dr-intro" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
            Specially chosen typeface combinations for readability, personality, and data
            expression.
          </p>
          <div className="dr-typo-container">
            <div className="dr-typo-font-list">
              <div className="dr-typo-font-card">
                <div className="dr-typo-font-meta">Sans-Serif Font</div>
                <div className="dr-typo-font-name">{meta.typography.sans}</div>
              </div>
              <div className="dr-typo-font-card">
                <div className="dr-typo-font-meta">Display Font</div>
                <div className="dr-typo-font-name">{meta.typography.display}</div>
              </div>
              <div className="dr-typo-font-card">
                <div className="dr-typo-font-meta">Monospace Font</div>
                <div className="dr-typo-font-name">{meta.typography.mono}</div>
              </div>
            </div>

            <div className="dr-typo-specimen" style={{ fontFamily: meta.typography.sans }}>
              <h4
                style={{
                  fontFamily: meta.typography.display,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  margin: '0 0 0.5rem',
                  color: 'var(--md-ref-role-onSurface)',
                }}
              >
                {meta.label} Dashboard
              </h4>
              <p
                style={{
                  margin: '0 0 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--md-ref-role-onSurfaceVariant)',
                  lineHeight: 1.5,
                }}
              >
                Matisse automatically manages responsive grids and unified typographic hierarchy.
              </p>
              <div
                style={{
                  fontFamily: meta.typography.mono,
                  fontSize: '0.75rem',
                  background: 'rgba(0,0,0,0.04)',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  color: '#ef4444',
                }}
              >
                const brandFont = "{meta.typography.sans}";
              </div>
            </div>
          </div>
        </div>

        {/* 3. Spacing & Roundness */}
        <div className="dr-section">
          <h3 className="dr-section__title">Spacing Scale &amp; Roundness</h3>
          <p className="dr-intro" style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>
            Base grid stepping units and organic curves defining visual elements' corners.
          </p>
          <div className="dr-spacing-container">
            <p className="dr-spacing-meta">
              <strong>Base spacing grid:</strong> {meta.spacingUnit}px grid system.
            </p>
            <div className="dr-radius-preview-row">
              {['xs', 'sm', 'md', 'lg', 'xl', 'full'].map((rKey) => (
                <div
                  key={rKey}
                  className="dr-radius-preview-card"
                  style={{ borderRadius: meta.borderRadius[rKey] }}
                >
                  Radius {rKey.toUpperCase()}
                  <br />
                  <span style={{ fontSize: '0.65rem', opacity: 0.8, fontFamily: 'monospace' }}>
                    {meta.borderRadius[rKey]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Elevation Depth & Shadowing */}
        {meta.elevation && (
          <div className="dr-section">
            <h3 className="dr-section__title">Elevation Tiers &amp; Shadows</h3>
            <p className="dr-intro" style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>
              Dynamic lighting states representing depth and layering of elements.
            </p>
            <div className="dr-elevation-preview-row">
              {[1, 3, 5].map((lvl) => (
                <div
                  key={lvl}
                  className="dr-elevation-preview-card"
                  style={{
                    boxShadow: meta.elevation?.[lvl],
                    borderRadius: meta.borderRadius.md,
                  }}
                >
                  Level {lvl} Shadow
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="dr-actions">
          <GlossyButton variant="outline" size="md" onClick={() => navigate('/dashboard')}>
            Back to Builder
          </GlossyButton>
          <GlossyButton
            variant="primary"
            size="md"
            icon={<Sparkles size={14} />}
            iconPosition="left"
            onClick={handleApplyRecommendations}
          >
            Apply Recommendations
          </GlossyButton>
        </div>
      </div>

      <ExportPanel
        isOpen={exportScope !== null}
        defaultScope={exportScope || 'all'}
        onClose={() => setExportScope(null)}
      />
    </div>
  );
};
