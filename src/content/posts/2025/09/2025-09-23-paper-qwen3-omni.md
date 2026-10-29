---
title: "Paper summary: Qwen3-Omni Technical Report"
categories: ["papers"]
tags: ["multimodal", "speech", "llm"]
summary: "Qwen3-Omni is a single model across text, image, audio and video that's reported to match same-sized single-modal Qwen models, with a Thinker–Talker MoE design and 234 ms theoretical first-packet speech latency."
sources: 
  - title: "Qwen3-Omni Technical Report (arXiv:2509.17765)"
    url: "https://arxiv.org/abs/2509.17765"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:51.180Z"
  - title: "Hugging Face Daily Papers, 2025-09-23"
    url: "https://huggingface.co/papers?date=2025-09-23"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:15.898Z"
  - title: "Qwen3-Omni Technical Report (arXiv HTML full text)"
    url: "https://arxiv.org/html/2509.17765"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:51.180Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/QwenLM/Qwen3-Omni"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:48:51.180Z"
highlights: ["Adding all modalities to one model didn't cost performance on any single modality, per the authors.", "A lightweight causal ConvNet replaces block-wise diffusion for speech, so audio can stream from the first codec frame."]
papers: 
  - title: "Qwen3-Omni Technical Report"
    authors: ["Jin Xu", "Zhifang Guo", "Hangrui Hu", "Yunfei Chu", "Xiong Wang", "Jinzheng He", "Yuxuan Wang", "Xian Shi", "Ting He", "Xinfa Zhu", "Yuanjun Lv", "Yongqi Wang", "Dake Guo", "He Wang", "Linhan Ma", "Pei Zhang", "Xinyu Zhang", "Hongkun Hao", "Zishan Guo", "Baosong Yang", "Bin Zhang", "Ziyang Ma", "Xipin Wei", "Shuai Bai", "Keqin Chen", "Xuejing Liu", "Peng Wang", "Mingkun Yang", "Dayiheng Liu", "Xingzhang Ren", "Bo Zheng", "Rui Men", "Fan Zhou", "Bowen Yu", "Jianxin Yang", "Le Yu", "Jingren Zhou", "Junyang Lin"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2509.17765"
    pdf: "https://arxiv.org/pdf/2509.17765v1"
    code: "https://github.com/QwenLM/Qwen3-Omni"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2509.17765.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2509.17765\">Xu et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Qwen3-Omni is a unified end-to-end model capable of processing multiple modalities, such as text, audio, image and video, and generating real-time text or speech response. Based on these features, Qwen3-Omni …"
images: 
  - src: "images/2025/paper-2509.17765.webp"
    alt: "Figure from the paper \"Qwen3-Omni Technical Report\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2509.17765\">Xu et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Qwen3-Omni is a unified end-to-end model capable of processing multiple modalities, such as text, audio, image and video, and generating real-time text or speech response. Based on these features, Qwen3-Omni …"
card: 
  task: "One omni-modal model without per-modality degradation"
  method: "Thinker–Talker MoE; multi-codebook speech codec prediction; causal ConvNet decoder; Thinking variant"
  data: "36 audio and audio-visual benchmarks, among others"
  result: "Open-source SOTA on 32 of 36 audio/AV benchmarks and overall SOTA on 22; 234 ms theoretical first-packet latency, per the abstract"
draft: false
date: "2025-09-23"
---

## Problem

Multimodal models often get *worse* at individual modalities as more are added. The goal here is one model across **text, images, audio and video** with no loss compared with single-modal models.

## Method

This follows Qwen2.5-Omni (summarised here in March) with a **Thinker–Talker MoE** architecture:

- the **Talker** autoregressively predicts discrete **speech codec** tokens with a **multi-codebook** scheme
- a **lightweight causal ConvNet** replaces compute-heavy block-wise diffusion for decoding speech, so streaming can start from the **first codec frame**
- a **Thinking** model reasons explicitly over inputs from any modality
- a fine-tuned **Captioner** gives detailed audio captions, because the authors say the community lacked a general-purpose one

## Key results

From the abstract:

- matches same-sized single-modal Qwen models, and is especially strong on audio
- across **36** audio and audio-visual benchmarks: open-source state of the art on **32**, overall state of the art on **22**, beating Gemini-2.5-Pro, Seed-ASR and GPT-4o-Transcribe
- **119** text languages, **19** for speech understanding, **10** for speech generation
- theoretical first-packet latency of **234 ms**
- the 30B-A3B models are released under **Apache 2.0**

## Limitations

There's no dedicated limitations section in the extracted text. The latency figure is theoretical, under cold-start conditions.
