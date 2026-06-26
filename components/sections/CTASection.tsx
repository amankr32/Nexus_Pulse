import { Button } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons/Icons";

export function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-(--radius-card) border border-(--color-accent-dim) bg-(--color-surface-2) px-8 py-16 text-center md:px-16">
          <div
            aria-hidden="true"
            className="absolute -bottom-24 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-(--color-accent-soft) blur-3xl"
          />
          <h2
            id="cta-heading"
            className="relative font-display text-3xl font-semibold tracking-tight text-(--color-ink) md:text-4xl"
          >
            Ship your first governed pipeline this week
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-(--color-ink-muted)">
            Connect a source, describe the transform you need, and watch
            Nexus Pulse keep it running as your data changes underneath
            it.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Button href="#pricing" size="lg">
              Start free trial
              <IconArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#features" variant="secondary" size="lg">
              Talk to sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
