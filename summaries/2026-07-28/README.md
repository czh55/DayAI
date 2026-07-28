# DayAI 每日资讯索引 — 2026-07-28

> 检索触发时间：2026-07-28T22:01:28Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 7/28 无新版本，npm `@latest` 仍为 **2.1.220**；**Opus 5** 进入发布第 5 日；Anthropic 7/27 开放权重立场文 7/28 小幅修订脚注。 |
| **Cursor** | **Cursor Start** 印度专属计划今日上线（**₹649/月**，UPI 支付），含 Grok 4.5、Composer、Cloud Agent 与 iOS，不含 Auto/Bugbot/外部 frontier 模型。 |
| **Codex** | 稳定版 **0.145.0** 不变；GitHub 今日发布 **0.146.0-alpha.14**（04:28 UTC），npm `@latest` 仍未跟随。 |
| **国内综述** | **Kimi K3 权重开源进入第 2 日**，国内媒体集中报道 2.8T 参数与 Infra 开源；其余 13 家厂商今日无公开更新。 |
| **行业宏观** | Cursor 借 SpaceX 收购前窗口猛攻印度开发者市场；Anthropic 开放权重立场获国际媒体跟进解读；K3 生态部署讨论升温。 |
| **媒体透镜** | **共识**：K3 开源标志中国开源模型进入 3T 参数时代，Cursor Start 印证印度成 AI 编程出海必争之地；**最大分歧**：open-weight 是否等于 open-source，以及 K3 自托管门槛对普通开发者是否「真开源」。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 19 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-07-28 22:01 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-28 22:01 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 8 日；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K3 权重开源第 2 日；媒体与社区持续讨论部署门槛与 Kimi K3 License；API `kimi-k3` 无新版本 |
| DeepSeek | 旧 API 名退役第 5 日；须使用 `deepseek-v4-flash` / `deepseek-v4-pro`；今日无新版本 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-28 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-28 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-28 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-28 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-28 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-28 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-28 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：K3 权重开放与 Cursor 印度定价同日成为焦点，媒体普遍认为 AI 编程工具竞争已从模型能力延伸至新兴市场本地化 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：中文报道混用「开源」与「开放权重」，以及 K3 需 8×H100 级硬件才能自托管是否削弱「开源」叙事 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.145.0 | ✅ npm `@latest` 仍为 0.145.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.146.0-alpha.14 | ✅ GitHub 7/28 04:28 UTC 最新；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/28 Cursor Start Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.220 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.145.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 行业宏观：Cursor Start 印度计划、K3 开源第 2 日、Anthropic 开放权重跟进 |
| [`china-media.md`](./china-media.md) | 国内媒体行业透镜：3T 开源叙事、印度定价、开放权重定义之争 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、Kimi K3 第 2 日观察、DeepSeek 迁移 SOP |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护观察 + Opus 5 第 5 日详解 |
| [`cursor.md`](./cursor.md) | Cursor Start 印度计划详解与 Router 第 7 日巩固 |
| [`codex.md`](./codex.md) | Codex alpha.14 发布与 0.145.0 stable 维护 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC，7/28 无更新）、[Anthropic 开放权重立场](https://www.anthropic.com/news/position-open-weights-models)（7/27，7/28 脚注修订）、[Cursor Start Changelog](https://cursor.com/changelog/cursor-start)（7/28）、Codex GitHub Releases（alpha.14 / 7/28 04:28 UTC）、[Kimi K3 GitHub](https://github.com/MoonshotAI/Kimi-K3)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn、site:donews.com；7/28 ±24h 窗口以 K3 开源跟进、Cursor 印度定价、开放权重政策为主
- 交叉验证：Cursor Start 经官方 Changelog + TechCrunch/Times of India 确认；K3 开源经 Moonshot GitHub/Hugging Face + 36氪/新浪财经/DoNews 确认；Anthropic 立场经官方 News + TechCrunch/MLQ 跟进确认
