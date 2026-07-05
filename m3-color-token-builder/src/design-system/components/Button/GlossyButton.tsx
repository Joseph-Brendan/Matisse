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
    background: 'linear-gradient(180deg, hsl(256, 40%, 58%) 0%, hsl(256, 34%, 48%) 40%, hsl(256, 38%, 42%) 100%)',
    color: 'hsl(0, 0%, 100%)',
    border: '1px solid hsla(256, 34%, 38%, 0.5)',
    boxShadow: '0 1px 2px hsla(256, 34%, 48%, 0.3), inset 0 1px 1px hsla(0, 0%, 100%, 0.25), inset 0 -1px 1px hsla(256, 34%, 28%, 0.2)',
  },
  secondary: {
    background: 'linear-gradient(180deg, hsl(262, 17%, 72%) 0%, hsl(259, 11%, 40%) 40%, hsl(260, 14%, 34%) 100%)',
    color: 'hsl(0, 0%, 100%)',
    border: '1px solid hsla(259, 11%, 30%, 0.5)',
    boxShadow: '0 1px 2px hsla(259, 11%, 40%, 0.3), inset 0 1px 1px hsla(0, 0%, 100%, 0.25), inset 0 -1px 1px hsla(259, 11%, 28%, 0.2)',
  },
  tertiary: {
    background: 'linear-gradient(180deg, hsl(343, 37%, 72%) 0%, hsl(341, 21%, 41%) 40%, hsl(341, 25%, 35%) 100%)',
    color: 'hsl(0, 0%, 100%)',
    border: '1px solid hsla(341, 21%, 31%, 0.5)',
    boxShadow: '0 1px 2px hsla(341, 21%, 41%, 0.3), inset 0 1px 1px hsla(0, 0%, 100%, 0.25), inset 0 -1px 1px hsla(341, 21%, 28%, 0.2)',
  },
  error: {
    background: 'linear-gradient(180deg, hsl(0, 63%, 62%) 0%, hsl(0, 54%, 41%) 40%, hsl(0, 55%, 35%) 100%)',
    color: 'hsl(0, 0%, 100%)',
    border: '1px solid hsla(0, 54%, 31%, 0.5)',
    boxShadow: '0 1px 2px hsla(0, 54%, 41%, 0.3), inset 0 1px 1px hsla(0, 0%, 100%, 0.25), inset 0 -1px 1px hsla(0, 54%, 28%, 0.2)',
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
    background: 'linear-gradient(180deg, hsla(0, 0%, 100%, 0.3) 0%, transparent 100%)',
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
      {children && <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>}
      {!loading && icon && iconPosition === 'right' && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
    </button>
  );
};
