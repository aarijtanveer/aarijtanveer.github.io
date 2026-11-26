/* Animated project previews. Every preview is drawn in code, in the theme of the artifact it represents.
   No values are shown: numbers are frosted redaction bars. No names of real people appear. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const R = (a, b) => a + Math.random() * (b - a);
  const RI = (a, b) => Math.round(R(a, b));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const rd = (c = '') => `<span class="rd ${c}"></span>`;
  const lines = (n, w = [100, 86, 70, 92, 60]) => Array.from({ length: n }, (_, i) => `<div class="ln" style="width:${w[i % w.length]}%"></div>`).join('');
  const path = (vals, W = 300, H = 80) => { const mx = Math.max(...vals), mn = Math.min(...vals); return 'M' + vals.map((v, i) => `${(i / (vals.length - 1)) * W},${H - 6 - ((v - mn) / (mx - mn || 1)) * (H - 12)}`).join(' L'); };
  const series = (n, a = 20, b = 70) => { let v = R(a, b); return Array.from({ length: n }, () => (v = Math.max(a, Math.min(b, v + R(-12, 12))))); };
  const redraw = el => { el.classList.remove('on'); void el.getBoundingClientRect(); el.classList.add('on'); };
  const ring = (r, c, w = 7) => `<circle r="${r}" cx="50" cy="50" fill="none" stroke="color-mix(in srgb, ${c} 18%, transparent)" stroke-width="${w}"/><circle class="rg" r="${r}" cx="50" cy="50" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${(2 * Math.PI * r).toFixed(1)}" stroke-dashoffset="${(2 * Math.PI * r).toFixed(1)}" transform="rotate(-90 50 50)" style="transition:stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1)"/>`;
  const setRings = el => el.querySelectorAll('.rg').forEach(c => { const L = +c.getAttribute('stroke-dasharray'); c.style.strokeDashoffset = L * (1 - R(.35, .95)); });
  const bars = (n, cls = '') => `<div class="bars ${cls}">${'<div class="bar"></div>'.repeat(n)}</div>`;
  const setBars = (el, sel = '.bar', lo = .2) => el.querySelectorAll(sel).forEach(b => b.style.transform = `scaleY(${R(lo, 1)})`);
  const setFills = (el, sel = '.fl', lo = .25) => el.querySelectorAll(sel).forEach(f => f.style.transform = `scaleX(${R(lo, 1)})`);
  const typeInto = (node, text, speed = 32, timers) => { node.textContent = ''; [...text].forEach((ch, i) => timers.push(setTimeout(() => node.textContent += ch, i * speed))); return text.length * speed; };

  const K = {};

  /* HDS Budget Dashboard: iOS "Summary" page, Riphah navy and gold, three budget rings, Health tiles, glass tab bar */
  K.ios = el => {
    el.innerHTML = `<div class="in" style="gap:2.2cqw">
      <div class="row"><div><div class="m">Position-wise budget</div><div class="tt">Summary</div></div><span class="sp"></span><span class="glass" style="border-radius:99px;padding:1cqw 2.4cqw;font-weight:600;font-size:max(9px,1.6cqw)">All campuses</span></div>
      <div class="row" style="align-items:stretch;flex:1;min-height:0">
        <div class="card" style="flex:1.3;display:flex;gap:2.4cqw;align-items:center"><svg viewBox="0 0 100 100" style="width:42%;height:auto">${ring(40, 'var(--a1)')}${ring(30, 'var(--a2)')}${ring(20, 'var(--a3)')}</svg>
          <div style="display:grid;gap:1.6cqw;flex:1">${['Existing', 'Vacant', 'Additional'].map((t, i) => `<div><div class="row" style="gap:1cqw"><span class="dot" style="background:var(--a${i + 1})"></span><span class="m">${t}</span></div>${rd('l')}</div>`).join('')}</div></div>
        <div style="flex:1;display:grid;gap:2cqw;grid-template-rows:1fr 1fr">
          <div class="card" style="display:flex;flex-direction:column;gap:1cqw"><span class="t" style="color:var(--a1)">Months of impact</span>${rd()}${bars(12, 'mi')}</div>
          <div class="card" style="display:flex;flex-direction:column;gap:1cqw"><span class="t" style="color:var(--a2)">Separations</span>${rd()}${bars(12, 'se')}</div>
        </div>
      </div>
      <div class="card hb">${['Islamabad', 'Rawalpindi', 'Lahore', 'Malakand'].map(c => `<div class="hr"><span>${c}</span><div class="trk"><div class="fl"></div></div></div>`).join('')}</div>
      <div class="glass" style="position:absolute;left:50%;bottom:2.4cqw;transform:translateX(-50%);border-radius:99px;padding:1cqw;display:flex;gap:1cqw;box-shadow:0 8px 24px rgba(0,0,0,.12)">${['Summary', 'Positions', 'Campus', 'Log'].map((t, i) => `<span class="tb" style="padding:1cqw 2.4cqw;border-radius:99px;font-size:max(9px,1.5cqw);font-weight:600;transition:background-color .4s,color .4s">${t}</span>`).join('')}</div></div>`;
    el.querySelectorAll('.mi .bar').forEach(b => b.style.background = 'var(--a1)');
    el.querySelectorAll('.se .bar').forEach(b => b.style.background = 'var(--a2)');
    let k = 0; const tb = el.querySelectorAll('.tb');
    return () => { setRings(el); setBars(el); setFills(el); tb.forEach((t, i) => { const on = i === k % 4; t.style.background = on ? 'var(--a1)' : 'transparent'; t.style.color = on ? '#fff' : 'var(--ink)'; }); k++; };
  };

  /* Headcount Office 3D: light floor, navy and gold desks, glass identity card, Maps-style controls, room dock */
  K.office = el => {
    el.innerHTML = `<div class="in" style="padding:0">
      <div style="position:absolute;inset:0;display:grid;place-items:center;perspective:1200px"><div class="iso" style="display:grid;grid-template-columns:repeat(12,4.2cqw);gap:1.1cqw;transform:rotateX(56deg) rotateZ(-36deg);transform-style:preserve-3d;transition:transform 6s ease-in-out">${'<i></i>'.repeat(72)}</div></div>
      <div class="glass" style="position:absolute;top:3cqw;left:3cqw;border-radius:2.4cqw;padding:1.8cqw 2.4cqw;display:flex;gap:1.6cqw;align-items:center;box-shadow:var(--shadow)"><span style="width:5cqw;height:5cqw;border-radius:1.2cqw;background:var(--a1)"></span><div><div class="m">Riphah HDS</div><div class="t">Headcount floor</div>${rd('big')}</div></div>
      <div style="position:absolute;top:3cqw;right:3cqw;display:grid;gap:1.2cqw">${'<span class="glass" style="width:6cqw;height:6cqw;border-radius:1.6cqw;display:block;box-shadow:var(--shadow)"></span>'.repeat(3)}</div>
      <div class="glass" style="position:absolute;bottom:3cqw;left:50%;transform:translateX(-50%);border-radius:2.6cqw;padding:1.2cqw;display:flex;gap:1cqw;box-shadow:var(--shadow)">${['Floor', 'Analytics', 'Provident Fund', 'Team', 'Hub'].map(t => `<span class="rm" style="padding:1.2cqw 2.2cqw;border-radius:1.6cqw;font-weight:600;font-size:max(9px,1.5cqw);transition:background-color .4s,color .4s">${t}</span>`).join('')}</div></div>`;
    const tiles = el.querySelectorAll('.iso i'), iso = el.querySelector('.iso'), rm = el.querySelectorAll('.rm'); let k = 0;
    tiles.forEach(t => { t.style.cssText = 'display:block;width:4.2cqw;height:4.2cqw;border-radius:.8cqw;transition:background-color .8s,transform .8s cubic-bezier(.16,1,.3,1);background:var(--tile)'; });
    return () => { tiles.forEach(t => { const r = Math.random(); t.style.background = r > .93 ? 'var(--a2)' : r > .35 ? 'var(--a1)' : 'var(--tile)'; t.style.transform = r > .35 ? `translateZ(${r > .93 ? 2.6 : 1.2}cqw)` : 'none'; });
      iso.style.transform = `rotateX(56deg) rotateZ(${-36 + (k % 2 ? 8 : -6)}deg)`; rm.forEach((r, i) => { const on = i === k % 5; r.style.background = on ? 'var(--a1)' : 'transparent'; r.style.color = on ? '#fff' : 'var(--ink)'; }); k++; };
  };

  /* Provident Fund costing: Riphah theme, scenario switch, waterfall with a dashed running total */
  K.waterfall = el => {
    el.innerHTML = `<div class="in">
      <div class="row"><span class="t">Provident Fund costing</span><span class="sp"></span><span class="segc">${['Basic', 'Gross', 'New basic'].map(s => `<span>${s}</span>`).join('')}</span></div>
      <div class="row" style="align-items:stretch">${['Employer cost', 'Members', 'Per member'].map((t, i) => `<div class="card" style="flex:1"><div class="m">${t}</div>${rd('big')}<div class="m" style="margin-top:1cqw;color:var(--a${i === 0 ? 2 : 1})">${['8.33% of new basic', 'Permanent staff', 'Monthly average'][i]}</div></div>`).join('')}</div>
      <div class="card" style="flex:1;min-height:0;position:relative;display:flex;flex-direction:column"><span class="t">Cost build-up, Dec to Jun</span>
        <div class="wf" style="position:relative;flex:1;margin-top:1.6cqw">${'<i></i>'.repeat(8)}<svg viewBox="0 0 300 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path class="draw" d="" fill="none" stroke="var(--a2)" stroke-width="1.5" stroke-dasharray="4 4" pathLength="1000"/></svg></div></div></div>`;
    const seg = el.querySelectorAll('.segc span'), bars = [...el.querySelectorAll('.wf i')], p = el.querySelector('.wf path'); let k = 0;
    bars.forEach((b, i) => b.style.cssText = `position:absolute;bottom:0;left:${3 + i * 12}%;width:8%;border-radius:.6cqw .6cqw 0 0;background:${i === 7 ? 'var(--a2)' : 'var(--a1)'};transition:height 1s cubic-bezier(.16,1,.3,1),bottom 1s cubic-bezier(.16,1,.3,1)`);
    return () => { seg.forEach((s, i) => s.classList.toggle('on', i === k % 3)); k++;
      let acc = 0; const steps = bars.slice(0, 7).map(() => R(6, 12)); const pts = [];
      steps.forEach((s, i) => { bars[i].style.bottom = acc + '%'; bars[i].style.height = s + '%'; acc += s; pts.push([3 + i * 12 + 4, 100 - acc]); });
      bars[7].style.bottom = '0%'; bars[7].style.height = acc + '%';
      p.setAttribute('d', 'M' + pts.map(([x, y]) => `${x * 3},${y}`).join(' L')); redraw(p); };
  };

  /* Receivable recovery: Apple canvas, Riphah green, chain of events with a travelling case, stacked outcome bar */
  K.chain = el => {
    const S = ['HR letter', 'Reminder', 'Legal letter', 'Recovered', 'Waived'];
    el.innerHTML = `<div class="in">
      <div class="row"><div><div class="m">Employee receivables</div><div class="tt">Chain of events</div></div><span class="sp"></span><span class="badge">Recovery</span></div>
      <div class="card" style="position:relative;padding:5cqw 4cqw 3cqw"><div style="position:absolute;left:8%;right:8%;top:6.6cqw;height:.5cqw;border-radius:9px;background:color-mix(in srgb,var(--ink) 10%,transparent)"></div><div class="trv" style="position:absolute;left:8%;top:6.6cqw;height:.5cqw;border-radius:9px;background:var(--a1);width:0;transition:width 1.4s cubic-bezier(.16,1,.3,1)"></div>
        <div class="row" style="justify-content:space-between;position:relative">${S.map((s, i) => `<div style="text-align:center;width:16%"><span class="nd" style="display:block;margin:0 auto;width:4.4cqw;height:4.4cqw;border-radius:50%;background:var(--surface);box-shadow:0 0 0 .5cqw color-mix(in srgb,var(--ink) 12%,transparent);transition:background-color .5s,box-shadow .5s"></span><div class="m" style="margin-top:1.4cqw">${s}</div>${rd('s')}</div>`).join('')}</div></div>
      <div class="card" style="flex:1;display:flex;flex-direction:column;gap:1.6cqw"><span class="t">Outcome mix</span><div class="stk" style="display:flex;height:4cqw;border-radius:99px;overflow:hidden">${['a1', 'a2', 'a3', 'a4', 'a5'].map(c => `<i style="display:block;background:var(--${c});transition:flex-grow 1.2s cubic-bezier(.16,1,.3,1);flex-grow:1"></i>`).join('')}</div>
        <div class="row" style="flex-wrap:wrap">${['Recovered', 'Waived', 'Open', 'Returned', 'Waiver asked'].map((t, i) => `<span class="row" style="gap:.8cqw"><span class="dot" style="background:var(--a${i + 1})"></span><span class="m">${t}</span></span>`).join('')}</div></div></div>`;
    const nd = el.querySelectorAll('.nd'), trv = el.querySelector('.trv'), st = el.querySelectorAll('.stk i'); let k = 0;
    return () => { const at = k % 5; k++; trv.style.width = (at / 4 * 84) + '%'; nd.forEach((n, i) => { n.style.background = i <= at ? 'var(--a1)' : 'var(--surface)'; n.style.boxShadow = i === at ? '0 0 0 1.2cqw color-mix(in srgb,var(--a1) 22%,transparent)' : '0 0 0 .5cqw color-mix(in srgb,var(--ink) 12%,transparent)'; }); st.forEach(s => s.style.flexGrow = R(.3, 3).toFixed(2)); };
  };

  /* Notice period: Riphah green and gold, waivers by location, monthly leavers */
  K.notice = el => {
    el.innerHTML = `<div class="in">
      <div class="row"><div><div class="m">Leavers and waivers</div><div class="tt">Notice period</div></div><span class="sp"></span><span class="segc"><span class="on">Location</span><span>Designation</span><span>Unit</span></span></div>
      <div class="row" style="align-items:stretch;flex:1;min-height:0"><div class="card hb" style="flex:1.2;align-content:center">${['Islamabad', 'Rawalpindi', 'Lahore', 'Faisalabad', 'Malakand', 'Sahiwal'].map((c, i) => `<div class="hr"><span>${c}</span><div class="trk"><div class="fl" style="background:var(--a${i % 2 ? 2 : 1})"></div></div></div>`).join('')}</div>
        <div class="card" style="flex:1;display:flex;flex-direction:column;gap:1cqw"><span class="t">Leavers by month</span>${rd()}<div class="bars">${Array.from({ length: 14 }, (_, i) => `<div class="bar" style="background:var(--a${i % 3 === 2 ? 2 : 1})"></div>`).join('')}</div></div></div></div>`;
    const seg = el.querySelectorAll('.segc span'); let k = 0;
    return () => { setFills(el); setBars(el); seg.forEach((s, i) => s.classList.toggle('on', i === k % 3)); k++; };
  };

  /* Workforce Intelligence: IBM Plex, the HR analytics design system's four series */
  K.workforce = el => {
    el.innerHTML = `<div class="in">
      <div class="row"><span class="mono m">workforce / reference</span><span class="sp"></span><span class="mono m">sample university and hospital</span></div>
      <div class="row" style="align-items:stretch">${['Headcount', 'Attrition', 'Time to hire', 'Engagement'].map((t, i) => `<div class="card" style="flex:1;border-top:.6cqw solid var(--a${i + 1})"><div class="m">${t}</div>${rd('big')}</div>`).join('')}</div>
      <div class="card" style="flex:1;min-height:0;display:flex;flex-direction:column"><span class="t">Monthly trend</span><svg viewBox="0 0 300 90" preserveAspectRatio="none" style="flex:1;width:100%">${[1, 2, 3, 4].map(i => `<path class="draw" pathLength="1000" fill="none" stroke="var(--a${i})" stroke-width="2"/>`).join('')}${[20, 45, 70].map(y => `<line x1="0" x2="300" y1="${y}" y2="${y}" stroke="var(--grid)" stroke-width=".6"/>`).join('')}</svg></div></div>`;
    const ps = el.querySelectorAll('svg path');
    return () => ps.forEach(p => { p.setAttribute('d', path(series(14, 10, 80), 300, 90)); redraw(p); });
  };

  /* Cleanup Command Center: IBM Plex, forest green and gold, live SQL panel, compliance donut */
  K.cleanup = el => {
    const Q = ['SELECT name, type_desc FROM sys.objects', "WHERE name NOT LIKE 'dim[_]%'", "  AND name NOT LIKE 'fact[_]%'", 'ORDER BY modify_date;'];
    el.innerHTML = `<div class="in">
      <div class="row"><span class="t" style="color:var(--a1)">Cleanup Command Center</span><span class="sp"></span><span class="segc">${['Executive', 'Inventory', 'Naming', 'Model'].map(s => `<span>${s}</span>`).join('')}</span></div>
      <div class="row" style="align-items:stretch;flex:1;min-height:0">
        <div class="card" style="flex:.8;display:grid;place-items:center"><svg viewBox="0 0 100 100" style="width:78%">${ring(36, 'var(--a1)', 11)}</svg><div class="m">Naming compliance</div></div>
        <div style="flex:1.4;display:flex;flex-direction:column;gap:2cqw;min-width:0">
          <div class="mono" style="background:var(--code);color:var(--code-ink);border-radius:var(--r);padding:2.4cqw;font-size:max(9px,1.6cqw);min-height:15cqw;white-space:pre">${Q.map(() => '<div class="q"></div>').join('')}</div>
          <div class="card" style="display:grid;gap:1.2cqw;flex:1">${['dim_employee', 'fact_payroll', 'tmp_load_v2', 'vw_hc_old', 'dim_org_unit'].map(n => `<div class="row mono" style="font-size:max(9px,1.6cqw)"><span>${n}</span><span class="sp"></span><span class="st badge">ok</span></div>`).join('')}</div>
        </div></div></div>`;
    const q = el.querySelectorAll('.q'), st = el.querySelectorAll('.st'), seg = el.querySelectorAll('.segc span'); let k = 0, T = [];
    return { every: 5200, tick: () => { T.forEach(clearTimeout); T = []; setRings(el); seg.forEach((s, i) => s.classList.toggle('on', i === k % 4)); k++;
      let t = 0; q.forEach((n, i) => { n.textContent = ''; const d = t; T.push(setTimeout(() => typeInto(n, Q[i], 18, T), d)); t += Q[i].length * 18 + 120; });
      st.forEach(s => { const ok = Math.random() > .4; s.textContent = ok ? 'ok' : 'rename'; s.style.color = ok ? 'var(--a3)' : 'var(--a4)'; s.style.background = ok ? 'color-mix(in srgb,var(--a3) 14%,transparent)' : 'color-mix(in srgb,var(--a4) 14%,transparent)'; }); } };
  };

  /* VMBS HR Center: Apple look, pipeline tabs with coloured counts, candidates moving across stages */
  K.pipeline = el => {
    const C = [['Invited', 'a1'], ['Shortlisted', 'a2'], ['Finalized', 'a3'], ['Rejected', 'a4']];
    el.innerHTML = `<div class="in">
      <div class="row"><span style="width:5cqw;height:5cqw;border-radius:1.2cqw;background:var(--ink);color:var(--surface);display:grid;place-items:center;font-weight:800;font-size:max(10px,2cqw)">V</span><div><div class="t">VMBS HR Center</div><div class="m">Vigilant Medical Billing Services</div></div><span class="sp"></span><span style="background:color-mix(in srgb,var(--ink) 7%,transparent);border-radius:99px;padding:1cqw 6cqw 1cqw 2cqw" class="m">Search candidates</span></div>
      <div class="segc" style="align-self:flex-start">${C.map(([t, c]) => `<span class="row" style="gap:.8cqw">${t}<i style="display:inline-block;min-width:3cqw;height:2cqw;border-radius:99px;background:var(--${c})"></i></span>`).join('')}</div>
      <div class="row" style="align-items:stretch;flex:1;min-height:0">${C.map(([t, c]) => `<div class="col card" style="flex:1;display:flex;flex-direction:column;gap:1.4cqw;padding:1.8cqw"><div class="row" style="gap:1cqw"><span class="dot" style="background:var(--${c})"></span><span class="t">${t}</span></div></div>`).join('')}</div></div>`;
    const cols = el.querySelectorAll('.col'), seg = el.querySelectorAll('.segc > span');
    const mk = () => { const d = document.createElement('div'); d.className = 'fade on'; d.style.cssText = 'background:color-mix(in srgb,var(--ink) 4%,var(--surface));border-radius:1.6cqw;padding:1.4cqw;display:flex;gap:1.2cqw;align-items:center'; d.innerHTML = `<span style="width:3.6cqw;height:3.6cqw;border-radius:50%;background:color-mix(in srgb,var(--ink) 14%,transparent);flex:none"></span><div style="flex:1;display:grid;gap:.8cqw"><div class="ln" style="width:80%"></div><div class="ln" style="width:55%"></div></div>`; return d; };
    [3, 2, 2, 1].forEach((n, i) => { for (let j = 0; j < n; j++) cols[i].appendChild(mk()); });
    let k = 0;
    return () => { const from = RI(0, 2), cards = cols[from].querySelectorAll('.fade'); if (cards.length > 1) { const c = cards[0]; c.classList.remove('on'); setTimeout(() => { cols[Math.min(3, from + (Math.random() > .8 ? 2 : 1))].appendChild(c); requestAnimationFrame(() => c.classList.add('on')); }, 350); } else cols[0].appendChild(mk());
      if (cols[3].querySelectorAll('.fade').length > 3) cols[3].querySelector('.fade').remove();
      seg.forEach((s, i) => s.classList.toggle('on', i === k % 4)); k++; };
  };

  /* VMBS Daily Attendance: warm sand, orange accent, Activity-style rings, daily status grid */
  K.attendance = el => {
    const ST = ['a2', 'a2', 'a2', 'a2', 'a6', 'a3', 'a5', 'a4'];
    el.innerHTML = `<div class="in">
      <div class="glass row" style="border-radius:2.4cqw;padding:1.6cqw 2.2cqw"><span style="width:4.6cqw;height:4.6cqw;border-radius:1.2cqw;background:linear-gradient(135deg,#ffb347,#e8590c);color:#fff;display:grid;place-items:center;font-weight:800;font-size:max(9px,1.8cqw)">V</span><div><div class="t">Daily Attendance</div><div class="m">Vigilant Medical Billing Services</div></div><span class="sp"></span><span class="segc">${['Today', 'Week', 'Month', 'People'].map(s => `<span>${s}</span>`).join('')}</span></div>
      <div class="row" style="align-items:stretch;flex:1;min-height:0">
        <div class="card" style="flex:.7;display:grid;place-items:center"><svg viewBox="0 0 100 100" style="width:86%">${ring(40, 'var(--a2)', 9)}${ring(28, 'var(--a3)', 9)}${ring(16, 'var(--a5)', 9)}</svg></div>
        <div class="card" style="flex:1.6;display:grid;grid-template-rows:repeat(6,1fr);gap:1cqw">${['Billing', 'Coding', 'AR follow-up', 'Credentialing', 'Payment posting', 'QA'].map(t => `<div style="display:grid;grid-template-columns:20cqw repeat(10,1fr);gap:.8cqw;align-items:center"><span class="m">${t}</span>${'<i class="sq" style="display:block;height:100%;min-height:2cqw;border-radius:.6cqw;transition:background-color .6s"></i>'.repeat(10)}</div>`).join('')}</div></div>
      <div class="row" style="flex-wrap:wrap">${[['On time', 'a2'], ['Grace', 'a6'], ['Late', 'a3'], ['Leave', 'a5'], ['Absent', 'a4']].map(([t, c]) => `<span class="row" style="gap:.8cqw"><span class="dot" style="background:var(--${c})"></span><span class="m">${t}</span></span>`).join('')}</div></div>`;
    const sq = el.querySelectorAll('.sq'), seg = el.querySelectorAll('.segc span'); let k = 0;
    return () => { setRings(el); sq.forEach(s => s.style.background = `var(--${pick(ST)})`); seg.forEach((s, i) => s.classList.toggle('on', i === k % 4)); k++; };
  };

  /* FHMS pre-promotion board: 16:9 Riphah navy and gold, one candidate per screen, eight weighted indicators */
  K.fhms = el => {
    const I = ['Teaching', 'Research', 'Publications', 'Supervision', 'Service', 'Student feedback', 'Grants', 'Conduct'];
    el.innerHTML = `<div class="in">
      <div class="row" style="border-bottom:.4cqw solid var(--a1);padding-bottom:1.6cqw"><div><div class="m">Faculty of Health and Medical Sciences</div><div class="tt" style="color:#fff">Pre-promotion board</div></div><span class="sp"></span><span class="badge" style="color:var(--a2);background:rgba(201,150,63,.18)">Candidate <b class="who">A</b></span></div>
      <div class="row" style="align-items:stretch;flex:1;min-height:0">
        <div class="card" style="flex:.6;display:flex;flex-direction:column;align-items:center;gap:1.6cqw;justify-content:center"><span style="width:13cqw;height:13cqw;border-radius:50%;background:linear-gradient(160deg,rgba(255,255,255,.25),rgba(255,255,255,.06))"></span><div class="ln" style="width:70%;background:rgba(255,255,255,.25)"></div><div class="ln" style="width:50%;background:rgba(255,255,255,.15)"></div><span class="badge" style="color:var(--a2);background:rgba(201,150,63,.18)">Proposed rank</span></div>
        <div class="card" style="flex:1.4;display:grid;gap:1.1cqw;align-content:center">${I.map(t => `<div style="display:grid;grid-template-columns:22cqw repeat(5,1fr);gap:1cqw;align-items:center"><span class="m">${t}</span>${'<i class="pt" style="display:block;height:2.2cqw;border-radius:99px;transition:background-color .5s"></i>'.repeat(5)}</div>`).join('')}</div></div></div>`;
    const rows = [...el.querySelectorAll('.card:last-child > div')], who = el.querySelector('.who'); let k = 0;
    return () => { who.textContent = 'ABCD'[k++ % 4]; rows.forEach(r => { const v = RI(2, 5); r.querySelectorAll('.pt').forEach((p, i) => p.style.background = i < v ? (v === 5 ? 'var(--a2)' : 'var(--a1)') : 'rgba(255,255,255,.1)'); }); };
  };

  /* Data dashboards (Claude Data type): strategic plan bullets */
  K.bullets = el => {
    const U = ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Rehabilitation', 'Management', 'Computing'];
    el.innerHTML = `<div class="in">
      <div><div class="m">Strategic Plan 2024 to 2029</div><div class="tt">Faculty and support unit targets</div></div>
      <div class="row">${['On track', 'At risk', 'Behind'].map((t, i) => `<div class="card" style="flex:1"><div class="m">${t}</div>${rd('big')}</div>`).join('')}</div>
      <div class="card" style="flex:1;display:grid;gap:1.4cqw;align-content:center">${U.map(u => `<div style="display:grid;grid-template-columns:22cqw 1fr;gap:2cqw;align-items:center"><span class="m">${u}</span><div style="position:relative;height:2.6cqw;background:color-mix(in srgb,var(--ink) 7%,transparent);border-radius:.4cqw"><div class="fl" style="height:100%;border-radius:.4cqw;background:var(--a1)"></div><i class="tk" style="position:absolute;top:-.6cqw;bottom:-.6cqw;width:.5cqw;background:var(--ink);transition:left 1s"></i></div></div>`).join('')}</div></div>`;
    return () => { el.querySelectorAll('.fl').forEach(f => { const v = R(.3, 1); f.style.transform = `scaleX(${v})`; f.style.background = v > .8 ? 'var(--a3)' : v > .55 ? 'var(--a1)' : 'var(--a4)'; }); el.querySelectorAll('.tk').forEach(t => t.style.left = R(65, 92) + '%'); };
  };
  K.increments = el => {
    el.innerHTML = `<div class="in">
      <div><div class="m">October 2026 cycle</div><div class="tt">Increments and promotions</div></div>
      <div class="row" style="align-items:stretch;flex:1;min-height:0">
        <div class="card" style="flex:1.5;display:flex;flex-direction:column;gap:1cqw"><span class="t">Distribution by band</span>${bars(16)}<div class="row m" style="justify-content:space-between"><span>Lower bands</span><span>Upper bands</span></div></div>
        <div style="flex:1;display:grid;gap:2cqw">${['Increments', 'Promotions', 'Average raise'].map((t, i) => `<div class="card"><div class="row"><span class="dot" style="background:var(--a${i + 1})"></span><span class="m">${t}</span></div>${rd('big')}</div>`).join('')}</div></div></div>`;
    return () => { el.querySelectorAll('.bar').forEach((b, i) => { const c = 1 - Math.abs(i - 7.5) / 9; b.style.transform = `scaleY(${Math.max(.1, c * R(.75, 1.05))})`; b.style.background = i > 11 ? 'var(--a2)' : 'var(--a1)'; }); };
  };

  /* Slide decks */
  K.deck = (el, o) => {
    const S = o.slides;
    const body = i => i === 0
      ? `<div style="margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between"><div><div class="m" style="color:var(--a3)">Human Development Services</div><div class="m" style="color:rgba(255,255,255,.6);margin-top:6px">Riphah International University</div></div><svg viewBox="0 0 160 100" style="width:220px">${[0, 1, 2, 3, 4].map(j => `<rect x="${j * 32}" y="${100 - (20 + j * 16)}" width="22" height="${20 + j * 16}" rx="3" fill="${j === 4 ? 'var(--a2)' : 'rgba(255,255,255,.18)'}"/>`).join('')}</svg></div>`
      : i % 2 ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;flex:1;margin-top:8px">${[0, 1, 2, 3].map(j => `<div style="border-radius:12px;background:color-mix(in srgb,var(--a1) 7%,#fff);padding:18px;display:flex;flex-direction:column;gap:10px"><span style="width:34px;height:34px;border-radius:10px;background:${j % 2 ? 'var(--a2)' : 'var(--a1)'}"></span><div class="ln" style="width:80%"></div><div class="ln" style="width:55%"></div></div>`).join('')}</div>`
      : `<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:24px;flex:1;margin-top:8px"><div style="display:flex">${bars(8)}</div><div style="display:grid;gap:14px;align-content:center">${lines(5)}</div></div>`;
    el.innerHTML = `<div class="in" style="padding:32px;display:block"><div style="position:relative;width:100%;height:100%">${S.map((s, i) => `<div class="sl" style="position:absolute;inset:0;border-radius:14px;overflow:hidden;opacity:0;transform:scale(.97);transition:opacity .8s,transform .8s cubic-bezier(.16,1,.3,1);${i === 0 ? 'background:linear-gradient(150deg,#0b2a4a,#123d68);color:#fff' : 'background:var(--surface)'};padding:48px;display:flex;flex-direction:column;gap:18px">
        <span class="m" style="${i === 0 ? 'color:var(--a3)' : ''}">${o.deckName} · ${i + 1} / ${S.length}</span>
        <div style="font-size:${i === 0 ? 50 : 38}px;font-weight:800;letter-spacing:-.02em;line-height:1.05;max-width:80%">${s}</div>
        <div style="width:110px;height:6px;background:var(--a2);border-radius:9px"></div>${body(i)}</div>`).join('')}</div></div>`;
    el.querySelectorAll('.bar').forEach((b, i) => b.style.background = i % 3 ? 'var(--a1)' : 'var(--a2)');
    const sl = el.querySelectorAll('.sl'); let k = 0;
    return { every: 2800, tick: () => { sl.forEach((s, i) => { const on = i === k % S.length; s.style.opacity = on ? 1 : 0; s.style.transform = on ? 'none' : 'scale(.97)'; if (on) setBars(s); }); k++; } };
  };

  /* Employee journey deck: five phases, a marker travelling the journey */
  K.journey = el => {
    const P = ['Talent acquisition', 'Operations', 'Employee services', 'Performance', 'Exit'];
    el.innerHTML = `<div class="in" style="background:var(--bg);color:#fff">
      <div class="row"><div><div class="m" style="color:var(--a3)">Digital transformation and AI integration</div><div class="tt">The employee journey</div></div></div>
      <div style="flex:1;min-height:0;position:relative"><svg viewBox="0 0 500 160" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path class="jp" d="M10,120 C90,20 140,20 190,80 S300,150 340,70 S440,10 490,60" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="3"/><path class="draw" pathLength="1000" d="M10,120 C90,20 140,20 190,80 S300,150 340,70 S440,10 490,60" fill="none" stroke="var(--a2)" stroke-width="3"/><circle class="mk" r="7" fill="var(--a2)"/></svg></div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1.2cqw">${P.map(p => `<div class="ph" style="padding:1.4cqw;border-radius:1.2cqw;background:rgba(255,255,255,.07);font-size:max(9px,1.6cqw);font-weight:600;transition:background-color .5s,color .5s">${p}</div>`).join('')}</div></div>`;
    const jp = el.querySelector('.jp'), mk = el.querySelector('.mk'), ph = el.querySelectorAll('.ph'), dr = el.querySelector('.draw'); let t0 = null, raf;
    const L = jp.getTotalLength();
    const loop = ts => { if (!t0) t0 = ts; const f = ((ts - t0) / 9000) % 1; const pt = jp.getPointAtLength(f * L); mk.setAttribute('cx', pt.x); mk.setAttribute('cy', pt.y); dr.style.strokeDashoffset = 1000 * (1 - f); dr.style.transition = 'none'; const at = Math.min(4, Math.floor(f * 5)); ph.forEach((p, i) => { p.style.background = i === at ? 'var(--a2)' : 'rgba(255,255,255,.07)'; p.style.color = i === at ? '#0b2a4a' : '#fff'; }); raf = requestAnimationFrame(loop); };
    return { every: 100000, tick: () => { if (RM) { mk.setAttribute('cx', 10); mk.setAttribute('cy', 120); return; } cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }, stop: () => cancelAnimationFrame(raf) };
  };

  /* Overtime command: Midnight Command dark palette, glowing heatmap */
  K.heat = el => {
    el.innerHTML = `<div class="in">
      <div class="row"><div><div class="m">2026</div><div class="tt">Overtime command</div></div><span class="sp"></span><span class="badge" style="color:var(--a1)">Live filters</span></div>
      <div class="row">${['Overtime hours', 'Overtime cost', 'Over cap'].map((t, i) => `<div class="card" style="flex:1;box-shadow:var(--shadow)"><div class="m">${t}</div>${rd('big')}</div>`).join('')}</div>
      <div class="card" style="flex:1;min-height:0;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(7,1fr);gap:.8cqw">${'<i class="hc" style="display:block;border-radius:.5cqw;transition:opacity .9s,background-color .9s,box-shadow .9s"></i>'.repeat(84)}</div></div>`;
    const hc = el.querySelectorAll('.hc');
    return () => hc.forEach(c => { const v = Math.random(); c.style.background = v > .92 ? 'var(--a2)' : 'var(--a1)'; c.style.opacity = (.08 + v * .92).toFixed(2); c.style.boxShadow = v > .85 ? '0 0 1.6cqw color-mix(in srgb,var(--a1) 60%,transparent)' : 'none'; });
  };

  /* Excel workbooks: Excel chrome, formula bar, sheet grid */
  const xl = (file, formula, body) => `<div class="in" style="padding:0;gap:0">
    <div class="row" style="background:var(--a1);color:#fff;padding:1.4cqw 2.4cqw;font-size:max(9px,1.6cqw)"><b>Excel</b><span class="sp"></span><span>${file}</span><span class="sp"></span><span>⋯</span></div>
    <div class="row" style="padding:1cqw 2.4cqw;gap:3cqw;font-size:max(9px,1.5cqw);border-bottom:1px solid #e1e1e1">${['File', 'Home', 'Insert', 'Formulas', 'Data', 'View'].map((t, i) => `<span style="${i === 1 ? 'color:var(--a1);font-weight:700;border-bottom:2px solid var(--a1)' : 'color:var(--mute)'}">${t}</span>`).join('')}</div>
    <div class="row" style="padding:.8cqw 2.4cqw;border-bottom:1px solid #e1e1e1;font-size:max(9px,1.5cqw)"><span style="color:var(--mute);width:8cqw">D4</span><i style="font-style:italic;color:var(--mute)">fx</i><span class="mono fx" style="font-family:Consolas,monospace">${formula}</span></div>
    <div style="flex:1;min-height:0;display:grid;grid-template-columns:4cqw 1fr;grid-template-rows:3cqw 1fr">
      <div style="background:#f3f3f3;border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1"></div>
      <div style="background:#f3f3f3;border-bottom:1px solid #e1e1e1;display:grid;grid-template-columns:repeat(8,1fr);font-size:max(8px,1.3cqw);color:var(--mute);text-align:center;align-items:center">${'ABCDEFGH'.split('').map(c => `<span>${c}</span>`).join('')}</div>
      <div style="background:#f3f3f3;border-right:1px solid #e1e1e1;display:grid;font-size:max(8px,1.3cqw);color:var(--mute);text-align:center">${Array.from({ length: 10 }, (_, i) => `<span>${i + 1}</span>`).join('')}</div>
      <div style="position:relative;padding:2cqw;background-image:linear-gradient(#ececec 1px,transparent 1px),linear-gradient(90deg,#ececec 1px,transparent 1px);background-size:12.5% 10%">${body}</div></div></div>`;
  K.ninebox = el => {
    const L = ['Enigma', 'Growth', 'Future star', 'Dilemma', 'Core', 'High performer', 'Risk', 'Effective', 'Trusted pro'];
    const F = ['var(--a4)', 'var(--a3)', 'var(--a3)', 'var(--a5)', 'var(--a4)', 'var(--a3)', 'var(--a5)', 'var(--a5)', 'var(--a4)'];
    el.innerHTML = xl('Leadership_Succession.xlsx', '=SUMPRODUCT((Dept=$B$1)*(Box=D4))', `<div class="nb" style="position:absolute;inset:2cqw 4cqw 2cqw 4cqw;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:.8cqw;background:var(--surface);box-shadow:0 0 0 1px #c8c8c8">${L.map((l, i) => `<div style="background:${F[i]};padding:1cqw;font-size:max(8px,1.4cqw);color:#333;font-weight:600">${l}</div>`).join('')}${'<b class="pd" style="position:absolute;left:0;top:0;width:1.8cqw;height:1.8cqw;border-radius:50%;background:var(--a1);transition:transform 1.2s cubic-bezier(.65,0,.35,1)"></b>'.repeat(14)}</div>`);
    const nb = el.querySelector('.nb'), pd = el.querySelectorAll('.pd');
    return () => { const W = nb.clientWidth, H = nb.clientHeight; pd.forEach(d => { const c = RI(0, 2), r = RI(0, 2); d.style.transform = `translate(${(c + R(.3, .75)) * W / 3}px,${(r + R(.45, .8)) * H / 3}px)`; }); };
  };
  K.funnel = el => {
    const Loc = ['All plants', 'Head office', 'Plant 1', 'Plant 2', 'Regional'];
    el.innerHTML = xl('Recruitment_Tracker.xlsx', '=SUMPRODUCT((Stage=$A5)*(Location=$C$1))', `<div style="position:absolute;inset:2cqw 4cqw;display:flex;flex-direction:column;gap:1.4cqw"><div class="row" style="font-size:max(9px,1.5cqw)"><b>Location</b><span class="loc" style="border:1px solid #8a8a8a;padding:.4cqw 1.4cqw;background:#fff;min-width:20cqw">All plants ▾</span></div>${['Applied', 'Screened', 'Interviewed', 'Offered', 'Joined'].map((s, i) => `<div style="display:grid;grid-template-columns:18cqw 1fr;align-items:center;gap:1.6cqw;font-size:max(9px,1.5cqw)"><span>${s}</span><div style="display:flex;justify-content:center"><div class="fn" style="height:3.2cqw;background:var(--a${i === 4 ? 2 : 1});transition:width 1s cubic-bezier(.16,1,.3,1)"></div></div></div>`).join('')}</div>`);
    const fn = el.querySelectorAll('.fn'), loc = el.querySelector('.loc'); let k = 0;
    return () => { loc.textContent = Loc[k++ % Loc.length] + ' ▾'; let w = R(88, 100); fn.forEach(f => { f.style.width = w + '%'; w *= R(.5, .75); }); };
  };

  /* AI Dashboard Maker: dark, a sentence becomes a dashboard */
  K.prompt = el => {
    const P = ['Show headcount and attrition by department', 'Compare hiring by campus against plan', 'Build a leavers dashboard with waivers'];
    el.innerHTML = `<div class="in" style="background:radial-gradient(120% 80% at 80% -10%,rgba(124,108,255,.35),transparent 60%),radial-gradient(90% 70% at 0% 110%,rgba(47,210,255,.2),transparent 60%),var(--bg)">
      <div class="row" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:99px;padding:1.6cqw 2.6cqw"><span style="color:var(--a2)">✦</span><span class="tx" style="font-size:max(11px,1.9cqw)"></span><i style="width:.4cqw;height:2.6cqw;background:var(--a2);animation:shimmer 1s steps(1) infinite"></i><span class="sp"></span><span style="background:linear-gradient(90deg,var(--a1),var(--a3));border-radius:99px;padding:.8cqw 2.4cqw;font-weight:700;font-size:max(9px,1.5cqw)">Build</span></div>
      <div style="flex:1;min-height:0;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:auto 1fr 1fr;gap:2cqw">
        ${['Headcount', 'Attrition', 'Open roles'].map(t => `<div class="card tl fade" style="grid-column:span 2"><div class="m">${t}</div>${rd('big')}</div>`).join('')}
        <div class="card tl fade" style="grid-column:span 4;display:flex;flex-direction:column"><span class="m">By department</span>${bars(10)}</div>
        <div class="card tl fade" style="grid-column:span 2;display:grid;place-items:center"><svg viewBox="0 0 100 100" style="width:70%">${ring(36, 'var(--a2)', 12)}</svg></div>
        <div class="card tl fade" style="grid-column:span 3;display:flex;flex-direction:column"><span class="m">Trend</span><svg viewBox="0 0 300 80" preserveAspectRatio="none" style="flex:1;width:100%"><path class="draw" pathLength="1000" fill="none" stroke="var(--a3)" stroke-width="2.5"/></svg></div>
        <div class="card tl fade" style="grid-column:span 3;display:flex;flex-direction:column"><span class="m">Hires by month</span>${bars(12, 'hm')}</div></div></div>`;
    el.querySelectorAll('.bar').forEach(b => b.style.background = 'linear-gradient(180deg,var(--a1),color-mix(in srgb,var(--a1) 40%,transparent))');
    el.querySelectorAll('.hm .bar').forEach(b => b.style.background = 'linear-gradient(180deg,var(--a2),color-mix(in srgb,var(--a2) 30%,transparent))');
    const tx = el.querySelector('.tx'), tl = el.querySelectorAll('.tl'), p = el.querySelector('.draw'); let k = 0, T = [];
    return { every: 7200, tick: () => { T.forEach(clearTimeout); T = []; tl.forEach(t => t.classList.remove('on'));
      const s = P[k++ % P.length]; if (RM) { tx.textContent = s; tl.forEach(t => t.classList.add('on')); setBars(el); setRings(el); return; }
      const d = typeInto(tx, s, 34, T) + 300; T.push(setTimeout(() => { setBars(el); setRings(el); p.setAttribute('d', path(series(14), 300, 80)); redraw(p); }, d));
      tl.forEach((t, i) => T.push(setTimeout(() => t.classList.add('on'), d + i * 180))); } };
  };

  /* TalentRank: Google Workspace style, Gemini sparkle, candidates re-ranking */
  K.talent = el => {
    el.innerHTML = `<div class="in">
      <div class="row"><span style="font-size:max(16px,3.4cqw);background:linear-gradient(135deg,#4285f4,#9b72cb,#d96570);-webkit-background-clip:text;background-clip:text;color:transparent">✦</span><div><div class="t">TalentRank</div><div class="m">Apps Script and Gemini</div></div><span class="sp"></span><span class="badge" style="color:var(--a1)">Role: HR Business Partner</span></div>
      <div class="card" style="flex:1;min-height:0;display:flex;flex-direction:column;gap:1.2cqw;position:relative"><div class="row m" style="padding:0 1cqw"><span style="width:6cqw">Rank</span><span>Candidate</span><span class="sp"></span><span style="width:24cqw">Match</span></div><div class="rk" style="position:relative;flex:1">${Array.from({ length: 5 }, () => `<div class="cd" style="position:absolute;left:0;right:0;display:flex;gap:2cqw;align-items:center;padding:1.2cqw;border-radius:1.2cqw;transition:transform 1s cubic-bezier(.65,0,.35,1),background-color .5s"><b class="n" style="width:4cqw;text-align:center"></b><span style="width:4.4cqw;height:4.4cqw;border-radius:50%;background:color-mix(in srgb,var(--ink) 10%,transparent)"></span><div style="flex:1;display:grid;gap:.8cqw"><div class="ln" style="width:60%"></div><div class="ln" style="width:38%"></div></div><div class="trk" style="width:24cqw"><div class="fl"></div></div></div>`).join('')}</div></div></div>`;
    const cd = [...el.querySelectorAll('.cd')], rk = el.querySelector('.rk');
    return () => { const h = rk.clientHeight / 5; const sc = cd.map(() => R(.45, .98)); const ord = sc.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]);
      ord.forEach(([s, i], pos) => { const c = cd[i]; c.style.transform = `translateY(${pos * h}px)`; c.style.background = pos === 0 ? 'color-mix(in srgb,var(--a1) 9%,transparent)' : 'transparent'; c.querySelector('.n').textContent = pos + 1; const f = c.querySelector('.fl'); f.style.transform = `scaleX(${s})`; f.style.background = pos === 0 ? 'linear-gradient(90deg,#4285f4,#9b72cb)' : 'var(--a1)'; }); };
  };

  /* Streamlit apps */
  const stApp = (title, main) => `<div class="in" style="padding:0;flex-direction:row;gap:0"><div style="position:absolute;top:0;left:0;right:0;height:.6cqw;background:linear-gradient(90deg,#ff4b4b,#ffbd45)"></div>
    <div style="width:28%;background:var(--surface);padding:5cqw 2.6cqw;display:flex;flex-direction:column;gap:2.4cqw">${['Upload extract', 'Department', 'Depth'].map(t => `<div><div class="m">${t}</div><div style="margin-top:1cqw;height:3.6cqw;border-radius:.8cqw;background:var(--field);box-shadow:0 0 0 1px var(--edge)"></div></div>`).join('')}<div><div class="m">Span limit</div><div style="position:relative;margin-top:1.8cqw;height:.6cqw;border-radius:9px;background:var(--edge)"><i class="sl" style="position:absolute;top:-.9cqw;width:2.4cqw;height:2.4cqw;border-radius:50%;background:var(--a1);transition:left 1s"></i></div></div></div>
    <div style="flex:1;padding:5cqw 3.6cqw 3cqw;display:flex;flex-direction:column;gap:2cqw;min-width:0"><div style="font-size:max(15px,3.6cqw);font-weight:700">${title}</div>${main}</div></div>`;
  K.org = el => {
    const N = [[150, 16], [60, 66], [150, 66], [240, 66], [25, 116], [95, 116], [150, 116], [205, 116], [275, 116]], E = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [3, 7], [3, 8]];
    el.innerHTML = stApp('Organogram generator', `<svg viewBox="0 0 300 140" style="flex:1;width:100%">${E.map(([a, b]) => `<path class="draw" pathLength="1000" d="M${N[a][0]},${N[a][1] + 9} V${(N[a][1] + N[b][1]) / 2} H${N[b][0]} V${N[b][1] - 9}" fill="none" stroke="#9aa0b4" stroke-width="1.2"/>`).join('')}${N.map((n, i) => `<rect class="nd" x="${n[0] - 26}" y="${n[1] - 9}" width="52" height="18" rx="4" fill="var(--field)" stroke="${i ? 'var(--edge)' : '#ff4b4b'}" style="transition:fill .5s"/><rect x="${n[0] - 18}" y="${n[1] - 2}" width="36" height="4" rx="2" fill="var(--edge)"/>`).join('')}</svg><div class="row">${['Span of control', 'Layers', 'Vacant boxes'].map(t => `<div style="flex:1"><div class="m">${t}</div>${rd()}</div>`).join('')}</div>`);
    const ps = el.querySelectorAll('.draw'), nd = el.querySelectorAll('.nd'), sl = el.querySelector('.sl'); let k = 0;
    return () => { ps.forEach((p, i) => { p.classList.remove('on'); setTimeout(() => p.classList.add('on'), 80 + i * 90); }); nd.forEach((n, i) => n.setAttribute('fill', i === [2, 3, 1, 6, 8][k % 5] ? 'color-mix(in srgb,#ff4b4b 22%,var(--field))' : 'var(--field)')); sl.style.left = R(10, 85) + '%'; k++; };
  };
  K.stbudget = el => {
    el.innerHTML = stApp('HR budget analyser', `<div class="row">${['Personnel cost', 'Attrition', 'Budget used'].map(t => `<div style="flex:1"><div class="m">${t}</div>${rd('big')}<div class="m dl" style="margin-top:.6cqw;color:#09ab3b">▲</div></div>`).join('')}</div><div style="flex:1;min-height:0;display:flex;gap:2cqw"><div style="flex:1;display:flex;flex-direction:column">${bars(10)}</div><svg viewBox="0 0 300 100" preserveAspectRatio="none" style="flex:1;height:100%"><path class="draw" pathLength="1000" fill="none" stroke="var(--a2)" stroke-width="2"/><path class="draw" pathLength="1000" fill="none" stroke="var(--a3)" stroke-width="2"/></svg></div>`);
    el.querySelectorAll('.bar').forEach(b => b.style.background = 'var(--a2)');
    const ps = el.querySelectorAll('.draw'), sl = el.querySelector('.sl'), dl = el.querySelectorAll('.dl');
    return () => { setBars(el); ps.forEach(p => { p.setAttribute('d', path(series(12), 300, 100)); redraw(p); }); sl.style.left = R(10, 85) + '%'; dl.forEach(d => { const up = Math.random() > .4; d.textContent = up ? '▲' : '▼'; d.style.color = up ? '#09ab3b' : '#ff2b2b'; }); };
  };

  /* Riphah Command Center: Material 3, Gmail-like, AI morning brief */
  K.gmail = el => {
    const M = [['Leave approval request', 'Approve', 'a4'], ['Budget revision, Malakand campus', 'HR', 'a1'], ['Provident Fund policy review', 'Meeting', 'a5'], ['Weekly headcount report', 'Report', 'a3'], ['Offer letter for sign-off', 'Approve', 'a4']];
    el.innerHTML = `<div class="in" style="flex-direction:row;padding:0;gap:0">
      <div style="width:9cqw;display:flex;flex-direction:column;align-items:center;gap:3cqw;padding-top:4cqw">${['✉', '☑', '◷', '☰', '⚡'].map((t, i) => `<span style="width:6cqw;height:4cqw;border-radius:99px;display:grid;place-items:center;font-size:max(10px,1.8cqw);${i === 0 ? 'background:var(--a2)' : ''}">${t}</span>`).join('')}</div>
      <div style="flex:1;padding:3cqw 3cqw 3cqw 1cqw;display:flex;flex-direction:column;gap:2cqw;min-width:0">
        <div style="background:var(--search);border-radius:99px;padding:1.6cqw 3cqw" class="m">Search mail, tasks and people</div>
        <div class="card" style="background:var(--brief);display:grid;gap:1.2cqw"><div class="row"><span style="background:linear-gradient(135deg,#4285f4,#9b72cb,#d96570);-webkit-background-clip:text;background-clip:text;color:transparent;font-size:max(12px,2.4cqw)">✦</span><span class="t">Morning brief</span></div><div class="br" style="display:grid;gap:1cqw">${'<div class="ln" style="transform:scaleX(0);transition:transform .8s cubic-bezier(.16,1,.3,1)"></div>'.repeat(3)}</div></div>
        <div style="display:grid;gap:.4cqw;background:var(--surface);border-radius:var(--r);padding:1cqw">${M.map(([t, l, c]) => `<div class="mr fade" style="display:flex;gap:1.6cqw;align-items:center;padding:1.2cqw 1.6cqw;border-radius:1cqw"><span style="width:3.6cqw;height:3.6cqw;border-radius:50%;background:color-mix(in srgb,var(--${c}) 20%,transparent);flex:none"></span><span style="flex:1;font-size:max(10px,1.7cqw);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t}</span><span class="badge" style="color:var(--${c});background:color-mix(in srgb,var(--${c}) 12%,transparent)">${l}</span></div>`).join('')}</div></div></div>`;
    const mr = el.querySelectorAll('.mr'), br = el.querySelectorAll('.br .ln'); let T = [];
    return { every: 5600, tick: () => { T.forEach(clearTimeout); T = []; mr.forEach(m => m.classList.remove('on')); br.forEach(b => b.style.transform = 'scaleX(0)');
      mr.forEach((m, i) => T.push(setTimeout(() => m.classList.add('on'), 150 + i * 220))); br.forEach((b, i) => T.push(setTimeout(() => b.style.transform = `scaleX(${[1, .82, .6][i]})`, 1400 + i * 350))); } };
  };

  /* Claude skills for HR: terminal run of a skill */
  K.skills = el => {
    const L = [['› ', '/hr-analytics-dashboard attrition_export.xlsx', 'a1'], ['✓ ', 'Read 2 sheets and 14 columns', 'a2'], ['✓ ', 'Applied the house metric definitions', 'a2'], ['✓ ', 'Rigour gate passed: totals reconcile', 'a2'], ['→ ', 'Dashboard ready', 'a3']];
    el.innerHTML = `<div class="in" style="flex-direction:row;gap:28px">
      <div class="card" style="flex:1.05;display:flex;flex-direction:column;gap:18px;padding:26px">
        <div class="row" style="gap:8px"><span style="width:13px;height:13px;border-radius:50%;background:#ff5f57"></span><span style="width:13px;height:13px;border-radius:50%;background:#febc2e"></span><span style="width:13px;height:13px;border-radius:50%;background:#28c840"></span><span class="sp"></span><span class="m">Claude, HR skills</span></div>
        <div class="mono" style="display:grid;gap:16px;font-size:17px;line-height:1.35">${L.map(([p]) => `<div class="tl" style="opacity:0;transition:opacity .4s"><span class="pp"></span><span class="tx"></span></div>`).join('')}</div>
        <div style="margin-top:auto;display:flex;gap:8px;flex-wrap:wrap">${['hr-analytics-dashboard', 'weekly-pm-status', 'hr-manager-context'].map(t => `<span class="badge mono" style="font-weight:500">${t}</span>`).join('')}</div></div>
      <div class="dash fade" style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto 1fr;gap:16px">${['Headcount', 'Attrition', 'Hires', 'Leavers'].map(t => `<div class="card" style="padding:18px"><div class="m">${t}</div>${rd()}</div>`).join('')}<div class="card" style="grid-column:span 2;display:flex;padding:18px">${bars(12)}</div></div></div>`;
    el.querySelectorAll('.bar').forEach(b => b.style.background = 'var(--a1)');
    const tl = el.querySelectorAll('.tl'), dash = el.querySelector('.dash'); let T = [];
    tl.forEach((t, i) => { const pp = t.querySelector('.pp'); pp.textContent = L[i][0]; pp.style.color = `var(--${L[i][2]})`; });
    return { every: 7200, tick: () => { T.forEach(clearTimeout); T = []; dash.classList.remove('on'); tl.forEach(t => { t.style.opacity = 0; t.querySelector('.tx').textContent = ''; });
      let d = 0; tl.forEach((t, i) => { const dd = d; T.push(setTimeout(() => { t.style.opacity = 1; typeInto(t.querySelector('.tx'), L[i][1], 20, T); }, dd)); d += L[i][1].length * 20 + 240; });
      T.push(setTimeout(() => { dash.classList.add('on'); setBars(el); }, d)); } };
  };

  /* Phones */
  const phone = inner => `<div class="in" style="display:grid;place-items:center;padding:3cqw"><div style="height:100%;aspect-ratio:9/18;max-width:60%;border-radius:6cqw;background:#111;padding:1.2cqw;box-shadow:0 20px 60px rgba(0,0,0,.25)"><div class="scr" style="width:100%;height:100%;border-radius:5cqw;overflow:hidden;background:var(--bg);display:flex;flex-direction:column;gap:2cqw;padding:5cqw 2.6cqw 2.6cqw;position:relative">${inner}</div></div></div>`;
  K.fuel = el => {
    el.innerHTML = phone(`<div class="row"><b style="font-size:max(11px,2.4cqw)">FuelPulse</b><span class="sp"></span><span class="badge city" style="color:var(--a1)">Islamabad</span></div>
      <div class="card" style="background:linear-gradient(135deg,var(--a1),var(--a3));color:#fff"><div style="font-size:max(9px,1.5cqw);opacity:.85">Petrol</div><span class="rd big" style="background:rgba(255,255,255,.35)"></span><svg viewBox="0 0 300 60" preserveAspectRatio="none" style="width:100%;height:7cqw;margin-top:1cqw"><path class="draw" pathLength="1000" fill="none" stroke="#fff" stroke-width="3"/></svg></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.6cqw">${['Diesel', 'Light diesel', 'Kerosene', 'LPG'].map((t, i) => `<div class="card" style="padding:2cqw"><div class="m">${t}</div>${rd('s')}<div class="ar" style="font-size:max(9px,1.5cqw);margin-top:.6cqw">▲</div></div>`).join('')}</div>
      <div class="card" style="flex:1;display:flex;flex-direction:column;gap:1cqw"><span class="m">Next revision</span>${bars(7)}</div>`);
    el.querySelectorAll('.bar').forEach(b => b.style.background = 'var(--a2)');
    const city = el.querySelector('.city'), p = el.querySelector('.draw'), ar = el.querySelectorAll('.ar'); let k = 0;
    return () => { city.textContent = ['Islamabad', 'Lahore', 'Karachi', 'Peshawar'][k++ % 4]; p.setAttribute('d', path(series(10), 300, 60)); redraw(p); setBars(el); ar.forEach(a => { const up = Math.random() > .5; a.textContent = up ? '▲' : '▼'; a.style.color = up ? 'var(--a3)' : 'var(--a4)'; }); };
  };
  K.nuskha = el => {
    const D = [['Brand A, 500 mg', 'Paracetamol'], ['Brand B, 20 mg', 'Omeprazole'], ['Brand C, 5 mg', 'Amlodipine']];
    el.innerHTML = phone(`<div class="row"><b style="font-size:max(11px,2.4cqw)">نسخہ</b><span class="m">Nuskha</span><span class="sp"></span><span class="badge" style="color:var(--a1)">Scan</span></div>
      <div style="position:relative;height:22cqw;border-radius:2.4cqw;border:2px dashed color-mix(in srgb,var(--a1) 50%,transparent);overflow:hidden"><div class="scan" style="position:absolute;left:0;right:0;height:.6cqw;background:var(--a1);box-shadow:0 0 2cqw var(--a1);transition:top 1.6s ease-in-out;top:0"></div>${'<div class="ln" style="margin:3cqw 3cqw 0;width:70%;background:rgba(255,255,255,.18)"></div>'.repeat(3)}</div>
      <div class="card fade on bn"><div class="m">Prescribed</div><div class="t b1"></div></div>
      <div style="text-align:center;color:var(--a2)">↓ generic</div>
      <div class="card fade on gn" style="background:color-mix(in srgb,var(--a1) 22%,var(--surface))"><div class="m">Same salt</div><div class="t g1" style="color:var(--a2)"></div><div class="row" style="margin-top:1cqw"><span class="badge" style="color:var(--a2)">DRAP verified</span><span class="badge" style="color:var(--a3)">Cheaper</span></div></div>
      <div class="card"><div class="m">Interactions</div><div class="t" style="color:var(--a2)">None found</div></div>`);
    const sc = el.querySelector('.scan'), b1 = el.querySelector('.b1'), g1 = el.querySelector('.g1'), bn = el.querySelector('.bn'), gn = el.querySelector('.gn'); let k = 0;
    return () => { const d = D[k % 3]; sc.style.top = k % 2 ? '0' : 'calc(100% - .6cqw)'; bn.classList.remove('on'); gn.classList.remove('on'); setTimeout(() => { b1.textContent = d[0]; g1.textContent = d[1]; bn.classList.add('on'); setTimeout(() => gn.classList.add('on'), 400); }, 300); k++; };
  };

  /* Documents: AI for HR programme, responsible AI, policies */
  K.doc = (el, o) => {
    el.innerHTML = `<div class="in" style="display:grid;place-items:center;padding:4cqw"><div class="card" style="width:min(78%,100%);height:100%;padding:5cqw 6cqw;display:flex;flex-direction:column;gap:1.8cqw;overflow:hidden">
      <div style="font-size:max(14px,3.6cqw);font-weight:600;line-height:1.1">${o.docTitle}</div><div class="m" style="font-family:-apple-system,InterVar,sans-serif">${o.docMeta}</div>
      <div style="height:1px;background:color-mix(in srgb,var(--ink) 12%,transparent)"></div>
      ${o.heads.map(h => `<div style="font-weight:700;font-size:max(10px,1.9cqw);font-family:-apple-system,InterVar,sans-serif">${h}</div><div class="wr" style="display:grid;gap:1cqw">${'<div class="ln" style="transform:scaleX(0);transition:transform .9s cubic-bezier(.16,1,.3,1)"></div>'.repeat(2)}</div>`).join('')}
      ${o.weeks ? `<div style="margin-top:auto;display:grid;grid-template-columns:repeat(10,1fr);gap:.8cqw">${Array.from({ length: 10 }, (_, i) => `<span class="wk" style="text-align:center;padding:.8cqw 0;border-radius:.8cqw;font:600 max(8px,1.3cqw) -apple-system,InterVar,sans-serif;background:var(--wk);transition:background-color .4s,color .4s">W${i + 1}</span>`).join('')}</div>` : ''}</div></div>`;
    const wr = el.querySelectorAll('.wr .ln'), wk = el.querySelectorAll('.wk'); let k = 0, T = [];
    return { every: 4200, tick: () => { T.forEach(clearTimeout); T = []; wr.forEach(l => l.style.transform = 'scaleX(0)'); wr.forEach((l, i) => T.push(setTimeout(() => l.style.transform = `scaleX(${[1, .74, .92, .6, .85, .7][i % 6]})`, 120 + i * 160)));
      wk.forEach((w, i) => { const on = i <= k % 10; w.style.background = on ? 'var(--a1)' : 'var(--wk)'; w.style.color = on ? '#fff' : 'var(--mute)'; }); k++; } };
  };

  /* ---------- Registry of projects ---------- */
  window.PROJECTS = [
    { id: 'vmbs-hr', cat: 'vigilant', kind: 'pipeline', theme: 'vmbs', title: 'VMBS HR Center', where: 'Vigilant Medical Billing Services', stack: ['HTML', 'JavaScript', 'Six looks, light and dark'], looks: [['vmbs', 'VMBS', '#1f5fa0'], ['quiet', 'Quiet', '#8a8f98'], ['apple', 'Apple', '#0071e3'], ['ledger', 'Ledger', '#a86f1c'], ['control', 'Control', '#161b22'], ['contrast', 'Contrast', '#000000']], desc: 'The hiring desk I run for a US medical billing company: every candidate from invite to shortlist to final decision, with offers and appointment letters in one place.' },
    { id: 'vmbs-att', cat: 'vigilant', kind: 'attendance', theme: 'sand', title: 'Daily Attendance', where: 'Vigilant Medical Billing Services', stack: ['HTML', 'SheetJS', 'Light and dark'], desc: 'Shift attendance for the billing floor: on time, grace, late, leave and absent, by team and day.' },
    { id: 'hds-budget', cat: 'analytics', kind: 'ios', theme: 'hdsbudget', title: 'HDS Budget Dashboard', where: 'Riphah Group, HDS', stack: ['HTML', 'iOS design language', 'Light and dark'], desc: 'The group’s position-wise HR budget reconciled to live headcount each week, as an iOS-style summary with budget rings and campus views.' },
    { id: 'office-3d', cat: 'analytics', kind: 'office', theme: 'office', title: 'Headcount Office 3D', where: 'Riphah Group, HDS', stack: ['HTML', 'WebGL', 'iOS controls'], desc: 'The HR team’s floor rebuilt in 3D, with a Provident Fund room and an analytics hub driven by the weekly headcount.' },
    { id: 'recovery', cat: 'analytics', kind: 'chain', theme: 'recovery', title: 'Receivable recovery', where: 'Riphah Group, HDS', stack: ['HTML', 'Excel'], desc: 'Employee dues followed from HR letter to legal letter to recovery or waiver, as a chain of events.' },
    { id: 'notice', cat: 'analytics', kind: 'notice', theme: 'notice', title: 'Notice period analytics', where: 'Riphah Group, HDS', stack: ['HTML', 'Excel'], desc: 'Who left, who was waived their notice and for how long, by location, designation and unit.' },
    { id: 'increments', cat: 'strategy', kind: 'increments', theme: 'data', title: 'Increments and promotions', where: 'Riphah Group, HDS', stack: ['Claude data dashboard'], desc: 'The October 2026 increment and promotion cycle, by band and unit.' },
    { id: 'fhms', cat: 'analytics', kind: 'fhms', theme: 'fhms', title: 'Faculty pre-promotion board', where: 'Riphah Group, FHMS', stack: ['Excel', '16:9 display'], desc: 'One candidate per screen for the promotion board, scored on eight weighted indicators.' },
    { id: 'workforce', cat: 'analytics', kind: 'workforce', theme: 'workforce', title: 'Workforce Intelligence', where: 'Design system reference', stack: ['HTML', 'IBM Plex'], desc: 'The reference build of my HR analytics design system: fixed palette, metric definitions, chart grammar.' },
    { id: 'pf', cat: 'strategy', kind: 'waterfall', theme: 'pf', title: 'Provident Fund costing', where: 'Riphah Group, HDS', stack: ['HTML', 'Eight themes, light and dark', 'Scenario model'], looks: [['riphah', 'Riphah', '#134A7C'], ['bloom', 'Bloom', '#4E6E94'], ['apple', 'Apple', '#007AFF'], ['graphite', 'Graphite', '#2B2B2B'], ['fjord', 'Fjord', '#5E81AC'], ['sand', 'Sand', '#B5651D'], ['midnight', 'Midnight', '#0E9F6E'], ['contrast', 'High contrast', '#0040DD']], desc: 'The cost model behind the group’s first contributory Provident Fund, with salary-restructuring scenarios built up month by month.' },
    { id: 'pf-deck', cat: 'strategy', kind: 'deck', theme: 'deck', title: 'Provident Fund proposal', where: 'Riphah Group, HDS', stack: ['Slides', 'Policy draft'], desc: 'The employer proposal deck and the draft fund policy that went with the costing.', slides: ['Employees’ Provident Fund', 'Why a fund, and why now', 'Eligibility and contributions', 'Cost to the employer'], deckName: 'Provident Fund' },
    { id: 'plan', cat: 'strategy', kind: 'bullets', theme: 'data', title: 'Strategic Plan scorecard', where: 'Riphah Group', stack: ['Claude data dashboard'], desc: 'Quarterly targets for every faculty and support unit, scored against the 2024 to 2029 plan.' },
    { id: 'hds-strategy', cat: 'decks', kind: 'deck', theme: 'deck', title: 'HDS Strategy 2024 to 2029', where: 'Riphah Group, HDS', stack: ['Slides', 'Scorecard'], desc: 'What HR committed to at the strategy moot, and where it stands, as a deck and a scorecard.', slides: ['HDS Strategy 2024 to 2029', 'What we committed to', 'People first', 'Where we stand'], deckName: 'HDS Strategy' },
    { id: 'cleanup', cat: 'excel', kind: 'cleanup', theme: 'cleanup', title: 'Cleanup Command Center', where: 'SQL Server estate', stack: ['Power BI', 'SQL', 'HTML companion'], desc: 'Every database object audited against dimensional-modelling standards, across four report pages.' },
    { id: 'ninebox', cat: 'excel', kind: 'ninebox', theme: 'excel', title: 'Leadership and succession', where: 'Excel, built in Python', stack: ['Python', 'openpyxl', 'SUMPRODUCT'], desc: '9-Box talent matrix, succession readiness and IDP tracking, with filters wired through every formula.' },
    { id: 'overtime', cat: 'excel', kind: 'heat', theme: 'midnight', title: 'Overtime command', where: 'Excel', stack: ['Excel', 'Midnight Command theme'], desc: 'Overtime by department and month: KPI cards, heatmap and dropdown filters.' },
    { id: 'recruit', cat: 'excel', kind: 'funnel', theme: 'excel', title: 'Recruitment tracker', where: 'Excel', stack: ['Excel', 'SUMPRODUCT'], desc: 'Openings, candidates and stage conversion, filtered by location and employment type.' },
    { id: 'adm', cat: 'ai', kind: 'prompt', theme: 'ai', title: 'AI Dashboard Maker', where: 'Personal build', stack: ['React', 'Google AI Studio', 'Vercel'], desc: 'Type what you want to see; it builds the dashboard.' },
    { id: 'talent', cat: 'ai', kind: 'talent', theme: 'google', title: 'TalentRank', where: 'Recruitment', stack: ['Apps Script', 'Gemini'], desc: 'Parses CVs and ranks candidates against the role.' },
    { id: 'gmail', cat: 'ai', kind: 'gmail', theme: 'material', title: 'Riphah Command Center', where: 'In progress', stack: ['Angular', 'Node', 'Gemini', 'Cloud Run'], desc: 'An AI command centre on my work mail: morning brief, smart inbox, approvals and HR items.' },
    { id: 'skills', cat: 'ai', kind: 'skills', theme: 'term', title: 'HR skills for Claude', where: 'Weekly reporting', stack: ['Claude skills', 'Design system'], desc: 'Reusable skills that turn an HR export into a checked dashboard or a weekly status report.' },
    { id: 'org', cat: 'ai', kind: 'org', theme: 'streamlit', title: 'Organogram generator', where: 'Python app', stack: ['Python', 'Streamlit'], desc: 'Draws the org chart from an HR extract and checks span of control.' },
    { id: 'stbudget', cat: 'ai', kind: 'stbudget', theme: 'streamlit', title: 'HR budget analyser', where: 'Python app', stack: ['Python', 'Streamlit'], desc: 'Personnel cost, compensation and turnover joined for forward planning.' },
    { id: 'fuel', cat: 'apps', kind: 'fuel', theme: 'fuel', title: 'FuelPulse PK', where: 'Android', stack: ['Google AI Studio', 'Android'], desc: 'Fuel prices across Pakistan, city by city, with the next revision.' },
    { id: 'nuskha', cat: 'apps', kind: 'nuskha', theme: 'nuskha', title: 'Nuskha', where: 'In progress', stack: ['Flutter', 'Node', 'PostgreSQL'], desc: 'Turns a brand prescription into its generic, checks DRAP and interactions, in Urdu and English.' },
    { id: 'journey', cat: 'decks', kind: 'journey', theme: 'deck', title: 'Employee journey and AI roadmap', where: 'Riphah Group, for the Director HDS', stack: ['HTML deck', 'SAP HCM baseline'], desc: 'Five phases of the employee journey, the SAP baseline and where AI fits in each.' },
    { id: 'ai-prog', cat: 'decks', kind: 'doc', theme: 'doc', title: 'AI for HR programme', where: 'Riphah Group', stack: ['Curriculum', '10 weeks'], desc: 'Ten Tuesdays of applied AI for early-career staff, from prompting to agents.', docTitle: 'AI for HR', docMeta: 'Weekly training programme', heads: ['Week by week', 'What each session builds', 'Assessment'], weeks: true },
    { id: 'ai-resp', cat: 'decks', kind: 'doc', theme: 'doc', title: 'Using AI responsibly', where: 'Riphah Group onboarding', stack: ['Docs'], desc: 'The new-joiner session on using AI well and safely at work.', docTitle: 'Using AI responsibly', docMeta: 'New joiner onboarding session', heads: ['What AI is good for', 'What never goes in a prompt', 'Checking the answer'] }
  ];

  /* ---------- Mount: fixed 960 x 600 canvas, scaled as one unit ---------- */
  const live = new Map();
  const ro = 'ResizeObserver' in window ? new ResizeObserver(es => es.forEach(e => { const c = e.target.firstElementChild; if (c) c.style.transform = `scale(${e.contentRect.width / 960})`; })) : null;
  window.mountPreview = (frame, id) => {
    const p = window.PROJECTS.find(x => x.id === id);
    frame.classList.add('pv-frame'); frame.innerHTML = '';
    frame.setAttribute('role', 'img'); frame.setAttribute('aria-label', 'Animated preview of ' + p.title + ', drawn without real data');
    const el = document.createElement('div'); el.className = 'pv th-' + p.theme; frame.appendChild(el);
    if (ro) ro.observe(frame); else el.style.transform = `scale(${frame.clientWidth / 960})`;
    const res = K[p.kind](el, p) || (() => {});
    let tick = typeof res === 'function' ? res : res.tick; const every = (res && res.every) || 2600;
    if (p.looks) {
      el.dataset.look = p.looks[0][0];
      const lk = document.createElement('div'); lk.className = 'looks'; lk.innerHTML = p.looks.map(([, , c]) => `<i style="background:${c}"></i>`).join('') + '<b></b>'; el.appendChild(lk);
      const dots = lk.querySelectorAll('i'), name = lk.querySelector('b'); let n = 0, c = 0;
      const show = () => { el.dataset.look = p.looks[n][0]; dots.forEach((d, i) => d.classList.toggle('on', i === n)); name.textContent = p.looks[n][1]; };
      show(); const base = tick; tick = () => { base(); if (++c % 2 === 0) { n = (n + 1) % p.looks.length; show(); } };
    }
    const st = { tick, every, id: null, stop: res && res.stop }; live.set(frame, st);
    requestAnimationFrame(() => st.tick());
    if (!RM && io) io.observe(frame);
    return frame;
  };
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { const s = live.get(e.target); if (!s) return;
    if (e.isIntersecting && !s.id) { s.tick(); s.id = setInterval(s.tick, s.every + Math.random() * 300); }
    else if (!e.isIntersecting && s.id) { clearInterval(s.id); s.id = null; s.stop && s.stop(); } }), { rootMargin: '120px' }) : null;
})();
