import type { Metadata } from "next";

export const SITE_URL = "https://nicolasfry.com";
export const SITE_NAME = "Nicolas Fry";
export const AUTHOR = {
  name: "Nicolas Fry",
  twitter: "@NicolasBuilds",
  url: SITE_URL,
  sameAs: [
    "https://x.com/NicolasBuilds",
    "https://github.com/nicolasiscoding",
    "https://www.linkedin.com/in/nicolasfry",
  ],
};

export const SITE_KEYWORDS = [
  "Nicolas Fry",
  "TurboDocx",
  "founder",
  "software engineer",
  "South Florida",
  "Palm Beach",
  "document automation",
  "writing",
  "essays",
  "building in public",
];

export const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Nicolas Fry — building TurboDocx, writing from South Florida",
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
