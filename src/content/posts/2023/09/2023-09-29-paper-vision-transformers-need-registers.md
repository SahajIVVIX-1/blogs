---
title: "Paper summary: Vision Transformers Need Registers"
categories: ["papers"]
tags: ["cv", "vision-transformers", "representation-learning"]
summary: "ViTs repurpose some background patch tokens as internal scratch space, which produces high-norm artifacts; adding a few extra \"register\" tokens fixes this and smooths attention maps."
sources: 
  - title: "Vision Transformers Need Registers (arXiv:2309.16588)"
    url: "https://arxiv.org/abs/2309.16588"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:02.548Z"
  - title: "Hugging Face Daily Papers, 2023-09-29"
    url: "https://huggingface.co/papers?date=2023-09-29"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:29.700Z"
  - title: "Vision Transformers Need Registers (arXiv HTML full text)"
    url: "https://arxiv.org/html/2309.16588"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:02.548Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/facebookresearch/dinov2"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:38:02.548Z"
highlights: ["Large ViTs quietly reuse uninformative background patches for internal computation, which shows up as high-norm outlier tokens.", "Giving the model dedicated extra tokens (registers) removes the artifacts."]
papers: 
  - title: "Vision Transformers Need Registers"
    authors: ["Timothée Darcet", "Maxime Oquab", "Julien Mairal", "Piotr Bojanowski"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2309.16588"
    pdf: "https://arxiv.org/pdf/2309.16588v2"
    code: "https://github.com/facebookresearch/dinov2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Clean feature and attention maps from Vision Transformers"
  method: "Append a few learnable 'register' tokens to the input sequence, discarded at the output"
  data: "Supervised and self-supervised ViTs, including DINOv2"
  result: "Removes high-norm artifacts, new state of the art for self-supervised models on dense prediction, smoother attention maps, per the authors"
draft: false
date: "2023-09-29"
---

## Problem

Attention maps and feature maps of large Vision Transformers, both supervised and self-supervised (e.g. DINOv2), contain **artifacts**: a few tokens with unusually **high norm**, mostly in low-information background regions. They make attention maps noisy and hurt methods that rely on clean dense features, like object discovery.

## Method

The authors characterise these tokens and interpret them as the model **recycling patches it doesn't need** (background) as scratch space for global computation. Their fix is to give the model that space explicitly: append a few extra learnable tokens, **registers**, to the input sequence. They're used during processing and discarded at the output.

## Key results

According to the paper, registers:

- remove the artifacts entirely in both supervised and self-supervised models
- set a new state of the art for self-supervised visual models on dense prediction
- make object-discovery methods work with larger models
- give smoother feature and attention maps

## Limitations

There's no dedicated limitations section. The fix requires (re)training with registers, so existing checkpoints don't benefit automatically. The interpretation of *why* the artifacts appear comes from the authors' analysis, not a formal proof.
