---
title: "Paper summary: Reinforcement Pre-Training"
categories: ["papers"]
tags: ["llm", "rl", "pre-training"]
summary: "Reinforcement Pre-Training reframes next-token prediction as a reasoning task: the model reasons before predicting the next token and gets a verifiable reward when it's right, so ordinary text becomes RL training data."
sources: 
  - title: "Reinforcement Pre-Training (arXiv:2506.08007)"
    url: "https://arxiv.org/abs/2506.08007"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:18.081Z"
  - title: "Hugging Face Daily Papers, 2025-06-10"
    url: "https://huggingface.co/papers?date=2025-06-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:47.202Z"
  - title: "Reinforcement Pre-Training (arXiv HTML full text)"
    url: "https://arxiv.org/html/2506.08007"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:18.081Z"
highlights: ["Every next token in a corpus becomes a small verifiable RL problem: reason, then predict, then get rewarded if correct.", "This lets general web-scale text feed RL, instead of only domain-specific Q&A sets."]
papers: 
  - title: "Reinforcement Pre-Training"
    authors: ["Qingxiu Dong", "Li Dong", "Yao Tang", "Tianzhu Ye", "Yutao Sun", "Zhifang Sui", "Furu Wei"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2506.08007"
    pdf: "https://arxiv.org/pdf/2506.08007v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Using RL during pre-training on general text"
  method: "Next-token reasoning trained with RL; reward = correct next-token prediction"
  data: "General text corpora"
  result: "Improved next-token prediction accuracy that scales with compute; stronger base for later RL fine-tuning, per the abstract"
draft: false
date: "2025-06-10"
---

## Problem

RL for reasoning usually needs domain-specific problems with checkable answers (maths, code). Meanwhile, huge amounts of general text are only used for plain next-token prediction.

## Method

**Reinforcement Pre-Training (RPT)** turns next-token prediction into a **reasoning task trained with RL**. For a given context, the model reasons and then predicts the next token, and it receives a **verifiable reward** if the prediction is correct. Any text corpus becomes a source of RL training signal.

## Key results

From the abstract:

- RPT significantly improves **next-token prediction accuracy**
- it gives a stronger foundation for later **reinforcement fine-tuning**
- **scaling curves** show accuracy improving consistently with more training compute

## Limitations

There's no dedicated limitations section in the extracted text. Reasoning before every token is far more expensive than standard next-token training.
