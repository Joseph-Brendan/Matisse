import React, { useState } from 'react';
import {
  Palette, Type, Grid3x3, Layers, Sparkles, Bell,
  User, Mail, Lock, ExternalLink, CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { useColorStore } from '../store/useColorStore';
import { showToast } from '../store/useToastStore';

// Components
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import { Card, CardHeader, CardContent, CardFooter } from '../design-system/components/Card/Card';
import { Badge } from '../design-system/components/Badge/Badge';
import { Input } from '../design-system/components/Input/Input';
import { Alert } from '../design-system/components/Alert/Alert';
import { Tabs, TabPanel } from '../design-system/components/Tabs/Tabs';
import { Modal } from '../design-system/components/Modal/Modal';

export const ComponentExplorer: React.FC = () => {
  const { roles, theme, typography, spacing, borderRadius, shadows, elevation } = useColorStore();
  const [activeExplorerTab, setActiveExplorerTab] = useState('colors');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const activeRoles = roles[theme];

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('success', `Copied: ${text}`);
  };

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: '0', background: 'var(--md-ref-role-background)', borderRadius: '1rem', border: '1px solid var(--md-ref-role-outlineVariant)', overflow: 'hidden' }}>
      {/* Navigation Sidebar */}
      <aside
        style={{
          width: '240px',
          borderRight: '1px solid var(--md-ref-role-outlineVariant)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          background: 'var(--md-ref-role-surface)',
          flexShrink: 0,
          overflowY: 'auto'
        }}
      >
        <div style={{ marginBottom: '1rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-ref-role-outline)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Design Tokens
          </span>
        </div>

        {[
          { id: 'colors', label: 'Color Roles', icon: <Palette size={18} /> },
          { id: 'typography', label: 'Typography', icon: <Type size={18} /> },
          { id: 'spacing', label: 'Spacing & Radius', icon: <Grid3x3 size={18} /> },
          { id: 'shadows', label: 'Shadows & Elevation', icon: <Layers size={18} /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveExplorerTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: activeExplorerTab === item.id ? 'var(--md-ref-role-primaryContainer)' : 'transparent',
              color: activeExplorerTab === item.id ? 'var(--md-ref-role-onPrimaryContainer)' : 'var(--md-ref-role-onSurfaceVariant)',
              fontWeight: activeExplorerTab === item.id ? 600 : 500,
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.15s',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div style={{ height: '1px', background: 'var(--md-ref-role-outlineVariant)', margin: '1rem 0' }} />

        <div style={{ marginBottom: '1rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-ref-role-outline)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Components
          </span>
        </div>

        {[
          { id: 'buttons', label: 'Glossy Buttons', icon: <Sparkles size={18} /> },
          { id: 'inputs', label: 'Text Fields', icon: <Mail size={18} /> },
          { id: 'cards', label: 'Cards & Panels', icon: <Layers size={18} /> },
          { id: 'alerts-toasts', label: 'Alerts & Toasts', icon: <Bell size={18} /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveExplorerTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: activeExplorerTab === item.id ? 'var(--md-ref-role-primaryContainer)' : 'transparent',
              color: activeExplorerTab === item.id ? 'var(--md-ref-role-onPrimaryContainer)' : 'var(--md-ref-role-onSurfaceVariant)',
              fontWeight: activeExplorerTab === item.id ? 600 : 500,
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.15s',
              textAlign: 'left',
              width: '100%',
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </aside>

      {/* Content Area */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'var(--md-ref-role-background)' }}>
        {/* Colors Panel */}
        {activeExplorerTab === 'colors' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Semantic Color Roles</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                Dynamically resolved values based on Material 3 tonal palettes. Click a swatch to copy its HSL.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {activeRoles.map((role) => (
                <div
                  key={role.name}
                  className="card card--hoverable"
                  onClick={() => handleCopyText(role.resolvedValue)}
                  style={{
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--md-ref-role-surface)',
                    border: '1px solid var(--md-ref-role-outlineVariant)',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--md-ref-role-onSurface)' }}>{role.name}</span>
                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontFamily: 'monospace' }}>
                      {role.resolvedValue}
                    </p>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.6875rem', color: 'var(--md-ref-role-outline)', opacity: 0.8 }}>
                      {role.reference}
                    </p>
                  </div>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '0.5rem',
                      background: role.resolvedValue,
                      border: '1px solid var(--md-ref-role-outlineVariant)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Typography Panel */}
        {activeExplorerTab === 'typography' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Typography Scale</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                Open Sans system font scales mapped to standard sizing slots.
              </p>
            </div>

            {/* Font Families */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Font Families" subtitle="Ref definitions for displays, body text, and code." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {Object.entries(typography.fontFamily).map(([name, family]) => (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--md-ref-role-outlineVariant)', paddingBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', textTransform: 'capitalize' }}>{name}</span>
                    <span style={{ fontSize: '0.875rem', fontFamily: family, color: 'var(--md-ref-role-onSurfaceVariant)' }}>{family}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Font Sizes */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Sizes & Alignment" subtitle="Visual preview of the standard type scale." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                {Object.entries(typography.fontSize).map(([size, value]) => (
                  <div key={size} style={{ display: 'flex', alignItems: 'flex-start', borderBottom: '1px solid var(--md-ref-role-outlineVariant)', paddingBottom: '1rem' }}>
                    <div style={{ width: '120px', flexShrink: 0 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{size}</span>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontFamily: 'monospace' }}>{value}</p>
                    </div>
                    <div style={{ flex: 1, fontSize: value, lineHeight: 1.2, color: 'var(--md-ref-role-onSurface)' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Spacing & Borders</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                4px-based grid steps and rounded border-radius tokens.
              </p>
            </div>

            {/* Border Radius */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Border Radius Scale" subtitle="Rounding definitions used across containers, buttons, and inputs." />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                {Object.entries(borderRadius).map(([name, value]) => (
                  <div
                    key={name}
                    style={{
                      padding: '1rem',
                      background: 'var(--md-ref-role-surface)',
                      border: '1px solid var(--md-ref-role-outlineVariant)',
                      borderRadius: value,
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{name}</span>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontFamily: 'monospace' }}>{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Spacing Scale */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Spacing Blocks" subtitle="Linear spacer guides (showing key increments)." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {['0.5', '1', '2', '3', '4', '6', '8'].map((key) => {
                  const value = spacing[key as keyof typeof spacing];
                  return (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '80px', flexShrink: 0 }}>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Step {key}</span>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontFamily: 'monospace' }}>{value}</p>
                      </div>
                      <div
                        style={{
                          height: '24px',
                          width: value,
                          background: 'var(--md-ref-role-primary)',
                          borderRadius: '4px',
                          opacity: 0.85,
                        }}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Shadows & Elevation</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                Atmospheric shadows and standard elevation layers.
              </p>
            </div>

            {/* Elevation cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(elevation).map(([level, value]) => (
                <div
                  key={level}
                  style={{
                    padding: '2rem 1.5rem',
                    background: 'var(--md-ref-role-surface)',
                    borderRadius: '0.75rem',
                    boxShadow: value,
                    textAlign: 'center',
                    border: level === '0' ? '1px solid var(--md-ref-role-outlineVariant)' : 'none',
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--md-ref-role-onSurface)' }}>Elevation {level}</span>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontFamily: 'monospace', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={value}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Glow states */}
            <Card variant="outlined" padding="lg">
              <CardHeader title="Glow Shadows" subtitle="Vibrant colored shadow effects mapped to variants." />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                {Object.entries(shadows.glow).map(([name, shadowValue]) => (
                  <div
                    key={name}
                    style={{
                      padding: '1.5rem',
                      background: 'var(--md-ref-role-surface)',
                      borderRadius: '0.75rem',
                      boxShadow: shadowValue,
                      textAlign: 'center',
                      border: '1px solid var(--md-ref-role-outlineVariant)',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.875rem', textTransform: 'capitalize' }}>{name} Glow</span>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontFamily: 'monospace' }}>
                      Active Glow State
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Component Showcase - Buttons */}
        {activeExplorerTab === 'buttons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Glossy Buttons Component</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                Showcasing all Glossy Button variants, sizes, and icon integrations.
              </p>
            </div>

            <Card variant="outlined" padding="lg">
              <CardHeader title="Variants & Aesthetics" subtitle="Dynamic theme-aware buttons displaying correct inline horizontal row alignment with icons." />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' }}>
                <GlossyButton variant="primary">
                  <Sparkles size={16} />
                  Primary Action
                </GlossyButton>
                <GlossyButton variant="secondary">
                  <User size={16} />
                  Secondary Action
                </GlossyButton>
                <GlossyButton variant="tertiary">
                  <CheckCircle2 size={16} />
                  Tertiary Action
                </GlossyButton>
                <GlossyButton variant="error">
                  <AlertCircle size={16} />
                  Error State
                </GlossyButton>
                <GlossyButton variant="outline">
                  <ExternalLink size={16} />
                  Outlined
                </GlossyButton>
                <GlossyButton variant="ghost">
                  <ExternalLink size={16} style={{ transform: 'rotate(180deg)' }} />
                  Ghost Link
                </GlossyButton>
              </div>
            </Card>

            <Card variant="outlined" padding="lg">
              <CardHeader title="Button Sizes" subtitle="Explore xs, sm, md, lg, and xl scaling." />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' }}>
                <GlossyButton size="xs" variant="primary">
                  <Sparkles size={12} /> Extra Small
                </GlossyButton>
                <GlossyButton size="sm" variant="primary">
                  <Sparkles size={14} /> Small
                </GlossyButton>
                <GlossyButton size="md" variant="primary">
                  <Sparkles size={16} /> Medium
                </GlossyButton>
                <GlossyButton size="lg" variant="primary">
                  <Sparkles size={18} /> Large
                </GlossyButton>
                <GlossyButton size="xl" variant="primary">
                  <Sparkles size={20} /> Extra Large
                </GlossyButton>
              </div>
            </Card>

            <Card variant="outlined" padding="lg">
              <CardHeader title="Badges Scale" subtitle="Explore normal, primary dot, removable, and custom-colored semantic tags." />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem', alignItems: 'center' }}>
                <Badge variant="neutral">Neutral Tag</Badge>
                <Badge variant="primary" dot>Primary Info</Badge>
                <Badge variant="secondary">Secondary Type</Badge>
                <Badge variant="tertiary">Tertiary Tag</Badge>
                <Badge variant="success">Success Tag</Badge>
                <Badge variant="warning">Warning Tag</Badge>
                <Badge variant="error" removable onRemove={() => showToast('info', 'Badge dismissed')}>Removable Error</Badge>
                <Badge variant="info">Info State</Badge>
              </div>
            </Card>
          </div>
        )}

        {/* Component Showcase - Inputs */}
        {activeExplorerTab === 'inputs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Input Fields</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                Text fields with outline, filled, and underlined aesthetics supporting prefix icons, validations, and loading states.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <Card variant="outlined" padding="lg">
                <CardHeader title="Outlined Inputs" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                  <Input label="Email address" placeholder="email@example.com" icon={<Mail size={16} />} fullWidth />
                  <Input label="Password" type="password" placeholder="Enter your password" icon={<Lock size={16} />} fullWidth />
                </div>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader title="Filled Inputs" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
                  <Input variant="filled" label="Username" placeholder="Enter username" icon={<User size={16} />} fullWidth />
                  <Input variant="filled" label="Search system" placeholder="Search..." icon={<ExternalLink size={16} />} fullWidth />
                </div>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader title="Validation States" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Cards & Content Containers</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                Standard layouts for cards, headers, actions, and buttons.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
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

            <div style={{ marginTop: '1.5rem' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>Alerts & Toast Notifications</h2>
              <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: '0.25rem 0 0' }}>
                Interactive system feedbacks and temporary overlay notifications.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Card variant="outlined" padding="lg">
                <CardHeader title="Trigger System Toasts" subtitle="Simulate custom system alerts." />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <GlossyButton variant="primary" onClick={() => showToast('info', 'Loading system tokens config...')}>
                    Info Toast
                  </GlossyButton>
                  <GlossyButton variant="tertiary" onClick={() => showToast('success', 'Design tokens exported!')}>
                    Success Toast
                  </GlossyButton>
                  <GlossyButton variant="secondary" onClick={() => showToast('warning', 'Low color contrast on outline variant.')}>
                    Warning Toast
                  </GlossyButton>
                  <GlossyButton variant="error" onClick={() => showToast('error', 'Failed to compile Vite project.')}>
                    Error Toast
                  </GlossyButton>
                </div>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader title="Alert Component Variants" subtitle="Standard inline messages." />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
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
                <CardHeader title="Interactive Modal Dialogs" subtitle="Open full dialog overlay panels." />
                <div style={{ marginTop: '1rem' }}>
                  <GlossyButton variant="primary" onClick={() => setIsModalOpen(true)}>
                    Open Test Modal
                  </GlossyButton>

                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    showCloseButton={false}
                    size="sm"
                    footer={
                      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'flex-end', width: '100%', padding: '0.25rem 0' }}>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--md-ref-role-onSurfaceVariant)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--md-ref-role-surfaceVariant)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Dismiss
                        </button>
                        <button
                          onClick={() => { setIsModalOpen(false); showToast('success', 'Location Services enabled!'); }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--md-ref-role-primary)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            transition: 'background-color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--md-ref-role-primaryContainer)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          Enable
                        </button>
                      </div>
                    }
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.5rem 0' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--md-ref-role-primaryContainer)',
                          color: 'var(--md-ref-role-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Info size={20} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--md-ref-role-onSurface)', letterSpacing: '0.05em' }}>
                          LOCATION SERVICES
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)', lineHeight: 1.5 }}>
                          Allow &ldquo;Maps&rdquo; to access your location for directions while you&rsquo;re using the app?
                        </p>
                      </div>
                    </div>
                  </Modal>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
