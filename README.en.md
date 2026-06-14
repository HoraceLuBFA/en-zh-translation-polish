<div align="center">

# en-zh-translation-polish

### Translate English into idiomatic, translationese-free Chinese, with paragraph-by-paragraph bilingual output

[![License: MIT](https://img.shields.io/badge/License-MIT-f5c542.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-2ea44f.svg)](./SKILL.md)
[![Agent Skills](https://img.shields.io/badge/agent-skills-black.svg)](https://github.com/vercel-labs/skills)

**English | [中文](./README.md)**

</div>

---

## Philosophy

This skill turns the English-to-Chinese methodology of Ye Zinan's *Advanced Course in English-Chinese Translation (Fourth Edition)* (《高级英汉翻译理论与实践》) into an executable pipeline. One conviction sits at its core:

> The deadliest mistake in English-to-Chinese translation is carrying English's **hypotactic** (form-driven) structure into Chinese, which produces *translationese*.

Good translation therefore rests on four principles:

- **Reader-first** — communicative translation by default, so the Chinese reader meets fluent, natural Chinese;
- **Domestication tuned to the text** — hard texts (law / tech / contracts) put accuracy first and intervene sparingly; soft texts (essays / commentary / ads) lean into Chinese's parataxis and idiom;
- **Play to Chinese's parataxis** — dismantle hypotaxis, trim connectives, turn passive into active, move long modifiers out of pre-noun position, break long sentences into a running flow;
- **Mind rhythm and cadence** — use disyllables, four-character structures, and parallelism, but only as far as it stays natural.

Every paragraph runs the full loop — *register → deverbalize → parataxis draft → symptom diagnosis → rhythm pass → accuracy QA → punctuation* — and is polished before it ships.

## What it's for

- **Removing translationese from MT and literal drafts** — hypotaxis transfer, the runaway "的" particle, abstract-noun subjects, overused passives, literally-rendered idioms: each is named and fixed;
- **A consistent editing standard** — three verifiable reference tables fix *what to change, how, and how far* into reusable criteria;
- **Maintaining bilingual versions** — the bilingual file is the single source of truth; the Chinese-only version is derived by script, so the two never drift;
- **Correct Chinese punctuation** — a built-in normalizer leaves zero half-width residue in the Chinese text, while English, links, numbers, and code are untouched.

## Boundaries

Method serves the translation, not the other way around. Two cautions from Ye Zinan:

- **Domesticate in moderation** — keep the source's style, terminological precision, and cultural markers; foreignization is a continuum, and hard / lasting-value texts tolerate more of it;
- **Restrain ornament** — rhythm is a means, not an end; four-character phrases are used sparingly;
- When unsure how far to go, return to the Stage 0 register: the lower the freedom, the more restraint.

Bottom line: relaxing accuracy ≠ misunderstanding the source. **A misreading is never forgivable.**

## Workflow

Run in order; each paragraph completes every stage before delivery.

| Stage | Name | What it does |
|---|---|---|
| 0 | Text analysis & register | Judge soft/hard, Newmark type, freedom 1–10; set the domestication level |
| 1 | Deverbalization | Drop the English wording, form meaning/imagery, rebuild in Chinese |
| 2 | Parataxis-first draft | Break long sentences, trim connectives, passive→active, front-load modifiers |
| 3 | Polishing diagnosis | Run three tables: translationese symptoms / techniques / metaphor decisions |
| 4 | Rhythm & cadence | Disyllables / four-character / parallelism; loosen for soft texts, restrain for hard |
| 5 | Accuracy QA | Structure, modality, added/dropped words, collocation, reference, terms, register |
| 6 | Chinese punctuation normalization | Script normalizes full-width punctuation; self-check residue = 0 |
| 7 | Bilingual output | Pair paragraphs, append a one-line "register + main trade-offs" note |

Three reference tables back the workflow (in `reference/`, each with source quotations and worked English–Chinese examples):

- **`text-analysis-and-qa.md`** — text typing (7 dimensions → freedom, Newmark's XYZ coefficients, the soft/hard master switch), metaphor-translation decisions, and the accuracy-QA checklist;
- **`translationese-symptoms.md`** — 9 classes of translationese with detection signals and fixes, prosody rules, and the foreignization-acceptability boundary;
- **`techniques.md`** — 14 actionable techniques (unpacking, part-of-speech conversion, amplification/omission, division/combination, reordering, relative-clause transforms, negation, passive transforms).

## Installation

**Option 1 · One command (recommended)**

```bash
npx skills add -g HoraceLuBFA/en-zh-translation-polish
```

> [`npx skills`](https://github.com/vercel-labs/skills) installs the skill into `~/.agents/skills/` — the shared skill directory read by multiple agents — and wires up each agent's symlinks automatically.

**Option 2 · Let your agent install it**

Send the repo link to your coding agent (Claude Code / Codex / Gemini CLI, etc.) and just ask:

> Install this skill for me: https://github.com/HoraceLuBFA/en-zh-translation-polish

**Option 3 · Manual clone**

```bash
git clone https://github.com/HoraceLuBFA/en-zh-translation-polish.git ~/.agents/skills/en-zh-translation-polish
```

Verify:

```bash
test -f ~/.agents/skills/en-zh-translation-polish/SKILL.md && echo OK
```

## Usage

**Natural language** — just state what you want; agents that auto-trigger will load the skill from the `description` field in `SKILL.md`. Common phrasings:

- "Translate this English into natural, idiomatic Chinese: …"
- "Translate this article — I want an English-Chinese bilingual version."
- "Please translate this tech paper / press release / novel into Chinese."

**Explicit command** — name the skill directly and pass a file or text as the argument:

```text
# Claude Code: slash command
/en-zh-translation-polish path/to/article.md

# Codex: invoke with $ (or run /skills and pick from the list)
$en-zh-translation-polish path/to/article.md
```

> ⚠️ **Want Chinese only?** The skill **produces a bilingual file by default**. If you want the translation alone, say so explicitly in your prompt (e.g. "Chinese only, no English" / "output the translation only").

## Deliverables

1. **`<name> 翻译(中英对照).md`** — the single source of truth: each English source paragraph as a blockquote, with the Chinese translation right below it;
2. **`<name> 翻译(全中文).md`** (on request) — derived from the bilingual file by script;
3. A short note — the register call and the main polishing trade-offs for the piece.

## Output preview

> The confidence that the West would remain a dominant force in the 21st century is giving way to a sense of foreboding.

西方曾笃信自己将在 21 世纪稳居主导地位，如今这份自信，正让位于一种隐隐的不祥之感。

*(Stage 0 call: hard-leaning / political commentary, freedom ≈ 3, accuracy first, restrained rhythm.)*

## Repository layout

```text
en-zh-translation-polish/
├── SKILL.md                       # Entry point (workflow + punctuation normalizer)
├── README.md                      # Project guide (Chinese)
├── README.en.md                   # Project guide (English)
├── reference/
│   ├── text-analysis-and-qa.md    # Text typing + metaphor + accuracy QA
│   ├── translationese-symptoms.md # Translationese symptoms + prosody + foreignization limits
│   └── techniques.md              # 14 actionable techniques
├── test-prompts.json              # Trigger / decoy / edge-case test cases
├── LICENSE
└── .gitignore
```

## Acknowledgments & license

The code, prompts, and structure of this skill are released under the **MIT License** — free to use, modify, and redistribute. See [LICENSE](./LICENSE).

The methodology and worked examples are distilled and paraphrased from **Ye Zinan, 《高级英汉翻译理论与实践》 (Advanced Course in English-Chinese Translation, Fourth Edition), Tsinghua University Press, 2020**, with gratitude. The short quotations in `reference/` are brief excerpts for commentary and teaching; copyright remains with the author and publisher. This skill is a working tool, not a substitute for the book — readers who want to study the subject systematically should buy the original.

This skill was generated with the help of [cangjie-skill](https://github.com/kangarooking/cangjie-skill), an open-source pipeline that distills books into invokable AI skills — also gratefully acknowledged.
