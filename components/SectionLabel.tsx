export function SectionLabel({
  n,
  children,
}: {
  n: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink-mute)",
        marginBottom: 32,
        paddingBottom: 14,
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <span style={{ color: "var(--accent)" }}>§ {n}</span>
      <span>{children}</span>
    </div>
  );
}
