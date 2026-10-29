---
title: "NLP · Text classification"
categories: ["study"]
tags: ["nlp", "classification"]
summary: "Multi-class topic classification on 20 Newsgroups, comparing Naive Bayes, logistic regression and a linear SVM, with a per-class report and the most confused pairs."
sources: 
  - title: "scikit-learn: The 20 newsgroups text dataset"
    url: "https://scikit-learn.org/stable/datasets/real_world.html#newsgroups-dataset"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T18:49:42.918Z"
  - title: "scikit-learn: Naive Bayes"
    url: "https://scikit-learn.org/stable/modules/naive_bayes.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T18:49:43.515Z"
  - title: "Joachims (1998), Text Categorization with Support Vector Machines"
    url: "https://doi.org/10.1007/BFb0026683"
    publisher: "Springer"
    fetched_at: "2026-10-29T18:49:50.525Z"
highlights: ["For topic classification with plenty of words, linear models on TF-IDF remain hard to beat cheaply.", "The confusion matrix shows which topics share vocabulary, not just how many errors there are."]
phase: 9
step: 10
draft: false
date: "2025-07-23"
---

The last NLP topic generalises sentiment to **many classes**: which of 20 newsgroups a post came from. I removed headers, footers and quotes, as the scikit-learn docs recommend, because otherwise the model learns from email signatures instead of content.

I compared three classic linear text classifiers on the same TF-IDF features:

- **Multinomial Naive Bayes**: counts-based, very fast, a strong baseline for text.
- **Logistic regression**.
- **Linear SVM**: Joachims (1998) showed SVMs work well for text categorisation.

The confusion matrix shows which topics get mixed up. Those are usually pairs with shared vocabulary.

```python run
import numpy as np
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix

rm = ("headers", "footers", "quotes")
train = fetch_20newsgroups(subset="train", remove=rm)
test = fetch_20newsgroups(subset="test", remove=rm)
vec = TfidfVectorizer(sublinear_tf=True, min_df=2, stop_words="english")
Xtr, Xte = vec.fit_transform(train.data), vec.transform(test.data)
print("train", Xtr.shape, "test", Xte.shape)

for name, clf in [("NaiveBayes", MultinomialNB(alpha=0.05)), ("LogReg", LogisticRegression(C=10, max_iter=3000)), ("LinearSVC", LinearSVC(C=0.5))]:
    pred = clf.fit(Xtr, train.target).predict(Xte)
    print(f"{name:>10}: accuracy {accuracy_score(test.target, pred):.3f} | macro-F1 {f1_score(test.target, pred, average='macro'):.3f}")

cm = confusion_matrix(test.target, pred)
np.fill_diagonal(cm, 0)
for idx in np.argsort(cm.ravel())[::-1][:3]:
    i, j = divmod(idx, 20)
    print(f"{cm[i, j]:>3} x  {train.target_names[i]}  ->  {train.target_names[j]}")
```

Output:

```text
train (11314, 39115) test (7532, 39115)
NaiveBayes: accuracy 0.699 | macro-F1 0.679
    LogReg: accuracy 0.692 | macro-F1 0.682
 LinearSVC: accuracy 0.698 | macro-F1 0.686
 85 x  talk.politics.misc  ->  talk.politics.guns
 69 x  talk.religion.misc  ->  soc.religion.christian
 55 x  alt.atheism  ->  soc.religion.christian
```

With that, the NLP phase is done. Computer vision is next, and then Transformers bring the two together.
