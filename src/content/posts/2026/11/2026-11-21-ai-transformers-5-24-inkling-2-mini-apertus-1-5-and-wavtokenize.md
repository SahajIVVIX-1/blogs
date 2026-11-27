---
title: "Transformers 5.24: Inkling 2 Mini, Apertus 1.5 and WavTokenizer"
categories: ["ai"]
tags: ["hugging-face", "transformers", "inkling", "apertus", "release"]
summary: "Transformers v5.24.0 adds Inkling 2 Mini with its looped layers, the multimodal Apertus 1.5 from the Swiss AI Initiative, and the WavTokenizer audio tokenizer."
sources: 
  - title: "Release v5.24.0"
    url: "https://github.com/huggingface/transformers/releases/tag/v5.24.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-11-27T02:52:53.968Z"
highlights: ["Inkling 2 Mini runs layers 6 to 17 three times with a learned message-passing mechanism, and routes each token to 8 of 128 experts.", "Apertus 1.5 takes text, images and audio as input through EMU3.5 and WavTokenizer tokenizers but outputs only text."]
draft: false
date: "2026-11-21"
---

## What happened

On 21 November 2026 **Hugging Face** released **Transformers v5.24.0**, adding three new model families.

## The technical details

From the release notes:

- **Inkling 2 Mini** (Thinking Machines Lab): 24 decoder layers instead of 48, **layers 6 to 17 looped three times**, a **learned message-passing mechanism** mixing the previous pass's residuals into each loop layer's attention and MoE inputs, hidden size 2304, **8 of 128 experts** per token; a research checkpoint supports a **variable number of loop passes** (fewer is faster, more improves quality); NVFP4 and MXFP8 layers are dequantized at load time
- **Apertus 1.5** (Swiss AI Initiative): accepts **text, images and audio** and generates text, using the **EMU3.5** vision tokenizer and **WavTokenizer** for audio; image and audio generation are not supported
- **WavTokenizer:** encodes **24 kHz mono audio into discrete tokens** with a single codebook, at 40 or 75 tokens per second depending on the checkpoint

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Transformers 5.24: Inkling 2 Mini, Apertus 1.5 and WavTokenizer"]):::title
    n1(["huggingface/transformers: Transformers 5.24: Inkling 2 Mini, Apertus 1.5 and WavTokenizer"])
    n2["Transformers v5.24.0 adds Inkling 2 Mini with its looped layers, the multimodal Apertus 1.5 from the Swiss AI…"]
    n5["Apertus 1.5 (Swiss AI Initiative): accepts text, images and audio and generates text, using the…"]
    n6{"Does upgrading need changes?"}
    n7["This release shows how quickly a new architecture reaches the standard library: Hugging Face's guide to Inkling 2…"]
    n8(["Upgrade with the checklist above"])
    n9["Topics: hugging-face · transformers · inkling · apertus"]
    subgraph G0["What changed"]
        n3["Inkling 2 Mini (Thinking Machines Lab): 24 decoder layers instead of 48, layers 6 to 17 looped three times, a…"]
        n4["WavTokenizer: encodes 24 kHz mono audio into discrete tokens with a single codebook, at 40 or 75 tokens per…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n3 --> n6
    n4 --> n6
    n6 -- "yes" --> n5
    n5 --> n7
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

This release shows how quickly a new architecture reaches the standard library: Hugging Face's guide to Inkling 2 Mini appeared on 20 November and its model code shipped the next day, with the looping mechanism documented. The variable-pass research checkpoint is a direct way to trade quality for speed at inference.
