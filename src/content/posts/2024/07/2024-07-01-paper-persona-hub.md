---
title: "Paper summary: Scaling Synthetic Data Creation with 1,000,000,000 Personas"
categories: ["papers"]
tags: ["llm", "synthetic-data"]
summary: "Persona Hub collects one billion personas from web data and uses them to steer an LLM toward diverse viewpoints when generating synthetic data: maths problems, instructions, knowledge texts, game NPCs and tools."
sources: 
  - title: "Scaling Synthetic Data Creation with 1,000,000,000 Personas (arXiv:2406.20094)"
    url: "https://arxiv.org/abs/2406.20094"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:12.766Z"
  - title: "Hugging Face Daily Papers, 2024-07-01"
    url: "https://huggingface.co/papers?date=2024-07-01"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:17.674Z"
  - title: "Scaling Synthetic Data Creation with 1,000,000,000 Personas (arXiv HTML full text)"
    url: "https://arxiv.org/html/2406.20094"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:12.766Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/tencent-ailab/persona-hub"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:42:12.766Z"
highlights: ["Adding a persona to a data-generation prompt pushes the LLM to produce different content for the same request.", "The persona collection is the scaling knob: 1 billion personas, about 13% of the world's population."]
papers: 
  - title: "Scaling Synthetic Data Creation with 1,000,000,000 Personas"
    authors: ["Tao Ge", "Xin Chan", "Xiaoyang Wang", "Dian Yu", "Haitao Mi", "Dong Yu"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2406.20094"
    pdf: "https://arxiv.org/pdf/2406.20094v3"
    code: "https://github.com/tencent-ailab/persona-hub"
    license: "http://creativecommons.org/licenses/by-nc-sa/4.0/"
card: 
  task: "Diverse synthetic data creation at scale"
  method: "Persona-driven prompting with Persona Hub, 1B personas automatically curated from web data"
  data: "Synthesised maths/logic problems, user prompts, knowledge-rich texts, game NPCs and tool definitions"
  result: "Shows the approach is versatile, scalable and easy to use across these use cases, per the abstract"
draft: false
date: "2024-07-01"
---

## Problem

LLM-generated synthetic data tends to be repetitive. Asking for "a maths problem" a million times gives many near-duplicates. Diversity is the bottleneck.

## Method

Add a **persona** to each generation prompt ("as a marine biologist…", "as a truck driver…"), so the LLM draws on a different perspective each time. To do this at scale, the authors build **Persona Hub**: **1 billion personas** curated automatically from web data, about **13% of the world's population**. They describe personas as distributed carriers of world knowledge.

## Key results

The paper demonstrates persona-driven synthesis for:

- mathematical and logical reasoning problems
- instructions (user prompts)
- knowledge-rich texts
- game NPCs
- tools (function definitions)

The authors argue it is versatile, scalable, flexible and easy to use.

## Limitations

There's no dedicated limitations section in the extracted text. The evidence is largely in the form of use-case demonstrations. The initial public release is a subset: 200,000 of the personas plus samples of the synthesised data (e.g. 50,000 maths problems and 50,000 instructions).
