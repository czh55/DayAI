# Cursor 每日技术文档 — 2026-08-02

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor iPad Changelog](https://cursor.com/changelog/ipad)、[Cursor Start 公告](https://cursor.com/changelog/cursor-start)、[Okta Enterprise AI Index](https://www.okta.com/newsroom/articles/the-okta-enterprise-ai-index/)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 8 月 2 日 Cursor **官方 Changelog 无新条目**。7/29 **Cursor for iPad 全付费开放**、**Inbox**、**完整 PR Review** 进入第 **5** 日；7/28 **Cursor Start** 印度 ₹649/月进入第 **6** 日；**Cursor Router**（7/22）第 **12** 日，今日无 Router 变更。

**Okta Enterprise AI Index**（8/1 发布）将 Cursor 列为 **AI-native disruptors** Top 3（增速指数 42.4，仅次于 Anthropic 100 与 OpenAI 66.9），印证 Cursor 在企业采购中的「专精 Agent 编排」定位。行业侧 [industry.md](./industry.md) 描述可组合栈：**Cursor** 编排、**Claude Code/Codex** 执行、**codex-plugin-cc** 审查。竞品 8/2 无新版本。本地 ⚠️ 未实测。

---

## 特性一：iPad 全付费开放 + Inbox / PR Review——第 5 日观察

### 是什么（机制说明）

7/29 移动端能力，8/2 第 **5** 日无修订：**iPad 大屏**（全付费、多 Chat 监视、Split View、Pencil 标注）；**Inbox** 三区队列；**完整 PR Review**（Comments/Checks/Approvals/Merge/Agent 联动）。Okta 指数将 Cursor 与 Claude Code 并列为企业增速 Top 3，iPad 移动 PR 闭环是编排层「随时随地审查」的关键能力。

### 适用场景

- **适合**：iPad 通勤审查、多 Agent 监视、PR 待审移动端 approve/merge
- **不适合**：完整 IDE 编辑、大型 monorepo IDE 级浏览、Free 用户

### 前置条件

付费订阅；iOS/iPad App（7/29+）；同账号登录；SCM 已连接；merge 权限；iOS 26.0+ public beta。

### 详细使用步骤（业务用户）

1. 确认付费计划 → 更新 App 至 7/29+
2. Inbox 查看三区 → 跳转 Chat/PR
3. Split View：左 Review、右 Chat
4. PR：Comments → Checks → Approvals → Merge
5. **第 5 日**：记录 beta 稳定性与 Inbox 队列延迟

### 命令与配置示例

```bash
cursor --version && cursor auth status
cursor agent run --cloud "Fix auth bug and open PR"
```

```json
{ "mobile": { "daySinceLaunch": 5 }, "inbox": { "sections": ["in_progress", "needs_attention", "in_review"] } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 桌面 / iPad | ⚠️ 未实测（Cloud Agent 无 GUI / 无 iOS） |
| Changelog 8/2 | ✅ 无新条目（7/29 最新） |

### 问题与解决方案

**Inbox 为空**：确认活跃 Agent 或 open PR。**无法 Merge**：检查分支保护。**布局仍为手机版**：更新 App。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ 全付费、Inbox、full PR |
| Okta Index 8/1 | ✅ Cursor 增速 Top 3 |
| 昨日 8/1 | ✅ 第 4→5 日 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro + iPad | 第 5 日验证 Inbox 稳定性 |
| Reviewer | Inbox 替代碎片通知 |
| Free 用户 | 无法使用，评估升级 |

---

## 特性二：Cursor Start 印度计划第 6 日观察（₹649/月）

### 是什么（机制说明）

7/28 上线，8/2 第 **6** 日。印度专属 **₹649/月**（UPI/卡、INR），须物理位于印度。

**包含**：Grok 4.5 + Composer、Cloud Agent、iOS/iPad、Plugins/MCP/hooks/skills。

**不包含**：Auto、**Router**（第 12 日仍不可用）、Bugbot、OpenAI/Anthropic、SDK。

### 适用场景

- **适合**：印度开发者日常 Agent、UPI 支付、移动审查闭环
- **不适合**：需 Claude/GPT、Router、Bugbot

### 前置条件

物理位于印度；Dashboard 选 Start；有效订阅。

### 详细使用步骤（业务用户）

1. signup 选 Start 付 ₹649 → 桌面 Grok 4.5/Composer
2. iPad/iPhone Inbox + PR Review 移动闭环
3. 需 Router/Claude 升级 Pro；**第 6 日**评估日常闭环

### 命令与配置示例

```bash
cursor chat --model composer "Implement feature X"
# Start 不可用：cursor chat --model auto
```

```json
{ "plan": "start", "price_inr": 649, "daySinceLaunch": 6, "excluded": ["auto", "router"] }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Start / iPad | ⚠️ 未实测（非印度 IP） |
| Changelog 8/2 | ✅ 无 Start 新条目 |

### 问题与解决方案

**VPN 无法订阅**：须印度 IP。**无法 Auto**：设计如此，升级 Pro。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog cursor-start | ✅ ₹649、包含项 |
| 昨日 8/1 第 5 日 | ✅ 日序递增 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 印度个人开发者 | Start + 移动端高性价比 |
| 需 Router 用户 | 须 Pro |

---

## 特性三：Cursor Router 第 12 日观察（7/22，无变更）

### 是什么（机制说明）

7/22 发布，Auto mode **Intelligence / Balance / Cost** 三档路由。8/2 第 **12** 日无更新。Start **不可用**。Okta 指数显示企业多平台采购并存，Router 成为 Pro 用户控制 Agent 成本的标配工具。

| 档位 | 策略 | 适用 |
|------|------|------|
| Intelligence | 优先最强模型 | 复杂推理 |
| Balance | 质量成本平衡（默认） | 日常开发 |
| Cost | 优先低成本 | 批量任务 |

### 适用场景

- **适合**：Pro/Teams 用户 Auto 选模型、企业控成本
- **不适合**：Start 用户、需固定单一模型合规场景

### 前置条件

Pro/Pro+/Ultra/Teams/Enterprise；**不含** Start。

### 详细使用步骤（业务用户）

1. Settings → Auto mode → 设档位
2. Teams Admin 设团队默认；**第 12 日**观察账单与 Uber 式预算透支风险（[industry.md](./industry.md)）

### 命令与配置示例

```bash
cursor chat --model auto "Refactor auth module"
```

```json
{ "router": { "daySinceLaunch": 12, "startExcluded": true } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 8/2 | ✅ 无 Router 新条目 |

### 问题与解决方案

**Auto 不可用**：确认非 Start。**路由不符预期**：切 Intelligence 或手动指定模型。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/22 | ✅ 三档定义 |
| Okta 多平台采购 | ✅ Router 控成本需求上升 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro 用户 | 默认 Balance，复杂切 Intelligence |
| Start 用户 | 用 Grok 4.5 / Composer |

---

## 特性四：Okta 指数中的 Cursor 企业定位——增速 Top 3 与多平台采购

### 是什么（机制说明）

Okta Enterprise AI Index（8/1）分析 2 万+ 组织 SSO 数据，将 Cursor 列为 **AI-native disruptors**（4 年内企业客户增长超 4 倍），增速指数 **42.4**（Anthropic 100、OpenAI 66.9）。报告时间线标注 **Cursor 1.0 GA（2025/6）** 为 Agentic 范式关键节点。同时强调：**多数企业同时使用 AI-native 专精工具与传统套件增强**，非赢家通吃。

| 维度 | Cursor | Anthropic | M365 |
|------|--------|-----------|------|
| 增速指数 | 42.4 | 100 | —（incumbent） |
| 定位 | AI-native 编排 | AI-native Agent | AI-enhanced 办公 |
| 装机量 | 远低于 M365 | 远低于 M365 | 霸主 |

### 适用场景

- **适合**：向企业推销 Cursor 的 Tech Lead、评估团队工具栈的架构师
- **不适合**：期望 Cursor 单独取代 M365/GWS 全员 AI 的场景

### 前置条件

理解 Okta 方法论（SSO 访问数据，非全市场）；Cursor 付费订阅

### 详细使用步骤（业务用户）

1. 向 IT 采购说明：Cursor 是「专精 Agent 编排」，非全员办公套件替代
2. 定义与 M365 Copilot / Claude Code 的分工边界
3. 用 Router Cost 档位控制 Agent 预算，避免 Uber 式透支

### 命令与配置示例

```bash
# 企业评估：对比 Cursor Cloud Agent vs Claude Code 终端执行
cursor agent run --cloud "Scaffold feature"
claude -p "Implement edge cases in terminal"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Okta 报告 | ✅ 8/1 官方发布 |
| Cursor 增速 Top 3 | ✅ 经 The News / Digital Today 交叉验证 |
| 企业部署实测 | ⚠️ 未实测 |

### 问题与解决方案

**IT 质疑「为何不买 M365 Copilot」**：Okta 数据证明企业双轨采购是常态。**预算审批难**：用 Router Cost + 用量上限论证 ROI。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Okta 官方报告 | ✅ Cursor 增速 Top 3 |
| The News 8/1 | ✅ 跟进报道 |
| industry.md | ✅ 多平台并存叙事 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 Tech Lead | 用 Okta 数据论证 Cursor 专精定位 |
| 个人开发者 | 了解企业采购趋势，提前熟悉多工具栈 |
| 预算审批者 | 关注 Router 控成本 + 用量上限 |

---

## 特性五：可组合栈中的 Cursor 编排层角色（延续 + Okta 印证）

### 是什么（机制说明）

[The New Stack](https://thenewstack.io/ai-coding-tool-stack/) 描述三层自发叠用栈，Okta 8/1 指数从企业部署行为侧印证：

| 层级 | 工具 | 职责 |
|------|------|------|
| 编排层 | **Cursor** | 并行 Agent、IDE 可视化、移动 Inbox/PR、Cloud Agent |
| 执行层 | Claude Code / Codex CLI | 终端写码、测试、开 PR |
| 审查层 | `codex-plugin-cc` | `/codex:review`、adversarial-review、review gate |

Okta 数据显示企业同时采购 Anthropic（Claude Code）+ Cursor + M365/GWS，与「可组合栈」高度一致。

### 适用场景

- **适合**：不愿二选一、需 IDE 编排 + 终端执行 + 独立审查
- **不适合**：预算有限、小项目单工具即可

### 前置条件

Cursor 付费；Claude Code 或 Codex CLI + API Key；可选 `codex-plugin-cc`；各层边界清晰

### 详细使用步骤（业务用户）

1. Cursor 启动 Cloud Agent 监视 → 复杂任务交 `claude`/`codex`
2. `/codex:review` 审查 → iPad Inbox merge
3. Router 控制编排层成本；M365 Copilot 覆盖非编码办公场景

### 命令与配置示例

```bash
cursor agent run --cloud "Scaffold auth and open PR"
claude "Implement edge cases"
# Claude Code 内：/codex:review
```

```json
{ "stack": { "orchestration": "cursor", "execution": ["claude-code", "codex"], "review": "codex-plugin-cc", "office": "m365" } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor / iPad | ⚠️ 未实测 |
| Claude Code 2.1.220 | ✅ `--version` 正常 |
| Codex 0.146.0 / plugin | ⚠️ 未实测叠用 |
| Okta 多平台数据 | ✅ 企业双轨采购印证 |

### 问题与解决方案

**上下文割裂**：定义层间输入/输出契约。**成本高**：Router Cost + 低成本后端 + 预算上限。**分支冲突**：编排层锁定分支。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| The New Stack | ✅ 三层栈、Cursor 编排 |
| Okta Index 8/1 | ✅ 多平台并存 |
| china-media.md | ✅ 增速 vs 装机量分歧 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | Cursor 日常 + Codex 审查 |
| 企业 Tech Lead | 定义编排/执行/审查/办公四层边界 |
| 预算敏感 | 评估叠用 ROI，设用量上限 |

---

## 版本对照表

| 日期 (UTC) | 版本/事件 | 要点 |
|------------|-----------|------|
| **2026-08-02** | **无新 Changelog** | iPad/Inbox/PR 第 5 日；Start 第 6 日；Router 第 12 日；Okta 增速 Top 3 |
| 2026-07-29 | Cursor for iPad | 全付费；Inbox；完整 PR Review（**第 5 日**） |
| 2026-07-28 | Cursor Start | 印度 ₹649/月（**第 6 日**） |
| 2026-07-22 | Cursor Router | 三档优化（**第 12 日**） |
| 2026-07-10 | 3.11 | Cloud Agent hooks |
| 2026-06-29 | iOS beta | iPhone 远程操控 |

## 今日研究员结论

Cursor 8/2 **无新 Changelog**，移动工作流第 5 日。**Okta Enterprise AI Index**（8/1）将 Cursor 定位为 **AI-native 增速 Top 3**（指数 42.4），印证其在企业「专精 Agent 编排」中的采购地位，同时揭示装机量仍远低于 M365。可组合栈叙事（[industry.md](./industry.md)）获 Okta 多平台采购数据侧证。7/29 iPad + Inbox 是编排移动前端；Router 第 12 日无变更。

竞争对照：[Claude Code 冻结第 9 日](./claude-code.md)、[Codex stable 第 5 日](./codex.md)。本地 ⚠️ 未实测；建议 iPad 用户验证 Inbox，企业用户用 Okta 数据论证采购策略。昨日见 [../2026-08-01/cursor.md](../2026-08-01/cursor.md)。
