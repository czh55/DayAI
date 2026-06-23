# Cursor 每日技术文档 — 2026-06-23

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Plugins Docs](https://cursor.com/docs/plugins)

## 今日综述

**2026 年 6 月 23 日 Cursor 最新 Changelog 为 6/22 发布的 3.8 第二波**：统一 **Customize** 页、**Marketplace leaderboard**、**Plugin canvases**（Hex/Atlassian）、Team Marketplaces 扩展 **GitLab/BitBucket/Azure DevOps** 导入。6/18 的 Automations（`/automate`、GitHub triggers、Computer Use）仍在消化期。本环境 ⚠️ 无法 GUI 实测；以下基于官方 Changelog + Docs。

---

## 特性一：Customize 页统一工作流资产管理（2026-06-22）

### 是什么（机制说明）

Cursor 3.8（6/22）引入 **Customize** 侧边栏页面，集中管理：

- **Plugins**：可分发 bundles（rules、skills、commands、MCP、hooks）
- **Skills**：Agent 专项能力，`/skill-name` 手动调用
- **MCP servers**：Model Context Protocol 集成
- **Subagents**：子 Agent 配置
- **Rules**：Always / Agent Decides / Manual 三模式
- **Commands** 与 **Hooks**：事件触发自动化

支持 **user / team / workspace** 三级作用域，可引入自定义 MCP。

### 适用场景

- **适合**：团队统一编码规范、分发内部 MCP、管理多项目 rules
- **不适合**：仅需单次对话、无重复工作流

### 前置条件

- Cursor 3.8+（6/22 Changelog）
- Teams/Enterprise 计划（team 级配置）

### 详细使用步骤（业务用户）

1. 打开 Cursor → 侧边栏 **Customize**
2. 按 scope 筛选：User / Workspace / Team
3. 点击 **+ Add** 安装 Marketplace plugin 或添加 MCP
4. Rules 切换模式：Always（始终注入）/ Agent Decides / Manual
5. Skills 在 Agent Decides 区显示，聊天输入 `/skill-name` 调用

### 命令与配置示例

**基础 — 安装官方 plugin**

```
Customize → Browse Marketplace → 搜索 "github" → Install
```

**进阶 — workspace 级 rules**

```markdown
# .cursor/rules/coding-standards.mdc
---
description: Team coding standards
alwaysApply: true
---
- Use TypeScript strict mode
- All PRs require unit tests
```

**team marketplace 导入（Admin）**

```
Dashboard → Settings → Plugins → Team Marketplaces → + Import Marketplace
→ 粘贴 GitHub repo URL → Save
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GUI Customize 页 | ⚠️ 未实测（无 GUI） |
| Changelog 6/22 | ✅ 官方确认 |
| Docs 一致性 | ✅ [Plugins Docs](https://cursor.com/docs/plugins) 交叉验证 |

### 问题与解决方案

**错误 1：Team plugin 未自动安装**

排查：Admin 需设为 Required 而非 Optional；检查 distribution group。

**错误 2：MCP 认证中断**

排查：6/18 Improvement——Automation 可存 incomplete state；Customize 中重新配置 MCP auth。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog 6/22](https://cursor.com/changelog) | ✅ |
| [Plugins Docs](https://cursor.com/docs/plugins) | ✅ Customize 入口一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 从 Marketplace 安装常用 MCP |
| Team Lead | 建立 team marketplace + Required plugins |
| 企业 Admin | GitLab/BitBucket/Azure DevOps 导入私有 repo |

---

## 特性二：Marketplace Leaderboard 与一键安装（2026-06-22）

### 是什么（机制说明）

Customize 页新增 **leaderboard**，展示团队内最受欢迎的 plugins、skills、MCPs 排行，支持一键添加到个人配置。降低「不知道同事用什么工具」的信息摩擦。

### 适用场景

- **适合**：中大型团队工具标准化、新成员 onboarding
- **不适合**：单人项目、无 team 计划

### 前置条件

- Cursor 3.8+
- Teams 计划（leaderboard 为 team 级功能）

### 详细使用步骤（业务用户）

1. Customize → Marketplace leaderboard 区域
2. 浏览团队热门 plugins/skills/MCPs
3. 点击 **Add** 一键安装到个人或 workspace 配置
4. 与 Admin 设置的 Required plugins 互补

### 命令与配置示例

**查看热门 MCP**

```
Customize → Leaderboard → 筛选 "MCP" → 按安装量排序
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Leaderboard UI | ⚠️ 未实测（无 GUI） |
| Changelog | ✅ 6/22 官方条目 |

### 问题与解决方案

**错误 1：Leaderboard 为空**

排查：团队需有足够安装数据；新 team 可能暂无统计。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新成员 | 从 leaderboard 快速对齐团队工具栈 |
| Admin | 观察热门项，考虑升为 Required |

---

## 特性三：Plugin Canvases 预构建模板（2026-06-22）

### 是什么（机制说明）

Plugins 现支持 **prebuilt canvases**——团队可打开并复用的共享设置模板：

- **Hex Canvas**：构建数据可视化
- **Atlassian Canvas**：实时查看 issues、projects、documents

Canvas 作为 plugin 的一部分分发，降低重复配置成本。

### 适用场景

- **适合**：数据团队（Hex）、使用 Jira/Confluence 的工程团队（Atlassian）
- **不适合**：无对应工具链的团队

### 前置条件

- Cursor 3.8+
- 安装含 canvas 的 plugin（Marketplace 或 team marketplace）

### 详细使用步骤（业务用户）

1. Customize → 安装 Hex 或 Atlassian plugin
2. 打开 plugin 附带的 Canvas 模板
3. 按模板指引连接数据源（Hex workspace / Atlassian org）
4. 在 Agent 会话中引用 canvas 上下文

### 命令与配置示例

**Atlassian Canvas 典型配置**

```
Customize → Install "Atlassian" plugin → Open Atlassian Canvas
→ 授权 Atlassian OAuth → 选择 project
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Canvas 功能 | ⚠️ 未实测（无 GUI） |
| Changelog 示例 | ✅ Hex + Atlassian 官方提及 |

### 问题与解决方案

**错误 1：Canvas OAuth 失败**

排查：检查 Atlassian/Hex 账号权限；MCP auth 可存 incomplete automation 状态（6/18）。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 数据分析师 | Hex Canvas 快速可视化 |
| 工程 Manager | Atlassian Canvas 统一 issue 视图 |

---

## 特性四：Team Marketplaces 多平台导入（2026-06-22）

### 是什么（机制说明）

Team marketplaces 新增从以下平台导入 plugin 仓库：

- **GitLab**
- **BitBucket**
- **Azure DevOps**

（此前主要支持 GitHub；6/18 前后已支持 GitHub Enterprise）

Admin 在 Dashboard → Settings → Plugins 导入 repo，解析 `.cursor-plugin/marketplace.json`，分发 Required/Optional plugins。

### 适用场景

- **适合**：企业使用 GitLab/BitBucket/Azure DevOps 作为主代码托管
- **不适合**：仅 GitHub 的小团队（可直接用 GitHub marketplace）

### 前置条件

- Cursor Teams/Enterprise 计划
- Plugin repo 含 `.cursor-plugin/marketplace.json` 清单

### 详细使用步骤（业务用户）

**Admin 侧**

1. Dashboard → Settings → Plugins → Team Marketplaces
2. + Import Marketplace → 粘贴 GitLab/BitBucket/Azure DevOps repo URL
3. 审查解析出的 plugin 列表
4. 设置每个 plugin 为 Required / Optional / Default On
5. Save → 开发者从 Customize 安装

**开发者侧**

1. Customize → 查找 team marketplace plugins
2. 安装 Optional plugins；Required 自动安装

### 命令与配置示例

**marketplace.json 结构**

```json
{
  "name": "my-team-plugins",
  "plugins": [
    {
      "name": "internal-linter",
      "source": "./plugins/linter",
      "description": "Team lint rules and MCP"
    }
  ]
}
```

**GitLab repo URL 示例**

```
https://gitlab.com/my-org/cursor-plugins
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 多平台导入 | ⚠️ 未实测（无 Admin 权限） |
| Changelog 6/22 | ✅ 官方确认三平台 |
| Forum 6/18 | ✅ GHE 支持讨论一致 |

### 问题与解决方案

**错误 1：Azure DevOps 导入 HTTP 500**

排查：Forum 反馈需先在 `cursor.com/dashboard?tab=integrations` 注册 GHE/Azure 集成。

**错误 2：Auto-refresh 未触发**

排查：需 Cursor GitHub App 安装于 hosting org 并有权访问 marketplace repo。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/22 | ✅ |
| [Forum Team Marketplaces](https://forum.cursor.com/t/cursor-2-6-team-marketplaces-for-plugins/153484) | ✅ GHE 流程补充 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| GitLab 企业 | 立即建立 team marketplace |
| Azure DevOps 用户 | 先完成 integrations 配置 |
| 开源团队 | 仍可用 cursor.com/marketplace 公开发布 |

---

## 特性五：Automations `/automate` 与 Computer Use（2026-06-18，消化期）

### 是什么（机制说明）

6/18 3.8 第一波发布（6/22 为第二波插件更新）：

- **`/automate` skill**：本地 Agent 会话描述自动化，Cursor 配置 trigger/instructions/tools
- **5 项 GitHub triggers**：issue comment、PR review comment、PR review submitted、review thread updated、workflow run completed
- **Slack emoji trigger**：对消息 react 指定 emoji 启动 automation
- **Computer Use**：云 Agent 默认启用，可录屏演示 GUI 变更
- **Improvements**：存 incomplete state、默认开 PR、UI 删 memory

### 适用场景

- **适合**：每日 cron 资讯、PR 自动修复、failed Actions 调查
- **不适合**：严格数据不出境场景

### 前置条件

- Cursor 3.8+
- Cloud Agent 额度（Automations 以 Max Mode 计费）

### 详细使用步骤（业务用户）

1. Agents Window 或 `/automate`
2. 描述任务 + 选 trigger（cron/GitHub/Slack）
3. instructions 中要求「include a demo」以启用 Computer Use
4. 选 repo 与 Permissions → Save & Activate

### 命令与配置示例

```
/automate
每天 UTC 22:00 生成 DayAI 资讯并 push 到 main，完成后录屏演示网页
```

**GitHub trigger — workflow run failed**

```
Trigger: Workflow run completed (failed)
Instructions: 调查失败日志，修复并开 PR
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 DayAI Automation | ✅ cron 触发运行中（Cloud Agent） |
| GUI `/automate` | ⚠️ 未实测（无 GUI） |
| Computer Use | ⚠️ 本环境为 Cloud Agent 实例，无桌面录屏实测 |

### 问题与解决方案

**错误 1：Automation 未触发**

排查：确认 Activate；cron 时区；repo 写权限。

**错误 2：Max Mode 费用超预期**

排查：Automations 始终 Max Mode；限制 trigger 频率。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 本仓库 DayAI | cron + Computer Use 录屏验证 |
| 开源维护者 | GitHub workflow failed trigger |
| 企业 | Slack emoji triage |

---

## 版本对照表

| 版本/日期 | 核心变更 |
|-----------|----------|
| 3.8 @ 6/22 | Customize 页、Leaderboard、Canvases、GitLab/BitBucket/Azure DevOps |
| 3.8 @ 6/18 | `/automate`、GitHub/Slack triggers、Computer Use |
| 3.7 @ 6/17 | Cloud environment setup、`/in-cloud`、`/babysit` |
| 3.7 @ 6/10 | Bugbot ~90s、`/review`、Composer 2.5 驱动 |

## 今日研究员结论

**6/22 的 Customize 页更新**标志 Cursor 从「AI 编辑器」向「可分发 Agent 工作流平台」演进，与 Codex `/plugins` 分区、Claude Code MCP CLI 认证形成生态对标。建议团队 Admin 本周内完成 team marketplace 规划；个人开发者升级至 3.8 后从 Customize 统一管理 MCP/rules。GUI 功能本环境 ⚠️ 未实测，以官方 Changelog 为准。

---
