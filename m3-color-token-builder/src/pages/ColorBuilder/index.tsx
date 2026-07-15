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
import './ColorBuilder.css';

export const ColorBuilder: React.FC = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { theme } = useColorStore();
  const navigate = useNavigate();

  return (
    <div className={`color-builder-root ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <header className="color-builder-header">
        <div className="color-builder-header-left">
          <GlossyButton variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
            Home
          </GlossyButton>
          <h1 className="color-builder-title">Color Builder</h1>
        </div>
        <GlossyButton size="sm" onClick={() => setIsExportOpen(true)}>
          <Download size={18} />
          Export JSON
        </GlossyButton>
      </header>

      <main className="color-builder-main container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <KeyColorCard />
          <TonalPaletteEditor />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RoleMappingTable />
        </div>
        <PreviewPanel activeFeature="color" />
      </main>

      <ExportPanel
        isOpen={isExportOpen}
        defaultScope="color"
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};
