import { useCallback, useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 767px)";

interface UseBentoAccordionResult {
  /** Index open in the mobile accordion. Drives `data-open` on panels. */
  activeIndex: number | null;
  /** Call on accordion header click. */
  toggleAccordion: (index: number) => void;
  /** Call on bento card pointer enter/focus. Cheap — ref only, no re-render. */
  setHoverIndex: (index: number | null) => void;
  isMobile: boolean;
}

/**
 * Single Responsibility: this hook's only job is reconciling "which index
 * is active" across the desktop bento (hover-driven) and mobile accordion
 * (click-driven) representations of the same feature list.
 *
 * Context Lock Constraint: hover index is stored in a ref — hovering a
 * bento card never triggers a re-render (hover is a CSS :hover/:focus
 * concern visually; the ref only exists so we know what to hand off).
 * The moment `matchMedia` crosses the mobile breakpoint, the last hovered
 * index is committed to `activeIndex` via setState exactly once, which
 * opens the corresponding accordion panel already-expanded.
 */
export function useBentoAccordion(): UseBentoAccordionResult {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hoverIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT_QUERY);

    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      const nowMobile = event.matches;
      setIsMobile(nowMobile);

      if (nowMobile && hoverIndexRef.current !== null) {
        // Context transfer: desktop hover context becomes the open panel.
        setActiveIndex(hoverIndexRef.current);
      }
    };

    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const setHoverIndex = useCallback((index: number | null) => {
    hoverIndexRef.current = index;
  }, []);

  const toggleAccordion = useCallback((index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  }, []);

  return { activeIndex, toggleAccordion, setHoverIndex, isMobile };
}
