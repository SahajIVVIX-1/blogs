---
title: "NLP · Sentiment analysis"
categories: ["study"]
tags: ["nlp", "sentiment", "classification"]
summary: "Classifying movie-review sentiment on the Rotten Tomatoes dataset: a TF-IDF plus logistic regression baseline, its most telling words, and where it fails."
sources: 
  - title: "Pang & Lee (2005), Seeing stars: Exploiting class relationships for sentiment categorization"
    url: "https://aclanthology.org/P05-1015/"
    publisher: "ACL Anthology"
    fetched_at: "2026-10-29T18:49:40.371Z"
  - title: "Hugging Face dataset: cornell-movie-review-data/rotten_tomatoes"
    url: "https://huggingface.co/datasets/cornell-movie-review-data/rotten_tomatoes"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T18:49:41.658Z"
  - title: "scikit-learn example: Classification of text documents using sparse features"
    url: "https://scikit-learn.org/stable/auto_examples/text/plot_document_classification_20newsgroups.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T19:07:21.090Z"
highlights: ["A linear model on TF-IDF features is a strong, explainable sentiment baseline.", "Negation and sarcasm are where bag-of-words sentiment models break."]
phase: 9
step: 9
draft: false
date: "2025-07-14"
---

**Sentiment analysis** labels text as positive or negative (sometimes neutral). The dataset is **Rotten Tomatoes** (Pang and Lee, 2005), loaded with Hugging Face `datasets`: 8,530 training and 1,066 test sentences, balanced between the two classes.

The baseline is TF-IDF with unigrams and bigrams, plus logistic regression. It's fast, and its weights are readable, so it shows exactly which words push a review positive or negative. Then I looked at what it gets wrong: negation and contrast ("not bad", "but") are the usual failure cases for bag-of-words models.

```python run
import numpy as np
from datasets import load_dataset
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score

ds = load_dataset("cornell-movie-review-data/rotten_tomatoes")
tr, te = ds["train"], ds["test"]
print("train", len(tr), "test", len(te), "| positive share", round(np.mean(tr["label"]), 3))

clf = make_pipeline(TfidfVectorizer(ngram_range=(1, 2), min_df=2, sublinear_tf=True), LogisticRegression(C=4, max_iter=2000))
clf.fit(tr["text"], tr["label"])
print("test accuracy:", round(accuracy_score(te["label"], clf.predict(te["text"])), 3))

vocab = clf[0].get_feature_names_out(); w = clf[1].coef_[0]
print("most negative:", list(vocab[np.argsort(w)[:6]]))
print("most positive:", list(vocab[np.argsort(w)[-6:]]))

tests = ["a wonderful, moving film", "not bad at all", "the plot was not good", "great actors, terrible movie"]
print({t: int(p) for t, p in zip(tests, clf.predict(tests))})
```

Output:

```text
train 8530 test 1066 | positive share 0.5
test accuracy: 0.79
most negative: ['too', 'bad', 'dull', 'boring', 'only', 'tv']
most positive: ['enjoyable', 'works', 'fun', 'performances', 'still', 'and']
{'a wonderful, moving film': 1, 'not bad at all': 0, 'the plot was not good': 0, 'great actors, terrible movie': 0}
```

(1 = positive, 0 = negative.) The baseline gets about 79% of test sentences right. Its mistakes on my four checks are the expected ones: "not bad at all" comes out negative because "bad" carries a strong negative weight, and "great actors, terrible movie" also comes out negative, which here happens to be right. Handling negation properly needs word order, which is where sequence models and Transformers come in.
