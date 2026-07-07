# DayAI 每日资讯索引 — 2026-07-07

> 检索触发时间：2026-07-07T22:02:52Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.203** 晋升 `@latest`（7/7 17:40Z）；**Fable 5 周额度今日截止**，明日（7/8）起须 **usage credits**（$10/$50 per Mtok）。 |
| **Cursor** | **7/7 仍无新 Changelog**（6/30 Team MCP 最新，连续第 7 日空窗）；Automations cron 第 7 日连续触发。 |
| **Codex** | 预发布线更新至 **0.143.0-alpha.38**（7/7 04:34Z，新增 `code_mode_host`）；稳定版 **0.142.5** 不变。 |
| **国内综述** | **阿里 7/10 起全员禁用 Claude**；Anthropic 7/3 起全面封堵中国访问通道；DeepSeek 旧模型名 **7/24 停用**倒计时 17 天。 |
| **行业宏观** | **Fable 5 周额度今日切换**；Boris Cherny 称 Claude Code「才完成 1%」；Spotify 73% AI PR 持续发酵。 |
| **媒体透镜** | **共识**：验证鸿沟与 Loop 工程成主叙事；**最大分歧**：阿里禁 Claude vs API 通道是否仍可用，以及 Sonnet 5 真实成本争议。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | **7/10 起内部禁用 Claude 全系**（含 Claude Code），推荐 Qoder 替代；通义/Qwen 产品本身今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-07 22:02 UTC） |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 豆包专业版定价仍最新；今日无新产品 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无新版本 |
| 月之暗面 Kimi | Kimi K2.7 仍最新；今日无公开更新 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 23:59 弃用**；正式版 7 月中旬预告仍有效 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：验证鸿沟取代编码速度成为主瓶颈；Loop Engineering 从社区热词进入大厂落地讨论 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：阿里禁 Claude 是否预示国产替代加速 vs 开发者仍可通过 API 中转；Sonnet 5 性价比实测分化 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.203 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.142.5 | ✅ `@latest` 指向稳定版；`doctor` / `features list` 正常 |
| Codex CLI (alpha) | 0.143.0-alpha.38 | ✅ 可安装运行；`features list` 含 `code_mode_host`（under development） |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/30 Team MCP Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.203 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.143.0-alpha.38（本地安装 alpha）
npm install @openai/codex@latest       # 回退至 0.142.5 stable
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 今日切换、Boris 1% 论、阿里禁 Claude、Anthropic 地缘封堵 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.203 新 patch、Fable 5 额度截止、Remote Control / workflow 修复 |
| [`cursor.md`](./cursor.md) | 6/30 Team MCP 余波、Automations cron 连续触发 |
| [`codex.md`](./codex.md) | alpha.38 新发布、`code_mode_host`、0.142.5 稳定版 |
| [`china-ai.md`](./china-ai.md) | 阿里禁 Claude、国内厂商轮询、DeepSeek API 迁移 SOP |

## 检索记录脚注

- 国际官方：Anthropic [Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)（7/7 周额度截止）、[The Making of Claude Code](https://www.anthropic.com/news)（7/6 Features）、[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（**2.1.203 @ 7/7 17:40Z**）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 后无更新**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**alpha.38 @ 7/7 04:34Z**）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 7/5–7/7 内容
- 交叉验证：Claude Code npm `@latest` **2.1.203**；Codex stable npm 0.142.5 与 GitHub Latest 一致；alpha.38 GitHub 与 npm 版本号吻合；阿里禁 Claude 经 36氪 + 社区逆向分析交叉验证
