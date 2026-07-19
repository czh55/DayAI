# 行业宏观 — 2026-07-19

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Claude Fable 5 促销窗口今日截止，7/20 起分层定价落地

**发生了什么**

Anthropic 自 7 月初起三次延期 Fable 5「内置于付费方案、不扣 usage credits」的促销窗口，最终截止日为 **2026-07-19 23:59 PT**（北京时间 7/20 14:59）。同日，Claude Code 每周用量上限 **+50%** 的加碼措施也一并结束。

7 月 18 日，Anthropic 通过官方 @claudeai 账号宣布 **7 月 20 日起的永久分层方案**（官方确认，非媒体推测）：

- **Max / Team Premium**：Fable 5 永久包含在订阅内，占每周额度上限的 **50%**
- **Pro / Team Standard**：Fable 5 不再内置于周额度，需通过 usage credits 使用；一次性发放 **$100** 使用额度作为过渡
- **API / Enterprise 消费型**：始终按 API 计费，不受影响

定价维持：输入 $10/MTok、输出 $50/MTok。此次分层结束了五周内三次延期的「窗口焦虑」，但也明确划清了 Pro 与 Max 用户的 Fable 5 权益差距。

**官方来源**：[@claudeai 7/18 分层公告](https://x.com/claudeai)｜[TechTimes 7/18 报道](https://www.techtimes.com/articles/320905/20260718/claude-fable-5-ends-subscription-limbo-permanent-max-credits-only-pro.htm)｜[explainx.ai 7/18 分析](https://explainx.ai/blog/fable-5-max-team-premium-july-20-2026-subscription-return)

**对普通开发者意味着什么**

- **Pro 用户**：今日是最后享受「Fable 5 不扣 credits」的窗口；7/20 起需规划 credits 预算或切换 Sonnet 5 处理轻量任务
- **Max 用户**：Fable 5 永久保留但 50% 周额度 cap 不变，且 7/20 起 Claude Code +50% 周限额结束，实际可用量会下降
- **观望者**：若主要依赖 Fable 5 重度编程，今日是评估是否迁移至 Codex/GPT-5.6 Sol 的最后窗口

---

## 2. OpenAI Codex 周活突破 900 万，5 小时限额临时移除仍生效

**发生了什么**

据 [虎嗅 7/15 报道](https://www.huxiu.com/article/4875744.html)，GPT-5.6 与 ChatGPT Work 全面上线后，Codex 周活从 600 万快速增长至 **900 万+**，日增超 100 万。OpenAI 产品负责人 Tibo 于 7/12 宣布 **临时移除 Plus/Business/Pro 用户的 5 小时 Codex 使用限制**（期限未知），作为对 Claude Fable 5 延期的直接回应。

7/18 Codex 稳定版 **0.144.6** 发布，刷新 GPT-5.6 Sol/Terra/Luna 内置指令并修正上下文窗口为 272K tokens。Codex 与 ChatGPT Work 共享 Agent 任务额度，普通 ChatGPT 聊天仍按对话额度计算。

**官方来源**：[虎嗅 Codex 900 万用户](https://www.huxiu.com/article/4875744.html)｜[Codex GitHub 0.144.6](https://github.com/openai/codex/releases/tag/rust-v0.144.6)｜[量子位额度博弈](https://www.qbitai.com/2026/07/448139.html)

**对普通开发者意味着什么**

- Codex 已成为 OpenAI 增长最快的产品线，额度松绑策略在 Fable 5 截止前后仍具吸引力
- 若你是 ChatGPT Pro 用户且 Codex 5h 限制已移除，今日至 Fable 5 截止前是「双开」重度编程的窗口期
- 关注 OpenAI 是否恢复 5h 限制——虎嗅指出 OpenAI 未公布「活跃用户」统计口径，额度政策可能随里程碑再次调整

---

## 3. Claude Code 2.1.215 发布：Skills 自动触发行为调整

**发生了什么**

2026-07-19 02:56 UTC，Anthropic 发布 Claude Code **v2.1.215**。本次为单点行为变更：

> Claude no longer runs the `/verify` and `/code-review` skills on its own; invoke them with `/verify` or `/code-review` when you want them.

此前 Claude 可能在会话中自动触发代码验证与代码审查 skills；2.1.215 起需用户显式调用。npm `@latest` 已跟随，本地实测 `claude --version` 为 **2.1.215**。

**官方来源**：[GitHub v2.1.215 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.215)｜[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)

**对普通开发者意味着什么**

- 若你依赖 Claude 自动跑 verify/review，需改为显式输入 `/verify` 或 `/code-review`
- 可减少非预期 skill 调用带来的 token 消耗与执行时间
- 建议 CI/CD 流程中在 prompt 或 hook 中显式指定审查步骤

---

## 4. DeepSeek 旧 API 模型名弃用倒计时 5 天

**发生了什么**

DeepSeek 官方 API Change Log 明确：`deepseek-chat` 与 `deepseek-reasoner` 将于 **2026-07-24 15:59 UTC**（北京时间 7/24 23:59）完全停用。截止后带旧名的请求将直接返回错误，**不会自动重定向**。

自 2026-04-24 V4 Preview 起，旧名已是 `deepseek-v4-flash` 的别名；弃用的是「名字」而非能力。迁移路径：

- `deepseek-chat` → `deepseek-v4-flash`（非思考模式）
- `deepseek-reasoner` → `deepseek-v4-flash` + `thinking: {"type": "enabled"}`

**官方来源**：[DeepSeek API Docs](https://api-docs.deepseek.com/)｜[Developers Digest 迁移指南](https://www.developersdigest.tech/blog/deepseek-chat-to-v4-migration-guide)

**对普通开发者意味着什么**

- 立即在代码库中 `grep deepseek-chat` 和 `deepseek-reasoner`，含环境变量与配置文件
- `base_url` 与 API Key 不变，仅改 `model` 参数
- 生产环境务必在 7/24 前完成 staging 验证，官方未宣布延期

---

## 5. Loop Engineering 成为 AI 编程主流工程范式

**发生了什么**

2026-07-17，Claude Code 团队在官方博客正式定义「循环（Loop）」概念，拆出 **回合制、目标（/goal）、时间（/loop、/schedule）、主动（proactive）** 四种循环类型。36氪同日转载并强调：AI 编程重心正从「写提示词」转向「设计会验证、会停止的循环系统」。

该叙事与 Cursor Cloud Agent hooks（`beforeSubmitPrompt`、`afterAgentResponse`、`stop` 等）、Codex `/goal` 模式、Claude Code `/loops` 形成跨产品呼应。社区共识是：停止条件设计、验证器（verifier）设计、token 预算控制成为新核心竞争力。

**官方来源**：[36氪 Loop 工程文](https://36kr.com/p/3899013551245186)｜[Claude Code 官方 Loop 博客](https://www.anthropic.com/engineering)｜[Cursor 3.11 Cloud Agent hooks](https://cursor.com/changelog)

**对普通开发者意味着什么**

- 学习设计「触发条件 + 停止条件 + 验证器」三要素，而非堆砌更长 prompt
- Claude Code 用户可尝试 `/goal`（目标循环）和 `/loops`（时间循环）
- 企业团队应建立 Loop 模板库，标准化 bug 修复、代码审查、依赖升级等重复任务

---
