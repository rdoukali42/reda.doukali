import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useInView } from '@/hooks/use-in-view';
import { Check } from 'lucide-react';

interface BuildLogProps {
  lines: string[];
  /** ms before first line types in (default 200) */
  initialDelay?: number;
  /** ms between successive lines (default 350) */
  perLine?: number;
  className?: string;
  /** Trigger immediately instead of on enter-view (default false) */
  immediate?: boolean;
}

/**
 * A vertical list of `✓ <text>` lines that appear sequentially.
 * Reduced-motion: all lines visible immediately.
 * Accessibility: real text rendered for screen readers; the visual stagger
 * is decorative and aria-hidden.
 */
export function BuildLog({
  lines,
  initialDelay = 200,
  perLine = 350,
  className,
  immediate = false,
}: BuildLogProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.3 });
  const [visibleCount, setVisibleCount] = useState(0);
  const active = immediate || inView;

  useEffect(() => {
    if (reduced) {
      setVisibleCount(lines.length);
      return;
    }
    if (!active) return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timeouts.push(
        setTimeout(
          () => {
            if (!cancelled) setVisibleCount(i + 1);
          },
          initialDelay + i * perLine,
        ),
      );
    });
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [active, reduced, lines, initialDelay, perLine]);

  return (
    <div
      ref={ref}
      className={`font-mono text-[11px] leading-snug space-y-0.5 ${className ?? ''}`}
    >
      <span className="sr-only">{lines.join(', ')}</span>
      {lines.map((line, i) => (
        <div
          key={line}
          aria-hidden="true"
          className="flex items-center gap-1.5 transition-opacity duration-200"
          style={{ opacity: i < visibleCount ? 1 : 0 }}
        >
          <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
          <span className="text-foreground/70">{line}</span>
        </div>
      ))}
    </div>
  );
}

export default BuildLog;
