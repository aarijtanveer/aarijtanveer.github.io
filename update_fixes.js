import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// 1. Update Google Fonts link to use Inter (professional, no italics)
content = content.replace(
  /https:\/\/fonts\.googleapis\.com\/css2\?family=Nunito[^"]*/,
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'
);

// 2. Update CSS font-family definitions to use Inter
const professionalStack = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

content = content.replace(/font-family:\s*ui-rounded[^;]*;/g, 'font-family: ' + professionalStack + ';');

// 3. Update Tailwind config
content = content.replace(
  /sans:\s*\["ui-rounded"[^\]]*\],/g,
  'sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],'
);
content = content.replace(
  /display:\s*\["ui-rounded"[^\]]*\],/g,
  'display: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],'
);

// 4. Remove italics
content = content.replace(/italic/g, '');

// 5. Fix Arij.ai space in footer
content = content.replace(
  /<a href="#home" class="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">\s*Arij<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">\.ai<\/span>\s*<\/a>/g,
  '<a href="#home" class="text-3xl font-extrabold tracking-tight text-white flex items-center">Arij<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">.ai</span></a>'
);

// 6. Fix WhatsApp symmetry and separate phone number
const oldWhatsApp = `<a
            href="https://wa.me/923475007070" 
            target="_blank"
            rel="noreferrer"
            class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-green-500/20 hover:border-green-500/50 transition-all shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.2)] hover:-translate-y-1"
            aria-label="WhatsApp"
          >
            <i data-lucide="message-circle" class="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform"></i>
            <span class="hidden sm:inline">WhatsApp (+92-347-5007070)</span>
          </a>`;

const newWhatsApp = `<div class="flex flex-col items-center gap-2">
            <a
              href="https://wa.me/923475007070" 
              target="_blank"
              rel="noreferrer"
              class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-green-500/20 hover:border-green-500/50 transition-all shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.2)] hover:-translate-y-1"
              aria-label="WhatsApp"
            >
              <i data-lucide="message-circle" class="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform"></i>
              <span class="hidden sm:inline">WhatsApp</span>
            </a>
            <span class="text-xs text-slate-400 font-mono">+92-347-5007070</span>
          </div>`;

content = content.replace(oldWhatsApp, newWhatsApp);

// Also wrap the other social links to match the flex-col layout so they are perfectly symmetrical
const oldEmail = `<a
            href="mailto:aarij.tanveer1@gmail.com"
            class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-purple-500/20 hover:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1"
            aria-label="Email"
          >
            <i data-lucide="mail" class="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform"></i>
            <span class="hidden sm:inline">Email</span>
          </a>`;
const newEmail = `<div class="flex flex-col items-center gap-2">
            <a
              href="mailto:aarij.tanveer1@gmail.com"
              class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-purple-500/20 hover:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1"
              aria-label="Email"
            >
              <i data-lucide="mail" class="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform"></i>
              <span class="hidden sm:inline">Email</span>
            </a>
            <span class="text-xs text-transparent font-mono select-none" aria-hidden="true">spacer</span>
          </div>`;
content = content.replace(oldEmail, newEmail);

const oldLinkedIn = `<a
            href="https://www.linkedin.com/in/aarij-tanveer/"
            target="_blank"
            rel="noreferrer"
            class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-blue-500/20 hover:border-blue-500/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <i data-lucide="linkedin" class="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform"></i>
            <span class="hidden sm:inline">LinkedIn</span>
          </a>`;
const newLinkedIn = `<div class="flex flex-col items-center gap-2">
            <a
              href="https://www.linkedin.com/in/aarij-tanveer/"
              target="_blank"
              rel="noreferrer"
              class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-blue-500/20 hover:border-blue-500/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400 group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span class="hidden sm:inline">LinkedIn</span>
            </a>
            <span class="text-xs text-transparent font-mono select-none" aria-hidden="true">spacer</span>
          </div>`;
content = content.replace(oldLinkedIn, newLinkedIn);

// Fix top nav logo space
content = content.replace(
  /<a href="#home" class="text-2xl font-extrabold tracking-tight text-white">\s*Arij<span/g,
  '<a href="#home" class="text-2xl font-extrabold tracking-tight text-white flex items-center">Arij<span'
);

fs.writeFileSync('index.html', content);
console.log('Done');
