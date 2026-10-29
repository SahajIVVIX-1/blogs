---
title: "Paper summary: MVDream: Multi-view Diffusion for 3D Generation"
categories: ["papers"]
tags: ["genai", "diffusion", "3d"]
summary: "MVDream trains a diffusion model to generate several consistent views of an object at once, then uses it as a 3D prior for text-to-3D, which reduces problems like the \"two-faced horse\"."
sources: 
  - title: "MVDream: Multi-view Diffusion for 3D Generation (arXiv:2308.16512)"
    url: "https://arxiv.org/abs/2308.16512"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:38.247Z"
  - title: "Hugging Face Daily Papers, 2023-09-01"
    url: "https://huggingface.co/papers?date=2023-09-01"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:12.745Z"
  - title: "MVDream: Multi-view Diffusion for 3D Generation (arXiv HTML full text)"
    url: "https://arxiv.org/html/2308.16512"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:38.247Z"
  - title: "Code repository"
    url: "https://github.com/bytedance/MVDream"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:37:38.247Z"
highlights: ["Generating multiple views jointly gives the model 3D consistency that single-view 2D diffusion lacks.", "Used with Score Distillation Sampling, the multi-view model stabilises text-to-3D generation."]
papers: 
  - title: "MVDream: Multi-view Diffusion for 3D Generation"
    authors: ["Yichun Shi", "Peng Wang", "Jianglong Ye", "Mai Long", "Kejie Li", "Xiao Yang"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2308.16512"
    pdf: "https://arxiv.org/pdf/2308.16512v4"
    code: "https://github.com/bytedance/MVDream"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2023/paper-2308.16512.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2308.16512\">Shi et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Typical multi-view consistency problems of 2D-lifting methods for 3D generation. Left: “A photo of a horse walking” where the horse has two faces. Right: “a DSLR photo of a plate of fried chicken and waffles …"
images: 
  - src: "images/2023/paper-2308.16512.webp"
    alt: "Figure from the paper \"MVDream: Multi-view Diffusion for 3D Generation\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2308.16512\">Shi et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Typical multi-view consistency problems of 2D-lifting methods for 3D generation. Left: “A photo of a horse walking” where the horse has two faces. Right: “a DSLR photo of a plate of fried chicken and waffles …"
card: 
  task: "Text-to-3D generation and consistent multi-view image generation"
  method: "Multi-view diffusion model trained on 2D and 3D data, used as a prior via Score Distillation Sampling"
  data: "Mixture of 2D image–text data and rendered 3D data"
  result: "More consistent and stable 2D-lifting text-to-3D, plus DreamBooth-style concept learning for 3D, per the authors"
draft: false
date: "2023-09-01"
---

## Problem

A popular route to text-to-3D is "2D lifting": optimise a 3D representation so that renders of it look good to a 2D text-to-image diffusion model (Score Distillation Sampling). Because the 2D model judges each view independently, the results often have multi-view inconsistencies, like the **multi-face "Janus" problem** in the paper's Figure 1, where a horse gets two faces.

## Method

MVDream trains a **multi-view diffusion model** that generates several views of the same object (four orthogonal views in the main setup) jointly, from a text prompt. Training mixes 2D image–text data, for generality, with 3D data rendered from multiple angles, for consistency. The authors argue this model acts as a **generalisable 3D prior** that doesn't care which 3D representation is used. They plug it into Score Distillation Sampling, and also show few-shot concept learning similar to DreamBooth.

## Key results

The paper reports that using the multi-view model significantly improves the consistency and stability of existing 2D-lifting methods, and that it can learn new concepts from a few 2D examples for 3D generation.

## Limitations

Their discussion notes that the main model is trained for four orthogonal views at the same elevation. A small extension experiment generalised to more, non-orthogonal views, but with worse quality than the orthogonal setting.
