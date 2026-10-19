import { cx } from "./ui";

/** Logo-Marke: Code-Klammern + aufgeschlagenes Buch. Nutzt currentColor → funktioniert hell & dunkel. */
export function LogoMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 64 40" width={size * 1.6} height={size} className={className} aria-hidden>
      <defs>
        <linearGradient id="fl-page" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path d="M13 6 L4 15.5 Q2 20 4 24.5 L13 34" fill="none" stroke="currentColor" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M51 6 L60 15.5 Q62 20 60 24.5 L51 34" fill="none" stroke="currentColor" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.5 10.5 L30.2 15.2 Q31 15.6 31 16.6 L31 33 L21.4 28.4 Q19.5 27.4 19.5 25.4 Z" fill="url(#fl-page)" />
      <path d="M44.5 10.5 L33.8 15.2 Q33 15.6 33 16.6 L33 33 L42.6 28.4 Q44.5 27.4 44.5 25.4 Z" fill="currentColor" opacity="0.92" />
    </svg>
  );
}

export function Logo({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <span className={cx("inline-flex items-center gap-2 text-fg", className)}>
      <LogoMark size={size} />
      <span className="text-[19px] leading-none tracking-[-0.02em]" style={{ fontSize: size * 0.86 }}>
        <span className="font-extrabold">FIAE</span>
        <span className="font-light text-fg-2">learn</span>
      </span>
    </span>
  );
}
