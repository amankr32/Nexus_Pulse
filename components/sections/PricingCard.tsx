import { memo } from "react";
import type { PricingTier } from "@/domain/pricing/types";
import { IconCheck } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  tier: PricingTier;
  initialPriceLabel: string;
  initialSubLabel: string;
  registerPriceNode: (el: HTMLElement | null) => void;
  registerSubNode: (el: HTMLElement | null) => void;
}

/**
 * Re-render isolation guardrail: this component is wrapped in `memo()`
 * with no props that ever change identity on currency/cycle toggle — the
 * ref-callback functions are stable (useCallback in the parent hook), and
 * `tier` is a `readonly` matrix entry, never recreated. Subsequent price
 * and sub-label updates are written by the parent hook directly into the
 * DOM nodes these refs point at, completely outside React's render cycle.
 *
 * `initialPriceLabel` / `initialSubLabel` are computed server-side (default
 * USD/monthly) so crawlers and no-JS clients see a real price immediately —
 * the DOM-write path only takes over once the user actually changes
 * currency or billing cycle on the client.
 *
 * Verify in Chrome DevTools → Rendering → "Highlight updates on rendering":
 * toggling billing/currency flashes only the two <span> text nodes below,
 * never this <article> or anything above it in the tree.
 */
function PricingCardComponent({
  tier,
  initialPriceLabel,
  initialSubLabel,
  registerPriceNode,
  registerSubNode,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-(--radius-card) border p-7",
        tier.highlighted
          ? "border-(--color-accent-dim) bg-(--color-surface-2) shadow-glow"
          : "border-(--color-border) bg-(--color-surface)"
      )}
    >
      {tier.highlighted && (
        <span className="mb-4 inline-flex w-fit items-center rounded-(--radius-pill) bg-(--color-accent-soft) px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-(--color-accent-strong)">
          Most popular
        </span>
      )}

      <h3 className="font-display text-xl font-semibold text-(--color-ink)">{tier.name}</h3>
      <p className="mt-1.5 text-sm text-(--color-ink-muted)">{tier.tagline}</p>

      <div className="mt-6 flex items-end gap-1">
        <span
          ref={registerPriceNode}
          data-price-node={tier.id}
          className="font-mono text-4xl font-semibold tabular-nums text-(--color-ink)"
        >
          {initialPriceLabel}
        </span>
      </div>
      <span
        ref={registerSubNode}
        data-sub-node={tier.id}
        className="mt-1 text-xs text-(--color-ink-faint)"
      >
        {initialSubLabel}
      </span>

      <Button
        href="#top"
        variant={tier.highlighted ? "primary" : "secondary"}
        size="md"
        className="mt-7 w-full"
      >
        Choose {tier.name}
      </Button>

      <ul className="mt-7 flex flex-col gap-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-(--color-ink-muted)">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

export const PricingCard = memo(PricingCardComponent);
