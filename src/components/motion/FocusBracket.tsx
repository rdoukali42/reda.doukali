import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface FocusBracketProps {
  children: ReactNode;
  className?: string;
  /** Size of each corner bracket in pixels (default 10) */
  size?: number;
  /** When true, brackets are always visible (default false: hover/focus only) */
  alwaysOn?: boolean;
}

/**
 * Wraps a child with 4 absolutely-positioned `[ ]` corner brackets.
 * Brackets snap to opacity 1 on group-hover/group-focus-within. The wrapper
 * adds `relative group` automatically.
 *
 * Reduced-motion: brackets render at 0.35 opacity always (no hover transition).
 */
export function FocusBracket({
  children,
  className,
  size = 10,
  alwaysOn = false,
}: FocusBracketProps) {
  const reduced = useReducedMotion();
  const cornerBase =
    'pointer-events-none absolute border-[hsl(var(--bracket-color))]';
  const cornerSize = `w-[${size}px] h-[${size}px]`;
  const visibility = alwaysOn || reduced
    ? 'opacity-100'
    : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200';
  const reducedStatic = reduced ? 'opacity-35' : '';

  return (
    <div className={`relative group ${className ?? ''}`}>
      <span
        aria-hidden="true"
        className={`${cornerBase} ${cornerSize} ${visibility} ${reducedStatic} top-0 left-0 border-t border-l`}
        style={{ width: size, height: size }}
      />
      <span
        aria-hidden="true"
        className={`${cornerBase} ${cornerSize} ${visibility} ${reducedStatic} top-0 right-0 border-t border-r`}
        style={{ width: size, height: size }}
      />
      <span
        aria-hidden="true"
        className={`${cornerBase} ${cornerSize} ${visibility} ${reducedStatic} bottom-0 left-0 border-b border-l`}
        style={{ width: size, height: size }}
      />
      <span
        aria-hidden="true"
        className={`${cornerBase} ${cornerSize} ${visibility} ${reducedStatic} bottom-0 right-0 border-b border-r`}
        style={{ width: size, height: size }}
      />
      {children}
    </div>
  );
}

export default FocusBracket;
