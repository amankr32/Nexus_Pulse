import type { CurrencyFormat, PricingTier } from "./types";

/**
 * Regional tariff matrix.
 *
 * Open/Closed Principle: adding a fourth currency means adding one entry
 * here. No component, hook, or calculator changes. Tariffs are illustrative
 * regional pricing-power adjustments layered on top of the USD base rate —
 * not raw FX rates — which is why INR isn't a literal FX conversion.
 */
export const CURRENCIES: readonly CurrencyFormat[] = [
  { code: "USD", symbol: "$", tariff: 1, locale: "en-US" },
  { code: "EUR", symbol: "\u20ac", tariff: 0.93, locale: "de-DE" },
  { code: "INR", symbol: "\u20b9", tariff: 71, locale: "en-IN" },
] as const;

/**
 * Tier matrix — the second dimension. Each tier only knows its USD base
 * rate; currency and cycle are applied later by the calculator, so this
 * data is never duplicated per-currency or per-cycle.
 */
export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For small teams automating their first pipeline",
    baseMonthlyUsd: 29,
    features: [
      "Up to 5 active pipelines",
      "10k automated records / month",
      "Standard model inference",
      "Community support",
      "7-day run history",
    ],
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For teams scaling automation across the org",
    baseMonthlyUsd: 99,
    features: [
      "Unlimited pipelines",
      "250k automated records / month",
      "Priority model inference",
      "Email + chat support, 24h SLA",
      "90-day run history",
      "Role-based access control",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For regulated, high-volume data operations",
    baseMonthlyUsd: 299,
    features: [
      "Unlimited pipelines & seats",
      "Unlimited automated records",
      "Dedicated inference capacity",
      "Dedicated solutions engineer",
      "Unlimited run history & audit log",
      "SSO, SOC 2 report, custom DPA",
    ],
    highlighted: false,
  },
] as const;

/** Flat annual-billing discount multiplier — the third dimension. */
export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8;
