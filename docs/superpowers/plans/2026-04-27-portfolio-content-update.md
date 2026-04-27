# Portfolio Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition portfolio from "GenAI Engineer" to "Applied AI Engineer" with LLM Security focus; replace ft_transcendence project with LyraixGuard (HuggingFace model + Zenodo paper).

**Architecture:** Content-only update across three locale JSON files (`en.json`, `de.json`, `fr.json`) plus minimal `Index.tsx` edits to support a new "Read Paper" button. One placeholder image asset created via Python/Pillow. No architecture or routing changes.

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind, Pillow (Python) for image generation.

**Spec:** `docs/superpowers/specs/2026-04-27-portfolio-content-update-design.md`

**Note on testing:** This codebase has no test runner (per CLAUDE.md). Verification at each step uses `npm run build` (TypeScript validates that locale shapes stay in sync because `t` is typed as `typeof en`), `npm run lint`, and `npm run dev` for visual smoke tests.

---

## Task 1: Update `en.json` — non-project content

This task covers hero, about (incl. card #4 rename), experience (existing 4 + 2 new), education, skills, footer. Projects section deferred to Task 5.

**Files:**
- Modify: `src/locales/en.json`

- [ ] **Step 1: Update `hero` block**

Replace the entire `hero` object (lines ~10–17 of `en.json`) with:

```json
  "hero": {
    "badge": "Open to Applied AI / AI Security roles — EU or remote",
    "title": "Applied AI Engineer",
    "subtitle": "LLM Security · Multi-Agent Systems",
    "description": "I design LLM systems that hold up under real-world pressure — from security evaluation and jailbreak detection to multi-agent workflows that actually ship.",
    "viewWork": "View My Work",
    "getInTouch": "Get in Touch"
  },
```

- [ ] **Step 2: Update `about` paragraphs and card #4**

Replace `about.paragraph1`, `about.paragraph2`, `about.paragraph3` with:

```json
    "paragraph1": "Most LLM applications fall apart the moment they meet adversarial input. I build the ones that don't. As an Applied AI Engineer, I work where LLMs, multi-agent systems, and AI security overlap — designing systems that survive contact with reality, not just demos.",
    "paragraph2": "Over the past 18 months I've shipped a few things I'm genuinely proud of: SecEval, a model-agnostic LLM security evaluation framework built with Aleph Alpha; LyraixGuard, a jailbreak-detection model fine-tuned on Qwen3-4B with LoRA for real-time enterprise threat blocking; multi-agent support systems on LangGraph with RAG and end-to-end LangFuse tracing; and a Kubernetes-based DBaaS platform on OpenStack with full JWT/OIDC auth.",
    "paragraph3": "Before LLMs, I shipped front-end at Cegedim and spent two years training AI coding models at Outlier — which is where I figured out that prompt engineering is mostly just engineering with worse error messages. What I bring: production-grade execution, evaluation designed before deployment, and security treated as a first-class concern, not an afterthought.",
```

Update the `about.cards.certifications` block (keep the JSON key `certifications` for stability — only displayed values change):

```json
      "certifications": {
        "title": "AI Security",
        "description": "LLM Hardening"
      }
```

- [ ] **Step 3: Add 2 new entries to `experience.programs`**

Append these two objects to the end of the `experience.programs` array (after the existing "Machine Learning Engineer" entry):

```json
      ,
      {
        "title": "AI Coding Trainer",
        "duration": "2023 - 2025 · Remote Freelance",
        "company": "Outlier AI",
        "description": "Evaluated and refined AI-generated frontend code (HTML, CSS, JavaScript) by providing feedback on functionality, best practices, and code quality. Trained AI coding models through prompt engineering and response validation, testing outputs against real-world development scenarios including MCP integration and agent-based workflows.",
        "collaboration": "",
        "tags": ["Prompt Engineering", "RLHF", "MCP", "Agent Workflows", "Code Review"]
      },
      {
        "title": "Frontend Developer",
        "duration": "Apr 2021 - Jan 2022 · Remote",
        "company": "Cegedim Maroc",
        "description": "Built responsive user interfaces using HTML, CSS, and JavaScript across web platforms. Collaborated with designers and backend engineers to implement UI/UX improvements and streamline product functionality. Delivered clean, reusable code aligned with project requirements.",
        "collaboration": "",
        "tags": ["HTML", "CSS", "JavaScript", "Responsive UI", "UI/UX"]
      }
```

- [ ] **Step 4: Update `education.items[0].duration`**

Change the `42 Heilbronn` duration:

- Before: `"duration": "March 2022 - March 2024"`
- After: `"duration": "March 2022 - March 2026"`

- [ ] **Step 5: Replace `skills.items` array**

Replace the entire `skills.items` array with:

```json
    "items": [
      "Python", "JavaScript", "TypeScript", "Go", "C",
      "LLMs", "RAG", "Prompt Engineering", "AI Security", "Fine-Tuning",
      "LoRA", "Hugging Face", "Unsloth", "LangGraph", "LangChain",
      "ChromaDB", "LangFuse", "OpenRouter", "Ollama",
      "MLflow", "Dagster", "XGBoost", "Pandas", "Jupyter",
      "Machine Learning", "Vector Stores",
      "OpenStack", "Kubernetes", "Terraform", "Docker",
      "Vue.js", "FastAPI", "JWT",
      "Prometheus", "Grafana"
    ]
```

- [ ] **Step 6: Update `footer.tagline`**

- Before: `"tagline": "GenAI Engineer | Software Developer | Full-Stack Developer"`
- After: `"tagline": "Applied AI Engineer · LLM Security · Multi-Agent Systems · RAG"`

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: `built in <Xs>` and no TypeScript errors. (At this stage `de.json` and `fr.json` still have old shape — TypeScript will not flag this because the project doesn't strictly compare across locale files, only against `typeof en`.)

- [ ] **Step 8: Commit**

```bash
git add src/locales/en.json
git commit -m "$(cat <<'EOF'
content(en): reposition as Applied AI Engineer

Updates hero, about, skills, education, footer to match the AI Portfolio
positioning. Adds Outlier AI and Cegedim Maroc cards to experience.
Projects section update follows in a separate commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Mirror non-project content to `de.json`

**Files:**
- Modify: `src/locales/de.json`

- [ ] **Step 1: Update `hero` block**

```json
  "hero": {
    "badge": "Offen für Applied AI / AI-Security-Rollen — EU oder remote",
    "title": "Applied AI Engineer",
    "subtitle": "LLM-Sicherheit · Multi-Agenten-Systeme",
    "description": "Ich entwerfe LLM-Systeme, die unter realem Druck standhalten — von Security-Evaluierung und Jailbreak-Detection bis zu Multi-Agenten-Workflows, die tatsächlich in Produktion gehen.",
    "viewWork": "Meine Arbeit ansehen",
    "getInTouch": "Kontakt aufnehmen"
  },
```

- [ ] **Step 2: Update `about` paragraphs and card #4**

```json
    "paragraph1": "Die meisten LLM-Anwendungen brechen in dem Moment zusammen, in dem sie auf adversariale Eingaben treffen. Ich baue die, die das nicht tun. Als Applied AI Engineer arbeite ich an der Schnittstelle von LLMs, Multi-Agenten-Systemen und KI-Sicherheit — und entwerfe Systeme, die den Kontakt mit der Realität überleben, nicht nur Demos.",
    "paragraph2": "In den letzten 18 Monaten habe ich einige Dinge ausgeliefert, auf die ich wirklich stolz bin: SecEval, ein modellunabhängiges LLM-Security-Evaluation-Framework, gebaut mit Aleph Alpha; LyraixGuard, ein Jailbreak-Detection-Modell, mit LoRA auf Qwen3-4B feinabgestimmt für Echtzeit-Bedrohungsabwehr im Enterprise-Kontext; Multi-Agenten-Supportsysteme auf LangGraph mit RAG und durchgängigem LangFuse-Tracing; und eine Kubernetes-basierte DBaaS-Plattform auf OpenStack mit vollständiger JWT/OIDC-Authentifizierung.",
    "paragraph3": "Vor den LLMs habe ich Frontend bei Cegedim ausgeliefert und zwei Jahre AI-Coding-Modelle bei Outlier trainiert — und dort verstanden, dass Prompt Engineering vor allem Engineering mit schlechteren Fehlermeldungen ist. Was ich mitbringe: produktionsreife Umsetzung, Evaluierung schon vor dem Deployment, und Sicherheit als Anliegen erster Klasse, nicht als nachträgliche Ergänzung.",
```

```json
      "certifications": {
        "title": "KI-Sicherheit",
        "description": "LLM-Härtung"
      }
```

- [ ] **Step 3: Add 2 new entries to `experience.programs`**

Append after the "Machine Learning Ingenieur" entry:

```json
      ,
      {
        "title": "KI-Coding-Trainer",
        "duration": "2023 - 2025 · Remote Freelance",
        "company": "Outlier AI",
        "description": "Bewertete und verfeinerte KI-generierten Frontend-Code (HTML, CSS, JavaScript) durch Feedback zu Funktionalität, Best Practices und Codequalität. Trainierte KI-Coding-Modelle über Prompt Engineering und Response-Validierung, testete Ergebnisse in realen Entwicklungsszenarien einschließlich MCP-Integration und agentenbasierten Workflows.",
        "collaboration": "",
        "tags": ["Prompt Engineering", "RLHF", "MCP", "Agent Workflows", "Code Review"]
      },
      {
        "title": "Frontend-Entwickler",
        "duration": "Apr 2021 - Jan 2022 · Remote",
        "company": "Cegedim Maroc",
        "description": "Baute responsive Benutzeroberflächen mit HTML, CSS und JavaScript für Web-Plattformen. Arbeitete mit Designern und Backend-Ingenieuren an UI/UX-Verbesserungen und Produktfunktionen. Lieferte sauberen, wiederverwendbaren Code im Einklang mit den Projektanforderungen.",
        "collaboration": "",
        "tags": ["HTML", "CSS", "JavaScript", "Responsive UI", "UI/UX"]
      }
```

- [ ] **Step 4: Update `education.items[0].duration`**

- Before: `"duration": "März 2022 - März 2024"`
- After: `"duration": "März 2022 - März 2026"`

- [ ] **Step 5: Replace `skills.items` array**

Technical terms stay in English; only the previously-translated `Vektorspeicher`, `Maschinelles Lernen`, `Wissensgraph` need handling. We translate the few that already had German equivalents and keep the rest in English:

```json
      "items": [
      "Python", "JavaScript", "TypeScript", "Go", "C",
      "LLMs", "RAG", "Prompt Engineering", "KI-Sicherheit", "Fine-Tuning",
      "LoRA", "Hugging Face", "Unsloth", "LangGraph", "LangChain",
      "ChromaDB", "LangFuse", "OpenRouter", "Ollama",
      "MLflow", "Dagster", "XGBoost", "Pandas", "Jupyter",
      "Maschinelles Lernen", "Vektorspeicher",
      "OpenStack", "Kubernetes", "Terraform", "Docker",
      "Vue.js", "FastAPI", "JWT",
      "Prometheus", "Grafana"
    ]
```

- [ ] **Step 6: Update `footer.tagline`**

- Before: `"tagline": "GenAI-Ingenieur | Softwareentwickler | Full-Stack Developer"`
- After: `"tagline": "Applied AI Engineer · LLM-Sicherheit · Multi-Agenten-Systeme · RAG"`

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 8: Commit**

```bash
git add src/locales/de.json
git commit -m "$(cat <<'EOF'
content(de): mirror Applied AI Engineer repositioning

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Mirror non-project content to `fr.json`

**Files:**
- Modify: `src/locales/fr.json`

- [ ] **Step 1: Update `hero` block**

```json
  "hero": {
    "badge": "Ouvert aux postes Applied AI / AI Security — UE ou télétravail",
    "title": "Applied AI Engineer",
    "subtitle": "Sécurité LLM · Systèmes Multi-Agents",
    "description": "Je conçois des systèmes LLM qui tiennent face à la pression du monde réel — de l'évaluation sécurité et la détection de jailbreak aux workflows multi-agents qui passent en production.",
    "viewWork": "Voir mon travail",
    "getInTouch": "Me contacter"
  },
```

- [ ] **Step 2: Update `about` paragraphs and card #4**

```json
    "paragraph1": "La plupart des applications LLM s'effondrent dès qu'elles rencontrent une entrée adversariale. Je construis celles qui tiennent. En tant qu'Applied AI Engineer, je travaille à l'intersection des LLMs, des systèmes multi-agents et de la sécurité IA — en concevant des systèmes qui survivent au contact de la réalité, et pas seulement à des démos.",
    "paragraph2": "Au cours des 18 derniers mois, j'ai livré quelques projets dont je suis vraiment fier : SecEval, un framework d'évaluation de sécurité LLM agnostique au modèle, construit avec Aleph Alpha ; LyraixGuard, un modèle de détection de jailbreak fine-tuné sur Qwen3-4B avec LoRA pour le blocage de menaces en temps réel en entreprise ; des systèmes de support multi-agents sur LangGraph avec RAG et tracing LangFuse de bout en bout ; et une plateforme DBaaS basée sur Kubernetes sur OpenStack avec authentification JWT/OIDC complète.",
    "paragraph3": "Avant les LLMs, j'ai livré du front-end chez Cegedim et passé deux ans à entraîner des modèles de coding IA chez Outlier — où j'ai compris que le prompt engineering, c'est surtout de l'ingénierie avec des messages d'erreur en moins. Ce que j'apporte : exécution de niveau production, évaluation pensée avant le déploiement, et sécurité traitée comme une préoccupation de premier rang, pas une réflexion après coup.",
```

```json
      "certifications": {
        "title": "Sécurité IA",
        "description": "Renforcement LLM"
      }
```

- [ ] **Step 3: Add 2 new entries to `experience.programs`**

Append after the "Ingénieur Machine Learning" entry:

```json
      ,
      {
        "title": "Formateur IA Coding",
        "duration": "2023 - 2025 · Freelance Remote",
        "company": "Outlier AI",
        "description": "Évaluation et amélioration de code frontend généré par IA (HTML, CSS, JavaScript) en fournissant un retour sur la fonctionnalité, les bonnes pratiques et la qualité du code. Entraînement de modèles de coding IA via prompt engineering et validation de réponses, testant les sorties sur des scénarios de développement réels incluant l'intégration MCP et les workflows agentiques.",
        "collaboration": "",
        "tags": ["Prompt Engineering", "RLHF", "MCP", "Agent Workflows", "Code Review"]
      },
      {
        "title": "Développeur Frontend",
        "duration": "Avr 2021 - Jan 2022 · Remote",
        "company": "Cegedim Maroc",
        "description": "Construction d'interfaces utilisateur réactives en HTML, CSS et JavaScript pour différentes plateformes web. Collaboration avec designers et ingénieurs backend pour mettre en œuvre des améliorations UI/UX et fluidifier les fonctionnalités produit. Livraison de code propre et réutilisable, aligné avec les exigences projet.",
        "collaboration": "",
        "tags": ["HTML", "CSS", "JavaScript", "Responsive UI", "UI/UX"]
      }
```

- [ ] **Step 4: Update `education.items[0].duration`**

- Before: `"duration": "Mars 2022 - Mars 2024"`
- After: `"duration": "Mars 2022 - Mars 2026"`

- [ ] **Step 5: Replace `skills.items` array**

```json
    "items": [
      "Python", "JavaScript", "TypeScript", "Go", "C",
      "LLMs", "RAG", "Prompt Engineering", "Sécurité IA", "Fine-Tuning",
      "LoRA", "Hugging Face", "Unsloth", "LangGraph", "LangChain",
      "ChromaDB", "LangFuse", "OpenRouter", "Ollama",
      "MLflow", "Dagster", "XGBoost", "Pandas", "Jupyter",
      "Apprentissage automatique", "Bases de vecteurs",
      "OpenStack", "Kubernetes", "Terraform", "Docker",
      "Vue.js", "FastAPI", "JWT",
      "Prometheus", "Grafana"
    ]
```

- [ ] **Step 6: Update `footer.tagline`**

- Before: `"tagline": "Ingénieur GenAI | Développeur Logiciel | Full-Stack Developer"`
- After: `"tagline": "Applied AI Engineer · Sécurité LLM · Systèmes Multi-Agents · RAG"`

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 8: Commit**

```bash
git add src/locales/fr.json
git commit -m "$(cat <<'EOF'
content(fr): mirror Applied AI Engineer repositioning

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Generate `lyraixGuard.png` placeholder image

**Files:**
- Create: `scripts/generate_lyraix_placeholder.py` (one-off; deleted after use)
- Create: `src/assets/lyraixGuard.png`

- [ ] **Step 1: Verify Pillow is available**

Run: `python3 -c "from PIL import Image; print(Image.__version__)"`
Expected: a version string (e.g. `10.2.0`). If it fails, run `pip install --user Pillow` first.

- [ ] **Step 2: Create the generator script**

Create `scripts/generate_lyraix_placeholder.py` with this content:

```python
"""One-off placeholder generator for LyraixGuard project card.

Produces a 1280x720 PNG matching the dark gold-on-black portfolio theme.
After running, delete this file and the PNG it produces will live at
src/assets/lyraixGuard.png.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

WIDTH, HEIGHT = 1280, 720
BG = (18, 18, 18)            # near-black, matches --background
GOLD = (255, 193, 7)         # gold, matches --primary
GOLD_DIM = (180, 136, 5)
TEXT = (240, 240, 240)
MUTED = (160, 160, 160)

OUT_PATH = Path(__file__).resolve().parent.parent / "src" / "assets" / "lyraixGuard.png"

def load_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()

def load_font_regular(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()

def main() -> None:
    img = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(img)

    # Subtle gold gradient corner glows
    for r in range(400, 0, -20):
        alpha = int(20 * (r / 400))
        draw.ellipse(
            [(-r, -r), (r, r)],
            fill=(BG[0] + alpha // 4, BG[1] + alpha // 5, BG[2]),
        )
        draw.ellipse(
            [(WIDTH - r, HEIGHT - r), (WIDTH + r, HEIGHT + r)],
            fill=(BG[0] + alpha // 4, BG[1] + alpha // 5, BG[2]),
        )

    # Shield outline at upper-left of text block
    cx, cy = WIDTH // 2, HEIGHT // 2 - 100
    shield_w, shield_h = 120, 140
    points = [
        (cx - shield_w // 2, cy - shield_h // 2),
        (cx + shield_w // 2, cy - shield_h // 2),
        (cx + shield_w // 2, cy + 10),
        (cx, cy + shield_h // 2),
        (cx - shield_w // 2, cy + 10),
    ]
    draw.polygon(points, outline=GOLD, width=4)
    # Checkmark inside shield
    draw.line([(cx - 30, cy), (cx - 5, cy + 25), (cx + 35, cy - 25)], fill=GOLD, width=6)

    # Title
    title_font = load_font(96)
    subtitle_font = load_font_regular(36)
    stat_font = load_font(64)
    caption_font = load_font_regular(28)

    title = "LyraixGuard"
    bbox = draw.textbbox((0, 0), title, font=title_font)
    tw = bbox[2] - bbox[0]
    draw.text(((WIDTH - tw) // 2, cy + shield_h // 2 + 30), title, font=title_font, fill=GOLD)

    subtitle = "LLM Security Classifier"
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    sw = bbox[2] - bbox[0]
    draw.text(((WIDTH - sw) // 2, cy + shield_h // 2 + 145), subtitle, font=subtitle_font, fill=TEXT)

    meta = "Qwen3-4B  ·  LoRA Fine-Tune  ·  Bilingual EN/DE"
    bbox = draw.textbbox((0, 0), meta, font=caption_font)
    mw = bbox[2] - bbox[0]
    draw.text(((WIDTH - mw) // 2, cy + shield_h // 2 + 200), meta, font=caption_font, fill=MUTED)

    stat = "99.8% accuracy"
    bbox = draw.textbbox((0, 0), stat, font=stat_font)
    stw = bbox[2] - bbox[0]
    draw.text(((WIDTH - stw) // 2, cy + shield_h // 2 + 260), stat, font=stat_font, fill=GOLD_DIM)

    # Frame
    draw.rectangle([(20, 20), (WIDTH - 20, HEIGHT - 20)], outline=GOLD, width=2)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT_PATH, "PNG", optimize=True)
    print(f"Wrote {OUT_PATH}")

if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Run the generator**

Run: `python3 scripts/generate_lyraix_placeholder.py`
Expected: prints `Wrote .../src/assets/lyraixGuard.png` and the file exists.

- [ ] **Step 4: Verify the image**

Run: `file src/assets/lyraixGuard.png`
Expected: `PNG image data, 1280 x 720, 8-bit/color RGB, non-interlaced`.

- [ ] **Step 5: Delete the generator script**

The script was a one-off — removing keeps the repo tidy.

Run: `rm scripts/generate_lyraix_placeholder.py && rmdir scripts 2>/dev/null || true`

- [ ] **Step 6: Commit**

```bash
git add src/assets/lyraixGuard.png
git commit -m "$(cat <<'EOF'
assets: add LyraixGuard placeholder card image

Generated dark gold-on-black placeholder matching portfolio theme.
Replaces ft_transcendence (Web Game) slot in projects grid.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Refactor projects section atomically

This is the largest task — it touches `links.ts`, `Index.tsx`, and `en.json` in one commit so the projects section remains internally consistent at every step. (The DE/FR project copy follows in Task 6; until then those locales will show English project copy, which is acceptable since technical project names are English anyway.)

**Files:**
- Modify: `src/config/links.ts`
- Modify: `src/pages/Index.tsx`
- Modify: `src/locales/en.json`

- [ ] **Step 1: Update `src/config/links.ts`**

Replace the `projectLinks` object (lines 14–22):

Before:
```ts
export const projectLinks = {
  // Add project repository or demo URLs here
  sports42: "https://github.com/rdoukali42/42sports", // Update with actual URL
  mlops: "https://github.com/rdoukali42/Mlops_Level3_chanlenge", // Update with actual URL
  webGame: "https://github.com/rdoukali42/ft_transcendence", // Update with actual URL
  securityBenchmark: "https://github.com/rdoukali42/level3.sevEval", // Update with actual URL
  goWebService: "https://github.com/rdoukali42/STACKIT_Challenge", // Update with actual URL
  aiMultiAgent: "https://github.com/rdoukali42/Network_LLMs", // Update with actual URL
} as const;
```

After:
```ts
export const projectLinks = {
  sports42: "https://github.com/rdoukali42/42sports",
  mlops: "https://github.com/rdoukali42/Mlops_Level3_chanlenge",
  lyraixGuard: "https://huggingface.co/Lyraix-AI/LyraixGuard-v0",
  lyraixGuardPaper: "https://zenodo.org/records/19827438",
  securityBenchmark: "https://github.com/rdoukali42/level3.sevEval",
  goWebService: "https://github.com/rdoukali42/STACKIT_Challenge",
  aiMultiAgent: "https://github.com/rdoukali42/Network_LLMs",
} as const;
```

- [ ] **Step 2: Update imports in `Index.tsx`**

In `src/pages/Index.tsx`, two import-line changes:

(a) Add `FileText` to the lucide-react import block (around lines 10–22). Insert `FileText,` near the other icon imports so the block becomes:

```tsx
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Smartphone,
  ArrowRight,
  Send,
  Star,
  Sparkles,
  FileText
} from "lucide-react";
```

(b) Replace the `webGameImg` import (line 27):

- Before: `import webGameImg from "@/assets/webGame.png";`
- After: `import lyraixGuardImg from "@/assets/lyraixGuard.png";`

- [ ] **Step 3: Update `projectImages` array in `Index.tsx`**

Locate `projectImages` (around line 56). Replace `webGameImg` with `lyraixGuardImg` and update the comment:

Before:
```tsx
  // Image mappings for projects (matches order in locale files)
  // Order: 42sports, MLOps Pipeline, Web Game, Security Benchmark, Go Web Service, AI Multi-Agent
  const projectImages = [sports42Img, mlopsImg, webGameImg, securityBenchImg, goWebImg, aiMultiAgentImg];
```

After:
```tsx
  // Image mappings for projects (matches order in locale files)
  // Order: 42sports, Spotify Popularity, LyraixGuard, SecEval, Go Notification, AI Support Ticket
  const projectImages = [sports42Img, mlopsImg, lyraixGuardImg, securityBenchImg, goWebImg, aiMultiAgentImg];
```

- [ ] **Step 4: Update `projectRepoLinks` array in `Index.tsx`**

Locate the array (around lines 59–66). Replace `projectLinks.webGame` with `projectLinks.lyraixGuard`:

```tsx
  const projectRepoLinks = [
    projectLinks.sports42,
    projectLinks.mlops,
    projectLinks.lyraixGuard,
    projectLinks.securityBenchmark,
    projectLinks.goWebService,
    projectLinks.aiMultiAgent
  ];
```

- [ ] **Step 5: Add `projectPaperLinks` array in `Index.tsx`**

Immediately below `projectRepoLinks` (after line 66), add:

```tsx
  // Optional paper/research links — only LyraixGuard has one for now
  const projectPaperLinks: (string | undefined)[] = [
    undefined,                       // 42sports
    undefined,                       // Spotify Popularity Prediction
    projectLinks.lyraixGuardPaper,   // LyraixGuard
    undefined,                       // SecEval
    undefined,                       // Go Notification Gateway
    undefined,                       // AI Support Ticket System
  ];
```

- [ ] **Step 6: Replace single-button block with dual-button block**

Locate the existing single-button block (`Index.tsx` lines 390–396 — the `<a href={projectRepoLinks[index]}>` wrapper around the `View Repository` button).

Before:
```tsx
                    <a href={projectRepoLinks[index]} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" size="sm" className="w-full group/btn border-primary/30 hover:bg-primary/10 hover:border-primary">
                        <Github className="w-4 h-4" />
                        View Repository
                        <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Button>
                    </a>
```

After:
```tsx
                    <div className="flex flex-col gap-2">
                      <a href={projectRepoLinks[index]} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="outline" size="sm" className="w-full group/btn border-primary/30 hover:bg-primary/10 hover:border-primary">
                          <Github className="w-4 h-4" />
                          View Repository
                          <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Button>
                      </a>
                      {projectPaperLinks[index] && (
                        <a href={projectPaperLinks[index]} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="outline" size="sm" className="w-full group/btn border-primary/30 hover:bg-primary/10 hover:border-primary">
                            <FileText className="w-4 h-4" />
                            Read Paper
                            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Button>
                        </a>
                      )}
                    </div>
```

- [ ] **Step 7: Update hero `<img>` alt text**

Locate the hero portrait image (around line 161 of `Index.tsx`):

- Before: `alt="Reda Doukali - AI Engineer"`
- After: `alt="Reda Doukali - Applied AI Engineer"`

- [ ] **Step 8: Update `projects.items` in `en.json`**

Replace the entire `projects.items` array with the 6 new entries below. (Order matters: indices must match `projectImages` and `projectRepoLinks`.)

```json
    "items": [
      {
        "title": "42sports",
        "category": "Full-Stack Web Application",
        "description": "A full-stack web application built for managing sports tournaments and player statistics. It allows users to create, join, and follow sports events with real-time updates and interactive leaderboards.",
        "madeFor": "42 Hackathon",
        "tags": ["Flutter", "Dart", "Android SDK"]
      },
      {
        "title": "Spotify Popularity Prediction",
        "category": "Full-Stack ML App",
        "description": "Predicts whether a Spotify track is likely to be popular and ships as a usable web product. End-to-end preprocessing pipeline with consistent categorical handling between training and inference, class-imbalance handling via weighted training, interactive prediction UI with auto-fill sanity checks, and deployment as a containerized model service on Cloud Run with the frontend on Firebase Hosting.",
        "madeFor": "Arkadia",
        "tags": ["Python", "MLflow", "Dagster", "LakeFS", "XGBoost", "Firebase", "Cloud Run"]
      },
      {
        "title": "LyraixGuard",
        "category": "LLM Security · Fine-Tuning",
        "description": "An enterprise AI security classifier that acts as a gatekeeper between users and LLM systems, classifying messages as Safe / Unsafe / Controversial across 13 attack categories (prompt injection, agent hijacking, RAG exfiltration, credential theft, and more). LoRA fine-tune of Qwen3-4B (66M trainable params, 1.62%) on a 120k-sample bilingual EN/DE dataset. Introduces \"intended-output reasoning\" — a training methodology where the model learns to reconstruct what the target AI would produce, then classifies safety from the reconstructed output. Achieves 99.8% accuracy in no-think mode, 97.0% recall on Lakera Gandalf, and 0.940 F1 on SafeGuard-PI — outperforming LlamaGuard, ShieldGemma, and AprielGuard.",
        "madeFor": "Lyraix (Independent Research)",
        "tags": ["Qwen3", "LoRA", "Unsloth", "Hugging Face", "Fine-Tuning", "LLM Security", "CoT"]
      },
      {
        "title": "SecEval",
        "category": "LLM Security Evaluation",
        "description": "A model-agnostic LLM security evaluation framework for jailbreak, prompt injection, and unsafe-output benchmarking. Runs models remotely via OpenRouter or locally via Ollama, integrates safety-focused classifiers, enforces structured result formats for output consistency, and produces engineering-friendly graphic CLI reports with full reproducibility (timeouts, retries, predictable evaluation artifacts).",
        "madeFor": "Aleph Alpha",
        "tags": ["Python", "OpenRouter", "Ollama", "Hugging Face", "LLM Evaluation", "Security"]
      },
      {
        "title": "Go Notification Gateway",
        "category": "Notification Service",
        "description": "A Go web service that receives notifications via HTTP POST, validates them, and forwards 'Warning' type notifications to Google Chat. Features REST API validation, in-memory storage, filtering logic, and health check endpoints.",
        "madeFor": "STACKIT",
        "tags": ["Go", "REST API", "Google Chat", "HTTP", "Webhooks"]
      },
      {
        "title": "AI Support Ticket System",
        "category": "Multi-Agent · RAG",
        "description": "Resolves support issues automatically when documentation exists (via RAG) and escalates to the right human expert when it doesn't. LangGraph-orchestrated agents handle routing, retrieval, escalation, and voice-call workflows, with strict handoff contracts to prevent state drift and end-to-end tracing via LangFuse. Streamlit UI provides auth, ticket lifecycle tracking, and operational visibility.",
        "madeFor": "Arkadia",
        "tags": ["LangChain", "LangGraph", "Gemini", "RAG", "ChromaDB", "LangFuse", "Streamlit"]
      }
    ]
```

- [ ] **Step 9: Verify build**

Run: `npm run build`
Expected: builds successfully with no TypeScript errors.

- [ ] **Step 10: Verify lint**

Run: `npm run lint`
Expected: no new warnings or errors introduced. Pre-existing warnings unrelated to these files are acceptable.

- [ ] **Step 11: Commit**

```bash
git add src/config/links.ts src/pages/Index.tsx src/locales/en.json
git commit -m "$(cat <<'EOF'
projects: replace ft_transcendence with LyraixGuard

Swaps the Web Game project for LyraixGuard (LLM Security Classifier),
adds a "Read Paper" button linking to the Zenodo arXiv mirror, and
updates en.json with sharper AI-portfolio-style copy for the renamed
projects (Spotify, SecEval, AI Support Ticket System).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Mirror project copy to `de.json` and `fr.json`

**Files:**
- Modify: `src/locales/de.json`
- Modify: `src/locales/fr.json`

- [ ] **Step 1: Replace `projects.items` in `de.json`**

Same array shape as `en.json`; technical terms (Hugging Face, LoRA, Qwen3, etc.) stay in English; descriptive prose translates.

```json
    "items": [
      {
        "title": "42sports",
        "category": "Full-Stack-Webanwendung",
        "description": "Eine Full-Stack-Webanwendung zur Verwaltung von Sportturnieren und Spielerstatistiken. Sie ermöglicht es Benutzern, Sportveranstaltungen zu erstellen, beizutreten und zu verfolgen, mit Echtzeit-Updates und interaktiven Bestenlisten.",
        "madeFor": "42 Hackathon",
        "tags": ["Flutter", "Dart", "Android SDK"]
      },
      {
        "title": "Spotify Popularity Prediction",
        "category": "Full-Stack ML App",
        "description": "Sagt voraus, ob ein Spotify-Track wahrscheinlich beliebt wird, und liefert das Ganze als nutzbares Web-Produkt aus. End-to-End-Preprocessing-Pipeline mit konsistenter Kategorienbehandlung zwischen Training und Inferenz, Behandlung von Klassenungleichgewicht über gewichtetes Training, interaktive Prediction-UI mit Auto-Fill-Sanity-Checks und Deployment als containerisierter Modellservice auf Cloud Run mit Frontend auf Firebase Hosting.",
        "madeFor": "Arkadia",
        "tags": ["Python", "MLflow", "Dagster", "LakeFS", "XGBoost", "Firebase", "Cloud Run"]
      },
      {
        "title": "LyraixGuard",
        "category": "LLM-Sicherheit · Fine-Tuning",
        "description": "Ein Enterprise-KI-Sicherheitsklassifikator, der als Gatekeeper zwischen Nutzern und LLM-Systemen fungiert und Nachrichten als Safe / Unsafe / Controversial über 13 Angriffskategorien klassifiziert (Prompt Injection, Agent Hijacking, RAG-Datenexfiltration, Credential Theft und mehr). LoRA-Fine-Tune von Qwen3-4B (66M trainierbare Parameter, 1,62 %) auf einem zweisprachigen EN/DE-Datensatz mit 120k Samples. Führt \"Intended-Output Reasoning\" ein — eine Trainingsmethodik, bei der das Modell rekonstruiert, was die Ziel-KI ausgeben würde, und dann die Sicherheit aus dieser rekonstruierten Ausgabe klassifiziert. Erreicht 99,8 % Accuracy im No-Think-Modus, 97,0 % Recall auf Lakera Gandalf und 0,940 F1 auf SafeGuard-PI — und übertrifft LlamaGuard, ShieldGemma und AprielGuard.",
        "madeFor": "Lyraix (Independent Research)",
        "tags": ["Qwen3", "LoRA", "Unsloth", "Hugging Face", "Fine-Tuning", "LLM Security", "CoT"]
      },
      {
        "title": "SecEval",
        "category": "LLM-Sicherheitsevaluierung",
        "description": "Ein modellunabhängiges LLM-Security-Evaluation-Framework für Jailbreak-, Prompt-Injection- und Unsafe-Output-Benchmarking. Führt Modelle remote über OpenRouter oder lokal über Ollama aus, integriert sicherheitsfokussierte Klassifikatoren, erzwingt strukturierte Ergebnisformate für konsistente Ausgaben und produziert engineering-freundliche grafische CLI-Reports mit voller Reproduzierbarkeit (Timeouts, Retries, vorhersehbare Evaluation-Artefakte).",
        "madeFor": "Aleph Alpha",
        "tags": ["Python", "OpenRouter", "Ollama", "Hugging Face", "LLM Evaluation", "Security"]
      },
      {
        "title": "Go Notification Gateway",
        "category": "Benachrichtigungs-Gateway",
        "description": "Ein Go-Webservice, der Benachrichtigungen per HTTP POST empfängt, validiert und 'Warning'-Benachrichtigungen an Google Chat weiterleitet. Bietet REST-API-Validierung, In-Memory-Speicherung, Filterlogik und Health-Check-Endpunkte.",
        "madeFor": "STACKIT",
        "tags": ["Go", "REST API", "Google Chat", "HTTP", "Webhooks"]
      },
      {
        "title": "AI Support Ticket System",
        "category": "Multi-Agent · RAG",
        "description": "Löst Support-Anfragen automatisch, wenn Dokumentation existiert (via RAG), und eskaliert an den richtigen menschlichen Experten, wenn nicht. LangGraph-orchestrierte Agenten übernehmen Routing, Retrieval, Eskalation und Voice-Call-Workflows; strikte Handoff-Verträge verhindern State Drift, durchgängiges Tracing erfolgt über LangFuse. Streamlit-UI bietet Auth, Ticket-Lifecycle-Tracking und Betriebs-Sichtbarkeit.",
        "madeFor": "Arkadia",
        "tags": ["LangChain", "LangGraph", "Gemini", "RAG", "ChromaDB", "LangFuse", "Streamlit"]
      }
    ]
```

- [ ] **Step 2: Replace `projects.items` in `fr.json`**

```json
    "items": [
      {
        "title": "42sports",
        "category": "Application Web Full-Stack",
        "description": "Une application web full-stack construite pour gérer les tournois sportifs et les statistiques des joueurs. Elle permet aux utilisateurs de créer, rejoindre et suivre des événements sportifs avec des mises à jour en temps réel et des classements interactifs.",
        "madeFor": "42 Hackathon",
        "tags": ["Flutter", "Dart", "Android SDK"]
      },
      {
        "title": "Spotify Popularity Prediction",
        "category": "Full-Stack ML App",
        "description": "Prédit si un morceau Spotify a des chances d'être populaire, et le livre comme un vrai produit web. Pipeline de prétraitement de bout en bout avec gestion cohérente des catégories entre l'entraînement et l'inférence, gestion du déséquilibre de classes via entraînement pondéré, UI de prédiction interactive avec auto-fill pour les sanity-checks, et déploiement en tant que service de modèle conteneurisé sur Cloud Run avec frontend sur Firebase Hosting.",
        "madeFor": "Arkadia",
        "tags": ["Python", "MLflow", "Dagster", "LakeFS", "XGBoost", "Firebase", "Cloud Run"]
      },
      {
        "title": "LyraixGuard",
        "category": "Sécurité LLM · Fine-Tuning",
        "description": "Un classificateur de sécurité IA d'entreprise qui agit comme gardien entre les utilisateurs et les systèmes LLM, classifiant les messages en Safe / Unsafe / Controversial sur 13 catégories d'attaque (prompt injection, agent hijacking, exfiltration RAG, vol de credentials, et plus). Fine-tune LoRA de Qwen3-4B (66M paramètres entraînables, 1,62 %) sur un dataset bilingue EN/DE de 120k échantillons. Introduit l'\"intended-output reasoning\" — une méthodologie d'entraînement où le modèle apprend à reconstruire ce que l'IA cible produirait, puis classifie la sécurité à partir de cette sortie reconstruite. Atteint 99,8 % de précision en no-think mode, 97,0 % de recall sur Lakera Gandalf, et 0,940 F1 sur SafeGuard-PI — surpassant LlamaGuard, ShieldGemma et AprielGuard.",
        "madeFor": "Lyraix (Independent Research)",
        "tags": ["Qwen3", "LoRA", "Unsloth", "Hugging Face", "Fine-Tuning", "LLM Security", "CoT"]
      },
      {
        "title": "SecEval",
        "category": "Évaluation Sécurité LLM",
        "description": "Un framework d'évaluation de sécurité LLM agnostique au modèle, pour le benchmarking de jailbreak, prompt injection et sorties non sûres. Exécute les modèles à distance via OpenRouter ou en local via Ollama, intègre des classificateurs orientés sécurité, impose des formats de résultats structurés pour la cohérence des sorties, et produit des rapports CLI graphiques pensés pour les ingénieurs avec une reproductibilité totale (timeouts, retries, artefacts d'évaluation prévisibles).",
        "madeFor": "Aleph Alpha",
        "tags": ["Python", "OpenRouter", "Ollama", "Hugging Face", "LLM Evaluation", "Security"]
      },
      {
        "title": "Go Notification Gateway",
        "category": "Passerelle de notifications",
        "description": "Un service web Go qui reçoit des notifications via HTTP POST, les valide et transfère les notifications de type 'Warning' vers Google Chat. Comprend la validation API REST, le stockage en mémoire, la logique de filtrage et les points de contrôle de santé.",
        "madeFor": "STACKIT",
        "tags": ["Go", "REST API", "Google Chat", "HTTP", "Webhooks"]
      },
      {
        "title": "AI Support Ticket System",
        "category": "Multi-Agent · RAG",
        "description": "Résout les demandes de support automatiquement quand la documentation existe (via RAG) et escalade vers le bon expert humain quand elle n'existe pas. Des agents orchestrés par LangGraph gèrent le routage, le retrieval, l'escalade et les workflows d'appels vocaux, avec des contrats de handoff stricts pour éviter la dérive d'état et un tracing de bout en bout via LangFuse. UI Streamlit pour l'authentification, le suivi du cycle de vie des tickets et la visibilité opérationnelle.",
        "madeFor": "Arkadia",
        "tags": ["LangChain", "LangGraph", "Gemini", "RAG", "ChromaDB", "LangFuse", "Streamlit"]
      }
    ]
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 4: Commit**

```bash
git add src/locales/de.json src/locales/fr.json
git commit -m "$(cat <<'EOF'
content(de,fr): mirror project copy with LyraixGuard entry

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Final verification

**Files:** none modified — this task is verification only.

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: clean build, `dist/` produced.

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: no new errors. (Pre-existing warnings unrelated to this work are acceptable.)

- [ ] **Step 3: Start the dev server in the background and visually verify**

Run: `npm run dev`
Open: `http://localhost:8080`

Visual checklist (walk through each):
- [ ] Hero shows `Applied AI Engineer` (line 1) and `LLM Security · Multi-Agent Systems` (gradient line 2).
- [ ] Hero badge reads `Open to Applied AI / AI Security roles — EU or remote`.
- [ ] About card #4 (bottom-right of the 2×2 grid) shows `AI Security` / `LLM Hardening`.
- [ ] Experience section shows 6 cards: 4 Arkadia + Outlier AI + Cegedim Maroc.
- [ ] Projects section shows 6 cards in order: 42sports, Spotify Popularity Prediction, **LyraixGuard**, SecEval, Go Notification Gateway, AI Support Ticket System.
- [ ] LyraixGuard card displays the new placeholder image and **two buttons** stacked vertically (`View Repository` + `Read Paper`).
- [ ] Other 5 project cards show **only the View Repository button**.
- [ ] Clicking `Read Paper` on LyraixGuard opens `https://zenodo.org/records/19827438` in a new tab.
- [ ] Clicking `View Repository` on LyraixGuard opens the Hugging Face model page.
- [ ] Education card #1 shows `March 2022 - March 2026`.
- [ ] Skills section includes `AI Security`, `LoRA`, `Fine-Tuning`, `Hugging Face`; does NOT include `Knowledge Graph`.
- [ ] Footer tagline reads `Applied AI Engineer · LLM Security · Multi-Agent Systems · RAG`.

- [ ] **Step 4: Switch language and verify**

In the navbar, switch to **Deutsch** and re-check the same items render in German with no missing/empty strings. Switch to **Français** and repeat. Switch back to English.

- [ ] **Step 5: Stop dev server and confirm git status is clean**

Run: `git status`
Expected: `nothing to commit, working tree clean`.

Run: `git log --oneline -10`
Expected: at least 6 new commits from Tasks 1, 2, 3, 4, 5, 6 (in that order).

- [ ] **Step 6: Done — no commit for this task**

This task is verification-only; no files changed.
