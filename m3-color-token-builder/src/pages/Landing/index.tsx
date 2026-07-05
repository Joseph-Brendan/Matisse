import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette, Layers, Paintbrush, Grid3x3, Type, Download, ArrowRight,
} from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import type { GlossyVariant } from '../../design-system/components/Button/GlossyButton';
import { Badge } from '../../design-system/components/Badge/Badge';
import { Card } from '../../design-system/components/Card/Card';

const features = [
  { icon: <Palette size={24} />, title: 'Color System', desc: 'Full Material 3 tonal palette with semantic role mapping for light and dark modes.' },
  { icon: <Paintbrush size={24} />, title: 'Glossy Components', desc: 'Modern glossy button system with primary, secondary, tertiary, and error variants.' },
  { icon: <Type size={24} />, title: 'Typography Scale', desc: 'Harmonious type system built on Open Sans with 11 sizes and 8 weights.' },
  { icon: <Grid3x3 size={24} />, title: 'Spacing & Grid', desc: 'Consistent 4px-based spacing scale and responsive grid system.' },
  { icon: <Layers size={24} />, title: 'Component Library', desc: 'Production-ready components: tabs, alerts, modals, toasts, badges, cards, and inputs.' },
  { icon: <Download size={24} />, title: 'Multi-format Export', desc: 'Export tokens as JSON, CSS variables, or Tailwind config for any platform.' },
];

const palette = ['hsl(256, 34%, 48%)', 'hsl(259, 11%, 40%)', 'hsl(340, 21%, 41%)', 'hsl(276, 3%, 37%)', 'hsl(260, 4%, 38%)'];

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

  return (
    <div>
      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, hsl(256, 34%, 48%), hsl(340, 21%, 41%))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.125rem',
            }}
          >
            M
          </div>
          <span style={{ fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Matisse</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <GlossyButton variant="ghost" size="sm" onClick={() => navigate('/color-builder')}>
            Color Builder
          </GlossyButton>
          <GlossyButton variant="outline" size="sm" onClick={() => navigate('/auth')}>
            Sign In
          </GlossyButton>
          <GlossyButton size="sm" onClick={() => navigate('/dashboard')}>
            Dashboard
          </GlossyButton>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
        }}
      >
        <Badge variant="primary" size="md" dot>v1.0 — Design System</Badge>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: 0,
            maxWidth: '800px',
          }}
        >
          Build beautiful UIs with{' '}
          <span style={{ background: 'linear-gradient(135deg, hsl(256, 34%, 48%), hsl(340, 21%, 41%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Matisse
          </span>
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--md-ref-role-onSurfaceVariant)', maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
          A comprehensive design system built on Material 3 color science, featuring a full tonal palette, glossy components, and multi-format token export.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <GlossyButton size="lg" onClick={() => navigate('/dashboard')}>
            Get Started <ArrowRight size={20} />
          </GlossyButton>
          <GlossyButton variant="outline" size="lg" onClick={() => navigate('/color-builder')}>
            Explore Colors
          </GlossyButton>
        </div>

        {/* Color palette preview */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '2rem',
            padding: '1rem',
            background: 'var(--md-ref-role-surfaceContainerHighest)',
            borderRadius: '1rem',
          }}
        >
          {palette.map((color, i) => (
            <div
              key={i}
              title={color}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: color,
                boxShadow: '0 2px 8px hsla(0, 0%, 0%, 0.1)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ))}
        </div>
      </section>

      {/* Button Variants Showcase */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem 4rem',
        }}
      >
        <Card variant="outlined" padding="lg">
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Glossy Button Variants</h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--md-ref-role-onSurfaceVariant)' }}>
              All six variants displayed in a row — primary, secondary, tertiary, error, ghost, and outline.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {buttonVariants.map(({ variant, label }) => (
              <GlossyButton key={variant} variant={variant} size="md">
                {label}
              </GlossyButton>
            ))}
          </div>
        </Card>
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem 5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Everything you need</h2>
          <p style={{ color: 'var(--md-ref-role-onSurfaceVariant)', margin: 0 }}>A complete toolkit for building consistent, beautiful interfaces.</p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                padding: '1.75rem',
                borderRadius: '1rem',
                background: 'var(--md-ref-role-surface)',
                border: '1px solid var(--md-ref-role-outlineVariant)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px hsla(0, 0%, 0%, 0.06)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--md-ref-role-primaryContainer)',
                  color: 'var(--md-ref-role-onPrimaryContainer)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ margin: '0 0 0.375rem', fontSize: '1.0625rem', fontWeight: 600 }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--md-ref-role-onSurfaceVariant)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--md-ref-role-outlineVariant)',
          padding: '2rem',
          textAlign: 'center',
          fontSize: '0.8125rem',
          color: 'var(--md-ref-role-onSurfaceVariant)',
        }}
      >
        <p style={{ margin: 0 }}>Matisse Design System — Built with React, TypeScript &amp; Material 3</p>
      </footer>
    </div>
  );
};
