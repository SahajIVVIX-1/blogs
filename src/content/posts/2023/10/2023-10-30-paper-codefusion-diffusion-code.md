---
title: "Paper summary: CodeFusion: A Pre-trained Diffusion Model for Code Generation"
categories: ["papers"]
tags: ["llm", "code", "diffusion"]
summary: "CodeFusion generates code with a diffusion model that iteratively denoises a whole program conditioned on the natural-language request, instead of writing tokens left to right."
sources: 
  - title: "CodeFusion: A Pre-trained Diffusion Model for Code Generation (arXiv:2310.17680)"
    url: "https://arxiv.org/abs/2310.17680"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:33.758Z"
  - title: "Hugging Face Daily Papers, 2023-10-30"
    url: "https://huggingface.co/papers?date=2023-10-30"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:48.552Z"
highlights: ["Autoregressive code models can't easily revise earlier tokens; diffusion refines the whole program at every step.", "A 75M-parameter diffusion model is reported to match much larger autoregressive systems on top-1 accuracy."]
papers: 
  - title: "CodeFusion: A Pre-trained Diffusion Model for Code Generation"
    authors: ["Mukul Singh", "José Cambronero", "Sumit Gulwani", "Vu Le", "Carina Negreanu", "Gust Verbruggen"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2310.17680"
    pdf: "https://arxiv.org/pdf/2310.17680v3"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Natural-language-to-code generation"
  method: "Pre-trained diffusion model that denoises a complete program conditioned on an encoded NL description"
  data: "Bash, Python and Microsoft Excel conditional-formatting rules"
  result: "75M-parameter model on par with 350M–175B autoregressive systems in top-1 accuracy, better in top-3/top-5, per the abstract"
draft: false
date: "2023-10-30"
---

## Problem

The abstract's analogy: imagine a developer who can only change the **last** line of code they wrote. Autoregressive code models are in that position. Once a token is generated, it's fixed, so an early mistake can only be fixed by starting over.

## Method

**CodeFusion** applies **diffusion** to code. Starting from noise, it iteratively **denoises a complete program**, conditioned on an encoding of the natural-language request. Every denoising step can revise any part of the program. The model is pre-trained and then evaluated on three languages: **Bash**, **Python**, and **Excel conditional-formatting rules**.

## Key results

According to the abstract, CodeFusion with **75M parameters** performs on par with state-of-the-art autoregressive systems of **350M to 175B** parameters on **top-1** accuracy, and outperforms them on **top-3 and top-5**. The authors attribute this to a better balance between the diversity and quality of its candidates.

## Limitations

The paper doesn't have a dedicated limitations section in the extracted text. The evaluation covers three targets (Bash, Python and Excel conditional-formatting rules), so results on other languages and longer programs aren't covered by this paper.
