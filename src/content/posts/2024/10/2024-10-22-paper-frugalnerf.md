---
title: "Paper summary: FrugalNeRF: Fast Convergence for Extreme Few-shot Novel View Synthesis without Learned Priors"
categories: ["papers"]
tags: ["cv", "3d", "nerf"]
summary: "FrugalNeRF trains NeRFs from very few views quickly, using weight-sharing multi-scale voxels and pseudo depth chosen by cross-scale reprojection error, without relying on learned priors."
sources: 
  - title: "FrugalNeRF: Fast Convergence for Extreme Few-shot Novel View Synthesis without Learned Priors (arXiv:2410.16271)"
    url: "https://arxiv.org/abs/2410.16271"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:49.839Z"
  - title: "Hugging Face Daily Papers, 2024-10-22"
    url: "https://huggingface.co/papers?date=2024-10-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:26.681Z"
  - title: "FrugalNeRF: Fast Convergence for Extreme Few-shot Novel View Synthesis without Learned Priors (arXiv HTML full text)"
    url: "https://arxiv.org/html/2410.16271"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:49.839Z"
highlights: ["Pseudo ground-truth depth is picked by checking which scale best explains the other views (reprojection error).", "Pretrained priors are optional: they can be added without slowing convergence."]
papers: 
  - title: "FrugalNeRF: Fast Convergence for Extreme Few-shot Novel View Synthesis without Learned Priors"
    authors: ["Chin-Yang Lin", "Chung-Ho Wu", "Chang-Han Yeh", "Shih-Han Yen", "Cheng Sun", "Yu-Lun Liu"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2410.16271"
    pdf: "https://arxiv.org/pdf/2410.16271v3"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Few-shot novel-view synthesis with NeRF"
  method: "Weight-sharing voxels across multiple scales; cross-scale geometric adaptation selecting pseudo depth by reprojection error"
  data: "LLFF, DTU, RealEstate-10K"
  result: "Outperforms other few-shot NeRF methods with much shorter training time, per the abstract"
draft: false
date: "2024-10-22"
---

## Problem

NeRFs trained from only a handful of views **overfit** and take a long time to train. Existing fixes either regularise frequencies with complex schedules (FreeNeRF) or rely on **pretrained priors** (SparseNeRF), which can bring bias.

## Method

**FrugalNeRF**:

- represents the scene with **weight-sharing voxels at multiple scales**, which captures details efficiently
- uses **cross-scale geometric adaptation**: at each scale it renders depth and checks **reprojection error** against other views, then picks the best as **pseudo ground-truth depth** to guide training

This makes full use of the few training images without external learned priors. Priors can still be added for extra quality without slowing convergence.

## Key results

From the abstract: on **LLFF, DTU and RealEstate-10K**, FrugalNeRF outperforms other few-shot NeRF methods while **significantly reducing training time**.

## Limitations

There's no dedicated limitations section in the extracted text. Results cover these three standard few-shot benchmarks.
