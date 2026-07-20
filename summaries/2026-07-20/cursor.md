# Cursor 每日技术文档 — 2026-07-20

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 20 日 Cursor **无新 Changelog 条目**。最近更新仍为 **7/17 Slack 集成增强**（计划先行、多仓库环境、跨频道工作流），桌面端版本 **3.11**（7/10 发布）无变动。在 Fable 5 分层今日落地的背景下，Cursor 作为 Claude Code 的竞品 IDE，其 Cloud Agent 与 Composer 2.5 自研模型路线值得关注。

---

## 特性一：Cursor in Slack 计划先行与多仓库（7/17 发布，仍为最新）

### 是什么（机制说明）

7/17 Changelog 三项核心更新：

1. **计划先行（Plan-first）**：Cursor 在 Slack 中开始工作前先展示计划，用户可早期介入和重定向
2. **多仓库环境**：从 Slack 可在命名多仓库环境中启动，前端/后端/共享代码分属不同 repo 时自动定位
3. **跨频道工作流**：任务中可读取和发送其他 Slack 频道/线程的消息

### 适用场景

- **适合**：团队在 Slack 中协作、多 repo 微服务架构、需要跨频道拉取上下文
- **不适合**：纯本地 IDE 开发、不使用 Slack 的团队

### 前置条件

Cursor Teams/Enterprise 方案；Slack 集成已配置；Cloud Agent 已启用

### 详细使用步骤（业务用户）

1. 在 Cursor Dashboard → Integrations 配置 Slack 集成
2. 在 Slack 中 @Cursor 或发送到 Cursor 频道
3. Cursor 先回复计划，确认后点击开始
4. 多 repo 场景：在 Dashboard 配置 Multi-repo Environment，命名环境并关联 repos
5. 任务中若需切换 repo，点击「Switch repository」按钮

### 命令与配置示例

```text
# Slack 中向 Cursor 发送任务
@Cursor 修复 backend API 的认证 bug，同时更新 frontend 的登录页面

# Cursor 会先回复类似：
# Plan:
# 1. 检查 backend/auth 模块
# 2. 定位 bug 并修复
# 3. 更新 frontend 登录组件
# 4. 运行测试
```

```json
// .cursor/permissions.json — Cloud Agent 权限控制
{
  "allow": [
    "Read",
    "Edit",
    "Shell(npm test)",
    "Shell(git *)"
  ],
  "deny": [
    "Shell(rm -rf *)"
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Slack 集成功能 | ⚠️ 未实测（Cloud Agent 无 Slack 环境） |
| 多仓库环境 | ⚠️ 未实测 |
| Changelog 7/17 条目 | ✅ 官方页面确认存在 |

### 问题与解决方案

**Cursor 不回复计划直接执行**：检查 Slack 集成版本，确保 Cursor 客户端已更新至 3.11+。**多 repo 切换失败**：在 Dashboard 确认 Environment 配置包含所有目标 repo。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 7/17 | ✅ 三项更新原文 |
| Cursor Slack Docs | ✅ 操作步骤一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Lead | 配置 Multi-repo Environment 统一团队工作流 |
| 个人开发者 | Slack 集成适合异步任务，本地仍用 IDE |

---

## 特性二：Side Chats 与对话搜索（3.11，7/10 发布）

### 是什么（机制说明）

Cursor 3.11 引入：

- **Side Chats**：用 `/side`、`/btw` 或聊天面板顶部 `+` 按钮创建旁路对话，不打断主 Agent 会话
- **对话搜索**：Agents Window 中 Cmd+K 搜索历史 transcript；会话内 Cmd+F 搜索
- **项目/仓库选择器重设计**：搜索按 This Computer / Cloud / Remote 分组

### 适用场景

- **适合**：主 Agent 运行时需并行调研、澄清问题、验证决策
- **不适合**：简单单线程任务

### 前置条件

Cursor 3.11+；桌面端已安装

### 详细使用步骤（业务用户）

1. 在主 Agent 会话运行时，点击聊天面板顶部 `+` 或输入 `/side`
2. 在 Side Chat 中提问，默认聚焦读取/搜索/回答
3. 用 @-mention 将 Side Chat 上下文拉回主线程
4. Agents Window → Cmd+K 搜索历史对话
5. 会话内 Cmd+F 跳转到匹配项

### 命令与配置示例

```text
/side 这个 API 端点的认证方式是什么？
/btw 有没有更简单的实现方案？
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Side Chats | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 对话搜索 | ⚠️ 未实测 |

### 问题与解决方案

**Side Chat 无上下文**：确保从主会话的 `+` 按钮创建，而非新建独立会话。**搜索无结果**：本地搜索索引需时间构建，首次使用可能较慢。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ 功能描述完整 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度用户 | Side Chat 避免打断长任务主流程 |
| 新用户 | 先从主会话开始，熟悉后再用 Side Chat |

---

## 特性三：Cloud Agent Hooks（3.11，7/10 发布）

### 是什么（机制说明）

Cloud Agent 新增对话级 hooks，可观察和控制 Agent 会话本身：

- `beforeSubmitPrompt`：提交 prompt 前拦截
- `afterAgentResponse`：Agent 回复后触发
- `afterAgentThought`：思考过程后触发
- `stop`：会话停止时触发
- `subagentStart`：子 Agent 启动时触发
- 以及 compaction、turn completion 等

配合已有工具级 hooks（tool execution、file/shell），可构建自校正循环。

### 适用场景

- **适合**：企业合规审计、自动化 QA 流程、自定义 Agent 行为控制
- **不适合**：个人轻量使用

### 前置条件

Cursor Teams/Enterprise；Cloud Agent 已启用；Dashboard 配置 Team Hooks

### 详细使用步骤（业务用户）

1. 进入 Cursor Dashboard → Settings → Team Hooks
2. 选择 hook 类型（如 `afterAgentResponse`）
3. 配置 webhook URL 或内联脚本
4. 在 Cloud Agent 会话中验证 hook 触发
5. 参考 [Cursor Hooks Docs](https://cursor.com/docs) 完整列表

### 命令与配置示例

```json
// Team Hook 配置示例（Dashboard）
{
  "hook": "afterAgentResponse",
  "url": "https://your-server.com/cursor-hook",
  "events": ["response_complete"]
}
```

```json
// .cursor/permissions.json
{
  "cloudAgent": {
    "hooks": {
      "beforeSubmitPrompt": "validate-prompt.sh"
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent Hooks | ⚠️ 未实测（需 Teams 方案 + Dashboard 配置） |
| Hook 文档 | ✅ Cursor Docs 可查 |

### 问题与解决方案

**Hook 未触发**：确认 Teams 方案已启用 Cloud Agent hooks；检查 webhook URL 可达性。**Hook 延迟过高**：避免在 hook 中执行耗时操作，使用异步处理。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ hooks 列表完整 |
| Cursor Docs | ✅ 配置步骤一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 用 hooks 实现合规审计与 QA 自动化 |
| 个人开发者 | 暂不需要，关注本地 Agent 即可 |

---

## 特性四：Composer 2.5 自研模型（持续能力）

### 是什么（机制说明）

Cursor Composer 2.5 为自研编程模型，基于 Kimi K2.5 基座 + 85% 算力用于后训练/RL。量子位（5/19）报道性能接近 Claude Opus 4.7，成本约 1/10。与 SpaceX Colossus 2 合作训练更大规模模型。

在 Fable 5 分层落地后，Composer 2.5 可作为 Pro 用户的低成本编程备选。

### 适用场景

- **适合**：日常编程任务、成本敏感场景、Cursor 重度用户
- **不适合**：需要 Fable 5 级别前沿推理的复杂任务

### 前置条件

Cursor 付费方案；在模型选择器中选择 Composer 2.5

### 详细使用步骤（业务用户）

1. 打开 Cursor → Settings → Models
2. 选择 Composer 2.5 作为默认 Agent 模型
3. 在 Agent 会话中正常使用，Composer 自动处理代码任务
4. 对比 Fable 5 credits 消耗，评估成本效益

### 命令与配置示例

```json
// Cursor Settings → Models
{
  "defaultModel": "composer-2.5",
  "agentModel": "composer-2.5"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer 2.5 | ⚠️ 未实测（Cloud Agent 环境使用 inherit 模型） |
| 模型定价 | ✅ 公开：输入 $0.5/MTok、输出 $2.5/MTok |

### 问题与解决方案

**Composer 质量不如预期**：复杂任务切换 Claude/GPT 模型；Composer 适合日常编程。**模型不可用**：检查 Cursor 方案是否包含 Composer 访问权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 量子位 Composer 2.5 报道 | ✅ 性能与定价数据 |
| Cursor 官方 | ✅ 模型在选择器中可用 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 成本敏感用户 | Fable 5 credits 紧张时用 Composer 2.5 |
| 重度编程用户 | Composer 2.5 日常 + Fable 5 关键任务 |

---

## 特性五：Bugbot 与 /review（持续能力）

### 是什么（机制说明）

Cursor Bugbot 为 PR 自动审查工具，集成 GitHub/GitLab。`/review` 命令在 Agent 会话中触发代码审查。与 Claude Code `/code-review` skill 形成竞品对比——Claude Code 2.1.215 起需显式调用，Cursor `/review` 仍可在会话中直接使用。

### 适用场景

- **适合**：PR 审查自动化、代码质量门禁
- **不适合**：非 Git 工作流

### 前置条件

Cursor 付费方案；GitHub/GitLab 集成已配置

### 详细使用步骤（业务用户）

1. 在 Cursor Dashboard 启用 Bugbot
2. 连接 GitHub/GitLab 仓库
3. 创建 PR 后 Bugbot 自动审查
4. 或在 Agent 会话中输入 `/review` 手动触发

### 命令与配置示例

```text
/review
/review src/auth/
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/review` | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Bugbot | ⚠️ 未实测 |

### 问题与解决方案

**Bugbot 未触发**：检查 GitHub App 权限；确认 PR 目标分支在配置范围内。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs | ✅ Bugbot 配置步骤 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Lead | 启用 Bugbot 作为 PR 质量门禁 |
| 个人开发者 | `/review` 作为提交前自检 |

---

## 版本对照表

| 版本/更新 | 日期 | 核心变更 |
|-----------|------|----------|
| Slack 集成增强 | 7/17 | 计划先行、多仓库、跨频道 |
| 3.11 | 7/10 | Side Chats、对话搜索、Cloud Agent hooks |
| 3.10 | 6/30 | Team MCPs、组织组 Marketplace |
| 3.9 | 6/29 | Cursor iOS 公测、Remote Control |

## 今日研究员结论

7/20 Cursor 无新更新，但 7/17 Slack 集成三项增强仍是最近重要变化。在 Fable 5 分层落地背景下，Cursor Composer 2.5（低成本）+ Cloud Agent（无 5h 限制）是值得 Pro 用户评估的 Claude Code 分流方案。建议关注 7/21 前后是否有新 Changelog 条目。

---
