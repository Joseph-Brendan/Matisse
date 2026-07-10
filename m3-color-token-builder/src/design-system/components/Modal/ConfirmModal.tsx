import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { useConfirmStore } from '../../../store/useConfirmStore';
import type { ConfirmVariant } from '../../../store/useConfirmStore';
import { Modal } from '../Modal/Modal';

/* ── Variant → icon + colour token mapping ── */
const variantConfig: Record<ConfirmVariant, {
  iconColor: string;
  containerBg: string;
  defaultIcon: React.ReactNode;
}> = {
  info: {
    iconColor: 'var(--md-ref-role-primary)',
    containerBg: 'var(--md-ref-role-primaryContainer)',
    defaultIcon: <Info size={20} />,
  },
  success: {
    iconColor: 'var(--md-ref-role-secondary)',
    containerBg: 'var(--md-ref-role-secondaryContainer)',
    defaultIcon: <CheckCircle2 size={20} />,
  },
  warning: {
    iconColor: 'var(--md-ref-role-tertiary)',
    containerBg: 'var(--md-ref-role-tertiaryContainer)',
    defaultIcon: <AlertTriangle size={20} />,
  },
  error: {
    iconColor: 'var(--md-ref-role-error)',
    containerBg: 'var(--md-ref-role-errorContainer)',
    defaultIcon: <AlertCircle size={20} />,
  },
};

export const ConfirmModal: React.FC = () => {
  const { options, _resolve } = useConfirmStore();

  if (!options) return null;

  const variant = options.variant ?? 'info';
  const config = variantConfig[variant];
  const IconComponent = options.icon;
  const iconNode = IconComponent ? <IconComponent size={20} /> : config.defaultIcon;

  const handleDismiss = () => _resolve(false);
  const handleConfirm = () => _resolve(true);

  return (
    <Modal
      isOpen
      onClose={handleDismiss}
      closeOnOverlay={false}
      showCloseButton={false}
      size="sm"
      footer={
        <div className="modal__alert-footer">
          {!options.alertOnly && (
            <button
              className="modal__alert-btn modal__alert-btn--dismiss"
              onClick={handleDismiss}
            >
              {options.dismissLabel ?? 'Cancel'}
            </button>
          )}
          <button
            className="modal__alert-btn modal__alert-btn--confirm"
            onClick={handleConfirm}
          >
            {options.confirmLabel ?? 'Confirm'}
          </button>
        </div>
      }
    >
      <div className="modal__alert-row">
        {/* Icon bubble */}
        <div
          className="modal__alert-icon"
          style={{
            backgroundColor: config.containerBg,
            color: config.iconColor,
          }}
        >
          {iconNode}
        </div>

        {/* Content */}
        <div className="modal__alert-content">
          <h3 className="modal__alert-title">{options.title.toUpperCase()}</h3>
          <p className="modal__alert-desc">{options.message}</p>
        </div>
      </div>
    </Modal>
  );
};
