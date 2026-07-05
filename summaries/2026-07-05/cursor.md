# Cursor 每日技术文档 — 2026-07-05

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 5 日 Cursor [Changelog](https://cursor.com/changelog) **仍无 6/30 后更新**（连续第 **4** 日）。最新条目为 **6/30 Team MCPs in team marketplaces** 与 **organization groups** 访问控制。本仓库 DayAI Automations cron（`0 22 * * *` UTC）今日第 4 次连续触发。产品重心仍在 6 月发布的 **企业 MCP 治理**、**Automations/Cloud Agent**、**iOS 公测** 能力栈。7/7 前后关注是否有新 Changelog 回应 GPT-5.6 传闻窗口。

---

## 特性一：Changelog 空窗期 — 6/30 后无更新（7/5 第 4 日）

### 是什么（机制说明）

Cursor Changelog 自 **2026-06-30** Team MCP 更新后进入 **5 日空窗**（含 7/5）。这在 Cursor 发布节奏中并不罕见——6 月中下旬密集发布（3.7 Cloud env、3.8 Automations、3.9 iOS/Customize、6/30 Team MCP）后常有短暂静默。不代表产品停滞：Cloud Agent、Automations cron 仍每日运行。

### 适用场景

- **适合**：回顾 6 月已发布能力并落地配置
- **不适合**：期待每日 Changelog 的尝鲜用户

### 前置条件

- Cursor 订阅（Pro/Teams）
- 定期访问 [cursor.com/changelog](https://cursor.com/changelog)

### 详细使用步骤（业务用户）

1. 打开 [Cursor Changelog](https://cursor.com/changelog) 确认最新日期
2. 若 6/30 后无更新：以已发布文档为准配置 Team MCP
3. 关注 7/7 前后是否有 GPT-5.6 相关回应
4. IDE 内 **Help → Check for Updates** 确保客户端最新

### 命令与配置示例

```bash
# 本仓库 Automation cron（UTC 22:00 = 北京时间次日 06:00）
0 22 * * *
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 7/5 检查 | ✅ 最新仍为 6/30 |
| 本触发 2026-07-05T22:02:10Z | ✅ Cloud Agent 执行中 |

### 问题与解决方案

**误以为 Cursor 停更**：6 月已密集发布，空窗属正常。**功能不可用**：检查 IDE 版本是否已更新至 6 月 release。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| cursor.com/changelog | ✅ 6/30 最新 |
| 本仓库 cron 第 4 日 | ✅ 连续运行 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 先消化 6 月 Changelog |
| 企业用户 | 优先配置 Team MCP |

---

## 特性二：Team MCPs in Team Marketplaces（2026-06-30）

### 是什么（机制说明）

管理员可 **一次性配置 Team MCP servers**，通过 Dashboard → Integrations & MCP 分发至 cloud agents、agents 窗口、IDE、CLI。成员从 **team marketplace** 一键安装已批准集成，无需自行配置 MCP 服务器。支持从 cloud agents 已有 Team MCP **迁移**至 marketplace。

### 适用场景

- **适合**：企业统一 MCP 治理、合规审批流程
- **不适合**：个人开发者无 Team 计划

### 前置条件

- Cursor **Teams** 或 **Enterprise** 计划
- 管理员 Dashboard 访问权限

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. 导航：**Dashboard → Integrations & MCP**
3. 配置 Team MCP server（URL、auth、scope）
4. 启用 **Team Marketplace** 分发
5. 成员端：**Customize** 页面浏览 team marketplace 并安装
6. Cloud Agent / IDE / CLI 自动获得已安装 MCP

### 命令与配置示例

```json
// .cursor/mcp.json（成员本地，marketplace 安装后自动生成）
{
  "mcpServers": {
    "approved-internal-api": {
      "command": "npx",
      "args": ["-y", "@company/mcp-server"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Team MCP 配置 | ⚠️ 未实测（无 Teams Dashboard） |
| Cloud Agent MCP | ✅ 本环境可用 MCP 工具 |

### 问题与解决方案

**成员看不到 marketplace**：确认管理员已发布且成员在授权组。**MCP auth 失败**：6/18 起 Automations 可保存不完整状态待 auth 完成。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/30 | ✅ Team MCP + marketplace |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT | 集中审批 MCP，禁止成员自配未知 server |
| 开发者 | 从 marketplace 安装而非手写 mcp.json |

---

## 特性三：Marketplace Access by Organization Group（2026-06-30）

### 是什么（机制说明）

Team marketplaces 现支持 **organization groups**（除 SCIM directory groups 外）。管理员可在 **Dashboard → Plugins → Team Marketplaces** 将 marketplace 访问限制到特定组织组。已使用 SCIM directory groups 的 marketplace **保留原配置**。

### 适用场景

- **适合**：大型企业按部门/地区拆分 MCP 权限
- **不适合**：小团队全员共享同一 marketplace

### 前置条件

- Teams/Enterprise + organization groups 已配置
- SCIM 或手动组织组管理

### 详细使用步骤（业务用户）

1. Dashboard → **Plugins → Team Marketplaces**
2. 选择目标 marketplace
3. **Access control** → 添加 organization group
4. 保存后仅该组成员可见/可安装
5. 成员验证：Customize 页面只显示授权市场

### 命令与配置示例

```bash
# 管理员审计：列出已授权组
# Dashboard → Team Marketplaces → [marketplace] → Groups
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

## 特性四：Cursor Automations 与 Cron 触发（本仓库实例）

### 是什么（机制说明）

Cursor Automations 提供 always-on agents，支持 **cron、GitHub、Slack** 等触发。本 DayAI 仓库使用 cron `0 22 * * *`（UTC 22:00）每日生成资讯。6/18 起支持 `/automate` skill、computer use、GitHub 五类新触发、默认开 PR、**automation_memory** 持久记忆。

### 适用场景

- **适合**：日更文档、CI 修复、PR review 自动回复
- **不适合**：需实时人机交互的创意任务

### 前置条件

- Cursor 最新版
- Cloud Agent 环境（cron 触发）
- Automation Instructions 配置完整

### 详细使用步骤（业务用户）

1. Cursor 中输入 `/automate` 描述自动化任务
2. 选择触发器：**Schedule** → cron 表达式
3. 配置 Instructions（如 DayAI 每日资讯 Prompt）
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
| 本触发 2026-07-05T22:02:10Z | ✅ Cloud Agent 执行中 |
| GUI `/automate` | ⚠️ 未实测 |

### 问题与解决方案

**build-index 失败**：检查 README.md 六板块表格。**push 冲突**：`git pull --rebase origin main`。**MCP auth 中断**：6/18 起可保存不完整 automation。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 6/18 | ✅ Automations |
| 本仓库 cron 第 4 日 | ✅ 连续运行 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 文档维护者 | cron + git push 闭环 |
| 开源维护者 | GitHub PR comment 触发修复 |

---

## 特性五：Cloud Agents 与 `/in-cloud` 子代理（2026-06-17+）

### 是什么（机制说明）

**Cloud environment setup** 帮助 10 分钟内配置云开发环境，快照存于 `.cursor/environment.json`。**`/in-cloud`** 在独立 VM 启动 cloud subagent，本地工作区保持干净。**`/babysit`** 让 cloud agent 远程迭代 PR 至可合并状态。支持 local ↔ cloud handoff。

### 适用场景

- **适合**：长时 CI 修复、并行探索、笔记本合盖后继续
- **不适合**：需本地 GPU/特殊硬件的任务

### 前置条件

- Cursor 3.7+
- Cloud Agent 配额

### 详细使用步骤（业务用户）

1. Agents 窗口 → **Set up cloud environment**
2. 观看 agent 安装依赖，确认 `.cursor/environment.json` 生成
3. 长任务输入 `/in-cloud fix failing CI on PR #123`
4. PR 准备合并时点击 **babysit** pill 或 `/babysit`
5. 本地 ↔ cloud 用 handoff 按钮切换

### 命令与配置示例

```json
// .cursor/environment.json
{
  "install": "npm install",
  "start": "npm run dev"
}
```

```bash
/in-cloud investigate flaky test in tests/api/
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud agent VM | ✅ 本环境为 Cloud Agent |
| `/in-cloud` GUI | ⚠️ 未实测 |

### 问题与解决方案

**环境快照过期**：重新运行 cloud setup。**子 agent 分支冲突**：确认 VM 使用独立 branch。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7 6/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长任务用户 | `/in-cloud` 隔离并行工作 |
| 团队 | 提交 environment.json 至 repo |

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

Cursor 7/5 **无新 Changelog**，产品重心仍在 6 月发布的 **企业 MCP 治理** 与 **Automations/Cloud Agent** 能力栈。对 DayAI 读者：Team MCP 若在用 Cursor Teams 值得配置；个人用户关注 Automations cron 与 Cloud Agent 即可。**7/7 前后**关注是否有新 Changelog 回应 GPT-5.6 传闻窗口与 Fable 5 额度竞争。

---
