---
title: "NLP · Bag of words and TF-IDF"
categories: ["study"]
tags: ["nlp", "features"]
summary: "Turning documents into vectors with CountVectorizer and TfidfVectorizer, n-grams, and finding similar documents with cosine similarity."
sources: 
  - title: "scikit-learn: Text feature extraction"
    url: "https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T18:45:20.781Z"
  - title: "sklearn.feature_extraction.text.TfidfVectorizer"
    url: "https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T18:45:21.193Z"
  - title: "sklearn.feature_extraction.text.TfidfTransformer (idf formula)"
    url: "https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfTransformer.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T19:07:18.638Z"
highlights: ["Bag of words counts tokens and ignores order; TF-IDF down-weights words that appear in many documents.", "Cosine similarity between TF-IDF vectors is a strong, cheap baseline for document search."]
phase: 9
step: 3
draft: false
date: "2025-05-20"
---

- **Bag of words (BoW)**: one column per vocabulary word, counting occurrences. Word order is lost.
- **TF-IDF**: tf × idf, where $\text{idf}(t) = \log\frac{1+N}{1+\text{df}(t)} + 1$ in scikit-learn's smoothed version. A word that appears in every document gets a low weight, and a distinctive word gets a high one.
- **n-grams** (`ngram_range=(1, 2)`) keep a little word order: "not good" ≠ "good".
- In a corpus this tiny, "the" appears in only half the documents, so its idf isn't low. Removing stop words keeps it from topping the list.
- **Cosine similarity** between TF-IDF vectors is a strong baseline for search and deduplication.

```python run
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

docs = [
    "the cat sat on the mat",
    "the dog sat on the log",
    "cats and dogs are great pets",
    "stock prices fell as markets closed",
]
cv = CountVectorizer()
X = cv.fit_transform(docs)
print(cv.get_feature_names_out()[:8], X.shape)
print(X.toarray()[0])

tf = TfidfVectorizer(ngram_range=(1, 2), stop_words="english")
T = tf.fit_transform(docs)
vocab = tf.get_feature_names_out()
row = T[0].toarray().ravel()
print("top TF-IDF terms in doc 0:", [vocab[i] for i in row.argsort()[::-1][:3]])

query = tf.transform(["a cat on a mat"])
print("similarity to each doc:", cosine_similarity(query, T).round(3))
```

Output:

```text
['and' 'are' 'as' 'cat' 'cats' 'closed' 'dog' 'dogs'] (4, 19)
[0 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 1 0 2]
top TF-IDF terms in doc 0: ['sat mat', 'mat', 'cat']
similarity to each doc: [[0.658 0.    0.    0.   ]]
```
