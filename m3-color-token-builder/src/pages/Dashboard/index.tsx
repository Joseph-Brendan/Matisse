import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette, Type, LayoutGrid, Download, Save, Plus,
  Bell, LogOut, Eye, Menu, X,
  History, Settings, Zap, Layers, Box, Wind, Sparkles, Trash2,
} from 'lucide-react';
import { KeyColorCard } from '../../components/KeyColorCard';
import { TonalPaletteEditor } from '../../components/TonalPaletteEditor';
import { RoleMappingTable } from '../../components/RoleMappingTable';
import { PreviewPanel } from '../../components/PreviewPanel';
import { ExportPanel } from '../../components/ExportPanel';
import { ComponentExplorer } from '../../components/ComponentExplorer';
import { useColorStore } from '../../store/useColorStore';
import { useAuthStore } from '../../store/useAuthStore';
import { showAlert, showConfirm } from '../../store/useConfirmStore';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { FontPicker } from '../../design-system/components/FontPicker/FontPicker';
import { Dropdown } from '../../design-system/components';
import { FeatureCheckbox } from '../../components/FeatureCheckbox';
import './Dashboard.css';

type Feature = 'color' | 'typography' | 'spacing' | 'shadows' | 'elevation' | 'borderRadius' | 'motion' | 'components';
type WorkspaceTab = 'builder' | 'preview';

const featureNav: { id: Feature; label: string; icon: React.ReactNode; soon?: boolean }[] = [
  { id: 'color',        label: 'Color',         icon: <Palette size={15} /> },
  { id: 'typography',   label: 'Typography',    icon: <Type size={15} /> },
  { id: 'spacing',      label: 'Spacing',       icon: <LayoutGrid size={15} /> },
  { id: 'shadows',      label: 'Shadows',       icon: <Layers size={15} /> },
  { id: 'elevation',    label: 'Elevation',     icon: <Box size={15} /> },
  { id: 'borderRadius', label: 'Border Radius', icon: <Sparkles size={15} /> },
  { id: 'motion',       label: 'Motion',        icon: <Wind size={15} />,       soon: true },
  { id: 'components',   label: 'Components',    icon: <Sparkles size={15} /> },
];

const featureLabels: Record<Feature, string> = {
  color:        'Color Builder',
  typography:   'Typography',
  spacing:      'Spacing',
  shadows:      'Shadows',
  elevation:    'Elevation',
  borderRadius: 'Border Radius',
  motion:       'Motion',
  components:   'Components',
};

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    projectName, setProjectName,
    history, pushHistory, deleteHistoryItem, clearHistory,
    checklist, toggleChecklist, checkFeature,
    typography, spacing, borderRadius, shadows, elevation,
    updateTypographyFamily, updateTypographySize, updateTypographyWeight,
    updateSpacingValue, updateSpacingUnit, updateBorderRadiusValue,
    updateShadowValue, updateElevationValue, updateShadowGlow
  } = useColorStore();

  const [activeFeature, setActiveFeature] = useState<Feature>('color');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('builder');
  const [exportScope, setExportScope] = useState<'all' | 'color' | null>(null);
  const [mobileNav, setMobileNav] = useState<Feature | 'preview'>('color');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const featureChecklistMap: Partial<Record<Feature, keyof typeof checklist>> = {
    color: 'color',
    typography: 'typography',
    spacing: 'spacing',
  };

  useEffect(() => {
    const key = featureChecklistMap[activeFeature];
    if (key && !checklist[key]) {
      checkFeature(key);
    }
  }, [activeFeature]);

  const handleSave = () => {
    const snapshot = {
      id: Date.now().toString(),
      name: projectName,
      timestamp: Date.now(),
    };
    pushHistory(snapshot);
    showAlert('Project Saved', `"${projectName}" has been saved to your history.`, 'success');
  };

  const handleNewProject = () => {
    const name = `Project ${history.length + 1}`;
    setProjectName(name);
    showAlert('New Project', `Started a new project: "${name}".`, 'info');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFeatureClick = (f: Feature) => {
    setActiveFeature(f);
    setActiveTab('builder');
    setSidebarOpen(false);
  };

  const handleMobileNav = (nav: Feature | 'preview') => {
    setMobileNav(nav);
    if (nav === 'preview') {
      setActiveTab('preview');
    } else {
      handleFeatureClick(nav as Feature);
    }
  };

  const displayName = user?.name ?? 'User';
  const displayInitials = user?.initials ?? 'U';
  const displayEmail = user?.email ?? '';

  return (
    <div className="dashboard-root">
      {/* ── Dark Header ──────────────────────────────── */}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <button
            className="dash-header-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <img src="/logo-wt.svg" alt="Matisse" className="dash-logo-img" onClick={() => navigate('/')} />
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

          <button className="dash-header-icon-btn desktop-only" onClick={() => navigate('/settings')} aria-label="Settings &amp; notifications">
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
                onClick: () => navigate('/settings')
              },
              {
                label: 'Sign out',
                icon: <LogOut size={14} />,
                danger: true,
                onClick: handleLogout
              }
            ]}
          />
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="dashboard-body">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && <div className="dashboard-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

        {/* ── Floating Left Sidenav ─────────────────── */}
        <aside className={`dashboard-sidenav${sidebarOpen ? ' dashboard-sidenav--open' : ''}`}>
          {/* New Project */}
          <button className="sidenav-new-project-btn" onClick={handleNewProject}>
            <Plus size={16} />
            New Project
          </button>

          <input
            className="dashboard-project-name mobile-only"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            aria-label="Project name"
            style={{ width: '100%', textAlign: 'center', marginBottom: '0.25rem' }}
          />

          {/* Feature Navigation */}
          <div className="sidenav-panel">
            <p className="sidenav-section-label">Features</p>
            {featureNav.map((f) => (
              <button
                key={f.id}
                className={`sidenav-feature-btn${activeFeature === f.id ? ' active' : ''}`}
                onClick={() => handleFeatureClick(f.id)}
              >
                <span className="sidenav-feature-icon">{f.icon}</span>
                {f.label}
                {f.soon && <span className="sidenav-soon-badge">Soon</span>}
              </button>
            ))}

            <div className="sidenav-divider" />

            {/* Progress Checklist */}
            <p className="sidenav-section-label">Progress</p>
            <div className="sidenav-checklist">
              {(Object.keys(checklist) as (keyof typeof checklist)[]).map((key) => (
                <FeatureCheckbox
                  key={key}
                  checked={checklist[key]}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  onChange={() => toggleChecklist(key)}
                />
              ))}
            </div>
          </div>

          {/* History */}
          <div className="sidenav-panel">
            <div className="sidenav-history-header">
              <p className="sidenav-section-label" style={{ margin: 0 }}>History</p>
              {history.length > 0 && (
                <button className="sidenav-clear-btn" onClick={clearHistory}>
                  Clear
                </button>
              )}
            </div>
            <div className="sidenav-history">
              {history.length === 0 ? (
                <p className="history-empty">No saves yet</p>
              ) : (
                history.slice(0, 5).map((h) => (
                  <div key={h.id} className="history-item" onClick={() => setProjectName(h.name)}>
                    <div className="history-item-content">
                      <span className="history-item-name">{h.name}</span>
                      <span className="history-item-time">
                        <History size={10} className="history-item-icon" />
                        {formatRelativeTime(h.timestamp)}
                      </span>
                    </div>
                    <button
                      className="history-item-delete-btn"
                      onClick={async (e) => {
                        e.stopPropagation();
                        const confirmDelete = await showConfirm({
                          title: 'Delete Save',
                          message: `Are you sure you want to delete "${h.name}" from your history?`,
                          confirmLabel: 'Delete',
                          dismissLabel: 'Cancel',
                          variant: 'error',
                          icon: Trash2,
                        });
                        if (confirmDelete) {
                          deleteHistoryItem(h.id);
                        }
                      }}
                      title="Delete saved state"
                      aria-label={`Delete ${h.name}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </aside>

        {/* ── Workspace ─────────────────────────────── */}
        <div className="dashboard-workspace">
          {/* Tab Bar */}
          <div className="workspace-tab-bar">
            <button
              className={`workspace-tab${activeTab === 'builder' ? ' active' : ''}`}
              onClick={() => setActiveTab('builder')}
            >
              {activeFeature === 'color' && <span className="workspace-tab-dot" />}
              {featureLabels[activeFeature]}
            </button>
            <button
              className={`workspace-tab${activeTab === 'preview' ? ' active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={14} />
              Preview
            </button>
          </div>

          {/* Panel */}
          <div className="workspace-panel">
            {activeTab === 'builder' && (
              <>
                {activeFeature === 'color' && (
                  <div className="color-feature-wrapper">
                    <KeyColorCard />
                    <TonalPaletteEditor />
                    <RoleMappingTable />
                  </div>
                )}
                {activeFeature === 'typography' && (
                  <div className="builder-split-grid">
                    {/* Controls */}
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
                                onChange={(family) => updateTypographyFamily(key, family)}
                                placeholder={`Search ${key} font…`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="builder-section">
                        <h4 className="builder-section-title">Scale Generator</h4>
                        <p className="builder-section-desc">Generate standard typographic hierarchy sizes using a mathematical scale factor.</p>
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
                              const base = parseFloat((document.getElementById('typo-base-input') as HTMLInputElement).value || '16');
                              const factor = parseFloat((document.getElementById('typo-scale-select') as HTMLSelectElement).value || '1.25');
                              const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
                              sizes.forEach((sz, idx) => {
                                const power = idx - 2; // base is index 2
                                const valPx = base * Math.pow(factor, power);
                                const valRem = valPx / 16;
                                updateTypographySize(sz, `${valRem.toFixed(3)}rem`);
                              });
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
                                onChange={(e) => updateTypographySize(key, e.target.value)}
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
                                onChange={(e) => updateTypographyWeight(key, Number(e.target.value))}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="builder-preview-panel">
                      <h4 className="builder-section-title">Aesthetic Specimen</h4>
                      <div className="builder-specimen-card" style={{ fontFamily: 'var(--matisse-font-family-sans)' }}>
                        <span style={{ fontSize: 'var(--matisse-font-size-xs)', fontWeight: 'var(--matisse-font-weight-bold)', color: 'var(--md-ref-role-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Typography Preview
                        </span>
                        <h1 style={{ fontSize: 'var(--matisse-font-size-4xl)', fontWeight: 'var(--matisse-font-weight-extrabold)', margin: '0.5rem 0 1rem 0', lineHeight: 'var(--matisse-line-height-tight)', fontFamily: 'var(--matisse-font-family-display)' }}>
                          Building dynamic design scales.
                        </h1>
                        <p style={{ fontSize: 'var(--matisse-font-size-base)', fontWeight: 'var(--matisse-font-weight-regular)', color: 'var(--md-ref-role-onSurfaceVariant)', lineHeight: 'var(--matisse-line-height-normal)', marginBottom: '1.5rem' }}>
                          Matisse allows teams to customize typography, spacing, and colors in one real-time workspace. Adjust settings to see this preview card update instantly.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <GlossyButton size="sm">Primary Specimen</GlossyButton>
                          <GlossyButton size="sm" variant="outline">Learn More</GlossyButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === 'spacing' && (
                  <div className="builder-split-grid">
                    {/* Controls */}
                    <div className="builder-controls-panel">
                      <div className="builder-section">
                        <h4 className="builder-section-title">Base Spacing Unit</h4>
                        <p className="builder-section-desc">Change the base grid step (in pixels) to scale the layout spacing steps mathematically.</p>
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
                                onChange={(e) => updateSpacingValue(key, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="builder-preview-panel">
                      <h4 className="builder-section-title">Grid Layout Preview</h4>
                      <div className="builder-specimen-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p className="builder-section-desc" style={{ margin: 0 }}>Visual representation of spacer tokens:</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {['1', '2', '3', '4', '6', '8', '12'].map((step) => (
                            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span style={{ fontSize: '0.8125rem', fontWeight: 600, width: '60px', fontFamily: 'monospace' }}>Step {step}</span>
                              <div
                                style={{
                                  height: '24px',
                                  width: spacing[step] || '1rem',
                                  background: 'linear-gradient(90deg, var(--md-ref-role-primary), var(--md-ref-role-secondary))',
                                  borderRadius: 'var(--matisse-radius-sm)',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                }}
                              />
                              <span style={{ fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontFamily: 'monospace' }}>{spacing[step]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === 'shadows' && (
                  <div className="builder-split-grid">
                    {/* Controls */}
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

                    {/* Preview */}
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
                )}
                {activeFeature === 'elevation' && (
                  <div className="builder-split-grid">
                    {/* Controls */}
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

                    {/* Preview */}
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
                            <span className="elevation-tier-row-value" title={val}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === 'borderRadius' && (
                  <div className="builder-split-grid">
                    {/* Controls */}
                    <div className="builder-controls-panel">
                      <div className="builder-section">
                        <h4 className="builder-section-title">Border Radius Scale</h4>
                        <p className="builder-section-desc">Customize container corner rounding presets used in inputs, cards, and buttons.</p>
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

                    {/* Preview */}
                    <div className="builder-preview-panel">
                      <h4 className="builder-section-title">Corner Rounding Previews</h4>
                      <div className="builder-preview-grid builder-preview-grid--br">
                        {Object.entries(borderRadius).map(([key, val]) => (
                          <div
                            key={key}
                            className="builder-preview-card"
                            style={{ borderRadius: val, gap: '0.5rem' }}
                          >
                            <span className="builder-preview-card-title" style={{ textTransform: 'none' }}>{key}</span>
                            <span className="builder-preview-card-sub" style={{ fontFamily: 'monospace' }}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === 'motion' && (
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon"><Wind size={26} /></div>
                    <h3 className="workspace-placeholder-title">Motion & Animation</h3>
                    <p className="workspace-placeholder-desc">Define easing curves, durations, and spring configs for consistent transitions.</p>
                    <span className="workspace-placeholder-badge"><Zap size={11} /> Coming soon — Early Access</span>
                  </div>
                )}
                {activeFeature === 'components' && (
                  <ComponentExplorer />
                )}
              </>
            )}
            {activeTab === 'preview' && (
              <PreviewPanel />
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Bottom Nav ─────────────────────── */}
      <nav className="dashboard-mobile-nav">
        <div className="mobile-nav-inner">
          <button
            className={`mobile-nav-btn${activeFeature === 'color' && activeTab === 'builder' ? ' active' : ''}`}
            onClick={() => handleMobileNav('color')}
          >
            <Palette size={16} />
            Color
          </button>
          <button
            className={`mobile-nav-btn${activeFeature === 'typography' && activeTab === 'builder' ? ' active' : ''}`}
            onClick={() => handleMobileNav('typography')}
          >
            <Type size={16} />
            Type
          </button>
          <button
            className={`mobile-nav-btn${mobileNav === 'preview' ? ' active' : ''}`}
            onClick={() => handleMobileNav('preview')}
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            className="mobile-nav-btn"
            onClick={() => navigate('/settings')}
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
      </nav>

      <ExportPanel isOpen={exportScope !== null} defaultScope={exportScope || 'all'} onClose={() => setExportScope(null)} />
    </div>
  );
};
