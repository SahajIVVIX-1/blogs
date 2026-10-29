---
title: "Paper summary: Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights"
categories: ["papers"]
tags: ["llm", "fine-tuning", "peft"]
summary: "Drag-and-Drop LLMs train a generator that maps a few unlabelled task prompts straight to LoRA weights, specialising an LLM for a new task in seconds without any gradient-based fine-tuning on it."
sources: 
  - title: "Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights (arXiv:2506.16406)"
    url: "https://arxiv.org/abs/2506.16406"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:30.669Z"
  - title: "Hugging Face Daily Papers, 2025-06-23"
    url: "https://huggingface.co/papers?date=2025-06-23"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:55.025Z"
  - title: "Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights (arXiv HTML full text)"
    url: "https://arxiv.org/html/2506.16406"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:30.669Z"
highlights: ["Instead of training a LoRA per task, a hypernetwork generates the LoRA weights from example prompts.", "The paper reports up to 12,000× lower overhead than full fine-tuning."]
papers: 
  - title: "Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights"
    authors: ["Zhiyuan Liang", "Dongwen Tang", "Yuhao Zhou", "Xuanlei Zhao", "Mingjia Shi", "Wangbo Zhao", "Zekai Li", "Peihao Wang", "Konstantin Schürholt", "Damian Borth", "Michael M. Bronstein", "Yang You", "Zhangyang Wang", "Kai Wang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2506.16406"
    pdf: "https://arxiv.org/pdf/2506.16406v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2506.16406.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2506.16406\">Liang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. (a) Parameter-Efficient-Fine-Tuning"
images: 
  - src: "images/2025/paper-2506.16406.webp"
    alt: "Figure from the paper \"Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2506.16406\">Liang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. (a) Parameter-Efficient-Fine-Tuning"
card: 
  task: "Zero-shot task adaptation of LLMs"
  method: "Prompt-conditioned parameter generator: text encoder → cascaded hyper-convolutional decoder → full LoRA matrices"
  data: "Trained on prompt–checkpoint pairs; tested on unseen common-sense, maths, coding and multimodal benchmarks"
  result: "Up to 12,000× lower overhead than full fine-tuning; up to 30% average gains over the strongest training LoRAs on unseen benchmarks, per the abstract"
draft: false
date: "2025-06-23"
---

## Problem

LoRA (my February study notes) makes fine-tuning cheaper, but every new dataset still needs its own optimisation run.

## Method

**Drag-and-Drop LLMs (DnD)** learn a **prompt-conditioned parameter generator**:

1. a lightweight **text encoder** turns a batch of unlabelled task prompts into condition embeddings
2. a **cascaded hyper-convolutional decoder** turns those into the **full set of LoRA matrices**

The generator is trained on many (prompts, trained-LoRA-checkpoint) pairs. For a new task, it produces task-specific weights **in seconds**, with no training on that task.

## Key results

From the abstract:

- up to **12,000×** lower overhead than full fine-tuning
- average gains up to **30%** over the strongest training LoRAs on **unseen** common-sense, maths, coding and multimodal benchmarks
- robust cross-domain generalisation without seeing target data or labels

## Limitations

There's no dedicated limitations section in the extracted text. The generator must first be trained on a diverse collection of existing LoRA checkpoints.
