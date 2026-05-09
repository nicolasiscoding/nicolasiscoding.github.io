import type { Metadata } from "next";
import "./globals.css";
import {
  AUTHOR,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nicolas Fry — Founder, TurboDocx · Writing from South Florida",
    template: "%s — Nicolas Fry",
  },
  description:
    "Nicolas Fry is a software engineer and founder building TurboDocx, writing notes from the South Florida coast on building, distribution, and the long slog of going from zero to one.",
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  alternates: { canonical: "/" },
  robots: DEFAULT_ROBOTS,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Nicolas Fry — Founder, TurboDocx · Writing from South Florida",
    description:
      "Software engineer and founder building TurboDocx, writing from the South Florida coast.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: AUTHOR.twitter,
    creator: AUTHOR.twitter,
    title: "Nicolas Fry — Founder, TurboDocx",
    description:
      "Software engineer and founder building TurboDocx, writing from South Florida.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    url: SITE_URL,
    jobTitle: "Founder, TurboDocx",
    description:
      "Software engineer and founder of TurboDocx, the AI-powered document automation platform. Writing from South Florida on building, distribution, and engineering craft.",
    image: `${SITE_URL}/opengraph-image.png`,
    sameAs: AUTHOR.sameAs,
    worksFor: {
      "@type": "Organization",
      name: "TurboDocx",
      url: "https://www.turbodocx.com",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "FL",
      addressCountry: "US",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "nicolasfry.com",
    url: SITE_URL,
    description:
      "Personal site of Nicolas Fry — founder of TurboDocx, writing from South Florida.",
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      name: AUTHOR.name,
      url: SITE_URL,
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Fraunces:opsz,ital,wght@9..144,0,300;9..144,0,400;9..144,0,500;9..144,1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
