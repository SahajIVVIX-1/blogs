---
title: "Paper summary: LLM in a flash: Efficient Large Language Model Inference with Limited Memory"
categories: ["papers"]
tags: ["llm", "efficiency", "inference"]
summary: "Apple researchers run LLMs larger than the available DRAM by keeping weights in flash and loading only what is needed, with windowing and row–column bundling designed around how flash memory reads data."
sources: 
  - title: "LLM in a flash: Efficient Large Language Model Inference with Limited Memory (arXiv:2312.11514)"
    url: "https://arxiv.org/abs/2312.11514"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:17.368Z"
  - title: "Hugging Face Daily Papers, 2023-12-20"
    url: "https://huggingface.co/papers?date=2023-12-20"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:19.549Z"
  - title: "LLM in a flash: Efficient Large Language Model Inference with Limited Memory (arXiv HTML full text)"
    url: "https://arxiv.org/html/2312.11514"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:17.368Z"
highlights: ["Two flash-aware tricks: reuse recently activated neurons (windowing), and store related rows and columns together so reads are larger and contiguous.", "The paper reports running models up to twice the size of DRAM, with 4–5× (CPU) and 20–25× (GPU) faster inference than naive loading."]
papers: 
  - title: "LLM in a flash: Efficient Large Language Model Inference with Limited Memory"
    authors: ["Keivan Alizadeh", "Iman Mirzadeh", "Dmitry Belenko", "Karen Khatamifard", "Minsik Cho", "Carlo C Del Mundo", "Mohammad Rastegari", "Mehrdad Farajtabar"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2312.11514"
    pdf: "https://arxiv.org/pdf/2312.11514v3"
    license: "http://creativecommons.org/licenses/by-sa/4.0/"
card: 
  task: "LLM inference on devices with limited DRAM"
  method: "Inference cost model for flash; windowing (reuse activated neurons) and row-column bundling (bigger contiguous reads); exploits activation sparsity"
  data: "Large open LLMs on CPU and GPU"
  result: "Models up to 2× DRAM size; 4–5× (CPU) and 20–25× (GPU) faster than naive loading, per the abstract"
draft: false
date: "2023-12-20"
---

## Problem

On phones and laptops, DRAM is the bottleneck. Many LLMs simply don't fit. Flash storage is much larger but slower, and it performs best with large sequential reads.

## Method

The authors build an **inference cost model** for flash memory, which points to two goals: transfer *less* data, and read it in *bigger contiguous chunks*. Two techniques follow:

1. **Windowing**: keep recently activated feed-forward neurons in DRAM and load only the newly needed ones, exploiting the sparsity of activations.
2. **Row–column bundling**: store the related row and column of each neuron's weights together, so one read fetches both.

## Key results

From the abstract: these methods let models run that are **up to twice the size of available DRAM**, with **4–5× (CPU)** and **20–25× (GPU)** faster inference than naive loading.

## Limitations

The paper's own limitations section says:

- power consumption and thermal limits still need systematic study for on-device use
- the work covers **single-batch** inference only; speculative decoding is just a preliminary result
- the proof of concept assumes about half the model fits in memory
