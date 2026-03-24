import fs from 'fs';
let content = fs.readFileSync('index.html', 'utf8');

// Make text more pronounced
content = content.replace(/text-slate-400/g, 'text-slate-300');
content = content.replace(/text-slate-500/g, 'text-slate-400');
content = content.replace(/font-bold/g, 'font-extrabold');
content = content.replace(/from-blue-400 via-purple-400 to-pink-400/g, 'from-blue-500 via-purple-500 to-pink-500');

fs.writeFileSync('index.html', content);
console.log('Done');
