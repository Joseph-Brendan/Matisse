import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import './Toast.css';

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

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  info:    <Info size={20} />,
  success: <CheckCircle2 size={20} />,
  warning: <AlertTriangle size={20} />,
  error:   <AlertCircle size={20} />,
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div className={cn('toast-item', `toast--${toast.variant}`)}>
      <div className="toast__accent" aria-hidden />
      <div className="toast__icon">
        {variantIcons[toast.variant]}
      </div>
      <div className="toast__content">
        {toast.title && (
          <p className="toast__title">{toast.title}</p>
        )}
        <p className="toast__message">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        className="toast__dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
};
