---
title: "Nano Banana Pro (Gemini 3 Pro Image) for developers"
categories: ["ai"]
tags: ["genai", "image-generation", "google"]
summary: "Google DeepMind released Nano Banana Pro, an image generation and editing model built on Gemini 3 Pro, with more accurate text rendering, Google Search grounding, fine camera and lighting control, and up to 4K output."
sources: 
  - title: "Build with Nano Banana Pro, our Gemini 3 Pro Image model"
    url: "https://deepmind.google/blog/build-with-nano-banana-pro-our-gemini-3-pro-image-model/"
    publisher: "Google DeepMind"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["It's built on Gemini 3 Pro, so it can use world knowledge, and even Google Search grounding, while generating images.", "Developers get explicit control over lighting, camera, focus and colour grading, at 2K or 4K."]
draft: false
date: "2025-11-20"
---

## What happened

Google DeepMind released **Nano Banana Pro (Gemini 3 Pro Image)** in paid preview through the Gemini API, Google AI Studio and Vertex AI. It follows Nano Banana (Gemini 2.5 Flash Image) from a few months earlier.

## The technical details

From the post:

- built on **Gemini 3 Pro**, for higher-fidelity generation and editing
- more accurate **text rendering** in images
- **grounding with Google Search**, to retrieve facts relevant to the prompt
- control over **lighting, camera, focus and colour grading**, and over composition
- **2K and 4K** output
- available to coding agents in **Google Antigravity** (e.g. generating UI mockups), and integrated by Adobe and Figma

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Nano Banana Pro (Gemini 3 Pro Image) for developers"]):::title
    n1(["Google DeepMind: Nano Banana Pro (Gemini 3 Pro Image) for developers"])
    n2["Google DeepMind released Nano Banana Pro, an image generation and editing model built on Gemini 3 Pro, with…"]
    n8[/"available to coding agents in Google Antigravity (e.g. generating UI mockups), and integrated by…"/]
    n9{"Ready beyond the demo?"}
    n10["Image models are converging with language models: the same backbone that reasons and searches also draws."]
    n11(["Track the rollout and follow-up releases"])
    n12["Topics: genai · image-generation · google"]
    subgraph G0["What it adds"]
        n3["built on Gemini 3 Pro, for higher-fidelity generation and editing"]
        n4["more accurate text rendering in images"]
        n5["grounding with Google Search, to retrieve facts relevant to the prompt"]
        n6["control over lighting, camera, focus and colour grading, and over composition"]
        n7["2K and 4K output"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n9
    n4 --> n9
    n5 --> n9
    n6 --> n9
    n7 --> n9
    n9 -- "yes" --> n8
    n8 --> n10
    n10 --> n11
    n12 --> n2
    class n9 dec
    class n1,n11 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

Image models are converging with language models: the same backbone that reasons and searches also draws. Text rendering, a classic weak point, is also what Qwen-Image targeted (August 2025 paper summary).
