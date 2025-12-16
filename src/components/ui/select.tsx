'use client';

import { forwardRef, useState, type SelectHTMLAttributes, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { selectVariants, borderRadius, typography, motion, glowEffects } from '@/lib/design-tokens';
import { useThemeMode } from '@/hooks';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, style, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const mode = useThemeMode();
    const colors = selectVariants.default[mode];

    const selectStyles: CSSProperties = {
      display: 'flex',
      height: '2.5rem',
      width: '100%',
      appearance: 'none',
      borderRadius: borderRadius.lg,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: isFocused ? colors.focusBorder : colors.border,
      backgroundColor: colors.background,
      color: colors.text,
      paddingLeft: '0.75rem',
      paddingRight: '2.5rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      fontSize: typography.fontSize.sm,
      transition: motion.transition.colors,
      boxShadow: isFocused ? glowEffects.focusPrimary : 'none',
      outline: 'none',
      ...style,
    };

    const iconStyles: CSSProperties = {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1rem',
      height: '1rem',
      color: colors.placeholder,
      pointerEvents: 'none',
    };

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn('disabled:cursor-not-allowed disabled:opacity-50', className)}
          style={selectStyles}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown style={iconStyles} />
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
