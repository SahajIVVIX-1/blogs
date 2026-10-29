---
title: "Paper summary: Less is More: Recursive Reasoning with Tiny Networks"
categories: ["papers"]
tags: ["reasoning", "small-models", "puzzles"]
summary: "Tiny Recursive Model, a single 2-layer network with 7M parameters that repeatedly refines its answer, reports 45% on ARC-AGI-1 and 8% on ARC-AGI-2, above many large LLMs on these puzzles."
sources: 
  - title: "Less is More: Recursive Reasoning with Tiny Networks (arXiv:2510.04871)"
    url: "https://arxiv.org/abs/2510.04871"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:03.880Z"
  - title: "Hugging Face Daily Papers, 2025-10-08"
    url: "https://huggingface.co/papers?date=2025-10-08"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:24.882Z"
  - title: "Less is More: Recursive Reasoning with Tiny Networks (arXiv HTML full text)"
    url: "https://arxiv.org/html/2510.04871"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:03.880Z"
highlights: ["A 7M-parameter network that recursively improves its own answer beats much larger LLMs on ARC-AGI puzzles.", "It simplifies the earlier Hierarchical Reasoning Model (two networks at two speeds) into one tiny network."]
papers: 
  - title: "Less is More: Recursive Reasoning with Tiny Networks"
    authors: ["Alexia Jolicoeur-Martineau"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2510.04871"
    pdf: "https://arxiv.org/pdf/2510.04871v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Hard puzzle reasoning (Sudoku, Maze, ARC-AGI) with tiny models"
  method: "Single 2-layer network applied recursively to refine latent reasoning and answer"
  data: "ARC-AGI-1, ARC-AGI-2, Sudoku, Maze; ~1000 training examples scale"
  result: "45% ARC-AGI-1 and 8% ARC-AGI-2 with 7M parameters, above most LLMs (e.g. DeepSeek R1, o3-mini, Gemini 2.5 Pro), per the abstract"
draft: false
date: "2025-10-08"
---

## Problem

The **Hierarchical Reasoning Model (HRM)** used two small networks recursing at different frequencies, trained on about 1,000 examples, and beat LLMs on Sudoku, Maze and ARC-AGI. The author notes HRM was not well understood and possibly suboptimal.

## Method

**Tiny Recursive Model (TRM)** keeps the core idea, **recursion**, and drops the rest: a **single tiny network with only 2 layers** applied repeatedly to refine its reasoning state and answer.

## Key results

From the abstract: with **7M parameters**, TRM reaches **45%** test accuracy on **ARC-AGI-1** and **8%** on **ARC-AGI-2**. That's higher than most LLMs, including DeepSeek R1, o3-mini and Gemini 2.5 Pro, with less than **0.01%** of their parameters, and better generalisation than HRM.

## Limitations

There's no dedicated limitations section in the extracted text. TRM is a puzzle-solving network, not a general-purpose language model, so the comparison with LLMs is on these puzzle benchmarks only.
