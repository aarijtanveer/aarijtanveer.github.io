/* Arij Tanveer, portfolio v5: navigation, search, gallery, viewer, lab and the project brief. No libraries. */
(() => {
  const root = document.documentElement, $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  root.classList.add('js');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PAGE = document.body.dataset.page;
  const P = window.PROJECTS || [];
  const CAT = { vigilant: 'HR systems', analytics: 'People analytics', strategy: 'Strategy and rewards', excel: 'Excel and Power BI', ai: 'AI and automation', decks: 'Decks and training', apps: 'Apps' };
  const SHORT = { vigilant: 'HR systems', analytics: 'Analytics', strategy: 'Strategy', excel: 'Excel and BI', ai: 'AI', decks: 'Training', apps: 'Apps' };
  const ORDER = ['analytics', 'strategy', 'vigilant', 'ai', 'excel', 'decks', 'apps'];
  const CONTACT = { mail: 'aarij.tanveer@hotmail.com', wa: '923475007070', cal: 'https://calendly.com/arij-tanveer/30min', li: 'https://www.linkedin.com/in/aarij-tanveer' };
  const ic = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const I = {
    search: ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    grid: ic('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    chart: ic('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    brief: ic('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),
    page: ic('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    chat: ic('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    cal: ic('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>'),
    link: ic('<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>'),
    sun: ic('<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z"/></svg>',
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>',
    user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>')
  };

  /* ---------- Appearance: Auto follows the device live; Light and Dark are fixed ---------- */
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const getMode = () => { try { return localStorage.getItem('at-mode') || 'auto'; } catch (e) { return 'auto'; } };
  const NAME = { auto: 'Auto', light: 'Light', dark: 'Dark' }, ICON = { auto: I.auto, light: I.sun, dark: I.moon };
  const applyMode = () => {
    const m = getMode(), dark = m === 'dark' || (m === 'auto' && mq.matches);
    root.classList.toggle('is-dark', dark);
    $$('.mode').forEach(b => { b.innerHTML = ICON[m] + `<span class="lbl">${NAME[m]}</span>`; b.setAttribute('aria-label', `Appearance: ${NAME[m]}. Change appearance`); });
    const tc = $('meta[name="theme-color"]'); if (tc) tc.content = dark ? '#000000' : '#ffffff';
  };
  const setMode = m => { try { localStorage.setItem('at-mode', m); } catch (e) {} applyMode(); };
  $$('.mode').forEach(b => b.addEventListener('click', () => setMode({ auto: 'light', light: 'dark', dark: 'auto' }[getMode()])));
  mq.addEventListener ? mq.addEventListener('change', applyMode) : mq.addListener(applyMode);
  applyMode();

  /* ---------- The bar: hides while reading down, returns on any scroll up; shows reading progress ---------- */
  const bar = $('.bar'), prog = $('.progress');
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    const searching = !$('.cmdk').hidden;
    if (!searching) bar.classList.toggle('away', y > 320 && y > lastY + 4 ? true : (y < lastY - 4 || y < 320) ? false : bar.classList.contains('away'));
    lastY = y; ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  bar.addEventListener('focusin', () => bar.classList.remove('away'));

  /* Where am I: page links light up by page; on the home page, by the section on screen */
  const navs = $$('[data-nav]');
  const mark = key => navs.forEach(a => a.classList.toggle('on', a.dataset.nav === key));
  if (PAGE === 'home' && 'IntersectionObserver' in window) {
    const secs = ['top', 'about', 'work'].map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) mark(e.target.id === 'top' ? '' : e.target.id); }), { rootMargin: '-40% 0px -55% 0px' });
    secs.forEach(s => io.observe(s));
  } else mark(PAGE);
  /* On the home page, its own links scroll instead of reloading */
  $$('a[href^="index.html#"]').forEach(a => a.addEventListener('click', e => {
    if (PAGE !== 'home') return; const t = document.getElementById(a.hash.slice(1)); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); history.replaceState(null, '', a.hash); }
  }));

  /* ---------- Previews and reveal ---------- */
  $$('[data-pv]').forEach(el => window.mountPreview(el, el.dataset.pv));
  const rv = $$('.rv');
  rv.forEach(e => { const sib = [...e.parentElement.children].filter(x => x.classList.contains('rv')); e.style.setProperty('--rvd', Math.min(sib.indexOf(e), 6) * 45 + 'ms'); });
  if (RM || !('IntersectionObserver' in window)) rv.forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
  else {
    rv.forEach(e => e.style.transition = 'opacity .55s cubic-bezier(.2,.8,.2,1) var(--rvd), transform .55s cubic-bezier(.2,.8,.2,1) var(--rvd)');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; io.unobserve(e.target); setTimeout(() => { e.target.style.transition = ''; }, 900); } }), { rootMargin: '0px 0px -6% 0px' });
    rv.forEach(e => io.observe(e));
  }
  /* Counters: quick, eased, tabular */
  const cio = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), D = RM ? 1 : 900;
    const f = t => { const k = Math.min(1, (t - t0) / D), v = Math.round(to * (1 - Math.pow(1 - k, 3))); el.textContent = v.toLocaleString('en-US') + suf; if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f); }), { threshold: .6 }) : null;
  $$('[data-count]').forEach(el => { if (/^\d+$/.test(el.dataset.count) && cio) { el.textContent = '0' + (el.dataset.suffix || ''); cio.observe(el); } });
  /* Bars in the analytics tile grow when seen */
  const bio = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('go'); bio.unobserve(e.target); } }), { threshold: .5 }) : null;
  $$('.minibars').forEach(b => bio ? bio.observe(b) : b.classList.add('go'));
  /* Spotlight follows the pointer */
  document.addEventListener('pointermove', e => { const c = e.target.closest && e.target.closest('.spot'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); }, { passive: true });
  /* The story lights up word by word as you read */
  const scrub = $('.scrub');
  if (scrub) { scrub.innerHTML = scrub.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' '); }
  const words = scrub ? $$('.w', scrub) : [];
  const tl = $('.tl6'), jobs = $$('.job');
  const rig = $('.rig'), rigD = rig && $('.display', rig);
  const onFrame = () => {
    const vh = innerHeight;
    if (words.length) { const r = scrub.getBoundingClientRect(), k = RM ? 1 : Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35))); const n = Math.round(k * words.length); words.forEach((w, i) => w.classList.toggle('on', i < n)); }
    if (tl) { const r = tl.getBoundingClientRect(), k = Math.min(1, Math.max(0, (vh * .55 - r.top) / r.height)); tl.style.setProperty('--p', k.toFixed(3)); jobs.forEach(j => j.classList.toggle('lit', j.getBoundingClientRect().top < vh * .55)); }
    if (rig && !RM) { const k = Math.min(1, Math.max(0, scrollY / (vh * .9))); rig.style.setProperty('--sx', (-k * 60) + 'px'); rigD.style.transform = `scale(${1 + k * .06}) translateY(${k * -20}px)`; }
  };
  let fr = false; addEventListener('scroll', () => { if (!fr) { fr = true; requestAnimationFrame(() => { onFrame(); fr = false; }); } }, { passive: true }); addEventListener('resize', onFrame); onFrame();
  $$('[data-projects]').forEach(e => e.textContent = P.length);
  $$('[data-ex]').forEach(a => { const p = P.find(x => x.id === a.dataset.ex); a.textContent = p ? p.title : a.dataset.ex; });

  /* ---------- Hero showreel: click the screen to open that project ---------- */
  const scr = $('.display .screen');
  if (scr) {
    const ids = scr.dataset.reel.split(','), reel = $('.reel');
    const slots = ids.map(id => { const d = document.createElement('div'); scr.appendChild(d); window.mountPreview(d, id); return d; });
    let cur = 0, timer;
    const show = i => { cur = i; reel.style.setProperty('--reel', '5s'); $$('button', reel).forEach(b => b.style.animation = 'none'); requestAnimationFrame(() => $$('button', reel).forEach(b => b.style.animation = '')); slots.forEach((s, j) => s.classList.toggle('on', j === i)); $$('button', reel).forEach((b, j) => { b.setAttribute('aria-current', 'false'); if (j === i) { void b.offsetWidth; b.setAttribute('aria-current', 'true'); } }); scr.setAttribute('aria-label', 'Open ' + P.find(p => p.id === ids[i]).title); };
    const loop = () => { clearInterval(timer); if (!RM) timer = setInterval(() => show((cur + 1) % ids.length), 5000); };
    ids.forEach((id, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = P.find(p => p.id === id).title; b.addEventListener('click', () => { show(i); loop(); }); reel.appendChild(b); });
    scr.tabIndex = 0; scr.setAttribute('role', 'button');
    const openCur = () => openViewer(ids[cur], scr, ids);
    scr.addEventListener('click', openCur); scr.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCur(); } });
    show(0); loop();
  }

  /* ---------- Gallery: filters in place, remembered in the link ---------- */
  const grid = $('#gallery'), filt = $('.filters .in'), count = $('.count');
  let filter = 'all';
  const visibleIds = () => P.filter(p => filter === 'all' || p.cat === filter).sort((a, b) => ORDER.indexOf(a.cat) - ORDER.indexOf(b.cat)).map(p => p.id);
  if (grid) {
    const cards = new Map();
    [...P].sort((a, b) => ORDER.indexOf(a.cat) - ORDER.indexOf(b.cat)).forEach(p => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'pcard spot'; b.dataset.cat = p.cat;
      b.innerHTML = `<div class="pvh"></div><div class="meta"><span class="cat">${CAT[p.cat]}</span><h3>${p.title}</h3><p>${p.desc}</p>${p.looks ? `<span class="looks-note">Cycling through its ${p.looks.length} built-in looks</span>` : ''}<div class="tags">${[...new Set(p.stack)].slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}</div></div>`;
      grid.appendChild(b); window.mountPreview($('.pvh', b), p.id); cards.set(p.id, b);
      b.addEventListener('click', () => openViewer(p.id, b, visibleIds()));
    });
    const mk = (key, label, n) => { const c = document.createElement('button'); c.type = 'button'; c.className = 'chipf'; c.dataset.f = key; c.innerHTML = `${label}<span>${n}</span>`; c.addEventListener('click', () => setFilter(key, true)); filt.appendChild(c); };
    mk('all', 'All', P.length); ORDER.forEach(k => mk(k, SHORT[k], P.filter(p => p.cat === k).length));
    window.setFilter = (key, user) => {
      filter = CAT[key] ? key : 'all';
      $$('.chipf', filt).forEach(c => { c.setAttribute('aria-pressed', String(c.dataset.f === filter)); if (c.dataset.f === filter && filt.scrollWidth > filt.clientWidth) filt.scrollTo({ left: c.offsetLeft - filt.clientWidth / 2 + c.clientWidth / 2, behavior: user ? 'smooth' : 'auto' }); });
      let vi = 0; cards.forEach(b => { b.hidden = !(filter === 'all' || b.dataset.cat === filter); b.classList.remove('pop'); if (!b.hidden && user) { b.style.setProperty('--i', Math.min(vi++, 8)); void b.offsetWidth; b.classList.add('pop'); } });
      const n = visibleIds().length; count.textContent = filter === 'all' ? `All ${n} projects` : `${n} of ${P.length} projects: ${CAT[filter]}`;
      if (user) { history.replaceState(null, '', filter === 'all' ? '#work' : '#work=' + filter); const w = $('#work'); if (w.getBoundingClientRect().top < -10 || w.getBoundingClientRect().top > innerHeight * .5) w.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); }
    };
    var setFilter = window.setFilter;
  }

  /* ---------- Viewer: arrows step through the current filter; the link opens a project directly ---------- */
  const viewer = $('.viewer'); let vList = [], vIdx = 0, back = null;
  function openViewer(id, from, list) {
    if (!viewer) { location.href = 'index.html#p=' + id; return; }
    const allIds = P.map(x => x.id).sort((a, b) => ORDER.indexOf(P.find(x => x.id === a).cat) - ORDER.indexOf(P.find(x => x.id === b).cat)); vList = list && list.includes(id) ? list : (visibleIds().includes(id) ? visibleIds() : allIds); vIdx = Math.max(0, vList.indexOf(id)); if (from) back = from;
    const p = P.find(x => x.id === vList[vIdx] || x.id === id);
    const host = $('.vpv', viewer); host.innerHTML = '<div></div>'; window.mountPreview(host.firstChild, p.id);
    $('.vcat', viewer).textContent = CAT[p.cat]; $('h2', viewer).textContent = p.title; $('.vdesc', viewer).textContent = p.desc;
    $('.vwhere', viewer).textContent = p.where; $('.vstack', viewer).textContent = p.stack.join(', ');
    $('.vlike', viewer).href = 'services.html?ref=' + p.id + '#brief';
    $('.vpos', viewer).textContent = `${vIdx + 1} of ${vList.length}`;
    if (viewer.hidden) { viewer.hidden = false; requestAnimationFrame(() => viewer.classList.add('open')); document.body.style.overflow = 'hidden'; $('.x', viewer).focus(); }
    history.replaceState(null, '', '#p=' + p.id);
  }
  const step = d => { if (!vList.length) return; vIdx = (vIdx + d + vList.length) % vList.length; openViewer(vList[vIdx], null, vList); };
  const closeViewer = () => {
    viewer.classList.remove('open'); document.body.style.overflow = '';
    setTimeout(() => { viewer.hidden = true; $('.vpv', viewer).innerHTML = ''; }, 300);
    history.replaceState(null, '', filter === 'all' ? '#work' : '#work=' + filter); back && back.focus();
  };
  if (viewer) {
    $('.x', viewer).addEventListener('click', closeViewer);
    $('.vprev', viewer).addEventListener('click', () => step(-1)); $('.vnext', viewer).addEventListener('click', () => step(1));
    viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });
    addEventListener('keydown', e => { if (viewer.hidden) return; if (e.key === 'Escape') closeViewer(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
  }

  /* Read the link: #work=ai filters, #p=pf opens a project */
  const route = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (grid) { const m = h.match(/^work=(\w+)/); setFilter(m ? m[1] : (h.startsWith('work') ? 'all' : filter), false); }
    const pm = h.match(/^p=([\w-]+)/); if (pm && P.some(p => p.id === pm[1])) { if (viewer && viewer.hidden) openViewer(pm[1], null); }
    if (m2(h)) { const t = document.getElementById(h.split('=')[0]); if (t) setTimeout(() => t.scrollIntoView(), 30); }
  };
  const m2 = h => /^work=/.test(h);
  addEventListener('hashchange', route); route();

  /* ---------- Search everything ---------- */
  const SERVICES = window.SERVICES || [];
  const go = url => { const u = new URL(url, location.href); if (u.pathname === location.pathname && u.hash) { location.hash = u.hash; route(); const t = document.getElementById(u.hash.slice(1).split('=')[0]); if (t && !u.hash.startsWith('#p=')) t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); } else location.href = url; };
  const items = () => {
    const L = [];
    P.forEach(p => L.push({ g: 'Projects', t: p.title, s: `${CAT[p.cat]}, ${p.stack.slice(0, 2).join(', ')}`, k: [p.desc, p.where, CAT[p.cat], ...p.stack].join(' '), icon: '<i></i>', sw: (p.looks && p.looks[0][2]) || null,
      run: () => (PAGE === 'home' ? openViewer(p.id, null, null) : (location.href = 'index.html#p=' + p.id)) }));
    L.push({ g: 'Go to', t: 'All work', s: `${P.length} projects`, k: 'portfolio gallery projects', icon: I.grid, run: () => go('index.html#work') });
    ORDER.forEach(k => L.push({ g: 'Go to', t: CAT[k], s: 'Filter the work', k: 'category filter', icon: I.grid, run: () => go('index.html#work=' + k) }));
    L.push({ g: 'Go to', t: 'BI lab', s: '15 industry dashboards', k: 'business intelligence demo analytics', icon: I.chart, run: () => go('lab.html') });
    (window.LAB_INDUSTRIES || []).forEach(n => L.push({ g: 'BI lab', t: n + ' dashboard', s: 'Open in the BI lab', k: 'industry kpi', icon: I.chart, run: () => go('lab.html#' + encodeURIComponent(n)) }));
    L.push({ g: 'Go to', t: 'Services', s: 'Hire me for an independent project', k: 'freelance consulting hire work with me pricing', icon: I.brief, run: () => go('services.html') });
    SERVICES.forEach(s => L.push({ g: 'Services', t: s.t, s: 'Service', k: s.k, icon: I.brief, run: () => go('services.html?s=' + s.id + '#brief') }));
    L.push({ g: 'Go to', t: 'About', s: 'Background and tools', k: 'experience bio who', icon: I.user, run: () => go('index.html#about') });
    L.push({ g: 'Actions', t: 'Start a project', s: 'Write a short brief', k: 'hire contact quote brief', icon: I.page, run: () => go('services.html#brief') });
    L.push({ g: 'Actions', t: 'Book a call', s: '30 minutes', k: 'calendly meeting schedule', icon: I.cal, run: () => window.open(CONTACT.cal, '_blank', 'noopener') });
    L.push({ g: 'Actions', t: 'Email', s: CONTACT.mail, k: 'mail contact', icon: I.mail, run: () => location.href = 'mailto:' + CONTACT.mail });
    L.push({ g: 'Actions', t: 'WhatsApp', s: 'Message me', k: 'chat phone contact', icon: I.chat, run: () => window.open('https://wa.me/' + CONTACT.wa, '_blank', 'noopener') });
    L.push({ g: 'Actions', t: 'LinkedIn', s: 'Profile', k: 'linkedin social', icon: I.link, run: () => window.open(CONTACT.li, '_blank', 'noopener') });
    ['auto', 'light', 'dark'].forEach(m => L.push({ g: 'Appearance', t: { auto: 'Match my device', light: 'Light mode', dark: 'Dark mode' }[m], s: getMode() === m ? 'Current' : '', k: 'theme appearance mode colour', icon: ICON[m], run: () => setMode(m) }));
    return L;
  };
  const ck = $('.cmdk'), inp = $('input', ck), res = $('.res', ck); let all = [], shown = [], sel = 0, opener = null;
  const DEFAULT = ['All work', 'BI lab', 'Services', 'Start a project', 'Book a call'];
  const score = (it, q) => {
    const t = it.t.toLowerCase(), hay = (it.t + ' ' + it.s + ' ' + it.k + ' ' + it.g).toLowerCase(), ws = q.split(/\s+/).filter(Boolean);
    if (!ws.every(w => hay.includes(w))) return 0;
    return (t.startsWith(q) ? 100 : 0) + (t.includes(q) ? 50 : 0) + ws.filter(w => t.includes(w)).length * 10 + (it.g === 'Projects' ? 3 : 0);
  };
  const render = () => {
    const q = inp.value.trim().toLowerCase();
    shown = q ? all.map(it => [it, score(it, q)]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, 40).map(x => x[0])
      : [...DEFAULT.map(n => all.find(i => i.t === n)), ...all.filter(i => i.g === 'Projects').slice(0, 6)];
    sel = 0; res.innerHTML = '';
    if (!shown.length) { res.innerHTML = `<p class="none">Nothing matches “${inp.value.replace(/</g, '&lt;')}”. Try a tool, like Power BI, or a topic, like budget.</p>`; return; }
    const groups = [...new Set(shown.map(i => q ? i.g : (i.g === 'Projects' ? 'Projects' : 'Jump to')))];
    groups.forEach(g => {
      const h = document.createElement('div'); h.className = 'grp'; h.textContent = g; res.appendChild(h);
      shown.filter(i => (q ? i.g : (i.g === 'Projects' ? 'Projects' : 'Jump to')) === g).forEach(it => {
        const b = document.createElement('button'); b.type = 'button'; b.className = 'it'; b.setAttribute('role', 'option'); b.dataset.i = shown.indexOf(it);
        b.innerHTML = `<span class="ic"${it.sw ? ` style="--sw:${it.sw}"` : ''}>${it.icon}</span><span><b>${it.t}</b>${it.s ? `<small>${it.s}</small>` : ''}</span><em>${it.g === 'Projects' ? 'Open' : 'Go'}</em>`;
        b.addEventListener('click', () => pick(+b.dataset.i)); b.addEventListener('mousemove', () => hi(+b.dataset.i)); res.appendChild(b);
      });
    });
    hi(0);
  };
  const hi = i => { sel = i; $$('.it', res).forEach(b => { const on = +b.dataset.i === i; b.setAttribute('aria-selected', String(on)); if (on) b.scrollIntoView({ block: 'nearest' }); }); };
  const openK = () => { opener = document.activeElement; all = items(); ck.hidden = false; inp.value = ''; render(); inp.focus(); document.body.style.overflow = 'hidden'; };
  const closeK = () => { ck.hidden = true; document.body.style.overflow = viewer && !viewer.hidden ? 'hidden' : ''; opener && opener.focus && opener.focus(); };
  const pick = i => { const it = shown[i]; if (!it) return; closeK(); it.run(); };
  $$('[data-search]').forEach(b => b.addEventListener('click', openK));
  inp.addEventListener('input', render);
  inp.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); hi(Math.min(sel + 1, shown.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); hi(Math.max(sel - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); pick(sel); }
    else if (e.key === 'Escape') { e.preventDefault(); closeK(); }
  });
  ck.addEventListener('click', e => { if (e.target === ck) closeK(); });
  addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); ck.hidden ? openK() : closeK(); }
  });
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform); $$('.kbd-mod').forEach(k => k.textContent = isMac ? '⌘K' : 'Ctrl K');

  /* ---------- BI lab ---------- */
  const lab = $('.lab-root'); if (lab) window.mountLab(lab);

  /* ---------- Services: pick a service, it lands in the brief ---------- */
  const brief = $('#brief-form');
  if (brief) {
    const qs = new URLSearchParams(location.search), svc = qs.get('s'), ref = qs.get('ref');
    const tick = id => { const box = brief.querySelector(`input[name=svc][value="${id}"]`); if (box) box.checked = true; };
    if (svc) tick(svc);
    if (ref) { const p = P.find(x => x.id === ref); if (p) { const s = SERVICES.find(x => x.ex.includes(ref)); if (s) tick(s.id); const ta = brief.querySelector('textarea'); if (!ta.value) ta.value = `Something like your ${p.title}, for our organisation: `; } }
    $$('[data-pick]').forEach(b => b.addEventListener('click', () => { tick(b.dataset.pick); $('#brief').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); history.replaceState(null, '', '?s=' + b.dataset.pick + '#brief'); }));
    const compose = () => {
      const f = new FormData(brief), list = f.getAll('svc').map(v => (SERVICES.find(s => s.id === v) || {}).t).filter(Boolean);
      const lines = [`Hello Arij,`, ``, `I'd like to discuss a project.`, ``,
        `What we need: ${list.length ? list.join('; ') : 'not sure yet'}`, `Organisation size: ${f.get('size') || 'not given'}`, `Timing: ${f.get('when') || 'not given'}`, ``,
        `${(f.get('what') || '').trim()}`, ``, `${(f.get('name') || '').trim()}${f.get('org') ? ', ' + f.get('org').trim() : ''}`];
      return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    };
    const err = $('.err', brief);
    const ok = () => { const what = (brief.what.value || '').trim(), name = (brief.name.value || '').trim(); if (!what || !name) { err.textContent = !what ? 'Add a line about what you need, so I can reply with something useful.' : 'Add your name, so I know who to reply to.'; (what ? brief.name : brief.what).focus(); return false; } err.textContent = ''; return true; };
    $('[data-send=mail]', brief).addEventListener('click', () => { if (!ok()) return; const subj = 'Project enquiry' + (brief.org.value ? ': ' + brief.org.value.trim() : ''); location.href = `mailto:${CONTACT.mail}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(compose())}`; });
    $('[data-send=wa]', brief).addEventListener('click', () => { if (!ok()) return; window.open(`https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(compose())}`, '_blank', 'noopener'); });
  }

})();
