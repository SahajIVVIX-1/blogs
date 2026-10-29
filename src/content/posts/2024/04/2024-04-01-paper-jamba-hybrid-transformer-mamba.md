---
title: "Paper summary: Jamba: A Hybrid Transformer-Mamba Language Model"
categories: ["papers"]
tags: ["llm", "architectures", "mixture-of-experts"]
summary: "Jamba interleaves Transformer and Mamba layers and adds mixture-of-experts in some layers; the released configuration fits on one 80GB GPU and handles contexts up to 256K tokens."
sources: 
  - title: "Jamba: A Hybrid Transformer-Mamba Language Model (arXiv:2403.19887)"
    url: "https://arxiv.org/abs/2403.19887"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:53.386Z"
  - title: "Hugging Face Daily Papers, 2024-04-01"
    url: "https://huggingface.co/papers?date=2024-04-01"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:22.160Z"
  - title: "Jamba: A Hybrid Transformer-Mamba Language Model (arXiv HTML full text)"
    url: "https://arxiv.org/html/2403.19887"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:53.386Z"
highlights: ["Mixing a few attention layers with many Mamba layers aims to get attention's quality with Mamba's memory and throughput.", "The reported configuration fits on a single 80GB GPU."]
papers: 
  - title: "Jamba: A Hybrid Transformer-Mamba Language Model"
    authors: ["Opher Lieber", "Barak Lenz", "Hofit Bata", "Gal Cohen", "Jhonathan Osin", "Itay Dalmedigos", "Erez Safahi", "Shaked Meirom", "Yonatan Belinkov", "Shai Shalev-Shwartz", "Omri Abend", "Raz Alon", "Tomer Asida", "Amir Bergman", "Roman Glozman", "Michael Gokhman", "Avashalom Manevich", "Nir Ratner", "Noam Rozen", "Erez Shwartz", "Mor Zusman", "Yoav Shoham"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2403.19887"
    pdf: "https://arxiv.org/pdf/2403.19887v2"
    license: "http://creativecommons.org/licenses/by-sa/4.0/"
card: 
  task: "Efficient, long-context base LLM"
  method: "Hybrid architecture interleaving Transformer and Mamba layers, with MoE in some layers"
  data: "Standard LM benchmarks and long-context evaluations"
  result: "High throughput, small memory footprint, strong benchmark results, strong results up to 256K context, per the abstract"
draft: false
date: "2024-04-01"
---

## Problem

Transformers are strong but expensive for long contexts, with a big key-value cache and quadratic attention. Mamba (the selective state-space model from December 2023) is efficient, but pure SSMs had their own weaknesses. Can a hybrid get the benefits of both?

## Method

**Jamba** interleaves blocks of **Transformer** layers and **Mamba** layers, and adds **mixture-of-experts** in some layers to increase capacity while keeping the number of active parameters manageable. The design is flexible. The released configuration is chosen so that the model **fits on a single 80GB GPU**. The paper also studies how to combine the two layer types and how to mix experts.

## Key results

From the abstract: compared with vanilla Transformers, Jamba has **high throughput** and a **small memory footprint**, while reaching state-of-the-art performance on standard benchmarks and long-context evaluations. It shows strong results for contexts up to **256K tokens**.

## Limitations

There's no dedicated limitations section in the extracted text. The paper describes one particular configuration, and the authors note that several architectural choices proved crucial at scale, so the design space isn't fully settled.
