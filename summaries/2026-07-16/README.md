# DayAI 每日资讯索引 — 2026-07-16

> 检索触发时间：2026-07-16T22:01:00Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.211**（7/15 23:02 UTC 发布）首日上线；新增 `--forward-subagent-text` 子 Agent 流式输出，修复 Bedrock/Vertex **prompt cache 多计费回归**与后台 Agent 误重启。 |
| **Cursor** | **3.11（7/10）** 第七日仍为最新 Changelog；机器之心 Week 25 确认 **SpaceX $600 亿收购 Cursor** 为本周头条，Sand 内测进入第四周观察。 |
| **Codex** | 稳定版 **0.144.5**（7/16 02:54 UTC）今日发布，强化危险命令检测；**0.145.0-alpha.18** 于触发前 4 小时连发，5h 限额临时移除仍生效。 |
| **国内综述** | **阿里 Claude 禁令第 7 日**持续；**DeepSeek `deepseek-chat`/`reasoner` 弃用倒计时 8 天**（7/24 23:59 北京时间）。 |
| **行业宏观** | Claude Code 2.1.211 与 Codex 0.144.5 同日/security 补丁连发，头部工具进入「稳定性 + 可观测性」密集维护期。 |
| **媒体透镜** | **共识**：Agent 从 Prompt 走向 Loop/Harness，算力松绑与版本补丁并行；**最大分歧**：Fable 5 7/19 截止后是否会第三次延期。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 7 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| 腾讯混元/CodeBuddy | **CodeBuddy Code v2.103.0** 仍为最近更新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K2.7 Code 7/7 进入 Copilot Business/Enterprise；Kimi 产品今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 **8 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-16 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-16 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：AI 编程进入 Harness/Loop 工程化阶段，头部厂商以版本补丁巩固生产可用性 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Fable 5 免费窗口 7/19 截止后 Anthropic 会否第三次延期 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.211 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.5 | ✅ `@latest` 已升至 0.144.5；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.145.0-alpha.18 | ✅ GitHub 今日 18:11 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 3.11 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.211 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.5
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Claude Code 2.1.211、Codex 0.144.5 安全补丁、SpaceX 收购 Cursor、Fable 5 倒计时 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ、机器之心 5 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.211 子 Agent 流式输出、prompt cache 修复、后台 Agent 安全 |
| [`cursor.md`](./cursor.md) | 3.11 第七日观察、SpaceX 收购变量、Sand 内测第四周 |
| [`codex.md`](./codex.md) | 0.144.5 危险命令检测、alpha.18 预发布、5h 限额松绑延续 |
| [`china-ai.md`](./china-ai.md) | 阿里禁令第 7 日、DeepSeek 弃用倒计时、全厂商轮询 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.211）、Anthropic News、Cursor Changelog、Codex GitHub releases（0.144.5、0.145.0-alpha.15–18）、[DevelopersIO 2.1.211 摘要](https://dev.classmethod.jp/en/articles/20260711-cc-updates-v2-1-211/)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：2.1.211 发布（GitHub release + npm + Changelog）；0.144.5 危险命令检测（GitHub release #33455）；SpaceX 收购 Cursor（机器之心 Week 25 + 此前 The Information 报道）
