---
title: "Paper summary: A Picture is Worth a Thousand Words: Principled Recaptioning Improves Image Generation"
categories: ["papers"]
tags: ["genai", "text-to-image", "data"]
summary: "RECAP relabels a text-to-image training set with captions from a specialised captioning model instead of web alt-text, and reports better image quality and much better prompt following."
sources: 
  - title: "A Picture is Worth a Thousand Words: Principled Recaptioning Improves Image Generation (arXiv:2310.16656)"
    url: "https://arxiv.org/abs/2310.16656"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:27.561Z"
  - title: "Hugging Face Daily Papers, 2023-10-26"
    url: "https://huggingface.co/papers?date=2023-10-26"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:46.397Z"
highlights: ["Web alt-text is a poor description of the image; better captions alone improve a text-to-image model.", "The gains show up in semantic accuracy, counting and positional alignment, not only in FID."]
papers: 
  - title: "A Picture is Worth a Thousand Words: Principled Recaptioning Improves Image Generation"
    authors: ["Eyal Segalis", "Dani Valevski", "Danny Lumen", "Yossi Matias", "Yaniv Leviathan"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2310.16656"
    pdf: "https://arxiv.org/pdf/2310.16656v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Improving how well text-to-image models follow prompts"
  method: "Fine-tune a captioning model to write detailed captions, recaption the training set, retrain the diffusion model"
  data: "LAION-style (image, alt-text) pairs relabelled with automatic captions"
  result: "FID 14.84 vs 17.87 baseline; 64.3% improvement in faithful generation (human eval); object accuracy 84.34 vs 78.90, per the abstract"
draft: false
date: "2023-10-26"
---

## Problem

Text-to-image diffusion models often ignore parts of a prompt: wrong counts, wrong positions, missing objects. The authors point at the training data. Datasets like LAION pair web images with their **HTML alt-text**, which often describes the image poorly or not at all.

## Method

**RECAP** keeps the images and fixes the captions:

1. Fine-tune an automatic captioning model to produce detailed, accurate captions.
2. **Relabel** the training corpus with these captions.
3. Train the text-to-image model on the recaptioned data.

The paper also analyses different ways to mix captions, and argues the method both reduces the mismatch between training captions and real user prompts and gives the model more information per example.

## Key results

As reported in the abstract, compared with training on the original captions:

- **FID 14.84 vs 17.87**, and a **64.3% improvement** in faithful image generation according to human evaluation
- semantic object accuracy **84.34 vs 78.90**
- counting alignment errors **1.32 vs 1.44**
- positional alignment **62.42 vs 57.60**

## Limitations

The paper doesn't have a dedicated limitations section in the extracted text. By construction, the improvement depends on the captioning model used for relabelling, and the reported numbers come from the authors' own model and dataset setup.
