import React, { useState } from 'react';
import {
  Palette, Type, Grid3x3, Layers, Sparkles, Bell,
  User, Mail, Lock, CheckCircle2, AlertCircle, MapPin, Trash2, ExternalLink
} from 'lucide-react';
import { useColorStore } from '../store/useColorStore';
import { showConfirm, showAlert } from '../store/useConfirmStore';

// Components
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { Badge } from '../design-system/components/Badge/Badge';
import { Input } from '../design-system/components/Input/Input';
import { Alert } from '../design-system/components/Alert/Alert';
import { Tabs, TabPanel } from '../design-system/components/Tabs/Tabs';
import './ComponentExplorer.css';

export const ComponentExplorer: React.FC = () => {
  const { roles, theme, typography, spacing, borderRadius, shadows, elevation } = useColorStore();
  const [activeExplorerTab, setActiveExplorerTab] = useState('colors');
  const [inputValue, setInputValue] = useState('');

  const activeRoles = roles[theme];

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showAlert('Copied', `Token value copied to clipboard.`, 'success');
  };

  return (
    <div className="component-explorer">
      {/* Navigation Sidebar */}
      <aside className="component-explorer__sidebar">
        <div className="explorer-nav-label">Design Tokens</div>

        {[
          { id: 'colors', label: 'Color Roles', icon: <Palette size={18} /> },
          { id: 'typography', label: 'Typography', icon: <Type size={18} /> },
          { id: 'spacing', label: 'Spacing & Radius', icon: <Grid3x3 size={18} /> },
          { id: 'shadows', label: 'Shadows & Elevation', icon: <Layers size={18} /> },
        ].map((item) => (
          <button
            key={item.id}
            className={`explorer-nav-btn${activeExplorerTab === item.id ? ' explorer-nav-btn--active' : ''}`}
            onClick={() => setActiveExplorerTab(item.id)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div className="explorer-nav-divider" />

        <div className="explorer-nav-label">Components</div>

        {[
          { id: 'buttons', label: 'Glossy Buttons', icon: <Sparkles size={18} /> },
          { id: 'inputs', label: 'Text Fields', icon: <Mail size={18} /> },
          { id: 'cards', label: 'Cards & Panels', icon: <Layers size={18} /> },
          { id: 'alerts-toasts', label: 'Alerts & Toasts', icon: <Bell size={18} /> },
        ].map((item) => (
          <button
            key={item.id}
            className={`explorer-nav-btn${activeExplorerTab === item.id ? ' explorer-nav-btn--active' : ''}`}
            onClick={() => setActiveExplorerTab(item.id)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </aside>

      {/* Content Area */}
      <main className="component-explorer__content">
        {/* Colors Panel */}
        {activeExplorerTab === 'colors' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Semantic Color Roles</h2>
              <p>Dynamically resolved values based on Material 3 tonal palettes. Click a swatch to copy its HSL.</p>
            </div>

            <div className="explorer-grid explorer-grid--color-roles">
              {activeRoles.map((role) => (
                <div
                  key={role.name}
                  className="explorer-color-role-card"
                  onClick={() => handleCopyText(role.resolvedValue)}
                >
                  <div>
                    <span className="explorer-color-role-card-name">{role.name}</span>
                    <p className="explorer-color-role-card-value">{role.resolvedValue}</p>
                    <p className="explorer-color-role-card-ref">{role.reference}</p>
                  </div>
                  <div
                    className="explorer-color-role-card-swatch"
                    style={{ background: role.resolvedValue }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Typography Panel */}
        {activeExplorerTab === 'typography' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Typography Scale</h2>
              <p>Open Sans system font scales mapped to standard sizing slots.</p>
            </div>

            {/* Font Families */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Font Families" subtitle="Ref definitions for displays, body text, and code." />
              <div className="explorer-card-inner">
                {Object.entries(typography.fontFamily).map(([name, family]) => (
                  <div key={name} className="explorer-typo-card-item">
                    <span className="explorer-typo-card-item-name">{name}</span>
                    <span className="explorer-typo-card-item-value" style={{ fontFamily: family }}>{family}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Font Sizes */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Sizes & Alignment" subtitle="Visual preview of the standard type scale." />
              <div className="explorer-card-inner explorer-card-inner--lg">
                {Object.entries(typography.fontSize).map(([size, value]) => (
                  <div key={size} className="explorer-typo-size-row">
                    <div className="explorer-typo-size-label">
                      <span className="explorer-typo-size-name">{size}</span>
                      <p className="explorer-typo-size-value">{value}</p>
                    </div>
                    <div className="explorer-typo-size-preview" style={{ fontSize: value }}>
                      Sphinx of black quartz, judge my vow.
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Spacing & Radius Panel */}
        {activeExplorerTab === 'spacing' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Spacing & Borders</h2>
              <p>4px-based grid steps and rounded border-radius tokens.</p>
            </div>

            {/* Border Radius */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Border Radius Scale" subtitle="Rounding definitions used across containers, buttons, and inputs." />
              <div className="explorer-grid explorer-grid--border-radius" style={{ marginTop: '1rem' }}>
                {Object.entries(borderRadius).map(([name, value]) => (
                  <div
                    key={name}
                    className="explorer-br-card"
                    style={{ borderRadius: value }}
                  >
                    <span className="explorer-br-card-name">{name}</span>
                    <p className="explorer-br-card-value">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Spacing Scale */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Spacing Blocks" subtitle="Linear spacer guides (showing key increments)." />
              <div className="explorer-card-inner">
                {['0.5', '1', '2', '3', '4', '6', '8'].map((key) => {
                  const value = spacing[key as keyof typeof spacing];
                  return (
                    <div key={key} className="explorer-spacing-row">
                      <div className="explorer-spacing-row-label">
                        <span className="explorer-spacing-row-name">Step {key}</span>
                        <p className="explorer-spacing-row-value">{value}</p>
                      </div>
                      <div
                        className="explorer-spacing-row-bar"
                        style={{ width: value }}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* Shadows & Elevation Panel */}
        {activeExplorerTab === 'shadows' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Shadows & Elevation</h2>
              <p>Atmospheric shadows and standard elevation layers.</p>
            </div>

            {/* Elevation cards */}
            <div className="explorer-grid explorer-grid--elevation">
              {Object.entries(elevation).map(([level, value]) => (
                <div
                  key={level}
                  className="explorer-elevation-card"
                  style={{
                    boxShadow: value,
                    border: level === '0' ? '1px solid var(--md-ref-role-outlineVariant)' : 'none',
                  }}
                >
                  <span className="explorer-elevation-card-title">Elevation {level}</span>
                  <p className="explorer-elevation-card-value" title={value}>{value}</p>
                </div>
              ))}
            </div>

            {/* Glow states */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Glow Shadows" subtitle="Vibrant colored shadow effects mapped to variants." />
              <div className="explorer-grid explorer-grid--glows" style={{ marginTop: '1rem' }}>
                {Object.entries(shadows.glow).map(([name, shadowValue]) => (
                  <div
                    key={name}
                    className="explorer-glow-card"
                    style={{ boxShadow: shadowValue }}
                  >
                    <span className="explorer-glow-card-name">{name} Glow</span>
                    <p className="explorer-glow-card-sub">Active Glow State</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Component Showcase - Buttons */}
        {activeExplorerTab === 'buttons' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Glossy Buttons Component</h2>
              <p>Showcasing all Glossy Button variants, sizes, and icon integrations.</p>
            </div>

            <Card variant="outlined" padding="lg">
              <CardHeader title="Variants & Aesthetics" subtitle="Dynamic theme-aware buttons displaying correct inline horizontal row alignment with icons." />
              <div className="explorer-showcase-row">
                <GlossyButton variant="primary"><Sparkles size={16} /> Primary Action</GlossyButton>
                <GlossyButton variant="secondary"><User size={16} /> Secondary Action</GlossyButton>
                <GlossyButton variant="tertiary"><CheckCircle2 size={16} /> Tertiary Action</GlossyButton>
                <GlossyButton variant="error"><AlertCircle size={16} /> Error State</GlossyButton>
                <GlossyButton variant="outline"><ExternalLink size={16} /> Outlined</GlossyButton>
                <GlossyButton variant="ghost"><ExternalLink size={16} style={{ transform: 'rotate(180deg)' }} /> Ghost Link</GlossyButton>
              </div>
            </Card>

            <Card variant="outlined" padding="lg">
              <CardHeader title="Button Sizes" subtitle="Explore xs, sm, md, lg, and xl scaling." />
              <div className="explorer-showcase-row">
                <GlossyButton size="xs" variant="primary"><Sparkles size={12} /> Extra Small</GlossyButton>
                <GlossyButton size="sm" variant="primary"><Sparkles size={14} /> Small</GlossyButton>
                <GlossyButton size="md" variant="primary"><Sparkles size={16} /> Medium</GlossyButton>
                <GlossyButton size="lg" variant="primary"><Sparkles size={18} /> Large</GlossyButton>
                <GlossyButton size="xl" variant="primary"><Sparkles size={20} /> Extra Large</GlossyButton>
              </div>
            </Card>

            <Card variant="outlined" padding="lg">
              <CardHeader title="Badges Scale" subtitle="Explore normal, primary dot, removable, and custom-colored semantic tags." />
              <div className="explorer-showcase-row explorer-showcase-row--tight">
                <Badge variant="neutral">Neutral Tag</Badge>
                <Badge variant="primary" dot>Primary Info</Badge>
                <Badge variant="secondary">Secondary Type</Badge>
                <Badge variant="tertiary">Tertiary Tag</Badge>
                <Badge variant="success">Success Tag</Badge>
                <Badge variant="warning">Warning Tag</Badge>
                <Badge variant="error" removable onRemove={() => showAlert('Badge Dismissed', 'The error badge has been removed.', 'info')}>Removable Error</Badge>
                <Badge variant="info">Info State</Badge>
              </div>
            </Card>
          </div>
        )}

        {/* Component Showcase - Inputs */}
        {activeExplorerTab === 'inputs' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Input Fields</h2>
              <p>Text fields with outline, filled, and underlined aesthetics supporting prefix icons, validations, and loading states.</p>
            </div>

            <div className="explorer-grid explorer-grid--inputs">
              <Card variant="outlined" padding="lg">
                <CardHeader title="Outlined Inputs" />
                <div className="explorer-card-inner" style={{ gap: '1.25rem' }}>
                  <Input label="Email address" placeholder="email@example.com" icon={<Mail size={16} />} fullWidth />
                  <Input label="Password" type="password" placeholder="Enter your password" icon={<Lock size={16} />} fullWidth />
                </div>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader title="Filled Inputs" />
                <div className="explorer-card-inner" style={{ gap: '1.25rem' }}>
                  <Input variant="filled" label="Username" placeholder="Enter username" icon={<User size={16} />} fullWidth />
                  <Input variant="filled" label="Search system" placeholder="Search..." icon={<ExternalLink size={16} />} fullWidth />
                </div>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader title="Validation States" />
                <div className="explorer-card-inner" style={{ gap: '1.25rem' }}>
                  <Input
                    label="Input with error"
                    placeholder="Invalid input"
                    error="This field is required and must match patterns."
                    icon={<AlertCircle size={16} />}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    fullWidth
                  />
                  <Input
                    label="Disabled field"
                    placeholder="No typing here"
                    disabled
                    icon={<Lock size={16} />}
                    fullWidth
                  />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Component Showcase - Cards */}
        {activeExplorerTab === 'cards' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Cards & Content Containers</h2>
              <p>Standard layouts for cards, headers, actions, and buttons.</p>
            </div>

            <div className="explorer-grid explorer-grid--cards">
              <Card variant="elevated" hoverable>
                <CardHeader title="Elevated Card" subtitle="Hover to test card translation scale." />
                <CardContent>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                    This card uses shadows for spatial depth, perfect for grid elements.
                  </p>
                </CardContent>
                <CardFooter>
                  <GlossyButton size="xs" variant="outline">Learn More</GlossyButton>
                  <GlossyButton size="xs">Action</GlossyButton>
                </CardFooter>
              </Card>

              <Card variant="outlined">
                <CardHeader title="Outlined Card" subtitle="Sleek border container." />
                <CardContent>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                    This container style works best on rich backgrounds like grey dashboard grids.
                  </p>
                </CardContent>
                <CardFooter>
                  <GlossyButton size="xs" variant="ghost">Close</GlossyButton>
                  <GlossyButton size="xs" variant="tertiary">Apply</GlossyButton>
                </CardFooter>
              </Card>

              <Card variant="filled">
                <CardHeader title="Filled Container" subtitle="Integrated backdrop." />
                <CardContent>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                    Uses the container surface color directly to embed content blocks.
                  </p>
                </CardContent>
                <CardFooter>
                  <GlossyButton size="xs" variant="outline">Back</GlossyButton>
                  <GlossyButton size="xs" variant="secondary">Proceed</GlossyButton>
                </CardFooter>
              </Card>
            </div>

            <div className="explorer-tabs-section">
              <Card variant="outlined" padding="lg">
                <CardHeader title="Tabs Navigation" subtitle="Sleek, theme-integrated Pills, Segmented, and Underline navigation panels." />
                <CardContent>
                  <Tabs
                    tabs={[
                      { id: 'tab-explore-1', label: 'Overview Profile', icon: <User size={16} /> },
                      { id: 'tab-explore-2', label: 'Active Alerts', badge: 4 },
                      { id: 'tab-explore-3', label: 'Settings Control', disabled: true },
                    ]}
                  >
                    <TabPanel tabId="tab-explore-1">
                      <div style={{ padding: '1rem 0 0', fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                        This tab demonstrates interactive profile loading. Matisse tabs support Lucide icons, disabled states, and numerical badges natively.
                      </div>
                    </TabPanel>
                    <TabPanel tabId="tab-explore-2">
                      <div style={{ padding: '1rem 0 0', fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                        This tab simulates system logging parameters and telemetry updates.
                      </div>
                    </TabPanel>
                    <TabPanel tabId="tab-explore-3">
                      <div style={{ padding: '1rem 0 0', fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                        Settings control panel (Disabled).
                      </div>
                    </TabPanel>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Component Showcase - Alerts & Toasts */}
        {activeExplorerTab === 'alerts-toasts' && (
          <div className="explorer-section">
            <div className="explorer-section-header">
              <h2>Alerts & Toast Notifications</h2>
              <p>Interactive system feedbacks and temporary overlay notifications.</p>
            </div>

            <div className="explorer-alerts-column">
              <Card variant="outlined" padding="lg">
                <CardHeader title="Trigger Alert Dialogs" subtitle="Simulate each alert variant programmatically." />
                <div className="explorer-showcase-row" style={{ marginTop: '1rem' }}>
                  <GlossyButton variant="primary" onClick={() => showAlert('System Info', 'Loading system tokens config...', 'info')}>
                    Info Alert
                  </GlossyButton>
                  <GlossyButton variant="tertiary" onClick={() => showAlert('Tokens Exported', 'Design tokens have been exported successfully!', 'success')}>
                    Success Alert
                  </GlossyButton>
                  <GlossyButton variant="secondary" onClick={() => showAlert('Contrast Warning', 'Low color contrast detected on outline variant.', 'warning')}>
                    Warning Alert
                  </GlossyButton>
                  <GlossyButton variant="error" onClick={() => showAlert('Compile Error', 'Failed to compile Vite project. Check your config.', 'error')}>
                    Error Alert
                  </GlossyButton>
                </div>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader title="Alert Component Variants" subtitle="Standard inline messages." />
                <div className="explorer-alerts-column">
                  <Alert variant="info" title="System Status" dismissible>
                    The design system contains 24 typography scales and is bound dynamically.
                  </Alert>
                  <Alert variant="success" title="Success State">
                    Theme variables correctly compiled and output to CSS selectors.
                  </Alert>
                  <Alert variant="warning" title="Design Alert" dismissible>
                    The current color roles have contrast issues in dark modes.
                  </Alert>
                  <Alert variant="error" title="Compilation Error">
                    Failed to parse package dependencies. Check settings panel.
                  </Alert>
                </div>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader title="Interactive Confirm Dialogs" subtitle="Programmatic modals — triggered from anywhere in the app via showConfirm()." />
                <div className="explorer-showcase-row" style={{ marginTop: '1rem' }}>
                  <GlossyButton
                    variant="primary"
                    onClick={async () => {
                      const ok = await showConfirm({
                        title: 'Location Services',
                        message: 'Allow "Maps" to access your location for directions while you\'re using the app?',
                        confirmLabel: 'Enable',
                        dismissLabel: 'Dismiss',
                        variant: 'info',
                        icon: MapPin,
                      });
                      if (ok) showAlert('Enabled', 'Location Services have been enabled.', 'success');
                    }}
                  >
                    Confirm Dialog
                  </GlossyButton>

                  <GlossyButton
                    variant="error"
                    onClick={async () => {
                      const ok = await showConfirm({
                        title: 'Delete Project',
                        message: 'This action is permanent and cannot be undone. Are you sure you want to delete this project?',
                        confirmLabel: 'Delete',
                        dismissLabel: 'Keep',
                        variant: 'error',
                        icon: Trash2,
                      });
                      if (ok) showAlert('Deleted', 'The project has been permanently deleted.', 'error');
                    }}
                  >
                    Destructive Confirm
                  </GlossyButton>

                  <GlossyButton
                    variant="secondary"
                    onClick={() => showAlert('Export Complete', 'Your design tokens have been exported to CSS variables and are ready to use.', 'success')}
                  >
                    Alert Only
                  </GlossyButton>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
