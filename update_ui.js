import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add Segoe UI font class and animations
const styleAdditions = `
      .font-segoe {
        font-family: "Segoe UI", system-ui, sans-serif;
      }
      
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .animate-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .nav-link {
        position: relative;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 0;
        background-color: #3b82f6;
        transition: width 0.3s ease;
      }
      .nav-link:hover::after {
        width: 100%;
      }
`;
content = content.replace('/* Custom Animations */', styleAdditions + '\n      /* Custom Animations */');

// 2. Change font-extrabold to font-semibold font-segoe in cards (h3 and h4)
content = content.replace(/<h3 class="text-2xl font-extrabold/g, '<h3 class="text-2xl font-semibold font-segoe');
content = content.replace(/<h4 class="text-xl font-extrabold/g, '<h4 class="text-xl font-semibold font-segoe');

// 3. Fix Excel Dashboards Icon
const excelIconOld = `<img src="https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg" alt="Excel" class="w-full h-full object-contain drop-shadow-md" />`;
const excelIconNew = `<i data-lucide="file-spreadsheet" class="w-16 h-16 text-green-500 drop-shadow-md mx-auto"></i>`;
content = content.replace(excelIconOld, excelIconNew);

// 4. Fix Footer Symmetry
const footerOld = `        <!-- Social Links -->
        <div class="flex flex-col items-center md:items-end justify-center gap-4">
          <a
            href="https://wa.me/923475007070" 
            target="_blank"
            rel="noreferrer"
            class="liquid-glass w-full max-w-[280px] px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-green-500/20 hover:border-green-500/50 transition-all shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.2)] hover:-translate-y-1"
            aria-label="WhatsApp"
          >
            <i data-lucide="message-circle" class="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform"></i>
            <span>WhatsApp (+92-347-5007070)</span>
          </a>
          <a
            href="mailto:aarij.tanveer1@gmail.com"
            class="liquid-glass w-full max-w-[280px] px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-purple-500/20 hover:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1"
            aria-label="Email"
          >
            <i data-lucide="mail" class="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform"></i>
            <span>Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aarij-tanveer/"
            target="_blank"
            rel="noreferrer"
            class="liquid-glass w-full max-w-[280px] px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-blue-500/20 hover:border-blue-500/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <i data-lucide="linkedin" class="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform"></i>
            <span>LinkedIn</span>
          </a>
        </div>`;

const footerNew = `        <!-- Social Links -->
        <div class="flex flex-row flex-wrap items-center justify-center md:justify-end gap-4">
          <a
            href="https://wa.me/923475007070" 
            target="_blank"
            rel="noreferrer"
            class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-green-500/20 hover:border-green-500/50 transition-all shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.2)] hover:-translate-y-1"
            aria-label="WhatsApp"
          >
            <i data-lucide="message-circle" class="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform"></i>
            <span class="hidden sm:inline">WhatsApp (+92-347-5007070)</span>
          </a>
          <a
            href="mailto:aarij.tanveer1@gmail.com"
            class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-purple-500/20 hover:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1"
            aria-label="Email"
          >
            <i data-lucide="mail" class="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform"></i>
            <span class="hidden sm:inline">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aarij-tanveer/"
            target="_blank"
            rel="noreferrer"
            class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-blue-500/20 hover:border-blue-500/50 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <i data-lucide="linkedin" class="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform"></i>
            <span class="hidden sm:inline">LinkedIn</span>
          </a>
        </div>`;
content = content.replace(footerOld, footerNew);

// 5. Update Navigation Links
content = content.replace(/class="text-sm font-medium text-slate-300 hover:text-white transition-colors"/g, 'class="nav-link text-sm font-medium text-slate-300 hover:text-white transition-colors"');

// 6. Add JS for animations and sticky nav
const jsAdditions = `
      // Intersection Observer for animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.liquid-glass, section h2, section p, .accordion-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
      });

      // Sticky Navigation
      window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
          nav.classList.add('bg-[#050505]/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/10');
          nav.classList.remove('bg-transparent', 'py-6');
          
          if (document.documentElement.classList.contains('light-mode')) {
             nav.classList.add('bg-slate-50/80');
             nav.classList.remove('bg-[#050505]/80');
          }
        } else {
          nav.classList.remove('bg-[#050505]/80', 'bg-slate-50/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/10');
          nav.classList.add('bg-transparent', 'py-6');
        }
      });
`;
content = content.replace('lucide.createIcons();', 'lucide.createIcons();\n' + jsAdditions);

fs.writeFileSync('index.html', content);
console.log('Done');
