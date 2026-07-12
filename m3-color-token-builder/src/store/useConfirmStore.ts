import { create } from 'zustand';
import type { LucideIcon } from 'lucide-react';

export type ConfirmVariant = 'info' | 'success' | 'warning' | 'error';

export interface ConfirmOptions {
  /** Dialog title shown in uppercase */
  title: string;
  /** Description paragraph */
  message: string;
  /** Label for the confirm action button (default: "Confirm") */
  confirmLabel?: string;
  /** Label for the dismiss action button (default: "Cancel") */
  dismissLabel?: string;
  /** Visual variant that drives the icon colour (default: "info") */
  variant?: ConfirmVariant;
  /** Lucide icon component to render in the icon bubble */
  icon?: LucideIcon;
  /** When true, only a single "OK" button is shown — use for pure alerts */
  alertOnly?: boolean;
}

interface ConfirmState {
  options: ConfirmOptions | null;
  resolve: ((confirmed: boolean) => void) | null;
  /** Programmatically open the dialog. Returns a promise that resolves with true/false. */
  open: (options: ConfirmOptions) => Promise<boolean>;
  _resolve: (confirmed: boolean) => void;
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  options: null,
  resolve: null,

  open: (options) => {
    return new Promise<boolean>((res) => {
      set({ options, resolve: res });
    });
  },

  _resolve: (confirmed) => {
    get().resolve?.(confirmed);
    set({ options: null, resolve: null });
  },
}));

/**
 * Imperative helper — show an alert/confirm dialog from anywhere.
 * Returns a promise that resolves to `true` (confirm) or `false` (dismiss).
 *
 * @example
 * const ok = await showConfirm({ title: 'Delete', message: 'Are you sure?' });
 * if (ok) deleteItem();
 */
export function showConfirm(options: ConfirmOptions): Promise<boolean> {
  return useConfirmStore.getState().open(options);
}

/**
 * Convenience wrapper — shows a single-button info alert.
 */
export function showAlert(title: string, message: string, variant: ConfirmVariant = 'info', confirmLabel = 'OK'): Promise<boolean> {
  return useConfirmStore.getState().open({ title, message, variant, alertOnly: true, confirmLabel });
}
