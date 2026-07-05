import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette, Sparkles, Activity, Settings, Users, LogOut,
  Sun, Moon, Bell, Search,
} from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { Card } from '../../design-system/components/Card/Card';
import { Badge } from '../../design-system/components/Badge/Badge';
import { Tabs, TabPanel } from '../../design-system/components/Tabs/Tabs';
import { Input } from '../../design-system/components/Input/Input';
import { showToast } from '../../store/useToastStore';
import { useColorStore } from '../../store/useColorStore';

const statCards = [
  { label: 'Active Colors', value: '5', change: '+2 this week', icon: <Palette size={20} />, color: 'hsl(256, 34%, 48%)' },
  { label: 'Components', value: '12', change: '3 new', icon: <Sparkles size={20} />, color: 'hsl(259, 11%, 40%)' },
  { label: 'Tokens Generated', value: '1,284', change: '+156 today', icon: <Activity size={20} />, color: 'hsl(340, 21%, 41%)' },
  { label: 'Export Formats', value: '3', change: 'JSON, CSS, Tailwind', icon: <Settings size={20} />, color: 'hsl(276, 3%, 37%)' },
];

const recentProjects = [
  { name: 'Brand Refresh Q3', colors: 5, lastEdited: '2 hours ago', status: 'active' as const },
  { name: 'Mobile App Theme', colors: 3, lastEdited: 'Yesterday', status: 'draft' as const },
  { name: 'Marketing Site', colors: 4, lastEdited: '3 days ago', status: 'active' as const },
  { name: 'Dashboard Redesign', colors: 6, lastEdited: '1 week ago', status: 'archived' as const },
];

const tabData = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects', badge: 4 as string | number },
  { id: 'activity', label: 'Activity' },
  { id: 'team', label: 'Team', badge: '3' as string | number },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useColorStore();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--md-ref-role-background)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 2rem',
          borderBottom: '1px solid var(--md-ref-role-outlineVariant)',
          background: 'var(--md-ref-role-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, hsl(256, 34%, 48%), hsl(340, 21%, 41%))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            M
          </div>
          <span style={{ fontWeight: 600 }}>Dashboard</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '200px' }}>
            <Input placeholder="Search..." inputSize="sm" variant="filled" icon={<Search size={16} />} />
          </div>

          <button
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
              showToast('info', `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`);
            }}
            style={{
              background: 'none',
              border: '1px solid var(--md-ref-role-outlineVariant)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--md-ref-role-onSurfaceVariant)',
              display: 'flex',
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => showToast('info', 'No new notifications')}
            style={{
              background: 'none',
              border: '1px solid var(--md-ref-role-outlineVariant)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'var(--md-ref-role-onSurfaceVariant)',
              display: 'flex',
              position: 'relative',
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'hsl(0, 54%, 41%)',
              }}
            />
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '220px',
            borderRight: '1px solid var(--md-ref-role-outlineVariant)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            background: 'var(--md-ref-role-surface)',
          }}
        >
          {[
            { icon: <Activity size={18} />, label: 'Overview', active: true },
            { icon: <Palette size={18} />, label: 'Color Builder', onClick: () => navigate('/color-builder') },
            { icon: <Sparkles size={18} />, label: 'Components', onClick: () => navigate('/components') },
            { icon: <Users size={18} />, label: 'Team' },
            { icon: <Settings size={18} />, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.625rem 0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: item.active ? 'var(--md-ref-role-primaryContainer)' : 'transparent',
                color: item.active ? 'var(--md-ref-role-onPrimaryContainer)' : 'var(--md-ref-role-onSurfaceVariant)',
                fontWeight: item.active ? 600 : 400,
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'all 0.15s',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.625rem 0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'transparent',
              color: 'var(--md-ref-role-onSurfaceVariant)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <LogOut size={18} />
            Sign out
          </button>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>Welcome back, Jane</h1>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--md-ref-role-onSurfaceVariant)', fontSize: '0.875rem' }}>
                Here's what's happening with your design system.
              </p>
            </div>
            <GlossyButton size="sm" onClick={() => showToast('success', 'New project created!')}>
              <Sparkles size={16} />
              New Project
            </GlossyButton>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {statCards.map((stat) => (
              <Card key={stat.label} variant="outlined" padding="md">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)', fontWeight: 500 }}>{stat.label}</p>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{stat.value}</p>
                    <p style={{ margin: '0.125rem 0 0', fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>{stat.change}</p>
                  </div>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${stat.color}15`,
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Tabs Section */}
          <Card variant="outlined" padding="md">
            <Tabs tabs={tabData} activeTab={activeTab} onChange={setActiveTab} variant="underline">
              <TabPanel tabId="overview">
                <div style={{ padding: '1rem 0' }}>
                  <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}>Recent Projects</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {recentProjects.map((project) => (
                      <div
                        key={project.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.875rem 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--md-ref-role-surfaceContainerHighest)',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                      >
                        <div>
                          <span style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{project.name}</span>
                          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>{project.colors} colors</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>{project.lastEdited}</span>
                          </div>
                        </div>
                        <Badge
                          variant={project.status === 'active' ? 'success' : project.status === 'draft' ? 'warning' : 'neutral'}
                          size="sm"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel tabId="projects">
                <div style={{ padding: '1rem 0', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                  Project management view coming soon.
                </div>
              </TabPanel>
              <TabPanel tabId="activity">
                <div style={{ padding: '1rem 0', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                  Activity feed coming soon.
                </div>
              </TabPanel>
              <TabPanel tabId="team">
                <div style={{ padding: '1rem 0', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
                  Team management coming soon.
                </div>
              </TabPanel>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  );
};
