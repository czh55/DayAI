# DayAI 每日资讯索引 — 2026-06-28

> 检索触发时间：2026-06-28T22:00:26Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.195**（npm @latest 无变化）：Changelog 维护线延续；微软 E+D 迁移 Copilot CLI **剩 2 天**（6/30 截止）。 |
| **Cursor** | **3.9（6/22）** 无 6/28 新 Changelog；本自动化任务即 Automations cron 实例；Customize 页 + computer use 为本周主线。 |
| **Codex** | 稳定版 **0.142.3** 无变化；**0.143.0-alpha.29** 今日 00:30Z 预发布；Remote GA（6/25）余波持续。 |
| **国内综述** | AICon 上海（6/26–27）Harness / 可验收闭环成共识；DeepSeek Harness 对标 Claude Code 叙事延续；天工 3.1 Dynamic Workflows 国内同步。 |
| **行业宏观** | 微软 Copilot CLI 迁移进入最后 48 小时；Harness「做厚 vs 做薄」分歧（Anthropic vs Codex 负责人）；Loop 成本 3–8 倍 Token 争议持续。 |
| **媒体透镜** | **共识**：AI 编程从 Prompt → Loop → Harness/Control Plane 演进，开发者角色转向「系统设计」；**最大分歧**：InfoQ 引 Codex 负责人称 Harness 应「尽可能小」，虎嗅强调 Loop Token 成本 2–4 倍于人工、可观测性缺失。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；Code Arena 千问 3.7 全球第二叙事延续；今日无新版本 |
| 百度文心/Comate | 千帆 Agent Infra + 伐谋仍最新；今日无公开更新（检索 2026-06-28 22:00 UTC） |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6 月大会）仍最新；CodeBuddy Plugin/IDE/CLI 统一治理；今日无新版本 |
| 字节豆包/Trae/火山方舟 | Seed 2.1（6/23）仍最新；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K2.6 Agent 集群（4 月）仍最新；今日无公开更新 |
| DeepSeek | Harness 团队对标 Claude Code 叙事延续；36氪 5 月报道余波；今日无新产品发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | Agentic Infra / 智果平台叙事延续；今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 与 Harness 工程成为 6 月媒体主轴，开发者从「写提示词」转向「设计循环系统 + 验收护栏」 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：量子位/36氪聚焦 DeepSeek Harness 与模型能力竞赛；虎嗅/InfoQ 更强调 Loop Token 成本与 Harness 厚度之争 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.195 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.142.3 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/22 Changelog 3.9 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.195 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.3
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 微软 6/30 迁移最后 48h、Harness 厚度之争、AICon 上海、Loop 成本争议 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.195 维护线、`/loops`、OTel、微软迁移影响 |
| [`cursor.md`](./cursor.md) | 3.9 Customize 页、Automations cron、computer use |
| [`codex.md`](./codex.md) | 0.142.3 稳定、alpha.29 预发布、Remote GA、Harness 做薄论 |
| [`china-ai.md`](./china-ai.md) | DeepSeek Harness、天工 3.1、国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（维护线，npm 2.1.195 无变）、[Anthropic News](https://www.anthropic.com/news)（无 6/28 新稿，最近 Claude Tag @ 6/23）、Cursor [Changelog](https://cursor.com/changelog)（3.9 @ 6/22，无 6/28 更新）、OpenAI [Codex Changelog](https://developers.openai.com/codex/changelog)（0.142.3 稳定）、GitHub Releases（0.143.0-alpha.29 @ 2026-06-28T00:30Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 26–28 日内容
- 交叉验证：Claude Code / Codex npm @latest 与昨日一致；Codex alpha.29 仅 GitHub Pre-release；微软迁移 The Verge + Developer-Tech 一致；Harness 分歧 Anthropic 博客 vs InfoQ 引 Michael Bolin 访谈
