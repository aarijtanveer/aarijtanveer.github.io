const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('class="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight text-white leading-[1.05] mb-8"', 'class="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-8"');
fs.writeFileSync('index.html', html);
console.log('Hero heading restored to bold.');
