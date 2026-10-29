---
title: "Paper summary: LLaVA-CoT: Let Vision Language Models Reason Step-by-Step"
categories: ["papers"]
tags: ["multimodal", "reasoning"]
summary: "LLaVA-CoT trains a vision-language model to reason in explicit stages (summary, visual interpretation, logical reasoning, conclusion) and adds a stage-wise retracing search at test time."
sources: 
  - title: "LLaVA-CoT: Let Vision Language Models Reason Step-by-Step (arXiv:2411.10440)"
    url: "https://arxiv.org/abs/2411.10440"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:08.457Z"
  - title: "Hugging Face Daily Papers, 2024-11-17"
    url: "https://huggingface.co/papers?date=2024-11-17"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:42.379Z"
  - title: "LLaVA-CoT: Let Vision Language Models Reason Step-by-Step (arXiv HTML full text)"
    url: "https://arxiv.org/html/2411.10440"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:08.457Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/PKU-YuanGroup/LLaVA-CoT"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:44:08.457Z"
highlights: ["Rather than prompting for \"think step by step\", the model is trained to move through four fixed stages on its own.", "A 100k-sample dataset with structured reasoning annotations makes this possible."]
papers: 
  - title: "LLaVA-CoT: Let Vision Language Models Reason Step-by-Step"
    authors: ["Guowei Xu", "Peng Jin", "Ziang Wu", "Hao Li", "Yibing Song", "Lichao Sun", "Li Yuan"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2411.10440"
    pdf: "https://arxiv.org/pdf/2411.10440v6"
    code: "https://github.com/PKU-YuanGroup/LLaVA-CoT"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Structured multi-step reasoning in vision-language models"
  method: "Autonomous four-stage reasoning trained on LLaVA-CoT-100k; test-time stage-wise retracing search (SWIRES)"
  data: "LLaVA-CoT-100k built from various VQA sources with structured reasoning annotations"
  result: "Marked improvements on reasoning-intensive multimodal tasks, per the abstract"
draft: false
date: "2024-11-17"
---

## Problem

VLMs often struggle with systematic, structured reasoning on complex visual questions. Chain-of-thought *prompting* helps LLMs, but VLMs don't reliably follow such prompts.

## Method

**LLaVA-CoT** is trained to go through **sequential stages** on its own:

1. **summarisation** of the question
2. **visual interpretation** (a caption focused on what matters)
3. **logical reasoning**
4. **conclusion**

The training data, **LLaVA-CoT-100k**, combines samples from various visual question-answering sources with **structured reasoning annotations**. At test time, a **stage-wise retracing search (SWIRES)** explores alternatives at the stage level and can go back when a stage looks wrong.

## Key results

The abstract reports marked improvements on reasoning-intensive tasks compared with the base model.

## Limitations

From the paper: the model sometimes gets lost during retracing or **hallucinates** to reach an answer, and some input images are too complex for its visual understanding, so even retracing doesn't help.
