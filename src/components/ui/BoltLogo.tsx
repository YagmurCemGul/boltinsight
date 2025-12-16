'use client';

import { cn } from '@/lib/utils';

interface BoltLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

export function BoltLogo({ className, size = 'md', iconOnly = false }: BoltLogoProps) {
  const sizes = {
    sm: { width: 70, height: 28, iconSize: 28 },
    md: { width: 90, height: 36, iconSize: 36 },
    lg: { width: 110, height: 44, iconSize: 44 },
  };

  const { width, height, iconSize } = sizes[size];

  // Icon only - just the "o" with notch (for collapsed sidebar)
  if (iconOnly) {
    return (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('flex-shrink-0', className)}
      >
        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" className="fill-[#231E51] dark:fill-[#C8C4E9]" />
        {/* Inner circle (hole) */}
        <circle cx="50" cy="50" r="22" className="fill-white dark:fill-gray-900" />
        {/* Notch cutout */}
        <path d="M60 50 L100 50 L100 100 L60 100 Z" className="fill-white dark:fill-gray-900" />
      </svg>
    );
  }

  // Full "bolt" logo
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* "b" letter */}
      <path
        d="M0 5 L0 95 L16 95 L16 85 C20 92 28 97 40 97 C58 97 72 82 72 62 C72 42 58 27 40 27 C28 27 20 32 16 39 L16 5 L0 5 Z M37 82 C26 82 16 73 16 62 C16 51 26 42 37 42 C48 42 56 51 56 62 C56 73 48 82 37 82 Z"
        className="fill-[#231E51] dark:fill-[#C8C4E9]"
      />
      {/* "o" letter with notch */}
      <circle cx="115" cy="62" r="35" className="fill-[#231E51] dark:fill-[#C8C4E9]" />
      <circle cx="115" cy="62" r="17" className="fill-white dark:fill-gray-900" />
      <rect x="125" y="62" width="30" height="40" className="fill-white dark:fill-gray-900" />
      {/* "l" letter */}
      <rect x="160" y="5" width="16" height="90" className="fill-[#231E51] dark:fill-[#C8C4E9]" />
      {/* "t" letter */}
      <path
        d="M195 20 L195 30 L210 30 L210 75 C210 90 220 97 238 97 C248 97 256 95 262 92 L262 78 C257 81 250 83 243 83 C234 83 226 80 226 70 L226 45 L260 45 L260 30 L226 30 L226 20 L210 20 L195 20 Z"
        className="fill-[#231E51] dark:fill-[#C8C4E9]"
      />
    </svg>
  );
}
