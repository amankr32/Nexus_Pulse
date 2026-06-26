"use client";

import { useState } from "react";
import { CURRENCIES } from "@/domain/pricing/matrix";
import type { BillingCycle, CurrencyCode } from "@/domain/pricing/types";
import { cn } from "@/lib/utils";

interface PricingControlsProps {
  onCycleChange: (cycle: BillingCycle) => void;
  onCurrencyChange: (code: CurrencyCode) => void;
}

/**
 * This component owns exactly one piece of state: which button is
 * visually active. That state is local to the control itself — it never
 * lifts up to a shared parent value, which is precisely what keeps the
 * pricing cards below from re-rendering. Selecting an option calls the
 * imperative `onCycleChange` / `onCurrencyChange` callbacks (backed by
 * `usePricingDisplay`'s DOM writes), not a setState in PricingSection.
 */
export function PricingControls({ onCycleChange, onCurrencyChange }: PricingControlsProps) {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const handleCycle = (next: BillingCycle) => {
    setCycle(next);
    onCycleChange(next);
  };

  const handleCurrency = (code: CurrencyCode) => {
    setCurrency(code);
    onCurrencyChange(code);
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
      <div
        role="group"
        aria-label="Billing cycle"
        className="inline-flex rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface) p-1"
      >
        {(["monthly", "annual"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={cycle === option}
            onClick={() => handleCycle(option)}
            className={cn(
              "rounded-(--radius-pill) px-4 py-2 text-sm font-medium transition-colors duration-[var(--dur-micro)] ease-[var(--ease-micro)]",
              cycle === option
                ? "bg-(--color-accent) text-(--color-bg)"
                : "text-(--color-ink-muted) hover:text-(--color-ink)"
            )}
          >
            {option === "monthly" ? "Monthly" : "Annual"}
            {option === "annual" && (
              <span className="ml-1.5 font-mono text-[11px] text-(--color-accent-strong)">
                −20%
              </span>
            )}
          </button>
        ))}
      </div>

      <div
        role="group"
        aria-label="Currency"
        className="inline-flex rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface) p-1"
      >
        {CURRENCIES.map((c) => (
          <button
            key={c.code}
            type="button"
            aria-pressed={currency === c.code}
            onClick={() => handleCurrency(c.code)}
            className={cn(
              "rounded-(--radius-pill) px-3.5 py-2 font-mono text-sm font-medium transition-colors duration-[var(--dur-micro)] ease-[var(--ease-micro)]",
              currency === c.code
                ? "bg-(--color-accent) text-(--color-bg)"
                : "text-(--color-ink-muted) hover:text-(--color-ink)"
            )}
          >
            {c.code}
          </button>
        ))}
      </div>
    </div>
  );
}
