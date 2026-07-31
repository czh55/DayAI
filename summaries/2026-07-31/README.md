# DayAI 每日资讯索引 — 2026-07-31

> 检索触发时间：2026-07-31T22:00:55Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 7/31 无新版本，npm `@latest` 仍为 **2.1.220**；**Opus 5** 进入发布第 **8** 日；Changelog 首条仍为 7/25 bug fixes。 |
| **Cursor** | 7/31 无新 Changelog；**iPad 全付费开放 + Inbox/PR Review** 进入第 **3** 日；Cursor Start 印度计划第 **4** 日。 |
| **Codex** | 稳定版 **0.146.0** 维持 npm `@latest`；GitHub 今日三连发 **0.147.0-alpha.4**（17:54 UTC）、**alpha.3**（15:36）、**alpha.1.1**（09:48），0.147 周期加速迭代。 |
| **国内综述** | **DeepSeek-V4-Flash 正式版 API 公测上线**（7/31），Agent 基准全面超越 V4-Pro-Preview；原生支持 Responses API 并适配 Codex；其余 13 家厂商今日无公开更新。 |
| **行业宏观** | 后训练 Agent 能力成新焦点：DeepSeek 以同架构 Flash 反超 Pro-Preview；企业级 AI Coding 市场年化 **98–110 亿美元**（Gartner/36氪 7/30）；Codex 周活破 **1000 万**（36氪 7/29）。 |
| **媒体透镜** | **共识**：AI 编程从「写代码」转向「完成工程任务」，后训练优化比堆参数更关键；**最大分歧**：36氪称 Codex「反超 Claude Code 但代价惨重」vs Anthropic 强调 Opus 5 日常性价比路线。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 22 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-07-31 22:00 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-31 22:00 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 11 日；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K3 权重开源第 5 日；API `kimi-k3` 无新版本；今日无公开更新 |
| DeepSeek | **V4-Flash 正式版 API 公测上线**（7/31）；Terminal Bench 2.1 **82.7**；原生 Responses API + Codex 适配；Pro 正式版将尽快发布 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-31 22:00 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-31 22:00 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-31 22:00 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-31 22:00 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-31 22:00 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-31 22:00 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-31 22:00 UTC） |

## 媒体行业透镜一句话

- **共识**：DeepSeek V4-Flash 以同架构后训练反超 Pro-Preview，印证 Agent 评测从「写函数」转向「端到端工程任务」；后训练时代竞争焦点已从规模转向 Agent 深度优化 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：36氪 7/29 称 OpenAI 以砍 Sora/Atlas、百倍算力换 Codex 反超 vs InfoQ 7/30 Uncle Bob「绝不读 AI 代码」vs Hashimoto「逐行阅读」治理哲学对立 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.146.0 | ✅ npm `@latest` 仍为 0.146.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.147.0-alpha.4 | ✅ GitHub 7/31 17:54 UTC 最新；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/29 iPad Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.220 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.146.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 行业宏观：DeepSeek Agent 跃升、百亿市场、Codex 千万周活、Agent Substrate |
| [`china-media.md`](./china-media.md) | 国内媒体透镜：Flash 后训练叙事、Codex 反超代价、读码治理争论 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek V4-Flash 详解、API 调用 SOP |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护观察 + Opus 5 第 8 日详解 |
| [`cursor.md`](./cursor.md) | Cursor iPad 第 3 日观察 + 移动 Agent 工作流延续 |
| [`codex.md`](./codex.md) | Codex 0.147.0-alpha.4 三连发与 0.147 周期加速迭代 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC，7/31 无更新）、[Cursor Changelog](https://cursor.com/changelog)（7/29 iPad 为最新，7/31 无新稿）、Codex GitHub Releases（0.147.0-alpha.4 / 7/31 17:54 UTC；stable 0.146.0 / 7/29）、[Anthropic Opus 5](https://www.anthropic.com/news/claude-opus-5)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；7/31 ±24h 窗口以 DeepSeek V4-Flash、Codex 反超、百亿市场、读码治理争论为主
- 交叉验证：V4-Flash 基准成绩经 36氪/CSDN 转述 + DeepSeek 官方 API 文档确认；Codex alpha.4 经 GitHub Releases 确认；百亿市场经 36氪 7/30 引用 Gartner 确认
