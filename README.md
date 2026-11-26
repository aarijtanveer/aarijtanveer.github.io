# aarijtanveer.github.io

Portfolio, about and services site for Muhammad Arij Tanveer. Plain HTML, CSS and JavaScript; no build step and no libraries.

- `index.html` the portfolio: hero showreel, the work gallery (filters and a project viewer), the BI lab teaser, about, and a call to action
- `lab.html` the BI lab: fifteen industry dashboards (Month, Quarter, Year) on generated sample data
- `services.html` "Let’s collaborate": the offer for independent projects: services, how it works, ways to work, FAQ and a brief that opens as an email or WhatsApp message

Navigation: one bar on every page (a tab bar at the bottom on phones). Search everything with Ctrl K, Cmd K or `/`.
Links you can share: `index.html#work=ai` opens a filtered gallery, `index.html#p=pf` opens one project, `lab.html#Cement` opens an industry, `services.html?s=dash#brief` pre-selects a service in the brief.

To change contact details, edit `CONTACT` in `assets/js/site.js` and the links in the three HTML files.
Project list: `window.PROJECTS` in `assets/js/previews.js`. Services: `assets/js/data.js`.
