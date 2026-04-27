#!/usr/bin/env node
/**
 * Samples src/assets/gold_me.png down to a 32x40 grid of intensity tiers
 * (0 = transparent/off, 1 = dim, 2 = bright) and writes the result to
 * src/assets/portrait-pixels.json.
 *
 * Run automatically before `npm run build` (see package.json prebuild hook).
 */

import sharp from 'sharp';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const inputPath = resolve(root, 'src/assets/gold_me.png');
const outputPath = resolve(root, 'src/assets/portrait-pixels.json');

const COLS = 32;
const ROWS = 40;

if (!existsSync(inputPath)) {
  console.error(`[build-pixel-portrait] Source not found: ${inputPath}`);
  process.exit(1);
}

const { data } = await sharp(inputPath)
  .resize(COLS, ROWS, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const cells = new Array(COLS * ROWS);
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x++) {
    const i = (y * COLS + x) * 4;
    const a = data[i + 3];
    if (a < 32) {
      cells[y * COLS + x] = 0;
    } else {
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      cells[y * COLS + x] = lum < 96 ? 1 : 2;
    }
  }
}

writeFileSync(
  outputPath,
  JSON.stringify({ cols: COLS, rows: ROWS, cells }, null, 0),
);
console.log(
  `[build-pixel-portrait] Wrote ${outputPath} (${COLS}x${ROWS}, ${cells.length} cells)`,
);
