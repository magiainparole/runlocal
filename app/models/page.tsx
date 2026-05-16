import type { Metadata } from "next";
import ModelCard from "@/components/ModelCard";
import TrendingSection from "@/components/TrendingSection";
import { models } from "@/lib/models";

export const metadata: Metadata = {
  title: "Open source LLM directory",
  description:
    "A curated directory of open source large language models you can actually run, with license, context window, and notes on what each one is good for."
};

export default function ModelsPage() {
  const grouped = models.reduce<Record<string, typeof models>>((acc, m) => {
    (acc[m.origin] ||= []).push(m);
    return acc;
  }, {});

  const origins = Object.keys(grouped);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Model directory
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          AI models you can download and run yourself.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          Each entry below is a family of AI models you can download for
          free and run on your own computer. The label on each card tells
          you who made it, how big it is, what licence it comes under, and
          what it is good at. New to all this? The{" "}
          <a href="/glossary" className="text-brand-dark dark:text-brand-light hover:underline">
            glossary
          </a>
          {" "}defines every term used here, or try the{" "}
          <a href="/picker" className="text-brand-dark dark:text-brand-light hover:underline">
            picker
          </a>
          {" "}to find one that fits your machine.
        </p>
      </header>

      {origins.map((origin) => (
        <section key={origin} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
            <span>{origin}</span>
            <span className="text-xs text-slate-500 font-normal">
              {grouped[origin].length} model{grouped[origin].length > 1 ? "s" : ""}
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {grouped[origin].map((m) => (
              <ModelCard key={m.slug} model={m} />
            ))}
          </div>
        </section>
      ))}

      <aside className="mt-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-5 text-sm leading-relaxed">
        <p className="font-semibold mb-1.5 text-amber-900 dark:text-amber-200">
          A word on &ldquo;open&rdquo;
        </p>
        <p className="text-amber-900/90 dark:text-amber-100/90">
          Many models in this list are open-weight but not open-source in the
          OSI sense. License terms range from MIT and Apache 2.0 (genuinely
          permissive) to bespoke documents that restrict commercial use, training
          competitors, or large-platform deployment. If your legal team needs an
          OSI-approved license, the shortlist gets short fast.
        </p>
      </aside>

      {/* Auto-curated trending list from HF */}
      <TrendingSection
        limit={12}
        heading="What's trending right now on Hugging Face"
        blurb="Live snapshot from the Hugging Face Hub, ranked by a weighted mix of downloads, likes and recency. Different shape from the curated directory above: these are the releases the community is interacting with this week, not the editor's picks. Refreshes weekly."
      />
    </div>
  );
}
