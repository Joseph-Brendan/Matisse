import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Zap,
  Eye,
  Code,
  Users,
  Globe,
  Palette,
  Layers,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Badge } from '../../design-system/components/Badge/Badge';
import { Card } from '../../design-system/components/Card/Card';
import { Navbar } from '../../components/Navbar';
import { CTASection } from '../../components/CTASection';
import { Footer } from '../../components/Footer';
import { SubpageHero } from '../../components/SubpageHero';
import { FAQSection } from '../../components/FAQSection';
import { TestimonialSection } from '../../components/TestimonialSection';
import './About.css';

// Premium values with technical/design system alignment (No AI slop)
const values = [
  {
    icon: <Zap size={24} />,
    title: 'Perceptual Contrast',
    desc: 'Contrast is a function of human vision, not arbitrary hex formulas. Matisse calculates colors in HCT space to guarantee WCAG compliance across all themes.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Semantic Mapping',
    desc: 'Every generated token corresponds directly to functional UI roles (like surfaceContainer or primaryContainer), maintaining designer-to-developer parity.',
  },
  {
    icon: <Code size={24} />,
    title: 'Interoperable Formats',
    desc: 'Your tokens should belong to you. We export standard design tokens as formatted JSON, modular Tailwind configurations, or native CSS variables.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Extensible Palette Scaling',
    desc: 'Support for arbitrary brand keys alongside Material Design 3 palettes. Generate mathematically aligned custom scales in milliseconds.',
  },
];

// Meaningful metrics representing engineering standards
const stats = [
  { value: 'HCT Space', label: 'Perceptually accurate color model', icon: <Palette size={18} /> },
  { value: '4.5:1+', label: 'Guaranteed WCAG AA contrast ratio', icon: <CheckCircle2 size={18} /> },
  { value: '11 Tones', label: 'Computed levels per seed key', icon: <Clock size={18} /> },
  { value: '100%', label: 'Material Design 3 spec compliance', icon: <Layers size={18} /> },
];

const teamPhilosophy = [
  {
    icon: <Eye size={22} />,
    title: 'Perceptual Harmony',
    desc: 'Traditional RGB/HSL scales fail to account for human brightness perception. We build color scales based on physical color space science.',
  },
  {
    icon: <Code size={22} />,
    title: 'Deterministic Tokenization',
    desc: 'Design variables must be deterministic. Matisse removes arbitrary hex picking, replacing it with predictable, reproducible scale logic.',
  },
  {
    icon: <Users size={22} />,
    title: 'Production Readiness',
    desc: 'Tokens are compiled for immediate frontend consumption. Clean outputs with zero boilerplate integration friction.',
  },
];

export const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const els = document.querySelectorAll('[data-reveal]');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToManifesto = () => {
    const element = document.getElementById('manifesto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page-wrapper">
      <Navbar />

      {/* ═══ 1. Redesigned Hero Container (Matches Landing Hero Layout) ═══ */}
      {/* ═══ 1. Redesigned Hero Container (Matches Landing Hero Layout) ═══ */}
      <SubpageHero scrollY={scrollY}>
        <div className="about-hero-bottom-grid">
          <div className="about-hero-left-content">
            <div className="about-hero-badge">
              <Palette size={14} className="about-hero-badge-icon" />
              <span>Design Engineering Philosophy</span>
            </div>

            <h1 className="about-hero-headline">
              Color science <br />
              meets <span className="about-hero-headline-gradient">predictable code</span>.
            </h1>

            <button className="about-hero-btn-pill" onClick={scrollToManifesto}>
              <span>Read Our Manifesto</span>
              <div className="about-hero-btn-pill-circle">
                <ArrowRight size={20} />
              </div>
            </button>
          </div>

          <div className="about-hero-right-content">
            <div className="about-hero-summary-card">
              <h3 className="about-hero-summary-card-title">Perceptual Foundation</h3>
              <p className="about-hero-summary-card-text">
                Traditional color scaling tools treat hues uniformly, ignoring human contrast
                sensitivity. Matisse leverages the HCT color space to output mathematically
                guaranteed accessible themes automatically.
              </p>
            </div>
          </div>
        </div>
      </SubpageHero>

      <div className="about-content-sections">
        {/* ═══ 2. Manifesto / Mission ═══ */}
        <section id="manifesto" className="about-section" data-reveal>
          <div className="about-section-header">
            <Badge variant="primary" size="md">
              Our Manifesto
            </Badge>
          </div>
          <blockquote className="about-mission-quote">
            <span className="about-mission-quote-mark">"</span>
            We believe design systems should be deterministic, accessible, and mathematically
            coherent. By aligning token properties directly with human visual perception, we
            eliminate designer-to-developer friction and build UI foundations that scale natively.
            <span className="about-mission-quote-mark">"</span>
          </blockquote>
          <p className="about-mission-author">— The Matisse Team</p>
        </section>

        {/* ═══ 4. By The Numbers ═══ */}
        <section className="about-alt-section" data-reveal>
          <div className="about-section-header">
            <Badge variant="primary" size="md">
              Framework Target
            </Badge>
            <h2 className="about-section-title">Built to design system standards</h2>
            <p className="about-section-subtitle">
              We compile code to fit strict production specifications out of the box.
            </p>
          </div>
          <div className="about-stats-grid">
            {stats.map((stat, i) => (
              <div className="about-stat-card" key={i} style={{ '--i': i } as React.CSSProperties}>
                <div className="about-stat-icon">{stat.icon}</div>
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 5. Our Values ═══ */}
        <section className="about-values-section" data-reveal>
          <div className="about-section-header">
            <Badge variant="primary" size="md">
              Core Pillars
            </Badge>
            <h2 className="about-section-title">Engineered for builders</h2>
            <p className="about-section-subtitle">
              The architecture principles that drive every token compiled in Matisse.
            </p>
          </div>
          <div className="about-values-grid">
            {values.map((value, i) => (
              <div
                className="about-value-card-wrap"
                key={value.title}
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="about-value-card">
                  <div className="about-value-card-icon">{value.icon}</div>
                  <h3 className="about-value-card-title">{value.title}</h3>
                  <p className="about-value-card-desc">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 6. How We Think ═══ */}
        <section className="about-section" data-reveal>
          <div className="about-section-header">
            <Badge variant="primary" size="md">
              How We Think
            </Badge>
            <h2 className="about-section-title">Empowering designers and engineers</h2>
            <p className="about-section-subtitle">
              Matisse unites styling abstractions under a single deterministic compiler.
            </p>
          </div>
          <div className="about-philosophy-grid">
            {teamPhilosophy.map((item, i) => (
              <div
                className="about-philosophy-card-wrap"
                key={item.title}
                style={{ '--i': i } as React.CSSProperties}
              >
                <Card variant="elevated" padding="none" hoverable>
                  <div className="about-philosophy-card-inner">
                    <div className="about-philosophy-icon-wrap">{item.icon}</div>
                    <h3 className="about-philosophy-card-title">{item.title}</h3>
                    <p className="about-philosophy-card-desc">{item.desc}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 7. FAQ ═══ */}
        <FAQSection />

        {/* ═══ 8. Testimonials ═══ */}
        <TestimonialSection />

        {/* ═══ 9. CTA ═══ */}
        <CTASection
          badgeText="Matisse Color Token Builder"
          title="Ready to build your design system?"
          subtitle="Generate mathematically consistent tonal scales and export production-ready variables in seconds."
          buttonText="Get Started Free"
        />
      </div>

      <Footer />
    </div>
  );
};
