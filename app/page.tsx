import Link from "next/link";
import ModelCard from "@/components/ModelCard";
import ToolCard from "@/components/ToolCard";
import TrendingSection from "@/components/TrendingSection";
import { models } from "@/lib/models";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";
import { posts } from "@/lib/posts";

export default function Home() {
  const featuredModels = models.slice(0, 4);
  const featuredTools = tools.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-4">
            Independent · No tracking · Updated monthly
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-4xl">
            Open source AI, on hardware you actually own.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            A practical hub for running large language models locally. Curated
            models, the tools to serve them, hands-on install guides, and
            opinionated coverage of the ecosystem written for people who would
            rather understand than guess.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/picker"
              className="inline-flex items-center gap-2 rounded-md bg-ink text-white dark:bg-brand-light dark:text-ink px-4 py-2 font-medium hover:bg-brand-dark dark:hover:bg-brand transition"
            >
              Find a model for your hardware →
            </Link>
            <Link
              href="/guides/ollama"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium hover:border-brand transition"
            >
              Run your first model
            </Link>
            <Link
              href="/models"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium hover:border-brand transition"
            >
              Browse the directory
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      </section>

      {/* Featured models */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Models worth your disk space</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              A short list, opinionated. Full catalog in the directory.
            </p>
          </div>
          <Link
            href="/models"
            className="text-sm text-brand-dark dark:text-brand-light hover:underline"
          >
            See all models →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {featuredModels.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>

      {/* Trending on Hugging Face — live data, ISR cached */}
      <TrendingSection limit={8} />

      {/* Featured tools */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">The tools that actually run them</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Runtimes, GUIs and inference servers, with their real trade-offs.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm text-brand-dark dark:text-brand-light hover:underline"
          >
            See all tools →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {featuredTools.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Guides + Blog teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Install guides</h2>
          <ul className="space-y-3">
            {guides.map((g) => (
              <li
                key={g.slug}
                className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 hover:border-brand transition"
              >
                <Link href={`/guides/${g.slug}`} className="block">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{g.title}</h3>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {g.readingTime}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {g.excerpt}
                  </p>
                  <div className="mt-2 flex gap-2 text-xs text-slate-500">
                    <span>Level: {g.level}</span>
                    <span aria-hidden>·</span>
                    <span>Updated {g.updated}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Latest writing</h2>
          <ul className="space-y-3">
            {posts.map((p) => (
              <li
                key={p.slug}
                className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 hover:border-brand transition"
              >
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{p.title}</h3>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {p.readingTime}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {p.subtitle}
                  </p>
                  <div className="mt-2 flex gap-2 text-xs text-slate-500">
                    <span>{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <span aria-hidden>·</span>
                    <span>{p.tags.join(" · ")}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why RunLocal */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-brand/10 via-transparent to-transparent border border-brand/30 p-8 sm:p-10">
          <h2 className="text-2xl font-bold mb-4">Why local, why open</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold mb-2">Control over data</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Inputs and outputs stay on your hardware. Useful when your data
                is sensitive, regulated, or just yours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No vendor capture</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Open weights mean a model can outlive its publisher. You can
                still run a 2024 release in 2030 if your hardware does.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cost predictability</h3>
              <p className="text-slate-700 dark:text-slate-300">
                Inference cost is hardware amortization plus electricity. No
                per-token surprises on the invoice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
