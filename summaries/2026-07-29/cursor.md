# Cursor 每日技术文档 — 2026-07-29

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor iPad Changelog](https://cursor.com/changelog/ipad)、[Cursor Start 公告](https://cursor.com/changelog/cursor-start)、[Cursor Router 公告](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 29 日 Cursor 发布 **Cursor for iPad 向全部付费计划开放**——Pro、Pro+、Ultra、Teams、Enterprise 及印度 **Cursor Start**（₹649/月）用户均可使用 iPad 原生大屏布局。同日 iPhone 与 iPad 同步上线 **Inbox** 收件箱，以及覆盖评论、CI 检查、审批的 **完整 PR Review**，支持从移动端创建、审查、合并 PR。

iPad 专属能力：侧边栏多 Agent 并行监视、分屏（Review + Chat）、完整文件 diff、**Apple Pencil 截图标注**。附加改进：**Bitbucket / Azure DevOps SCM**、**多 PR 会话**、应用内 **团队切换**。

背景线：**Cursor Start**（7/28）第 **2** 日；**Cursor Router**（7/22）第 **8** 日，今日无 Router 变更。本地 Cloud Agent 无 GUI、无 iOS 设备，桌面与移动端均 ⚠️ 未实测。

---

## 特性一：Cursor for iPad 全付费计划开放（7/29 主特性）

### 是什么（机制说明）

Cursor for iPad 是 iOS App 的 **大屏原生布局**，自 7/29 向 **所有付费计划** 开放。与 6/29 iOS public beta 一脉相承，但针对 iPad 重新设计交互，而非放大手机 UI。

**覆盖计划**：Pro、Pro+、Ultra、Teams、Enterprise、**Cursor Start**（₹649/月，含 iOS，7/29 扩展 iPad）。**Free/Hobby 仍无法使用**移动 App。

**核心能力**：侧边栏固定多 Chat 监视 Agent；Split View（Review + Chat）；完整 diff；Inbox、PR Review、Bitbucket/Azure DevOps、多 PR、团队切换。App Store 要求 iOS 26.0+，仍处 public beta。

### 适用场景

- **适合**：iPad 通勤审查 Agent 产出、多 Agent 并行监视、大屏 diff 阅读
- **不适合**：需完整 IDE 本地编辑、Free 用户

### 前置条件

有效 Cursor 付费订阅；iPad 安装 Cursor App；同一账号登录；SCM 已连接；Teams 可能需 Admin 启用 Remote Control。

### 详细使用步骤（业务用户）

1. 确认 [cursor.com/settings](https://cursor.com/settings) 为付费计划
2. App Store 安装 Cursor App，同一账号登录
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
    "features": { "sidebarPinnedChats": true, "splitView": true, "fullDiff": true }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面端 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| iPad App | ⚠️ 未实测（无 iOS 设备） |
| 官方 Changelog 7/29 | ✅ iPad 全付费开放 |
| Start 含 iOS | ✅ 7/28 确认，7/29 扩展 iPad |

### 问题与解决方案

**需付费计划**：检查 Dashboard 订阅。**布局仍为手机版**：更新 App 至 7/29+。**Agent 不同步**：同账号、检查 Teams Remote Control 限制。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ 全付费、大屏、Inbox、PR Review |
| Cursor Start 7/28 | ✅ Start 含 iOS |
| Pondero / 9to5Mac | ✅ 付费门禁、public beta |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Pro + iPad 用户 | 更新 App，用分屏 + 多 Agent 监视 |
| Start 印度用户 | ₹649 已含移动端，7/29 为体验升级 |
| Free 用户 | 无法使用；评估升级 |
| 竞品观察者 | 移动 Agent + PR 闭环为新竞争维度 |

---

## 特性二：Inbox 与移动端 PR 全流程 Review

### 是什么（机制说明）

7/29 为 **iPhone 与 iPad 同步新增**：

**Inbox**：集中展示进行中 Agent、待处理项、审查中 PR，解决移动端多会话追踪难题。

**完整 PR Review**：覆盖 **Comments**（读/回评论）、**Checks**（CI 状态）、**Approvals**（审批）、**Reviewer 管理**（增换审查者）、**Agent 联动**（提示解决 review comments）、**Merge**。官方：「从 Agent 产出到合并 PR 的整条路径随身携带」。

### 适用场景

- **适合**：PR 待审不在电脑前、CI 失败需确认、Agent 开 PR 后快速 approve/merge
- **不适合**：大型 monorepo 需 IDE 级浏览、复杂冲突需本地 merge

### 前置条件

付费计划 + iOS/iPad App（7/29+）；SCM 已连接；账号有 merge 权限。

### 详细使用步骤（业务用户）

**Inbox**：打开 Inbox → 查看 In Progress / Needs Attention / In Review → 点击跳转 Chat 或 PR。

**PR Review**：进入 Review → 读 Comments → 查 Checks → 看 Approvals → 管理 Reviewer → Chat 中指示 Agent 修 comment → 通过后 Merge。iPad 可用 Split View 左 Review 右 Chat。

### 命令与配置示例

```bash
cursor agent run --cloud "Fix auth bug and open PR"
```

```json
{
  "inbox": { "sections": ["in_progress", "needs_attention", "in_review"] },
  "prReview": { "comments": true, "checks": true, "approvals": true, "merge": true }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Inbox / PR Review | ⚠️ 未实测（无 iOS 设备） |
| 官方 Changelog 7/29 | ✅ Inbox + full PR surface |

### 问题与解决方案

**Inbox 为空**：确认有活跃 Agent 或 open PR。**无法 Merge**：检查分支保护与权限。**Agent 未响应 review**：附带 PR 链接与 comment ID。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad | ✅ Inbox 三区 + full PR |
| README 2026-07-29 | ✅ 评论/检查/合并 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Reviewer | Inbox 替代碎片通知跳转 |
| Tech Lead | 制定移动端 merge 分支策略 |
| 安全合规 | 评估移动端 merge 是否需 MFA |

---

## 特性三：iPad 大屏布局与 Apple Pencil 标注

### 是什么（机制说明）

iPad 版 **围绕大屏重建布局**：

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

### 命令与配置示例

```bash
cursor chat "Review docs/ui-bug.png and fix header alignment"
```

```json
{
  "ipadLayout": {
    "markup": { "tapToComment": true, "applePencilDraw": true }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 分屏 / Pencil | ⚠️ 未实测 |
| 官方 Changelog 7/29 | ✅ Built for the bigger screen |

### 问题与解决方案

**Pencil 无响应**：检查配对与 App 版本。**标注未传给 Agent**：确认图像上传完成。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad | ✅ Sidebar、Split、Diff、Pencil |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端/设计师 | Pencil 圈注替代长文字 |
| 后端开发者 | 大屏 diff 阅读价值更高 |

---

## 特性四：Bitbucket / Azure DevOps SCM + 多 PR 会话与团队切换

### 是什么（机制说明）

7/29「Additional improvements」三项：

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

### 命令与配置示例

```bash
cursor repos list
```

```json
{
  "scm": { "providers": ["github", "gitlab", "bitbucket", "azure_devops"] },
  "multiPrSessions": { "openAllPrsInSession": true }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bitbucket / Azure DevOps / 多 PR / 团队切换 | ⚠️ 未实测 |
| 官方 Changelog 7/29 | ✅ 三项均列出 |
| 桌面 Azure DevOps 7/10 | ✅ picker 已支持 |

### 问题与解决方案

**仓库不显示**：Dashboard 重新授权 OAuth。**只见一个 PR**：更新 App 至 7/29+。**切换 Team 后仓库空**：确认 Team SCM 连接。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog /ipad 7/29 | ✅ 三项附加改进 |
| README 2026-07-29 | ✅ Bitbucket/Azure DevOps |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Azure DevOps 团队 | 评估移动端 Review 合规 |
| 多 PR Agent 用户 | 利用 PR 列表避免遗漏 |

---

## 特性五：Cursor Start 印度计划第 2 日观察（₹649/月）

### 是什么（机制说明）

**Cursor Start** 7/28 上线，7/29 为 **第 2 日**。印度专属 **₹649/月**（含税、UPI/卡、INR 计费），须物理位于印度。

**包含**：Grok 4.5 + Composer、Cloud Agent、**iOS/iPad**（7/29 扩展大屏）、Plugins/MCP/hooks/skills。

**不包含**：Auto / **Cursor Router**（第 8 日仍不可用）、Bugbot、OpenAI/Anthropic、SDK、按需超额。

**第 2 日关联**：7/29 iPad 开放使 Start 获与 Pro 同级移动端能力（Inbox、PR Review、Bitbucket/Azure DevOps、多 PR、团队切换），模型仍限 Grok 4.5 + Composer。

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

### 命令与配置示例

```bash
cursor chat --model composer "Implement feature X"
# Start 不可用：cursor chat --model auto
```

```json
{
  "plan": "start", "price_inr": 649, "daySinceLaunch": 2,
  "excludedFeatures": ["auto", "router", "bugbot", "openai", "anthropic"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Start 订阅 / iPad | ⚠️ 未实测（非印度 IP） |
| 官方 7/28 + 7/29 | ✅ 定价与 iPad 全付费表述一致 |
| Router 第 8 日 | ✅ 无变更，Start 不含 Auto |

### 问题与解决方案

**VPN 无法订阅**：须印度 IP。**无法 Auto**：设计如此，升级 Pro。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog cursor-start | ✅ ₹649、包含项 |
| Changelog /ipad | ✅ 全付费含 Start |
| 7/28 cursor.md | ✅ 第 1 日记录一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 印度个人开发者 | Start + 7/29 iPad 高性价比移动闭环 |
| 需 Router 用户 | 须 Pro |
| 中国开发者 | 观察本地化定价趋势 |

---

## 背景线：Cursor Router 第 8 日（7/22，今日无变更）

Router 为 Auto 提供 Intelligence / Balance / Cost 三档路由。Teams 默认开启。今日 Changelog **无 Router 更新**。Start 用户仍 **无法使用**。

---

## 版本对照表

| 日期 (UTC) | 版本/事件 | 要点 |
|------------|-----------|------|
| **2026-07-29** | **Cursor for iPad** | 全付费开放；Inbox；完整 PR Review |
| **2026-07-29** | **移动端附加** | Bitbucket/Azure DevOps；多 PR；团队切换 |
| **2026-07-29** | **iPad 布局** | 多 Chat、分屏、完整 Diff、Pencil |
| 2026-07-28 | Cursor Start | 印度 ₹649/月（第 2 日） |
| 2026-07-22 | Cursor Router | 三档优化（第 8 日，无变更） |
| 2026-06-29 | iOS public beta | iPhone 远程操控首发 |
| 2026-07-10 | 3.11 | Side chats；Azure DevOps picker |

## 今日研究员结论

Cursor 7/29 将竞争焦点推向 **移动端验证与交付闭环**。iPad 全付费 + Inbox + 完整 PR Review（评论/检查/审批/合并）使 Agent 产出可在平板/iPhone 完成最后一公里，与 Codex 0.146.0 同日 Agent 会话管理形成共振——**审查与合并** 正成 AI 编程标配战场。

iPad 大屏（多 Agent 监视、分屏、完整 Diff）与 Pencil 标注补齐视觉/UI 移动反馈。Bitbucket/Azure DevOps 与多 PR 会话消除企业与复杂工作流障碍。

**Cursor Start 第 2 日**：₹649 用户 7/29 起享有与 Pro 同级移动端 surface，模型仍锁 Grok 4.5 + Composer；**Router 第 8 日** 与 Start 无关。中国开发者无直接变更，可观察「移动 PR 闭环 + 国家定价 tier」对竞品压力。

本地 ⚠️ 未实测桌面与 iOS/iPad；结论基于 [官方 iPad Changelog](https://cursor.com/changelog/ipad)。建议有 iPad 的付费用户更新 App，优先验证 Inbox 与 Split View PR Review。
