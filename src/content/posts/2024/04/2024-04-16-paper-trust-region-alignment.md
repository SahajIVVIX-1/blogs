---
title: "Paper summary: Learn Your Reference Model for Real Good Alignment"
categories: ["papers"]
tags: ["llm", "alignment", "dpo"]
summary: "Trust Region alignment (TR-DPO, TR-IPO, TR-KTO) updates the reference policy during offline alignment training, which reduces over-optimisation."
sources: 
  - title: "Learn Your Reference Model for Real Good Alignment (arXiv:2404.09656)"
    url: "https://arxiv.org/abs/2404.09656"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:05.020Z"
  - title: "Hugging Face Daily Papers, 2024-04-16"
    url: "https://huggingface.co/papers?date=2024-04-16"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:31.268Z"
  - title: "Learn Your Reference Model for Real Good Alignment (arXiv HTML full text)"
    url: "https://arxiv.org/html/2404.09656"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:05.020Z"
highlights: ["Offline methods like DPO still over-optimise when the model drifts far from a fixed reference policy.", "Periodically updating the reference, softly or by hard resets, lets the model move further while keeping quality."]
papers: 
  - title: "Learn Your Reference Model for Real Good Alignment"
    authors: ["Alexey Gorbatovski", "Boris Shaposhnikov", "Alexey Malakhov", "Nikita Surnachev", "Yaroslav Aksenov", "Ian Maksimov", "Nikita Balagansky", "Daniil Gavrilov"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2404.09656"
    pdf: "https://arxiv.org/pdf/2404.09656v4"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Reducing over-optimisation in offline LLM alignment"
  method: "Trust Region variants of DPO, IPO and KTO that update the reference policy during training"
  data: "Toy examples; helpful/harmless dialogue; summarisation; Llama3 on AlpacaEval 2 and Arena-Hard"
  result: "Mitigates over-optimisation and beats conventional methods in side-by-side comparisons, per the abstract"
draft: false
date: "2024-04-16"
---

## Problem

Offline alignment methods like **DPO** don't need a separate reward model, but they can still **over-optimise**. As the trained model moves far from the **reference policy**, sample quality drops.

## Method

The **Trust Region (TR)** family (**TR-DPO, TR-IPO, TR-KTO**) **updates the reference policy during training**, instead of keeping it frozen at the starting model. The reference can be blended softly toward the current policy, or replaced periodically. The model's deviation is then measured against a moving anchor.

## Key results

From the abstract:

- toy examples show reduced over-optimisation
- in side-by-side comparisons on **helpful and harmless dialogue** and **summarisation**, TR methods surpass conventional ones
- with **Llama3**, they report significant improvements on **AlpacaEval 2** and **Arena-Hard**

## Limitations

There's no dedicated limitations section in the extracted text. The update schedule for the reference policy adds new hyperparameters to tune.
