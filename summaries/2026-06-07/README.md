# DayAI 每日资讯索引 — 2026-06-07

> 检索窗口：2026-06-06 22:00 UTC 至 2026-06-07 22:00 UTC（trigger 时间）及前 48 小时重大延续事件  
> 本地实测环境：`/workspace/tools`（Node npm，`claude` 2.1.168，`codex` 0.137.0）

---

## 一句话结论

| 板块 | 结论 |
|------|------|
| **Claude Code** | 2.1.168 稳定版持续迭代：`ultracode` 动态多 Agent 编排、`fallbackModel` 容灾、Auto Mode 扩至 Bedrock/Vertex/Foundry；Anthropic 同日呼吁行业建立 AI「刹车踏板」并与 IPO 叙事交织。 |
| **Cursor** | 3.7 连续两日更新：浏览器 Design Mode 支持多选元素与语音输入；SDK 新增 `customTools`、JSONL 持久化、`autoReview` 与无限嵌套 Subagent。 |
| **Codex** | npm 稳定版 0.137.0；GitHub 预发布 0.138.0-alpha.6（6/6）聚焦 Multi-Agent v2、企业云配置包、插件 JSON 输出与远程控制配对；行业侧 GPT-5.3-Codex-Spark 实时协作叙事仍被国内媒体热议。 |
| **国内综述** | **6 月 5 日腾讯 WorkBuddy 企业版**与 **6 月 6 日北京智源大会「悟界」系列**为本周开发者最值得关注国内事件；多数头部厂商当日无新版本发布。 |
| **媒体行业透镜** | **共识**：编程 Agent 正从 demo 进入企业 Harness/Runtime 基建竞赛；**最大分歧**：虎嗅/科创板日报强调 Agent 订单爆发与商业化未规模化，乔治·霍兹一派警告技术债务与工程能力被偷换。详见 [`china-media.md`](./china-media.md)。 |

---

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|----------|
| 阿里通义/百炼/Qoder | 今日无公开更新（最近：5 月 Qoder 1.0 工作台） |
| 百度文心/Comate | 今日无公开更新 |
| 腾讯混元/CodeBuddy/WorkBuddy | **6/5 WorkBuddy 企业版发布**（见 `china-ai.md`） |
| 字节豆包/Trae/火山方舟 | 今日无公开更新 |
| 智谱 GLM/CodeGeeX | **6/6 智源大会发布悟界系列**（Emu3/Brainμ/RoboOS 等） |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | 今日无公开更新（最近：6 月初识图模式灰测） |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | **6/4 华为云 Agentic AI 系列新品**（见媒体稿） |
| MiniMax/商汤/昆仑/零一/面壁 | 今日无公开更新（最近：阶跃 Step 3.7 Flash 6/5） |

---

## 本地实测摘要

```text
# Claude Code
$ ./node_modules/.bin/claude --version
2.1.168 (Claude Code)
✅ --help 正常输出完整 CLI 参数（含 --effort、--fallback-model、ultracode 相关 flags）

# Codex
$ ./node_modules/.bin/codex --version
codex-cli 0.137.0
⚠️ codex doctor：无 auth（预期）、WebSocket 401（无 API Key）、TERM=dumb
✅ codex features list：multi_agent/plugins/goals/hooks 等为 stable
```

完整命令与输出见各工具文档及 [`china-ai.md`](./china-ai.md)「本地实测总览」。

---

## 文档导航

| 文件 | 内容 |
|------|------|
| [`claude-code.md`](./claude-code.md) | Claude Code 2.1.168：ultracode、fallbackModel、Auto Mode 第三方云、agent teams |
| [`cursor.md`](./cursor.md) | Cursor 3.7 Design Mode、Canvas、SDK customTools/autoReview/JSONL |
| [`codex.md`](./codex.md) | Codex 0.137/0.138-alpha：Multi-Agent v2、云配置包、插件、远程控制 |
| [`china-ai.md`](./china-ai.md) | 国内厂商轮询、WorkBuddy 企业版、智源悟界、DeepSeek 识图 |
| [`industry.md`](./industry.md) | Anthropic IPO、刹车踏板、生物安全联名信、Gemini Deep Think、IPO 竞赛 |
| [`china-media.md`](./china-media.md) | 量子位/虎嗅/36氪/InfoQ 等 12+ 源行业判断与透镜 |

---

## 检索记录（脚注）

- 国际官方：`cursor.com/changelog`、`code.claude.com/docs/en/changelog.md`、`github.com/openai/codex/releases`
- 国内厂商：各官网 + `site:qbitai.com` + `site:36kr.com` + `site:huxiu.com`
- 媒体轮询时间：**2026-06-07 22:15 UTC**
