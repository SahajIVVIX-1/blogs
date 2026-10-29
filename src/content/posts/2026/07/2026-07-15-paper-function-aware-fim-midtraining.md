---
title: "Paper summary: Function-Aware Fill-in-the-Middle as Mid-Training for Coding Agent Foundation Models"
categories: ["papers"]
tags: ["llm", "code", "agents"]
summary: "The authors note that an agent's act–observe–continue loop has the same shape as a function call site, and use function-level fill-in-the-middle mid-training on Python repos to improve coding agents on SWE-Bench."
sources: 
  - title: "Function-Aware Fill-in-the-Middle as Mid-Training for Coding Agent Foundation Models (arXiv:2607.12463)"
    url: "https://arxiv.org/abs/2607.12463"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:14.890Z"
  - title: "Hugging Face Daily Papers, 2026-07-15"
    url: "https://huggingface.co/papers?date=2026-07-15"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:14.575Z"
  - title: "Function-Aware Fill-in-the-Middle as Mid-Training for Coding Agent Foundation Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2607.12463"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:14.890Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/TIGER-AI-Lab/FIM-Midtraining"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:53:14.890Z"
highlights: ["Calling a tool and using its result looks like calling a function and using its return value, and ordinary code has billions of examples of that.", "Masking whole functions and asking the model to fill them in teaches it to use information that arrives from elsewhere."]
papers: 
  - title: "Function-Aware Fill-in-the-Middle as Mid-Training for Coding Agent Foundation Models"
    authors: ["Yubo Wang", "Jiarong Liang", "Yuxuan Zhang", "Xuye Liu", "Cong Wei", "Yuyu Zhang", "Ping Nie", "Wenhu Chen"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2607.12463"
    pdf: "https://arxiv.org/pdf/2607.12463v3"
    code: "https://github.com/TIGER-AI-Lab/FIM-Midtraining"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Better foundation models for coding agents"
  method: "Function-aware fill-in-the-middle mid-training (functions chosen by program-dependency analysis and a complexity-inferability criterion) before agentic post-training"
  data: "2.6B-token decontaminated corpus from 968 Python repos; Qwen2.5-Coder-Instruct 7B/14B, Qwen3-8B"
  result: "SWE-Bench-Verified +2.8/+3.0/+3.2; SWE-Bench-Lite +3.7/+4.0/+5.4, per the abstract"
draft: false
date: "2026-07-15"
---

## Problem

Coding agents must fold **tool returns** into ongoing reasoning. Standard left-to-right pre-training on code only shows this structure in one direction.

## Method

The key observation: an agent's **action → observation → continuation** loop is structurally like a **function call site**. A caller binds arguments, a callee returns a value computed elsewhere, and later code uses it. Ordinary code has this structure at internet scale.

**Function-aware FIM mid-training** masks whole functions, chosen via program-dependency-graph analysis and a "complexity-inferability" criterion, and trains the model to fill them in. The authors mid-train **Qwen2.5-Coder-Instruct (7B/14B)** and **Qwen3-8B** on a **2.6B-token** decontaminated corpus from **968** GitHub repos, then apply existing agentic post-training pipelines.

## Key results

From the abstract:

- **SWE-Bench-Verified**: +2.8 / +3.0 (7B/14B) and +3.2 (Qwen3-8B)
- **SWE-Bench-Lite**: +3.7 / +4.0 / +5.4
- holds across two post-training pipelines (R2E-Gym, SWE-Smith)
- reduces the **capability erosion** that agentic post-training otherwise causes on non-agent coding (LiveCodeBench) and tool-use benchmarks (tau-bench, BFCL)

## Limitations

From the paper:

- the corpus and in-domain evaluation are **Python-only**
- the default recipe uses Gemini-3-Flash as a teacher for chain-of-thought, although self-generated rationales recover most of the gain
- cross-base validation comes from only one non-Qwen2.5 configuration
