'use client';

import { cn } from '@/lib/utils';
import { cardVariants, borderRadius, spacing, typography } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';
import type { HTMLAttributes, CSSProperties } from 'react';

export function Card({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  const mode = useThemeMode();
  const colors = cardVariants.default[mode];

  const cardStyles: CSSProperties = {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: borderRadius.xl,
    boxShadow: colors.shadow,
    ...style,
  };

  return (
    <div
      className={cn('transition-shadow', className)}
      style={cardStyles}
      {...props}
    />
  );
}

export function CardHeader({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  const headerStyles: CSSProperties = {
    padding: spacing[6],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1.5],
    ...style,
  };

  return (
    <div
      className={className}
      style={headerStyles}
      {...props}
    />
  );
}

export function CardTitle({ className, style, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const mode = useThemeMode();
  const colors = cardVariants.default[mode];

  const titleStyles: CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.none,
    letterSpacing: typography.letterSpacing.tight,
    color: colors.text,
    ...style,
  };

  return (
    <h3
      className={className}
      style={titleStyles}
      {...props}
    />
  );
}

export function CardDescription({ className, style, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const mode = useThemeMode();

  const descStyles: CSSProperties = {
    fontSize: typography.fontSize.sm,
    color: mode === 'dark' ? '#94a3b8' : '#6b7280',
    ...style,
  };

  return (
    <p
      className={className}
      style={descStyles}
      {...props}
    />
  );
}

export function CardContent({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  const contentStyles: CSSProperties = {
    padding: spacing[6],
    paddingTop: '0',
    ...style,
  };

  return (
    <div
      className={className}
      style={contentStyles}
      {...props}
    />
  );
}

export function CardFooter({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  const footerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: spacing[6],
    paddingTop: '0',
    ...style,
  };

  return (
    <div
      className={className}
      style={footerStyles}
      {...props}
    />
  );
}
