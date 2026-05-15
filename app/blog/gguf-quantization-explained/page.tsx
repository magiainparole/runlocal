import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Choosing a GGUF quantization without lying to yourself",
  description:
    "A practical guide to GGUF quantization levels (Q4, Q5, Q8 and the rest), the trade-offs they encode, and a decision rule that holds up across hardware classes."
};

export default function PostQuantization() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Guide · 10 min · May 15, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Choosing a GGUF quantization without lying to yourself
      </h1>
      <p className="mt-2 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Every model on Hugging Face that comes packaged for llama.cpp arrives in
        a parade of quantization variants: <code>Q2_K</code>,{" "}
        <code>Q3_K_S</code>, <code>Q4_K_M</code>, <code>Q5_K_M</code>,{" "}
        <code>Q6_K</code>, <code>Q8_0</code>, plus the new IQ-prefixed family.
        Most users pick one almost at random, run with it for months, and never
        compare. This post is the explanation I wish I had read before doing
        exactly that.
      </p>

      <h2>What quantization actually does</h2>
      <p>
        A large language model is, at runtime, a long list of floating-point
        numbers. The model is trained in 16-bit precision (sometimes 32-bit
        for parts of it). Quantization rewrites those numbers in fewer bits.
        A 4-bit quantization stores each weight in four bits instead of
        sixteen, which cuts the model size by roughly a factor of four and the
        memory bandwidth required to feed those weights to the GPU by the
        same factor. Less data moved means faster inference, smaller files,
        more parameters per gigabyte of memory.
      </p>
      <p>
        The cost is precision. A four-bit number cannot represent the same
        range of values as a sixteen-bit one. The quantization scheme has to
        decide which weights matter enough to deserve more bits, which can be
        rounded harder, and how to organise the storage to minimise error.
        The k-quant family (the schemes with <code>_K</code> in the name) does
        this with per-block scaling. The IQ family adds importance-aware
        weighting, often producing better quality at the same bit-rate.
      </p>

      <h2>The five quantization levels you should actually know</h2>
      <p>
        The GGUF catalogue lists more than thirty variants. The ones that
        matter for almost every decision are five.
      </p>

      <h3>Q4_K_M — the default</h3>
      <p>
        Roughly four bits per weight, with the most-used weights stored at
        slightly higher precision. The size hit versus the original FP16
        model is about 75 percent: a 14 GB FP16 model lands around 4 GB.
        Quality loss against the unquantised baseline is small enough that
        most users cannot reliably tell the difference in blind side-by-side
        tests on general chat tasks. If you do not know which quantization to
        pick, pick this one.
      </p>

      <h3>Q5_K_M — when you have headroom</h3>
      <p>
        About five bits per weight. The size grows by roughly 25 percent over
        Q4_K_M, and the quality improvement is real but modest. The
        difference shows most clearly on tasks that punish numerical
        instability: chained mathematical reasoning, code that involves
        precise arithmetic, multi-step logic puzzles. If your machine fits
        Q5_K_M without spilling out of VRAM, the upgrade is essentially free
        utility.
      </p>

      <h3>Q8_0 — the near-perfect tier</h3>
      <p>
        Eight bits per weight. The model size is half of FP16, and quality is
        statistically indistinguishable from the original in almost every
        evaluation. The trade-off is that the file is roughly twice as big as
        Q4_K_M, so the same physical memory holds half as many parameters.
        Useful when you have plenty of memory and want a defensible baseline
        for benchmarking or for production work where you cannot afford a
        quality regression you might not notice.
      </p>

      <h3>Q3_K_S — when you have to fit a bigger model</h3>
      <p>
        Three bits per weight, simple variant. Used when you want to fit a
        much larger model into the same memory budget than its 4-bit version
        would allow. A 70B model in Q3_K_S fits in roughly 32 GB instead of
        the 42 GB Q4_K_M needs. Quality drops are visible: more hallucination,
        worse code, sometimes confused chat turn-taking. The right answer is
        usually &ldquo;run a smaller model at Q4_K_M instead,&rdquo; but
        there are cases where the larger-model effect dominates the
        quantization noise.
      </p>

      <h3>IQ4_XS and friends — the modern alternative</h3>
      <p>
        The IQ family applies importance-aware quantization with smaller
        block sizes. IQ4_XS, in particular, has become a popular replacement
        for Q4_K_M because it produces models about ten percent smaller at
        similar quality. The cost is slower inference on some hardware
        because the decoding is more complex. On Apple Silicon and modern
        NVIDIA cards the speed difference is small; on older hardware it can
        be noticeable. Worth trying on a model you already know well, so you
        can judge the trade-off concretely.
      </p>

      <h2>The decision rule that actually works</h2>
      <p>
        Here is the rule that holds up across hardware and use cases. Compute
        how much VRAM you have for the model alone (total VRAM minus around
        2 GB for context cache and overhead), then pick the largest
        quantization that fits with comfortable margin.
      </p>
      <ul>
        <li>
          <strong>If Q8_0 fits</strong>, use Q8_0. You have no reason not to.
        </li>
        <li>
          <strong>If only Q5_K_M fits</strong>, use Q5_K_M. The quality bump
          over Q4 is worth the disk space and the memory cost.
        </li>
        <li>
          <strong>If only Q4_K_M fits</strong>, use Q4_K_M. This is where
          most consumer hardware lands, and it is the right answer for the
          large majority of cases.
        </li>
        <li>
          <strong>If even Q4_K_M does not fit</strong>, drop down to a
          smaller model at Q4_K_M before you drop to Q3 on the bigger one.
          The smaller model at Q4 almost always outperforms the bigger one
          at Q3.
        </li>
      </ul>

      <h2>Two things the rule omits, and when they matter</h2>
      <p>
        First, context length. KV cache memory grows linearly with context
        size and is not quantized in the same way the weights are. A model
        that fits in 16 GB of VRAM at 4k context might overflow at 32k. If
        you plan to use long contexts, leave more headroom than the rule
        suggests, or look at quantized-cache options like <code>-fa</code>{" "}
        and <code>--kv-q4</code> flags in recent llama.cpp builds.
      </p>
      <p>
        Second, speculative decoding. If you pair a small draft model with a
        large target model, both have to fit in memory. The right
        quantization choice for the target may change once you account for
        the draft. The combined memory still has to leave room for the KV
        cache, and the draft model should usually be one or two
        quantization-bits below the target to keep its rejection rate
        sensible.
      </p>

      <h2>A test you can run in twenty minutes</h2>
      <p>
        Pick a model you use often. Download three GGUF variants from the
        same uploader (so they share quantization tooling): Q4_K_M, Q5_K_M,
        Q8_0. Build a small prompt set that represents your actual workload:
        five prompts is enough. Run them through each model in{" "}
        <Link href="/guides/lm-studio">LM Studio</Link> using multi-model
        chat, or via three terminal windows running{" "}
        <Link href="/guides/llama-cpp">llama-cli</Link>. Read the outputs
        side by side.
      </p>
      <p>
        Most of the time, you will find that you cannot reliably distinguish
        Q4_K_M from Q8_0 on general chat. You will sometimes spot Q4 making
        a numerical error that Q8 gets right. On code tasks, the gap widens
        slightly. If you find a workload where Q4 produces visibly worse
        output, that is your signal to move up. Otherwise, stay where you
        are; the disk space and the speed are worth more than the theoretical
        precision.
      </p>

      <h2>Where the IQ family fits into your shelf</h2>
      <p>
        IQ quantizations are worth trying once you have a model you use
        every day, because the size savings compound across re-downloads and
        the quality at small sizes (IQ3_XXS, IQ2_S) is markedly better than
        the equivalent k-quants. For your daily-driver model, start with
        Q4_K_M, run the twenty-minute test against IQ4_XS, keep whichever
        wins on your prompts. For a model you use occasionally, do not
        bother; the time to evaluate outweighs the gain.
      </p>

      <h2>What this looks like in practice</h2>
      <p>
        A 24 GB GPU, the most common configuration above the hobbyist line,
        comfortably runs a 32B model at Q4_K_M or a 14B at Q8_0. The Q8 14B
        is, on most tasks, the better choice, because the precision dominates
        the parameter count benefit at that scale. A 16 GB Apple Silicon
        Mac handles an 8B at Q5_K_M with plenty of context, or a 14B at
        Q4_K_M with shorter contexts. A 12 GB consumer GPU runs an 8B at
        Q5_K_M well, or a 14B at Q4_K_M if you keep context modest.
      </p>
      <p>
        The point is that the &ldquo;right&rdquo; quantization is almost
        never a single answer. It depends on the model size you are trying
        to fit, the context lengths you actually use, and the workload you
        care about. The decision rule above gets you to a sensible default;
        the twenty-minute test lets you correct it. Anything more elaborate
        is usually false precision.
      </p>
    </article>
  );
}
