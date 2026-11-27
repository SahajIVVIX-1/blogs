---
title: "WeatherNext 3: hourly, five-times-sharper forecasts from real-time satellite data"
categories: ["ai"]
tags: ["google-deepmind", "weathernext", "weather", "forecasting", "satellite"]
summary: "Google launches WeatherNext 3, its flagship AI weather model, adding real-time satellite data, hourly refreshes, higher resolution and precipitation forecasting, integrated across Search, Gemini, Maps and Cloud."
sources: 
  - title: "Introducing WeatherNext 3, our most advanced and accurate global weather AI model"
    url: "https://deepmind.google/blog/introducing-weathernext-3-our-most-advanced-and-accurate-global-weather-ai-model/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:26.043Z"
highlights: ["Hourly, high-resolution forecasts that the post says are five times sharper than before.", "It uses real-time satellite data to track fast-changing weather, rather than relying on traditional physics simulation alone."]
draft: false
date: "2026-09-03"
---

## What happened

On 3 September 2026 **Google DeepMind** introduced **WeatherNext 3**, its most advanced and accurate global weather AI model. The forecasts are integrated across Google Search, Gemini, Maps, Google Maps Platform and Google Cloud.

## The technical details

From the Google DeepMind post:

- **real-time satellite data** and **hourly refreshes** for fast-changing weather
- **higher resolution**, with forecasts the post describes as five times sharper than previous versions
- **precise precipitation forecasting**, with better rain and snow predictions
- **clean energy variables** for uses such as renewable energy and agriculture
- developers can bring the data into their own projects through **Google Cloud**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["WeatherNext 3: hourly, five-times-sharper forecasts from real-time satellite data"]):::title
    n1(["Google DeepMind: WeatherNext 3: hourly, five-times-sharper forecasts from real-time…"])
    n2["Google launches WeatherNext 3, its flagship AI weather model, adding real-time satellite data, hourly…"]
    n8{"Fits production use?"}
    n9["Because the model ingests live observations and refreshes every hour, its value is in the short term: planning…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: google-deepmind · weathernext · weather · forecasting"]
    subgraph G0["What it adds"]
        n3["real-time satellite data and hourly refreshes for fast-changing weather"]
        n4["higher resolution, with forecasts the post describes as five times sharper than previous versions"]
        n5["precise precipitation forecasting, with better rain and snow predictions"]
        n6["clean energy variables for uses such as renewable energy and agriculture"]
        n7["developers can bring the data into their own projects through Google Cloud"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
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

Because the model ingests live observations and refreshes every hour, its value is in the short term: planning around rain, snow or solar and wind output. The reach through Search, Maps and Gemini is what puts it in front of everyday users.
