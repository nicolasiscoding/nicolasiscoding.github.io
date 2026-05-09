import { generateLLMFiles } from "@turbodocx/next-plugin-llms";

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

  excludePatterns: ["**/admin/**", "**/internal/**"],

  contentOptions: {
    stripJsx: true,
    preserveMarkdown: true,
    maxContentLength: 50000,
  },
});
