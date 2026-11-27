---
title: "Transformers 4.35: safetensors by default, Distil-Whisper, Fuyu"
categories: ["ai"]
tags: ["hugging-face", "transformers", "release"]
summary: "Hugging Face Transformers v4.35 made safetensors the default serialization format and added models including Distil-Whisper (6× faster than Whisper) and Adept's Fuyu-8B."
sources: 
  - title: "Transformers v4.35.0 release notes"
    url: "https://github.com/huggingface/transformers/releases/tag/v4.35.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:09:26.182Z"
  - title: "Gandhi, von Platen & Rush (2023), Distil-Whisper: Robust Knowledge Distillation via Large-Scale Pseudo Labelling"
    url: "https://arxiv.org/abs/2311.00430"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:09:26.906Z"
  - title: "Safetensors documentation"
    url: "https://huggingface.co/docs/safetensors/index"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:09:27.470Z"
highlights: ["Distil-Whisper keeps Whisper's whole encoder but only 2 decoder layers, making it 6× faster and 49% smaller.", "Fuyu treats image patches like text tokens in a plain decoder, with no separate image encoder model."]
draft: false
date: "2023-11-02"
---

## What happened

**Transformers v4.35.0** switched to **safetensors** as the default way to save models and added several new models.

## The technical details

From the release notes:

- **Distil-Whisper**: a distilled Whisper that's **6× faster**, **49% smaller**, and within **1% word error rate** on out-of-distribution data. It copies Whisper's entire **encoder**, keeping its robustness, but only **2 decoder layers**, which speeds up token-by-token generation. It's MIT licensed, with Flash Attention 2 and speculative decoding support.
- **Fuyu-8B** (from Adept): a **decoder-only** multimodal model. A linear layer embeds image patches, which are then treated **like text tokens**, with a special image-newline token marking row ends.
- Also added: Kosmos-2, SeamlessM4T and Owl-v2.

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Transformers 4.35: safetensors by default, Distil-Whisper, Fuyu"]):::title
    n1(["huggingface/transformers: Transformers 4.35: safetensors by default, Distil-Whisper, Fuyu"])
    n2["Hugging Face Transformers v4.35 made safetensors the default serialization format and added models including…"]
    n6{"Does upgrading need changes?"}
    n7["The safetensors docs describe the format as a safe alternative to pickle-based checkpoints, which can execute code…"]
    n8(["Upgrade with the checklist above"])
    n9["Topics: hugging-face · transformers · release"]
    subgraph G0["What changed"]
        n3["Distil-Whisper: a distilled Whisper that's 6× faster, 49% smaller, and within 1% word error rate on…"]
        n4["Fuyu-8B (from Adept): a decoder-only multimodal model. A linear layer embeds image patches, which are then…"]
        n5["Also added: Kosmos-2, SeamlessM4T and Owl-v2."]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n6
    n4 --> n6
    n5 --> n6
    n6 -- "no" --> n7
    n7 --> n8
    n9 --> n2
    class n6 dec
    class n1,n8 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

The safetensors docs describe the format as a safe alternative to pickle-based checkpoints, which can execute code when loaded. Making it the default is a security improvement for everyone downloading models. I ran into the same issue during my NLP phase, when a pickle-format model download was blocked and I switched to plain-text GloVe vectors.
