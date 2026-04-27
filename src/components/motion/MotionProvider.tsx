import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import type { ReactNode } from 'react';

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Wraps the app with Framer Motion's lazy feature bundle and reduced-motion
 * config. Mount once at the app root; all motion primitives consume it.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

export default MotionProvider;
