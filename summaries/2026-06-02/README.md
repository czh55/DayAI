# AI 每日总结 — 2026-06-02

> 生成时间：2026-06-02 23:40 UTC  
> 测试环境：Cursor Cloud Agent（Linux Ubuntu 24.04，Node v22.22.3）  
> 触发方式：Cursor Automation Cron `0 22 * * *`

## 今日头条

| 事件 | 来源 | 影响 |
|------|------|------|
| **OpenAI Codex 企业版大更新** — Sites、Annotations、6 个角色插件 | [OpenAI 官方博客](https://openai.com/index/codex-for-every-role-tool-workflow/) | Codex 从开发者工具扩展为知识工作者平台 |
| **Claude Code v2.1.160/161** — 安全加固 + `ultracode` 触发词改名 | [GitHub Release v2.1.160](https://github.com/anthropics/claude-code/releases/tag/v2.1.160) | 动态工作流入口变更，需迁移习惯 |
| **Anthropic 秘密递交 IPO S-1** | [CNBC](https://www.cnbc.com/2026/06/01/anthropic-ipo-s1-prospectus.html) | 抢在 OpenAI 之前进入上市流程，估值约 9650 亿美元 |
| **特朗普签署 AI 模型预发布审查行政令** | [The Verge](https://www.theverge.com/policy/941775/trump-ai-executive-order) | 自愿框架，企业可在公开发布前 30 天向联邦政府共享前沿模型 |

## 三大工具速览

| 工具 | 本地版本 | 今日核心变化 | 本地测试结论 |
|------|----------|--------------|--------------|
| Claude Code | **2.1.161** | 安全确认、`ultracode` 改名、grep 后可直接编辑 | CLI 可用；交互/`-p` 需登录 |
| Cursor | **Cloud Agent 3.6 能力集** | Auto-review、Automations、Composer 2.5 | 云 Agent 环境实测通过 |
| Codex | **0.136.0** | Sites / Annotations / 角色插件（企业向） | CLI 可用；新功能需 Business/Enterprise |

## 文件索引

- [industry.md](./industry.md) — 今日 AI 行业大事件
- [claude-code.md](./claude-code.md) — Claude Code 特性与本地测试
- [cursor.md](./cursor.md) — Cursor 特性与本地测试
- [codex.md](./codex.md) — Codex 特性与本地测试

## 本地测试环境

```bash
# 工具安装
cd /workspace/tools && npm install

# 版本确认
./node_modules/.bin/claude --version   # 2.1.161
./node_modules/.bin/codex --version    # codex-cli 0.136.0
```

## 一句话建议

| 场景 | 建议 |
|------|------|
| 大型代码库审计/迁移 | Claude Code `ultracode` 或 `/deep-research` |
| 日常 IDE 长任务 | Cursor Auto-review + Composer 2.5 Fast |
| 非技术团队知识工作 | Codex Sites + 角色插件（需企业账号） |
| 每日资讯自动化 | Cursor No-repo Automation + cron |
