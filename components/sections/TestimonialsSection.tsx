import { IconStar } from "@/components/icons/Icons";

const TESTIMONIALS = [
  {
    quote:
      "We replaced six cron jobs and a brittle Airflow DAG with one Nexus Pulse pipeline. Our data engineers now spend their week on modeling, not babysitting ingestion.",
    name: "Priya Raman",
    role: "Head of Data Platform, Solace Bank",
  },
  {
    quote:
      "The governance layer is what got this past our compliance team. Field-level redaction travels with the data automatically — we didn't have to build that ourselves.",
    name: "Jonas Eklund",
    role: "VP Engineering, Marrow Health",
  },
  {
    quote:
      "Pipeline observability caught a silent schema change from a vendor API three days before it would have corrupted a quarterly report.",
    name: "Dana Whitfield",
    role: "Director of Analytics, Fenwick Logistics",
  },
] as const;

const STATS = [
  { value: "4,200+", label: "pipelines in production" },
  { value: "38B", label: "records automated monthly" },
  { value: "99.95%", label: "platform uptime" },
  { value: "41s", label: "median pipeline run time" },
] as const;

export function TestimonialsSection() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-accent)">
            Customers
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-(--color-ink) md:text-4xl"
          >
            Data teams run on Nexus Pulse
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6"
            >
              <div>
                <div className="flex gap-1 text-(--color-accent)" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-(--color-ink-muted)">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-(--color-border) pt-4">
                <p className="font-display text-sm font-semibold text-(--color-ink)">
                  {t.name}
                </p>
                <p className="text-xs text-(--color-ink-faint)">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-(--color-border) pt-12 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-3xl font-semibold text-(--color-accent-strong) md:text-4xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs text-(--color-ink-faint)">{stat.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
