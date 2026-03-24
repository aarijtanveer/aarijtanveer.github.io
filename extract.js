import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/g);
if (scriptMatches) {
  scriptMatches.forEach((script, index) => {
    const scriptContent = script.replace(/<\/?script>/g, '');
    fs.writeFileSync(`test-script-${index}.js`, scriptContent);
    console.log(`Extracted script to test-script-${index}.js`);
  });
}
