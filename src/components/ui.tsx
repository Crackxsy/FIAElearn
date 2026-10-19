import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "primary" | "accent" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ink-fg hover:opacity-85",
  accent: "bg-accent text-white hover:brightness-110",
  secondary: "bg-fill text-fg hover:bg-fill-strong",
  ghost: "text-fg hover:bg-fill",
  danger: "bg-danger-soft text-danger hover:brightness-95",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3.5 text-[13px] gap-1.5",
  md: "h-10 px-5 text-[15px] gap-2",
  lg: "h-12 px-6 text-[16px] gap-2",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cx(
    "inline-flex select-none items-center justify-center rounded-full font-medium whitespace-nowrap transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size],
    extra,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("card", className)} {...props} />;
}

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";
const tones: Record<Tone, string> = {
  neutral: "bg-fill text-fg-2",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[12px] font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, tone = "accent", className }: { value: number; tone?: "accent" | "success" | "warning" | "danger" | "ink"; className?: string }) {
  const color = { accent: "bg-accent", success: "bg-success", warning: "bg-warning", danger: "bg-danger", ink: "bg-ink" }[tone];
  return (
    <div className={cx("h-1.5 w-full overflow-hidden rounded-full bg-fill-strong", className)} role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cx("h-full rounded-full transition-[width] duration-700", color)} style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

/** Kreisförmiger Fortschritt (Apple-Fitness-Stil). */
export function Ring({
  value,
  size = 64,
  stroke = 7,
  tone = "accent",
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: "accent" | "success" | "warning" | "danger" | "ink";
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  const color = { accent: "var(--accent)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)", ink: "var(--ink)" }[tone];
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--fill-strong)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.2,0.8,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h1 className="title-xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-fg-2">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="title-md">{children}</h2>
      {action}
    </div>
  );
}

export function EmptyState({ icon, title, children }: { icon?: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      {icon && <div className="mb-3 text-fg-3">{icon}</div>}
      <p className="title-md">{title}</p>
      {children && <div className="mt-2 max-w-md text-[15px] text-fg-2">{children}</div>}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div>
      <p className="text-[13px] text-fg-2">{label}</p>
      <p className="mt-0.5 font-[family-name:var(--font-display)] text-[28px] leading-none font-semibold tracking-[-0.02em]">{value}</p>
      {hint && <p className="mt-1 text-[12px] text-fg-3">{hint}</p>}
    </div>
  );
}

export function Label({ children, hint }: { children: ReactNode; hint?: ReactNode }) {
  return (
    <span className="mb-1.5 flex items-baseline justify-between text-[14px] font-medium">
      {children}
      {hint && <span className="text-[12px] font-normal text-fg-3">{hint}</span>}
    </span>
  );
}
