import type { SVGProps } from "react";

/**
 * Hand-authored icon set — no lucide/heroicons/etc. dependency, satisfying
 * the "no external UI libraries" constraint for every surface they touch.
 * Each icon is a pure, stateless function: same props in, same markup out.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M6 23 V11.5 L16 6 L26 11.5 V23"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M11 19.5 V14.5 L16 12 L21 14.5 V19.5" fill="currentColor" opacity="0.18" />
      <circle cx="16" cy="16" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function IconIngest(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h13" />
      <path d="M17 9l3 3-3 3" />
    </svg>
  );
}

export function IconTransform(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 6h7a3 3 0 0 1 3 3v9" />
      <path d="M12 15l3 3 3-3" />
      <path d="M19 18H12a3 3 0 0 1-3-3V6" />
      <path d="M9 9L6 6l3-3" />
    </svg>
  );
}

export function IconObservability(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17l5-6 4 3 5-7 4 5" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function IconGovernance(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  );
}

export function IconOrchestration(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.8 7.2L10.5 16" />
      <path d="M16.2 7.2L13.5 16" />
      <path d="M8.2 6h7.6" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function IconChevron(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 10l5 5 5-5" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.7 6.2 6.7.6-5.1 4.5 1.6 6.6L12 16.9l-5.9 3.5 1.6-6.6-5.1-4.5 6.7-.6L12 2.5z" />
    </svg>
  );
}
