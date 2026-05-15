import Link from "next/link";
import type { TrendingModel } from "@/lib/hf-fetch";
import { formatNumber, formatLastUpdate } from "@/lib/hf-fetch";
import { tierBadgeClass, tierLabel } from "@/lib/license-map";

export default function TrendingCard({ model }: { model: TrendingModel }) {
  return (
    <article className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-5 hover:border-brand transition flex flex-col">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold truncate" title={model.name}>
            {model.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
            {model.author}
            {model.paramHint ? ` · ${model.paramHint}` : ""}
          </p>
        </div>
        <span
          className={`shrink-0 text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 ${tierBadgeClass(model.license.tier)}`}
        >
          {tierLabel(model.license.tier)}
        </span>
      </header>

      <p className="mt-2 text-xs text-slate-500 truncate" title={model.license.label}>
        {model.license.label}
      </p>

      {model.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {model.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">Downloads</dt>
          <dd className="font-medium">{formatNumber(model.downloads)}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">Likes</dt>
          <dd className="font-medium">{formatNumber(model.likes)}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-wide text-slate-500">Updated</dt>
          <dd className="font-medium">{formatLastUpdate(model.daysSinceUpdate)}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between text-sm">
        <Link
          href={model.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-dark dark:text-brand-light hover:underline"
        >
          View on HF →
        </Link>
        <span className="text-[10px] text-slate-400 font-mono">
          score {model.score.toFixed(2)}
        </span>
      </div>
    </article>
  );
}
