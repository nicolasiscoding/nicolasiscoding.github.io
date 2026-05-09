import Link from "next/link";
import type { Crumb } from "@/lib/breadcrumbs";

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumb-trail">
      <span className="crumb-dot" aria-hidden="true" />
      <ol>
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.path}>
              {isLast ? (
                <span aria-current="page" title={c.name}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.path === "/" ? "/" : `${c.path}/`} className="back">
                  {c.name}
                </Link>
              )}
              {!isLast && <span className="sep" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
