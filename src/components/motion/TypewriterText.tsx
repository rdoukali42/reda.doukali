import { useEffect, useState, type ElementType } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface TypewriterTextProps {
  text: string;
  /** ms per character (default 35) */
  speed?: number;
  /** ms before typing starts after entering view (default 0) */
  delay?: number;
  /** Show a blinking caret while typing and after (default true) */
  caret?: boolean;
  className?: string;
  /** Element tag to render (default 'span') */
  as?: ElementType;
  /** Trigger immediately on mount instead of waiting for view (default false) */
  immediate?: boolean;
}

/**
 * Types `text` one character at a time once on enter-view (or mount).
 * Reduced-motion: renders full text immediately, no caret.
 */
export function TypewriterText({
  text,
  speed = 35,
  delay = 0,
  caret = true,
  className,
  as,
  immediate = false,
}: TypewriterTextProps) {
  const Tag = (as ?? 'span') as ElementType;
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>({ amount: 0.5 });
  const [shown, setShown] = useState('');
  const active = immediate || inView;

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    if (!active) return;

    let cancelled = false;
    let i = 0;
    const tick = () => {
      if (cancelled) return;
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, speed);
      }
    };
    const start = setTimeout(tick, delay);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [active, reduced, text, speed, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      {caret && !reduced && (
        <span
          className="inline-block w-[0.5em] h-[1em] -mb-[0.1em] bg-primary ml-[0.05em] animate-pulse"
          aria-hidden="true"
        />
      )}
    </Tag>
  );
}

export default TypewriterText;
