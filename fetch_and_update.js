import https from 'https';
import fs from 'fs';

const options = {
  headers: {
    'User-Agent': 'AIStudioBot/1.0 (aarij.tanveer1@gmail.com)'
  }
};

function fetchImageUrl(filename) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${filename}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
            resolve(pages[pageId].imageinfo[0].url);
          } else {
            reject(new Error(`Image not found: ${filename}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function fetchImageBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer.toString('base64'));
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log('Fetching NUST image URL...');
    const nustUrl = await fetchImageUrl('File:NUST_MainOffice.png');
    console.log('Fetching NUST image data...');
    const nustBase64 = await fetchImageBase64(nustUrl);

    console.log('Fetching NUML image URL...');
    const numlUrl = await fetchImageUrl('File:NUMLCafeteria.jpg');
    console.log('Fetching NUML image data...');
    const numlBase64 = await fetchImageBase64(numlUrl);

    console.log('Updating index.html...');
    let html = fs.readFileSync('index.html', 'utf8');

    html = html.replace(
      /<img src="data:image\/[^;]+;base64,[^"]+" alt="NUST Main Office"/g,
      `<img src="data:image/png;base64,${nustBase64}" alt="NUST Main Office"`
    );

    html = html.replace(
      /<img src="data:image\/[^;]+;base64,[^"]+" alt="NUML Campus"/g,
      `<img src="data:image/jpeg;base64,${numlBase64}" alt="NUML Campus"`
    );

    fs.writeFileSync('index.html', html);
    console.log('Images updated successfully');
  } catch (e) {
    console.error('Error:', e);
  }
}

main();
