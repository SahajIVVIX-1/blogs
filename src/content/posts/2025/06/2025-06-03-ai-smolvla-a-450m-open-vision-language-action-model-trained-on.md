---
title: "SmolVLA: a 450M open vision-language-action model trained on community robot data"
categories: ["ai"]
tags: ["hugging-face", "lerobot", "smolvla", "robotics", "vla"]
summary: "Hugging Face introduces SmolVLA, a compact 450M open-source vision-language-action model for robotics that runs on consumer hardware and is pretrained only on community datasets tagged lerobot."
sources: 
  - title: "SmolVLA: Efficient Vision-Language-Action Model trained on Lerobot Community Data"
    url: "https://huggingface.co/blog/smolvla"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:39.748Z"
highlights: ["It outperforms much larger VLAs and baselines such as ACT on simulation (LIBERO, Meta-World) and real-world SO100 and SO101 tasks.", "Asynchronous inference gives 30% faster response and 2x task throughput."]
draft: false
date: "2025-06-03"
---

## What happened

On 3 June 2025 **Hugging Face** introduced **SmolVLA**, a compact (450M) open-source vision-language-action model for robotics. It was pretrained only on compatibly licensed, open-source community datasets shared under the **lerobot** tag.

## The technical details

From the Hugging Face post:

- **results:** SmolVLA-450M outperforms much larger VLAs and strong baselines such as **ACT** on **LIBERO** and **Meta-World** simulation and on real-world **SO100/SO101** tasks
- **asynchronous inference** decouples action prediction from execution, for **30% faster response and 2x task throughput**
- **architecture:** a vision-language model backbone plus an **action expert** built as a **flow matching transformer**
- efficiency choices: **visual token reduction**, **layer skipping** for faster inference, and **interleaved cross- and self-attention**
- runs on consumer hardware; base model at `lerobot/smolvla_base`

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["SmolVLA: a 450M open vision-language-action model trained on community robot data"]):::title
    n1(["Hugging Face: SmolVLA: a 450M open vision-language-action model trained on…"])
    n2["Hugging Face introduces SmolVLA, a compact 450M open-source vision-language-action model for robotics that…"]
    n8{"Available to me today?"}
    n9["Robotics models have lagged language models partly for lack of open data and affordable hardware."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: hugging-face · lerobot · smolvla · robotics"]
    subgraph G0["What it adds"]
        n3["results: SmolVLA-450M outperforms much larger VLAs and strong baselines such as ACT on LIBERO and Meta-World…"]
        n4["asynchronous inference decouples action prediction from execution, for 30% faster response and 2x task…"]
        n5["architecture: a vision-language model backbone plus an action expert built as a flow matching transformer"]
        n6["efficiency choices: visual token reduction, layer skipping for faster inference, and interleaved cross- and…"]
        n7["runs on consumer hardware; base model at lerobot/smolvla_base"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
    n7 --> n8
    n8 --> n9
    n9 --> n10
    n11 --> n2
    class n8 dec
    class n1,n10 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

Robotics models have lagged language models partly for lack of open data and affordable hardware. SmolVLA's pitch is that a small model trained on community-shared recordings can beat larger ones, so the dataset effort matters as much as the model.
