import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Which local inference engine should you actually use",
  description:
    "Ollama, llama.cpp, LM Studio and vLLM solve different problems. A practical map of when to reach for which, and why it matters more than benchmark numbers."
};

export default function PostEngineComparison() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Editorial · 11 min · May 5, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Which local inference engine should you actually use
      </h1>
      <p className="mt-2 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        Ollama, llama.cpp, LM Studio and vLLM are the four names that come up
        in every &ldquo;run LLMs locally&rdquo; conversation. They sound like
        competing products. They are mostly not. A short map of who solves what
        problem, written for people picking once and getting on with the work.
      </p>

      <h2>The thing the comparisons usually get wrong</h2>
      <p>
        Most online comparisons line up the four tools in a table, score them
        on a single axis of tokens per second, and declare a winner. The
        numbers are real (vLLM does indeed deliver roughly an order of
        magnitude more throughput than Ollama under concurrent load, with
        recent benchmarks landing around 793 tokens per second for vLLM versus
        41 for Ollama at peak), but the conclusion they invite is misleading.
        These tools are not racing each other. They sit at different points on
        a spectrum that starts at &ldquo;single developer, single machine,
        single chat at a time&rdquo; and ends at &ldquo;serving thousands of
        concurrent users behind a load balancer.&rdquo; A throughput number
        from the wrong end of the spectrum tells you almost nothing about
        whether the tool fits your work.
      </p>

      <h2>The four positions, mapped to the workloads they serve</h2>
      <p>
        The honest version of the comparison looks like this.{" "}
        <strong>Ollama</strong> is the friendliest path from zero to a working
        chat session on your own machine. It runs as a daemon, exposes an
        OpenAI-compatible API, and has the lowest install friction of any tool
        in this list. The library catalog has crossed 4,500 model variants,
        and Llama 3.1 alone has been pulled more than 112 million times. If
        you are reading this and have never run a local model before, Ollama
        is what you should install today.
      </p>
      <p>
        <strong>llama.cpp</strong> is the engine that lives under most of the
        other tools, and the answer when you want maximum control. It builds
        on basically anything, runs on CUDA, ROCm, Metal, Vulkan and CPU,
        gives you fine-grained quantization control, and is usually the
        performance leader on Apple Silicon. The cost is operational:
        configuration is exposed, conventions are minimal, and the project
        assumes you will read documentation. For users who want the best
        single-machine performance available in open source, it remains the
        right tool.
      </p>
      <p>
        <strong>LM Studio</strong> is the only mature full-featured GUI in the
        category. It uses llama.cpp underneath and adds a desktop chat client,
        a Hugging Face model browser, side-by-side multi-model evaluation, and
        a one-click OpenAI-compatible server. It is the right tool for picking
        which model you want to run for everyday work. After that decision is
        made, most users move the chosen model into Ollama or llama.cpp for
        production use; the LM Studio GUI is overkill once you know what you
        are running.
      </p>
      <p>
        <strong>vLLM</strong> is in a different category entirely. It is the
        production inference server you reach for when concurrent users and
        sustained throughput are the constraints. PagedAttention for
        memory-efficient KV cache, continuous batching, speculative decoding,
        and tensor parallelism across multiple GPUs make it the de facto
        standard for serious deployments. The trade-off is that vLLM expects
        Linux, expects datacenter-class GPUs (NVIDIA CUDA or AMD ROCm), and
        expects an operator who is willing to spend time on tuning. For a
        team running an internal coding assistant on a shared GPU box, this
        is the right answer. For a hobbyist on a laptop, it is the wrong one.
      </p>

      <h2>A decision flowchart that fits on a napkin</h2>
      <p>
        If you have not run a local model before, install{" "}
        <Link href="/guides/ollama">Ollama</Link>. Pull a 7B or 8B model, chat
        with it, decide whether the experience is interesting enough to invest
        more. Most readers stop here, and that is a perfectly fine outcome.
      </p>
      <p>
        If you want to compare several models before committing, install{" "}
        <Link href="/guides/lm-studio">LM Studio</Link>. Run a small prompt
        suite against three or four candidates and let the side-by-side view
        decide for you. Move the winner into Ollama afterwards.
      </p>
      <p>
        If you are on Apple Silicon and want the absolute fastest single-machine
        inference, build <Link href="/guides/llama-cpp">llama.cpp</Link> from
        source with Metal enabled. The performance margin over the same model
        in Ollama is usually 10 to 30 percent on M-series chips.
      </p>
      <p>
        If you are running a service that needs to handle many concurrent users
        on a GPU box, deploy <Link href="/tools">vLLM</Link>. Plan for the
        operational work. The throughput payoff is not optional once your
        concurrency moves past single digits.
      </p>

      <h2>Two things the benchmarks miss</h2>
      <p>
        First, latency under no load is not what most users feel. The vLLM
        throughput numbers come from concurrent benchmark suites; for a single
        user typing a question and waiting for the first token, Ollama and
        llama.cpp are often indistinguishable from vLLM. Throughput matters
        when multiple requests are in flight simultaneously, and the gap
        compounds with concurrency.
      </p>
      <p>
        Second, the OpenAI-compatible API is the connective tissue that makes
        all four tools interchangeable for clients. Once you pick an engine
        and point it at the right port, any client that supports an OpenAI
        base URL override (which is most of them) works without further
        changes. This means you can start with Ollama, graduate to vLLM, and
        keep the same client code. The switching cost is real but bounded.
      </p>

      <h2>What this looks like in practice</h2>
      <p>
        A reasonable trajectory for someone serious about running local AI in
        2026 looks like this. Start with Ollama on your laptop. Use it to chat,
        wire it into a code editor through Continue.dev, get a sense of which
        models you reach for. When you find yourself wanting to compare new
        releases, install LM Studio for that purpose. If you reach a point
        where you are sharing a model with colleagues from a server, set up
        either Ollama on that server (if concurrency is moderate) or vLLM (if
        it is not). Keep llama.cpp in the toolbox for performance work and
        for the cases where you need a quantization scheme nothing else
        exposes.
      </p>
      <p>
        None of this is the wrong path. The mistake people make is not picking
        the wrong tool; it is treating the choice as binary. Most serious
        local-AI setups use two or three of these tools, each for the
        workload it was actually designed for.
      </p>
    </article>
  );
}
