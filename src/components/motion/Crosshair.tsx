import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface CrosshairProps {
  /** Manual disable (default false) */
  disabled?: boolean;
  /** Min viewport width in px to render (default 1024) */
  minViewport?: number;
}

/**
 * A small gold dot + 1px tracking lines that follow the cursor.
 * Mounted once at the app root. Hidden on:
 *   - reduced-motion preference
 *   - touch / coarse pointer
 *   - viewports < `minViewport` px
 *
 * Grows when hovering elements with `data-cursor="link"` or any anchor/button.
 */
export function Crosshair({ disabled = false, minViewport = 1024 }: CrosshairProps) {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isLink, setIsLink] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (disabled || reduced || typeof window === 'undefined') return;

    const evaluate = () => {
      const fine = window.matchMedia('(pointer: fine)').matches;
      setEnabled(fine && window.innerWidth >= minViewport);
    };
    evaluate();
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, [disabled, reduced, minViewport]);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let next = { x: 0, y: 0 };
    let nextLink = false;

    const onMove = (e: PointerEvent) => {
      next = { x: e.clientX, y: e.clientY };
      const target = e.target as Element | null;
      nextLink = !!target?.closest(
        'a, button, [role="button"], [data-cursor="link"]',
      );
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setPos(next);
        setIsLink(nextLink);
        raf = 0;
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = isLink ? 12 : 6;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 60ms linear',
      }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[width,height,background] duration-200"
        style={{
          width: size,
          height: size,
          boxShadow: '0 0 8px hsl(45 100% 51% / 0.65)',
        }}
      />
    </div>
  );
}

export default Crosshair;
