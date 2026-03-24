import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// 1. Fix LinkedIn icon in header
const oldHeaderLinkedIn = `<a
          href="https://www.linkedin.com/in/aarij-tanveer/"
          target="_blank"
          rel="noreferrer"
          class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
          aria-label="LinkedIn"
        >
          <i data-lucide="linkedin" class="w-4 h-4"></i>
        </a>`;

const newHeaderLinkedIn = `<a
          href="https://www.linkedin.com/in/aarij-tanveer/"
          target="_blank"
          rel="noreferrer"
          class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>`;

content = content.replace(oldHeaderLinkedIn, newHeaderLinkedIn);

// 2. Update Job Title
content = content.replace(
  /role: "Management Trainee → Assistant Manager HR",/g,
  'role: "Management Trainee → Deputy Manager HR",'
);

// 3. Overhaul Footer
const oldFooter = `<footer id="footer" class="py-16 px-6 md:px-10 border-t border-white/10 bg-[#020202] relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center relative z-10">
        
        <!-- Brand & Copyright -->
        <div class="flex flex-col items-center md:items-start gap-4">
          <a href="#home" class="text-3xl font-extrabold tracking-tight text-white flex items-center">Arij<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">.ai</span></a>
          <p class="text-slate-400 text-sm font-medium text-center md:text-left max-w-xs">
            Pioneering the intersection of Human Resources and Artificial Intelligence.
          </p>
          <p class="text-slate-600 text-xs mt-2">
            © 2026 Arij Tanveer. All rights reserved.
          </p>
        </div>

        <!-- Quick Links / Appointment -->
        <div class="flex flex-col items-center justify-center gap-4">
          <a 
            href="https://calendly.com/arij-tanveer/30min" 
            target="_blank" 
            rel="noreferrer"
            class="liquid-glass px-6 py-3 rounded-full flex items-center gap-3 text-white font-medium group"
          >
            <i data-lucide="calendar" class="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform"></i>
            <span>Schedule an Appointment</span>
            <i data-lucide="arrow-right" class="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        <!-- Social Links -->
        <div class="flex flex-row flex-wrap items-center justify-center md:justify-end gap-4">
          <div class="flex flex-col items-center gap-2">
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
          </div>
          <div class="flex flex-col items-center gap-2">
            <a
              href="mailto:aarij.tanveer1@gmail.com"
              class="liquid-glass px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white font-medium group hover:bg-purple-500/20 hover:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:-translate-y-1"
              aria-label="Email"
            >
              <i data-lucide="mail" class="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform"></i>
              <span class="hidden sm:inline">Email</span>
            </a>
            <span class="text-xs text-transparent font-mono select-none" aria-hidden="true">spacer</span>
          </div>
          <div class="flex flex-col items-center gap-2">
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
          </div>
        </div>

      </div>
    </footer>`;

const newFooter = `<footer id="footer" class="py-20 px-6 md:px-10 border-t border-white/10 bg-[#020202] relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        <!-- Brand & Bio -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <a href="#home" class="text-3xl font-extrabold tracking-tight text-white flex items-center">Arij<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">.ai</span></a>
          <p class="text-slate-400 text-sm font-medium leading-relaxed max-w-md">
            Pioneering the intersection of Human Resources and Artificial Intelligence. Bridging the gap between human potential and technological innovation to build the workforce of tomorrow.
          </p>
          <div class="flex items-center gap-4 mt-2">
            <a href="https://www.linkedin.com/in/aarij-tanveer/" target="_blank" rel="noreferrer" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:bg-blue-500/10 transition-all" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:aarij.tanveer1@gmail.com" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-purple-500 hover:bg-purple-500/10 transition-all" aria-label="Email">
              <i data-lucide="mail" class="w-4 h-4"></i>
            </a>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <h4 class="text-white font-semibold text-lg">Get in Touch</h4>
          <ul class="flex flex-col gap-4">
            <li>
              <a href="mailto:aarij.tanveer1@gmail.com" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <i data-lucide="mail" class="w-4 h-4 text-purple-400"></i>
                </div>
                <span class="text-sm font-medium">aarij.tanveer1@gmail.com</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/923475007070" target="_blank" rel="noreferrer" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <i data-lucide="message-circle" class="w-4 h-4 text-green-400"></i>
                </div>
                <span class="text-sm font-medium">+92 347 5007070</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-3 flex flex-col gap-6">
          <h4 class="text-white font-semibold text-lg">Quick Links</h4>
          <ul class="flex flex-col gap-3">
            <li><a href="#home" class="text-sm text-slate-400 hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="#vision" class="text-sm text-slate-400 hover:text-blue-400 transition-colors">Vision</a></li>
            <li><a href="#services" class="text-sm text-slate-400 hover:text-blue-400 transition-colors">Services</a></li>
            <li><a href="#career" class="text-sm text-slate-400 hover:text-blue-400 transition-colors">Career</a></li>
          </ul>
          <a 
            href="https://calendly.com/arij-tanveer/30min" 
            target="_blank" 
            rel="noreferrer"
            class="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors w-fit shadow-lg shadow-blue-500/20"
          >
            <i data-lucide="calendar" class="w-4 h-4"></i>
            <span>Schedule Call</span>
          </a>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p class="text-slate-500 text-xs font-medium">
          © 2026 Arij Tanveer. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" class="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync('index.html', content);
console.log('Done');
