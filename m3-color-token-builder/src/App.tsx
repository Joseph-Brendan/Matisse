import { useState } from 'react';
import { Header } from './components/Header';
import { KeyColorCard } from './components/KeyColorCard';
import { TonalPaletteEditor } from './components/TonalPaletteEditor';
import { RoleMappingTable } from './components/RoleMappingTable';
import { PreviewPanel } from './components/PreviewPanel';
import { ExportPanel } from './components/ExportPanel';
import { useColorStore } from './store/useColorStore';

function App() {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { theme } = useColorStore();

  return (
    <div className={theme === 'dark' ? 'dark-theme' : ''} style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}>
      <Header onExport={() => setIsExportOpen(true)} />

      <main className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Core Settings Layer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <KeyColorCard />
          <TonalPaletteEditor />
        </div>

        {/* Roles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RoleMappingTable />
        </div>

        {/* Live Preview */}
        <PreviewPanel />

      </main>

      <ExportPanel isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}

export default App;
