const fs = require('fs');
const path = require('path');

function findImages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        findImages(fullPath);
      }
    } else if (/\.(png|jpe?g|gif|svg)$/i.test(file)) {
      console.log(fullPath);
    }
  }
}

findImages(process.cwd());
