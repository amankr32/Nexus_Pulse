import { ANNUAL_DISCOUNT_MULTIPLIER } from "./matrix";
import type {
  BillingCycle,
  ComputedPrice,
  CurrencyFormat,
  PriceCalculator,
  PricingTier,
} from "./types";

/**
 * Matrix-driven price calculator.
 *
 * Single Responsibility: this class does exactly one thing — turn
 * (tier × currency × cycle) into a ComputedPrice. It knows nothing about
 * React, the DOM, or how the result gets displayed.
 *
 * final = baseMonthlyUsd * tariff * cycleMultiplier
 *
 * Liskov-safe: anything implementing PriceCalculator can replace this
 * (e.g. a calculator that calls a live FX API) without the call site
 * needing to know or care.
 */
export class MatrixPriceCalculator implements PriceCalculator {
  compute(
    tier: PricingTier,
    currency: CurrencyFormat,
    cycle: BillingCycle
  ): ComputedPrice {
    const cycleMultiplier = cycle === "annual" ? ANNUAL_DISCOUNT_MULTIPLIER : 1;
    const monthlyInCurrency = tier.baseMonthlyUsd * currency.tariff;
    const effectiveMonthly = monthlyInCurrency * cycleMultiplier;
    const amount = cycle === "annual" ? effectiveMonthly * 12 : effectiveMonthly;

    return {
      amount,
      formatted: this.formatCurrency(amount, currency),
      currencySymbol: currency.symbol,
      billingCycle: cycle,
      perMonthEquivalent: effectiveMonthly,
      perMonthFormatted: this.formatCurrency(effectiveMonthly, currency),
    };
  }

  private formatCurrency(value: number, currency: CurrencyFormat): string {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  }
}

/** Shared singleton — stateless, so one instance is safe to reuse everywhere. */
export const priceCalculator = new MatrixPriceCalculator();
