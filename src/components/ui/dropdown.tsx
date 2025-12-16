'use client';

import { useState, useRef, useEffect, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { dropdownVariants, borderRadius, typography, zIndex, motion } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  className?: string;
  usePortal?: boolean;
}

export function Dropdown({ trigger, children, align = 'left', className, usePortal = true }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const mode = useThemeMode();
  const colors = dropdownVariants.default[mode];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current && usePortal) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: align === 'right' ? rect.right + window.scrollX - 160 : rect.left + window.scrollX,
      });
    }
  }, [isOpen, align, usePortal]);

  const dropdownStyles: CSSProperties = {
    minWidth: '160px',
    borderRadius: borderRadius.lg,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: '0.25rem 0',
    boxShadow: colors.shadow,
    ...(usePortal
      ? { position: 'fixed', zIndex: zIndex.dropdown_portal, top: position.top, left: position.left }
      : { position: 'absolute', zIndex: zIndex.dropdown, marginTop: '0.25rem', ...(align === 'right' ? { right: 0 } : { left: 0 }) }
    ),
  };

  const dropdownContent = (
    <div
      ref={dropdownRef}
      className={className}
      style={dropdownStyles}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );

  return (
    <div className="relative" ref={triggerRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        usePortal && typeof document !== 'undefined'
          ? createPortal(dropdownContent, document.body)
          : dropdownContent
      )}
    </div>
  );
}

interface DropdownItemProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'destructive';
}

export function DropdownItem({ onClick, children, className, variant = 'default' }: DropdownItemProps) {
  const mode = useThemeMode();
  const colors = dropdownVariants.default[mode];

  const itemStyles: CSSProperties = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    fontSize: typography.fontSize.sm,
    transition: motion.transition.colors,
    color: variant === 'destructive' ? colors.dangerText : colors.itemText,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = variant === 'destructive' ? colors.dangerHover : colors.itemHover;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={itemStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  const mode = useThemeMode();
  const colors = dropdownVariants.default[mode];

  const separatorStyles: CSSProperties = {
    margin: '0.25rem 0',
    height: '1px',
    backgroundColor: colors.separator,
  };

  return <div style={separatorStyles} />;
}
