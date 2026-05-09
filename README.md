# nicolasiscoding.github.io

Personal site at [nicolasfry.com](https://nicolasfry.com). Built with Next.js 16 (App Router, React 19), Tailwind CSS, and Framer Motion. Deployed to GitHub Pages via static export.

## Clone

The site uses `@turbodocx/next-plugin-llms` from a git submodule (`vendor/next-plugin-llms`) pinned to a feature branch with two upstream fixes (CSS-value leakage in JSX content extraction + dynamic-route expansion). Initialize submodules when cloning:

```bash
git clone --recurse-submodules git@github.com:nicolasiscoding/nicolasiscoding.github.io.git
# or, if you already cloned without --recurse-submodules:
git submodule update --init --recursive
```

## Develop

```bash
npm install
npm run dev    # http://localhost:3166
```

## Build

```bash
npm run build  # generates LLM routes → static export → ./out
```

`prebuild` calls the LLMs plugin's `generateLLMFiles()` to emit `/llms.txt`, `/llms-full.txt`, and one `/notes/<slug>.html.md` per note (driven by `lib/notes.json`). Generated routes are gitignored.

## Deploy

Pushes to `master` are built and deployed by `.github/workflows/deploy.yml` (which checks out submodules recursively). In repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
