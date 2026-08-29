import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DwarfStar, and the case for an engine that runs one model",
  description:
    "The author of Redis wrote an inference engine in C that runs essentially a single model, and it does things the general-purpose runtimes cannot. What ds4 gets right, and what it costs in hardware."
};

export default function PostDwarfStar() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Analysis · 10 min · August 27, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        DwarfStar, and the case for an engine that runs one model
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In plain English:</strong>{" "}
        most software for running AI locally tries to run every model.
        Salvatore Sanfilippo — the programmer who wrote Redis — went the
        other way and built a small program that runs essentially one
        model, extremely well. This post explains the trick that makes it
        work, what hardware you need, and what it takes to run it.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Salvatore Sanfilippo published ds4 — DwarfStar — on GitHub on May 7,
        2026, written in C and Metal over roughly a week of long days. It
        is MIT licensed and it has since collected about 21,900 stars. The
        README describes it in one sentence: &ldquo;a small native
        inference engine optimized first for DeepSeek V4 Flash.&rdquo; It
        also runs GLM 5.2, and DeepSeek V4 PRO on machines with enough
        memory to be called infrastructure. That is the whole model list.
      </p>
      <p>
        Sanfilippo named it after what a dwarf star is: most of the mass of
        the original, in a fraction of the volume. The name is doing real
        work here, because the compression is the entire technical
        argument.
      </p>

      <h2>The quantization is asymmetric on purpose</h2>
      <p>
        Every general-purpose runtime offers you a quantization level and
        applies it more or less uniformly. Pick Q4, and the model gets
        squeezed to roughly four bits throughout. ds4 refuses that framing.
        From the README: &ldquo;Only the routed MoE experts are quantized,
        up/gate at IQ2_XXS, down at Q2_K. They are the majority of all the
        model space: the other components (shared experts, projections,
        routing) are left untouched to guarantee quality.&rdquo;
      </p>
      <p>
        That sentence is the design. In a large mixture-of-experts model,
        the routed experts hold most of the parameters but any given token
        touches only a few of them. The components that fire on every
        single token — attention projections, the shared experts, the
        routing network — are comparatively tiny. Crushing the first group
        to two bits buys almost all of the memory saving. Leaving the
        second group alone costs almost nothing in space and preserves the
        parts where damage would compound across every token.
      </p>
      <p>
        Sanfilippo has described the result as an extremely asymmetric 2/8
        bit recipe. It is not a new idea in the abstract — the{" "}
        <Link href="/blog/gguf-quantization-explained">
          quantization scene
        </Link>{" "}
        has been arguing about mixed-precision layouts for years, and
        imatrix builds already vary precision by tensor. What is different
        is targeting: because ds4 only has to be correct for one
        architecture, the recipe can be tuned to that architecture instead
        of being a default that has to be safe for a thousand models it has
        never seen.
      </p>

      <h2>What it costs in hardware</h2>
      <p>
        This is where the enthusiasm needs a floor under it. The README is
        specific: the Q2 build targets &ldquo;96/128 GB RAM machines,&rdquo;
        the Q4 build wants 256 GB or more, and PRO at Q2 wants 512 GB.
      </p>
      <p>
        A 128 GB Mac is a five-figure machine in most configurations. This
        is not the hardware class the rest of this site is written for, and
        it would be dishonest to present ds4 as though it democratises
        anything for a reader with a 24 GB card. What it does is move the
        boundary: work that previously required a rack now fits in one
        expensive but purchasable computer. That is a real change, and it
        is a change for a specific and fairly small group of people.
      </p>
      <p>
        There is an escape hatch, and the author is candid about its cost.
        On Metal, ds4 can stream from SSD — routed experts live in an
        in-memory cache and get loaded from the GGUF file on a miss — with
        the flat caveat that &ldquo;streaming is not as fast as fitting the
        full model in RAM.&rdquo; Useful for trying the thing before
        committing to the machine. Not a substitute for the machine.
      </p>

      <h2>The numbers, from the project&apos;s own table</h2>
      <p>
        On an M5 Max with 128 GB running the Metal backend, the README
        reports 790.18 tokens/s prefill and 39.35 tokens/s generation at a
        2,048-token context, falling to 398.50 and 27.64 at 65,536 tokens.
        On an NVIDIA DGX Spark GB10 with 128 GB under CUDA: 825.76 prefill
        and 18.05 generation at 2,048 tokens, and 822.98 and 13.84 at
        65,536.
      </p>
      <p>
        Two things in that table are worth sitting with. The first is that
        generation on the Mac beats the DGX Spark by a wide margin while
        prefill goes the other way, which is a memory-bandwidth story
        rather than a compute story and matches what we said about{" "}
        <Link href="/blog/apple-silicon-vs-nvidia-local-llm">
          unified memory versus VRAM
        </Link>
        . The second is that the DGX Spark barely slows down on prefill
        between 2k and 64k context while the Mac drops by half. If your
        workload is long documents read once, those are different machines
        than the headline generation figure suggests.
      </p>
      <p>
        These are the project&apos;s own published benchmarks, run by the
        author and contributors on their own hardware. We have not
        reproduced them.
      </p>

      <h2>What the author admits, which is most of what you need</h2>
      <p>
        The README carries its own warnings, and they are better than most
        third-party reviews. &ldquo;The software is currently very fast
        changing. Consider it beta quality.&rdquo; On the CPU path:
        &ldquo;Do not treat the CPU path as the production target.&rdquo;
      </p>
      <p>
        The most useful admission concerns distributed inference. ds4 can
        split a model across machines — pipeline parallelism over the
        network, tensor parallelism over RDMA between two Macs on
        Thunderbolt 5, enough to fit PRO at Q4 across a pair of 512 GB Mac
        Studios. But generation stays strictly autoregressive, so, in the
        author&apos;s words, distributed inference &ldquo;is therefore
        mainly for fitting larger models and speeding up long prefills, not
        for making decode faster.&rdquo; Anyone who has watched a
        distributed-inference demo and assumed two machines means twice the
        speed should read that sentence twice.
      </p>

      <h2>What adding it to the catalogue cost us</h2>
      <p>
        ds4 is now in the <Link href="/tools">tools page</Link>, and getting
        it there meant widening what that page is for. The catalogue used to
        assume software a reader could install on hardware the rest of the
        site addresses, which put a 128 GB floor outside its scope by
        definition. We changed the rule rather than bend the entry: machines
        in that class are no longer exotic, and a catalogue that pretends
        the DGX Spark and the large Mac Studio do not exist is describing
        2024. The entry leads with the memory requirement so nobody reaches
        the install instructions before finding out they cannot use them.
      </p>
      <p>
        DeepSeek V4 Flash — the model ds4 exists to run — was missing from
        the directory for the same reason when this post went up. That half
        has since been fixed: it now has an entry and a hardware profile,
        with memory figures measured from the unsloth GGUF builds. Worth
        noting where those figures land against the numbers above, because
        they do not agree. The smallest stock GGUF in that repository is
        about 91 GB and the Q2 build is about 97 GB, so a 96 GB machine
        misses both once you leave room for context. The 96 GB floor quoted
        here is a property of ds4&apos;s own quantization, not of the model,
        and that is precisely the point the engine is making.
      </p>

      <h2>The broader point about specialisation</h2>
      <p>
        We have argued before that{" "}
        <Link href="/blog/ollama-vs-llama-cpp-vs-vllm">
          the local inference engines solve different problems
        </Link>{" "}
        and that choosing between them is mostly a question of what you
        need, not which is fastest. ds4 adds a category that piece did not
        anticipate: the engine that treats generality as a cost rather than
        a feature.
      </p>
      <p>
        That trade is only available to someone willing to rewrite when the
        target moves, and it is the reason a project like this comes from a
        systems programmer with a track record of maintaining one thing for
        a decade rather than from a startup that needs a roadmap. Whether
        the approach survives depends on something outside the code: how
        long DeepSeek keeps shipping models whose architecture the recipe
        still fits. The bet is legible, the author has made it explicitly,
        and the code is MIT licensed either way.
      </p>
    </article>
  );
}
