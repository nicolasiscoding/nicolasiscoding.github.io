// Runs the @turbodocx/next-plugin-llms generator at prebuild time.
//
// Why a script (not next.config.ts)? The plugin hooks into Webpack — Next 16's
// Turbopack-based build doesn't fire those hooks, so we call the exported
// generateLLMFiles() directly here.
//
// What's new in this build: the plugin's `dynamicRoutes` option (added in
// the fix/css-extraction-and-dynamic-routes branch) expands /notes/[slug]
// into one literal /notes/<slug>.html.md per entry — no more broken :slug
// templates and no more JSX/CSS-leaked content.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateLLMFiles } from "@turbodocx/next-plugin-llms";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const notes = JSON.parse(
  readFileSync(resolve(root, "lib/notes.json"), "utf8"),
);

await generateLLMFiles({
  enabled: true,
  generateLLMsTxt: true,
  generateLLMsFullTxt: true,
  generatePerPageMarkdown: true,
  appDir: "app",
  outputType: "route-handler",

  title: "Nicolas Fry",
  description:
    "Software engineer and founder building TurboDocx, writing from the South Florida coast on building, distribution, and engineering craft.",
  siteUrl: "https://nicolasfry.com",

  sources: [
    {
      section: "Notes",
      pattern: "app/notes/**",
      priority: "high",
      description: "Essays from the archive",
    },
  ],

  customSections: [
    {
      title: "Elsewhere",
      description: "Other places you'll find me online",
      items: [
        {
          title: "TurboDocx",
          url: "https://www.turbodocx.com",
          description: "AI-powered document automation platform I'm building",
        },
        { title: "GitHub", url: "https://github.com/nicolasiscoding" },
        { title: "X / Twitter", url: "https://x.com/NicolasBuilds" },
        { title: "LinkedIn", url: "https://www.linkedin.com/in/nicolasfry" },
      ],
    },
  ],

  // Expand notes/[slug] into one literal route per note.
  // Falls back to extracting body from the page template if `content` omitted —
  // for now the bodies are still placeholders, so emit a clean stub per slug.
  dynamicRoutes: {
    "notes/[slug]": notes.map((n) => ({
      params: { slug: n.slug },
      title: n.title,
      description: n.blurb,
      content: [
        `*Filed ${n.date} · ${n.read} · ${n.topic}*`,
        "",
        "_Full content lands soon. Until then, this is a placeholder",
        "generated from the note's title, blurb, and metadata._",
      ].join("\n"),
    })),
  },

  excludePatterns: ["**/admin/**", "**/internal/**"],

  contentOptions: {
    stripJsx: true,
    preserveMarkdown: true,
    maxContentLength: 50000,
  },
});
