# DayAI 每日资讯索引 — 2026-06-15

> 检索触发时间：2026-06-15T22:00:27Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 2.1.178 发布：子 Agent 可嵌套 5 层、`enforceAvailableModels` 托管策略、Fable 5 停服后 auto mode 自动回退 Opus；Fable 5 仍全球不可用。 |
| **Cursor** | Changelog 无 6 月 15 日新条目；6 月 10 日 Bugbot 提速（Composer 2.5 驱动，约 90 秒/次）与 `/review` 预推送审查仍为最新官方能力。 |
| **Codex** | **0.140.0 稳定版**于 6 月 15 日 21:06 UTC 发布：新增 `/import` 从 Claude Code 迁移、`/usage` 用量视图、永久会话删除与 Bedrock API Key 托管认证。 |
| **国内综述** | 小米 MiMo Code（6/11 开源）与 DeepSeek Harness 团队招聘持续发酵；头部厂商今日无重大版本发布，开发者应关注 Fable 5 停服后的跨境模型备选。 |
| **行业宏观** | Fable 5 全球停服进入第 4 天，Codex 0.140.0 以 `/import` 承接 Claude Code 用户迁移；Loop/Harness 工程范式成为 InfoQ、36氪跨源共识。 |
| **媒体透镜** | **共识**：AI 编程竞争焦点从模型参数转向 Harness/Loop 长程编排；**最大分歧**：36氪强调「监工角色」组织变革，量子位聚焦 ALE 基准与 Fable 5 停服冲击。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-15 22:00 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续（5 月中下旬启动），官方编程 Agent 仍未发布；DeepSeek-TUI 社区项目持续迭代 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |
| 小米 MiMo Code | 6 月 11 日 MIT 开源终端 Agent（基于 OpenCode），MiMo Auto 限时免费；非今日新发布 |

## 媒体行业透镜一句话

- **共识**：Context Engineering、Subagents 与 Harness 构成 2026 年 Coding Agent 三大支柱，开发者应从「写提示词」转向「设计循环系统」。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：商业媒体（36氪）将 Loop 工程解读为组织角色重构；垂直 AI 媒体（量子位）更关注模型军备竞赛与出口管制对编程 Agent 选型的直接冲击。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.178 | ✅ `--version` / `--help` 正常（221 行）；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.140.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测 `/import` 与推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/10 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.178 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.140.0
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Codex 0.140.0 稳定发布、Fable 5 停服余波、Loop 工程范式 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.178 变更、嵌套 Subagent、Fable 5 回退策略 |
| [`cursor.md`](./cursor.md) | Bugbot 提速、`/review`、Composer 2.5 与 Cloud Agent |
| [`codex.md`](./codex.md) | 0.140.0 `/import`、`/usage`、会话删除、Bedrock 认证 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、MiMo Code、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic News/Changelog、Cursor Changelog、OpenAI Codex Changelog/GitHub Releases（0.140.0 @ 2026-06-15T21:06Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 13–15 日内容
- 交叉验证：Fortune/The New Stack 对 Fable 5 停服与 Codex 0.140.0 发布的英文社区报道
