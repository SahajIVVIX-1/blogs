---
title: "Paper summary: Qwen-Image Technical Report"
categories: ["papers"]
tags: ["genai", "text-to-image", "image-editing"]
summary: "Qwen-Image is an image-generation foundation model focused on rendering complex text (including Chinese) inside images and on consistent image editing, using a text-rendering curriculum and dual encoding of the input image."
sources: 
  - title: "Qwen-Image Technical Report (arXiv:2508.02324)"
    url: "https://arxiv.org/abs/2508.02324"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:07.709Z"
  - title: "Hugging Face Daily Papers, 2025-08-05"
    url: "https://huggingface.co/papers?date=2025-08-05"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:46.141Z"
  - title: "Qwen-Image Technical Report (arXiv HTML full text)"
    url: "https://arxiv.org/html/2508.02324"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:07.709Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/QwenLM/Qwen-Image"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:48:07.709Z"
highlights: ["A curriculum moves from images without text, to simple text, up to paragraph-level text, to teach native text rendering.", "For editing, the input image goes to both Qwen2.5-VL (meaning) and a VAE (pixel detail), balancing semantic consistency and visual fidelity."]
papers: 
  - title: "Qwen-Image Technical Report"
    authors: ["Chenfei Wu", "Jiahao Li", "Jingren Zhou", "Junyang Lin", "Kaiyuan Gao", "Kun Yan", "Sheng-ming Yin", "Shuai Bai", "Xiao Xu", "Yilei Chen", "Yuxiang Chen", "Zecheng Tang", "Zekai Zhang", "Zhengyi Wang", "An Yang", "Bowen Yu", "Chen Cheng", "Dayiheng Liu", "Deqing Li", "Hang Zhang", "Hao Meng", "Hu Wei", "Jingyuan Ni", "Kai Chen", "Kuan Cao", "Liang Peng", "Lin Qu", "Minggang Wu", "Peng Wang", "Shuting Yu", "Tingkun Wen", "Wensen Feng", "Xiaoxiao Xu", "Yi Wang", "Yichang Zhang", "Yongqiang Zhu", "Yujia Wu", "Yuxuan Cai", "Zenan Liu"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2508.02324"
    pdf: "https://arxiv.org/pdf/2508.02324v1"
    code: "https://github.com/QwenLM/Qwen-Image"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Text-to-image generation with complex text rendering, and image editing"
  method: "Data pipeline for text rendering; progressive curriculum; multi-task training (T2I, TI2I, I2I reconstruction) aligning Qwen2.5-VL and MMDiT latents; dual encoding for editing"
  data: "Large-scale collected, filtered, annotated and synthesised data"
  result: "State-of-the-art image generation and editing across multiple benchmarks, per the abstract"
draft: false
date: "2025-08-05"
---

## Problem

Image generators often garble any text they draw, especially long text and logographic scripts like Chinese. Image *editing* also struggles to change one thing while keeping the rest consistent.

## Method

- **Text rendering**: a full data pipeline (collection, filtering, annotation, synthesis, balancing) plus a **curriculum** that starts with no-text images, moves from simple to complex text, and scales to **paragraph-level** descriptions.
- **Editing**: multi-task training on text-to-image, text-image-to-image and image-to-image **reconstruction**, which aligns the latent spaces of **Qwen2.5-VL** and the **MMDiT** generator.
- **Dual encoding**: the original image is fed to Qwen2.5-VL (semantic representation) and to a **VAE encoder** (reconstructive representation), so edits keep the meaning *and* the pixel detail.

## Key results

From the abstract: strong performance on alphabetic languages like English, "remarkable progress" on logographic languages like Chinese, and state-of-the-art results in both generation and editing across multiple benchmarks.

## Limitations

There's no dedicated limitations section in the extracted text. Benchmark comparisons are the developers' own.
