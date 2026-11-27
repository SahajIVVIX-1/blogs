---
title: "The Realtime API: low-latency speech-to-speech for developers"
categories: ["ai"]
tags: ["openai", "realtime-api", "voice", "speech-to-speech", "api"]
summary: "OpenAI opens a public beta of the Realtime API so paid developers can build low-latency, multimodal speech-to-speech experiences, and adds audio input and output to Chat Completions."
sources: 
  - title: "Introducing the Realtime API"
    url: "https://openai.com/index/introducing-the-realtime-api"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:47.227Z"
highlights: ["It supports natural speech-to-speech conversation with six preset voices, similar to ChatGPT's Advanced Voice Mode.", "The page records later updates: general availability on 28 August 2025."]
draft: false
date: "2024-10-01"
---

## What happened

On 1 October 2024 **OpenAI** introduced a public beta of the **Realtime API**, letting all paid developers add low-latency voice conversations to their apps. The same day it announced audio input and output in the **Chat Completions API** for use cases that do not need the lowest latency.

## The technical details

From the OpenAI post:

- **speech-to-speech** with the six preset voices already supported in the API
- audio in Chat Completions lets developers pass text or audio into **GPT-4o** and receive text, audio or both
- update, 17 October 2024: audio input and output available in Chat Completions
- update, 30 October 2024: five new voices and cached pricing of **$2.50 per 1M cached text input tokens** and **$20 per 1M cached audio input tokens**
- update, 3 February 2025: no limit on simultaneous sessions; update, **28 August 2025**: general availability announced

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["The Realtime API: low-latency speech-to-speech for developers"]):::title
    n1(["OpenAI: The Realtime API: low-latency speech-to-speech for developers"])
    n2["OpenAI opens a public beta of the Realtime API so paid developers can build low-latency, multimodal…"]
    n8{"Fits production use?"}
    n9["Developers building voice apps previously chained speech recognition, a language model and text-to-speech…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · realtime-api · voice · speech-to-speech"]
    subgraph G0["What it adds"]
        n3["speech-to-speech with the six preset voices already supported in the API"]
        n4["audio in Chat Completions lets developers pass text or audio into GPT-4o and receive text, audio or both"]
        n5["update, 3 February 2025: no limit on simultaneous sessions; update, 28 August 2025: general availability…"]
    end
    subgraph G1["Access and limits"]
        n6[/"update, 17 October 2024: audio input and output available in Chat Completions"/]
        n7[/"update, 30 October 2024: five new voices and cached pricing of $2.50 per 1M cached text input…"/]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n8 -- "yes" --> n6
    n8 -- "yes" --> n7
    n6 --> n9
    n7 --> n9
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

Developers building voice apps previously chained speech recognition, a language model and text-to-speech themselves. A single streaming API removes that glue and the latency it adds, which is what language-learning, education and customer-support voice apps need.
