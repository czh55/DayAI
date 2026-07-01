# Cursor 每日技术文档 — 2026-07-01

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 1 日检索 Cursor Changelog：**最新条目为 2026-06-30**，宣布 **Team MCPs 进入团队市场** 与 **organization groups 市场访问控制**。6/29 **Cursor for iOS 公测**余波延续。本仓库运行于 Cursor Cloud Agent，**无法 GUI 实测**桌面 Dashboard 或 iOS，以下以官方 Changelog + Docs 为准，标注 ⚠️ 未实测。

---

## 特性一：Team MCPs in Team Marketplaces — 企业 MCP 一次配置、多端分发（2026-06-30）

### 是什么（机制说明）

管理员可在 Cursor Dashboard 配置 **Team MCP servers**，并发布到 **team marketplace**。成员可从市场 **一键安装** 已批准 MCP，无需自行配置服务器。同一 Team MCP 可分发至：

- **Cloud agents**（云端 Agent）
- **Agents 窗口**
- **IDE**
- **CLI**

与 6/17 Cloud environment、6/18 Automations 的 MCP 能力形成企业治理闭环。

### 适用场景

- **适合**：企业统一 Jira/Slack/内部 API 等 MCP 集成；降低成员自行配置错误风险
- **不适合**：纯个人 Pro 用户（无 team marketplace）

### 前置条件

- Cursor **Teams 或 Enterprise** 计划
- 管理员 Dashboard 访问权限
- 已有或新建 Team MCP server 配置

### 详细使用步骤（业务用户）

1. 管理员登录 **Cursor Dashboard**
2. 导航 **Dashboard → Integrations & MCP**
3. 配置 Team MCP server（若此前仅为 cloud agents 配置，可按文档 [migrating existing Team MCPs](https://cursor.com/docs) 迁移）
4. 发布至 **team marketplace**
5. 成员在 IDE **Customize** 页或 Dashboard 市场 **一键安装**
6. 成员在 Cloud Agent / IDE / CLI 会话中即可使用已安装 MCP 工具

### 命令与配置示例

```json
// .cursor/mcp.json（成员本地，市场安装后可能自动写入）
{
  "mcpServers": {
    "team-jira": {
      "url": "https://mcp.example.com/jira"
    }
  }
}
```

```text
# Agents 会话内（安装 Team MCP 后）
# Agent 可调用已批准 MCP 工具，无需成员重复配置
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/30 条目 | ✅ 官方确认 |
| Dashboard Team MCP 配置 | ⚠️ 未实测（Cloud Agent 无 Dashboard GUI） |
| 本环境 MCP 工具 | ✅ 当前 Agent 可使用已配置 MCP（如 Cursor Automation Tools） |

### 问题与解决方案

**成员看不到市场**：确认管理员已发布且成员属正确 team。**MCP auth 失败**：Automations 6/18 改进——可先保存不完整 automation 完成 MCP auth。**与 Claude Code MCP 并存**：企业可同时治理 Cursor Team MCP 与 Claude Code `claude mcp` 批准策略。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 6/30 | ✅ |
| Cursor Docs Integrations | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 7 月内完成 Team MCP 迁移与成员培训 |
| 个人开发者 | 继续自带 MCP；关注是否加入 team |
| 安全团队 | 审计市场内 MCP 权限范围 |

---

## 特性二：Marketplace Access by Organization Group — 细粒度市场访问（2026-06-30）

### 是什么（机制说明）

Team marketplaces 现支持 **organization groups**（组织组），除既有 **SCIM directory groups** 外，可按组织组 **限制 marketplace 访问**。配置路径：**Dashboard → Plugins → Team Marketplaces** → 限制到特定 organization groups。已使用 SCIM 组的市场 **保留原配置**。

### 适用场景

- **适合**：大型组织按部门/区域分发不同插件与 MCP；合规隔离
- **不适合**：小团队无需分组

### 前置条件

- Enterprise 组织已配置 organization groups
- Team marketplace 管理员权限

### 详细使用步骤（业务用户）

1. 管理员进入 **Dashboard → Plugins → Team Marketplaces**
2. 选择目标 marketplace
3. 在访问控制中添加 **organization groups**（或保留 SCIM groups）
4. 保存后，仅属该组成员可看到/安装市场内容
5. 其他组成员看不到受限市场

### 命令与配置示例

```text
# 无 CLI 配置；纯 Dashboard 操作
# Dashboard → Plugins → Team Marketplaces → Access → Organization groups
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 描述 | ✅ |
| Organization group 配置实测 | ⚠️ 未实测 |

### 问题与解决方案

**SCIM 与 org groups 冲突**：官方称 SCIM 配置保留，新增 org groups 为补充。**成员跨组调动**：需 HR/IT 同步更新 group 成员关系。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/30 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全球企业 IT | 按区域分发不同 MCP（如 EU vs US 数据驻留） |
| 开发者 | 无感；仅能看到被授权市场 |

---

## 特性三：Cursor for iOS 公测 — 移动端 Cloud Agent（2026-06-29，余波）

### 是什么（机制说明）

**Cursor for iOS** 6/29 进入 public beta，付费用户可在 iPhone 启动 **Cloud Agent**、**Remote Control** 桌面会话、**Live Activities**、审阅 **Artifacts** 并 merge PR。与 6/30 Team MCP 结合：企业可在手机端使用已批准 MCP（若 cloud agent 支持）。

### 适用场景

- **适合**：通勤指挥 Agent、合盖长任务、移动端审阅 PR
- **不适合**：大屏精细 IDE 编辑

### 前置条件

- Cursor 付费计划
- iOS 设备 + Cursor iOS app
- Teams/Enterprise Remote Control 需管理员启用

### 详细使用步骤（业务用户）

1. 安装 Cursor for iOS
2. 登录账户 → 选 repo → 描述任务
3. 可用语音输入与 `/review` 等 slash commands
4. Remote Control：在桌面 Agents 窗口将运行中 agent 交接到手机
5. 锁屏 Live Activities 查看进度；完成后 merge PR

### 命令与配置示例

```text
/review
/in-cloud
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/29 | ✅ |
| iOS 实测 | ⚠️ 未实测 |
| 本 Cloud Agent 环境 | ✅ 即 Cursor Cloud Agent 实例 |

### 问题与解决方案

**Remote Control 不可用**：Enterprise 需 Dashboard 启用。**电脑休眠断开**：开启 keep computer awake 设置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog + Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动办公者 | 结合 6/30 Team MCP 在手机上用企业集成 |
| 管理员 | 评估 Remote Control 安全策略 |

---

## 特性四：Cursor Automations — Cron 触发与 Cloud Agent（本环境即实例）

### 是什么（机制说明）

本 DayAI 每日资讯任务即 **Cursor Automation**（cron `0 22 * * *` UTC）。6/18 Changelog：Automations 支持 GitHub/Slack 触发、**computer use** 工具默认启用、可 **open PR by default**、**automation_memory** 持久记忆。Cloud Agent 在隔离环境执行检索、写文件、git push。

### 适用场景

- **适合**：日更文档、CI 巡检、定时研究报告
- **不适合**：需本地 GUI 或私有网络资源的任务

### 前置条件

- Cursor Automations 功能可用
- 仓库 GitHub 集成为 push 目标
- `.cursor/environment.json` 可选加速 cloud 环境

### 详细使用步骤（业务用户）

1. Cursor Dashboard → Automations → New
2. 触发器选 **Cron** 或 GitHub/Slack
3. Instructions 填入任务 prompt（如本 DayAI 模板）
4. 启用 **open_git_pr**、**automation_memory** 等 MCP 工具
5. 保存并等待触发；检查 PR 与 `summaries/YYYY-MM-DD/`

### 命令与配置示例

```json
// .cursor/environment.json
{
  "install": "cd tools && npm install"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 automation 运行 | ✅ 2026-07-01T22:01Z 触发 |
| computer use GUI | ⚠️ 本任务以 CLI/文档为主 |

### 问题与解决方案

**build-index 失败**：检查 README 六板块表格。**push 失败**：`git pull --rebase origin main`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 6/18 | ✅ Automations 能力 |
| 本仓库运行记录 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 内容团队 | 参考 DayAI 模板做日更 automation |
| 工程团队 | 用 GitHub trigger 做 PR review 自动修复 |

---

## 特性五：Cloud Subagents `/in-cloud` 与 `/babysit`（2026-06-17 3.7，仍有效）

### 是什么（机制说明）

**`/in-cloud`** 在独立 VM 启动 cloud subagent，本地工作区保持干净。**`/babysit`** 让 cloud agent 远程迭代 PR 直至可 merge。与 6/30 Team MCP 结合：subagent 可使用团队已安装 MCP。

### 适用场景

- **适合**：并行 fix CI、长时调查、PR babysitting
- **不适合**：需本地硬件或局域网资源

### 前置条件

- Cursor 桌面最新版
- Cloud Agent 配额
- `.cursor/environment.json` 可加速启动

### 详细使用步骤（业务用户）

1. Agents 窗口输入任务
2. 使用 **`/in-cloud`** 将下一任务交给 cloud subagent
3. 或点击 PR **babysit** quick-action pill
4. 本地继续其他工作；完成后审阅 cloud 分支
5. Handoff：会话可在 local ↔ cloud 间迁移

### 命令与配置示例

```text
/in-cloud Fix the failing CI workflow on branch feature-x
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.7 | ✅ |
| `/in-cloud` 本环境 | ✅ Cloud Agent 即 cloud 执行 |

### 问题与解决方案

**环境启动慢**：提交 `.cursor/environment.json` 快照。**subagent 分支冲突**：手动 merge 前 review diff。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog + Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | 本地开发 + cloud 跑 CI 修复 |
| 团队 | 结合 Team MCP 在 cloud subagent 用企业工具 |

---

## 版本对照表

| 日期 | Changelog | 要点 |
|------|-----------|------|
| 2026-06-30 | 无版本号条目 | Team MCP + org groups |
| 2026-06-29 | 3.9 | Cursor for iOS 公测 |
| 2026-06-22 | 3.9 | Customize 页、Plugin leaderboard |
| 2026-06-18 | 3.8 | Automations、computer use |
| 2026-06-17 | 3.7 | Cloud env、`/in-cloud`、`/babysit` |

## 今日研究员结论

**7/1 Cursor 最大新闻是 6/30 企业向 Team MCP 治理**——与 Claude Code MCP 安全批准、Codex MCP tool search 形成行业「Agent 工具链企业化」共振。个人用户继续享受 iOS 公测与 Automations；企业应在 7 月完成 Team MCP 市场迁移与 organization groups 访问策略。
