---
title: "Paper summary: Can We Defend Against AI-Generated Video Attacks on Real-World Crisis Events? A Systematic Evaluation of Detectors, Generators and Social Dissemination"
categories: ["papers"]
tags: ["genai", "video", "misinformation", "evaluation"]
summary: "RA-Bench pairs 1,830 real crisis videos with 16,056 generated clips from nine generators, and finds that no family of AI-video detectors generalises consistently, including when videos are re-shared on social media."
sources: 
  - title: "Can We Defend Against AI-Generated Video Attacks on Real-World Crisis Events? A Systematic Evaluation of Detectors, Generators and Social Dissemination (arXiv:2608.14391)"
    url: "https://arxiv.org/abs/2608.14391"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:45.972Z"
  - title: "Hugging Face Daily Papers, 2026-08-17"
    url: "https://huggingface.co/papers?date=2026-08-17"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:34.486Z"
  - title: "Can We Defend Against AI-Generated Video Attacks on Real-World Crisis Events? A Systematic Evaluation of Detectors, Generators and Social Dissemination (arXiv HTML full text)"
    url: "https://arxiv.org/html/2608.14391"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:45.972Z"
highlights: ["Real videos act as anchors, so detectors are tested on generated clips of the same kinds of crisis events.", "None of the three detector families (traditional, zero-shot multimodal, fine-tuned MLLMs) generalised consistently."]
papers: 
  - title: "Can We Defend Against AI-Generated Video Attacks on Real-World Crisis Events? A Systematic Evaluation of Detectors, Generators and Social Dissemination"
    authors: ["Shuo Liang", "Yixing Ma", "Pengfei Zhou", "Zhenglin Wan", "Xingyan Chen", "Zihan Mei", "Manting Li", "Feihan Chen", "Zhiwen Wang", "Bin Xu", "Haotian Zhang", "Jiajun Song", "Shiya Su", "Run Liu", "Zhenghang Ni", "Yifa Yu", "Jintao Hong", "Bolong Feng", "Yifei Liu", "Zirui Zhang", "Jingxuan Zhang", "Songlin Zhao", "Yifan Bai", "Kang Tan", "Yizhe Liu", "Junhao Du", "Yongtao Ge", "Zhaopan Xv", "Xinyuan Zhang", "Mengru Ma", "Chunhua Shen", "Wei Wang", "Yang You", "Zheng Zhu", "Kaipeng Zhang", "Wangbo Zhao"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2608.14391"
    pdf: "https://arxiv.org/pdf/2608.14391v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Detecting AI-generated videos of real-world crises"
  method: "RA-Bench with real-video anchors across 10 social-risk categories; evaluation of detectors, generation conditions, human judgements and social dissemination"
  data: "17,886 videos: 1,830 real anchors + 16,056 clips from 4 open and 5 closed generators"
  result: "No detector family generalises consistently across the benchmark, per the abstract"
draft: false
date: "2026-08-17"
---

## Problem

Video generators can now fabricate realistic footage of **wars, disasters and emergencies**, a serious misinformation risk. Existing benchmarks say little about how detectors behave in exactly these settings.

## Method

**RA-Bench** uses **real videos as anchors**: **1,830** real videos across **10 social-risk categories**, plus **16,056** generated clips from **four open-source and five closed-source** generators. The evaluation has three parts:

1. **detector generalisation**: seven traditional detectors, ten zero-shot multimodal models in three review settings, and two MLLMs fine-tuned for AI-video detection
2. how detectability changes with **generation quality, conditioning and seeds**
3. **human authenticity judgements**, and detector reliability during **social dissemination** (re-encoding and re-sharing)

## Key results

From the abstract: **none** of the three detector families generalises consistently. Generation properties affect the families differently, while source-level detection patterns stay stable across seeds.

## Limitations

There's no dedicated limitations section in the extracted text. Generators change quickly, so any snapshot benchmark ages.
