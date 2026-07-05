import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const variantStyles: Record<ToastVariant, { bg: string; icon: React.ReactNode; accent: string }> = {
  info: {
    bg: 'hsl(259, 100%, 97%)',
    accent: 'hsl(256, 34%, 48%)',
    icon: <Info size={20} />,
  },
  success: {
    bg: 'hsl(145, 80%, 95%)',
    accent: 'hsl(145, 60%, 38%)',
    icon: <CheckCircle2 size={20} />,
  },
  warning: {
    bg: 'hsl(40, 100%, 94%)',
    accent: 'hsl(38, 85%, 42%)',
    icon: <AlertTriangle size={20} />,
  },
  error: {
    bg: 'hsl(0, 100%, 95%)',
    accent: 'hsl(0, 54%, 41%)',
    icon: <AlertCircle size={20} />,
  },
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const config = variantStyles[toast.variant];

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={cn('toast-item', `toast--${toast.variant}`)}
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '0.875rem 1rem',
        borderRadius: '0.75rem',
        background: config.bg,
        border: '1px solid hsla(0, 0%, 80%, 0.5)',
        boxShadow: '0 8px 24px hsla(0, 0%, 0%, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'toastSlideIn 0.35s ease',
        minWidth: '300px',
        maxWidth: '420px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: config.accent,
          borderRadius: '0.75rem 0 0 0.75rem',
        }}
      />
      <div style={{ flexShrink: 0, color: config.accent, marginTop: '0.125rem' }}>
        {config.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0, paddingLeft: '0.25rem' }}>
        {toast.title && (
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.125rem', color: '#111827' }}>
            {toast.title}
          </p>
        )}
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#374151', lineHeight: 1.4 }}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9ca3af',
          padding: '0.125rem',
          flexShrink: 0,
          alignSelf: 'flex-start',
          borderRadius: '0.25rem',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#374151')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
      >
        <X size={16} />
      </button>
    </div>
  );
};
