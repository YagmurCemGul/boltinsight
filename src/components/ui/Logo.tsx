interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 64 }: LogoProps) {
  const height = size * 0.42; // Maintain aspect ratio

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* b letter */}
      <path
        d="M0 0h16v100h-16zM16 50c0-22 18-40 40-40v16c-13.3 0-24 10.7-24 24s10.7 24 24 24v16c-22 0-40-18-40-40z"
        fill="#231E51"
      />

      {/* o letter with smile cutout */}
      <g>
        <circle cx="96" cy="60" r="40" fill="#231E51" />
        <path
          d="M96 80c-11 0-20-9-20-20h40c0 11-9 20-20 20z"
          fill="white"
        />
      </g>

      {/* l letter */}
      <path
        d="M152 0h16v100h-16z"
        fill="#231E51"
      />

      {/* t letter */}
      <path
        d="M184 20h16v80h-16zM176 20h40v16h-40z"
        fill="#231E51"
      />
    </svg>
  );
}
