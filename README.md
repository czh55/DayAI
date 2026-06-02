# DayAI

按日期归档的 AI 行业与编码 Agent 每日总结（Claude Code、Cursor、Codex 等）。

## 目录结构

```
summaries/
  YYYY-MM-DD/
    README.md          # 当日总览
    industry.md        # 行业/融资/宏观
    claude-code.md     # Claude Code 特性 + 本地测试笔记
    cursor.md          # Cursor 特性 + 本地测试笔记
    codex.md           # Codex 特性 + 本地测试笔记
```

## 已发布

| 日期 | 路径 |
|------|------|
| 2026-06-02 | [summaries/2026-06-02](./summaries/2026-06-02/README.md) |

## 本地 CLI 测试（可选）

测试依赖安装在 `tools/`（不提交 `node_modules`）：

```bash
npm install --prefix tools @openai/codex@0.136.0 @anthropic-ai/claude-code
./tools/node_modules/.bin/codex --version
./tools/node_modules/.bin/claude --version
```
