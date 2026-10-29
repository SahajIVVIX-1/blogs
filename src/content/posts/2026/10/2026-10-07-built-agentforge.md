---
title: "Built this: AgentForge"
categories: ["projects"]
tags: ["agents", "crewai", "research-assistant"]
summary: "A three-agent CrewAI research assistant (Researcher, Analyst, Reviewer) whose sources come only from real tool activity and whose failures are reported as failures."
sources: 
  - title: "SahajIVVIX-1/AgentForge (GitHub)"
    url: "https://github.com/SahajIVVIX-1/AgentForge"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit 5eea635"
    url: "https://github.com/SahajIVVIX-1/AgentForge/commit/5eea635"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "AgentForge project site"
    url: "https://info.sahaj.si/AgentForge/"
    publisher: "Sahaj Saliya"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["Sources are recorded by the search and fetch tools from real network activity; the model never writes the source list.", "The README states plainly that it hasn't yet been run against a live LLM or deployed as a hosted app."]
draft: false
date: "2026-10-07"
---

On 7 October 2026 I started **AgentForge**. It has 67 commits so far, more than any of my other repos.

## How it works

From the README, three **CrewAI** agents run in sequence:

| agent | job |
|---|---|
| **Researcher** | searches the web and reads pages with real tools |
| **Analyst** | separates evidence from interpretation and lists gaps |
| **Reviewer** | audits the analysis, records failed checks, writes the final report |

The design rules the README spells out:

- **Sources are never written by the model.** The `sources` list is recorded by the `web_search` and `fetch_page` tools, and each source is labelled "page read" or "search result only".
- **Progress is real.** The timeline is driven by events from the running crew.
- **Failures are reported as failures.** Errors, timeouts and missing sources end the job as `failed` with a reason.
- **Async jobs**: `POST` returns `202` with a job id and the UI polls for results.
- `fetch_page` only accepts public http(s) addresses, as a basic SSRF guard.

Stack: React + Vite + TypeScript frontend, Python + FastAPI + CrewAI backend.

## Status, as the README states it

Built and tested, but **not yet run against a live LLM or deployed as a hosted app**. The screenshots come from a stubbed test backend.
