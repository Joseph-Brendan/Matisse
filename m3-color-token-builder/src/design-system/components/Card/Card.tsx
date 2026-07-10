import React from 'react';
import { cn } from '../../utils/cn';

type CardVariant = 'elevated' | 'filled' | 'outlined';

export interface CardProps {
  variant?: CardVariant;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  hoverable?: boolean;
}

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  elevated: {
    background: 'var(--md-ref-role-surface, hsl(300, 100%, 99%))',
    border: 'none',
    boxShadow: '0 4px 12px hsla(0, 0%, 0%, 0.06), 0 1px 3px hsla(0, 0%, 0%, 0.04)',
  },
  filled: {
    background: 'var(--md-ref-role-surfaceContainerHighest, hsl(290, 11%, 89%))',
    border: 'none',
    boxShadow: 'none',
  },
  outlined: {
    background: 'var(--md-ref-role-surface, hsl(300, 100%, 99%))',
    border: '1px solid var(--md-ref-role-outlineVariant, hsl(273, 8%, 79%))',
    boxShadow: 'none',
  },
};

const paddingStyles: Record<string, React.CSSProperties> = {
  none: { padding: 0 },
  sm: { padding: '0.75rem' },
  md: { padding: '1.25rem' },
  lg: { padding: '1.75rem' },
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  children,
  className,
  onClick,
  style,
  hoverable = false,
}) => {
  return (
    <div
      className={cn('card', `card--${variant}`, hoverable && 'card--hoverable', className)}
      onClick={onClick}
      style={{
        borderRadius: '0.75rem',
        transition: 'all 0.2s ease',
        cursor: onClick ? 'pointer' : undefined,
        ...variantStyles[variant],
        ...paddingStyles[padding],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className }) => (
  <div
    className={cn('card-header', className)}
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '1rem',
      marginBottom: '1rem',
    }}
  >
    <div>
      <h3 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 600 }}>{title}</h3>
      {subtitle && (
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--md-ref-role-onSurfaceVariant)', opacity: 0.8 }}>
          {subtitle}
        </p>
      )}
    </div>
    {action && <div style={{ flexShrink: 0 }}>{action}</div>}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('card-content', className)}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={cn('card-footer', className)}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      marginTop: '1.25rem',
      paddingTop: '1rem',
      borderTop: '1px solid var(--md-ref-role-outlineVariant, hsl(273, 8%, 79%))',
    }}
  >
    {children}
  </div>
);
