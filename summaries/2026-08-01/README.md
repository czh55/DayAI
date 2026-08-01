# DayAI 每日资讯索引 — 2026-08-01

> 检索触发时间：2026-08-01T22:00:41Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 8/1 无新版本，npm `@latest` 仍为 **2.1.220**（维护冻结第 **8** 日）；**Opus 5** 进入发布第 **9** 日；Boris Cherny 访谈余温：Harness 应「删到模型能跑」而非堆提示词。 |
| **Cursor** | 8/1 无新 Changelog；**iPad 全付费开放 + Inbox/PR Review** 进入第 **4** 日；Cursor Start 印度计划第 **5** 日；The New Stack 称三工具正自发组成「编排—执行—审查」分层栈。 |
| **Codex** | 稳定版 **0.146.0** 维持 npm `@latest`（第 **4** 日）；GitHub 自 7/31 **0.147.0-alpha.4** 后 **8/1 无新 release**；`codex-plugin-cc` 官方插件持续推动与 Claude Code 叠用。 |
| **国内综述** | **DeepSeek V4-Flash 正式版 API 公测**进入第 **2** 日，海外社区跟进解读后训练跃升；其余 13 家厂商今日无公开更新。 |
| **行业宏观** | AI 编程工具从「单产品对决」转向「可组合栈」：Cursor 编排、Claude Code/Codex 执行、Codex 插件嵌入竞品；后训练 Agent 优化成跨厂商共识。 |
| **媒体透镜** | **共识**：Harness/后训练比堆参数更关键（Boris Cherny + DeepSeek Flash 双线印证）；**最大分歧**：36氪 Codex「反超代价惨重」叙事 vs 海外「叠用三工具」实用主义路线。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 23 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-08-01 22:00 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-08-01 22:00 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 12 日；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K3 权重开源第 6 日；API `kimi-k3` 无新版本；今日无公开更新 |
| DeepSeek | V4-Flash 正式版 API 公测第 **2** 日；社区持续解读 0731 后训练跃升；Pro 正式版仍「尽快发布」 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-08-01 22:00 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-08-01 22:00 UTC） |
| MiniMax | 今日无公开更新（检索 2026-08-01 22:00 UTC） |
| 商汤 | 今日无公开更新（检索 2026-08-01 22:00 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-08-01 22:00 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-08-01 22:00 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-08-01 22:00 UTC） |

## 媒体行业透镜一句话

- **共识**：Boris Cherny 与 DeepSeek 0731 共同指向——Agent 能力来自「删 Harness + 强后训练」，而非更长 system prompt；评测维度已从 SWE-Bench 转向 Terminal Bench / 端到端工程任务 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：36氪 7/29「Codex 反超但代价惨重」vs The New Stack「三工具叠成分层栈无人设计却正在发生」——前者强调资源换增长不可持续，后者强调开发者已自发组合 Cursor + Claude Code + Codex → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.146.0 | ✅ npm `@latest` 仍为 0.146.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.147.0-alpha.4 | ✅ GitHub 7/31 17:54 UTC 仍为最新；8/1 无新 tag |
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
| [`industry.md`](./industry.md) | 可组合 AI 编程栈、Boris Harness 哲学、DeepSeek 后训练延续、V4-Pro 8 月窗口 |
| [`china-media.md`](./china-media.md) | Boris 删 80% prompt、DeepSeek 社区跟进、Codex 反超 vs 叠用栈分歧 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek Flash 第 2 日观察、API 调用 SOP |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护观察 + Opus 5 第 9 日 + Harness 删减趋势 |
| [`cursor.md`](./cursor.md) | Cursor iPad 第 4 日 + 可组合栈中的编排层角色 |
| [`codex.md`](./codex.md) | Codex 0.146 stable 第 4 日 + alpha.4 观望 + codex-plugin-cc 叠用 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC，8/1 无更新）、[Cursor Changelog](https://cursor.com/changelog)（7/29 iPad 为最新，8/1 无新稿）、Codex GitHub Releases（0.147.0-alpha.4 / 7/31 17:54 UTC；stable 0.146.0 / 7/29；8/1 无新 release）、[Anthropic Opus 5](https://www.anthropic.com/news/claude-opus-5)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；8/1 ±24h 窗口以 Boris Cherny 访谈余温、DeepSeek Flash 社区跟进、可组合栈讨论为主
- 交叉验证：Flash 基准经海外社区（Digital Applied、BinaryVerse 等）7/31–8/1 跟进 + DeepSeek API 文档确认；Codex 无 8/1 release 经 GitHub API 确认；可组合栈叙事经 [The New Stack](https://thenewstack.io/ai-coding-tool-stack/) 确认
