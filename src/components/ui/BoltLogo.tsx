'use client';

import { cn } from '@/lib/utils';

interface BoltLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

export function BoltLogo({ className, size = 'md', iconOnly = false }: BoltLogoProps) {
  const sizes = {
    sm: { width: 80, height: 32, iconSize: 24 },
    md: { width: 100, height: 40, iconSize: 32 },
    lg: { width: 120, height: 48, iconSize: 40 },
  };

  const { width, height, iconSize } = sizes[size];

  if (iconOnly) {
    // Just the "o" icon with notch
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="20" cy="20" r="18" fill="#231E51" />
        <circle cx="20" cy="20" r="9" fill="white" />
        <path d="M26 20 L40 20 L40 40 L26 40 Z" fill="white" />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* "b" */}
      <path
        d="M0 0h6v16.5c1.5-2 4-3.5 7.5-3.5 6 0 10.5 5 10.5 13.5S19.5 40 13.5 40C10 40 7.5 38.5 6 36.5V40H0V0zM12 35c4 0 6.5-3 6.5-8.5S16 18 12 18c-4 0-6.5 3-6.5 8.5S8 35 12 35z"
        fill="#231E51"
      />
      {/* "o" with notch */}
      <circle cx="38" cy="26.5" r="13.5" fill="#231E51" />
      <circle cx="38" cy="26.5" r="7" fill="white" />
      <rect x="44" y="26.5" width="14" height="14" fill="white" />
      {/* "l" */}
      <path d="M56 0h6v40h-6V0z" fill="#231E51" />
      {/* "t" */}
      <path
        d="M68 8h6v6h8v5h-8v12c0 2.5 1 4 3.5 4 1.5 0 3-.5 4.5-1v5c-1.5.5-3.5 1-6 1-5.5 0-8-3-8-9V19h-5v-5h5V8z"
        fill="#231E51"
      />
    </svg>
  );
}
