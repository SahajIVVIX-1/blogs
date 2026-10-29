---
title: "Paper summary: Self-Rewarding Language Models"
categories: ["papers"]
tags: ["llm", "alignment", "rlhf"]
summary: "A model judges its own responses with LLM-as-a-Judge prompting and trains on those rewards with iterative DPO, so both its instruction following and its judging improve over three rounds."
sources: 
  - title: "Self-Rewarding Language Models (arXiv:2401.10020)"
    url: "https://arxiv.org/abs/2401.10020"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:42.020Z"
  - title: "Hugging Face Daily Papers, 2024-01-18"
    url: "https://huggingface.co/papers?date=2024-01-18"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:37.162Z"
  - title: "Self-Rewarding Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2401.10020"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:42.020Z"
highlights: ["The same model generates candidates, scores them as a judge, and learns from the resulting preference pairs.", "The authors report that the model's ability to reward itself also improves across iterations."]
papers: 
  - title: "Self-Rewarding Language Models"
    authors: ["Weizhe Yuan", "Richard Yuanzhe Pang", "Kyunghyun Cho", "Xian Li", "Sainbayar Sukhbaatar", "Jing Xu", "Jason Weston"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2401.10020"
    pdf: "https://arxiv.org/pdf/2401.10020v3"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Aligning LLMs without a fixed, separately trained reward model"
  method: "LLM-as-a-Judge self-scoring + Iterative DPO over three rounds"
  data: "Llama 2 70B fine-tuned; evaluated on AlpacaEval 2.0"
  result: "After three iterations, outperforms many systems on AlpacaEval 2.0 including Claude 2, Gemini Pro and GPT-4 0613, per the abstract"
draft: false
date: "2024-01-18"
---

## Problem

Standard RLHF trains a separate reward model on human preferences and then **freezes** it. That reward model is limited by human labelling and can't improve as the LLM improves.

## Method

In a **self-rewarding** loop, the language model plays both roles:

1. It generates several candidate responses to new prompts.
2. Prompted as a **judge** (LLM-as-a-Judge), it scores its own candidates.
3. The best/worst pairs become preference data for **DPO** training.
4. Repeat with the improved model (**Iterative DPO**).

## Key results

Fine-tuning **Llama 2 70B** for three iterations gives a model that, per the abstract, outperforms many systems on the **AlpacaEval 2.0** leaderboard, including Claude 2, Gemini Pro and GPT-4 0613. The authors also report that the model's **reward-modelling** ability improves along with its instruction following.

## Limitations

From the paper: the results are preliminary. Only three iterations in one setting were run, and safety evaluation and the limits of iterative training are left open. They also observed **longer generations** over iterations. Length is known to correlate with judged quality, which needs deeper study.
