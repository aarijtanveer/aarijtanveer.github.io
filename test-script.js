
        // Data
const servicesData = [
    {
      icon: 'globe', color: 'text-emerald-500',
      title: 'People Operations at Scale',
      desc: 'Executing high-volume, multi-industry HR operations across diverse project sites — managing unified HR governance, compliance standardization, and large-scale recruitment.',
      tags: ['Multi-Entity Ops', '600+ Hires', 'HR SOPs', 'HRIS Governance'],
    },
    {
      icon: 'target', color: 'text-orange-500',
      title: 'Performance Management Strategy',
      desc: 'Designing and automating comprehensive PMS frameworks tailored to specific business unit needs — from crafting 5-year institutional plans to embedding continuous feedback.',
      tags: ['OKR/KPI Design', '5-Year Planning', 'PMS Automation', 'IIMCT'],
    },
    {
      icon: 'search', color: 'text-pink-500',
      title: 'Talent Management & Acquisition',
      desc: 'Full-cycle talent management encompassing succession planning, organizational design, and mass recruitment operations across multiple industrial sectors.',
      tags: ['Succession Planning', 'Org Design', 'Recruitment Ops', 'Policy Dev'],
    },
    {
      icon: 'briefcase', color: 'text-blue-600',
      title: 'Digital HR Transformation',
      desc: 'End-to-end digitization of the employee lifecycle via SAP SuccessFactors — covering Performance Management, Onboarding, Recruitment, and Employee Central.',
      tags: ['SAP SuccessFactors', 'Power BI', 'Python', 'Streamlit'],
    },
    {
      icon: 'bar-chart', color: 'text-purple-600',
      title: 'HR Analytics & Data Intelligence',
      desc: 'Building Power BI workforce dashboards, custom organogram generators, HR budget analyzers, and candidate pipelines — integrating HR, payroll, and engagement data.',
      tags: ['Power BI', 'Excel Analytics', 'Python Scripts', 'Dashboards'],
    },
    {
      icon: 'heart', color: 'text-cyan-500',
      title: 'Cultural Innovation & Wellness',
      desc: 'Integrating financial wellness programs like Earned Wage Access (ABHI) for 3,400+ employees, building high-trust organizational environments through structured feedback.',
      tags: ['ABHI/EWA', 'Financial Wellness', 'Cultural Design', '3,400+ Employees'],
    },
];

const careerData = [
    {
      company: 'Riphah Group · IIMCT',
      icon: 'graduation-cap', color: 'bg-blue-600', borderColor: 'border-blue-600/30', iconColor: 'text-blue-600',
      period: 'Oct 2024 – Present',
      role: 'Manager — Performance Management & Strategy',
      desc: 'Overseeing faculties, hospitals, and corporate divisions for Islamic International Medical College Trust, driving institutional strategy and large-scale cultural interventions.',
    },
    {
      company: 'Ghulam Faruque Group',
      icon: 'factory', color: 'bg-orange-500', borderColor: 'border-orange-500/30', iconColor: 'text-orange-500',
      period: '2023 – 2024',
      role: 'Deputy Manager HR → HR Business Partner',
      desc: 'Led enterprise-scale digital HR transformation across a major conglomerate spanning Cherat Cement, Cherat Packaging, Faruque Private, Greaves Pakistan, and Greaves Air-Conditioning.',
    },
    {
      company: 'Ghulam Faruque Group',
      icon: 'factory', color: 'bg-emerald-500', borderColor: 'border-emerald-500/30', iconColor: 'text-emerald-500',
      period: '2017 – 2023',
      role: 'Management Trainee → Assistant Manager HR',
      desc: 'Built the foundational HR operations capability — core people operations, recruitment volume management, and policy infrastructure across diverse industrial divisions.',
    },
    {
      company: 'S&P Global Market Intelligence',
      icon: 'globe', color: 'bg-purple-600', borderColor: 'border-purple-600/30', iconColor: 'text-purple-600',
      period: '2017',
      role: 'Content Analyst',
      desc: 'Data governance, precision analytics, and complex hierarchy management for global financial institutions — establishing a rigorous data-first mindset applied throughout the HR career.',
    },
];

const industriesList = [
  'Human Resources', 'Cement', 'Packaging', 'Gensets', 'UPS and Inverters',
  'Elevators', 'Air-Conditioning', 'Solar', 'Finance', 'Marketing',
  'Healthcare', 'Education', 'Administration', 'Operations', 'IT'
];

const INDUSTRY_ICONS = {
  'Human Resources': 'users', 'Cement': 'factory', 'Packaging': 'package', 'Gensets': 'zap',
  'UPS and Inverters': 'battery', 'Elevators': 'arrow-up-down', 'Air-Conditioning': 'wind',
  'Solar': 'sun', 'Finance': 'dollar-sign', 'Marketing': 'megaphone', 'Healthcare': 'heart-pulse',
  'Education': 'graduation-cap', 'Administration': 'building', 'Operations': 'settings', 'IT': 'server'
};

const COLORS = ['#0071e3', '#ff9500', '#34c759', '#af52de', '#ff3b30', '#5ac8fa'];

function generateMockData(industry, index) {
  const seed = industry.length + index;
  const random = (offset = 0) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  const kpis = Array.from({length: 6}).map((_, i) => {
    const isPercentage = i % 2 === 0;
    const val = isPercentage ? (random(i) * 100).toFixed(1) + '%' : Math.floor(random(i) * 5000 + 100).toLocaleString();
    return {
      label: `${industry} Metric ${i+1}`,
      val,
      delta: (random(i+10) > 0.5 ? '↑ ' : '↓ ') + (random(i+20) * 5 + 0.1).toFixed(1) + '%',
      cls: random(i+30) > 0.3 ? 'text-green-500' : 'text-orange-500'
    };
  });

  const charts = Array.from({length: 9}).map((_, i) => {
    const type = i % 4; // 0: line, 1: bar, 2: pie, 3: radar
    const title = `Trend ${i+1}`;
    
    if (type === 0) {
      return { title, type: 'line', data: [
          { name: 'Jan', value: Math.floor(random(i*10) * 100) + 20 },
          { name: 'Feb', value: Math.floor(random(i*10+1) * 100) + 20 },
          { name: 'Mar', value: Math.floor(random(i*10+2) * 100) + 20 },
          { name: 'Apr', value: Math.floor(random(i*10+3) * 100) + 20 },
          { name: 'May', value: Math.floor(random(i*10+4) * 100) + 20 },
          { name: 'Jun', value: Math.floor(random(i*10+5) * 100) + 20 },
        ]
      };
    } else if (type === 1) {
      return { title, type: 'bar', data: [
          { name: 'Q1', value: Math.floor(random(i*10) * 500) + 100 },
          { name: 'Q2', value: Math.floor(random(i*10+1) * 500) + 100 },
          { name: 'Q3', value: Math.floor(random(i*10+2) * 500) + 100 },
          { name: 'Q4', value: Math.floor(random(i*10+3) * 500) + 100 },
        ]
      };
    } else if (type === 2) {
      return { title, type: 'pie', data: [
          { name: 'Segment A', value: Math.floor(random(i*10) * 100) + 10 },
          { name: 'Segment B', value: Math.floor(random(i*10+1) * 100) + 10 },
          { name: 'Segment C', value: Math.floor(random(i*10+2) * 100) + 10 },
          { name: 'Segment D', value: Math.floor(random(i*10+3) * 100) + 10 },
        ]
      };
    } else {
      return { title, type: 'radar', data: [
          { subject: 'Metric 1', A: Math.floor(random(i*10)*80)+20, fullMark: 100 },
          { subject: 'Metric 2', A: Math.floor(random(i*10+1)*80)+20, fullMark: 100 },
          { subject: 'Metric 3', A: Math.floor(random(i*10+2)*80)+20, fullMark: 100 },
          { subject: 'Metric 4', A: Math.floor(random(i*10+3)*80)+20, fullMark: 100 },
          { subject: 'Metric 5', A: Math.floor(random(i*10+4)*80)+20, fullMark: 100 },
        ]
      };
    }
  });

  return {
    title: `${industry} Dashboard`,
    subtitle: `Comprehensive analytics and metrics for ${industry}`,
    kpis,
    charts,
    table: {
      title: 'Detailed Breakdown',
      headers: ['Category', 'Value', 'Trend', 'Status'],
      rows: [
        ['Metric A', Math.floor(random(60) * 1000).toString(), '+5%', 'Optimal'],
        ['Metric B', Math.floor(random(61) * 1000).toString(), '+2%', 'Good'],
        ['Metric C', Math.floor(random(62) * 1000).toString(), '-1%', 'Monitor'],
        ['Metric D', Math.floor(random(63) * 1000).toString(), '+3%', 'Good'],
      ],
    },
  };
}

const dashboardsByIndustry = industriesList.reduce((acc, industry, index) => {
  acc[industry] = generateMockData(industry, index);
  return acc;
}, {});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Render Services
    const servicesGrid = document.getElementById('services-grid');
    servicesData.forEach((svc, i) => {
        servicesGrid.innerHTML += `
            <div class="w-full">
                <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500 group flex flex-col relative overflow-hidden h-full">
                    <div class="relative z-10 flex flex-col h-full">
                        <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 group-hover:scale-110 transition-transform duration-500">
                            <i data-lucide="${svc.icon}" class="w-6 h-6 ${svc.color}"></i>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 tracking-tight">${svc.title}</h3>
                        <p class="text-[15px] text-slate-400 leading-relaxed mb-8 font-medium flex-1">${svc.desc}</p>
                        <div class="flex flex-wrap gap-2 mt-auto">
                            ${svc.tags.map(tag => `<span class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-display font-semibold text-slate-300 shadow-sm group-hover:bg-white/10 transition-colors">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Render Career
    const careerGrid = document.getElementById('career-grid');
    careerData.forEach((exp, i) => {
        careerGrid.innerHTML += `
            <div class="relative flex flex-col items-center z-10">
                <div class="w-6 h-6 rounded-full border-[4px] border-[#050505] shadow-[0_0_15px_rgba(255,255,255,0.2)] ${exp.color} z-20 mb-8 relative">
                    <div class="absolute inset-0 rounded-full animate-ping-slow bg-current opacity-30"></div>
                </div>
                <div class="w-full h-full">
                    <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-700 group relative overflow-hidden h-full flex flex-col">
                        <div class="absolute top-0 left-0 w-full h-1 ${exp.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="flex flex-col gap-3 mb-6 relative z-10">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-2 shadow-sm border ${exp.borderColor} group-hover:scale-110 transition-transform duration-500">
                                    <i data-lucide="${exp.icon}" class="w-5 h-5 ${exp.iconColor}"></i>
                                </div>
                                <span class="text-[12px] font-display font-bold text-blue-400 uppercase tracking-widest leading-tight">${exp.company}</span>
                            </div>
                            <span class="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-display font-semibold text-slate-400 shadow-sm w-fit group-hover:bg-white/10 transition-colors">${exp.period}</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-3 tracking-tight leading-tight relative z-10">${exp.role}</h3>
                        <p class="text-[14px] text-slate-400 leading-relaxed font-medium italic font-serif relative z-10">${exp.desc}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Render AI Lab Buttons
    const industryButtons = document.getElementById('industry-buttons');
    const industrySidebar = document.getElementById('industry-sidebar');
    
    industriesList.forEach((ind, i) => {
        const icon = INDUSTRY_ICONS[ind];
        const color = COLORS[i % COLORS.length];
        
        industryButtons.innerHTML += `
            <button onclick="launchLab('${ind}')" class="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-sm text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300">
                <i data-lucide="${icon}" class="w-4 h-4" style="color: ${color}"></i>
                <span class="font-medium">${ind}</span>
            </button>
        `;

        industrySidebar.innerHTML += `
            <button onclick="selectIndustry('${ind}')" id="sidebar-btn-${ind.replace(/\s+/g, '-')}" class="sidebar-btn flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 border bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 hover:shadow-sm">
                <div class="flex items-center gap-3">
                    <div class="relative w-8 h-8 rounded-xl flex items-center justify-center transition-colors bg-white/5">
                        <i data-lucide="${icon}" class="w-4 h-4" style="color: ${color}"></i>
                    </div>
                    <span class="text-sm font-semibold text-slate-400">${ind}</span>
                </div>
            </button>
        `;
    });

    lucide.createIcons();

    // Interactivity
    
    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('bg-black/40', 'backdrop-blur-2xl', 'border-b', 'border-white/10', 'shadow-2xl');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-black/40', 'backdrop-blur-2xl', 'border-b', 'border-white/10', 'shadow-2xl');
            navbar.classList.add('bg-transparent');
        }
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'unset' : 'hidden';
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            document.body.style.overflow = 'unset';
        });
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // CountUp
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let count = 0;
                const duration = 2000;
                const interval = 20;
                const step = countTo / (duration / interval);
                
                const timer = setInterval(() => {
                    count += step;
                    if (count >= countTo) {
                        clearInterval(timer);
                        target.innerText = countTo;
                    } else {
                        target.innerText = Math.floor(count);
                    }
                }, interval);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    // Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.accordion-icon');
            const isHidden = content.classList.contains('hidden');
            
            // Close all
            accordionItems.forEach(i => {
                i.querySelector('.accordion-content').classList.add('hidden');
                i.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
            });
            
            if (isHidden) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // AI Lab Logic
    document.getElementById('launch-lab-btn').addEventListener('click', () => launchLab(industriesList[0]));
    document.getElementById('close-lab-btn').addEventListener('click', () => {
        document.getElementById('ai-lab-landing').classList.remove('hidden');
        document.getElementById('ai-lab-dashboard').classList.add('hidden');
        document.getElementById('ai-lab-dashboard').classList.remove('flex');
    });

    document.getElementById('time-filter').addEventListener('change', (e) => {
        if (window.currentIndustry) {
            renderDashboard(window.currentIndustry, e.target.value);
        }
    });
});

let chartsInstances = [];

window.launchLab = function(industry) {
    document.getElementById('ai-lab-landing').classList.add('hidden');
    document.getElementById('ai-lab-dashboard').classList.remove('hidden');
    document.getElementById('ai-lab-dashboard').classList.add('flex');
    
    const el = document.getElementById('ai-lab');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    
    selectIndustry(industry);
};

window.selectIndustry = function(industry) {
    window.currentIndustry = industry;
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('bg-white/10', 'shadow-[0_0_15px_rgba(255,255,255,0.1)]', 'border-white/20', 'scale-[1.02]');
        btn.classList.add('bg-transparent', 'border-transparent');
        btn.querySelector('span').classList.remove('text-white');
        btn.querySelector('span').classList.add('text-slate-400');
    });
    
    const activeBtn = document.getElementById(`sidebar-btn-${industry.replace(/\s+/g, '-')}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-white/10', 'shadow-[0_0_15px_rgba(255,255,255,0.1)]', 'border-white/20', 'scale-[1.02]');
        activeBtn.classList.remove('bg-transparent', 'border-transparent');
        activeBtn.querySelector('span').classList.add('text-white');
        activeBtn.querySelector('span').classList.remove('text-slate-400');
    }

    const timeFilter = document.getElementById('time-filter').value;
    renderDashboard(industry, timeFilter);
};

function renderDashboard(industry, timeFilter) {
    const data = dashboardsByIndustry[industry];
    if (!data) return;

    const icon = INDUSTRY_ICONS[industry];
    const color = COLORS[industriesList.indexOf(industry) % COLORS.length];
    
    let filterMultiplier = 1;
    switch (timeFilter) {
        case 'Last 7 Days': filterMultiplier = 0.25; break;
        case 'Last 30 Days': filterMultiplier = 1; break;
        case 'Q3 2025': filterMultiplier = 3; break;
        case 'YTD': filterMultiplier = 8; break;
        case 'All Time': filterMultiplier = 24; break;
    }

    const applyFilterToKpi = (valStr) => {
        const numMatch = valStr.match(/[\d,.]+/);
        if (!numMatch) return valStr;
        const numStr = numMatch[0].replace(/,/g, '');
        const num = parseFloat(numStr);
        if (isNaN(num)) return valStr;
        if (valStr.includes('%') || num < 10) return valStr;
        const scaledNum = Math.round(num * filterMultiplier);
        return valStr.replace(numMatch[0], scaledNum.toLocaleString());
    };

    let html = `
        <div class="flex items-center justify-between border-b border-white/10 pb-6">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                    <i data-lucide="${icon}" class="w-7 h-7" style="color: ${color}"></i>
                </div>
                <div>
                    <h3 class="text-2xl md:text-3xl font-bold text-white mb-1">${data.title}</h3>
                    <p class="text-slate-400 text-sm font-medium">${data.subtitle} • ${timeFilter}</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
            ${data.kpis.map((kpi, i) => `
                <div class="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300 relative overflow-hidden group h-full">
                    <div class="relative z-10">
                        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">${kpi.label}</div>
                        <div class="text-3xl font-bold text-white mb-1">${applyFilterToKpi(kpi.val)}</div>
                        <div class="text-[13px] font-bold ${kpi.cls}">${kpi.delta}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="grid lg:grid-cols-3 gap-6">
            ${data.charts.map((chart, i) => `
                <div class="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300 relative overflow-hidden group h-full">
                    <div class="relative z-10">
                        <h4 class="text-[13px] font-bold text-slate-300 mb-4 flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full" style="background-color: ${COLORS[i % COLORS.length]}"></div>
                            ${chart.title}
                        </h4>
                        <div class="w-full h-[180px] relative">
                            <canvas id="chart-${i}"></canvas>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="bg-white/5 rounded-2xl p-6 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)] overflow-hidden">
            <h4 class="text-[14px] font-bold text-white mb-6 flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-orange-400"></div>
                ${data.table.title}
            </h4>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            ${data.table.headers.map(h => `<th class="py-3 px-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">${h}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${data.table.rows.map(row => `
                            <tr class="hover:bg-white/5 transition-colors">
                                ${row.map(cell => `
                                    <td class="py-3 px-4 text-[14px] text-slate-300 border-b border-white/5 font-medium">
                                        ${cell === 'Optimal' || cell === 'Good' ? `<span class="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[12px] font-bold">${cell}</span>` : cell === 'Monitor' ? `<span class="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[12px] font-bold">${cell}</span>` : cell}
                                    </td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('dashboard-content').innerHTML = html;
    lucide.createIcons();

    // Render Charts
    chartsInstances.forEach(c => c.destroy());
    chartsInstances = [];

    data.charts.forEach((chart, i) => {
        const ctx = document.getElementById(`chart-${i}`);
        if (!ctx) return;

        const chartColor = COLORS[i % COLORS.length];
        
        let chartData = chart.data.map(item => {
            const newItem = { ...item };
            Object.keys(newItem).forEach(key => {
                if (typeof newItem[key] === 'number' && key !== 'fullMark') {
                    newItem[key] = Math.round(newItem[key] * filterMultiplier);
                }
            });
            return newItem;
        });

        const labels = chartData.map(d => d.name || d.subject);
        const dataKey = Object.keys(chartData[0]).find(k => k !== 'name' && k !== 'subject' && k !== 'fullMark');
        const values = chartData.map(d => d[dataKey]);

        let config = {
            type: chart.type === 'radar' ? 'radar' : chart.type === 'pie' ? 'pie' : chart.type === 'line' ? 'line' : 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chart.title,
                    data: values,
                    backgroundColor: chart.type === 'pie' ? COLORS : chart.type === 'radar' ? chartColor + '33' : chartColor,
                    borderColor: chartColor,
                    borderWidth: chart.type === 'pie' ? 0 : 2,
                    fill: chart.type === 'line' ? false : true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: chart.type === 'pie' || chart.type === 'radar' ? {} : {
                    x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 10 } } }
                }
            }
        };

        if (chart.type === 'radar') {
            config.options.scales = {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.05)' },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    pointLabels: { color: '#64748b', font: { size: 10 } },
                    ticks: { display: false }
                }
            };
        }

        chartsInstances.push(new Chart(ctx, config));
    });
}

    