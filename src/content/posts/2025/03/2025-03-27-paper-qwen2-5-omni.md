---
title: "Paper summary: Qwen2.5-Omni Technical Report"
categories: ["papers"]
tags: ["multimodal", "speech", "llm"]
summary: "Qwen2.5-Omni takes text, images, audio and video as input and streams back both text and speech, using a Thinker (LLM) and a Talker (speech generator) that share hidden states."
sources: 
  - title: "Qwen2.5-Omni Technical Report (arXiv:2503.20215)"
    url: "https://arxiv.org/abs/2503.20215"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:09.632Z"
  - title: "Hugging Face Daily Papers, 2025-03-27"
    url: "https://huggingface.co/papers?date=2025-03-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:01.627Z"
  - title: "Qwen2.5-Omni Technical Report (arXiv HTML full text)"
    url: "https://arxiv.org/html/2503.20215"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:09.632Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/QwenLM/Qwen2.5-Omni"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:46:09.632Z"
highlights: ["The Thinker writes text, and the Talker turns the Thinker's hidden states into speech tokens at the same time.", "TMRoPE aligns audio and video timestamps by interleaving them in time order."]
papers: 
  - title: "Qwen2.5-Omni Technical Report"
    authors: ["Jin Xu", "Zhifang Guo", "Jinzheng He", "Hangrui Hu", "Ting He", "Shuai Bai", "Keqin Chen", "Jialin Wang", "Yang Fan", "Kai Dang", "Bin Zhang", "Xiong Wang", "Yunfei Chu", "Junyang Lin"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2503.20215"
    pdf: "https://arxiv.org/pdf/2503.20215v1"
    code: "https://github.com/QwenLM/Qwen2.5-Omni"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2503.20215.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2503.20215\">Xu et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Qwen2.5-Omni is a unified end-to-end model capable of processing multiple modalities, such as text, audio, image and video, and generating real-time text or speech response. Based on these features, …"
images: 
  - src: "images/2025/paper-2503.20215.webp"
    alt: "Figure from the paper \"Qwen2.5-Omni Technical Report\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2503.20215\">Xu et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Qwen2.5-Omni is a unified end-to-end model capable of processing multiple modalities, such as text, audio, image and video, and generating real-time text or speech response. Based on these features, …"
card: 
  task: "End-to-end omni-modal perception with streaming text and speech output"
  method: "Thinker–Talker architecture; block-wise streaming encoders; TMRoPE time-aligned position embedding; sliding-window DiT for streaming audio decoding"
  data: "Multimodal benchmarks incl. Omni-Bench; MMLU and GSM8K with speech input"
  result: "State of the art on Omni-Bench; speech-instruction performance comparable to text input, per the abstract"
draft: false
date: "2025-03-27"
---

## Problem

One model that can **see, hear, read and speak** in real time needs streaming inputs, synchronised audio and video, and generation of text and speech at once without the two interfering.

## Method

- **Block-wise** audio and visual encoders, for streaming input.
- **TMRoPE** (Time-aligned Multimodal RoPE): audio and video are interleaved in time order with a new position embedding, so their timestamps line up.
- **Thinker–Talker**: the **Thinker** is an LLM that generates text. The **Talker** is a dual-track autoregressive model that reads the Thinker's hidden states and produces **audio tokens**. Both are trained and run end to end.
- A **sliding-window DiT** decodes audio tokens in a streaming way to reduce the delay before audio starts.

## Key results

From the abstract:

- comparable to similarly sized **Qwen2.5-VL**, and better than **Qwen2-Audio**
- state of the art on **Omni-Bench**
- speech-instruction following comparable to text input on **MMLU** and **GSM8K**
- the streaming Talker beats most streaming and non-streaming alternatives on robustness and naturalness

## Limitations

There's no dedicated limitations section in the extracted text. Results are the developers' own.
