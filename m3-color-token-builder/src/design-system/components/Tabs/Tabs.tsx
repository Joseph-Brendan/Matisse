import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'segmented';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  underline: {
    container: {
      display: 'flex',
      borderBottom: '1px solid var(--md-ref-role-outlineVariant, hsl(273, 8%, 79%))',
      gap: 0,
    } as React.CSSProperties,
    tab: (active: boolean) =>
      ({
        position: 'relative',
        padding: '0.75rem 1.25rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 400,
        color: active
          ? 'var(--md-ref-role-primary, hsl(256, 34%, 48%))'
          : 'var(--md-ref-role-onSurfaceVariant, hsl(257, 5%, 29%))',
        transition: 'color 0.2s',
        whiteSpace: 'nowrap',
      } as React.CSSProperties),
    indicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'var(--md-ref-role-primary, hsl(256, 34%, 48%))',
      borderRadius: '3px 3px 0 0',
    } as React.CSSProperties,
  },
  pills: {
    container: {
      display: 'flex',
      gap: '0.375rem',
      padding: '0.25rem',
    } as React.CSSProperties,
    tab: (active: boolean) =>
      ({
        padding: '0.5rem 1rem',
        background: active ? 'var(--md-ref-role-primary, hsl(256, 34%, 48%))' : 'transparent',
        color: active
          ? 'var(--md-ref-role-onPrimary, hsl(0, 0%, 100%))'
          : 'var(--md-ref-role-onSurfaceVariant, hsl(257, 5%, 29%))',
        border: `1px solid ${active ? 'transparent' : 'var(--md-ref-role-outlineVariant, hsl(273, 8%, 79%))'}`,
        borderRadius: '9999px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 400,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      } as React.CSSProperties),
    indicator: null,
  },
  segmented: {
    container: {
      display: 'flex',
      background: 'var(--md-ref-role-surfaceContainerHighest, hsl(290, 11%, 89%))',
      borderRadius: '0.625rem',
      padding: '0.1875rem',
      gap: '0.125rem',
    } as React.CSSProperties,
    tab: (active: boolean) =>
      ({
        flex: 1,
        padding: '0.5rem 1rem',
        background: active ? 'var(--md-ref-role-surface, hsl(300, 100%, 99%))' : 'transparent',
        color: active
          ? 'var(--md-ref-role-onSurface, hsl(270, 7%, 11%))'
          : 'var(--md-ref-role-onSurfaceVariant, hsl(257, 5%, 29%))',
        border: active ? '1px solid var(--md-ref-role-outlineVariant)' : '1px solid transparent',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 400,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        boxShadow: active ? '0 1px 3px hsla(0, 0%, 0%, 0.08)' : 'none',
      } as React.CSSProperties),
    indicator: null,
  },
};

const sizeMap: Record<string, { tab: React.CSSProperties }> = {
  sm: { tab: { padding: '0.375rem 0.75rem', fontSize: '0.8125rem' } },
  md: { tab: {} },
  lg: { tab: { padding: '0.75rem 1.5rem', fontSize: '1rem' } },
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActive,
  onChange,
  variant = 'underline',
  size = 'md',
  className,
  children,
}) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id || '');
  const active = controlledActive ?? internalActive;

  const handleChange = (tabId: string) => {
    if (tabId === active) return;
    setInternalActive(tabId);
    onChange?.(tabId);
  };

  const config = variantStyles[variant];
  const sizeConfig = sizeMap[size];

  return (
    <div className={cn('tabs', `tabs--${variant}`, className)}>
      <div style={config.container}>
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          const tabStyle = {
            ...config.tab(isActive),
            ...sizeConfig.tab,
            opacity: tab.disabled ? 0.4 : 1,
            cursor: tab.disabled ? 'not-allowed' : 'pointer',
          };

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleChange(tab.id)}
              style={tabStyle}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', position: 'relative' }}>
                {tab.icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{tab.icon}</span>}
                {tab.label}
                {tab.badge !== undefined && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '1.125rem',
                      height: '1.125rem',
                      padding: '0 0.3125rem',
                      borderRadius: '9999px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      background: isActive
                        ? 'var(--md-ref-role-onPrimary, hsl(0, 0%, 100%))'
                        : 'var(--md-ref-role-surfaceContainerHighest, hsl(290, 11%, 89%))',
                      color: isActive
                        ? 'var(--md-ref-role-primary, hsl(256, 34%, 48%))'
                        : 'var(--md-ref-role-onSurfaceVariant, hsl(257, 5%, 29%))',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
              {isActive && config.indicator && <div style={config.indicator} />}
            </button>
          );
        })}
      </div>
      {children && (
        <div style={{ marginTop: '1rem' }}>
          {React.Children.toArray(children).find(
            (child) => React.isValidElement<{ tabId: string }>(child) && child.props.tabId === active
          )}
        </div>
      )}
    </div>
  );
};

interface TabPanelProps {
  tabId: string;
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => (
  <div role="tabpanel">{children}</div>
);
