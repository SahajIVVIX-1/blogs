---
title: "Paper summary: Spectral-Spatial Interpretation"
categories: ["papers"]
tags: ["cv", "interpretability", "remote-sensing"]
summary: "Spectral-Spatial Interpretation explains multispectral image models with a full position × channel attribution matrix, using a local Shapley game at each position, so it shows which channels matter where."
sources: 
  - title: "Spectral-Spatial Interpretation (arXiv:2610.21114)"
    url: "https://arxiv.org/abs/2610.21114"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:41.932Z"
  - title: "Hugging Face Daily Papers, 2026-10-22"
    url: "https://huggingface.co/papers?date=2026-10-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:37:14.533Z"
  - title: "Spectral-Spatial Interpretation (arXiv HTML full text)"
    url: "https://arxiv.org/html/2610.21114"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:41.932Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/AtheavenMa/Spectral-Spatial-Interpretation"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:54:41.932Z"
highlights: ["Heatmaps show where a model looks; channel scores show which bands matter globally; SSI shows which bands matter at each location.", "Summing a position's channel attributions exactly recovers that position's contribution, a built-in consistency property."]
papers: 
  - title: "Spectral-Spatial Interpretation"
    authors: ["Haotian Ma", "Ruqi Yang", "Philip Townsend"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2610.21114"
    pdf: "https://arxiv.org/pdf/2610.21114v1"
    code: "https://github.com/AtheavenMa/Spectral-Spatial-Interpretation"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Explaining models on multispectral images"
  method: "Shapley values over channels in a local conditional game per spatial position, giving a full spectral-spatial attribution matrix"
  data: "CUB-200, EuroSAT, HLS Burn Scar"
  result: "Best joint deletion/insertion AUC versus baselines; beats an MC-Owen estimator on HLS Burn Scar at ~6% of its evaluation budget, per the abstract"
draft: false
date: "2026-10-22"
---

## Problem

Post-hoc explanations usually give either a **spatial heatmap** (where the model looks) or **global channel scores** (which channels matter). For **multispectral** data, such as satellite bands, channel relevance is often **local** and physically meaningful: a band may matter only over burned land.

## Method

**Spectral-Spatial Interpretation (SSI)** attributes over **position–channel pairs**. For each spatial position, it fixes the observed surrounding context, defines a **conditional game** over that position's channels, and applies the **Shapley value**. The result is a **full spectral-spatial attribution matrix**. It satisfies Shapley fairness within each position, and summing a position's channel attributions exactly recovers that position's contribution relative to the baseline.

## Key results

From the abstract:

- on **HLS Burn Scar**, SSI beats an MC-Owen estimator on retained attribution metrics, using about **6%** of its evaluation budget
- across **CUB-200, EuroSAT and HLS Burn Scar** with two baselines, it has the best joint deletion and insertion AUC over dense, flat and rank-1 baselines, plus the strongest spectral hit rates

## Limitations

There's no dedicated limitations section in the extracted text. Shapley-based methods still need many model evaluations, which is why the evaluation budget is reported.
