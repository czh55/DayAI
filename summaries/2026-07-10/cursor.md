# Cursor 每日技术文档 — 2026-07-10

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 10 日 [Cursor Changelog](https://cursor.com/changelog) 发布 **3.11**，结束自 6/30 以来连续 **10** 日空窗。核心更新：**Side Chats**（`/side`/`/btw`）、**Conversation Search**、**Redesigned Project/Repo Pickers**、**Cloud Agent 对话级 Hooks**。本 DayAI Automation cron（`0 22 * * *` UTC）连续第 **10** 日触发，且今日 Cursor 更新与任务同日。

---

## 特性一：Side Chats — 主 Agent 旁的持久探索对话（3.11，7/10）

### 是什么（机制说明）

Side Chats 允许在不打断主 Agent 会话的情况下，开启并行的探索性 Agent 对话。通过 `/side`、`/btw` 或聊天面板顶部「+」按钮创建。每个 side chat 是**持久、完整**的 Agent 对话——可后续跟进、稍后 revisit、通过 @mention 将上下文拉回主线程。

默认行为侧重**阅读、搜索、回答**（非写代码/改文件），适合：澄清问题、调研备选方案而不提交主任务 pivot、在主 Agent 跑长任务时 sanity-check 决策。

### 适用场景

- **适合**：主 Agent 执行重构/测试时旁路调研；不想中断主线程的探索性问题
- **不适合**：需要修改同一文件集的并行写操作（可能冲突，应让主 Agent 串行）

### 前置条件

- Cursor 3.11+（2026-07-10 发布）
- 付费计划（与 Cloud Agent 功能对齐）

### 详细使用步骤（业务用户）

1. 更新 Cursor 至 3.11：Help → Check for Updates（或自动更新）
2. 在主 Agent 对话中，输入 `/side` 或 `/btw` 创建旁路对话
3. 或点击聊天面板顶部 **+** 按钮
4. 在 side chat 中提问、搜索、调研——主 Agent 继续运行
5. 需要时将 side chat 结论 @mention 回主线程
6. 稍后从 Agents Window  revisit 未完成的 side chat

### 命令与配置示例

```text
# 主对话中创建 side chat
/side 这个报错通常意味着什么？会不会影响我们的迁移方案？

# 别名
/btw 查一下 React 19 的 breaking changes 列表

# 拉回主线程（概念性）
@side-chat-1 根据刚才的结论，主任务继续用方案 B
```

```json
// .cursor/permissions.json — side chat 继承主会话权限策略（概念性）
{
  "allow": ["Read", "Grep", "WebSearch"],
  "deny": ["Shell", "Write"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.11 Side Chats | ✅ 7/10 官方发布 |
| `/side` 交互 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 持久化与 @mention | ⚠️ 未实测 |

### 问题与解决方案

**Side chat 也在改文件**：默认侧重读/搜/答；若需写操作明确告知或切回主对话。**找不到历史 side chat**：Agents Window → 浏览对话列表。**主线程不知道 side 结论**：用 @mention 显式拉回上下文。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| 36氪 Loop 工程叙事 | ✅ 「主循环+旁路」与 Side Chat 产品形态一致 |
| 社区早期 beta 反馈 | ⚠️ 待 3.11 全量后验证 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | 长任务时开 side chat 调研，避免中断主 Agent |
| Tech Lead | 用 side chat 做架构 sanity-check，结论 @mention 回主 PR 讨论 |
| 自动化用户 | Side chat 为人工交互特性，Automations 仍走主 Agent 路径 |

---

## 特性二：Conversation Search — 全文搜索 Agent 转录（3.11）

### 是什么（机制说明）

Cursor 3.11 引入 Agent 对话全文搜索：

- **Agents Window 全局搜索**：命令面板 Cmd+K 搜索 agent transcripts，结果超越名称与 PR 号匹配
- **本地搜索索引**：可扩展至数千条对话，性能「snappy」
- **单对话内搜索**：Cmd+F 跳转匹配项，显示 match counter，长 transcript 滚动时持续搜索

### 适用场景

- **适合**：找回上周某次 Agent 讨论的具体命令/配置；审计历史 Agent 决策
- **不适合**：需跨仓库的全局知识管理（仍限于 Cursor 本地索引）

### 前置条件

- Cursor 3.11+
- Agents Window 已积累对话历史

### 详细使用步骤（业务用户）

1. 打开 Agents Window
2. Cmd+K 打开命令面板 → 输入搜索关键词
3. 从结果列表跳转到对应对话
4. 在对话内 Cmd+F 精确定位匹配行
5. 利用 match counter 在长 transcript 中导航

### 命令与配置示例

```text
# Agents Window 全局搜索（UI 操作）
Cmd+K → 输入 "codex doctor" → 选择匹配对话

# 单对话内搜索
Cmd+F → 输入 "build-index.js" → Enter 跳转下一匹配
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Conversation Search | ✅ 3.11 官方 |
| 本地索引性能 | ⚠️ 未实测（无 GUI） |
| Cmd+F 单对话搜索 | ⚠️ 未实测 |

### 问题与解决方案

**搜不到旧对话**：确认对话在 Agents Window 列表中；索引构建需首次搜索触发。**搜索结果太多**：缩小关键词或使用 PR 号辅助。**隐私顾虑**：索引存本地，企业用户评估敏感代码讨论是否需定期清理。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| 与 IDE 内 Cmd+F 惯例 | ✅ 符合开发者预期 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Agent 用户 | 升级 3.11 后立即试用 Cmd+K 搜索 |
| 团队 Lead | 用搜索审计 Agent 是否遵循项目规则 |
| 新用户 | 对话尚少，功能价值随积累增长 |

---

## 特性三：Cloud Agent 对话级 Hooks（3.11）

### 是什么（机制说明）

Cloud agents 此前已支持 team hooks 围绕**工具执行**与**文件/shell** 工作。3.11 新增**对话级 hooks**，可观察和控制 Agent 对话本身：

| Hook | 用途 |
|------|------|
| `beforeSubmitPrompt` | 提交 prompt 前拦截/修改 |
| `afterAgentResponse` | 响应后审计/记录 |
| `afterAgentThought` | 观察推理/thinking 输出 |
| `stop` | turn 完成时触发 |
| `subagentStart` | 子 Agent 启动时控制 |
| 更多 | compaction、turn completion 等 |

用于构建自纠错循环、合规审查、子 Agent 编排、可观测性 pipeline。

### 适用场景

- **适合**：企业 Cloud Agent 合规流水线、自动重试/纠错、subagent 编排
- **不适合**：个人开发者无 Team/Enterprise 计划（部分 hooks 需 Dashboard 配置）

### 前置条件

- Cursor Teams 或 Enterprise
- Cloud Agent 环境
- Dashboard 或项目级 hooks 配置权限

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. 导航至 Cloud Agent / Hooks 配置（参见 [官方 docs](https://cursor.com/docs)）
3. 注册 `beforeSubmitPrompt` hook：过滤敏感信息或注入合规前缀
4. 注册 `afterAgentResponse` hook：日志归档或触发外部 webhook
5. 注册 `subagentStart` hook：限制子 Agent 工具集
6. 部署 Automation 或手动启动 Cloud Agent 验证 hooks 触发

### 命令与配置示例

```json
// hooks 配置概念示例（路径以官方 docs 为准）
{
  "hooks": {
    "beforeSubmitPrompt": {
      "command": "./scripts/filter-prompt.sh"
    },
    "afterAgentResponse": {
      "command": "./scripts/audit-response.sh"
    },
    "subagentStart": {
      "command": "./scripts/limit-subagent-tools.sh"
    }
  }
}
```

```bash
#!/bin/bash
# beforeSubmitPrompt 示例：拒绝含 secret 的 prompt
if echo "$PROMPT" | grep -qiE 'api[_-]?key|password|secret'; then
  echo "BLOCKED: prompt contains sensitive pattern" >&2
  exit 1
fi
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Cloud Agent Hooks | ✅ 3.11 官方 |
| Hooks 实际触发 | ⚠️ 未实测（本环境为 Cloud Agent 但无 Dashboard 配置权） |
| 与 3.8 Automations | ✅ 互补——Automations 触发，Hooks 管控 |

### 问题与解决方案

**Hook 未触发**：确认 Cloud Agent（非本地 Agent）且 Dashboard 配置已发布。**Hook 阻塞正常 prompt**：检查 `beforeSubmitPrompt` 过滤规则过严。**子 Agent 失控**：用 `subagentStart` 限制工具 + `stop` 记录 turn 边界。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |
| 虎嗅 Agent Control Plane 叙事 | ✅ hooks 是 control plane 落地 |
| 本 DayAI Automation | ✅ 使用 Cloud Agent cron 触发 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 评估 `beforeSubmitPrompt` 合规过滤 |
| 平台工程师 | 用 `afterAgentThought` 构建可观测性 |
| 个人开发者 | 了解即可，优先 Side Chats 等直接功能 |

---

## 特性四：Redesigned Project & Repo Pickers（3.11）

### 是什么（机制说明）

3.11 重设计项目与仓库选择器：

- **一站式工作流**：选择器内可创建项目、连接 GitHub/GitLab/Azure DevOps，无需跳转
- **分区搜索**：按 This Computer / Cloud / Remote Machine 分区，取代全局搜索框
- **Recents 管理**：一键从 Recents 移除项目
- **Run on 选择器**：显示 Agent 可运行位置（Cloud / This Computer / Remote Machines）并 drill-down
- **Branch picker**：默认分支 + 最近分支优先，长列表可搜索
- **No Repo 显式化**：移除 Home 概念，`none`/`no repo` 可搜索到
- **Remote Machines 合并**：本机、团队池、已有 remote workspace 统一菜单
- **Multi-repo**：Cloud / This Computer flyout 内 Select Multiple 切换

### 适用场景

- **适合**：多仓库、Cloud/Local 混合工作流、Remote 开发
- **不适合**：单一本地仓库简单场景（变化感知弱）

### 前置条件

- Cursor 3.11+
- 可选：GitHub/GitLab/Azure DevOps 账号、Remote machine 配置

### 详细使用步骤（业务用户）

1. 打开项目选择器（启动 Agent 或 Agents Window）
2. 选择 **Run on**：Cloud / This Computer / Remote Machines
3. 在对应分区搜索仓库；或选 **No Repo** 无仓库工作
4. Branch picker 选默认或最近分支
5. Multi-repo：在 flyout 内开启 Select Multiple
6. 创建新项目：选择器内直接 Connect GitHub/GitLab/Azure DevOps

### 命令与配置示例

```text
# 搜索 No Repo
在选择器搜索框输入：none 或 no repo

# Cloud multi-repo
Run on → Cloud → Select Multiple → 勾选 repo A + repo B
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Picker 重设计 | ✅ 3.11 |
| UI 交互 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**找不到仓库**：确认在正确分区（Cloud vs Local）搜索。**Cloud repo 仅云端存在**：选择器会建议 clone 到本地。**Branch 列表过长**：用搜索框，默认显示 default + recent。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 Picker Improvements | ✅ 16 条子项 |
| 3.9 Cloud agents on mobile | ✅ 分区逻辑延续 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多 repo 开发者 | 试用 Select Multiple + 分区搜索 |
| Cloud Agent 用户 | Run on → Cloud 设为默认 |
| Remote 开发者 | 检查合并后的 Remote Machines 菜单 |

---

## 特性五：Cursor Automations Cron（3.8+，本任务第 10 日）

### 是什么（机制说明）

Cursor Automations 是 always-on agent 系统。本 DayAI 任务配置为 cron `0 22 * * *`（UTC），每日 22:02 触发 Cloud Agent 执行资讯检索、7 文件生成、`build-index.js`、push main。

7/10 为连续第 **10** 日 cron 触发，且同日 Cursor 发布 3.11——Automation 运行不受 Changelog 空窗影响，今日可受益于 Side Chats 等能力（若 Cloud Agent 环境已升级）。

### 适用场景

- **适合**：每日重复文档/CI 巡检任务
- **不适合**：需实时人工交互的创意工作

### 前置条件

- Cursor 付费计划
- GitHub 仓库连接（czh55/DayAI）
- Automation Instructions + cron 触发器

### 详细使用步骤（业务用户）

1. Cursor → Automations → 编辑本任务
2. 确认 cron schedule 与 Instructions
3. 启用 `open_git_pr` MCP（若需自动开 PR）
4. 监控每次运行的 commit 与 `index.json` 更新

### 命令与配置示例

```yaml
# 本任务触发配置
trigger:
  type: cron
  schedule: "0 22 * * *"
  triggeredAt: "2026-07-10T22:02:12Z"
```

```bash
# Automation 产出验证
node tools/build-index.js
git log -1 --oneline
# 期望：docs: add daily summary 2026-07-10
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cron 第 10 日触发 | ✅ 本 run |
| 7 文件生成 | ✅ 进行中 |
| 3.11 Side Chats in Automation | ⚠️ Automation 走主 Agent，未用 side chat |

### 问题与解决方案

**Automation 未触发**：检查 cron 时区（UTC）与付费状态。**Push 失败**：`git pull --rebase origin main` 后重试。**build-index 失败**：检查 README.md 表格板块名。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor 3.8 Automations | ✅ |
| 本仓库 commit 历史 | ✅ 连续日更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 内容运营 | 参考本任务模板配置 cron Automation |
| 开发者 | 用 Automations 替代手动日更脚本 |
| 本任务维护者 | 关注 3.11 hooks 是否可加强 Automation 审计 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| **3.11** | 2026-07-10 | Side Chats、Conversation Search、Picker 重设计、Cloud Hooks |
| 3.10 | 2026-06-30 | Team MCPs、organization groups |
| 3.9 | 2026-06-29 | Cursor iOS、Cloud agents mobile、Remote Control |
| 3.8 | 2026-06-18 | Automations、`/automate`、computer use |

## 今日研究员结论

Cursor 3.11 是 7 月首个重大更新，**Side Chats** 将「主任务 + 旁路探索」产品化，与行业 Loop/Harness 叙事高度一致。**Cloud Agent Hooks** 为企业 control plane 提供对话级抓手。建议所有用户升级 3.11；Team 管理员评估 hooks 集成。本 DayAI Automation 连续第 10 日成功触发，与 Cursor 发版同日具有符号意义——Agent 工具链正从「能用」走向「可编排、可审计、可并行」。

---
