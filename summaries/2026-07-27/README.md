# DayAI 每日资讯索引 — 2026-07-27

> 检索触发时间：2026-07-27T22:01:48Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 7/27 无新版本，npm `@latest` 仍为 **2.1.220**；**Opus 5** 进入发布第 4 日；Anthropic CEO 同日发文澄清开放权重立场，未签署黄仁勋联名信。 |
| **Cursor** | 7/27 无新 Changelog；**Cursor Router**（7/22）进入发布第 6 日，Teams 三档路由持续落地，无 Opus 5 相关官方条目。 |
| **Codex** | 稳定版 **0.145.0** 不变；GitHub 今日连发 **0.146.0-alpha.12**（08:25 UTC）与 **alpha.13**（16:03 UTC），npm `@latest` 仍未跟随。 |
| **国内综述** | **Kimi K3 完整权重于 00:00 UTC 正式开源**（2.8T MoE、1M context、Kimi K3 License），同步开源 MoonEP、FlashKDA、AgentEnv 与 k3_tech_report.pdf。 |
| **行业宏观** | K3 权重开放引爆「3T 级开源」叙事；Anthropic 回应开放权重争议，强调芯片管制与蒸馏打击而非全面禁令；NVIDIA 联名信签名人增至 50 家。 |
| **媒体透镜** | **共识**：K3 兑现 7/27 开源承诺，标志开源模型进入 2.8T 参数新纪元；**最大分歧**：白宫指控 Moonshot 蒸馏 Fable 5 训练 K3 是否成立，以及「开源」对普通开发者是否可及（需 8×H100 级硬件）。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 18 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-07-27 22:01 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-27 22:01 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 7 日；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3 完整权重正式开源**（00:00 UTC）；Hugging Face `moonshotai/Kimi-K3`、GitHub `MoonshotAI/Kimi-K3`、ModelScope 同步上线；技术报告与 MoonEP/FlashKDA/AgentEnv 一并发布 |
| DeepSeek | 旧 API 名退役第 4 日；须使用 `deepseek-v4-flash` / `deepseek-v4-pro`；今日无新版本 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-27 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-27 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-27 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-27 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-27 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-27 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-27 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：K3 权重如期开放，全球首个 2.8T 级开源模型落地，媒体集中讨论开源 AI 地缘政治与自托管门槛 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：白宫「蒸馏 Fable 5 训练 K3」指控 vs Moonshot 否认，以及「开源」对普通开发者是否等于可本地部署 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.145.0 | ✅ npm `@latest` 仍为 0.145.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.146.0-alpha.13 | ✅ GitHub 7/27 16:03 UTC 最新；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/22 Cursor Router Changelog 为准 |
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
| [`industry.md`](./industry.md) | 行业宏观：K3 权重开源、Anthropic 开放权重立场、NVIDIA 联名信 |
| [`china-media.md`](./china-media.md) | 国内媒体行业透镜：3T 开源叙事、蒸馏争议、自托管门槛 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、Kimi K3 开源详情、DeepSeek 迁移 SOP |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护观察 + Opus 5 第 4 日详解 |
| [`cursor.md`](./cursor.md) | Cursor Router 发布第 6 日详解与三档优化模式 |
| [`codex.md`](./codex.md) | Codex alpha.12/.13 双发与 0.145.0 stable 维护 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC，7/27 无更新）、[Anthropic 开放权重立场](https://www.anthropic.com/news/position-open-weights-models)（7/27）、[Anthropic Opus 5 公告](https://www.anthropic.com/news/claude-opus-5)、Cursor Changelog（最新 Router / 7/22）、Codex GitHub Releases（alpha.13 / 7/27 16:03 UTC）、[Kimi K3 GitHub](https://github.com/MoonshotAI/Kimi-K3)、[Hugging Face Kimi-K3](https://huggingface.co/moonshotai/Kimi-K3)
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；7/27 ±24h 窗口以 K3 权重开源、开放权重地缘政治、蒸馏争议为主
- 交叉验证：K3 开源经 Moonshot GitHub/Hugging Face + 网易/36氪/维基百科确认；Anthropic 立场经官方 News + CNBC/MLQ 报道确认；蒸馏指控经白宫顾问 Kratsios 发言 + Moonshot 否认（媒体报道）交叉，⚠️ 无独立技术审计
