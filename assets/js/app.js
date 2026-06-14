/**
 * DayAI Web Reader
 * Static SPA for GitHub Pages — reads index.json + summaries/*.md
 */

const SECTIONS = [
  { key: 'readme', label: '今日索引', icon: null, group: '概览' },
  { key: 'industry', label: '行业宏观', icon: null, group: '概览' },
  { key: 'china_media', label: '媒体透镜', icon: null, group: '国内' },
  { key: 'china_ai', label: '国内综述', icon: null, group: '国内' },
  { key: 'claude_code', label: 'Claude Code', icon: 'svgs/claude-code.svg', group: '工具' },
  { key: 'cursor', label: 'Cursor', icon: 'svgs/cursor.svg', group: '工具' },
  { key: 'codex', label: 'Codex', icon: 'svgs/codex.svg', group: '工具' },
];

const FILE_TO_KEY = {
  'readme.md': 'readme',
  'industry.md': 'industry',
  'china-media.md': 'china_media',
  'china-ai.md': 'china_ai',
  'claude-code.md': 'claude_code',
  'cursor.md': 'cursor',
  'codex.md': 'codex',
};

const state = {
  index: null,
  currentDate: null,
  currentSection: null,
  loading: false,
};

const $ = (sel) => document.querySelector(sel);

const els = {
  loading: $('#loading'),
  error: $('#error'),
  viewHome: $('#view-home'),
  viewDay: $('#view-day'),
  main: $('#main'),
};

/** Resolve asset URLs for GitHub Pages project sites (/repo/) and local dev */
function assetUrl(path) {
  return new URL(path, document.baseURI).href;
}

function showLoading(show) {
  state.loading = show;
  els.loading.hidden = !show;
}

function showError(message) {
  els.error.hidden = false;
  els.error.textContent = message;
}

function clearError() {
  els.error.hidden = true;
  els.error.textContent = '';
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return `${dateStr}（${weekdays[date.getDay()]}）`;
}

function getSummaryByDate(date) {
  return state.index?.summaries?.find((s) => s.date === date) ?? null;
}

function getAdjacentDates(date) {
  const dates = (state.index?.summaries ?? []).map((s) => s.date).sort();
  const idx = dates.indexOf(date);
  return {
    prev: idx > 0 ? dates[idx - 1] : null,
    next: idx < dates.length - 1 ? dates[idx + 1] : null,
  };
}

function parseRoute() {
  const hash = location.hash.replace(/^#\/?/, '') || '';
  if (!hash) return { view: 'home' };

  const parts = hash.split('/');
  const date = parts[0];
  const section = parts[1] || 'readme';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { view: 'home' };
  return { view: 'day', date, section };
}

function navigate(hash) {
  if (location.hash !== hash) {
    location.hash = hash;
  } else {
    render();
  }
}

function setupMarked() {
  marked.use({
    gfm: true,
    breaks: false,
    walkTokens(token) {
      if (token.type !== 'link' || !state.currentDate) return;

      const href = token.href;
      if (!href || (!href.endsWith('.md') && !href.includes('.md#'))) return;

      const [filePart, anchor] = href.split('#');
      const fileName = filePart.replace(/^\.\//, '').split('/').pop();
      const sectionKey = FILE_TO_KEY[fileName];
      if (sectionKey) {
        token.href = `#/${state.currentDate}/${sectionKey}${anchor ? `#${anchor}` : ''}`;
      }
    },
  });
}

function postProcessHtml(html) {
  const doc = new DOMParser().parseFromString(`<div id="md-root">${html}</div>`, 'text/html');
  const root = doc.getElementById('md-root');
  if (!root) return html;

  root.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
    if (heading.id) return;
    const plain = heading.textContent || '';
    const slug = plain
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff\s-]/g, '')
      .replace(/\s+/g, '-');
    if (slug) heading.id = slug;
  });

  root.querySelectorAll('a').forEach((anchor) => {
    const href = anchor.getAttribute('href') || '';

    if (href.startsWith('http')) {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer');
    }

    if (href.startsWith('#/')) {
      anchor.setAttribute('data-internal-link', '');
    }

    if (
      href &&
      !href.startsWith('http') &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:')
    ) {
      anchor.setAttribute('href', assetUrl(href));
    }
  });

  return root.innerHTML;
}

function highlightCode(container) {
  container.querySelectorAll('pre code').forEach((block) => {
    if (!block.classList.contains('hljs')) {
      hljs.highlightElement(block);
    }
  });
}

async function fetchText(path) {
  const url = assetUrl(path);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`无法加载 ${path}（${res.status}）`);
  return res.text();
}

async function loadIndex() {
  if (state.index) return state.index;
  const data = await fetchText('index.json');
  state.index = JSON.parse(data);
  return state.index;
}

async function renderMarkdown(path) {
  const md = await fetchText(path);
  return postProcessHtml(marked.parse(md));
}

function renderHome() {
  els.viewHome.hidden = false;
  els.viewDay.hidden = true;

  const summaries = [...(state.index?.summaries ?? [])].sort(
    (a, b) => b.date.localeCompare(a.date),
  );
  const latest = summaries[0];

  let latestCard = '';
  if (latest) {
    latestCard = `
      <a href="#/${latest.date}" class="latest-card">
        <span class="latest-label">最新一期</span>
        <div class="latest-date">${formatDate(latest.date)}</div>
        <p class="latest-headline">${escapeHtml(latest.headline)}</p>
      </a>`;
  }

  const dateCards = summaries
    .map((s) => {
      const isLatest = s.date === latest?.date;
      return `
        <a href="#/${s.date}" class="date-card${isLatest ? ' is-latest' : ''}">
          <div class="date-card-date">${formatDate(s.date)}</div>
          <p class="date-card-headline">${escapeHtml(s.headline)}</p>
        </a>`;
    })
    .join('');

  const toolsHtml =
    latest?.tools
      ?.map(
        (t) => `
      <span class="tool-chip">
        <img src="${assetUrl(t.icon)}" alt="" width="18" height="18">
        <strong>${escapeHtml(t.name)}</strong> · ${escapeHtml(t.one_liner)}
      </span>`,
      )
      .join('') ?? '';

  els.viewHome.innerHTML = `
    <div class="home-hero">
      <h1>DayAI 每日资讯</h1>
      <p>Claude Code · Cursor · Codex · 国内 AI 动态</p>
    </div>
    ${latestCard}
    <h2 class="section-title">历史归档</h2>
    <div class="date-grid">${dateCards || '<p>暂无总结数据</p>'}</div>
    ${
      toolsHtml
        ? `<h2 class="section-title">今日工具速览</h2><div class="tools-row">${toolsHtml}</div>`
        : ''
    }`;
}

async function renderDay(date, sectionKey) {
  els.viewHome.hidden = true;
  els.viewDay.hidden = false;

  const summary = getSummaryByDate(date);
  if (!summary) {
    showError(`未找到 ${date} 的总结数据`);
    els.viewDay.hidden = true;
    return;
  }

  const validSection = SECTIONS.find((s) => s.key === sectionKey);
  const activeSection = validSection ? sectionKey : 'readme';
  const filePath = summary.files[activeSection];

  if (!filePath) {
    showError(`未找到章节：${activeSection}`);
    return;
  }

  state.currentDate = date;
  state.currentSection = activeSection;

  const { prev, next } = getAdjacentDates(date);

  const navGroups = ['概览', '国内', '工具'];
  const navHtml = navGroups
    .map((group) => {
      const items = SECTIONS.filter((s) => s.group === group)
        .filter((s) => summary.files[s.key])
        .map((s) => {
          const icon = s.icon
            ? `<img src="${assetUrl(s.icon)}" alt="">`
            : '<span style="width:20px"></span>';
          const active = s.key === activeSection ? ' active' : '';
          return `<li><a href="#/${date}/${s.key}" class="${active.trim()}">${icon}${escapeHtml(s.label)}</a></li>`;
        })
        .join('');
      if (!items) return '';
      return `<li class="nav-group-label">${group}</li>${items}`;
    })
    .join('');

  const mobileNavHtml = SECTIONS.filter((s) => summary.files[s.key])
    .map((s) => {
      const active = s.key === activeSection ? ' active' : '';
      return `<a href="#/${date}/${s.key}" class="${active.trim()}">${escapeHtml(s.label)}</a>`;
    })
    .join('');

  let insightHtml = '';
  if (activeSection === 'readme' || activeSection === 'china_media') {
    const cards = [];
    if (summary.china_summary) {
      cards.push(`<div class="insight-card"><strong>国内综述</strong>${escapeHtml(summary.china_summary)}</div>`);
    }
    if (summary.media_lens?.consensus) {
      cards.push(`<div class="insight-card"><strong>媒体共识</strong>${escapeHtml(summary.media_lens.consensus)}</div>`);
    }
    if (summary.media_lens?.divergence) {
      cards.push(`<div class="insight-card"><strong>媒体分歧</strong>${escapeHtml(summary.media_lens.divergence)}</div>`);
    }
    if (cards.length) {
      insightHtml = `<div class="insight-cards">${cards.join('')}</div>`;
    }
  }

  els.viewDay.innerHTML = `
    <div class="day-layout">
      <aside class="day-sidebar">
        <div class="day-meta">
          <a href="#/" class="day-back">← 返回首页</a>
          <h1 class="day-title">${formatDate(date)}</h1>
          <p class="day-headline">${escapeHtml(summary.headline)}</p>
        </div>
        <ul class="nav-sections">${navHtml}</ul>
        <div class="day-nav-dates" style="margin-top:1.5rem;font-size:0.85rem;display:flex;gap:1rem;">
          ${prev ? `<a href="#/${prev}" style="color:var(--text-secondary)">← ${prev}</a>` : ''}
          ${next ? `<a href="#/${next}" style="color:var(--text-secondary);margin-left:auto">${next} →</a>` : ''}
        </div>
      </aside>
      <div class="day-content">
        <nav class="mobile-nav">${mobileNavHtml}</nav>
        ${insightHtml}
        <article class="markdown-body" id="markdown-content">
          <div class="loading"><div class="spinner"></div><span>渲染中…</span></div>
        </article>
      </div>
    </div>`;

  try {
    const html = await renderMarkdown(filePath);
    const container = $('#markdown-content');
    container.innerHTML = html;
    highlightCode(container);

    const routeAnchor = location.hash.split('#').slice(2).join('#');
    if (routeAnchor) {
      const el = document.getElementById(decodeURIComponent(routeAnchor));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (err) {
    $('#markdown-content').innerHTML = `<p class="error-panel">${escapeHtml(err.message)}</p>`;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function render() {
  clearError();
  const route = parseRoute();

  showLoading(true);
  try {
    await loadIndex();

    if (route.view === 'home') {
      renderHome();
    } else {
      await renderDay(route.date, route.section);
    }
  } catch (err) {
    showError(`加载失败：${err.message}`);
    els.viewHome.hidden = true;
    els.viewDay.hidden = true;
  } finally {
    showLoading(false);
  }

  document.title =
    route.view === 'day'
      ? `${route.date} — DayAI`
      : 'DayAI 每日资讯';
}

function initTheme() {
  const stored = localStorage.getItem('dayai-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;

  $('#theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('dayai-theme', next);
  });
}

function initRouter() {
  window.addEventListener('hashchange', render);

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-internal-link], a[href^="#/"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href?.startsWith('#/')) {
      e.preventDefault();
      navigate(href.slice(1));
    }
  });

  document.querySelectorAll('[data-nav-home]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('#/');
    });
  });
}

function init() {
  setupMarked();
  initTheme();
  initRouter();
  render();
}

init();
