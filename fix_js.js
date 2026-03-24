import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

const oldJs = `      // Intersection Observer for animations
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
      });`;

content = content.replace(oldJs, '');

const newJs = `
      // Intersection Observer for animations
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.liquid-glass, section h2, section p, .accordion-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
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

content = content.replace('      // Theme Toggle Logic', newJs + '\n      // Theme Toggle Logic');

// Also remove the old navbar scroll logic
const oldNavScroll = `        // Navbar Scroll
        const navbar = document.getElementById("navbar");
        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            navbar.classList.add("bg-[#050505]/80", "backdrop-blur-md");
          } else {
            navbar.classList.remove("bg-[#050505]/80", "backdrop-blur-md");
          }
        });`;
content = content.replace(oldNavScroll, '');

fs.writeFileSync('index.html', content);
console.log('Done');
