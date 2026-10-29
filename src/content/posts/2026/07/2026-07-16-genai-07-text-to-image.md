---
title: "Generative AI · Text-to-image"
categories: ["study"]
tags: ["generative-ai", "diffusion", "guidance"]
summary: "How text steers a diffusion model: conditioning, classifier-free guidance, and the guidance scale trade-off, shown with a small conditional diffusion model on 2-D data where \"prompts\" are cluster labels."
sources: 
  - title: "Ho & Salimans (2022), Classifier-Free Diffusion Guidance"
    url: "https://arxiv.org/abs/2207.12598"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Ramesh et al. (2022), Hierarchical Text-Conditional Image Generation with CLIP Latents (DALL·E 2)"
    url: "https://arxiv.org/abs/2204.06125"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Hugging Face Diffusers: Text-to-image"
    url: "https://huggingface.co/docs/diffusers/using-diffusers/conditional_image_generation"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Classifier-free guidance runs the model with and without the prompt and pushes the result further toward the prompted direction.", "In my toy, a moderate scale was enough; pushing guidance much higher distorted the samples instead of improving them."]
phase: 14
step: 7
draft: false
date: "2026-07-16"
---

Text-to-image models are conditional diffusion models: the denoiser gets the prompt embedding (e.g. from CLIP's text encoder) through cross-attention. The trick that makes them follow prompts well is **classifier-free guidance** (Ho and Salimans, 2022):

1. During training, drop the condition some of the time (replace it with a "null" prompt), so one network learns both ε(x, c) and ε(x, ∅).
2. At sampling time, combine them: $\hat\epsilon = \epsilon(x,\varnothing) + w\,[\epsilon(x,c) - \epsilon(x,\varnothing)]$.
3. The **guidance scale w** > 1 exaggerates the direction the prompt points in. It's the "CFG scale" slider in image tools. w = 1 is plain conditional sampling, and w = 0 ignores the prompt.

Running a real text-to-image model is too slow on my CPU, so I tested the mechanism on my 2-D diffusion toy. The "prompt" is which of the 8 clusters to generate. I measured how the guidance scale changes prompt accuracy and spread.

```python run
import math, torch, torch.nn as nn
torch.manual_seed(0); torch.set_num_threads(4)

centres = torch.tensor([[math.cos(2 * math.pi * k / 8), math.sin(2 * math.pi * k / 8)] for k in range(8)]) * 2
T = 100; betas = torch.linspace(1e-4, 0.05, T); alphas = 1 - betas; abar = torch.cumprod(alphas, 0)
NULL = 8
emb = nn.Embedding(9, 16)
net = nn.Sequential(nn.Linear(2 + 1 + 16, 256), nn.SiLU(), nn.Linear(256, 256), nn.SiLU(), nn.Linear(256, 2))
eps_model = lambda x, t, c: net(torch.cat([x, (t.float() / T).unsqueeze(1), emb(c)], 1))
opt = torch.optim.Adam(list(net.parameters()) + list(emb.parameters()), 2e-3)

for step in range(5000):
    c = torch.randint(0, 8, (512,)); x0 = centres[c] + 0.15 * torch.randn(512, 2)
    c_in = torch.where(torch.rand(512) < 0.2, torch.full_like(c, NULL), c)        # 20% condition dropout
    t = torch.randint(0, T, (512,)); eps = torch.randn_like(x0)
    xt = abar[t].sqrt().unsqueeze(1) * x0 + (1 - abar[t]).sqrt().unsqueeze(1) * eps
    loss = ((eps_model(xt, t, c_in) - eps) ** 2).mean()
    opt.zero_grad(); loss.backward(); opt.step()

@torch.no_grad()
def generate(target, w, n=1000):
    x = torch.randn(n, 2); c = torch.full((n,), target); u = torch.full((n,), NULL)
    for t in reversed(range(T)):
        tt = torch.full((n,), t)
        e = eps_model(x, tt, u) + w * (eps_model(x, tt, c) - eps_model(x, tt, u))   # classifier-free guidance
        x = (x - betas[t] / (1 - abar[t]).sqrt() * e) / alphas[t].sqrt()
        if t > 0: x = x + betas[t].sqrt() * torch.randn_like(x)
    return x

for w in (0.0, 1.0, 3.0, 7.0):
    x = generate(target=2, w=w)
    hit = (torch.cdist(x, centres).argmin(1) == 2).float().mean()
    print(f"guidance w={w}: samples in the prompted cluster {hit:.0%} | spread around its centre {(x - centres[2]).norm(dim=1).mean():.3f}")
```

Output:

```text
guidance w=0.0: samples in the prompted cluster 15% | spread around its centre 2.472
guidance w=1.0: samples in the prompted cluster 100% | spread around its centre 0.186
guidance w=3.0: samples in the prompted cluster 100% | spread around its centre 0.278
guidance w=7.0: samples in the prompted cluster 100% | spread around its centre 0.753
```

With w = 0 (the prompt ignored), about 1 in 8 samples land in the requested cluster, which is chance for 8 clusters. With w = 1, all of them do, and they sit tightly around the centre. Raising w further didn't help here: at w = 7 the spread grew again, because the exaggerated direction overshoots and pushes samples past the cluster. It's a toy version of why very large guidance scales aren't used. The best setting is a balance, not "as high as possible".
