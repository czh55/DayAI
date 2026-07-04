# Cursor 每日技术文档 — 2026-07-04

> 本地实测版本：**—**（桌面未实测）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 4 日检索 Cursor 官方 Changelog：**6/30 后仍无新条目**（连续第 5 日空窗）。最新能力仍为 **Team MCPs in team marketplaces** 与 **organization groups** 访问控制（6/29 iOS 公测、6/22 Customize、6/18 Automations）。本日 DayAI 自动化为 **Cursor Automations cron**（`0 22 * * *` UTC）连续第 3 日触发。Cloud Agent 环境无法 GUI 实测，以下以官方文档 + SOP 为准，标注 ⚠️ 未实测。

---

## 特性一：Team MCPs 团队市场统一分发（2026-06-30，仍最新）

### 是什么（机制说明）

管理员在 **Dashboard → Integrations & MCP** 配置 **Team MCP servers** 后，可发布到 **team marketplace**。成员一键安装已批准集成，无需自行配置 MCP。同一 Team MCP 分发至 **cloud agents、Agents 窗口、IDE、CLI**。

### 适用场景

- **适合**：企业统一 Jira/Slack/内部 API MCP 治理
- **不适合**：个人 Pro 无 Team marketplace

### 前置条件

- Cursor Teams 或 Enterprise
- 管理员 Dashboard 权限

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. **Integrations & MCP** → 配置 Team MCP
3. **Plugins → Team Marketplaces** → 发布
4. 成员在 IDE **Customize** 或 Agents 窗口安装
5. Cloud agent 会话自动继承 Team MCP

### 命令与配置示例

```json
// .cursor/mcp.json（成员本地示例）
{
  "mcpServers": {
    "team-jira": {
      "url": "https://mcp.example.com/jira"
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/30 | ✅ 官方确认 |
| Team MCP 安装 | ⚠️ 未实测（需 Team + GUI） |

### 问题与解决方案

**成员看不到市场**：检查 organization group 限制。**MCP auth 失败**：Automations 支持保存不完整状态后配置 auth（6/18 改进）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 6/30 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 优先上架高频 MCP |
| 个人开发者 | user-level MCP 即可 |

---

## 特性二：Organization Groups 市场访问控制（2026-06-30）

### 是什么（机制说明）

**Dashboard → Plugins → Team Marketplaces** 可将市场访问限制到特定 **organization groups**（除 SCIM directory groups 外）。已有 SCIM 配置的市场保留原设置。

### 适用场景

- **适合**：大型企业多部门差异化 MCP 权限
- **不适合**：小团队全员同等访问

### 前置条件

- Enterprise + organization groups 已配置

### 详细使用步骤（业务用户）

1. Dashboard → **Plugins → Team Marketplaces**
2. 选择目标 marketplace
3. **Restrict access** → 选择 organization groups
4. 保存；非组成员无法看到该市场

### 命令与配置示例

```bash
# 纯 Dashboard 操作，无 CLI 配置
# 成员验证：Customize 页面只显示授权市场
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| org groups 限制 | ⚠️ 未实测 |

### 问题与解决方案

**SCIM 与 org groups 冲突**：Changelog 称 SCIM 配置保留。**跨组访问需求**：创建多个 marketplace 按组拆分。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/30 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT | 按部门划分 MCP 权限 |
| 安全团队 | 审计 marketplace 成员列表 |

---

## 特性三：Cursor Automations 与 Cron 触发（2026-06-18+，本仓库实例）

### 是什么（机制说明）

Cursor Automations 提供 always-on agents，支持 **cron、GitHub、Slack** 等触发。本 DayAI 仓库使用 cron `0 22 * * *`（UTC 22:00，北京时间次日 06:00）每日生成资讯。6/18 起支持 `/automate` skill、computer use、GitHub 五类新触发、默认开 PR。

### 适用场景

- **适合**：日更文档、CI 修复、PR review 自动回复
- **不适合**：需实时人机交互的创意任务

### 前置条件

- Cursor 最新版
- Cloud Agent 环境（cron 触发）
- 仓库 `.cursor/` 或 Automation 配置

### 详细使用步骤（业务用户）

1. Cursor 中输入 `/automate` 描述自动化任务
2. 选择触发器：**Schedule** → cron 表达式
3. 配置 Instructions（如本仓库 AUTOMATION_PROMPT.md）
4. 启用 **open_git_pr**、**computer use**（可选）
5. 保存并等待触发；检查 `summaries/YYYY-MM-DD/` 产出

### 命令与配置示例

```bash
# cron 示例：每日 UTC 22:00
0 22 * * *

# Automation 内 git 流程
git add summaries/YYYY-MM-DD/ index.json
git commit -m "docs: add daily summary YYYY-MM-DD"
git push origin main
```

```json
// .cursor/permissions.json（若需限制 agent 写权限）
{
  "allow": ["Shell", "Write", "Read"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本触发 2026-07-04T22:00:10Z | ✅ Cloud Agent 执行中 |
| GUI `/automate` | ⚠️ 未实测 |

### 问题与解决方案

**build-index 失败**：检查 README.md 六板块表格。**push 冲突**：`git pull --rebase origin main`。**MCP auth 中断**：6/18 起可保存不完整 automation。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 6/18 | ✅ Automations |
| 本仓库 cron 第 3 日 | ✅ 连续运行 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 文档维护者 | cron + git push 闭环 |
| 开源维护者 | GitHub PR comment 触发修复 |

---

## 特性四：Cloud Agents 与 iOS 公测（2026-06-29）

### 是什么（机制说明）

**Cursor for iOS** 公测：从手机启动 cloud agents、语音输入、slash commands。支持 **Remote Control**（桌面 agent 手机续操）、Live Activities、push 通知、Artifacts/SCM 审查。Cloud agents 跑在隔离 VM，可 `.cursor/environment.json` 快照加速启动。

### 适用场景

- **适合**：移动场景审 PR、跟进长任务
- **不适合**：需大屏 IDE 的复杂重构

### 前置条件

- 付费计划（iOS 公测）
- Teams/Enterprise Remote Control 需管理员启用

### 详细使用步骤（业务用户）

1. App Store 下载 Cursor for iOS
2. 选择 repo，描述任务，选模型
3. 桌面 Agents 窗口开启 Remote Control
4. 手机接收 push：agent 完成/需输入/待 review

### 命令与配置示例

```json
// .cursor/environment.json（团队共享云环境快照）
{
  "install": "npm install",
  "start": "npm run dev"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| iOS app | ⚠️ 未实测 |
| Cloud agent VM | ✅ 本环境为 Cloud Agent |

### 问题与解决方案

**Remote Control 不可用**：Teams 需 Dashboard 启用。**环境快照过期**：重新运行 cloud setup。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 6/29 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 通勤开发者 | iOS 审 diff |
| 团队 Lead | 统一 environment.json |

---

## 特性五：Customize 页面与 Marketplace Leaderboard（2026-06-22）

### 是什么（机制说明）

**Customize** 页面统一管理 plugins、skills、MCPs、subagents、rules、commands、hooks（user/team/workspace 级）。**Marketplace leaderboard** 展示团队最热门插件一键安装。Plugin canvases（Hex、Atlassian）提供预置模板。

### 适用场景

- **适合**：标准化团队 Agent 工作流
- **不适合**：极简个人配置

### 前置条件

- Cursor 3.9+
- Team 计划（leaderboard）

### 详细使用步骤（业务用户）

1. IDE → **Customize**（或 Settings → Customize）
2. 浏览 Marketplace leaderboard
3. 一键添加 skill/MCP
4. Team 管理员配置 team-level rules

### 命令与配置示例

```markdown
# .cursor/rules/dayai.mdc
---
description: DayAI daily summary format
---
Follow summaries/YYYY-MM-DD/ seven-file structure.
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Customize 页面 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**插件冲突**：workspace 级优先于 user 级。**GitLab/BitBucket 导入**：6/22 起 Team Marketplaces 支持。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 6/22 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队标准化 | team-level skills |
| 个人用户 | 从 leaderboard 挑高频 MCP |

---

## 版本对照表

| 日期 | 版本 | 要点 |
|------|------|------|
| 6/30 | Changelog | Team MCP + org groups |
| 6/29 | 3.9 | iOS 公测、Remote Control |
| 6/22 | 3.9 | Customize、Marketplace |
| 6/18 | 3.8 | Automations、computer use |
| 6/17 | 3.7 | Cloud env setup、`/in-cloud` |

## 今日研究员结论

Cursor 7/4 **无新 Changelog**，产品重心仍在 6 月发布的 **企业 MCP 治理** 与 **Automations/Cloud Agent** 能力栈。对 DayAI 读者：Team MCP 若在用 Cursor Teams 值得配置；个人用户关注 Automations cron 与 Cloud Agent 即可。7/7 前后关注是否有新 Changelog 回应 GPT-5.6 传闻窗口。

---
