---
title: "Gemini Robotics-ER 1.6: embodied reasoning, now with instrument reading"
categories: ["ai"]
tags: ["google-deepmind", "gemini-robotics", "embodied-ai", "robotics", "vla"]
summary: "Google DeepMind introduces Gemini Robotics-ER 1.6, a reasoning-first model for robots with improved spatial and multi-view understanding and a new ability to read gauges and instruments."
sources: 
  - title: "Gemini Robotics-ER 1.6: Powering real-world robotics tasks through enhanced embodied reasoning"
    url: "https://deepmind.google/blog/gemini-robotics-er-1-6/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:17.353Z"
highlights: ["It acts as the high-level reasoning model for a robot and can call tools such as Google Search, VLAs or user-defined functions.", "Improvements over Gemini Robotics-ER 1.5 and Gemini 3.0 Flash in pointing, counting and success detection."]
draft: false
date: "2026-04-13"
---

## What happened

On 13 April 2026 **Google DeepMind** introduced **Gemini Robotics-ER 1.6**, a significant upgrade to its reasoning-first model for robots. The post argues that robots must do more than follow instructions: they need embodied reasoning to bridge digital intelligence and physical action, from navigating a facility to reading a pressure gauge.

## The technical details

From the Google DeepMind post:

- specializes in **visual and spatial understanding, task planning and success detection**
- serves as the **high-level reasoning model**, natively calling tools like **Google Search**, **vision-language-action (VLA) models** or any third-party function
- better than Gemini Robotics-ER 1.5 and Gemini 3.0 Flash at **pointing, counting and success detection**, with stronger **multi-view understanding**
- a new capability, **instrument reading**, lets robots read complex gauges and similar instruments

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini Robotics-ER 1.6: embodied reasoning, now with instrument reading"]):::title
    n1(["Google DeepMind: Gemini Robotics-ER 1.6: embodied reasoning, now with instrument…"])
    n2["Google DeepMind introduces Gemini Robotics-ER 1.6, a reasoning-first model for robots with improved spatial…"]
    n7{"Fits production use?"}
    n8["The architecture described is a planner on top: a reasoning model decides what to do and delegates execution to…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: google-deepmind · gemini-robotics · embodied-ai · robotics"]
    subgraph G0["What it adds"]
        n3["specializes in visual and spatial understanding, task planning and success detection"]
        n4["serves as the high-level reasoning model, natively calling tools like Google Search, vision-language-action…"]
        n5["better than Gemini Robotics-ER 1.5 and Gemini 3.0 Flash at pointing, counting and success detection, with…"]
        n6["a new capability, instrument reading, lets robots read complex gauges and similar instruments"]
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

The architecture described is a planner on top: a reasoning model decides what to do and delegates execution to low-level policies or tools. Success detection and instrument reading are the unglamorous skills that let a robot know whether a task actually finished.
