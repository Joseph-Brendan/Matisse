import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useColorStore } from './store/useColorStore';
import { ToastContainer } from './design-system/components/Toast/ToastContainer';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { ColorBuilder } from './pages/ColorBuilder';
import { DesignSystem } from './pages/DesignSystem';

function AppShell() {
  const { theme } = useColorStore();

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        background: 'var(--md-ref-role-background)',
        color: 'var(--md-ref-role-onBackground)',
        fontFamily: "'Open Sans', system-ui, -apple-system, sans-serif",
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/color-builder" element={<ColorBuilder />} />
        <Route path="/components" element={<DesignSystem />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
