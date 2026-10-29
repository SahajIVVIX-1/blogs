---
title: "Paper summary: Depth Anything V2"
categories: ["papers"]
tags: ["cv", "depth-estimation"]
summary: "Depth Anything V2 trains a monocular depth teacher on synthetic images only, then teaches student models through large-scale pseudo-labelled real images, giving finer and more robust depth than V1."
sources: 
  - title: "Depth Anything V2 (arXiv:2406.09414)"
    url: "https://arxiv.org/abs/2406.09414"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:51.188Z"
  - title: "Hugging Face Daily Papers, 2024-06-14"
    url: "https://huggingface.co/papers?date=2024-06-14"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:07.413Z"
  - title: "Depth Anything V2 (arXiv HTML full text)"
    url: "https://arxiv.org/html/2406.09414"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:51.188Z"
highlights: ["Swapping all labelled real images for synthetic ones avoids the noisy depth labels of real datasets.", "Pseudo-labelled real images bridge the gap between synthetic training and the real world."]
papers: 
  - title: "Depth Anything V2"
    authors: ["Lihe Yang", "Bingyi Kang", "Zilong Huang", "Zhen Zhao", "Xiaogang Xu", "Jiashi Feng", "Hengshuang Zhao"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2406.09414"
    pdf: "https://arxiv.org/pdf/2406.09414v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Monocular depth estimation (and metric depth after fine-tuning)"
  method: "Synthetic-only labelled training for a scaled-up teacher; students trained on large-scale pseudo-labelled real images"
  data: "Synthetic depth data; large unlabelled real image set; new evaluation benchmark"
  result: "Finer, more robust depth than V1; >10× faster and more accurate than Stable-Diffusion-based models; 25M–1.3B sizes, per the abstract"
draft: false
date: "2024-06-14"
---

## Problem

Monocular depth estimation (depth from a single image) needs training data, and real-world depth labels are **noisy**. Sensors fail on mirrors, glass and thin structures. Strong recent models built on Stable Diffusion were accurate but slow.

## Method

The authors focus on data rather than "fancy techniques", with three practices:

1. **Replace all labelled real images with synthetic images**, whose depth labels are precise.
2. **Scale up the teacher model**'s capacity.
3. Train **student models** through a "bridge" of **large-scale pseudo-labelled real images**: the teacher labels real photos, which closes the synthetic-to-real gap.

They release models from **25M to 1.3B** parameters, and fine-tune them with metric depth labels to get metric-depth versions.

## Key results

The abstract reports much finer and more robust predictions than V1, and **more than 10× faster** and more accurate results than the latest Stable-Diffusion-based models.

## Limitations

The paper's limitations discussion is mostly about **evaluation**. Common test sets (e.g. NYU-D, KITTI) have noisy labels on mirrors and thin structures, limited scene diversity and low resolution, so reported metrics aren't fully reliable. That's why the authors build a new benchmark with precise annotations and diverse scenes.
