import { useEffect, useState } from 'react';

/**
 * Subscribes to `(prefers-reduced-motion: reduce)`.
 * Returns true when the user has expressed a preference for reduced motion.
 * Server-safe: returns `false` in non-browser environments.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
