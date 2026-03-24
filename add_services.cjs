const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const servicesHTML = `
      <!-- Services Section -->
      <section id="services" class="py-24 px-6 md:px-10 relative overflow-hidden bg-white/5 border-y border-white/10">
        <div class="max-w-6xl mx-auto relative z-10">
          <div class="mb-16 text-center">
            <div class="flex items-center justify-center gap-2 text-sm md:text-base font-display font-semibold text-blue-500 uppercase tracking-widest mb-4">
              <div class="w-6 h-[2px] bg-blue-500 rounded-full"></div>
              Services
              <div class="w-6 h-[2px] bg-blue-500 rounded-full"></div>
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-[1.2] max-w-4xl mx-auto">
              Comprehensive data and AI solutions tailored to your organization's unique challenges and goals.
            </h2>
            <div class="mt-8 mb-16">
              <a href="https://calendly.com/arij-tanveer/30min" target="_blank" rel="noreferrer" class="liquid-glass inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full text-[16px] font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1">
                Discuss a project &rarr;
              </a>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:border-blue-500/30 group">
              <div class="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6 group-hover:bg-blue-500/20 transition-colors">
                <i data-lucide="bar-chart-2" class="w-6 h-6 text-blue-400"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">Business Intelligence</h3>
              <p class="text-slate-300 leading-relaxed font-medium">
                End-to-end BI solutions, from data warehousing to interactive dashboards that drive strategic decision-making.
              </p>
            </div>
            
            <div class="p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] hover:border-purple-500/30 group">
              <div class="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-6 group-hover:bg-purple-500/20 transition-colors">
                <i data-lucide="users" class="w-6 h-6 text-purple-400"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">HR Analytics</h3>
              <p class="text-slate-300 leading-relaxed font-medium">
                Optimizing workforce performance, retention, and talent acquisition through advanced predictive modeling.
              </p>
            </div>
            
            <div class="p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.1)] hover:border-pink-500/30 group">
              <div class="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 mb-6 group-hover:bg-pink-500/20 transition-colors">
                <i data-lucide="brain" class="w-6 h-6 text-pink-400"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">AI Strategy Consulting</h3>
              <p class="text-slate-300 leading-relaxed font-medium">
                Guiding organizations in adopting AI technologies, identifying high-impact use cases, and managing implementation.
              </p>
            </div>
            
            <div class="p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:border-emerald-500/30 group">
              <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <i data-lucide="database" class="w-6 h-6 text-emerald-400"></i>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">Systems Architecture</h3>
              <p class="text-slate-300 leading-relaxed font-medium">
                Designing robust, scalable, and secure data architectures that support complex analytical workloads.
              </p>
            </div>
          </div>
        </div>
      </section>
`;

// Replace old services section ID
html = html.replace('<section\n        id="services"\n        class="py-16 px-6 md:px-10 relative overflow-hidden"\n      >', '<section\n        id="capabilities"\n        class="py-16 px-6 md:px-10 relative overflow-hidden"\n      >');

// Find the end of the home section
const homeSectionMatch = html.match(/<section\s+id="home"[\s\S]*?<\/section>/);
if (homeSectionMatch) {
  const insertIndex = homeSectionMatch.index + homeSectionMatch[0].length;
  html = html.substring(0, insertIndex) + '\n' + servicesHTML + html.substring(insertIndex);
  fs.writeFileSync('index.html', html);
  console.log('Services section added successfully.');
} else {
  console.log('Could not find home section.');
}
