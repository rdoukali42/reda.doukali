import { m } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { ReactNode } from 'react';

interface ChipMountProps {
  children: ReactNode;
  /** Stagger index in a parent group (default 0). Ignored if `delay` is set. */
  index?: number;
  /** Per-chip stagger duration in seconds (default 0.04) */
  staggerStep?: number;
  /** Explicit delay in seconds; overrides `index * staggerStep` */
  delay?: number;
  className?: string;
}

/**
 * Tag/chip that slides up + scales in once on enter-view.
 * The parent must have its own enter-view trigger (this primitive uses
 * Framer Motion's `whileInView` so it self-triggers when scrolled into view).
 *
 * Reduced-motion: identity (final state, no transition).
 */
export function ChipMount({
  children,
  index = 0,
  staggerStep = 0.04,
  delay,
  className,
}: ChipMountProps) {
  const reduced = useReducedMotion();
  const computedDelay = delay ?? index * staggerStep;

  return (
    <m.span
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.92 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.35, delay: computedDelay, ease: [0.2, 0.7, 0.2, 1] }
      }
    >
      {children}
    </m.span>
  );
}

export default ChipMount;
