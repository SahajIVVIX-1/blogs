---
title: "Built this: Modern DCGAN reproducibility study"
categories: ["projects"]
tags: ["gan", "generative-ai", "pytorch", "reproducibility"]
summary: "A DCGAN (Radford et al., 2015) reproduction that keeps the all-convolutional architecture but swaps in LSGAN loss, spectral normalisation and label smoothing, plus an analysis toolkit for filters and feature maps."
sources: 
  - title: "SahajIVVIX-1/Modern-DCGAN-Reproducibility (GitHub)"
    url: "https://github.com/SahajIVVIX-1/Modern-DCGAN-Reproducibility"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit c855489"
    url: "https://github.com/SahajIVVIX-1/Modern-DCGAN-Reproducibility/commit/c855489"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "Radford, Metz & Chintala (2015), Unsupervised Representation Learning with Deep Convolutional GANs"
    url: "https://arxiv.org/abs/1511.06434"
    publisher: "arXiv"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["Same architecture as the 2015 paper, more stable training engine: LSGAN loss, spectral norm, label smoothing and discriminator dropout.", "A GANAnalyzer class hooks into layers to visualise learned filters and feature maps without retraining."]
draft: false
date: "2026-03-28"
---

On 28 March 2026 I committed **Modern-DCGAN-Reproducibility**, a study of the DCGAN paper (Radford et al., 2015), implemented in PyTorch with Jupyter notebooks.

## What changed from the paper

The README compares the paper's choices with this implementation:

| component | 2015 paper | this repo |
|---|---|---|
| loss | binary cross-entropy | **LSGAN** (least squares) |
| discriminator normalisation | batch norm | **spectral normalisation** |
| initialisation | Normal(0, 0.02) | Xavier/Kaiming hybrid |
| regularisation | none | discriminator dropout (0.3) |
| labels | hard 0/1 | **label smoothing** (0.1/0.9) |

The all-convolutional generator and discriminator from the paper are kept.

## Analysis layer

A `GANAnalyzer` class uses PyTorch hooks to:

- plot the RGB filters of the discriminator's first layer, after a 25-epoch CIFAR-10 run
- show mid-layer generator feature maps (e.g. at 16×16)
- draw histograms of D(x) versus D(G(z)), to watch for mode collapse

It also produces a 4-panel training dashboard.

## Where it connects

I wrote it before reaching the generative AI phase. When the phase arrives in June 2026, the [GANs](/2026/06/08/genai-02-gans/) and [DCGAN](/2026/06/16/genai-03-dcgan/) notes come back to it.
