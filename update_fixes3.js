import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// 1. Schedule a Meeting
content = content.replace(/Schedule Call/g, 'Schedule a Meeting');
content = content.replace(/Let's discuss/g, 'Schedule a Meeting');

// 2. Add LinkedIn to Get in Touch
const getInTouchList = `<li>
              <a href="https://wa.me/923475007070" target="_blank" rel="noreferrer" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <i data-lucide="message-circle" class="w-4 h-4 text-green-400"></i>
                </div>
                <span class="text-sm font-medium">+92 347 5007070</span>
              </a>
            </li>`;
const getInTouchListWithLinkedIn = getInTouchList + `
            <li>
              <a href="https://www.linkedin.com/in/aarij-tanveer/" target="_blank" rel="noreferrer" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <span class="text-sm font-medium">LinkedIn</span>
              </a>
            </li>`;
content = content.replace(getInTouchList, getInTouchListWithLinkedIn);

// 3. Technical & Strategic Skills font
const techSkillsOld = `<h2
              class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Technical &<br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                >Strategic Skills</span
              >
            </h2>`;
const techSkillsNew = `<h2
              class="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]"
            >
              Technical &<br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                >Strategic Skills</span
              >
            </h2>`;
content = content.replace(techSkillsOld, techSkillsNew);

// 4. A Trajectory of Accelerating Impact font
const trajOld = `<h2
              class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            >
              A Trajectory of<br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                >Accelerating Impact</span
              >
            </h2>`;
const trajNew = `<h2
              class="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]"
            >
              A Trajectory of<br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                >Accelerating Impact</span
              >
            </h2>`;
content = content.replace(trajOld, trajNew);

// 5. Role text
content = content.replace(
  /role: "Management Trainee → Deputy Manager HR",/g,
  'role: "Management Trainee → Assistant Manager HR",'
);

// 6. Organization names and icons bigger
content = content.replace(
  /<div class="w-10 h-10 rounded-xl bg-white\/10 flex items-center justify-center p-2 shadow-sm border \$\{exp\.borderColor\} group-hover:scale-110 transition-transform duration-500">/g,
  '<div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center p-2 shadow-sm border ${exp.borderColor} group-hover:scale-110 transition-transform duration-500">'
);
content = content.replace(
  /<i data-lucide="\$\{exp\.icon\}" class="w-5 h-5 \$\{exp\.iconColor\}"><\/i>/g,
  '<i data-lucide="${exp.icon}" class="w-6 h-6 ${exp.iconColor}"></i>'
);
content = content.replace(
  /<span class="text-\[12px\] font-display font-extrabold text-blue-400 uppercase tracking-widest leading-tight">\$\{exp\.company\}<\/span>/g,
  '<span class="text-[14px] font-display font-bold text-blue-400 uppercase tracking-widest leading-tight">${exp.company}</span>'
);

// Also fix the font-serif in the career description and reduce boldness of role
content = content.replace(
  /<h3 class="text-xl font-extrabold text-white mb-3 tracking-tight leading-tight relative z-10">\$\{exp\.role\}<\/h3>/g,
  '<h3 class="text-xl font-semibold text-white mb-3 tracking-tight leading-tight relative z-10">${exp.role}</h3>'
);
content = content.replace(
  /<p class="text-\[14px\] text-slate-300 leading-relaxed font-medium  font-serif relative z-10">\$\{exp\.desc\}<\/p>/g,
  '<p class="text-[14px] text-slate-300 leading-relaxed font-medium relative z-10">${exp.desc}</p>'
);

// 7. Manage negative space (change py-24 to py-16)
content = content.replace(/class="py-24 /g, 'class="py-16 ');

fs.writeFileSync('index.html', content);
console.log('Done');
