import { m } from 'framer-motion';
import { useInView } from '@/hooks/use-in-view';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ScanLineProps {
  /** Direction of sweep (default 'horizontal') */
  direction?: 'horizontal' | 'vertical';
  /** Sweep duration in seconds (default 1.2) */
  duration?: number;
  className?: string;
}

/**
 * A 1px gold gradient line that sweeps once on enter-view.
 * Use as a section divider or as an absolute overlay.
 * Reduced-motion: not rendered.
 */
export function ScanLine({
  direction = 'horizontal',
  duration = 1.2,
  className,
}: ScanLineProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.5 });

  if (reduced) return null;

  if (direction === 'horizontal') {
    return (
      <div
        ref={ref}
        className={`relative w-full h-px overflow-hidden ${className ?? ''}`}
        aria-hidden="true"
      >
        <m.div
          className="absolute inset-y-0 w-1/3"
          style={{
            background:
              'linear-gradient(90deg, transparent, hsl(45 100% 51%), transparent)',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: inView ? '300%' : '-100%' }}
          transition={{ duration, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative h-full w-px overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      <m.div
        className="absolute inset-x-0 h-1/3"
        style={{
          background:
            'linear-gradient(180deg, transparent, hsl(45 100% 51%), transparent)',
        }}
        initial={{ y: '-100%' }}
        animate={{ y: inView ? '300%' : '-100%' }}
        transition={{ duration, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default ScanLine;
