# DayAI 每日资讯索引 — 2026-07-25

> 检索触发时间：2026-07-25T22:02:00Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 今日发布 **2.1.220**（01:35 UTC）维护版，仅含 bug fixes；**Opus 5** 进入发布第 2 日，npm `@latest` 已跟随至 2.1.220。 |
| **Cursor** | 7/25 无新 Changelog；**Cursor Router**（7/22）进入发布第 4 日，Teams 三档路由（Intelligence/Balance/Cost）持续落地，社区聚焦 brownfield 可预测性。 |
| **Codex** | 稳定版 **0.145.0** 不变；GitHub 今日连发 **alpha.9**（00:34）、**alpha.10**（02:18）、**alpha.10.1**（20:29 UTC），npm `@latest` 未跟随。 |
| **国内综述** | **Kimi K3 完整权重开源倒计时 2 天**（7/27）；黄仁勋首条推文力挺开放权重；DeepSeek 旧 API 名退役后第 2 日，迁移教程潮持续。 |
| **行业宏观** | Opus 5 次日效应：GitHub Copilot / AWS Bedrock 全面接入；硅谷「开源 vs 闭源」路线之争因 Kimi K3 升温。 |
| **媒体透镜** | **共识**：Opus 5「半价前沿」与 Kimi K3 开源倒计时叠加，Agent 成本优化成主旋律；**最大分歧**：K3 权重开放后国内自托管是否真能落地，还是仅 API 生态受益。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 16 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-07-25 22:02 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-25 22:02 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 5 日；Kimi K3 需 Anthropic 接口 `https://api.kimi.com/coding/` 自定义配置 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3** 发布第 10 日；完整权重 **7/27** 开源倒计时 **2 天**；编码套餐持续限流 |
| DeepSeek | 旧 API 名退役第 2 日；须使用 `deepseek-v4-flash` / `deepseek-v4-pro` |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-25 22:02 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-25 22:02 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-25 22:02 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-25 22:02 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-25 22:02 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-25 22:02 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-25 22:02 UTC） |

## 媒体行业透镜一句话

- **共识**：Opus 5 次日与 Kimi K3 开源倒计时叠加，媒体集中讨论「半价前沿智能」与「开放权重地缘政治」→ 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：K3 权重开放后国内团队能否真正自托管 2.8T MoE，还是仅 API 生态受益 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.145.0 | ✅ npm `@latest` 仍为 0.145.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.146.0-alpha.10.1 | ✅ GitHub 7/25 20:29 UTC 发布；npm `@latest` 未跟随 |
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
| [`industry.md`](./industry.md) | 行业宏观：Opus 5 次日生态接入、Kimi K3 开源倒计时、开源路线之争 |
| [`china-media.md`](./china-media.md) | 国内媒体行业透镜：半价前沿叙事、黄仁勋首推、自托管门槛讨论 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek 迁移 SOP、Kimi K3 倒计时 |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护版 + Opus 5 第 2 日详解 |
| [`cursor.md`](./cursor.md) | Cursor Router 发布第 4 日详解与三档优化模式 |
| [`codex.md`](./codex.md) | Codex 0.146.0-alpha.9/10/10.1 迭代与 0.145.0 stable 维护 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC）、[Anthropic Opus 5 公告](https://www.anthropic.com/news/claude-opus-5)、Cursor Changelog（最新 Router / 7/22）、Codex GitHub Releases（alpha.10.1 / 7/25 20:29 UTC）、DeepSeek API Docs
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；7/25 ±24h 窗口以 Opus 5 次日、Kimi K3 倒计时、黄仁勋推文为主
- 交叉验证：Opus 5 经 Anthropic News + GitHub v2.1.219/220 + GitHub Copilot Changelog 确认；Kimi K3 开源日期经 platform.kimi.com 官方文档 + 36氪 + 量子位三方确认
