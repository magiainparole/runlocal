import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "RunLocal — Open Source AI, in your hands",
    template: "%s · RunLocal"
  },
  description:
    "A practical hub for open source AI: models you can run locally, the tools to run them, hands-on install guides, and editorial analysis of the ecosystem.",
  metadataBase: new URL("https://runlocal.dev"),
  openGraph: {
    title: "RunLocal — Open Source AI, in your hands",
    description:
      "Models, tools, install guides and analysis for running AI on your own hardware.",
    type: "website",
    url: "https://runlocal.dev"
  },
  twitter: {
    card: "summary_large_image",
    title: "RunLocal — Open Source AI, in your hands",
    description:
      "Models, tools, install guides and analysis for running AI on your own hardware."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white dark:bg-ink text-ink dark:text-slate-200">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
