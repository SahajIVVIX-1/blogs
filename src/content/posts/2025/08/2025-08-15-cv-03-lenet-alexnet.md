---
title: "Computer Vision · CNN architectures: LeNet to AlexNet"
categories: ["study"]
tags: ["computer-vision", "cnn", "architectures"]
summary: "The two early milestones, LeNet-5 for digits and AlexNet for ImageNet: their layers, parameter counts, and what changed between them."
sources: 
  - title: "LeCun et al. (1998), Gradient-Based Learning Applied to Document Recognition"
    url: "https://doi.org/10.1109/5.726791"
    publisher: "Proceedings of the IEEE"
    fetched_at: "2026-10-29T19:07:27.633Z"
  - title: "Krizhevsky, Sutskever & Hinton (2012), ImageNet Classification with Deep Convolutional Neural Networks"
    url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html"
    publisher: "NeurIPS"
    fetched_at: "2026-10-29T19:07:29.663Z"
  - title: "Dive into Deep Learning: Deep CNNs (AlexNet)"
    url: "https://d2l.ai/chapter_convolutional-modern/alexnet.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T19:07:31.227Z"
  - title: "torchvision.models.alexnet"
    url: "https://docs.pytorch.org/vision/stable/models/generated/torchvision.models.alexnet.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T19:07:31.993Z"
highlights: ["LeNet-5 already had the conv → pool → fully-connected pattern; AlexNet scaled it up with ReLU, dropout and GPUs.", "Most of AlexNet's parameters sit in the fully connected layers, not the convolutions."]
phase: 10
step: 3
draft: false
date: "2025-08-15"
---

**LeNet-5** (LeCun et al., 1998): for 32×32 digit images, conv(6) → pool → conv(16) → pool → FC 120 → FC 84 → 10. It has about 60k parameters and was used to read cheques.

**AlexNet** (Krizhevsky, Sutskever and Hinton, 2012) won ImageNet 2012 by a large margin with the same basic recipe, scaled up:

- 5 conv layers + 3 FC layers on 224×224 colour images
- **ReLU** instead of tanh, so training was much faster
- **Dropout** in the FC layers
- data augmentation, and training on two GPUs

I built LeNet-5 myself, loaded torchvision's AlexNet definition (no weights needed just to count parameters), and checked where the parameters live.

```python run
import torch, torch.nn as nn
from torchvision.models import alexnet

lenet = nn.Sequential(
    nn.Conv2d(1, 6, 5), nn.Tanh(), nn.AvgPool2d(2),
    nn.Conv2d(6, 16, 5), nn.Tanh(), nn.AvgPool2d(2),
    nn.Flatten(), nn.Linear(16 * 5 * 5, 120), nn.Tanh(), nn.Linear(120, 84), nn.Tanh(), nn.Linear(84, 10))
count = lambda m: sum(p.numel() for p in m.parameters())
print("LeNet-5 output", tuple(lenet(torch.zeros(1, 1, 32, 32)).shape), "| params", count(lenet))

a = alexnet(weights=None)
conv_p = count(a.features); fc_p = count(a.classifier)
print("AlexNet output", tuple(a(torch.zeros(1, 3, 224, 224)).shape), "| params", count(a))
print(f"  conv layers: {conv_p:,} ({conv_p / count(a):.0%}) | fully connected: {fc_p:,} ({fc_p / count(a):.0%})")
print("  feature map before classifier:", tuple(a.avgpool(a.features(torch.zeros(1, 3, 224, 224))).shape))
```

Output:

```text
LeNet-5 output (1, 10) | params 61706
AlexNet output (1, 1000) | params 61100840
  conv layers: 2,469,696 (4%) | fully connected: 58,631,144 (96%)
  feature map before classifier: (1, 256, 6, 6)
```
