import React from 'react';
import { cn } from '../../utils/cn';
import './GlossyButton.css';

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

export const GlossyButton: React.FC<GlossyButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'glossy-btn',
        `glossy-btn--${variant}`,
        `glossy-btn--${size}`,
        fullWidth && 'glossy-btn--full',
        (disabled || loading) && 'glossy-btn--disabled',
        loading && 'glossy-btn--loading',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {variant !== 'ghost' && variant !== 'outline' && (
        <div className="glossy-btn__shine" aria-hidden />
      )}
      {loading && (
        <span className={cn('glossy-btn__spinner', `glossy-btn__spinner--${size}`)} />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="glossy-btn__icon">{icon}</span>
      )}
      {children && (
        <span className="glossy-btn__label">{children}</span>
      )}
      {!loading && icon && iconPosition === 'right' && (
        <span className="glossy-btn__icon">{icon}</span>
      )}
    </button>
  );
};
