# DayAI 每日资讯索引 — 2026-06-22

> 检索触发时间：2026-06-22T22:00:57Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.186**（+1 patch）：维护迭代延续 auto mode 安全、`/config key=value`、MCP CLI 登录；**Fable 5 订阅免费窗口今日 UTC 截止**，6/23 起需 usage credits（$10/$50 per M tokens）。 |
| **Cursor** | **3.8（6/18）** 消化期无新 Changelog；SpaceX **600 亿美元收购**（6/16 SEC 备案）与 Automations Computer Use 为本周主线叙事。 |
| **Codex** | 稳定版 **0.141.0** 不变；**6/22** GitHub 发布 **0.142.0-alpha.12**（21:16 UTC），alpha 线自 6/18 已连发 12 个 tag。 |
| **国内综述** | 智谱 **GLM-5.2** 开源编程热度延续；DeepSeek Harness 招聘持续；微软 **6/30** Claude Code 内部关停进入 **8 天倒计时**。 |
| **行业宏观** | **Fable 5 免费窗口今日关闭**为本周最大事件；政府出口管制后模型恢复（6/18）+ 定价切换叠加；ALE「真干活」评测持续重塑 Agent 选型话语。 |
| **媒体透镜** | **共识**：Loop Engineering / Harness 三件套取代 Prompt 工程；**最大分歧**：量子位强调 ALE 排名与 GLM-5.2 开源逆袭，36氪/InfoQ 聚焦 SpaceX 收购 Cursor 与 Fable 5 credits 定价冲击。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-22 22:00 UTC）；Qoder CLI 预计 6/26 AICon 分享 |
| 百度文心/Comate | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6/5）持续引用；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）热度延续；今日无新版本 |
| 月之暗面 Kimi | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| DeepSeek | Harness 团队招聘持续，DeepSeek Code 仍未发布 |
| 讯飞星火/iFlyCode | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| 华为盘古/CodeArts | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| MiniMax | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| 商汤 | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| 昆仑万维 | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| 零一万物 | 今日无公开更新（检索 2026-06-22 22:00 UTC） |
| 面壁智能 | 今日无公开更新（检索 2026-06-22 22:00 UTC） |

## 媒体行业透镜一句话

- **共识**：2026 年 AI 编程竞争焦点是 Harness + Loop Engineering，而非单纯模型跑分 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：量子位将 ALE 解读为「Fable 5 真场景不敌 GPT 5.5+Codex」、GLM-5.2 开源逆袭；36氪聚焦 SpaceX 600 亿收购 Cursor 与 Claude Code 市场份额从 41% 降至 26% → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.186 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.141.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 1 warn · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/18 Changelog 3.8 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.186 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.141.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 免费窗口今日关闭、SpaceX 收购 Cursor、微软 6/30 迁移倒计时 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.186 维护更新、Fable 5 窗口截止、`/config`、auto mode 安全 |
| [`cursor.md`](./cursor.md) | Automations 3.8、SpaceX 收购、Computer Use、GitHub/Slack 触发器 |
| [`codex.md`](./codex.md) | 0.141.0 稳定版、0.142.0-alpha.12 预发布、Record & Replay |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek Harness、GLM-5.2、API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Changelog](https://code.claude.com/docs/en/changelog.md)、[News](https://www.anthropic.com/news)、Cursor [Changelog](https://cursor.com/changelog)（6/18 3.8）、OpenAI [Codex Releases](https://github.com/openai/codex/releases)（0.142.0-alpha.12 @ 2026-06-22T21:16Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 20–22 日内容
- 交叉验证：Fable 5 窗口截止日 Anthropic 官方 + 量子位/UsageBox secondary；SpaceX 收购 Cursor SEC 备案 + 36氪/量子位 secondary
