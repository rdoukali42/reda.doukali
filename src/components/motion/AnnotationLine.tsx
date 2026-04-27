import { m } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { ReactNode } from 'react';

interface AnnotationLineProps {
  label: ReactNode;
  /** Position of the label (default 'right') */
  labelPosition?: 'left' | 'right';
  /** Drawing duration in seconds (default 0.5) */
  duration?: number;
  /** Delay before drawing in seconds (default 0) */
  delay?: number;
  className?: string;
}

/**
 * A blueprint-style measured rule with `[•───•]` end ticks and a label.
 * Animates `width: 0 → 100%` on enter-view, then the label fades in.
 * Reduced-motion: full-width rule + label visible immediately.
 */
export function AnnotationLine({
  label,
  labelPosition = 'right',
  duration = 0.5,
  delay = 0,
  className,
}: AnnotationLineProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.5 });

  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 ${className ?? ''}`}
      aria-hidden="true"
    >
      {labelPosition === 'left' && (
        <m.span
          className="font-mono text-[10px] uppercase tracking-wider text-primary/80"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: reduced || inView ? 1 : 0 }}
          transition={{ duration: 0.2, delay: reduced ? 0 : delay + duration }}
        >
          {label}
        </m.span>
      )}
      <div className="relative flex-1 h-px overflow-hidden">
        <m.div
          className="absolute inset-y-0 left-0 origin-left"
          style={{
            background:
              'linear-gradient(90deg, hsl(45 100% 51%), hsl(45 100% 51% / 0.4))',
            height: 1,
          }}
          initial={reduced ? false : { width: 0 }}
          animate={{ width: reduced || inView ? '100%' : 0 }}
          transition={{ duration: reduced ? 0 : duration, delay, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="absolute -left-0.5 -top-0.5 w-1 h-1 rounded-full bg-primary" />
        <span className="absolute -right-0.5 -top-0.5 w-1 h-1 rounded-full bg-primary" />
      </div>
      {labelPosition === 'right' && (
        <m.span
          className="font-mono text-[10px] uppercase tracking-wider text-primary/80 whitespace-nowrap"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: reduced || inView ? 1 : 0 }}
          transition={{ duration: 0.2, delay: reduced ? 0 : delay + duration }}
        >
          {label}
        </m.span>
      )}
    </div>
  );
}

export default AnnotationLine;
