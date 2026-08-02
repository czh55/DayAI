# DayAI 每日资讯索引 — 2026-08-02

> 检索触发时间：2026-08-02T22:01:35Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 8/2 无新版本，npm `@latest` 仍为 **2.1.220**（维护冻结第 **9** 日）；**Opus 5** 进入发布第 **10** 日；Okta 指数确认 Anthropic 为企业增速第一 AI 应用。 |
| **Cursor** | 8/2 无新 Changelog；**iPad 全付费开放 + Inbox/PR Review** 进入第 **5** 日；Okta 将其列为 AI-native 增速 Top 3 之一（指数 42.4）。 |
| **Codex** | 稳定版 **0.146.0** 维持 npm `@latest`（第 **5** 日）；GitHub 自 7/31 **0.147.0-alpha.4** 后 **8/2 无新 release**（alpha.4 观望第 **3** 日）。 |
| **国内综述** | **DeepSeek V4-Flash 正式版 API 公测**进入第 **3** 日；其余 13 家厂商今日无公开更新；阿里 Claude 禁令第 **24** 日。 |
| **行业宏观** | **Okta Enterprise AI Index**（8/1 发布）：Anthropic 超越 OpenAI 成企业增速第一；企业采用「AI-native 专精 + 传统套件增强」双轨并行。 |
| **媒体透镜** | **共识**：企业 AI 采购从单平台转向多平台组合（Okta 数据印证）；**最大分歧**：增速冠军 Anthropic vs 装机量霸主 Microsoft 365（MAU 仍差 10 倍）的叙事权重。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 禁令第 24 日：办公环境 Claude 全系仍禁用，推荐 Qoder；通义模型今日无新版本（检索 2026-08-02 22:01 UTC） |
| 百度文心/Comate | 今日无公开更新（检索 2026-08-02 22:01 UTC） |
| 腾讯混元/CodeBuddy | CodeBuddy Code v2.103.0 仍最新；今日无公开更新 |
| 字节豆包/Trae/火山方舟 | TRAE 2.0 SOLO 发布第 13 日；今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/27）仍最新；今日无公开更新 |
| 月之暗面 Kimi | K3 权重开源第 7 日；API `kimi-k3` 无新版本；今日无公开更新 |
| DeepSeek | V4-Flash 正式版 API 公测第 **3** 日；Pro 正式版仍「尽快发布」/目标 8 月初 Responses API |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-08-02 22:01 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-08-02 22:01 UTC） |
| MiniMax | 今日无公开更新（检索 2026-08-02 22:01 UTC） |
| 商汤 | 今日无公开更新（检索 2026-08-02 22:01 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-08-02 22:01 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-08-02 22:01 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-08-02 22:01 UTC） |

## 媒体行业透镜一句话

- **共识**：Okta 2 万+ 组织数据印证——企业同时采购 Anthropic/OpenAI/Cursor 与传统套件（M365/GWS），「多平台组合」已成常态 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：海外媒体聚焦 Anthropic「增速第一」里程碑 vs 国内媒体 8/2 ±24h 无重磅新稿、仍以 7/31 DeepSeek Flash 与 Boris Harness 余温为主 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.220 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测 Opus 5 推理 |
| Codex CLI (stable) | 0.146.0 | ✅ npm `@latest` 仍为 0.146.0；`doctor` 12 ok · 1 warn · 4 fail |
| Codex CLI (alpha) | 0.147.0-alpha.4 | ✅ GitHub 7/31 17:54 UTC 仍为最新；8/2 无新 tag |
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
| [`industry.md`](./industry.md) | Okta Enterprise AI Index、多平台企业采购、DeepSeek Flash 第 3 日、Agent 栈延续 |
| [`china-media.md`](./china-media.md) | Okta 指数解读、增速 vs 装机量分歧、国内媒体 8/2 窗口观察 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek Flash 第 3 日、API 调用 SOP |
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.220 维护观察 + Opus 5 第 10 日 + 企业增速叙事 |
| [`cursor.md`](./cursor.md) | Cursor iPad 第 5 日 + Okta 增速 Top 3 定位 |
| [`codex.md`](./codex.md) | Codex 0.146 stable 第 5 日 + alpha.4 观望第 3 日 |

## 检索记录脚注

- 国际官方：Claude Code Changelog（2.1.220 / 7/25 01:35 UTC，8/2 无更新）、[Cursor Changelog](https://cursor.com/changelog)（7/29 iPad 为最新，8/2 无新稿）、Codex GitHub Releases（0.147.0-alpha.4 / 7/31 17:54 UTC；stable 0.146.0 / 7/29；8/2 无新 release）、[Okta Enterprise AI Index](https://www.okta.com/newsroom/articles/the-okta-enterprise-ai-index/)（8/1 发布）
- 国内媒体：site:qbitai.com、site:36kr.com、site:jiqizhixin.com、site:huxiu.com、site:infoq.cn；8/2 ±24h 窗口以 Okta 指数海外跟进、DeepSeek Flash 第 3 日社区讨论为主
- 交叉验证：Okta 指数经 [The News](https://www.thenews.com.pk/latest/1410935-anthropic-overtakes-openai-as-fastest-growing-enterprise-ai-app)（8/1）、[Digital Today](https://www.digitaltoday.co.kr/en/view/84643/) 跟进；Codex 无 8/2 release 经 GitHub API 确认；Claude Code 版本经 npm 与 GitHub Releases 双重确认
