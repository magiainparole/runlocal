import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The state of open weights in May 2026",
  description:
    "Five frontier-class releases in the last thirty days, three of them from Chinese labs. A short tour of where the open weights field actually is."
};

export default function PostStateOfPlay() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Editorial · 9 min · May 12, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        The state of open weights in May 2026
      </h1>
      <p className="mt-2 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Five frontier-class open-weight releases shipped in the last thirty
        days. Three of them came from Chinese labs. A short tour of where the
        field actually is, written for readers who already know that
        &ldquo;open weights&rdquo; and &ldquo;open source&rdquo; do not mean
        the same thing.
      </p>

      <h2>The headline release schedule, with no decoration</h2>
      <p>
        In April and the first half of May 2026, the open weights calendar
        looked like this. Meta released Llama 4 with the Scout and Maverick
        variants, the first pushing context windows to a claimed 10 million
        tokens through a mixture-of-experts architecture. Alibaba released
        Qwen 3.5 across the usual ladder of sizes, with the smaller variants
        keeping Apache 2.0 licensing. DeepSeek shipped V4 in Pro and Flash
        tiers, and the smaller MIT-licensed core continues to be the most
        permissive frontier-grade model anyone has released. Google followed
        with Gemma 4, leaning on on-device deployment and tight Apple Silicon
        performance. Mistral, the only European lab in the top tier, pushed
        out Mistral Medium 3.5 on April 29 with Apache 2.0 weights and SWE-Bench
        Verified numbers that put it credibly in the conversation.
      </p>
      <p>
        Five releases in thirty days is not a coincidence. The pattern, visible
        for at least two release cycles now, is that the open-weight calendar
        has effectively become quarterly. Labs ship in clusters because the
        cost of being last in a thirty-day window is much smaller than the
        cost of being last in a six-month window.
      </p>

      <h2>The benchmark numbers, and what they actually mean</h2>
      <p>
        Benchmark season produced the expected wave of claims. DeepSeek V4 Pro
        reached 80.6 on SWE-Bench Verified and 90.1 on GPQA Diamond, with a
        1 million token context. Mistral Medium 3.5 came in at 77.6 on
        SWE-Bench, the strongest non-Chinese, non-American open-weight result
        of the cycle. Qwen 3.5 and Llama 4 trade leadership depending on which
        evaluation suite you look at, and Gemma 4 sits behind the frontier on
        pure capability while quietly winning the laptop deployment story.
      </p>
      <p>
        Numbers from labs are worth what a vendor benchmark is usually worth.
        Independent leaderboards have caught up faster than they used to, and
        the ranking is more stable than a year ago, but the gap between
        leaderboard performance and what a model actually does on your
        workload remains. Running the same prompt set against three candidates
        in <Link href="/guides/lm-studio">LM Studio</Link> tells you more in an
        afternoon than a week of reading evaluation papers.
      </p>

      <h2>The licensing layer, where the actual freedom lives</h2>
      <p>
        Capability is one axis, license is another, and the two do not
        correlate the way the marketing suggests. If you need an
        OSI-approved license for legal reasons, the shortlist gets very short
        very fast: DeepSeek V4 (MIT) for the frontier-tier slot, smaller Qwen
        sizes (Apache 2.0) for mid-tier coverage, OLMo from the Allen Institute
        for full transparency, and EuroLLM-22B for the rare combination of
        Apache 2.0 weights with a fully published training pipeline.
      </p>
      <p>
        The middle tier of licenses (Llama Community License, Gemma Terms of
        Use, the various bespoke documents Chinese labs publish) cover most
        commercial settings comfortably, but they all carry restrictions that
        a paranoid legal team will flag: MAU caps, training-restriction
        clauses, export concerns, sometimes ambiguity about whose
        jurisdiction governs. The work of reading those terms is unglamorous
        and unavoidable.
      </p>

      <h2>The geographic shape of the field</h2>
      <p>
        Three observations that the 2026 release cycle made unavoidable.
        Chinese labs are no longer the budget-tier alternative. DeepSeek, Qwen,
        Kimi and GLM hold leaderboard positions that the American labs cannot
        consistently beat with open weights. The Mistral exception is real and
        important, but it does not change the basic shape of the field. Calls
        for &ldquo;European AI sovereignty&rdquo; that lean on the assumption
        that the open weights everyone runs are European need to do the math
        again.
      </p>
      <p>
        American labs continue to lead on closed models, on infrastructure,
        and on the boring but essential layer of tooling around weights:
        evaluation, safety, deployment. The open weights they ship are
        increasingly a second-tier product strategically, not a first-tier
        contribution. Meta is the partial exception. Google ships open weights
        in a way that feels designed to be useful on Pixel and Chromebook
        hardware specifically.
      </p>
      <p>
        Europe has one credible frontier-tier lab and a research consortium
        producing genuinely open models like EuroLLM. That is not nothing.
        Nor is it the kind of footprint that justifies the policy rhetoric.
        The honest reading is that European AI sovereignty, to the extent it
        is achievable, will be a sovereignty of deployment, governance, and
        data residency rather than a sovereignty of the underlying weights.
      </p>

      <h2>What is worth running today</h2>
      <p>
        Three practical recommendations, calibrated to actual hardware most
        readers have available.
      </p>
      <p>
        For a 16 GB laptop, Qwen 3.5 7B in Q4_K_M is the best general-purpose
        choice. It handles chat, summarization, light coding, and most
        retrieval workloads. Phi-5 7B is the credible runner-up if you need
        slightly faster inference at a small quality cost.
      </p>
      <p>
        For a 24 to 32 GB workstation, Qwen 3.5 14B or Llama 4 Scout at
        moderate context lengths give you a real working assistant for
        substantial coding and analysis. The DeepSeek V4 distilled variants
        are worth a look if you do math-heavy work.
      </p>
      <p>
        For a multi-GPU server with serious VRAM (96 GB or more), DeepSeek V4
        Pro is the frontier-tier open choice today. Llama 4 Maverick competes
        on most tasks, and Mistral Medium 3.5 is the one to test if your legal
        team prefers EU-origin weights.
      </p>

      <h2>What to watch over the next quarter</h2>
      <p>
        Three specific things, none of them speculative. The next OpenEuroLLM
        release, which is supposed to ship on the Jupiter exascale system in
        Germany and which will be the first time a European public-money model
        competes at scale. The first 1M-context Apache 2.0 release from a
        Western lab, if it happens. And the rate at which Chinese labs continue
        to release under MIT or Apache, because the political pressure to
        tighten those licenses is real and the labs have so far ignored it.
      </p>
      <p>
        The field is healthier than it has ever been, which is not the same as
        saying it is settled. Three years from now, the leaderboard will look
        different and at least one of the labs in the table above will have
        slipped or stopped. The good news is that open weights are not a
        subscription. Whatever you download today will keep running.
      </p>
    </article>
  );
}
