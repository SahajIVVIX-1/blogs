---
title: "Machine Learning · Hierarchical clustering and DBSCAN"
categories: ["study"]
tags: ["machine-learning", "clustering", "unsupervised"]
summary: "Two alternatives to k-means: agglomerative clustering, which builds a tree of merges, and DBSCAN, which finds dense regions of any shape and labels noise."
sources: 
  - title: "scikit-learn: Hierarchical clustering"
    url: "https://scikit-learn.org/stable/modules/clustering.html#hierarchical-clustering"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:11.689Z"
  - title: "scikit-learn: DBSCAN"
    url: "https://scikit-learn.org/stable/modules/clustering.html#dbscan"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:12.277Z"
  - title: "Ester et al. (1996), A Density-Based Algorithm for Discovering Clusters"
    url: "https://cdn.aaai.org/KDD/1996/KDD96-037.pdf"
    publisher: "AAAI"
    fetched_at: "2026-10-29T16:26:13.331Z"
highlights: ["DBSCAN needs no k: it grows clusters from dense regions and marks isolated points as noise.", "k-means assumes round, similar-sized clusters; DBSCAN does not."]
phase: 7
step: 12
draft: false
date: "2024-11-01"
---

k-means assumes round clusters of similar size, and you have to give it k. Two alternatives:

**Agglomerative (hierarchical)**: start with every point as its own cluster and repeatedly merge the closest pair. The *linkage* decides what "closest" means (ward, average, single). The merge history forms a dendrogram that you can cut at any level.

**DBSCAN** (Ester et al., 1996): a point with at least `min_samples` neighbours within `eps` is a *core* point. Clusters grow outward from core points. Points that aren't reachable from any core point are labelled **noise (−1)**. There's no k, clusters can be any shape, and outliers are detected for free.

On two interleaved half-moons plus a few random outliers:

```python run
import numpy as np
from sklearn.datasets import make_moons
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.metrics import adjusted_rand_score

X, y = make_moons(n_samples=400, noise=0.06, random_state=0)
rng = np.random.default_rng(0)
X = np.vstack([X, rng.uniform(-1.5, 2.5, (10, 2))])
y = np.r_[y, [-1] * 10]

km = KMeans(2, n_init=10, random_state=0).fit_predict(X)
ag = AgglomerativeClustering(2, linkage="single").fit_predict(X)
db = DBSCAN(eps=0.2, min_samples=5).fit_predict(X)

core = y >= 0
for name, lab in [("k-means", km), ("agglomerative (single)", ag), ("DBSCAN", db)]:
    print(f"{name:>22}: ARI on moons {adjusted_rand_score(y[core], lab[core]):.3f}, clusters {len(set(lab) - {-1})}, noise points {(lab == -1).sum()}")
```

Output:

```text
               k-means: ARI on moons 0.274, clusters 2, noise points 0
agglomerative (single): ARI on moons 0.000, clusters 2, noise points 0
                DBSCAN: ARI on moons 1.000, clusters 2, noise points 8
```

DBSCAN recovers both moons and labels most of the added outliers as noise. k-means cuts the moons with a straight boundary. Single linkage does worst here: it merges through chains of nearby points, so here one far-away outlier became a "cluster" of its own and all 409 other points landed in the second one.
