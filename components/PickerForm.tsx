"use client";

import { useMemo, useState } from "react";
import {
  recommend,
  type HardwareSpec,
  type Platform,
  type UseCase,
  type LicenseFilter
} from "@/lib/recommender";
import RecommendationCard from "./RecommendationCard";

const platforms: { value: Platform; label: string; hint: string }[] = [
  {
    value: "apple-silicon",
    label: "Apple Silicon",
    hint: "M1, M2, M3 or M4 Mac with unified memory"
  },
  {
    value: "nvidia-gpu",
    label: "NVIDIA GPU",
    hint: "RTX 3000/4000/5000 or workstation cards (CUDA)"
  },
  {
    value: "amd-gpu",
    label: "AMD GPU",
    hint: "Radeon RX 7000+ or Instinct (ROCm)"
  },
  {
    value: "intel-gpu",
    label: "Intel GPU",
    hint: "Intel Arc (A and B series, OpenVINO/Vulkan)"
  },
  {
    value: "cpu-only",
    label: "CPU only",
    hint: "No discrete GPU; runs on system RAM"
  }
];

const useCases: { value: UseCase; label: string; description: string }[] = [
  { value: "general", label: "General chat", description: "Writing, summaries, everyday assistance" },
  { value: "code", label: "Coding", description: "Code generation, refactor, debug" },
  { value: "longContext", label: "Long context", description: "Document analysis, RAG over large corpora" },
  { value: "math", label: "Math & reasoning", description: "Chained logic, calculation, proofs" }
];

export default function PickerForm() {
  const [platform, setPlatform] = useState<Platform>("apple-silicon");
  const [gpuVram, setGpuVram] = useState<number>(24);
  const [systemRam, setSystemRam] = useState<number>(32);
  const [unifiedMemory, setUnifiedMemory] = useState<number>(32);
  const [useCase, setUseCase] = useState<UseCase>("general");
  const [licenseFilter, setLicenseFilter] = useState<LicenseFilter>("any");

  const spec: HardwareSpec = useMemo(() => ({
    platform,
    gpuVramGb: gpuVram,
    systemRamGb: systemRam,
    unifiedMemoryGb: unifiedMemory,
    useCase,
    licenseFilter
  }), [platform, gpuVram, systemRam, unifiedMemory, useCase, licenseFilter]);

  const { available, recommendations, excluded } = useMemo(
    () => recommend(spec, 6),
    [spec]
  );

  return (
    <div className="grid lg:grid-cols-[360px,1fr] gap-8">
      {/* Form */}
      <section className="space-y-6">
        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Hardware platform
          </label>
          <div className="mt-2 space-y-1.5">
            {platforms.map((p) => (
              <label
                key={p.value}
                className={`block rounded-md border px-3 py-2 cursor-pointer transition ${
                  platform === p.value
                    ? "border-brand bg-brand/5"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                <input
                  type="radio"
                  name="platform"
                  value={p.value}
                  checked={platform === p.value}
                  onChange={() => setPlatform(p.value)}
                  className="sr-only"
                />
                <div className="font-medium text-sm">{p.label}</div>
                <div className="text-xs text-slate-500">{p.hint}</div>
              </label>
            ))}
          </div>
        </div>

        {platform === "apple-silicon" && (
          <div>
            <label
              htmlFor="unified"
              className="text-xs uppercase tracking-wide text-slate-500 font-semibold block mb-2"
            >
              Unified memory (GB)
            </label>
            <input
              id="unified"
              type="number"
              min={8}
              max={512}
              step={4}
              value={unifiedMemory}
              onChange={(e) => setUnifiedMemory(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-3 py-2 text-sm"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              Find it under Apple menu → About This Mac → Memory. Common
              configurations: 8, 16, 24, 32, 48, 64, 96, 128, 192 GB.
            </p>
          </div>
        )}

        {(platform === "nvidia-gpu" ||
          platform === "amd-gpu" ||
          platform === "intel-gpu") && (
          <div>
            <label
              htmlFor="vram"
              className="text-xs uppercase tracking-wide text-slate-500 font-semibold block mb-2"
            >
              GPU VRAM (GB)
            </label>
            <input
              id="vram"
              type="number"
              min={4}
              max={192}
              step={2}
              value={gpuVram}
              onChange={(e) => setGpuVram(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-3 py-2 text-sm"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              On Windows: Task Manager → Performance → GPU → Dedicated GPU
              memory. Common cards: RTX 4060 Ti 16 GB, RTX 4090 24 GB, RTX
              5090 32 GB, A6000 48 GB, H100 80 GB.
            </p>
          </div>
        )}

        {platform === "cpu-only" && (
          <div>
            <label
              htmlFor="ram"
              className="text-xs uppercase tracking-wide text-slate-500 font-semibold block mb-2"
            >
              System RAM (GB)
            </label>
            <input
              id="ram"
              type="number"
              min={8}
              max={1024}
              step={4}
              value={systemRam}
              onChange={(e) => setSystemRam(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-3 py-2 text-sm"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              Running AI on CPU is slow but works. Expect to wait a few
              seconds per sentence. On Windows, find your RAM in System
              Settings → About. On Linux, run &quot;free -h&quot; in a
              terminal.
            </p>
          </div>
        )}

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500 font-semibold block mb-2">
            What will you use it for?
          </label>
          <div className="space-y-1.5">
            {useCases.map((u) => (
              <label
                key={u.value}
                className={`block rounded-md border px-3 py-2 cursor-pointer transition ${
                  useCase === u.value
                    ? "border-brand bg-brand/5"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
                }`}
              >
                <input
                  type="radio"
                  name="useCase"
                  value={u.value}
                  checked={useCase === u.value}
                  onChange={() => setUseCase(u.value)}
                  className="sr-only"
                />
                <div className="font-medium text-sm">{u.label}</div>
                <div className="text-xs text-slate-500">{u.description}</div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500 font-semibold block mb-2">
            License preference
          </label>
          <select
            value={licenseFilter}
            onChange={(e) => setLicenseFilter(e.target.value as LicenseFilter)}
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-3 py-2 text-sm"
          >
            <option value="any">Any license (broadest catalog)</option>
            <option value="permissive-only">
              Permissive only (MIT, Apache 2.0)
            </option>
          </select>
        </div>

        <div className="rounded-md bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
            Available memory for the model:{" "}
            <span className="font-mono">{available.toFixed(1)} GB</span>
          </div>
          <p>
            Computed from your specs minus a reasonable system overhead.
            Models that exceed this with a 15% safety margin are excluded
            from the recommendations.
          </p>
        </div>
      </section>

      {/* Results */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Recommended models</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {recommendations.length === 0
                ? "No models fit your current memory budget. Increase memory or relax the license filter."
                : `${recommendations.length} options ranked by use-case fit and headroom.`}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <RecommendationCard
              key={rec.model.id}
              rec={rec}
              rank={idx + 1}
            />
          ))}
        </div>

        {excluded.length > 0 && (
          <details className="mt-8 rounded-md border border-slate-200 dark:border-slate-800 p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
              {excluded.length} model{excluded.length === 1 ? "" : "s"} excluded
            </summary>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {excluded.map(({ model, reason }) => (
                <li key={model.id}>
                  <span className="font-mono text-slate-500">
                    {model.family} {model.variant}
                  </span>{" "}
                  — {reason}
                </li>
              ))}
            </ul>
          </details>
        )}
      </section>
    </div>
  );
}
