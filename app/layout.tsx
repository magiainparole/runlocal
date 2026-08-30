import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { lastUpdatedIso } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: {
    default: "RunLocal — Local AI: run open source models on your own hardware",
    template: "%s · RunLocal"
  },
  description:
    "Local AI made simple. RunLocal helps you pick the right open source AI model for your laptop or desktop, install free software like Ollama or LM Studio, and run large language models on your own hardware. No tracking, no cloud, no expertise required.",
  keywords: [
    "local AI",
    "open source AI",
    "run LLM locally",
    "Ollama",
    "llama.cpp",
    "LM Studio",
    "GGUF",
    "open weight models",
    "local LLM",
    "private AI",
    "self-hosted AI"
  ],
  authors: [{ name: "RunLocal" }],
  metadataBase: new URL("https://runlocal.blog"),
  alternates: {
    canonical: "https://runlocal.blog"
  },
  openGraph: {
    title: "RunLocal — Local AI on your own hardware",
    description:
      "Pick the right open source AI model for your computer. Install in ten minutes with Ollama or LM Studio. Nothing leaves your machine.",
    type: "website",
    url: "https://runlocal.blog",
    siteName: "RunLocal"
  },
  twitter: {
    card: "summary_large_image",
    title: "RunLocal — Local AI on your own hardware",
    description:
      "Pick the right open source AI model for your computer. Install in ten minutes with Ollama or LM Studio. Nothing leaves your machine."
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RunLocal",
  url: "https://runlocal.blog",
  description:
    "Local AI made simple. Pick the right open source AI model for your laptop or desktop, install free software like Ollama or LM Studio, and run large language models on your own hardware.",
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "RunLocal"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-ink text-ink dark:text-slate-200">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer lastUpdatedIso={lastUpdatedIso} />
      </body>
    </html>
  );
}
