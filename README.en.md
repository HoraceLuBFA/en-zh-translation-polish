<div align="center">

# en-zh-translation-polish

### Faithful English-to-Chinese translation in natural Chinese, with paragraph-by-paragraph bilingual output

[![License: MIT](https://img.shields.io/badge/License-MIT-f5c542.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.1.1-2ea44f.svg)](./SKILL.md)
[![Agent Skills](https://img.shields.io/badge/agent-skills-black.svg)](https://github.com/vercel-labs/skills)

**English | [中文](./README.md)**

</div>

---

## Philosophy

This skill turns the English-to-Chinese methodology of Ye Zinan's *Advanced Course in English-Chinese Translation (Fourth Edition)* (《高级英汉翻译理论与实践》) into an executable translation and polishing workflow. It preserves the source completely and accurately, then removes translationese to produce fluent, natural Chinese.

- **Fidelity first**: preserve facts, logic, conditions, attribution, and strength of claims. Domestication changes expression only.
- **Expression tuned to the text**: intervene sparingly in law, technology, and contracts; handle syntax and rhetoric more flexibly in essays and commentary. Assess interviews and industry roundups by paragraph or information function.
- **Play to Chinese's parataxis**: split long sentences, trim redundant connectives, and adjust passives and long modifiers while preserving their relationships.
- **Mind rhythm and cadence**: use disyllables, four-character structures, and parallelism in moderation, preserving the function of the source's rhetoric.

The workflow supports text analysis, understanding, Chinese reconstruction, polishing, accuracy checks, and punctuation. Select relevant checks for the text type. Short passages do not require displaying every diagnostic stage or reading every reference table; accuracy and source fidelity still apply.

## What it's for

- **Removing translationese from MT and literal drafts** — hypotaxis transfer, the runaway "的" particle, abstract-noun subjects, overused passives, literally-rendered idioms: each is named and fixed;
- **A consistent editing standard** — three verifiable reference tables fix *what to change, how, and how far* into reusable criteria;
- **Maintaining bilingual versions** — the bilingual file is the single source of truth; the Chinese-only version is derived by script, so the two never drift;
- **Checking completeness**: compare source and translation in both directions for omissions, unsupported additions, conditions, and attribution; translate and check long texts in sections.
- **Chinese punctuation**: normalize punctuation and check for residue, preserving source English, links, and other protected content according to the workflow.

## Boundaries

The method serves the translation. Domestication and polishing follow these boundaries:

- **Domesticate in moderation** — keep the source's style, terminological precision, and cultural markers; foreignization is a continuum, and hard / lasting-value texts tolerate more of it;
- **Restrain ornament** — rhythm is a means, not an end; four-character phrases are used sparingly;
- When unsure how far to go, return to the Stage 0 register: the lower the freedom, the more restraint.

Every register requires a complete, accurate rendering of the source. Outside knowledge may resolve ambiguity but must not become an added source claim. Preserve the function of existing metaphors, exaggeration, and personal voice without intensifying them. When the user explicitly requests a summary, abridgment, or adaptation, honor that scope and identify the treatment.

## Workflow

The table describes the full workflow. Short passages can be delivered directly in chat; full-text and project translations retain the file-delivery contract. Honor an explicit request for Chinese-only text, bilingual output, or an existing destination file without asking again.

| Stage | Name | What it does |
|---|---|---|
| 0 | Text analysis & register | Assess text type and expressive freedom (1–10); judge mixed texts by paragraph or information function |
| 1 | Deverbalization | Resolve facts, references, negation, conditions, and tone; rebuild the syntax in Chinese |
| 2 | Parataxis-first draft | Split long sentences, trim redundant connectives, and adjust passives and long modifiers |
| 3 | Polishing diagnosis | Run three tables: translationese symptoms / techniques / metaphor decisions |
| 4 | Rhythm & cadence | Disyllables / four-character / parallelism; loosen for soft texts, restrain for hard |
| 5 | Accuracy QA | Check source coverage and trace translation claims back to their source; verify logic, attribution, terms, and tone |
| 6 | Chinese punctuation normalization | Script normalizes full-width punctuation; self-check residue = 0 |
| 7 | Bilingual output | Pair paragraphs, append a one-line "register + main trade-offs" note |

Process long texts, multi-speaker interviews, and interleaved text and captions in sections that follow the source structure. After assembly, check order, missing passages, and terminology. Source quotations, paragraph counts, and punctuation checks do not replace semantic review.

Three reference tables back the workflow (in `reference/`, each with source quotations and worked English–Chinese examples):

- **`text-analysis-and-qa.md`** — text typing (7 dimensions → freedom, Newmark's XYZ coefficients, the soft/hard master switch), metaphor-translation decisions, and the accuracy-QA checklist;
- **`translationese-symptoms.md`** — 9 classes of translationese with detection signals and fixes, prosody rules, and the foreignization-acceptability boundary;
- **`techniques.md`** — 14 actionable techniques (unpacking, part-of-speech conversion, amplification/omission, division/combination, reordering, relative-clause transforms, negation, passive transforms).

## Installation

**Option 1 · One command (recommended)**

```bash
npx skills add -g HoraceLuBFA/en-zh-translation-polish
```

> [`npx skills`](https://github.com/vercel-labs/skills) configures skill entry points for the selected agents. Confirm availability in the skill list of the host you use.

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
- "Please translate this technical passage / press release / novel excerpt into Chinese."

This skill handles English texts and source-grounded polishing of existing Chinese translations. This skill can be installed and used independently, without another translation skill. For PDF or other document inputs, use the current host’s available reading tools to obtain the source. Preserve the requested text, captions, formulas, citations, and references. Report extraction gaps rather than handing the task to an uninstalled skill.

**Explicit command** — name the skill directly and pass a file or text as the argument:

```text
# Claude Code: slash command
/en-zh-translation-polish path/to/article.md

# Codex: invoke with $ (or run /skills and pick from the list)
$en-zh-translation-polish path/to/article.md
```

> ⚠️ **Want Chinese only?** The skill **produces a bilingual file by default**. If you want the translation alone, say so explicitly in your prompt (e.g. "Chinese only, no English" / "output the translation only").

## Deliverables

The following files are the default for full-text or project translations. Short chat passages can be returned in the reply; explicit monolingual, bilingual, or file-delivery requests take precedence.

1. **`<name> 翻译(中英对照).md`** — the single source of truth: each English source paragraph as a blockquote, with the Chinese translation right below it;
2. **`<name> 翻译(全中文).md`** (on request) — derived from the bilingual file by script;
3. A short note — the register call and the main polishing trade-offs for the piece.

## Output preview

> The confidence that the West would remain a dominant force in the 21st century is giving way to a sense of foreboding.

西方曾笃信自己将在 21 世纪稳居主导地位，如今这份自信，正让位于一种隐隐的不祥之感。

*(Stage 0 call: hard-leaning / political commentary, freedom ≈ 3, accuracy first, restrained rhythm.)*

## Sister skill

For the opposite direction (Chinese → English), use **[zh-en-translation-polish](https://github.com/HoraceLuBFA/zh-en-translation-polish)** — distilled from Joan Pinkham's *The Translator's Guide to Chinglish* and Lu Guoqiang's *Classic Examples of Converting Chinese to English*, it produces idiomatic, Chinglish-free English with bilingual pairing. The two skills are structural mirrors, one per direction.

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
├── test-prompts.json              # Trigger / decoy / edge-case and translation-quality cases
├── LICENSE
└── .gitignore
```

## Acknowledgments & license

The code, prompts, and structure of this skill are released under the **MIT License** — free to use, modify, and redistribute. See [LICENSE](./LICENSE).

The methodology and worked examples are distilled and paraphrased from **Ye Zinan, 《高级英汉翻译理论与实践》 (Advanced Course in English-Chinese Translation, Fourth Edition), Tsinghua University Press, 2020**, with gratitude. The short quotations in `reference/` are brief excerpts for commentary and teaching; copyright remains with the author and publisher. This skill is a working tool, not a substitute for the book — readers who want to study the subject systematically should buy the original.

This skill was generated with the help of [cangjie-skill](https://github.com/kangarooking/cangjie-skill), an open-source pipeline that distills books into invokable AI skills — also gratefully acknowledged.

## Versions and updates

Current version: [v1.1.1](https://github.com/HoraceLuBFA/en-zh-translation-polish/releases/tag/v1.1.1). See [Releases](https://github.com/HoraceLuBFA/en-zh-translation-polish/releases) for release notes and past versions, and [CHANGELOG.md](./CHANGELOG.md) for details.
