# 行业宏观 — 2026-07-20

> 覆盖触发日前 24–72 小时重大事件｜每项含「对普通开发者意味着什么」

---

## 1. Claude Fable 5 分层定价今日正式生效

**发生了什么**

2026 年 7 月 20 日 00:00 PT（北京时间 7/20 15:00），Anthropic 将 7/18 宣布的 **Fable 5 永久分层方案** 正式落地。这标志着持续五周、三次延期的「促销窗口焦虑」结束，付费用户被明确划分为两个阵营：

- **Max / Team Premium**：Fable 5 永久包含在订阅内，占每周额度上限的 **50%**
- **Pro / Team Standard**：Fable 5 不再内置于周额度，需通过 usage credits 使用；一次性发放 **$100** 使用额度（申领截止 8/2 PT，过期 9/17 PT）
- **API / Enterprise 消费型**：始终按 API 计费，不受影响

同日，自 5/13 起延续的 Claude Code 每周用量 **+50%** 加碼措施也一并结束。TechTimes（7/20）指出，Max 用户面临「双重压缩」：标准周限额先回落，再叠加 Fable 5 的 50% cap。

Fable 5 定价维持：输入 $10/MTok、输出 $50/MTok——Anthropic 产品线中输出单价最高的 GA 模型。PCWorld（7/20）报道部分 Pro 用户尚未看到 $100 credits 到账，Anthropic 未公布具体发放时间表。

**官方来源**：[@claudeai 7/17 分层公告](https://x.com/claudeai)｜[TechTimes 7/20 分层生效](https://www.techtimes.com/articles/320999/20260720/claude-fable-5-billing-splits-today-max-gets-it-free-pro-pays-per-token.htm)｜[PCWorld 7/20 报道](https://www.pcworld.com/article/3194944/fable-will-stay-in-claude-plans-but-not-for-everyone.html)｜[The New Stack 7/20 分析](https://thenewstack.io/fable-5-permanent-subscription-access/)

**对普通开发者意味着什么**

- **Pro 用户**：今日起 Fable 5 每次调用消耗 credits；$100 额度约等于 200 万 output tokens，一次中等规模自主编程任务即可耗尽
- **Max 用户**：Fable 5 永久保留但 50% cap + 周限额回落，需重新评估任务分配策略
- **观望者**：若主要依赖 Fable 5 重度编程，今日是评估 Codex/GPT-5.6 Sol 分流成本的节点

---

## 2. OpenAI Codex 发布 0.145.0-alpha.25，5h 限额移除仍生效

**发生了什么**

2026-07-20 18:51 UTC，OpenAI 在 GitHub 发布 Codex 预发布版 **0.145.0-alpha.25**（commit `37222ab`）。npm `@latest` 仍指向稳定版 **0.144.6**（7/18 发布）。alpha.25 release notes 仅标注 "Release 0.145.0-alpha.25"，无详细 changelog 条目。

与此同时，OpenAI 产品负责人 Tibo 于 7/12 宣布的 **5 小时滚动限额临时移除** 仍生效（期限未知）。虎嗅（7/15）报道 Codex 周活已突破 **900 万**，日增超 100 万。在 Fable 5 分层今日落地的背景下，Codex 的「无 5h 限制」策略成为承接 Pro 用户分流的关键筹码。

**官方来源**：[Codex GitHub 0.145.0-alpha.25](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.25)｜[虎嗅 Codex 900 万用户](https://www.huxiu.com/article/4875744.html)｜[量子位额度博弈](https://www.qbitai.com/2026/07/448139.html)

**对普通开发者意味着什么**

- alpha.25 为预发布通道，生产环境仍建议锁定 0.144.6
- ChatGPT Pro 用户若 Fable 5 credits 消耗过快，Codex 5h 限额移除是当前最直接的替代方案
- 关注 OpenAI 是否在 Fable 5 分层落地后恢复 5h 限制

---

## 3. DeepSeek 旧 API 模型名弃用倒计时 4 天

**发生了什么**

DeepSeek 官方 API Change Log 明确：`deepseek-chat` 与 `deepseek-reasoner` 将于 **2026-07-24 15:59 UTC**（北京时间 7/24 23:59）完全停用。截止后带旧名的请求将直接返回错误，**不会自动重定向**。

自 2026-04-24 V4 Preview 起，旧名已是 `deepseek-v4-flash` 的别名。迁移路径：

- `deepseek-chat` → `deepseek-v4-flash`（非思考模式）
- `deepseek-reasoner` → `deepseek-v4-flash` + `thinking: {"type": "enabled"}`

Developers Digest（7/20）强调：若自 4 月以来输出质量已变化，说明底层模型早已切换，7/24 只是名字退役的硬截止。

**官方来源**：[DeepSeek API Docs](https://api-docs.deepseek.com/)｜[Developers Digest 迁移指南](https://www.developersdigest.tech/blog/deepseek-chat-to-v4-migration-guide)

**对普通开发者意味着什么**

- 立即在代码库中 `grep deepseek-chat` 和 `deepseek-reasoner`
- `base_url` 与 API Key 不变，仅改 `model` 参数
- 生产环境务必在 7/24 前完成 staging 验证

---

## 4. Kimi K3 发布第 4 日，开源倒计时 7 天

**发生了什么**

月之暗面于 7/17 发布的 **Kimi K3**（2.8 万亿参数、100 万 token 上下文、KDA 混合线性注意力）进入发布第 4 日。官方承认整体仍略逊于 Fable 5 和 GPT-5.6 Sol，但在编程任务上已超越 Claude Opus 4.8 和 GPT 5.5。完整模型权重计划于 **7/27 前** 向全球开源。

K3 已可通过 kimi.com、Kimi App、Kimi Work 桌面端、Kimi Code 和 Kimi API 使用。Cursor Composer 2.5 的训练基座即为 Kimi K2.5，K3 开源后可能进一步影响 Cursor 自研模型路线。

**官方来源**：[Kimi 官方博客](https://kimi.moonshot.cn/)｜[新华网 7/17 报道](http://www.xinhuanet.com/tech/20260717/da893d3a5e1b429ea79d928e02847744/c.html)｜[中央社 7/18 报道](https://www.cna.com.tw/news/aopl/202607180039.aspx)

**对普通开发者意味着什么**

- K3 API 可作为 Fable 5 credits 消耗后的低成本备选（待开源后社区评测）
- 关注 7/27 开源后 SWE-bench 等隔离评测的独立复现结果
- Cursor 用户可关注 Composer 是否跟进 K3 基座

---

## 5. Loop Engineering 持续成为跨产品工程范式

**发生了什么**

Claude Code 团队 7/17 正式定义的「循环（Loop）」四类型（回合制、/goal、/loop /schedule、proactive）持续发酵。36氪（7/17）强调 AI 编程重心从「写提示词」转向「设计会验证、会停止的循环系统」。黄仁勋 7/17 访谈（36氪转载）将 Agent Harness 称为「下一代软件公司的操作系统」，与 Cursor Cloud Agent hooks、Codex `/goal` 形成跨产品呼应。

TRAE Work 于 7/18 上线 40 万字 AI 工作知识库，将「角色设定 + 任务边界 + 自检清单」的 Prompt 方法论产品化，是国内厂商对 Loop/Harness 叙事的本土化实践。

**官方来源**：[36氪 Loop 工程文](https://36kr.com/p/3899013551245186)｜[36氪 黄仁勋 Harness 访谈](https://36kr.com/p/3898288412411264)｜[钛媒体 TRAE Work 知识库](https://www.163.com/dy/article/L24OTHLD05118O92.html)

**对普通开发者意味着什么**

- 停止条件设计、验证器（verifier）设计、token 预算控制成为新核心竞争力
- 建议从日常工作中挑选一个重复任务，设计第一个 `/goal` 或 `/loop` 循环
- 国内 TRAE Work 知识库提供了非开发者场景的 Loop 实践模板

---
