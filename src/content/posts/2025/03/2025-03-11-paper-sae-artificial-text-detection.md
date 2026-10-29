---
title: "Paper summary: Feature-Level Insights into Artificial Text Detection with Sparse Autoencoders"
categories: ["papers"]
tags: ["llm", "interpretability", "detection"]
summary: "Using sparse-autoencoder features from Gemma-2-2B's residual stream to detect and explain AI-generated text, revealing a distinct LLM writing style, especially in information-dense domains."
sources: 
  - title: "Feature-Level Insights into Artificial Text Detection with Sparse Autoencoders (arXiv:2503.03601)"
    url: "https://arxiv.org/abs/2503.03601"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:54.620Z"
  - title: "Hugging Face Daily Papers, 2025-03-11"
    url: "https://huggingface.co/papers?date=2025-03-11"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:51.765Z"
  - title: "Feature-Level Insights into Artificial Text Detection with Sparse Autoencoders (arXiv HTML full text)"
    url: "https://arxiv.org/html/2503.03601"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:54.620Z"
highlights: ["Sparse autoencoder features turn \"this text looks machine-written\" into specific, inspectable features.", "No single detector works reliably across unseen text types and new LLMs, which is why interpretability matters here."]
papers: 
  - title: "Feature-Level Insights into Artificial Text Detection with Sparse Autoencoders"
    authors: ["Kristian Kuznetsov", "Laida Kushnareva", "Polina Druzhinina", "Anton Razzhigaev", "Anastasia Voznyuk", "Irina Piontkovskaya", "Evgeny Burnaev", "Serguei Barannikov"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2503.03601"
    pdf: "https://arxiv.org/pdf/2503.03601v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2503.03601.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2503.03601\">Kuznetsov et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Interpretations of one of the most “universal” SAE features that are useful for ATD task."
images: 
  - src: "images/2025/paper-2503.03601.webp"
    alt: "Figure from the paper \"Feature-Level Insights into Artificial Text Detection with Sparse Autoencoders\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2503.03601\">Kuznetsov et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Interpretations of one of the most “universal” SAE features that are useful for ATD task."
card: 
  task: "Interpretable artificial text detection"
  method: "Sparse Autoencoder features from Gemma-2-2b residual stream; domain/model statistics, steering, manual and LLM-based interpretation"
  data: "Human and LLM-generated texts across domains"
  result: "Interpretable, efficient features; modern LLMs show a distinct writing style, per the abstract"
draft: false
date: "2025-03-11"
---

## Problem

Detecting AI-generated text is increasingly important, but according to the abstract, no single algorithm works consistently across unseen kinds of text or generalises to new LLMs.

## Method

The authors extract features with **sparse autoencoders (SAEs)** from the **residual stream of Gemma-2-2B**, then find features that are both **interpretable** and useful for detection. They analyse them with domain- and model-specific statistics, a **steering** approach, and manual or LLM-based interpretation. Figure 1 shows interpretations of one of the most "universal" detection features.

## Key results

The paper reports interpretable and efficient features, and finds that modern LLMs have a **distinct writing style**, especially in information-dense domains.

## Limitations

From the paper:

- new LLMs appear constantly, so future performance is hard to predict
- new attack strategies keep appearing, and only some are covered
- not all SAE features have a clear meaning
- only one SAE on one model (Gemma 2-2B) was used
