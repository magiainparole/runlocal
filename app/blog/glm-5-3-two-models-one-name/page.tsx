import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GLM-5.3 is two different models sharing a version number",
  description:
    "Z.ai shipped a 753B post-trained GLM-5.2 under a new licence and a 321B model built from scratch under MIT, and gave them the same name. The smaller one is the one to watch, once llama.cpp catches up."
};

export default function PostGlm53() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Analysis · 7 min · September 29, 2026
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        GLM-5.3 is two different models sharing a version number
      </h1>

      <aside className="mt-5 rounded-md border border-brand/30 bg-brand/5 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">In plain English:</strong>{" "}
        the Chinese lab Z.ai released two AI models called GLM-5.3 in the
        space of a few weeks. The big one needs a data centre and
        comes with a licence that has a new condition in it. The smaller
        one is brand new, sees images as well as text, and comes under the
        permissive MIT licence, but the free software most people use to
        run models at home cannot load it yet. This post sorts out which is
        which.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        If you read &ldquo;GLM-5.3&rdquo; in a benchmark table this month,
        it is worth checking which of the two it means. The repository
        called zai-org/GLM-5.3 holds a 753-billion-parameter model with
        about 1.4 million downloads. The one called GLM-5.3-Flash holds a
        321-billion-parameter model with about 5.1 million. They share a
        version number, a tokenizer and a technical report, and not much
        else.
      </p>

      <h2>The big one is GLM-5.2 with more training on top</h2>
      <p>
        Z.ai says so plainly on the model card: GLM-5.3 uses the same base
        model as GLM-5.2, and every improvement comes from post-training.
        The improvements they report are large on agentic coding. Terminal
        Bench 3.0 goes from 4.6 to 28.3, DeepSWE from 46.2 to 66.9, and
        they claim the best open-weight coding results to date. They also
        report, with what reads as some surprise, that cyber-offence
        capability grew faster than they expected during post-training:
        on ExploitGym GLM-5.3 more than triples GLM-5.2&apos;s score. All
        of this is Z.ai&apos;s own table, run in Claude Code as the agent
        harness, and none of it has been independently reproduced yet.
      </p>
      <p>
        The part that changed quietly is the licence. GLM-5.2 was MIT.
        GLM-5.3 ships under a &ldquo;GLM-5.3 License&rdquo; that reads like
        MIT with one clause added: a company that sells model access as a
        service, and whose group revenue exceeds ten billion dollars over
        twelve months, has to pass a security review by Z.ai before using
        the model commercially. For anyone reading this site the clause
        changes nothing in practice, since you are not a hyperscaler. It is
        still a move away from a standard licence, in the same direction
        Alibaba took with the 2.4T Qwen, and it is the reason our{" "}
        <Link href="/frontier">Frontier page</Link> now files GLM-5.3 as
        open-weight rather than permissive.
      </p>
      <p>
        As for running it: unsloth&apos;s smallest GGUF, UD-IQ1_S, is about
        217 GB, UD-Q2_K_XL is 254 GB, and UD-Q4_K_XL is 467 GB. A
        256 GB workstation can technically load the 1-bit build, and there
        is no configuration short of a server where it is a comfortable
        daily tool. It replaces GLM-5.2 on our Frontier page, and that is
        where it belongs.
      </p>

      <h2>The Flash is a new model, and the more interesting one</h2>
      <p>
        GLM-5.3-Flash starts from a newly trained base. It is the first
        natively multimodal GLM, it has 321 billion parameters with about
        18 billion active per token, and it mixes attention types: three
        linear-attention layers for every sparse-attention layer, which is
        how it reaches a million-token context without the memory cost of
        a million-token cache. It is MIT licensed, the plain version with
        no added clauses. Z.ai claims it beats GLM-5.2 across the board at
        a tenth of the API price; again, their numbers.
      </p>
      <p>
        The download count makes the argument we made about{" "}
        <Link href="/blog/qwen-3-8-27b-the-release-that-landed">Qwen 3.8</Link>{" "}
        last month, from a slightly different angle. The Flash has almost
        four times the downloads of the big model, and unsloth&apos;s GGUF
        conversion alone has close to a million. People are not waiting for
        the flagship; they are pulling the model whose size and licence let
        them do something with it.
      </p>
      <p>
        On memory it sits in the same class as{" "}
        <Link href="/blog/deepseek-v4-flash-0731-checkpoint-refresh">DeepSeek V4 Flash</Link>.
        unsloth&apos;s builds run from about 98 GB for UD-IQ1_M to 109 GB
        for UD-Q2_K_XL and 200 GB for UD-Q4_K_XL, so a 128 GB Mac or a
        workstation with that much unified or system memory can hold the
        2-bit build with some room for context.
      </p>

      <h2>Why it is not in the picker</h2>
      <p>
        The hybrid attention is new to llama.cpp. unsloth&apos;s own model
        card says to run the GGUF with their llama.cpp pull request or with
        Unsloth Desktop, which means that at the time of writing a stock
        llama.cpp release, Ollama and LM Studio will not load it. We list
        it in the <Link href="/models">model directory</Link> with the sizes
        above, and we will add it to the{" "}
        <Link href="/picker">picker</Link> when support lands in a
        llama.cpp release. Printing a command that depends on checking out
        an unmerged pull request would be setting people up to fail, and
        a pull request can change shape several times before it merges.
      </p>
      <p>
        If you have 128 GB and a taste for building from source, the path
        exists today and unsloth documents it. Everyone else should keep
        using what already works at their size: GLM-4.7-Flash on a 24 GB
        card, or DeepSeek V4 Flash on a 128 GB machine, both of which run
        on stock llama.cpp and are in the picker with verified files.
      </p>

      <h2>A naming habit worth resisting</h2>
      <p>
        Giving a post-trained refresh of an old base and a genuinely new
        architecture the same version number is Z.ai&apos;s choice, and
        benchmark aggregators will not always say which one they tested.
        When a chart says &ldquo;GLM-5.3&rdquo; and shows numbers that look
        too good for a 753B model you cannot run, or too modest for the
        flagship, check the repository name before you draw conclusions.
        On our pages the two are always named in full.
      </p>
    </article>
  );
}
