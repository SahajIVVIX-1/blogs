---
title: "Built this: SentinelProxy Suite"
categories: ["projects"]
tags: ["networking", "security", "nodejs"]
summary: "A locally hosted HTTPS proxy and DNS server with SQLite-backed blocklists, heuristic filtering, a live WebSocket dashboard and a firewall kill switch."
sources: 
  - title: "SahajIVVIX-1/SentinelProxy-Suite (GitHub)"
    url: "https://github.com/SahajIVVIX-1/SentinelProxy-Suite"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:54:16.836Z"
  - title: "First commit 5f30c3b"
    url: "https://github.com/SahajIVVIX-1/SentinelProxy-Suite/commit/5f30c3b"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:55:14.761Z"
highlights: ["Blocklists of millions of domains are loaded into an indexed SQLite database for fast lookups during proxying.", "If the proxy goes offline, a Windows Firewall kill switch drops outgoing traffic."]
draft: false
date: "2026-03-16"
---

On 16 March 2026 I started **SentinelProxy Suite**, a local network-control system written mainly in JavaScript (Node.js). The repo now has 30 commits.

## What it does

From the README:

- **HTTPS proxy** on port 5309 that intercepts and routes traffic, with certificate generation through `node-forge`.
- **DNS server** on port 53 that refuses known malicious domains before a connection is made.
- **Dynamic blocklists** loaded into an indexed **SQLite3** database for low-latency lookups.
- **Heuristic filters**: suspicious TLDs (e.g. `.zip`, `.mov`, `.top`, `.xyz`) and tracker substrings (`ads`, `track`, `pixel`, `analytics`).
- **Live dashboard** over HTTPS with Express and `socket.io`, streaming query logs in real time.
- **System hooks**: points the OS DNS and proxy at `127.0.0.1` while running, restores the settings on shutdown, and manages Windows Firewall rules, including a **kill switch** that blocks outgoing traffic if the proxy goes down.

## Stack

Node.js, `dns2`, `http-proxy`, `socket.io`, SQLite3 and `node-forge`. Windows is recommended because the kill switch uses `netsh` firewall commands.
