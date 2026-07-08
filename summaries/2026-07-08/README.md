# DayAI 每日资讯索引 — 2026-07-08

> 检索触发时间：2026-07-08T22:01:04Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.205** 当日连发两版（2.1.204/205）；`/doctor` 升级为全量体检；**Fable 5 周额度延至 7/12**（社区反弹后官方延期）。 |
| **Cursor** | **7/8 仍无新 Changelog**（6/30 Team MCP 最新，连续第 8 日空窗）；本 Automation cron 第 8 日连续触发。 |
| **Codex** | 稳定版 **0.143.0** 晋升 `@latest`（7/8 01:31Z）；远程插件默认启用、系统代理、MCP tool search；alpha 线同日推至 **0.144.0-alpha.2**。 |
| **国内综述** | **工信部 7/8 定调 Claude Code 后门风险**；阿里 **7/10 禁 Claude** 倒计时 2 天；腾讯 **Hy3** 正式版 7/6 上线。 |
| **行业宏观** | **GitHub Copilot 桌面 App 全计划开放**（7/7）；Fable 5 计费争议引发官方延期；Spotify Honk 验证架构持续发酵。 |
| **媒体透镜** | **共识**：验证闭环与 Agent Control Plane 成落地主叙事；**最大分歧**：工信部/阿里禁令 vs API 通道是否仍可用，及 Sonnet 5 真实成本争议。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | **7/10 起内部禁用 Claude 全系**（含 Claude Code），推荐 Qoder；通义/Qwen 产品本身今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-08 22:01 UTC） |
| 腾讯混元/CodeBuddy | **Hy3 正式版 7/6 发布**，元宝同步上线 Agent 能力、免费开放 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无新版本 |
| 月之暗面 Kimi | **Kimi K2.7 Code 7/7 进入 Copilot Business/Enterprise**；Kimi 产品本身今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 16 天 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：验证鸿沟与 Agent Control Plane 取代「提示词工程」成为主叙事；durable agent 是生产落地关键 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：工信部/阿里禁令是否预示国产替代加速 vs 开发者仍可通过 API 中转；Sonnet 5 分词器换代引发的真实成本争议 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.205 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.143.0 | ✅ `@latest` 已晋升稳定版；`doctor` / `features list` 正常 |
| Codex CLI (alpha) | 0.144.0-alpha.2 | ✅ 可安装运行；`code_mode_host` 仍为 under development |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/30 Team MCP Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.205 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.143.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 延期、Codex 0.143.0 GA、GitHub Copilot App、工信部 Claude Code 警告 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.205 新 patch、`/doctor` 体检、Fable 5 延至 7/12 |
| [`cursor.md`](./cursor.md) | 6/30 Team MCP 余波、Automations cron 连续触发 |
| [`codex.md`](./codex.md) | 0.143.0 稳定版 GA、远程插件、系统代理、alpha.2 |
| [`china-ai.md`](./china-ai.md) | 工信部/阿里禁令、Hy3 正式版、国内厂商轮询 |

## 检索记录脚注

- 国际官方：Anthropic [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)（**2.1.205 @ 7/8**）、[Fable 5 延期报道](https://www.androidauthority.com/claude-fable-5-free-extension-3685103/)（延至 **7/12**）、Cursor [Changelog](https://cursor.com/changelog)（**6/30 后无更新**）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（**0.143.0 stable @ 7/8 01:31Z**）、[GitHub Copilot App](https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/)（7/7）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:huxiu.com`、`site:infoq.cn`，优先 7/6–7/8 内容
- 交叉验证：Claude Code npm `@latest` **2.1.205**；Codex stable npm **0.143.0** 与 GitHub Latest 一致；工信部 NVDB 公告与 36氪 7/8 报道交叉验证；Fable 5 延期经 Android Authority + ABP Live 双源确认
