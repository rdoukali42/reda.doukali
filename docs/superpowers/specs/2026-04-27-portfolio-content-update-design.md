# Portfolio Content Update — Applied AI Engineer Repositioning

**Date:** 2026-04-27
**Author:** Reda Doukali
**Status:** Approved (pending user review of this spec)

## Goal

Reposition the portfolio from "GenAI Engineer & Software Developer" to **Applied AI Engineer** with a clear focus on **LLM Security, Multi-Agent Systems, and RAG**. Update content to reflect the AI Portfolio (priority source) and LinkedIn profile (secondary source). Replace one underperforming project (Web Game / ft_transcendence) with the LyraixGuard jailbreak detection model, and add a link to the accompanying research paper.

## Source priority (for any conflicts)

1. AI Portfolio PDF (`reda_doukali_resume_AiPortfolio.pdf`) — **primary**
2. LinkedIn profile PDF (`Profile (2).pdf`) — secondary
3. LyraixGuard model card on Hugging Face (`Lyraix-AI/LyraixGuard-v0`) — for new project copy
4. LyraixGuard arXiv paper (Zenodo `19827438`) — for paper link

## Scope

**In scope:** content changes only — text in locale JSON files, plus minimal `Index.tsx` edits to support a new "View Paper" button on the LyraixGuard card. One image swap (replace `webGame.png` with a new `lyraixGuard.png` placeholder).

**Out of scope:** component architecture, routing, design tokens, theme colors, the Skill Game / Card Game / Hexagonal contact hub, any layout changes beyond the new paper button.

## Tone

Blended: formal where it carries authority, casual/natural where it builds trust. Bold openers are welcome; performative jargon is not. The reader should believe the author has shipped.

---

## 1. Hero section

| Field | Before | After |
|---|---|---|
| `hero.title` | `GenAI Engineer` | `Applied AI Engineer` |
| `hero.subtitle` | `& Software Developer` | `LLM Security · Multi-Agent Systems` |
| `hero.description` | `Building intelligent systems with LLMs, RAG, and cutting-edge AI technologies` | `I design LLM systems that hold up under real-world pressure — from security evaluation and jailbreak detection to multi-agent workflows that actually ship.` |
| `hero.badge` | `Available for freelance work` | `Open to Applied AI / AI Security roles — EU or remote` |
| `<img alt>` in `Index.tsx` (line 161) | `Reda Doukali - AI Engineer` | `Reda Doukali - Applied AI Engineer` |

## 2. About section

Replace `about.paragraph1`, `about.paragraph2`, `about.paragraph3` with:

**paragraph1**
> Most LLM applications fall apart the moment they meet adversarial input. I build the ones that don't. As an Applied AI Engineer, I work where LLMs, multi-agent systems, and AI security overlap — designing systems that survive contact with reality, not just demos.

**paragraph2**
> Over the past 18 months I've shipped a few things I'm genuinely proud of: SecEval, a model-agnostic LLM security evaluation framework built with Aleph Alpha; LyraixGuard, a jailbreak-detection model fine-tuned on Qwen3-4B with LoRA for real-time enterprise threat blocking; multi-agent support systems on LangGraph with RAG and end-to-end LangFuse tracing; and a Kubernetes-based DBaaS platform on OpenStack with full JWT/OIDC auth.

**paragraph3**
> Before LLMs, I shipped front-end at Cegedim and spent two years training AI coding models at Outlier — which is where I figured out that prompt engineering is mostly just engineering with worse error messages. What I bring: production-grade execution, evaluation designed before deployment, and security treated as a first-class concern, not an afterthought.

**About cards** — change card #4 (currently `10+ / Certifications`):

| Field | Before | After |
|---|---|---|
| `about.cards.certifications.title` | `10+` | `AI Security` |
| `about.cards.certifications.description` | `Certifications` | `LLM Hardening` |

Note: the JSON key `certifications` stays (renaming would require touching `Index.tsx`), only the displayed values change.

## 3. Experience section

Keep all 4 existing Arkadia program cards (already accurate). Add 2 cards at the **end** of the `experience.programs` array:

**New entry 5 — Outlier AI**
```json
{
  "title": "AI Coding Trainer",
  "duration": "2023 - 2025 · Remote Freelance",
  "company": "Outlier AI",
  "description": "Evaluated and refined AI-generated frontend code (HTML, CSS, JavaScript) by providing feedback on functionality, best practices, and code quality. Trained AI coding models through prompt engineering and response validation, testing outputs against real-world development scenarios including MCP integration and agent-based workflows.",
  "collaboration": "",
  "tags": ["Prompt Engineering", "RLHF", "MCP", "Agent Workflows", "Code Review"]
}
```

**New entry 6 — Cegedim Maroc**
```json
{
  "title": "Frontend Developer",
  "duration": "Apr 2021 - Jan 2022 · Remote",
  "company": "Cegedim Maroc",
  "description": "Built responsive user interfaces using HTML, CSS, and JavaScript across web platforms. Collaborated with designers and backend engineers to implement UI/UX improvements and streamline product functionality. Delivered clean, reusable code aligned with project requirements.",
  "collaboration": "",
  "tags": ["HTML", "CSS", "JavaScript", "Responsive UI", "UI/UX"]
}
```

The grid in `Index.tsx:254` already uses `md:grid-cols-2 lg:grid-cols-3`, so 6 cards lay out cleanly as 2×3.

## 4. Projects section

### 4.1 Replacements / renames

| Slot | Current | New |
|---|---|---|
| 1 | `42sports` | unchanged |
| 2 | `MLOps Pipeline` | `Spotify Popularity Prediction — Full-Stack ML App` (rename + new copy, image stays `mlopsPipe.png`) |
| 3 | `Web Game` (ft_transcendence) | **REPLACED with `LyraixGuard — LLM Jailbreak Detection`** |
| 4 | `Security Benchmark` | `SecEval — LLM Security Evaluation Framework` (rename + new copy, image stays `securityBench.png`) |
| 5 | `Go Web Service` | unchanged (but slightly tightened copy) |
| 6 | `AI Multi-Agent Workflow System` | `AI Support Ticket System — Multi-Agent` (rename + new copy from AI Portfolio) |

### 4.2 Updated project copy (in `projects.items[]`, locale JSON)

Indices below refer to the zero-based position in the `projects.items` array. Index 0 (`42sports`) is unchanged and not listed.

**Index 1 — Spotify Popularity Prediction**
- `title`: `Spotify Popularity Prediction`
- `category`: `Full-Stack ML App`
- `description`: `Predicts whether a Spotify track is likely to be popular and ships as a usable web product. End-to-end preprocessing pipeline with consistent categorical handling between training and inference, class-imbalance handling via weighted training, interactive prediction UI with auto-fill sanity checks, and deployment as a containerized model service on Cloud Run with the frontend on Firebase Hosting.`
- `madeFor`: `Arkadia`
- `tags`: `["Python", "MLflow", "Dagster", "LakeFS", "XGBoost", "Firebase", "Cloud Run"]`

**Index 2 — LyraixGuard (NEW)**
- `title`: `LyraixGuard`
- `category`: `LLM Security · Fine-Tuning`
- `description`: `An enterprise AI security classifier that acts as a gatekeeper between users and LLM systems, classifying messages as Safe / Unsafe / Controversial across 13 attack categories (prompt injection, agent hijacking, RAG exfiltration, credential theft, and more). LoRA fine-tune of Qwen3-4B (66M trainable params, 1.62%) on a 120k-sample bilingual EN/DE dataset. Introduces "intended-output reasoning" — a training methodology where the model learns to reconstruct what the target AI would produce, then classifies safety from the reconstructed output. Achieves 99.8% accuracy in no-think mode, 97.0% recall on Lakera Gandalf, and 0.940 F1 on SafeGuard-PI — outperforming LlamaGuard, ShieldGemma, and AprielGuard.`
- `madeFor`: `Lyraix (Independent Research)`
- `tags`: `["Qwen3", "LoRA", "Unsloth", "Hugging Face", "Fine-Tuning", "LLM Security", "CoT"]`

**Index 3 — SecEval**
- `title`: `SecEval`
- `category`: `LLM Security Evaluation`
- `description`: `A model-agnostic LLM security evaluation framework for jailbreak, prompt injection, and unsafe-output benchmarking. Runs models remotely via OpenRouter or locally via Ollama, integrates safety-focused classifiers, enforces structured result formats for output consistency, and produces engineering-friendly graphic CLI reports with full reproducibility (timeouts, retries, predictable evaluation artifacts).`
- `madeFor`: `Aleph Alpha`
- `tags`: `["Python", "OpenRouter", "Ollama", "Hugging Face", "LLM Evaluation", "Security"]`

**Index 4 — Go Notification Gateway** (light edit only)
- `title`: `Go Notification Gateway`
- `category`: `Notification Service`
- `description`: unchanged
- `madeFor`: `STACKIT`
- `tags`: unchanged

**Index 5 — AI Support Ticket System**
- `title`: `AI Support Ticket System`
- `category`: `Multi-Agent · RAG`
- `description`: `Resolves support issues automatically when documentation exists (via RAG) and escalates to the right human expert when it doesn't. LangGraph-orchestrated agents handle routing, retrieval, escalation, and voice-call workflows, with strict handoff contracts to prevent state drift and end-to-end tracing via LangFuse. Streamlit UI provides auth, ticket lifecycle tracking, and operational visibility.`
- `madeFor`: `Arkadia`
- `tags`: `["LangChain", "LangGraph", "Gemini", "RAG", "ChromaDB", "LangFuse", "Streamlit"]`

### 4.3 Project links and assets

**`src/config/links.ts` — `projectLinks`:**

| Key | Before | After |
|---|---|---|
| `webGame` | `https://github.com/rdoukali42/ft_transcendence` | **REMOVE** |
| `lyraixGuard` | (new) | `https://huggingface.co/Lyraix-AI/LyraixGuard-v0` |
| `lyraixGuardPaper` | (new) | `https://zenodo.org/records/19827438` |

**`Index.tsx` — `projectRepoLinks` array (line 59-66):** replace `projectLinks.webGame` → `projectLinks.lyraixGuard` (preserves index ordering; LyraixGuard is at index 2, same slot as Web Game).

**`Index.tsx` — `projectImages` array (line 56):** replace `webGameImg` import with `lyraixGuardImg` (path `@/assets/lyraixGuard.png`).

**Asset:** create `src/assets/lyraixGuard.png` as a placeholder card (~1280×720, matching aspect of other project images). Dark background using `--background` (`hsl(0 0% 7%)`), gold accent using `--primary` (`hsl(45 100% 51%)`), centered text:
- "LyraixGuard"
- "LLM Security Classifier · Qwen3-4B + LoRA"
- "99.8% accuracy"
Subtle shield/lock motif. Generated as SVG, rasterized to PNG.

### 4.4 Paper link button (new UI affordance)

The LyraixGuard card needs a second link to the arXiv paper alongside the existing repo button.

**Approach:** Add an optional `paperLink` to a parallel array in `Index.tsx`, alongside `projectRepoLinks`. Render a second button only when `paperLink[index]` is defined.

```ts
const projectPaperLinks: (string | undefined)[] = [
  undefined,                       // 42sports
  undefined,                       // Spotify
  projectLinks.lyraixGuardPaper,   // LyraixGuard
  undefined,                       // SecEval
  undefined,                       // Go Notification
  undefined,                       // AI Support Ticket
];
```

**Render block** (replaces the single repo button at `Index.tsx:390-396`):

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

Add `FileText` to the lucide-react imports at the top of `Index.tsx`. The repository button on the LyraixGuard card will point to the Hugging Face model page (the model and code live there); the paper button points to the Zenodo arXiv mirror.

### 4.5 Locale `projects.items` array order

Final order in all three locale files (`en.json`, `de.json`, `fr.json`):

1. 42sports
2. Spotify Popularity Prediction
3. LyraixGuard
4. SecEval
5. Go Notification Gateway
6. AI Support Ticket System

`projectImages` and `projectRepoLinks` arrays in `Index.tsx` must match this order exactly (this is the existing convention noted in `CLAUDE.md`).

## 5. Skills section

In `skills.items[]`:

**Add:** `AI Security`, `LoRA`, `Fine-Tuning`, `Hugging Face`, `LangGraph` (already present, keep), `ChromaDB`, `LangFuse`, `OpenRouter`, `Ollama`, `Go`, `FastAPI`, `Unsloth`, `XGBoost`, `Pandas`

**Remove:** `Knowledge Graph` (not supported by either source document)

**Keep all other existing entries.**

Final list (intended order, grouping by domain):
```
"Python", "JavaScript", "TypeScript", "Go", "C",
"LLMs", "RAG", "Prompt Engineering", "AI Security", "Fine-Tuning",
"LoRA", "Hugging Face", "Unsloth", "LangGraph", "LangChain",
"ChromaDB", "LangFuse", "OpenRouter", "Ollama",
"MLflow", "Dagster", "XGBoost", "Pandas", "Jupyter",
"Machine Learning", "Vector Stores",
"OpenStack", "Kubernetes", "Terraform", "Docker",
"Vue.js", "FastAPI", "JWT",
"Prometheus", "Grafana"
```

## 6. Education section

In `education.items[0]`:

| Field | Before | After |
|---|---|---|
| `duration` | `March 2022 - March 2024` | `March 2022 - March 2026` |

All other education entries unchanged.

## 7. Footer

| Field | Before | After |
|---|---|---|
| `footer.tagline` | `GenAI Engineer \| Software Developer \| Full-Stack Developer` | `Applied AI Engineer · LLM Security · Multi-Agent Systems · RAG` |

`footer.copyright` unchanged.

## 8. Locale parity

All copy changes apply to **`en.json`, `de.json`, and `fr.json`**. The `t` object is typed as `typeof en` (per `CLAUDE.md`), so:
- `en.json` is the schema — change first.
- `de.json` and `fr.json` mirror the exact same keys with translated values.
- Technical terms (LLM, RAG, LoRA, MLOps, Kubernetes, etc.) stay in English across all locales.
- Brand names (LyraixGuard, SecEval, Aleph Alpha, Outlier, Cegedim) stay as-is.
- Tags and skill names stay in English across all locales (they read as technology labels).

## 9. Files touched

| File | Change |
|---|---|
| `src/locales/en.json` | All copy edits per sections 1–7 |
| `src/locales/de.json` | Mirror en.json; translate prose; keep technical terms in English |
| `src/locales/fr.json` | Mirror en.json; translate prose; keep technical terms in English |
| `src/pages/Index.tsx` | Update `projectImages` and `projectRepoLinks` arrays; add `projectPaperLinks` array; add `FileText` import; replace single-button block with dual-button block; update hero `<img>` alt text |
| `src/config/links.ts` | Remove `webGame`, add `lyraixGuard` and `lyraixGuardPaper` |
| `src/assets/lyraixGuard.png` | New placeholder image (replaces `webGame.png` in usage; `webGame.png` left on disk for now in case of revert) |

## 10. Verification

- `npm run build` succeeds (TypeScript types match across all three locale files).
- `npm run dev` and visually walk through every section in browser at `http://localhost:8080`.
- Switch language via `LanguageSwitcher` to confirm DE and FR render without missing keys.
- Confirm LyraixGuard card shows two buttons (Repo + Paper); other cards show one.
- Confirm hero reads "Applied AI Engineer / LLM Security · Multi-Agent Systems".

## 11. Out-of-scope (explicitly not changing)

- Component architecture, routing, design tokens, theme colors.
- Skill Game / Card Game / Hexagonal contact hub.
- Email in `links.ts` (kept as `reda.doukali.farji@gmail.com` per AI Portfolio resume).
- Any image asset besides the new `lyraixGuard.png`.
- The `about.cards.certifications` JSON key (only its displayed values change, the key stays for stability).
