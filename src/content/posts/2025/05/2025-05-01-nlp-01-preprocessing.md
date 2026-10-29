---
title: "NLP · Text preprocessing"
categories: ["study"]
tags: ["nlp", "preprocessing"]
summary: "Cleaning raw text with regex and spaCy: normalisation, lowercasing, stop words, lemmatisation, and why modern models need much less of this."
sources: 
  - title: "spaCy 101: Everything you need to know"
    url: "https://spacy.io/usage/spacy-101"
    publisher: "Explosion"
    fetched_at: "2026-10-29T18:45:08.462Z"
  - title: "re: regular expression operations"
    url: "https://docs.python.org/3/library/re.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T18:45:09.659Z"
  - title: "Speech and Language Processing (Jurafsky & Martin), ch. 2"
    url: "https://web.stanford.edu/~jurafsky/slp3/"
    publisher: "Stanford University"
    fetched_at: "2026-10-29T18:45:11.990Z"
highlights: ["Classic NLP pipelines normalise text heavily; Transformer models mostly want raw text and their own tokenizer.", "Lemmatisation maps words to dictionary forms (ran → run); stemming just chops suffixes."]
phase: 9
step: 1
draft: false
date: "2025-05-01"
---

I started phase 9, NLP. Raw text is messy: HTML, URLs, odd spacing, inconsistent case. The classic preprocessing steps:

1. **Normalise**: Unicode, whitespace, lowercase.
2. **Remove noise**: URLs, HTML tags, and sometimes numbers and punctuation.
3. **Tokenise**: split into words (next post).
4. **Stop words**: drop very common words ("the", "is") for bag-of-words models.
5. **Lemmatise**: "ran"/"running" → "run". This is smarter than **stemming**, which just chops suffixes.

One caveat from Jurafsky and Martin and from Transformer docs: modern pretrained models want text close to raw, and they handle it with their own tokenizer. Heavy cleaning mostly helps classical models like TF-IDF.

```python run
import re
import spacy

raw = "  <p>I RAN 5km today!!! Running is great :) see https://example.com/run  </p> "
text = re.sub(r"<[^>]+>", " ", raw)            # strip HTML
text = re.sub(r"https?://\S+", " ", text)       # strip URLs
text = re.sub(r"\s+", " ", text).strip().lower()
print(repr(text))

nlp = spacy.load("en_core_web_sm")
doc = nlp(text)
print([(t.text, t.lemma_, t.is_stop) for t in doc if not t.is_punct][:8])
clean = [t.lemma_ for t in doc if not (t.is_stop or t.is_punct or t.like_num or t.is_space)]
print(clean)
```

Output:

```text
'i ran 5km today!!! running is great :) see'
[('i', 'I', True), ('ran', 'run', False), ('5', '5', False), ('km', 'km', False), ('today', 'today', False), ('running', 'running', False), ('is', 'be', True), ('great', 'great', False)]
['run', 'km', 'today', 'running', 'great']
```

Notice that "ran" became "run" but "running" stayed "running". In this lower-cased fragment the small model seems to treat "running" as a noun (as in "running is great"), and nouns keep their form. Lemmatisers depend on part-of-speech tags, so they inherit the tagger's mistakes.
