---
title: "Paper summary: Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance"
categories: ["papers"]
tags: ["genai", "video", "motion-control"]
summary: "Wan-Move adds precise motion control to an image-to-video model by turning dense point trajectories into a motion-aware latent condition, with no architecture change; user studies rate it close to Kling 1.5 Pro's Motion Brush."
sources: 
  - title: "Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance (arXiv:2512.08765)"
    url: "https://arxiv.org/abs/2512.08765"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:59.870Z"
  - title: "Hugging Face Daily Papers, 2025-12-10"
    url: "https://huggingface.co/papers?date=2025-12-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:03.064Z"
  - title: "Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance (arXiv HTML full text)"
    url: "https://arxiv.org/html/2512.08765"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:59.870Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/ali-vilab/Wan-Move"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:49:59.870Z"
highlights: ["Motion is given as dense point trajectories; first-frame features are propagated along them to tell the model how each part should move.", "No extra motion encoder and no architecture change are needed, which makes it easy to scale."]
papers: 
  - title: "Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance"
    authors: ["Ruihang Chu", "Yefei He", "Zhekai Chen", "Shiwei Zhang", "Xiaogang Xu", "Bin Xia", "Dingdong Wang", "Hongwei Yi", "Xihui Liu", "Hengshuang Zhao", "Yu Liu", "Yingya Zhang", "Yujiu Yang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2512.08765"
    pdf: "https://arxiv.org/pdf/2512.08765v1"
    code: "https://github.com/ali-vilab/Wan-Move"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Motion-controllable video generation"
  method: "Dense point trajectories projected to latent space; first-frame features propagated along trajectories as the new condition for Wan-I2V-14B"
  data: "MoveBench (new) and a public dataset"
  result: "5-second 480p videos with motion control rivalling Kling 1.5 Pro's Motion Brush in user studies, per the abstract"
draft: false
date: "2025-12-10"
---

## Problem

Existing motion-controllable video methods, according to the abstract, offer coarse control and scale poorly.

## Method

The core idea is to make the **condition features themselves motion-aware**:

1. represent object motion as **dense point trajectories**
2. **project** them into latent space and **propagate the first frame's features** along each trajectory
3. use the resulting spatio-temporal feature map as the latent condition for an off-the-shelf image-to-video model (**Wan-I2V-14B**), **without changing its architecture**

There's no auxiliary motion encoder, so fine-tuning scales easily. The authors also build **MoveBench**, with more data, longer videos and high-quality motion annotations.

## Key results

From the abstract: 5-second, **480p** videos whose motion control **rivals Kling 1.5 Pro's Motion Brush** in user studies, and better motion quality on MoveBench and a public dataset. Code, models and benchmark are released.

## Limitations

There's no dedicated limitations section in the extracted text. The headline comparison with Kling comes from user studies.
