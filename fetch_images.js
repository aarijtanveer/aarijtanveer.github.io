async function getImageUrl(filename) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${filename}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url);
  const json = await res.json();
  const pages = json.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pages[pageId].imageinfo) {
    console.log(`${filename}: ${pages[pageId].imageinfo[0].url}`);
  }
}
getImageUrl('File:NUMLHostels.jpg');
getImageUrl('File:Playground NUML.jpg');
