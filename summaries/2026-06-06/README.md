# DayAI 每日资讯索引 — 2026-06-06

> **生成时间**：2026-06-06 22:00 UTC（cron trigger）  
> **分支**：`cursor/ai-9c3e`

---

## 一句话结论

| 模块 | 结论 |
|------|------|
| **Claude Code** | v2.1.166/167 上线 **fallbackModel 降级链**与跨会话权限加固，生产环境建议今日完成 settings 配置。 |
| **Cursor** | 6/4–5 日 **SDK auto-review + JSONL store + Design Mode 语音/绘制**，云环境未测桌面端。 |
| **Codex** | 稳定版 **0.137.0** 含 multi-agent v2 与企业 config bundle；6/6 仅 **0.138.0-alpha.6** pre-release。 |
| **国内综述** | **6/5 腾讯 WorkBuddy 企业版 + 华为 Agentic Infra** 双大会；6/6 多数厂商无新 changelog。 |
| **媒体透镜** | 共识：企业 Agent 工作台化；分歧：36氪偏商业化乐观 vs 虎嗅/Gartner 偏落地谨慎（详见 `china-media.md`）。 |

---

## 国内厂商一句话结论表

| 厂商/产品 | 结论 |
|-----------|------|
| 阿里通义/百炼/Qwen | 今日无公开更新；Qwen Code npm **0.17.1** 本地实测通过 |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy/WorkBuddy | **6/5 发布 WorkBuddy 企业版 + Agent Suite** |
| 字节豆包/Trae/火山方舟 | 今日无公开更新；最近 6/1 SOLO 浏览器选元素 |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | **6/1 识图灰测**；API 旧名 **7/24 停用** |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | **6/5 Agentic Infra + CloudRobo 6/30 公测** |
| MiniMax/商汤/天工/Yi/MiniCPM | 今日无公开更新 |

---

## 媒体行业透镜一句话

- **共识**：6 月 5 日国内媒体集中解读 **「Agent 基础设施 + 组织级工作台」**（腾讯/华为同日大会）。
- **最大分歧**：**ToB Agent 商业化速度**——36氪/量子位跟发布会节奏，虎嗅引用 Gartner 警示项目取消率。
- 详见 → [`china-media.md`](./china-media.md)「今日媒体行业透镜」

---

## 本地实测摘要

```text
/workspace/tools
├── claude --version     → 2.1.167 ✅
├── codex --version      → 0.137.0 ✅
├── codex doctor         → 无 auth，12 ok / 4 fail ⚠️
├── codex features list  → 27 features ✅
└── qwen --version       → 0.17.1 ✅
```

---

## 文档目录

| 文件 | 说明 |
|------|------|
| [claude-code.md](./claude-code.md) | fallbackModel、deny glob、SendMessage 加固、thinking 关闭、ultracode |
| [cursor.md](./cursor.md) | SDK auto-review、JSONL store、custom tools、nested subagents、Design Mode |
| [codex.md](./codex.md) | multi-agent v2、cloud config bundle、plugin JSON、Sites、0.138 alpha |
| [china-ai.md](./china-ai.md) | 腾讯/华为/DeepSeek/Qwen 等国内厂商与 CLI 实测 |
| [china-media.md](./china-media.md) | 量子位、36氪、虎嗅、晚点、InfoQ 等 ≥8 源透镜 |
| [industry.md](./industry.md) | Anthropic IPO、Build 2026、GitHub 按量计费、国内双大会 |

---

## 推荐阅读顺序

1. 本 README → 2. `industry.md` 宏观 → 3. 你使用的工具文档 → 4. `china-ai.md` + `china-media.md`
