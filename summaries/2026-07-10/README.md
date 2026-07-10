# DayAI 每日资讯索引 — 2026-07-10

> 检索触发时间：2026-07-10T22:02:12Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.206** 小版本发布（7/9 23:33Z）；强化 `/doctor`、`/cd` 建议、`/commit-push-pr` 推送远程；**阿里 Claude 禁令今日正式生效**。 |
| **Cursor** | **3.11（7/10）** 发布：**Side Chats**（`/side`/`/btw`）、**对话全文搜索**、重设计项目/仓库选择器、**Cloud Agent 对话级 Hooks**（`beforeSubmitPrompt` 等）。 |
| **Codex** | 稳定版 **0.144.1**（7/9 23:02Z）修复安装器与 `code_mode_host` 可靠性；ChatGPT 桌面端合并余波持续。 |
| **国内综述** | **阿里 7/10 起内部全面禁用 Claude 全系**（含 Claude Code），推荐 **Qoder**；工信部 7/8 定调余波进入企业实操日。 |
| **行业宏观** | Cursor 3.11 将「主 Agent + 旁路探索」产品化；Loop/Harness 工程成为 Agent 落地共识框架。 |
| **媒体透镜** | **共识**：2026 是 Long-Horizon Agent 与 Loop 工程元年，验证闭环比单次生成更重要；**最大分歧**：大厂禁令是否扩散至 API/个人设备 vs 开发者仍可通过中转继续用 Claude。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | **7/10 禁令正式生效**：办公环境禁用 Claude 全系，推荐 Qoder；通义/Qwen 产品本身今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-10 22:02 UTC） |
| 腾讯混元/CodeBuddy | Hy3 正式版（7/6）仍最新；元宝 Agent 能力免费开放；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；量子位称性能接近 Sonnet 5；今日无新版本 |
| 月之暗面 Kimi | K2.7 Code 7/7 进入 Copilot Business/Enterprise；Kimi 产品本身今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 14 天 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Agent 竞争从「对话框」转向「可验证的长程循环」（Loop/Harness），Side Chat 类产品形态印证「主任务 + 旁路探索」工作流 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：阿里禁令是孤立风控还是大厂连锁反应；Sonnet 5「低价」是否真省钱 vs Token 膨胀导致实际账单更高 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.206 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.1 | ✅ `@latest` 已晋升；`doctor` / `features list` 正常 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 3.11 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.206 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.1
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Cursor 3.11 Side Chats、阿里禁令生效、Loop 工程行业趋势 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.206 维护更新、阿里禁令生效日、Fable 5 延至 7/12 |
| [`cursor.md`](./cursor.md) | 3.11 Side Chats、对话搜索、Cloud Agent Hooks、Picker 重设计 |
| [`codex.md`](./codex.md) | 0.144.1 安装器修复、ChatGPT 桌面端合并、code_mode_host |
| [`china-ai.md`](./china-ai.md) | 阿里禁令实操、国内厂商轮询、DeepSeek SOP |

## 检索记录脚注

- 国际官方：Anthropic [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（**2.1.206 @ 7/9 23:33Z**）、Cursor [Changelog](https://cursor.com/changelog)（**3.11 @ 7/10**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**0.144.1 @ 7/9 23:02Z**）、[Codex Changelog](https://developers.openai.com/codex/changelog)
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`、`site:yicai.com`，优先 7/8–7/10 内容
- 交叉验证：Claude Code npm `@latest` **2.1.206** 与 changelog 顶栏一致；Codex stable npm **0.144.1** 与 GitHub Latest 一致；阿里 7/10 禁令经 36氪 + 第一财经 + 凤凰网三源交叉验证
