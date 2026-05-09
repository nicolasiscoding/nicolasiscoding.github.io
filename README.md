# nicolasiscoding.github.io

Personal site at [nicolasfry.com](https://nicolasfry.com). Built with Next.js 16 (App Router, React 19), Tailwind CSS, and Framer Motion. Deployed to GitHub Pages via static export.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
```

## Build

```bash
npm run build  # static export → ./out
```

## Deploy

Pushes to `main` are built and deployed by `.github/workflows/deploy.yml`. In repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
