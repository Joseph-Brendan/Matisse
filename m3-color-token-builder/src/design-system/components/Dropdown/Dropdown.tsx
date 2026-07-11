import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  header?: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  header,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClose);
    return () => document.removeEventListener('mousedown', handleClose);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={wrapperRef}
      className={cn('design-system-dropdown-wrapper', className)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className="design-system-dropdown-menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: align === 'left' ? 0 : 'auto',
            right: align === 'right' ? 0 : 'auto',
            backgroundColor: 'var(--md-ref-role-surfaceContainer, #ffffff)',
            border: '1px solid var(--md-ref-role-outlineVariant, rgba(0, 0, 0, 0.12))',
            borderRadius: '0.875rem',
            padding: '0.5rem',
            minWidth: '200px',
            zIndex: 1000,
            boxShadow: 'var(--matisse-shadow-lg, 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1))',
            animation: 'fadeIn 0.12s ease-out',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {header && (
            <div
              style={{
                padding: '0.625rem 0.875rem',
                borderBottom: '1px solid var(--md-ref-role-outlineVariant, rgba(0, 0, 0, 0.08))',
                marginBottom: '0.375rem',
              }}
            >
              {header}
            </div>
          )}

          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                width: '100%',
                padding: '0.6rem 0.875rem',
                background: 'none',
                border: 'none',
                borderRadius: '0.5rem',
                color: item.danger
                  ? 'var(--md-ref-role-error, #ba1a1a)'
                  : 'var(--md-ref-role-onSurfaceVariant, #49454f)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                transition: 'all 0.12s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = item.danger
                  ? 'var(--md-ref-role-errorContainer, #ffdad6)'
                  : 'var(--md-ref-role-surfaceVariant, #e7e0ec)';
                if (item.danger) {
                  e.currentTarget.style.color = 'var(--md-ref-role-onErrorContainer, #410002)';
                } else {
                  e.currentTarget.style.color = 'var(--md-ref-role-onSurface, #1d1b20)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = item.danger
                  ? 'var(--md-ref-role-error, #ba1a1a)'
                  : 'var(--md-ref-role-onSurfaceVariant, #49454f)';
              }}
            >
              {item.icon && <span style={{ display: 'flex', flexShrink: 0 }}>{item.icon}</span>}
              <span style={{ flex: 1 }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
