import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// 1. Update Google Fonts link to include Nunito (a rounded font that looks great as a fallback for Apple's SF Pro Rounded)
content = content.replace(
  /https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]*/,
  'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap'
);

// 2. Update CSS font-family definitions to prioritize Apple's rounded system fonts
const appleRoundedStack = 'ui-rounded, "SF Pro Rounded", "Nunito", -apple-system, BlinkMacSystemFont, sans-serif';

content = content.replace(/font-family:\s*"Inter",\s*sans-serif;/g, 'font-family: ' + appleRoundedStack + ';');
content = content.replace(/font-family:\s*"Space Grotesk",\s*sans-serif;/g, 'font-family: ' + appleRoundedStack + ';');
content = content.replace(/font-family:\s*"Segoe UI",\s*system-ui,\s*sans-serif;/g, 'font-family: ' + appleRoundedStack + ';');

// 3. Update Tailwind config
content = content.replace(
  /sans:\s*\["Inter",\s*"sans-serif"\],/g,
  'sans: ["ui-rounded", "SF Pro Rounded", "Nunito", "-apple-system", "BlinkMacSystemFont", "sans-serif"],'
);
content = content.replace(
  /display:\s*\["Space Grotesk",\s*"sans-serif"\],/g,
  'display: ["ui-rounded", "SF Pro Rounded", "Nunito", "-apple-system", "BlinkMacSystemFont", "sans-serif"],'
);

fs.writeFileSync('index.html', content);
console.log('Fonts updated successfully');
