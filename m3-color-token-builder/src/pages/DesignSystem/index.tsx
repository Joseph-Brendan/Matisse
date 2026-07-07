import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useColorStore } from '../../store/useColorStore';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { ComponentExplorer } from '../../components/ComponentExplorer';

export const DesignSystem: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useColorStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--md-ref-role-background)', color: 'var(--md-ref-role-onSurface)' }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 2rem',
          borderBottom: '1px solid var(--md-ref-role-outlineVariant)',
          background: 'var(--md-ref-role-surface)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <GlossyButton variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
            Back to Dashboard
          </GlossyButton>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
            Matisse Design System
          </h1>
        </div>

        <GlossyButton
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </GlossyButton>
      </header>

      {/* Reusable Component Explorer Panel */}
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <ComponentExplorer />
      </div>
    </div>
  );
};
