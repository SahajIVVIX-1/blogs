---
title: "Paper summary: Movie Gen: A Cast of Media Foundation Models"
categories: ["papers"]
tags: ["genai", "video", "audio"]
summary: "Meta's Movie Gen is a set of foundation models for 1080p HD video with synchronised audio, plus personalisation and instruction-based editing; the largest video model is a 30B Transformer."
sources: 
  - title: "Movie Gen: A Cast of Media Foundation Models (arXiv:2410.13720)"
    url: "https://arxiv.org/abs/2410.13720"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:43.361Z"
  - title: "Hugging Face Daily Papers, 2024-10-18"
    url: "https://huggingface.co/papers?date=2024-10-18"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:24.155Z"
  - title: "Movie Gen: A Cast of Media Foundation Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2410.13720"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:43.361Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/facebookresearch/moviegenbench"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:43:43.361Z"
highlights: ["The largest video model is a 30B-parameter Transformer with a 73K video-token context, enough for 16 seconds at 16 fps.", "The report covers the whole stack: architecture, latents, objectives, data curation, evaluation, parallelism and inference."]
papers: 
  - title: "Movie Gen: A Cast of Media Foundation Models"
    authors: ["Adam Polyak", "Amit Zohar", "Andrew Brown", "Andros Tjandra", "Animesh Sinha", "Ann Lee", "Apoorv Vyas", "Bowen Shi", "Chih-Yao Ma", "Ching-Yao Chuang", "David Yan", "Dhruv Choudhary", "Dingkang Wang", "Geet Sethi", "Guan Pang", "Haoyu Ma", "Ishan Misra", "Ji Hou", "Jialiang Wang", "Kiran Jagadeesh", "Kunpeng Li", "Luxin Zhang", "Mannat Singh", "Mary Williamson", "Matt Le", "Matthew Yu", "Mitesh Kumar Singh", "Peizhao Zhang", "Peter Vajda", "Quentin Duval", "Rohit Girdhar", "Roshan Sumbaly", "Sai Saketh Rambhatla", "Sam Tsai", "Samaneh Azadi", "Samyak Datta", "Sanyuan Chen", "Sean Bell", "Sharadh Ramaswamy", "Shelly Sheynin", "Siddharth Bhattacharya", "Simran Motwani", "Tao Xu", "Tianhe Li", "Tingbo Hou", "Wei-Ning Hsu", "Xi Yin", "Xiaoliang Dai", "Yaniv Taigman", "Yaqiao Luo", "Yen-Cheng Liu", "Yi-Chiao Wu", "Yue Zhao", "Yuval Kirstain", "Zecheng He", "Zijian He", "Albert Pumarola", "Ali Thabet", "Artsiom Sanakoyeu", "Arun Mallya", "Baishan Guo", "Boris Araya", "Breena Kerr", "Carleigh Wood", "Ce Liu", "Cen Peng", "Dimitry Vengertsev", "Edgar Schonfeld", "Elliot Blanchard", "Felix Juefei-Xu", "Fraylie Nord", "Jeff Liang", "John Hoffman", "Jonas Kohler", "Kaolin Fire", "Karthik Sivakumar", "Lawrence Chen", "Licheng Yu", "Luya Gao", "Markos Georgopoulos", "Rashel Moritz", "Sara K. Sampson", "Shikai Li", "Simone Parmeggiani", "Steve Fine", "Tara Fowler", "Vladan Petrovic", "Yuming Du"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2410.13720"
    pdf: "https://arxiv.org/pdf/2410.13720v2"
    code: "https://github.com/facebookresearch/moviegenbench"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Text-to-video, video personalisation, editing, video-to-audio and text-to-audio"
  method: "Cast of foundation models; 30B Transformer for video with 73K video-token context"
  data: "Large curated video and audio data"
  result: "New state of the art on multiple media generation tasks, per the abstract"
draft: false
date: "2024-10-18"
---

## Problem

Producing high-quality, long, high-resolution video with matching sound, and editing or personalising it, needs several capabilities that are usually built separately.

## Method

**Movie Gen** is a "cast" of foundation models that:

- generates **1080p HD video** in different aspect ratios with **synchronised audio**
- performs **instruction-based video editing**
- generates **personalised videos** from a user's image

The largest video model is a **30B-parameter Transformer** trained with a context of up to **73K video tokens**, enough for **16 seconds at 16 frames per second**. The report describes innovations and simplifications across architecture, latent spaces, training objectives, data curation, evaluation protocols, parallelisation and inference.

## Key results

From the abstract: new **state of the art** on text-to-video, video personalisation, video editing, video-to-audio and text-to-audio. The paper also describes the evaluation benchmark it uses.

## Limitations

There's no dedicated limitations section in the extracted text. Clip length is bounded by the context window (16 seconds at the reported settings).
