import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons/Icons";

const TERMINAL_LINES = [
  { prefix: "$", text: "nexus run pipeline:orders-eu", tone: "ink" as const },
  { prefix: ">", text: "ingest.warehouse  ✓ 412,018 rows", tone: "muted" as const },
  { prefix: ">", text: "transform.normalize_currency  ✓", tone: "muted" as const },
  { prefix: ">", text: "governance.redact_pii  ✓", tone: "muted" as const },
  { prefix: "✓", text: "shipped to analytics in 41s", tone: "accent" as const },
] as const;

/**
 * Server Component — no interactivity required, so no "use client" and
 * no client-bundle cost. The hero's "characteristic thing" is a live
 * pipeline run, not a generic dashboard screenshot, since the product's
 * whole pitch is what happens to data in motion.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-(--color-accent-soft) blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="reveal-up">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-accent)">
            AI-native data automation
          </p>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-(--color-ink) md:text-5xl lg:text-6xl">
            Turn scattered data
            <br />
            into pipelines that
            <br />
            <span className="text-(--color-accent-strong)">run themselves.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-(--color-ink-muted)">
            Nexus Pulse ingests, transforms, and governs data from every
            source you own, then lets an AI co-pilot maintain the pipeline
            as your schemas change — so your team ships analysis, not glue
            code.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#pricing" size="lg">
              Start free trial
              <IconArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#features" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>

          <p className="mt-6 text-sm text-(--color-ink-faint)">
            No credit card required · 14-day full-access trial
          </p>
        </div>

        <div className="reveal-up [animation-delay:80ms]" aria-hidden="true">
          <div className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) shadow-card">
            <div className="flex items-center gap-2 border-b border-(--color-border) px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-(--color-danger)/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-(--color-warning)/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-(--color-success)/70" />
              <span className="ml-2 font-mono text-xs text-(--color-ink-faint)">
                pipeline-run.log
              </span>
            </div>
            <div className="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed">
              {TERMINAL_LINES.map((line, index) => (
                <p
                  key={line.text}
                  className="reveal-up flex gap-2"
                  style={{ animationDelay: `${300 + index * 140}ms` }}
                >
                  <span
                    className={
                      line.tone === "accent"
                        ? "text-(--color-accent)"
                        : "text-(--color-ink-faint)"
                    }
                  >
                    {line.prefix}
                  </span>
                  <span
                    className={
                      line.tone === "ink"
                        ? "text-(--color-ink)"
                        : line.tone === "accent"
                          ? "text-(--color-accent-strong)"
                          : "text-(--color-ink-muted)"
                    }
                  >
                    {line.text}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
