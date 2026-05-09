import { Typewriter } from "./Typewriter";
import { TurboDocxLink } from "./TurboDocxLink";
import { TYPEWRITER_LINES } from "@/lib/content";

const FONTS = {
  display: "'Fraunces', 'Spectral', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
};

export function Hero() {
  const overlay =
    "linear-gradient(180deg, rgba(15,12,8,0.45) 0%, rgba(15,12,8,0.30) 35%, rgba(15,12,8,0.55) 75%, rgba(15,12,8,0.85) 100%)";

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="/palm-beach-gardens.png"
          alt="Palm Beach Gardens at golden hour"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: overlay,
            pointerEvents: "none",
          }}
        />
      </div>

      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          padding: "28px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#f6f1e8",
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.08em",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
            }}
          />
          <span style={{ textTransform: "uppercase" }}>Nicolas Fry</span>
        </div>
        <nav style={{ display: "flex", gap: 28, textTransform: "uppercase" }}>
          <a href="#about" style={{ opacity: 0.85 }}>
            About
          </a>
          <a href="#writing" style={{ opacity: 0.85 }}>
            Writing
          </a>
          <a href="#contact" style={{ opacity: 0.85 }}>
            Contact
          </a>
        </nav>
      </header>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 48px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "clamp(120px, 18vh, 220px)",
          paddingBottom: 80,
          color: "#f6f1e8",
        }}
      >
        <div style={{ maxWidth: 920 }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(246,241,232,0.65)",
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ width: 24, height: 1, background: "var(--accent)" }} />
            <span>South Florida · ~26.8°N ~80.1°W</span>
          </div>

          <h1
            style={{
              fontFamily: FONTS.display,
              fontWeight: 400,
              fontSize: "clamp(56px, 9vw, 144px)",
              lineHeight: 0.94,
              letterSpacing: "-0.025em",
              marginBottom: 28,
              textShadow:
                "0 2px 24px rgba(10,8,4,0.45), 0 1px 2px rgba(10,8,4,0.35)",
            }}
          >
            Hey, I&apos;m{" "}
            <em
              style={{
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 400,
                color: "#ffd9b8",
                textShadow:
                  "0 2px 28px rgba(10,8,4,0.55), 0 1px 3px rgba(10,8,4,0.5)",
              }}
            >
              Nicolas
            </em>
            .
          </h1>

          <p
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(20px, 2.2vw, 30px)",
              lineHeight: 1.35,
              fontWeight: 400,
              marginBottom: 36,
              color: "#f6f1e8",
              maxWidth: 760,
            }}
          >
            <span style={{ color: "rgba(246,241,232,0.7)" }}>I&apos;m </span>
            <Typewriter lines={TYPEWRITER_LINES} />
          </p>

          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 17,
              lineHeight: 1.55,
              maxWidth: 560,
              color: "rgba(246,241,232,0.7)",
              marginBottom: 44,
            }}
          >
            Software engineer by craft, founder by trade, technology enthusiast
            by practice. Currently building <TurboDocxLink /> and writing from
            the Florida coast.
          </p>

          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              flexWrap: "wrap",
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <a
              href="https://x.com/NicolasBuilds"
              className="hero-link"
              style={{
                color: "#f6f1e8",
                borderBottom: "1px solid rgba(246,241,232,0.4)",
                paddingBottom: 3,
              }}
            >
              X / Twitter ↗
            </a>
            <a
              href="https://github.com/nicolasiscoding"
              className="hero-link"
              style={{
                color: "#f6f1e8",
                borderBottom: "1px solid rgba(246,241,232,0.4)",
                paddingBottom: 3,
              }}
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/nicolasfry"
              className="hero-link"
              style={{
                color: "#f6f1e8",
                borderBottom: "1px solid rgba(246,241,232,0.4)",
                paddingBottom: 3,
              }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 48,
            bottom: 36,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(246,241,232,0.55)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            writingMode: "vertical-rl",
          }}
        >
          <span>scroll</span>
          <span
            style={{
              width: 1,
              height: 48,
              background: "currentColor",
              opacity: 0.5,
            }}
          />
        </div>
      </div>
    </section>
  );
}
