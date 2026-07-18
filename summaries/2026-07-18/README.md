# DayAI 每日资讯索引 — 2026-07-18

> 检索触发时间：2026-07-18T22:01:33Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.214**（7/18 01:20 UTC）安全加固版：权限分析器全面 fail-closed、新增 **EndConversation** 工具、长工具调用进度心跳与 OTel 消息级关联；v2.1.213 跳过。 |
| **Cursor** | **7/18 无新 Changelog**；7/17 Slack 集成（计划先行、多仓库环境、跨频道工作流）仍为最近更新，桌面端 3.11 无变动。 |
| **Codex** | 稳定版 **0.144.6** 今日 13:51 UTC 发布，刷新 GPT-5.6 Sol/Terra/Luna 内置指令并修正上下文窗口为 **272K**；npm `@latest` 已跟随。 |
| **国内综述** | **Kimi K3** 发布次日持续发酵；**DeepSeek 旧 API 名弃用倒计时 6 天**；**Trae 2.0** 预告 7/21 发布 SOLO 模式。 |
| **行业宏观** | **Fable 5 免费窗口明日（7/19）截止**；Codex 周活突破 900 万、5h 限额仍临时移除；Claude 2.1.214 权限安全补丁引发社区审计讨论。 |
| **媒体透镜** | **共识**：AI 编程竞争从模型能力转向 Loop/Harness 系统工程与额度博弈；**最大分歧**：Kimi K3 前端 Arena 第一是否代表国产模型已在编程全栈追平闭源旗舰。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 9 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-18 22:01 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | **Trae 2.0** 官宣 7/21 发布 SOLO 模式；Trae-Agent 7/4 已开源 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3** 发布次日；Arena 前端榜第一；7/27 全面开源 |
| DeepSeek | V4 预览运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **6 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-18 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-18 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-18 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-18 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-18 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-18 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-18 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 成为 Claude Code / Codex / Cursor 共同叙事，头部厂商以额度松绑争夺同一批重度开发者 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Kimi K3 前端能力登顶 Arena 是否意味着国产模型已在编程全栈追平 Fable 5 / GPT-5.6 Sol → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.214 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.6 | ✅ `@latest` 已更新至 0.144.6；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.145.0-alpha.23 | ✅ GitHub 7/17 22:39 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/17 Slack Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.214 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.6
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Claude Code 2.1.214 安全补丁、Codex 0.144.6、Fable 5 窗口明日截止、Kimi K3 次日、DeepSeek 弃用倒计时 |
| [`china-media.md`](./china-media.md) | 36氪 Loop 工程、量子位额度博弈、虎嗅 Codex 900 万用户、Kimi K3 实测分歧 |
| [`claude-code.md`](./claude-code.md) | 2.1.214 权限 fail-closed、EndConversation、OTel 关联、background daemon 修复 |
| [`cursor.md`](./cursor.md) | 7/18 无新更新；7/17 Slack 集成回顾与操作 SOP |
| [`codex.md`](./codex.md) | 0.144.6 GPT-5.6 指令刷新、272K 上下文修正、alpha.23 预发布 |
| [`china-ai.md`](./china-ai.md) | Kimi K3 次日、DeepSeek 弃用倒计时 6 天、Trae 2.0 预告 |

## 检索记录脚注

- 国际官方：Claude Code Changelog + [GitHub v2.1.214](https://github.com/anthropics/claude-code/releases/tag/v2.1.214)、[Cursor Changelog](https://cursor.com/changelog)（7/18 无新条目）、Codex GitHub releases（0.144.6、0.145.0-alpha.23）、[Anthropic News](https://www.anthropic.com/news)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：2.1.214（GitHub release + npm + Changelog 顶栏）；0.144.6（GitHub release + npm @latest）；Kimi K3（36氪/北京商报 7/17 + Kimi 官方）；DeepSeek 弃用（官方 API 文档 + 社区迁移指南）
