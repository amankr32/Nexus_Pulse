import { useCallback, useRef } from "react";
import { priceCalculator } from "@/domain/pricing/calculator";
import { CURRENCIES } from "@/domain/pricing/matrix";
import type {
  BillingCycle,
  CurrencyCode,
  PricingTier,
} from "@/domain/pricing/types";

interface UsePricingDisplayResult {
  /** Attach to the price <span> for a given tier id. */
  registerPriceNode: (tierId: string) => (el: HTMLElement | null) => void;
  /** Attach to the "$X/mo billed annually" fine-print <span> for a tier id. */
  registerSubNode: (tierId: string) => (el: HTMLElement | null) => void;
  /** Call from the currency <select>. Mutates DOM only — no setState. */
  setCurrency: (code: CurrencyCode) => void;
  /** Call from the billing toggle. Mutates DOM only — no setState. */
  setCycle: (cycle: BillingCycle) => void;
  getCurrency: () => CurrencyCode;
  getCycle: () => BillingCycle;
}

/**
 * Dependency Inversion: this hook depends on `priceCalculator` through the
 * PriceCalculator interface contract (see domain/pricing/types.ts), not on
 * a hardcoded formula. Swap the calculator implementation and this hook
 * doesn't change.
 *
 * Render isolation strategy:
 * Currency/cycle are tracked in refs, not useState. Updating them calls
 * `el.textContent = ...` directly on registered DOM nodes. No component
 * in the React tree re-renders when billing cycle or currency changes —
 * verified in Chrome DevTools' "Highlight updates on rendering" with zero
 * flashes outside the price text nodes themselves.
 */
export function usePricingDisplay(
  tiers: readonly PricingTier[]
): UsePricingDisplayResult {
  const currencyRef = useRef<CurrencyCode>("USD");
  const cycleRef = useRef<BillingCycle>("monthly");
  const priceNodes = useRef<Map<string, HTMLElement>>(new Map());
  const subNodes = useRef<Map<string, HTMLElement>>(new Map());

  const paint = useCallback(() => {
    const currency = CURRENCIES.find((c) => c.code === currencyRef.current);
    if (!currency) return;

    for (const tier of tiers) {
      const computed = priceCalculator.compute(tier, currency, cycleRef.current);

      const priceEl = priceNodes.current.get(tier.id);
      if (priceEl) priceEl.textContent = computed.formatted;

      const subEl = subNodes.current.get(tier.id);
      if (subEl) {
        subEl.textContent =
          cycleRef.current === "annual"
            ? `${computed.perMonthFormatted}/mo, billed annually`
            : "billed monthly";
      }
    }
  }, [tiers]);

  const registerPriceNode = useCallback(
    (tierId: string) => (el: HTMLElement | null) => {
      if (el) {
        priceNodes.current.set(tierId, el);
        // No initial write here: PricingCard receives a server-computed
        // initialPriceLabel as its starting text content (correct for
        // crawlers and no-JS clients), so the first paint already matches
        // default currency/cycle. This ref only takes over on user input.
      } else {
        priceNodes.current.delete(tierId);
      }
    },
    []
  );

  const registerSubNode = useCallback(
    (tierId: string) => (el: HTMLElement | null) => {
      if (el) {
        subNodes.current.set(tierId, el);
      } else {
        subNodes.current.delete(tierId);
      }
    },
    []
  );

  const setCurrency = useCallback(
    (code: CurrencyCode) => {
      currencyRef.current = code;
      paint();
    },
    [paint]
  );

  const setCycle = useCallback(
    (cycle: BillingCycle) => {
      cycleRef.current = cycle;
      paint();
    },
    [paint]
  );

  return {
    registerPriceNode,
    registerSubNode,
    setCurrency,
    setCycle,
    getCurrency: () => currencyRef.current,
    getCycle: () => cycleRef.current,
  };
}
