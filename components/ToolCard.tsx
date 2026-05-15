import type { ToolEntry } from "@/lib/tools";
import Link from "next/link";

export default function ToolCard({ tool }: { tool: ToolEntry }) {
  return (
    <article className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-5 flex flex-col hover:border-brand transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{tool.name}</h3>
          <p className="text-xs uppercase tracking-wide text-slate-500 mt-0.5">
            {tool.category}
          </p>
        </div>
        <span className="text-xs rounded-full bg-brand/10 text-brand-dark dark:text-brand-light px-2 py-0.5 whitespace-nowrap">
          {tool.license.split(" ")[0]}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {tool.bestFor}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {tool.platforms.map((p) => (
          <span
            key={p}
            className="text-xs rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5"
          >
            {p}
          </span>
        ))}
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            Strengths
          </h4>
          <ul className="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
            {tool.pros.slice(0, 3).map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
            Trade-offs
          </h4>
          <ul className="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
            {tool.cons.slice(0, 3).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <Link
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-dark dark:text-brand-light hover:underline"
        >
          Visit project →
        </Link>
        {tool.guideSlug ? (
          <Link
            href={`/guides/${tool.guideSlug}`}
            className="text-slate-500 hover:text-brand-dark dark:hover:text-brand-light"
          >
            Read install guide
          </Link>
        ) : (
          <span className="text-slate-400 text-xs">No guide yet</span>
        )}
      </div>
    </article>
  );
}
