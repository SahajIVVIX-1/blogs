---
title: "Code Llama: Llama 2 specialized for code, with Hugging Face integrations"
categories: ["ai"]
tags: ["meta", "code-llama", "code-generation", "llm", "hugging-face"]
summary: "Hugging Face announces ecosystem support for Code Llama, Meta's family of open-access code models (7B, 13B and 34B) built from Llama 2 and released under the same permissive community license."
sources: 
  - title: "Code Llama: Llama 2 learns to code"
    url: "https://huggingface.co/blog/codellama"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:35.643Z"
highlights: ["Base models start from Llama 2 and are trained on 500 billion tokens of code; a Python specialist adds 100 billion more.", "Available through the Hub, Text Generation Inference, Inference Endpoints and a VS Code extension."]
draft: false
date: "2023-08-25"
---

## What happened

On 25 August 2023 **Hugging Face** published its integration of **Code Llama**, a family of state-of-the-art, open-access versions of Llama 2 specialized on code tasks, released with the same permissive community license as Llama 2 and available for commercial use.

## The technical details

From the Hugging Face post:

- three sizes: **7B, 13B and 34B** parameters; base models initialized from Llama 2 and trained on **500 billion tokens of code**
- Meta fine-tuned two flavors: a **Python specialist** (100 billion additional tokens) and an **instruction-tuned** version that understands natural-language instructions
- state-of-the-art results reported for **Python, C++, Java, PHP, C#, TypeScript and Bash**
- Hugging Face release: **models on the Hub** with model cards and license, **Text Generation Inference** support, **Inference Endpoints** and a **VS Code extension**
- use cases named: code completion in IDEs, writing docstrings, creating unit tests

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Code Llama: Llama 2 specialized for code, with Hugging Face integrations"]):::title
    n1(["Hugging Face: Code Llama: Llama 2 specialized for code, with Hugging Face…"])
    n2["Hugging Face announces ecosystem support for Code Llama, Meta's family of open-access code models (7B, 13B and…"]
    n7[/"Hugging Face release: models on the Hub with model cards and license, Text Generation Inference…"/]
    n8{"Available to me today?"}
    n9["Specialized code models turned a general open model into a day-to-day developer tool, and the integration list…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: meta · code-llama · code-generation · llm"]
    subgraph G0["What it adds"]
        n3["three sizes: 7B, 13B and 34B parameters; base models initialized from Llama 2 and trained on 500 billion…"]
        n4["Meta fine-tuned two flavors: a Python specialist (100 billion additional tokens) and an instruction-tuned…"]
        n5["state-of-the-art results reported for Python, C++, Java, PHP, C#, TypeScript and Bash"]
        n6["use cases named: code completion in IDEs, writing docstrings, creating unit tests"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
    n8 -- "yes" --> n7
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

Specialized code models turned a general open model into a day-to-day developer tool, and the integration list shows what makes a release usable: weights, a serving stack and an editor plugin on the same day.
