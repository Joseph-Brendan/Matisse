import React from 'react';
import { useToastStore } from '../../../store/useToastStore';
import { ToastItem } from './Toast';
import './Toast.css';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <>
      <div
        className="toast-backdrop"
        onClick={() => toasts.forEach((t) => removeToast(t.id))}
      />
      <div className="toast-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-stack__item">
            <ToastItem toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>
    </>
  );
};
