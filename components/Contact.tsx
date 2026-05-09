import { RotatingHello } from "./RotatingHello";
import { SOCIAL } from "@/lib/content";

const FONTS = {
  display: "'Fraunces', 'Spectral', Georgia, serif",
};

function ContactBlock({
  label,
  val,
  href,
}: {
  label: string;
  val: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="contact-block"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        color: "inherit",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(246,241,232,0.5)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 24,
          transition: "color .2s",
        }}
      >
        {val}
      </span>
    </a>
  );
}

export function Contact() {
  const blocks = [
    { label: "X", val: "@NicolasBuilds", href: SOCIAL[0].href },
    { label: "GitHub", val: "nicolasiscoding", href: SOCIAL[1].href },
    { label: "LinkedIn", val: "in/nicolasfry", href: SOCIAL[2].href },
  ];

  return (
    <section
      id="contact"
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
          padding: "140px 48px 60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(246,241,232,0.5)",
            marginBottom: 32,
            paddingBottom: 14,
            borderBottom: "1px solid rgba(246,241,232,0.12)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>§ 03</span>
          <span>Contact</span>
        </div>

        <div
          className="contact-headline"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 48,
            marginBottom: 64,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(64px, 10vw, 168px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              maxWidth: 900,
              textWrap: "balance",
              margin: 0,
            }}
          >
            Say{" "}
            <em
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              hello
            </em>
            .
          </h2>
          <RotatingHello />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(246,241,232,0.12)",
          }}
        >
          {blocks.map((b) => (
            <ContactBlock key={b.label} {...b} />
          ))}
        </div>

        <div
          style={{
            marginTop: 120,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(246,241,232,0.4)",
            paddingTop: 24,
            borderTop: "1px solid rgba(246,241,232,0.12)",
          }}
        >
          <span>© Nicolas Fry · {new Date().getFullYear()}</span>
          <span>Made between South Florida & the Atlantic</span>
        </div>
      </div>
    </section>
  );
}
