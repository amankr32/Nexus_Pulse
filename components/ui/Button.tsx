import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-(--color-accent) text-(--color-bg) hover:bg-(--color-accent-strong) shadow-glow",
  secondary:
    "bg-(--color-surface-2) text-(--color-ink) border border-(--color-border-strong) hover:border-(--color-accent)",
  ghost: "bg-transparent text-(--color-ink) hover:bg-(--color-surface-2)",
};

const sizeStyles: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const sharedClasses =
  "inline-flex items-center justify-center gap-2 rounded-(--radius-pill) font-medium transition-[background-color,border-color,transform,box-shadow] duration-[var(--dur-micro)] ease-[var(--ease-micro)] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Liskov Substitution: whether rendered as <a> or <button>, this component
 * exposes the same visual contract (variant/size/children) — callers never
 * need to know which underlying element they got.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(sharedClasses, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
