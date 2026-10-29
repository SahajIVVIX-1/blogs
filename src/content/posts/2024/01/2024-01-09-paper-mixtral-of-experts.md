---
title: "Paper summary: Mixtral of Experts"
categories: ["papers"]
tags: ["llm", "mixture-of-experts"]
summary: "Mixtral 8x7B is a sparse mixture-of-experts model: each layer has 8 feed-forward experts and a router picks 2 per token, giving 47B total but 13B active parameters."
sources: 
  - title: "Mixtral of Experts (arXiv:2401.04088)"
    url: "https://arxiv.org/abs/2401.04088"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:35.803Z"
  - title: "Hugging Face Daily Papers, 2024-01-09"
    url: "https://huggingface.co/papers?date=2024-01-09"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:31.680Z"
  - title: "Mixtral of Experts (arXiv HTML full text)"
    url: "https://arxiv.org/html/2401.04088"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:35.803Z"
highlights: ["Each token goes through only 2 of the 8 experts per layer, so it uses 13B of the 47B parameters.", "The paper reports Mixtral matching or beating Llama 2 70B and GPT-3.5 on the benchmarks it evaluates."]
papers: 
  - title: "Mixtral of Experts"
    authors: ["Albert Q. Jiang", "Alexandre Sablayrolles", "Antoine Roux", "Arthur Mensch", "Blanche Savary", "Chris Bamford", "Devendra Singh Chaplot", "Diego de las Casas", "Emma Bou Hanna", "Florian Bressand", "Gianna Lengyel", "Guillaume Bour", "Guillaume Lample", "Lélio Renard Lavaud", "Lucile Saulnier", "Marie-Anne Lachaux", "Pierre Stock", "Sandeep Subramanian", "Sophia Yang", "Szymon Antoniak", "Teven Le Scao", "Théophile Gervet", "Thibaut Lavril", "Thomas Wang", "Timothée Lacroix", "William El Sayed"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2401.04088"
    pdf: "https://arxiv.org/pdf/2401.04088v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Open general-purpose language model"
  method: "Sparse Mixture of Experts on the Mistral 7B architecture: 8 FFN experts per layer, top-2 routing per token; 32k context"
  data: "Evaluated on standard benchmarks plus human evaluation for the Instruct model"
  result: "Matches or outperforms Llama 2 70B and GPT-3.5 across evaluated benchmarks; Instruct beats GPT-3.5 Turbo, Claude-2.1, Gemini Pro on human benchmarks, per the abstract"
draft: false
date: "2024-01-09"
---

## Problem

Bigger dense models are better but cost more per token. A **sparse mixture of experts (SMoE)** decouples total parameters from compute per token.

## Method

Mixtral keeps the **Mistral 7B** architecture but replaces each layer's feed-forward block with **8 experts**. For every token at every layer, a **router** picks **2 experts** and combines their outputs. Different tokens, and the same token at different layers, can use different experts. So each token has access to **47B** parameters but uses only about **13B active** ones. It's trained with a **32k-token** context.

## Key results

From the abstract:

- Mixtral **outperforms or matches Llama 2 70B and GPT-3.5** on all evaluated benchmarks, and is much stronger than Llama 2 70B on maths, code and multilingual tasks.
- **Mixtral 8x7B Instruct** surpasses GPT-3.5 Turbo, Claude-2.1, Gemini Pro and Llama 2 70B chat on human evaluation benchmarks.
- Both models are released under **Apache 2.0**.

## Limitations

There's no dedicated limitations section. Although only 13B parameters are active per token, all 47B must be held in memory, so memory needs are those of the full model.
