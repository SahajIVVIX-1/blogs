---
title: "Paper summary: Chameleon: Mixed-Modal Early-Fusion Foundation Models"
categories: ["papers"]
tags: ["multimodal", "llm", "genai"]
summary: "Chameleon is one token-based model that reads and generates images and text in any order, using early fusion, plus a training recipe designed to keep this mixed-modal setup stable."
sources: 
  - title: "Chameleon: Mixed-Modal Early-Fusion Foundation Models (arXiv:2405.09818)"
    url: "https://arxiv.org/abs/2405.09818"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:28.452Z"
  - title: "Hugging Face Daily Papers, 2024-05-17"
    url: "https://huggingface.co/papers?date=2024-05-17"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:50.253Z"
  - title: "Chameleon: Mixed-Modal Early-Fusion Foundation Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2405.09818"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:28.452Z"
highlights: ["Images are turned into discrete tokens and mixed with text tokens from the very first layer, which is what \"early fusion\" means.", "Human judges rated its long-form mixed image-and-text outputs as matching or beating much larger models."]
papers: 
  - title: "Chameleon: Mixed-Modal Early-Fusion Foundation Models"
    authors: ["Chameleon Team"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2405.09818"
    pdf: "https://arxiv.org/pdf/2405.09818v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Understanding and generating interleaved images and text in a single model"
  method: "Early-fusion, token-based mixed-modal Transformer with a stability-focused training recipe, alignment recipe and tailored parameterisation"
  data: "VQA, captioning, text generation, image generation and a new long-form mixed-modal human evaluation"
  result: "SOTA image captioning; beats Llama-2 on text-only tasks; matches or exceeds Gemini Pro and GPT-4V in human judgement on mixed-modal generation, per the abstract"
draft: false
date: "2024-05-17"
---

## Problem

Many multimodal models bolt a vision encoder onto a language model and can only *read* images. Generating arbitrary sequences that mix images and text, in any order, needs a different design.

## Method

**Chameleon** turns images into discrete **tokens** and processes them in the same sequence as text tokens from the start (**early fusion**). This makes it one model for both understanding and generating either modality. The paper's emphasis is on making this setup trainable: a stable training approach from the start, an alignment recipe, and an architectural parameterisation tailored to mixed-modal tokens.

## Key results

From the abstract:

- state-of-the-art performance on **image captioning**
- outperforms **Llama-2** on text-only tasks and is competitive with Mixtral 8x7B and Gemini-Pro
- non-trivial **image generation**, all in one model
- on a new long-form mixed-modal evaluation, it matches or exceeds **Gemini Pro and GPT-4V** according to human judgments

## Limitations

There's no dedicated limitations section in the extracted text. The headline mixed-modal result uses a **new** evaluation introduced by the authors, judged by humans.
