---
title: "Gemini 4 Carbon: strongest model, ranked #1 on the Artificial Analysis index"
categories: ["ai"]
tags: ["google-deepmind", "gemini-4", "carbon", "cybersecurity", "benchmarks"]
summary: "Google DeepMind announces Gemini 4 Carbon, its strongest model with state-of-the-art cybersecurity and long-horizon capabilities, ranking first on the Artificial Analysis Intelligence Index v5.0 with a score of 59."
sources: 
  - title: "Gemini 4 Carbon: Our next frontier model"
    url: "https://deepmind.google/blog/gemini-4-carbon-our-next-frontier-model/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:31.135Z"
highlights: ["Cyber results reported: SEC-bench Pro 88.2% (finding vulnerabilities), ExploitGym 54.8% (exploitation) and CWE-bench 71.0% (patching).", "Released two weeks after Gemini 4 Argon, initially to a subset of cyber defenders."]
draft: false
date: "2026-10-28"
---

## What happened

On 28 October 2026 **Google DeepMind** announced **Gemini 4 Carbon**, its next frontier model, two weeks after Gemini 4 Argon. It is described as Google's strongest model, with state-of-the-art cybersecurity and long-horizon capabilities.

## The technical details

From the Google DeepMind post:

- ranks **#1 on v5.0 of the Artificial Analysis Intelligence Index with a score of 59**
- **SEC-bench Pro 88.2%** for finding vulnerabilities, **ExploitGym 54.8%** for exploitation and **CWE-bench 71.0%** for patching
- significant gains in coding and agentic tasks, and on internal benchmarks a strong uplift in **generating secure code**; in live coding environments, **reduced misalignment and fabrication rates**
- **deliberate rollout**: engaged in the U.S. government's voluntary pre-release testing, with access to a subset of cyber defenders that week and gradual expansion to more trusted groups

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini 4 Carbon: strongest model, ranked #1 on the Artificial Analysis index"]):::title
    n1(["Google DeepMind: Gemini 4 Carbon: strongest model, ranked #1 on the Artificial…"])
    n2["Google DeepMind announces Gemini 4 Carbon, its strongest model with state-of-the-art cybersecurity and…"]
    n6[/"deliberate rollout: engaged in the U.S. government's voluntary pre-release testing, with access to…"/]
    n7{"Available to me today?"}
    n8["The release pattern is the story: defenders first, then wider access, with the vendor naming its own cyber…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: google-deepmind · gemini-4 · carbon · cybersecurity"]
    subgraph G0["What it adds"]
        n3["ranks #1 on v5.0 of the Artificial Analysis Intelligence Index with a score of 59"]
        n4["SEC-bench Pro 88.2% for finding vulnerabilities, ExploitGym 54.8% for exploitation and CWE-bench 71.0% for…"]
        n5["significant gains in coding and agentic tasks, and on internal benchmarks a strong uplift in generating secure…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n7 -- "yes" --> n6
    n6 --> n8
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

The release pattern is the story: defenders first, then wider access, with the vendor naming its own cyber benchmarks and a government testing process. Two frontier models in two weeks also shows how short the gap between releases had become.
