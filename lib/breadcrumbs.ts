import { SITE_URL } from "./seo";

export type Crumb = { name: string; path: string };

export function generateBreadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function noteBreadcrumbs(title: string, slug: string): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Notes", path: "/notes" },
    { name: title, path: `/notes/${slug}` },
  ];
}

export const NOTES_BREADCRUMBS: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Notes", path: "/notes" },
];
