---
title: "Structured Outputs: model responses that always match your JSON Schema"
categories: ["ai"]
tags: ["openai", "api", "structured-outputs", "json-schema", "function-calling"]
summary: "OpenAI adds Structured Outputs to the API so model outputs reliably adhere to developer-supplied JSON Schemas; the new gpt-4o-2024-08-06 scores 100% on a complex schema-following eval."
sources: 
  - title: "Introducing Structured Outputs in the API"
    url: "https://openai.com/index/introducing-structured-outputs-in-the-api"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:43.729Z"
highlights: ["gpt-4o-2024-08-06 with Structured Outputs scores 100% on OpenAI's complex JSON schema following eval, versus under 40% for gpt-4-0613.", "It goes beyond JSON mode, which guaranteed valid JSON but not a specific schema."]
draft: false
date: "2024-08-06"
---

## What happened

On 6 August 2024 **OpenAI** introduced **Structured Outputs** in the API: a feature that constrains models to produce output that exactly matches a JSON Schema supplied by the developer.

## The technical details

From the OpenAI post:

- builds on **JSON mode** from DevDay 2023, which improved validity but did not guarantee a particular schema
- works by **constraining the model** to the developer-supplied schema and by **training the models** to understand complicated schemas better
- on OpenAI's evals of complex JSON schema following, **gpt-4o-2024-08-06 with Structured Outputs scores 100%**, compared with **under 40%** for gpt-4-0613
- relevant to function calling, extracting structured data for data entry, and multi-step agentic workflows

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Structured Outputs: model responses that always match your JSON Schema"]):::title
    n1(["OpenAI: Structured Outputs: model responses that always match your JSON Schema"])
    n2["OpenAI adds Structured Outputs to the API so model outputs reliably adhere to developer-supplied JSON Schemas…"]
    n7{"Ready beyond the demo?"}
    n8["Before this, developers worked around unreliable formatting with open-source tooling, careful prompting and…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · api · structured-outputs · json-schema"]
    subgraph G0["What it adds"]
        n3["builds on JSON mode from DevDay 2023, which improved validity but did not guarantee a particular schema"]
        n4["works by constraining the model to the developer-supplied schema and by training the models to understand…"]
        n5["on OpenAI's evals of complex JSON schema following, gpt-4o-2024-08-06 with Structured Outputs scores 100%…"]
        n6["relevant to function calling, extracting structured data for data entry, and multi-step agentic workflows"]
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

Before this, developers worked around unreliable formatting with open-source tooling, careful prompting and repeated retries. Guaranteeing the schema turns an LLM call into something closer to a typed function, which is what agent workflows depend on.
