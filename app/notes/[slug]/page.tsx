import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  WRITING,
  noteKeywords,
  publishedAt,
  updatedAt,
} from "@/lib/content";
import {
  AUTHOR,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  generateBreadcrumbSchema,
  noteBreadcrumbs,
} from "@/lib/breadcrumbs";

const FONTS = {
  display: "'Fraunces', 'Spectral', Georgia, serif",
  serif: "'Spectral', Georgia, serif",
};

export function generateStaticParams() {
  return WRITING.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = WRITING.find((n) => n.slug === slug);
  if (!note) return {};

  const url = `${SITE_URL}/notes/${note.slug}`;
  const published = publishedAt(note);
  const modified = updatedAt(note);

  return {
    title: note.title,
    description: note.blurb,
    keywords: noteKeywords(note),
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    creator: AUTHOR.name,
    publisher: AUTHOR.name,
    alternates: { canonical: `/notes/${note.slug}` },
    robots: DEFAULT_ROBOTS,
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: note.title,
      description: note.blurb,
      publishedTime: published,
      modifiedTime: modified,
      authors: [AUTHOR.url],
      tags: [note.topic, "Nicolas Fry", "TurboDocx"],
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: AUTHOR.twitter,
      creator: AUTHOR.twitter,
      title: note.title,
      description: note.blurb,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = WRITING.findIndex((n) => n.slug === slug);
  if (idx < 0) return notFound();
  const note = WRITING[idx];
  const others = WRITING.filter((_, i) => i !== idx).slice(0, 2);
  const noteNumber = String(WRITING.length - idx).padStart(3, "0");

  const url = `${SITE_URL}/notes/${note.slug}`;
  const published = publishedAt(note);
  const modified = updatedAt(note);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.blurb,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: published,
    dateModified: modified,
    inLanguage: "en-US",
    keywords: noteKeywords(note).join(", "),
    articleSection: note.topic,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
      sameAs: AUTHOR.sameAs,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    image: `${SITE_URL}/opengraph-image.png`,
  };

  const breadcrumbSchema = generateBreadcrumbSchema(
    noteBreadcrumbs(note.title, note.slug),
  );

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="topbar">
        <div className="topbar-inner">
          <Breadcrumb items={noteBreadcrumbs(note.title, note.slug)} />
          <nav>
            <Link href="/#about">About</Link>
            <Link href="/#writing">Writing</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "96px 48px 0",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <span style={{ width: 24, height: 1, background: "var(--accent)" }} />
          <span>
            Note №&nbsp;{noteNumber} · {note.topic}
          </span>
        </div>

        <h1
          style={{
            fontFamily: FONTS.display,
            fontWeight: 400,
            fontSize: "clamp(44px, 6.5vw, 96px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            marginBottom: 32,
            textWrap: "balance",
            maxWidth: 1100,
          }}
        >
          {note.title}
        </h1>

        <p
          style={{
            fontFamily: FONTS.serif,
            fontSize: "clamp(20px, 2vw, 26px)",
            lineHeight: 1.45,
            color: "var(--ink-soft)",
            maxWidth: 720,
            marginBottom: 48,
            textWrap: "pretty",
          }}
        >
          {note.blurb}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 40,
            marginBottom: 48,
            paddingBottom: 32,
            borderBottom: "1px solid var(--rule)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}
        >
          <div>
            <div style={{ color: "var(--ink-mute)", marginBottom: 6, fontSize: 10 }}>
              Filed
            </div>
            <div style={{ color: "var(--ink)", fontFamily: "var(--mono)", fontSize: 12 }}>
              {note.date}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
            }}
          >
            <Meta lbl="Reading" val={note.read} />
            <Meta lbl="Topic" val={note.topic} />
            <Meta lbl="Status" val="Published" />
            <Meta lbl="Author" val="Nicolas" />
          </div>
        </div>

        <div
          className="article-body"
          style={{
            display: "grid",
            gridTemplateColumns: "200px minmax(0, 680px) 1fr",
            gap: 60,
            paddingTop: 24,
            paddingBottom: 120,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <aside
            style={{
              position: "sticky",
              top: 92,
              alignSelf: "start",
              fontFamily: "var(--mono)",
              fontSize: 11,
              lineHeight: 1.9,
              color: "var(--ink-mute)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--ink-mute)",
                marginBottom: 12,
                paddingBottom: 8,
                borderBottom: "1px solid var(--rule)",
              }}
            >
              Contents
            </div>
            <ol
              style={{
                listStyle: "none",
                display: "grid",
                gap: 6,
                counterReset: "tocc",
              }}
            >
              {[
                { id: "i", label: "The premise" },
                { id: "ii", label: "Friction is the feature" },
                { id: "iii", label: "A short list of trade-offs" },
                { id: "iv", label: "What I'd do differently" },
              ].map((s, i) => (
                <li
                  key={s.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "22px 1fr",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="prose" style={{ fontFamily: FONTS.serif, fontSize: 19, lineHeight: 1.65 }}>
            <H2 id="i" num="01 · The premise">
              Why a public changelog
            </H2>
            <p style={{ marginBottom: 22, textWrap: "pretty" }}>
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "4.6em",
                  lineHeight: 0.86,
                  float: "left",
                  padding: "8px 12px 0 0",
                  color: "var(--accent)",
                  fontWeight: 400,
                }}
              >
                T
              </span>
              his is the sample body for the note template. The real essay
              would go here — drafted in plain prose, footnoted where useful,
              and broken up with section headings and the occasional code
              block or pull quote. The drop cap, the typography, and the
              measure are all calibrated for long-form reading.
            </p>
            <p style={{ marginBottom: 22, textWrap: "pretty" }}>
              <a className="inline" href="#">
                Inline links
              </a>{" "}
              get a thin underline in the accent color and a soft background
              wash on hover. <strong style={{ fontWeight: 600, color: "var(--ink)" }}>Bold runs</strong>{" "}
              get a heavier weight and the full ink color, used sparingly so
              they keep their punch
              <sup
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--accent)",
                  padding: "0 2px",
                }}
              >
                1
              </sup>
              .
            </p>

            <blockquote
              style={{
                margin: "40px 0 40px -20px",
                padding: "4px 0 4px 24px",
                borderLeft: "2px solid var(--accent)",
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontSize: "1.25em",
                lineHeight: 1.4,
                color: "var(--ink)",
              }}
            >
              A pull quote sits flush against the left rule, in the display
              face, italicized — the kind of line that earns its real estate.
              <cite
                style={{
                  display: "block",
                  marginTop: 14,
                  fontFamily: "var(--mono)",
                  fontStyle: "normal",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                }}
              >
                — Anonymous, almost
              </cite>
            </blockquote>

            <H2 id="ii" num="02 · The middle">
              Friction is the feature
            </H2>
            <p style={{ marginBottom: 22, textWrap: "pretty" }}>
              The middle of an essay does the work the headline can&apos;t.
              It&apos;s where claims earn their footnotes and ideas pick up
              receipts. Code, when it shows up, is set in a contrasting block
              so it can breathe.
            </p>

            <pre
              style={{
                margin: "28px 0",
                padding: "24px 28px",
                background: "var(--ink)",
                color: "#f6f1e8",
                borderRadius: 4,
                fontFamily: "var(--mono)",
                fontSize: 13,
                lineHeight: 1.6,
                overflowX: "auto",
              }}
            >
              <span style={{ color: "rgba(246,241,232,0.45)" }}>
                {"// shipping log, condensed"}
              </span>
              {"\n"}
              <span style={{ color: "oklch(0.78 0.13 60)" }}>const</span>{" "}
              ship = (note) {"=> {"}
              {"\n  "}publish(note, {"{ audience: "}
              <span style={{ color: "oklch(0.82 0.12 140)" }}>
                {"'everyone'"}
              </span>
              {" }"});{"\n  "}
              <span style={{ color: "oklch(0.78 0.13 60)" }}>return</span>{" "}
              learn(note);{"\n}"}
            </pre>

            <div
              style={{
                margin: "60px 0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                padding: "32px 0",
                borderTop: "1px solid var(--rule)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <PullStat num="42×" lbl="Times I almost didn't ship" />
              <PullStat num="~3 hrs" lbl="Per public update, average" />
            </div>

            <H2 id="iii" num="03 · The trade-offs">
              A short list
            </H2>
            <p style={{ marginBottom: 22, textWrap: "pretty" }}>
              Trade-offs go here. Each note has its own. The point is that
              the template gives every essay the same calm, considered shell
              — so the writing is what stands out, not the chrome around
              it.
            </p>

            <hr
              style={{
                margin: "56px auto",
                width: 80,
                height: 1,
                border: 0,
                background: "var(--rule)",
              }}
            />

            <H2 id="iv" num="04 · The takeaway">
              What I&apos;d do differently
            </H2>
            <p style={{ marginBottom: 22, textWrap: "pretty" }}>
              The takeaway lands here. Short, honest, and without the
              hindsight gloss. If a note can&apos;t fit a takeaway in two
              paragraphs, it probably wants to be two notes.
            </p>

            <div
              style={{
                marginTop: 56,
                paddingTop: 24,
                borderTop: "1px solid var(--rule)",
                fontFamily: FONTS.serif,
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--ink-soft)",
              }}
            >
              <ol style={{ counterReset: "fn", listStyle: "none" }}>
                <li
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px 1fr",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      color: "var(--accent)",
                      fontSize: 12,
                      paddingTop: 2,
                    }}
                  >
                    1
                  </span>
                  <span>
                    A real footnote would go here — citations, asides, or
                    the link that didn&apos;t belong in the body.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "24px 48px 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
          <span>Filed {note.date}</span>
          <em
            style={{
              fontFamily: FONTS.display,
              fontStyle: "italic",
              fontSize: 15,
              letterSpacing: 0,
              textTransform: "none",
              color: "var(--ink)",
            }}
          >
            — Nicolas
          </em>
        </div>
        <div>South Florida · ~26.8°N ~80.1°W</div>
      </div>

      <section
        style={{
          background: "var(--bg-soft)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "80px 48px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
              marginBottom: 32,
              paddingBottom: 14,
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <span style={{ color: "var(--accent)" }}>§ 05</span>
            &nbsp;&nbsp; Read next
          </h3>
          <div
            className="nr-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
            }}
          >
            {others.map((n) => (
              <Link key={n.slug} href={`/notes/${n.slug}/`} className="nr-card">
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-mute)",
                  }}
                >
                  {n.date}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: FONTS.display,
                      fontWeight: 500,
                      fontSize: 26,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    {n.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 16,
                      color: "var(--ink-soft)",
                      maxWidth: 480,
                    }}
                  >
                    {n.blurb}
                  </p>
                </div>
              </Link>
            ))}
            <Link href="/notes/" className="nr-arrow">
              All notes ↗
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function H2({
  id,
  num,
  children,
}: {
  id: string;
  num: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      style={{
        fontFamily: FONTS.display,
        fontWeight: 400,
        fontSize: "clamp(28px, 3vw, 40px)",
        lineHeight: 1.15,
        letterSpacing: "-0.015em",
        margin: "56px 0 20px",
      }}
    >
      <span
        style={{
          display: "block",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 10,
        }}
      >
        § {num}
      </span>
      {children}
    </h2>
  );
}

function Meta({ lbl, val }: { lbl: string; val: string }) {
  return (
    <div>
      <div style={{ color: "var(--ink-mute)", marginBottom: 6, fontSize: 10 }}>
        {lbl}
      </div>
      <div
        style={{
          color: "var(--ink)",
          fontFamily: "var(--mono)",
          fontSize: 12,
        }}
      >
        {val}
      </div>
    </div>
  );
}

function PullStat({ num, lbl }: { num: string; lbl: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          fontFamily: FONTS.display,
          fontWeight: 300,
          fontSize: "clamp(48px, 6vw, 88px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--accent)",
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}
      >
        {lbl}
      </div>
    </div>
  );
}
