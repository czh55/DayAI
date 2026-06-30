# DayAI 每日资讯索引 — 2026-06-30

> 检索触发时间：2026-06-30T22:01:18Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.197** 今日升级：默认模型切换为 **Claude Sonnet 5**（1M 上下文，促销价 $2/$10 per Mtok 至 8/31）；微软 E+D 内部许可 **今日截止**。 |
| **Cursor** | **6/30 无新 Changelog**；6/29 **Cursor for iOS 公测**余波延续，移动端 Cloud Agent + Remote Control 叙事仍为主轴。 |
| **Codex** | 稳定版 **0.142.4**（npm 无变）；预发布线升至 **0.143.0-alpha.31**（6/29 23:21Z）；GPT-5.6 预览与 ALE 基准讨论持续。 |
| **国内综述** | 量子位/36氪聚焦 Sonnet 5 与 Fable 5 解禁余波、GLM-5.2 开源编程叙事；DeepSeek Harness 对标 Claude Code 招聘延续。 |
| **行业宏观** | **Anthropic 正式发布 Sonnet 5**（接近 Opus 4.8 能力、中端定价）；**微软内部 Claude Code 许可今日到期**；Agent 分层发售与 IPO 前定价战升温。 |
| **媒体透镜** | **共识**：中端 Agent 模型（Sonnet 5）将拉低高质量编程 Agent 门槛；**最大分歧**：虎嗅质疑 Fable 5 安全护栏与隐性降级，量子位/36氪更聚焦能力竞赛与 Sonnet 5「性价比王牌」叙事。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | Qwen-AgentWorld（6/24）仍最新；今日无公开更新（检索 2026-06-30 22:01 UTC） |
| 百度文心/Comate | 千帆 Agent Infra + 伐谋仍最新；今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6 月大会）仍最新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | Seed 2.1 / 豆包专业版（6/23–24）仍最新；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2 开源编程叙事（6/27 量子位）仍最热；今日无新版本 |
| 月之暗面 Kimi | Kimi Work Beta（6/3）仍最新；今日无公开更新 |
| DeepSeek | Harness 团队招聘对标 Claude Code 叙事延续；今日无新产品发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | Agentic Infra 叙事延续；今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Sonnet 5 将「接近 Opus 级 Agent 能力」下沉至中端价位，叠加 Cursor 移动端与 Claude Tag 协作层，开发者角色加速转向「任务设计 + Agent 管理」 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：虎嗅持续质疑 Fable 5 安全策略与隐性能力降级；量子位/36氪更强调 Sonnet 5 对开源 GLM-5.2 的正面竞争与 ALE 新基准 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.197 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Sonnet 5 推理 |
| Codex CLI | 0.142.4 | ✅ `--version` / `doctor` / `features list` 正常；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/29 iOS 公测 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.197 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.142.4
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Sonnet 5 发布、微软 6/30 迁移截止、IPO 定价战、ALE 基准 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.197 + Sonnet 5 默认模型、`/model`、组织默认模型 |
| [`cursor.md`](./cursor.md) | iOS 公测余波、Cloud Agent 移动端、Remote Control |
| [`codex.md`](./codex.md) | 0.142.4 稳定版、alpha.31 预发布、ALE 与 GPT-5.6 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、GLM-5.2 叙事、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Claude Sonnet 5 发布](https://www.anthropic.com/news/claude-sonnet-5)（**6/30 新稿**）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（**2.1.197 + Sonnet 5**）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 无新条目**，最近 6/29 iOS）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（stable 0.142.4；**alpha.31 @ 6/29 23:21Z**）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 6 月 28–30 日内容
- 交叉验证：Claude Code npm @latest 2.1.197 与 Changelog Sonnet 5 条目一致；Sonnet 5 官方 + The Verge + VentureBeat 交叉；微软 6/30 截止 Winbuzzer + The Verge 一致；Codex stable 与昨日 0.142.4 一致
