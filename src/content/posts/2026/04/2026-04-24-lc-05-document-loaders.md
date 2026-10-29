---
title: "LangChain · Document loaders"
categories: ["study"]
tags: ["langchain", "documents", "rag"]
summary: "The Document object (page_content + metadata), writing a small custom loader for text and CSV files, and why metadata matters later for filtering and citing sources."
sources: 
  - title: "LangChain reference: Document"
    url: "https://python.langchain.com/api_reference/core/documents/langchain_core.documents.base.Document.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain reference: BaseLoader"
    url: "https://python.langchain.com/api_reference/core/document_loaders/langchain_core.document_loaders.base.BaseLoader.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "langchain-community sunset notice (GitHub issue #674)"
    url: "https://github.com/langchain-ai/langchain-community/issues/674"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A loader's only job is to turn some source into Document objects: text plus metadata.", "Metadata like source file and row number is what lets a RAG answer cite where it came from."]
phase: 13
step: 5
draft: false
date: "2026-04-24"
---

Before retrieval comes **loading**. LangChain represents every piece of content as a **`Document`**:

- `page_content`: the text
- `metadata`: a dict (source path, page, row, URL, timestamps…)

LangChain has loaders for PDFs, web pages, Notion, CSV and many more. Many of them lived in `langchain-community`. When I installed it, the package warned that it's being sunset, with integrations moving to standalone packages (see the linked GitHub issue). So instead of depending on it, I wrote a tiny loader on the `BaseLoader` interface from `langchain-core`. A loader is just a class whose `lazy_load()` yields Documents.

```python run
import csv, tempfile
from pathlib import Path
from typing import Iterator
from langchain_core.document_loaders import BaseLoader
from langchain_core.documents import Document

class NotesLoader(BaseLoader):
    """Loads .txt files as one Document each and .csv files as one Document per row."""
    def __init__(self, folder):
        self.folder = Path(folder)
    def lazy_load(self) -> Iterator[Document]:
        for p in sorted(self.folder.iterdir()):
            if p.suffix == ".txt":
                yield Document(page_content=p.read_text(encoding="utf-8"), metadata={"source": p.name, "type": "text"})
            elif p.suffix == ".csv":
                with open(p, newline="", encoding="utf-8") as f:
                    for i, row in enumerate(csv.DictReader(f)):
                        content = "; ".join(f"{k}: {v}" for k, v in row.items())
                        yield Document(page_content=content, metadata={"source": p.name, "row": i, "type": "csv"})

d = Path(tempfile.mkdtemp())
(d / "attention.txt").write_text("Self-attention compares every token with every other token.", encoding="utf-8")
(d / "phases.csv").write_text("phase,topic\n11,Transformers\n12,LLMs\n13,LangChain\n", encoding="utf-8")

docs = NotesLoader(d).load()
for doc in docs:
    print(doc.metadata, "|", doc.page_content)
print("csv rows:", sum(1 for x in docs if x.metadata["type"] == "csv"))
```

Output:

```text
{'source': 'attention.txt', 'type': 'text'} | Self-attention compares every token with every other token.
{'source': 'phases.csv', 'row': 0, 'type': 'csv'} | phase: 11; topic: Transformers
{'source': 'phases.csv', 'row': 1, 'type': 'csv'} | phase: 12; topic: LLMs
{'source': 'phases.csv', 'row': 2, 'type': 'csv'} | phase: 13; topic: LangChain
csv rows: 3
```
