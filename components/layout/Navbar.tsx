"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { LogoMark, IconMenu, IconClose } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#features", label: "Platform" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Customers" },
] as const;

/**
 * Client island: this is the only top-level component that needs scroll
 * and viewport listeners. Everything else in the page can stay a Server
 * Component, keeping the client bundle small.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-micro)] ease-[var(--ease-micro)]",
        scrolled
          ? "bg-(--color-bg)/80 backdrop-blur-md border-b border-(--color-border)"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-semibold text-(--color-ink)"
        >
          <LogoMark className="h-7 w-7 text-(--color-accent)" />
          Nexus Pulse
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-(--color-ink-muted) transition-colors duration-[var(--dur-micro)] hover:text-(--color-ink)"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="#pricing" variant="ghost" size="md">
            Sign in
          </Button>
          <Button href="#pricing" variant="primary" size="md">
            Start free trial
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-(--color-ink) md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "accordion-panel md:hidden",
          menuOpen ? "border-b border-(--color-border)" : ""
        )}
        data-open={menuOpen}
      >
        <div>
          <ul className="flex flex-col gap-1 bg-(--color-bg) px-6 pb-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-(--color-ink-muted) hover:bg-(--color-surface-2) hover:text-(--color-ink)"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2">
              <Button href="#pricing" variant="secondary" size="md" className="w-full">
                Sign in
              </Button>
              <Button href="#pricing" variant="primary" size="md" className="w-full">
                Start free trial
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
