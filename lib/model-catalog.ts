// Hardware-aware model catalog used by the RunLocal picker.
//
// Memory figures are practical lower-bound estimates for weights plus a
// moderate 8k-token KV/cache budget. The recommender applies an additional
// 15% safety margin before declaring that a model fits.

export type CatalogQuant = {
  name: string;
  qualityBucket: "low" | "medium" | "high" | "near-fp16";
  memoryGb: number;
};

export type CatalogModel = {
  id: string;
  family: string;
  variant: string;
  paramBillions: number;
  isMoE: boolean;
  origin: string;
  license: { tier: "permissive" | "open-weight" | "non-commercial"; label: string };
  contextWindow: number;
  releaseYear: number;
  useCase: {
    general: number;
    code: number;
    longContext: number;
    math: number;
  };
  ollamaTag?: string;
  hfPath?: string;
  quants: CatalogQuant[];
  notes?: string;
};

export const catalog: CatalogModel[] = [
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
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 1.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 1.2 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 1.6 }
    ],
    notes: "Edge-first option for very low-memory systems."
  },
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
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 3.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 3.5 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 5.0 }
    ]
  },
  {
    id: "phi-4-mini-3-8b",
    family: "Phi-4",
    variant: "Mini 3.8B",
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
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 3.5 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 4.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 5.5 }
    ],
    notes: "Verified Phi family entry. RunLocal does not list an unverified Phi-5 family."
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
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 5.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 6.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 8.5 }
    ]
  },
  {
    id: "qwen-3-5-9b",
    family: "Qwen 3.5",
    variant: "9B",
    paramBillions: 9,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 262_144,
    releaseYear: 2026,
    useCase: { general: 8, code: 8, longContext: 9, math: 8 },
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 6.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 7.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 10.0 }
    ],
    notes: "2026 multimodal Qwen generation. Check the current model card or a trusted GGUF publisher for the exact quantized filename."
  },
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
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 8.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 9.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 13.5 }
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
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 9.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 10.5 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 16.0 }
    ],
    notes: "Excellent reasoning per parameter, but a much shorter context window than newer Qwen and Gemma releases."
  },
  {
    id: "gemma-4-12b",
    family: "Gemma 4",
    variant: "12B",
    paramBillions: 12,
    isMoE: false,
    origin: "Google DeepMind · United States",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 256_000,
    releaseYear: 2026,
    useCase: { general: 8, code: 7, longContext: 9, math: 7 },
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 8.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 9.5 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 14.0 }
    ],
    notes: "Multimodal; this 12B variant also supports audio input. Use a current Gemma 4-compatible runtime."
  },
  {
    id: "qwen-3-6-27b",
    family: "Qwen 3.6",
    variant: "27B",
    paramBillions: 27,
    isMoE: false,
    origin: "Alibaba · China",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 262_144,
    releaseYear: 2026,
    useCase: { general: 9, code: 10, longContext: 9, math: 9 },
    hfPath: "Qwen/Qwen3.6-27B",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 17.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 20.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 29.0 }
    ],
    notes: "Current open-weight Qwen generation for local workstations. Multimodal and particularly strong for agentic coding. Qwen3.8-Max-Preview is newer but API-only and therefore intentionally excluded from this picker."
  },
  {
    id: "gemma-4-26b-a4b",
    family: "Gemma 4",
    variant: "26B-A4B MoE",
    paramBillions: 26,
    isMoE: true,
    origin: "Google DeepMind · United States",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 256_000,
    releaseYear: 2026,
    useCase: { general: 9, code: 7, longContext: 9, math: 8 },
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 17.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 20.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 29.0 }
    ],
    notes: "About 4B parameters are active per token, improving compute efficiency; the full 26B weights still need to fit in memory."
  },
  {
    id: "gemma-4-31b",
    family: "Gemma 4",
    variant: "31B dense",
    paramBillions: 31,
    isMoE: false,
    origin: "Google DeepMind · United States",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 256_000,
    releaseYear: 2026,
    useCase: { general: 9, code: 8, longContext: 9, math: 8 },
    hfPath: "google/gemma-4-31B",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 20.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 23.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 34.0 }
    ],
    notes: "Dense multimodal workstation model. Official BF16 weights are about 62.6 GB; quantized footprints here are practical estimates."
  },
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
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 42.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 50.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 74.0 }
    ]
  },
  {
    id: "mistral-small-4-119b-a6b",
    family: "Mistral Small 4",
    variant: "119B-A6B MoE",
    paramBillions: 119,
    isMoE: true,
    origin: "Mistral AI · France",
    license: { tier: "permissive", label: "Apache 2.0" },
    contextWindow: 256_000,
    releaseYear: 2026,
    useCase: { general: 9, code: 9, longContext: 9, math: 8 },
    hfPath: "mistralai/Mistral-Small-4-119B-2603",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 68.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 80.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 125.0 }
    ],
    notes: "Only ~6.5B parameters are active per token, so compute is relatively light for its capability; memory still follows the full 119B checkpoint."
  },
  {
    id: "mistral-medium-3-5-128b",
    family: "Mistral Medium 3.5",
    variant: "128B dense",
    paramBillions: 128,
    isMoE: false,
    origin: "Mistral AI · France",
    license: { tier: "open-weight", label: "Modified MIT / repository terms" },
    contextWindow: 256_000,
    releaseYear: 2026,
    useCase: { general: 9, code: 9, longContext: 9, math: 8 },
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 74.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 88.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 135.0 }
    ],
    notes: "Corrected from the old ~70B listing. Dense 128B means workstation-class memory even at 4-bit. Verify repository license terms before commercial deployment."
  },
  {
    id: "deepseek-v4-flash",
    family: "DeepSeek V4",
    variant: "Flash 284B-A13B MoE",
    paramBillions: 284,
    isMoE: true,
    origin: "DeepSeek · China",
    license: { tier: "permissive", label: "MIT" },
    contextWindow: 1_000_000,
    releaseYear: 2026,
    useCase: { general: 9, code: 10, longContext: 10, math: 10 },
    hfPath: "deepseek-ai/DeepSeek-V4-Flash",
    quants: [
      { name: "Q4_K_M", qualityBucket: "high", memoryGb: 155.0 },
      { name: "Q5_K_M", qualityBucket: "high", memoryGb: 185.0 },
      { name: "Q8_0", qualityBucket: "near-fp16", memoryGb: 300.0 }
    ],
    notes: "284B total / 13B active, 1M context. Compute per token is efficient for its class, but the full checkpoint is still far beyond ordinary consumer VRAM."
  }
];