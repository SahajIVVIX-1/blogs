---
title: "Paper summary: A.S.E: A Repository-Level Benchmark for Evaluating Security in AI-Generated Code"
categories: ["papers"]
tags: ["llm", "code", "security", "evaluation"]
summary: "A.S.E is a repository-level benchmark for the security of AI-generated code; it finds that current LLMs still struggle with secure coding, and that a bigger reasoning budget doesn't reliably help."
sources: 
  - title: "A.S.E: A Repository-Level Benchmark for Evaluating Security in AI-Generated Code (arXiv:2508.18106)"
    url: "https://arxiv.org/abs/2508.18106"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:32.744Z"
  - title: "Hugging Face Daily Papers, 2025-09-01"
    url: "https://huggingface.co/papers?date=2025-09-01"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:02.472Z"
  - title: "A.S.E: A Repository-Level Benchmark for Evaluating Security in AI-Generated Code (arXiv HTML full text)"
    url: "https://arxiv.org/html/2508.18106"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:32.744Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/Tencent/AICGSecEval"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:48:32.744Z"
highlights: ["Snippet-level benchmarks miss what happens when generated code has to fit into a real repository.", "A larger reasoning budget did not necessarily produce more secure code."]
papers: 
  - title: "A.S.E: A Repository-Level Benchmark for Evaluating Security in AI-Generated Code"
    authors: ["Keke Lian", "Bin Wang", "Lei Zhang", "Libo Chen", "Junjie Wang", "Ziming Zhao", "Yujiu Yang", "Miaoqian Lin", "Haotong Duan", "Haoran Zhao", "Shuang Liao", "Mingda Guo", "Jiazheng Quan", "Yilu Zhong", "Chenhao He", "Zichuan Chen", "Jie Wu", "Haoling Li", "Zhaoxuan Li", "Jiongchi Yu", "Hui Li", "Dong Zhang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2508.18106"
    pdf: "https://arxiv.org/pdf/2508.18106v3"
    code: "https://github.com/Tencent/AICGSecEval"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Evaluating the security of AI-generated code in realistic settings"
  method: "Repository-level benchmark mirroring real AI-assisted programming tasks"
  data: "A.S.E tasks built from real repositories"
  result: "Leading LLMs still struggle with secure coding; repository context is harder than snippets; more reasoning budget isn't reliably better, per the abstract"
draft: false
date: "2025-09-01"
---

## Problem

LLMs write more and more production code, but existing security benchmarks often test isolated snippets that don't reflect real AI-assisted programming.

## Method

**A.S.E** (AI Code Generation Security Evaluation) is a **repository-level** benchmark. Tasks mirror real programming work inside actual codebases, giving a more realistic test of whether generated code introduces security problems.

## Key results

From the abstract, evaluating leading LLMs:

- current LLMs **still struggle with secure coding**
- repository-level complexity is hard even for models that do well on snippet-level tasks
- a **larger reasoning budget does not necessarily** lead to better code

## Limitations

There's no dedicated limitations section in the extracted text. Results reflect the models available when the benchmark was built.
