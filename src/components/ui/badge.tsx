'use client';

import { cn } from '@/lib/utils';
import { statusColors, borderRadius } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';
import type { HTMLAttributes, CSSProperties } from 'react';

type StatusType = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'on_hold' | 'deleted';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'custom';
  status?: StatusType;
}

export function Badge({ className, variant = 'custom', status, style, ...props }: BadgeProps) {
  const mode = useThemeMode();

  // Build dynamic styles based on status or variant
  let dynamicStyles: CSSProperties = {
    borderRadius: borderRadius.full,
    ...style,
  };

  // If status is provided, use statusColors from design tokens
  if (status && statusColors[mode][status]) {
    const colors = statusColors[mode][status];
    dynamicStyles = {
      ...dynamicStyles,
      backgroundColor: colors.background,
      color: colors.text,
    };
  } else if (variant !== 'custom') {
    // Use variant-based colors
    const variantColors: Record<string, { light: { bg: string; text: string }; dark: { bg: string; text: string } }> = {
      default: {
        light: { bg: '#e5e7eb', text: '#374151' },
        dark: { bg: '#374151', text: '#e5e7eb' },
      },
      success: {
        light: { bg: '#d1fae5', text: '#065f46' },
        dark: { bg: 'rgba(5, 150, 105, 0.5)', text: '#6ee7b7' },
      },
      warning: {
        light: { bg: '#fef3c7', text: '#92400e' },
        dark: { bg: 'rgba(217, 119, 6, 0.5)', text: '#fcd34d' },
      },
      error: {
        light: { bg: '#fee2e2', text: '#991b1b' },
        dark: { bg: 'rgba(220, 38, 38, 0.5)', text: '#fca5a5' },
      },
      info: {
        light: { bg: '#EDE9F9', text: '#5B50BD' },
        dark: { bg: '#231E51', text: '#918AD3' },
      },
    };

    if (variantColors[variant]) {
      dynamicStyles = {
        ...dynamicStyles,
        backgroundColor: variantColors[variant][mode].bg,
        color: variantColors[variant][mode].text,
      };
    }
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium',
        className
      )}
      style={dynamicStyles}
      {...props}
    />
  );
}
