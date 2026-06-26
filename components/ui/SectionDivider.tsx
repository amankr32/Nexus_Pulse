interface SectionDividerProps {
  label?: string;
}

/**
 * The page's signature element. Used once per section boundary — never
 * doubled up — so it reads as a deliberate motif (data flowing through
 * a pipeline) rather than decoration.
 */
export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-6" aria-hidden="true">
      <div className="pulse-seam" />
      {label ? (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-(--color-bg) px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-ink-faint)">
          {label}
        </span>
      ) : null}
    </div>
  );
}
