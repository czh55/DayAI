# DayAI 每日资讯索引 — 2026-07-03

> 检索触发时间：2026-07-03T22:00:11Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.200** 连发两版 patch：默认权限改为 **Manual**、`AskUserQuestion` 不再自动继续；大量 background agent / subagent 稳定性修复。 |
| **Cursor** | **7/3 仍无新 Changelog**（6/30 Team MCP 最新）；本触发为 Automations cron 第 2 日连续运行。 |
| **Codex** | 稳定版 **0.142.5** 不变；预发布 **0.143.0-alpha.35** 于 7/3 02:33Z 发布（npm 可装）。 |
| **国内综述** | DeepSeek 邮件预告 **7 月中旬 API 峰谷定价**；豆包专业版三级阶梯价上线；其余厂商今日无新版本。 |
| **行业宏观** | Anthropic 7/2 披露 **Fable 5 四类安全分类器** 与 **CJS 越狱严重度框架**（Glasswing 伙伴共建）。 |
| **媒体透镜** | **共识**：Fable 5 恢复进入「治理透明化」阶段；**最大分歧**：36氪称体验「翻车」，官方用技术文档回应误拦机制。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；今日无公开更新（检索 2026-07-03 22:00 UTC） |
| 百度文心/Comate | 千帆 Agent Infra 仍最新；今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | **豆包专业版**三级阶梯定价（68/200/500 元/月）今日上线报道；模型仍为 2.1 Pro（6/23） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无新版本 |
| 月之暗面 Kimi | Kimi K2.7 仍最新；今日无公开更新 |
| DeepSeek | **7 月中旬 API 峰谷定价**邮件预告（高峰 2×）；今日无新产品发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Anthropic 7/2 技术披露将 Fable 5 争议从「情绪」拉回「可审计的安全架构」→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：36氪 7/2「解禁即翻车」vs 官方 CJS 框架「行业共建标准」——前者强调误拦体验，后者强调 99%+ bypass 阻断 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.200 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Manual 权限与 Fable 5 推理 |
| Codex CLI | 0.142.5 | ✅ `--version` / `doctor` / `features list` 正常；alpha.35 在 npm 可装但未作 `@latest` |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/30 Team MCP Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.200 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.5
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | CJS 越狱框架、Fable 5 分类器四类、DeepSeek 峰谷定价 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.200 权限/后台 Agent 修复、Fable 5 安全披露 |
| [`cursor.md`](./cursor.md) | 6/30 Team MCP 余波、Automations cron 连续触发 |
| [`codex.md`](./codex.md) | 0.142.5 稳定版、alpha.35 预发布线 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Fable Safeguards & CJS Framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)（7/2）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（2.1.200）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 后无更新**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**alpha.35 @ 7/3 02:33Z**）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 7/1–7/3 内容
- 交叉验证：Claude Code npm @latest **2.1.200**（modified 7/3 20:52Z）；Codex npm stable 0.142.5 与 GitHub Latest 一致；alpha.35 GitHub 与 npm 版本号吻合
