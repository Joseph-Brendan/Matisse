import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { GlossyButton } from '../../design-system/components/Button/GlossyButton';
import { useColorStore } from '../../store/useColorStore';
import { hexToHsl } from '../../lib/colorUtils';
import './DesignRecommendations.css';

interface LocationState {
  industry: string;
}

interface DesignPreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    neutralVariant: string;
  };
  typography: {
    sans: string;
    display: string;
    mono: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

const industryPresets: Record<string, { label: string; helper: string; presets: DesignPreset[] }> = {
  FinTech: {
    label: 'FinTech',
    helper: 'Each recommendation is a complete design direction tailored for financial technology products. You can customize any token after applying.',
    presets: [
      {
        id: 'fintech-modern',
        name: 'Modern & Trusted',
        description: 'Professional blue palette conveying reliability and trust for banking, payments, and financial platforms.',
        colors: {
          primary: '#2563EB',
          secondary: '#60A5FA',
          tertiary: '#10B981',
          neutral: '#475569',
          neutralVariant: '#E2E8F0',
        },
        typography: { sans: 'Source Sans 3', display: 'Lora', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.5rem' },
      },
      {
        id: 'fintech-wealth',
        name: 'Wealth & Growth',
        description: 'Emerald-driven design symbolizing prosperity and financial growth for investment and wealth management.',
        colors: {
          primary: '#059669',
          secondary: '#14B8A6',
          tertiary: '#D4A017',
          neutral: '#374151',
          neutralVariant: '#E5E7EB',
        },
        typography: { sans: 'DM Sans', display: 'DM Sans', mono: 'Fira Code' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
      {
        id: 'fintech-premium',
        name: 'Premium Banking',
        description: 'Deep navy with silver accents for high-end banking, private wealth, and premium financial services.',
        colors: {
          primary: '#1E3A8A',
          secondary: '#4338CA',
          tertiary: '#CBD5E1',
          neutral: '#4B5563',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'IBM Plex Sans', display: 'IBM Plex Serif', mono: 'IBM Plex Mono' },
        borderRadius: { sm: '0rem', md: '0.125rem', lg: '0.25rem', xl: '0.25rem' },
      },
    ],
  },
  Healthcare: {
    label: 'Healthcare',
    helper: 'Each recommendation is a complete design direction tailored for health and medical products. You can customize any token after applying.',
    presets: [
      {
        id: 'health-clinical',
        name: 'Clean & Clinical',
        description: 'Trustworthy blue with clean whites for hospital systems, EHR platforms, and clinical tools.',
        colors: {
          primary: '#2563EB',
          secondary: '#FFFFFF',
          tertiary: '#22C55E',
          neutral: '#6B7280',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'Inter', display: 'Inter', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '0.75rem' },
      },
      {
        id: 'health-wellness',
        name: 'Modern Wellness',
        description: 'Fresh emerald and mint tones for consumer health, fitness, and wellness applications.',
        colors: {
          primary: '#10B981',
          secondary: '#6EE7B7',
          tertiary: '#38BDF8',
          neutral: '#64748B',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Nunito', display: 'Nunito', mono: 'Fira Code' },
        borderRadius: { sm: '0.625rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
      },
      {
        id: 'health-family',
        name: 'Family Care',
        description: 'Warm, approachable blue with coral and yellow accents for pediatric and family health platforms.',
        colors: {
          primary: '#3B82F6',
          secondary: '#FB7185',
          tertiary: '#FACC15',
          neutral: '#6B7280',
          neutralVariant: '#F9FAFB',
        },
        typography: { sans: 'Plus Jakarta Sans', display: 'Plus Jakarta Sans', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '0.75rem' },
      },
    ],
  },
  'E-commerce': {
    label: 'E-commerce',
    helper: 'Each recommendation is a complete design direction tailored for online retail and marketplace products. You can customize any token after applying.',
    presets: [
      {
        id: 'ecommerce-modern',
        name: 'Modern Retail',
        description: 'Energetic orange and amber for mainstream retail, marketplace platforms, and shopping apps.',
        colors: {
          primary: '#F97316',
          secondary: '#F59E0B',
          tertiary: '#6366F1',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'DM Sans', display: 'Playfair Display', mono: 'Fira Code' },
        borderRadius: { sm: '0rem', md: '0.125rem', lg: '0.25rem', xl: '0.25rem' },
      },
      {
        id: 'ecommerce-premium',
        name: 'Premium Shopping',
        description: 'Sleek black with gold accents for luxury retail, designer brands, and high-end marketplaces.',
        colors: {
          primary: '#111827',
          secondary: '#D4A017',
          tertiary: '#FFFFFF',
          neutral: '#6B7280',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'DM Sans', display: 'Playfair Display', mono: 'Fira Code' },
        borderRadius: { sm: '0rem', md: '0.125rem', lg: '0.25rem', xl: '0.25rem' },
      },
      {
        id: 'ecommerce-lifestyle',
        name: 'Lifestyle Brand',
        description: 'Vibrant coral and peach for lifestyle, fashion, and trend-driven consumer brands.',
        colors: {
          primary: '#F43F5E',
          secondary: '#FDBA74',
          tertiary: '#FEF3C7',
          neutral: '#78716C',
          neutralVariant: '#FAFAF9',
        },
        typography: { sans: 'Nunito Sans', display: 'Nunito', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
    ],
  },
  Education: {
    label: 'Education',
    helper: 'Each recommendation is a complete design direction tailored for learning platforms and educational products. You can customize any token after applying.',
    presets: [
      {
        id: 'edu-academic',
        name: 'Academic Trust',
        description: 'Classic blue and gold for universities, academic institutions, and traditional learning platforms.',
        colors: {
          primary: '#2563EB',
          secondary: '#FBBF24',
          tertiary: '#FFFFFF',
          neutral: '#6B7280',
          neutralVariant: '#F9FAFB',
        },
        typography: { sans: 'Source Sans 3', display: 'Lora', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.5rem' },
      },
      {
        id: 'edu-creative',
        name: 'Creative Learning',
        description: 'Vibrant orange and purple for creative courses, art platforms, and interactive learning.',
        colors: {
          primary: '#F97316',
          secondary: '#8B5CF6',
          tertiary: '#3B82F6',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Nunito', display: 'Nunito', mono: 'Fira Code' },
        borderRadius: { sm: '0.625rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
      },
      {
        id: 'edu-future',
        name: 'Future Classroom',
        description: 'Fresh teal and blue for modern edtech, STEM platforms, and digital classrooms.',
        colors: {
          primary: '#14B8A6',
          secondary: '#3B82F6',
          tertiary: '#84CC16',
          neutral: '#6B7280',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'Plus Jakarta Sans', display: 'Plus Jakarta Sans', mono: 'IBM Plex Mono' },
        borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem' },
      },
    ],
  },
  AI: {
    label: 'AI',
    helper: 'Each recommendation is a complete design direction tailored for artificial intelligence and machine learning products. You can customize any token after applying.',
    presets: [
      {
        id: 'ai-future',
        name: 'Future Intelligence',
        description: 'Deep indigo and cyan for AI research, model providers, and frontier technology platforms.',
        colors: {
          primary: '#4F46E5',
          secondary: '#3B82F6',
          tertiary: '#06B6D4',
          neutral: '#334155',
          neutralVariant: '#F1F5F9',
        },
        typography: { sans: 'IBM Plex Sans', display: 'IBM Plex Serif', mono: 'IBM Plex Mono' },
        borderRadius: { sm: '0rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem' },
      },
      {
        id: 'ai-human',
        name: 'Human-Centered AI',
        description: 'Warm purple and lavender for AI products focused on accessibility and human augmentation.',
        colors: {
          primary: '#7C3AED',
          secondary: '#A78BFA',
          tertiary: '#34D399',
          neutral: '#4B5563',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'Space Grotesk', display: 'Space Grotesk', mono: 'Fira Code' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
      {
        id: 'ai-enterprise',
        name: 'Enterprise AI',
        description: 'Authoritative navy with steel blue for B2B AI infrastructure, MLOps, and enterprise platforms.',
        colors: {
          primary: '#1E40AF',
          secondary: '#3B82F6',
          tertiary: '#059669',
          neutral: '#374151',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'DM Sans', display: 'DM Sans', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '0.75rem' },
      },
    ],
  },
  SaaS: {
    label: 'SaaS',
    helper: 'Each recommendation is a complete design direction tailored for software-as-a-service platforms. You can customize any token after applying.',
    presets: [
      {
        id: 'saas-productivity',
        name: 'Modern Productivity',
        description: 'Focused indigo and blue for project management, collaboration, and productivity tools.',
        colors: {
          primary: '#4F46E5',
          secondary: '#3B82F6',
          tertiary: '#06B6D4',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'IBM Plex Sans', display: 'IBM Plex Serif', mono: 'IBM Plex Mono' },
        borderRadius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.5rem' },
      },
      {
        id: 'saas-business',
        name: 'Business Suite',
        description: 'Professional navy with emerald accents for CRM, ERP, and comprehensive business platforms.',
        colors: {
          primary: '#1E3A8A',
          secondary: '#10B981',
          tertiary: '#94A3B8',
          neutral: '#6B7280',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'Inter', display: 'Inter', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem' },
      },
      {
        id: 'saas-startup',
        name: 'Startup Energy',
        description: 'Bold violet with coral for fast-moving startups, indie SaaS, and disruptive products.',
        colors: {
          primary: '#7C3AED',
          secondary: '#F43F5E',
          tertiary: '#38BDF8',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Space Grotesk', display: 'Space Grotesk', mono: 'Fira Code' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
    ],
  },
  Travel: {
    label: 'Travel',
    helper: 'Each recommendation is a complete design direction tailored for travel and booking experiences. You can customize any token after applying.',
    presets: [
      {
        id: 'travel-adventure',
        name: 'Adventure',
        description: 'Bright sky blue and emerald for outdoor travel, adventure booking, and exploration platforms.',
        colors: {
          primary: '#0EA5E9',
          secondary: '#10B981',
          tertiary: '#FBBF24',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Space Grotesk', display: 'Space Grotesk', mono: 'Fira Code' },
        borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem' },
      },
      {
        id: 'travel-luxury',
        name: 'Luxury Escape',
        description: 'Deep navy with gold for luxury hotels, premium resorts, and high-end travel experiences.',
        colors: {
          primary: '#1E3A8A',
          secondary: '#D4A017',
          tertiary: '#FFFBEB',
          neutral: '#6B7280',
          neutralVariant: '#F9FAFB',
        },
        typography: { sans: 'DM Sans', display: 'Playfair Display', mono: 'Fira Code' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
      {
        id: 'travel-tropical',
        name: 'Tropical Journey',
        description: 'Vivid turquoise and coral for tropical destinations, cruise lines, and vacation platforms.',
        colors: {
          primary: '#06B6D4',
          secondary: '#FB7185',
          tertiary: '#FACC15',
          neutral: '#78716C',
          neutralVariant: '#FAFAF9',
        },
        typography: { sans: 'Nunito Sans', display: 'Nunito', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
    ],
  },
  Logistics: {
    label: 'Logistics',
    helper: 'Each recommendation is a complete design direction tailored for supply chain and logistics tools. You can customize any token after applying.',
    presets: [
      {
        id: 'log-delivery',
        name: 'Reliable Delivery',
        description: 'Trustworthy blue with orange for shipping, freight, and last-mile delivery platforms.',
        colors: {
          primary: '#2563EB',
          secondary: '#F97316',
          tertiary: '#94A3B8',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Inter', display: 'Inter', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.375rem' },
      },
      {
        id: 'log-industrial',
        name: 'Industrial Supply',
        description: 'Bold burnt orange and charcoal for warehouse, manufacturing, and industrial supply chains.',
        colors: {
          primary: '#EA580C',
          secondary: '#374151',
          tertiary: '#94A3B8',
          neutral: '#6B7280',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'IBM Plex Sans', display: 'IBM Plex Serif', mono: 'IBM Plex Mono' },
        borderRadius: { sm: '0rem', md: '0.125rem', lg: '0.25rem', xl: '0.25rem' },
      },
      {
        id: 'log-smart',
        name: 'Smart Fleet',
        description: 'Deep teal with navy for fleet management, route optimization, and smart logistics.',
        colors: {
          primary: '#0F766E',
          secondary: '#1E3A8A',
          tertiary: '#06B6D4',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Plus Jakarta Sans', display: 'Plus Jakarta Sans', mono: 'IBM Plex Mono' },
        borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem' },
      },
    ],
  },
  Food: {
    label: 'Food',
    helper: 'Each recommendation is a complete design direction tailored for food and culinary products. You can customize any token after applying.',
    presets: [
      {
        id: 'food-fresh',
        name: 'Fresh Market',
        description: 'Vibrant green and orange for grocery delivery, farmers markets, and fresh food platforms.',
        colors: {
          primary: '#16A34A',
          secondary: '#F97316',
          tertiary: '#FEF3C7',
          neutral: '#78716C',
          neutralVariant: '#FAFAF9',
        },
        typography: { sans: 'DM Sans', display: 'Playfair Display', mono: 'Fira Code' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
      {
        id: 'food-gourmet',
        name: 'Gourmet Dining',
        description: 'Rich burgundy with gold for fine dining, gourmet food, and premium culinary experiences.',
        colors: {
          primary: '#7F1D1D',
          secondary: '#D4A017',
          tertiary: '#FFFBEB',
          neutral: '#374151',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'Source Sans 3', display: 'Lora', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0rem', md: '0.125rem', lg: '0.25rem', xl: '0.25rem' },
      },
      {
        id: 'food-fast',
        name: 'Fast Casual',
        description: 'Energetic red and yellow for fast-casual restaurants, delivery apps, and quick-service brands.',
        colors: {
          primary: '#DC2626',
          secondary: '#FACC15',
          tertiary: '#FB923C',
          neutral: '#6B7280',
          neutralVariant: '#F9FAFB',
        },
        typography: { sans: 'Inter', display: 'Inter', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
      },
    ],
  },
  Beauty: {
    label: 'Beauty',
    helper: 'Each recommendation is a complete design direction tailored for beauty and cosmetics products. You can customize any token after applying.',
    presets: [
      {
        id: 'beauty-luxury',
        name: 'Luxury Beauty',
        description: 'Deep rose with champagne accents for luxury cosmetics, high-end skincare, and premium beauty brands.',
        colors: {
          primary: '#E11D48',
          secondary: '#FDE68A',
          tertiary: '#FFFBEB',
          neutral: '#78716C',
          neutralVariant: '#FAFAF9',
        },
        typography: { sans: 'DM Sans', display: 'Playfair Display', mono: 'Fira Code' },
        borderRadius: { sm: '0rem', md: '0.125rem', lg: '0.25rem', xl: '0.25rem' },
      },
      {
        id: 'beauty-clean',
        name: 'Clean Beauty',
        description: 'Soft sage and cream for natural, organic, and clean beauty brands focused on sustainability.',
        colors: {
          primary: '#84A98C',
          secondary: '#FAF3E0',
          tertiary: '#D8F3DC',
          neutral: '#78716C',
          neutralVariant: '#FAFAF9',
        },
        typography: { sans: 'Nunito Sans', display: 'Nunito', mono: 'Fira Code' },
        borderRadius: { sm: '0.625rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
      },
      {
        id: 'beauty-bold',
        name: 'Bold Cosmetics',
        description: 'Vivid plum and pink for expressive makeup brands, bold palettes, and Gen-Z beauty.',
        colors: {
          primary: '#7E22CE',
          secondary: '#EC4899',
          tertiary: '#FB7185',
          neutral: '#374151',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'Plus Jakarta Sans', display: 'Plus Jakarta Sans', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem' },
      },
    ],
  },
  Social: {
    label: 'Social',
    helper: 'Each recommendation is a complete design direction tailored for social networking and community products. You can customize any token after applying.',
    presets: [
      {
        id: 'social-community',
        name: 'Community First',
        description: 'Friendly blue and purple for social networks, community platforms, and discussion forums.',
        colors: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          tertiary: '#EC4899',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Inter', display: 'Inter', mono: 'JetBrains Mono' },
        borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem' },
      },
      {
        id: 'social-creator',
        name: 'Creator Economy',
        description: 'Vibrant purple and coral for creator tools, content platforms, and influencer services.',
        colors: {
          primary: '#7C3AED',
          secondary: '#FB7185',
          tertiary: '#FB923C',
          neutral: '#6B7280',
          neutralVariant: '#F3F4F6',
        },
        typography: { sans: 'Space Grotesk', display: 'Space Grotesk', mono: 'Fira Code' },
        borderRadius: { sm: '0.5rem', md: '0.875rem', lg: '1.25rem', xl: '1.5rem' },
      },
      {
        id: 'social-network',
        name: 'Modern Network',
        description: 'Fresh teal and indigo for modern social platforms, messaging apps, and networking tools.',
        colors: {
          primary: '#14B8A6',
          secondary: '#4F46E5',
          tertiary: '#06B6D4',
          neutral: '#475569',
          neutralVariant: '#F8FAFC',
        },
        typography: { sans: 'Plus Jakarta Sans', display: 'Plus Jakarta Sans', mono: 'IBM Plex Mono' },
        borderRadius: { sm: '0.375rem', md: '0.625rem', lg: '0.875rem', xl: '1rem' },
      },
    ],
  },
};

export const DesignRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const industry = state?.industry ?? 'SaaS';

  const {
    updateKeyColor,
    updateTypographyFamily,
    updateBorderRadiusValue,
  } = useColorStore();

  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const meta = industryPresets[industry] ?? industryPresets.SaaS;

  const handleApplyPreset = () => {
    const preset = meta.presets.find((p) => p.id === selectedPresetId);
    if (!preset) return;

    updateKeyColor('primary', hexToHsl(preset.colors.primary));
    updateKeyColor('secondary', hexToHsl(preset.colors.secondary));
    updateKeyColor('tertiary', hexToHsl(preset.colors.tertiary));
    updateKeyColor('neutral', hexToHsl(preset.colors.neutral));
    updateKeyColor('neutralVariant', hexToHsl(preset.colors.neutralVariant));

    updateTypographyFamily('sans', preset.typography.sans);
    updateTypographyFamily('display', preset.typography.display);
    updateTypographyFamily('mono', preset.typography.mono);

    updateBorderRadiusValue('sm', preset.borderRadius.sm);
    updateBorderRadiusValue('md', preset.borderRadius.md);
    updateBorderRadiusValue('lg', preset.borderRadius.lg);
    updateBorderRadiusValue('xl', preset.borderRadius.xl);

    navigate('/dashboard');
  };

  return (
    <div
      className="dr-root"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('.dr-preset-card')) {
          setSelectedPresetId(null);
        }
      }}
    >
      <header className="dr-header">
        <button
          className="dr-header__back-btn"
          onClick={() => navigate('/dashboard', { state: { openPresets: true, industry } })}
          aria-label="Go back to Explore Presets"
        >
          <ArrowLeft size={16} />
          Back to Explore Presets
        </button>
        <GlossyButton
          variant="primary"
          size="md"
          disabled={!selectedPresetId}
          onClick={handleApplyPreset}
        >
          Apply Preset
        </GlossyButton>
      </header>

      <div className="dr-body">
        <div className="dr-hero">
          <span className="dr-industry-badge">{meta.label}</span>
          <h1 className="dr-title">Design Recommendations</h1>
          <p className="dr-helper">{meta.helper}</p>
        </div>

        <div className="dr-presets-list">
          {meta.presets.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                className={`dr-preset-card${isSelected ? ' dr-preset-card--selected' : ''}`}
                onClick={() => setSelectedPresetId(preset.id)}
                type="button"
              >
                <div className="dr-preset-card__header">
                  <div className="dr-preset-card__title-row">
                    <span className="dr-preset-card__name">{preset.name}</span>
                    {isSelected && (
                      <span className="dr-preset-card__check">
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                  <p className="dr-preset-card__desc">{preset.description}</p>
                </div>

                <div className="dr-preset-card__previews">
                  <div className="dr-preset-card__section">
                    <span className="dr-preset-card__section-label">Colors</span>
                    <div className="dr-preset-card__swatches">
                      {Object.entries(preset.colors).map(([key, hex], i) => (
                        <div
                          key={i}
                          className={`dr-preset-card__swatch${i === 0 ? ' dr-preset-card__swatch--primary' : ''}`}
                          style={{ background: hex }}
                          title={`${key}: ${hex}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="dr-preset-card__section">
                    <span className="dr-preset-card__section-label">Typography</span>
                    <div className="dr-preset-card__typo-list">
                      <div className="dr-preset-card__typo-row">
                        <span className="dr-preset-card__typo-sample" style={{ fontFamily: `'${preset.typography.sans}', sans-serif` }}>Aa</span>
                        <div className="dr-preset-card__typo-info">
                          <span className="dr-preset-card__typo-role">Sans</span>
                          <span className="dr-preset-card__typo-name">{preset.typography.sans}</span>
                        </div>
                      </div>
                      <div className="dr-preset-card__typo-row">
                        <span className="dr-preset-card__typo-sample" style={{ fontFamily: `'${preset.typography.display}', serif` }}>Aa</span>
                        <div className="dr-preset-card__typo-info">
                          <span className="dr-preset-card__typo-role">Display</span>
                          <span className="dr-preset-card__typo-name">{preset.typography.display}</span>
                        </div>
                      </div>
                      <div className="dr-preset-card__typo-row">
                        <span className="dr-preset-card__typo-sample" style={{ fontFamily: `'${preset.typography.mono}', monospace` }}>Aa</span>
                        <div className="dr-preset-card__typo-info">
                          <span className="dr-preset-card__typo-role">Mono</span>
                          <span className="dr-preset-card__typo-name">{preset.typography.mono}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dr-preset-card__section">
                    <span className="dr-preset-card__section-label">Corner Radius</span>
                    <div className="dr-preset-card__radius-previews">
                      <div
                        className="dr-preset-card__radius-box"
                        style={{ borderRadius: preset.borderRadius.sm }}
                      />
                      <div
                        className="dr-preset-card__radius-box dr-preset-card__radius-box--md"
                        style={{ borderRadius: preset.borderRadius.md }}
                      />
                      <div
                        className="dr-preset-card__radius-box dr-preset-card__radius-box--lg"
                        style={{ borderRadius: preset.borderRadius.lg }}
                      />
                      <div
                        className="dr-preset-card__radius-box dr-preset-card__radius-box--xl"
                        style={{ borderRadius: preset.borderRadius.xl }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="dr-footer">
          <GlossyButton
            variant="primary"
            size="md"
            disabled={!selectedPresetId}
            onClick={handleApplyPreset}
            icon={<ArrowRight size={14} />}
            iconPosition="right"
          >
            Apply Preset
          </GlossyButton>
        </div>
      </div>
    </div>
  );
};
