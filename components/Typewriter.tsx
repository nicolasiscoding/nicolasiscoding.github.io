"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  speed?: number;
  pause?: number;
};

export function Typewriter({ lines, speed = 55, pause = 1400 }: Props) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [phase, setPhase] = useState<"typing" | "erasing">("typing");

  useEffect(() => {
    const cur = lines[i];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (txt.length < cur.length) {
        t = setTimeout(
          () => setTxt(cur.slice(0, txt.length + 1)),
          speed + Math.random() * 30,
        );
      } else {
        t = setTimeout(() => setPhase("erasing"), pause);
      }
    } else {
      if (txt.length > 0) {
        t = setTimeout(() => setTxt(cur.slice(0, txt.length - 1)), speed / 2);
      } else {
        setPhase("typing");
        setI((i + 1) % lines.length);
        return;
      }
    }
    return () => clearTimeout(t);
  }, [txt, phase, i, lines, speed, pause]);

  return (
    <span>
      <span>{txt}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.55ch",
          marginLeft: 2,
          background: "var(--accent)",
          height: "0.95em",
          verticalAlign: "-0.12em",
          animation: "tw-blink 1s steps(1) infinite",
        }}
      />
    </span>
  );
}
