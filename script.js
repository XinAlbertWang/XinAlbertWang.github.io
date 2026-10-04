const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
let savedTheme = 'light';
try { savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch (_) { /* Storage is optional. */ }
html.setAttribute('data-theme', savedTheme);

function updateThemeLabel() {
    const next = html.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
    const label = themeToggle?.querySelector('.theme-label');
    if (label) label.textContent = next;
    themeToggle?.setAttribute('aria-label', `Switch to ${next.toLowerCase()} theme`);
}
updateThemeLabel();
themeToggle?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (_) { /* Theme switching does not require storage. */ }
    updateThemeLabel();
});

// Use element IDs so empty hashes never produce an invalid CSS selector.
document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (!target) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
    history.replaceState(null, '', anchor.getAttribute('href'));
});

function escapeHTML(value = '') {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}
function renderPubList(list, cfg) {
    return list.map(paper => `<article class="pub-card">
        <div class="pub-content">
            <div class="pub-header">
                <h3 class="pub-title">${escapeHTML(paper.title)}</h3>
                <div class="pub-links">${Object.entries(paper.links || {}).map(([label, url]) => `<a href="${escapeHTML(url)}" class="pub-link" aria-label="${escapeHTML(label)}: ${escapeHTML(paper.title)}">${escapeHTML(label)}</a>`).join('')}</div>
            </div>
            <p class="pub-authors">${paper.authors === cfg.name ? `<strong>${escapeHTML(paper.authors)}</strong>` : escapeHTML(paper.authors)}</p>
            <p class="pub-venue">${escapeHTML(paper.venue)}</p>
            ${paper.abstract ? `<p class="pub-abstract">${escapeHTML(paper.abstract)}</p>` : ''}
        </div>
    </article>`).join('');
}
function renderExperienceItem(item) {
    return `<div class="exp-item">
        <div class="exp-period">${escapeHTML(item.period)}</div>
        <h3 class="exp-title">${escapeHTML(item.title)}</h3>
        ${item.institution ? `<p class="exp-org">${escapeHTML(item.institution)}</p>` : ''}
        ${item.details ? `<p class="exp-desc">${escapeHTML(item.details)}</p>` : ''}
    </div>`;
}
function renderReference(person) {
    return `<article class="reference-card">
        <p class="reference-role">${escapeHTML(person.role || 'Reference')}</p>
        <h3 class="exp-title">${escapeHTML(person.name)}</h3>
        <p class="exp-org">Department of Economics<br>University of Western Ontario</p>
        <p><a href="mailto:${escapeHTML(person.email)}">${escapeHTML(person.email)}</a></p>
        <p><a href="${escapeHTML(person.phone_href)}">${escapeHTML(person.phone)}</a></p>
    </article>`;
}
function populateHomepage(cfg) {
    document.querySelectorAll('[data-config]').forEach(element => {
        const key = element.dataset.config;
        if (key === 'role_university') element.textContent = `${cfg.role} at ${cfg.university}`;
        else if (cfg[key] !== undefined) element.textContent = cfg[key];
    });
    document.querySelectorAll('[data-link]').forEach(element => {
        const key = element.dataset.link;
        const url = key === 'email' ? `mailto:${cfg.email}` : key === 'phone' ? cfg.phone_href : cfg.links[key];
        if (url) element.setAttribute('href', url);
    });
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('cfg-interests').textContent = cfg.research_interests.join(', ');
    [['cfg-jmp', cfg.jmp], ['cfg-working-papers', cfg.working_papers], ['cfg-wip', cfg.wip]].forEach(([id, papers]) => {
        document.getElementById(id).innerHTML = renderPubList(papers, cfg);
    });
    document.getElementById('cfg-education').innerHTML = cfg.education.map(renderExperienceItem).join('');
    document.getElementById('cfg-experience').innerHTML = `
        <div><h3 class="exp-category">Teaching Assistant</h3><p class="section-intro">University of Western Ontario</p>
            ${cfg.teaching.map(renderExperienceItem).join('')}
        </div>
        <div><h3 class="exp-category">Research Assistant</h3><p class="section-intro">University of Western Ontario</p>
            ${cfg.research_assistance.map(renderExperienceItem).join('')}
        </div>`;
    document.getElementById('cfg-presentations').innerHTML = cfg.presentations.map(item => `<div class="news-item presentation-item">
        <span class="news-date">${escapeHTML(item.date)}</span>
        <div><h3 class="pub-title">${escapeHTML(item.conference)}</h3><p class="exp-org">${escapeHTML(item.location)}${item.status ? ` <span class="news-badge">${escapeHTML(item.status)}</span>` : ''}</p></div>
    </div>`).join('');
    document.getElementById('cfg-additional').innerHTML = `
        <div><h3 class="exp-category">Scholarships</h3>${cfg.scholarships.map(renderExperienceItem).join('')}</div>
        <div><h3 class="exp-category">Skills</h3>
            <div class="exp-item"><h4 class="exp-title">Programming</h4><p class="exp-org">${escapeHTML(cfg.skills.programming.join(', '))}</p></div>
            <div class="exp-item"><h4 class="exp-title">Languages</h4><p class="exp-org">${escapeHTML(cfg.skills.languages.join(', '))}</p></div>
        </div>`;
    document.getElementById('cfg-references').innerHTML = cfg.references.map(renderReference).join('') + renderReference(cfg.placement_director);
}
if (typeof USER_CONFIG !== 'undefined') populateHomepage(USER_CONFIG);
