---
title: "Paper summary: DocLLM: A layout-aware generative language model for multimodal document understanding"
categories: ["papers"]
tags: ["nlp", "documents", "multimodal"]
summary: "DocLLM adds layout awareness to an LLM using only text bounding boxes, with no image encoder, via disentangled text/layout attention and a text-infilling pre-training objective."
sources: 
  - title: "DocLLM: A layout-aware generative language model for multimodal document understanding (arXiv:2401.00908)"
    url: "https://arxiv.org/abs/2401.00908"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:29.703Z"
  - title: "Hugging Face Daily Papers, 2024-01-02"
    url: "https://huggingface.co/papers?date=2024-01-02"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:27.446Z"
  - title: "DocLLM: A layout-aware generative language model for multimodal document understanding (arXiv HTML full text)"
    url: "https://arxiv.org/html/2401.00908"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:29.703Z"
highlights: ["Instead of a vision encoder, DocLLM feeds each token's bounding box and splits attention into text and spatial parts.", "The infilling objective helps with the irregular layouts of forms and invoices."]
papers: 
  - title: "DocLLM: A layout-aware generative language model for multimodal document understanding"
    authors: ["Dongsheng Wang", "Natraj Raman", "Mathieu Sibue", "Zhiqiang Ma", "Petr Babkin", "Simerjot Kaur", "Yulong Pei", "Armineh Nourbakhsh", "Xiaomo Liu"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2401.00908"
    pdf: "https://arxiv.org/pdf/2401.00908v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2024/paper-2401.00908.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2401.00908\">Wang et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Key elements of DocLLM . (1) Input documents contain text tokens and their bounding boxes. (2) Attention mechanism of LLMs are extended to capture dependencies between text semantics and spatial layouts. (3) …"
images: 
  - src: "images/2024/paper-2401.00908.webp"
    alt: "Figure from the paper \"DocLLM: A layout-aware generative language model for multimodal document understanding\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2401.00908\">Wang et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Key elements of DocLLM . (1) Input documents contain text tokens and their bounding boxes. (2) Attention mechanism of LLMs are extended to capture dependencies between text semantics and spatial layouts. (3) …"
card: 
  task: "Understanding visually rich documents (forms, invoices, receipts, reports)"
  method: "LLM extension with bounding-box inputs, disentangled text/spatial attention matrices, text-segment infilling pre-training, then instruction tuning"
  data: "Large instruction dataset over four document-intelligence tasks; 16 evaluation datasets"
  result: "Outperforms SotA LLMs on 14 of 16 datasets, per the abstract"
draft: false
date: "2024-01-02"
---

## Problem

Enterprise documents (forms, receipts, contracts) carry meaning in both their **text** and their **layout**: a number means something different in the "Total" box than in the address. Many multimodal LLMs handle this with expensive image encoders.

## Method

DocLLM is a lightweight extension of a standard LLM:

- Each text token comes with its **bounding box**. There's no image encoder.
- Attention is decomposed into **disentangled matrices** that capture text–text, text–layout and layout–layout interactions.
- Pre-training uses a **text-infilling** objective, predicting missing text segments, which suits irregular layouts better than strict left-to-right prediction.
- The model is then instruction-tuned on a large dataset covering four core document-intelligence tasks.

## Key results

The abstract reports that DocLLM outperforms state-of-the-art LLMs on **14 of 16** datasets across those tasks, and generalises to 4 of 5 previously unseen datasets.

## Limitations

The extracted text has no dedicated limitations section. Because it relies only on text and boxes, DocLLM needs OCR or born-digital text with coordinates as input; purely visual elements without text aren't represented.
