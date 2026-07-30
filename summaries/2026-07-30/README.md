# DayAI 每日资讯索引 — 2026-07-30

> 检索触发时间：2026-07-30T22:00:19Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 7/30 无新版本，npm `@latest` 仍为 **2.1.220**；**Opus 5** 进入发布第 **7** 日；Anthropic 7/27 开放权重立场文无新修订。 |
| **Cursor** | 7/30 无新 Changelog；**iPad 全付费开放 + Inbox/PR Review** 进入第 **2** 日；Cursor Start 印度计划第 **3** 日。 |
| **Codex** | 稳定版 **0.146.0** 维持 npm `@latest`；GitHub 今日发布 **0.147.0-alpha.2**（01:04 UTC），开启 0.147 周期第二版 pre-release。 |
| **国内综述** | **Kimi K3 权重开源第 4 日** + 36氪讨论 Infra 难抄；阿里 Claude 禁令第 **21** 日；其余 12 家厂商今日无公开更新。 |
| **行业宏观** | **GPT-5.6 Sol 自主重写生产 GPU 内核**，OpenAI 对外服务成本降 **20%**、token 生成效率升 **15%+**；AI Coding 企业市场年化规模逼近 **百亿美元**。 |
| **媒体透镜** | **共识**：AI 编程竞争轴从「堆 GPU」转向「榨 token 效率」与验证闭环；**最大分歧**：InfoQ 7/30 重提 Uncle Bob「绝不读 AI 代码」vs Hashimoto「逐行阅读」治理哲学对立。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 21 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-07-30 22:00 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-30 22:00 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 10 日；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K3 权重开源第 4 日；36氪 7/30 讨论 Infra 难抄；API `kimi-k3` 无新版本 |
| DeepSeek | 旧 API 名退役第 7 日；须使用 `deepseek-v4-flash` / `deepseek-v4-pro`；今日无新版本 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-30 22:00 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-30 22:00 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-30 22:00 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-30 22:00 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-30 22:00 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-30 22:00 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-30 22:00 UTC） |

## 媒体行业透镜一句话

- **共识**：GPT-5.6 通过 Codex 优化自身推理栈，标志 AI 编程从「写业务代码」延伸至「写基础设施代码」；企业级 AI Coding 市场年化规模达 98–110 亿美元 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：Uncle Bob 用测试围墙替代读码 vs Hashimoto 坚持逐行阅读；36氪质疑「自进化」叙事 vs OpenAI 强调「自优化飞轮」→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.146.0 | ✅ npm `@latest` 仍为 0.146.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.147.0-alpha.2 | ✅ GitHub 7/30 01:04 UTC 最新；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/29 iPad Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.220 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.146.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 行业宏观：GPT-5.6 内核自优化、AI Coding 百亿市场、GCC 禁 AI 代码 |
| [`china-media.md`](./china-media.md) | 国内媒体透镜：自优化飞轮、Uncle Bob 争论、K3 Infra 难抄 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、Kimi K3 第 4 日、DeepSeek 迁移 SOP |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护观察 + Opus 5 第 7 日详解 |
| [`cursor.md`](./cursor.md) | Cursor iPad 第 2 日观察 + 移动 Agent 工作流延续 |
| [`codex.md`](./codex.md) | Codex 0.147.0-alpha.2 与 GPT-5.6 推理栈自优化 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC，7/30 无更新）、[Cursor Changelog](https://cursor.com/changelog)（7/29 iPad 为最新，7/30 无新稿）、Codex GitHub Releases（0.147.0-alpha.2 / 7/30 01:04 UTC；stable 0.146.0 / 7/29）、[OpenAI GPT-5.6 博客](https://openai.com/index/gpt-5-6/)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；7/30 ±24h 窗口以 GPT-5.6 自优化、百亿市场、Uncle Bob 争论、K3 Infra 为主
- 交叉验证：GPT-5.6 降本 20% 经 OpenAI 官方博客 + Greg Brockman X + 36氪/新智元三重确认；Codex alpha.2 经 GitHub Releases 确认；K3 开源第 4 日经 Moonshot GitHub + 36氪确认
