import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bonsai 2 fits a 27B in six gigabytes, on Prism ML's terms",
  description:
    "The most downloaded model on the Hub this month is a ternary rebuild of Qwen3.8-27B that fits a laptop. The numbers hold up better than the last round, and the catch is the runtime."
};

export default function PostBonsai2() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Quantization · 8 min · September 29, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Bonsai 2 fits a 27B in six gigabytes, on Prism ML&apos;s terms
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In plain English:</strong>{" "}
        a small company called Prism ML took the best mid-sized open model
        of the summer, Qwen 3.8 27B, and compressed it until it fits in
        about 6 GB, the memory of an ordinary laptop. Their tests say it
        loses very little along the way. The catch is that you have to run
        it with their own version of the llama.cpp software, because the
        standard one either refuses the file or quietly produces nonsense.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Ternary-Bonsai-2-27B-gguf was second in our{" "}
        <Link href="/trending">trending snapshot</Link> a week ago and first
        in yesterday&apos;s, and as of this morning the repository shows
        about 3.6 million downloads, most of them in September. It is a
        fair measure of what people wanted from Qwen3.8-27B all along: the
        same model, in a file that fits the machine they already have.
      </p>

      <h2>What is in the file</h2>
      <p>
        Every weight in the language model is one of three values, minus
        one, zero or plus one, with a shared 16-bit scale for each group of
        128. Prism ML counts that as 1.72 bits per weight across the whole
        model, and unlike most &ldquo;2-bit&rdquo; builds the label is
        close to the truth: embeddings, attention, MLP and output head are
        all ternary, and only about 26 million parameters (the recurrent
        state of the linear-attention layers and the norms) stay at higher
        precision. The weights are also stored after a Hadamard rotation,
        a trick that spreads outliers across a block so that three values
        are enough to describe it. The runtime has to apply the matching
        rotation to the activations, and that detail is where the
        practical trouble starts.
      </p>
      <p>
        Two packings ship. PTQ1_0 packs the trits densely and weighs 5.95 GB.
        PQ2_0 stores each trit in a 2-bit slot and weighs 7.21 GB, trading
        a little memory for cheaper unpacking. The vision tower is a
        separate 0.63 GB file you only need for images.
      </p>

      <h2>How much it costs in quality, according to the people selling it</h2>
      <p>
        Prism ML reports a 14-benchmark average of 84.78 in thinking mode,
        against 86.32 for the full-precision Qwen3.8-27B and 85.18 for
        unsloth&apos;s UD-Q4_K_XL at 17.6 GB. The comparison that matters
        more is with IQ2_XXS, the conventional 2-bit build, which lands at
        7.27 GB, almost the same size, and averages 72.59. The gap is
        concentrated exactly where you would worry about it: on AIME26 the
        conventional build falls to 57.5 and Bonsai 2 holds 95.83, on
        LiveCodeBench it is 56.4 against 90.07. Meanwhile IQ2_XXS still
        scores about 89 on MMLU-Redux, which is why a quick chat with a
        heavily quantized model can feel fine while it quietly fails at the
        long reasoning chains you downloaded it for.
      </p>
      <p>
        All of these are vendor figures, run by Prism ML on their own
        harness. We have not reproduced them and neither, as far as we can
        find, has anyone independent, so the right way to read them is as a
        reason to spend an evening testing the model on your own prompts
        rather than as a settled result.
      </p>

      <h2>The runtime is the catch</h2>
      <p>
        The model card is blunt about it: stock llama.cpp will not run these
        files. It rejects PQ2_0 and PTQ1_0 as unknown types, and a file in
        the older Q2_0 layout would load without complaint and generate
        garbage, because upstream llama.cpp has no idea the weights are
        rotated. You need the{" "}
        <a href="https://github.com/PrismML-Eng/llama.cpp">PrismML-Eng/llama.cpp</a>{" "}
        fork, either a prebuilt binary from its releases page or a build
        from source, and for anything beyond a plain chat Prism ML points
        you to their Bonsai-demo repository as the reference setup.
      </p>
      <p>
        That rules out, for now, the tools most people start with. Ollama
        and LM Studio are built on upstream llama.cpp, so neither will load Bonsai 2
        until the kernels are merged upstream or the vendors bundle the
        fork. We have added the model to the{" "}
        <Link href="/picker">picker</Link> anyway, because on a 12 GB card
        or a 16 GB Mac nothing else in the catalogue comes close, but the command
        it prints now starts with cloning and building the fork. While
        doing that we found that our entry for the first Ternary Bonsai had
        the same problem: its Q2_0 file needs the fork too, and our command
        assumed upstream. That is fixed, and the note on that entry now
        says that Q2_g64 is the file for upstream llama.cpp.
      </p>

      <h2>Things that will trip you up</h2>
      <p>
        It is a reasoning model and it thinks at length by default, at an
        effort level the chat template calls <code>xhigh</code>. With a
        small output limit it spends the whole budget thinking and returns
        an empty answer, which is the most common complaint in Prism ML&apos;s
        own known-issues page. Give it <code>-n 16384</code> or more and a
        context of at least 65k. If you want shorter answers, send{" "}
        <code>reasoning_effort: &quot;medium&quot;</code>; the template
        accepts <code>low</code>, <code>medium</code> and <code>xhigh</code>,
        and asking for <code>high</code> currently gets you an HTTP 500 from
        the server.
      </p>
      <p>
        On speed, Prism ML measures about 28 tokens a second on an M5 Pro
        laptop with PQ2_0, and about 91 on an RTX 4090 with PTQ1_0. Which
        packing is faster depends on the card: PTQ1_0 wins on Ada-generation
        GPUs and the L4, where memory bandwidth is the limit, and PQ2_0 wins
        on Blackwell, Hopper and Ampere. On a Mac, PQ2_0 is the one they
        have measured.
      </p>

      <h2>Who should bother</h2>
      <p>
        <strong>12 GB card or 16 GB Mac:</strong> this is the first time a
        27B-class model has been a realistic option at this size, and the
        reasoning scores are close enough to the 4-bit build that the
        trade is worth trying. Budget an evening for building the fork. On
        an 8 GB card the file fits but the context and runtime buffers do
        not leave enough room, which is why the picker stops offering it
        there.
      </p>
      <p>
        <strong>24 GB card or 32 GB Mac:</strong> the ordinary Q4_K_M of
        Qwen3.8-27B at about 17 GB still fits, runs on everything, and
        gives up nothing to a custom runtime. Bonsai 2 makes sense here
        only if you need the freed memory for a very long context or a
        second model alongside.
      </p>
      <p>
        <strong>Anything running Ollama or LM Studio for a household or a
        team:</strong> wait. A fork is fine for one person who likes
        building things, and a poor foundation for a setup other people
        depend on.
      </p>

      <h2>At the other end of the month</h2>
      <p>
        September also brought MiniCPM5-2B from OpenBMB, which goes the
        other way: a dense 2.5B model trained small from the start rather
        than compressed afterwards, Apache 2.0, with a 131k context and
        official GGUF files that run on stock llama.cpp. Its Q4_K_M is
        about 1.6 GB. OpenBMB says it competes with 4B-class models on
        coding and maths, another vendor claim to check yourself. It is in
        the picker now as the step up from MiniCPM5-1B for phones and old
        laptops, and it is the model we would try first on a machine where
        even Bonsai 2&apos;s six gigabytes are too many.
      </p>
    </article>
  );
}
