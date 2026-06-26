"use client";

import { useEffect, useState } from "react";

/**
 * Single Responsibility: render a brief entry veil and remove itself.
 *
 * Performance contract: the visual fade is driven entirely by the
 * `.page-loader` CSS animation (450ms), defined in globals.css. The
 * `setTimeout` here only unmounts the node from the DOM after the fade
 * completes — it never delays paint, hydration, or Time to Interactive,
 * since the rest of the page renders and hydrates in parallel underneath.
 */
export function PageLoader() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMounted(false), 500);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="page-loader fixed inset-0 z-[100] flex items-center justify-center bg-(--color-bg) pointer-events-none"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-(--color-accent) opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-(--color-accent)" />
        </span>
        <span className="font-display text-sm tracking-wide text-(--color-ink-muted)">
          Nexus Pulse
        </span>
      </div>
    </div>
  );
}
