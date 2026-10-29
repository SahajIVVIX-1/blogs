---
title: "Paper summary: Vision language models are blind: Failing to translate detailed visual features into words"
categories: ["papers"]
tags: ["multimodal", "evaluation", "cv"]
summary: "BlindTest's seven simple visual tasks, such as whether two circles overlap or how many times two lines cross, trip up strong vision-language models: four state-of-the-art VLMs averaged 58.07%."
sources: 
  - title: "Vision language models are blind: Failing to translate detailed visual features into words (arXiv:2407.06581)"
    url: "https://arxiv.org/abs/2407.06581"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:17.973Z"
  - title: "Hugging Face Daily Papers, 2024-07-10"
    url: "https://huggingface.co/papers?date=2024-07-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:23.505Z"
  - title: "Vision language models are blind: Failing to translate detailed visual features into words (arXiv HTML full text)"
    url: "https://arxiv.org/html/2407.06581"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:17.973Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/anguyen8/vision-llms-are-blind"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:42:17.973Z"
highlights: ["VLMs that ace vision benchmarks struggle when shapes overlap or sit close together.", "Linear probes show the vision encoder contains the needed information, so the bottleneck is turning it into words."]
papers: 
  - title: "Vision language models are blind: Failing to translate detailed visual features into words"
    authors: ["Pooyan Rahmanzadehgervi", "Logan Bolton", "Mohammad Reza Taesiri", "Anh Totti Nguyen"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2407.06581"
    pdf: "https://arxiv.org/pdf/2407.06581v6"
    code: "https://github.com/anguyen8/vision-llms-are-blind"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2024/paper-2407.06581.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2407.06581\">Rahmanzadehgervi et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : VLMs fail on the simple tasks of BlindTest ."
images: 
  - src: "images/2024/paper-2407.06581.webp"
    alt: "Figure from the paper \"Vision language models are blind: Failing to translate detailed visual features into words\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2407.06581\">Rahmanzadehgervi et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : VLMs fail on the simple tasks of BlindTest ."
card: 
  task: "Testing low-level visual perception of VLMs"
  method: "BlindTest: 7 simple synthetic tasks (overlapping circles, line intersections, circled letters, counting shapes), varied resolution and line width; linear probing of encoders"
  data: "Synthetic BlindTest images"
  result: "Four SOTA VLMs average 58.07%; best (Claude 3.5 Sonnet) 77.84% vs expected human 100%, per the abstract"
draft: false
date: "2024-07-10"
---

## Problem

GPT-4o, Gemini 1.5 Pro and similar models score highly on vision benchmarks. But do they actually *see* precise spatial details?

## Method

**BlindTest** is a suite of **7 very simple tasks** that are easy for people, such as:

- do two circles overlap?
- how many times do two lines intersect?
- which letter in a word is circled?
- how many circles are in an Olympic-like logo?

Images vary in resolution and line width. **Linear probes** on the vision encoders then check whether the needed information is present before the language model sees it.

## Key results

From the abstract:

- four state-of-the-art VLMs average **58.07%** accuracy
- the best, **Claude 3.5 Sonnet**, reaches **77.84%**, far from the expected human 100%
- models do well when shapes are spread apart, and fail when they **overlap or are close**
- linear probes show the **vision encoders contain enough information** to solve BlindTest, so the failure is in how it's translated into language

## Limitations

There's no dedicated limitations section in the extracted text. The tasks are synthetic and geometric by design. They isolate one weakness and aren't a general measure of visual ability.
