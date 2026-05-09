import Link from "next/link";
import { SectionLabel } from "./SectionLabel";
import { WRITING } from "@/lib/content";

const FONTS = {
  heading: "'Spectral', Georgia, serif",
};

export function Writing() {
  const items = WRITING.slice(0, 5);

  return (
    <section
      id="writing"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "140px 48px 120px",
      }}
    >
      <SectionLabel n="02">Writing</SectionLabel>

      <div
        className="writing-intro"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.8fr)",
          gap: 80,
          marginBottom: 64,
        }}
      >
        <h2
          style={{
            fontFamily: FONTS.heading,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          Notes from the{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>desk</em>.
        </h2>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: 19,
            lineHeight: 1.55,
            color: "var(--ink-soft)",
            maxWidth: 560,
            alignSelf: "end",
            textWrap: "pretty",
          }}
        >
          Notes, mostly on building software, distribution, and the long slog
          of building a company from zero. I publish when I have something
          worth saying.
        </p>
      </div>

      <ol style={{ listStyle: "none" }}>
        {items.map((p, i) => (
          <li
            key={p.slug}
            style={{
              borderTop: "1px solid var(--rule)",
              borderBottom:
                i === items.length - 1 ? "1px solid var(--rule)" : "none",
            }}
          >
            <Link href={`/notes/${p.slug}/`} className="writing-row">
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  color: "var(--ink-mute)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {p.date}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: FONTS.heading,
                    fontSize: "clamp(24px, 2.4vw, 34px)",
                    lineHeight: 1.15,
                    fontWeight: 500,
                    marginBottom: 8,
                    letterSpacing: "-0.012em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 18,
                    color: "var(--ink-soft)",
                    lineHeight: 1.5,
                    maxWidth: 620,
                  }}
                >
                  {p.blurb}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--ink-mute)",
                  textAlign: "right",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {p.read}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div style={{ marginTop: 48 }}>
        <Link href="/notes/" className="arrow-link">
          <span>All notes</span>
          <span style={{ display: "inline-block" }}>↗</span>
        </Link>
      </div>
    </section>
  );
}
