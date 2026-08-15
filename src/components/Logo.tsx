export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cf-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#cf-grad)" />
      <path d="M22 8 L13 22 H19 L17 32 L27 17 H21 L22 8 Z" fill="white" />
    </svg>
  );
}

export function Logo({ iconClassName = "h-8 w-8", textClassName = "text-lg font-semibold text-neutral-900" }: { iconClassName?: string; textClassName?: string }) {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className={iconClassName} />
      <span className={textClassName}>ContentForge AI</span>
    </span>
  );
}
