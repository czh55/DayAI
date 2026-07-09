# DayAI 每日资讯索引 — 2026-07-09

> 检索触发时间：2026-07-09T22:02:15Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.205** 当日无新版本；**阿里 7/10 禁用 Claude 全系倒计时 1 天**；Fable 5 周额度延至 **7/12**。 |
| **Cursor** | **7/9 仍无新 Changelog**（6/30 Team MCP 最新，连续第 9 日空窗）；Automations cron 连续第 9 日触发。 |
| **Codex** | 稳定版 **0.144.0** 晋升 `@latest`（7/9 16:47Z）；**并入 ChatGPT 桌面端**；`auth_elicitation` / `code_mode_host` 转 stable。 |
| **国内综述** | **阿里明日生效 Claude 禁令**；工信部 7/8 定调余波持续；腾讯 Hy3 正式版仍为近期最大国产 Agent 更新。 |
| **行业宏观** | **Codex 与 ChatGPT 桌面端合并**重塑「编排层」竞争；OpenAI 与 Anthropic 双线 Agent 产品化加速。 |
| **媒体透镜** | **共识**：Agent Control Plane 与 durable agent 是生产落地关键；**最大分歧**：国内禁令是否阻断 API 通道 vs 开发者灰色中转仍可用。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | **7/10 起内部禁用 Claude 全系**（含 Claude Code），推荐 Qoder；通义/Qwen 产品本身今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-09 22:02 UTC） |
| 腾讯混元/CodeBuddy | Hy3 正式版（7/6）仍最新；元宝 Agent 能力免费开放；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无新版本 |
| 月之暗面 Kimi | K2.7 Code 7/7 进入 Copilot Business/Enterprise；Kimi 产品本身今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 15 天 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：2026 年是「Agent 工程」分水岭，Harness 与验证闭环比模型参数更重要 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：工信部/阿里禁令是否预示全面国产替代 vs API 中转仍可用；Fable 5 安全降级导致体验与账单争议 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.205 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.0 | ✅ `@latest` 已晋升稳定版；`doctor` / `features list` 正常 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/30 Team MCP Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.205 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Codex 并入 ChatGPT 桌面端、0.144.0 GA、阿里禁令倒计时、Agent 工程分水岭 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.205 维护态、Fable 5 延至 7/12、阿里/工信部合规余波 |
| [`cursor.md`](./cursor.md) | 6/30 Team MCP 余波、连续 9 日 Changelog 空窗 |
| [`codex.md`](./codex.md) | 0.144.0 稳定版 GA、ChatGPT 桌面端合并、writes 审批模式 |
| [`china-ai.md`](./china-ai.md) | 阿里明日禁令、工信部定调、国内厂商轮询 |

## 检索记录脚注

- 国际官方：Anthropic [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（**2.1.205 无 7/9 新版本**）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 后无更新**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**0.144.0 stable @ 7/9 16:47Z**）、[Codex Changelog](https://developers.openai.com/codex/changelog)（**Codex joins ChatGPT desktop app @ 7/9**）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 7/7–7/9 内容
- 交叉验证：Claude Code npm `@latest` **2.1.205** 与 7/8 一致；Codex stable npm **0.144.0** 与 GitHub Latest 一致；阿里 7/10 禁令经 36氪 7/3 + 7/8 工信部报道双源交叉验证
