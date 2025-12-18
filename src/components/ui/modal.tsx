'use client';

import { useEffect, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { modalVariants, borderRadius, spacing, typography, zIndex } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: '24rem',   // max-w-sm
  md: '28rem',   // max-w-md
  lg: '32rem',   // max-w-lg
  xl: '42rem',   // max-w-2xl
};

export function Modal({ isOpen, onClose, title, children, className, size = 'md' }: ModalProps) {
  const mode = useThemeMode();
  const colors = modalVariants.default[mode];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyles: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: colors.overlay,
    transition: 'opacity 0.2s',
  };

  const modalStyles: CSSProperties = {
    position: 'relative',
    zIndex: zIndex.modal,
    width: '100%',
    maxWidth: sizeMap[size],
    margin: '0 1rem',
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    boxShadow: colors.shadow,
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.border}`,
    padding: `${spacing[4]} ${spacing[6]}`,
  };

  const titleStyles: CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.titleText,
  };

  const contentStyles: CSSProperties = {
    padding: spacing[6],
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: zIndex.modal }}
    >
      <div
        style={overlayStyles}
        onClick={onClose}
      />
      <div
        className={cn(className)}
        style={modalStyles}
      >
        {title && (
          <div style={headerStyles}>
            <h2 style={titleStyles}>{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div style={contentStyles}>{children}</div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
