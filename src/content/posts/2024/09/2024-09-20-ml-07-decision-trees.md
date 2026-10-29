---
title: "Machine Learning · Decision trees"
categories: ["study"]
tags: ["machine-learning", "trees"]
summary: "How a decision tree chooses splits using Gini impurity, why deep trees overfit, and reading the learned rules."
sources: 
  - title: "scikit-learn: Decision Trees"
    url: "https://scikit-learn.org/stable/modules/tree.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:01.115Z"
  - title: "sklearn.tree.export_text"
    url: "https://scikit-learn.org/stable/modules/generated/sklearn.tree.export_text.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:01.720Z"
  - title: "An Introduction to Statistical Learning (ch. 8)"
    url: "https://www.statlearning.com/"
    publisher: "James, Witten, Hastie, Tibshirani"
    fetched_at: "2026-10-29T16:25:59.308Z"
highlights: ["A tree greedily picks the split that most reduces impurity, then repeats on each side.", "An unrestricted tree can reach 100% training accuracy, which is a warning sign, not a success."]
phase: 7
step: 7
draft: false
date: "2024-09-20"
---

A decision tree asks a series of yes/no questions ("petal length ≤ 2.45?"). At each node it **greedily** picks the feature and threshold that most reduce **impurity**:

- **Gini** = 1 − Σ pₖ². It's 0 for a pure node.
- **Entropy** = −Σ pₖ log pₖ.

Trees need no feature scaling, handle non-linear boundaries, and are easy to read. But an unrestricted tree keeps splitting until every leaf is pure. That's 100% training accuracy and usually overfitting. `max_depth`, `min_samples_leaf` and pruning (`ccp_alpha`) hold it back.

```python run
from sklearn.datasets import load_iris, load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text

iris = load_iris()
small = DecisionTreeClassifier(max_depth=2, random_state=0).fit(iris.data, iris.target)
print(export_text(small, feature_names=list(iris.feature_names)))

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)
for depth in [None, 3]:
    t = DecisionTreeClassifier(max_depth=depth, random_state=0).fit(X_tr, y_tr)
    print(f"max_depth={depth}: leaves {t.get_n_leaves():>2}, train {t.score(X_tr, y_tr):.3f}, test {t.score(X_te, y_te):.3f}")
```

Output:

```text
|--- petal width (cm) <= 0.80
|   |--- class: 0
|--- petal width (cm) >  0.80
|   |--- petal width (cm) <= 1.75
|   |   |--- class: 1
|   |--- petal width (cm) >  1.75
|   |   |--- class: 2

max_depth=None: leaves 16, train 1.000, test 0.881
max_depth=3: leaves  8, train 0.977, test 0.937
```
