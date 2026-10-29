---
title: "Paper summary: VGI-Bench: Probing Visual Intelligence in Video Generation Models"
categories: ["papers"]
tags: ["video", "reasoning", "benchmark"]
summary: "VGI-Bench tests visual reasoning in video generation models with 27 tasks and 810 instances that require a valid process, not just a plausible final frame; the best model, Seedance 2.0, scores 51.0%."
sources: 
  - title: "VGI-Bench: Probing Visual Intelligence in Video Generation Models (arXiv:2608.19583)"
    url: "https://arxiv.org/abs/2608.19583"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:52.531Z"
  - title: "Hugging Face Daily Papers, 2026-08-27"
    url: "https://huggingface.co/papers?date=2026-08-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:40.850Z"
  - title: "VGI-Bench: Probing Visual Intelligence in Video Generation Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2608.19583"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:52.531Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/hexuan21/VGI-Bench"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:53:52.531Z"
highlights: ["A video \"solution\" has to show a valid evolving process, not just end on a plausible final state.", "Later denoising steps mostly refine early guesses rather than correct reasoning errors."]
papers: 
  - title: "VGI-Bench: Probing Visual Intelligence in Video Generation Models"
    authors: ["Xuan He", "Cong Wei", "Yuhao Cheng", "Linrui Ma", "Yuxuan Zhang", "Zuojun Li", "Yuhao Wen", "Jize Jiang", "Zeyi Liu", "Yuren Hao", "Songcheng Cai", "Keming Wu", "Penghui Du", "Kai Zou", "Rui Yang", "Chenkai Sun", "Ke Yang", "Ping Nie", "Kelsey R Allen", "Chenglong Wang", "Michel Galley", "Jianfeng Gao", "ChengXiang Zhai"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2608.19583"
    pdf: "https://arxiv.org/pdf/2608.19583v3"
    code: "https://github.com/hexuan21/VGI-Bench"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2608.19583.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2608.19583\">He et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Overview of representative tasks in our benchmark. VGI-Bench adopts a double-level taxonomy : the first level groups every task into one of four mutually exclusive task domains , while the second level …"
images: 
  - src: "images/2026/paper-2608.19583.webp"
    alt: "Figure from the paper \"VGI-Bench: Probing Visual Intelligence in Video Generation Models\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2608.19583\">He et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Overview of representative tasks in our benchmark. VGI-Bench adopts a double-level taxonomy : the first level groups every task into one of four mutually exclusive task domains , while the second level …"
card: 
  task: "Evaluating zero-shot visual reasoning in video generation models"
  method: "27 tasks / 810 instances with two-level taxonomy (domains, skill tags); analysis of failure modes, condition sensitivity, fine-tuning transfer and denoising dynamics"
  data: "Image-to-video, 16:9, English prompts"
  result: "Strongest model (Seedance 2.0) reaches 51.0%, per the abstract"
draft: false
date: "2026-08-27"
---

## Problem

Some work suggests video generators can reason visually through the frames they generate ("Thinking with Video" is summarised here in Nov 2025). Evaluating this reliably is hard: inputs must suit the models, solutions must show a **valid process**, and difficulty must be challenging but partly feasible.

## Method

**VGI-bench**: **27 tasks** and **810 instances**, organised by a two-level taxonomy of task domains and skill tags (Figure 1). Beyond scores, the authors analyse failure modes, sensitivity to input conditions, how far synthetic fine-tuning transfers, and the denoising process itself.

## Key results

From the abstract:

- current systems solve **some** visually grounded reasoning tasks but are far from reliable
- the strongest model, **Seedance 2.0** (summarised here in April 2026), achieves only **51.0%**
- self-correction is limited: later denoising steps mainly **refine early hypotheses** rather than fix reasoning errors

## Limitations

From the paper:

- tasks fit current clip lengths (about 5–10 s), so long multi-step procedures are out of scope
- **image-to-video only**, at a fixed 16:9 ratio
- **English-only** prompts and rubrics
- the suite is representative, not exhaustive
