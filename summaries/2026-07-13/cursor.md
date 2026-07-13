# Cursor 每日技术文档 — 2026-07-13

> 本地实测版本：**—**（桌面未实测）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 13 日 [Cursor Changelog](https://cursor.com/changelog) **无新版本发布**，**3.11（2026-07-10）** 仍为最新版，进入发版后 **第 4 日**观察期。3.11 核心能力：Side Chats（`/side`、`/btw`）、Conversation Search（Cmd+K / Cmd+F）、Redesigned Project/Repo Pickers、Cloud Agent 对话级 Hooks。

Cloud Agent 环境（本 DayAI Automation）可正常运行 tmux、MCP、git push 等，但 **Cursor 桌面 GUI 功能未实测**。行业侧 CircleCI Chunk Sidecars（7/13）与 Cursor Cloud Agent hooks 形成「Agent 内循环校验 + 对话级控制」互补叙事。

---

## 特性一：Side Chats — 主 Agent 旁路探索（3.11，7/10 发布）

### 是什么（机制说明）

3.11 引入 **Side Chats**：在主 Agent 对话旁开启独立侧对话，用于提问、探索想法、调查分支话题，**不中断主 Agent 执行**。

触发方式：`/side`、`/btw`、或聊天面板顶部 **+** 按钮。每个 Side Chat 是**持久、完整的 Agent 对话**，可后续跟进、@mention 拉回主线程上下文。

默认 Side Chat 聚焦**阅读、搜索、回答**——适合澄清问题、研究替代方案而不提交 pivot、在主 Agent 继续跑长任务时 sanity-check 决策。

### 适用场景

- **适合**：长程 Agent 任务中临时探索；主线程不想被 tangent 污染
- **不适合**：简单一次性任务（Side Chat 增加认知负担）

### 前置条件

Cursor **3.11+**；Agents Window 或 IDE 聊天面板。

### 详细使用步骤（业务用户）

1. 在主 Agent 对话运行长任务时，点击聊天面板顶部 **+** 或输入 `/side`
2. 在 Side Chat 中提问（如「这个 refactor 方案有没有更简单的替代？」）
3. 主 Agent 继续执行原任务
4. 满意后在主线程 `@mention` Side Chat 结论
5. Side Chat 可稍后 revisit 并继续跟进

### 命令与配置示例

```text
# 主对话中
/side
/btw

# 或点击聊天面板顶部 + 按钮
```

```text
# Side Chat 示例 prompt
「在不修改主任务的前提下，评估用 Redis 替代内存缓存的可行性」
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Side Chats | ✅ 7/10 官方 |
| `/side` / `/btw` 交互 | ⚠️ 未实测（Cloud Agent 无 GUI 侧栏） |
| @mention 上下文拉回 | ⚠️ 未实测 |

### 问题与解决方案

**Side Chat 找不到**：确认 Cursor ≥ 3.11 并重启。**主 Agent 被中断**：Side Chat 设计上不应中断主线程；检查是否误在主线程发送。**Side Chat 丢失**：Side Chat 为持久对话，检查 Agents Window 历史。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |
| 虎嗅 Agent Control Plane | ✅ 旁路探索与 RTS 叙事互补 |
| Claude Code Side 类比 | ⚠️ 无官方对标声明 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent 用户 | 升级 3.11 后立即试用 Side Chats |
| 团队 Lead | 用 Side Chat 做方案 sanity-check |
| 简单任务用户 | 可忽略 |

---

## 特性二：Conversation Search — 全局与对话内搜索（3.11）

### 是什么（机制说明）

3.11 增强 Agent 对话搜索：

- **Agents Window 全局搜索**：Cmd+K 搜索 Agent 转录，超越名称和 PR 号；本地搜索索引支持数千对话
- **对话内搜索**：Cmd+F 跳转匹配项、显示计数器、长转录滚动时保持搜索

解决长程 Agent 时代「找不到上周那次 refactor 讨论」的痛点。

### 适用场景

- **适合**：重度 Agent 用户、多项目并行、需要回溯决策
- **不适合**：对话量少的新用户

### 前置条件

Cursor 3.11+；Agents Window。

### 详细使用步骤（业务用户）

1. **Agents Window** → Cmd+K → 输入关键词搜索历史对话
2. 打开目标对话 → Cmd+F → 跳转匹配项
3. 长转录中滚动时搜索保持可用
4. 首次搜索后等待本地索引构建（性能随后改善）

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
| 本地索引性能 | ⚠️ 未实测 |

### 问题与解决方案

**搜索无结果**：确认 3.11+ 并等待本地索引构建。**索引慢**：首次搜索后性能改善。**Linux 快捷键**：可能为 Ctrl+K / Ctrl+F。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Agent 用户 | 升级 3.11 后立即试用全局搜索 |
| 团队 Lead | 用搜索回溯 PR/决策讨论 |
| DayAI 维护者 | 用搜索定位历史日更讨论 |

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

用于构建自校正循环（self-correcting loops）和子代理编排。与 CircleCI Chunk Sidecars（7/13）的「Agent 内循环 CI 校验」形成 Harness 工程化互补。

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
6. 结合 pre-push lint/test 脚本（Sidecars 思路）

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
    },
    "subagentStart": {
      "command": "node",
      "args": ["./hooks/whitelist-subagent.js"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Cloud Agent Hooks | ✅ 7/10 官方 |
| Hook 脚本执行 | ⚠️ 未实测（需 Teams 计划 + 配置） |
| 本 Automation 运行 | ✅ Cloud Agent 环境正常 |

### 问题与解决方案

**Hook 不触发**：确认 Cloud Agent 模式且 hook 路径正确。**子代理失控**：用 `subagentStart` 加白名单。**MCP auth 中断 Automation**：Automations 支持 incomplete state 保存进度（3.8+）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |
| InfoQ Harness 叙事 | ✅ hooks 是 Harness 组件 |
| CircleCI Sidecars 7/13 | ✅ 内循环校验互补 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 评估对话级 hooks 做合规审计 |
| Agent 工程师 | 用 hooks 构建自校正循环 |
| Automation 用户 | 本环境即 Cloud Agent 实例 |

---

## 特性四：Redesigned Project/Repo Pickers + Cloud Agent 环境（3.11）

### 是什么（机制说明）

3.11 简化项目/仓库选择器：

- 搜索按工作位置分域：This Computer、Cloud、特定 Remote Machine
- 可在选择器内创建项目并连接 GitHub/GitLab/Azure DevOps
- **Run on** 选择器：Cloud / This Computer / Remote Machines
- 分支选择器默认打开 default branch 和最近使用分支
- Multi-repo 选择改为 Cloud/This Computer flyout 内 **Select Multiple** 切换
- 输入 `none` 或 `no repo` 选择无仓库模式

Cloud Agent 在本环境（Cursor Automation）运行于隔离 VM，支持 tmux、MCP、git push 等。

### 适用场景

- **适合**：多仓库项目、Cloud/Local 混合工作流、DayAI 类 cron Automation
- **不适合**：单仓库简单场景（变化感知有限）

### 前置条件

Cursor 3.11+；GitHub/GitLab 账户（Cloud 仓库）。

### 详细使用步骤（业务用户）

1. 打开 Agents Window → 点击项目/仓库选择器
2. 选择 **Cloud** 或 **This Computer**
3. **Run on** 选择运行环境
4. Multi-repo：在 flyout 内开启 **Select Multiple**
5. 输入 `none` 或 `no repo` 选择无仓库模式
6. Cloud 仓库仅存在于云端时，选择器建议 clone 到本地

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
| Cloud Agent 本环境运行 | ✅ 当前 DayAI Automation 即 Cloud Agent |
| Picker UI 交互 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**找不到 Cloud 仓库**：确认 GitHub 授权。**Multi-repo 冲突**：检查 Select Multiple 配置。**Cloud-only 仓库**：选择器建议 clone 到本地。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 Picker | ✅ |
| Cloud Agent cron Automation | ✅ 本任务即实例 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多仓库开发者 | 升级 3.11 试用新选择器 |
| Cloud Agent 用户 | 熟悉 Run on 选择器 |
| Automation 维护者 | cron + Cloud Agent + git push 到 main |

---

## 特性五：Composer 2.5、Bugbot、`/review` 与 Automations 生态（对照）

### 是什么（机制说明）

Cursor 模型与审查生态（3.11 前后持续可用）：

- **Composer 2.5**：Cursor 自研编程模型（量子位 5 月报道与 Kimi K2.5 基模 + Cursor RL 后训练）
- **Bugbot**：自动 PR 审查 Bot
- **`/review`**：Agent 内代码审查命令
- **Cursor Automations**（3.8+）：cron/GitHub/Slack 触发；本 DayAI 任务即 cron Automation 实例
- **Computer use tool**（3.8+）：Automation 默认启用，可录屏演示

3.11 未更新 Composer 版本号，但 Side Chats 与 Cloud Hooks 增强 Agent 编排能力。

### 适用场景

- **适合**：PR 审查自动化、定时任务（如日更）、录屏演示
- **不适合**：无 Git 集成的纯本地项目

### 前置条件

Cursor 付费计划（Automations）；GitHub 集成（Bugbot）。

### 详细使用步骤（业务用户）

1. **Settings → Automations** 创建 cron 触发任务
2. 配置 Instructions 与 MCP tools（如 `open_git_pr`）
3. PR 上启用 Bugbot 自动审查
4. Agent 对话中使用 `/review` 审查 diff
5. Automation 指令中加入「录屏演示 GUI 变更」启用 computer use

### 命令与配置示例

```text
# Agent 对话
/review

# Automation 触发
cron: 0 22 * * * (UTC) — 如本 DayAI 任务
```

```json
// Automation 配置概念
{
  "trigger": { "type": "cron", "schedule": "0 22 * * *" },
  "actions": ["open_git_pr"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 Automation cron 触发 | ✅ 2026-07-13T22:01:15Z |
| Bugbot / `/review` | ⚠️ 未实测 |
| Composer 2.5 模型 | ⚠️ 未实测（Cloud Agent 模型由环境决定） |

### 问题与解决方案

**Automation push 失败**：`git pull --rebase origin main` 后重试。**Bugbot 误报**：调整 `.cursor/BUGBOT.md` 规则。**Composer 版本**：Settings → Models 查看可用列表。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 Automations | ✅ |
| 量子位 Composer 2.5 | ✅ 社区报道 |
| 本 DayAI Automation | ✅ cron 实例 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开源维护者 | Automations cron 做日更/CI 修复 |
| 团队 Lead | Bugbot + `/review` 双层审查 |
| 个人用户 | Side Chats 比 Bugbot 更即时 |

---

## 版本对照表

| 版本 | 发布日 | 要点 |
|------|--------|------|
| 3.11 | 2026-07-10 | Side Chats、Conversation Search、Pickers、Cloud Hooks |
| 3.10 | 2026-06-30 | Team MCPs、Organization groups |
| 3.9 | 2026-06-29 | Cursor for iOS、Cloud agents on mobile |
| 3.8 | 2026-06-18 | Automations、/automate、computer use |

## 今日研究员结论

Cursor **3.11 第四日无新 Changelog**，Side Chats 与 Cloud Agent Hooks 进入稳定观察期。Cloud Agent 环境（本 Automation）运行正常，但 **桌面 GUI 功能均未实测**。行业侧 CircleCI Sidecars（7/13）与 Cursor Hooks 共同指向 **Agent Harness 工程化**——开发者应投资 pre-push 校验与对话级控制，而非仅追逐模型版本。Fable 5 credits 计费首日，Cursor Composer 2.5 与 GPT-5.6 Sol 的竞争值得小规模 A/B。
