# DayAI 每日资讯索引 — 2026-07-22

> 检索触发时间：2026-07-22T22:01:02Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 今日发布 **2.1.218**（21:24 UTC）；`/code-review` 改为后台子智能体运行，`context: fork` 技能默认后台执行，auto 模式权限判定与 `/ultrareview` 多项修复。 |
| **Cursor** | **7/22 发布 Cursor Router**：Auto 模式新增 Intelligence / Balance / Cost 三档优化，按任务复杂度路由模型，Teams 默认开启，宣称可降本 30–60%。 |
| **Codex** | 稳定版仍为 **0.145.0**；今日 GitHub 连发 **0.146.0-alpha.3**（21:51 UTC）等 alpha 预发布，npm `@latest` 尚未跟随。 |
| **国内综述** | **DeepSeek 旧 API 名弃用倒计时 2 天**（7/24）；**Kimi K3 权重开源倒计时 5 天**（7/27）；TRAE SOLO 发布次日持续发酵。 |
| **行业宏观** | Anthropic 同日三连：AMD **2GW MI450** 战略合作、**Record a Skill** 录屏学技能、Economic Index Connector；AI 编程竞争从模型能力转向路由与 Harness 成本优化。 |
| **媒体透镜** | **共识**：Agent Control Plane 与智能路由成为 2026 下半年主叙事，Cursor Router 与 Codex `/import` 共同降低多模型切换成本；**最大分歧**：路由降本是否以不可预测的质量波动为代价，Pro 用户能否真正受益。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 13 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-22 22:01 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 2 日；社区反馈 Kimi K3 需 Anthropic 接口 `https://api.kimi.com/coding/` |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3** 发布第 6 日；完整权重 **7/27** 开源倒计时 **5 天** |
| DeepSeek | V4 GA 运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **2 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-22 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-22 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-22 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-22 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-22 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-22 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-22 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：AI 编程正从 Prompt/Skill/Loop 演进到 Agent Control Plane，智能路由（Cursor Router）与任务中心（TRAE SOLO、Codex Work）成为产品差异化核心 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：路由降本宣称的 30–60% 节省是否在复杂存量代码库场景成立，还是仅适合日常补全与 greenfield 任务 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.218 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.145.0 | ✅ npm `@latest` 仍为 0.145.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.146.0-alpha.3 | ✅ GitHub 7/22 21:51 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/22 Cursor Router Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.218 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.145.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Cursor Router 发布、AMD-Anthropic 2GW 合作、Record a Skill、DeepSeek 弃用倒计时 2 天 |
| [`china-media.md`](./china-media.md) | 虎嗅 Agent Control Plane、Cursor Router 降本、Claude Code 负责人访谈、Codex 900 万用户 |
| [`claude-code.md`](./claude-code.md) | 2.1.218 `/code-review` 后台子智能体、auto 模式、fork 技能、MCP 诊断 |
| [`cursor.md`](./cursor.md) | 7/22 Cursor Router 三档优化、Admin 控制、Grok 4.5 路由 |
| [`codex.md`](./codex.md) | 0.146.0-alpha 系列、0.145.0 stable 回顾、`/import`、多智能体 V2 |
| [`china-ai.md`](./china-ai.md) | DeepSeek 弃用倒计时 2 天、Kimi K3 第 6 日、TRAE SOLO 次日 |

## 检索记录脚注

- 国际官方：Claude Code Changelog + [GitHub v2.1.218](https://github.com/anthropics/claude-code/releases/tag/v2.1.218)（7/22 21:24 UTC）、[Cursor Changelog](https://cursor.com/changelog)（7/22 Cursor Router）、[Cursor Router Blog](https://cursor.com/blog/router)、Codex GitHub [0.146.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.3)（7/22 21:51 UTC）、[Anthropic News](https://www.anthropic.com/news)（Economic Index Connector 7/22）、[AMD Partnership](https://ir.amd.com/news-events/press-releases/detail/1292/amd-and-anthropic-announce-strategic-partnership-to-deploy-up-to-2-gigawatts-of-amd-instinct-mi450-series-gpus)（7/22）
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn、TRAE 社区（触发日 ±24h）
- 交叉验证：Cursor Router（官方 Changelog + Blog + Forum 7/22）；Claude 2.1.218（GitHub release + npm 本地实测）；Record a Skill（Anthropic 官方 + Android Authority 7/21–22）；DeepSeek 弃用（官方 API 文档 + 36氪）
