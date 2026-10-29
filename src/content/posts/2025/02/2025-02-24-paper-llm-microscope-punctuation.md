---
title: "Paper summary: LLM-Microscope: Uncovering the Hidden Role of Punctuation in Context Memory of Transformers"
categories: ["papers"]
tags: ["llm", "interpretability"]
summary: "Tokens we treat as filler (punctuation, articles, stop words) carry a surprising share of an LLM's contextual memory; removing them hurts MMLU and long-context scores, and the paper releases a toolkit to measure this."
sources: 
  - title: "LLM-Microscope: Uncovering the Hidden Role of Punctuation in Context Memory of Transformers (arXiv:2502.15007)"
    url: "https://arxiv.org/abs/2502.15007"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:42.151Z"
  - title: "Hugging Face Daily Papers, 2025-02-24"
    url: "https://huggingface.co/papers?date=2025-02-24"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:42.498Z"
  - title: "LLM-Microscope: Uncovering the Hidden Role of Punctuation in Context Memory of Transformers (arXiv HTML full text)"
    url: "https://arxiv.org/html/2502.15007"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:42.151Z"
highlights: ["Deleting \"unimportant\" tokens like commas and articles consistently degrades performance, even when the deleted tokens are irrelevant to the question.", "Contextualisation correlates strongly with how linear the layer-to-layer transformation is."]
papers: 
  - title: "LLM-Microscope: Uncovering the Hidden Role of Punctuation in Context Memory of Transformers"
    authors: ["Anton Razzhigaev", "Matvey Mikhalchuk", "Temurbek Rahmatullaev", "Elizaveta Goncharova", "Polina Druzhinina", "Ivan Oseledets", "Andrey Kuznetsov"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2502.15007"
    pdf: "https://arxiv.org/pdf/2502.15007v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2502.15007.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2502.15007\">Razzhigaev et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: An example of token-wise non-linearity visualization for Llama3-8B."
images: 
  - src: "images/2025/paper-2502.15007.webp"
    alt: "Figure from the paper \"LLM-Microscope: Uncovering the Hidden Role of Punctuation in Context Memory of Transformers\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2502.15007\">Razzhigaev et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: An example of token-wise non-linearity visualization for Llama3-8B."
card: 
  task: "Understanding where LLMs store contextual information"
  method: "Measures of token-level contextual memory and layer-to-layer linearity; LLM-Microscope toolkit (incl. adapted Logit Lens)"
  data: "MMLU and BABILong-4k; models such as Llama3-8B"
  result: "Removing stop words, articles and commas degrades MMLU and BABILong-4k performance, per the abstract"
draft: false
date: "2025-02-24"
---

## Problem

How do LLMs keep track of context across a long input? Intuition says content words carry the meaning.

## Method

The authors introduce methods to measure how much **contextual information** each token's representation holds, and how **linear** each layer-to-layer transformation is. They test by removing tokens and measuring the effect. **LLM-Microscope** is the released toolkit: token-level non-linearity, contextual memory, layer contributions (an adapted Logit Lens) and intrinsic dimensionality. Figure 1 shows a token-wise non-linearity visualisation for Llama3-8B.

## Key results

From the abstract:

- "minor" tokens such as determiners and punctuation carry **surprisingly high** context
- removing them, especially **stop words, articles and commas**, consistently degrades performance on **MMLU** and **BABILong-4k**, even when only irrelevant tokens are removed
- there's a strong correlation between contextualisation and **linearity**

## Limitations

From the paper:

- applying a pretrained LM head to intermediate layers without fine-tuning may not reflect what those layers really do
- the adapter-based memory measure depends on the adapter's design and training
- results may not generalise to all architectures, sizes or training setups
