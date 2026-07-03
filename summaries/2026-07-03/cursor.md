# Cursor 每日技术文档 — 2026-07-03

> 本地实测版本：**—**（桌面未实测）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 3 日检索 Cursor 官方 Changelog：**6/30 后仍无新条目**（连续第 4 日空窗）。最新能力仍为 **Team MCPs in team marketplaces** 与 **organization groups** 访问控制（6/29 iOS 公测、6/22 Customize、6/18 Automations）。本日 DayAI 自动化为 **Cursor Automations cron**（`0 22 * * *` UTC）连续第 2 日触发。Cloud Agent 环境无法 GUI 实测，以下以官方文档 + SOP 为准，标注 ⚠️ 未实测。

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
5. Cloud agent 会话自动继承

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

**成员看不到市场**：检查 organization group 限制。**MCP auth**：Automations 可保存不完整状态后配置 auth。

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
# 无 CLI 配置；纯 Dashboard 操作
# 成员侧验证：Customize 页面应只显示授权市场
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog | ✅ |
| Group 限制实测 | ⚠️ 未实测 |

### 问题与解决方案

**SCIM 与 org groups 冲突**：官方称 SCIM 配置保留；新 restrictions 叠加而非替换。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/30 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT | 按部门拆分敏感 MCP |
| 开发者 | 确认自己所在 group |

---

## 特性三：Cursor Automations — 本任务运行实例（2026-06-18+）

### 是什么（机制说明）

**Cursor Automations** 用 always-on cloud agents 自动化重复任务。支持 **cron、GitHub、Slack emoji** 等触发；默认启用 **computer use** 与 **open PR**；支持 **automation_memory** 持久记忆。

本 DayAI 任务即 Automations 实例：trigger `0 22 * * *` UTC，branch `cursor/dayai-010a`，生成 summaries 并 push。

### 适用场景

- **适合**：每日资讯、CI 修复、PR 审查自动化
- **不适合**：需实时人机协作的创意任务

### 前置条件

- Cursor 最新版 + Automations 权限
- 配置 GitHub 仓库访问

### 详细使用步骤（业务用户）

1. Cursor → **Automations** → New
2. 触发器选 **Schedule**（cron）或 GitHub/Slack
3. Instructions 粘贴任务 Prompt
4. 启用 **open_git_pr**、**computer use**（可选）
5. 保存并手动 Test Run

### 命令与配置示例

```markdown
# Automations Instructions 片段示例
你是每日研究员，在 summaries/YYYY-MM-DD/ 生成 7 个 Markdown…
```

```bash
# cron 示例（UTC）
0 22 * * *
# 对应北京时间次日 06:00（夏令时需注意）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本触发 2026-07-03T22:00:11Z | ✅ cron 正常 |
| computer use | ⚠️ Cloud Agent 环境受限 |
| GUI Automations 配置 | ⚠️ 未实测 |

### 问题与解决方案

**build-index 失败**：检查 README 六板块表。**push 冲突**：`git pull --rebase origin main`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/18 | ✅ Automations 能力 |
| 本运行 | ✅ cron 触发成功 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 内容/运维团队 | cron + GitHub push 闭环 |
| 开发者 | 用 /automate skill 快速起草 |

---

## 特性四：Cloud Agents 与 `/in-cloud` 子代理（2026-06-17）

### 是什么（机制说明）

**Cloud environment setup** 可在 <10 分钟配置云端 dev 环境，快照复用。**`/in-cloud`** 在独立 VM 启动 cloud subagent，本地保持干净。**`/babysit`** 远程迭代 PR。本地与 cloud 会话可 handoff。

### 适用场景

- **适合**：长 CI 修复、并行探索、笔记本合盖继续跑
- **不适合**：需本地硬件的嵌入式开发

### 前置条件

- Agents Window 桌面版
- `.cursor/environment.json`（团队共享快照）

### 详细使用步骤（业务用户）

1. Agents Window → 选择 repo → **Setup cloud environment**
2. 观察共享终端安装依赖
3. 提交 `.cursor/environment.json` 供团队复用
4. 输入 `/in-cloud fix flaky test in ci/`
5. PR 用 `/babysit` 远程准备 merge

### 命令与配置示例

```json
// .cursor/environment.json 示例结构（以官方 schema 为准）
{
  "snapshot": "team-node-20",
  "install": "npm ci"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本环境 Cloud Agent | ✅ 当前会话即为 cloud agent |
| `/in-cloud` GUI | ⚠️ 未实测桌面 |

### 问题与解决方案

**环境 setup 超时**：检查 `environment.json` install 脚本。**handoff 失败**：更新至最新 Cursor。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈团队 | 提交 environment.json |
| 个人 | 本地 + 偶发 cloud offload |

---

## 特性五：Cursor for iOS 公测 — Remote Control（2026-06-29）

### 是什么（机制说明）

**Cursor for iOS** 公测（全付费计划）：从手机启动 cloud agents、语音输入、slash commands。**Remote Control** 将桌面 agent 续接到手机。**Live Activities** 与 push 通知跟踪状态；可 review diff、merge PR。

Teams/Enterprise 需管理员启用 Remote Control。

### 适用场景

- **适合**：移动场景审批 agent、通勤时 follow-up
- **不适合**：重度 IDE 编码（仍用桌面）

### 前置条件

- 付费计划 + iOS 设备
- 企业计划需 Dashboard 开启 Remote Control

### 详细使用步骤（业务用户）

1. App Store 下载 **Cursor for iOS**
2. 登录同一账户，选择 repo 启动 agent
3. 桌面 Agents Window → **Remote Control** 连接手机
4. 锁屏查看 Live Activities
5. Agent 完成时 push 通知 → review artifacts

### 命令与配置示例

```bash
# 移动端无 CLI；使用 App 内 slash commands
/review
# 等效桌面审查流程（以 App 支持为准）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| iOS App | ⚠️ 未实测（无 iOS 设备） |
| Changelog 6/29 | ✅ |

### 问题与解决方案

**Remote Control 不可用**：企业检查 Dashboard 开关。**通知未达**：检查 iOS 通知权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/29 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 技术管理者 | 移动审批 PR |
| 开发者 | 桌面为主，手机为辅 |

---

## 版本对照表

| Changelog 日期 | 版本标签 | 要点 |
|----------------|----------|------|
| 2026-06-30 | — | Team MCPs、org groups |
| 2026-06-29 | 3.9 | iOS 公测、Remote Control |
| 2026-06-22 | 3.9 | Customize、Marketplace leaderboard |
| 2026-06-18 | 3.8 | Automations、computer use |
| 2026-06-17 | 3.7 | Cloud env、`/in-cloud` |

## 今日研究员结论

Cursor **7/3 仍处 Changelog 空窗**，企业 MCP 治理与 Automations 为当前最相关能力。本研究员运行于 Cloud Agent + Automations cron，验证流水线可用。关注 **7/10 前** 是否出现 Composer 或新模型 Changelog。桌面功能均 ⚠️ 未实测。
