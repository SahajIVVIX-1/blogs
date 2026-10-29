---
title: "Paper summary: Molmo and PixMo: Open Weights and Open Data for State-of-the-Art Vision-Language Models"
categories: ["papers"]
tags: ["multimodal", "open-source", "data"]
summary: "Molmo is a family of open vision-language models trained on PixMo, new datasets collected without using any external VLMs, including detailed captions, free-form Q&A and 2D pointing data."
sources: 
  - title: "Molmo and PixMo: Open Weights and Open Data for State-of-the-Art Vision-Language Models (arXiv:2409.17146)"
    url: "https://arxiv.org/abs/2409.17146"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:25.276Z"
  - title: "Hugging Face Daily Papers, 2024-09-26"
    url: "https://huggingface.co/papers?date=2024-09-26"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:10.774Z"
  - title: "Molmo and PixMo: Open Weights and Open Data for State-of-the-Art Vision-Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2409.17146"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:25.276Z"
highlights: ["Many \"open\" VLMs are effectively distilled from proprietary VLMs through synthetic data; PixMo avoids that.", "A 2D pointing dataset teaches the model to point at things in images, not just describe them."]
papers: 
  - title: "Molmo and PixMo: Open Weights and Open Data for State-of-the-Art Vision-Language Models"
    authors: ["Matt Deitke", "Christopher Clark", "Sangho Lee", "Rohun Tripathi", "Yue Yang", "Jae Sung Park", "Mohammadreza Salehi", "Niklas Muennighoff", "Kyle Lo", "Luca Soldaini", "Jiasen Lu", "Taira Anderson", "Erin Bransom", "Kiana Ehsani", "Huong Ngo", "YenSung Chen", "Ajay Patel", "Mark Yatskar", "Chris Callison-Burch", "Andrew Head", "Rose Hendrix", "Favyen Bastani", "Eli VanderBilt", "Nathan Lambert", "Yvonne Chou", "Arnavi Chheda", "Jenna Sparks", "Sam Skjonsberg", "Michael Schmitz", "Aaron Sarnat", "Byron Bischoff", "Pete Walsh", "Chris Newell", "Piper Wolters", "Tanmay Gupta", "Kuo-Hao Zeng", "Jon Borchardt", "Dirk Groeneveld", "Crystal Nam", "Sophie Lebrecht", "Caitlin Wittlif", "Carissa Schoenick", "Oscar Michel", "Ranjay Krishna", "Luca Weihs", "Noah A. Smith", "Hannaneh Hajishirzi", "Ross Girshick", "Ali Farhadi", "Aniruddha Kembhavi"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2409.17146"
    pdf: "https://arxiv.org/pdf/2409.17146v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Fully open, state-of-the-art vision-language models"
  method: "Molmo models trained on PixMo datasets (dense captions, free-form Q&A, 2D pointing), collected without external VLMs"
  data: "PixMo datasets"
  result: "Best-in-class 72B model outperforms other open-weight-and-data models, per the abstract"
draft: false
date: "2024-09-26"
---

## Problem

The best VLMs are proprietary. Many open-weight VLMs get their quality from **synthetic data produced by proprietary VLMs**, which effectively distils closed models. So the community lacked knowledge of how to build strong VLMs **from scratch**.

## Method

The Allen Institute team built **PixMo**, a set of datasets collected **without using external VLMs**:

- highly detailed **image captions** for pre-training
- a **free-form image Q&A** dataset for fine-tuning
- a **2D pointing** dataset, so the model can point at locations in an image

**Molmo** models are trained on these with careful modelling choices and a well-tuned pipeline. The authors stress that data quality was the most critical factor.

## Key results

From the abstract: the best **72B** Molmo outperforms other models that are open in both weights and data. The authors describe the family as state of the art for its class of openness.

## Limitations

There's no dedicated limitations section in the extracted text. "State of the art in its class of openness" compares mainly with other open models, not every proprietary one.
