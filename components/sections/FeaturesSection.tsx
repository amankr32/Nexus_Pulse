"use client";

import { FEATURE_NODES } from "@/domain/features/matrix";
import { useBentoAccordion } from "@/hooks/useBentoAccordion";
import { BentoCard } from "@/components/sections/BentoCard";
import { AccordionItem } from "@/components/sections/AccordionItem";

/**
 * Composition root for Feature 2. This component's only job is wiring
 * `useBentoAccordion`'s state to two visual representations — it contains
 * no breakpoint logic or DOM measurement itself (Dependency Inversion:
 * it depends on the hook's abstract result, not on matchMedia directly).
 *
 * Both <div>s render at all times; Tailwind's `md:` breakpoint controls
 * which is visible, so there's no mount/unmount flash when the viewport
 * crosses 768px — only the already-synced active index needs to show.
 */
export function FeaturesSection() {
  const { activeIndex, toggleAccordion, setHoverIndex } = useBentoAccordion();

  return (
    <section id="features" aria-labelledby="features-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-accent)">
            Platform
          </p>
          <h2
            id="features-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-(--color-ink) md:text-4xl"
          >
            Every stage of the pipeline, governed by default
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-(--color-ink-muted)">
            From first connection to final delivery, Nexus Pulse keeps
            ingestion, transformation, and governance in one auditable
            system — instead of five disconnected tools.
          </p>
        </div>

        {/* Desktop: equal-size grid (every card is the same width/height) */}
        <div
          className="mt-12 hidden grid-cols-2 gap-5 md:grid lg:grid-cols-5"
          role="list"
          aria-label="Platform capabilities"
        >
          {FEATURE_NODES.map((feature, index) => (
            <div key={feature.id} role="listitem" className="h-full">
              <BentoCard
                feature={feature}
                index={index}
                onHoverChange={setHoverIndex}
              />
            </div>
          ))}
        </div>

        {/* Mobile: accordion, pre-opened to the index transferred from bento hover */}
        <div className="mt-10 md:hidden">
          {FEATURE_NODES.map((feature, index) => (
            <AccordionItem
              key={feature.id}
              feature={feature}
              index={index}
              isOpen={activeIndex === index}
              onToggle={toggleAccordion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}