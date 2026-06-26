/**
 * Pricing domain types.
 *
 * Interface Segregation: each interface describes exactly one axis of the
 * pricing matrix (currency, billing cycle, tier) rather than one bloated
 * "PricingConfig" shape. Consumers depend only on the slice they need.
 */

export type CurrencyCode = "INR" | "USD" | "EUR";

export type BillingCycle = "monthly" | "annual";

export interface CurrencyFormat {
  readonly code: CurrencyCode;
  readonly symbol: string;
  /** Regional tariff multiplier applied on top of the USD base rate. */
  readonly tariff: number;
  /** Locale used for number formatting (grouping, decimals). */
  readonly locale: string;
}

export interface PricingTier {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  /** Base monthly rate in USD, before tariff or billing-cycle adjustment. */
  readonly baseMonthlyUsd: number;
  readonly features: readonly string[];
  readonly highlighted: boolean;
}

export interface ComputedPrice {
  readonly amount: number;
  readonly formatted: string;
  readonly currencySymbol: string;
  readonly billingCycle: BillingCycle;
  /** Per-month equivalent, shown as fine print on annual plans. */
  readonly perMonthEquivalent: number;
  readonly perMonthFormatted: string;
}

/**
 * Open/Closed contract: anything that can turn (tier, currency, cycle) into
 * a ComputedPrice satisfies this. The UI depends on this shape, never on
 * the concrete matrix below — new pricing strategies can be swapped in
 * without touching components.
 */
export interface PriceCalculator {
  compute(
    tier: PricingTier,
    currency: CurrencyFormat,
    cycle: BillingCycle
  ): ComputedPrice;
}
