"use client";

import { PRICING_TIERS } from "@/domain/pricing/matrix";
import { CURRENCIES } from "@/domain/pricing/matrix";
import { priceCalculator } from "@/domain/pricing/calculator";
import { usePricingDisplay } from "@/hooks/usePricingDisplay";
import { PricingControls } from "@/components/sections/PricingControls";
import { PricingCard } from "@/components/sections/PricingCard";

const DEFAULT_CURRENCY = CURRENCIES.find((c) => c.code === "USD")!;

/**
 * Composition root for Feature 1. PricingSection itself holds no pricing
 * state — it delegates entirely to `usePricingDisplay` (Dependency
 * Inversion). Its only job is laying out controls + cards, computing the
 * default-currency/monthly initial labels (so SSR output and crawlers see
 * real prices, not blanks), and wiring the hook's ref-registration
 * functions to each card.
 */
export function PricingSection() {
  const { registerPriceNode, registerSubNode, setCurrency, setCycle } =
    usePricingDisplay(PRICING_TIERS);

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--color-accent)">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-(--color-ink) md:text-4xl"
          >
            Straightforward pricing, three currencies
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-(--color-ink-muted)">
            Switch currency or billing cycle freely — prices update
            instantly without reloading the page.
          </p>
        </div>

        <PricingControls onCycleChange={setCycle} onCurrencyChange={setCurrency} />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => {
            const initial = priceCalculator.compute(tier, DEFAULT_CURRENCY, "monthly");
            return (
              <PricingCard
                key={tier.id}
                tier={tier}
                initialPriceLabel={initial.formatted}
                initialSubLabel="billed monthly"
                registerPriceNode={registerPriceNode(tier.id)}
                registerSubNode={registerSubNode(tier.id)}
              />
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-(--color-ink-faint)">
          All plans include a 14-day free trial. Prices shown exclude
          applicable local tax.
        </p>
      </div>
    </section>
  );
}
