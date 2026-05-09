import type { Metadata } from "next";
import {
  AUTHOR,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const URL = `${SITE_URL}/notes`;
const DESCRIPTION =
  "Every note from Nicolas Fry's archive — essays on building software, distribution, founder life, and the long slog of going from zero to one.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  alternates: { canonical: "/notes" },
  robots: DEFAULT_ROBOTS,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: URL,
    siteName: SITE_NAME,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: AUTHOR.twitter,
    creator: AUTHOR.twitter,
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
