/* BI lab: one dashboard grammar applied to fifteen industries, each with its own KPIs and charts.
   Sample data only, generated from a seed per industry and period. Drawn on a fixed 1200 x 760 canvas and scaled. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)', 'var(--c5)', 'var(--c6)'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const PER = { Month: MON, Quarter: ['Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26', 'Q4 26'], Year: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'] };
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // kpi: [label, min, max, format, higherIsBetter]
  const IND = {
    'Human Resources': { sub: 'Workforce, hiring and retention', k: [['Headcount', 1180, 1460, 'n', 1], ['Attrition, annualised', 8, 14, '%', 0], ['Time to hire', 24, 44, 'd', 0], ['Offer acceptance', 74, 93, '%', 1]],
      p: [{ t: 'line', title: 'Joiners and leavers', s: ['Joiners', 'Leavers'], r: [20, 70] }, { t: 'bar', title: 'Attrition by department', cats: ['Sales', 'Operations', 'Finance', 'HR', 'IT', 'Plant'], r: [4, 18], f: '%' }, { t: 'funnel', title: 'Hiring funnel', cats: ['Applied', 'Screened', 'Interviewed', 'Offered', 'Joined'], r: [900, 1400] }, { t: 'donut', title: 'Tenure mix', cats: ['Under 1 year', '1 to 3 years', '3 to 5 years', 'Over 5 years'] }] },
    'Cement': { sub: 'Clinker, kilns and dispatch', k: [['Clinker output', 180, 260, 'kt', 1], ['Kiln uptime', 86, 97, '%', 1], ['Power use', 82, 98, 'kWh/t', 0], ['Dispatch', 190, 280, 'kt', 1]],
      p: [{ t: 'line', title: 'Production against plan', s: ['Clinker', 'Cement', 'Plan'], r: [150, 280] }, { t: 'gauge', title: 'Kiln run factor', r: [84, 97], target: 92 }, { t: 'bar', title: 'Dispatch by region', cats: ['North', 'Central', 'South', 'West', 'Export'], r: [20, 90], f: 'kt' }, { t: 'heat', title: 'Kiln stoppages by shift', rows: ['Kiln 1, A', 'Kiln 1, B', 'Kiln 2, A', 'Kiln 2, B'], cols: DAYS }] },
    'Packaging': { sub: 'Lines, scrap and delivery', k: [['Output', 38, 56, 'm', 1], ['Scrap rate', 2.1, 5.4, '%', 0], ['OEE', 64, 82, '%', 1], ['On-time delivery', 86, 98, '%', 1]],
      p: [{ t: 'line', title: 'Output and scrap', s: ['Output', 'Scrap'], r: [20, 70] }, { t: 'heat', title: 'OEE by line and week', rows: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'], cols: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'] }, { t: 'bar', title: 'Orders by segment', cats: ['FMCG', 'Pharma', 'Food', 'Industrial', 'Export'], r: [8, 40], f: 'm' }, { t: 'donut', title: 'Downtime causes', cats: ['Changeover', 'Breakdown', 'Material', 'Quality'] }] },
    'Gensets': { sub: 'Sales, service and margin', k: [['Units sold', 160, 320, 'n', 1], ['Service jobs', 900, 1500, 'n', 1], ['Gross margin', 16, 26, '%', 1], ['Contract uptime', 95, 99.6, '%', 1]],
      p: [{ t: 'stack', title: 'Sales by kVA band', s: ['Under 50', '50 to 250', '250 to 1000', 'Over 1000'], r: [10, 60] }, { t: 'line', title: 'Service tickets opened and closed', s: ['Opened', 'Closed'], r: [60, 140] }, { t: 'donut', title: 'Fuel type', cats: ['Diesel', 'Gas', 'Hybrid'] }, { t: 'table', title: 'Service regions', cols: ['Region', 'Jobs', 'SLA met'], rows: ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan'], r: [[80, 340, 'n'], [86, 99, '%']] }] },
    'UPS and Inverters': { sub: 'Units, returns and warranty', k: [['Units sold', 4200, 7800, 'n', 1], ['Return rate', 1.2, 3.8, '%', 0], ['Warranty claims', 90, 240, 'n', 0], ['Margin', 18, 29, '%', 1]],
      p: [{ t: 'line', title: 'Sales by product', s: ['UPS', 'Inverters', 'Batteries'], r: [200, 700] }, { t: 'bar', title: 'Returns by fault', cats: ['Battery', 'Board', 'Fan', 'Display', 'Other'], r: [8, 60], f: 'n' }, { t: 'donut', title: 'Channel mix', cats: ['Dealers', 'Online', 'Corporate'] }, { t: 'gauge', title: 'Warranty turnaround within SLA', r: [78, 96], target: 90 }] },
    'Elevators': { sub: 'Installs, uptime and callbacks', k: [['Installations', 14, 40, 'n', 1], ['Fleet uptime', 97, 99.7, '%', 1], ['Callbacks', 40, 120, 'n', 0], ['Mean time to repair', 2.1, 5.8, 'h', 0]],
      p: [{ t: 'line', title: 'Fleet uptime', s: ['Uptime'], r: [96.5, 99.8] }, { t: 'bar', title: 'Callbacks by building type', cats: ['Residential', 'Office', 'Hospital', 'Mall', 'Hotel'], r: [6, 40], f: 'n' }, { t: 'heat', title: 'Breakdowns by hour and day', rows: ['00 to 06', '06 to 12', '12 to 18', '18 to 24'], cols: DAYS }, { t: 'table', title: 'Projects in installation', cols: ['Project', 'Floors', 'Complete'], rows: ['Tower A', 'Medical block', 'Mall east', 'Hotel annex', 'Office park'], r: [[6, 32, 'n'], [12, 96, '%']] }] },
    'Air-Conditioning': { sub: 'Season, installs and claims', k: [['Units sold', 9000, 16000, 'n', 1], ['Installs', 7000, 13000, 'n', 1], ['Warranty claims', 120, 380, 'n', 0], ['Peak season share', 48, 66, '%', 0]],
      p: [{ t: 'line', title: 'Sales against temperature', s: ['Units', 'Average temperature'], r: [20, 90] }, { t: 'stack', title: 'Sales by type', s: ['Inverter split', 'Split', 'Window'], r: [10, 60] }, { t: 'funnel', title: 'Lead to install', cats: ['Leads', 'Quotes', 'Orders', 'Installed'], r: [2400, 4000] }, { t: 'donut', title: 'Region mix', cats: ['Punjab', 'Sindh', 'KP', 'Islamabad'] }] },
    'Solar': { sub: 'Capacity, generation and returns', k: [['Capacity installed', 18, 42, 'MW', 1], ['Generation', 2100, 4800, 'MWh', 1], ['Performance ratio', 74, 86, '%', 1], ['Payback', 3.1, 4.8, 'yrs', 0]],
      p: [{ t: 'line', title: 'Generation against irradiance', s: ['Generation', 'Irradiance'], r: [30, 100] }, { t: 'bar', title: 'Installs by segment', cats: ['Homes', 'Commercial', 'Industrial', 'Agriculture'], r: [2, 14], f: 'MW' }, { t: 'gauge', title: 'Performance ratio', r: [74, 86], target: 80 }, { t: 'table', title: 'Top sites', cols: ['Site', 'kWp', 'PR'], rows: ['Textile mill', 'Cold store', 'Campus', 'Hospital', 'Warehouse'], r: [[250, 2200, 'n'], [72, 88, '%']] }] },
    'Finance': { sub: 'Revenue, cost and cash', k: [['Revenue', 820, 1240, 'PKR m', 1], ['Operating cost', 560, 860, 'PKR m', 0], ['Net margin', 9, 17, '%', 1], ['Cash conversion', 38, 66, 'd', 0]],
      p: [{ t: 'line', title: 'Revenue against target', s: ['Revenue', 'Target'], r: [60, 120] }, { t: 'bar', title: 'Spend by category', cats: ['Payroll', 'Rent', 'Utilities', 'Marketing', 'IT'], r: [20, 180], f: 'PKR m' }, { t: 'donut', title: 'Revenue mix', cats: ['Products', 'Services', 'Other'] }, { t: 'table', title: 'Variance by unit', cols: ['Unit', 'Budget', 'Variance'], rows: ['Head office', 'North', 'South', 'Plant', 'Online'], r: [[40, 220, 'n'], [-9, 9, '%']] }] },
    'Marketing': { sub: 'Leads, cost and conversion', k: [['Leads', 3200, 6400, 'n', 1], ['Cost per lead', 420, 960, 'PKR', 0], ['Conversion', 2.4, 6.1, '%', 1], ['Return on ad spend', 2.1, 5.2, 'x', 1]],
      p: [{ t: 'line', title: 'Leads by channel', s: ['Search', 'Social', 'Referral'], r: [100, 400] }, { t: 'funnel', title: 'Funnel', cats: ['Visits', 'Leads', 'Qualified', 'Sales ready', 'Won'], r: [40000, 70000] }, { t: 'bar', title: 'Spend by channel', cats: ['Search', 'Social', 'Video', 'Events', 'Print'], r: [1, 9], f: 'PKR m' }, { t: 'donut', title: 'Lead source', cats: ['Paid', 'Organic', 'Referral', 'Partners'] }] },
    'Healthcare': { sub: 'Beds, flow and waiting', k: [['Admissions', 2400, 3600, 'n', 1], ['Bed occupancy', 72, 93, '%', 1], ['Average stay', 3.1, 5.4, 'd', 0], ['Emergency wait', 18, 52, 'min', 0]],
      p: [{ t: 'line', title: 'Admissions and discharges', s: ['Admissions', 'Discharges'], r: [180, 320] }, { t: 'heat', title: 'Bed occupancy by ward and day', rows: ['Medicine', 'Surgery', 'Paediatrics', 'Gynaecology', 'ICU'], cols: DAYS }, { t: 'bar', title: 'Outpatient visits by specialty', cats: ['Medicine', 'Ortho', 'ENT', 'Eye', 'Derm', 'Cardio'], r: [800, 4200], f: 'n' }, { t: 'gauge', title: 'Bed occupancy', r: [72, 93], target: 85 }] },
    'Education': { sub: 'Enrolment, retention and results', k: [['Enrolment', 8200, 11800, 'n', 1], ['Retention', 82, 94, '%', 1], ['Students per faculty', 14, 22, 'x', 0], ['Pass rate', 81, 95, '%', 1]],
      p: [{ t: 'line', title: 'Enrolment by intake', s: ['Undergraduate', 'Postgraduate'], r: [200, 1400] }, { t: 'funnel', title: 'Admissions funnel', cats: ['Enquiries', 'Applications', 'Offers', 'Enrolled'], r: [9000, 14000] }, { t: 'bar', title: 'Retention by faculty', cats: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Management', 'Computing'], r: [78, 97], f: '%' }, { t: 'donut', title: 'Programme mix', cats: ['Undergraduate', 'Postgraduate', 'Diploma'] }] },
    'Administration': { sub: 'Requests, service levels and backlog', k: [['Requests', 1800, 3200, 'n', 0], ['Within SLA', 84, 97, '%', 1], ['Backlog', 60, 220, 'n', 0], ['Resolution time', 6, 22, 'h', 0]],
      p: [{ t: 'line', title: 'Requests opened and closed', s: ['Opened', 'Closed'], r: [120, 280] }, { t: 'bar', title: 'Requests by type', cats: ['Facilities', 'Transport', 'IT access', 'Supplies', 'Security'], r: [80, 640], f: 'n' }, { t: 'heat', title: 'Requests by hour and day', rows: ['08 to 10', '10 to 12', '12 to 14', '14 to 16', '16 to 18'], cols: DAYS.slice(0, 6) }, { t: 'gauge', title: 'Within SLA', r: [84, 97], target: 95 }] },
    'Operations': { sub: 'Output, yield and downtime', k: [['Output', 42000, 61000, 'n', 1], ['OEE', 62, 81, '%', 1], ['Downtime', 40, 130, 'h', 0], ['First pass yield', 91, 98.6, '%', 1]],
      p: [{ t: 'line', title: 'Output against plan', s: ['Output', 'Plan'], r: [3000, 5600] }, { t: 'gauge', title: 'Overall equipment effectiveness', r: [62, 81], target: 75 }, { t: 'bar', title: 'Downtime by cause', cats: ['Breakdown', 'Changeover', 'Material', 'Labour', 'Quality'], r: [4, 40], f: 'h' }, { t: 'heat', title: 'Yield by line and week', rows: ['Line A', 'Line B', 'Line C', 'Line D'], cols: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'] }] },
    'IT': { sub: 'Tickets, service levels and uptime', k: [['Tickets', 2100, 3900, 'n', 0], ['Within SLA', 86, 98, '%', 1], ['Systems uptime', 99.1, 99.98, '%', 1], ['Time to resolve', 3, 14, 'h', 0]],
      p: [{ t: 'line', title: 'Tickets opened and resolved', s: ['Opened', 'Resolved'], r: [140, 330] }, { t: 'bar', title: 'Tickets by category', cats: ['Access', 'Hardware', 'Network', 'Software', 'Email'], r: [120, 900], f: 'n' }, { t: 'donut', title: 'Priority mix', cats: ['P1', 'P2', 'P3', 'P4'] }, { t: 'table', title: 'Systems uptime', cols: ['System', 'Users', 'Uptime'], rows: ['ERP', 'HRIS', 'Email', 'LMS', 'Portal'], r: [[300, 4200, 'n'], [98.6, 99.99, '%']] }] }
  };
  window.LAB_INDUSTRIES = Object.keys(IND);

  const rng = seed => { let x = 0; for (const c of seed) x = (x * 31 + c.charCodeAt(0)) >>> 0; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); };
  const fmt = (v, f) => {
    const n = Math.abs(v) >= 1000 ? Math.round(v).toLocaleString('en-US') : Math.abs(v) >= 100 ? Math.round(v).toString() : (Math.round(v * 10) / 10).toString();
    return f === '%' ? n + '%' : f === 'n' ? n : f === 'x' ? n + 'x' : f === 'PKR' ? 'PKR ' + n : f === 'PKR m' ? 'PKR ' + n + 'm' : n + ' ' + f;
  };
  const walk = (r, n, a, b) => { let v = a + (b - a) * (0.35 + r() * 0.3); return Array.from({ length: n }, () => (v = Math.max(a, Math.min(b, v + (b - a) * (r() - 0.48) * 0.28)))); };
  const pathOf = (vals, x0, y0, w, h, mn, mx) => vals.map((v, i) => `${i ? 'L' : 'M'}${(x0 + (i / (vals.length - 1)) * w).toFixed(1)},${(y0 + h - ((v - mn) / (mx - mn || 1)) * h).toFixed(1)}`).join(' ');

  // ---- chart renderers: each returns SVG markup for a w x h box
  const R = {
    line(P, r, W, H, labs) {
      const n = labs.length, ser = P.s.map(() => walk(r, n, P.r[0], P.r[1])), all = ser.flat(), mn = Math.min(...all) * .96, mx = Math.max(...all) * 1.02;
      const x0 = 44, y0 = 14, w = W - 60, h = H - 60;
      const grid = [0, 1, 2, 3].map(i => { const y = y0 + (h / 3) * i, v = mx - ((mx - mn) / 3) * i; return `<line x1="${x0}" x2="${x0 + w}" y1="${y}" y2="${y}" class="gl"/><text x="${x0 - 8}" y="${y + 4}" text-anchor="end" class="ax">${fmt(v, 'n')}</text>`; }).join('');
      const xl = labs.map((l, i) => (n > 8 && i % 2) ? '' : `<text x="${x0 + (i / (n - 1)) * w}" y="${y0 + h + 22}" text-anchor="middle" class="ax">${l}</text>`).join('');
      const lines = ser.map((v, i) => `<path d="${pathOf(v, x0, y0, w, h, mn, mx)}" class="ln dr" pathLength="1" style="stroke:${C[i]};${i === 2 ? 'stroke-dasharray:6 6;animation:none' : ''}"/>`).join('');
      const area = `<path d="${pathOf(ser[0], x0, y0, w, h, mn, mx)} L${x0 + w},${y0 + h} L${x0},${y0 + h} Z" style="fill:${C[0]};opacity:.1" class="fi"/>`;
      const leg = P.s.map((s, i) => `<g transform="translate(${x0 + i * 170},${H - 8})"><rect width="12" height="12" y="-10" rx="3" style="fill:${C[i]}"/><text x="18" class="lg">${s}</text></g>`).join('');
      return grid + xl + area + lines + leg;
    },
    bar(P, r, W, H) {
      const v = P.cats.map(() => P.r[0] + r() * (P.r[1] - P.r[0])), mx = Math.max(...v) * 1.15, n = v.length, x0 = 10, y0 = 26, w = W - 20, h = H - 70, bw = w / n * .62, top = v.indexOf(Math.max(...v));
      return v.map((val, i) => { const bh = val / mx * h, x = x0 + (w / n) * i + (w / n - bw) / 2, y = y0 + h - bh;
        return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6" class="gr" style="fill:${i === top ? C[2] : C[0]};animation-delay:${i * 60}ms"/><text x="${x + bw / 2}" y="${y - 8}" text-anchor="middle" class="vl">${fmt(val, P.f)}</text><text x="${x + bw / 2}" y="${y0 + h + 22}" text-anchor="middle" class="ax">${P.cats[i]}</text>`; }).join('');
    },
    stack(P, r, W, H, labs) {
      const n = Math.min(8, labs.length), L = labs.slice(-n), data = L.map(() => P.s.map(() => P.r[0] + r() * (P.r[1] - P.r[0]))), tot = data.map(d => d.reduce((a, b) => a + b, 0)), mx = Math.max(...tot) * 1.08;
      const x0 = 10, y0 = 14, w = W - 20, h = H - 74, bw = w / n * .58;
      const bars = data.map((d, i) => { let acc = 0; const x = x0 + (w / n) * i + (w / n - bw) / 2;
        return d.map((v, j) => { const bh = v / mx * h, y = y0 + h - acc - bh; acc += bh; return `<rect x="${x}" y="${y}" width="${bw}" height="${Math.max(0, bh - 2)}" rx="4" class="gr" style="fill:${C[j]};animation-delay:${i * 50}ms"/>`; }).join('') + `<text x="${x + bw / 2}" y="${y0 + h + 20}" text-anchor="middle" class="ax">${L[i]}</text>`; }).join('');
      const leg = P.s.map((s, i) => `<g transform="translate(${10 + i * 140},${H - 8})"><rect width="12" height="12" y="-10" rx="3" style="fill:${C[i]}"/><text x="18" class="lg">${s}</text></g>`).join('');
      return bars + leg;
    },
    donut(P, r, W, H) {
      const v = P.cats.map(() => 1 + r() * 4), sum = v.reduce((a, b) => a + b, 0), cx = H / 2 + 6, cy = H / 2 - 4, rad = H / 2 - 24, L = 2 * Math.PI * rad; let off = 0;
      const segs = v.map((x, i) => { const len = x / sum * L, el = `<circle cx="${cx}" cy="${cy}" r="${rad}" class="dn" style="stroke:${C[i]};stroke-dasharray:${len - 3} ${L - len + 3};stroke-dashoffset:${-off};animation-delay:${i * 90}ms" transform="rotate(-90 ${cx} ${cy})"/>`; off += len; return el; }).join('');
      const leg = P.cats.map((c, i) => `<g transform="translate(${cx + rad + 48},${cy - (P.cats.length - 1) * 19 + i * 38})"><rect width="14" height="14" y="-11" rx="4" style="fill:${C[i]}"/><text x="24" class="lg">${c}</text><text x="${W - cx - rad - 70}" text-anchor="end" class="vl">${Math.round(v[i] / sum * 100)}%</text></g>`).join('');
      return segs + `<text x="${cx}" y="${cy + 8}" text-anchor="middle" class="big">${P.cats.length}</text><text x="${cx}" y="${cy + 30}" text-anchor="middle" class="ax">groups</text>` + leg;
    },
    gauge(P, r, W, H) {
      const v = P.r[0] + r() * (P.r[1] - P.r[0]), f = (v - P.r[0]) / (P.r[1] - P.r[0]), tf = (P.target - P.r[0]) / (P.r[1] - P.r[0]);
      const cx = W / 2, cy = H - 46, rad = Math.min(W / 2 - 40, H - 80), arc = a => [cx + rad * Math.cos(Math.PI * (1 - a)), cy - rad * Math.sin(Math.PI * (1 - a))];
      const [ex, ey] = arc(f), [tx, ty] = arc(tf), [sx, sy] = arc(0), [fx, fy] = arc(1);
      const ok = v >= P.target;
      return `<path d="M${sx},${sy} A${rad},${rad} 0 0 1 ${fx},${fy}" class="gt"/><path d="M${sx},${sy} A${rad},${rad} 0 0 1 ${ex},${ey}" class="gv dr" pathLength="1" style="stroke:${ok ? C[1] : C[2]}"/>
        <line x1="${tx}" y1="${ty}" x2="${cx + (rad - 34) * Math.cos(Math.PI * (1 - tf))}" y2="${cy - (rad - 34) * Math.sin(Math.PI * (1 - tf))}" class="tk"/>
        <text x="${cx}" y="${cy - 14}" text-anchor="middle" class="big">${fmt(v, '%')}</text><text x="${cx}" y="${cy + 14}" text-anchor="middle" class="ax">target ${P.target}%, ${ok ? 'met' : 'below'}</text>
        <text x="${sx}" y="${cy + 26}" text-anchor="middle" class="ax">${P.r[0]}%</text><text x="${fx}" y="${cy + 26}" text-anchor="middle" class="ax">${P.r[1]}%</text>`;
    },
    heat(P, r, W, H) {
      const rows = P.rows, cols = P.cols, x0 = 120, y0 = 8, cw = (W - x0 - 10) / cols.length, ch = (H - 40) / rows.length;
      return rows.map((rw, i) => `<text x="${x0 - 12}" y="${y0 + ch * i + ch / 2 + 5}" text-anchor="end" class="ax">${rw}</text>` + cols.map((c, j) => { const v = r(); return `<rect x="${x0 + cw * j + 2}" y="${y0 + ch * i + 2}" width="${cw - 4}" height="${ch - 4}" rx="6" class="hc" style="fill:${v > .86 ? C[4] : C[0]};opacity:${(.14 + v * .86).toFixed(2)};animation-delay:${(i * cols.length + j) * 14}ms"/>`; }).join('')).join('') + cols.map((c, j) => `<text x="${x0 + cw * j + cw / 2}" y="${H - 8}" text-anchor="middle" class="ax">${c}</text>`).join('');
    },
    funnel(P, r, W, H) {
      let v = P.r[0] + r() * (P.r[1] - P.r[0]); const vals = P.cats.map((_, i) => i ? (v = v * (0.32 + r() * 0.36)) : v), n = vals.length, rh = (H - 20) / n, x0 = 130, w = W - x0 - 90;
      return vals.map((val, i) => { const bw = Math.max(8, val / vals[0] * w), y = 6 + rh * i;
        return `<text x="${x0 - 12}" y="${y + rh / 2 + 5}" text-anchor="end" class="ax">${P.cats[i]}</text><rect x="${x0 + (w - bw) / 2}" y="${y + 4}" width="${bw}" height="${rh - 10}" rx="8" class="gx" style="fill:${i === n - 1 ? C[1] : C[0]};opacity:${1 - i * .12};animation-delay:${i * 80}ms"/><text x="${x0 + w + 12}" y="${y + rh / 2 + 5}" class="vl">${fmt(val, 'n')}</text>${i ? `<text x="${W - 6}" y="${y + rh / 2 + 5}" text-anchor="end" class="ax">${Math.round(val / vals[i - 1] * 100)}%</text>` : ''}`; }).join('');
    },
    table(P, r, W, H) {
      const n = P.rows.length, rh = (H - 34) / n, c1 = 20, c2 = W * .46, c3 = W * .7;
      const head = `<text x="${c1}" y="20" class="th">${P.cols[0]}</text><text x="${c2}" y="20" text-anchor="end" class="th">${P.cols[1]}</text><text x="${c3}" y="20" class="th">${P.cols[2]}</text>`;
      return head + P.rows.map((row, i) => { const y = 34 + rh * i, a = P.r[0][0] + r() * (P.r[0][1] - P.r[0][0]), b = P.r[1][0] + r() * (P.r[1][1] - P.r[1][0]), f = (b - P.r[1][0]) / (P.r[1][1] - P.r[1][0]);
        return `<line x1="0" x2="${W}" y1="${y}" y2="${y}" class="gl"/><text x="${c1}" y="${y + rh / 2 + 6}" class="lg">${row}</text><text x="${c2}" y="${y + rh / 2 + 6}" text-anchor="end" class="vl">${fmt(a, P.r[0][2])}</text><rect x="${c3}" y="${y + rh / 2 - 6}" width="${W - c3 - 80}" height="12" rx="6" class="gt2"/><rect x="${c3}" y="${y + rh / 2 - 6}" width="${(W - c3 - 80) * Math.max(.05, f)}" height="12" rx="6" class="gx" style="fill:${b < 0 ? C[4] : C[1]}"/><text x="${W - 10}" y="${y + rh / 2 + 6}" text-anchor="end" class="vl">${b > 0 && P.r[1][0] < 0 ? '+' : ''}${fmt(b, '%')}</text>`; }).join('');
    }
  };

  const spark = (r, up) => { const v = walk(r, 12, 10, 40); if (up) v.sort((a, b) => a - b); return pathOf(v, 0, 0, 120, 34, Math.min(...v), Math.max(...v)); };

  const draw = (board, name, period) => {
    const I = IND[name], r = rng(name + period), labs = PER[period];
    const prev = period === 'Month' ? 'last month' : period === 'Quarter' ? 'last quarter' : 'last year';
    const kp = I.k.map(([l, a, b, f, hib]) => { const v = a + r() * (b - a), d = (r() - .45) * 12, good = (d >= 0) === !!hib;
      return `<div class="kp"><div class="kl">${l}</div><div class="kv">${fmt(v, f)}</div><div class="kd" style="color:${good ? 'var(--good)' : 'var(--bad)'}">${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}% <span>vs ${prev}</span></div><svg viewBox="0 0 120 34" class="sp"><path d="${spark(r, d >= 0)}" pathLength="1" class="dr" style="stroke:${good ? 'var(--good)' : 'var(--bad)'}"/></svg></div>`; }).join('');
    const pn = I.p.map(P => `<div class="pn"><div class="pt">${esc(P.title)}</div><svg viewBox="0 0 556 236" class="ch">${R[P.t](P, r, 556, 236, labs)}</svg></div>`).join('');
    board.innerHTML = `<div class="lb"><div class="lh"><div><div class="ln1">${esc(name)}</div><div class="ln2">${esc(I.sub)}. Sample data, by ${period.toLowerCase()}.</div></div><div class="lp">Live sample</div></div><div class="kr">${kp}</div><div class="pg">${pn}</div></div>`;
  };

  window.mountLab = root => {
    const frame = root.querySelector('.lab-board'), list = root.querySelector('.lab-list'), sel = root.querySelector('.lab-select'), per = root.querySelectorAll('[data-period]');
    const canvas = document.createElement('div'); canvas.className = 'lab-canvas'; frame.appendChild(canvas);
    const sizer = document.createElement('div'); sizer.className = 'lab-sizer'; frame.appendChild(sizer);
    const fit = () => { const w = frame.clientWidth, k = Math.max(w / 1200, w < 700 ? 0.56 : 0);
      canvas.style.transform = `scale(${k})`; frame.style.height = (760 * k) + 'px'; sizer.style.width = (1200 * k) + 'px';
      frame.classList.toggle('pan', 1200 * k > w + 1); };
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(frame); fit();
    const hashInd = () => { const h = decodeURIComponent(location.hash.slice(1)); return window.LAB_INDUSTRIES.includes(h) ? h : null; };
    let cur = hashInd() || window.LAB_INDUSTRIES[0], p = 'Month';
    const set = () => { draw(canvas, cur, p); list.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.i === cur))); sel.value = cur; per.forEach(b => b.setAttribute('aria-selected', String(b.dataset.period === p))); history.replaceState(null, '', '#' + encodeURIComponent(cur)); };
    addEventListener('hashchange', () => { const h = hashInd(); if (h && h !== cur) { cur = h; set(); } });
    window.LAB_INDUSTRIES.forEach(n => { const b = document.createElement('button'); b.type = 'button'; b.dataset.i = n; b.textContent = n; b.addEventListener('click', () => { cur = n; set(); }); list.appendChild(b); sel.append(new Option(n, n)); });
    sel.addEventListener('change', () => { cur = sel.value; set(); });
    per.forEach(b => b.addEventListener('click', () => { p = b.dataset.period; set(); }));
    set();
  };
})();
