---
title: "Gemini Omni: create anything from any input, starting with video"
categories: ["ai"]
tags: ["google-deepmind", "gemini-omni", "video-generation", "multimodal"]
summary: "Google DeepMind introduces Gemini Omni, a model family that takes images, audio, video and text as input and generates video grounded in Gemini's world knowledge, editable through conversation."
sources: 
  - title: "Introducing Gemini Omni"
    url: "https://deepmind.google/blog/introducing-gemini-omni/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:20.496Z"
highlights: ["The first model, Gemini Omni Flash, rolls out to the Gemini app, Google Flow and YouTube Shorts.", "Video edits are made by conversation, with each instruction building on the last and characters staying consistent."]
draft: false
date: "2026-05-17"
---

## What happened

On 17 May 2026 **Google DeepMind** introduced **Gemini Omni**, described as the point where Gemini's ability to reason meets the ability to create. It follows Nano Banana, which brought Gemini to image generation and editing.

## The technical details

From the Google DeepMind post:

- **inputs:** combine images, audio, video and text; output is **high-quality video grounded in Gemini's real-world knowledge**
- **edit through conversation:** characters stay consistent, physics holds up and the scene remembers what came before
- first model: **Gemini Omni Flash**, in the **Gemini app, Google Flow and YouTube Shorts**
- output modalities such as **image and audio** are planned over time

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini Omni: create anything from any input, starting with video"]):::title
    n1(["Google DeepMind: Gemini Omni: create anything from any input, starting with video"])
    n2["Google DeepMind introduces Gemini Omni, a model family that takes images, audio, video and text as input and…"]
    n7{"Available to me today?"}
    n8["Treating video editing as a dialogue (each instruction building on the last) is the notable design choice, as it…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: google-deepmind · gemini-omni · video-generation · multimodal"]
    subgraph G0["What it adds"]
        n3["inputs: combine images, audio, video and text; output is high-quality video grounded in Gemini's real-world…"]
        n4["edit through conversation: characters stay consistent, physics holds up and the scene remembers what came before"]
        n5["first model: Gemini Omni Flash, in the Gemini app, Google Flow and YouTube Shorts"]
        n6["output modalities such as image and audio are planned over time"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n6 --> n7
    n7 --> n8
    n8 --> n9
    n10 --> n2
    class n7 dec
    class n1,n9 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

Treating video editing as a dialogue (each instruction building on the last) is the notable design choice, as it keeps a coherent scene across revisions. Positioning Omni as a family that will add other outputs suggests a single generator for all media rather than separate tools.
