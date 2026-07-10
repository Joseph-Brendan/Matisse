import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { KeyColorCard } from '../../components/KeyColorCard';
import { TonalPaletteEditor } from '../../components/TonalPaletteEditor';
import { RoleMappingTable } from '../../components/RoleMappingTable';
import { PreviewPanel } from '../../components/PreviewPanel';
import { ExportPanel } from '../../components/ExportPanel';
import { useColorStore } from '../../store/useColorStore';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';

export const ColorBuilder: React.FC = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { theme } = useColorStore();
  const navigate = useNavigate();

  return (
    <div
      className={theme === 'dark' ? 'dark-theme' : ''}
      style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}
    >
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <GlossyButton variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            Home
          </GlossyButton>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
            Color Builder
          </h1>
        </div>
        <GlossyButton size="sm" onClick={() => setIsExportOpen(true)}>
          <Download size={18} />
          Export JSON
        </GlossyButton>
      </header>

      <main
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          padding: '2rem',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <KeyColorCard />
          <TonalPaletteEditor />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RoleMappingTable />
        </div>
        <PreviewPanel />
      </main>

      <ExportPanel isOpen={isExportOpen} defaultScope="color" onClose={() => setIsExportOpen(false)} />
    </div>
  );
};
