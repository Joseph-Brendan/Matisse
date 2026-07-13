import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../design-system/components/Badge/Badge';
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import { useAuthStore } from '../store/useAuthStore';
import './CTASection.css';

interface CTASectionProps {
  badgeText: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  badgeText,
  title,
  subtitle,
  buttonText,
  buttonLink,
  className = '',
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleClick = () => {
    if (buttonLink) {
      navigate(buttonLink);
    } else {
      navigate(user ? '/dashboard' : '/auth');
    }
  };

  return (
    <section className={`cta-section ${className}`}>
      <div className="cta-inner-card">
        <svg className="cta-decor-left" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 180 A 110 110 0 0 1 170 40" stroke="url(#cta-left-grad)" strokeWidth="28" strokeLinecap="round" />
          <defs>
            <linearGradient id="cta-left-grad" x1="0%" y1="100%" x2="80%" y2="0%">
              <stop offset="0%" stopColor="var(--md-ref-role-primary)" />
              <stop offset="100%" stopColor="var(--md-ref-role-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

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
            {badgeText}
          </Badge>
          <h2 className="cta-title">{title}</h2>
          <p className="cta-subtitle">{subtitle}</p>
          <div className="cta-buttons-row">
            <GlossyButton variant="primary" size="lg" onClick={handleClick}>
              {buttonText}
            </GlossyButton>
          </div>
        </div>
      </div>
    </section>
  );
};
