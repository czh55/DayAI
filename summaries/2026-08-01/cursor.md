# Cursor 每日技术文档 — 2026-08-01

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor iPad Changelog](https://cursor.com/changelog/ipad)、[Cursor Start 公告](https://cursor.com/changelog/cursor-start)、[Cursor Router 公告](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)、[The New Stack《AI coding tool stack》](https://thenewstack.io/ai-coding-tool-stack/)

## 今日综述

2026 年 8 月 1 日 Cursor **官方 Changelog 无新条目**。7/29 **Cursor for iPad 全付费开放**、**Inbox**、**完整 PR Review** 进入第 **4** 日；7/28 **Cursor Start** 印度 ₹649/月进入第 **5** 日；**Cursor Router**（7/22）第 **11** 日，今日无 Router 变更。

行业侧 [The New Stack](https://thenewstack.io/ai-coding-tool-stack/) 描述可组合栈：**Cursor** 编排、**Claude Code/Codex** 执行、**codex-plugin-cc** 审查——见 [`industry.md`](./industry.md)。竞品 8/1 无新版本。本地 ⚠️ 未实测。

---

## 特性一：iPad 全付费开放 + Inbox / PR Review——第 4 日观察

### 是什么（机制说明）

7/29 移动端能力，8/1 第 **4** 日无修订：**iPad 大屏**（全付费、多 Chat 监视、Split View、Pencil 标注）；**Inbox** 三区队列；**完整 PR Review**（Comments/Checks/Approvals/Merge/Agent 联动）。

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
5. **第 4 日**：记录 beta 稳定性

### 命令与配置示例

```bash
cursor --version && cursor auth status
cursor agent run --cloud "Fix auth bug and open PR"
```

```json
{ "mobile": { "daySinceLaunch": 4 }, "inbox": { "sections": ["in_progress", "needs_attention", "in_review"] } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 桌面 / iPad | ⚠️ 未实测（Cloud Agent 无 GUI / 无 iOS） |
| Changelog 8/1 | ✅ 无新条目（7/29 最新） |

### 问题与解决方案

**Inbox 为空**：确认活跃 Agent 或 open PR。**无法 Merge**：检查分支保护。**布局仍为手机版**：更新 App。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ 全付费、Inbox、full PR |
| The New Stack | ✅ 移动 PR 闭环契合编排可视化 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro + iPad | 第 4 日验证 Inbox 稳定性 |
| Reviewer | Inbox 替代碎片通知 |
| Free 用户 | 无法使用，评估升级 |

---

## 特性二：Cursor Start 印度计划第 5 日观察（₹649/月）

### 是什么（机制说明）

7/28 上线，8/1 第 **5** 日。印度专属 **₹649/月**（UPI/卡、INR），须物理位于印度。

**包含**：Grok 4.5 + Composer、Cloud Agent、iOS/iPad、Plugins/MCP/hooks/skills。

**不包含**：Auto、**Router**（第 11 日仍不可用）、Bugbot、OpenAI/Anthropic、SDK。

### 适用场景

- **适合**：印度开发者日常 Agent、UPI 支付、移动审查闭环
- **不适合**：需 Claude/GPT、Router、Bugbot

### 前置条件

物理位于印度；Dashboard 选 Start；有效订阅。

### 详细使用步骤（业务用户）

1. signup 选 Start 付 ₹649 → 桌面 Grok 4.5/Composer
2. iPad/iPhone Inbox + PR Review 移动闭环
3. 需 Router/Claude 升级 Pro；**第 5 日**评估日常闭环

### 命令与配置示例

```bash
cursor chat --model composer "Implement feature X"
# Start 不可用：cursor chat --model auto
```

```json
{ "plan": "start", "price_inr": 649, "daySinceLaunch": 5, "excluded": ["auto", "router"] }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Start / iPad | ⚠️ 未实测（非印度 IP） |
| Changelog 8/1 | ✅ 无 Start 新条目 |

### 问题与解决方案

**VPN 无法订阅**：须印度 IP。**无法 Auto**：设计如此，升级 Pro。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog cursor-start | ✅ ₹649、包含项 |
| 7/31 cursor.md 第 4 日 | ✅ 日序递增 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 印度个人开发者 | Start + 移动端高性价比 |
| 需 Router 用户 | 须 Pro |

---

## 特性三：Cursor Router 第 11 日观察（7/22，无变更）

### 是什么（机制说明）

7/22 发布，Auto mode **Intelligence / Balance / Cost** 三档路由。8/1 第 **11** 日无更新。Start **不可用**。

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
2. Teams Admin 设团队默认；**第 11 日**观察账单

### 命令与配置示例

```bash
cursor chat --model auto "Refactor auth module"
```

```json
{ "router": { "daySinceLaunch": 11, "startExcluded": true } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 8/1 | ✅ 无 Router 新条目 |

### 问题与解决方案

**Auto 不可用**：确认非 Start。**路由不符预期**：切 Intelligence 或手动指定模型。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/22 | ✅ 三档定义 |
| industry.md 8/1 | ✅ Router 为企业成本管控标配 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro 用户 | 默认 Balance，复杂切 Intelligence |
| Start 用户 | 用 Grok 4.5 / Composer |

---

## 特性四：可组合栈中的 Cursor 编排层角色（The New Stack）

### 是什么（机制说明）

[The New Stack](https://thenewstack.io/ai-coding-tool-stack/) 描述三层自发叠用栈：

| 层级 | 工具 | 职责 |
|------|------|------|
| 编排层 | **Cursor** | 并行 Agent、IDE 可视化、移动 Inbox/PR、Cloud Agent |
| 执行层 | Claude Code / Codex CLI | 终端写码、测试、开 PR |
| 审查层 | `codex-plugin-cc` | `/codex:review`、adversarial-review、review gate |

OpenAI 向 Claude Code ship 官方 Codex 插件，「互斥竞争」叙事松动。Cursor 7/29 移动端即编排层 **移动可视化前端**。

### 适用场景

- **适合**：不愿二选一、需 IDE 编排 + 终端执行 + 独立审查
- **不适合**：预算有限、小项目单工具即可

### 前置条件

Cursor 付费；Claude Code 或 Codex CLI + API Key；可选 `codex-plugin-cc`；各层边界清晰，避免三 Agent 改同一分支。

### 详细使用步骤（业务用户）

1. Cursor 启动 Cloud Agent 监视 → 复杂任务交 `claude`/`codex`
2. `/codex:review` 审查 → iPad Inbox merge
3. Router 控制编排层成本

### 命令与配置示例

```bash
cursor agent run --cloud "Scaffold auth and open PR"
claude "Implement edge cases"
# Claude Code 内：/codex:review
```

```json
{ "stack": { "orchestration": "cursor", "execution": ["claude-code", "codex"], "review": "codex-plugin-cc" } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor / iPad | ⚠️ 未实测 |
| Claude Code 2.1.220 | ✅ `--version` 正常 |
| Codex 0.146.0 / plugin | ⚠️ 未实测叠用 |

### 问题与解决方案

**上下文割裂**：定义层间输入/输出契约。**成本高**：Router Cost + 低成本后端。**分支冲突**：编排层锁定分支。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| The New Stack 8/1 | ✅ 三层栈、Cursor 编排 |
| china-media.md | ✅ 与 36氪「Codex 反超」形成分歧 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | Cursor 日常 + Codex 审查 |
| 企业 Tech Lead | 定义编排/执行/审查边界 |
| 预算敏感 | 评估叠用 ROI |

---

## 特性五：Cloud Agent Hooks 对话级控制（3.11）

### 是什么（机制说明）

3.11（7/10）**对话级 Hooks**，8/1 无新类型。在可组合栈中 hooks 是编排层 **合规护栏**。

| Hook | 用途 |
|------|------|
| `beforeSubmitPrompt` | 拦截/修改 prompt |
| `afterAgentResponse` | 观察输出 |
| `subagentStart` | 控制子 Agent |
| `stop` / compaction | 自纠正、会话压缩 |

配置于 Dashboard 或 `.cursor/hooks.json`，结合 `permissions.json`。

### 适用场景

- **适合**：企业审计、自动化流水线（DayAI）、PII 过滤
- **不适合**：无合规需求个人用户；本地 Agent（部分 hooks 仅 Cloud）

### 前置条件

Teams/Enterprise 或含 hooks 计划（Start 含）；Cloud Agent 模式。

### 详细使用步骤（业务用户）

1. Dashboard 或 `.cursor/hooks.json` 配置
2. `beforeSubmitPrompt` 过滤 PII；`afterAgentResponse` 审计
3. `permissions.json` 限写入；可组合栈仅约束 Cursor 层

### 命令与配置示例

```json
{
  "beforeSubmitPrompt": [{ "command": "node scripts/filter-pii.js" }],
  "afterAgentResponse": [{ "command": "node scripts/audit-log.js" }]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Hooks 触发 | ⚠️ 未实测（无 Dashboard GUI） |
| Cloud Agent | ✅ 本 DayAI 运行于 Cloud Agent |
| Changelog 8/1 | ✅ 无 hooks 新条目 |

### 问题与解决方案

**Hook 未触发**：确认 Cloud Agent 模式。**权限不足**：Teams Admin 启用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ 对话级 hooks |
| DayAI Cloud Agent | ✅ 无人值守流水线印证价值 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | hooks 实现审计与 PII 过滤 |
| 可组合栈用户 | Cursor hooks 管编排层，执行层另设 gate |
| 个人开发者 | 了解即可 |

---

## 版本对照表

| 日期 (UTC) | 版本/事件 | 要点 |
|------------|-----------|------|
| **2026-08-01** | **无新 Changelog** | iPad/Inbox/PR 第 4 日；Start 第 5 日；Router 第 11 日 |
| 2026-07-29 | Cursor for iPad | 全付费；Inbox；完整 PR Review（**第 4 日**） |
| 2026-07-28 | Cursor Start | 印度 ₹649/月（**第 5 日**） |
| 2026-07-22 | Cursor Router | 三档优化（**第 11 日**） |
| 2026-07-10 | 3.11 | Cloud Agent hooks |
| 2026-06-29 | iOS beta | iPhone 远程操控 |

## 今日研究员结论

Cursor 8/1 **无新 Changelog**，移动工作流第 4 日 + 可组合栈叙事交汇。[The New Stack](https://thenewstack.io/ai-coding-tool-stack/) 定位 Cursor 为 **编排层**（多 Agent、IDE 可视化、移动 PR 闭环），Claude Code/Codex 为执行/审查层。7/29 iPad + Inbox 是编排移动前端；**hooks** 是企业合规护栏。Start 第 5 日、Router 第 11 日无变更。

竞争对照：[Claude Code 冻结](./claude-code.md)、[Codex stable](./codex.md)。本地 ⚠️ 未实测；建议 iPad 用户验证 Inbox，叠用栈用户定义层间边界。
