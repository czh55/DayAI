# DayAI 每日资讯索引 — 2026-07-13

> 检索触发时间：2026-07-13T22:01:15Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.207** 第五日无新版本；**Fable 5 订阅包含窗口已于 7/12 23:59 PT 截止**，今日起须 usage credits 或回退 Sonnet 5/Opus 4.8。 |
| **Cursor** | **3.11（7/10）** 仍为最新版；Side Chats / 对话搜索进入发版第 4 日观察期，今日无新 Changelog。 |
| **Codex** | 稳定版 **0.144.1 → 0.144.3** 连发两补丁（7/13）；**0.144.2** 回滚 Guardian auto-review 提示词回归，**0.144.3** 为无代码变更的版本发布。 |
| **国内综述** | **阿里 Claude 禁令第 4 日**（7/10 生效）持续；腾讯 **CodeBuddy v2.103.0** 仍为最近更新；DeepSeek 旧模型名弃用倒计时 **11 天**。 |
| **行业宏观** | **Fable 5 credits 计费时代首日** + **CircleCI Chunk Sidecars**（7/13）将 CI 校验前移至 Agent 内循环；GPT-5.6 全量上线余波持续。 |
| **媒体透镜** | **共识**：Fable 5 截止后开发者进入「credits 预算 + 模型回退」实操阶段；**最大分歧**：Codex 0.144.2 回滚 auto-review 是否预示 OpenAI 在「自动审查激进度」上向社区妥协。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 4 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| 腾讯混元/CodeBuddy | **CodeBuddy Code v2.103.0**（DeepSeek V4 Pro/Flash）仍为最近更新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K2.7 Code 7/7 进入 Copilot Business/Enterprise；Kimi 产品今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 11 天 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-13 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-13 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：Fable 5 截止后进入 credits 计费与模型回退实操期，GPT-5.6 Sol 承接部分迁移需求 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：CircleCI「Agent 内循环 CI」vs 传统 PR 后流水线——是否代表 CI/CD 范式根本转变 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.207 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.3 | ✅ `@latest` 已升至 0.144.3；`doctor` 12 ok · 1 warn · 4 fail |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 3.11 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.207 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.3
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 credits 首日、Codex 0.144.2/0.144.3、CircleCI Chunk Sidecars、阿里禁令第 4 日 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.207 维护、Fable 5 credits 首日、`/model`/`fallbackModel` 实操 |
| [`cursor.md`](./cursor.md) | 3.11 Side Chats 第 4 日观察、Cloud Hooks 落地指南 |
| [`codex.md`](./codex.md) | 0.144.3 稳定版连发补丁、Guardian auto-review 回滚、alpha.7 预发布 |
| [`china-ai.md`](./china-ai.md) | CodeBuddy v2.103.0、阿里禁令实操、全厂商轮询 |

## 检索记录脚注

- 国际官方：Claude Code Changelog、Anthropic News、Cursor Changelog、Codex Changelog、GitHub openai/codex releases（0.144.2/0.144.3/0.145.0-alpha.7）
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：Fable 5 截止（Anthropic Redeploying Fable 5 + 36氪 7/10）；Codex 0.144.2（GitHub release + npm @latest）；CircleCI Sidecars（InfoQ 7/13 + CircleCI 官方博客）
