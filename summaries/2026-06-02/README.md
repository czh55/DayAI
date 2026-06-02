# AI 每日总结 — 2026-06-02

> 生成时间：2026-06-02 22:30 UTC  
> 测试环境：Cursor Cloud Agent（Linux Ubuntu 24.04，Node v22.22.3）

## 今日头条

| 事件 | 来源 | 影响 |
|------|------|------|
| **OpenAI Codex 企业版大更新** — Sites、Annotations、6 个角色插件 | [OpenAI 官方博客](https://openai.com/index/codex-for-every-role-tool-workflow/) | Codex 从开发者工具扩展为知识工作者平台 |
| **Claude Code v2.1.160/161** — 安全加固 + `ultracode` 触发词改名 | [GitHub Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.160) | 动态工作流入口变更，需迁移习惯 |
| **Microsoft Build 2026 开幕** — MAI 模型、Project Polaris、Copilot 多 Agent | [Microsoft Build Live](https://news.microsoft.com/build-2026-live-blog/microsoft-build-2026-live/) | 微软加速「后 OpenAI 时代」自研模型战略 |

## 三大工具速览

| 工具 | 本地版本 | 今日核心变化 | 本地测试结论 |
|------|----------|--------------|--------------|
| Claude Code | **2.1.161** | 安全确认、`ultracode` 改名、grep 后可直接编辑 | CLI 可用，对话需登录 |
| Cursor | **Cloud Agent 环境** | 3.6 Auto-review、Automations、Composer 2.5 | 云 Agent 功能实测通过 |
| Codex | **0.136.0** | Sites / Annotations / 角色插件 | CLI 可用，新功能需企业账号 |

## 文件索引

- [industry.md](./industry.md) — 今日 AI 行业大事件
- [claude-code.md](./claude-code.md) — Claude Code 特性与本地测试
- [cursor.md](./cursor.md) — Cursor 特性与本地测试
- [codex.md](./codex.md) — Codex 特性与本地测试

## 本地测试环境

```bash
# 工具安装位置
/workspace/tools/
├── package.json          # @anthropic-ai/claude-code ^2.1.161
└── @openai/codex         # codex-cli 0.136.0
```
