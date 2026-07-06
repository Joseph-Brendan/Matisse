import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette, Layers, Paintbrush, Grid3x3, Type, Download, ArrowUpRight,
} from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import type { GlossyVariant } from '../../design-system/components/Button/GlossyButton';
import { Badge } from '../../design-system/components/Badge/Badge';
import { Card } from '../../design-system/components/Card/Card';
import { Navbar } from '../../components/Navbar';
import { useAuthStore } from '../../store/useAuthStore';
import './Landing.css';

const features = [
  { icon: <Palette size={24} />, title: 'Color System', desc: 'Full Material 3 tonal palette with semantic role mapping for light and dark modes.' },
  { icon: <Paintbrush size={24} />, title: 'Glossy Components', desc: 'Modern glossy button system with primary, secondary, tertiary, and error variants.' },
  { icon: <Type size={24} />, title: 'Typography Scale', desc: 'Harmonious type system built on Open Sans with 11 sizes and 8 weights.' },
  { icon: <Grid3x3 size={24} />, title: 'Spacing & Grid', desc: 'Consistent 4px-based spacing scale and responsive grid system.' },
  { icon: <Layers size={24} />, title: 'Component Library', desc: 'Production-ready components: tabs, alerts, modals, toasts, badges, cards, and inputs.' },
  { icon: <Download size={24} />, title: 'Multi-format Export', desc: 'Export tokens as JSON, CSS variables, or Tailwind config for any platform.' },
];



const buttonVariants: { variant: GlossyVariant; label: string }[] = [
  { variant: 'primary', label: 'Primary' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'tertiary', label: 'Tertiary' },
  { variant: 'error', label: 'Error' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'outline', label: 'Outline' },
];

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-body-wrapper">
      {/* Scroll-triggered Floating Navbar */}
      <Navbar />

      {/* Hero Section Container (100% Width & 100vh) */}
      <section className="hero-container">
        {/* Docked Inline Header Layout (fades out when scrolled, replaced by floating navbar) */}
        <header className="hero-docked-header"
          style={{
            opacity: Math.max(0, 1 - scrollY / 20),
            pointerEvents: scrollY > 20 ? 'none' as const : 'auto' as const,
          }}>
          {/* Left docked tab with brand logo and link items */}
          <div className="docked-navbar-left">
            <div className="hero-brand-container" onClick={() => navigate('/')}>
              <div className="hero-brand-icon">M</div>
              <span className="hero-brand-text">Matisse</span>
            </div>
            <nav className="desktop-only docked-nav-links">
              <a
                href="#features"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How it works
              </a>
            </nav>
          </div>

          {/* Right docked Login pill */}
          <div className="docked-navbar-right">
            {user ? (
              <button className="hero-btn-pill" onClick={() => navigate('/dashboard')}>
                <span>Dashboard</span>
                <div className="hero-btn-pill-circle">
                  <ArrowUpRight size={16} />
                </div>
              </button>
            ) : (
              <button className="hero-btn-pill" onClick={() => navigate('/auth')}>
                <span>Log In</span>
                <div className="hero-btn-pill-circle">
                  <ArrowUpRight size={16} />
                </div>
              </button>
            )}
          </div>
        </header>

        {/* Hero Section Split Layout at the bottom */}
        <div className="hero-bottom-grid">
          {/* Left Column: Headline, Description and CTA */}
          <div className="hero-left-content">
            {/* Powered by Shopify-style Badge */}
            <div className="hero-badge-shopify">
              <Palette size={14} style={{ color: 'hsl(256, 34%, 48%)' }} />
              <span>Powered by Matisse</span>
            </div>

            {/* Fluid Headline */}
            <h1 className="hero-headline">
              The <span className="hero-headline-gradient">beautiful way</span> to build design systems.
            </h1>

            {/* Clean Subtitle */}
           

            {/* Custom Arrow Pill CTA Button */}
            <button
              className="hero-btn-pill hero-btn-pill--hero"
              onClick={() => navigate(user ? '/dashboard' : '/auth')}
            >
              <span>Explore Builder</span>
              <div className="hero-btn-pill-circle">
                <ArrowUpRight size={20} />
              </div>
            </button>
          </div>

          {/* Right Column: Summary Card */}
          <div className="hero-right-content">
            {/* Summary Card */}
            <div className="hero-summary-card">
              <h3 className="hero-summary-card-title">Color Science & Aesthetics</h3>
              <p className="hero-summary-card-text">
                Matisse makes it easy to generate custom Material 3 color scales, map semantic design system roles, and export tokens for instant web deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Indented Landing Content below the fold */}
      <div className="landing-content-sections">

      {/* Button Variants Showcase */}
      <section className="btn-showcase-section">
        <Card variant="outlined" padding="lg">
          <div className="btn-showcase-header">
            <h2 className="btn-showcase-title">Glossy Button Variants</h2>
            <p className="btn-showcase-subtitle">
              All six variants displayed in a row — primary, secondary, tertiary, error, ghost, and outline.
            </p>
          </div>
          <div className="btn-showcase-grid">
            {buttonVariants.map(({ variant, label }) => (
              <GlossyButton key={variant} variant={variant} size="md">
                {label}
              </GlossyButton>
            ))}
          </div>
        </Card>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="features-header">
          <h2 className="features-title">Everything you need</h2>
          <p className="features-subtitle">A complete toolkit for building consistent, beautiful interfaces.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-wrapper">
                {f.icon}
              </div>
              <h3 className="feature-card-title">{f.title}</h3>
              <p className="feature-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="how-it-works-header">
          <Badge variant="primary" size="md">Workflow</Badge>
          <h2 className="how-it-works-title">How it works</h2>
          <p className="how-it-works-subtitle">
            Three simple steps to transform your design palette into production-ready system tokens.
          </p>
        </div>
        <div className="how-it-works-grid">
          {[
            {
              step: '01',
              title: 'Define Key Colors',
              desc: 'Select your branding primaries, secondaries, and optional accents using the visual interface or by entering hex values directly.',
              stepClass: 'workflow-card-01',
              numClass: 'workflow-step-num-01',
            },
            {
              step: '02',
              title: 'Generate Tonal Scales',
              desc: 'Matisse automatically calculates full 11-step tonal palettes and links them to Material 3 semantic roles for light and dark schemes.',
              stepClass: 'workflow-card-02',
              numClass: 'workflow-step-num-02',
            },
            {
              step: '03',
              title: 'Export & Integrate',
              desc: 'Instantly download your tokens in CSS variables, clean JSON, or custom Tailwind configurations for direct drop-in development.',
              stepClass: 'workflow-card-03',
              numClass: 'workflow-step-num-03',
            },
          ].map((item, idx) => (
            <div key={idx} className={`workflow-card ${item.stepClass}`}>
              <div className={`workflow-step-num ${item.numClass}`}>
                {item.step}
              </div>
              <h3 className="workflow-card-title">
                {item.title}
              </h3>
              <p className="workflow-card-desc">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p className="landing-footer-text">Matisse Design System — Built with React, TypeScript &amp; Material 3</p>
      </footer>
      </div>
    </div>
  );
};
