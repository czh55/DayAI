# DayAI 每日资讯索引 — 2026-07-21

> 检索触发时间：2026-07-21T22:00:08Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 今日发布 **2.1.217**（21:35 UTC）；新增 emoji 短码补全、子智能体并发上限（默认 20）、嵌套子智能体默认关闭，并修复 Windows 自动更新与 MCP 内存泄漏。 |
| **Cursor** | **7/21 无新 Changelog**；7/17 Slack 集成（计划先行、多仓库、跨频道）仍为最近更新，桌面端 3.11 无变动。 |
| **Codex** | 稳定版 **0.145.0** 今日发布（18:21 UTC），npm `@latest` 已跟随；含 `/import` 迁移 Cursor/Claude Code、Amazon Bedrock 登录、多智能体 V2 稳定化。 |
| **国内综述** | **TRAE 2.0 SOLO 今晚正式发布**（Context Engineer 全流程交付）；**DeepSeek 旧 API 名弃用倒计时 3 天**；Kimi K3 发布第 5 日、权重开源倒计时 6 天。 |
| **行业宏观** | 国际双 CLI 同日大版本（Claude 2.1.217 + Codex 0.145.0）与国产 TRAE SOLO「任务中心」范式形成对照：Agent 从代码补全走向全流程软件交付。 |
| **媒体透镜** | **共识**：TRAE SOLO 标志国产 AI 编程从「IDE 增强」进入「Context Engineer 自主交付」阶段；**最大分歧**：SOLO 能否在真实工程场景替代 Cursor/Claude Code，还是仅适合 MVP 与演示。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 12 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-21 22:00 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | **TRAE 2.0 SOLO 今晚正式发布**（Context Engineer，国际版 Pro + SOLO Code 解锁） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3** 发布第 5 日；完整权重 **7/27** 开源倒计时 **6 天** |
| DeepSeek | V4 预览运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **3 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-21 22:00 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-21 22:00 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-21 22:00 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-21 22:00 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-21 22:00 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-21 22:00 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-21 22:00 UTC） |

## 媒体行业透镜一句话

- **共识**：TRAE SOLO 与 Codex 0.145.0 `/import` 共同指向「任务中心 + 上下文工程」新范式，AI 编程竞争从模型能力转向 Harness 与交付闭环 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：国产 SOLO「一句话交付」能否在复杂存量代码库落地，还是仅适合 greenfield 项目与产品原型 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.217 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.145.0 | ✅ npm `@latest` 已升级；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.145.0-alpha.29 | ✅ GitHub 7/21 11:49 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/17 Slack Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.217 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.145.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | TRAE SOLO 发布、Claude/Codex 双版本、DeepSeek 弃用倒计时 3 天、Fable 5 分层次日 |
| [`china-media.md`](./china-media.md) | 智东西 TRAE SOLO、36氪 Agent 范式、腾讯新闻 Context Engineer、Kimi K3 持续发酵 |
| [`claude-code.md`](./claude-code.md) | 2.1.217 子智能体上限、emoji 补全、Windows 修复、/loops /model 操作 SOP |
| [`cursor.md`](./cursor.md) | 7/21 无新更新；7/17 Slack 集成回顾与操作 SOP |
| [`codex.md`](./codex.md) | 0.145.0 stable 发布、`/import` 迁移、Bedrock 登录、多智能体 V2 |
| [`china-ai.md`](./china-ai.md) | TRAE SOLO 详解、DeepSeek 弃用倒计时 3 天、Kimi K3 第 5 日 |

## 检索记录脚注

- 国际官方：Claude Code Changelog + [GitHub v2.1.217](https://github.com/anthropics/claude-code/releases/tag/v2.1.217)（7/21 21:35 UTC）、[Cursor Changelog](https://cursor.com/changelog)（7/21 无新条目）、Codex GitHub [0.145.0](https://github.com/openai/codex/releases/tag/rust-v0.145.0)（7/21 18:21 UTC）、[Anthropic News](https://www.anthropic.com/news)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn、腾讯新闻、智东西（触发日 ±24h）
- 交叉验证：TRAE SOLO（字节官方公众号 + 智东西 7/21 + 腾讯新闻 7/21）；Codex 0.145.0（GitHub release + npm `@latest` 本地实测）；DeepSeek 弃用（官方 API 文档 + Developers Digest）
