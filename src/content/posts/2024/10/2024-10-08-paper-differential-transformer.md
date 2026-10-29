---
title: "Paper summary: Differential Transformer"
categories: ["papers"]
tags: ["llm", "attention", "architectures"]
summary: "Differential attention computes attention as the difference between two softmax maps, cancelling common-mode noise; Diff Transformer is reported to beat Transformers on scaling, long context, retrieval and hallucination."
sources: 
  - title: "Differential Transformer (arXiv:2410.05258)"
    url: "https://arxiv.org/abs/2410.05258"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:36.989Z"
  - title: "Hugging Face Daily Papers, 2024-10-08"
    url: "https://huggingface.co/papers?date=2024-10-08"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:18.106Z"
  - title: "Differential Transformer (arXiv HTML full text)"
    url: "https://arxiv.org/html/2410.05258"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:36.989Z"
highlights: ["Subtracting one attention map from another cancels attention that both give to irrelevant tokens.", "The paper also reports fewer activation outliers, which matters for quantisation."]
papers: 
  - title: "Differential Transformer"
    authors: ["Tianzhu Ye", "Li Dong", "Yuqing Xia", "Yutao Sun", "Yi Zhu", "Gao Huang", "Furu Wei"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2410.05258"
    pdf: "https://arxiv.org/pdf/2410.05258v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Reducing attention to irrelevant context in Transformers"
  method: "Differential attention: difference of two separate softmax attention maps"
  data: "Language modelling at several model sizes and token counts; long-context, retrieval, hallucination and in-context-learning tasks"
  result: "Outperforms Transformer across scaling settings and on these practical tasks, per the abstract"
draft: false
date: "2024-10-08"
---

## Problem

According to the authors, Transformers tend to **over-allocate attention to irrelevant context**. Some attention "noise" spreads over tokens that don't matter, which can drown the relevant signal.

## Method

**Differential attention** computes **two separate softmax attention maps** and uses their **difference** as the attention scores. The paper compares it to noise-cancelling headphones: attention that both maps give to the same irrelevant tokens cancels out, and sparse attention patterns emerge. **Diff Transformer** replaces standard attention with this mechanism.

## Key results

From the abstract:

- outperforms the Transformer across settings that **scale model size and training tokens**
- advantages in **long-context modelling**, **key information retrieval**, **hallucination mitigation** (question answering and summarisation) and **in-context learning**
- **fewer activation outliers**

## Limitations

There's no dedicated limitations section in the extracted text. Each layer computes two attention maps, so the mechanism changes the attention computation and its cost compared with standard attention.
