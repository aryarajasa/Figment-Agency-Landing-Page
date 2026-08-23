const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist, { recursive: true });
}

const files = [
  'index.html',
  'styles.css',
  'main.js',
  'logo.png',
  'favicon.png',
  'footer-logo.png'
];

files.forEach(f => {
  const src = path.join(__dirname, f);
  const dest = path.join(dist, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

console.log('Build finished: static assets copied to dist/ directory.');
