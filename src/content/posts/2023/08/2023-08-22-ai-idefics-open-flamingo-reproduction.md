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

## Why it matters

The blog frames IDEFICS as a transparency effort: public data only, tools to explore the training data, a shared log of technical lessons and mistakes, and adversarial red-teaming before release. It joined OpenFlamingo (a 9B reproduction) as an open base for multimodal research at a time when the leading multimodal systems were closed.
