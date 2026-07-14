import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette,
  Type,
  LayoutGrid,
  Download,
  Save,
  Plus,
  Bell,
  LogOut,
  Eye,
  Menu,
  X,
  ArrowRight,
  Check,
  History,
  Settings,
  Zap,
  Layers,
  Box,
  Wind,
  Sparkles,
  Trash2,
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
import { Dropdown } from '../../design-system/components';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { FeatureCheckbox } from '../../components/FeatureCheckbox';
import { TypographyPanel } from './panels/TypographyPanel';
import { SpacingPanel } from './panels/SpacingPanel';
import { ShadowsPanel } from './panels/ShadowsPanel';
import { ElevationPanel } from './panels/ElevationPanel';
import { BorderRadiusPanel } from './panels/BorderRadiusPanel';
import './Dashboard.css';

type Feature =
  | 'color'
  | 'typography'
  | 'spacing'
  | 'shadows'
  | 'elevation'
  | 'borderRadius'
  | 'motion'
  | 'components';
type WorkspaceTab = 'builder' | 'preview';

const featureNav: { id: Feature; label: string; icon: React.ReactNode; soon?: boolean }[] = [
  { id: 'color', label: 'Color', icon: <Palette size={15} /> },
  { id: 'typography', label: 'Typography', icon: <Type size={15} /> },
  { id: 'spacing', label: 'Spacing', icon: <LayoutGrid size={15} /> },
  { id: 'shadows', label: 'Shadows', icon: <Layers size={15} /> },
  { id: 'elevation', label: 'Elevation', icon: <Box size={15} /> },
  { id: 'borderRadius', label: 'Border Radius', icon: <Sparkles size={15} /> },
  { id: 'motion', label: 'Motion', icon: <Wind size={15} />, soon: true },
  { id: 'components', label: 'Components', icon: <Sparkles size={15} /> },
];

const featureLabels: Record<Feature, string> = {
  color: 'Color Builder',
  typography: 'Typography',
  spacing: 'Spacing',
  shadows: 'Shadows',
  elevation: 'Elevation',
  borderRadius: 'Border Radius',
  motion: 'Motion',
  components: 'Components',
};

const industries = [
  'FinTech',
  'Healthcare',
  'E-commerce',
  'Education',
  'AI',
  'SaaS',
  'Travel',
  'Logistics',
];

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
    projectName,
    setProjectName,
    history,
    pushHistory,
    deleteHistoryItem,
    clearHistory,
    checklist,
    toggleChecklist,
    checkFeature,
  } = useColorStore();

  const [activeFeature, setActiveFeature] = useState<Feature>('color');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('builder');
  const [exportScope, setExportScope] = useState<'all' | 'color' | null>(null);
  const [mobileNav, setMobileNav] = useState<Feature | 'preview'>('color');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [presetsDrawerOpen, setPresetsDrawerOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

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

  const markFeatureDone = useCallback(
    (feature: keyof typeof checklist) => {
      if (!checklist[feature]) checkFeature(feature);
    },
    [checklist, checkFeature],
  );

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

  const handleCancelPresets = () => {
    setSelectedIndustry(null);
    setPresetsDrawerOpen(false);
  };

  const handleViewRecommendations = () => {
    if (!selectedIndustry) return;
    setPresetsDrawerOpen(false);
    setTimeout(() => {
      navigate('/design-recommendations', { state: { industry: selectedIndustry } });
    }, 250);
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

      {/* ── Body ─────────────────────────────────────── */}
      <div className="dashboard-body">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div className="dashboard-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}

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
              <p className="sidenav-section-label" style={{ margin: 0 }}>
                History
              </p>
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
          {/* Tab Bar Row */}
          <div className="workspace-tab-row">
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

            {activeFeature === 'color' && (
              <button className="explore-presets-btn" onClick={() => setPresetsDrawerOpen(true)}>
                Explore Presets <ArrowRight size={14} />
              </button>
            )}
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
                  <TypographyPanel markFeatureDone={markFeatureDone} />
                )}
                {activeFeature === 'spacing' && <SpacingPanel markFeatureDone={markFeatureDone} />}
                {activeFeature === 'shadows' && <ShadowsPanel />}
                {activeFeature === 'elevation' && <ElevationPanel />}
                {activeFeature === 'borderRadius' && <BorderRadiusPanel />}
                {activeFeature === 'motion' && (
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon">
                      <Wind size={26} />
                    </div>
                    <h3 className="workspace-placeholder-title">Motion & Animation</h3>
                    <p className="workspace-placeholder-desc">
                      Define easing curves, durations, and spring configs for consistent
                      transitions.
                    </p>
                    <span className="workspace-placeholder-badge">
                      <Zap size={11} /> Coming soon — Early Access
                    </span>
                  </div>
                )}
                {activeFeature === 'components' && <ComponentExplorer />}
              </>
            )}
            {activeTab === 'preview' && <PreviewPanel activeFeature={activeFeature} />}
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
          <button className="mobile-nav-btn" onClick={() => navigate('/settings')}>
            <Settings size={16} />
            Settings
          </button>
        </div>
      </nav>

      {presetsDrawerOpen && (
        <div className="presets-drawer-backdrop" onClick={handleCancelPresets} />
      )}
      <aside className={`presets-drawer${presetsDrawerOpen ? ' presets-drawer--open' : ''}`}>
        <div className="presets-drawer-header">
          <div>
            <h3>Explore Design Presets</h3>
            <p className="presets-drawer-subtitle">
              Choose the industry you're building for to receive professionally curated design
              recommendations.
            </p>
          </div>
          <button className="presets-drawer-close" onClick={handleCancelPresets}>
            <X size={16} />
          </button>
        </div>
        <div className="presets-drawer-body">
          <div className="presets-industry-list">
            {industries.map((industry) => (
              <button
                key={industry}
                className={`presets-industry-card${selectedIndustry === industry ? ' presets-industry-card--selected' : ''}`}
                onClick={() => setSelectedIndustry(industry)}
                type="button"
              >
                <span className="presets-industry-label">{industry}</span>
                {selectedIndustry === industry && (
                  <span className="presets-industry-check">
                    <Check size={14} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="presets-drawer-footer">
          <GlossyButton variant="outline" size="md" onClick={handleCancelPresets}>
            Cancel
          </GlossyButton>
          <GlossyButton
            variant="primary"
            size="md"
            disabled={!selectedIndustry}
            onClick={handleViewRecommendations}
            icon={<ArrowRight size={14} />}
            iconPosition="right"
          >
            View Recommendations
          </GlossyButton>
        </div>
      </aside>

      <ExportPanel
        isOpen={exportScope !== null}
        defaultScope={exportScope || 'all'}
        onClose={() => setExportScope(null)}
      />
    </div>
  );
};
