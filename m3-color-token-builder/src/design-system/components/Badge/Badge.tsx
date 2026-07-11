import React from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info' | 'neutral';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  primary: { bg: 'color-mix(in srgb, var(--md-ref-role-primaryContainer) 80%, transparent)', text: 'var(--md-ref-role-onPrimaryContainer)', border: 'color-mix(in srgb, var(--md-ref-role-primary) 30%, transparent)' },
  secondary: { bg: 'color-mix(in srgb, var(--md-ref-role-secondaryContainer) 80%, transparent)', text: 'var(--md-ref-role-onSecondaryContainer)', border: 'color-mix(in srgb, var(--md-ref-role-secondary) 30%, transparent)' },
  tertiary: { bg: 'color-mix(in srgb, var(--md-ref-role-tertiaryContainer) 80%, transparent)', text: 'var(--md-ref-role-onTertiaryContainer)', border: 'color-mix(in srgb, var(--md-ref-role-tertiary) 30%, transparent)' },
  error: { bg: 'color-mix(in srgb, var(--md-ref-role-errorContainer) 80%, transparent)', text: 'var(--md-ref-role-onErrorContainer)', border: 'color-mix(in srgb, var(--md-ref-role-error) 30%, transparent)' },
  success: { bg: 'hsla(145, 70%, 80%, 0.6)', text: 'hsl(145, 80%, 18%)', border: 'hsla(145, 70%, 70%, 0.4)' },
  warning: { bg: 'hsla(40, 100%, 80%, 0.6)', text: 'hsl(35, 90%, 20%)', border: 'hsla(40, 100%, 70%, 0.4)' },
  info: { bg: 'hsla(259, 100%, 85%, 0.6)', text: 'hsl(258, 57%, 22%)', border: 'hsla(259, 100%, 75%, 0.4)' },
  neutral: { bg: 'color-mix(in srgb, var(--md-ref-role-surfaceContainerHigh) 80%, transparent)', text: 'var(--md-ref-role-onSurfaceVariant)', border: 'color-mix(in srgb, var(--md-ref-role-outline) 30%, transparent)' },
};

const sizeMap: Record<BadgeSize, React.CSSProperties> = {
  xs: { padding: '0.0625rem 0.375rem', fontSize: '0.625rem', gap: '0.1875rem' },
  sm: { padding: '0.125rem 0.5rem', fontSize: '0.6875rem', gap: '0.25rem' },
  md: { padding: '0.1875rem 0.625rem', fontSize: '0.75rem', gap: '0.3125rem' },
  lg: { padding: '0.25rem 0.75rem', fontSize: '0.8125rem', gap: '0.375rem' },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'sm',
  children,
  className,
  dot = false,
  removable = false,
  onRemove,
}) => {
  const colors = variantColors[variant];

  return (
    <span
      className={cn('badge', `badge--${variant}`, `badge--${size}`, className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: '9999px',
        fontWeight: 600,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        ...sizeMap[size],
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: colors.text,
            flexShrink: 0,
          }}
        />
      )}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          aria-label="Remove"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginLeft: '0.125rem',
            color: colors.text,
            opacity: 0.6,
            display: 'inline-flex',
            fontSize: 'inherit',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      )}
    </span>
  );
};
