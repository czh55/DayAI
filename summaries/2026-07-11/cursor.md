# Cursor 每日技术文档 — 2026-07-11

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 11 日 [Cursor Changelog](https://cursor.com/changelog) **无新条目**——距 **3.11（2026-07-10）** 发布仅 **1** 日，进入典型「发版次日消化期」。3.11 仍是当前最新版，核心增量：**Side Chats**（`/side`/`/btw`）、**Conversation Search**（Cmd+K / Cmd+F）、**Redesigned Project/Repo Pickers**、**Cloud Agent 对话级 Hooks**（`beforeSubmitPrompt`、`afterAgentResponse` 等）。本 DayAI Automation cron（`0 22 * * *` UTC）连续第 **11** 日触发；今日无 Changelog 更新，文档侧重 3.11 能力拆解与既有生态能力（Composer 2.5、Bugbot、`/review`、SDK custom tools、`.cursor/permissions.json`）交叉对照。

---

## 特性一：Side Chats — 主 Agent 旁的持久探索对话（3.11，发布次日观察）

### 是什么（机制说明）

Side Chats 允许在不打断主 Agent 会话的情况下，开启并行的探索性 Agent 对话。通过 `/side`、`/btw` 或聊天面板顶部「+」按钮创建。每个 side chat 是**持久、完整**的 Agent 对话——可后续跟进、稍后 revisit、通过 @mention 将上下文拉回主线程。

默认行为侧重**阅读、搜索、回答**（非写代码/改文件），适合：澄清问题、调研备选方案而不提交主任务 pivot、在主 Agent 跑长任务时 sanity-check 决策。3.11 于 7/10 发布，7/11 无补丁或 follow-up 公告，社区尚处早期试用反馈收集阶段。

### 适用场景

- **适合**：主 Agent 执行重构/测试时旁路调研；不想中断主线程的探索性问题
- **不适合**：需要修改同一文件集的并行写操作（可能冲突，应让主 Agent 串行）

### 前置条件

- Cursor 3.11+（2026-07-10 发布，7/11 仍为最新）
- 付费计划（与 Cloud Agent 功能对齐）

### 详细使用步骤（业务用户）

1. 升级至 3.11 → 主对话输入 `/side` 或 `/btw`（或点 **+**）
2. side chat 中调研，主 Agent 继续运行
3. 结论 @mention 回主线程；Agents Window 可 revisit

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
| 7/11 Changelog 更新 | ❌ 无新条目 |
| `/side` 交互 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 持久化与 @mention | ⚠️ 未实测 |

### 问题与解决方案

**Side chat 改文件**：默认读/搜/答，写操作切回主对话。**找不到历史**：Agents Window 列表。**主线程无上下文**：@mention 拉回。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ 7/10 发布，7/11 无更新 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | 升级 3.11 后试用 side chat，长任务旁路调研 |
| Tech Lead | 用 side chat 做架构 sanity-check，结论 @mention 回 PR 讨论 |
| 自动化用户 | Side chat 为人工交互特性，Automations 仍走主 Agent 路径 |

---

## 特性二：Conversation Search — 全文搜索 Agent 转录（3.11）

### 是什么（机制说明）

Cursor 3.11 引入 Agent 对话全文搜索，解决历史 Agent 会话「只记得 PR 号、找不到具体讨论」的痛点：

- **Agents Window 全局搜索**：命令面板 Cmd+K 搜索 agent transcripts，结果超越名称与 PR 号匹配
- **本地搜索索引**：可扩展至数千条对话，官方描述性能「snappy」
- **单对话内搜索**：Cmd+F 跳转匹配项，显示 match counter，长 transcript 滚动时持续搜索

7/11 无独立更新，但随 3.11 全量推送，重度 Agent 用户可立即受益。

### 适用场景

- **适合**：找回上周某次 Agent 讨论的具体命令/配置；审计历史 Agent 决策
- **不适合**：需跨仓库的全局知识管理（仍限于 Cursor 本地索引）

### 前置条件

- Cursor 3.11+
- Agents Window 已积累对话历史

### 详细使用步骤（业务用户）

1. Agents Window → Cmd+K 全局搜索关键词
2. 跳转对应对话 → Cmd+F 精确定位匹配行

### 命令与配置示例

```text
# Agents Window 全局搜索（UI 操作）
Cmd+K → 输入 "build-index.js" → 选择匹配对话

# 单对话内搜索
Cmd+F → 输入 "permissions.json" → Enter 跳转下一匹配
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Conversation Search | ✅ 3.11 官方 |
| 7/11 增量 | ❌ 无 |
| 本地索引性能 | ⚠️ 未实测（无 GUI） |
| Cmd+F 单对话搜索 | ⚠️ 未实测 |

### 问题与解决方案

**搜不到旧对话**：确认在 Agents Window 列表；首次搜索触发索引。**结果过多**：缩小关键词。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Agent 用户 | 升级 3.11 后立即试用 Cmd+K 搜索 |
| 团队 Lead | 用搜索审计 Agent 是否遵循项目规则 |
| 本 DayAI 任务 | 可用搜索找回历史 cron 运行中的配置讨论 |

---

## 特性三：Redesigned Project & Repo Pickers（3.11）

### 是什么（机制说明）

3.11 重设计项目与仓库选择器：一站式创建/连接 GitHub·GitLab·Azure DevOps；按 **This Computer / Cloud / Remote Machine** 分区搜索；**Run on** 选择 Agent 运行位置；Branch picker 默认+最近分支优先；**No Repo** 显式化（搜 `none`/`no repo`）；Multi-repo 通过 Select Multiple 切换。Changelog 共 16 条子项，7/11 无追加。

### 适用场景

- **适合**：多仓库、Cloud/Local 混合、Remote 开发
- **不适合**：单一本地仓库（感知变化弱）

### 前置条件

Cursor 3.11+；可选 Git 托管账号与 Remote 配置。

### 详细使用步骤（业务用户）

1. 打开项目选择器 → 选 **Run on**（Cloud / Local / Remote）
2. 分区搜索仓库或选 **No Repo**
3. Branch picker 选分支；Multi-repo 开启 Select Multiple
4. 选择器内直接 Connect 新 Git 托管

### 命令与配置示例

```text
Run on → Cloud → Select Multiple → 勾选 repo A + repo B
搜索框输入 none → 进入 No Repo 模式
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Picker | ✅ 3.11，16 条子项 |
| 7/11 更新 | ❌ 无 |
| UI 交互 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**找不到仓库**：确认分区正确。**Cloud-only repo**：选择器建议 clone 本地。**Branch 过长**：用搜索框。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |
| 3.9 mobile Cloud agents | ✅ 分区逻辑延续 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多 repo 开发者 | Select Multiple + 分区搜索 |
| Cloud Agent 用户 | Run on → Cloud 默认 |
| 本 Automation | czh55/DayAI Cloud 路径已固定 |

---

## 特性四：Cloud Agent 对话级 Hooks（3.11）

### 是什么（机制说明）

Cloud agents 此前已支持 team hooks 围绕**工具执行**与**文件/shell** 工作。3.11 新增**对话级 hooks**，可观察和控制 Agent 对话本身：

| Hook | 用途 |
|------|------|
| `beforeSubmitPrompt` | 提交前拦截/修改 |
| `afterAgentResponse` | 响应后审计 |
| `afterAgentThought` | 观察推理输出 |
| `stop` / `subagentStart` | turn 边界与子 Agent 控制 |

用于自纠错循环、合规审查、可观测性 pipeline。完整列表见 [Cursor Docs](https://cursor.com/docs)。

### 适用场景

- **适合**：企业 Cloud Agent 合规流水线、自动重试/纠错、subagent 编排
- **不适合**：个人开发者无 Team/Enterprise 计划（部分 hooks 需 Dashboard 配置）

### 前置条件

- Cursor Teams 或 Enterprise
- Cloud Agent 环境
- Dashboard 或项目级 hooks 配置权限

### 详细使用步骤（业务用户）

1. Dashboard → Cloud Agent / Hooks 配置
2. 注册 `beforeSubmitPrompt`（过滤敏感信息）、`afterAgentResponse`（审计归档）、`subagentStart`（限制子 Agent 工具）
3. 部署 Automation 或手动启动 Cloud Agent 验证

### 命令与配置示例

```json
{
  "hooks": {
    "beforeSubmitPrompt": { "command": "./scripts/filter-prompt.sh" },
    "afterAgentResponse": { "command": "./scripts/audit-response.sh" }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Cloud Agent Hooks | ✅ 3.11 官方 |
| 7/11 增量 | ❌ 无 |
| Hooks 实际触发 | ⚠️ 未实测（本环境为 Cloud Agent 但无 Dashboard 配置权） |
| 与 3.8 Automations | ✅ 互补——Automations 触发，Hooks 管控 |

### 问题与解决方案

**Hook 未触发**：确认 Cloud Agent + Dashboard 已发布。**过滤过严**：检查 `beforeSubmitPrompt` 规则。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 评估 `beforeSubmitPrompt` 合规过滤 |
| 平台工程师 | 用 `afterAgentThought` 构建可观测性 |
| 个人开发者 | 了解即可，优先 Side Chats 等直接功能 |

---

## 特性五：Composer 2.5、Bugbot、`/review` 与 SDK 治理层（持续有效）

### 是什么（机制说明）

**Composer 2.5**：Cursor 核心编码模型，仅 IDE/SDK 可用；`composer-2` slug 自动路由至 2.5。

**Bugbot + `/review`**：6 月 Bugbot 审查降至 ~90s（Composer 2.5）；`/review`（3.7+）将审查前移至 push，同 diff 开 PR 时跳过重复审查。快捷：`/review-bugbot`、`/review-security`。

**SDK Custom Tools**：`local.customTools` 注册为 `custom-user-tools` MCP，**仅限 local agent**。

**`.cursor/permissions.json`**：allow/deny/autoRun 细粒度权限；`autoRun.block_instructions` 引导 auto-review 分类器。

**Cloud Agent**：隔离 VM always-on Agent；本 DayAI cron 第 **11** 日实例。7/11 无上述能力 Changelog 更新。

### 适用场景

- **适合**：日常编码、push 前审查、企业最小权限 Automation、headless SDK
- **不适合**：Fable 5 级长程推理；Cloud Agent 不可用 customTools

### 前置条件

Cursor 3.7+（`/review`）；SDK 1.0.16+；GitHub 集成（Bugbot）；`.cursor/permissions.json` 可选。

### 详细使用步骤（业务用户）

1. Composer 2.5 编码 → push 前 `/review` → 修复 → push
2. 创建 `permissions.json` 定义 allow/deny/autoRun
3. SDK 脚本：`Agent.create({ local: { customTools, autoReview: true } })`（仅 local）
4. Cloud Agent / Automation 自动读取 permissions

### 命令与配置示例

```bash
/review
/review-bugbot
/review-security
```

```json
{
  "allow": ["read summaries/**", "write summaries/**", "run git *"],
  "deny": ["write tools/build-index.js"],
  "autoRun": { "block_instructions": "Destructive shell: rm, drop" }
}
```

```typescript
const agent = await Agent.create({
  model: { id: "composer-2.5" },
  local: { autoReview: true, customTools: { checkIndex: { /* ... */ } } },
});
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer 2.5 / SDK 路由 | ✅ 6 月确认 |
| Bugbot / `/review` | ⚠️ 未实测（无 GUI） |
| permissions.json | ⚠️ 本仓库未配置 |
| SDK custom tools | ⚠️ 未实测（Cloud Agent） |
| Cron 第 11 日 | ✅ 本 run |
| 7/11 Changelog | ❌ 无 |

### 问题与解决方案

**模型不可用**：检查计划。**Bugbot 未触发**：确认 GitHub App。**写文件被拒**：检查 allow。**Cloud + customTools**：报 ConfigurationError。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| SDK Changelog Jun 2026 | ✅ Composer 2.5 + customTools |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | push 前 `/review` |
| DayAI 仓库 | Instructions 约束可迁移至 permissions.json |
| 企业 | permissions + Team MCP + 3.11 hooks |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| **3.11** | 2026-07-10 | Side Chats、Conversation Search、Picker 重设计、Cloud Hooks |
| 3.10 | 2026-06-30 | Team MCPs、organization groups |
| 3.9 | 2026-06-29 | Cursor iOS、Cloud agents mobile、Remote Control |
| 3.8 | 2026-06-18 | Automations、`/automate`、computer use |
| 3.7 | 2026-06-05 | Bugbot ~90s、`/review` 推送前审查 |

## 今日研究员结论

7/11 为 **3.11 发版次日**，Changelog 空窗属正常消化节奏。建议确认升级 3.11；Team 管理员评估 hooks；push 前养成 `/review` 习惯；DayAI 可将 Instructions 约束固化为 `permissions.json`。本 Automation 连续第 **11** 日触发。

---
