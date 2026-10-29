---
title: "Paper summary: Thinking with Video: Video Generation as a Promising Multimodal Reasoning Paradigm"
categories: ["papers"]
tags: ["multimodal", "video", "reasoning"]
summary: "\"Thinking with Video\" uses a video generation model (Sora-2) as a reasoner, drawing its solution as video frames; on a new benchmark it rivals strong VLMs on visual puzzles and reaches 92% on MATH."
sources: 
  - title: "Thinking with Video: Video Generation as a Promising Multimodal Reasoning Paradigm (arXiv:2511.04570)"
    url: "https://arxiv.org/abs/2511.04570"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:28.826Z"
  - title: "Hugging Face Daily Papers, 2025-11-07"
    url: "https://huggingface.co/papers?date=2025-11-07"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:43.155Z"
  - title: "Thinking with Video: Video Generation as a Promising Multimodal Reasoning Paradigm (arXiv HTML full text)"
    url: "https://arxiv.org/html/2511.04570"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:28.826Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/tongjingqi/Thinking-with-Video"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:49:28.826Z"
highlights: ["A video generation model can solve problems by generating a video of the solution being worked out.", "The authors could only evaluate Sora-2 from outside, because it isn't open-source."]
papers: 
  - title: "Thinking with Video: Video Generation as a Promising Multimodal Reasoning Paradigm"
    authors: ["Jingqi Tong", "Yurong Mou", "Hangcheng Li", "Mingzhe Li", "Yongzhuo Yang", "Ming Zhang", "Qiguang Chen", "Tianyi Liang", "Xiaomeng Hu", "Yining Zheng", "Xinchi Chen", "Jun Zhao", "Xuanjing Huang", "Xipeng Qiu"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2511.04570"
    pdf: "https://arxiv.org/pdf/2511.04570v2"
    code: "https://github.com/tongjingqi/Thinking-with-Video"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2511.04570.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2511.04570\">Tong et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Examples of vision-centric and text-centric tasks in VideoThinkBench , and Sora-2’s “Thinking with Video” solutions. Vision-centric tasks are solved by reasoning about visual elements via drawing and …"
images: 
  - src: "images/2025/paper-2511.04570.webp"
    alt: "Figure from the paper \"Thinking with Video: Video Generation as a Promising Multimodal Reasoning Paradigm\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2511.04570\">Tong et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Examples of vision-centric and text-centric tasks in VideoThinkBench , and Sora-2’s “Thinking with Video” solutions. Vision-centric tasks are solved by reasoning about visual elements via drawing and …"
card: 
  task: "Using video generation as a unified multimodal reasoning medium"
  method: "Prompt a video generation model (Sora-2) to solve tasks in generated frames; VideoThinkBench"
  data: "VideoThinkBench: vision-centric (e.g. eyeballing puzzles) and text-centric (e.g. GSM8K, MMMU) tasks"
  result: "Comparable to SOTA VLMs on vision tasks, +10% over GPT-5 on eyeballing puzzles; 92% on MATH, 69.2% on MMMU, per the abstract"
draft: false
date: "2025-11-07"
---

## Problem

"Thinking with text" (chain-of-thought) and "thinking with images" both help models reason, but according to the abstract, images capture only single moments, and text and vision stay separate modalities.

## Method

The authors propose **"Thinking with Video"**: use a **video generation model** such as **Sora-2** as the reasoner, with video frames as a unified medium for working through a problem. They build **VideoThinkBench**, with vision-centric tasks (like eyeballing puzzles) and text-centric tasks (like GSM8K and MMMU). Figure 1 shows example solutions.

## Key results

From the abstract:

- vision-centric tasks: comparable to state-of-the-art VLMs, and **10% above GPT-5** on eyeballing puzzles
- text-centric tasks: **92%** on MATH and **69.2%** on MMMU
- self-consistency and in-context learning improve Sora-2's performance further

## Limitations

From the paper: evaluation mainly covers Sora-2 among video models, and since Sora-2 **isn't open-source**, its internal mechanisms can't be analysed. More (especially open) video models are planned.
