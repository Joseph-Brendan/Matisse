import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette, Type, LayoutGrid, Download, Save, Plus,
  Bell, LogOut, ChevronDown, Eye, Check,
  History, FolderOpen, Settings, Zap, Layers, Box, Wind, Sparkles,
} from 'lucide-react';
import { KeyColorCard } from '../../components/KeyColorCard';
import { TonalPaletteEditor } from '../../components/TonalPaletteEditor';
import { RoleMappingTable } from '../../components/RoleMappingTable';
import { PreviewPanel } from '../../components/PreviewPanel';
import { ExportPanel } from '../../components/ExportPanel';
import { useColorStore } from '../../store/useColorStore';
import { useAuthStore } from '../../store/useAuthStore';
import { showToast } from '../../store/useToastStore';
import './Dashboard.css';

type Feature = 'color' | 'typography' | 'spacing' | 'shadows' | 'elevation' | 'borderRadius' | 'motion' | 'components';
type WorkspaceTab = 'builder' | 'preview';

const featureNav: { id: Feature; label: string; icon: React.ReactNode; soon?: boolean }[] = [
  { id: 'color',        label: 'Color',         icon: <Palette size={15} /> },
  { id: 'typography',   label: 'Typography',    icon: <Type size={15} />,       soon: true },
  { id: 'spacing',      label: 'Spacing',       icon: <LayoutGrid size={15} />, soon: true },
  { id: 'shadows',      label: 'Shadows',       icon: <Layers size={15} />,     soon: true },
  { id: 'elevation',    label: 'Elevation',     icon: <Box size={15} />,        soon: true },
  { id: 'borderRadius', label: 'Border Radius', icon: <Sparkles size={15} />,   soon: true },
  { id: 'motion',       label: 'Motion',        icon: <Wind size={15} />,       soon: true },
  { id: 'components',   label: 'Components',    icon: <Sparkles size={15} />,   soon: true },
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
    history, pushHistory, clearHistory,
    checklist, toggleChecklist,
  } = useColorStore();

  const [activeFeature, setActiveFeature] = useState<Feature>('color');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('builder');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileNav, setMobileNav] = useState<Feature | 'preview'>('color');

  const exportRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSave = () => {
    const snapshot = {
      id: Date.now().toString(),
      name: projectName,
      timestamp: Date.now(),
    };
    pushHistory(snapshot);
    showToast('success', `"${projectName}" saved`);
  };

  const handleNewProject = () => {
    const name = `Project ${history.length + 1}`;
    setProjectName(name);
    showToast('info', `Started new project: ${name}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFeatureClick = (f: Feature) => {
    setActiveFeature(f);
    setActiveTab('builder');
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
          <img src="/logo-wt.svg" alt="Matisse" onClick={() => navigate('/')} style={{ height: '54px', cursor: 'pointer', objectFit: 'contain' }} />
          <input
            className="dashboard-project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            aria-label="Project name"
          />
        </div>

        <div className="dashboard-header-right">
          <button className="dash-header-btn" onClick={handleSave}>
            <Save size={14} />
            <span>Save</span>
          </button>

          {/* Export dropdown */}
          <div className="dash-export-wrapper" ref={exportRef}>
            <button
              className="dash-header-btn dash-header-btn--primary"
              onClick={() => setShowExportMenu((v) => !v)}
            >
              <Download size={14} />
              <span>Export</span>
              <ChevronDown size={12} />
            </button>
            {showExportMenu && (
              <div className="dash-export-dropdown">
                <button className="dash-export-item" onClick={() => { setIsExportOpen(true); setShowExportMenu(false); }}>
                  <Palette size={14} /> Export Color Tokens
                </button>
                <button className="dash-export-item" onClick={() => { showToast('info', 'Full export coming soon'); setShowExportMenu(false); }}>
                  <Download size={14} /> Export All Tokens
                </button>
              </div>
            )}
          </div>

          <button className="dash-header-icon-btn" onClick={() => showToast('info', 'No new notifications')}>
            <Bell size={15} />
            <span className="dash-notif-dot" />
          </button>

          {/* User avatar + dropdown */}
          <div className="dash-user-dropdown-wrapper" ref={userRef}>
            <div
              className="dash-user-avatar"
              style={{ background: user?.avatarColor ?? 'hsl(256, 34%, 48%)' }}
              onClick={() => setShowUserMenu((v) => !v)}
              title={displayName}
            >
              {displayInitials}
            </div>
            {showUserMenu && (
              <div className="dash-user-dropdown">
                <div className="dash-user-info">
                  <p className="dash-user-name">{displayName}</p>
                  <p className="dash-user-email">{displayEmail}</p>
                </div>
                <button className="dash-user-menu-item" onClick={() => { showToast('info', 'Settings coming soon'); setShowUserMenu(false); }}>
                  <Settings size={14} /> Settings
                </button>
                <button className="dash-user-menu-item dash-user-menu-item--danger" onClick={handleLogout}>
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="dashboard-body">
        {/* ── Floating Left Sidenav ─────────────────── */}
        <aside className="dashboard-sidenav">
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
                <div
                  key={key}
                  className={`checklist-item${checklist[key] ? ' done' : ''}`}
                  onClick={() => toggleChecklist(key)}
                >
                  <div className={`checklist-box${checklist[key] ? ' checked' : ''}`}>
                    {checklist[key] && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className="checklist-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="sidenav-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: '0.25rem' }}>
              <p className="sidenav-section-label" style={{ margin: 0 }}>History</p>
              {history.length > 0 && (
                <button
                  style={{ background: 'none', border: 'none', fontSize: '0.6875rem', color: '#9ca3af', cursor: 'pointer', padding: '0.25rem 0.5rem', borderRadius: '4px', fontFamily: 'inherit' }}
                  onClick={clearHistory}
                >
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
                    <span className="history-item-name">{h.name}</span>
                    <span className="history-item-time">
                      <History size={10} style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }} />
                      {formatRelativeTime(h.timestamp)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* New Project */}
          <button className="sidenav-new-project-btn" onClick={handleNewProject}>
            <Plus size={16} />
            New Project
          </button>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <KeyColorCard />
                    <TonalPaletteEditor />
                    <RoleMappingTable />
                  </div>
                )}
                {activeFeature === 'typography' && (
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon"><Type size={26} /></div>
                    <h3 className="workspace-placeholder-title">Typography Builder</h3>
                    <p className="workspace-placeholder-desc">Define font families, size scales, and weights for your design system tokens.</p>
                    <span className="workspace-placeholder-badge"><Zap size={11} /> Coming soon — Early Access</span>
                  </div>
                )}
                {activeFeature === 'spacing' && (
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon"><LayoutGrid size={26} /></div>
                    <h3 className="workspace-placeholder-title">Spacing System</h3>
                    <p className="workspace-placeholder-desc">Build a base unit grid and generate tonal spacing scales for consistent layouts.</p>
                    <span className="workspace-placeholder-badge"><Zap size={11} /> Coming soon — Early Access</span>
                  </div>
                )}
                {activeFeature === 'shadows' && (
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon"><Layers size={26} /></div>
                    <h3 className="workspace-placeholder-title">Shadow Design System</h3>
                    <p className="workspace-placeholder-desc">Define elevation levels and shadow tokens — from subtle cards to modal overlays.</p>
                    <span className="workspace-placeholder-badge"><Zap size={11} /> Coming soon — Early Access</span>
                  </div>
                )}
                {activeFeature === 'elevation' && (
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon"><Box size={26} /></div>
                    <h3 className="workspace-placeholder-title">Elevation Levels</h3>
                    <p className="workspace-placeholder-desc">Map Material 3 elevation tiers with layered surfaces and tonal color overlays.</p>
                    <span className="workspace-placeholder-badge"><Zap size={11} /> Coming soon — Early Access</span>
                  </div>
                )}
                {activeFeature === 'borderRadius' && (
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon"><Sparkles size={26} /></div>
                    <h3 className="workspace-placeholder-title">Border Radius Scale</h3>
                    <p className="workspace-placeholder-desc">Create a consistent corner radius scale from sharp to fully rounded elements.</p>
                    <span className="workspace-placeholder-badge"><Zap size={11} /> Coming soon — Early Access</span>
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
                  <div className="workspace-placeholder">
                    <div className="workspace-placeholder-icon"><Sparkles size={26} /></div>
                    <h3 className="workspace-placeholder-title">Component Library</h3>
                    <p className="workspace-placeholder-desc">Browse and preview all design system components styled with your current tokens.</p>
                    <span className="workspace-placeholder-badge"><Zap size={11} /> Coming soon — Early Access</span>
                  </div>
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
          {featureNav.map((f) => (
            <button
              key={f.id}
              className={`mobile-nav-btn${mobileNav === f.id ? ' active' : ''}`}
              onClick={() => handleMobileNav(f.id)}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
          <button
            className={`mobile-nav-btn${mobileNav === 'preview' ? ' active' : ''}`}
            onClick={() => handleMobileNav('preview')}
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            className="mobile-nav-btn"
            onClick={() => { showToast('info', 'Projects panel coming soon'); }}
          >
            <FolderOpen size={16} />
            Projects
          </button>
        </div>
      </nav>

      <ExportPanel isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
};
