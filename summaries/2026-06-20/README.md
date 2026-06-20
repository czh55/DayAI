# DayAI 每日资讯索引 — 2026-06-20

> 检索触发时间：2026-06-20T22:03:02Z（UTC）｜本地 CLI 实测环境：`/workspace/tools`

## 今日一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | **2.1.185** patch（较 6/19 的 2.1.183 +2）：auto mode 安全拦截、`/config key=value`、Bun 1.4 持续落地；**Fable 5 免费窗口仅剩 2 天（6/22 UTC 截止）**。 |
| **Cursor** | **3.8（6/18）** 消化期延续：Automations `/automate`、5 项 GitHub trigger、默认 Computer Use 无新 Changelog；6/20 无版本更新。 |
| **Codex** | 稳定版 **0.141.0** 不变；**6/20** GitHub 发布 **0.142.0-alpha.7** 预发布（00:40 UTC），alpha 线累计 7 个 tag。 |
| **国内综述** | 微软 **6/30** 内部停用 Claude Code 进入倒计时；DeepSeek Harness 招聘持续；智谱 **GLM-5.2** 开源编程热度延续。 |
| **行业宏观** | **Fable 5 订阅免费窗口倒计时**与 **微软 Copilot CLI 强制迁移**并列本周两大企业选型事件；ALE 基准讨论持续发酵。 |
| **媒体透镜** | **共识**：2026 年竞争焦点是 Harness + Loop Engineering，非单纯模型跑分；**最大分歧**：垂直媒体强调 Fable 5 真场景成本/ALE 排名，商业媒体聚焦微软「关对手入口、留模型 API」的平台博弈。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼 | 今日无公开更新（检索 2026-06-20 22:03 UTC） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy | WorkBuddy 企业版（6/5）持续引用；今日无新版本 |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | GLM-5.2（6/17 MIT 开源）热度延续；今日无新版本 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | Harness 团队招聘持续，官方 DeepSeek Code 仍未发布 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/昆仑万维/零一万物/面壁 | 今日无公开更新 |

## 媒体行业透镜一句话

- **共识**：Loop Engineering 与 Harness 三件套（Context / Subagents / 权限）取代 Prompt 工程成为 2026 主流叙事 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)
- **最大分歧**：量子位将 ALE 解读为「Fable 5 真场景不敌 GPT 5.5+Codex」；InfoQ/36氪更关注微软 6/30 关停 Claude Code 入口的平台战略与 Copilot CLI 组织迁移 → 详见 [`china-media.md`](./china-media.md#今日媒体行业透镜)

## 本地实测摘要

| 工具 | 版本 | 结果 |
|------|------|------|
| Claude Code | 2.1.185 | ✅ `--version` / `--help` 正常；⚠️ 无 API Key 未实测推理 |
| Codex CLI | 0.141.0 | ✅ `--version` / `doctor` / `features list` 正常（12 ok · 1 warn · 4 fail，auth 未登录）；⚠️ 无 API Key 无法实测推理 |
| Cursor 桌面 | — | ⚠️ 未实测（Cloud Agent 无 GUI）；以 6/18 Changelog 3.8 为准 |
| DeepSeek API | — | ⚠️ 未实测（无 `DEEPSEEK_API_KEY`）；SOP 见 [`china-ai.md`](./china-ai.md) |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version   # 2.1.185 (Claude Code)
./node_modules/.bin/codex --version    # codex-cli 0.141.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

## 文档导航

| 文件 | 内容 |
|------|------|
| [`industry.md`](./industry.md) | Fable 5 免费窗口倒计时、微软 Claude Code 迁移、ALE 持续讨论 |
| [`china-media.md`](./china-media.md) | 量子位、36氪、InfoQ、虎嗅 4+ 源媒体行业判断 |
| [`claude-code.md`](./claude-code.md) | 2.1.185 维护更新、Fable 5 窗口策略、`/config`、auto mode 安全 |
| [`cursor.md`](./cursor.md) | Automations 3.8 消化期、Computer Use、GitHub/Slack 触发器 |
| [`codex.md`](./codex.md) | 0.141.0 稳定版、0.142.0-alpha.7 预发布、Record & Replay |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、DeepSeek Harness、GLM-5.2、API SOP |

## 检索记录脚注

- 国际官方：Anthropic [Changelog](https://code.claude.com/docs/en/changelog.md)、Cursor [Changelog](https://cursor.com/changelog)（6/18 3.8）、OpenAI [Codex Changelog](https://developers.openai.com/codex/changelog)、GitHub Releases（0.142.0-alpha.7 @ 2026-06-20T00:40Z）
- 国内媒体：`site:qbitai.com`、`site:36kr.com`、`site:infoq.cn`、`site:huxiu.com`，优先 6 月 18–20 日内容
- 交叉验证：Fable 5 窗口截止日 Anthropic 官方 + 多家 secondary（UsageBox、WaveSpeed）；微软 Claude Code 迁移 The Verge/InfoQ + 36氪 secondary
