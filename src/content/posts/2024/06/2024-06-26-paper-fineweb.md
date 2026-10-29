---
title: "Paper summary: The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale"
categories: ["papers"]
tags: ["llm", "data", "pre-training"]
summary: "FineWeb is a 15-trillion-token open pre-training dataset built from 96 Common Crawl snapshots, with every curation choice ablated; its 1.3T-token educational subset, FineWeb-Edu, gives large gains on MMLU and ARC."
sources: 
  - title: "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale (arXiv:2406.17557)"
    url: "https://arxiv.org/abs/2406.17557"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:03.538Z"
  - title: "Hugging Face Daily Papers, 2024-06-26"
    url: "https://huggingface.co/papers?date=2024-06-26"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:14.657Z"
  - title: "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale (arXiv HTML full text)"
    url: "https://arxiv.org/html/2406.17557"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:03.538Z"
highlights: ["The dataset comes with its recipe: deduplication and filtering choices are each tested by training small models.", "Filtering for educational content had a big effect on knowledge- and reasoning-heavy benchmarks."]
papers: 
  - title: "The FineWeb Datasets: Decanting the Web for the Finest Text Data at Scale"
    authors: ["Guilherme Penedo", "Hynek Kydlíček", "Loubna Ben allal", "Anton Lozhkov", "Margaret Mitchell", "Colin Raffel", "Leandro Von Werra", "Thomas Wolf"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2406.17557"
    pdf: "https://arxiv.org/pdf/2406.17557v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Open, high-quality LLM pre-training data"
  method: "Curated pipeline over 96 Common Crawl snapshots with documented, ablated deduplication and filtering; classifier-filtered educational subset"
  data: "FineWeb (15T tokens) and FineWeb-Edu (1.3T tokens)"
  result: "Better-performing LLMs than other open pre-training datasets; FineWeb-Edu dramatically better on MMLU and ARC, per the abstract"
draft: false
date: "2024-06-26"
---

## Problem

The pre-training data of leading open-weight models like Llama 3 and Mixtral isn't public, and little is known about how it was built. Data quality and size matter enormously, so this is a big gap in public knowledge.

## Method

Hugging Face's **FineWeb** is a **15-trillion-token** dataset from **96 Common Crawl snapshots**. The paper documents and **ablates every design choice**, especially **deduplication** and **filtering** strategies, by training models on each variant and comparing them. It also introduces **FineWeb-Edu**, a **1.3-trillion-token** subset filtered for educational text.

## Key results

From the abstract:

- FineWeb produces better-performing LLMs than other open pre-training datasets
- models trained on FineWeb-Edu are dramatically better on knowledge- and reasoning-heavy benchmarks such as **MMLU** and **ARC**
- the curation code and all ablation models are released

## Limitations

There's no dedicated limitations section in the extracted text. The pipeline keeps English pages (it filters out non-English ones), and "quality" is defined by the authors' filters and benchmark-based ablations.
