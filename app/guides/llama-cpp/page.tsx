import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Build and run llama.cpp from source",
  description:
    "How to compile llama.cpp with the right backend for your hardware, pick a GGUF quantization that fits your RAM, and serve an OpenAI-compatible endpoint."
};

export default function LlamaCppGuide() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 prose-content">
      <p className="text-sm font-medium text-brand-dark dark:text-brand-light tracking-wide uppercase mb-2">
        Install guide · Intermediate · 20 min
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Build and run llama.cpp from source
      </h1>

      <aside className="mt-5 rounded-md border border-amber-300/60 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">Heads up:</strong>{" "}
        this guide is for people who are comfortable with the command line
        and willing to compile software from source. If you just want to
        run AI locally without fuss, install{" "}
        <Link href="/guides/ollama">Ollama</Link> instead. Come back to
        this guide when you want maximum performance or the most recent
        features.
      </aside>

      <p className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        llama.cpp is the reference C and C++ implementation behind most local
        LLM tools, including Ollama and LM Studio. Building it from source gives
        you finer control over quantization, sampling, and which backend
        accelerator to use. It also tends to be the fastest path on Apple
        Silicon.
      </p>

      <h2>When to reach for llama.cpp directly</h2>
      <p>
        Use the upstream binaries when you want the latest performance work
        (recent releases are often weeks ahead of distribution packages), when
        you need a quantization scheme that downstream wrappers do not expose,
        or when you want to script a high-throughput inference workflow without
        an extra daemon. Casual chat needs do not justify the build step;
        Ollama exists for that.
      </p>

      <h2>Step 1. Install the build toolchain</h2>
      <h3>macOS</h3>
      <pre><code>{`xcode-select --install
brew install cmake`}</code></pre>
      <h3>Linux (Debian / Ubuntu)</h3>
      <pre><code>{`sudo apt update
sudo apt install build-essential cmake git
# For NVIDIA acceleration:
sudo apt install nvidia-cuda-toolkit`}</code></pre>
      <h3>Windows</h3>
      <p>
        Install Visual Studio Build Tools (with the C++ workload), CMake, and
        Git. The CUDA toolkit is optional but recommended on NVIDIA GPUs.
        Building from PowerShell is straightforward once these are on the path.
      </p>

      <h2>Step 2. Clone and build</h2>
      <pre><code>{`git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp

# Pick exactly one backend below.

# Apple Silicon (Metal):
cmake -B build -DGGML_METAL=ON
cmake --build build --config Release -j

# NVIDIA (CUDA):
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release -j

# AMD (ROCm):
cmake -B build -DGGML_HIP=ON -DAMDGPU_TARGETS=gfx1100
cmake --build build --config Release -j

# Vulkan (cross-vendor GPU, less mature):
cmake -B build -DGGML_VULKAN=ON
cmake --build build --config Release -j

# CPU-only:
cmake -B build
cmake --build build --config Release -j`}</code></pre>
      <p>
        The build produces several binaries in <code>build/bin/</code>. The
        two you will use most are <code>llama-cli</code> (interactive chat) and{" "}
        <code>llama-server</code> (the OpenAI-compatible HTTP server).
      </p>

      <h2>Step 3. Choose a GGUF quantization</h2>
      <p>
        llama.cpp uses the GGUF format. The quantization suffix you pick is the
        trade-off between disk footprint, memory use, and quality. Three are
        worth knowing about as starting points.
      </p>
      <ul>
        <li>
          <code>Q4_K_M</code> — the most common 4-bit variant. Good quality,
          small footprint, the sensible default for most desktop use.
        </li>
        <li>
          <code>Q5_K_M</code> — a noticeable quality bump over Q4 with about 25%
          more memory. Worth it when you have headroom.
        </li>
        <li>
          <code>Q8_0</code> — 8-bit quantization. Very close to the original
          weights in quality, useful for benchmarks or production where size is
          less of a constraint.
        </li>
      </ul>
      <p>
        Pre-quantized models live on Hugging Face under user accounts like{" "}
        <code>TheBloke</code>, <code>bartowski</code> and <code>unsloth</code>.
        Pick the GGUF file that matches your chosen quantization.
      </p>
      <pre><code>{`# Example: Qwen 2.5 7B Instruct, Q4_K_M
huggingface-cli download bartowski/Qwen2.5-7B-Instruct-GGUF \\
  Qwen2.5-7B-Instruct-Q4_K_M.gguf \\
  --local-dir ./models --local-dir-use-symlinks False`}</code></pre>

      <h2>Step 4. First inference</h2>
      <pre><code>{`./build/bin/llama-cli \\
  --model ./models/Qwen2.5-7B-Instruct-Q4_K_M.gguf \\
  --ctx-size 8192 \\
  --n-gpu-layers 999 \\
  --prompt "Explain how PagedAttention reduces KV cache memory."`}</code></pre>
      <p>
        The <code>--n-gpu-layers</code> flag offloads as many layers as fit on
        the GPU. Setting it to a large number is shorthand for &ldquo;everything
        you can.&rdquo; If you run out of VRAM, llama.cpp will refuse to load
        and tell you how many layers it managed; lower the number until it
        fits, or pick a smaller quantization.
      </p>

      <h2>Step 5. Serve an OpenAI-compatible API</h2>
      <pre><code>{`./build/bin/llama-server \\
  --model ./models/Qwen2.5-7B-Instruct-Q4_K_M.gguf \\
  --ctx-size 8192 \\
  --n-gpu-layers 999 \\
  --host 0.0.0.0 \\
  --port 8080 \\
  --parallel 4 \\
  --cont-batching`}</code></pre>
      <p>
        The server listens on <code>http://localhost:8080</code> with an
        OpenAI-compatible chat completions endpoint at{" "}
        <code>/v1/chat/completions</code>. <code>--parallel</code> sets how
        many concurrent requests it handles, and <code>--cont-batching</code>{" "}
        turns on continuous batching for higher throughput when more than one
        request is in flight.
      </p>

      <h2>Step 6. Quantize a model yourself</h2>
      <p>
        If you want to convert and quantize a fresh Hugging Face model, the
        flow is unambiguous but multi-step. Convert to GGUF first, then
        quantize.
      </p>
      <pre><code>{`# Convert from a Hugging Face snapshot to FP16 GGUF
python convert_hf_to_gguf.py ./snapshots/some-model \\
  --outfile ./models/some-model.f16.gguf \\
  --outtype f16

# Quantize to Q4_K_M
./build/bin/llama-quantize \\
  ./models/some-model.f16.gguf \\
  ./models/some-model.Q4_K_M.gguf \\
  Q4_K_M`}</code></pre>

      <h2>Troubleshooting common failures</h2>
      <h3>CUDA build fails with mismatched compiler</h3>
      <p>
        The CUDA toolkit is picky about which host compiler it accepts. On
        Ubuntu 24.04 with a recent CUDA version, you may need to install{" "}
        <code>g++-12</code> and point CMake at it explicitly:{" "}
        <code>cmake -B build -DGGML_CUDA=ON -DCMAKE_CUDA_HOST_COMPILER=g++-12</code>.
      </p>
      <h3>Server hangs on first request after restart</h3>
      <p>
        Almost always the model warm-up. The first generation after the model
        loads spends time building the KV cache. Subsequent requests are fast.
      </p>
      <h3>Tokens per second seem low for your GPU</h3>
      <p>
        Verify the GPU is actually being used (<code>nvidia-smi</code> on
        Linux). Check that <code>--n-gpu-layers</code> is high enough to keep
        the whole model on the GPU. Confirm flash attention is enabled in the
        server output banner.
      </p>

      <h2>Where to go next</h2>
      <p>
        With <code>llama-server</code> running, you can plug any
        OpenAI-compatible client into it. Pair it with <Link href="/tools">Open WebUI</Link>{" "}
        for a chat interface, or wire it into VS Code through Continue.dev.
        For multi-GPU or multi-tenant workloads, llama.cpp is not the right
        tool; reach for{" "}
        <Link href="/tools">vLLM</Link> instead.
      </p>
    </article>
  );
}
