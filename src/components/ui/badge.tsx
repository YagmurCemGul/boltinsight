'use client';

import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'custom';
}

export function Badge({ className, variant = 'custom', ...props }: BadgeProps) {
  // If className contains bg- or text- classes, don't apply variant colors
  const hasCustomColors = className && (className.includes('bg-') || className.includes('text-'));
  const effectiveVariant = hasCustomColors ? 'custom' : variant;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': effectiveVariant === 'default',
          'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300': effectiveVariant === 'success',
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300': effectiveVariant === 'warning',
          'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300': effectiveVariant === 'error',
          'bg-[#EDE9F9] text-[#5B50BD] dark:bg-[#231E51] dark:text-[#918AD3]': effectiveVariant === 'info',
          // 'custom' variant applies no colors - uses className
        },
        className
      )}
      {...props}
    />
  );
}
