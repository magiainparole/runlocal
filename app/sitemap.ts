import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { posts } from "@/lib/posts";

const BASE_URL = "https://runlocal.blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/picker`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/models`,   lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/frontier`, lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/trending`, lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/tools`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/opensuse`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`,     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.6 }
  ];

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticRoutes, ...guideRoutes, ...postRoutes];
}
