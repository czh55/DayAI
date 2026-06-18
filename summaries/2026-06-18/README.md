# DayAI 每日资讯索引 — 2026-06-18

> 检索触发时间：2026-06-18T22:02:47Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.181** patch：新增 `/config key=value` 即时改设置、Bun 1.4 运行时、流式/Subagent 面板与 WSL2 滚轮修复；Fable 5 免费窗口 6/22 截止。 |
| **Cursor** | **6/18 Changelog**：Automations 引入 `/automate` skill、Slack emoji 触发、5 项 GitHub 新 trigger 与默认 Computer Use；6/17 云环境快照与 `/in-cloud` 子 Agent。 |
| **Codex** | CLI 稳定版升至 **0.141.0**（6/18）；App **26.616** 新增 Record & Replay（macOS，EEA 除外）与自动化运行历史批量操作。 |
| **国内综述** | 智谱 **GLM-5.2** 6/17 MIT 全量开源，Code Arena 开源第一；DeepSeek Harness 招聘持续，官方 Code Agent 仍未发布。 |
| **行业宏观** | AI 编程工具 **CVE-2026-35603** 跨用户配置信任问题获披露（6/17）；Loop/Harness 工程范式持续主导行业讨论。 |
| **媒体透镜** | **共识**：AI 编程竞争焦点从提示词转向 Loop/Harness 系统工程；**最大分歧**：36氪强调组织角色重构，量子位聚焦 GLM-5.2 与 Fable 5 模型军备。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-18 22:02 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | **GLM-5.2** 6/17 MIT 开源，1M 上下文、Code Arena 开源第一、Hugging Face 可部署 |
| 月之暗面 Kimi | 今日无公开更新；虎嗅/量子位持续引用 Kimi K2.5 与 Cursor Composer 2.5 合作背景 |
| DeepSeek | Harness 团队招聘持续，官方编程 Agent 仍未发布；DeepSeek-TUI 社区项目持续迭代 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Context Engineering、Subagents 与 Harness 构成 2026 年 Coding Agent 三大支柱，开发者应从「写提示词」转向「设计循环系统」。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：商业媒体（36氪）将 Loop 工程解读为组织角色重构；垂直 AI 媒体（量子位）更关注 GLM-5.2 开源与 Fable 5 免费窗口倒计时对编程模型选型的直接冲击。→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.181 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.141.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 1 warn · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/17–6/18 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.181 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.141.0
./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | CVE-2026-35603 安全披露、GLM-5.2 开源、Fable 5 免费窗口倒计时 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.181 `/config`、Bun 1.4、流式修复、Fable 5 窗口策略 |
| [`cursor.md`](./cursor.md) | Automations `/automate`、GitHub 新 trigger、Computer Use、云环境快照 |
| [`codex.md`](./codex.md) | 0.141.0 稳定版、App 26.616 Record & Replay、远程执行 Noise 加密 |
| [`china-ai.md`](./china-ai.md) | 智谱 GLM-5.2 开源、国内厂商轮询、DeepSeek API SOP |

## 检索记录脚注

- 国际官方：Anthropic Changelog、Cursor Changelog（6/17–6/18）、OpenAI Codex Changelog（6/18 App 26.616）、GitHub Releases（rust-v0.141.0 @ 2026-06-18T04:43Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 16–18 日内容
- 交叉验证：Cymulate CVE-2026-35603 博客（6/17）与 Anthropic 修复说明；智谱 GLM-5.2 官方 Hugging Face 与量子位/CSDN secondary 报道
