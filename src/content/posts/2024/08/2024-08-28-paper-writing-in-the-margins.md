---
title: "Paper summary: Writing in the Margins: Better Inference Pattern for Long Context Retrieval"
categories: ["papers"]
tags: ["llm", "long-context", "rag"]
summary: "Writing in the Margins processes a long context chunk by chunk during prefill, writes short \"margin\" notes per chunk, keeps the relevant ones, and uses them to answer, improving off-the-shelf models without fine-tuning."
sources: 
  - title: "Writing in the Margins: Better Inference Pattern for Long Context Retrieval (arXiv:2408.14906)"
    url: "https://arxiv.org/abs/2408.14906"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:59.826Z"
  - title: "Hugging Face Daily Papers, 2024-08-28"
    url: "https://huggingface.co/papers?date=2024-08-28"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:53.098Z"
  - title: "Writing in the Margins: Better Inference Pattern for Long Context Retrieval (arXiv HTML full text)"
    url: "https://arxiv.org/html/2408.14906"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:59.826Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/writer/writing-in-the-margins"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:42:59.826Z"
highlights: ["Chunked prefill of the KV cache gives a natural point to ask the model for notes on each chunk at little extra cost.", "The margins can also be shown to users as progress updates during long retrieval."]
papers: 
  - title: "Writing in the Margins: Better Inference Pattern for Long Context Retrieval"
    authors: ["Melisa Russak", "Umar Jamil", "Christopher Bryant", "Kiran Kamble", "Axel Magnuson", "Mateusz Russak", "Waseem AlShikh"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2408.14906"
    pdf: "https://arxiv.org/pdf/2408.14906v1"
    code: "https://github.com/writer/writing-in-the-margins"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Long-context retrieval-oriented question answering"
  method: "Segment-wise inference using chunked KV-cache prefill; generate and classify intermediate 'margins' that guide the final answer"
  data: "HotpotQA, MultiHop-RAG, CWE"
  result: "+7.5% average accuracy on reasoning (HotpotQA, MultiHop-RAG); >30% F1 gain on aggregation (CWE), per the abstract"
draft: false
date: "2024-08-28"
---

## Problem

Long-context models can accept huge inputs, but they don't always use the relevant parts well, especially for multi-hop reasoning or aggregating information spread through a document.

## Method

**Writing in the Margins (WiM)** is an *inference pattern*, with no training:

1. Long inputs are already processed in chunks during **chunked prefill** of the key–value cache.
2. After each chunk, the model writes a short note, a **margin**, about what that chunk contains that's relevant to the query.
3. Margins are **classified** as relevant or not, and the useful ones are added before the final answer is generated.

The computational overhead is small, and the margins can also give users ongoing updates during long retrieval.

## Key results

From the abstract, on off-the-shelf models without fine-tuning:

- **+7.5%** average accuracy on reasoning tasks (HotpotQA, MultiHop-RAG)
- **more than 30%** F1 increase on aggregation tasks (CWE)

## Limitations

There's no dedicated limitations section in the extracted text. Generating margins adds some extra decoding per chunk, which the authors describe as a marginal overhead.
