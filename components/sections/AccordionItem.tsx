"use client";

import type { FeatureNode } from "@/domain/features/matrix";
import { IconChevron } from "@/components/icons/Icons";

interface AccordionItemProps {
  feature: FeatureNode;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

/**
 * Single Responsibility: render one accordion row. Open/closed state is
 * owned entirely by the parent (via useBentoAccordion) — this component
 * has no local state of its own, so it can't drift out of sync with the
 * bento side it mirrors.
 */
export function AccordionItem({ feature, index, isOpen, onToggle }: AccordionItemProps) {
  const panelId = `accordion-panel-${feature.id}`;
  const headerId = `accordion-header-${feature.id}`;

  return (
    <div className="border-b border-(--color-border)">
      <h3>
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-base font-semibold text-(--color-ink)">
            {feature.title}
          </span>
          <IconChevron
            className="h-5 w-5 shrink-0 text-(--color-ink-muted) transition-transform duration-[var(--dur-micro)] ease-[var(--ease-micro)]"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="accordion-panel"
        data-open={isOpen}
      >
        <div>
          <p className="pb-5 pr-8 text-sm leading-relaxed text-(--color-ink-muted)">
            {feature.description}
          </p>
          <div className="mb-5 flex items-baseline gap-2">
            <span className="font-mono text-xl font-semibold text-(--color-accent-strong)">
              {feature.metric.value}
            </span>
            <span className="text-xs text-(--color-ink-faint)">{feature.metric.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
