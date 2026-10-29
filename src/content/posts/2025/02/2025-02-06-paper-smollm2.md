---
title: "Paper summary: SmolLM2: When Smol Goes Big -- Data-Centric Training of a Small Language Model"
categories: ["papers"]
tags: ["llm", "small-models", "data"]
summary: "SmolLM2 is a 1.7B model \"overtrained\" on about 11 trillion tokens in stages that mix web, maths, code and instruction data, with new datasets (FineMath, Stack-Edu, SmolTalk) built where existing ones were too small or noisy."
sources: 
  - title: "SmolLM2: When Smol Goes Big -- Data-Centric Training of a Small Language Model (arXiv:2502.02737)"
    url: "https://arxiv.org/abs/2502.02737"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:23.050Z"
  - title: "Hugging Face Daily Papers, 2025-02-06"
    url: "https://huggingface.co/papers?date=2025-02-06"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:31.565Z"
  - title: "SmolLM2: When Smol Goes Big -- Data-Centric Training of a Small Language Model (arXiv HTML full text)"
    url: "https://arxiv.org/html/2502.02737"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:23.050Z"
highlights: ["Training a small model on far more tokens than compute-optimal (\"overtraining\") pays off when the model must be cheap to run.", "Mixing rates are adjusted stage by stage based on how the previous stage performed."]
papers: 
  - title: "SmolLM2: When Smol Goes Big -- Data-Centric Training of a Small Language Model"
    authors: ["Loubna Ben Allal", "Anton Lozhkov", "Elie Bakouch", "Gabriel Martín Blázquez", "Guilherme Penedo", "Lewis Tunstall", "Andrés Marafioti", "Hynek Kydlíček", "Agustín Piqueres Lajarín", "Vaibhav Srivastav", "Joshua Lochner", "Caleb Fahlgren", "Xuan-Son Nguyen", "Clémentine Fourrier", "Ben Burtenshaw", "Hugo Larcher", "Haojun Zhao", "Cyril Zakka", "Mathieu Morlon", "Colin Raffel", "Leandro von Werra", "Thomas Wolf"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2502.02737"
    pdf: "https://arxiv.org/pdf/2502.02737v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "State-of-the-art small (1.7B) language model"
  method: "~11T tokens, multi-stage training mixing web text with maths, code and instruction data; new datasets FineMath, Stack-Edu, SmolTalk"
  data: "Released model and all prepared datasets"
  result: "Outperforms Qwen2.5-1.5B and Llama3.2-1B, per the abstract"
draft: false
date: "2025-02-06"
---

## Problem

Large models are costly to run, so small ones matter for on-device and low-resource use. The question is how to make a 1.7B model as strong as possible.

## Method

Hugging Face's **SmolLM2** is **overtrained** on about **11 trillion tokens**, far beyond the compute-optimal amount for its size (the Chinchilla post on this blog explains that trade-off). Training runs in **multiple stages** that mix web text with specialised **maths**, **code** and **instruction-following** data. After each stage, the mixing rates are refined manually based on performance, guided by small-scale ablations. Where existing data was too small or low quality, the authors built new datasets: **FineMath**, **Stack-Edu** and **SmolTalk**.

## Key results

From the abstract: SmolLM2 outperforms other recent small LMs, including **Qwen2.5-1.5B** and **Llama3.2-1B**. The model and all the datasets are released.

## Limitations

There's no dedicated limitations section in the extracted text. The stage-wise mixing involved manual decisions, which makes the recipe harder to transfer automatically.
