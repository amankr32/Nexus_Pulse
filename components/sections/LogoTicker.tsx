const PARTNER_NAMES = [
  "Solace Bank",
  "Northwind Retail",
  "Aerolyte",
  "Marrow Health",
  "Fenwick Logistics",
  "Brightwave Energy",
  "Corsair Insurance",
  "Plinth Analytics",
] as const;

/**
 * Server Component. The scroll itself is a pure CSS keyframe animation
 * (no JS), so this never touches the client bundle or runtime.
 */
export function LogoTicker() {
  return (
    <section aria-label="Trusted by" className="border-y border-(--color-border) py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-(--color-ink-faint)">
          Trusted by data teams at
        </p>
      </div>
      <div className="group relative flex overflow-hidden">
        <ul className="flex shrink-0 animate-[ticker-scroll_32s_linear_infinite] gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {[...PARTNER_NAMES, ...PARTNER_NAMES].map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="shrink-0 font-display text-lg font-medium text-(--color-ink-faint) select-none"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
