import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { WRITING, publishedAt, updatedAt } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/notes/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...WRITING.map((n) => ({
      url: `${SITE_URL}/notes/${n.slug}/`,
      lastModified: updatedAt(n) || publishedAt(n),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
