---
title: "LLMs · Quantisation"
categories: ["study"]
tags: ["llm", "quantisation", "inference"]
summary: "Post-training quantisation for inference: absmax and zero-point int8, per-tensor vs per-channel scales, how one outlier ruins a whole tensor's scale, and PyTorch dynamic quantisation on a small model."
sources: 
  - title: "Dettmers et al. (2022), LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
    url: "https://arxiv.org/abs/2208.07339"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "PyTorch: Quantization"
    url: "https://docs.pytorch.org/docs/stable/quantization.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Hugging Face: Quantization concepts"
    url: "https://huggingface.co/docs/optimum/concept_guides/quantization"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Quantisation maps floats to small integers with a scale (and sometimes a zero point), trading a little accuracy for memory and speed.", "One large outlier stretches the scale for everyone; per-channel or blockwise scales limit the damage."]
phase: 12
step: 11
draft: false
date: "2026-03-11"
---

**Quantisation** stores weights (and sometimes activations) as low-bit integers:

- **absmax (symmetric)**: q = round(x / s) with s = max|x| / 127
- **zero-point (asymmetric)**: adds an offset, for ranges not centred on 0, like ReLU outputs

Choices that matter:

- **granularity**: one scale per tensor, per output channel, or per block
- **outliers**: a single huge value forces a big scale, so all the small values collapse to a few integers. LLM.int8() (Dettmers et al., 2022) found such outlier features in large Transformers and handled them separately in higher precision.

```python run
import torch, torch.nn as nn, time
torch.manual_seed(0)

def absmax_int8(x):
    s = x.abs().max() / 127
    return (x / s).round().clamp(-127, 127) * s

def zeropoint_uint8(x):
    lo, hi = x.min(), x.max()
    s = (hi - lo) / 255; z = (-lo / s).round()
    return ((x / s + z).round().clamp(0, 255) - z) * s

w = torch.randn(256, 256) * 0.02
print(f"absmax int8 error   : {(absmax_int8(w) - w).abs().mean():.2e}")
relu_out = torch.relu(torch.randn(10000))
print(f"ReLU outputs, absmax {(absmax_int8(relu_out) - relu_out).abs().mean():.2e} vs zero-point {(zeropoint_uint8(relu_out) - relu_out).abs().mean():.2e}")

w_out = w.clone(); w_out[0, 0] = 2.0                     # one outlier
per_tensor = absmax_int8(w_out)
per_channel = torch.stack([absmax_int8(row) for row in w_out])
mask = torch.ones_like(w_out, dtype=torch.bool); mask[0] = False
print(f"with one outlier -> per-tensor error {(per_tensor - w_out)[mask].abs().mean():.2e} | per-channel {(per_channel - w_out)[mask].abs().mean():.2e}")

model = nn.Sequential(nn.Linear(1024, 4096), nn.ReLU(), nn.Linear(4096, 1024)).eval()
qmodel = torch.ao.quantization.quantize_dynamic(model, {nn.Linear}, dtype=torch.qint8)
x = torch.randn(64, 1024)
with torch.no_grad():
    rel = ((qmodel(x) - model(x)).norm() / model(x).norm()).item()
print(f"dynamic int8 model: relative output error {rel:.3%}")
```

Output:

```text
absmax int8 error   : 1.80e-04
ReLU outputs, absmax 4.15e-03 vs zero-point 2.08e-03
with one outlier -> per-tensor error 3.94e-03 | per-channel 1.19e-04
dynamic int8 model: relative output error 2.398%
```
