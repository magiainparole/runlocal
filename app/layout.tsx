import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "RunLocal — Run AI on your own computer",
    template: "%s · RunLocal"
  },
  description:
    "Run AI on your own laptop or desktop. We help you find the right model for your hardware, install free software, and get started in ten minutes. No prior knowledge required.",
  metadataBase: new URL("https://runlocal.dev"),
  openGraph: {
    title: "RunLocal — Run AI on your own computer",
    description:
      "Find the right AI model for your hardware. Install in ten minutes. No data leaves your computer.",
    type: "website",
    url: "https://runlocal.dev"
  },
  twitter: {
    card: "summary_large_image",
    title: "RunLocal — Run AI on your own computer",
    description:
      "Find the right AI model for your hardware. Install in ten minutes. No data leaves your computer."
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
