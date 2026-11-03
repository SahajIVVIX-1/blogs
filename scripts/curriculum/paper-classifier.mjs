// scripts/curriculum/paper-classifier.mjs
// Analyzes research paper titles and abstracts to extract domain, methodology, mathematical formulations, and benchmarks.

export function classifyPaper(title, summary, github) {
  const text = `${title} ${summary}`.toLowerCase();

  let domain = 'llm';
  let tags = [];

  if (/\bagent|autonomous|tool use|function call|react\b|multi-agent|planning|web browsing agent/i.test(text)) {
    domain = 'agents';
    tags = ['agents', 'autonomous-systems', 'tool-use', 'decision-making'];
  } else if (/diffusion|flow matching|text-to-image|text-to-video|generative|image synthesis|video generation|latent diffusion|stable diffusion|musicldm/i.test(text)) {
    domain = 'generative';
    tags = ['generative-ai', 'diffusion-models', 'image-synthesis', 'multimodal'];
  } else if (/vision-language|multimodal|vlm|visual question|image-text|clip|flamingo|visual instruction/i.test(text)) {
    domain = 'multimodal';
    tags = ['multimodal', 'vlms', 'vision-language', 'deep-learning'];
  } else if (/segmentation|detection|gaussian splatting|nerf|point cloud|3d|object detection|yolo|optical flow|depth estimation|radiance field/i.test(text)) {
    domain = 'vision';
    tags = ['computer-vision', 'representation-learning', 'scene-understanding', 'deep-learning'];
  } else if (/quantization|pruning|distillation|kv cache|flashattention|speculative decoding|acceleration|efficiency|throughput|latency/i.test(text)) {
    domain = 'efficiency';
    tags = ['efficiency', 'quantization', 'inference-acceleration', 'llm-systems'];
  } else if (/state space|mamba|linear attention|recurrent|long context|transformer architecture|rotary|rope/i.test(text)) {
    domain = 'architecture';
    tags = ['transformers', 'model-architecture', 'state-space-models', 'attention-mechanisms'];
  } else if (/reasoning|mathematical|gsm8k|chain-of-thought|cot|math|code generation|humaneval|formal verification/i.test(text)) {
    domain = 'reasoning';
    tags = ['llm', 'reasoning', 'mathematical-reasoning', 'code-generation'];
  } else if (/rlhf|dpo|preference|alignment|safety|red teaming|hallucination|jailbreak/i.test(text)) {
    domain = 'alignment';
    tags = ['llm', 'alignment', 'rlhf-dpo', 'safety-guardrails'];
  } else {
    domain = 'llm';
    tags = ['llm', 'pretraining', 'instruction-tuning', 'nlp'];
  }

  if (github) tags.push('open-source-code');

  return { domain, tags };
}

