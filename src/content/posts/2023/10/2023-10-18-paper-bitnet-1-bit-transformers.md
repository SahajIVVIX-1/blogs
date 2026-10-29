---
title: "Paper summary: BitNet: Scaling 1-bit Transformers for Large Language Models"
categories: ["papers"]
tags: ["llm", "efficiency", "quantisation"]
summary: "BitNet replaces nn.Linear with BitLinear and trains Transformers with 1-bit weights from scratch, reporting competitive perplexity with much lower memory and energy than FP16 or 8-bit baselines."
sources: 
  - title: "BitNet: Scaling 1-bit Transformers for Large Language Models (arXiv:2310.11453)"
    url: "https://arxiv.org/abs/2310.11453"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:21.378Z"
  - title: "Hugging Face Daily Papers, 2023-10-18"
    url: "https://huggingface.co/papers?date=2023-10-18"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:41.195Z"
  - title: "BitNet: Scaling 1-bit Transformers for Large Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2310.11453"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:21.378Z"
highlights: ["Training with 1-bit weights from the start, rather than quantising afterwards, is the core idea.", "BitNet follows a scaling law similar to full-precision Transformers, according to the authors."]
papers: 
  - title: "BitNet: Scaling 1-bit Transformers for Large Language Models"
    authors: ["Hongyu Wang", "Shuming Ma", "Li Dong", "Shaohan Huang", "Huaijie Wang", "Lingxiao Ma", "Fan Yang", "Ruiping Wang", "Yi Wu", "Furu Wei"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2310.11453"
    pdf: "https://arxiv.org/pdf/2310.11453v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Memory- and energy-efficient large language models"
  method: "BitLinear: drop-in replacement for nn.Linear with binarised (1-bit) weights, trained from scratch"
  data: "Language-modelling experiments compared with FP16 Transformers and 8-bit post-training quantisation"
  result: "Competitive perplexity and downstream performance with substantially lower memory and energy, per the authors"
draft: false
date: "2023-10-18"
---

## Problem

LLMs are large and energy-hungry to serve. Post-training quantisation to 8 or 4 bits helps, but accuracy drops as you go lower. Could a model be **trained** with extremely low-precision weights from the start?

## Method

BitNet introduces **BitLinear**, a drop-in replacement for PyTorch's `nn.Linear` in which the weights are **binarised to 1 bit** during the forward pass. Full-precision latent weights are kept for training updates, and activations are quantised too. The rest of the Transformer stays the same, so the architecture can be trained from scratch at scale.

## Key results

The authors report that BitNet:

- reaches competitive perplexity and downstream performance
- substantially reduces memory footprint and energy consumption compared with FP16 Transformers and state-of-the-art 8-bit quantisation
- follows a **scaling law** similar to full-precision Transformers, which suggests it can keep improving with size

## Limitations

The paper doesn't have a dedicated limitations section in the extracted text. Its comparisons are against FP16 Transformers and 8-bit quantisation baselines in the authors' own experimental setup.
