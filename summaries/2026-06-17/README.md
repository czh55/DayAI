# DayAI 每日资讯索引 — 2026-06-17

> 检索触发时间：2026-06-17T22:02:23Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.179** 维持最新 npm 版；changelog 持续 patch（WSL2 滚轮、`Tool(param:value)` 权限语法、sandbox glob 性能）；Fable 5 停服第 6 天，Anthropic 今日宣布首尔办公室。 |
| **Cursor** | **3.7（6/17）** 重磅：云环境 10 分钟快照、`/in-cloud` 云子代理、`/babysit` PR 看护与本地/云端会话 handoff。 |
| **Codex** | CLI 稳定版 **0.140.0**；GitHub 于 6/17 连发 **0.141.0-alpha.4~6** 三条 alpha；`/usage`、`/import`、`thread/delete` 等 0.140 能力持续可用。 |
| **国内综述** | 智谱 **GLM-5.2** 编程榜全球第二（6/16 量子位）；DeepSeek Harness 招聘持续、官方编程 Agent 仍未发布；头部 IDE 厂商今日无新版本。 |
| **行业宏观** | AI 编程范式从 Prompt 转向 Loop/Harness/Agent Control Plane；GitHub 6/1 全面按量计费；Fable 5 出口管制余波与跨境 Harness 选型并存。 |
| **媒体透镜** | **共识**：开发者角色从写代码转向设计循环系统与验收标准；**最大分歧**：36氪/虎嗅强调 Loop 工程组织变革，量子位聚焦 GLM-5.2 与 ALE 基准模型军备竞赛。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-17 22:02 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | 6/14–16 日 GLM-5.2 + ZCode 3.0.0 仍为最新公开能力，今日无新版本 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续，官方编程 Agent 仍未发布；DeepSeek-TUI 社区项目持续迭代 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 与 Harness Engineering 构成 2026 年 Coding Agent 核心范式，开发者应从「写提示词」转向「设计 Plan-Execute-Verify 循环系统」。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：商业媒体（36氪/虎嗅）将 Loop/RTS 解读为组织角色与 Agent Control Plane 重构；垂直 AI 媒体（量子位）更关注 GLM-5.2 开源登顶与 ALE 基准对 Fable 5 的性价比质疑。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.179 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.140.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 1 warn · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测 `/import` 与推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/17 Changelog 为准 |
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
| [`industry.md`](./industry.md) | Cursor 云 Agent 3.7、Loop 范式、GitHub 按量计费、Fable 5 停服余波 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.179 稳定性修复、权限语法、Fable 5 回退策略 |
| [`cursor.md`](./cursor.md) | 6/17 云环境快照、`/in-cloud`、`/babysit`、本地/云 handoff |
| [`codex.md`](./codex.md) | 0.140.0 稳定版、0.141 alpha 线、features 与 `/import` |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、GLM-5.2、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic Changelog & News（首尔办公室 6/17）、Cursor Changelog（3.7 @ 6/17）、OpenAI Codex Changelog、GitHub Releases（0.141.0-alpha.6 @ 2026-06-17T19:52Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 15–17 日内容
- 交叉验证：Cursor 6/17 云 Agent 更新与 [Cursor Docs Cloud Agents](https://cursor.com/docs/cloud-agent/capabilities) 一致；GLM-5.2 编程榜报道与智谱 6/14 ZCode 3.0.0 发布交叉印证
