import React from 'react';
import { cn } from '../../utils/cn';

export type GlossyVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'ghost' | 'outline';
export type GlossySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GlossyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlossyVariant;
  size?: GlossySize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles: Record<GlossyVariant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.15) 100%), var(--md-ref-role-primary)',
    color: 'var(--md-ref-role-onPrimary)',
    border: '1px solid hsla(0, 0%, 0%, 0.15)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.35), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
  },
  secondary: {
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.15) 100%), var(--md-ref-role-secondary)',
    color: 'var(--md-ref-role-onSecondary)',
    border: '1px solid hsla(0, 0%, 0%, 0.15)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.35), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
  },
  tertiary: {
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.15) 100%), var(--md-ref-role-tertiary)',
    color: 'var(--md-ref-role-onTertiary)',
    border: '1px solid hsla(0, 0%, 0%, 0.15)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.35), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
  },
  error: {
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.15) 100%), var(--md-ref-role-error)',
    color: 'var(--md-ref-role-onError)',
    border: '1px solid hsla(0, 0%, 0%, 0.15)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.35), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--md-ref-role-primary)',
    border: '1px solid transparent',
    boxShadow: 'none',
  },
  outline: {
    background: 'transparent',
    color: 'var(--md-ref-role-primary)',
    border: '1px solid var(--md-ref-role-outline)',
    boxShadow: 'none',
  },
};

const sizeStyles: Record<GlossySize, React.CSSProperties> = {
  xs: { padding: '0.25rem 0.5rem', fontSize: '0.75rem', gap: '0.25rem', borderRadius: '0.375rem' },
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem', gap: '0.375rem', borderRadius: '0.5rem' },
  md: { padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.5rem', borderRadius: '0.5rem' },
  lg: { padding: '0.625rem 1.25rem', fontSize: '1rem', gap: '0.5rem', borderRadius: '0.625rem' },
  xl: { padding: '0.75rem 1.5rem', fontSize: '1.125rem', gap: '0.625rem', borderRadius: '0.75rem' },
};

export const GlossyButton: React.FC<GlossyButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  style,
  className,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontFamily: "'Open Sans', sans-serif",
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
    width: fullWidth ? '100%' : undefined,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  const shineStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 100%)',
    borderRadius: 'inherit',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    pointerEvents: 'none',
  };

  return (
    <button
      className={cn(
        'glossy-btn',
        `glossy-btn--${variant}`,
        `glossy-btn--${size}`,
        fullWidth && 'glossy-btn--full',
        className
      )}
      style={baseStyle}
      disabled={disabled || loading}
      {...props}
    >
      {variant !== 'ghost' && variant !== 'outline' && <div style={shineStyle} aria-hidden />}
      {loading && (
        <span
          style={{
            width: size === 'xs' ? '12px' : size === 'sm' ? '14px' : '16px',
            height: size === 'xs' ? '12px' : size === 'sm' ? '14px' : '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
            flexShrink: 0,
          }}
        />
      )}
      {!loading && icon && iconPosition === 'left' && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
      {children && (
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: sizeStyles[size].gap,
          }}
        >
          {children}
        </span>
      )}
      {!loading && icon && iconPosition === 'right' && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
    </button>
  );
};
