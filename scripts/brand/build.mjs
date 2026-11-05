// Builds the share banner and the site icons from the files in this folder.
//
//   node scripts/brand/build.mjs
//
// Writes:
//   src/app/opengraph-image.jpg, src/app/twitter-image.jpg   1200x630 link-share banner (banner.html)
//   src/app/favicon.ico, src/app/icon.png, src/app/apple-icon.png
//   public/icons/icon-192.png, icon-512.png, icon-maskable-512.png   (web app manifest)
//
// The banner is a screenshot of banner.html taken with headless Chrome or Edge. Set CHROME_PATH
// if neither is found in the usual place.

import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const app = join(root, "src/app");
const icons = join(root, "public/icons");
const MARK = join(here, "mark.png");
const TILE = "#202020"; // same charcoal tile the footer puts behind the logo

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error("Chrome/Edge not found — set CHROME_PATH");
  return found;
}

async function banner() {
  const tmp = mkdtempSync(join(tmpdir(), "cc-og-"));
  const shot = join(tmp, "banner.png");
  try {
    const res = spawnSync(
      findChrome(),
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--allow-file-access-from-files", // the heading font is loaded from ../../public
        `--user-data-dir=${join(tmp, "profile")}`, // never attach to a Chrome that is already open
        "--force-device-scale-factor=2",
        "--window-size=1200,630",
        "--virtual-time-budget=10000", // let the web font and images finish loading
        `--screenshot=${shot}`,
        pathToFileURL(join(here, "banner.html")).href,
      ],
      { stdio: "pipe", timeout: 60_000 },
    );
    if (!existsSync(shot)) {
      throw new Error(`Banner screenshot failed:\n${res.stderr?.toString() ?? ""}`);
    }

    // Rendered at 2x, scaled down for clean edges. JPEG keeps it well under the ~300 KB
    // that WhatsApp still shows as a large preview.
    const jpg = await sharp(shot)
      .resize(1200, 630, { kernel: "lanczos3" })
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
    writeFileSync(join(app, "opengraph-image.jpg"), jpg);
    writeFileSync(join(app, "twitter-image.jpg"), jpg);
    console.log(`banner   1200x630  ${(jpg.length / 1024).toFixed(0)} KB`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// The C mark centred on a charcoal tile. `markScale` is the mark's share of the tile width.
async function tile(size, { markScale, radius = 0 }) {
  const markSize = Math.round(size * markScale);
  const mark = await sharp(MARK)
    .resize(markSize, markSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const r = Math.round(size * radius);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${TILE}"/></svg>`,
  );
  return sharp(bg).composite([{ input: mark, gravity: "centre" }]).png().toBuffer();
}

// ICO with PNG-compressed entries (supported by every current browser)
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2); // palette
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4); // planes
    header.writeUInt16LE(32, e + 6); // bpp
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

async function siteIcons() {
  mkdirSync(icons, { recursive: true });

  // Browser tab: rounded tile, mark as large as still reads at 16px
  const favSizes = [16, 32, 48];
  const fav = await Promise.all(
    favSizes.map(async (size) => ({ size, data: await tile(size, { markScale: 0.78, radius: 0.2 }) })),
  );
  writeFileSync(join(app, "favicon.ico"), ico(fav));
  writeFileSync(join(app, "icon.png"), await tile(512, { markScale: 0.72, radius: 0.2 }));

  // iOS rounds the corners itself and wants an opaque square
  writeFileSync(join(app, "apple-icon.png"), await tile(180, { markScale: 0.64 }));

  writeFileSync(join(icons, "icon-192.png"), await tile(192, { markScale: 0.66 }));
  writeFileSync(join(icons, "icon-512.png"), await tile(512, { markScale: 0.66 }));
  // Android crops maskable icons to a circle 80% wide — keep the mark well inside it
  writeFileSync(join(icons, "icon-maskable-512.png"), await tile(512, { markScale: 0.5 }));
  console.log("icons    favicon.ico, icon.png, apple-icon.png, public/icons/*");
}

const only = process.argv[2];
if (!only || only === "banner") await banner();
if (!only || only === "icons") await siteIcons();
