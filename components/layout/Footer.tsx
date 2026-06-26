import { LogoMark } from "@/components/icons/Icons";

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: ["Ingestion", "Transforms", "Observability", "Governance"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Blog", "Security"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API reference", "Status", "Support"],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-(--color-border) py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              className="flex items-center gap-2 font-display text-lg font-semibold text-(--color-ink)"
            >
              <LogoMark className="h-7 w-7 text-(--color-accent)" />
              Nexus Pulse
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-(--color-ink-muted)">
              AI-native data automation for teams who need their
              pipelines governed, observable, and self-maintaining.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="font-display text-sm font-semibold text-(--color-ink)">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-(--color-ink-muted) transition-colors duration-[var(--dur-micro)] hover:text-(--color-ink)"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-(--color-border) pt-8 sm:flex-row">
          <p className="text-xs text-(--color-ink-faint)">
            © {new Date().getFullYear()} Nexus Pulse, Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-(--color-ink-faint)">
            <a href="#top" className="hover:text-(--color-ink)">
              Privacy
            </a>
            <a href="#top" className="hover:text-(--color-ink)">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
