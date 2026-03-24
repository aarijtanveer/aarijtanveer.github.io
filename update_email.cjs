const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/aarij\.tanveer1@gmail\.com/g, 'aarij.tanveer@hotmail.com');
fs.writeFileSync('index.html', html);
console.log('Email updated.');
