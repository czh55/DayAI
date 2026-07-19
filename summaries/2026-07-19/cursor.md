# Cursor 每日技术文档 — 2026-07-19

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 19 日 **Cursor Changelog 无新条目**。最近一次更新为 **7 月 17 日 Slack 集成增强**（计划先行、多仓库环境、跨频道工作流）。桌面端最近大版本仍为 **3.11**（7/10 发布：Side chats、对话搜索、项目/仓库选择器重构、Cloud Agent hooks）。行业层面，Fable 5 今日截止与 Codex 额度松绑形成竞品压力，但 Cursor 自身无直接 Changelog 响应。本地 Cloud Agent 环境 ⚠️ 无法实测桌面 GUI 功能，以下以官方 Changelog + 操作 SOP 为准。

---

## 特性一：Cursor in Slack — 计划先行与状态更新（7/17，仍为最近更新）

### 是什么（机制说明）

7/17 Changelog 更新 Cursor in Slack 交互体验：

- **计划先行**：Cursor 在开始工作前先输出计划，用户可早期介入并调整方向
- **状态更新**：工作过程中持续更新状态，用户可跟踪每一步
- **UI 精简**：消息内按钮移除，改为紧凑 footer 链接；表格、PR、artifacts 渲染更清晰

### 适用场景

- **适合**：团队在 Slack 中委派 Cursor 完成代码任务、PR 审查、文档生成
- **不适合**：需要精细 IDE 交互的复杂重构（建议切回桌面端）

### 前置条件

Cursor Teams/Enterprise 计划；Slack 工作区已安装 Cursor 集成

### 详细使用步骤（业务用户）

1. 在 Slack 中 @Cursor 或在与 Cursor 集成的频道发送任务描述
2. 等待 Cursor 输出**计划**（plan），审阅并可回复调整
3. Cursor 开始执行后，观察**状态更新**消息
4. 通过 footer 链接查看 PR、artifacts 等产出

### 命令与配置示例

```text
# Slack 中发送：
@Cursor Fix the authentication bug in src/auth/login.ts — add unit tests

# Cursor 会先回复计划，例如：
# Plan:
# 1. Read src/auth/login.ts and related tests
# 2. Identify the bug in token validation
# 3. Fix validation logic
# 4. Add/update unit tests
# 5. Create PR
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 7/17 | ✅ 官方确认 |
| Slack 实际交互 | ⚠️ 未实测（Cloud Agent 无 Slack 集成） |

### 问题与解决方案

**计划不符合预期**：在 Cursor 开始执行前回复调整。**状态更新过多**：通过 Slack 通知设置管理。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Cursor Changelog 7/17](https://cursor.com/changelog) | ✅ |
| [Slack Docs](https://cursor.com/docs/integrations/slack) | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Tech Lead | 利用计划先行机制做任务审查 |
| 个人开发者 | Slack 适合轻量任务，复杂任务用桌面端 |

---

## 特性二：多仓库环境支持（7/17）

### 是什么（机制说明）

从 Slack 发起任务时，Cursor 可选择**命名多仓库环境**而非单一默认仓库。前端、后端、共享代码分属不同 repo 时，Cursor 自动定位包含全部所需仓库的环境。

任务中途若需访问当前环境外的 repo，Cursor 弹出 **Switch repository** 按钮，切换后从断点继续。

### 适用场景

- **适合**：微服务架构、前后端分离、monorepo 外的多 repo 协作
- **不适合**：单 repo 项目（使用默认环境即可）

### 前置条件

Cursor Teams/Enterprise；已在 Dashboard 配置多仓库环境

### 详细使用步骤（业务用户）

1. 登录 Cursor Dashboard → Settings → Environments
2. 创建命名环境，添加所需 GitHub/GitLab 仓库
3. 在 Slack 中 @Cursor 时指定环境名称
4. 任务中如需切换 repo，点击 Switch repository 按钮

### 命令与配置示例

```text
# Slack 中指定环境
@Cursor [env:fullstack] Deploy the new API endpoint and update frontend to consume it

# 环境配置示例（Dashboard）
# Environment: fullstack
# Repos: frontend-app, backend-api, shared-types
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 7/17 | ✅ 官方确认 |
| 多仓库切换 | ⚠️ 未实测 |

### 问题与解决方案

**环境未找到**：在 Dashboard 确认环境名称与仓库权限。**切换后上下文丢失**：Cursor 设计上从断点继续，若丢失请检查 repo 权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 7/17 | ✅ |
| Cursor Docs Environments | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈团队 | 配置 fullstack 环境，Slack 一键跨 repo 任务 |
| DevOps | 用环境隔离 staging/production repo |
| 个人开发者 | 单 repo 无需配置 |

---

## 特性三：跨频道工作流（7/17）

### 是什么（机制说明）

Cursor 可**读取和发送**其他 Slack 频道与线程的消息。任务执行中可从工作区其他位置拉取上下文，并将更新发回原线程或相关频道。

### 适用场景

- **适合**：跨团队协调、从 #bugs 拉取报告到 #engineering 修复、多频道信息汇总
- **不适合**：严格频道隔离的合规环境（需评估权限）

### 前置条件

Cursor Slack 集成已授权跨频道读取权限

### 详细使用步骤（业务用户）

1. 在 Slack 中向 Cursor 描述任务，可引用其他频道
2. Cursor 自动拉取指定频道的上下文
3. 完成后 Cursor 将结果发回原线程或指定频道

### 命令与配置示例

```text
@Cursor Check #customer-feedback for bug reports from today and create fixes in backend-api
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 7/17 | ✅ |
| 跨频道实际行为 | ⚠️ 未实测 |

### 问题与解决方案

**无法读取其他频道**：检查 Cursor 集成的频道权限范围。**消息发到错误频道**：在 prompt 中明确指定目标频道。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 7/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 产品经理 | 从 #feedback 拉需求到 #engineering 自动修复 |
| 团队 Lead | 设定频道权限边界 |

---

## 特性四：Side Chats 与对话搜索（3.11，7/10）

### 是什么（机制说明）

3.11 引入 **Side chats**：在主 Agent 对话旁开侧边聊天，用 `/side`、`/btw` 或聊天面板顶部 + 按钮创建。侧边聊天继承主聊天上下文，可追问、探索想法而不打断主任务。

**对话搜索**：Agents Window 中 Cmd+K 搜索历史对话（本地索引，支持数千条）；对话内 Cmd+F 搜索。

### 适用场景

- **适合**：主 Agent 执行长任务时并行调研；快速查找历史对话
- **不适合**：需要主 Agent 立即响应的紧急任务

### 前置条件

Cursor 3.11+；桌面端

### 详细使用步骤（业务用户）

1. 主 Agent 运行中，输入 `/side` 或点击 + 开侧边聊天
2. 在侧边聊天中提问、调研，不影响主任务
3. 用 @mention 将侧边聊天结论拉回主线程
4. Cmd+K 在 Agents Window 搜索历史对话

### 命令与配置示例

```text
/side 这个 auth 方案有没有更简单的替代？
/btw 顺便查一下我们有没有类似的 middleware 实现
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.11 | ✅ |
| Side chat 实际使用 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**侧边聊天无上下文**：确认从主聊天面板创建而非新建对话。**搜索无结果**：等待本地索引构建完成。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度用户 | 用 side chat 保持主任务流畅 |
| 团队 | 用对话搜索复用历史方案 |

---

## 特性五：Cloud Agent Hooks 与 .cursor/permissions.json

### 是什么（机制说明）

3.11 新增 Cloud Agent **对话级 hooks**：`beforeSubmitPrompt`、`afterAgentResponse`、`afterAgentThought`、`stop`、`subagentStart` 等，可观察和控制 Agent 对话本身。

`.cursor/permissions.json` 控制 Cloud Agent 的文件/Shell 权限，类似 Claude Code 的 permissions 配置。

### 适用场景

- **适合**：企业合规、自动化审计、自纠错循环
- **不适合**：个人轻量使用

### 前置条件

Cursor Teams/Enterprise；Cloud Agent 环境

### 详细使用步骤（业务用户）

1. 在项目根目录创建 `.cursor/permissions.json`
2. 在 Dashboard 配置 team hooks
3. 部署 Cloud Agent 时 hooks 自动生效
4. 用 `stop` hook 实现自纠错循环

### 命令与配置示例

```json
// .cursor/permissions.json
{
  "allow": [
    "Read(**)",
    "Edit(src/**)",
    "Shell(npm test)"
  ],
  "deny": [
    "Shell(rm -rf *)",
    "Edit(.env)"
  ]
}
```

```json
// hooks 示例（Dashboard 配置）
{
  "afterAgentResponse": {
    "command": "node scripts/audit-response.js"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.11 hooks | ✅ |
| permissions.json | ✅ 文档存在 |
| 实际 hook 执行 | ⚠️ 未实测 |

### 问题与解决方案

**hook 未触发**：确认 Dashboard 配置已发布到 team。**权限过严**：逐步放宽 allow 规则。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| Cursor Docs Hooks | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业安全 | 配置 permissions.json + audit hooks |
| 平台工程师 | 用 stop hook 构建自纠错循环 |

---

## 版本对照表

| 版本/日期 | 核心变更 |
|-----------|----------|
| **7/19** | 无新 Changelog |
| 7/17 | Slack 计划先行、多仓库、跨频道 |
| 3.11 (7/10) | Side chats、对话搜索、Cloud Agent hooks |
| 3.10 (6/30) | Team MCPs、组织组市场 |
| 3.9 (6/29) | Cursor iOS 公测、Remote Control |

## 今日研究员结论

Cursor 7/19 无产品更新，但 7/17 Slack 增强与 3.11 桌面功能仍具竞争力。在 Fable 5 今日截止、Codex 额度松绑的行业背景下，Cursor 的差异化在于 Composer 模型性价比与 Side chat 工作流。建议团队用户优先体验 Slack 计划先行与多仓库环境；个人用户关注 3.11 Side chats 提升长任务效率。
