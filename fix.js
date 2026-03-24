import fs from 'fs';
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\\${/g, '${');
content = content.replace(/\\\\d/g, '\\d');
content = content.replace(/\\\\s/g, '\\s');
fs.writeFileSync('index.html', content);
console.log('Fixed index.html');
