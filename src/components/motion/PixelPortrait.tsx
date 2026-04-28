import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import portraitData from '@/assets/portrait-pixels.json';

interface PortraitData {
  cols: number;
  rows: number;
  cells: number[];
}

interface PixelPortraitProps {
  /** Final image to crossfade to once assembly resolves */
  finalImageSrc?: string;
  /** Alt text for the final image (decorative grid is aria-hidden) */
  alt?: string;
  /** Total assembly duration in ms (default 1600) */
  duration?: number;
  /** Delay before assembly starts in ms (default 200) */
  delay?: number;
  className?: string;
}

/**
 * Renders a CSS grid of pixel cells from src/assets/portrait-pixels.json.
 * Cells animate scale 0 → 1 with random per-cell stagger over `duration` ms.
 * After completion, optional crossfade to `finalImageSrc`.
 *
 * Reduced-motion: shows the static pixel grid (or the final image if provided)
 * immediately with no animation.
 */
export function PixelPortrait({
  finalImageSrc,
  alt = '',
  duration = 1600,
  delay = 200,
  className,
}: PixelPortraitProps) {
  const reduced = useReducedMotion();
  const data = portraitData as PortraitData;
  const [done, setDone] = useState(reduced);

  // Random per-cell stagger offsets, computed once.
  const offsets = useMemo(() => {
    return data.cells.map(() => Math.random() * (duration - 200));
  }, [data.cells, duration]);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), delay + duration + 100);
    return () => clearTimeout(t);
  }, [reduced, delay, duration]);

  return (
    <div
      className={`relative ${className ?? ''}`}
      style={{
        aspectRatio: `${data.cols} / ${data.rows}`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 grid gap-[1px] transition-opacity duration-700"
        style={{
          gridTemplateColumns: `repeat(${data.cols}, 1fr)`,
          gridTemplateRows: `repeat(${data.rows}, 1fr)`,
          opacity: finalImageSrc && done ? 0 : 1,
          pointerEvents: 'none',
        }}
      >
        {data.cells.map((tier, i) => (
          <span
            key={i}
            className="rounded-[1px]"
            style={{
              background:
                tier === 2
                  ? 'hsl(45 100% 51% / 0.95)'
                  : tier === 1
                    ? 'hsl(45 100% 51% / 0.45)'
                    : 'transparent',
              boxShadow:
                tier === 2 ? '0 0 4px hsl(45 100% 51% / 0.4)' : undefined,
              transform: reduced ? 'scale(1)' : 'scale(0)',
              opacity: reduced ? 1 : 0,
              animation: reduced
                ? undefined
                : `pixelIn 360ms cubic-bezier(.2,.7,.2,1) ${delay + offsets[i]}ms forwards`,
            }}
          />
        ))}
      </div>

      {finalImageSrc && (
        <img
          src={finalImageSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700"
          style={{ opacity: done ? 1 : 0 }}
        />
      )}

      <style>{`
        @keyframes pixelIn {
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default PixelPortrait;
