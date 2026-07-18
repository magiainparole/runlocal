// Hardware-aware model catalog. Each entry pairs a model family with a list
// of quantization variants, their realistic memory footprint at moderate
// context (8k tokens), and reference install paths for Ollama and the GGUF
// uploaders most users pull from.
//
// Memory estimates include weights plus a base KV cache budget for an 8k
// context. The recommender adds a 15% safety margin on top, so the numbers
// here can be read as "lower bound for the model to run at all."

export type CatalogQuant = {
  name: string;        // "Q4_K_M", "Q5_K_M", "Q8_0"
  qualityBucket: "low" | "medium" | "high" | "near-fp16";
  memoryGb: number;    // estimated memory required at 8k context
};

export type CatalogModel = {
  id: string;          // stable slug used in URLs and recommendations
  family: string;      // "Llama 3.1", "Qwen 3.5", "DeepSeek V4"
  variant: string;     // "8B Instruct", "14B Chat", "32B Coder"
  paramBillions: number; // dense param count, or MoE total for memory
  isMoE: boolean;
  origin: string;
  license: { tier: "permissive" | "open-weight" | "non-commercial"; label: string };
  contextWindow: number; // training context, in tokens
  releaseYear: number;
  useCase: {
    general: number;     // 0..10
    code: number;
    longContext: number;
    math: number;
  };
  ollamaTag?: string;    // ready to `ollama pull`
  hfPath?: string;       // base HF path for GGUF uploaders, e.g. "bartowski/Qwen2.5-7B-Instruct-GGUF"
  quants: CatalogQuant[];
  notes?: string;        // shown as a caveat under the recommendation
};

export const catalog: CatalogModel[] = [
  // ── Small (1–4B) ───────────────────────────────────────────────────────
  {
    id: "llama-3-2-3b",
    family: "Llama 3.2",
    variant: "3B Instruct",
    paramBillions: 3,
    isMoE: false,
    origin: "Meta · United States",
    license: { tier: "open-weight", label: "Llama 3.2 Community License" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 6, code: 4, longContext: 5, math: 4 },
    ollamaTag: "llama3.2:3b-instruct",
    hfPath: "bartowski/Llama-3.2-3B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 3.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 3.5 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 5.0 }
    ]
  },
  {
    id: "phi-4-3b",
    family: "Phi-4",
    variant: "3.8B Mini",
    paramBillions: 3.8,
    isMoE: false,
    origin: "Microsoft · United States",
    license: { tier: "permissive", label: "MIT" },
    contextWindow: 128_000,
    releaseYear: 2025,
    useCase: { general: 7, code: 7, longContext: 5, math: 8 },
    ollamaTag: "phi4-mini:3.8b",
    hfPath: "bartowski/Phi-4-mini-instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 3.5 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 4.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 5.5 }
    ]
  },
  {
    id: "minicpm5-1b",
    family: "MiniCPM5",
    variant: "1B",
    paramBillions: 1,
    isMoE: false,
    origin: "OpenBMB · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2026,
    useCase: { general: 5, code: 4, longContext: 5, math: 4 },
    hfPath: "openbmb/MiniCPM5-1B",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 1.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 1.2 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 1.6 }
    ],
    notes: "Edge-first 1B from OpenBMB. Runs on phones and any laptop. The realistic choice when even Gemma 4 2B is too heavy."
  },
  {
    id: "gemma-4-2b",
    family: "Gemma 4",
    variant: "2B Instruct",
    paramBillions: 2,
    isMoE: false,
    origin: "Google · United States",
    license: { tier: "open-weight", label: "Gemma Terms of Use" },
    contextWindow: 128_000,
    releaseYear: 2026,
    useCase: { general: 6, code: 4, longContext: 6, math: 5 },
    ollamaTag: "gemma4:2b-instruct",
    hfPath: "bartowski/gemma-4-2b-it-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 1.8 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 2.1 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 2.8 }
    ],
    notes: "Tuned for on-device deployment. Runs comfortably on phones and lightweight laptops."
  },

  // ── Medium (7–9B) ──────────────────────────────────────────────────────
  {
    id: "llama-3-1-8b",
    family: "Llama 3.1",
    variant: "8B Instruct",
    paramBillions: 8,
    isMoE: false,
    origin: "Meta · United States",
    license: { tier: "open-weight", label: "Llama 3.1 Community License" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 7, code: 6, longContext: 7, math: 5 },
    ollamaTag: "llama3.1:8b-instruct",
    hfPath: "bartowski/Meta-Llama-3.1-8B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 5.5 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 6.5 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 9.5 }
    ]
  },
  {
    id: "qwen-2-5-7b",
    family: "Qwen 2.5",
    variant: "7B Instruct",
    paramBillions: 7,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 8, code: 7, longContext: 7, math: 7 },
    ollamaTag: "qwen2.5:7b-instruct",
    hfPath: "bartowski/Qwen2.5-7B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 5.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 6.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 8.5 }
    ]
  },
  {
    id: "qwen-2-5-coder-7b",
    family: "Qwen 2.5 Coder",
    variant: "7B",
    paramBillions: 7,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 5, code: 9, longContext: 7, math: 6 },
    ollamaTag: "qwen2.5-coder:7b",
    hfPath: "bartowski/Qwen2.5-Coder-7B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 5.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 6.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 8.5 }
    ],
    notes: "Specialised for code generation and completion. Worse than the base Qwen at general chat."
  },
  {
    id: "gemma-2-9b",
    family: "Gemma 2",
    variant: "9B Instruct",
    paramBillions: 9,
    isMoE: false,
    origin: "Google · United States",
    license: { tier: "open-weight", label: "Gemma Terms of Use" },
    contextWindow: 8_192,
    releaseYear: 2024,
    useCase: { general: 7, code: 5, longContext: 4, math: 6 },
    ollamaTag: "gemma2:9b-instruct",
    hfPath: "bartowski/gemma-2-9b-it-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 6.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 7.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 10.0 }
    ],
    notes: "Short context (8k). Pick something else if you need long-document workflows."
  },

  // ── Large (12–15B) ─────────────────────────────────────────────────────
  {
    id: "mistral-nemo-12b",
    family: "Mistral Nemo",
    variant: "12B Instruct",
    paramBillions: 12,
    isMoE: false,
    origin: "Mistral AI · France",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 8, code: 7, longContext: 8, math: 6 },
    ollamaTag: "mistral-nemo:12b-instruct",
    hfPath: "bartowski/Mistral-Nemo-Instruct-2407-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 8.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 9.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 13.5 }
    ]
  },
  {
    id: "phi-4-14b",
    family: "Phi-4",
    variant: "14B",
    paramBillions: 14,
    isMoE: false,
    origin: "Microsoft · United States",
    license: { tier: "permissive", label: "MIT" },
    contextWindow: 16_000,
    releaseYear: 2025,
    useCase: { general: 8, code: 8, longContext: 5, math: 9 },
    ollamaTag: "phi4:14b",
    hfPath: "bartowski/phi-4-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 9.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 10.5 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 16.0 }
    ],
    notes: "Strong reasoning per parameter, weak long-context (training ctx ~16k)."
  },
  {
    id: "qwen-2-5-14b",
    family: "Qwen 2.5",
    variant: "14B Instruct",
    paramBillions: 14,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 8, code: 8, longContext: 8, math: 7 },
    ollamaTag: "qwen2.5:14b-instruct",
    hfPath: "bartowski/Qwen2.5-14B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 9.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 10.5 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 16.0 }
    ]
  },

  // ── XL (27–32B) ────────────────────────────────────────────────────────
  {
    id: "gemma-2-27b",
    family: "Gemma 2",
    variant: "27B Instruct",
    paramBillions: 27,
    isMoE: false,
    origin: "Google · United States",
    license: { tier: "open-weight", label: "Gemma Terms of Use" },
    contextWindow: 8_192,
    releaseYear: 2024,
    useCase: { general: 8, code: 6, longContext: 4, math: 7 },
    ollamaTag: "gemma2:27b-instruct",
    hfPath: "bartowski/gemma-2-27b-it-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 17.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 20.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 29.0 }
    ],
    notes: "Strong general-purpose model, but capped at 8k context."
  },
  {
    id: "qwen-2-5-32b",
    family: "Qwen 2.5",
    variant: "32B Instruct",
    paramBillions: 32,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 9, code: 8, longContext: 8, math: 8 },
    ollamaTag: "qwen2.5:32b-instruct",
    hfPath: "bartowski/Qwen2.5-32B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 20.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 23.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 34.0 }
    ]
  },
  {
    id: "qwen-2-5-coder-32b",
    family: "Qwen 2.5 Coder",
    variant: "32B",
    paramBillions: 32,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 6, code: 10, longContext: 8, math: 7 },
    ollamaTag: "qwen2.5-coder:32b",
    hfPath: "bartowski/Qwen2.5-Coder-32B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 20.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 23.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 34.0 }
    ],
    notes: "Best open-weight coding model at this size. Use for code, not chat."
  },

  // ── XXL (70B+) ─────────────────────────────────────────────────────────
  {
    id: "llama-3-3-70b",
    family: "Llama 3.3",
    variant: "70B Instruct",
    paramBillions: 70,
    isMoE: false,
    origin: "Meta · United States",
    license: { tier: "open-weight", label: "Llama 3.3 Community License" },
    contextWindow: 128_000,
    releaseYear: 2024,
    useCase: { general: 9, code: 8, longContext: 9, math: 8 },
    ollamaTag: "llama3.3:70b-instruct",
    hfPath: "bartowski/Llama-3.3-70B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 42.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 50.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 74.0 }
    ]
  },

  // ── 2025–2026 releases ─────────────────────────────────────────────────
  {
    id: "qwen-3-5-14b",
    family: "Qwen 3.5",
    variant: "14B Instruct",
    paramBillions: 14,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2025,
    useCase: { general: 9, code: 8, longContext: 8, math: 8 },
    ollamaTag: "qwen3.5:14b-instruct",
    hfPath: "bartowski/Qwen3.5-14B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 9.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 10.5 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 16.0 }
    ]
  },
  {
    id: "qwen-3-5-32b",
    family: "Qwen 3.5",
    variant: "32B Instruct",
    paramBillions: 32,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 128_000,
    releaseYear: 2025,
    useCase: { general: 9, code: 9, longContext: 9, math: 9 },
    ollamaTag: "qwen3.5:32b-instruct",
    hfPath: "bartowski/Qwen3.5-32B-Instruct-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 20.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 23.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 34.0 }
    ]
  },
  {
    id: "gemma-4-9b",
    family: "Gemma 4",
    variant: "9B Instruct",
    paramBillions: 9,
    isMoE: false,
    origin: "Google · United States",
    license: { tier: "open-weight", label: "Gemma Terms of Use" },
    contextWindow: 128_000,
    releaseYear: 2026,
    useCase: { general: 8, code: 6, longContext: 7, math: 7 },
    ollamaTag: "gemma4:9b-instruct",
    hfPath: "bartowski/gemma-4-9b-it-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 6.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 7.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 10.0 }
    ],
    notes: "Strong Apple Silicon performance via MLX. Long context (128k) makes it the better choice over Gemma 2 9B."
  },
  {
    id: "gemma-4-27b",
    family: "Gemma 4",
    variant: "27B Instruct",
    paramBillions: 27,
    isMoE: false,
    origin: "Google · United States",
    license: { tier: "open-weight", label: "Gemma Terms of Use" },
    contextWindow: 128_000,
    releaseYear: 2026,
    useCase: { general: 9, code: 7, longContext: 8, math: 8 },
    ollamaTag: "gemma4:27b-instruct",
    hfPath: "bartowski/gemma-4-27b-it-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 17.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 20.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 29.0 }
    ],
    notes: "Excellent general-purpose model at workstation scale. 128k context, MLX-friendly on Apple Silicon."
  },
  {
    id: "mistral-medium-3-5",
    family: "Mistral Medium 3.5",
    variant: "~70B class",
    paramBillions: 70,
    isMoE: false,
    origin: "Mistral AI · France",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 256_000,
    releaseYear: 2026,
    useCase: { general: 9, code: 9, longContext: 9, math: 8 },
    ollamaTag: "mistral-medium:3.5",
    hfPath: "bartowski/Mistral-Medium-3.5-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 42.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 50.0 },
      { name: "Q8_0",   qualityBucket: "near-fp16", memoryGb: 74.0 }
    ],
    notes: "Strongest EU-origin open weight model in this catalog. Long context."
  },
  {
    id: "llama-4-scout",
    family: "Llama 4",
    variant: "Scout (109B MoE, 17B active)",
    paramBillions: 109,
    isMoE: true,
    origin: "Meta · United States",
    license: { tier: "open-weight", label: "Llama 4 Community License" },
    contextWindow: 10_000_000,
    releaseYear: 2025,
    useCase: { general: 9, code: 8, longContext: 10, math: 8 },
    ollamaTag: "llama4:scout",
    hfPath: "bartowski/Llama-4-Scout-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 65.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 78.0 }
    ],
    notes: "MoE: total parameters drive memory, active parameters drive speed. Up to 10M token context."
  },
  {
    id: "deepseek-v4-flash",
    family: "DeepSeek V4",
    variant: "Flash (MoE, distilled)",
    paramBillions: 90,
    isMoE: true,
    origin: "DeepSeek · China",
    license: { tier: "permissive", label: "MIT" },
    contextWindow: 1_000_000,
    releaseYear: 2025,
    useCase: { general: 9, code: 9, longContext: 9, math: 10 },
    ollamaTag: "deepseek-v4:flash",
    hfPath: "bartowski/DeepSeek-V4-Flash-GGUF",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high",      memoryGb: 54.0 },
      { name: "Q5_K_M", qualityBucket: "high",      memoryGb: 64.0 }
    ],
    notes: "Strong on math and code. MIT licensed (uncommon at this capability tier)."
  }
];
