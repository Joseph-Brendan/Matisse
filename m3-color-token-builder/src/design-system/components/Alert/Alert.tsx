import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  autoClose?: number;
  className?: string;
  icon?: React.ReactNode;
}

const variantConfig: Record<AlertVariant, {
  bg: string;
  border: string;
  text: string;
  iconColor: string;
  defaultIcon: React.ReactNode;
}> = {
  info: {
    bg: 'var(--md-ref-role-primaryContainer)',
    border: 'var(--md-ref-role-primary)',
    text: 'var(--md-ref-role-onPrimaryContainer)',
    iconColor: 'var(--md-ref-role-primary)',
    defaultIcon: <Info size={20} />,
  },
  success: {
    bg: 'var(--md-ref-role-secondaryContainer)',
    border: 'var(--md-ref-role-secondary)',
    text: 'var(--md-ref-role-onSecondaryContainer)',
    iconColor: 'var(--md-ref-role-secondary)',
    defaultIcon: <CheckCircle2 size={20} />,
  },
  warning: {
    bg: 'var(--md-ref-role-tertiaryContainer)',
    border: 'var(--md-ref-role-tertiary)',
    text: 'var(--md-ref-role-onTertiaryContainer)',
    iconColor: 'var(--md-ref-role-tertiary)',
    defaultIcon: <AlertTriangle size={20} />,
  },
  error: {
    bg: 'var(--md-ref-role-errorContainer)',
    border: 'var(--md-ref-role-error)',
    text: 'var(--md-ref-role-onErrorContainer)',
    iconColor: 'var(--md-ref-role-error)',
    defaultIcon: <AlertCircle size={20} />,
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  autoClose,
  className,
  icon,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoClose || autoClose <= 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, autoClose);
    return () => clearTimeout(timer);
  }, [autoClose, onDismiss]);

  if (!visible) return null;

  const config = variantConfig[variant];

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      className={cn('alert', `alert--${variant}`, className)}
      role="alert"
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '1rem',
        borderRadius: '0.75rem',
        background: config.bg,
        border: `1px solid ${config.border}`,
        color: config.text,
        animation: 'alertSlideIn 0.3s ease',
        position: 'relative',
      }}
    >
      <div style={{ flexShrink: 0, color: config.iconColor, marginTop: '0.125rem' }}>
        {icon || config.defaultIcon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
            {title}
          </p>
        )}
        <div style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.5, opacity: 0.9 }}>
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: config.text,
            opacity: 0.5,
            padding: '0.25rem',
            flexShrink: 0,
            alignSelf: 'flex-start',
            borderRadius: '0.25rem',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};
