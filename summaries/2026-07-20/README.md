# DayAI 每日资讯索引 — 2026-07-20

> 检索触发时间：2026-07-20T22:00:56Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.215** 仍为最新（7/20 无新 release）；**Fable 5 分层定价今日（7/20 00:00 PT）正式生效**——Max/Team Premium 永久含 50% 周额度，Pro/Team Standard 转 credits + $100 一次性额度。 |
| **Cursor** | **7/20 无新 Changelog**；7/17 Slack 集成（计划先行、多仓库、跨频道）仍为最近更新，桌面端 3.11 无变动。 |
| **Codex** | 稳定版 **0.144.6** 无新 stable；今日发布预发布 **0.145.0-alpha.25**（7/20 18:51 UTC）；5h 限额临时移除仍生效。 |
| **国内综述** | **Fable 5 分层今日落地**、**DeepSeek 旧 API 名弃用倒计时 4 天**；Kimi K3 发布第 4 日持续发酵；TRAE Work 知识库（7/18）上线。 |
| **行业宏观** | Anthropic 7/20 起将付费用户一分为二：高端永久含 Fable 5、Pro 转按量计费；OpenAI Codex 以 5h 限额移除承接分流用户，AI 编程进入「额度分层」新阶段。 |
| **媒体透镜** | **共识**：Fable 5 分层落地标志额度博弈从「延期促销」转入「永久定价」；**最大分歧**：Pro 用户收到 $100 credits 后是否会大规模迁移至 Codex/GPT-5.6 Sol，还是 credits 足以留住重度用户。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 11 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-20 22:00 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | **TRAE Work 知识库 7/18 上线**（40 万字 AI 工作 SOP）；Trae 2.0 SOLO 预告 7/21 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3** 发布第 4 日；2.8T 参数、7/27 全面开源倒计时 7 天 |
| DeepSeek | V4 预览运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **4 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-20 22:00 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-20 22:00 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-20 22:00 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-20 22:00 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-20 22:00 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-20 22:00 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-20 22:00 UTC） |

## 媒体行业透镜一句话

- **共识**：Fable 5 分层落地标志 AI 编程竞争从模型能力转向额度分层与 Harness 系统工程 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Pro 用户 $100 credits 是否足以留住重度 Fable 5 用户，还是将加速 Codex 900 万周活增长 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.215 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.6 | ✅ `@latest` 仍为 0.144.6；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.145.0-alpha.25 | ✅ GitHub 7/20 18:51 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/17 Slack Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.215 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.6
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 分层今日生效、Codex alpha.25、DeepSeek 弃用倒计时 4 天、Loop Engineering 持续 |
| [`china-media.md`](./china-media.md) | 36氪 Loop 工程、虎嗅 Fable 5 分层、TechTimes Pro 转 credits、Kimi K3 第 4 日 |
| [`claude-code.md`](./claude-code.md) | 2.1.215 无新 release、Fable 5 分层今日落地、/model /effort /loops 操作 SOP |
| [`cursor.md`](./cursor.md) | 7/20 无新更新；7/17 Slack 集成回顾与操作 SOP |
| [`codex.md`](./codex.md) | 0.144.6 稳定版、alpha.25 今日发布、5h 限额移除持续 |
| [`china-ai.md`](./china-ai.md) | Kimi K3 第 4 日、DeepSeek 弃用倒计时 4 天、TRAE Work 知识库 |

## 检索记录脚注

- 国际官方：Claude Code Changelog + [GitHub v2.1.215](https://github.com/anthropics/claude-code/releases/tag/v2.1.215)（7/20 无新 release）、[Cursor Changelog](https://cursor.com/changelog)（7/20 无新条目）、Codex GitHub releases（0.144.6、0.145.0-alpha.25）、[Anthropic News](https://www.anthropic.com/news)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：Fable 5 分层（@claudeai 7/17 + TechTimes 7/20 + PCWorld 7/20）；alpha.25（GitHub release 7/20 18:51 UTC）；DeepSeek 弃用（官方 API 文档 + Developers Digest）
