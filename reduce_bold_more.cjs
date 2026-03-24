const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/font-bold/g, 'font-semibold');
fs.writeFileSync('index.html', html);
console.log('Boldness reduced further.');
