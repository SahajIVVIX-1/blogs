---
title: "GPT-4o: one model across text, audio, vision and video"
categories: ["ai"]
tags: ["openai", "gpt-4o", "multimodal", "voice"]
summary: "OpenAI announces GPT-4o, a flagship model that accepts any mix of text, audio, image and video and responds in text, audio and image, with audio latency near human conversation speed."
sources: 
  - title: "Hello GPT-4o"
    url: "https://openai.com/index/hello-gpt-4o"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:41.666Z"
highlights: ["Audio responses arrive in as little as 232 ms, 320 ms on average.", "One model is trained end-to-end across text, vision and audio, replacing a three-model voice pipeline."]
draft: false
date: "2024-05-13"
---

## What happened

On 13 May 2024 **OpenAI** announced **GPT-4o** (the “o” is for “omni”), a step toward more natural human-computer interaction. It accepts text, audio, image and video as input and generates text, audio and image outputs.

## The technical details

From the OpenAI post:

- responds to audio in **232 ms at best and 320 ms on average**, similar to human response time in conversation
- matches **GPT-4 Turbo** on English text and code, with significant gains on non-English text, while being **much faster and 50% cheaper** in the API
- especially stronger at **vision and audio** understanding than earlier models
- before GPT-4o, Voice Mode used three models (transcribe, GPT-3.5 or GPT-4, text-to-speech) with average latencies of **2.8 s** (GPT-3.5) and **5.4 s** (GPT-4), and the middle model could not see tone, multiple speakers or background noise
- GPT-4o is a **single new model trained end-to-end** across text, vision and audio

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-4o: one model across text, audio, vision and video"]):::title
    n1(["OpenAI: GPT-4o: one model across text, audio, vision and video"])
    n2["OpenAI announces GPT-4o, a flagship model that accepts any mix of text, audio, image and video and responds in…"]
    n8{"Fits production use?"}
    n9["The latency numbers and the pipeline comparison explain the real change: removing the hand-offs between models…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · gpt-4o · multimodal · voice"]
    subgraph G0["What it adds"]
        n3["responds to audio in 232 ms at best and 320 ms on average, similar to human response time in conversation"]
        n4["matches GPT-4 Turbo on English text and code, with significant gains on non-English text, while being much…"]
        n5["especially stronger at vision and audio understanding than earlier models"]
        n6["before GPT-4o, Voice Mode used three models (transcribe, GPT-3.5 or GPT-4, text-to-speech) with average…"]
        n7["GPT-4o is a single new model trained end-to-end across text, vision and audio"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n4 --> n5
    n2 --> n6
    n6 --> n7
    n5 --> n8
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

The latency numbers and the pipeline comparison explain the real change: removing the hand-offs between models lets the model use information (tone, interruptions, laughter) that a text-only middle stage would discard.
