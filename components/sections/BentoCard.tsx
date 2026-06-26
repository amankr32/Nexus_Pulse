"use client";

import type { FeatureNode } from "@/domain/features/matrix";
import { cn } from "@/lib/utils";

const SPAN_CLASSES: Record<FeatureNode["span"], string> = {
  small: "md:col-span-2 md:row-span-1",
  wide: "md:col-span-4 md:row-span-1",
  tall: "md:col-span-2 md:row-span-2",
};

interface BentoCardProps {
  feature: FeatureNode;
  index: number;
  onHoverChange: (index: number | null) => void;
}

/**
 * Single Responsibility: renders one bento node and reports hover/focus
 * intent upward. It never decides what happens with that intent — that's
 * the accordion-transfer hook's job (Dependency Inversion: this component
 * depends on a callback prop, not on `useBentoAccordion` directly).
 */
export function BentoCard({ feature, index, onHoverChange }: BentoCardProps) {
  return (
    <article
      tabIndex={0}
      onMouseEnter={() => onHoverChange(index)}
      onFocus={() => onHoverChange(index)}
      onMouseLeave={() => onHoverChange(null)}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 transition-[transform,border-color,box-shadow] duration-[var(--dur-micro)] ease-[var(--ease-micro)] hover:-translate-y-1 hover:border-(--color-accent-dim) hover:shadow-hover focus-visible:-translate-y-1",
        SPAN_CLASSES[feature.span]
      )}
    >
      <div>
        <h3 className="font-display text-lg font-semibold text-(--color-ink)">
          {feature.title}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-(--color-ink-muted)">
          {feature.description}
        </p>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold text-(--color-accent-strong)">
          {feature.metric.value}
        </span>
        <span className="text-xs text-(--color-ink-faint)">{feature.metric.label}</span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-(--radius-card) opacity-0 transition-opacity duration-[var(--dur-micro)] group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px circle at 85% 15%, var(--color-accent-soft), transparent 70%)",
        }}
      />
    </article>
  );
}
