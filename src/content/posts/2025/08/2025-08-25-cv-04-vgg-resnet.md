---
title: "Computer Vision · CNN architectures: VGG and ResNet"
categories: ["study"]
tags: ["computer-vision", "cnn", "architectures"]
summary: "VGG's stacks of 3×3 convolutions, why very deep plain networks got worse, and ResNet's skip connections, with a residual block checked in code."
sources: 
  - title: "Simonyan & Zisserman (2014), Very Deep Convolutional Networks for Large-Scale Image Recognition"
    url: "https://arxiv.org/abs/1409.1556"
    publisher: "arXiv"
    fetched_at: "2026-10-29T19:07:32.947Z"
  - title: "He et al. (2015), Deep Residual Learning for Image Recognition"
    url: "https://arxiv.org/abs/1512.03385"
    publisher: "arXiv"
    fetched_at: "2026-10-29T19:07:35.632Z"
  - title: "Dive into Deep Learning: Residual Networks (ResNet)"
    url: "https://d2l.ai/chapter_convolutional-modern/resnet.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T19:07:36.844Z"
highlights: ["Two stacked 3×3 convolutions see a 5×5 region with fewer parameters than one 5×5 convolution.", "A residual block learns F(x) and outputs F(x) + x, so an extra layer can at worst learn to do nothing."]
phase: 10
step: 4
draft: false
date: "2025-08-25"
---

**VGG** (Simonyan and Zisserman, 2014) used one simple rule: only **3×3** convolutions, stacked deep (16–19 layers). Two 3×3 layers cover the same 5×5 receptive field as one 5×5 layer, with fewer parameters and an extra non-linearity.

Going deeper should only help, but He et al. (2015) reported the opposite. Plain networks of 56 layers had *higher training error* than 20-layer ones. That's an optimisation problem, not overfitting.

**ResNet**'s fix is the **skip connection**. A block outputs $F(\mathbf{x}) + \mathbf{x}$. If the extra layers aren't useful, they can learn $F = 0$ and pass x through unchanged. The identity path also gives gradients a direct route backwards. ResNet won ILSVRC 2015.

```python run
import torch, torch.nn as nn
from torchvision.models import vgg16, resnet18, resnet50

count = lambda m: sum(p.numel() for p in m.parameters())
print("one 5x5 conv (64->64):", count(nn.Conv2d(64, 64, 5)), "| two 3x3 convs:", count(nn.Sequential(nn.Conv2d(64, 64, 3), nn.Conv2d(64, 64, 3))))

class Residual(nn.Module):
    def __init__(self, c):
        super().__init__()
        self.f = nn.Sequential(nn.Conv2d(c, c, 3, padding=1), nn.BatchNorm2d(c), nn.ReLU(), nn.Conv2d(c, c, 3, padding=1), nn.BatchNorm2d(c))
    def forward(self, x):
        return torch.relu(self.f(x) + x)

blk = Residual(16).eval()
for p in blk.f[-1].parameters():          # zero the last BN -> F(x) = 0
    nn.init.zeros_(p)
x = torch.relu(torch.randn(1, 16, 8, 8))
print("block with F(x)=0 is the identity:", torch.allclose(blk(x), x))

for name, m in [("VGG-16", vgg16()), ("ResNet-18", resnet18()), ("ResNet-50", resnet50())]:
    print(f"{name:>9}: {count(m) / 1e6:6.1f} M parameters")
```

Output:

```text
one 5x5 conv (64->64): 102464 | two 3x3 convs: 73856
block with F(x)=0 is the identity: True
   VGG-16:  138.4 M parameters
ResNet-18:   11.7 M parameters
ResNet-50:   25.6 M parameters
```

ResNet-50 is far deeper than VGG-16 but has about a fifth of its parameters. Most of VGG's parameters are in its large fully connected layers.
