---
title: "Gemini Robotics 2: whole-body control, dexterity and multi-robot teamwork"
categories: ["ai"]
tags: ["google-deepmind", "gemini-robotics", "humanoid", "embodied-ai", "robotics"]
summary: "Google DeepMind introduces Gemini Robotics 2, an intelligence layer for robots that adds whole-body control, fine dexterity and collaboration between robots."
sources: 
  - title: "Gemini Robotics 2 brings whole body intelligence to robots"
    url: "https://deepmind.google/blog/gemini-robotics-2-brings-whole-body-intelligence-to-robots/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:24.028Z"
highlights: ["A humanoid can walk, crouch, stretch and manipulate objects to clean up a cluttered room, and can team up with other robots to finish faster.", "The post targets two limits of today's robots: pre-programmed narrow tasks and difficulty transferring skills between robot bodies."]
draft: false
date: "2026-07-28"
---

## What happened

On 28 July 2026 **Google DeepMind** introduced **Gemini Robotics 2**, described as the intelligence layer powering the next generation of adaptable robots, from feet to fingertips. It builds on the original Gemini Robotics, which showed Gemini's multimodal understanding driving real-world action.

## The technical details

From the Google DeepMind post:

- **whole-body control**: it enables a humanoid to walk, crouch, stretch and manipulate objects
- **advanced dexterity** and **multi-robot collaboration**, with robots teaming up to complete a job faster
- motivated by the fact that most robots are **pre-programmed or teleoperated** for narrow, repetitive sequences and cannot adapt to unpredictable environments
- also targets **skill transfer between different robot bodies**, which the post calls remarkably difficult
- the model reasons through every movement so a broad range of tasks can be completed safely

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini Robotics 2: whole-body control, dexterity and multi-robot teamwork"]):::title
    n1(["Google DeepMind: Gemini Robotics 2: whole-body control, dexterity and multi-robot…"])
    n2["Google DeepMind introduces Gemini Robotics 2, an intelligence layer for robots that adds whole-body control…"]
    n8{"Ready beyond the demo?"}
    n9["The problem statement is the useful part: the bottleneck in robotics is generality across tasks and bodies, not…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: google-deepmind · gemini-robotics · humanoid · embodied-ai"]
    subgraph G0["What it adds"]
        n3["whole-body control: it enables a humanoid to walk, crouch, stretch and manipulate objects"]
        n4["advanced dexterity and multi-robot collaboration, with robots teaming up to complete a job faster"]
        n5["motivated by the fact that most robots are pre-programmed or teleoperated for narrow, repetitive sequences and…"]
        n6["also targets skill transfer between different robot bodies, which the post calls remarkably difficult"]
        n7["the model reasons through every movement so a broad range of tasks can be completed safely"]
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

The problem statement is the useful part: the bottleneck in robotics is generality across tasks and bodies, not any single skill. A shared intelligence layer that transfers between embodiments is the approach being tested.
