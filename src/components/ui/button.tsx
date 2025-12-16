'use client';

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { buttonSizes, buttonVariants, borderRadius, motion } from '@/lib/design-tokens';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', style, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
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

    // Get variant colors (default and primary use the same)
    const variantKey = variant === 'default' ? 'primary' : variant;
    const variantColors = buttonVariants[variantKey as keyof typeof buttonVariants];
    const mode = isDark ? 'dark' : 'light';

    // Get size values
    const sizeKey = size === 'icon' ? 'md' : size;
    const sizeValues = buttonSizes[sizeKey as keyof typeof buttonSizes];

    // Build dynamic styles
    const dynamicStyles: CSSProperties = {
      height: size === 'icon' ? buttonSizes.md.height : sizeValues.height,
      paddingLeft: size === 'icon' ? '0' : sizeValues.paddingX,
      paddingRight: size === 'icon' ? '0' : sizeValues.paddingX,
      fontSize: sizeValues.fontSize,
      backgroundColor: isHovered
        ? variantColors?.[mode].hoverBackground
        : variantColors?.[mode].background,
      color: variantColors?.[mode].text,
      borderColor: variantColors?.[mode].border,
      borderWidth: variant === 'outline' ? '1px' : '0',
      borderStyle: variant === 'outline' ? 'solid' : 'none',
      borderRadius: borderRadius.lg,
      transition: motion.transition.colors,
      ...style,
    };

    // Icon size specific
    if (size === 'icon') {
      dynamicStyles.width = buttonSizes.md.height;
      dynamicStyles.padding = '0';
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#918AD3]',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        style={dynamicStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
