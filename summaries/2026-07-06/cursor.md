# Cursor 每日技术文档 — 2026-07-06

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 6 日检索 Cursor 官方 [Changelog](https://cursor.com/changelog)：**6/30 后仍无新条目**（连续第 **5** 日空窗）。最新能力仍为 **Team MCPs in team marketplaces** 与 **organization groups** 市场访问控制（3.10 / 6/30）。同期有效能力栈包括 **6/29 iOS 公测**、**6/18 Automations**（`/automate`、cron、computer use）、**Cloud Agent**、**`.cursor/permissions.json`** 权限治理，以及 **Bugbot + `/review` + Composer 2.5** 审查链路。

本仓库 DayAI 自动化为 **Cursor Automations cron**（`0 22 * * *` UTC，北京时间次日 06:00）**第 5 日**连续触发。本研究员运行于 **Cloud Agent** 环境，**无法 GUI 实测**桌面 IDE、iOS App、Customize 页或本地 `/review`，以下以官方 Changelog + Docs + 本仓库 SOP 为准，相关项标注 ⚠️ 未实测。

---

## 特性一：Team MCPs + Organization Groups（2026-06-30，仍最新）

### 是什么（机制说明）

**3.10 / 6/30** 扩展 team marketplaces：管理员在 **Dashboard → Integrations & MCP** 配置 **Team MCP servers** 后发布至 **team marketplace**，成员一键安装已批准集成，同一 MCP 分发至 **cloud agents、Agents 窗口、IDE、CLI**。另支持 **organization groups** 访问控制——在 **Dashboard → Plugins → Team Marketplaces** 将市场限制到特定 org groups（SCIM directory groups 配置保留）。

### 适用场景

- **适合**：企业统一 MCP 治理、多部门差异化插件权限
- **不适合**：个人 Pro 无 Team marketplace

### 前置条件

- Cursor **Teams** 或 **Enterprise**；org groups 需 Enterprise
- 管理员 Dashboard 权限

### 详细使用步骤（业务用户）

1. Dashboard → **Integrations & MCP** → 配置 Team MCP
2. **Plugins → Team Marketplaces** → 发布集成
3. 可选：**Restrict access** → 选择 organization groups
4. 成员 **Customize** 页面安装；Cloud agent 自动继承

### 命令与配置示例

```json
// .cursor/mcp.json（成员本地示例）
{
  "mcpServers": {
    "team-jira": { "url": "https://mcp.example.com/jira" }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/30 | ✅ Team MCP + org groups |
| 安装与 group 限制 | ⚠️ 未实测（需 Team + GUI） |

### 问题与解决方案

**成员看不到市场**：检查 org group 限制。**MCP auth 失败**：6/18 起 Automations 可保存不完整状态后补 auth。**SCIM 并存**：官方称 SCIM 配置保留。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.10 / 6/30 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 优先上架高频 MCP |
| 个人开发者 | user-level MCP 即可 |

---

## 特性二：Cursor Automations — `/automate`、Cron、Computer Use（2026-06-18，本仓库第 5 日）

### 是什么（机制说明）

**Cursor Automations**（3.8）用 always-on **Cloud Agent** 自动化重复任务。支持 **`/automate` skill**、**cron**、**GitHub 五类触发**、**Slack emoji 触发**，默认 **computer use**（录屏 demo）与 **open PR**。本 DayAI 仓库即实例：cron `0 22 * * *` UTC，每日生成 `summaries/YYYY-MM-DD/` 七文件并 push。

### 适用场景

- **适合**：日更文档、CI 修复、PR review 自动回复
- **不适合**：需实时人机创意协作

### 前置条件

- Cursor 最新版 + Automations 权限；GitHub 仓库访问
- 可选：`.cursor/permissions.json` 限制写权限

### 详细使用步骤（业务用户）

1. Agent 会话输入 **`/automate`** 描述任务
2. 触发器选 **Schedule** → `0 22 * * *`
3. 粘贴 Instructions；启用 **open_git_pr**、**computer use**（可选）
4. Test Run 或等待 cron；检查产出目录

### 命令与配置示例

```bash
0 22 * * *   # UTC 22:00 = 北京时间次日 06:00

node tools/build-index.js
git add summaries/2026-07-06/ index.json
git commit -m "docs: add daily summary 2026-07-06"
git push origin main
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本触发 2026-07-06T22:00Z | ✅ Cloud Agent 执行中 |
| cron 第 5 日连续 | ✅ |
| GUI `/automate` / computer use | ⚠️ 未实测 |

### 问题与解决方案

**build-index 失败**：检查 README 六板块表。**push 冲突**：`git pull --rebase origin main`。**artifact 缺失**：Instructions 显式要求 demo。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 / 6/18 | ✅ |
| 本仓库 cron 第 5 日 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 文档团队 | cron + git push 闭环 |
| 安全 | 配合 permissions.json 限制 shell |

---

## 特性三：Cloud Agent 与 iOS 公测（2026-06-17 + 6/29）

### 是什么（机制说明）

**Cloud Agent** 在隔离 VM 运行，可 shell、git、MCP、computer use。**6/17**：**Cloud environment setup**、`.cursor/environment.json` 快照、**`/in-cloud`** 子代理、**`/babysit`**、本地↔cloud handoff。**6/29 iOS 公测**（全付费）：手机启动 cloud agents、语音输入、**Remote Control** 桌面会话、Live Activities、push 通知、Artifacts/SCM 审 diff 与 merge PR。

### 适用场景

- **适合**：长 CI 修复、并行探索、通勤审 PR、合盖继续跑
- **不适合**：需大屏 IDE 精细编辑

### 前置条件

- 付费计划；`.cursor/environment.json`（可选）
- 企业 Remote Control 需 Dashboard 启用

### 详细使用步骤（业务用户）

1. Agents Window → **Setup cloud environment** → 提交 `environment.json`
2. `/in-cloud` 或 `/babysit` 远程迭代 PR
3. iOS：选 repo 启动 agent；桌面 **Remote Control** 连接
4. push 通知处理 input/review

### 命令与配置示例

```json
// .cursor/environment.json
{ "install": "npm install --prefix tools", "start": "npm run dev" }
```

```text
/in-cloud
/babysit
/review
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本环境 Cloud Agent | ✅ 当前会话即为 cloud agent |
| iOS / Remote Control / `/in-cloud` | ⚠️ 未实测 |

### 问题与解决方案

**setup 超时**：检查 install 脚本。**Remote Control 不可用**：企业 Dashboard 开关。**handoff 失败**：更新 Cursor。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/29 / 6/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈团队 | 提交 environment.json |
| 通勤开发者 | iOS 审 diff |

---

## 特性四：`.cursor/permissions.json` — Agent 权限治理（SDK 6/4 延续）

### 是什么（机制说明）

**`.cursor/permissions.json`** 定义 Agent 操作边界（文件、Shell、MCP）。SDK **`local.autoReview`** 配合 `autoRun.allow/block_instructions` 自然语言 steer 分类器。User 级与项目级**数组合并**生效。对 **Computer use + cron Automation + Cloud Agent** 尤为关键。

### 适用场景

- **适合**：企业治理、Automation 最小权限、SDK headless CI
- **不适合**：纯聊天、不启用 Agent 工具

### 前置条件

- Agent / Cloud Agent / SDK；permissions 纳入 PR 评审

### 详细使用步骤（业务用户）

1. 仓库根创建 `.cursor/permissions.json`
2. 定义 `allow` / `deny` / `ask`
3. SDK：`local.autoReview: true` + `autoRun` 指令
4. **Settings → Rules and Permissions → Edit permissions.json**
5. 提交 Git，Automation 自动加载

### 命令与配置示例

```json
{
  "permissions": {
    "allow": ["Read(**/*)", "Edit(summaries/**/*)", "Shell(git)", "Shell(npm)"],
    "deny": ["Shell(rm -rf *)", "Edit(.env*)", "Read(.env*)"],
    "ask": ["Shell(git push *)"]
  },
  "autoRun": {
    "allow_instructions": ["Writing markdown under summaries/ is allowed."],
    "block_instructions": ["Always pause delete and force-push."]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| JSON 语法 | ✅ 可写入项目 |
| Cloud deny 拦截 | ⚠️ 未单独测试 |

### 问题与解决方案

**越权执行**：检查 deny glob。**Cloud/local 不一致**：确认 user+project 合并。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/4 SDK + Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 安全/合规 | permissions 纳入基线 |
| DevOps | cron Automation 限制 push |

---

## 特性五：Bugbot、`/review` 与 Composer 2.5（2026-06-10 持续有效）

### 是什么（机制说明）

**Bugbot** 由 **Composer 2.5** 驱动，平均 review ~**90s**，成本 **-22%**，bug 检出 **+10%**。**`/review`** 在 push 前运行 Bugbot + Security Review；与 GitHub/GitLab PR 同步，同 diff 免重复 review。支持 `/review-bugbot`、`/review-security`。

### 适用场景

- **适合**：PR 前自检、降低 CI review 成本
- **不适合**：无 Git 集成

### 前置条件

- Cursor 3.7+；Bugbot 连接 GitHub/GitLab

### 详细使用步骤（业务用户）

1. 桌面或 **cursor.com/agents** 打开 Agent
2. 输入 **`/review`** 或 `/review-bugbot`、`/review-security`
3. 修复 findings 后 push；PR 侧 Bugbot 识别已 review diff

### 命令与配置示例

```text
/review
/review-bugbot
/review-security
```

```json
{ "bugbot": { "reviewOnlyNewChanges": true } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/10 | ✅ Composer 2.5 |
| `/review` 实测 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**不同步**：确认同一 diff。**误报多**：启用 `reviewOnlyNewChanges`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog Jun 10 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 提交者 | push 前 `/review` |
| Reviewer | only-new-changes 减噪 |

---

## 版本对照表

| 日期 | 版本 | 要点 |
|------|------|------|
| 6/30 | 3.10 | Team MCPs、organization groups |
| 6/29 | 3.9 | iOS 公测、Remote Control、Live Activities |
| 6/22 | 3.9 | Customize、Marketplace leaderboard |
| 6/18 | 3.8 | Automations、`/automate`、cron、computer use |
| 6/17 | 3.7 | Cloud env setup、`/in-cloud`、`/babysit` |
| 6/10 | 3.7 | Bugbot Composer 2.5、`/review` |
| 6/4 | SDK | autoReview、permissions.json、JSONL store |

## 今日研究员结论

Cursor **7/6 进入 Changelog 空窗第 5 日**，官方最新仍为 **6/30 企业 MCP 治理**（Team MCP + org groups）。对 DayAI 读者，当前最可落地能力栈为：**Automations cron**（本仓库第 5 日验证闭环）、**Cloud Agent** 远程执行、**permissions.json** 最小权限、push 前 **`/review`**（Composer 2.5 Bugbot）。Teams/Enterprise 用户应优先配置 Team MCP marketplace；个人用户关注 Automations 与 Cloud Agent 即可。

本研究员运行于 Cloud Agent，已验证 git/shell/MCP 流水线；桌面 IDE、iOS、Customize、`/review` 均 ⚠️ 未实测。7/7 前后关注是否有新 Changelog 回应 **GPT-5.6** 传闻窗口及 Composer 后续版本。

---
