# Cursor 每日技术文档 — 2026-06-26

> 本地实测版本：**—（桌面未实测）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 26 日 Cursor 官方 Changelog 无新条目。** 最新版本仍为 **3.9（2026-06-22）**。本周主线：**Customize 页**（Marketplace leaderboard、Plugin canvases、Team Marketplaces）、**Automations**（`/automate` skill、cron、computer use）、**Cloud Agent**（`/in-cloud`）、**Bugbot `/review`**。本 DayAI 任务即 3.8 cron 触发实例。⚠️ **Cloud Agent 无法 GUI 测试** Customize 页、Design Mode、桌面 Automations UI。

---

## 特性一：Customize 页 — 统一扩展管理（3.9 @ 2026-06-22，无更新）

### 是什么（机制说明）

Cursor 3.9 **Customize** 页集中管理 Plugins、Skills、MCPs、Subagents、Rules、Commands、Hooks，支持 **User/Team/Workspace** 三级作用域。**Marketplace leaderboard** 展示团队内最受欢迎扩展；**Plugin canvases** 含 Hex（数据可视化）、Atlassian（Issue/项目视图）模板；**Team Marketplaces** 支持 GitLab、BitBucket、Azure DevOps 仓库导入。

### 适用场景

- **适合**：企业统一 MCP/插件；多项目复用 skills
- **不适合**：仅用基础补全的轻量用户

### 前置条件

- Cursor 桌面 ≥ 3.9；Team/Enterprise（Team Marketplaces）

### 详细使用步骤（业务用户）

1. Settings → **Customize**
2. **Plugins**：浏览 leaderboard，安装 Hex/Atlassian canvases
3. **MCPs**：Add MCP → 配置 `mcp.json`
4. **Skills**：启用 `/automate`
5. **Team Marketplaces**：连接 GitLab/BitBucket/Azure DevOps

### 命令与配置示例

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

```json
{
  "allow": ["Shell(npm)", "Shell(git)", "Read", "Write"],
  "deny": ["Shell(rm -rf *)"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.9 | ✅ 6/22，6/26 无更新 |
| Customize 页 GUI | ⚠️ 未实测（Cloud Agent 无 GUI） |
| leaderboard/canvases | ⚠️ Changelog 确认，GUI 未测 |

### 问题与解决方案

**MCP 未连接**：检查 `mcp.json` 路径与 `npx` 可执行性。**Marketplace 导入失败**：验证 token 权限与 plugin 格式。**Canvas 模板失败**：检查 Team 订阅与网络。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 | ✅ Customize、leaderboard、canvases |
| Cursor Docs | ✅ 文档一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Tech Lead | leaderboard 发现高频 MCP，标准化分发 |
| 个人开发者 | User 级配置；关注 canvases 模板 |
| Cloud Agent | 通过 `mcp.json` 文件配置替代 GUI |

---

## 特性二：Automations — `/automate` Skill 与 Cron 触发（3.8 @ 2026-06-18）

### 是什么（机制说明）

Automations 支持 **Cron 定时**启动 Cloud Agent；本 DayAI 任务实例：`0 22 * * *`（UTC 22:00）。3.8 引入 **`/automate` skill**（会话内创建 Automation）、Slack emoji 触发、5 种 GitHub 触发器；配合 **Computer use** 产出演示/录屏 artifact；支持 AutomationMemory 与默认 PR 创建。

### 适用场景

- **适合**：每日报告、CI 巡检、定时代码审查
- **不适合**：即时交互任务；无 Cloud Agent 配额用户

### 前置条件

- Cursor ≥ 3.8；`.cursor/environment.json`；Automations 权限

### 详细使用步骤（业务用户）

1. Automations → Create（或 Agent 输入 `/automate`）
2. 触发器选 Cron：`0 22 * * *`
3. Instructions 填入任务 Prompt
4. 启用 Computer use、OpenGitPr
5. 保存启用；查看运行历史与 artifact

### 命令与配置示例

```
/automate
# 每天 UTC 22:00 生成 AI 资讯总结并 push 到 main
```

```
0 22 * * *     # 每天 UTC 22:00
0 9 * * 1-5    # 工作日 09:00
```

```json
{
  "snapshot": "dayai-base",
  "install": "cd tools && npm install",
  "terminals": []
}
```

**GitHub 触发器**：issue comment、PR review comment/submitted、review thread updated、workflow_run completed。

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本任务触发 | ✅ cron @ 2026-06-26T22:00:14Z |
| Automations UI | ⚠️ 未实测 GUI |
| Computer use | ✅ RecordScreen 可用 |
| `/automate` | ⚠️ Changelog 确认，GUI 未测 |

### 问题与解决方案

**触发未完成**：检查 Instructions 与 `environment.json`。**push 失败**：先 `git pull --rebase origin main`。**录屏缺失**：确认启用 RecordScreen。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 | ✅ cron、GitHub 触发器 |
| DayAI 实践 | ✅ 自动化运行中 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | workflow_run completed 触发 CI 修复 |
| 内容团队 | cron + Computer use 定时报告 |
| vs Codex Remote | Cursor cron = 定时启动；Remote = 手机遥控 |

---

## 特性三：Computer Use — Cloud Agent 屏幕操作（3.8 @ 2026-06-18）

### 是什么（机制说明）

**Computer use** 允许 Cloud Agent 控制 VM 桌面：截图、点击、键盘输入、**屏幕录制**。与 Automations cron 配合产出 GUI 演示 artifact。Cloud Agent 可模拟 GUI 操作，但 **无法替代桌面 Design Mode** 的实时预览。

### 适用场景

- **适合**：Automation 录屏演示、GUI 回归、文档配图
- **不适合**：本地 GPU 渲染；高精度设计（用 Design Mode）

### 前置条件

- Cursor ≥ 3.8；Cloud Agent；启用 Computer use/RecordScreen

### 详细使用步骤（业务用户）

1. Automation 或 Cloud 任务中启用 Computer use
2. Instructions 描述 GUI 流程
3. Agent 执行并保存 recording
4. 从运行历史下载 artifact

### 命令与配置示例

```
Use Computer use to open the app and record a 30-second demo of Customize flow.
```

```
Record a screen demo showing how to add an MCP server
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| RecordScreen | ✅ Cloud Agent 可用 |
| Customize GUI 演示 | ⚠️ 无桌面 Cursor |
| Changelog 3.8 | ✅ computer use |

### 问题与解决方案

**录屏黑屏**：确认 dev server 启动。**权限被拒**：检查 `permissions.json`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 | ✅ |
| Codex features list | computer_use stable true |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 文档作者 | cron + Computer use 自动演示 |
| 前端 | Design Mode 优先 |
| Cloud 用户 | 接受无法 GUI 测 Customize 的限制 |

---

## 特性四：Cloud Agent 与 `/in-cloud` 子 Agent（3.7 @ 2026-06-17）

### 是什么（机制说明）

Cloud Agent 在独立 VM 运行：**environment setup** <10 分钟生成 snapshot；**`/in-cloud`** 启动 cloud subagent；**`/babysit`** 远程迭代 PR；**Handoff** 本地↔云端迁移。⚠️ **Cloud Agent 无法 GUI 测试** 桌面 Customize、Design Mode、本地 Bugbot。

### 适用场景

- **适合**：长程任务、并行 Agent、CI 修复、定时 Automation
- **不适合**：本地 GPU；需桌面 GUI 验证的功能

### 前置条件

- Cursor 3.7+；`.cursor/environment.json`；Cloud Agent 配额

### 详细使用步骤（业务用户）

1. 创建 `.cursor/environment.json`
2. 首次运行观察 setup，snapshot 自动保存
3. 本地输入 `/in-cloud` 派发子任务
4. 或 PR 旁 `/babysit`
5. pull cloud branch 本地验证

### 命令与配置示例

```
/in-cloud
Fix the failing CI tests on branch feature/auth
```

```json
{
  "snapshot": "nodejs-20",
  "install": "npm ci",
  "terminals": [{ "name": "dev-server", "command": "npm run dev" }]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本环境运行 | ✅ 正在执行本任务 |
| `/in-cloud` GUI | ⚠️ 未实测 |
| Customize GUI | ❌ Cloud 无法测试 |

### 问题与解决方案

**setup >10 分钟**：简化 install；用预构建 snapshot。**handoff 丢状态**：确保 3.7+；勿中途关本地会话。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7 | ✅ /in-cloud、/babysit |
| DayAI | ✅ cron Cloud Agent 成功 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | `/in-cloud` 并行修 CI |
| 团队 | 统一 `environment.json` snapshot |
| 文档 | 标注 Cloud 测试边界 |

---

## 特性五：Bugbot 与 `/review` — Push 前审查（3.7 @ 2026-06-10）

### 是什么（机制说明）

Bugbot 由 **Composer 2.5** 驱动：review ~90 秒（原 ~5 分钟）、bug 发现 +10%、成本 -22%。**`/review`** 在 push 前运行 Bugbot + Security Review；与 GitHub/GitLab 同步避免重复 review；可配置仅 review 新变更。

### 适用场景

- **适合**：PR 门禁；push 前自检；安全敏感项目
- **不适合**：Cloud Agent 无 GUI（需桌面或 GitHub 集成）

### 前置条件

- Cursor 3.7+；Bugbot 启用

### 详细使用步骤（业务用户）

1. 完成代码修改
2. 输入 `/review`（或 `/review-bugbot`、`/review-security`）
3. 修复问题后 push
4. 开 PR 时 Bugbot 跳过已 review diff

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

```
Settings → Bugbot → Review only new changes since last review
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 性能数据 | ✅ 官方披露 |
| `/review` 本地 | ⚠️ 未实测（Cloud 无 GUI） |
| cursor.com/agents | ✅ 3.7+ |

### 问题与解决方案

**重复 review**：先本地 `/review` 再开 PR。**时间过长**：Composer 2.5 应 ~90 秒。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/10 | ✅ 性能数据 |
| vs Claude Code | Claude 无内置 PR review |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开发者 | push 前 `/review`（桌面） |
| Tech Lead | 配置「仅 review 新变更」 |
| Cloud Agent | 依赖 GitHub Bugbot 集成 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 3.9 | 6/22 | Customize、leaderboard、Plugin canvases、Team Marketplaces |
| 3.8 | 6/18 | `/automate`、cron、GitHub 触发器、computer use |
| 3.7 | 6/17 | Cloud setup、`/in-cloud`、`/babysit` |
| 3.7 | 6/10 | Bugbot Composer 2.5、`/review` |

## 今日研究员结论

Cursor 6/26 为 **消化期**：3.9 Customize 仍是主线，无新 Changelog。本 DayAI 验证 **Automations cron + Cloud Agent + Computer use** 闭环；⚠️ **Cloud Agent 无法 GUI 测试** Customize/Design Mode/本地 `/review`。建议团队消化 3.9 扩展管理；桌面用户启用 push 前 `/review`；Cloud 用户通过配置文件替代 GUI。
