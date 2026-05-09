import { SectionLabel } from "./SectionLabel";

const FONTS = {
  heading: "'Spectral', Georgia, serif",
};

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gap: 20,
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          color: "var(--ink-mute)",
          textTransform: "uppercase",
          fontSize: 11,
          letterSpacing: "0.12em",
        }}
      >
        {k}
      </span>
      <span style={{ color: "var(--ink)" }}>{v}</span>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "140px 48px 120px",
      }}
    >
      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          <SectionLabel n="01">About</SectionLabel>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              lineHeight: 1.9,
              color: "var(--ink-soft)",
              display: "grid",
              rowGap: 6,
            }}
          >
            <Row k="Now" v="Founder, TurboDocx" />
            <Row
              k="Before"
              v="Startups*, Okta/Auth0, Citrix, FlexShopper, UKG"
            />
            <Row
              k="Where"
              v="Somewhere between Palm Beach County and Miami-Dade"
            />
            <Row k="Writes" v="Notes, mostly on craft" />
            <Row
              k="Status"
              v={
                <span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#1f8a5b",
                      marginRight: 8,
                      verticalAlign: "middle",
                    }}
                  />
                  Heads down, building
                </span>
              }
            />
          </div>
        </div>

        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: "clamp(22px, 2vw, 28px)",
            lineHeight: 1.45,
            color: "var(--ink)",
            fontWeight: 400,
            maxWidth: 720,
          }}
        >
          <p style={{ marginBottom: 24, textWrap: "pretty" }}>
            By craft, I&apos;m a software engineer. By trade, I help bridge
            enterprise software and the people stuck using it. By practice,
            I&apos;m a technology enthusiast.
          </p>
          <p
            style={{
              marginBottom: 24,
              color: "var(--ink-soft)",
              fontSize: "0.84em",
              textWrap: "pretty",
            }}
          >
            For the last few years I&apos;ve been building{" "}
            <em style={{ color: "var(--accent)" }}>TurboDocx</em> — a document
            automation platform for teams that ship a lot of paper,
            presentations, and signatures.
          </p>
          <p
            style={{
              marginBottom: 24,
              color: "var(--ink-soft)",
              fontSize: "0.84em",
              textWrap: "pretty",
            }}
          >
            Before that, I spent a long stretch across startups* and
            enterprise software, working at Okta/Auth0, Citrix, FlexShopper,
            and UKG. I wore most of the customer-facing engineering hats
            along the way: presales, forward-deployed engineering,
            professional services, and plenty of building things myself.
          </p>
          <p
            style={{
              marginBottom: 24,
              color: "var(--ink-mute)",
              fontSize: "0.7em",
              textWrap: "pretty",
              fontStyle: "italic",
            }}
          >
            * I&apos;ll spare you the details.
          </p>
          <p
            style={{
              marginBottom: 24,
              color: "var(--ink-soft)",
              fontSize: "0.84em",
              textWrap: "pretty",
            }}
          >
            I write occasionally about building, distribution, and the grind
            of turning a side project into a company.
          </p>
          <p
            style={{
              color: "var(--ink-mute)",
              fontSize: "0.78em",
              fontStyle: "italic",
              textWrap: "pretty",
            }}
          >
            If our paths overlap — say hello.
          </p>
        </div>
      </div>
    </section>
  );
}
