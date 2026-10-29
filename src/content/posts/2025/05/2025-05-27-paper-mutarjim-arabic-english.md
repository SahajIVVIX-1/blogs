---
title: "Paper summary: Mutarjim: Advancing Bidirectional Arabic-English Translation with a Small Language Model"
categories: ["papers"]
tags: ["nlp", "translation", "small-models"]
summary: "Mutarjim is a 1.5B-parameter Arabic–English translation model that's reported to rival models up to 20× larger, plus Tarjama-25, a new 5,000-pair benchmark built to fix gaps in existing test sets."
sources: 
  - title: "Mutarjim: Advancing Bidirectional Arabic-English Translation with a Small Language Model (arXiv:2505.17894)"
    url: "https://arxiv.org/abs/2505.17894"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:05.709Z"
  - title: "Hugging Face Daily Papers, 2025-05-27"
    url: "https://huggingface.co/papers?date=2025-05-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:38.782Z"
  - title: "Mutarjim: Advancing Bidirectional Arabic-English Translation with a Small Language Model (arXiv HTML full text)"
    url: "https://arxiv.org/html/2505.17894"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:05.709Z"
highlights: ["Careful two-phase training on a curated corpus lets a 1.5B model compete with much larger translators.", "The new benchmark targets three known problems: narrow domains, short sentences and English-source bias."]
papers: 
  - title: "Mutarjim: Advancing Bidirectional Arabic-English Translation with a Small Language Model"
    authors: ["Khalil Hennara", "Muhammad Hreden", "Mohamed Motaism Hamed", "Zeina Aldallal", "Sara Chrouf", "Safwan AlModhayan"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2505.17894"
    pdf: "https://arxiv.org/pdf/2505.17894v2"
    license: "http://creativecommons.org/licenses/by-nc-sa/4.0/"
card: 
  task: "Bidirectional Arabic–English machine translation"
  method: "Two-phase training of Kuwain-1.5B on a curated high-quality corpus"
  data: "Established benchmarks plus Tarjama-25 (5,000 expert-reviewed pairs)"
  result: "Rivals models up to 20× larger; SOTA on Tarjama-25 English→Arabic, above GPT-4o mini, per the abstract"
draft: false
date: "2025-05-27"
---

## Problem

Large LLMs translate well but are expensive. Can a small, specialised model compete for Arabic–English? Existing benchmarks also have issues: narrow domains, short sentences and an English-source bias.

## Method

**Mutarjim** builds on **Kuwain-1.5B**, a model tailored for Arabic and English, with an **optimised two-phase training** approach and a carefully curated corpus. The authors also introduce **Tarjama-25**, **5,000** expert-reviewed sentence pairs across a wide range of domains.

## Key results

From the abstract: Mutarjim outperforms much larger models on several established benchmarks and **rivals models up to 20× larger** at much lower cost. On Tarjama-25 it reaches state of the art for **English→Arabic**, surpassing larger and proprietary models such as **GPT-4o mini**.

## Limitations

There's no dedicated limitations section in the extracted text. The headline English→Arabic result is on the authors' own new benchmark.
