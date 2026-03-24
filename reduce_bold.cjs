const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/font-extrabold/g, 'font-bold');
fs.writeFileSync('index.html', html);
console.log('Boldness reduced.');
