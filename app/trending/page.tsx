import type { Metadata } from "next";
import Link from "next/link";
import TrendingSection from "@/components/TrendingSection";

export const metadata: Metadata = {
  title: "Trending open models on Hugging Face — weekly snapshot",
  description:
    "What the open source AI community is actually downloading this week. A ranked snapshot from the Hugging Face Hub, scored by downloads, likes and recency, refreshed automatically every Monday."
};

export default function TrendingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-4">
        <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-3">
          Trending · Auto-refreshed weekly
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          What the community is actually downloading this week.
        </h1>
        <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
          A ranked snapshot from the Hugging Face Hub, scored by a weighted
          mix of downloads (40%), community likes (40%) and recency (20%).
          Different shape from our{" "}
          <Link href="/models" className="text-brand-dark dark:text-brand-light hover:underline">
            curated directory
          </Link>
          : these are the releases people are interacting with right now, not
          the editor&apos;s picks. The snapshot refreshes automatically every
          Monday via a GitHub Action, and every weekly snapshot is preserved
          in the site&apos;s git history.
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          License badges are a quick visual hint, not legal advice. Personal
          fine-tunes occasionally chart alongside official releases — the
          author name tells you which is which.
        </p>
      </header>

      <TrendingSection
        limit={16}
        heading="This week's top 16"
        blurb=""
      />

      <aside className="mt-10 rounded-xl border border-slate-200 dark:border-slate-800 p-5 text-sm leading-relaxed">
        <h2 className="font-semibold mb-2">How the ranking works</h2>
        <p className="text-slate-700 dark:text-slate-300">
          We pull the top text-generation models from the Hugging Face API,
          filter out low-signal entries, then score each model on a log scale
          normalised against the batch: downloads and likes weigh 40% each,
          and a recency bonus (up to 20%) rewards models updated in the last
          six months. The full scoring code is open source in the site&apos;s
          repository. If you think the weights are wrong, open an issue — the
          formula has changed before and will change again.
        </p>
      </aside>
    </div>
  );
}
