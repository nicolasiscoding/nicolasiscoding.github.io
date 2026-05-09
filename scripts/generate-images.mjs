import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = resolve(root, "public/palm-beach-gardens.png");

async function ensure(p) {
  await mkdir(dirname(p), { recursive: true });
}

async function main() {
  // OG image: 1200x630 cover crop, slightly darkened with brand text overlay.
  const ogPath = resolve(root, "app/opengraph-image.png");
  await ensure(ogPath);

  const overlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(15,12,8,0.35)"/>
          <stop offset="60%" stop-color="rgba(15,12,8,0.55)"/>
          <stop offset="100%" stop-color="rgba(15,12,8,0.92)"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <g font-family="Georgia, 'Spectral', serif" fill="#f6f1e8">
        <text x="72" y="430" font-size="84" font-weight="400" letter-spacing="-2">
          Hey, I'm <tspan font-style="italic" fill="#ffd9b8">Nicolas</tspan>.
        </text>
        <text x="74" y="490" font-size="28" font-weight="400" fill="rgba(246,241,232,0.82)">
          Building TurboDocx · writing from South Florida
        </text>
        <text x="74" y="565" font-size="14" font-family="'JetBrains Mono', monospace" letter-spacing="2" fill="rgba(246,241,232,0.55)">
          NICOLASFRY.COM
        </text>
        <circle cx="60" cy="558" r="5" fill="oklch(0.62 0.14 40)"/>
      </g>
    </svg>
  `);

  await sharp(src)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([{ input: overlay, blend: "over" }])
    .png({ quality: 88, compressionLevel: 9 })
    .toFile(ogPath);
  console.log(`✓ wrote ${ogPath}`);

  // Twitter image: same as OG (twitter card uses summary_large_image — 1200x630 works).
  // Re-export to app/twitter-image.png so Next picks it up automatically.
  const twPath = resolve(root, "app/twitter-image.png");
  await sharp(ogPath).png().toFile(twPath);
  console.log(`✓ wrote ${twPath}`);

  // Favicon stack: 32x32 PNG (Next handles favicon.ico requests by serving icon.png).
  const iconPath = resolve(root, "app/icon.png");

  // Render an editorial "Nf" mark on the brand bg — simple, monogram-style.
  const iconSvg = Buffer.from(`
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="96" ry="96" fill="#1a1815"/>
      <text x="50%" y="56%" text-anchor="middle"
        font-family="Georgia, 'Spectral', serif" font-size="320" font-style="italic"
        fill="#f6f1e8" font-weight="400">N</text>
      <circle cx="408" cy="120" r="36" fill="oklch(0.62 0.14 40)"/>
    </svg>
  `);
  await sharp(iconSvg).resize(512, 512).png().toFile(iconPath);
  console.log(`✓ wrote ${iconPath}`);

  // Apple touch icon (180x180)
  const appleIconPath = resolve(root, "app/apple-icon.png");
  await sharp(iconSvg).resize(180, 180).png().toFile(appleIconPath);
  console.log(`✓ wrote ${appleIconPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
