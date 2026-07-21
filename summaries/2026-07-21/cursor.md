# Cursor 每日技术文档 — 2026-07-21

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 21 日 Cursor **无新 Changelog 条目**。最近更新仍为 **7/17 Slack 集成改进**（计划先行、多仓库环境、跨频道工作流）。桌面端 **3.11**（7/10 Side Chats + Conversation Search）无变动。

同日国际侧 Claude Code 2.1.217 与 Codex 0.145.0 发布，Codex 新增 `/import` 可迁移 Cursor 设置——对考虑从 Cursor 分流的用户值得关注。

---

## 特性一：7/17 Slack 集成改进（仍为最近更新）

### 是什么（机制说明）

7/17 Changelog 三项核心改进：

1. **计划先行**：Cursor 在 Slack 中开始任务前先分享执行计划，用户可早期介入调整
2. **多仓库环境**：从 Slack 启动时可选择 named multi-repo environment，AI 自动跨前后端仓库工作
3. **跨频道工作流**：任务中可读取其他频道/线程上下文，并将更新发回原线程或相关频道

### 适用场景

- **适合**：团队在 Slack 中协作、多仓库微服务架构、需要跨频道拉取上下文
- **不适合**：纯本地 IDE 工作流、单仓库简单项目

### 前置条件

Cursor Team/Enterprise 订阅；Slack 集成已配置；Cloud Agent 环境已设置

### 详细使用步骤（业务用户）

1. 在 Slack 中 @Cursor 或在与 Cursor 集成的频道发消息
2. Cursor 回复执行计划，确认或调整方向
3. 若需跨仓库：在环境设置中配置 multi-repo environment
4. 任务进行中，Cursor 更新状态；可从其他频道拉取上下文
5. 完成后在 Slack 线程查看 diff 与 PR 链接

### 命令与配置示例

```text
# Slack 中示例消息
@Cursor 修复 frontend 仓库的登录 bug，可能需要检查 backend 的 auth API

# Cursor 将：
# 1. 回复计划（涉及 frontend + backend 仓库）
# 2. 若需切换仓库，提示 Switch repository 按钮
# 3. 从 #backend-team 频道拉取相关讨论
```

```json
// .cursor/environment.json — 多仓库环境示例
{
  "repos": [
    {"name": "frontend", "path": "/workspace/frontend"},
    {"name": "backend", "path": "/workspace/backend"},
    {"name": "shared", "path": "/workspace/shared-lib"}
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Slack 集成 | ⚠️ 未实测（Cloud Agent 无 Slack 环境） |
| Changelog 确认 | ✅ 7/17 条目存在 |

### 问题与解决方案

**计划不出现**：确认 Slack 集成版本 ≥ 7/17，检查 Team 订阅状态。**多仓库切换失败**：在 Cursor Settings → Cloud → Environments 中预配置 named environment。**跨频道权限**：确认 Cursor bot 已被邀请到目标频道。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| cursor.com/changelog 7/17 | ✅ 官方 |
| cursor.com 首页 Changelog 摘要 | ✅ 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Lead | 配置 multi-repo environment，统一 Slack 工作流 |
| 个人开发者 | 若不用 Slack，可忽略此更新 |
| DevOps | 利用跨频道能力拉取 incident 上下文 |

---

## 特性二：3.11 Side Chats 与 Conversation Search（7/10，仍有效）

### 是什么（机制说明）

Cursor 3.11（7/10）引入：

- **Side Chats**：通过 `/side`、`/btw` 或加号按钮打开并行对话，继承主会话上下文但不中断主线程
- **Conversation Search**：Agents Window 中 Cmd+K 全局搜索历史对话；单会话内 Cmd+F 跳转
- **Cloud Agent Hooks**：`beforeSubmitPrompt`、`afterAgentResponse`、`afterAgentThought`、`stop`、`subagentStart`

### 适用场景

- **适合**：长任务中需并行探索分支方案；需要回溯历史对话中的技术决策
- **不适合**：简单单次问答

### 前置条件

Cursor 3.11+；桌面应用已更新

### 详细使用步骤（业务用户）

1. 更新 Cursor 到 3.11+（Help → Check for Updates）
2. 在主 Agent 会话中，点击 `+` 或输入 `/side` 打开 Side Chat
3. 在 Side Chat 中探索分支问题，完成后可用 @mention 将结论带回主线程
4. 搜索历史：Agents Window → Cmd+K → 输入关键词
5. 配置 Hooks：项目根目录创建 `.cursor/hooks.json`

### 命令与配置示例

```text
/side 探索一下如果用 Redis 替代内存缓存的可行性
/btw 顺便检查一下这个 API 的 rate limit 配置
```

```json
// .cursor/hooks.json
{
  "hooks": [
    {
      "event": "beforeSubmitPrompt",
      "command": "node scripts/validate-prompt.js"
    },
    {
      "event": "afterAgentResponse",
      "command": "node scripts/log-response.js"
    }
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 桌面功能 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog | ✅ 3.11 功能确认 |

### 问题与解决方案

**Side Chat 不继承上下文**：确认 Cursor ≥ 3.11，Side Chat 应从主会话分叉。**搜索无结果**：本地索引需时间构建，新安装后等待首次索引完成。**Hooks 不触发**：确认 `.cursor/hooks.json` 路径正确，Hooks 在 Cloud 执行环境运行。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| Developers Digest 7/11 | ✅ 功能解读一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Agent 用户 | 善用 Side Chat 避免主线程污染 |
| 平台团队 | 用 Hooks 实现成本控制和审计 |
| 新用户 | 先掌握主会话，再探索 Side Chat |

---

## 特性三：Cloud Agent 与 `.cursor/permissions.json`（持续有效）

### 是什么（机制说明）

Cloud Agent 在远程环境执行代码变更，通过 `.cursor/permissions.json` 控制 Agent 可执行的操作范围。与 7/17 Slack 集成、3.11 Hooks 配合，形成「远程执行 + 权限控制 + 可观测性」闭环。

### 适用场景

- **适合**：需要远程自动化但需限制危险操作；团队协作中统一权限策略
- **不适合**：完全信任的本地开发（可用更宽松配置）

### 前置条件

Cursor 订阅含 Cloud Agent；仓库根目录可写 `.cursor/permissions.json`

### 详细使用步骤（业务用户）

1. 在项目根目录创建 `.cursor/permissions.json`
2. 定义允许/禁止的文件操作、命令、网络访问
3. 在 Cursor Settings → Cloud Agent 中启用权限检查
4. 启动 Cloud Agent 任务，越权操作将被拒绝并提示
5. 结合 7/17 Slack 集成，在 Slack 中收到权限拒绝通知

### 命令与配置示例

```json
// .cursor/permissions.json
{
  "allow": [
    "read:**",
    "write:src/**",
    "write:tests/**",
    "bash:npm test",
    "bash:git status"
  ],
  "deny": [
    "write:.env*",
    "bash:rm -rf*",
    "bash:curl*"
  ]
}
```

```json
// 更严格的企业配置
{
  "allow": [
    "read:**",
    "write:src/**"
  ],
  "deny": [
    "bash:*",
    "write:**/.env*",
    "network:*"
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| permissions.json | ⚠️ 未实测（本任务在 Cloud Agent 环境运行） |
| 文档 | ✅ cursor.com/docs 有 permissions 说明 |

### 问题与解决方案

**Agent 操作被拒绝**：检查 permissions.json 是否过于严格，按需放宽 `allow` 规则。**permissions 不生效**：确认文件位于仓库根目录 `.cursor/` 下，且 Cloud Agent 已启用权限检查。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs | ✅ |
| 社区实践 | ✅ 广泛采用 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 安全敏感项目 | 默认 deny-all，逐步放开 |
| 开源项目 | 允许 read + 限定 write 路径 |
| 个人项目 | 可较宽松，但仍建议保护 `.env` |

---

## 特性四：Codex `/import` 对 Cursor 用户的迁移影响（7/21 关联）

### 是什么（机制说明）

Codex 0.145.0（今日发布）新增 `/import`，可迁移 Cursor 的：

- 设置（settings）
- MCP 服务器配置
- 插件
- 会话历史
- 命令（commands）
- 项目级 memories

这对考虑从 Cursor 分流至 Codex 的用户降低了迁移摩擦。

### 适用场景

- **适合**：Fable 5 分层后 Pro 用户评估 Codex；希望保留 Cursor 配置的用户
- **不适合**：满意 Cursor 工作流且无迁移需求的用户

### 前置条件

Codex CLI 0.145.0+；原 Cursor 配置存在于默认路径

### 详细使用步骤（业务用户）

1. 安装 Codex 0.145.0：`npm install -g @openai/codex@latest`
2. 运行 `codex /import` 或按提示选择 Cursor 作为来源
3. 选择要迁移的组件（settings、MCP、plugins 等）
4. 验证迁移结果：`codex doctor`
5. 在 Codex 中测试原有 MCP 服务器和命令是否正常工作

### 命令与配置示例

```bash
npm install -g @openai/codex@0.145.0
codex --version
# codex-cli 0.145.0

codex
# 在 TUI 中输入 /import，选择 Cursor
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Codex 0.145.0 安装 | ✅ 本地实测确认 |
| `/import` 迁移 | ⚠️ 未实测（无 Cursor 本地配置） |

### 问题与解决方案

**部分 MCP 不兼容**：Codex 与 Cursor MCP 实现可能有差异，逐个验证。**会话历史不完整**：实验性功能，重要会话建议手动备份。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex 0.145.0 Release | ✅ |
| GitHub #31672, #33411 等 PR | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Cursor Pro 用户 | 评估 Codex 分流，用 `/import` 降低迁移成本 |
| 团队 | 并行测试两工具，不急于全量迁移 |
| MCP 重度用户 | 迁移后逐个验证 MCP 兼容性 |

---

## 特性五：Composer 与 Bugbot 持续能力（无新变更）

### 是什么（机制说明）

Cursor 3.11 中 Composer（多文件编辑 Agent）与 Bugbot（自动 PR 审查）无新版本变更，仍为当前主力能力。Composer 支持 `@` 引用文件/文件夹/文档；Bugbot 在 GitHub PR 上自动审查。

### 适用场景

- **适合**：多文件重构、PR 自动审查
- **不适合**：单文件小改动（直接用 Tab 补全更高效）

### 前置条件

Cursor 订阅；GitHub 集成（Bugbot）

### 详细使用步骤（业务用户）

1. **Composer**：Cmd+I（Mac）/ Ctrl+I（Win）打开，描述多文件任务
2. 使用 `@filename` 引用上下文
3. **Bugbot**：在 Cursor Settings → Integrations → GitHub 启用
4. PR 创建后 Bugbot 自动审查并留言
5. 使用 `/review` 手动触发审查

### 命令与配置示例

```text
# Composer 中
@src/api/ @src/models/ 重构用户认证模块，统一使用 JWT

# 手动审查
/review
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer/Bugbot | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**Composer 上下文不足**：增加 `@` 引用或使用 Side Chat 补充。**Bugbot 未触发**：检查 GitHub App 安装与仓库权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发 | Composer 处理多文件，Tab 处理单点 |
| 团队 | 启用 Bugbot 作为 PR 第一道审查 |

---

## 版本对照表

| 版本/日期 | 关键变更 |
|-----------|----------|
| **7/21** | 无新 Changelog |
| 7/17 | Slack 计划先行、多仓库、跨频道 |
| 3.11 (7/10) | Side Chats、Conversation Search、Hooks |
| 3.10 (6/30) | Team MCPs、Organization Marketplaces |
| 3.9 (6/29) | Cursor Mobile iOS |

## 今日研究员结论

Cursor 7/21 无新更新，7/17 Slack 集成与 3.11 Side Chats 仍为最近重要能力。值得关注的是 Codex 0.145.0 `/import` 降低了从 Cursor 迁移的摩擦——在 Fable 5 分层背景下，Pro 用户可并行评估两工具。桌面功能 ⚠️ 未实测，以官方 Changelog 为准。

---
