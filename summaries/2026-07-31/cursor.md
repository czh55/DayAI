# Cursor 每日技术文档 — 2026-07-31

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor iPad Changelog](https://cursor.com/changelog/ipad)、[Cursor Start 公告](https://cursor.com/changelog/cursor-start)、[Cursor Router 公告](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 31 日 Cursor **官方 Changelog 无新条目**。7/29 发布的 **Cursor for iPad 全付费开放**、**Inbox** 收件箱、**完整 PR Review** 进入第 **3** 日观察期；7/28 **Cursor Start** 印度 ₹649/月计划进入第 **4** 日。**Cursor Router**（7/22）第 **10** 日，今日无 Router 变更。

背景：7/29 主特性仍有效——iPad 大屏布局（多 Agent 侧边栏、Split View、完整 Diff、Apple Pencil 标注）、Bitbucket/Azure DevOps SCM、多 PR 会话、应用内团队切换。行业侧 [DeepSeek V4-Flash 正式版 API 公测](./china-ai.md) 与 [Codex 0.147.0-alpha.4 三连发](./codex.md) 形成竞品对照，Cursor 7/31 无新响应。本地 Cloud Agent 无 GUI、无 iOS 设备，桌面与移动端均 ⚠️ 未实测；本 DayAI 环境运行于 Cloud Agent，可间接验证 hooks 机制。

---

## 特性一：Cursor for iPad 全付费开放——第 3 日观察（7/29 主特性）

### 是什么（机制说明）

Cursor for iPad 是 iOS App 的 **大屏原生布局**，自 7/29 向 **所有付费计划** 开放。7/31 为第 **3** 日，无 Changelog 修订。

**覆盖计划**：Pro、Pro+、Ultra、Teams、Enterprise、**Cursor Start**（₹649/月）。**Free/Hobby 仍无法使用**移动 App。

**核心能力**：侧边栏固定多 Chat 监视 Agent；Split View（Review + Chat）；完整 diff；Inbox、PR Review、Bitbucket/Azure DevOps、多 PR、团队切换。App Store 要求 iOS 26.0+，仍处 public beta。

### 适用场景 / 前置条件

- **适合**：iPad 通勤审查 Agent 产出、多 Agent 并行监视、大屏 diff 阅读
- **不适合**：需完整 IDE 本地编辑、Free 用户
- **前置**：有效付费订阅；iPad App（7/29+）；同账号登录；SCM 已连接

### 详细使用步骤（业务用户）

1. 确认 [cursor.com/settings](https://cursor.com/settings) 为付费计划
2. App Store 安装/更新 Cursor App 至 7/29+
3. 授权通知（Agent 完成、PR 状态变更）
4. 选择仓库或 Cloud 环境，启动 Agent
5. 侧边栏固定多个 Chat 监视并行任务
6. Split View：左侧 Review、右侧 Chat
7. **第 3 日**：记录 public beta 稳定性（崩溃、同步延迟）

### 命令与配置示例

```bash
cursor --version
cursor auth status
```

```json
{
  "mobile": { "platform": "ipad", "daySinceLaunch": 3,
    "features": { "sidebarPinnedChats": true, "splitView": true, "fullDiff": true } }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面端 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| iPad App | ⚠️ 未实测（无 iOS 设备） |
| 官方 Changelog 7/31 | ✅ 无新条目（7/29 仍为最新） |

### 问题与解决方案

**需付费计划**：检查 Dashboard 订阅。**布局仍为手机版**：更新 App 至 7/29+。**Agent 不同步**：同账号登录。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro + iPad 用户 | 第 3 日验证多 Agent 监视稳定性 |
| Start 印度用户 | ₹649 已含移动端，与 Pro 同级 surface |
| Free 用户 | 无法使用；评估升级 |

---

## 特性二：Inbox 与移动端 PR 全流程 Review——第 3 日观察

### 是什么（机制说明）

7/29 为 **iPhone 与 iPad 同步新增**，7/31 第 **3** 日无变更：

**Inbox**：集中展示进行中 Agent、待处理项、审查中 PR。

**完整 PR Review**：覆盖 Comments、Checks、Approvals、Reviewer 管理、Agent 联动（解决 review comments）、Merge。官方：「从 Agent 产出到合并 PR 的整条路径随身携带」。

### 适用场景 / 前置条件

- **适合**：PR 待审不在电脑前、CI 失败需确认、Agent 开 PR 后快速 approve/merge
- **不适合**：大型 monorepo 需 IDE 级浏览、复杂冲突需本地 merge
- **前置**：付费计划 + iOS/iPad App（7/29+）；SCM 已连接；有 merge 权限

### 详细使用步骤（业务用户）

**Inbox**：打开 Inbox → 查看 In Progress / Needs Attention / In Review → 点击跳转 Chat 或 PR。

**PR Review**：进入 Review → 读 Comments → 查 Checks → 看 Approvals → Chat 中指示 Agent 修 comment → Merge。iPad 可用 Split View 左 Review 右 Chat。

**第 3 日建议**：建立 Inbox 每日清空习惯，区分「需 Agent 处理」与「需人工 merge」队列。

### 命令与配置示例

```bash
cursor agent run --cloud "Fix auth bug and open PR"
```

```json
{
  "inbox": { "sections": ["in_progress", "needs_attention", "in_review"], "daySinceLaunch": 3 },
  "prReview": { "comments": true, "checks": true, "approvals": true, "merge": true }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Inbox / PR Review | ⚠️ 未实测（无 iOS 设备） |
| 官方 Changelog 7/31 | ✅ 无新条目 |

### 问题与解决方案

**Inbox 为空**：确认有活跃 Agent 或 open PR。**无法 Merge**：检查分支保护与权限。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Reviewer | Inbox 替代碎片通知跳转 |
| Tech Lead | 制定移动端 merge 分支策略 |
| 安全合规 | 评估移动端 merge 是否需 MFA |

---

## 特性三：Cursor Start 印度计划第 4 日观察（₹649/月）

### 是什么（机制说明）

**Cursor Start** 7/28 上线，7/31 为 **第 4** 日。印度专属 **₹649/月**（含税、UPI/卡、INR 计费），须物理位于印度。

**包含**：Grok 4.5 + Composer、Cloud Agent、**iOS/iPad**、Plugins/MCP/hooks/skills。

**不包含**：Auto / **Cursor Router**（第 10 日仍不可用）、Bugbot、OpenAI/Anthropic、SDK、按需超额。

**第 4 日关联**：7/29 iPad 开放使 Start 获与 Pro 同级移动端能力，模型仍限 Grok 4.5 + Composer。

### 适用场景 / 前置条件

- **适合**：印度开发者日常 Agent、UPI 支付、移动端审查
- **不适合**：需 Claude/GPT、Router、Bugbot
- **前置**：物理位于印度；Dashboard 或 signup 选择 Start

### 详细使用步骤（业务用户）

1. [cursor.com/signup](https://cursor.com/signup) 选 Start，UPI/卡付 ₹649
2. 桌面用 Grok 4.5 / Composer 启动 Agent
3. 7/29+：iPad/iPhone 装 App，用 Inbox + PR Review 完成移动闭环
4. 需 Router 或 Claude 时升级 Pro
5. **第 4 日**：评估 Start + 移动端是否满足日常 PR 闭环

### 命令与配置示例

```bash
cursor chat --model composer "Implement feature X"
# Start 不可用：cursor chat --model auto
```

```json
{
  "plan": "start", "price_inr": 649, "daySinceLaunch": 4,
  "excludedFeatures": ["auto", "router", "bugbot", "openai", "anthropic"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Start 订阅 / iPad | ⚠️ 未实测（非印度 IP） |
| Changelog 7/31 | ✅ 无 Start 新条目 |
| Router 第 10 日 | ✅ 无变更，Start 不含 Auto |

### 问题与解决方案

**VPN 无法订阅**：须印度 IP。**无法 Auto**：设计如此，升级 Pro。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 印度个人开发者 | Start + 移动端高性价比闭环 |
| 需 Router 用户 | 须 Pro |
| 中国开发者 | 观察本地化定价 tier 趋势 |

---

## 特性四：Cursor Router 第 10 日观察（7/22，今日无变更）

### 是什么（机制说明）

**Cursor Router** 7/22 发布，为 Auto mode 提供 **Intelligence / Balance / Cost** 三档智能路由。Teams 默认开启；7/31 为第 **10** 日，Changelog **无 Router 更新**。Start 用户 **无法使用** Auto 与 Router。

| 档位 | 策略 | 适用 |
|------|------|------|
| Intelligence | 优先最强模型 | 复杂推理、架构设计 |
| Balance | 质量与成本平衡（默认） | 日常开发 |
| Cost | 优先低成本模型 | 简单补全、批量任务 |

### 适用场景 / 前置条件

- **适合**：Pro/Teams 用户希望 Auto 自动选模型
- **不适合**：Start 用户、需固定单一模型的合规场景
- **前置**：Pro/Pro+/Ultra/Teams/Enterprise；**不含** Start

### 详细使用步骤（业务用户）

1. Settings → Models → 选择 Auto mode
2. 设置 Router 档位（Intelligence / Balance / Cost）
3. Teams Admin 可在 Dashboard 设团队默认档位
4. **第 10 日**：观察 Auto 路由稳定性

### 命令与配置示例

```bash
cursor chat --model auto "Refactor auth module"
```

```json
{
  "router": { "daySinceLaunch": 10, "tiers": ["intelligence", "balance", "cost"], "startExcluded": true }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面 Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 官方 Changelog 7/31 | ✅ 无 Router 新条目 |

### 问题与解决方案

**Auto 不可用**：确认非 Start 计划。**路由不符合预期**：切换 Intelligence 或手动指定模型。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro 用户 | 默认 Balance，复杂任务切 Intelligence |
| Start 用户 | 直接用 Grok 4.5 / Composer |
| Teams Admin | 评估默认档位对成本的影响 |

---

## 特性五：Cloud Agent Hooks 对话级控制（3.11，持续可用）

### 是什么（机制说明）

3.11（7/10）新增 **对话级 Cloud Agent Hooks**，在 Agent 对话生命周期中插入自定义逻辑。7/31 无新 hook 类型，但 hooks 与 Cloud Agent、Start 计划、DayAI 自动化环境持续相关。

| Hook | 用途 |
|------|------|
| `beforeSubmitPrompt` | 提交前拦截/修改 prompt |
| `afterAgentResponse` | 观察 Agent 输出 |
| `afterAgentThought` | 观察推理过程 |
| `subagentStart` | 控制子 Agent 启动 |
| `stop` | 构建自纠正循环 |
| compaction / turn completion | 控制会话压缩和轮次结束 |

团队可在 Dashboard 或 `.cursor/hooks.json` 配置 hooks，构建自纠正 loops、PII 过滤与审计日志。

### 适用场景 / 前置条件

- **适合**：企业 Agent 输出审计；自动化流水线（如每日摘要生成）
- **不适合**：个人用户无合规需求；本地 Agent（部分 hooks 仅 Cloud 生效）
- **前置**：Teams/Enterprise 或含 hooks 的付费计划；Cloud Agent 模式

### 详细使用步骤（业务用户）

1. Dashboard → Team Settings → Hooks，或编辑 `.cursor/hooks.json`
2. 配置 `beforeSubmitPrompt` 过滤敏感信息
3. 配置 `afterAgentResponse` 记录输出日志
4. 配置 `subagentStart` 控制子 Agent 权限
5. 结合 `.cursor/permissions.json` 限制文件写入范围

### 命令与配置示例

```json
{
  "beforeSubmitPrompt": [{ "command": "node scripts/filter-pii.js" }],
  "afterAgentResponse": [{ "command": "node scripts/audit-log.js" }],
  "subagentStart": [{ "command": "./hooks/validate-subagent.sh" }]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Hooks 配置 / 触发 | ⚠️ 未实测（无 Dashboard GUI 权限） |
| Cloud Agent 环境 | ✅ 本 DayAI 运行于 Cloud Agent |
| Changelog 7/31 | ✅ 无 hooks 新条目 |

### 问题与解决方案

**Hook 未触发**：确认 Cloud Agent 模式。**权限不足**：Teams 管理员需在 Dashboard 启用。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 用 hooks 实现合规审计和 PII 过滤 |
| 自动化团队 | 结合 permissions.json 约束 Cloud Agent 写入 |
| 个人开发者 | 了解即可，本地 Agent 不支持全部 hooks |

---

## 版本对照表

| 日期 (UTC) | 版本/事件 | 要点 |
|------------|-----------|------|
| **2026-07-31** | **无新 Changelog** | iPad/Inbox/PR Review 第 3 日；Start 第 4 日；Router 第 10 日 |
| 2026-07-29 | **Cursor for iPad** | 全付费开放；Inbox；完整 PR Review（**第 3 日**） |
| 2026-07-29 | **移动端附加** | Bitbucket/Azure DevOps；多 PR；团队切换 |
| 2026-07-28 | Cursor Start | 印度 ₹649/月（**第 4 日**） |
| 2026-07-22 | Cursor Router | 三档优化（**第 10 日**，无变更） |
| 2026-07-10 | 3.11 | Side chats；Cloud Agent hooks；Azure DevOps picker |
| 2026-06-29 | iOS public beta | iPhone 远程操控首发 |

## 今日研究员结论

Cursor 7/31 进入 **移动 Agent 工作流深度观察期**——7/29 主特性第 **3** 日无 Changelog 修订，发布节奏处于用户验证阶段。**Cursor Start 第 4 日**：₹649 用户享有与 Pro 同级移动端 surface，模型仍锁 Grok 4.5 + Composer；**Router 第 10 日** 与 Start 无关。

**Cloud Agent hooks**（3.11）持续支撑企业合规与自动化；本 DayAI 项目运行于 Cloud Agent，印证 hooks + permissions 在无人值守 Agent 流水线中的基础设施价值。

竞争对照：同日 [DeepSeek V4-Flash 正式版 API 公测](./china-ai.md) 强化「Agent 深度优化」叙事；[Codex 0.147.0-alpha.4 三连发](./codex.md) 加速迭代。Cursor 差异化仍在 **移动 PR 闭环** 与 **Cloud Agent 生态**（hooks/MCP/skills）。

本地 ⚠️ 未实测桌面与 iOS/iPad；结论基于 [官方 iPad Changelog 7/29](https://cursor.com/changelog/ipad) 及 7/31 无新稿确认。建议有 iPad 的付费用户第 3 日起验证 Inbox 队列稳定性与 Split View PR Review；Teams 管理员可评估 Cloud Agent hooks 审计策略。
