---
title: "Diffusers 0.42: FLUX.3 Image Klein, Fibo 2.0, Kandinsky 6 video with audio and more"
categories: ["ai"]
tags: ["hugging-face", "diffusers", "flux-3", "kandinsky", "release"]
summary: "Diffusers 0.42.0 adds FLUX.3 Image Klein, Bria Fibo 2.0, Kandinsky 6 (video with synchronized audio), SANA-WM and RFD4-Proteina, and requires Python 3.11 or newer."
sources: 
  - title: "Diffusers 0.42.0: FLUX.3, Fibo 2.0, Kandinsky 6, and more"
    url: "https://github.com/huggingface/diffusers/releases/tag/v0.42.0"
    publisher: "GitHub · huggingface/diffusers"
    fetched_at: "2026-11-27T02:52:51.099Z"
highlights: ["FLUX.3 Image Klein supports text-to-image and editing with one or more reference images and an integrated prompt upsampler.", "Kandinsky 6 generates video with synchronized audio and has a separate video super-resolution pipeline."]
draft: false
date: "2026-10-23"
---

## What happened

On 23 October 2026 **Hugging Face** released **Diffusers 0.42.0**, bringing several new pipelines along with adapter support, hardware integrations and modular pipelines. Python 3.11 or newer is now required.

## The technical details

From the release notes:

- **FLUX.3 Image Klein** (Black Forest Labs): text-to-image and editing, base and step-distilled checkpoints through `ModularPipeline`, a built-in **prompt upsampler** that turns short requests into detailed captions (including layout with bounding boxes), and FP8r and NVFP4 checkpoints
- **Bria Fibo 2.0:** generation from **structured JSON captions** and editing with up to **five reference images**; the edit-turbo checkpoint runs in **four steps** without classifier-free guidance
- **Kandinsky 6:** **video with synchronized audio** from text or an image (`Kandinsky6TI2VAPipeline`), a separate `Kandinsky6SRPipeline` for **video super-resolution**, and `PiflowScheduler` for distilled models
- also **SANA-WM** and **RFD4-Proteina**, with LoRA loading and DreamBooth LoRA training examples for several models

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Diffusers 0.42: FLUX.3 Image Klein, Fibo 2.0, Kandinsky 6 video with audio and more"]):::title
    n1(["huggingface/diffusers: Diffusers 0.42: FLUX.3 Image Klein, Fibo 2.0, Kandinsky 6 video with…"])
    n2["Diffusers 0.42.0 adds FLUX.3 Image Klein, Bria Fibo 2.0, Kandinsky 6 (video with synchronized audio), SANA-WM…"]
    n7{"Does upgrading need changes?"}
    n8["A Diffusers release is where each new open image or video model gets a common interface, memory options and LoRA…"]
    n9(["Upgrade with the checklist above"])
    n10["Topics: hugging-face · diffusers · flux-3 · kandinsky"]
    subgraph G0["What changed"]
        n3["FLUX.3 Image Klein (Black Forest Labs): text-to-image and editing, base and step-distilled checkpoints through…"]
        n4["Bria Fibo 2.0: generation from structured JSON captions and editing with up to five reference images; the…"]
        n5["Kandinsky 6: video with synchronized audio from text or an image (Kandinsky6TI2VAPipeline), a separate…"]
        n6["also SANA-WM and RFD4-Proteina, with LoRA loading and DreamBooth LoRA training examples for several models"]
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

A Diffusers release is where each new open image or video model gets a common interface, memory options and LoRA training. The mix here, from structured-caption image models to audio-synchronized video, shows how broad the open generative stack has become.
