# DayAI 每日资讯索引 — 2026-07-15

> 检索触发时间：2026-07-15T22:01:35Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.210**（7/14 发布）第三日无新版本；**Fable 5 在 advisor picker 临时标为不可用**（服务端修复中），含 screen reader 模式与 23 项后台 Agent 修复。 |
| **Cursor** | **3.11（7/10）** 仍为最新 Changelog；内测通用智能体 **Sand** 进入第 3 周观察，SpaceX **$600 亿收购** Q3 交割变量持续。 |
| **Codex** | 稳定版 **0.144.4** 第四日无变更；**0.145.0-alpha.14** 今日 22:01 UTC 连发第 3 个 alpha；**5 小时滚动限额临时移除**仍生效。 |
| **国内综述** | **阿里 Claude 禁令第 6 日**持续；**DeepSeek `deepseek-chat`/`reasoner` 弃用倒计时 9 天**（7/24 23:59 北京时间）。 |
| **行业宏观** | **Loop Engineering** 范式获 Claude Code 之父与 OpenClaw 创始人同日背书；大厂前后端合并潮与 Agent 异步化并行。 |
| **媒体透镜** | **共识**：AI 编程从 Prompt 走向 Loop/Control Plane，开发者角色转向「循环设计者」；**最大分歧**：Cursor Sand 能否在 SpaceX 收购前独立推向市场。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 6 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| 腾讯混元/CodeBuddy | **CodeBuddy Code v2.103.0** 仍为最近更新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K2.7 Code 7/7 进入 Copilot Business/Enterprise；Kimi 产品今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **9 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-15 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-15 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 取代 Prompt Engineering 成为 2026 下半年 AI 编程核心叙事，开发者从「写提示词」转向「设计循环系统」 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Cursor Sand 是独立产品战略还是 SpaceX 收购前的过渡实验 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.210 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.4 | ✅ `@latest` 仍为 0.144.4；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.145.0-alpha.14 | ✅ GitHub 今日 22:01 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 3.11 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.210 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.4
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 延期第 2 日、Codex alpha 连发、Loop Engineering 范式、大厂组织变革 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.210 维护观察、Fable advisor 临时下线、screen reader 模式 |
| [`cursor.md`](./cursor.md) | 3.11 第 6 日观察、Sand 内测、SpaceX 收购变量 |
| [`codex.md`](./codex.md) | 0.144.4 稳定版、alpha.14 预发布、5h 限额松绑延续 |
| [`china-ai.md`](./china-ai.md) | 阿里禁令第 6 日、DeepSeek 弃用倒计时、全厂商轮询 |

## 检索记录脚注

- 国际官方：Claude Code Changelog、Anthropic News（Claude for Teachers 7/14、$10M 加拿大研究 7/14）、Cursor Changelog、Codex GitHub releases（0.145.0-alpha.12/13/14）、Tibo @thsottiaux X 帖（7/12）
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：Fable 5 延期（Anthropic 支持页 + BleepingComputer 7/14）；Codex 5h 限额（Tibo X + BleepingComputer 7/12）；Cursor Sand（The Information 7/9 + TechTimes 7/13）
