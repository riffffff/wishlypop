import Image from 'next/image';

interface WishlyPopLogoProps {
  compact?: boolean;
  className?: string;
}

export function WishlyPopLogo({ compact = false, className = '' }: WishlyPopLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/icon.svg"
        alt="WishlyPop"
        width={compact ? 30 : 36}
        height={compact ? 30 : 36}
        className="shrink-0"
      />
      <span className={`${compact ? 'text-base' : 'text-xl'} font-extrabold tracking-tight text-slate-900`}>
        WishlyPop<span className="text-amber-500">.</span>
      </span>
    </span>
  );
}
