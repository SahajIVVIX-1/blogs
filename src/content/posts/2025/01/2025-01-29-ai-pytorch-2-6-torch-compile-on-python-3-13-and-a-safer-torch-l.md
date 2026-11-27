---
title: "PyTorch 2.6: torch.compile on Python 3.13 and a safer torch.load default"
categories: ["ai"]
tags: ["pytorch", "python-3-13", "torch-load", "security", "release"]
summary: "PyTorch 2.6 enables torch.compile on Python 3.13, adds the torch.compiler.set_stance knob and FP16 support on x86 CPUs, and flips torch.load to weights_only=True by default."
sources: 
  - title: "PyTorch 2.6.0 Release"
    url: "https://github.com/pytorch/pytorch/releases/tag/v2.6.0"
    publisher: "GitHub · pytorch/pytorch"
    fetched_at: "2026-11-27T02:52:45.730Z"
highlights: ["The default of `weights_only` in `torch.load` changes, a backward-incompatible security measure.", "PyTorch stops publishing to the official Anaconda channel starting with this release."]
draft: false
date: "2025-01-29"
---

## What happened

On 29 January 2025 the **PyTorch** team released **2.6**, composed of 3,892 commits from 520 contributors since 2.5.

## The technical details

From the release notes:

- **PT2 improvements:** `torch.compile` works with **Python 3.13**; new `torch.compiler.set_stance` performance knob; several **AOTInductor** enhancements
- **FP16 support on x86 CPUs**
- **security:** the default value of `weights_only` in `torch.load` was changed, which breaks backward compatibility
- **distribution:** no more publishing on **Conda**; experimental Linux binaries use CXX11_ABI=1 and the Manylinux 2.28 build platform, with all Linux builds planned to follow in 2.7

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PyTorch 2.6: torch.compile on Python 3.13 and a safer torch.load default"]):::title
    n1(["pytorch/pytorch: PyTorch 2.6: torch.compile on Python 3.13 and a safer torch.load…"])
    n2["PyTorch 2.6 enables torch.compile on Python 3.13, adds the torch.compiler.set_stance knob and FP16 support on…"]
    n7{"Does upgrading need changes?"}
    n8["Loading a pickled checkpoint can execute code, so making safe loading the default protects anyone who downloads…"]
    n9(["Upgrade with the checklist above"])
    n10["Topics: pytorch · python-3-13 · torch-load · security"]
    subgraph G0["What changed"]
        n3["PT2 improvements: torch.compile works with Python 3.13; new torch.compiler.set_stance performance knob…"]
        n4["FP16 support on x86 CPUs"]
        n5["security: the default value of weights_only in torch.load was changed, which breaks backward compatibility"]
        n6["distribution: no more publishing on Conda; experimental Linux binaries use CXX11_ABI=1 and the Manylinux 2.28…"]
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
    n7 -- "no" --> n8
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

Loading a pickled checkpoint can execute code, so making safe loading the default protects anyone who downloads weights. The cost is that old code which loaded arbitrary objects must now opt in explicitly.
