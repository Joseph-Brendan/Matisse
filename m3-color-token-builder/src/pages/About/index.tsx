import React, { useEffect } from 'react';
import {
  ArrowRight, Heart, Zap,
  Eye, Code, Users, Lightbulb, Shield, Globe,
  Palette, Layers, Star,
  CheckCircle2, Clock
} from 'lucide-react';
import { Badge } from '../../design-system/components/Badge/Badge';
import { Card } from '../../design-system/components/Card/Card';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import './About.css';

/* ─── Data ─────────────────────────────────────────────── */

const values = [
  {
    icon: <Heart size={24} />,
    title: 'Craft Over Convention',
    desc: 'Every decision we make is guided by a love for beautiful, functional design. We never settle for "good enough."',
    gradient: 'value-gradient-1',
  },
  {
    icon: <Shield size={24} />,
    title: 'Accessibility First',
    desc: 'Design systems should work for everyone. We bake contrast ratios, readability, and inclusive patterns into the core.',
    gradient: 'value-gradient-2',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Simplicity Is Power',
    desc: 'Complex problems deserve elegant solutions. We reduce cognitive load so teams can focus on what matters.',
    gradient: 'value-gradient-3',
  },
  {
    icon: <Globe size={24} />,
    title: 'Open By Default',
    desc: 'We believe in transparency—open formats, standard tokens, and interoperability with every tool in your stack.',
    gradient: 'value-gradient-4',
  },
];

const stats = [
  { value: '10k+', label: 'Design tokens generated', icon: <Palette size={18} /> },
  { value: '99.4%', label: 'WCAG compliance rate', icon: <CheckCircle2 size={18} /> },
  { value: '<3s', label: 'Avg. generation time', icon: <Clock size={18} /> },
  { value: '5+', label: 'Export formats', icon: <Layers size={18} /> },
];

const teamPhilosophy = [
  {
    icon: <Eye size={22} />,
    title: 'Design-Led Engineering',
    desc: 'We build tools for designers with the precision of engineers. Pixel-perfect output, mathematically grounded.',
  },
  {
    icon: <Code size={22} />,
    title: 'Developer Experience',
    desc: 'Clean APIs, standard formats, zero lock-in. Our tokens drop into any codebase without friction.',
  },
  {
    icon: <Users size={22} />,
    title: 'Team Alignment',
    desc: 'One shared source of truth eliminates the "which shade of blue?" conversation forever.',
  },
];

/* ─── Component ────────────────────────────────────────── */

export const About: React.FC = () => {
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
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll('[data-reveal]');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page-wrapper">
      <Navbar />
      <main className="about-main">

        {/* ═══ 1. Hero — Brand Story ═══ */}
        <section className="about-hero">
          <div className="about-hero-glow" />
          <div className="about-hero-glow about-hero-glow--secondary" />
          <div className="about-hero-content">
            <Badge variant="primary" size="md">About Matisse</Badge>
            <h1 className="about-hero-title">
              <span className="about-hero-title-line">We believe great products</span>
              <span className="about-hero-title-line">
                deserve <span className="about-hero-title-accent">great foundations</span>.
              </span>
            </h1>
            <p className="about-hero-subtitle">
              Matisse is a design system generator born from a simple conviction: the gap between
              design intent and production code shouldn't exist. We're building the bridge.
            </p>
            <div className="about-hero-actions">
              <GlossyButton variant="primary">
                Start Creating <ArrowRight size={16} />
              </GlossyButton>
              <GlossyButton variant="outline">Our Story</GlossyButton>
            </div>
          </div>

          {/* Floating accent elements */}
          <div className="about-hero-float-grid">
            <div className="about-hero-float about-hero-float--1">
              <Palette size={20} />
            </div>
            <div className="about-hero-float about-hero-float--2">
              <Layers size={20} />
            </div>
            <div className="about-hero-float about-hero-float--3">
              <Zap size={20} />
            </div>
          </div>
        </section>

        {/* ═══ 2. Mission Statement ═══ */}
        <section className="about-section" data-reveal>
          <div className="about-mission-container">
            <div className="about-mission-badge-row">
              <Badge variant="primary" size="md">Our Mission</Badge>
            </div>
            <blockquote className="about-mission-quote">
              <span className="about-mission-quote-mark">"</span>
              To democratize design systems by making production-ready foundations
              accessible to every team, regardless of size, budget, or expertise.
              <span className="about-mission-quote-mark">"</span>
            </blockquote>
            <p className="about-mission-author">
              — The Matisse Team
            </p>
          </div>
        </section>

        {/* ═══ 3. By The Numbers ═══ */}
        <section className="about-section about-section--alt" data-reveal>
          <div className="about-section-header">
            <Badge variant="primary" size="md">By The Numbers</Badge>
            <h2 className="about-section-title">Impact at a glance</h2>
            <p className="about-section-subtitle">
              Numbers that reflect our commitment to quality and performance.
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

        {/* ═══ 4. Our Values ═══ */}
        <section className="about-section" data-reveal>
          <div className="about-section-header">
            <Badge variant="primary" size="md">Our Values</Badge>
            <h2 className="about-section-title">What drives us</h2>
            <p className="about-section-subtitle">
              The principles that shape every feature, every pixel, and every line of code.
            </p>
          </div>
          <div className="about-values-grid">
            {values.map((value, i) => (
              <div className="about-value-card-wrap" key={value.title} style={{ '--i': i } as React.CSSProperties}>
                <div className={`about-value-card ${value.gradient}`}>
                  <div className="about-value-card-icon">{value.icon}</div>
                  <h3 className="about-value-card-title">{value.title}</h3>
                  <p className="about-value-card-desc">{value.desc}</p>
                  <div className="about-value-card-shine" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 6. How We Think ═══ */}
        <section className="about-section" data-reveal>
          <div className="about-section-header">
            <Badge variant="primary" size="md">How We Think</Badge>
            <h2 className="about-section-title">Built for the people who build products</h2>
            <p className="about-section-subtitle">
              Matisse bridges the gap between design intent and production reality.
            </p>
          </div>
          <div className="about-philosophy-grid">
            {teamPhilosophy.map((item, i) => (
              <div className="about-philosophy-card-wrap" key={item.title} style={{ '--i': i } as React.CSSProperties}>
                <Card variant="elevated" padding="none" hoverable>
                  <div className="about-philosophy-card-inner">
                    <div className="about-philosophy-icon-wrap">
                      {item.icon}
                    </div>
                    <h3 className="about-philosophy-card-title">{item.title}</h3>
                    <p className="about-philosophy-card-desc">{item.desc}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 7. CTA ═══ */}
        <section className="about-section" data-reveal>
          <div className="about-cta-container">
            <div className="about-cta-glow" />
            <div className="about-cta-content">
              <Star size={32} className="about-cta-star" />
              <h2 className="about-cta-title">Ready to build your design system?</h2>
              <p className="about-cta-subtitle">
                Start with a mood, a brand color, or a reference image—and let Matisse
                generate the foundations for your product.
              </p>
              <div className="about-cta-actions">
                <GlossyButton variant="primary">
                  Get Started Free <ArrowRight size={16} />
                </GlossyButton>
                <GlossyButton variant="outline">Explore Features</GlossyButton>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
