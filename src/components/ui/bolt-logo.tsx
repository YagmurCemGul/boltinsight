import { cn } from '@/lib/utils';

interface BoltLogoProps {
  className?: string;
  color?: string;
}

export function BoltLogo({ className, color = '#262455' }: BoltLogoProps) {
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-full w-full', className)}
    >
      {/* Letter 'b' */}
      <path
        d="M0 0H12V80H0V0Z"
        fill={color}
      />
      <path
        d="M12 40C12 28.954 20.954 20 32 20H36C47.046 20 56 28.954 56 40V40C56 51.046 47.046 60 36 60H32C20.954 60 12 51.046 12 40V40Z"
        fill={color}
      />
      {/* Cutout in 'b' */}
      <circle cx="34" cy="40" r="8" fill="white" />

      {/* Letter 'o' */}
      <circle cx="88" cy="40" r="20" fill={color} />
      {/* Smile cutout in 'o' */}
      <path
        d="M73 48C73 48 80 56 88 56C96 56 103 48 103 48"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Letter 'l' */}
      <path
        d="M120 0H132V80H120V0Z"
        fill={color}
      />

      {/* Letter 't' */}
      <path
        d="M144 20H156V80H144V20Z"
        fill={color}
      />
      <path
        d="M136 20H164V32H136V20Z"
        fill={color}
      />
    </svg>
  );
}

// Square icon version for use in small spaces (like login page icon)
export function BoltLogoIcon({ className, color = 'white' }: BoltLogoProps) {
  return (
    <svg
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-full w-full', className)}
    >
      {/* Letter 'b' */}
      <path
        d="M0 0H12V80H0V0Z"
        fill={color}
      />
      <path
        d="M12 40C12 28.954 20.954 20 32 20H36C47.046 20 56 28.954 56 40V40C56 51.046 47.046 60 36 60H32C20.954 60 12 51.046 12 40V40Z"
        fill={color}
      />
      {/* Cutout in 'b' - using opposite color for visibility */}
      <circle cx="34" cy="40" r="8" fill={color === 'white' ? '#5B50BD' : 'white'} />

      {/* Letter 'o' */}
      <circle cx="88" cy="40" r="20" fill={color} />
      {/* Smile cutout in 'o' */}
      <path
        d="M73 48C73 48 80 56 88 56C96 56 103 48 103 48"
        stroke={color === 'white' ? '#5B50BD' : 'white'}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Letter 'l' */}
      <path
        d="M120 0H132V80H120V0Z"
        fill={color}
      />

      {/* Letter 't' */}
      <path
        d="M144 20H156V80H144V20Z"
        fill={color}
      />
      <path
        d="M136 20H164V32H136V20Z"
        fill={color}
      />
    </svg>
  );
}
