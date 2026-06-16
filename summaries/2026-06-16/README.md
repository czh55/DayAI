# DayAI 每日资讯索引 — 2026-06-16

> 检索触发时间：2026-06-16T22:00:27Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.179** patch：WSL2 滚轮回归修复、流式断连保留 partial 响应、`Tool(param:value)` 权限语法与 sandbox glob 性能修复；Fable 5 仍全球不可用。 |
| **Cursor** | Changelog 无 6 月 16 日新条目；6 月 10 日 Bugbot（Composer 2.5，~90 秒/次）与 `/review` 预推送审查仍为最新官方能力。 |
| **Codex** | **App 侧**：6/16 官方宣布 EEA/UK/瑞士上线 Computer Use、Chrome 扩展、Memories 与 Chronicle；CLI 稳定版仍为 **0.140.0**，alpha **0.141.0-alpha.3** 于 6/16 迭代。 |
| **国内综述** | DeepSeek Harness 团队招聘持续、官方编程 Agent 仍未发布；头部厂商今日无重大版本发布，Fable 5 停服第 5 天推动跨境 Harness 备选评估。 |
| **行业宏观** | OpenAI 向欧洲扩展 Codex 桌面 Agent 能力；微软 6/30 起内部禁用 Claude Code（InfoQ）；Fable 5 停服余波与 Codex `/import` 迁移窗口并存。 |
| **媒体透镜** | **共识**：AI 编程竞争焦点从模型参数转向 Harness/Loop 长程编排；**最大分歧**：36氪强调「监工角色」组织变革，量子位聚焦 Fable 5 评测与 GPT-5.6 内测传闻。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-16 22:00 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续，官方编程 Agent 仍未发布；DeepSeek-TUI 社区项目持续迭代 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |
| 小米 MiMo Code | 6 月 11 日 MIT 开源终端 Agent，非今日新发布 |

## 媒体行业透镜一句话

- **共识**：Context Engineering、Subagents 与 Harness 构成 2026 年 Coding Agent 三大支柱，开发者应从「写提示词」转向「设计循环系统」。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：商业媒体（36氪）将 Loop 工程解读为组织角色重构；垂直 AI 媒体（量子位）更关注模型军备竞赛与出口管制对编程 Agent 选型的直接冲击。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.179 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.140.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 1 warn · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测 `/import` 与推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/10 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.179 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.140.0
./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Codex 欧洲扩展、Fable 5 停服第 5 天、微软内部 Claude Code 禁令 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.179 稳定性修复、权限语法、Fable 5 回退策略 |
| [`cursor.md`](./cursor.md) | Bugbot 提速、`/review`、Composer 2.5 与 Cloud Agent |
| [`codex.md`](./codex.md) | EEA/UK/CH Computer Use 扩展、0.140.0 `/import`、alpha 0.141 线 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek Harness、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic Changelog、Cursor Changelog、OpenAI Codex Changelog（6/16 EEA 扩展）、GitHub Releases（0.141.0-alpha.3 @ 2026-06-16T06:07Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 14–16 日内容
- 交叉验证：Digg/OpenAI 社区对 Codex 欧洲 Computer Use 扩展的英文 secondary 报道；InfoQ 微软内部 Claude Code 禁令与 Fortune Fable 5 停服报道
