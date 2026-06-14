#!/usr/bin/env node
/**
 * build-index.js — 扫描 summaries/ 目录，自动生成根目录 index.json
 *
 * 用法（在仓库根目录）：
 *   node tools/build-index.js
 *   node tools/build-index.js --dry-run   # 只打印，不写文件
 *   node tools/build-index.js --check     # 检查是否与现有 index.json 一致
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SUMMARIES_DIR = path.join(ROOT, 'summaries');
const INDEX_PATH = path.join(ROOT, 'index.json');

const FILE_MAP = {
  readme: 'README.md',
  industry: 'industry.md',
  china_media: 'china-media.md',
  china_ai: 'china-ai.md',
  claude_code: 'claude-code.md',
  cursor: 'cursor.md',
  codex: 'codex.md',
};

const TOOL_DEFS = [
  {
    tableLabel: 'Claude Code',
    id: 'claude-code',
    name: 'Claude Code',
    icon: 'svgs/claude-code.svg',
  },
  {
    tableLabel: 'Cursor',
    id: 'cursor',
    name: 'Cursor',
    icon: 'svgs/cursor.svg',
  },
  {
    tableLabel: 'Codex',
    id: 'codex',
    name: 'OpenAI Codex',
    icon: 'svgs/codex.svg',
  },
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function stripMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/→.*$/, '')
    .trim();
}

function shorten(text, max = 72) {
  const clean = stripMarkdown(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastPause = Math.max(cut.lastIndexOf('；'), cut.lastIndexOf('，'), cut.lastIndexOf('。'));
  if (lastPause > max * 0.5) return cut.slice(0, lastPause);
  return `${cut}…`;
}

function extractSection(markdown, heading) {
  const re = new RegExp(`## ${heading}\\s*\\n+([\\s\\S]*?)(?=\\n## |$)`);
  const match = markdown.match(re);
  return match ? match[1].trim() : '';
}

function extractFirstSection(markdown, headings) {
  for (const heading of headings) {
    const section = extractSection(markdown, heading);
    if (section) return section;
  }
  return '';
}

function normalizeLabel(label) {
  const aliases = {
    国内厂商: '国内综述',
  };
  return aliases[label] || label;
}

function parseMarkdownTable(section) {
  const rows = [];
  for (const line of section.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || trimmed.includes('---')) continue;
    const cells = trimmed
      .split('|')
      .slice(1, -1)
      .map((c) => stripMarkdown(c.trim()));
    if (cells.length >= 2) rows.push({ label: normalizeLabel(cells[0]), value: cells[1], cells });
  }
  return rows;
}

function parseConclusionTable(readme) {
  const section = extractFirstSection(readme, ['今日一句话结论', '一句话结论']);
  const map = new Map();
  for (const row of parseMarkdownTable(section)) {
    map.set(row.label, row.value);
  }

  // 2026-06-02 等早期格式：从「三大工具速览」表补全工具结论
  if (!map.get('Claude Code') || !map.get('Cursor') || !map.get('Codex')) {
    const legacyTools = extractSection(readme, '三大工具速览');
    for (const row of parseMarkdownTable(legacyTools)) {
      const toolName = row.label;
      const summary = row.cells?.[2] || row.value;
      if (['Claude Code', 'Cursor', 'Codex'].includes(toolName) && summary) {
        map.set(toolName, summary);
      }
    }
  }

  return map;
}

function parseTriggerAt(readme, date) {
  const patterns = [
    /检索触发时间[（(]UTC[）)]*[：:]\s*(\d{4}-\d{2}-\d{2}T[\d:.]+Z?)/,
    /检索触发时间[：:]\s*(\d{4}-\d{2}-\d{2}T[\d:.]+Z?)/,
    /生成时间[：:]\s*(\d{4}-\d{2}-\d{2})[ T]([\d:.]+)\s*UTC/,
  ];

  for (const pattern of patterns) {
    const match = readme.match(pattern);
    if (!match) continue;
    if (match.length === 3) {
      return `${match[1]}T${match[2].replace(/ /g, '')}Z`;
    }
    const value = match[1];
    return value.endsWith('Z') ? value : `${value}Z`;
  }

  return `${date}T08:00:00.000Z`;
}

function parseMediaLens(readme, conclusions) {
  const mediaRow = conclusions.get('媒体透镜') || '';

  let consensus = '';
  let divergence = '';

  const consensusMatch = mediaRow.match(/共识[：:*\s]*([^；]+)/);
  const divergenceMatch = mediaRow.match(/(?:最大)?分歧[：:*\s]*(.+)$/);

  if (consensusMatch) consensus = stripMarkdown(consensusMatch[1]);
  if (divergenceMatch) divergence = stripMarkdown(divergenceMatch[1]);

  if (!consensus || !divergence) {
    const lensSection = extractSection(readme, '媒体行业透镜一句话');
    for (const line of lensSection.split('\n')) {
      const c = line.match(/^\s*[-*]\s*\*\*共识\*\*[：:]\s*(.+)$/);
      const d = line.match(/^\s*[-*]\s*\*\*最大分歧\*\*[：:]\s*(.+)$/);
      if (c && !consensus) consensus = stripMarkdown(c[1]);
      if (d && !divergence) divergence = stripMarkdown(d[1]);
    }
  }

  return { consensus, divergence };
}

function keyPhrase(text, max = 42) {
  const clean = stripMarkdown(text);
  const first = clean.split(/[；]/)[0] || clean;
  return shorten(first, max);
}

function buildTools(conclusions) {
  return TOOL_DEFS.map((tool) => {
    const raw = conclusions.get(tool.tableLabel) || '';
    return {
      id: tool.id,
      name: tool.name,
      icon: tool.icon,
      one_liner: shorten(raw, 80) || '今日无更新',
    };
  });
}

function buildHeadline(tools) {
  const parts = tools
    .map((t) => keyPhrase(t.one_liner, 36))
    .filter((t) => t && t !== '今日无更新');
  return parts.join('；') || '今日 AI 资讯总结';
}

function buildFiles(dateDir, date) {
  const files = {};
  const base = `summaries/${date}`;
  for (const [key, filename] of Object.entries(FILE_MAP)) {
    const fullPath = path.join(dateDir, filename);
    if (fs.existsSync(fullPath)) {
      files[key] = `${base}/${filename}`;
    }
  }
  return files;
}

function discoverDates() {
  if (!fs.existsSync(SUMMARIES_DIR)) return [];

  return fs
    .readdirSync(SUMMARIES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && DATE_RE.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => b.localeCompare(a));
}

function buildSummaryEntry(date) {
  const dateDir = path.join(SUMMARIES_DIR, date);
  const readmePath = path.join(dateDir, FILE_MAP.readme);
  const readme = readFileSafe(readmePath);

  if (!readme) {
    console.warn(`⚠️  跳过 ${date}：缺少 README.md`);
    return null;
  }

  const conclusions = parseConclusionTable(readme);
  const tools = buildTools(conclusions);
  const mediaLens = parseMediaLens(readme, conclusions);
  const files = buildFiles(dateDir, date);

  if (Object.keys(files).length === 0) {
    console.warn(`⚠️  跳过 ${date}：目录内无 Markdown 文件`);
    return null;
  }

  const chinaSummary =
    stripMarkdown(conclusions.get('国内综述') || '') ||
    extractChinaSummaryFallback(path.join(dateDir, FILE_MAP.china_ai));

  return {
    date,
    path: `summaries/${date}`,
    headline: buildHeadline(tools),
    files,
    tools,
    china_summary: shorten(chinaSummary, 120) || '暂无国内综述',
    media_lens: {
      consensus: mediaLens.consensus || '暂无',
      divergence: mediaLens.divergence || '暂无',
    },
    _trigger_at: parseTriggerAt(readme, date),
  };
}

function extractChinaSummaryFallback(chinaAiPath) {
  const content = readFileSafe(chinaAiPath);
  if (!content) return '';

  const section = extractSection(content, '国内综述（今日最值得开发者关注的 1–3 条）');
  const firstItem = section.match(/^\d+\.\s*\*\*([^*]+)\*\*[：:]\s*(.+)$/m);
  if (firstItem) return `${firstItem[1]}：${stripMarkdown(firstItem[2])}`;

  return '';
}

function buildIndex() {
  const dates = discoverDates();
  const summaries = [];
  let latestTrigger = null;

  for (const date of dates) {
    const entry = buildSummaryEntry(date);
    if (!entry) continue;

    const { _trigger_at, ...publicEntry } = entry;
    summaries.push(publicEntry);
    if (!latestTrigger) latestTrigger = _trigger_at;
  }

  return {
    generated_at: new Date().toISOString(),
    trigger_at: latestTrigger || new Date().toISOString(),
    latest_date: summaries[0]?.date || null,
    summaries,
  };
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes('--dry-run'),
    check: args.includes('--check'),
  };
}

function main() {
  const { dryRun, check } = parseArgs();
  const index = buildIndex();

  if (index.summaries.length === 0) {
    console.error('❌ 未找到任何 summaries/YYYY-MM-DD 目录');
    process.exit(1);
  }

  const output = `${JSON.stringify(index, null, 2)}\n`;

  if (check) {
    const existing = readFileSafe(INDEX_PATH);
    if (existing === output) {
      console.log('✅ index.json 已是最新');
      process.exit(0);
    }
    console.error('❌ index.json 与自动生成结果不一致，请运行: node tools/build-index.js');
    process.exit(1);
  }

  console.log(`📅 共 ${index.summaries.length} 天总结，最新：${index.latest_date}`);

  if (dryRun) {
    process.stdout.write(output);
    return;
  }

  fs.writeFileSync(INDEX_PATH, output, 'utf8');
  console.log(`✅ 已写入 ${path.relative(ROOT, INDEX_PATH)}`);
}

main();
