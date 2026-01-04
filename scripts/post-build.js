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

// Simple SVG-based PNG creation (base64 encoded minimal PNGs)
// These are placeholder icons - replace with actual design later
const createPlaceholderIcon = (size) => {
  // Create a simple SVG and save as placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-weight="bold" fill="white"
        font-size="${size * 0.5}">IA</text>
</svg>`;
  return svg;
};

// Write SVG icons (Chrome accepts SVG in manifest v3)
[16, 48, 128].forEach(size => {
  const svg = createPlaceholderIcon(size);
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
