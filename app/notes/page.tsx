import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  NOTES_BREADCRUMBS,
  generateBreadcrumbSchema,
} from "@/lib/breadcrumbs";
import { WRITING, type Note } from "@/lib/content";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/seo";

const TITLE = "Notes — All essays from Nicolas Fry";
const DESCRIPTION =
  "Every note from Nicolas Fry's archive — essays on building software, distribution, founder life, and the long slog of going from zero to one.";

export const metadata: Metadata = {
  title: "Notes",
  description: DESCRIPTION,
  keywords: [
    "Nicolas Fry notes",
    "Nicolas Fry essays",
    "Nicolas Fry writing",
    "founder essays",
    "building in public",
    "TurboDocx founder",
    "South Florida tech",
    "software engineering essays",
    "startup notes",
  ],
};

const FONTS = {
  display: "'Fraunces', 'Spectral', Georgia, serif",
  serif: "'Spectral', Georgia, serif",
};

const TOPICS = ["All", "Building", "Distribution", "Engineering", "South Florida", "Personal"];

function groupByYear(notes: Note[]): Record<string, Note[]> {
  return notes.reduce<Record<string, Note[]>>((acc, n) => {
    (acc[n.year] = acc[n.year] || []).push(n);
    return acc;
  }, {});
}

export default function NotesPage() {
  const grouped = groupByYear(WRITING);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const totalRead = Math.round(
    WRITING.reduce((s, n) => s + parseInt(n.read), 0) / WRITING.length,
  );
  const oldestYear = Math.min(...WRITING.map((n) => Number(n.year)));
  const topicCount = new Set(WRITING.map((n) => n.topic)).size;

  const breadcrumbSchema = generateBreadcrumbSchema(NOTES_BREADCRUMBS);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/notes`,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: WRITING.length,
      itemListElement: WRITING.map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/notes/${n.slug}`,
        name: n.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="topbar">
        <div className="topbar-inner">
          <Breadcrumb items={NOTES_BREADCRUMBS} />
          <nav>
            <Link href="/#about">About</Link>
            <Link href="/notes/" style={{ color: "var(--accent)" }}>
              Notes
            </Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "96px 48px 48px",
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
          <span>The archive · Filed quietly</span>
        </div>

        <h1
          style={{
            fontFamily: FONTS.display,
            fontWeight: 400,
            fontSize: "clamp(56px, 9vw, 144px)",
            lineHeight: 0.94,
            letterSpacing: "-0.025em",
            marginBottom: 32,
            textWrap: "balance",
          }}
        >
          All{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>notes</em>
          .
        </h1>

        <div
          className="standfirst"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 80,
            alignItems: "start",
            marginTop: 48,
            paddingTop: 48,
            borderTop: "1px solid var(--rule)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              fontFamily: "var(--mono)",
              fontSize: 12,
            }}
          >
            <Stat lbl="Total" val={String(WRITING.length)} />
            <Stat lbl="Since" val={String(oldestYear)} />
            <Stat lbl="Topics" val={String(topicCount)} />
            <Stat lbl="Avg. read" val={`${totalRead}m`} />
          </div>
          <p
            style={{
              fontFamily: FONTS.serif,
              fontSize: 21,
              lineHeight: 1.5,
              color: "var(--ink-soft)",
              maxWidth: 640,
              textWrap: "pretty",
            }}
          >
            Notes from the desk on building software, distribution, and the
            grind of building a company from zero. I publish when I have
            something worth saying — usually a few times a quarter, sometimes
            not for a while.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 48px 24px",
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          borderBottom: "1px solid var(--rule)",
          paddingBottom: 24,
        }}
      >
        <span>Filter ·</span>
        {TOPICS.map((t, i) => (
          <Chip key={t} label={t} active={i === 0} />
        ))}
        <span style={{ marginLeft: "auto" }}>Sort ·</span>
        <Chip label="Newest" active />
        <Chip label="Oldest" />
      </div>

      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "24px 48px 80px",
        }}
      >
        {years.map((y, yi) => (
          <section
            key={y}
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 60,
              padding: "56px 0",
              borderTop: yi === 0 ? "0" : "1px solid var(--rule)",
              paddingTop: yi === 0 ? 32 : 56,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.display,
                fontWeight: 300,
                fontSize: "clamp(44px, 5vw, 72px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                position: "sticky",
                top: 100,
                alignSelf: "start",
              }}
            >
              {y}
              <small
                style={{
                  display: "block",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                  marginTop: 12,
                  fontWeight: 500,
                }}
              >
                {grouped[y].length} {grouped[y].length === 1 ? "note" : "notes"}
              </small>
            </div>
            <div>
              {grouped[y].map((n) => (
                <Link key={n.slug} href={`/notes/${n.slug}/`} className="note-row">
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-mute)",
                    }}
                  >
                    {n.month}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: FONTS.display,
                        fontWeight: 500,
                        fontSize: "clamp(22px, 2.2vw, 30px)",
                        lineHeight: 1.18,
                        letterSpacing: "-0.012em",
                        marginBottom: 8,
                      }}
                    >
                      {n.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: FONTS.serif,
                        fontSize: 17,
                        color: "var(--ink-soft)",
                        lineHeight: 1.5,
                        maxWidth: 640,
                      }}
                    >
                      {n.blurb}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 10,
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                      }}
                    >
                      § {n.topic}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--ink-mute)",
                      textAlign: "right",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {n.read}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Signoff />
    </>
  );
}

function Stat({ lbl, val }: { lbl: string; val: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
          marginBottom: 6,
        }}
      >
        {lbl}
      </div>
      <div
        style={{
          fontFamily: "'Fraunces', 'Spectral', Georgia, serif",
          fontWeight: 400,
          fontSize: 36,
          color: "var(--accent)",
          lineHeight: 1,
        }}
      >
        {val}
      </div>
    </div>
  );
}

function Chip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      style={{
        padding: "6px 12px",
        border: "1px solid var(--rule)",
        borderRadius: 999,
        color: active ? "var(--bg)" : "var(--ink-soft)",
        background: active ? "var(--ink)" : "transparent",
        borderColor: active ? "var(--ink)" : "var(--rule)",
      }}
    >
      {label}
    </span>
  );
}

function Signoff() {
  return (
    <section
      style={{
        background: "var(--ink)",
        color: "var(--bg)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 48px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: 80,
          alignItems: "end",
        }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces', 'Spectral', Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(40px, 5vw, 72px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Say{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>hello</em>
          .
        </h2>
        <div
          style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <a href="https://x.com/NicolasBuilds" className="signoff-link">
            X / Twitter ↗
          </a>
          <a href="https://github.com/nicolasiscoding" className="signoff-link">
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/nicolasfry"
            className="signoff-link"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 48px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(246,241,232,0.4)",
          borderTop: "1px solid rgba(246,241,232,0.12)",
        }}
      >
        <span>© Nicolas Fry · {new Date().getFullYear()}</span>
        <span>South Florida · ~26.8°N ~80.1°W</span>
      </div>
    </section>
  );
}
