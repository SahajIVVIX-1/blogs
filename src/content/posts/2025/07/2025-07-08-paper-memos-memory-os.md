---
title: "Paper summary: MemOS: A Memory OS for AI System"
categories: ["papers"]
tags: ["llm", "memory", "agents"]
summary: "MemOS proposes a memory operating system for LLMs that manages plaintext, activation-based and parameter-level memory as one schedulable resource, built around \"MemCube\" units with provenance and versioning."
sources: 
  - title: "MemOS: A Memory OS for AI System (arXiv:2507.03724)"
    url: "https://arxiv.org/abs/2507.03724"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:42.912Z"
  - title: "Hugging Face Daily Papers, 2025-07-08"
    url: "https://huggingface.co/papers?date=2025-07-08"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:04.330Z"
  - title: "MemOS: A Memory OS for AI System (arXiv HTML full text)"
    url: "https://arxiv.org/html/2507.03724"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:42.912Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/MemTensor/MemOS"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:47:42.912Z"
highlights: ["RAG adds knowledge as plain text but is stateless; MemOS treats memory as a managed resource with a lifecycle.", "A MemCube bundles memory content with metadata like provenance and version, and can move between memory types."]
papers: 
  - title: "MemOS: A Memory OS for AI System"
    authors: ["Zhiyu Li", "Chenyang Xi", "Chunyu Li", "Ding Chen", "Boyu Chen", "Shichao Song", "Simin Niu", "Hanyu Wang", "Jiawei Yang", "Chen Tang", "Qingchen Yu", "Jihao Zhao", "Yezhaohui Wang", "Peng Liu", "Zehao Lin", "Pengyuan Wang", "Jiahao Huo", "Tianyi Chen", "Kai Chen", "Kehang Li", "Zhen Tao", "Huayi Lai", "Hao Wu", "Bo Tang", "Zhengren Wang", "Zhaoxin Fan", "Ningyu Zhang", "Linfeng Zhang", "Junchi Yan", "Mingchuan Yang", "Tong Xu", "Wei Xu", "Huajun Chen", "Haofen Wang", "Hongkang Yang", "Wentao Zhang", "Zhi-Qin John Xu", "Siheng Chen", "Feiyu Xiong"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2507.03724"
    pdf: "https://arxiv.org/pdf/2507.03724v4"
    code: "https://github.com/MemTensor/MemOS"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2507.03724.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2507.03724\">Li et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : MemOS achieves state-of-the-art performance across all benchmarks. This figure provides a comprehensive summary of our evaluation results, illustrating the personalized response rate on PreFEval(0 turns and 10 …"
images: 
  - src: "images/2025/paper-2507.03724.webp"
    alt: "Figure from the paper \"MemOS: A Memory OS for AI System\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2507.03724\">Li et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : MemOS achieves state-of-the-art performance across all benchmarks. This figure provides a comprehensive summary of our evaluation results, illustrating the personalized response rate on PreFEval(0 turns and 10 …"
card: 
  task: "Systematic memory management for LLMs"
  method: "Memory OS unifying plaintext, activation and parameter memories; MemCube units that can be composed, migrated and fused"
  data: "Memory and personalisation benchmarks (Figure 1)"
  result: "State-of-the-art performance across the authors' memory benchmarks (Figure 1)"
draft: false
date: "2025-07-08"
---

## Problem

LLMs have no well-defined **memory management**. Knowledge sits in fixed parameters or short-lived context. That limits long-context reasoning, continual personalisation and knowledge consistency. According to the abstract, RAG helps, but it's a **stateless workaround** without lifecycle control.

## Method

**MemOS** is a **memory operating system** that treats memory as a manageable system resource. It unifies the representation, scheduling and evolution of three kinds of memory:

- **plaintext** memory (retrievable text)
- **activation-based** memory (e.g. cached states)
- **parameter-level** memory (knowledge in weights)

The basic unit is the **MemCube**: memory content plus metadata such as **provenance** and **versioning**. MemCubes can be composed, migrated and fused over time, moving knowledge between memory types.

## Key results

Figure 1 summarises the authors' evaluation, showing MemOS achieving state-of-the-art results across their memory benchmarks. The broader claim is a framework for controllability, plasticity and evolvability, as a basis for continual learning and personalisation.

## Limitations

There's no dedicated limitations section in the extracted text. Much of the paper is an architectural proposal, and the evaluation uses the authors' chosen benchmarks.
