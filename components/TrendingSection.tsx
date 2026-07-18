import { getTrendingModels } from "@/lib/hf-static";
import TrendingCard from "./TrendingCard";

type Props = {
  limit?: number;
  heading?: string;
  blurb?: string;
};

export default async function TrendingSection({
  limit = 8,
  heading = "Trending on Hugging Face",
  blurb = "Auto-curated from the Hugging Face Hub by a weighted mix of downloads, community likes and recency. Refreshes weekly via GitHub Action. License tier is a quick visual hint, not legal advice."
}: Props) {
  const { models, source, fetchedAt } = await getTrendingModels(limit);

  if (models.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold mb-2">{heading}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Trending data is temporarily unavailable. The next scheduled sync
          will repopulate it.
        </p>
      </section>
    );
  }

  const fetchedLabel = fetchedAt
    ? new Date(fetchedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between gap-6 mb-2">
        <div>
          <p className="text-xs font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-1">
            {source === "snapshot" && fetchedLabel
              ? `Snapshot · ${fetchedLabel}`
              : source === "live"
                ? "Live · fallback fetch"
                : "Live data"}
          </p>
          <h2 className="text-2xl font-bold">{heading}</h2>
        </div>
        <a
          href="https://huggingface.co/models?pipeline_tag=text-generation&sort=trending"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-dark dark:text-brand-light hover:underline whitespace-nowrap hidden sm:inline"
        >
          Browse HF directly →
        </a>
      </div>
      {blurb && (
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-3xl mb-6 leading-relaxed">
          {blurb}
        </p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((m) => (
          <TrendingCard key={m.id} model={m} />
        ))}
      </div>
    </section>
  );
}
