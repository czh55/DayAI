# Cursor 每日技术文档 — 2026-07-12

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 12 日 [Cursor Changelog](https://cursor.com/changelog) **无新条目**——距 **3.11（2026-07-10）** 发布已 **2** 日，进入典型「发版后消化期」。3.11 仍是当前最新版，核心增量：**Side Chats**（`/side`/`/btw`）、**Conversation Search**（Cmd+K / Cmd+F）、**Redesigned Project/Repo Pickers**、**Cloud Agent 对话级 Hooks**（`beforeSubmitPrompt`、`afterAgentResponse` 等）。本 DayAI Automation cron（`0 22 * * *` UTC）连续第 **12** 日触发；今日无 Changelog 更新，文档侧重 3.11 能力拆解与 Fable 5 截止日背景下的模型选型建议。

---

## 特性一：Side Chats — 主 Agent 旁的持久探索对话（3.11，第 3 日观察）

### 是什么（机制说明）

Side Chats 允许在不打断主 Agent 会话的情况下，开启并行的探索性 Agent 对话。通过 `/side`、`/btw` 或聊天面板顶部「+」按钮创建。每个 side chat 是**持久、完整**的 Agent 对话——可后续跟进、稍后 revisit、通过 @mention 将上下文拉回主线程。

默认行为侧重**阅读、搜索、回答**（非写代码/改文件），适合：澄清问题、调研备选方案而不提交主任务 pivot、在主 Agent 跑长任务时 sanity-check 决策。3.11 于 7/10 发布，7/12 无补丁或 follow-up 公告。

### 适用场景

- **适合**：主 Agent 执行重构/测试时旁路调研；Fable 5 截止日前主线程跑高价值任务、side chat 做澄清
- **不适合**：需要修改同一文件集的并行写操作（可能冲突）

### 前置条件

- Cursor 3.11+（2026-07-10 发布，7/12 仍为最新）
- 付费计划（与 Cloud Agent 功能对齐）

### 详细使用步骤（业务用户）

1. 升级至 3.11 → 主对话输入 `/side` 或 `/btw`（或点 **+**）
2. side chat 中调研，主 Agent 继续运行
3. 结论 @mention 回主线程；Agents Window 可 revisit
4. **Settings → General → Update** 确认版本 ≥ 3.11

### 命令与配置示例

```text
# 主对话中创建 side chat
/side 这个报错通常意味着什么？会不会影响我们的迁移方案？

# 别名
/btw 查一下 React 19 的 breaking changes 列表

# 拉回主线程（概念性）
@side-chat-1 根据刚才的结论，主任务继续用方案 B
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.11 Side Chats | ✅ 7/10 官方发布 |
| 7/12 Changelog 更新 | ❌ 无新条目 |
| `/side` 交互 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 持久化与 @mention | ⚠️ 未实测 |

### 问题与解决方案

**Side chat 改文件**：默认读/搜/答，写操作切回主对话。**找不到历史**：Agents Window 列表。**主线程无上下文**：@mention 拉回。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ 7/10 发布，7/12 无更新 |
| InfoQ Ralph Loop 叙事 | ✅ Side chat 与「主循环 + 旁路探索」契合 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | 升级 3.11 后试用 side chat，长任务旁路调研 |
| Tech Lead | 用 side chat 做架构 sanity-check |
| 自动化用户 | Automations 仍走主 Agent 路径 |

---

## 特性二：Conversation Search — 全文搜索 Agent 转录（3.11）

### 是什么（机制说明）

3.11 引入两层搜索：

1. **Agents Window 全局搜索**：Cmd+K 打开命令面板，搜索 Agent 转录全文（超越名称和 PR 号）；Cursor 构建本地搜索索引，支持数千对话规模
2. **对话内搜索**：Cmd+F 在当前对话中跳转匹配项，显示匹配计数器

对 DayAI 这类每日自动化场景，Conversation Search 可快速定位历史日更 run 的讨论与决策。

### 适用场景

- **适合**：管理大量 Agent 对话、回溯历史决策
- **不适合**：仅使用单次对话的用户

### 前置条件

Cursor 3.11+；Agents Window 可用。

### 详细使用步骤（业务用户）

1. **Agents Window** → Cmd+K → 输入关键词搜索历史对话
2. 打开目标对话 → Cmd+F → 跳转匹配项
3. 长转录中滚动时搜索保持可用

### 命令与配置示例

```text
# Agents Window
Cmd+K → 输入 "Fable 5 fallbackModel"

# 对话内
Cmd+F → 输入 "build-index.js"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Conversation Search | ✅ 7/10 官方 |
| Cmd+K / Cmd+F 交互 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**搜索无结果**：确认 3.11+ 并等待本地索引构建。**索引慢**：首次搜索后性能改善。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Agent 用户 | 升级 3.11 后立即试用全局搜索 |
| 团队 Lead | 用搜索回溯 PR/决策讨论 |

---

## 特性三：Cloud Agent 对话级 Hooks（3.11 新增）

### 是什么（机制说明）

3.11 在既有 Team Hooks（工具执行、文件/shell 工作）基础上，新增**对话级 Hooks**，可观察和控制 Agent 对话本身：

- `beforeSubmitPrompt`：提交 prompt 前拦截
- `afterAgentResponse`：Agent 响应后处理
- `afterAgentThought`：思考过程后处理
- `stop`：停止时触发
- `subagentStart`：子代理启动时
- 以及 compaction、turn completion 等

用于构建自校正循环（self-correcting loops）和子代理编排。

### 适用场景

- **适合**：企业合规审计、自动化质量门禁、子代理编排
- **不适合**：个人轻量使用

### 前置条件

Cursor Teams/Enterprise；Cloud Agent 启用；Hooks 配置文件。

### 详细使用步骤（业务用户）

1. **Dashboard → Settings → Hooks** 配置 Cloud Agent hooks
2. 参考 [Cursor Docs — Hooks](https://cursor.com/docs) 编写 hook 脚本
3. 部署 `beforeSubmitPrompt` 做敏感信息过滤
4. 部署 `afterAgentResponse` 做输出质量检查
5. 用 `subagentStart` 控制子代理启动条件

### 命令与配置示例

```json
// .cursor/hooks.json（概念示例，以官方文档为准）
{
  "hooks": {
    "beforeSubmitPrompt": {
      "command": "node",
      "args": ["./hooks/filter-prompt.js"]
    },
    "afterAgentResponse": {
      "command": "node",
      "args": ["./hooks/check-response.js"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Cloud Agent Hooks | ✅ 7/10 官方 |
| Hook 脚本执行 | ⚠️ 未实测（需 Teams 计划 + GUI） |

### 问题与解决方案

**Hook 不触发**：确认 Cloud Agent 模式且 hook 路径正确。**子代理失控**：用 `subagentStart` 加白名单。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |
| InfoQ Harness 叙事 | ✅ hooks 是 Harness 工程化组件 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 评估对话级 hooks 做合规审计 |
| Agent 工程师 | 用 hooks 构建自校正循环 |
| 个人用户 | 暂不需要 |

---

## 特性四：Redesigned Project/Repo Pickers + Cloud Agent 环境（3.11）

### 是什么（机制说明）

3.11 简化项目/仓库选择器：

- 搜索按工作位置分域：This Computer、Cloud、特定 Remote Machine
- 可在选择器内创建项目并连接 GitHub/GitLab/Azure DevOps
- **Run on** 选择器：Cloud / This Computer / Remote Machines
- 分支选择器默认打开 default branch 和最近使用分支
- Multi-repo 选择改为 Cloud/This Computer flyout 内 **Select Multiple** 切换

Cloud Agent 在本环境（Cursor Automation）运行于隔离 VM，支持 tmux、MCP、git push 等。

### 适用场景

- **适合**：多仓库项目、Cloud/Local 混合工作流
- **不适合**：单仓库简单场景（变化感知有限）

### 前置条件

Cursor 3.11+；GitHub/GitLab 账户（Cloud 仓库）。

### 详细使用步骤（业务用户）

1. 打开 Agents Window → 点击项目/仓库选择器
2. 选择 **Cloud** 或 **This Computer**
3. **Run on** 选择运行环境
4. Multi-repo：在 flyout 内开启 **Select Multiple**
5. 输入 `none` 或 `no repo` 选择无仓库模式

### 命令与配置示例

```text
# 选择器快捷
输入 "none" 或 "no repo" → No Repo 模式

# Cloud Agent 权限
Settings → Cursor Settings → Cloud → 确认 egress 策略
```

```json
// .cursor/permissions.json
{
  "allow": ["Shell", "Grep", "Read", "Write"],
  "deny": []
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Picker 重设计 | ✅ 7/10 官方 |
| Cloud Agent 本环境运行 | ✅ 当前 Automation 即 Cloud Agent |
| Picker UI 交互 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**找不到 Cloud 仓库**：确认 GitHub 授权。**Multi-repo 冲突**：检查 Select Multiple 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 Picker | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多仓库开发者 | 升级 3.11 试用新选择器 |
| Cloud Agent 用户 | 熟悉 Run on 选择器 |
| 自动化用户 | 本环境已跑 Cloud Agent |

---

## 特性五：Composer 2.5、Bugbot、`/review` 与 SDK Custom Tools（生态对照）

### 是什么（机制说明）

3.11 未更新 Composer 模型，但生态能力仍为核心：

- **Composer 2.5**：Cursor 自研编程模型（Terminal-Bench 2.0 69.3%）；85% 算力用于后训练/RL
- **Bugbot**：PR 自动审查；与 3.8 Automations GitHub 触发器联动
- **`/review`**：本地代码审查 slash 命令
- **SDK Custom Tools**：Cursor Agent SDK 支持自定义工具注册
- **`.cursor/permissions.json`**：细粒度 Agent 权限控制

Fable 5 截止日背景下，Cursor 用户可评估 Composer 2.5 vs 外部模型（Claude/GPT）的性价比。

### 适用场景

- **适合**：PR 审查自动化、SDK 集成、权限管控
- **不适合**：仅需基础补全的用户

### 前置条件

Cursor 付费计划；GitHub 集成（Bugbot）；SDK 开发环境。

### 详细使用步骤（业务用户）

1. **Settings → Models** 选择 Composer 2.5 或外部模型
2. PR 页面启用 Bugbot 自动审查
3. 本地对话输入 `/review` 审查选中代码
4. SDK 项目注册 custom tools
5. 项目根目录配置 `.cursor/permissions.json`

### 命令与配置示例

```text
/review           # 本地代码审查
/bugbot           # Bugbot 相关命令（若可用）
```

```json
// .cursor/permissions.json
{
  "allow": ["Shell(git *)", "Read", "Grep"],
  "deny": ["Shell(rm -rf *)"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer 2.5 文档 | ✅ Cursor 官方 |
| Bugbot / `/review` | ⚠️ 未实测（无 GUI） |
| SDK Custom Tools | ⚠️ 未实测 |

### 问题与解决方案

**Composer 2.5 质量不足**：切换外部模型对比。**Bugbot 误报**：调整规则或手动 `/review`。**权限过严**：检查 `permissions.json`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 量子位 Composer 2.5 报道 | ✅ 与 Cursor 官方一致 |
| Changelog 3.11 无 Composer 更新 | ✅ 7/12 确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| PR 重度用户 | 启用 Bugbot + `/review` |
| SDK 集成者 | 注册 custom tools |
| Fable 5 截止日用户 | 评估 Composer 2.5 作为替代 |

---

## 版本对照表

| 版本 | 发布日期 | 核心变更 |
|------|----------|----------|
| **3.11** | 2026-07-10 | Side Chats、Conversation Search、Picker 重设计、Cloud Agent Hooks |
| 3.10 | 2026-06-30 | Team MCPs、Organization Groups |
| 3.9 | 2026-06-29 | Cursor iOS、Cloud agents on mobile |
| 3.8 | 2026-06-18 | Automations `/automate`、GitHub/Slack 触发器、Computer use |

## 今日研究员结论

Cursor **3.11 发版第 3 日无新 Changelog**，Side Chats 与 Conversation Search 进入用户反馈收集期。Cloud Agent 对话级 Hooks 是企业 Harness 工程化的重要增量。Fable 5 今日截止背景下，Cursor 用户可评估 Composer 2.5 作为编码模型替代。建议保持 3.11 最新版，重度 Agent 用户试用 Side Chats + 全局搜索提升工作流效率。
