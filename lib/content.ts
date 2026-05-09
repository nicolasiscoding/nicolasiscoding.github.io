import notesJson from "./notes.json";

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

export const WRITING: Note[] = notesJson as Note[];

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
