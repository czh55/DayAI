# DayAI 每日资讯索引 — 2026-07-12

> 检索触发时间：2026-07-12T22:02:49Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | npm **2.1.207** 第四日无新版本；**Fable 5 周额度促销窗口今日（7/12 23:59 PT）截止**，明日（7/13）起须 usage credits。 |
| **Cursor** | **3.11（7/10）** 仍为最新版；Side Chats / 对话搜索进入发版第 3 日观察期，今日无新 Changelog。 |
| **Codex** | 稳定版 **0.144.1** 未变；GitHub 预发布 **0.145.0-alpha.4**（7/11 00:10Z）；ChatGPT 桌面三入口合并进入消化期。 |
| **国内综述** | **阿里 Claude 禁令第 3 日**（7/10 生效）持续；腾讯 **CodeBuddy v2.103.0** 仍为最近更新；DeepSeek 旧模型名弃用倒计时 **12 天**。 |
| **行业宏观** | **Fable 5 订阅包含窗口今日收官** + GPT-5.6 全量上线余波；Agent 产品从「编码工具」向「三入口超级应用」分化。 |
| **媒体透镜** | **共识**：GPT-5.6 与 Fable 5 成本/跑分之争进入「截止日」实操阶段；**最大分歧**：Fable 5 截止后开发者是否大规模迁移至 GPT-5.6 Sol 或回退 Sonnet 5。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 3 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本 |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| 腾讯混元/CodeBuddy | **CodeBuddy Code v2.103.0**（DeepSeek V4 Pro/Flash）仍为最近更新；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K2.7 Code 7/7 进入 Copilot Business/Enterprise；Kimi 产品今日无新版本 |
| DeepSeek | V4 预览版运行中；`deepseek-chat`/`reasoner` **7/24 弃用**倒计时 12 天 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-12 22:02 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-12 22:02 UTC） |

## 媒体行业透镜一句话

- **共识**：Fable 5 截止日与 GPT-5.6 全量上线形成「模型选型拐点」——开发者须在今日内消耗周额度或明日启用 credits → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：GPT-5.6 Sol 官方 1/4 成本叙事 vs 社区长程 Agent Token 膨胀实测；阿里禁令是否扩散至 API/个人设备 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.207 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.144.1 | ✅ `@latest` 仍为稳定版；`doctor` 12 ok · 1 warn · 4 fail |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 3.11 Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.207 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.144.1
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 截止日、GPT-5.6 余波、阿里禁令第 3 日、Anthropic 7/9 公告 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、虎嗅、InfoQ 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.207 维护、Fable 5 今日截止、`/model`/`fallbackModel` 实操 |
| [`cursor.md`](./cursor.md) | 3.11 Side Chats 第 3 日观察、Cloud Hooks 落地指南 |
| [`codex.md`](./codex.md) | 0.144.1 稳定 + 0.145.0-alpha.4 预发布、ChatGPT 桌面合并 |
| [`china-ai.md`](./china-ai.md) | CodeBuddy v2.103.0、阿里禁令实操、全厂商轮询 |

## 检索记录脚注

- 国际官方：Claude Code Changelog、Anthropic News（7/9 Inviting hard questions）、Cursor Changelog、Codex Changelog、GitHub openai/codex releases
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn（触发日 ±24h）
- 交叉验证：Fable 5 截止（Anthropic Redeploying Fable 5 + 36氪 7/10 + 量子位 7/10）；GPT-5.6 全量（OpenAI 官方 + 虎嗅 + 36氪）；阿里禁令（工信部 NVDB 7/8 + 第一财经 7/3）
