# Cursor 每日技术文档 — 2026-07-30

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor iPad Changelog](https://cursor.com/changelog/ipad)、[Cursor Start 公告](https://cursor.com/changelog/cursor-start)、[Cursor Router 公告](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 30 日 Cursor **官方 Changelog 无新条目**。7/29 发布的 **Cursor for iPad 全付费开放**、**Inbox** 收件箱、**完整 PR Review** 进入第 **2** 日观察期；7/28 **Cursor Start** 印度 ₹649/月计划进入第 **3** 日。**Cursor Router**（7/22）第 **9** 日，今日无 Router 变更。

背景：7/29 主特性仍有效——iPad 大屏布局（多 Agent 侧边栏、Split View、完整 Diff、Apple Pencil 标注）、Bitbucket/Azure DevOps SCM、多 PR 会话、应用内团队切换。行业侧 [GPT-5.6 Sol 通过 Codex 优化推理栈](./codex.md) 与 [Claude Code 2.1.220 冻结第 6 日](./claude-code.md) 形成竞品对照，但 Cursor 7/30 无新响应。本地 Cloud Agent 无 GUI、无 iOS 设备，桌面与移动端均 ⚠️ 未实测。

---

## 特性一：Cursor for iPad 全付费开放——第 2 日观察（7/29 主特性）

### 是什么（机制说明）

Cursor for iPad 是 iOS App 的 **大屏原生布局**，自 7/29 向 **所有付费计划** 开放。7/30 为发布第 **2** 日，无 Changelog 修订，能力维持不变。

**覆盖计划**：Pro、Pro+、Ultra、Teams、Enterprise、**Cursor Start**（₹649/月，含 iOS/iPad）。**Free/Hobby 仍无法使用**移动 App。

**核心能力**：侧边栏固定多 Chat 监视 Agent；Split View（Review + Chat）；完整 diff；Inbox、PR Review、Bitbucket/Azure DevOps、多 PR、团队切换。App Store 要求 iOS 26.0+，仍处 public beta。

### 适用场景

- **适合**：iPad 通勤审查 Agent 产出、多 Agent 并行监视、大屏 diff 阅读
- **不适合**：需完整 IDE 本地编辑、Free 用户

### 前置条件

有效 Cursor 付费订阅；iPad 安装 Cursor App（7/29+）；同一账号登录；SCM 已连接；Teams 可能需 Admin 启用 Remote Control。

### 详细使用步骤（业务用户）

1. 确认 [cursor.com/settings](https://cursor.com/settings) 为付费计划
2. App Store 安装/更新 Cursor App 至 7/29+ 版本
3. 授权通知（Agent 完成、PR 状态变更）
4. 选择仓库或 Cloud 环境，启动 Agent
5. 侧边栏固定多个 Chat 监视并行任务
6. Split View：左侧 Review、右侧 Chat
7. 多 Team 用户通过应用内切换器换 Workspace

### 命令与配置示例

```bash
cursor --version
cursor auth status
```

```json
{
  "mobile": {
    "platform": "ipad",
    "requiredPlan": ["pro", "pro_plus", "ultra", "teams", "enterprise", "start"],
    "daySinceLaunch": 2,
    "features": { "sidebarPinnedChats": true, "splitView": true, "fullDiff": true }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面端 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| iPad App | ⚠️ 未实测（无 iOS 设备） |
| 官方 Changelog 7/30 | ✅ 无新条目（7/29 仍为最新） |
| Start 含 iOS/iPad | ✅ 7/28–7/29 确认 |

### 问题与解决方案

**需付费计划**：检查 Dashboard 订阅。**布局仍为手机版**：更新 App 至 7/29+。**Agent 不同步**：同账号、检查 Teams Remote Control 限制。**第 2 日仍遇 bug**：public beta 预期内，向官方反馈。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ 全付费、大屏、Inbox、PR Review |
| Changelog 7/30 | ✅ 无新稿 |
| Cursor Start 7/28 | ✅ Start 含 iOS/iPad |
| 虎嗅 7/29 | ✅ Agent 管理控制台定位 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro + iPad 用户 | 第 2 日优先验证 Split View + 多 Agent 监视 |
| Start 印度用户 | ₹649 已含移动端，与 Pro 同级 surface |
| Free 用户 | 无法使用；评估升级 |
| 竞品观察者 | 移动 Agent + PR 闭环持续为竞争维度 |

---

## 特性二：Inbox 与移动端 PR 全流程 Review——第 2 日观察

### 是什么（机制说明）

7/29 为 **iPhone 与 iPad 同步新增**，7/30 第 **2** 日无变更：

**Inbox**：集中展示进行中 Agent、待处理项、审查中 PR，解决移动端多会话追踪难题。

**完整 PR Review**：覆盖 **Comments**（读/回评论）、**Checks**（CI 状态）、**Approvals**（审批）、**Reviewer 管理**（增换审查者）、**Agent 联动**（提示解决 review comments）、**Merge**。官方：「从 Agent 产出到合并 PR 的整条路径随身携带」。

与 [Codex 0.146.0 会话命名/pin](./codex.md) 形成跨工具「多任务追踪」行业共振。

### 适用场景

- **适合**：PR 待审不在电脑前、CI 失败需确认、Agent 开 PR 后快速 approve/merge
- **不适合**：大型 monorepo 需 IDE 级浏览、复杂冲突需本地 merge

### 前置条件

付费计划 + iOS/iPad App（7/29+）；SCM 已连接；账号有 merge 权限。

### 详细使用步骤（业务用户）

**Inbox**：打开 Inbox → 查看 In Progress / Needs Attention / In Review → 点击跳转 Chat 或 PR。

**PR Review**：进入 Review → 读 Comments → 查 Checks → 看 Approvals → 管理 Reviewer → Chat 中指示 Agent 修 comment → 通过后 Merge。iPad 可用 Split View 左 Review 右 Chat。

**第 2 日建议**：建立 Inbox 每日清空习惯，区分「需 Agent 处理」与「需人工 merge」队列。

### 命令与配置示例

```bash
cursor agent run --cloud "Fix auth bug and open PR"
```

```json
{
  "inbox": { "sections": ["in_progress", "needs_attention", "in_review"], "daySinceLaunch": 2 },
  "prReview": { "comments": true, "checks": true, "approvals": true, "merge": true }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Inbox / PR Review | ⚠️ 未实测（无 iOS 设备） |
| 官方 Changelog 7/30 | ✅ 无新条目 |
| 7/29 官方表述 | ✅ Inbox + full PR surface |

### 问题与解决方案

**Inbox 为空**：确认有活跃 Agent 或 open PR。**无法 Merge**：检查分支保护与权限。**Agent 未响应 review**：附带 PR 链接与 comment ID。**通知过多**：第 2 日起调整系统通知粒度。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ Inbox 三区 + full PR |
| Changelog 7/30 | ✅ 无变更 |
| README 2026-07-30 | ✅ 第 2 日索引一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Reviewer | Inbox 替代碎片通知跳转 |
| Tech Lead | 制定移动端 merge 分支策略 |
| 安全合规 | 评估移动端 merge 是否需 MFA |

---

## 特性三：iPad 大屏布局与 Apple Pencil 标注——第 2 日观察

### 是什么（机制说明）

iPad 版 **围绕大屏重建布局**（7/29 发布，7/30 第 2 日）：

| 能力 | 说明 |
|------|------|
| 侧边栏固定 Chat | 多 Agent 会话并排，实时监视 |
| Split Screen | Review 与 Chat 同屏 |
| 完整 Diff | 文件变更完整渲染 |
| Markup 标注 | 截图后点击定点评论，或 **Apple Pencil 绘制** |

Pencil 标注面向 UI/视觉反馈：在截图上圈注问题，Agent 据此理解修改意图，适合前端、设计系统类 PR。

### 适用场景

- **适合**：UI 审查、Bug 截图反馈、宽 diff 阅读
- **不适合**：纯后端逻辑 PR（截图价值低）

### 前置条件

iPad + Cursor App（7/29+）；可选 Apple Pencil。

### 详细使用步骤（业务用户）

1. Chat/Review 中附加截图
2. 点击图像定点评论，或用 Pencil 绘制
3. 发送消息，Agent 读取标注上下文
4. Split View：左 Review diff、右 Chat 发标注截图
5. 侧边栏固定多 Chat 监视不同 Agent 响应
6. 第 2 日：对比桌面 Review 体验，记录 diff 渲染差异

### 命令与配置示例

```bash
cursor chat "Review docs/ui-bug.png and fix header alignment"
```

```json
{
  "ipadLayout": {
    "daySinceLaunch": 2,
    "markup": { "tapToComment": true, "applePencilDraw": true }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 分屏 / Pencil | ⚠️ 未实测 |
| 官方 Changelog 7/30 | ✅ 无新条目 |
| 7/29 Changelog | ✅ Built for the bigger screen |

### 问题与解决方案

**Pencil 无响应**：检查配对与 App 版本。**标注未传给 Agent**：确认图像上传完成。**宽 diff 滚动卡顿**：public beta 预期，反馈官方。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ Sidebar、Split、Diff、Pencil |
| 7/30 更新 | ✅ 无变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端/设计师 | Pencil 圈注替代长文字 |
| 后端开发者 | 大屏 diff 阅读价值更高 |

---

## 特性四：Bitbucket / Azure DevOps SCM + 多 PR 会话与团队切换——第 2 日观察

### 是什么（机制说明）

7/29「Additional improvements」三项，7/30 第 **2** 日维持：

1. **Bitbucket / Azure DevOps SCM**：移动端补齐企业 SCM，与 7/10 桌面 Azure DevOps picker 方向一致
2. **多 PR 会话**：单次 Agent 对话产生多个 PR 时，可打开 **每一个**（此前仅最后一个）
3. **团队切换**：多 Team 账号在 App 内切换，无需退出登录

### 适用场景

- **适合**：Bitbucket/Azure DevOps 企业用户、Agent 批量开 PR、跨 Team 开发者
- **不适合**：仅 GitHub 单 PR 简单流程（仍受益 Inbox）

### 前置条件

Bitbucket/Azure DevOps OAuth 已授权；多 PR 需 Agent 实际产生多个 PR；多 Team 需已加入多个 Team。

### 详细使用步骤（业务用户）

**SCM**：Dashboard → Integrations → 授权 Bitbucket/Azure DevOps → 移动端同步仓库列表。

**多 PR**：Agent 创建多个 PR 后，会话内 PR 列表逐个打开 Review；Inbox 出现多个 In Review。

**团队切换**：App 内 Team Switcher 选择目标 Team，仓库与 Inbox 切换上下文。

**第 2 日**：验证企业 SCM 仓库在移动端列表完整性。

### 命令与配置示例

```bash
cursor repos list
```

```json
{
  "scm": { "providers": ["github", "gitlab", "bitbucket", "azure_devops"] },
  "multiPrSessions": { "openAllPrsInSession": true, "daySinceLaunch": 2 }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bitbucket / Azure DevOps / 多 PR / 团队切换 | ⚠️ 未实测 |
| 官方 Changelog 7/30 | ✅ 无新条目 |
| 7/29 官方表述 | ✅ 三项均列出 |

### 问题与解决方案

**仓库不显示**：Dashboard 重新授权 OAuth。**只见一个 PR**：更新 App 至 7/29+。**切换 Team 后仓库空**：确认 Team SCM 连接。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ 三项附加改进 |
| Changelog 7/30 | ✅ 无变更 |
| 桌面 Azure DevOps 7/10 | ✅ picker 已支持 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Azure DevOps 团队 | 评估移动端 Review 合规 |
| 多 PR Agent 用户 | 利用 PR 列表避免遗漏 |

---

## 特性五：Cursor Start 印度计划第 3 日观察（₹649/月）

### 是什么（机制说明）

**Cursor Start** 7/28 上线，7/30 为 **第 3 日**。印度专属 **₹649/月**（含税、UPI/卡、INR 计费），须物理位于印度。

**包含**：Grok 4.5 + Composer、Cloud Agent、**iOS/iPad**（7/29 扩展大屏）、Plugins/MCP/hooks/skills。

**不包含**：Auto / **Cursor Router**（第 9 日仍不可用）、Bugbot、OpenAI/Anthropic、SDK、按需超额。

**第 3 日关联**：7/29 iPad 开放使 Start 获与 Pro 同级移动端能力（Inbox、PR Review、Bitbucket/Azure DevOps、多 PR、团队切换），模型仍限 Grok 4.5 + Composer。7/30 无 Start 专属 Changelog 更新。

### 适用场景

- **适合**：印度开发者日常 Agent、UPI 支付、移动端审查
- **不适合**：需 Claude/GPT、Router、Bugbot

### 前置条件

物理位于印度；Dashboard 或 signup 选择 Start。

### 详细使用步骤（业务用户）

1. [cursor.com/signup](https://cursor.com/signup) 选 Start，UPI/卡付 ₹649
2. 桌面用 Grok 4.5 / Composer 启动 Agent
3. 7/29+：iPad/iPhone 装 App，用 Inbox + PR Review 完成移动闭环
4. 需 Router 或 Claude 时升级 Pro
5. 第 3 日：评估 Start + 移动端是否满足日常 PR 闭环

### 命令与配置示例

```bash
cursor chat --model composer "Implement feature X"
# Start 不可用：cursor chat --model auto
```

```json
{
  "plan": "start", "price_inr": 649, "daySinceLaunch": 3,
  "excludedFeatures": ["auto", "router", "bugbot", "openai", "anthropic"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Start 订阅 / iPad | ⚠️ 未实测（非印度 IP） |
| 官方 7/28 + 7/29 | ✅ 定价与 iPad 全付费表述一致 |
| Changelog 7/30 | ✅ 无 Start 新条目 |
| Router 第 9 日 | ✅ 无变更，Start 不含 Auto |

### 问题与解决方案

**VPN 无法订阅**：须印度 IP。**无法 Auto**：设计如此，升级 Pro。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog cursor-start | ✅ ₹649、包含项 |
| Changelog /ipad 7/29 | ✅ 全付费含 Start |
| 7/29 cursor.md | ✅ 第 1 日记录一致 |
| 7/30 更新 | ✅ 无变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 印度个人开发者 | Start + 7/29 移动端高性价比移动闭环 |
| 需 Router 用户 | 须 Pro |
| 中国开发者 | 观察本地化定价 tier 趋势 |

---

## 背景线：Cursor Router 第 9 日（7/22，今日无变更）

Router 为 Auto 提供 Intelligence / Balance / Cost 三档路由。Teams 默认开启。7/30 Changelog **无 Router 更新**。Start 用户仍 **无法使用**。

---

## 版本对照表

| 日期 (UTC) | 版本/事件 | 要点 |
|------------|-----------|------|
| **2026-07-30** | **无新 Changelog** | iPad/Inbox/PR Review 第 2 日；Start 第 3 日 |
| 2026-07-29 | **Cursor for iPad** | 全付费开放；Inbox；完整 PR Review（**第 2 日**） |
| 2026-07-29 | **移动端附加** | Bitbucket/Azure DevOps；多 PR；团队切换 |
| 2026-07-29 | **iPad 布局** | 多 Chat、分屏、完整 Diff、Pencil |
| 2026-07-28 | Cursor Start | 印度 ₹649/月（**第 3 日**） |
| 2026-07-22 | Cursor Router | 三档优化（**第 9 日**，无变更） |
| 2026-06-29 | iOS public beta | iPhone 远程操控首发 |
| 2026-07-10 | 3.11 | Side chats；Azure DevOps picker |

## 今日研究员结论

Cursor 7/30 进入 **移动 Agent 工作流常态观察期**——7/29 主特性（iPad 全付费 + Inbox + 完整 PR Review）第 **2** 日无 Changelog 修订，说明发布节奏进入用户验证阶段而非功能密集期。**Cursor Start 第 3 日**：₹649 用户享有与 Pro 同级移动端 surface，模型仍锁 Grok 4.5 + Composer；**Router 第 9 日** 与 Start 无关。

竞争对照：同日 [Codex 0.147.0-alpha.2](./codex.md) 与 GPT-5.6 Sol 生产内核自优化强化「Agent 优化基础设施」叙事；[Claude Code 2.1.220 冻结第 6 日](./claude-code.md) 无响应。Cursor 差异化仍在 **移动 PR 闭环**（审查/合并）而非底层推理优化。

本地 ⚠️ 未实测桌面与 iOS/iPad；结论基于 [官方 iPad Changelog 7/29](https://cursor.com/changelog/ipad) 及 7/30 无新稿确认。建议有 iPad 的付费用户第 2 日起重点验证 Inbox 队列管理与 Split View PR Review 稳定性。
