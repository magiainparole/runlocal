import type { ModelEntry } from "@/lib/models";
import Link from "next/link";

export default function ModelCard({ model }: { model: ModelEntry }) {
  return (
    <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-5 flex flex-col hover:border-brand transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{model.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {model.author} · {model.origin}
          </p>
        </div>
        <span className="text-xs rounded-full bg-brand/10 text-brand-dark dark:text-brand-light px-2 py-0.5 whitespace-nowrap">
          {model.releaseYear}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
        <div>
          <dt className="text-slate-500 text-xs">License</dt>
          <dd className="font-medium">{model.license}</dd>
        </div>
        <div>
          <dt className="text-slate-500 text-xs">Context</dt>
          <dd className="font-medium">{model.contextWindow}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-slate-500 text-xs">Sizes</dt>
          <dd className="font-medium">{model.paramSizes.join(" · ")}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {model.bestFor.map((tag) => (
          <span
            key={tag}
            className="text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {model.notes}
      </p>

      <div className="mt-5 flex items-center justify-between text-sm">
        <Link
          href={model.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-dark dark:text-brand-light hover:underline"
        >
          Official site →
        </Link>
        <Link
          href="/guides/ollama"
          className="text-slate-500 hover:text-brand-dark dark:hover:text-brand-light"
        >
          Run it locally
        </Link>
      </div>
    </article>
  );
}
