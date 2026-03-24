const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const portfolioHTML = `
      <!-- Portfolio Section -->
      <section id="portfolio" class="py-24 px-6 md:px-10 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10 text-center">
          <div class="mb-12">
            <div class="flex items-center justify-center gap-2 text-sm md:text-base font-display font-semibold text-purple-500 uppercase tracking-widest mb-4">
              <div class="w-6 h-[2px] bg-purple-500 rounded-full"></div>
              Enterprise Analytics Portfolio
              <div class="w-6 h-[2px] bg-purple-500 rounded-full"></div>
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
              Transforming Data into Strategic Assets
            </h2>
            <p class="text-lg text-slate-300 max-w-2xl mx-auto mb-10 font-medium">
              Explore a curated selection of enterprise-grade applications, predictive models, and interactive dashboards designed to solve complex organizational challenges.
            </p>
            <button onclick="document.getElementById('portfolio-modal').classList.remove('hidden'); document.body.style.overflow='hidden';" class="liquid-glass inline-flex items-center justify-center gap-3 px-8 py-4 bg-purple-600/20 hover:bg-purple-600/40 text-white border border-purple-500/30 rounded-full text-[16px] font-semibold transition-all shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1">
              <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
              View Solutions Gallery
            </button>
          </div>
        </div>
      </section>

      <!-- Portfolio Modal -->
      <div id="portfolio-modal" class="fixed inset-0 z-[100] hidden bg-black/95 backdrop-blur-3xl overflow-y-auto">
        <div class="min-h-screen px-4 py-12 md:px-10">
          <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-12 sticky top-0 bg-black/80 backdrop-blur-md p-4 rounded-2xl z-20 border border-white/10">
              <h2 class="text-2xl md:text-3xl font-bold text-white">Enterprise Solutions Gallery</h2>
              <button onclick="document.getElementById('portfolio-modal').classList.add('hidden'); document.body.style.overflow='auto';" class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10">
                <i data-lucide="x" class="w-6 h-6"></i>
              </button>
            </div>

            <!-- Hero Project -->
            <div class="mb-16 group">
              <div class="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 aspect-[16/9] md:aspect-[21/9]">
                <!-- Placeholder for AI Dashboard Maker App -->
                <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                  <div class="text-center p-6">
                    <i data-lucide="sparkles" class="w-16 h-16 text-blue-400 mx-auto mb-4"></i>
                    <h3 class="text-3xl md:text-5xl font-bold text-white mb-2">AI Dashboard Maker App</h3>
                    <p class="text-blue-200 text-lg">Flagship Solution</p>
                    <p class="text-sm text-slate-400 mt-4 max-w-md mx-auto">Please replace this placeholder with the actual image of the AI Dashboard Maker App.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Grid Projects -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Project 1 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="pie-chart" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Recruitment Dashboard - Pipeline image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Recruitment Pipeline</h4>
                  <p class="text-slate-400 text-sm">Comprehensive dashboard tracking candidate flow and acquisition metrics.</p>
                </div>
              </div>

              <!-- Project 2 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="dollar-sign" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Organization Budget Analysis App image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Budget Analysis App</h4>
                  <p class="text-slate-400 text-sm">Python-based application for organizational financial planning and tracking.</p>
                </div>
              </div>

              <!-- Project 3 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="users" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Candidates Dashboard image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Candidates Dashboard</h4>
                  <p class="text-slate-400 text-sm">Python-built interface for evaluating and managing candidate profiles.</p>
                </div>
              </div>

              <!-- Project 4 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="network" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Organgram App image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Organgram App</h4>
                  <p class="text-slate-400 text-sm">Interactive organizational chart generator and visualizer in Python.</p>
                </div>
              </div>

              <!-- Project 5 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="map" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Employee Distribution image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Employee Distribution</h4>
                  <p class="text-slate-400 text-sm">Month and location-wise workforce demographic analysis.</p>
                </div>
              </div>

              <!-- Project 6 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="trending-up" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Overall spending image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Overall Spending</h4>
                  <p class="text-slate-400 text-sm">Month-to-month expenditure tracking and financial insights.</p>
                </div>
              </div>

              <!-- Project 7 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="target" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Target Revenue image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Revenue Analysis</h4>
                  <p class="text-slate-400 text-sm">Target vs. Actual revenue tracking in millions.</p>
                </div>
              </div>

              <!-- Project 8 -->
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-white/5 group hover:border-white/20 transition-colors">
                <div class="aspect-video relative bg-slate-800/50 flex items-center justify-center">
                  <i data-lucide="bar-chart" class="w-12 h-12 text-slate-500 mb-2"></i>
                  <p class="absolute bottom-4 text-xs text-slate-400 text-center w-full px-4">Replace with: Target Income image</p>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">Income Tracking</h4>
                  <p class="text-slate-400 text-sm">Target vs. Actual income performance metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`;

// Insert after the services section
const servicesSectionMatch = html.match(/<section\s+id="services"[\s\S]*?<\/section>/);
if (servicesSectionMatch) {
  const insertIndex = servicesSectionMatch.index + servicesSectionMatch[0].length;
  html = html.substring(0, insertIndex) + '\n' + portfolioHTML + html.substring(insertIndex);
  fs.writeFileSync('index.html', html);
  console.log('Portfolio section added successfully.');
} else {
  console.log('Could not find services section.');
}
