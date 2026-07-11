import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useColorStore } from '../../store/useColorStore';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { ComponentExplorer } from '../../components/ComponentExplorer';
import './DesignSystem.css';

export const DesignSystem: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useColorStore();

  return (
    <div className="design-system-root">
      <header className="design-system-header">
        <div className="design-system-header-left">
          <GlossyButton variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
            Back to Dashboard
          </GlossyButton>
          <h1 className="design-system-title">
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

      <div className="design-system-body">
        <ComponentExplorer />
      </div>
    </div>
  );
};
