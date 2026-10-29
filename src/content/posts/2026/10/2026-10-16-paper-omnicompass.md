---
title: "Paper summary: OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding"
categories: ["papers"]
tags: ["multimodal", "video", "benchmark"]
summary: "OmniCompass is a manually annotated benchmark for video grounding and understanding, with a vision track and an audio-visual track (when, where and what); across 50 MLLMs, the best scores are only around 40%."
sources: 
  - title: "OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding (arXiv:2610.18829)"
    url: "https://arxiv.org/abs/2610.18829"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:35.709Z"
  - title: "Hugging Face Daily Papers, 2026-10-16"
    url: "https://huggingface.co/papers?date=2026-10-16"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:37:10.904Z"
  - title: "OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding (arXiv HTML full text)"
    url: "https://arxiv.org/html/2610.18829"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:35.709Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/PolyU-VCLab/OmniCompass"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:54:35.709Z"
highlights: ["Each track tests three questions: when does the target appear (temporal grounding), where is it (spatial grounding), and what happens (QA).", "Even the best models score about 40% on the vision track."]
papers: 
  - title: "OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding"
    authors: ["Xuyang Liu", "Shihao Wang", "Xinyu Wei", "Minghan Li", "Zeqing Wang", "Zuhao Yang", "Zichen Wen", "Lei Zhang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2610.18829"
    pdf: "https://arxiv.org/pdf/2610.18829v1"
    code: "https://github.com/PolyU-VCLab/OmniCompass"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2610.18829.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2610.18829\">Liu et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Overall model performance on OmniCompass-VL. Gemini-3.8-Flash and Kimi-K3 achieve the highest scores among proprietary and open-source models, respectively, at 42.8% and 39.6%."
images: 
  - src: "images/2026/paper-2610.18829.webp"
    alt: "Figure from the paper \"OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2610.18829\">Liu et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Overall model performance on OmniCompass-VL. Gemini-3.8-Flash and Kimi-K3 achieve the highest scores among proprietary and open-source models, respectively, at 42.8% and 39.6%."
card: 
  task: "Holistic omni-modal video grounding and understanding"
  method: "Two tracks (VL: visual evidence; AV: joint audio-visual evidence) × three tasks (temporal grounding, spatial grounding, QA); text-only and text+image target specification"
  data: "VL: 820 videos, 2,460 instances; AV: 240 videos, 720 instances; manual multi-round verification"
  result: "Gemini-3.8-Flash 42.8% and Kimi-K3 39.6% lead on OmniCompass-VL; open models lag proprietary ones, per the paper"
draft: false
date: "2026-10-16"
---

## Problem

Video benchmarks each cover only part of what "understanding a video" means, so it's hard to diagnose omni-modal models systematically.

## Method

**OmniCompass** has two tracks:

- **OmniCompass-VL**: vision-language models, tasks needing visual evidence (820 videos, 2,460 instances, short to long)
- **OmniCompass-AV**: omni-modal models, tasks needing joint audio-visual evidence (240 narrative- and audio-rich videos, 720 instances)

Each track has **temporal grounding** (when), **spatial grounding** (where) and **QA** (what), across perception and reasoning categories. Every instance is evaluated with the target specified by **text only** and by **text + image**. All instances are manually annotated with multi-round checks.

## Key results

From the abstract and Figure 1: across **50** MLLMs, open-source models still lag proprietary ones. On OmniCompass-VL, the top scores are **Gemini-3.8-Flash at 42.8%** (proprietary) and **Kimi-K3 at 39.6%** (open; Kimi K3 is summarised here in July).

## Limitations

There's no dedicated limitations section in the extracted text. The audio-visual track is a smaller subset.
