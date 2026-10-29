---
title: "Paper summary: DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models"
categories: ["papers"]
tags: ["llm", "reasoning", "rl"]
summary: "DeepSeekMath 7B continues pre-training on 120B maths tokens mined from Common Crawl and introduces GRPO, a PPO variant without a value network, reaching 51.7% on the MATH benchmark."
sources: 
  - title: "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models (arXiv:2402.03300)"
    url: "https://arxiv.org/abs/2402.03300"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:00.660Z"
  - title: "Hugging Face Daily Papers, 2024-02-06"
    url: "https://huggingface.co/papers?date=2024-02-06"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:48.701Z"
  - title: "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2402.03300"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:00.660Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/deepseek-ai/deepseek-math"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:40:00.660Z"
highlights: ["GRPO replaces PPO's learned value baseline with the average reward of a group of sampled answers, which saves memory.", "A carefully filtered web corpus turned out to be a rich source of maths data; arXiv helped less than expected."]
papers: 
  - title: "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models"
    authors: ["Zhihong Shao", "Peiyi Wang", "Qihao Zhu", "Runxin Xu", "Junxiao Song", "Xiao Bi", "Haowei Zhang", "Mingchuan Zhang", "Y. K. Li", "Y. Wu", "Daya Guo"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2402.03300"
    pdf: "https://arxiv.org/pdf/2402.03300v3"
    code: "https://github.com/deepseek-ai/deepseek-math"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Mathematical reasoning in an open 7B model"
  method: "Continued pre-training of DeepSeek-Coder-Base-v1.5 7B on 120B maths tokens from Common Crawl (plus text and code); RL with Group Relative Policy Optimization (GRPO)"
  data: "Math-related web pages selected by an engineered pipeline; MATH benchmark"
  result: "51.7% on MATH without tools or voting; 60.9% with self-consistency over 64 samples, per the abstract"
draft: false
date: "2024-02-06"
---

## Problem

Competition-level maths is hard for language models, and the strongest results came from closed models like GPT-4 and Gemini Ultra.

## Method

Two ingredients:

1. **Data**: an engineered pipeline selects **120B maths-related tokens from Common Crawl**. The model, starting from DeepSeek-Coder-Base-v1.5 7B, continues pre-training on these together with natural-language and code data (the paper says 500B tokens in total).
2. **GRPO (Group Relative Policy Optimization)**: a PPO variant for the RL stage. Instead of training a separate value model as a baseline, it samples a **group** of answers per question and uses their relative rewards. This improves reasoning while using less memory than PPO.

## Key results

From the abstract:

- **51.7%** on the competition-level **MATH** benchmark without external tools or voting, approaching Gemini-Ultra and GPT-4
- **60.9%** with self-consistency over 64 samples

The ablations report that web pages are a strong source of maths data, while arXiv papers were less useful than the authors expected.

## Limitations

The paper's closing section summarises results rather than listing limitations. The headline is on maths benchmarks specifically. GRPO is presented as effective even after the instruct model already scores highly.
