import { ScanLine } from './ScanLine';

interface SectionDividerProps {
  /** Section identifier shown in the right gutter (e.g., 'about', 'experience') */
  id?: string;
  className?: string;
}

/**
 * A thin horizontal scan line with an optional `[ section_id ]` micro-label
 * in the right gutter. Mount between sections in `Index.tsx` for rhythm.
 */
export function SectionDivider({ id, className }: SectionDividerProps) {
  return (
    <div
      className={`relative max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 ${className ?? ''}`}
      aria-hidden="true"
    >
      <ScanLine className="flex-1" />
      {id && (
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/60 whitespace-nowrap">
          [ {id} ]
        </span>
      )}
    </div>
  );
}

export default SectionDivider;
