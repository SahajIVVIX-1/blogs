---
title: "Paper summary: ShareGPT4Video: Improving Video Understanding and Generation with Better Captions"
categories: ["papers"]
tags: ["multimodal", "video", "data"]
summary: "ShareGPT4Video builds dense, precise video captions (40K with GPT-4V, then 4.8M with its own captioner) to improve both video understanding models and text-to-video generation."
sources: 
  - title: "ShareGPT4Video: Improving Video Understanding and Generation with Better Captions (arXiv:2406.04325)"
    url: "https://arxiv.org/abs/2406.04325"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:44.694Z"
  - title: "Hugging Face Daily Papers, 2024-06-07"
    url: "https://huggingface.co/papers?date=2024-06-07"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:03.031Z"
  - title: "ShareGPT4Video: Improving Video Understanding and Generation with Better Captions (arXiv HTML full text)"
    url: "https://arxiv.org/html/2406.04325"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:44.694Z"
highlights: ["Naively feeding frames to GPT-4V gave captions that missed detail and confused the order of events, so the authors designed a dedicated captioning strategy.", "One caption pipeline serves two goals: better video-language models and better text-to-video models."]
papers: 
  - title: "ShareGPT4Video: Improving Video Understanding and Generation with Better Captions"
    authors: ["Lin Chen", "Xilin Wei", "Jinsong Li", "Xiaoyi Dong", "Pan Zhang", "Yuhang Zang", "Zehui Chen", "Haodong Duan", "Bin Lin", "Zhenyu Tang", "Li Yuan", "Yu Qiao", "Dahua Lin", "Feng Zhao", "Jiaqi Wang"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2406.04325"
    pdf: "https://arxiv.org/pdf/2406.04325v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2024/paper-2406.04325.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2406.04325\">Chen et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Details and attributes of the ShareGPT4Video. (a) The proposed ShareGPT4Video dataset contains a large volume of high-quality video-caption pairs collected from diverse sources, with 40K captions from GPT4V …"
images: 
  - src: "images/2024/paper-2406.04325.webp"
    alt: "Figure from the paper \"ShareGPT4Video: Improving Video Understanding and Generation with Better Captions\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2406.04325\">Chen et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Details and attributes of the ShareGPT4Video. (a) The proposed ShareGPT4Video dataset contains a large volume of high-quality video-caption pairs collected from diverse sources, with 40K captions from GPT4V …"
card: 
  task: "Better captions for video understanding and generation"
  method: "Carefully filtered GPT-4V dense captioning (40K videos), a captioner model (ShareCaptioner-Video), and an 8B video LVLM"
  data: "ShareGPT4Video (40K); 4.8M aesthetic videos captioned by ShareCaptioner-Video"
  result: "ShareGPT4Video-8B reaches SOTA on three video benchmarks, per the abstract"
draft: false
date: "2024-06-07"
---

## Problem

Both video-language models and text-to-video models depend on **captions**, and most video captions are short and vague. Human annotation doesn't scale, and the authors found that asking GPT-4V naively (several frames at once, or frames stitched together) gave less detailed and sometimes **temporally confused** captions.

## Method

The series has three parts:

1. **ShareGPT4Video**: **40K** dense captions of videos of various lengths and sources, made with GPT-4V through a carefully designed filtering and annotation strategy. The strategy targets precise changes between frames, detailed content within frames, and scaling to long videos.
2. **ShareCaptioner-Video**: a captioning model trained on that data, used to caption **4.8M** high-quality, aesthetic videos.
3. **ShareGPT4Video-8B**: a video LVLM trained with the captions.

## Key results

The abstract reports that ShareGPT4Video-8B reaches state-of-the-art performance on **three video benchmarks**.

## Limitations

From the paper:

- the caption pipeline can't use **audio**, because GPT-4V doesn't take audio input
- the large set of generated captions wasn't manually checked for **social bias**
- the source videos may contain **human faces**, so users must follow the original videos' licences
