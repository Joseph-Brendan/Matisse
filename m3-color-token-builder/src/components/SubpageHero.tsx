import React from 'react';
import { DockedHeader } from './DockedHeader';
import { Badge } from '../design-system/components/Badge/Badge';
import './SubpageHero.css';

interface SubpageHeroProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  scrollY: number;
  centered?: boolean;
  children?: React.ReactNode;
}

export const SubpageHero: React.FC<SubpageHeroProps> = ({
  badgeText,
  title,
  subtitle,
  scrollY,
  centered = false,
  children,
}) => {
  return (
    <section className={`subpage-hero-container ${centered ? 'centered' : ''}`}>
      <DockedHeader scrollY={scrollY} />

      {/* Frosted glass overlay on top of the bg image for text contrast */}
      <div className="subpage-hero-overlay"></div>

      <div className="subpage-hero-content">
        {children ? (
          children
        ) : (
          <div className="subpage-hero-inner">
            {badgeText && (
              <Badge variant="primary" size="md">
                {badgeText}
              </Badge>
            )}
            {title && <h1 className="subpage-hero-title">{title}</h1>}
            {subtitle && <p className="subpage-hero-subtitle">{subtitle}</p>}
          </div>
        )}
      </div>
    </section>
  );
};
