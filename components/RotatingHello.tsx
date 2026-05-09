"use client";

import { useEffect, useState } from "react";
import { HELLOS } from "@/lib/content";

export function RotatingHello() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % HELLOS.length);
        setShow(true);
      }, 280);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  const cur = HELLOS[i];
  const parts = cur.tpl.split("{h}");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-end",
        paddingBottom: 18,
        minWidth: 240,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(246,241,232,0.42)",
          transition: "opacity .25s",
          opacity: show ? 1 : 0,
        }}
      >
        {String(i + 1).padStart(2, "0")} /{" "}
        {String(HELLOS.length).padStart(2, "0")} · {cur.lang}
      </span>
      <span
        dir={cur.dir || "ltr"}
        style={{
          fontFamily: "var(--serif-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(36px, 4.6vw, 68px)",
          lineHeight: 1.05,
          letterSpacing: "-0.015em",
          color: "#f6f1e8",
          textAlign: "right",
          transition: "opacity .28s, transform .28s",
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(6px)",
        }}
      >
        {parts[0]}
        <em style={{ color: "var(--accent)", fontStyle: "italic" }}>{cur.h}</em>
        {parts[1]}.
      </span>
    </div>
  );
}
