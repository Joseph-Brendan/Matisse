import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useColorStore } from './store/useColorStore';
import { ToastContainer } from './design-system/components/Toast/ToastContainer';
import { ConfirmModal } from './design-system/components/Modal/ConfirmModal';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { AuthCallback } from './pages/AuthCallback';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { DesignSystem } from './pages/DesignSystem';
import { Settings } from './pages/Settings';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ScrollToTop } from './components/ScrollToTop';
import { BackToTop } from './components/BackToTop';

/** Build a CSS font-family stack from a plain font name */
function buildFontStack(name: string, category: 'sans' | 'display' | 'mono'): string {
  const fallbacks: Record<string, string> = {
    sans: `'${name}', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    display: `'${name}', Georgia, serif`,
    mono: `'${name}', 'Fira Code', 'Courier New', monospace`,
  };
  // If it's already a stack (contains comma), use as-is
  if (name.includes(',')) return name;
  return fallbacks[category] ?? `'${name}', sans-serif`;
}

function AppShell() {
  const { theme, roles, typography, spacing, borderRadius, shadows, elevation } = useColorStore();

  // Normalize for system DPI scaling (125%/150%/175% on Windows)
  // Only compensates fractional DPR so Retina/Mac displays are unaffected
  const dprRef = useRef<number>(0);
  useEffect(() => {
    const dpr = window.devicePixelRatio;
    if (dpr === dprRef.current) return;
    dprRef.current = dpr;
    const rounded = Math.round(dpr);
    const isFractional = Math.abs(dpr - rounded) > 0.01;
    if (isFractional) {
      document.documentElement.style.setProperty('--dpr-scale', `${1 / dpr}`);
      (document.documentElement.style as Record<string, string>).zoom = `${1 / dpr}`;
    }
  }, []);

  useEffect(() => {
    // Sync theme colors
    const activeRoles = roles[theme];
    activeRoles.forEach((r) => {
      document.documentElement.style.setProperty(`--md-ref-role-${r.name}`, r.resolvedValue);
    });

    // Sync typography — build proper CSS stacks from stored plain font names
    const familyKeys = Object.keys(typography.fontFamily) as string[];
    familyKeys.forEach((key, i) => {
      const name = typography.fontFamily[key];
      const cat = i === 2 ? 'mono' : i === 1 ? 'display' : 'sans'; // sans / display / mono by index
      const stack = buildFontStack(name, cat as 'sans' | 'display' | 'mono');
      document.documentElement.style.setProperty(`--matisse-font-family-${key}`, stack);

      // Load Google Font for this name
      const encoded = encodeURIComponent(name).replace(/%20/g, '+');
      const id = `gf-${encoded}`;
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700;800&display=swap`;
        document.head.appendChild(link);
      }
    });

    for (const [key, val] of Object.entries(typography.fontSize)) {
      document.documentElement.style.setProperty(`--matisse-font-size-${key}`, val);
    }
    for (const [key, val] of Object.entries(typography.fontWeight)) {
      document.documentElement.style.setProperty(`--matisse-font-weight-${key}`, val.toString());
    }
    for (const [key, val] of Object.entries(typography.lineHeight)) {
      document.documentElement.style.setProperty(`--matisse-line-height-${key}`, val.toString());
    }
    for (const [key, val] of Object.entries(typography.letterSpacing)) {
      document.documentElement.style.setProperty(`--matisse-letter-spacing-${key}`, val);
    }

    // Sync spacing
    for (const [key, val] of Object.entries(spacing)) {
      document.documentElement.style.setProperty(`--matisse-spacing-${key}`, val);
    }

    // Sync border radius
    for (const [key, val] of Object.entries(borderRadius)) {
      document.documentElement.style.setProperty(`--matisse-radius-${key}`, val);
    }

    // Sync shadows
    for (const [key, val] of Object.entries(shadows)) {
      if (typeof val === 'string') {
        document.documentElement.style.setProperty(`--matisse-shadow-${key}`, val);
      }
    }

    // Sync glow shadows
    for (const [key, val] of Object.entries(shadows.glow)) {
      document.documentElement.style.setProperty(`--matisse-shadow-glow-${key}`, val);
    }

    // Sync elevation
    for (const [key, val] of Object.entries(elevation)) {
      document.documentElement.style.setProperty(`--matisse-elevation-${key}`, val);
    }
  }, [theme, roles, typography, spacing, borderRadius, shadows, elevation]);

  return (
    <div className="app-shell" data-theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/color-builder" element={<Navigate to="/dashboard" replace />} />
        <Route path="/components" element={<DesignSystem />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <ToastContainer />
      <ConfirmModal />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
