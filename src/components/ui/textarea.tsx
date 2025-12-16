'use client';

import { forwardRef, useState, type TextareaHTMLAttributes, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { textareaVariants, borderRadius, typography, motion, glowEffects } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const mode = useThemeMode();
    const colors = textareaVariants.default[mode];

    const textareaStyles: CSSProperties = {
      display: 'flex',
      minHeight: '80px',
      width: '100%',
      borderRadius: borderRadius.lg,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isFocused ? colors.focusBorder : colors.border,
      backgroundColor: colors.background,
      color: colors.text,
      padding: '0.5rem 0.75rem',
      fontSize: typography.fontSize.sm,
      transition: motion.transition.colors,
      boxShadow: isFocused ? glowEffects.focusPrimary : 'none',
      outline: 'none',
      resize: 'none',
      ...style,
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <textarea
        className={cn('disabled:cursor-not-allowed disabled:opacity-50', className)}
        style={textareaStyles}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
