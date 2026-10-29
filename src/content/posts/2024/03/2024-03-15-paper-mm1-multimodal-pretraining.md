---
title: "Paper summary: MM1: Methods, Analysis & Insights from Multimodal LLM Pre-training"
categories: ["papers"]
tags: ["multimodal", "llm", "cv"]
summary: "Apple's MM1 ablates how to build multimodal LLMs and finds the data mix and image encoder (resolution, token count) matter a lot, while the vision–language connector design matters little."
sources: 
  - title: "MM1: Methods, Analysis & Insights from Multimodal LLM Pre-training (arXiv:2403.09611)"
    url: "https://arxiv.org/abs/2403.09611"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:32.649Z"
  - title: "Hugging Face Daily Papers, 2024-03-15"
    url: "https://huggingface.co/papers?date=2024-03-15"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:11.835Z"
highlights: ["Mixing image–caption, interleaved image–text and text-only data was crucial for strong few-shot results.", "Image resolution and the number of image tokens mattered far more than the connector architecture."]
papers: 
  - title: "MM1: Methods, Analysis & Insights from Multimodal LLM Pre-training"
    authors: ["Brandon McKinzie", "Zhe Gan", "Jean-Philippe Fauconnier", "Sam Dodge", "Bowen Zhang", "Philipp Dufter", "Dhruti Shah", "Xianzhi Du", "Futang Peng", "Floris Weers", "Anton Belyi", "Haotian Zhang", "Karanjeet Singh", "Doug Kang", "Ankur Jain", "Hongyu Hè", "Max Schwarzer", "Tom Gunter", "Xiang Kong", "Aonan Zhang", "Jianyu Wang", "Chong Wang", "Nan Du", "Tao Lei", "Sam Wiseman", "Guoli Yin", "Mark Lee", "Zirui Wang", "Ruoming Pang", "Peter Grasch", "Alexander Toshev", "Yinfei Yang"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2403.09611"
    pdf: "https://arxiv.org/pdf/2403.09611v4"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Design lessons for multimodal LLM pre-training"
  method: "Systematic ablations of image encoder, vision–language connector and pre-training data mix; scaled to MM1 (up to 30B, dense and MoE)"
  data: "Image–caption, interleaved image–text and text-only data"
  result: "SOTA pre-training metrics and competitive results after supervised fine-tuning, per the abstract"
draft: false
date: "2024-03-15"
---

## Problem

Many multimodal LLMs were released with few details about which design choices actually mattered. The paper wants transferable lessons, not just a model.

## Method

Careful **ablations** of three parts:

- the **image encoder** (including resolution and the number of image tokens)
- the **vision–language connector**
- the **pre-training data mix**

The recipe is then scaled up to **MM1**, a family of models up to **30B** parameters, including dense and mixture-of-experts variants.

## Key results

The abstract's main lessons:

- A careful mix of **image–caption**, **interleaved image–text** and **text-only** data is crucial for state-of-the-art few-shot results.
- The **image encoder, image resolution and image token count** have substantial impact. The **connector design matters comparatively little**.
- MM1 is reported to be state of the art on pre-training metrics and competitive after supervised fine-tuning on established multimodal benchmarks.

## Limitations

There's no dedicated limitations section in the extracted text. The lessons come from the authors' own setup and data.
