# Portfolio 2026 Redesign — Design Spec

**Status:** Draft for review
**Author:** Reda Doukali (with Claude)
**Date:** 2026-04-27
**Scope:** Full UI/UX refactor of the single-page portfolio. No copy changes, no palette changes, no routing changes.

---

## 1. Goal

Refactor the portfolio's design, animations, and interaction language to a 2026-aesthetic without altering content or color identity. The new look must feel like an *engineer's workshop coming together live* — gridded, monospace-accented, with motion that suggests construction (typewriter, snap-in, focus brackets, sketch-to-reveal).

## 2. Non-goals

- **No copy changes.** All English/German/French strings in `src/locales/*.json` stay verbatim, including positional arrays.
- **No palette changes.** Gold/black HSL tokens in `src/index.css` are preserved.
- **No routing changes.** `BrowserRouter` with `/` and `*` stays.
- **No new sections.** All current sections remain (Nav, Hero, About, Experience, Projects, Education, Skills, SkillGame, Contact, Footer).
- **No game-logic changes.** `SkillGame` keeps its current behavior; only the surrounding chrome is restyled.
- **No deploy/workflow changes.** `.github/workflows/deploy.yml` and `public/CNAME` untouched.

## 3. Design language: "Engineered Workshop"

A blueprint coming together live. Vocabulary:

- **Surface:** dark gold-on-black (existing tokens), with a faint gold dotted/lined grid backdrop on most sections.
- **Typography:** existing sans (Inter / system) for body and headlines; **JetBrains Mono** added for labels, eyebrows, status pills, and codey accents.
- **Chrome:** corner brackets `[ ]` on focus, monospace status pills (`PINNED`, `SHIPPED`, `LIVE`), command-bar nav (`reda@portfolio · /home`).
- **Motion vocabulary:** typewriter, snap-in build, focus-bracket bloom, scan-line sweep, draw-on rule, chip mount, pixel assemble, traveling line.

## 4. Motion budget — "Balanced"

- One short hero animation (self-assembly) on first load, then calm.
- Section-on-enter reveals: short, single-pass, gated `once: true`.
- Showmanship lives in **hover/focus states**, not in scroll choreography.
- **No scroll-pinning** anywhere. No GSAP. No 3D / WebGL / Canvas at runtime.
- Library: **Framer Motion** only (~30KB gzipped). All animations respect `prefers-reduced-motion`.

## 5. Architecture

### 5.1 File structure

```
src/
  index.css                                     # Workshop tokens added
  pages/Index.tsx                               # ~80 lines, composes <Section/>s
  sections/
    Nav.tsx
    Hero.tsx
    About.tsx
    Experience.tsx
    Projects.tsx
    Education.tsx
    Skills.tsx
    SkillGameSection.tsx                        # wraps existing SkillGame
    Contact.tsx
    Footer.tsx
  components/
    motion/
      TypewriterText.tsx
      GridReveal.tsx
      FocusBracket.tsx
      ChipMount.tsx
      BuildLog.tsx
      PixelPortrait.tsx
      Crosshair.tsx
      ScanLine.tsx
      AnnotationLine.tsx
    SkillGame.tsx                               # logic unchanged, restyled via tokens
    LanguageSwitcher.tsx                        # restyled to command-bar pills
    ui/                                         # shadcn primitives, unchanged
  hooks/
    use-locale.tsx                              # unchanged
    use-reduced-motion.tsx                      # NEW
    use-in-view.tsx                             # NEW (light IntersectionObserver wrapper)
  config/links.ts                               # unchanged
  locales/{en,de,fr}.json                       # unchanged (no copy edits)
  assets/portrait-pixels.json                   # NEW, generated at build time
scripts/
  build-pixel-portrait.mjs                      # NEW, runs in prebuild
```

### 5.2 Index.tsx after the refactor

Approximate shape:

```tsx
const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Nav />
    <Crosshair />               {/* mounts globally, hidden on touch */}
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <SkillGameSection />
      <Contact />
    </main>
    <Footer />
  </div>
);
```

The existing `expandedItems` state, `truncateText`, and `toggleExpand` helpers move *into* the sections that actually use them (Experience, Projects, Education).

### 5.3 Locale consumption

Each section file owns its slice via `useLocale()`. The `t` schema (typed off `typeof en`) is unchanged — only consumers move. Positional arrays (`projects`, `experiences`, `education`) keep their existing image/link parallel-array contracts (declared once in `Projects.tsx`, etc.).

## 6. Design tokens (added to `src/index.css`)

```css
:root {
  /* Existing gold/black tokens kept verbatim */

  /* NEW: Workshop language */
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
  --grid-size: 24px;
  --grid-color: hsl(45 100% 51% / 0.06);
  --bracket-color: hsl(45 100% 51%);
  --bracket-thickness: 1px;
  --bracket-size: 10px;
  --scan-color: linear-gradient(90deg, transparent, hsl(45 100% 51%), transparent);
  --scan-duration: 1.2s;
  --rule-gold: linear-gradient(90deg, hsl(45 100% 51%), transparent);
  --workshop-bg: linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 7%) 100%);

  /* Easing */
  --ease-snap: cubic-bezier(.2,.7,.2,1);
  --ease-emerge: cubic-bezier(.16,1,.3,1);
}
```

`tailwind.config.ts` extensions:
- `fontFamily.mono: ['var(--font-mono)', ...]`
- `backgroundImage.grid` → uses `--grid-color` and `--grid-size`
- `boxShadow.bracket` → focus-state shadow

JetBrains Mono is **self-hosted**: a single woff2 file (weight 500) placed in `public/fonts/jetbrains-mono-500.woff2`, declared via `@font-face` in `src/index.css` with `font-display: swap`, and preloaded in `index.html` via `<link rel="preload" as="font" type="font/woff2" crossorigin>`. No external font CDN — keeps lighthouse and offline behavior deterministic.

## 7. Motion primitives

Each lives in `src/components/motion/`. All accept `delay?: number`, `duration?: number`, `as?: ElementType`, `className?: string`, and consult `useReducedMotion()`.

| Primitive | Behavior | Reduced-motion fallback |
|---|---|---|
| `TypewriterText` | Types children once on enter-view via `useInView({ once: true, amount: 0.5 })`. Caret blinks until done. | Renders full text immediately, no caret. |
| `GridReveal` | Wraps a section. Grid bg fades in opacity 0 → 0.55 over 600ms on enter-view. Optional sector-by-sector mask. | Renders at final opacity. |
| `FocusBracket` | Wraps a child. Renders 4 absolutely-positioned `[ ]` corners that snap on hover/focus. | Static, always visible at lower opacity (0.35). |
| `ChipMount` | Tag/chip slides up `+12px → 0` and scales `0.9 → 1` on enter-view, with stagger via parent's `staggerChildren`. | Identity (final state). |
| `BuildLog` | List of strings; types each line in sequence (~120ms per line). | All lines visible. |
| `PixelPortrait` | Reads `portrait-pixels.json`, renders as a CSS grid of 1px-rounded cells. Cells animate `scale 0 → 1` with random stagger over ~1.6s. | Static portrait (all cells at scale 1, no stagger). |
| `Crosshair` | Single global element. Listens to `pointermove` (throttled via `requestAnimationFrame`); renders 6px gold dot + 1px tracking lines. Hidden on `(pointer:coarse)`, `(prefers-reduced-motion: reduce)`, and `<lg` viewports. Grows to 12px on hover-interactive elements via `data-cursor="link"`. | Not mounted. |
| `ScanLine` | A 1px gold gradient line that sweeps top-to-bottom once on enter-view. | Not rendered. |
| `AnnotationLine` | A horizontal rule with `[•───•]` end ticks; draws on enter-view (width 0 → 100%). | Static, full width. |

All primitives use `framer-motion` with `LazyMotion` + `domAnimation` feature bundle to keep payload tight.

## 8. Section specifications

### 8.1 `Nav.tsx`

- Sticky top, `bg-background/80 backdrop-blur-md`, gold rule appears at `scrollY > 8`.
- Layout: `[ • reda@portfolio · /home ]` left, `[ about ] [ experience ] [ projects ] [ education ] [ skills ] [ contact ]` center, `EN·DE·FR` pills + GitHub/LinkedIn icons right.
- Nav links use mono font, render brackets on `:focus-visible` and `:hover`.
- Mobile: collapses to a `[ ☰ ]` button that opens a full-height sheet (vaul or shadcn Sheet) with the same items in a stack.

### 8.2 `Hero.tsx`

**Layout:** Full viewport height. Two-column at `md:`, stacked on mobile.

**Left column (text):**
- Eyebrow: `[ APPLIED AI ENGINEER · 2026 ]` in mono, gold.
- Headline: existing `t.hero.title` and `t.hero.subtitle`, sans 5xl→8xl, gold gradient on subtitle preserved.
- Subhead: existing `t.hero.description`.
- CTAs: existing copy. Render as `[ ${t.hero.viewWork} → ]` (gold filled) and `[ ${t.hero.getInTouch} ]` (ghost). Same anchors.

**Right column (image area):**
- `<PixelPortrait/>` reading from `portrait-pixels.json`. Grid of ~32×40 cells. Once animation completes (~1.8s), the static portrait shows. The actual `goldMe.png` image is layered behind at 0 opacity → 1 opacity, transitioning in over 400ms once pixels resolve, so the final state is the original photograph.
- A `<BuildLog/>` overlays the bottom-left of the portrait with: `✓ tokens loaded`, `✓ portrait rasterized`, `✓ profile resolved`. Lines type sequentially during the assembly. After completion, log fades to 0.4 opacity and persists.
- A small thin progress bar above the log fills in sync with the assembly.

**Mobile:** Pixel portrait centered above text. BuildLog below it.

**Replay:** Animation runs once per page load. `sessionStorage` flag prevents replay on internal anchor jumps.

### 8.3 `About.tsx`

**Layout:** existing 2-column grid preserved.

**Left:** existing eyebrow, title (with `<em>` highlight in gold mono italic), 3 paragraphs, LinkedIn CTA. CTA restyled to `[ ${t.about.viewLinkedIn} → ]`.

**Right:** 4 stat cards in 2×2. Each card is a workshop module:
- Top-left mono label `[01]` through `[04]`
- Icon (existing Lucide icons) snaps in with a 200ms scale spark on enter-view
- The numeric value (e.g. `30+`, `5+`) becomes huge mono numerals (4xl, gold)
- Description in existing sans font
- Wrapped in `FocusBracket`; hover triggers a single `ScanLine` sweep across the card.

### 8.4 `Experience.tsx`

**Layout:** existing 3-column grid (md:2, lg:3) preserved.

Each program card becomes a workshop ticket:
- Header row: `[ ${duration} ]` chip in mono + a `STATUS: SHIPPED` mono pill, gold.
- Title (sans, bold).
- Company name in italic mono, smaller, gold-muted.
- Description with existing read-more pattern; expanded text and tags use `ChipMount` with stagger.
- "Read more" → `> read_more` mono link with a chevron.
- Card chrome: `FocusBracket`, hover scan-line.

### 8.5 `Projects.tsx`

**Layout:** existing 3-column grid (md:2, lg:3) preserved.

Each card uses the **Workshop Atlas** treatment:
- Image area (16:9): existing `projectImages[index]`. On hover/focus:
  - Image scales 1.04 with `ease-emerge` over 500ms.
  - 4 corner `FocusBracket` snap on.
  - 3 blueprint annotations type onto the image via `TypewriterText`, sourced from existing locale data only: `project.category`, `project.madeFor` (prefixed with `t.projects.madeFor`), and the first tag from `project.tags`. Annotations use `AnnotationLine` to a small label. No new locale fields are added.
- Body:
  - Title (sans bold).
  - "Made for" line preserved (italic mono, gold-muted).
  - Description with existing read-more.
  - Tag chips render via `ChipMount` with `staggerChildren: 0.04` on enter-view.
  - `[ View Repository ↗ ]` and `[ Read Paper ↗ ]` buttons (when applicable). Existing `projectRepoLinks` and `projectPaperLinks` arrays preserved.

### 8.6 `Education.tsx`

**Layout:** existing 3-column grid preserved.

Each card a "spec plate":
- `FocusBracket` corners.
- Institution name in mono caps.
- Degree in italic gold.
- Duration as a mono pill.
- Description: existing read-more pattern; description text types in once via `TypewriterText` on first reveal.
- Hover: 2° tilt via `transform: rotate3d(1, 0, 0, 2deg)` + scan-line.

### 8.7 `Skills.tsx`

**Layout:** existing fluid wrap preserved.

Skills render as `ChipMount` chips. On enter-view:
- Chips fly in from random offsets within ±20px x/y.
- Stagger 30ms per chip.
- Snap to grid cell with `ease-snap`.

Hover state per chip:
- Chip tilts toward cursor (max 6°), gains a `FocusBracket`.
- No filtering UI added — keeps it a visual moment.

### 8.8 `SkillGameSection.tsx`

- Wraps existing `SkillGame` component, **logic unchanged**.
- Section header: existing copy, plus a mono prefix like `> SCENE 07 · MIND_READER.exe` rendered above.
- Game board gets a thin gold frame and `[ INPUT ]` / `[ OUTPUT ]` mono labels around its panels.
- Buttons inside `SkillGame` get the workshop button skin (mono, brackets, gold). Implementation: the section root sets `data-skin="workshop"`, and a small scoped CSS block in `index.css` targets `[data-skin="workshop"] button` with the workshop styles. `SkillGame.tsx`'s logic and JSX stay untouched.

### 8.9 `Contact.tsx` — wiring diagram

**Layout:** A centered "core" element with 4 destination cards arranged at corners (LinkedIn, GitHub, Email, Location).

- Core: a small gold node (initials `RD` in mono gold, ringed by a faint pulsing circle).
- 4 cards (existing data): each is a spec plate (`FocusBracket`, mono label, icon, name, hover hint).
- Connection lines: a single SVG layer renders 4 paths from each card to the core. On enter-view, paths animate `pathLength: 0 → 1` over 1s with stagger.
- Hover any card: that card's path pulses with a traveling gold dot (an SVG `<circle>` animated along the path via `motion-path`).

**Mobile (`<md:`):** layout collapses to a vertical stack. The connection SVG is replaced by a single vertical 1px gold rule on the left of the card column ("the bus") with small horizontal ticks pointing to each card.

### 8.10 `Footer.tsx`

- Single line: `> reda@portfolio:~$ ${t.footer.copyright}` with a blinking gold caret at the end.
- Tagline below in muted mono.
- Existing copy preserved verbatim.

### 8.11 Section transitions

Between sections, a `<ScanLine/>` draws once on enter-view with a `[ section_id ]` micro-label in the right gutter. Implemented as a shared `<SectionDivider id="..."/>` component used between sections in `Index.tsx`.

## 9. Cross-cutting

### 9.1 Accessibility

- All motion primitives consult `useReducedMotion()`. Reduced-motion behaviors are documented per-primitive in §7.
- Focus order is DOM order; no `tabindex` games.
- Native `<a>` and `<button>` everywhere; brackets/scan-lines are decorative (`aria-hidden`).
- `:focus-visible` outline is gold and prominent — never replaced by the decorative bracket.
- `<section>` landmarks use `aria-labelledby`.
- `BuildLog` uses `aria-live="off"` (decoration only); the actual content is also rendered as static text behind it for screen readers.
- Color contrast verified AA against existing tokens.
- Crosshair is `aria-hidden` and pointer-events none.

### 9.2 Performance budget

- Bundle size delta: ≤ +35KB gzipped. Single new runtime dep: `framer-motion` (`LazyMotion` + `domAnimation`).
- Pixel-portrait is build-time JSON, ~3KB.
- All section reveals gated behind `useInView({ once: true, amount: 0.25 })`.
- Crosshair throttled via rAF; `pointermove` listener attached only when crosshair is mounted.
- Connection-line SVG: single SVG, 4 paths, animated via `pathLength`.
- Lighthouse target: ≥95 perf, 100 a11y.

### 9.3 Browser / device matrix

- Modern evergreen (Vite default).
- Verified at 375px, 768px, 1024px, 1440px breakpoints.
- Touch behavior: crosshair hidden, `:hover` states gracefully degrade to no-op (focus/visit states still trigger).

### 9.4 Build pipeline

- New devDep: none required (image-sampling script uses Node `sharp` which is acceptable as devDep, or we use a pure-JS PNG decoder; final choice in implementation).
- New `prebuild` hook in `package.json`:
  ```json
  "scripts": {
    "prebuild": "node scripts/build-pixel-portrait.mjs",
    ...
  }
  ```
- The script reads `src/assets/goldMe.png`, downsamples to ~32×40, thresholds to a binary or 3-tier intensity grid, writes `src/assets/portrait-pixels.json`. The output is committed to git (idempotent, small).
- No changes to `.github/workflows/deploy.yml`.

## 10. Risks & mitigations

| # | Risk | Mitigation |
|---|---|---|
| 1 | Framer Motion bundle creep if `<motion.*>` is used everywhere instead of via primitives | Lint or convention: sections compose primitives only; primitives are the only `motion.*` consumers. |
| 2 | Pixel-portrait fidelity at 32×40 looks too stylized | Cross-fade to the original `goldMe.png` photo once assembly resolves; pixel grid is decorative, not the final image. |
| 3 | Connection-line SVG feels busy on small viewports | Vertical "bus" fallback at `<md:` breakpoint already specified. |
| 4 | JetBrains Mono adds font-loading cost | Self-host single woff2 (weight 500), preload in `index.html`, `font-display: swap`. |
| 5 | Crosshair feels gimmicky after first session | Hidden by default on touch + reduced-motion + `<lg`. Easy `<Crosshair enabled={false}/>` switch in Index. |
| 6 | Existing inline `expandedItems` state moves and breaks | Each consuming section owns its own copy of the state and helpers. No shared state needed. |

## 11. Out of scope (explicit non-deliverables)

- No new content sections, copy edits, or locale additions.
- No SEO/meta-tag rework.
- No analytics integration.
- No dark/light mode toggle.
- No CMS migration.
- No internationalization additions (still 3 locales).
- No tests added (project has no test runner per CLAUDE.md). If implementation reveals a bug, fix in code.

## 12. Open questions deferred to implementation phase

These are deliberately not pre-decided; they're calibration choices best made with code in hand. Defaults are stated.

- **Image-sampling library:** default to `sharp` as devDep (battle-tested, fast). Fallback to a pure-JS PNG decoder if the deploy environment can't install native binaries. Either is acceptable.
- **Pixel grid resolution for `PixelPortrait`:** default 32×40. Tune ±8 cells during implementation if the silhouette is unrecognizable or too noisy.
- **Section scan-line direction:** default top-to-bottom; consider left-to-right if vertical scans feel busy when paired with the `AnnotationLine` draws.

## 13. Acceptance criteria

The redesign is complete when:

1. All 10 sections render with the Workshop+Balanced treatment described in §8.
2. All 9 motion primitives in §7 are implemented with reduced-motion fallbacks.
3. `Index.tsx` shrinks to ≤120 lines and only composes sections.
4. `npm run build` succeeds; `npm run lint` passes.
5. Lighthouse mobile run: perf ≥95, a11y 100.
6. Locale files unchanged. Positional arrays unchanged. Color tokens unchanged.
7. Site looks correct at 375px, 768px, 1024px, 1440px.
8. `prefers-reduced-motion: reduce` produces a fully usable, animation-free experience.
9. Touch-only devices show no crosshair and no hover-only-revealed content.
10. Existing functionality preserved: language switching, SkillGame logic, all anchor-nav targets, all external links.
