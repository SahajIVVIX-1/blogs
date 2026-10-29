---
title: "Paper summary: Recursive Multi-Agent Systems"
categories: ["papers"]
tags: ["agents", "multi-agent", "reasoning"]
summary: "RecursiveMAS treats a whole multi-agent system as one recursive computation in latent space, linking agents with a light RecursiveLink module and training them jointly; it reports +8.3% accuracy and 1.2–2.4× faster inference."
sources: 
  - title: "Recursive Multi-Agent Systems (arXiv:2604.25917)"
    url: "https://arxiv.org/abs/2604.25917"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:06.530Z"
  - title: "Hugging Face Daily Papers, 2026-04-29"
    url: "https://huggingface.co/papers?date=2026-04-29"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:27.823Z"
  - title: "Recursive Multi-Agent Systems (arXiv HTML full text)"
    url: "https://arxiv.org/html/2604.25917"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:06.530Z"
highlights: ["Instead of agents exchanging text, they pass latent states around a loop, which is the looped-model idea applied to a team of agents.", "The whole system is co-optimised with gradient-based credit assignment across recursion rounds."]
papers: 
  - title: "Recursive Multi-Agent Systems"
    authors: ["Jiaru Zou", "Rui Pan", "Ruizhong Qiu", "Pan Lu", "Shizhe Diao", "Jindong Jiang", "Hanghang Tong", "Tong Zhang", "Markus J. Buehler", "Jingrui He", "James Zou"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2604.25917"
    pdf: "https://arxiv.org/pdf/2604.25917v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2604.25917.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2604.25917\">Zou et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Performance Landscape of RecursiveMAS across Training/Inference Recursion Depths (Top): The lightweight RecursiveMAS with sub-1.5B agents shows a clean scaling trend as recursion deepens. Generalization across …"
images: 
  - src: "images/2026/paper-2604.25917.webp"
    alt: "Figure from the paper \"Recursive Multi-Agent Systems\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2604.25917\">Zou et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Performance Landscape of RecursiveMAS across Training/Inference Recursion Depths (Top): The lightweight RecursiveMAS with sub-1.5B agents shows a clean scaling trend as recursion deepens. Generalization across …"
card: 
  task: "Scaling multi-agent collaboration through recursion"
  method: "RecursiveLink module for latent thought generation and cross-agent latent transfer; inner–outer loop co-optimisation"
  data: "4 collaboration patterns; 9 benchmarks in maths, science, medicine, search and code"
  result: "Average +8.3% accuracy and 1.2×–2.4× end-to-end inference speed-up over strong baselines, per the abstract"
draft: false
date: "2026-04-29"
---

## Problem

Looped and recursive models (Ouro, recurrent depth, TRM on this blog) scale reasoning by repeating computation in latent space. Can **agent collaboration** scale the same way?

## Method

**RecursiveMAS** treats the **entire multi-agent system** as one **latent-space recursive computation**:

- a lightweight **RecursiveLink** module connects heterogeneous agents in a loop, so they generate latent thoughts and **transfer latent states** across agents instead of text
- an **inner–outer loop** learning algorithm co-optimises the whole system, with shared gradient-based credit assignment across recursion rounds
- theoretical analysis argues it's more efficient than text-based multi-agent systems and keeps gradients stable

## Key results

From the abstract: across **4** collaboration patterns and **9** benchmarks (maths, science, medicine, search, code), an average **+8.3%** accuracy with **1.2×–2.4×** end-to-end inference speed-up over advanced single-agent, multi-agent and recursive baselines. Figure 1 shows a clean scaling trend as recursion deepens for sub-1.5B agents.

## Limitations

There's no dedicated limitations section in the extracted text. Latent communication is harder for people to inspect than text messages between agents.
