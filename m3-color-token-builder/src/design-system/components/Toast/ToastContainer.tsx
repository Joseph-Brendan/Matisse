import React from 'react';
import { useToastStore } from '../../../store/useToastStore';
import { ToastItem } from './Toast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'toastBackdropIn 0.2s ease',
        }}
        onClick={() => toasts.forEach((t) => removeToast(t.id))}
      />
      {/* Centered modal stack */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
          alignItems: 'center',
          width: '100%',
          maxWidth: '440px',
          padding: '0 1rem',
          boxSizing: 'border-box',
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={{ width: '100%' }}>
            <ToastItem toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>
    </>
  );
};
