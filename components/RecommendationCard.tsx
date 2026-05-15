"use client";

import { useState } from "react";
import type { Recommendation } from "@/lib/recommender";

const speedLabel: Record<Recommendation["speedBucket"], string> = {
  fast: "Fast (~50+ tok/s on a single user)",
  moderate: "Moderate (~20–50 tok/s)",
  slow: "Slow (~5–20 tok/s, usable but patient)"
};

const speedTone: Record<Recommendation["speedBucket"], string> = {
  fast: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  moderate: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  slow: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
};

export default function RecommendationCard({
  rec,
  rank
}: {
  rec: Recommendation;
  rank: number;
}) {
  const [tab, setTab] = useState<"ollama" | "llamacpp">("ollama");

  return (
    <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-mono">#{rank}</span>
            <span aria-hidden>·</span>
            <span>{rec.model.origin}</span>
          </div>
          <h3 className="text-lg font-semibold">
            {rec.model.family} {rec.model.variant}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {rec.model.license.label} · {rec.model.releaseYear}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Score
          </div>
          <div className="font-semibold">{rec.score.toFixed(0)}/100</div>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">
            Quantization
          </dt>
          <dd className="font-mono">{rec.quant.name}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">
            Memory fit
          </dt>
          <dd>
            {rec.fitMemoryGb.toFixed(1)} GB
            <span className="text-slate-500 text-xs">
              {" "}/ {rec.availableMemoryGb.toFixed(1)} GB
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">
            Context
          </dt>
          <dd>
            {rec.model.contextWindow >= 1_000_000
              ? `${(rec.model.contextWindow / 1_000_000).toFixed(0)}M`
              : `${(rec.model.contextWindow / 1000).toFixed(0)}k`}{" "}
            tokens
          </dd>
        </div>
      </div>

      <div className="mt-3">
        <span
          className={`inline-block text-xs rounded-full px-2 py-0.5 ${speedTone[rec.speedBucket]}`}
        >
          {speedLabel[rec.speedBucket]}
        </span>
      </div>

      {rec.model.notes && (
        <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 italic">
          {rec.model.notes}
        </p>
      )}

      <div className="mt-5">
        <div className="flex gap-1 mb-2 text-xs">
          <button
            type="button"
            onClick={() => setTab("ollama")}
            className={`px-2.5 py-1 rounded ${
              tab === "ollama"
                ? "bg-brand text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            Ollama
          </button>
          <button
            type="button"
            onClick={() => setTab("llamacpp")}
            className={`px-2.5 py-1 rounded ${
              tab === "llamacpp"
                ? "bg-brand text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            llama.cpp
          </button>
        </div>
        <pre className="text-xs bg-slate-900 text-slate-100 rounded-md p-3 overflow-x-auto leading-relaxed">
          <code>
            {tab === "ollama" ? rec.ollamaCommand : rec.llamaCppCommand}
          </code>
        </pre>
      </div>
    </article>
  );
}
