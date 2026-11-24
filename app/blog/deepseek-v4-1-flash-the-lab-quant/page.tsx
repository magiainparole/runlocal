import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The most downloaded DeepSeek V4.1 Flash was made by a university lab",
  description:
    "Four weeks after release, the copy of DeepSeek V4.1 Flash that people actually download is a quantization from IST Austria, not DeepSeek's weights or unsloth's. Why that happened, what the files really need, and a correction to our own catalogue."
};

export default function PostDeepSeekV41Quant() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Quantization · 8 min · November 23, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        The most downloaded DeepSeek V4.1 Flash was made by a university lab
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In plain English:</strong>{" "}
        DeepSeek released a new large model in October. It is far too big
        to run as published, so people download compressed copies made by
        third parties. The most popular copy by a wide margin comes from a
        research group at the Institute of Science and Technology Austria,
        which squeezed it to about a quarter of a terabyte. Since late
        October the standard llama.cpp software can run it, something our
        own catalogue failed to notice for a month.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Here are three numbers from the Hugging Face Hub this morning, all
        for the same model. DeepSeek&apos;s own repository for the 1017
        checkpoint of V4.1 Flash shows about 524,000 downloads.
        unsloth&apos;s GGUF conversion, usually the default choice for
        anyone running large models at home, shows 1.6 million. And a
        repository called ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF,
        published by the Deep Algorithms and Systems Lab at IST Austria,
        shows 4.2 million, more than the other two put together.
      </p>
      <p>
        Download counts on the Hub are a rough signal, inflated by mirrors
        and automated pipelines, and we have said before that they deserve
        suspicion. Likes tell a different story here, since DeepSeek&apos;s
        repository has far more of them than either conversion. But a gap
        of this size in downloads is still worth explaining, and the
        explanation is in the files.
      </p>

      <h2>Why the model needs a third party at all</h2>
      <p>
        V4.1 Flash is a new architecture, not a refresh of V4. DeepSeek
        describes a 552-billion-parameter mixture-of-experts backbone that
        activates about 8 billion parameters while reading the prompt and
        16 billion while generating, plus a separate 196-billion-parameter
        memory it calls Engram, which the model consults by lookup rather
        than by matrix multiplication. Counted together that is around 763
        billion parameters. The weights ship in FP8 with the routed experts
        in FP4, and nobody is running that on a desk.
      </p>
      <p>
        So the real product, for this site&apos;s readers, is whoever turns
        those weights into a GGUF file that fits a machine with a few
        hundred gigabytes of memory. That is a quantization problem, and on
        this one a lab that publishes papers about quantization did better
        than the people who usually win the race.
      </p>

      <h2>What the lab actually did</h2>
      <p>
        A normal low-bit GGUF picks one quantization type, say IQ2_XXS, and
        applies it more or less everywhere. The ISTA build instead chooses a
        type for every single tensor. Two methods from the lab do the work:
        GSQ quantizes each tensor at each candidate type, and RCO then runs
        a gradient-based search that assigns one type per tensor so that the
        whole backbone lands exactly on a size budget. The dense parts
        (attention, shared experts, embeddings) end up between Q5_K and
        Q8_0, while the routed experts, which hold most of the weight, go
        as low as IQ1_S. The output is still a standard GGUF, which is the
        reason llama.cpp can load it at all.
      </p>
      <p>
        There are three builds. The one the lab recommends, IQ2_XXS, has a
        138 GB backbone. The Engram tables are stored once, in a separate
        111 GB file shared by every build, which brings the total to about
        249 GB. llama.cpp keeps that Engram file memory-mapped on disk and
        reads one row per token, so in practice what has to sit in memory
        is the backbone plus context. On a machine with 192 GB of RAM or
        unified memory that is tight but plausible, and 256 GB is
        comfortable.
      </p>

      <h2>How good the numbers are, and how far they go</h2>
      <p>
        The lab reports that IQ2_XXS matches the original weights exactly
        on the three benchmarks it ran: 100.00 on AIME25, 90.91 on
        GPQA-Diamond and 89.71 on LiveCodeBench v6, for a task average of
        93.54, the same as the base model. The 1.75-bit IQ1_M build keeps
        98.7 percent of it.
      </p>
      <p>
        Three benchmarks is a small set, and one of them, AIME25, is
        already at 100 for every variant including the original, so it
        cannot show any loss at all. All the numbers were taken at a single
        reasoning effort setting of 50. Nobody outside the lab has published
        a comparison yet, and it would be a mistake to read &ldquo;100.0
        percent recovery&rdquo; as &ldquo;no difference anywhere&rdquo;.
        What the table does show is that a 2-bit build of a model this size
        can hold up on hard reasoning and coding tasks. That is the
        opposite of what uniform 2-bit builds usually do: when we wrote
        about{" "}
        <Link href="/blog/bonsai-2-27b-in-six-gigabytes">Bonsai 2</Link>,
        the conventional IQ2_XXS build of Qwen3.8-27B fell from 94.6 to
        57.5 on AIME26 in Prism ML&apos;s own comparison.
      </p>

      <h2>The runtime arrived, and we missed it</h2>
      <p>
        When we added V4.1 Flash to the{" "}
        <Link href="/models">model directory</Link> on October 27 we kept it
        out of the <Link href="/picker">picker</Link>, because unsloth&apos;s
        model card said the files needed its own llama.cpp pull request.
        That was already out of date when we wrote it. Support for the
        architecture went into llama.cpp two days earlier, in build b11870
        on October 25, through a pull request co-authored by Daniel Han of
        unsloth, and the ISTA files were rewritten to the upstream layout
        on October 27. unsloth&apos;s card still carries the old line
        today. We should have checked the llama.cpp releases rather than a
        model card, and the directory entry now says what is true.
      </p>
      <p>
        It is still not in the picker, for a narrower reason. The ISTA
        build expects the shared Engram file to appear as the sixth shard
        of whichever build you use, so after downloading you have to create
        a link with a specific name before llama.cpp will open it. The
        commands our picker prints download a file and run it; they do not
        create links, and we would rather show nothing than a command that
        fails on the last step. The model card explains the link in one
        line, and if you are setting up a 192 GB machine you can follow it.
      </p>

      <h2>A word on the 12 GB claim</h2>
      <p>
        The ISTA card also says every build runs on a single 12 GB GPU
        through Strata, a separate inference engine, with the rest of the
        model in system memory. That may well be true, but the card&apos;s
        own memory section is still a placeholder, with editing notes
        asking someone to confirm how Strata places the model. We have not
        tested it, and until there is a documented memory budget we would
        treat it as a promise rather than a specification. The system memory
        still has to come from somewhere.
      </p>

      <h2>Why the lab won the download race</h2>
      <p>
        Three things lined up. The ISTA card said plainly, two days after
        support landed, that its files load on stock llama.cpp, while
        unsloth&apos;s page still pointed to a pull request. Its smallest
        build is 231 GB against 250 GB for unsloth&apos;s smallest, and the
        Engram file is downloaded once however many builds you try,
        whereas unsloth repeats it inside each build&apos;s folder. And it
        came with a results table measured against the original weights,
        which is more than most quantizations offer. None of that needs a big name,
        only care with the files and a model card that explains how to use
        them.
      </p>
      <p>
        For readers with the hardware, V4.1 Flash is now the strongest
        DeepSeek you can run at home, and the IQ2_XXS build is where we
        would start. For everyone else{" "}
        <Link href="/blog/deepseek-v4-flash-0731-checkpoint-refresh">V4 Flash 0731</Link>{" "}
        stays in the picker, and it is still the large DeepSeek you can
        install without touching a single file name.
      </p>
    </article>
  );
}
