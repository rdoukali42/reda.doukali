import { m } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { ReactNode } from 'react';

interface GridRevealProps {
  children?: ReactNode;
  className?: string;
  /** Final grid opacity (default 0.55) */
  opacity?: number;
  /** Animation duration in seconds (default 0.6) */
  duration?: number;
}

/**
 * Renders a Workshop grid background that fades in on enter-view.
 * Use as an absolute-positioned overlay or as a section wrapper via children.
 * Reduced-motion: renders at final opacity instantly.
 */
export function GridReveal({
  children,
  className,
  opacity = 0.55,
  duration = 0.6,
}: GridRevealProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.1 });

  return (
    <div ref={ref} className={className}>
      <m.div
        className="bg-grid pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? opacity : 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration, ease: [0.16, 1, 0.3, 1] }
        }
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export default GridReveal;
