import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Resets scroll to top on every route change.
 *
 * Must be mounted INSIDE <Router> (it relies on useLocation).
 *
 * Behavior:
 *   - Skips when the URL includes a hash (e.g. /services#manpower) so
 *     the destination page's own hash-scroll logic can take over.
 *   - Uses the global Lenis instance when present (exposed from
 *     main.jsx as window.__lenis) so smooth-scroll state stays in sync.
 *   - Falls back to native window.scrollTo when Lenis isn't available.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Let hash-anchor navigation handle its own scroll target
    if (hash) return;

    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}