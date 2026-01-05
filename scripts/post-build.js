import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync, renameSync, readdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

console.log('📦 Post-build: Organizing extension files...');

// 1. Copy manifest.json
console.log('  → Copying manifest.json');
copyFileSync(
  join(rootDir, 'manifest.json'),
  join(distDir, 'manifest.json')
);

// 2. Move popup HTML from dist/src/popup/ to dist/popup/
const srcPopupDir = join(distDir, 'src', 'popup');
const destPopupDir = join(distDir, 'popup');

if (existsSync(srcPopupDir)) {
  console.log('  → Moving popup HTML to correct location');

  // Read and update HTML references
  const htmlPath = join(srcPopupDir, 'index.html');
  if (existsSync(htmlPath)) {
    let html = readFileSync(htmlPath, 'utf-8');

    // Fix asset paths - they should be relative to dist root
    html = html.replace(/src="\.\.\/\.\.\/popup\//g, 'src="');
    html = html.replace(/href="\.\.\/\.\.\/assets\//g, 'href="../assets/');
    html = html.replace(/src="\/popup\//g, 'src="');
    html = html.replace(/href="\/assets\//g, 'href="../assets/');

    writeFileSync(join(destPopupDir, 'index.html'), html);
  }

  // Remove the src directory
  rmSync(join(distDir, 'src'), { recursive: true, force: true });
}

// 3. Create placeholder icons (simple colored squares)
console.log('  → Creating placeholder icons');
const iconsDir = join(distDir, 'icons');
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}

// GetMyBrief Icon - Purple gradient with lightning bolt
const createGetMyBriefIcon = (size) => {
  // Lightning bolt path scaled to the icon size
  const scale = size / 128;
  const strokeWidth = Math.max(2, 3 * scale);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a855f7"/>
      <stop offset="50%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#6366f1"/>
    </linearGradient>
    <linearGradient id="boltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#f0f0f0"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${2 * scale}" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background rounded square -->
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="url(#bgGrad)"/>

  <!-- Lightning bolt icon (centered, Zap-style) -->
  <g transform="translate(${size * 0.22}, ${size * 0.15}) scale(${scale * 0.9})" filter="url(#glow)">
    <path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      fill="url(#boltGrad)"
      stroke="white"
      stroke-width="${strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
      transform="scale(${70 / 24})"
    />
  </g>
</svg>`;
  return svg;
};

// Write SVG icons (Chrome accepts SVG in manifest v3)
[16, 48, 128].forEach(size => {
  const svg = createGetMyBriefIcon(size);
  writeFileSync(join(iconsDir, `icon${size}.svg`), svg);
});

// 4. Update manifest to use SVG icons
console.log('  → Updating manifest icon references');
const manifestPath = join(distDir, 'manifest.json');
let manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

manifest.action.default_icon = {
  "16": "icons/icon16.svg",
  "48": "icons/icon48.svg",
  "128": "icons/icon128.svg"
};

manifest.icons = {
  "16": "icons/icon16.svg",
  "48": "icons/icon48.svg",
  "128": "icons/icon128.svg"
};

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('✅ Post-build complete!');
console.log('');
console.log('📁 Extension ready at: dist/');
console.log('');
console.log('To load in Chrome:');
console.log('  1. Go to chrome://extensions');
console.log('  2. Enable "Developer mode"');
console.log('  3. Click "Load unpacked"');
console.log('  4. Select the dist/ folder');
