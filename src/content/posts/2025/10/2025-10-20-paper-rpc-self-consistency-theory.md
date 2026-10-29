---
title: "Paper summary: A Theoretical Study on Bridging Internal Probability and Self-Consistency for LLM Reasoning"
categories: ["papers"]
tags: ["llm", "reasoning", "test-time-compute"]
summary: "A theoretical framework for sampling-based test-time scaling shows self-consistency has high estimation error and perplexity has high modelling error; the hybrid RPC method matches self-consistency with half the samples."
sources: 
  - title: "A Theoretical Study on Bridging Internal Probability and Self-Consistency for LLM Reasoning (arXiv:2510.15444)"
    url: "https://arxiv.org/abs/2510.15444"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:16.436Z"
  - title: "Hugging Face Daily Papers, 2025-10-20"
    url: "https://huggingface.co/papers?date=2025-10-20"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:32.164Z"
  - title: "A Theoretical Study on Bridging Internal Probability and Self-Consistency for LLM Reasoning (arXiv HTML full text)"
    url: "https://arxiv.org/html/2510.15444"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:16.436Z"
highlights: ["Self-consistency (majority vote) and perplexity-based selection fail in different ways: one has high estimation error, the other high modelling error.", "RPC reaches self-consistency's accuracy while cutting sampling cost by 50%."]
papers: 
  - title: "A Theoretical Study on Bridging Internal Probability and Self-Consistency for LLM Reasoning"
    authors: ["Zhi Zhou", "Yuhao Tan", "Zenan Li", "Yuan Yao", "Lan-Zhe Guo", "Yu-Feng Li", "Xiaoxing Ma"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2510.15444"
    pdf: "https://arxiv.org/pdf/2510.15444v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2510.15444.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2510.15444\">Zhou et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Illustration of the Rpc approach. The Reasoning Pruning filters out low-probability answers, while the Perplexity Consistency incorporates LLM probabilities into the self-consistency framework, resulting in …"
images: 
  - src: "images/2025/paper-2510.15444.webp"
    alt: "Figure from the paper \"A Theoretical Study on Bridging Internal Probability and Self-Consistency for LLM Reasoning\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2510.15444\">Zhou et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Illustration of the Rpc approach. The Reasoning Pruning filters out low-probability answers, while the Perplexity Consistency incorporates LLM probabilities into the self-consistency framework, resulting in …"
card: 
  task: "Theory and practice of sampling-based test-time scaling"
  method: "Confidence-estimation framework; RPC = Perplexity Consistency + Reasoning Pruning"
  data: "Seven benchmark datasets"
  result: "Comparable reasoning performance to self-consistency with 50% lower sampling cost and more reliable confidence, per the abstract"
draft: false
date: "2025-10-20"
---

## Problem

Sampling many reasoning paths and picking an answer (self-consistency, or choosing by model probability) works in practice, but the theory behind it was thin.

## Method

The authors build a theoretical framework that treats these methods as **confidence estimation**, and analyse two paradigms:

- **self-consistency** (majority vote): high **estimation error**
- **perplexity** (model probability): substantial **modelling error**, and its estimation error can converge badly

Their method **RPC** has two parts (Figure 1):

- **Perplexity Consistency**: combines the two, improving the convergence of estimation error from linear to exponential while keeping model error low
- **Reasoning Pruning**: removes low-probability reasoning paths to prevent degradation

## Key results

From the abstract: across **seven** benchmarks, RPC matches self-consistency's reasoning performance while improving confidence reliability and **cutting sampling cost by 50%**.

## Limitations

From the paper: only two typical methods (plus RPC) are analysed in depth, and as a post-hoc selection method its gains are moderate compared with approaches that involve training.
