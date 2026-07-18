# Cursor 每日技术文档 — 2026-07-18

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 18 日 **Cursor Changelog 无新条目**。最近一次更新为 **7 月 17 日 Slack 集成增强**（计划先行、多仓库环境、跨频道工作流）。桌面端最近大版本仍为 **3.11**（7/10 发布：Side chats、对话搜索、项目/仓库选择器重构、Cloud Agent hooks）。本地 Cloud Agent 环境 ⚠️ 无法实测桌面 GUI 功能，以下以官方 Changelog + 操作 SOP 为准。

---

## 特性一：Cursor in Slack — 计划先行与状态更新（7/17）

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

# 用户可回复调整计划后 Cursor 开始执行
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 7/17 | ✅ 官方确认 |
| Slack 实际交互 | ⚠️ 未实测（Cloud Agent 无 Slack 集成） |

### 问题与解决方案

**计划不符合预期**：在 Cursor 开始执行前回复调整。**状态更新过多**：这是预期行为，可通过 Slack 通知设置管理。

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

从 Slack 启动 Cursor 时，可指定**命名多仓库环境**（multi-repo environment），而非单一默认仓库。Cursor 根据请求自动定位包含 frontend、backend、shared code 的环境。

中途若需访问当前环境外的仓库，Cursor 弹出 **Switch repository** 按钮，选择后从断点继续。

### 适用场景

- **适合**：前后端分离、微服务多仓库架构的团队
- **不适合**：单仓库项目（使用默认即可）

### 前置条件

Cursor Teams/Enterprise；在 Cursor Dashboard 配置 multi-repo environments

### 详细使用步骤（业务用户）

1. 在 Cursor Dashboard → Settings → Environments 创建 multi-repo environment
2. 添加所需仓库（frontend、backend、shared 等）
3. 在 Slack 中指定环境名称启动任务
4. 中途需要其他仓库时，点击 Switch repository

### 命令与配置示例

```text
# Slack 中指定环境：
@Cursor [env:fullstack] Update API endpoint in backend and sync frontend types

# 中途 Cursor 可能提示：
# "I need access to shared-lib repo. [Switch repository]"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 描述 | ✅ |
| 多仓库实际切换 | ⚠️ 未实测 |

### 问题与解决方案

**环境未找到**：在 Dashboard 确认环境名称拼写。**切换后上下文丢失**：官方称从断点继续，若丢失请重新描述任务。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈团队 | 配置 multi-repo environment 提升 Slack 任务效率 |
| 单仓库用户 | 无需额外配置 |

---

## 特性三：跨频道工作流（7/17）

### 是什么（机制说明）

Cursor in Slack 现在可**读取和发送**其他 Slack 频道与线程的消息。任务执行中可从工作区其他地方拉取上下文，并在原始线程或相关频道发布更新。

### 适用场景

- **适合**：跨频道协作、需要从 #bugs 拉取报告在 #dev 修复、向 #releases 发布更新
- **不适合**：对频道权限有严格隔离要求的组织（需评估安全策略）

### 前置条件

Cursor Slack 集成；Bot 需有目标频道读取/发送权限

### 详细使用步骤（业务用户）

1. 在 Slack 中向 Cursor 描述需要跨频道上下文的任务
2. Cursor 自动从指定频道/线程拉取相关信息
3. 完成后 Cursor 在原始线程或指定频道发布结果

### 命令与配置示例

```text
@Cursor Check #bug-reports for the latest auth issue and fix it in our backend repo.
Post the fix summary back to #bug-reports when done.
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 描述 | ✅ |
| 跨频道实际行为 | ⚠️ 未实测 |

### 问题与解决方案

**无法读取频道**：检查 Bot 是否已加入目标频道。**消息发送到错误频道**：在任务描述中明确指定目标频道。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 跨职能团队 | 利用跨频道能力减少上下文切换 |
| 安全敏感组织 | 评估 Bot 频道权限范围 |

---

## 特性四：桌面端 3.11 — Side Chats 与对话搜索（7/10，持续可用）

### 是什么（机制说明）

3.11（7/10 发布）核心功能在 7/18 仍为最新桌面大版本：

- **Side chats**：`/side`、`/btw` 或聊天面板顶部 + 按钮创建并行侧对话，共享主对话上下文
- **对话搜索**：Agents Window 中 Cmd+K 搜索 agent transcripts；对话内 Cmd+F 搜索
- **项目/仓库选择器重构**：No Repo / On This Computer / Cloud 分组；Run on 选择器
- **Cloud Agent hooks 扩展**：`beforeSubmitPrompt`、`afterAgentResponse`、`afterAgentThought`、`stop`、`subagentStart` 等

### 适用场景

- **适合**：需要并行探索想法而不打断主 Agent 的开发者
- **不适合**：简单单次任务（side chat 增加复杂度）

### 前置条件

Cursor 桌面端 ≥ 3.11

### 详细使用步骤（业务用户）

1. 在主 Agent 对话中输入 `/side` 或点击 + 创建 side chat
2. 在 side chat 中提问、调研，主 Agent 继续运行
3. 用 @mention 将 side chat 上下文拉回主线程
4. Cmd+K 在 Agents Window 搜索历史对话

### 命令与配置示例

```text
/side What are the trade-offs of using Redis vs Memcached for session storage?
/btw Can you also check if we have any existing caching layer?
```

```json
// .cursor/permissions.json（团队权限配置示例）
{
  "allow": ["read", "write", "terminal"],
  "deny": ["network"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.11 | ✅ |
| 桌面 GUI 功能 | ⚠️ 未实测（Cloud Agent 无 GUI） |

### 问题与解决方案

**Side chat 无上下文**：确认从主对话创建而非独立新对话。**搜索无结果**：本地搜索索引需时间构建，新安装后稍等。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Cursor 用户 | 用 side chat 做并行调研，提升主 Agent 效率 |
| 新用户 | 先熟悉主对话，再尝试 side chat |

---

## 特性五：Cloud Agent 与 Automations（持续能力）

### 是什么（机制说明）

Cursor Cloud Agent 支持在隔离 VM 中运行完整开发环境，可测试、验证并创建 PR。Automations 支持 cron、GitHub PR、Slack 等触发器自动运行 Agent 任务。`.cursor/permissions.json` 控制工具权限。

### 适用场景

- **适合**：定时日更、PR 自动审查、无人值守任务
- **不适合**：需要本地 GPU 或特殊硬件的任务

### 前置条件

Cursor 付费计划；GitHub 仓库连接

### 详细使用步骤（业务用户）

1. 在 Cursor Dashboard 创建 Automation，配置触发器（如 cron `0 9 * * *`）
2. 编写 Instructions 描述任务
3. Agent 在 Cloud VM 中执行，结果 push 到指定分支
4. 审查 PR 或 Automation 输出

### 命令与配置示例

```bash
# Cloud Agent 环境信息
# 工作目录：/workspace
# 分支：cursor/dayai-58db（或配置指定分支）

# 本地触发 build-index
node tools/build-index.js
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent 运行 | ✅ 当前任务即 Cloud Agent 执行 |
| 桌面 GUI | ⚠️ 未实测 |

### 问题与解决方案

**Automation 未触发**：检查 cron 时区（UTC）和触发器配置。**Push 失败**：`git pull --rebase origin main` 后重试。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs Cloud Agent | ✅ |
| 当前 Automation 运行 | ✅ 实证 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 维护者 | 用 Automations 做定时文档/测试任务 |
| 开发者 | Cloud Agent 适合 PR 生成和代码审查 |

---

## 版本对照表

| 版本/日期 | 核心变更 |
|-----------|----------|
| **Slack 7/17** | 计划先行、多仓库环境、跨频道工作流 |
| 3.11 (7/10) | Side chats、对话搜索、选择器重构、Cloud Agent hooks |
| 3.10 (6/30) | Team MCPs、组织组 Marketplace 访问 |
| 3.9 (6/29) | Cursor for iOS 公测、Remote Control |

## 今日研究员结论

7/18 Cursor 无新 Changelog，但 7/17 Slack 集成的三项增强（计划先行、多仓库、跨频道）对团队协作价值显著。桌面端 3.11 功能稳定，建议 Teams 用户配置 multi-repo environment 并在 Slack 中试用计划先行工作流。Fable 5 窗口明日截止，Cursor + 国产模型组合可能成为国内开发者备选方案。

---
