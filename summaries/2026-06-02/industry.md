# AI 行业大事件 — 2026-06-02

## 1. OpenAI Codex 全面进军企业知识工作

**时间**：2026-06-02  
**来源**：[Codex for every role, tool, and workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)

OpenAI 宣布 Codex 周活用户超 500 万，其中非开发者（分析师、营销、投行等）占约 20%，且增速是开发者的 3 倍以上。同日发布三大能力：

- **Sites**：将分析/计划转为可分享的交互式 Web 应用（仪表盘、场景规划器等）
- **Annotations**：对文档、表格、幻灯片的局部选中后精准修改
- **6 个角色插件**：聚合 62 个企业应用、110 项技能（Snowflake、Salesforce、Figma 等）

**利弊分析**：
- 利：降低非技术团队使用 Agent 的门槛，Codex 成为「编排层」而非替代 SaaS
- 弊：Business/Enterprise 门槛高；Sites 托管在 OpenAI，数据合规需企业评估

---

## 2. Anthropic 秘密递交 IPO S-1

**时间**：2026-06-01  
**来源**：[CNBC](https://www.cnbc.com/2026/06/01/anthropic-ipo-s1-prospectus.html)

Anthropic 向 SEC 秘密提交 S-1，抢在 OpenAI（预计数周内提交）之前。关键数据：

- 估值约 **9650 亿美元**（5 月 Series H 融资 650 亿美元）
- 年收入 run rate 约 **470 亿美元**（2025 年为 100 亿）
- Claude Code 是增长核心产品之一

**影响**：AI 上市潮（Anthropic、OpenAI、SpaceX）合计市值或接近 3 万亿美元。

---

## 3. 特朗普签署 AI 模型预发布审查行政令

**时间**：2026-06-02  
**来源**：[The Verge](https://www.theverge.com/policy/941775/trump-ai-executive-order)

建立「自愿框架」，允许 AI 公司在公开发布前最多 30 天向联邦政府（CAISI）共享前沿模型以供安全评估。Google、Microsoft、xAI 上月已同意；OpenAI、Anthropic 2024 年曾在拜登政府下有过类似安排。

**注意**：行政令明确不构成强制许可或预 clearance，但反映监管态度从完全放手转向有限 oversight。

---

## 4. Claude Code v2.1.160 当日发布

**时间**：2026-06-02 02:10 UTC  
**来源**：[GitHub Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.160)

同日发布的维护版本，重点为安全加固与 `workflow` → `ultracode` 触发词迁移。详见 [claude-code.md](./claude-code.md)。

---

## 5. Microsoft Build 2026（持续）

Build 2026 于 5 月下旬开幕，微软强调自研 MAI 模型、Project Polaris 多 Agent 编排、Copilot 深度集成。与今日 Codex/Claude Code 更新形成「三巨头」Agent 平台竞争格局。

---

## 行业趋势小结

```mermaid
flowchart LR
    A[开发者 Agent] --> B[知识工作者 Agent]
    B --> C[Sites / Canvas / 插件生态]
    C --> D[IPO / 监管 / 算力军备]
```

| 趋势 | 代表动作 |
|------|----------|
| Agent 从写代码到做业务 | Codex Sites、Cursor Canvases |
| 并行编排成为标配 | Claude ultracode、Codex multi_agent |
| 安全与合规前置 | Claude 启动文件确认、特朗普 EO |
| 资本化加速 | Anthropic S-1、OpenAI 跟进 |
