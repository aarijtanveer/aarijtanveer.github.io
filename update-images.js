import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const nustBase64 = fs.existsSync('nust_base64.txt') ? fs.readFileSync('nust_base64.txt', 'utf8').trim() : null;
const numlBase64 = fs.existsSync('numl_base64.txt') ? fs.readFileSync('numl_base64.txt', 'utf8').trim() : null;

let updatedHtml = html;

if (nustBase64) {
  updatedHtml = updatedHtml.replace(
    /<img src="data:image\/jpeg;base64,.*?" alt="NUST Main Office"/s,
    `<img src="data:image/png;base64,${nustBase64}" alt="NUST Main Office"`
  );
}

if (numlBase64) {
  updatedHtml = updatedHtml.replace(
    /<img src="data:image\/jpeg;base64,.*?" alt="NUML Campus"/s,
    `<img src="data:image/jpeg;base64,${numlBase64}" alt="NUML Campus"`
  );
}

fs.writeFileSync('index.html', updatedHtml);
console.log('Images updated successfully');
