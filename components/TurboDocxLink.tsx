import type { CSSProperties, ReactNode } from "react";

const BASE_STYLE: CSSProperties = {
  color: "inherit",
  borderBottom: "1px solid currentColor",
  borderColor: "color-mix(in oklch, currentColor 35%, transparent)",
  paddingBottom: 1,
  transition: "color 0.2s, border-color 0.2s",
};

export function TurboDocxLink({
  children = "TurboDocx",
  style,
  className,
}: {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <a
      href="https://www.turbodocx.com"
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "td-link"}
      style={{ ...BASE_STYLE, ...style }}
    >
      {children}
    </a>
  );
}
