'use client';

import { forwardRef, type InputHTMLAttributes, type CSSProperties, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { inputSizes, inputVariants, borderRadius, motion, glowEffects } from '@/lib/design-tokens';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'md' | 'lg';
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = 'md', error = false, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Check for dark mode
    useEffect(() => {
      const checkDarkMode = () => {
        setIsDark(document.documentElement.classList.contains('dark'));
      };
      checkDarkMode();

      // Watch for dark mode changes
      const observer = new MutationObserver(checkDarkMode);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      return () => observer.disconnect();
    }, []);

    const mode = isDark ? 'dark' : 'light';
    const variant = error ? 'error' : 'default';
    const sizeValues = inputSizes[inputSize];
    const variantColors = inputVariants[variant][mode];

    // Build dynamic styles
    const dynamicStyles: CSSProperties = {
      height: sizeValues.height,
      paddingLeft: sizeValues.paddingX,
      paddingRight: sizeValues.paddingX,
      fontSize: sizeValues.fontSize,
      backgroundColor: variantColors.background,
      color: variantColors.text,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isFocused ? variantColors.borderFocus : variantColors.border,
      borderRadius: borderRadius.lg,
      transition: motion.transition.colors,
      boxShadow: isFocused ? (error ? glowEffects.focusError : glowEffects.focusPrimary) : 'none',
      ...style,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <input
        type={type}
        className={cn(
          'flex w-full',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={dynamicStyles}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
