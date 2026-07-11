import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette, Layers, Paintbrush, Grid3x3, Type, Download, ArrowUpRight, Sparkles,
  ChevronDown, ChevronUp, Star, Check
} from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import {
  ColorSystemIllustration,
  TypographyIllustration,
  ComponentsIllustration,
  SpacingIllustration,
  ExportIllustration,
  VersionHistoryIllustration,
  PreviewIllustration,
  PresetsIllustration,
} from './FeatureIllustration';
import type { GlossyVariant } from '../../design-system/components/Button/GlossyButton';
import { Badge } from '../../design-system/components/Badge/Badge';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useAuthStore } from '../../store/useAuthStore';
import './Landing.css';

const features = [
  { Illustration: ColorSystemIllustration, title: 'Color System', desc: 'Full Material 3 tonal palette with semantic role mapping for light and dark modes.' },
  { Illustration: TypographyIllustration, title: 'Typography Scale', desc: 'Harmonious type system built on Open Sans with 11 sizes and 8 weights.' },
  { Illustration: ComponentsIllustration, title: 'Component Library', desc: 'Production-ready components: tabs, alerts, modals, toasts, badges, cards, and inputs.' },
  { Illustration: SpacingIllustration, title: 'Spacing & Grid', desc: 'Consistent 4px-based spacing scale and responsive grid system.' },
  { Illustration: ExportIllustration, title: 'Multi-format Export', desc: 'Export tokens as JSON, CSS variables, or Tailwind config for any platform.' },
  { Illustration: VersionHistoryIllustration, title: 'Version History', desc: 'Track every change to your design tokens with full semantic versioning.' },
  { Illustration: PresetsIllustration, title: 'Smart Presets', desc: 'Start faster with pre-built design system templates for fintech, health, e-com, and more.' },
  { Illustration: PreviewIllustration, title: 'Live Preview', desc: 'See your design system come to life with real-time previews of colors, typography, and components.' },
];

const buttonVariants: { variant: GlossyVariant; label: string }[] = [
  { variant: 'primary', label: 'Primary' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'tertiary', label: 'Tertiary' },
  { variant: 'error', label: 'Error' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'outline', label: 'Outline' },
];

// FAQS
const faqs = [
  {
    q: 'What is the HCT color space and why does Matisse use it?',
    a: 'HCT (Hue, Chroma, Tone) is the color model used by Material Design 3. Unlike RGB or HSL, HCT aligns perfectly with human physiological vision. It guarantees consistent, predictable contrast ratios between backgrounds, texts, and accents, making accessibility checks automatic.'
  },
  {
    q: 'Can I export Matisse design tokens for multiple platforms?',
    a: 'Absolutely. Matisse is designed for immediate web and mobile deployment. You can export generated scale variables as standard CSS custom properties, a formatted JSON token file, or a modular Tailwind configuration object.'
  },
  {
    q: 'Does Matisse handle both Light and Dark semantic modes?',
    a: 'Yes. Matisse computes tone targets for both environments. When you select a key seed color, it maps it to Material 3 standard roles like onPrimary, primaryContainer, onPrimaryContainer, surface, and outline for both themes simultaneously.'
  },
  {
    q: 'Is Matisse suitable for custom enterprise design systems?',
    a: 'Yes, Matisse allows you to add optional custom color roles outside the standard primary/secondary core palette. These custom roles are passed through the same Material tonal scaling engine, outputting matching semantic tokens.'
  }
];

// Testimonials
const testimonials = [
  {
    quote: "Matisse solved our designer-to-developer transition. We mapped our legacy color scheme into strict Material 3 scales in under ten minutes.",
    author: "Elena Rostova",
    role: "Design System Lead",
    company: "Vectra Inc.",
    avatar: "E"
  },
  {
    quote: "The HCT tone visualizer is a game-changer. Our accessibility errors plummeted to zero because the contrast target ratios are mathematically guaranteed.",
    author: "Marcus Chen",
    role: "Principal Frontend Engineer",
    company: "ApexFlow",
    avatar: "M"
  },
  {
    quote: "As a product manager, I love that we can download clean JSON tokens that immediately integrate into our cross-platform React Native and web builds.",
    author: "Sarah Jenkins",
    role: "VP of Product",
    company: "PulseTech",
    avatar: "S"
  }
];

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [scrollY, setScrollY] = useState(0);
  const [activeToolTab, setActiveToolTab] = useState<'color' | 'buttons' | 'typography' | 'shadows'>('color');
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  // Mini state for color picker tool
  const [pickerHue, setPickerHue] = useState(256);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (idx: number) => {
    setFaqOpenIdx(faqOpenIdx === idx ? null : idx);
  };

  return (
    <div className="landing-body-wrapper">
      {/* Floating Header */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="hero-container">
        <header className="hero-docked-header"
          style={{
            opacity: Math.max(0, 1 - scrollY / 20),
            pointerEvents: scrollY > 20 ? 'none' as const : 'auto' as const,
          }}>
          <div className="docked-navbar-left">
            <div className="hero-brand-container" onClick={() => navigate('/')}>
              <img src="/logo-drk.svg" alt="Matisse" style={{ height: '38px', display: 'block', objectFit: 'contain' }} />
            </div>
            <nav className="desktop-only docked-nav-links">
              <a
                href="#tools"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Tools
              </a>
              <a
                href="#about"
                className="navbar-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About
              </a>
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
            </nav>
          </div>

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

        <div className="hero-bottom-grid">
          <div className="hero-left-content">
            <div className="hero-badge-shopify">
              <Palette size={14} className="hero-badge-icon-color" />
              <span>Powered by Dev and Design</span>
            </div>

            <h1 className="hero-headline">
              The <span className="hero-headline-gradient">beautiful way</span> to build design systems.
            </h1>

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

          <div className="hero-right-content">
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
        
         {/* 2. TOOLS SECTION */}
        <section id="tools" className="tools-section">
          <div className="section-header">
            <Badge variant="primary" size="md">Interactive Toolkit</Badge>
            <h2 className="section-title">Explore our design tools</h2>
            <p className="section-subtitle">
              Interact with the Matisse token generation sandbox. Real-time scales, responsive layouts, and modern components.
            </p>
          </div>

          <div className="tools-tabbed-container">
            {/* Tool Tabs */}
            <div className="tools-tabs">
              <button 
                className={`tools-tab-btn ${activeToolTab === 'color' ? 'active' : ''}`}
                onClick={() => setActiveToolTab('color')}
              >
                <Palette size={16} />
                <span>Color Tones</span>
              </button>
              <button 
                className={`tools-tab-btn ${activeToolTab === 'buttons' ? 'active' : ''}`}
                onClick={() => setActiveToolTab('buttons')}
              >
                <Paintbrush size={16} />
                <span>Glossy Buttons</span>
              </button>
              <button 
                className={`tools-tab-btn ${activeToolTab === 'typography' ? 'active' : ''}`}
                onClick={() => setActiveToolTab('typography')}
              >
                <Type size={16} />
                <span>Type Scales</span>
              </button>
              <button 
                className={`tools-tab-btn ${activeToolTab === 'shadows' ? 'active' : ''}`}
                onClick={() => setActiveToolTab('shadows')}
              >
                <Layers size={16} />
                <span>Elevation & Shadows</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="tools-panel-content">
              {activeToolTab === 'color' && (
                <div className="tool-sandbox-color">
                  <div className="tool-sandbox-meta">
                    <h4>Interactive Tone Generator</h4>
                    <p>Adjust the slider to simulate HCT hue adjustments. See how the tonal scale values shift while maintaining consistent perceptual steps.</p>
                    <div className="hue-slider-wrapper">
                      <label>Hue: {pickerHue}°</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="360" 
                        value={pickerHue}
                        onChange={(e) => setPickerHue(Number(e.target.value))}
                        className="hue-slider"
                        style={{ accentColor: `hsl(${pickerHue}, 60%, 50%)` }}
                      />
                    </div>
                  </div>
                  <div className="tool-sandbox-preview-colors">
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100].map((tone) => {
                      const lightness = 100 - tone;
                      const computedBg = `hsl(${pickerHue}, 45%, ${lightness}%)`;
                      const useDark = lightness > 55;
                      return (
                        <div 
                          key={tone} 
                          className="sandbox-color-block"
                          style={{
                            backgroundColor: computedBg,
                            color: useDark ? '#000' : '#fff',
                            textShadow: useDark
                              ? '0 0 3px rgba(255,255,255,0.4), 0 0 1px rgba(255,255,255,0.6)'
                              : '0 0 3px rgba(0,0,0,0.35), 0 0 1px rgba(0,0,0,0.5)',
                          }}
                        >
                          <span className="sandbox-tone-num">{tone}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeToolTab === 'buttons' && (
                <div className="tool-sandbox-buttons">
                  <div className="tool-sandbox-meta">
                    <h4>M3 Glossy System</h4>
                    <p>Preview six modern glossy button variants styled directly from the Material 3 design token system.</p>
                  </div>
                  <div className="btn-showcase-grid">
                    {buttonVariants.map(({ variant, label }) => (
                      <GlossyButton key={variant} variant={variant} size="md">
                        {label}
                      </GlossyButton>
                    ))}
                  </div>
                </div>
              )}

              {activeToolTab === 'typography' && (
                <div className="tool-sandbox-typography">
                  <div className="tool-sandbox-meta">
                    <h4>Typography Heirarchy</h4>
                    <p>Sample scales based on a clean hierarchy. Balanced font size scaling for standard layouts.</p>
                  </div>
                  <div className="typography-specimen-stack">
                    <div className="specimen-row">
                      <span className="specimen-label">Display</span>
                      <span className="specimen-display-text">System Display Large</span>
                    </div>
                    <div className="specimen-row">
                      <span className="specimen-label">Headline</span>
                      <span className="specimen-headline-text">Headline Medium</span>
                    </div>
                    <div className="specimen-row">
                      <span className="specimen-label">Title</span>
                      <span className="specimen-title-text">Title SemiBold</span>
                    </div>
                    <div className="specimen-row">
                      <span className="specimen-label">Body</span>
                      <span className="specimen-body-text">Body default description text size.</span>
                    </div>
                  </div>
                </div>
              )}

              {activeToolTab === 'shadows' && (
                <div className="tool-sandbox-shadows">
                  <div className="tool-sandbox-meta">
                    <h4>Shadow Elevations</h4>
                    <p>Visual preview of card elevations based on calculated Material 3 shadow styles.</p>
                  </div>
                  <div className="shadow-cards-row">
                    {['E0 Flat', 'E1 Soft', 'E2 Elevated', 'E3 Floating', 'E4 Overlay'].map((label, idx) => (
                      <div key={idx} className={`shadow-sandbox-card shadow-card-elevation-${idx}`}>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* 3. ABOUT SECTION */}
        <section id="about" className="about-section">
          <div className="about-split-layout">
            <div className="about-left-text">
              <Badge variant="primary" size="md">Philosophy</Badge>
              <h2 className="about-title">Automating design scales</h2>
              <p className="about-paragraph">
                Building design systems can be a chaotic process. Designers hand off arbitrary colors, while developers struggle to keep themes consistent. Matisse bridges this gap.
              </p>
              <p className="about-paragraph">
                By translating raw values into strict Material Design 3 structures, Matisse ensures HCT-guided mathematical consistency for primary, secondary, and background palettes.
              </p>
              <div className="about-bullets">
                <div className="about-bullet-item">
                  <div className="about-bullet-check"><Check size={14} /></div>
                  <span>100% compliant with MD3 specs</span>
                </div>
                <div className="about-bullet-item">
                  <div className="about-bullet-check"><Check size={14} /></div>
                  <span>Perceptual contrast for accessibility</span>
                </div>
                <div className="about-bullet-item">
                  <div className="about-bullet-check"><Check size={14} /></div>
                  <span>Zero-config drop-in exports</span>
                </div>
              </div>
            </div>
            <div className="about-right-visual">
              <div className="about-visual-card">
                <div className="visual-card-glow" />
                <div className="visual-card-content">
                  <div className="card-mock-header">
                    <span className="card-dot-red" />
                    <span className="card-dot-yellow" />
                    <span className="card-dot-green" />
                  </div>
                  <div className="card-mock-code">
                    <span className="code-comment">// Generated by Matisse</span>
                    <br />
                    <span className="code-key">:root</span> {'{'}
                    <div className="code-indent">
                      <span className="code-var">--md-sys-color-primary:</span> <span className="code-val">hsl(256, 34%, 48%);</span>
                      <br />
                      <span className="code-var">--md-sys-color-onPrimary:</span> <span className="code-val">#ffffff;</span>
                      <br />
                      <span className="code-var">--md-sys-color-primaryContainer:</span> <span className="code-val">hsl(256, 34%, 90%);</span>
                      <br />
                      <span className="code-var">--md-sys-color-surface:</span> <span className="code-val">hsl(256, 12%, 99%);</span>
                    </div>
                    {'}'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 4. FEATURE SECTION */}
        <section id="features" className="features-section">
          <div className="section-header">
            <Badge variant="primary" size="md">Features</Badge>
            <h2 className="section-title" style={{ fontWeight: 700 }}>Everything You Need To Build a Design System That Ships</h2>
            <p className="section-subtitle">Create consistent colors, typography, spacing, motion components and design tokens.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card" data-color={['purple', 'pink', 'blue', 'teal', 'green', 'orange', 'indigo', 'rose'][i]} data-size={['large', 'medium', 'medium', 'medium', 'medium', 'half', 'half', 'medium'][i]}>
                <div className="feature-card-illustration">
                  <f.Illustration />
                </div>
                <h3 className="feature-card-title">{f.title}</h3>
                <p className="feature-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="how-it-works-section">
          <div className="how-it-works-header">
            <h2 className="how-it-works-title">
              <div className="title-line"></div>
              <span>How It works</span>
              <div className="title-line right"></div>
            </h2>
          </div>

          <div className="timeline-container">
            <svg className="timeline-loop-svg" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 160 10 C 60 10, 20 50, 20 90 C 20 130, 60 150, 110 150 C 130 150, 140 140, 140 120" stroke="#76E037" strokeWidth="2" fill="none" />
              <path d="M 135 125 L 140 120 L 145 125" stroke="#76E037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="timeline-start-node">
              <div className="pulse-ring"><div className="pulse-dot"></div></div>
              <span className="timeline-start-text">Start</span>
            </div>

            <div className="timeline-track">
              <div className="timeline-line"></div>

              <div className="timeline-item">
                <div className="timeline-card">
                  <div className="timeline-icon-box">
                    <Palette size={20} />
                  </div>
                  <div className="timeline-content-box">
                    <p>Select primary, secondary, and tertiary seeds using visual pickers or custom hex color values directly.</p>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-card">
                  <div className="timeline-icon-box">
                    <Sparkles size={20} />
                  </div>
                  <div className="timeline-content-box">
                    <p>Matisse instantly maps all seed colors through the perceptual engine, target-generating 11 tones.</p>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-card">
                  <div className="timeline-icon-box">
                    <Download size={20} />
                  </div>
                  <div className="timeline-content-box">
                    <p>Download your files immediately. Available in clean CSS files, standard JSON format, or Tailwind maps.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="timeline-end-node">
              <div className="timeline-check">
                <Check size={16} strokeWidth={3} />
              </div>
              <p className="timeline-end-text">Ready to use, <span>Congratulations you have a new color system.</span></p>
            </div>
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section id="faq" className="faq-section">
          <div className="faq-split-layout">
            <div className="faq-left-content">
              <Badge variant="primary" size="md">FAQ</Badge>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Got questions? We have got the answers.</p>
            </div>
            <div className="faq-right-accordion">
              <div className="faq-accordion-stack">
                {faqs.map((faq, i) => {
                  const isOpen = faqOpenIdx === i;
                  return (
                    <div key={i} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                      <div
                        className="faq-accordion-trigger"
                        onClick={() => toggleFaq(i)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }}
                      >
                        <span className="faq-question-text" id={`faq-q-${i}`}>{faq.q}</span>
                        <span className="faq-icon-toggle" aria-hidden="true">
                          <ChevronDown size={18} />
                        </span>
                      </div>
                      <div className={`faq-accordion-panel ${isOpen ? 'open' : ''}`} role="region" aria-labelledby={`faq-q-${i}`}>
                        <div className="faq-accordion-panel-inner">
                          <p className="faq-answer-text">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 7. TESTIMONIAL SECTION */}
        <section id="testimonials" className="testimonials-section">
          <div className="testimonials-contour testimonials-contour--tl">
            <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <path d="M-20 60 C80 60 120 100 140 200" stroke="hsla(256, 34%, 48%, 0.04)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M-20 120 C40 120 70 160 80 240" stroke="hsla(256, 100%, 87%, 0.05)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M60 -20 C60 80 100 120 200 140" stroke="hsla(256, 34%, 48%, 0.03)" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M120 -20 C120 40 160 70 240 80" stroke="hsla(256, 100%, 87%, 0.04)" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="testimonials-contour testimonials-contour--br">
            <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
              <path d="M-20 60 C80 60 120 100 140 200" stroke="hsla(256, 34%, 48%, 0.04)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M-20 120 C40 120 70 160 80 240" stroke="hsla(256, 100%, 87%, 0.05)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M60 -20 C60 80 100 120 200 140" stroke="hsla(256, 34%, 48%, 0.03)" strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d="M120 -20 C120 40 160 70 240 80" stroke="hsla(256, 100%, 87%, 0.04)" strokeWidth="1" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="section-header">
            <Badge variant="primary" size="md">Testimonials</Badge>
            <h2 className="section-title">Trusted by teams building better design systems</h2>
            <p className="section-subtitle">See how designers, developers, and vibe coders use Matisse to build consistent design systems faster from colors and typography to components and design tokens all without starting from scratch.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="star-icon-filled" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-user-row">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div className="testimonial-user-meta">
                    <span className="testimonial-user-name">{t.author}</span>
                    <span className="testimonial-user-role">{t.role}, {t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. CTA SECTION */}
        <section className="cta-section">
          <div className="cta-inner-card">
            {/* Left Decorative Arc */}
            <svg className="cta-decor-left" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 180 A 110 110 0 0 1 170 40" stroke="url(#cta-left-grad)" strokeWidth="28" strokeLinecap="round" />
              <defs>
                <linearGradient id="cta-left-grad" x1="0%" y1="100%" x2="80%" y2="0%">
                  <stop offset="0%" stopColor="var(--md-ref-role-primary)" />
                  <stop offset="100%" stopColor="var(--md-ref-role-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Right Decorative Arc */}
            <svg className="cta-decor-right" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20 180 A 90 90 0 0 1 180 180" stroke="url(#cta-right-grad)" strokeWidth="28" strokeLinecap="round" />
              <defs>
                <linearGradient id="cta-right-grad" x1="0%" y1="100%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--md-ref-role-primary)" stopOpacity="0" />
                  <stop offset="100%" stopColor="var(--md-ref-role-primary)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="cta-content-wrapper">
              <Badge variant="primary" size="md" dot className="cta-badge">
                Matisse Color Token Builder
              </Badge>
              <h2 className="cta-title">Start building your design system</h2>
              <p className="cta-subtitle">
                Generate mathematically precise Material 3 tonal scales and export production-ready tokens for any platform in seconds.
              </p>
              <div className="cta-buttons-row">
                <GlossyButton variant="primary" size="lg" onClick={() => navigate(user ? '/dashboard' : '/auth')}>
                  Start Designing Free
                </GlossyButton>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* 9. FOOTER SECTION */}
      <Footer />
    </div>
  );
};
