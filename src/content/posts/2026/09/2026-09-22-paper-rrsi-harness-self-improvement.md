---
title: "Paper summary: RRSI: Regularized Recursive Self-Improvement of Agent Harnesses"
categories: ["papers"]
tags: ["agents", "self-improvement", "regularisation"]
summary: "Automatically evolving an agent's harness (prompts, control flow, tools, memory) tends to overfit the tasks it evolves on; RRSI regularises the proposal and selection steps and keeps gains on out-of-distribution benchmarks."
sources: 
  - title: "RRSI: Regularized Recursive Self-Improvement of Agent Harnesses (arXiv:2609.24972)"
    url: "https://arxiv.org/abs/2609.24972"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:16.919Z"
  - title: "Hugging Face Daily Papers, 2026-09-22"
    url: "https://huggingface.co/papers?date=2026-09-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:56.354Z"
  - title: "RRSI: Regularized Recursive Self-Improvement of Agent Harnesses (arXiv HTML full text)"
    url: "https://arxiv.org/html/2609.24972"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:16.919Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/google-research/rrsi"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:54:16.919Z"
highlights: ["Recursive self-improvement of agent harnesses can memorise its training tasks, much like an overfit model.", "Limits on edit size, a critic against benchmark-specific tricks and a pruner for useless changes favour reusable mechanisms."]
papers: 
  - title: "RRSI: Regularized Recursive Self-Improvement of Agent Harnesses"
    authors: ["Peng Xia", "Rujun Han", "Zifeng Wang", "Yanfei Chen", "Yufan Zhuang", "Yoonho Lee", "Chengsong Huang", "Han Yu", "Zhongying CuiZhu", "Yifei Ming", "Huaxiu Yao", "Burak Gokturk", "Tomas Pfister", "Chen-Yu Lee"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2609.24972"
    pdf: "https://arxiv.org/pdf/2609.24972v3"
    code: "https://github.com/google-research/rrsi"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Generalisable recursive self-improvement of agent harnesses"
  method: "Regularised proposer (annealed edit budget, novelty from history) + selector with critic and pruner; frozen backbone"
  data: "Eight benchmarks: coding, agentic workspace, engineering design"
  result: "Up to +6.0 on the evolve split and up to +4.3 on five out-of-distribution benchmarks, per the abstract"
draft: false
date: "2026-09-22"
---

## Problem

An LLM agent's ability depends heavily on its **harness**: prompts, control flow, tools, memory and context management around a frozen model (see "Code as Agent Harness", May 2026). Methods that **automatically evolve** harnesses create a kind of **recursive self-improvement**, but they can **overfit**, with big in-distribution gains that shrink or vanish out of distribution.

## Method

**RRSI** applies regularisation ideas to harness evolution:

- the **proposer** has a **temporally annealed budget** on how many edits a candidate can bundle, and is pushed toward unexplored trajectories based on evolution history
- the **selector** has a **critic** that screens out benchmark-specific proposals, and a **pruner** that removes changes that are too small, too costly or no longer useful

## Key results

From the abstract: across **eight** benchmarks (coding, agentic workspace, engineering design), up to **+6.0** points on the split it evolves against and up to **+4.3** on **five** out-of-distribution benchmarks.

## Limitations

From the paper:

- only harness-level improvement with **frozen** models; no weight updates
- depends on a finite evolve set and several regularisation hyperparameters
- broader validation is needed across different agent architectures, tool ecosystems and longer self-improvement runs
