---
title: "Computer Vision · Object detection and YOLO"
categories: ["study"]
tags: ["computer-vision", "detection", "yolo"]
summary: "Detection as boxes plus classes, IoU, non-maximum suppression, YOLO's single-pass grid idea, and running a pretrained torchvision detector on a NASA photo."
sources: 
  - title: "Redmon et al. (2015), You Only Look Once: Unified, Real-Time Object Detection"
    url: "https://arxiv.org/abs/1506.02640"
    publisher: "arXiv"
    fetched_at: "2026-10-29T19:07:41.833Z"
  - title: "torchvision.ops.nms"
    url: "https://docs.pytorch.org/vision/stable/generated/torchvision.ops.nms.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T19:07:42.441Z"
  - title: "torchvision: Object detection models"
    url: "https://docs.pytorch.org/vision/stable/models.html#object-detection-instance-segmentation-and-person-keypoint-detection"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T19:07:42.836Z"
  - title: "Dive into Deep Learning: Object Detection and Bounding Boxes"
    url: "https://d2l.ai/chapter_computer-vision/bounding-box.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T19:07:44.396Z"
  - title: "scikit-image: skimage.data (astronaut sample image)"
    url: "https://scikit-image.org/docs/stable/api/skimage.data.html"
    publisher: "scikit-image"
    fetched_at: "2026-10-29T19:07:45.454Z"
highlights: ["IoU (intersection over union) measures how well two boxes overlap and underlies both training and evaluation.", "YOLO frames detection as one regression pass over a grid, which made real-time detection practical."]
phase: 10
step: 6
draft: false
date: "2025-09-08"
---

Classification says *what* is in an image. **Detection** says what *and where*: a set of boxes $(x_1, y_1, x_2, y_2)$, each with a class and a confidence score.

Building blocks:

- **IoU** = area of overlap / area of union. A prediction usually counts as correct if IoU ≥ 0.5 with a ground-truth box.
- **Non-maximum suppression (NMS)**: detectors fire many overlapping boxes. Keep the highest-scoring one and drop others that overlap it above an IoU threshold.
- **YOLO** (Redmon et al., 2015) splits the image into a grid, and each cell directly regresses boxes and class probabilities in **one forward pass**. That made real-time detection practical. Two-stage detectors (Faster R-CNN) propose regions first, then classify them.

I checked IoU and NMS on hand-made boxes. For a real detector, I used a pretrained torchvision model (FasterRCNN-MobileNetV3, trained on COCO) on the NASA astronaut portrait bundled with scikit-image (a public-domain photo). I used it because YOLO's official packages fetch weights from GitHub releases, which my machine's Python couldn't download. The ideas (boxes, scores, NMS) are the same.

```python run
import torch
from torchvision.ops import box_iou, nms
from torchvision.models.detection import fasterrcnn_mobilenet_v3_large_fpn, FasterRCNN_MobileNet_V3_Large_FPN_Weights
from skimage import data

a = torch.tensor([[0., 0., 10., 10.]]); b = torch.tensor([[5., 5., 15., 15.]])
print("IoU of two offset squares:", round(box_iou(a, b).item(), 4), "(= 25 / 175)")

boxes = torch.tensor([[10., 10., 50., 50.], [12., 12., 52., 52.], [100., 100., 140., 140.], [11., 9., 49., 51.]])
scores = torch.tensor([0.90, 0.75, 0.80, 0.60])
print("NMS keeps indices:", nms(boxes, scores, iou_threshold=0.5).tolist())

torch.set_num_threads(4)
weights = FasterRCNN_MobileNet_V3_Large_FPN_Weights.DEFAULT
model = fasterrcnn_mobilenet_v3_large_fpn(weights=weights).eval()
img = torch.from_numpy(data.astronaut()).permute(2, 0, 1)        # NASA photo, public domain
with torch.no_grad():
    out = model([weights.transforms()(img)])[0]
cats = weights.meta["categories"]
keep = out["scores"] > 0.5
print("detections above 0.5:", [(cats[l], round(s, 2)) for l, s in zip(out["labels"][keep].tolist(), out["scores"][keep].tolist())])
```

Output:

```text
IoU of two offset squares: 0.1429 (= 25 / 175)
NMS keeps indices: [0, 2]
detections above 0.5: [('person', 1.0)]
```
