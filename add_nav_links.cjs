const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const navLinkDesktop = `
        <li>
          <a
            href="#portfolio"
            class="nav-link px-4 py-2 text-[14px] font-semibold text-slate-300 hover:text-indigo-500 hover:bg-white/10 hover:shadow-sm transition-all flex items-center gap-2 rounded-full"
            ><i data-lucide="layout-dashboard" class="w-4 h-4"></i>Portfolio</a
          >
        </li>`;

const navLinkMobile = `
        <li>
          <a
            href="#portfolio"
            class="mobile-link flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-lg font-semibold text-slate-200"
            ><i data-lucide="layout-dashboard" class="w-5 h-5 text-indigo-500"></i
            >Portfolio</a
          >
        </li>`;

const navLinkFooter = `
            <li><a href="#portfolio" class="text-sm text-slate-400 hover:text-blue-400 transition-colors">Portfolio</a></li>`;

html = html.replace(
  '            ><i data-lucide="briefcase" class="w-4 h-4"></i>Services</a\n          >\n        </li>',
  '            ><i data-lucide="briefcase" class="w-4 h-4"></i>Services</a\n          >\n        </li>' + navLinkDesktop
);

html = html.replace(
  '            >Services</a\n          >\n        </li>',
  '            >Services</a\n          >\n        </li>' + navLinkMobile
);

html = html.replace(
  '<li><a href="#services" class="text-sm text-slate-400 hover:text-blue-400 transition-colors">Services</a></li>',
  '<li><a href="#services" class="text-sm text-slate-400 hover:text-blue-400 transition-colors">Services</a></li>' + navLinkFooter
);

fs.writeFileSync('index.html', html);
console.log('Nav links added.');
