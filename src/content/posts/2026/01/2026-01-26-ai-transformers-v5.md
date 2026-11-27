---
title: "Transformers v5: the first major release in five years"
categories: ["ai"]
tags: ["hugging-face", "transformers", "release"]
summary: "Hugging Face released Transformers v5, the first major version in five years, removing long-deprecated APIs, refactoring weight loading and tokenization, and moving to weekly minor releases."
sources: 
  - title: "Transformers v5 release notes"
    url: "https://github.com/huggingface/transformers/releases/tag/v5.0.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:07:29.937Z"
  - title: "Transformers v5 migration guide"
    url: "https://github.com/huggingface/transformers/blob/main/MIGRATION_GUIDE_V5.md"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["1,200 commits since the last minor release, with a lot of long-overdue cleanup.", "From v5 on, minor versions ship weekly instead of every five weeks."]
draft: false
date: "2026-01-26"
---

## What happened

**Transformers v5.0.0** was released.

## The technical details

From the release notes:

- the **first major release in five years**, with **1,200 commits** since the last minor release
- removes many **long-due deprecations**, and refactors to simplify the APIs and internals
- significant API changes around **dynamic weight loading** and **tokenization**
- a continuously updated **migration guide**
- release cadence changes to **weekly minor releases** (v5.1, v5.2, …) so new models are available sooner

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Transformers v5: the first major release in five years"]):::title
    n1(["huggingface/transformers: Transformers v5: the first major release in five years"])
    n2["Hugging Face released Transformers v5, the first major version in five years, removing long-deprecated APIs…"]
    n8{"Does upgrading need changes?"}
    n9["I felt v5 directly in this blog's code."]
    n10(["Upgrade with the checklist above"])
    n11["Topics: hugging-face · transformers · release"]
    subgraph G0["What changed"]
        n3["the first major release in five years, with 1,200 commits since the last minor release"]
        n4["significant API changes around dynamic weight loading and tokenization"]
        n5["a continuously updated migration guide"]
    end
    subgraph G1["Upgrade notes"]
        n6[/"release cadence changes to weekly minor releases (v5.1, v5.2, …) so new models are available sooner"/]
        n7["removes many long-due deprecations, and refactors to simplify the APIs and internals"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n8 -- "yes" --> n7
    n7 --> n9
    n8 -- "no" --> n9
    n2 --> n6
    n6 --> n9
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

I felt v5 directly in this blog's code. `apply_chat_template(..., return_tensors="pt")` now returns a dict-like object instead of a tensor, so my tool-calling and prompting snippets had to use `return_dict=True` and `["input_ids"]`. Models now print a load report too. Major versions break things, and the migration guide is the first place to look.
