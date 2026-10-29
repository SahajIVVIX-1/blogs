---
title: "Paper summary: 3D Gaussian Splatting for Real-Time Radiance Field Rendering"
categories: ["papers"]
tags: ["cv", "3d", "rendering"]
summary: "3D Gaussian Splatting represents a scene as a large set of optimised 3D Gaussians and renders them with a fast rasteriser, reaching real-time novel-view synthesis at 1080p."
sources: 
  - title: "3D Gaussian Splatting for Real-Time Radiance Field Rendering (arXiv:2308.04079)"
    url: "https://arxiv.org/abs/2308.04079"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:25.285Z"
  - title: "Hugging Face Daily Papers, 2023-08-09"
    url: "https://huggingface.co/papers?date=2023-08-09"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:24:58.767Z"
  - title: "3D Gaussian Splatting for Real-Time Radiance Field Rendering (arXiv HTML full text)"
    url: "https://arxiv.org/html/2308.04079"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:25.285Z"
  - title: "Code repository"
    url: "https://github.com/graphdeco-inria/gaussian-splatting"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:37:25.285Z"
highlights: ["The scene is a cloud of anisotropic 3D Gaussians, optimised from camera-calibration points.", "The paper reports at least 30 fps at 1080p with quality comparable to the best NeRF-style methods."]
papers: 
  - title: "3D Gaussian Splatting for Real-Time Radiance Field Rendering"
    authors: ["Bernhard Kerbl", "Georgios Kopanas", "Thomas Leimkühler", "George Drettakis"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2308.04079"
    pdf: "https://arxiv.org/pdf/2308.04079v1"
    code: "https://github.com/graphdeco-inria/gaussian-splatting"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2023/paper-2308.04079.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2308.04079\">Kerbl et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 . Our method achieves real-time rendering of radiance fields with quality that equals the previous method with the best quality ( Barron et al., 2022 ) , while only requiring optimization times competitive with …"
images: 
  - src: "images/2023/paper-2308.04079.webp"
    alt: "Figure from the paper \"3D Gaussian Splatting for Real-Time Radiance Field Rendering\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2308.04079\">Kerbl et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 . Our method achieves real-time rendering of radiance fields with quality that equals the previous method with the best quality ( Barron et al., 2022 ) , while only requiring optimization times competitive with …"
card: 
  task: "Novel-view synthesis from multiple photos of a scene"
  method: "Explicit 3D Gaussians with optimised position, anisotropic covariance, opacity and colour, plus adaptive density control and a tile-based differentiable rasteriser"
  data: "Established novel-view synthesis datasets (unbounded and complete scenes)"
  result: "Real-time (≥30 fps) 1080p rendering with state-of-the-art visual quality and competitive training time, as reported"
draft: false
date: "2023-08-09"
---

## Problem

Radiance-field methods (NeRF and successors) produce excellent novel views of a scene from photos, but the best-quality ones are slow to train and far too slow to render in real time. Faster methods trade away quality. For full, unbounded scenes at 1080p, no method rendered in real time at top quality.

## Method

Instead of a neural network queried along rays, the scene is represented explicitly as a set of **3D Gaussians**:

1. Start from the sparse points that camera calibration (structure-from-motion) already produces.
2. Optimise each Gaussian's position, **anisotropic covariance** (its stretched ellipsoid shape), opacity and view-dependent colour, while adding and removing Gaussians where needed (**density control**).
3. Render with a **visibility-aware, tile-based rasteriser** that "splats" Gaussians onto the image. It's differentiable, so the same renderer drives training.

## Key results

The authors report state-of-the-art visual quality with competitive training times, and real-time rendering at **≥30 fps at 1080p** on several standard datasets.

## Limitations

From the paper's own limitations section:

- Artifacts appear in poorly observed regions, where other methods struggle too.
- Gaussians can become elongated or "splotchy".
- "Popping" artifacts occasionally appear, which the authors trace partly to their simple culling and visibility ordering.

They also note that, while compact compared with earlier point-based approaches, memory use is significantly higher than NeRF-based methods. Peak GPU memory during training of large scenes can exceed 20 GB in their unoptimised prototype.
