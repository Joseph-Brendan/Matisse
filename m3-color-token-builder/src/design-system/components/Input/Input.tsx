import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

type InputVariant = 'outlined' | 'filled' | 'underlined';
type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  containerClassName?: string;
}

const variantBorder = {
  outlined: {
    default: '1px solid var(--md-ref-role-outline)',
    hover: '1px solid var(--md-ref-role-onSurface)',
    focus: '2px solid var(--md-ref-role-primary)',
    error: '2px solid var(--md-ref-role-error)',
  },
  filled: {
    default: '1px solid transparent',
    hover: '1px solid var(--md-ref-role-onSurface)',
    focus: '2px solid var(--md-ref-role-primary)',
    error: '2px solid var(--md-ref-role-error)',
  },
  underlined: {
    default: '0 0 1px 0 solid var(--md-ref-role-outline)',
    hover: '0 0 2px 0 solid var(--md-ref-role-onSurface)',
    focus: '0 0 2px 0 solid var(--md-ref-role-primary)',
    error: '0 0 2px 0 solid var(--md-ref-role-error)',
  },
};

const variantBg = {
  outlined: 'var(--md-ref-role-surface)',
  filled: 'var(--md-ref-role-surfaceContainerHighest)',
  underlined: 'transparent',
};

const sizePaddings: Record<InputSize, React.CSSProperties> = {
  sm: { padding: '0.5rem 0.75rem', fontSize: '0.8125rem' },
  md: { padding: '0.625rem 0.875rem', fontSize: '0.875rem' },
  lg: { padding: '0.75rem 1rem', fontSize: '1rem' },
};

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  variant = 'outlined',
  inputSize = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  containerClassName,
  className,
  type = 'text',
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const effectiveType = isPassword && showPassword ? 'text' : type;

  const getBorder = () => {
    if (error) return variantBorder[variant].error;
    if (isFocused) return variantBorder[variant].focus;
    if (isHovered) return variantBorder[variant].hover;
    return variantBorder[variant].default;
  };

  const borderStyle = variant === 'underlined'
    ? { border: 'none', borderBottom: getBorder(), borderRadius: 0 }
    : { border: getBorder(), borderRadius: variant === 'filled' ? '0.5rem 0.5rem 0 0' : '0.625rem' };

  const labelColor = error
    ? 'var(--md-ref-role-error)'
    : isFocused
      ? 'var(--md-ref-role-primary)'
      : 'var(--md-ref-role-onSurfaceVariant)';

  return (
    <div
      className={cn('input-container', containerClassName)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.375rem',
        width: fullWidth ? '100%' : undefined,
      }}
    >
      {label && (
        <label
          style={{
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: labelColor,
            transition: 'color 0.15s',
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: disabled ? 'hsla(0, 0%, 90%, 0.5)' : variantBg[variant],
          transition: 'all 0.2s ease',
          ...borderStyle,
          ...sizePaddings[inputSize],
          gap: '0.5rem',
          cursor: disabled ? 'not-allowed' : undefined,
          opacity: disabled ? 0.5 : 1,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {icon && iconPosition === 'left' && (
          <span style={{ display: 'flex', color: 'var(--md-ref-role-onSurfaceVariant)', flexShrink: 0 }}>
            {icon}
          </span>
        )}

        <input
          className={cn('input-field', className)}
          type={effectiveType}
          disabled={disabled}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: disabled ? 'hsla(0, 0%, 40%, 0.7)' : 'var(--md-ref-role-onSurface)',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            width: '100%',
            padding: 0,
            lineHeight: 1.5,
          }}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              color: 'var(--md-ref-role-onSurfaceVariant)',
              flexShrink: 0,
            }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {icon && iconPosition === 'right' && !isPassword && (
          <span style={{ display: 'flex', color: 'var(--md-ref-role-onSurfaceVariant)', flexShrink: 0 }}>
            {icon}
          </span>
        )}
      </div>

      {(error || helperText) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: error ? 'var(--md-ref-role-error)' : 'var(--md-ref-role-onSurfaceVariant)',
            opacity: error ? 1 : 0.7,
          }}
        >
          {error && <AlertCircle size={12} />}
          <span>{error || helperText}</span>
        </div>
      )}
    </div>
  );
};
