---
title: "ChatGPT can now see, hear, and speak"
categories: ["ai"]
tags: ["openai", "chatgpt", "multimodal", "speech", "whisper"]
summary: "OpenAI begins rolling out voice conversations and image understanding in ChatGPT to Plus and Enterprise users."
sources: 
  - title: "ChatGPT can now see, hear, and speak"
    url: "https://openai.com/index/chatgpt-can-now-see-hear-and-speak"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:39.829Z"
highlights: ["Voice is powered by a new text-to-speech model that can generate human-like audio from text and a few seconds of sample speech.", "Spoken input is transcribed with Whisper, OpenAI's open-source speech recognition system."]
draft: false
date: "2023-09-25"
---

## What happened

On 25 September 2023 **OpenAI** announced voice and image capabilities for **ChatGPT**, rolling out to Plus and Enterprise users over the following two weeks. Users can hold a back-and-forth voice conversation, or show ChatGPT a picture of what they are talking about.

## The technical details

From the OpenAI post:

- **voice** on iOS and Android, opt-in under Settings → New Features, with a choice of five voices
- a new **text-to-speech model** that generates human-like audio from text plus a few seconds of sample speech; the voices were created with professional voice actors
- **Whisper** transcribes the user's spoken words to text
- **image input** on all platforms, for example a photo of a landmark, of a fridge and pantry, or a circled math problem
- the rollout to Plus and Enterprise users takes place over the next two weeks

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["ChatGPT can now see, hear, and speak"]):::title
    n1(["OpenAI: ChatGPT can now see, hear, and speak"])
    n2["OpenAI begins rolling out voice conversations and image understanding in ChatGPT to Plus and Enterprise users."]
    n8{"Available to me today?"}
    n9["Voice and vision turn ChatGPT from a text box into an interface you can talk to and point a camera at."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · chatgpt · multimodal · speech"]
    subgraph G0["What it adds"]
        n3["voice on iOS and Android, opt-in under Settings → New Features, with a choice of five voices"]
        n4["a new text-to-speech model that generates human-like audio from text plus a few seconds of sample speech; the…"]
        n5["image input on all platforms, for example a photo of a landmark, of a fridge and pantry, or a circled math…"]
    end
    subgraph G1["Access and limits"]
        n6[/"Whisper transcribes the user's spoken words to text"/]
        n7[/"the rollout to Plus and Enterprise users takes place over the next two weeks"/]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n8 -- "yes" --> n6
    n8 -- "yes" --> n7
    n6 --> n9
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

Voice and vision turn ChatGPT from a text box into an interface you can talk to and point a camera at. Notably, the voice feature is built as a pipeline of separate models (speech recognition, the language model, text-to-speech), which is the design GPT-4o later replaced with one end-to-end model.
