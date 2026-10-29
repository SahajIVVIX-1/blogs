---
title: "Paper summary: Agentic Reinforced Policy Optimization"
categories: ["papers"]
tags: ["agents", "rl", "tools"]
summary: "ARPO is an RL algorithm for multi-turn tool-using agents that samples extra rollouts right after tool calls, where the model's token entropy spikes, and is reported to beat trajectory-level RL with half the tool calls."
sources: 
  - title: "Agentic Reinforced Policy Optimization (arXiv:2507.19849)"
    url: "https://arxiv.org/abs/2507.19849"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:01.673Z"
  - title: "Hugging Face Daily Papers, 2025-07-29"
    url: "https://huggingface.co/papers?date=2025-07-29"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:41.928Z"
  - title: "Agentic Reinforced Policy Optimization (arXiv HTML full text)"
    url: "https://arxiv.org/html/2507.19849"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:01.673Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/dongguanting/ARPO"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:48:01.673Z"
highlights: ["Right after a tool returns, the model's next tokens become much more uncertain, so that's where ARPO explores more.", "The paper reports better results with only half the tool-use budget of existing methods."]
papers: 
  - title: "Agentic Reinforced Policy Optimization"
    authors: ["Guanting Dong", "Hangyu Mao", "Kai Ma", "Licheng Bao", "Yifei Chen", "Zhongyuan Wang", "Zhongxia Chen", "Jiazhen Du", "Huiyang Wang", "Fuzheng Zhang", "Guorui Zhou", "Yutao Zhu", "Ji-Rong Wen", "Zhicheng Dou"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2507.19849"
    pdf: "https://arxiv.org/pdf/2507.19849v1"
    code: "https://github.com/dongguanting/ARPO"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "RL training for multi-turn, tool-using LLM agents"
  method: "Entropy-based adaptive rollout (more branching at high-uncertainty steps after tool use) + advantage attribution estimation"
  data: "13 benchmarks in computational reasoning, knowledge reasoning and deep search"
  result: "Outperforms trajectory-level RL while using half the tool-use budget, per the abstract"
draft: false
date: "2025-07-29"
---

## Problem

RL with verifiable rewards works well for single-turn reasoning. Real agents interleave reasoning with **multiple tool calls**, and current RL algorithms balance long-horizon reasoning and multi-turn tool interaction poorly.

## Method

The authors first observe that the entropy of the model's generated tokens **rises sharply right after a tool returns**: the model becomes uncertain. **ARPO** uses this:

- an **entropy-based adaptive rollout** mixes whole-trajectory sampling with extra **step-level branching** at those high-uncertainty points
- **advantage attribution estimation** helps the model learn which tool-use steps made the difference

## Key results

From the abstract: across **13** benchmarks in computational reasoning, knowledge reasoning and deep search, ARPO beats trajectory-level RL algorithms and reaches better performance using **half the tool-use budget** of existing methods. Code and datasets are released.

## Limitations

There's no dedicated limitations section in the extracted text. Results are on the authors' chosen 13 benchmarks.
