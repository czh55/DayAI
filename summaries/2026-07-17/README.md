# DayAI 每日资讯索引 — 2026-07-17

> 检索触发时间：2026-07-17T22:00:37Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.212**（7/17 00:26 UTC）发布；`/fork` 改为复制到后台会话、`/subtask` 取代会话内子 Agent，新增 WebSearch/子 Agent 会话级上限（默认 200）与 MCP 超 2 分钟自动后台化。 |
| **Cursor** | **7/17 Changelog** 更新 **Cursor in Slack**：启动前先出计划、支持多仓库环境与跨频道/线程读写，3.11 桌面端仍为最近大版本。 |
| **Codex** | 稳定版 **0.144.5** 第二日；**0.145.0-alpha.22** 于 17:29 UTC 发布，npm `@latest` 仍指向 0.144.5；5h 限额临时移除延续。 |
| **国内综述** | **Kimi K3** 昨夜发布（7/27 开源）；**DeepSeek 旧 API 名弃用倒计时 7 天**；**Grok Build** 7/16 全面开源。 |
| **行业宏观** | Claude 官方定义 **Loop Engineering** 四范式获 36氪/虎嗅同日跟进；**Gemini 3.5 Pro 难产延期数月**；Fable 5 免费窗口剩 **2 天**。 |
| **媒体透镜** | **共识**：AI 编程重心从 Prompt 转向 Loop/Harness 系统工程；**最大分歧**：Kimi K3 前端 Arena 第一是否代表国产模型已全面追平 Fable 5。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 8 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-17 22:00 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | **Trae 2.0** 官宣 7/21 发布 SOLO 模式；Trae-Agent 7/4 已开源 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3** 昨夜发布，Arena 前端榜第一；7/27 全面开源 |
| DeepSeek | V4 预览运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **7 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-17 22:00 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-17 22:00 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-17 22:00 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-17 22:00 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-17 22:00 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-17 22:00 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-17 22:00 UTC） |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 成为 Claude Code / Codex / Cursor 共同叙事，开发者角色从写 Prompt 转向设计停止条件与验证器 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Kimi K3 前端能力登顶 Arena 是否意味着国产模型已在编程全栈追平 Fable 5 / GPT-5.6 Sol → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.212 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.5 | ✅ `@latest` 仍为 0.144.5；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.145.0-alpha.22 | ✅ GitHub 17:29 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/17 Slack Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.212 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.5
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Claude Code 2.1.212、Cursor Slack 多仓库、Kimi K3、Grok Build 开源、Gemini 3.5 Pro 延期 |
| [`china-media.md`](./china-media.md) | 36氪 Loop 工程、Kimi K3 实测、Gemini 难产、虎嗅 Codex 增长、InfoQ 上下文工程 |
| [`claude-code.md`](./claude-code.md) | 2.1.212 `/fork` 重构、失控循环上限、MCP 自动后台化、plan mode 修复 |
| [`cursor.md`](./cursor.md) | 7/17 Slack 集成：计划先行、多仓库环境、跨频道工作流 |
| [`codex.md`](./codex.md) | 0.144.5 第二日、alpha.22 预发布、5h 限额松绑、Grok Build 对标 |
| [`china-ai.md`](./china-ai.md) | Kimi K3 发布、DeepSeek 弃用倒计时、Grok Build、Trae 2.0 预告 |

## 检索记录脚注

- 国际官方：Claude Code Changelog + [GitHub v2.1.212](https://github.com/anthropics/claude-code/releases/tag/v2.1.212)、[Cursor Changelog 7/17](https://cursor.com/changelog)、Codex GitHub releases（0.144.5、0.145.0-alpha.19–22）、[Anthropic News](https://www.anthropic.com/news)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：2.1.212（GitHub release + npm + Changelog 顶栏）；Cursor Slack 更新（官方 Changelog 7/17）；Kimi K3（36氪 7/17 + Kimi 官方）；DeepSeek 弃用（官方 API Change Log + 社区迁移指南）
