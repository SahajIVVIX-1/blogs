---
title: "Paper summary: DAPD: Dual-Anchored Policy Distillation"
categories: ["papers"]
tags: ["llm", "distillation", "post-training"]
summary: "On-policy self-distillation with a privileged teacher can cause \"privilege illusion\": the student acts as if it still had information it can't see at inference. DAPD anchors training along matched-information paths to prevent this."
sources: 
  - title: "DAPD: Dual-Anchored Policy Distillation (arXiv:2608.01735)"
    url: "https://arxiv.org/abs/2608.01735"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:33.415Z"
  - title: "Hugging Face Daily Papers, 2026-08-04"
    url: "https://huggingface.co/papers?date=2026-08-04"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:26.625Z"
  - title: "DAPD: Dual-Anchored Policy Distillation (arXiv HTML full text)"
    url: "https://arxiv.org/html/2608.01735"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:33.415Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/uanu2002/DAPD"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:53:33.415Z"
highlights: ["If the teacher sees privileged information, the student may learn behaviour that only makes sense with that information, which it won't have later.", "The fix aligns teacher and student along paths where both have the same information."]
papers: 
  - title: "DAPD: Dual-Anchored Policy Distillation"
    authors: ["Jianyu Wu", "Yizhou Wang", "Encheng Su", "Chen Tang", "Shixiang Tang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2608.01735"
    pdf: "https://arxiv.org/pdf/2608.01735v2"
    code: "https://github.com/uanu2002/DAPD"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Reliable on-policy self-distillation for LLM post-training"
  method: "Dual-Anchored Policy Distillation: Dual-Path Anchoring (self-conditioned bridge, matched-information paths) + Dual-Source Anchoring (both directions)"
  data: "Qwen3-4B to 32B across tasks"
  result: "+2.00 average over OPSD on Qwen3-4B; gains of +2.69 at 4B and +2.78 at 32B, per the abstract"
draft: false
date: "2026-08-04"
---

## Problem

**On-policy self-distillation (OPSD)** strengthens the teacher by giving it **privileged information** (for example, a reference solution). The authors identify a failure: **privilege illusion**. The student learns privilege-dependent behaviour it can't reproduce from its own inference-time context, but behaves as if that information were still available, so performance degrades. The root cause is the **information asymmetry** between teacher and student.

## Method

**DAPD** anchors training at two levels:

- **Dual-Path Anchoring (DPA)**: a self-conditioned bridge aligns reference and rollout behaviour along **two matched-information paths**, so privilege-dependent behaviour isn't transferred.
- **Dual-Source Anchoring (DSA)**: applies these paths in **both directions** (reference-to-rollout and rollout-to-reference), reducing reliance on privileged guidance while keeping correctness supervision.

## Key results

From the abstract: DAPD significantly reduces privilege illusion, beating OPSD on **Qwen3-4B** by **+2.00** points on average, with gains holding across scale (**+2.69** at 4B, **+2.78** at 32B).

## Limitations

There's no dedicated limitations section in the extracted text. Results are on the Qwen3 family.
