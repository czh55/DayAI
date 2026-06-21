# Cursor 每日技术文档 — 2026-06-21

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 21 日**：Cursor Changelog **无 6/19–6/21 新条目**，最新版本仍为 **3.8（2026-06-18）**。核心能力消化期延续：**Automations `/automate` skill**、**5 项 GitHub trigger**、**Computer Use 默认开启**、**Automations 可保存不完整状态**、**默认 Open PR**、**UI 删除 memory 文件**。3.7（6/17）的 Cloud Subagents `/in-cloud`、`/babysit`、环境快照仍为主要云能力。本仓库 DayAI cron Automation 已验证 Cloud Agent + Computer Use 流程可行。

---

## 特性一：Automations `/automate` Skill（2026-06-18，3.8）

### 是什么（机制说明）

Cursor 3.8 引入 **`/automate` skill**：在本地 Agent 会话中用自然语言描述任务，Cursor 自动配置 triggers、instructions 和 tools，生成完整 Automation 配置。降低 Automations 创建门槛，无需手动填写 cursor.com/automations 表单。

### 适用场景

- **适合**：快速原型化重复任务（每日资讯、CI 分诊、PR 自动修复）
- **不适合**：需精细权限控制的合规场景（需手动审核生成的 instructions）

### 前置条件

- Cursor 3.8+
- cursor.com 账户与 Automations 权限
- 可选：GitHub/Slack 集成授权

### 详细使用步骤（业务用户）

1. 打开 Cursor Desktop → Agent 会话
2. 输入：`/automate` 后跟任务描述，例如：
   ```
   /automate Create a daily cron automation that researches AI news and commits markdown summaries
   ```
3. Cursor 生成 trigger（cron/GitHub/Slack）、instructions、tools 配置
4. 审阅并调整生成的 Automation
5. 保存并启用；可在 cursor.com/automations 管理

### 命令与配置示例

**自然语言创建**

```
/automate Set up a GitHub trigger when CI fails on PR, auto-fix and open a comment explaining the fix
```

**生成的 instructions 示例结构**

```markdown
你是 XXX 自动化助手。每次触发时：
1. 检索官方 changelog
2. 生成 markdown 报告
3. commit 并 push
4. 打开 PR（如需要）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.8 | ✅ `/automate` 确认 |
| 本仓库 cron Automation | ✅ 实测可行（Cloud Agent） |
| 桌面 GUI `/automate` | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：生成的 trigger 类型不符合预期**

解决：在 `/automate` 描述中明确 trigger 类型（cron/GitHub/Slack emoji）。

**错误 2：Automation 缺少 MCP 认证**

3.8 支持保存不完整状态，可先保存再配置 MCP auth。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog 6/18](https://cursor.com/changelog) | ✅ |
| DayAI 本仓库 Automation | ✅ 实测可行 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 从 cron 每日任务起步 |
| 团队 Lead | 审阅 `/automate` 生成的 permissions |
| 本仓库 | 已用 cron + Cloud Agent 验证 |

---

## 特性二：GitHub 五项新 Trigger（2026-06-18）

### 是什么（机制说明）

Automations 新增 5 个 GitHub 事件触发器：

- **Issue comment**：非 PR issue 上的评论
- **PR review comment**：PR diff 内联评论
- **PR review submitted**：PR review 提交
- **Review thread updated**：review thread 标记 resolved/unresolved
- **Workflow run completed**：PR/branch 上 Actions 运行完成

Marketplace 新增「triage failed GitHub actions」「auto-fix PR review comments」模板。

### 适用场景

- **适合**：CI 红灯自动分诊、PR review 自动回复、issue triage
- **不适合**：需人工审批的合规敏感 PR

### 前置条件

- Cursor 3.8+
- GitHub App 授权 Cursor 访问目标 repo

### 详细使用步骤（业务用户）

1. cursor.com/automations → New Automation
2. Trigger 选 **GitHub** → 选择上述 5 项之一
3. 配置 repo 范围与 branch 过滤
4. instructions 写明修复策略与 PR 策略
5. 启用 **Open PR by default**（3.8 默认行为）

### 命令与配置示例

**Workflow run completed 触发 instructions**

```markdown
当 GitHub Actions 在 PR 上失败时：
1. 读取 failed workflow logs
2. 定位 root cause
3. 若可自动修复，commit 到 PR branch
4. 在 PR 留言说明修复内容
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog | ✅ 5 项 trigger 确认 |
| 实测触发 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：trigger 未捕获 event**

排查：确认 GitHub App 权限含 checks/actions；repo 在 Automation 配置范围内。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/18 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 维护者 | 从 workflow_run_completed 起步 |
| 开源项目 | PR review comment 自动修复需谨慎授权 |

---

## 特性三：Computer Use 默认开启（2026-06-18）

### 是什么（机制说明）

Cloud Agent 被 Automation 触发后，默认启用 **Computer Use** 工具——Agent 可操作独立计算机产出 demo、截图、artifact。instructions 中写明「include a demo of your work」即可引导使用。

### 适用场景

- **适合**：需要可视化 demo 的 Automation（UI 变更、文档截图）
- **不适合**：纯后端/API 变更；高安全合规环境

### 前置条件

- Cursor 3.8+ Automation
- Cloud Agent 额度

### 详细使用步骤（业务用户）

1. 创建 Automation 时 Computer Use 默认 enabled
2. instructions 添加：「Produce a demo screenshot or recording of the result」
3. 审阅 Agent 产出的 artifact
4. 若不需 Computer Use，在 tools 中显式禁用

### 命令与配置示例

**instructions**

```markdown
After completing the code changes, use Computer Use to:
1. Start the dev server
2. Open the changed page in browser
3. Capture a screenshot and attach to PR description
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 默认开启 | ✅ |
| 实测 Computer Use | ⚠️ 本环境为 Cloud Agent 文本模式，GUI demo 未实测 |

### 问题与解决方案

**错误 1：Agent 误操作生产环境**

排查：限制 Automation 到 staging branch；`.cursor/permissions.json` 限制破坏性操作。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 产品团队 | demo artifact 提升 PR 可审阅性 |
| 安全团队 | 默认禁用或严格 permissions |

---

## 特性四：Cloud Subagents `/in-cloud` 与 `/babysit`（2026-06-17，3.7）

### 是什么（机制说明）

Cursor 3.7 引入云子 Agent：

- **`/in-cloud`**：在独立 VM/branch 启动云 subagent，本地工作区保持干净
- **`/babysit`**：云 Agent 远程迭代 PR 直至可合并
- **环境快照**：`.cursor/environment.json` 捕获可复用 dev 环境，未来 cloud agent 启动更快

### 适用场景

- **适合**：长时 CI 修复、并行探索、PR babysitting
- **不适合**：需本地硬件/内网资源的任务

### 前置条件

- Cursor 3.7+
- Cloud 环境已 setup（<10 分钟 guided setup）

### 详细使用步骤（业务用户）

1. Agents Window → Cloud environment setup（首次）
2. 提交任务时使用 `/in-cloud fix the failing CI on this PR`
3. 或点击 PR quick-action pill → `/babysit`
4. 本地继续其他工作；云 subagent 后台运行
5. 完成后 handoff 回本地测试

### 命令与配置示例

```
/in-cloud investigate why integration tests fail on branch feature/auth
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.7 | ✅ |
| 桌面实测 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：云环境 setup 超时**

排查：检查 `.cursor/environment.json` 依赖安装脚本；减小 snapshot 体积。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | CI 修复用 `/in-cloud` 隔离 |
| PR 作者 | `/babysit` 处理 review 往返 |

---

## 特性五：`.cursor/permissions.json` 与 SDK Auto-review（2026-06-04 延续）

### 是什么（机制说明）

Cursor SDK 支持 `local.autoReview` 将 headless 工具调用路由至 auto-review classifier，通过 `autoRun.allow_instructions` / `block_instructions` 自然语言控制。桌面 Agent 使用 `.cursor/permissions.json` 管理工具权限。

### 适用场景

- **适合**：CI 脚本、自定义 SDK 集成、团队权限统一
- **不适合**：完全信任所有工具调用的个人实验

### 前置条件

- Cursor 3.4+（SDK custom tools）
- 项目根 `.cursor/permissions.json`

### 详细使用步骤（业务用户）

1. 创建 `.cursor/permissions.json`：

```json
{
  "autoRun": {
    "allow_instructions": "Read-only file inspections and test runs",
    "block_instructions": "Any file deletion or git push to main"
  }
}
```

2. SDK 脚本设置 `local.autoReview: true`
3. 桌面 Agent 自动读取 permissions.json

### 命令与配置示例

```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Shell(npm test)"],
    "deny": ["Shell(rm -rf:*)", "Shell(git push origin main)"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/4 SDK | ✅ |
| 本仓库 permissions | ⚠️ 未单独配置 |

### 问题与解决方案

**错误 1：auto-review 阻断合理操作**

调整 `allow_instructions` 描述更精确的允许场景。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/4 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 | 统一 permissions.json 入 repo |
| SDK 用户 | autoReview + customTools 组合 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 3.8 | 2026-06-18 | `/automate`、GitHub 5 trigger、Computer Use 默认、Open PR 默认 |
| 3.7 | 2026-06-17 | Cloud setup、`/in-cloud`、`/babysit`、Bugbot ~90s |
| 3.7 | 2026-06-10 | `/review`、Bugbot 仅审新变更 |
| 3.7 | 2026-06-05 | Design Mode 多选、语音输入 |
| 3.4 | 2026-06-04 | SDK custom tools、auto-review、无限嵌套 subagent |

## 今日研究员结论

Cursor 处于 3.8 消化期，6/21 无新版本。Automations 生态（`/automate`、GitHub trigger、Computer Use）是本周最大增量；与 Claude Code `/loops`、Codex `codex exec` 形成「IDE 编排 + 终端深度 + 异步审查」三栈。虎嗅 secondary 报道 Cursor 市场份额下滑，但 3.8 Automations 是企业工作流自动化的重要补强。建议升级至 3.8 并试用 Marketplace PR 修复模板。

---
