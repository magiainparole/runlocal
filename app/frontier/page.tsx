import type { Metadata } from "next";
import Link from "next/link";
import { frontierModels } from "@/lib/frontier-models";

export const metadata: Metadata = {
  title: "Frontier open weights — the giants you (probably) can't run at home",
  description:
    "The largest open-weight AI models: Kimi K3, GLM-5.2, Llama 4 Maverick, DeepSeek V4 Pro. What running them actually takes, realistic access options, and the runnable siblings from each family."
};

export default function FrontierPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Frontier open weights
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          The giants: open models you (probably) can&apos;t run at home.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Some of the most important open-weight models are simply too large
          for consumer hardware. They still matter: they set the benchmark
          ceiling, their licenses shape the ecosystem, and their distilled
          siblings are often the best models you <em>can</em> run. Here is
          what each one would actually take — and the realistic way to use it
          anyway.
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Looking for something that runs on your machine? Try the{" "}
          <Link href="/picker" className="text-brand-dark dark:text-brand-light hover:underline">
            hardware picker
          </Link>{" "}
          or browse the{" "}
          <Link href="/models" className="text-brand-dark dark:text-brand-light hover:underline">
            curated directory
          </Link>
          .
        </p>
      </header>

      <div className="space-y-5">
        {frontierModels.map((m) => (
          <article
            key={m.slug}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-ink-soft p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{m.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {m.author} · {m.origin} · Released {m.released}
                </p>
              </div>
              <span
                className={`shrink-0 text-xs rounded-full px-3 py-1 ${
                  m.licenseTier === "permissive"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                }`}
              >
                {m.license}
              </span>
            </div>

            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              {m.headline}
            </p>

            <dl className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                  Size
                </dt>
                <dd className="font-medium">{m.totalParams}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                  Context
                </dt>
                <dd className="font-medium">{m.contextWindow}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                  What running it yourself actually takes
                </dt>
                <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {m.hardwareReality}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                  Realistic access
                </dt>
                <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {m.accessInstead}
                </dd>
              </div>
              {m.littleSibling && (
                <div className="sm:col-span-2">
                  <dt className="text-[10px] uppercase tracking-wide text-slate-500">
                    Runnable sibling
                  </dt>
                  <dd className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {m.littleSibling}
                  </dd>
                </div>
              )}
            </dl>

            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-brand-dark dark:text-brand-light hover:underline"
            >
              Official site →
            </a>
          </article>
        ))}
      </div>

      <aside className="mt-12 rounded-xl bg-brand/5 border border-brand/30 p-5 text-sm leading-relaxed">
        <p className="text-slate-700 dark:text-slate-300">
          This page is reviewed when major frontier releases land. If a giant
          is missing, chances are its weights are not public yet — we list
          models here once the open-weight commitment is concrete, not on
          announcement day.
        </p>
      </aside>
    </div>
  );
}
