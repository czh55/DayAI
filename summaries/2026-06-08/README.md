# DayAI 每日资讯索引 — 2026-06-08

> 检索触发时间：2026-06-08T22:01:41Z（UTC）  
> 本地 CLI 实测目录：`/workspace/tools`

## 今日一句话结论

| 板块 | 一句话结论 |
|------|-----------|
| **Claude Code** | v2.1.169 已装；6 月初密集发布 fallbackModel、ultracode 触发词、跨会话消息加固与 Loop Engineering 范式讨论，长时 Agent 从「写 Prompt」转向「写循环」。 |
| **Cursor** | 6/5 浏览器 Design Mode 支持多选元素与语音输入；6/4 SDK 发布 customTools、autoReview、JSONL 存储与无限嵌套 subagent。 |
| **Codex** | npm 稳定版 0.137.0；GitHub 今日预发布 0.138.0-alpha.8；6/4 大版本 alpha.1 带来 multi-agent v2、云托管 config bundle、插件 JSON 输出与企业月额度展示。 |
| **国内综述** | 阿里 Qwen Code v0.17.1 零配置 Computer Use + 飞书通道；深圳 AI 创业大赛今日启动报名；蚂蚁 AMP 智能体跨境支付协议获媒体集中报道。 |
| **媒体透镜** | **共识**：编程 Agent 正从 Prompt 工程升级为 Loop/飞轮工程；**分歧**：虎嗅强调 token 成本门槛，36氪/InfoQ 强调企业 Spec Driven 与评测闭环。 |

## 国内厂商一句话结论表

| 厂商/产品 | 今日结论 |
|-----------|---------|
| 阿里通义/Qwen Code | **有更新（6/4 周报，v0.17.0–0.17.1）**：内置 Computer Use、飞书 Channel、压缩引擎重写；本地实测 `qwen` 0.17.1 ✅ |
| 百度文心/Comate | 今日无公开更新（检索 2026-06-08，官网/changelog 无 6/8 条目） |
| 腾讯混元/CodeBuddy | 今日无公开更新 |
| 字节豆包/Trae | Trae 最近更新 6/1（浏览器选元素）；今日无新 changelog |
| 智谱 GLM/CodeGeeX | 今日无公开更新 |
| 月之暗面 Kimi | 今日无公开更新 |
| DeepSeek | 无 6/8 官方 changelog；6 月初媒体持续讨论 V4 融资约 74 亿美元 |
| 讯飞星火/iFlyCode | 今日无公开更新 |
| 华为盘古/CodeArts | 今日无公开更新 |
| MiniMax/商汤/天工/零一/面壁 | 今日无公开更新 |
| **蚂蚁 AMP 智能体支付** | **6/8 量子位等报道**：海外 AMP 协议上线，KYA 认证 + AgentSafePay |

## 媒体行业透镜一句话

- **共识**：Loop Engineering / Feedback Loop 将取代「单次完美 Prompt」，Coding Agent 进入「调系统」阶段（虎嗅 6/8、InfoQ QCon 议题、36氪 Agent 指南）。
- **最大分歧**：虎嗅认为普通开发者受 token 预算限制难以落地 Loops；36氪/InfoQ 侧更重企业级 Spec Driven、Benchmark 与私有化平台（华为码道、网易 CodeWave）。
- 详见 [`china-media.md`](./china-media.md) 的「今日媒体行业透镜」。

## 本地实测摘要

| 工具 | 版本 | 命令 | 结果 |
|------|------|------|------|
| Claude Code | 2.1.169 | `claude --version && claude --help` | ✅ 安装成功；无 API Key 未跑推理 |
| Codex | 0.137.0 | `codex --version && codex doctor && codex features list` | ✅ CLI 正常；auth 缺失 ⚠️；WebSocket 401（无凭证） |
| Qwen Code | 0.17.1 | `qwen --version && qwen --help` | ✅ 安装成功；未配置 DashScope Key 未跑推理 |

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest @qwen-code/qwen-code@latest
./node_modules/.bin/claude --version    # 2.1.169
./node_modules/.bin/codex --version       # codex-cli 0.137.0
./node_modules/.bin/qwen --version        # 0.17.1
```

## 文件导航

| 文件 | 内容 |
|------|------|
| [`claude-code.md`](./claude-code.md) | fallbackModel、ultracode、Loops、版本护栏、跨会话安全 |
| [`cursor.md`](./cursor.md) | Design Mode 语音/多选、SDK customTools/autoReview/JSONL/nested subagents |
| [`codex.md`](./codex.md) | 0.138.0-alpha 系列、multi-agent v2、插件与企业 config bundle |
| [`china-ai.md`](./china-ai.md) | Qwen Code、蚂蚁 AMP、DeepSeek 融资、厂商轮询表 |
| [`china-media.md`](./china-media.md) | 量子位/虎嗅/36氪/InfoQ/晚点等 8+ 源行业判断 |
| [`industry.md`](./industry.md) | 五角大楼 AI 合同、Anthropic IPO、微软 Build、Loop 范式 |

## 交叉索引

- **Loop Engineering**：`claude-code.md` ↔ `china-media.md`（虎嗅 6/8）↔ `industry.md`
- **Agent 商业化支付**：`china-ai.md`（蚂蚁 AMP）↔ `china-media.md`（量子位）
- **企业 Coding Agent**：`china-media.md`（InfoQ 华为码道/网易 CodeWave）↔ `cursor.md`（Enterprise Organizations）
