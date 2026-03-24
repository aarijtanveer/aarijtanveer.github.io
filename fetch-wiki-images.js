import https from 'https';

const options = {
  headers: {
    'User-Agent': 'AIStudioBot/1.0 (aarij.tanveer1@gmail.com)'
  }
};

https.get('https://en.wikipedia.org/w/api.php?action=query&titles=File:NUMLCafeteria.jpg&prop=imageinfo&iiprop=url&format=json', options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
});
