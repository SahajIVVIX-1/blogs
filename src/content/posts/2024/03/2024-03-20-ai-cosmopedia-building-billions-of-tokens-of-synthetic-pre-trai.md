---
title: "Cosmopedia: building billions of tokens of synthetic pre-training data"
categories: ["ai"]
tags: ["hugging-face", "cosmopedia", "synthetic-data", "pretraining", "phi"]
summary: "Hugging Face explains how it generated Cosmopedia, a synthetic dataset of billions of tokens made to replicate Phi-1.5, and the challenges of scaling synthetic data from thousands to millions of samples for pre-training."
sources: 
  - title: "Cosmopedia: how to create large-scale synthetic data for pre-training Large Language Models"
    url: "https://huggingface.co/blog/cosmopedia"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:36.690Z"
highlights: ["The focus is synthetic data for pre-training from scratch, not for instruction tuning.", "It reproduces the approach behind Microsoft's Phi-1.5 in an open dataset."]
draft: false
date: "2024-03-20"
---

## What happened

On 20 March 2024 **Hugging Face** described the challenges and solutions behind **Cosmopedia**, a synthetic dataset with billions of tokens created to replicate Phi-1.5. Synthetic data means data artificially generated, for instance by LLMs, to mimic real-world data.

## The technical details

From the Hugging Face post:

- historically, instruction-tuning datasets required **hiring human annotators**, limiting dataset creation to a few players
- the community has since built hundreds of synthetic fine-tuning datasets, mostly with **GPT-3.5 and GPT-4**
- this post is **not about instruction-tuning data**: it is about scaling from a few thousand to **millions of samples for pre-training LLMs from scratch**, which raises distinct challenges
- Cosmopedia is the open dataset produced by this effort

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Cosmopedia: building billions of tokens of synthetic pre-training data"]):::title
    n1(["Hugging Face: Cosmopedia: building billions of tokens of synthetic pre-training data"])
    n2["Hugging Face explains how it generated Cosmopedia, a synthetic dataset of billions of tokens made to replicate…"]
    n7{"Ready beyond the demo?"}
    n8["Synthetic data moved from a fine-tuning trick to a way of building pre-training corpora."]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: hugging-face · cosmopedia · synthetic-data · pretraining"]
    subgraph G0["What it adds"]
        n3["historically, instruction-tuning datasets required hiring human annotators, limiting dataset creation to a few…"]
        n4["the community has since built hundreds of synthetic fine-tuning datasets, mostly with GPT-3.5 and GPT-4"]
        n5["this post is not about instruction-tuning data: it is about scaling from a few thousand to millions of samples…"]
        n6["Cosmopedia is the open dataset produced by this effort"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n6 --> n7
    n7 --> n8
    n8 --> n9
    n10 --> n2
    class n7 dec
    class n1,n9 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

Synthetic data moved from a fine-tuning trick to a way of building pre-training corpora. Publishing the recipe is the useful part, because the Phi results were hard to study without knowing how the data was made. This blog's study notes cover the technique under synthetic data for pre-training.
