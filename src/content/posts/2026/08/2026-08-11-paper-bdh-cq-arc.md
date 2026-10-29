---
title: "Paper summary: BDH-CQ: In-Context Learning with Recurrent Latent Reasoning"
categories: ["papers"]
tags: ["reasoning", "in-context-learning", "puzzles"]
summary: "BDH-CQ combines in-context learning with recurrent latent reasoning in the Dragon Hatchling architecture; a 150M model reaches 29.5% pass@2 on ARC-AGI-1 at about $0.0007 per task, a new cost–accuracy frontier."
sources: 
  - title: "BDH-CQ: In-Context Learning with Recurrent Latent Reasoning (arXiv:2608.09888)"
    url: "https://arxiv.org/abs/2608.09888"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:39.740Z"
  - title: "Hugging Face Daily Papers, 2026-08-11"
    url: "https://huggingface.co/papers?date=2026-08-11"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:30.905Z"
  - title: "BDH-CQ: In-Context Learning with Recurrent Latent Reasoning (arXiv HTML full text)"
    url: "https://arxiv.org/html/2608.09888"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:39.740Z"
highlights: ["Demonstrations update the model's recurrent memory, then it reasons in latent space without writing out steps.", "The claim is about efficiency: decent ARC-AGI accuracy at a tiny fraction of a cent per task."]
papers: 
  - title: "BDH-CQ: In-Context Learning with Recurrent Latent Reasoning"
    authors: ["Björn Engdahl", "Adrian Kosowski", "Jan Chorowski", "Zuzanna Stamirowska", "Przemysław Uznański", "Junlin Jiang", "Rohan Phadke", "Remigiusz Kinas", "Richard Zhong"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2608.09888"
    pdf: "https://arxiv.org/pdf/2608.09888v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Abstract reasoning puzzles (ARC-AGI-1) efficiently"
  method: "In-context learning that updates recurrent memory + iterative latent reasoning (BDH architecture); controlled ARC-like interventions"
  data: "ARC-AGI-1 public evaluation set"
  result: "150M model: 29.5% pass@2 at $0.0007 per task; beyond the previous cost-accuracy Pareto frontier, per the abstract"
draft: false
date: "2026-08-11"
---

## Problem

ARC-AGI tests learning a new transformation from a few examples. Strong scores have usually come from very large models at high cost per task.

## Method

**BDH-CQ** builds on the **Dragon Hatchling (BDH)** architecture (summarised here in October 2025). Demonstrations presented at inference **continuously update the model's recurrent memory**, and it then solves the query through **iterative computation in a high-dimensional latent space**, without verbalising its reasoning. Controlled ARC-like interventions probe what it learns from demonstrations and how consistently it applies an inferred rule.

## Key results

From the abstract: a **150M-parameter** model reaches **29.5% pass@2** on ARC-AGI-1 at about **$0.0007 per task**, which the authors say goes past the previously reported cost–accuracy Pareto frontier.

## Limitations

There's no dedicated limitations section in the extracted text. The absolute accuracy (29.5%) is well below the strongest systems. The claim is about cost efficiency.
