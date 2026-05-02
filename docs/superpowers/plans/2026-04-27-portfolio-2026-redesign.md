# Portfolio 2026 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `src/pages/Index.tsx` (~735 lines) into composed section components and a Framer Motion primitives library, applying a "Workshop + Balanced" 2026 design language while preserving all locale content, gold/black palette, routing, and SkillGame logic.

**Architecture:** Section extraction (`src/sections/`) + motion primitives library (`src/components/motion/`) + Workshop design tokens added to `src/index.css` + build-time pixel-portrait JSON for the self-assembling hero. Framer Motion is the only new runtime dep; JetBrains Mono is self-hosted via `@fontsource/jetbrains-mono`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind, shadcn/ui (existing) + Framer Motion v11 + sharp (devDep, build-time only) + @fontsource/jetbrains-mono (self-hosted font).

**Spec:** `docs/superpowers/specs/2026-04-27-portfolio-2026-redesign-design.md`

**Verification model:** This project has no test runner per `CLAUDE.md` and the spec §11 explicitly excludes tests. Each task is verified via a combination of `npm run lint`, `npm run build` (TypeScript + Vite), and visual checks in `npm run dev`. No new test runner is introduced.

---

## Pre-flight notes

- All commits **must** end with the standard footer:
  ```
  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  ```
- Run `npm run dev` early in Phase 3 to keep a hot-reloading window open while extracting sections.
- The path alias `@/*` resolves to `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`). Use `@/` imports throughout.
- ESLint has `@typescript-eslint/no-unused-vars` disabled — don't rely on lint to catch unused imports; clean them up manually as you go.
- Locale shape `typeof en` is the schema; **never** add or remove keys. Only consumers move.

---

## Phase 1 — Foundation

### Task 1: Install runtime and dev dependencies

**Files:**
- Modify: `package.json` (via `npm install`)
- Modify: `package-lock.json` (auto-updated)

- [ ] **Step 1: Install Framer Motion as a runtime dep**

```bash
npm install framer-motion@^11.0.0
```

- [ ] **Step 2: Install JetBrains Mono via @fontsource and sharp as devDeps**

```bash
npm install --save-dev @fontsource/jetbrains-mono sharp
```

`@fontsource/jetbrains-mono` ships the woff2 with the bundle (truly self-hosted, no CDN call). `sharp` is build-time only — it never reaches the browser.

- [ ] **Step 3: Verify install**

```bash
npm run build
```

Expected: `vite build` completes without errors. (No source code uses the new packages yet, so the build should pass identically to before.)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "$(cat <<'EOF'
deps: add framer-motion runtime + jetbrains-mono and sharp devDeps

Foundation for the 2026 redesign motion primitives, self-hosted font
loading, and build-time pixel-portrait sampling.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Self-host JetBrains Mono and preload it

**Files:**
- Modify: `src/main.tsx`
- Modify: `index.html`

- [ ] **Step 1: Import the font CSS in `src/main.tsx`**

Open `src/main.tsx` and add this import near the existing `import './index.css'` line (above it):

```ts
import '@fontsource/jetbrains-mono/500.css';
import './index.css';
```

This causes Vite to bundle the woff2 file into `dist/` at build time and emits the `@font-face` rule with `font-display: swap` automatically.

- [ ] **Step 2: Add a font preload hint to `index.html`**

Open `index.html`. Inside `<head>`, after the `<title>` tag, add:

```html
<link
  rel="preload"
  href="/assets/jetbrains-mono-latin-500-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

(The hashed filename emitted by Vite/fontsource at build time may differ slightly. After the first `npm run build`, inspect `dist/assets/` and update this preload `href` to match the actual emitted filename if needed.)

- [ ] **Step 3: Build to confirm the font is bundled**

```bash
npm run build
```

Expected: build succeeds; a `jetbrains-mono-*.woff2` file appears under `dist/assets/`.

- [ ] **Step 4: Visual smoke check**

```bash
npm run dev
```

Open `http://localhost:8080`. Open DevTools → Network → filter "Font". Hard-reload. Expected: a `jetbrains-mono-*.woff2` request returns 200, served from your local server.

- [ ] **Step 5: Commit**

```bash
git add src/main.tsx index.html
git commit -m "$(cat <<'EOF'
fonts: self-host JetBrains Mono 500 with preload

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Add Workshop design tokens to `src/index.css`

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Append a new `:root` token block**

Open `src/index.css`. After the existing `--transition-bounce` line inside `:root`, add the new tokens **before** the closing `}` of the `:root` block:

```css
    /* === Workshop language (2026 redesign) === */
    --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
    --grid-size: 24px;
    --grid-color: hsl(45 100% 51% / 0.06);
    --bracket-color: hsl(45 100% 51%);
    --bracket-thickness: 1px;
    --bracket-size: 10px;
    --rule-gold: linear-gradient(90deg, hsl(45 100% 51%), transparent);
    --workshop-bg: linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 7%) 100%);
    --ease-snap: cubic-bezier(.2, .7, .2, 1);
    --ease-emerge: cubic-bezier(.16, 1, .3, 1);
```

- [ ] **Step 2: Add a new utility layer block at the bottom of the file**

Append after the existing `@layer utilities` block (which contains `.animate-spin-slow`):

```css
@layer utilities {
  .bg-grid {
    background-image:
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
    background-size: var(--grid-size) var(--grid-size);
  }

  .font-mono-workshop {
    font-family: var(--font-mono);
  }

  /* SkillGame button reskin via data attribute on the section root */
  [data-skin="workshop"] button {
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
  }
}
```

- [ ] **Step 3: Lint check**

```bash
npm run lint
```

Expected: pass with no new errors. (CSS is not linted, but TS imports are unaffected.)

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "$(cat <<'EOF'
tokens: add Workshop design tokens (grid, brackets, mono, easings)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Extend `tailwind.config.ts` with `font-mono` family

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add `fontFamily` extension**

Open `tailwind.config.ts`. Inside `theme.extend`, after the existing `borderRadius` block (around line 65), add:

```ts
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'SF Mono', 'monospace'],
      },
```

- [ ] **Step 2: Build to verify config parses**

```bash
npm run build
```

Expected: build succeeds, `font-mono` Tailwind class is now available (e.g., `class="font-mono"` will resolve to JetBrains Mono).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "$(cat <<'EOF'
tailwind: extend fontFamily.mono to use Workshop --font-mono token

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Create `useReducedMotion` hook

**Files:**
- Create: `src/hooks/use-reduced-motion.tsx`

- [ ] **Step 1: Write the hook**

```tsx
import { useEffect, useState } from 'react';

/**
 * Subscribes to `(prefers-reduced-motion: reduce)`.
 * Returns true when the user has expressed a preference for reduced motion.
 * Server-safe: returns `false` in non-browser environments.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-reduced-motion.tsx
git commit -m "$(cat <<'EOF'
hooks: add useReducedMotion for prefers-reduced-motion subscription

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Create `useInView` hook

**Files:**
- Create: `src/hooks/use-in-view.tsx`

- [ ] **Step 1: Write the hook**

```tsx
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Fire only on the first entry (default true). */
  once?: boolean;
  /** Threshold passed to IntersectionObserver (default 0.25). */
  amount?: number;
  /** Margin around root (default '0px'). */
  rootMargin?: string;
}

/**
 * Light IntersectionObserver wrapper for triggering enter-view animations.
 * Returns [ref, inView]. Once-fired observers disconnect themselves.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {},
): [React.RefObject<T>, boolean] {
  const { once = true, amount = 0.25, rootMargin = '0px' } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, amount, rootMargin]);

  return [ref, inView];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-in-view.tsx
git commit -m "$(cat <<'EOF'
hooks: add useInView IntersectionObserver wrapper

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Create the build-time pixel-portrait sampling script

**Files:**
- Create: `scripts/build-pixel-portrait.mjs`
- Modify: `package.json` (add `prebuild` script)

- [ ] **Step 1: Write the sampling script**

Create `scripts/build-pixel-portrait.mjs`:

```js
#!/usr/bin/env node
/**
 * Samples src/assets/gold_me.png down to a 32x40 grid of intensity tiers
 * (0 = transparent/off, 1 = dim, 2 = bright) and writes the result to
 * src/assets/portrait-pixels.json.
 *
 * Run automatically before `npm run build` (see package.json prebuild hook).
 */

import sharp from 'sharp';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const inputPath = resolve(root, 'src/assets/gold_me.png');
const outputPath = resolve(root, 'src/assets/portrait-pixels.json');

const COLS = 32;
const ROWS = 40;

if (!existsSync(inputPath)) {
  console.error(`[build-pixel-portrait] Source not found: ${inputPath}`);
  process.exit(1);
}

const { data } = await sharp(inputPath)
  .resize(COLS, ROWS, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const cells = new Array(COLS * ROWS);
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x++) {
    const i = (y * COLS + x) * 4;
    const a = data[i + 3];
    if (a < 32) {
      cells[y * COLS + x] = 0;
    } else {
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      cells[y * COLS + x] = lum < 96 ? 1 : 2;
    }
  }
}

writeFileSync(
  outputPath,
  JSON.stringify({ cols: COLS, rows: ROWS, cells }, null, 0),
);
console.log(
  `[build-pixel-portrait] Wrote ${outputPath} (${COLS}x${ROWS}, ${cells.length} cells)`,
);
```

- [ ] **Step 2: Verify the source asset path**

The portrait file is referenced as `goldMe` in `Index.tsx` via `import goldMe from "@/assets/gold_me.png"` — confirm the file is at `src/assets/gold_me.png`:

```bash
ls -la src/assets/gold_me.png
```

Expected: file exists. If the import in `Index.tsx` actually points to `gold_me.png` (snake_case), no rename is needed; if it's `goldMe.png` (camelCase), update `inputPath` in the script accordingly.

- [ ] **Step 3: Add the `prebuild` hook to `package.json`**

Open `package.json`. In the `scripts` block, after `"dev": "vite"`, add:

```json
    "prebuild": "node scripts/build-pixel-portrait.mjs",
```

The `scripts` block should now look like:

```json
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/build-pixel-portrait.mjs",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

- [ ] **Step 4: Run the script manually once to generate the JSON**

```bash
node scripts/build-pixel-portrait.mjs
```

Expected output: `[build-pixel-portrait] Wrote /home/.../src/assets/portrait-pixels.json (32x40, 1280 cells)`

- [ ] **Step 5: Verify the JSON was created and is reasonably small**

```bash
ls -la src/assets/portrait-pixels.json
```

Expected: file exists, < 5KB.

- [ ] **Step 6: Verify `npm run build` triggers the prebuild**

```bash
npm run build
```

Expected: see the `[build-pixel-portrait] Wrote ...` line in the output, then `vite build` succeeds.

- [ ] **Step 7: Commit**

```bash
git add scripts/build-pixel-portrait.mjs package.json src/assets/portrait-pixels.json
git commit -m "$(cat <<'EOF'
build: add pixel-portrait sampler and prebuild hook

Generates src/assets/portrait-pixels.json from gold_me.png at 32x40 with
3-tier intensity. Consumed at runtime by the PixelPortrait primitive.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 2 — Motion primitives library

All primitives live in `src/components/motion/`. Each is a small focused file (~30–80 lines), accepts `delay?: number`, respects `useReducedMotion()`, and is exported as a default + named export for ergonomics.

### Task 8: Create `LazyMotion` provider wrapper

**Files:**
- Create: `src/components/motion/MotionProvider.tsx`

This wrapper enables Framer Motion's `LazyMotion` with the `domAnimation` feature bundle, keeping payload minimal. All motion primitives below assume this provider is mounted at the app root.

- [ ] **Step 1: Write the provider**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/MotionProvider.tsx
git commit -m "$(cat <<'EOF'
motion: add MotionProvider with LazyMotion + reduced-motion config

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: `TypewriterText` primitive

**Files:**
- Create: `src/components/motion/TypewriterText.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/TypewriterText.tsx
git commit -m "$(cat <<'EOF'
motion: add TypewriterText primitive with reduced-motion fallback

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: `GridReveal` primitive

**Files:**
- Create: `src/components/motion/GridReveal.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/GridReveal.tsx
git commit -m "$(cat <<'EOF'
motion: add GridReveal primitive (fade-in dotted-grid background)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: `FocusBracket` primitive

**Files:**
- Create: `src/components/motion/FocusBracket.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/FocusBracket.tsx
git commit -m "$(cat <<'EOF'
motion: add FocusBracket primitive (4 corner brackets on hover/focus)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: `ChipMount` primitive

**Files:**
- Create: `src/components/motion/ChipMount.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/ChipMount.tsx
git commit -m "$(cat <<'EOF'
motion: add ChipMount primitive (stagger slide-up + scale-in chips)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 13: `BuildLog` primitive

**Files:**
- Create: `src/components/motion/BuildLog.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/BuildLog.tsx
git commit -m "$(cat <<'EOF'
motion: add BuildLog primitive (sequential ✓ line reveal)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 14: `PixelPortrait` primitive

**Files:**
- Create: `src/components/motion/PixelPortrait.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
        className="absolute inset-0 grid gap-[1px]"
        style={{
          gridTemplateColumns: `repeat(${data.cols}, 1fr)`,
          gridTemplateRows: `repeat(${data.rows}, 1fr)`,
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds. Vite imports `portrait-pixels.json` directly via the JSON loader.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/PixelPortrait.tsx
git commit -m "$(cat <<'EOF'
motion: add PixelPortrait primitive with assembly + final-image crossfade

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 15: `Crosshair` primitive

**Files:**
- Create: `src/components/motion/Crosshair.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface CrosshairProps {
  /** Manual disable (default false) */
  disabled?: boolean;
  /** Min viewport width in px to render (default 1024) */
  minViewport?: number;
}

/**
 * A small gold dot + 1px tracking lines that follow the cursor.
 * Mounted once at the app root. Hidden on:
 *   - reduced-motion preference
 *   - touch / coarse pointer
 *   - viewports < `minViewport` px
 *
 * Grows when hovering elements with `data-cursor="link"` or any anchor/button.
 */
export function Crosshair({ disabled = false, minViewport = 1024 }: CrosshairProps) {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isLink, setIsLink] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (disabled || reduced || typeof window === 'undefined') return;

    const evaluate = () => {
      const fine = window.matchMedia('(pointer: fine)').matches;
      setEnabled(fine && window.innerWidth >= minViewport);
    };
    evaluate();
    window.addEventListener('resize', evaluate);
    return () => window.removeEventListener('resize', evaluate);
  }, [disabled, reduced, minViewport]);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    let next = { x: 0, y: 0 };
    let nextLink = false;

    const onMove = (e: PointerEvent) => {
      next = { x: e.clientX, y: e.clientY };
      const target = e.target as Element | null;
      nextLink = !!target?.closest(
        'a, button, [role="button"], [data-cursor="link"]',
      );
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setPos(next);
        setIsLink(nextLink);
        raf = 0;
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = isLink ? 12 : 6;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 60ms linear',
      }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[width,height,background] duration-200"
        style={{
          width: size,
          height: size,
          boxShadow: '0 0 8px hsl(45 100% 51% / 0.65)',
        }}
      />
    </div>
  );
}

export default Crosshair;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/Crosshair.tsx
git commit -m "$(cat <<'EOF'
motion: add Crosshair primitive (gold cursor follower on pointer:fine)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 16: `ScanLine` primitive

**Files:**
- Create: `src/components/motion/ScanLine.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/ScanLine.tsx
git commit -m "$(cat <<'EOF'
motion: add ScanLine primitive (single gold sweep on enter-view)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 17: `AnnotationLine` primitive

**Files:**
- Create: `src/components/motion/AnnotationLine.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/AnnotationLine.tsx
git commit -m "$(cat <<'EOF'
motion: add AnnotationLine primitive (blueprint draw-on rule + label)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 18: `SectionDivider` composed primitive

**Files:**
- Create: `src/components/motion/SectionDivider.tsx`

- [ ] **Step 1: Write the primitive**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/motion/SectionDivider.tsx
git commit -m "$(cat <<'EOF'
motion: add SectionDivider composed primitive (scan + section id label)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 3 — Section extraction

This phase extracts each section out of `src/pages/Index.tsx` into its own file under `src/sections/`. We extract one section at a time, leaving `Index.tsx` working at every step (i.e., the import still works, the section still renders). After all sections are extracted, Task 29 swaps `Index.tsx` to compose them.

**Convention for every section task:**
- The section component is the **default export**.
- Each section calls `useLocale()` itself.
- Section markup adopts the Workshop language defined in the spec.
- Original animation classes (`animate-fade-in`, `animate-slide-in-left`, `animate-scale-in`, `animate-shimmer`, `animate-float`) are removed in favor of motion primitives. Any leftover Tailwind classes still resolve via `tailwindcss-animate` so removal is safe.

**Open hot-reload reminder:** before starting Task 19, run `npm run dev` in a separate terminal so you can visually verify each extraction.

---

### Task 19: Extract `Nav.tsx` (command-bar style)

**Files:**
- Create: `src/sections/Nav.tsx`
- Modify: `src/components/LanguageSwitcher.tsx` (reskin only — same component, restyled trigger)

- [ ] **Step 1: Write the new `Nav.tsx`**

```tsx
import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { socialLinks } from '@/config/links';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useEffect, useState } from 'react';

const Nav = () => {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: { id: string; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'education', label: t.nav.education },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-colors ${
        scrolled ? 'border-b border-primary/30' : 'border-b border-transparent'
      }`}
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm" data-cursor="link">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(45_100%_51%/0.6)]" aria-hidden="true" />
          <span className="text-foreground/70">reda@portfolio</span>
          <span className="text-primary">·</span>
          <span className="text-foreground">/home</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative px-2 py-1.5 text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors group"
              data-cursor="link"
            >
              <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute left-0 top-1/2 -translate-y-1/2 text-primary transition-opacity">
                [
              </span>
              <span className="px-1">{item.label}</span>
              <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 text-primary transition-opacity">
                ]
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor="link"
          >
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor="link"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds. (`Nav.tsx` is unused yet; it must still type-check.)

- [ ] **Step 3: Commit**

```bash
git add src/sections/Nav.tsx
git commit -m "$(cat <<'EOF'
sections: extract Nav with command-bar styling

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 20: Extract `Hero.tsx` (self-assembling pixel-portrait)

**Files:**
- Create: `src/sections/Hero.tsx`

- [ ] **Step 1: Write the new `Hero.tsx`**

```tsx
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { PixelPortrait } from '@/components/motion/PixelPortrait';
import { BuildLog } from '@/components/motion/BuildLog';
import { TypewriterText } from '@/components/motion/TypewriterText';
import { GridReveal } from '@/components/motion/GridReveal';
import goldMe from '@/assets/gold_me.png';

const Hero = () => {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero" aria-labelledby="hero-heading">
      <GridReveal className="absolute inset-0" opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-8 items-center py-24">
        {/* Text */}
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm bg-card/40 border border-primary/30 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/90">
            <span className="w-1 h-1 rounded-full bg-primary" aria-hidden="true" />
            [ {t.hero.badge} ]
          </div>

          <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            {t.hero.title}
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
              {t.hero.subtitle}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" data-cursor="link">
              <Button variant="gold" size="lg" className="group font-mono">
                <span className="text-primary-foreground/80 mr-1">[</span>
                {t.hero.viewWork}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                <span className="text-primary-foreground/80 ml-1">]</span>
              </Button>
            </a>
            <a href="#contact" data-cursor="link">
              <Button variant="glass" size="lg" className="font-mono">
                <Mail className="w-4 h-4 mr-2" />
                {t.hero.getInTouch}
              </Button>
            </a>
          </div>
        </div>

        {/* Pixel Portrait */}
        <div className="md:col-span-5 order-1 md:order-2 relative">
          <div className="relative max-w-md mx-auto">
            <div className="absolute -top-3 -left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70" aria-hidden="true">
              <TypewriterText text="[ BUILDING REDA ]" speed={45} immediate />
            </div>

            <PixelPortrait
              finalImageSrc={goldMe}
              alt="Reda Doukali — Applied AI Engineer"
              duration={1600}
              delay={300}
              className="w-full"
            />

            <div className="mt-3">
              <BuildLog
                lines={['tokens loaded', 'portrait rasterized', 'profile resolved']}
                initialDelay={400}
                perLine={500}
                immediate
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Hero.tsx
git commit -m "$(cat <<'EOF'
sections: extract Hero with self-assembling PixelPortrait + BuildLog

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 21: Extract `About.tsx` (4 workshop modules)

**Files:**
- Create: `src/sections/About.tsx`

- [ ] **Step 1: Write the new `About.tsx`**

```tsx
import { Code2, Palette, Smartphone, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { socialLinks } from '@/config/links';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { GridReveal } from '@/components/motion/GridReveal';
import type { ComponentType } from 'react';

interface AboutCardProps {
  index: number;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const AboutCard = ({ index, icon: Icon, title, description }: AboutCardProps) => (
  <FocusBracket size={10}>
    <div className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 group-hover:border-primary/50 transition-colors duration-300 h-full">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70 mb-3">
        [ {String(index).padStart(2, '0')} ]
      </div>
      <Icon className="w-10 h-10 text-primary mb-4" />
      <h3 className="text-3xl font-bold font-mono mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </FocusBracket>
);

const About = () => {
  const { t } = useLocale();

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden" aria-labelledby="about-heading">
      <GridReveal className="absolute inset-0" opacity={0.2} />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.about.label} ]</span>
          </div>
          <h2 id="about-heading" className="text-5xl font-bold mb-6">
            {t.about.title}
            <span className="text-primary italic font-mono"> {t.about.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">{t.about.paragraph1}</p>
          <p className="text-lg text-muted-foreground mb-6">{t.about.paragraph2}</p>
          <p className="text-lg text-muted-foreground mb-8">{t.about.paragraph3}</p>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="link">
            <Button variant="gold" className="font-mono">
              <span className="text-primary-foreground/80 mr-1">[</span>
              {t.about.viewLinkedIn}
              <ArrowRight className="w-4 h-4 ml-1" />
              <span className="text-primary-foreground/80 ml-1">]</span>
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AboutCard index={1} icon={Code2} title={t.about.cards.aiml.title} description={t.about.cards.aiml.description} />
          <AboutCard index={2} icon={Palette} title={t.about.cards.mlops.title} description={t.about.cards.mlops.description} />
          <AboutCard index={3} icon={Smartphone} title={t.about.cards.cloud.title} description={t.about.cards.cloud.description} />
          <AboutCard index={4} icon={Sparkles} title={t.about.cards.certifications.title} description={t.about.cards.certifications.description} />
        </div>
      </div>
    </section>
  );
};

export default About;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/About.tsx
git commit -m "$(cat <<'EOF'
sections: extract About with workshop-module cards and FocusBracket

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 22: Extract `Experience.tsx`

**Files:**
- Create: `src/sections/Experience.tsx`

- [ ] **Step 1: Write the new `Experience.tsx`**

```tsx
import { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { ChipMount } from '@/components/motion/ChipMount';

const truncate = (text: string, max = 120) =>
  text.length <= max ? text : text.slice(0, max) + '...';

const Experience = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <section id="experience" className="py-20 px-6 relative" aria-labelledby="experience-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.experience.label} ]</span>
          </div>
          <h2 id="experience-heading" className="text-4xl font-bold mb-3">
            {t.experience.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.experience.description}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.experience.programs.map((program, index) => {
            const isOpen = expanded[index];
            return (
              <FocusBracket key={index} size={10}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 group-hover:border-primary/50 transition-colors duration-300 h-full">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-primary/15 border border-primary/40 text-primary">
                        {program.duration}
                      </Badge>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                        STATUS: SHIPPED
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-primary/80 text-xs font-mono italic mb-3">
                      {program.company}
                    </p>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {isOpen ? program.description : truncate(program.description, 120)}
                    </p>

                    {program.description.length > 120 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary font-mono p-0 h-auto mb-3"
                        onClick={() => toggle(index)}
                        data-cursor="link"
                      >
                        {'> '}
                        {isOpen ? t.experience.showLess : t.experience.readMore}
                        <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </Button>
                    )}

                    {isOpen && program.collaboration && (
                      <p className="text-xs text-primary/80 italic mb-3 font-mono">
                        {program.collaboration}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {program.tags.slice(0, isOpen ? program.tags.length : 3).map((tag, ti) => (
                        <ChipMount key={tag} index={ti}>
                          <Badge
                            variant="secondary"
                            className="font-mono text-[10px] uppercase tracking-wider bg-muted/50 border border-border text-foreground"
                          >
                            {tag}
                          </Badge>
                        </ChipMount>
                      ))}
                      {!isOpen && program.tags.length > 3 && (
                        <Badge variant="secondary" className="font-mono text-[10px] bg-muted/50 border border-border text-foreground">
                          +{program.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </FocusBracket>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Experience.tsx
git commit -m "$(cat <<'EOF'
sections: extract Experience with workshop ticket cards and ChipMount

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 23: Extract `Projects.tsx` (Workshop Atlas)

**Files:**
- Create: `src/sections/Projects.tsx`

- [ ] **Step 1: Write the new `Projects.tsx`**

```tsx
import { useState } from 'react';
import { Star, ArrowRight, Github, ExternalLink, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { projectLinks } from '@/config/links';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { ChipMount } from '@/components/motion/ChipMount';
import { AnnotationLine } from '@/components/motion/AnnotationLine';
import sports42Img from '@/assets/42sports.png';
import mlopsImg from '@/assets/mlopsPipe.png';
import lyraixGuardImg from '@/assets/lyraixGuard.png';
import securityBenchImg from '@/assets/securityBench.png';
import goWebImg from '@/assets/goWeb.png';
import aiMultiAgentImg from '@/assets/aiMultiAgents.png';

const truncate = (text: string, max = 100) =>
  text.length <= max ? text : text.slice(0, max) + '...';

// Order matches locale `projects.items`: 42sports, Spotify Popularity, LyraixGuard, SecEval, Go Notification, AI Support Ticket
const projectImages = [sports42Img, mlopsImg, lyraixGuardImg, securityBenchImg, goWebImg, aiMultiAgentImg];

const projectRepoLinks = [
  projectLinks.sports42,
  projectLinks.mlops,
  projectLinks.lyraixGuard,
  projectLinks.securityBenchmark,
  projectLinks.goWebService,
  projectLinks.aiMultiAgent,
];

const projectPaperLinks: (string | undefined)[] = [
  undefined,
  undefined,
  projectLinks.lyraixGuardPaper,
  undefined,
  undefined,
  undefined,
];

const Projects = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <section id="projects" className="py-20 px-6 relative bg-gradient-to-b from-background to-card/20" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.projects.label} ]</span>
          </div>
          <h2 id="projects-heading" className="text-4xl font-bold mb-3">
            {t.projects.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.projects.description}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.items.map((project, index) => {
            const isOpen = expanded[index];
            return (
              <FocusBracket key={index} size={12}>
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 group-hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={projectImages[index]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

                    {/* Blueprint annotations on hover */}
                    <div className="absolute inset-0 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <AnnotationLine label={project.category} duration={0.4} />
                      <AnnotationLine label={`${t.projects.madeFor} ${project.madeFor}`} duration={0.4} delay={0.1} />
                      {project.tags[0] && (
                        <AnnotationLine label={project.tags[0]} duration={0.4} delay={0.2} />
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-primary/30 border border-primary text-primary">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-primary/70 text-xs font-mono italic mb-3">
                      {t.projects.madeFor} {project.madeFor}
                    </p>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {isOpen ? project.description : truncate(project.description, 100)}
                    </p>

                    {project.description.length > 100 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary font-mono p-0 h-auto mb-3"
                        onClick={() => toggle(index)}
                        data-cursor="link"
                      >
                        {'> '}
                        {isOpen ? t.projects.showLess : t.projects.readMore}
                        <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </Button>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, isOpen ? project.tags.length : 3).map((tag, ti) => (
                        <ChipMount key={tag} index={ti}>
                          <Badge
                            variant="secondary"
                            className="font-mono text-[10px] uppercase tracking-wider bg-muted/50 border border-border text-foreground"
                          >
                            {tag}
                          </Badge>
                        </ChipMount>
                      ))}
                      {!isOpen && project.tags.length > 3 && (
                        <Badge variant="secondary" className="font-mono text-[10px] bg-muted/50 border border-border text-foreground">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-2">
                      <a href={projectRepoLinks[index]} target="_blank" rel="noopener noreferrer" data-cursor="link">
                        <Button variant="outline" size="sm" className="w-full font-mono border-primary/30 hover:bg-primary/10 hover:border-primary">
                          <span className="mr-1 text-primary/70">[</span>
                          <Github className="w-4 h-4 mr-2" />
                          View Repository
                          <ExternalLink className="w-3 h-3 ml-1" />
                          <span className="ml-1 text-primary/70">]</span>
                        </Button>
                      </a>
                      {projectPaperLinks[index] && (
                        <a href={projectPaperLinks[index]} target="_blank" rel="noopener noreferrer" data-cursor="link">
                          <Button variant="outline" size="sm" className="w-full font-mono border-primary/30 hover:bg-primary/10 hover:border-primary">
                            <span className="mr-1 text-primary/70">[</span>
                            <FileText className="w-4 h-4 mr-2" />
                            Read Paper
                            <ExternalLink className="w-3 h-3 ml-1" />
                            <span className="ml-1 text-primary/70">]</span>
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </FocusBracket>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Projects.tsx
git commit -m "$(cat <<'EOF'
sections: extract Projects with Workshop Atlas (annotations + chip mount)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 24: Extract `Education.tsx`

**Files:**
- Create: `src/sections/Education.tsx`

- [ ] **Step 1: Write the new `Education.tsx`**

```tsx
import { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { TypewriterText } from '@/components/motion/TypewriterText';

const truncate = (text: string, max = 160) =>
  text.length <= max ? text : text.slice(0, max) + '...';

const Education = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <section id="education" className="py-20 px-6" aria-labelledby="education-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.education.label} ]</span>
          </div>
          <h2 id="education-heading" className="text-4xl font-bold mb-3">
            {t.education.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.education.description}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {t.education.items.map((edu, index) => {
            const isOpen = expanded[index];
            return (
              <FocusBracket key={index} size={10}>
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 group-hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="text-center">
                    <h3 className="text-lg font-bold font-mono mb-2 uppercase tracking-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-primary text-sm italic font-mono mb-2">{edu.degree}</p>
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-muted/50 border border-border text-foreground">
                      {edu.duration}
                    </Badge>

                    {edu.description && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        {isOpen ? (
                          <TypewriterText text={edu.description} speed={12} />
                        ) : (
                          <p className="whitespace-pre-line">{truncate(edu.description, 160)}</p>
                        )}
                        <div className="mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggle(index)}
                            className="text-primary font-mono"
                            data-cursor="link"
                          >
                            {'> '}
                            {isOpen ? 'Show less' : 'Read more'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </FocusBracket>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Education.tsx
git commit -m "$(cat <<'EOF'
sections: extract Education with spec-plate cards and TypewriterText

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 25: Extract `Skills.tsx`

**Files:**
- Create: `src/sections/Skills.tsx`

- [ ] **Step 1: Write the new `Skills.tsx`**

```tsx
import { Star } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';
import { ChipMount } from '@/components/motion/ChipMount';
import { FocusBracket } from '@/components/motion/FocusBracket';

const Skills = () => {
  const { t } = useLocale();

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-background to-card/20" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.skills.label} ]</span>
          </div>
          <h2 id="skills-heading" className="text-4xl font-bold mb-3">
            {t.skills.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.skills.description}
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3">
          {t.skills.items.map((skill, index) => (
            <ChipMount key={skill} index={index} staggerStep={0.03}>
              <FocusBracket size={8}>
                <div className="px-5 py-2.5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-sm group-hover:border-primary/50 transition-colors">
                  <span className="text-sm font-mono uppercase tracking-wider group-hover:text-primary transition-colors">
                    {skill}
                  </span>
                </div>
              </FocusBracket>
            </ChipMount>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Skills.tsx
git commit -m "$(cat <<'EOF'
sections: extract Skills with assembling-chip board

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 26: Extract `SkillGameSection.tsx` (wrapper + data-skin)

**Files:**
- Create: `src/sections/SkillGameSection.tsx`

- [ ] **Step 1: Write the new `SkillGameSection.tsx`**

```tsx
import { Sparkles } from 'lucide-react';
import SkillGame from '@/components/SkillGame';

const SkillGameSection = () => (
  <section
    id="game"
    className="py-20 px-6"
    data-skin="workshop"
    aria-labelledby="game-heading"
  >
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
          <Sparkles className="w-4 h-4" />
          <span>[ FUN ZONE ]</span>
        </div>
        <h2 id="game-heading" className="text-4xl font-bold mb-3 font-mono">
          {'> '}SCENE 07 · MIND_READER.exe
        </h2>
      </header>

      <div className="flex justify-center">
        <SkillGame />
      </div>
    </div>
  </section>
);

export default SkillGameSection;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds. (Note: `SkillGame.tsx` itself is unchanged. The `data-skin="workshop"` attribute on the section root activates the scoped CSS rule we added in Task 3.)

- [ ] **Step 3: Commit**

```bash
git add src/sections/SkillGameSection.tsx
git commit -m "$(cat <<'EOF'
sections: extract SkillGameSection wrapper with workshop data-skin

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 27: Extract `Contact.tsx` (wiring diagram)

**Files:**
- Create: `src/sections/Contact.tsx`

- [ ] **Step 1: Write the new `Contact.tsx`**

```tsx
import { Star, Linkedin, Github, Mail, MapPin } from 'lucide-react';
import { m } from 'framer-motion';
import { useLocale } from '@/hooks/use-locale';
import { socialLinks } from '@/config/links';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useInView } from '@/hooks/use-in-view';
import type { ComponentType } from 'react';

interface NodeCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  hint: string;
  href?: string;
}

const NodeCard = ({ icon: Icon, label, hint, href }: NodeCardProps) => {
  const inner = (
    <FocusBracket size={10}>
      <div className="relative w-36 h-36 md:w-40 md:h-40 bg-card/60 backdrop-blur-md border border-primary/20 group-hover:border-primary/60 transition-colors rounded-sm flex flex-col items-center justify-center p-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary/60 absolute top-2 left-2">
          [ NODE ]
        </div>
        <div className="p-3 rounded-sm bg-primary/10 group-hover:bg-primary/20 transition-colors mb-2">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="font-mono text-sm text-foreground">{label}</div>
        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{hint}</div>
      </div>
    </FocusBracket>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="link" aria-label={label}>
      {inner}
    </a>
  ) : (
    inner
  );
};

const Contact = () => {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.2 });

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-6 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.contact.label} ]</span>
          </div>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-3">
            {t.contact.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t.contact.description}
          </p>
        </header>

        {/* Wiring diagram (md+) */}
        <div ref={ref} className="hidden md:block relative max-w-4xl mx-auto h-[28rem]">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 448"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              { d: 'M 200 100 Q 350 150 400 224' }, // top-left → core
              { d: 'M 600 100 Q 450 150 400 224' }, // top-right → core
              { d: 'M 200 348 Q 350 298 400 224' }, // bottom-left → core
              { d: 'M 600 348 Q 450 298 400 224' }, // bottom-right → core
            ].map((p, i) => (
              <m.path
                key={i}
                d={p.d}
                fill="none"
                stroke="hsl(45 100% 51%)"
                strokeWidth={1.5}
                strokeOpacity={0.4}
                strokeDasharray="4 4"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: reduced || inView ? 1 : 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 1, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }
                }
              />
            ))}
          </svg>

          <div className="absolute top-0 left-0">
            <NodeCard icon={Linkedin} label="LinkedIn" hint="connect" href={socialLinks.linkedin} />
          </div>
          <div className="absolute top-0 right-0">
            <NodeCard icon={Github} label="GitHub" hint="explore code" href={socialLinks.github} />
          </div>
          <div className="absolute bottom-0 left-0">
            <NodeCard icon={Mail} label="Email" hint="get in touch" href={`mailto:${socialLinks.email}`} />
          </div>
          <div className="absolute bottom-0 right-0">
            <NodeCard icon={MapPin} label="Location" hint={t.contact.location} />
          </div>

          {/* Core node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-20 h-20 rounded-full bg-card/80 border border-primary/40 flex items-center justify-center shadow-[0_0_30px_hsl(45_100%_51%/0.25)]">
              <span className="font-mono text-xl font-bold text-primary">RD</span>
              <div className="absolute -inset-2 rounded-full border border-primary/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Mobile fallback: vertical bus */}
        <div className="md:hidden relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-primary/30" aria-hidden="true" />
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={Linkedin} label="LinkedIn" hint="connect" href={socialLinks.linkedin} />
            </div>
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={Github} label="GitHub" hint="explore code" href={socialLinks.github} />
            </div>
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={Mail} label="Email" hint="get in touch" href={`mailto:${socialLinks.email}`} />
            </div>
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={MapPin} label="Location" hint={t.contact.location} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Contact.tsx
git commit -m "$(cat <<'EOF'
sections: extract Contact as wiring-diagram with SVG path-draw + bus mobile fallback

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 28: Extract `Footer.tsx`

**Files:**
- Create: `src/sections/Footer.tsx`

- [ ] **Step 1: Write the new `Footer.tsx`**

```tsx
import { useLocale } from '@/hooks/use-locale';

const Footer = () => {
  const { t } = useLocale();
  return (
    <footer className="py-10 px-6 border-t border-primary/20" aria-label="Site footer">
      <div className="max-w-7xl mx-auto text-center text-muted-foreground">
        <p className="font-mono text-sm mb-2">
          <span className="text-primary">{'> '}reda@portfolio:~$ </span>
          {t.footer.copyright}
          <span className="inline-block w-2 h-4 -mb-0.5 ml-1 bg-primary animate-pulse align-middle" aria-hidden="true" />
        </p>
        <p className="font-mono text-xs text-muted-foreground/70">{t.footer.tagline}</p>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Footer.tsx
git commit -m "$(cat <<'EOF'
sections: extract Footer with terminal-prompt styling

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 29: Refactor `Index.tsx` to compose sections + mount providers

**Files:**
- Modify: `src/pages/Index.tsx` (full replacement)
- Modify: `src/main.tsx` (mount `MotionProvider`)

- [ ] **Step 1: Replace `src/pages/Index.tsx` entirely**

```tsx
import Nav from '@/sections/Nav';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Education from '@/sections/Education';
import Skills from '@/sections/Skills';
import SkillGameSection from '@/sections/SkillGameSection';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import { Crosshair } from '@/components/motion/Crosshair';
import { SectionDivider } from '@/components/motion/SectionDivider';

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <Crosshair />
    <main>
      <Hero />
      <SectionDivider id="about" />
      <About />
      <SectionDivider id="experience" />
      <Experience />
      <SectionDivider id="projects" />
      <Projects />
      <SectionDivider id="education" />
      <Education />
      <SectionDivider id="skills" />
      <Skills />
      <SectionDivider id="game" />
      <SkillGameSection />
      <SectionDivider id="contact" />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
```

- [ ] **Step 2: Wrap the app with `MotionProvider` in `src/main.tsx`**

Open `src/main.tsx` and modify the render call. Whatever the current shape is, wrap the app's tree with `<MotionProvider>`. Example final state (your file may differ slightly — keep your existing `<App/>` mount; just wrap it):

```tsx
import { createRoot } from 'react-dom/client';
import { MotionProvider } from '@/components/motion/MotionProvider';
import App from './App.tsx';
import '@fontsource/jetbrains-mono/500.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <MotionProvider>
    <App />
  </MotionProvider>,
);
```

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: pass with no errors. (Watch for unused-import warnings — none should appear since we removed the entire body of `Index.tsx`.)

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: build succeeds and `dist/` is produced. Look at the output — `Index.tsx` should now be a tiny chunk.

- [ ] **Step 5: Visual smoke check**

```bash
npm run dev
```

Open `http://localhost:8080`. Walk through all sections:

- Nav: command-bar style, sticky, gold rule appears after scrolling.
- Hero: pixel-portrait assembles (~1.6s), build log types `tokens loaded → portrait rasterized → profile resolved`, photo crossfades in.
- Sections type/snap-in as you scroll.
- Each section divider shows a thin gold sweep + `[ section_id ]` label.
- Crosshair follows the cursor on desktop.
- Hover any project card: corner brackets appear; image scales 1.04; annotations type onto the image.
- Contact: 4 corner cards with SVG paths drawing to the central RD core.
- Footer: terminal prompt with blinking caret.

If any section is broken visually, fix in place before committing. Common issues:
- Missing `relative` on FocusBracket-wrapped containers (already handled by the primitive).
- Locale key mismatch (will throw at runtime — check the section file's `t.<key>` usage against `src/locales/en.json`).

- [ ] **Step 6: Commit**

```bash
git add src/pages/Index.tsx src/main.tsx
git commit -m "$(cat <<'EOF'
refactor: compose Index from sections, mount MotionProvider + Crosshair

Index.tsx shrinks from ~735 lines to ~32 lines. All section components
now own their slice of state and locale consumption. MotionProvider
wraps the app at root, Crosshair mounts globally.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Phase 4 — Polish, accessibility verification, and final hardening

### Task 30: Accessibility & reduced-motion sweep

**Files:** (verification only — no edits unless issues found)

- [ ] **Step 1: Manual focus-order check**

In the dev server, click somewhere on the page, then press Tab repeatedly through the entire page. Verify the focus order is logical: Nav links → Hero CTAs → About LinkedIn → Experience read-mores → Project repo/paper buttons → Education read-mores → Skills (none, decorative) → SkillGame buttons → Contact node cards → Footer.

If focus order is wrong in any section, the section's DOM order is wrong — fix and re-verify.

- [ ] **Step 2: Reduced-motion check (Linux/Chromium)**

In Chromium DevTools: Cmd+Shift+P → "Show Rendering" → "Emulate CSS media feature prefers-reduced-motion: reduce".

Reload the page. Verify:
- PixelPortrait shows the static photograph without assembly animation.
- BuildLog shows all 3 lines instantly.
- TypewriterText shows full strings instantly.
- ScanLine, ChipMount, AnnotationLine, GridReveal don't animate.
- Crosshair is hidden.
- All text and UI remain functional.

If any motion still plays under reduced-motion, the corresponding primitive's reduced-motion branch is broken — fix in `src/components/motion/<Primitive>.tsx`.

- [ ] **Step 3: Touch / coarse-pointer simulation**

In DevTools → Sensors → set "Touch" emulation. Reload. Verify:
- No crosshair visible.
- All hover-triggered content (FocusBracket corners on projects, AnnotationLine on project images) still has a focus-visible state when navigating with Tab.

If hover-only states are inaccessible via keyboard, those sections need a `:focus-visible` equivalent — check that `FocusBracket` shows on `group-focus-within` (it should from Task 11).

- [ ] **Step 4: ARIA / landmark check**

Open DevTools → Accessibility tree (or use the Lighthouse a11y audit). Verify:
- Nav has `role="navigation"` (implicit from `<nav>`).
- Each section has an `aria-labelledby` pointing to a real heading id.
- Decorative SVG and grid layers are `aria-hidden="true"`.
- All `<a>` and `<button>` have accessible names (visible text or `aria-label`).

- [ ] **Step 5: Commit any fixes (if needed)**

If you made fixes, commit per-fix with descriptive messages. Otherwise no commit for this task.

---

### Task 31: Mobile breakpoint sweep

**Files:** (verification only — no edits unless issues found)

- [ ] **Step 1: 375px viewport check**

In DevTools → device toolbar → set viewport to 375 × 812 (iPhone SE-ish). Walk through the page. Verify:
- Nav: language pills + icons fit; nav link list is collapsed (the desktop list is hidden via `md:flex`).
- Hero: pixel portrait stacks above text; buttons stack vertically; type doesn't overflow.
- About: 4 cards are 2×2; left column wraps.
- Experience / Projects / Education: cards stack 1 column.
- Skills: chips wrap, no overflow.
- SkillGameSection: game UI fits.
- Contact: vertical bus fallback (not the wiring diagram).
- Footer: terminal prompt readable.

- [ ] **Step 2: 768px viewport check**

Set viewport to 768 × 1024. Verify:
- Nav: desktop nav links visible.
- Projects: 2 columns.
- Contact: wiring diagram active.

- [ ] **Step 3: 1024px and 1440px viewport check**

Verify:
- Projects: 3 columns.
- Crosshair active at both sizes.
- No horizontal scroll at any width.

- [ ] **Step 4: Commit any fixes**

If you adjusted any responsive class, commit. Otherwise no commit.

---

### Task 32: Final lint, build, smoke, and lighthouse measurement

**Files:** (verification only)

- [ ] **Step 1: Lint**

```bash
npm run lint
```

Expected: pass with zero warnings/errors.

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: build succeeds. Note the bundle size in the output. Compare against the spec budget: bundle delta should be ≤ +35KB gzipped over the pre-redesign baseline.

- [ ] **Step 3: Preview the production build locally**

```bash
npm run preview
```

Open the printed URL. Walk through every section once at desktop size. Hard-reload to confirm the hero replays its assembly animation.

- [ ] **Step 4: Lighthouse measurement (Chromium)**

Open DevTools → Lighthouse panel. Run a Mobile audit on the preview URL. Targets per spec §13:
- Performance ≥ 95
- Accessibility = 100
- Best Practices ≥ 95
- SEO ≥ 90

If accessibility is below 100, inspect the failing audits — most likely a missing aria-label, contrast issue, or duplicate id. Fix and re-run.

If performance is below 95 the most common culprits are:
- Font preload `href` mismatch (Task 2) → causes FCP delay; fix the hashed filename in the preload tag.
- Pixel-portrait JSON loaded async too late → ensure it's a static import (it is, in Task 14).

- [ ] **Step 5: Acceptance criteria walkthrough**

Open `docs/superpowers/specs/2026-04-27-portfolio-2026-redesign-design.md`, scroll to §13, and confirm each of the 10 acceptance criteria is satisfied. Note any gaps in a follow-up task list.

- [ ] **Step 6: Final commit (if any fixes from Lighthouse)**

```bash
git add <files>
git commit -m "$(cat <<'EOF'
polish: address Lighthouse findings (perf/a11y)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

If no fixes were needed, skip the commit and announce: **the redesign is feature-complete and ready for review/deploy.**

---

## Self-review

- **Spec coverage:**
  - §3 design language → tokens (Task 3), font (Task 2), primitives (Tasks 9–18) ✓
  - §4 motion budget → Framer Motion only (Task 1), `LazyMotion` provider (Task 8), no GSAP/canvas/3D ✓
  - §5 architecture → Tasks 19–29 ✓
  - §6 design tokens → Task 3 (CSS vars + `bg-grid` utility) + Task 4 (Tailwind `font-mono`) ✓
  - §7 motion primitives — all 9 listed primitives + `MotionProvider` and `SectionDivider` covered (Tasks 8–18) ✓
  - §8.1 Nav → Task 19 ✓
  - §8.2 Hero → Task 20 ✓
  - §8.3 About → Task 21 ✓
  - §8.4 Experience → Task 22 ✓
  - §8.5 Projects (Workshop Atlas) → Task 23 ✓
  - §8.6 Education → Task 24 ✓
  - §8.7 Skills → Task 25 ✓
  - §8.8 SkillGameSection → Task 26 ✓
  - §8.9 Contact (wiring) → Task 27 ✓
  - §8.10 Footer → Task 28 ✓
  - §8.11 Section transitions → Task 18 (`SectionDivider`) + Task 29 (mounted in Index) ✓
  - §9.1 a11y → primitive-level reduced-motion + Task 30 sweep ✓
  - §9.2 perf → Task 32 Lighthouse + bundle target ✓
  - §9.3 browser/device → Task 31 mobile sweep ✓
  - §9.4 build pipeline → Task 7 (prebuild script) ✓
  - §13 acceptance → Task 32 Step 5 ✓

- **Placeholder scan:** All steps have concrete code blocks or exact commands. No "TBD", "TODO", "implement later", "similar to Task N" deferrals.

- **Type / name consistency:**
  - `useReducedMotion` defined Task 5; consumed by every primitive that needs it ✓
  - `useInView` defined Task 6; consumed by GridReveal (10), TypewriterText (9), BuildLog (13), ScanLine (16), AnnotationLine (17), Contact (27) ✓
  - `portrait-pixels.json` shape `{cols, rows, cells}` defined Task 7; consumed in Task 14 with matching `PortraitData` type ✓
  - `data-cursor="link"` used as a hint for the Crosshair (Task 15); applied on every interactive `<a>` and `<Button>`-wrapping anchor in section tasks ✓
  - `data-skin="workshop"` used in CSS (Task 3) and as a section attribute (Task 26) ✓
  - All section component names use default exports and are imported as default in Task 29 ✓

No gaps found. Plan is ready for execution.
