---
title: "IDEFICS: an open reproduction of Flamingo"
categories: ["ai"]
tags: ["multimodal", "open-source", "hugging-face"]
summary: "Hugging Face released IDEFICS, an open visual language model in 9B and 80B sizes that reproduces DeepMind's unreleased Flamingo using only public data and models."
sources: 
  - title: "Introducing IDEFICS: An Open Reproduction of State-of-the-art Visual Language Model"
    url: "https://huggingface.co/blog/idefics"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:31.057Z"
  - title: "Alayrac et al. (2022), Flamingo: a Visual Language Model for Few-Shot Learning"
    url: "https://arxiv.org/abs/2204.14198"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:07:31.723Z"
highlights: ["IDEFICS takes any mix of images and text as input and writes text, like Flamingo.", "It's built only on public data and models (LLaMA v1 and OpenCLIP), with base and instructed variants."]
draft: false
date: "2023-08-22"
---

## What happened

Hugging Face released **IDEFICS** (Image-aware Decoder Enhanced à la Flamingo with Interleaved Cross-attentionS), an open-access visual language model. It reproduces **Flamingo**, a DeepMind model that was never publicly released.

## The technical details

- accepts **arbitrary sequences of images and text** and produces text: answering questions about images, describing them, and writing stories grounded in several images
- built only on **publicly available data and models**: LLaMA v1 for language and OpenCLIP for vision
- two variants, **base** and **instructed**, each at **9B** and **80B** parameters
- the announcement says it's comparable in performance to the original Flamingo

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["IDEFICS: an open reproduction of Flamingo"]):::title
    n1(["Hugging Face: IDEFICS: an open reproduction of Flamingo"])
    n2["Hugging Face released IDEFICS, an open visual language model in 9B and 80B sizes that reproduces DeepMind's…"]
    n6[/"built only on publicly available data and models: LLaMA v1 for language and OpenCLIP for vision"/]
    n7{"Ready beyond the demo?"}
    n8["The blog frames IDEFICS as a transparency effort: public data only, tools to explore the training data, a shared…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: multimodal · open-source · hugging-face"]
    subgraph G0["What it adds"]
        n3["accepts arbitrary sequences of images and text and produces text: answering questions about images, describing…"]
        n4["two variants, base and instructed, each at 9B and 80B parameters"]
        n5["the announcement says it's comparable in performance to the original Flamingo"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n7 -- "yes" --> n6
    n6 --> n8
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

The blog frames IDEFICS as a transparency effort: public data only, tools to explore the training data, a shared log of technical lessons and mistakes, and adversarial red-teaming before release. It joined OpenFlamingo (a 9B reproduction) as an open base for multimodal research at a time when the leading multimodal systems were closed.
