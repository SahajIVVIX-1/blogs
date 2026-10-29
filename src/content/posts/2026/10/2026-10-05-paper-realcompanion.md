---
title: "Paper summary: RealCompanion: Benchmarking Human Understanding from Reasoning over Longitudinal Real-World Conversations"
categories: ["papers"]
tags: ["agents", "memory", "benchmark"]
summary: "RealCompanion releases ten real long-term human–AI companion relationships (27,218 messages over up to 120 days) and finds that people rarely refer back, that AI can't tell when the past matters, and that it reads more into people than they revealed."
sources: 
  - title: "RealCompanion: Benchmarking Human Understanding from Reasoning over Longitudinal Real-World Conversations (arXiv:2610.01780)"
    url: "https://arxiv.org/abs/2610.01780"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:29.498Z"
  - title: "Hugging Face Daily Papers, 2026-10-05"
    url: "https://huggingface.co/papers?date=2026-10-05"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:37:04.349Z"
  - title: "RealCompanion: Benchmarking Human Understanding from Reasoning over Longitudinal Real-World Conversations (arXiv HTML full text)"
    url: "https://arxiv.org/html/2610.01780"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:29.498Z"
highlights: ["Only 3.4% of messages depend on something said earlier, and then usually about 2,000 messages back.", "Calling earlier messages \"memories\" made models bring up the past 10–14 points more often, even when it wasn't needed."]
papers: 
  - title: "RealCompanion: Benchmarking Human Understanding from Reasoning over Longitudinal Real-World Conversations"
    authors: ["Arman Behnam", "Sunglyoung Kim", "Jiayi Yu", "Eric Huang", "Liangwei Yang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2610.01780"
    pdf: "https://arxiv.org/pdf/2610.01780v3"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Evaluating long-term understanding of a person in real conversations"
  method: "Benchmark of ten real relationships with profiles, personas, chat and question test items, each label linked to supporting messages"
  data: "27,218 messages over up to 120 days"
  result: "Recency-based retrieval finds needed earlier messages 95.9% overall but only 2.2% when they're far back; detectors barely beat chance, per the abstract"
draft: false
date: "2026-10-05"
---

## Problem

A companion AI that talks with someone for months should come to understand them. Real conversations are private, so existing benchmarks use **invented** people and questions.

## Method

**RealCompanion** releases **ten real relationships** between people and an AI companion: **27,218 messages** over up to **120 days**. For each person there's the full conversation, a profile, a persona, and chat and question test items. Every label points to the supporting messages, and chat labels include the reasoning behind them.

## Key results

From the abstract, three findings:

1. **People rarely refer back.** Only **3.4%** of messages depend on something said earlier, and then usually far back (a median of **2,157** messages). Looking at recent messages finds the needed one **95.9%** of the time overall, but only **2.2%** when it's far back.
2. **AI systems can't tell when the past matters.** Detectors barely beat chance, and labelling earlier messages as "memories" makes models bring up the past **10–14 points** more often, even when nothing from the past is needed.
3. **AI reads more into a person than they revealed.** Agent systems rebuilding personas add things the person never said.

## Limitations

There's no dedicated limitations section in the extracted text. Ten relationships is a small, specific sample, a trade-off the authors make for real data.
