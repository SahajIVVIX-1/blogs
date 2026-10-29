---
title: "Built this: Social media sentiment and trend analytics on MongoDB"
categories: ["projects"]
tags: ["big-data", "mongodb", "nlp", "spark"]
summary: "A Big Data Analytics course project: 2,944,814 real tweets in MongoDB, cleaned and enriched with sentiment, topics and keywords, served by FastAPI to a React dashboard, with Spark and sharding experiments."
sources: 
  - title: "SahajIVVIX-1/BDA-Analytics (GitHub)"
    url: "https://github.com/SahajIVVIX-1/BDA-Analytics"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit 1ec19c6"
    url: "https://github.com/SahajIVVIX-1/BDA-Analytics/commit/1ec19c6"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "FiveThirtyEight russian-troll-tweets dataset"
    url: "https://github.com/fivethirtyeight/russian-troll-tweets"
    publisher: "FiveThirtyEight"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["The README is upfront about the data: real tweets, but all from state-linked troll accounts, with synthetic engagement counts that are clearly flagged.", "Experiments measure ingestion, indexing, aggregation and NLP at 100K, 500K, 1M and 2.95M documents."]
draft: false
date: "2026-10-08"
---

On 8 October 2026 I committed my **Big Data Analytics** project: a full pipeline from raw tweets to a dashboard.

## What's in it

From the README:

- **Ingestion**: streams CSV/JSON/JSONL, validates and normalises, extracts hashtags, mentions, URLs and emoji, de-duplicates, and bulk-inserts in batches.
- **MongoDB**: a `posts` collection with `$jsonSchema` validation, **12 indexes**, and **5 rollup collections** built with aggregation pipelines.
- **NLP**: sentiment (TF-IDF + logistic regression, evaluated on TweetEval), topics (TF-IDF + NMF), per-post keywords.
- **Analytics**: sentiment, topics, trends, engagement, time patterns, geography, language and anomaly detection (rolling z-score, IQR, Isolation Forest).
- **API**: 26 FastAPI endpoints. **Dashboard**: React 19 + Vite + Tailwind + Recharts, 11 pages.
- **Big Data Lab**: a PySpark bronze/silver/gold Parquet data lake, and a 3-shard MongoDB cluster comparing hashed and ranged shard keys.
- **Tests**: 40 backend tests plus frontend unit tests.

## The data, as the README describes it

- **2,944,814** tweets from FiveThirtyEight's *russian-troll-tweets* (Linvill and Warren, Clemson University, CC BY 4.0), dated 2012 to 2018. They come from accounts linked to the Internet Research Agency, so the results describe that campaign, not ordinary users.
- **Engagement counts are synthetic** and flagged as such everywhere.
- **Sentiment** is a model prediction trained on TweetEval (test macro-F1 0.58) and was not evaluated on these tweets themselves.

## Where it connects

The sentiment and TF-IDF parts come straight from my [sentiment analysis](/2025/07/14/nlp-09-sentiment/) and [TF-IDF](/2025/05/20/nlp-03-bow-tfidf/) notes, now at a scale of millions of documents.
