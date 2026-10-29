---
title: "Built this: Orbit-Wars strategy agent"
categories: ["projects"]
tags: ["agents", "game-ai", "kaggle"]
summary: "A rule-based strategy agent for the Kaggle Orbit Wars environment using predictive intercepts, economic target scoring, defensive \"fortress\" logic and sun-avoidance manoeuvres."
sources: 
  - title: "SahajIVVIX-1/Orbit-Wars (GitHub)"
    url: "https://github.com/SahajIVVIX-1/Orbit-Wars"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "Commit 6f89b5e"
    url: "https://github.com/SahajIVVIX-1/Orbit-Wars/commit/6f89b5e6c3effa7"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["Fleets aim at where a planet will be when they arrive, using its angular velocity, not where it is now.", "Targets are scored by production value, distance and garrison size."]
draft: false
date: "2026-04-24"
---

On 24 April 2026 I pushed **Orbit-Wars**, an agent for the **Kaggle Orbit Wars** environment, written in Python.

## How the agent plays

From the README:

- **Economic priority scoring**: rank target planets by production value, distance and current ship count, so high-production planets are taken first.
- **Threat assessment and "fortress" logic**: find planets that are about to fall and reinforce them from nearby bases.
- **Fleet sizing**: send a margin above what's needed (the README gives the formula 2.5x + 20) for a likely capture without stripping defences.
- **Sun bypass**: detect paths that would hit the sun and steer around it.
- **Predictive intercepts**: compute where an orbiting planet will be at the fleet's arrival time.
- It also accounts for fleet speed depending on fleet size, and chases high-value comets.

`test_agent.py` runs a match against a random opponent and saves an HTML replay.

## Where it connects

This is a hand-designed agent rather than a learned one, a useful contrast for my [agentic AI](/2026/08/03/agent-01-what-is-an-agent/) notes, where "agent" usually means an LLM choosing actions.
