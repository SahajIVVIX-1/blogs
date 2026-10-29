---
title: "Built this: Video Analyzer & PDF Scroller Suite"
categories: ["projects"]
tags: ["python", "pyqt", "opencv", "ffmpeg"]
summary: "Three PyQt desktop tools: an FFmpeg-based video duration reporter that writes styled Excel files, a PDF-to-scrolling-video generator, and a specialised generator that stitches lyric PDFs into one scrolling video."
sources: 
  - title: "SahajIVVIX-1/Video-Analyzer-Scroller (GitHub)"
    url: "https://github.com/SahajIVVIX-1/Video-Analyzer-Scroller"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit 9233aee"
    url: "https://github.com/SahajIVVIX-1/Video-Analyzer-Scroller/commit/9233aee"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["Durations come from the real media headers through FFmpeg, not estimates from file size.", "The scroller generators detect table borders and white gaps to stitch pages and pause at the right places."]
draft: false
date: "2026-04-06"
---

On 6 April 2026 I committed the first version of this suite (22 commits so far). It holds three independent tools, all Python with PyQt6.

## The three tools

According to the README:

1. **Video Folder Analyzer**: walks folders recursively, reads each video's duration with **FFmpeg**, and exports a formatted Excel report with `openpyxl`: grouped rows, frozen panes, borders and clickable paths. It runs as a GUI or from the command line.
2. **PDF Scroller Generator**: turns multi-page PDFs into smooth **1080p scrolling MP4s**, using Poppler/`pdf2image` and **OpenCV**. In tabular mode, it slices off the repeating header and pins it at the top while the rest scrolls. Header bounds are chosen in an interactive preview.
3. **Bhajan Video Generator**: merges several devotional-lyric PDFs into one scrolling video. It detects table borders to stitch pages exactly, finds white strips between blocks to **pause** for reading, auto-fills related PDFs by keyword, and prefers **GPU encoders** (NVENC, QSV, AMF), falling back to `libx264`.

## Where it connects

Much of the image work here, like finding horizontal lines and white bands in page images, is the OpenCV material from my [OpenCV essentials](/2025/08/08/cv-02-opencv/) notes applied to documents.
