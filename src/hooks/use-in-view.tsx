import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Fire only on the first entry (default true). */
  once?: boolean;
  /** Threshold passed to IntersectionObserver (default 0.25). */
  amount?: number;
  /** Margin around root (default '0px'). */
  rootMargin?: string;
}

/**
 * Light IntersectionObserver wrapper for triggering enter-view animations.
 * Returns [ref, inView]. Once-fired observers disconnect themselves.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {},
): [React.RefObject<T>, boolean] {
  const { once = true, amount = 0.25, rootMargin = '0px' } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, amount, rootMargin]);

  return [ref, inView];
}
