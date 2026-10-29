---
title: "Paper summary: Absolute Zero: Reinforced Self-play Reasoning with Zero Data"
categories: ["papers"]
tags: ["llm", "reasoning", "rl", "self-play"]
summary: "Absolute Zero trains a model to propose its own coding and maths-style tasks and then solve them, with a code executor checking both, so reasoning improves through self-play with no external training data."
sources: 
  - title: "Absolute Zero: Reinforced Self-play Reasoning with Zero Data (arXiv:2505.03335)"
    url: "https://arxiv.org/abs/2505.03335"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:46.856Z"
  - title: "Hugging Face Daily Papers, 2025-05-07"
    url: "https://huggingface.co/papers?date=2025-05-07"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:26.358Z"
  - title: "Absolute Zero: Reinforced Self-play Reasoning with Zero Data (arXiv HTML full text)"
    url: "https://arxiv.org/html/2505.03335"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:46.856Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/LeapLabTHU/Absolute-Zero-Reasoner"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:46:46.856Z"
highlights: ["The same model plays two roles: task proposer and solver.", "A code executor validates proposed tasks and verifies answers, which gives a reliable reward without human labels."]
papers: 
  - title: "Absolute Zero: Reinforced Self-play Reasoning with Zero Data"
    authors: ["Andrew Zhao", "Yiran Wu", "Yang Yue", "Tong Wu", "Quentin Xu", "Yang Yue", "Matthieu Lin", "Shenzhi Wang", "Qingyun Wu", "Zilong Zheng", "Gao Huang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2505.03335"
    pdf: "https://arxiv.org/pdf/2505.03335v3"
    code: "https://github.com/LeapLabTHU/Absolute-Zero-Reasoner"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2505.03335.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2505.03335\">Zhao et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Absolute Zero Reasoner (AZR) achieves state-of-the-art performance with ZERO DATA . Without relying on any gold labels or human-defined queries, Absolute Zero Reasoner trained using our proposed self-play …"
images: 
  - src: "images/2025/paper-2505.03335.webp"
    alt: "Figure from the paper \"Absolute Zero: Reinforced Self-play Reasoning with Zero Data\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2505.03335\">Zhao et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Absolute Zero Reasoner (AZR) achieves state-of-the-art performance with ZERO DATA . Without relying on any gold labels or human-defined queries, Absolute Zero Reasoner trained using our proposed self-play …"
card: 
  task: "Improving reasoning without any curated training data"
  method: "Absolute Zero paradigm: one model proposes tasks that maximise its learning progress and solves them; code executor validates and verifies (Absolute Zero Reasoner, AZR)"
  data: "No external data; evaluated on coding and maths reasoning"
  result: "Overall SOTA on coding and maths reasoning versus zero-setting models trained on tens of thousands of curated examples, per the abstract"
draft: false
date: "2025-05-07"
---

## Problem

RL with verifiable rewards ("zero" settings) avoids labelling reasoning steps, but still needs curated question–answer sets. The authors argue that relying on human-made examples won't scale, and might limit a future system that's better than humans.

## Method

**Absolute Zero**: a single model learns to **propose tasks** that maximise its own learning progress, and to **solve** them. The **Absolute Zero Reasoner (AZR)** uses a **code executor** to:

- validate that a proposed code-reasoning task is well-formed
- verify the solver's answers

The executor is the one source of verifiable reward, which keeps the open-ended curriculum grounded.

## Key results

From the abstract: trained **entirely without external data**, AZR reaches overall state-of-the-art performance on coding and mathematical reasoning, beating zero-setting models that use **tens of thousands** of human-curated examples. It works across model scales and model classes. Figure 1 summarises the results.

## Limitations

There's no dedicated limitations section in the extracted text. The approach relies on tasks that a code executor can verify.
