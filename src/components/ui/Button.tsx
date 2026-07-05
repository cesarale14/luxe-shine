import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "on-dark" | "text";
type Size = "standard" | "hero";

const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-medium transition-colors duration-ui ease-out-luxe disabled:opacity-40 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  standard: "h-11 px-7 text-[0.9375rem]",
  hero: "h-[52px] px-7 text-[1.0625rem]",
};

const variants: Record<Variant, string> = {
  // No gradients, no glow, no lift (design §6).
  primary: "bg-navy-900 text-white hover:bg-navy-600",
  secondary:
    "bg-transparent text-navy-900 border border-navy-900 hover:bg-navy-900/[0.04]",
  "on-dark":
    "bg-transparent text-ivory border border-white/70 hover:bg-white/[0.08]",
  text: "text-navy-700 underline underline-offset-[3px] decoration-1 hover:text-navy-600",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** When set, renders a Next.js Link. Otherwise a native <button>. */
  href?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

export function Button({
  variant = "primary",
  size = "standard",
  className = "",
  children,
  href,
  type = "button",
  target,
  rel,
  disabled,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variant === "text" ? "" : sizes[size]} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cls}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
