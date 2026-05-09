export const TYPEWRITER_LINES = [
  "Building TurboDocx.",
  "Writing from South Florida.",
  "Tinkering, mostly.",
];

export type Note = {
  slug: string;
  date: string; // "Apr 2026"
  month: string; // "Apr"
  year: string; // "2026"
  title: string;
  blurb: string;
  read: string;
  topic: string;
};

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

export function publishedAt(note: Note): string {
  const m = MONTH_INDEX[note.month] ?? 0;
  return new Date(Date.UTC(Number(note.year), m, 1)).toISOString();
}

export function updatedAt(note: Note): string {
  // Same as publishedAt until the note has actually been edited post-publish.
  return publishedAt(note);
}

export function noteKeywords(note: Note): string[] {
  const titleWords = note.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);
  return Array.from(
    new Set([
      note.topic.toLowerCase(),
      "nicolas fry",
      "turbodocx",
      "south florida",
      "founder",
      "software engineering",
      ...titleWords.slice(0, 6),
    ]),
  );
}

export const WRITING: Note[] = [
  {
    slug: "notes-on-building-in-the-open",
    date: "Apr 2026",
    month: "Apr",
    year: "2026",
    title: "Notes on building in the open",
    blurb: "Why I keep a public changelog, and what it has cost me.",
    read: "6 min",
    topic: "Building",
  },
  {
    slug: "the-distribution-problem",
    date: "Mar 2026",
    month: "Mar",
    year: "2026",
    title: "The distribution problem nobody warned me about",
    blurb:
      "Shipping is the easy part. Getting the right people to notice it is the actual job.",
    read: "8 min",
    topic: "Distribution",
  },
  {
    slug: "a-year-of-turbodocx-in-numbers",
    date: "Feb 2026",
    month: "Feb",
    year: "2026",
    title: "A year of TurboDocx, in numbers",
    blurb: "The dashboard I wish someone had handed me on day one.",
    read: "9 min",
    topic: "Building",
  },
  {
    slug: "what-i-want-from-2026",
    date: "Jan 2026",
    month: "Jan",
    year: "2026",
    title: "What I want from 2026",
    blurb: "A short list. Mostly about saying no to more things.",
    read: "4 min",
    topic: "Personal",
  },
  {
    slug: "south-florida-is-a-tech-town",
    date: "Nov 2025",
    month: "Nov",
    year: "2025",
    title: "South Florida is a tech town now",
    blurb: "The case for building between Miami and the Treasure Coast.",
    read: "5 min",
    topic: "South Florida",
  },
  {
    slug: "the-quiet-cost-of-every-meeting",
    date: "Sep 2025",
    month: "Sep",
    year: "2025",
    title: "The quiet cost of every meeting",
    blurb: "An accounting of the half-hours that disappeared this quarter.",
    read: "5 min",
    topic: "Building",
  },
  {
    slug: "document-automation-for-humans",
    date: "Aug 2025",
    month: "Aug",
    year: "2025",
    title: "Document automation, for humans",
    blurb: "Templates are an interface. We forgot.",
    read: "7 min",
    topic: "Engineering",
  },
  {
    slug: "onboarding-without-a-sales-team",
    date: "Jul 2025",
    month: "Jul",
    year: "2025",
    title: "Onboarding without a sales team",
    blurb:
      "What pre-sales muscle memory looks like when you only have one customer at a time.",
    read: "10 min",
    topic: "Distribution",
  },
  {
    slug: "on-leaving-the-big-company",
    date: "May 2025",
    month: "May",
    year: "2025",
    title: "On leaving the big company",
    blurb: "Auth0, and the long hallway between employee and founder.",
    read: "8 min",
    topic: "Personal",
  },
  {
    slug: "forward-deployed-engineering",
    date: "Mar 2025",
    month: "Mar",
    year: "2025",
    title: "Forward-deployed engineering, in plain English",
    blurb:
      "What the role actually does, and why every B2B startup eventually needs it.",
    read: "6 min",
    topic: "Engineering",
  },
  {
    slug: "the-first-ten-customers",
    date: "Nov 2024",
    month: "Nov",
    year: "2024",
    title: "The first ten customers",
    blurb: "Where they came from, what they paid, and what they taught me.",
    read: "9 min",
    topic: "Distribution",
  },
  {
    slug: "picking-a-stack-you-wont-hate",
    date: "Aug 2024",
    month: "Aug",
    year: "2024",
    title: "Picking a stack you won't hate in two years",
    blurb:
      "A practical, slightly opinionated guide for the founder-engineer.",
    read: "11 min",
    topic: "Engineering",
  },
  {
    slug: "building-a-company-from-zero",
    date: "Apr 2024",
    month: "Apr",
    year: "2024",
    title: "Building a company from zero",
    blurb: "The first month of TurboDocx, without the hindsight gloss.",
    read: "7 min",
    topic: "Building",
  },
  {
    slug: "why-i-left-a-perfectly-good-job",
    date: "Dec 2023",
    month: "Dec",
    year: "2023",
    title: "Why I left a perfectly good job",
    blurb: "The decision tree, the second-guessing, and the napkin math.",
    read: "6 min",
    topic: "Personal",
  },
];

export const HELLOS = [
  { tpl: "Di {h}", h: "hola", lang: "Español" },
  { tpl: "Dis {h}", h: "bonjour", lang: "Français" },
  { tpl: "{h}と言って", h: "こんにちは", lang: "日本語" },
  { tpl: "قل {h}", h: "مرحبا", lang: "العربية", dir: "rtl" as const },
  { tpl: "说{h}", h: "你好", lang: "中文" },
  { tpl: "{h} कहो", h: "नमस्ते", lang: "हिन्दी" },
  { tpl: "Diga {h}", h: "olá", lang: "Português" },
  { tpl: "{h}라고 해요", h: "안녕", lang: "한국어" },
  { tpl: "Скажи {h}", h: "привет", lang: "Русский" },
  { tpl: "Di' {h}", h: "ciao", lang: "Italiano" },
  { tpl: "Sag {h}", h: "hallo", lang: "Deutsch" },
  { tpl: "תָּגִיד {h}", h: "שָׁלוֹם", lang: "עברית", dir: "rtl" as const },
  { tpl: "Thi {h}", h: "sawubona", lang: "IsiZulu" },
  { tpl: "E ʻōlelo {h}", h: "aloha", lang: "ʻÓlelo Hawaiʻi" },
  { tpl: "Πες {h}", h: "γειά", lang: "Ελληνικά" },
  { tpl: "พูด{h}", h: "สวัสดี", lang: "ภาษาไทย" },
  { tpl: "{h} de", h: "Merhaba", lang: "Türkçe" },
  { tpl: "Säg {h}", h: "hej", lang: "Svenska" },
  { tpl: "{h} بگو", h: "سلام", lang: "Fārsī", dir: "rtl" as const },
];

export const SOCIAL = [
  { label: "X / Twitter", href: "https://x.com/NicolasBuilds" },
  { label: "GitHub", href: "https://github.com/nicolasiscoding" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nicolasfry" },
];
