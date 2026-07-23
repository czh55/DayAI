# DayAI 每日资讯索引 — 2026-07-23

> 检索触发时间：2026-07-23T22:02:45Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 今日无新版本发布；npm `@latest` 仍为 **2.1.218**（7/22），昨日 `/code-review` 后台子智能体与 Auto classifier 变更进入稳定观察期。 |
| **Cursor** | 7/23 无新 Changelog；**Cursor Router**（7/22）进入发布次日，Teams 默认开启三档路由（Intelligence/Balance/Cost），社区开始讨论路由质量可预测性。 |
| **Codex** | 稳定版 **0.145.0** 不变；GitHub 今日连发 **0.146.0-alpha.4**（00:46 UTC）与 **alpha.5**（20:02 UTC），npm `@latest` 未跟随。 |
| **国内综述** | **DeepSeek 旧 API 名弃用倒计时 1 天**（7/24 15:59 UTC）；**Kimi K3 权重开源倒计时 4 天**（7/27）；开发者需立即完成 `deepseek-chat` → `deepseek-v4-flash` 迁移。 |
| **行业宏观** | 7/23 为「迁移截止日」前哨：DeepSeek 全球 API 别名退役、Cursor Router 企业落地、Anthropic Record a Skill 持续 rollout——竞争焦点从模型能力转向 Harness 与路由成本治理。 |
| **媒体透镜** | **共识**：DeepSeek 7/24 硬截止引发全网迁移教程潮，Agent Control Plane 叙事延续；**最大分歧**：路由降本（Cursor Router）是否在 brownfield 存量代码库场景牺牲质量，还是仅 greenfield 受益。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 14 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-07-23 22:02 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-07-23 22:02 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 3 日；Kimi K3 需 Anthropic 接口 `https://api.kimi.com/coding/` 自定义配置 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | **Kimi K3** 发布第 7 日；完整权重 **7/27** 开源倒计时 **4 天** |
| DeepSeek | V4 GA 运行中；`deepseek-chat`/`reasoner` **7/24 15:59 UTC 弃用**倒计时 **1 天** |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-07-23 22:02 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-07-23 22:02 UTC） |
| MiniMax | 今日无公开更新（检索 2026-07-23 22:02 UTC） |
| 商汤 | 今日无公开更新（检索 2026-07-23 22:02 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-07-23 22:02 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-07-23 22:02 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-07-23 22:02 UTC） |

## 媒体行业透镜一句话

- **共识**：DeepSeek API 迁移截止日（7/24）成为今日最大开发者议题，Agent Control Plane 与智能路由（Cursor Router）延续 7/22 主叙事 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：路由降本宣称的 30–60% 节省是否在复杂存量代码库成立，还是仅适合日常补全与 greenfield 任务 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.218 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI (stable) | 0.145.0 | ✅ npm `@latest` 仍为 0.145.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.146.0-alpha.5 | ✅ GitHub 7/23 20:02 UTC 发布；npm `@latest` 未跟随 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 7/22 Cursor Router Changelog 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.218 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.145.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | 行业宏观：DeepSeek 迁移截止、Router 企业落地、Record a Skill rollout |
| [`china-media.md`](./china-media.md) | 国内媒体行业透镜：迁移教程潮、Agent Control Plane 延续 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek 迁移 SOP、Kimi K3 倒计时 |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.218 维护观察与近一周特性回顾 |
| [`cursor.md`](./cursor.md) | Cursor Router 发布次日详解与三档优化模式 |
| [`codex.md`](./codex.md) | Codex 0.146.0-alpha.4/5 迭代与 0.145.0 stable 维护 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（最新 2.1.218 / 7/22）、Cursor Changelog（最新 Router / 7/22）、Codex GitHub Releases（alpha.5 / 7/23 20:02 UTC）、Anthropic News
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；7/23 ±24h 窗口以 DeepSeek 迁移与 Router 讨论为主
- 交叉验证：DeepSeek 弃用日期经官方定价页 + 36氪 + 多家迁移指南三方确认；Cursor Router 经 Changelog + Blog + Forum 确认
