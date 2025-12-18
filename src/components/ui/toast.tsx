'use client';

import { useState, type CSSProperties } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { create } from 'zustand';
import { toastVariants, borderRadius, typography, zIndex, motion } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    // Auto remove after duration
    const duration = toast.duration || 4000;
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

// Helper function to show toast
export const toast = {
  success: (title: string, message?: string) => {
    useToastStore.getState().addToast({ type: 'success', title, message });
  },
  error: (title: string, message?: string) => {
    useToastStore.getState().addToast({ type: 'error', title, message, duration: 6000 });
  },
  warning: (title: string, message?: string) => {
    useToastStore.getState().addToast({ type: 'warning', title, message });
  },
  info: (title: string, message?: string) => {
    useToastStore.getState().addToast({ type: 'info', title, message });
  },
};

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const mode = useThemeMode();
  const colors = toastVariants[toast.type][mode];
  const Icon = icons[toast.type];

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 200);
  };

  const toastStyles: CSSProperties = {
    display: 'flex',
    width: '100%',
    maxWidth: '24rem',
    alignItems: 'flex-start',
    gap: '0.75rem',
    borderRadius: borderRadius.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: '1rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    transition: motion.transition.all,
    transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
    opacity: isExiting ? 0 : 1,
    pointerEvents: 'auto' as const,
  };

  const titleStyles: CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.titleColor,
  };

  const messageStyles: CSSProperties = {
    marginTop: '0.25rem',
    fontSize: typography.fontSize.xs,
    color: colors.messageColor,
    opacity: 0.8,
  };

  return (
    <div style={toastStyles}>
      <Icon
        style={{
          width: '1.25rem',
          height: '1.25rem',
          flexShrink: 0,
          color: colors.iconColor,
        }}
      />
      <div style={{ flex: 1 }}>
        <p style={titleStyles}>{toast.title}</p>
        {toast.message && <p style={messageStyles}>{toast.message}</p>}
      </div>
      <button
        onClick={handleClose}
        style={{
          flexShrink: 0,
          padding: '0.25rem',
          borderRadius: borderRadius.default,
          opacity: 0.6,
          color: colors.titleColor,
        }}
        className="hover:opacity-100 transition-opacity"
      >
        <X style={{ width: '1rem', height: '1rem' }} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  const containerStyles: CSSProperties = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    zIndex: zIndex.toast,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyles}>
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}
