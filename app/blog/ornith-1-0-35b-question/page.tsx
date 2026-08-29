import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3.5 million downloads, almost no footprint: the Ornith-1.0-35B question",
  description:
    "A 35B MIT-licensed model from an account we'd never heard of just outran everything else on Hugging Face's trending list except the evergreen giants. Here is what we checked, what we couldn't verify, and why it isn't in the directory."
};

export default function PostOrnith() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Analysis · 8 min · August 20, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        3.5 million downloads, almost no footprint: the Ornith-1.0-35B
        question
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In plain English:</strong>{" "}
        a 35-billion-parameter model from an account called ornith-ai
        appeared on Hugging Face in mid-July, already packaged as GGUF,
        under an MIT license — and by our latest trending snapshot it had
        more downloads than DeepSeek, GLM or Qwen&apos;s biggest recent
        releases. We can&apos;t find a model card, a paper, or anything else
        that usually comes with traction at that scale. This is what we
        checked, and why the model still isn&apos;t in our directory.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        The repository ornith-ai/Ornith-1.0-35B-GGUF went up on July 18 —
        the same day Kimi K3&apos;s weights dominated every AI headline, which
        is probably why nobody noticed. In the latest trending snapshot on this
        site it had accumulated 3,544,218 downloads and 1,053 likes. That
        download figure puts it ahead of every model in the top sixteen
        except four repositories that have been
        accumulating traffic for longer: gpt2, gpt-oss-20b, Llama 3.1 8B and
        DeepSeek R1.
        A brand-new 35B model from an unfamiliar account outdownloading GLM-5.2
        and DeepSeek V4 Pro in five weeks is either a genuinely remarkable
        launch or a number worth a second look. We went looking.
      </p>

      <h2>The numbers that don&apos;t add up</h2>
      <p>
        Downloads and likes on the Hub come from overlapping but different
        populations: likes require someone to be browsing the repository
        page and choosing to click something, while downloads can come from
        a single human, a CI pipeline, a mirror, or a benchmark harness
        pulling the same weights on a schedule. For organically popular
        repositories the two numbers still tend to move together, because
        the same wave of engaged users drives both. Set the ratios side by
        side and Ornith looks out of place. DeepSeek-V4-Flash-0731 carries
        about one like per 850 downloads. GLM-5.2 is closer to one per 530.
        Ornith-1.0-35B sits at roughly one like per 3,370 downloads — a
        ratio several times thinner than any comparable entry in the same
        snapshot.
      </p>
      <p>
        None of that proves anything by itself. Some genuinely useful
        low-level or infrastructure repositories get pulled by automated
        pipelines far more than they get liked, and a thin like ratio is
        not evidence of wrongdoing. It is, however, exactly the kind of
        anomaly this site&apos;s editorial principles say we should attribute
        rather than wave past — so here it is, attributed: a real number,
        from our own snapshot, that we cannot fully explain.
      </p>

      <h2>What the repository does and doesn&apos;t tell you</h2>
      <p>
        We read what&apos;s actually there. No written model card describing
        training data, architecture family, or tokenizer. No benchmark
        numbers, vendor-reported or otherwise. No paper, no organization
        page beyond the single repository, no discussion thread with more
        than a handful of comments. The GGUF quants were uploaded directly
        by the account rather than following the usual path of a base
        checkpoint that a known community quantizer — bartowski, unsloth,
        mradermacher — converts after the fact. That&apos;s not inherently
        suspicious; plenty of labs ship their own GGUF builds now. It is
        one more data point in a repository that otherwise offers almost
        none.
      </p>
      <p>
        One thing does check out: the license file in the repository
        metadata does say MIT, which at least means the permissive claim
        isn&apos;t fabricated. But &ldquo;the license is real&rdquo; and
        &ldquo;the model is what it appears to be&rdquo; are different
        claims, and we can only verify the first one from where we sit.
      </p>

      <h2>How this one reached us</h2>
      <p>
        We didn&apos;t find Ornith by browsing. This site runs a weekly
        catalog-freshness workflow that flags any trending model whose
        author matches none of the families in our own coverage list —
        ornith-ai isn&apos;t an alias of anything we already track, so it
        cleared that bar cleanly, and its like count comfortably cleared
        the threshold the workflow uses to separate a real candidate from
        noise. Monday&apos;s run filed it as a new-family candidate, which is
        the entire reason this post exists. The automation did its job;
        this is us doing ours.
      </p>

      <h2>What we&apos;re doing about it</h2>
      <p>
        Nothing, yet — and that is the point. This site&apos;s rule for the{" "}
        <Link href="/models">directory</Link> and the{" "}
        <Link href="/picker">picker</Link> is that an entry gets added
        after we&apos;ve checked the license and put real hardware numbers
        behind it, not from a download count alone. We ran a handful of
        prompts against the GGUF ourselves; a handful of prompts is not a
        benchmark suite, and we&apos;re not going to publish a quality
        verdict built on it. Until Ornith clears the same bar every other
        entry in the directory clears — a real model card, or enough
        independent testing that its absence stops mattering — it stays
        out.
      </p>
      <p>
        The broader takeaway travels beyond this one repository. A trending
        position on the Hub is one weak signal among several, not a
        verdict. Before you trust a sudden appearance at the top of any
        list — this site&apos;s <Link href="/trending">trending page</Link>{" "}
        included — check whether the likes track the downloads, whether the
        account has a history beyond a single upload, and whether anyone
        has written down what the model actually is. That&apos;s worth doing
        for any model. It matters more for anything you&apos;d run with file
        access or tool permissions. We&apos;ll update this post if ornith-ai
        publishes a model card or if independent testing turns up something
        concrete. Until then, the download count buys curiosity, not a
        recommendation.
      </p>
    </article>
  );
}
