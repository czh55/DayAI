# Cursor 每日技术文档 — 2026-06-29

> 本地实测版本：**—（桌面未实测）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 29 日 Cursor 官方 Changelog 发布新条目：Cursor for iOS 公测。** 付费用户可在移动端启动与管理 Cloud Agent，支持 Remote Control、Live Activities、推送通知与 PR 合并。此前最新桌面版仍为 **3.9（2026-06-22）**。本周主线：**iOS 移动端**、**Customize 页**、**Automations**（本 DayAI 任务即 cron 实例）、**Cloud Agent**、**Bugbot `/review`**。⚠️ **Cloud Agent 无法 GUI 测试** iOS App、Customize 页、本地 `/review`。

---

## 特性一：Cursor for iOS — 移动端 Cloud Agent 公测（6/29 新）

### 是什么（机制说明）

Cursor for iOS 于 **2026-06-29** 进入 **public beta**，面向所有付费计划（Pro、Business、Teams、Enterprise）。核心能力：

- **Cloud agents on mobile**：选择仓库、启动 Cloud Agent，与桌面同等 frontier model 选择；支持语音输入与 slash commands
- **Remote Control**：接管本地正在运行的 Agent，从手机继续指挥；可设保持电脑唤醒（Teams/Enterprise 需管理员在 Dashboard 启用）
- **Live Activities + 推送**：锁屏追踪 Agent 状态；完成、需输入、待审查时推送通知
- **Artifacts 与 SCM**：手机审查 demo、截图、日志、diff；留 follow-up 或直接从 App 合并 PR

Cloud Agent 在隔离 VM 运行完整开发环境，支持本地↔云端会话切换。

### 适用场景

- **适合**：通勤/出差时指挥 Agent、审查 PR、紧急 bug 修复跟进
- **不适合**：需精细 IDE 编辑的复杂重构（仍建议桌面）

### 前置条件

- Cursor 付费订阅；iOS 设备；App Store 下载或 PWA
- Remote Control：桌面 Cursor 运行中；Teams/Enterprise 需管理员启用

### 详细使用步骤（业务用户）

1. App Store 搜索「Cursor」或 Safari 打开 cursor.com/agents → Add to Home Screen（PWA）
2. 登录 Cursor 账号，连接 GitHub/GitLab 等源控制
3. 选择仓库 → 描述任务 → 启动 Cloud Agent
4. 本地 Agent 运行时：开启 Remote Control，手机继续指挥
5. Agent 完成后：审查 Artifacts → 留 follow-up 或 Merge PR

### 命令与配置示例

```bash
# 桌面端：启动本地 Agent 后，手机 Remote Control 接管
# Settings → Cloud Agents → Keep computer awake（可选）
```

```json
// .cursor/environment.json — Cloud Agent 环境配置
{
  "snapshot": "dayai-base",
  "install": "npm install",
  "start": "npm run dev"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/29 条目 | ✅ iOS 公测确认 |
| iOS App GUI | ⚠️ 未实测（Cloud Agent 无 iOS 设备） |
| Cloud Agent 文件配置 | ✅ 可通过 environment.json 间接配置 |

### 问题与解决方案

**Remote Control 不可用**：Teams/Enterprise 检查 Dashboard 是否启用。**推送未收到**：检查 iOS 通知权限与 Cursor App 后台刷新。**PR 合并失败**：确认仓库 write 权限与 branch protection 规则。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/29 | ✅ iOS 公测、Remote Control、Artifacts |
| Cursor Docs Cloud Agents | ✅ VM 环境、MCP、handoff 描述一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动办公者 | 优先体验 Remote Control + 推送 |
| Tech Lead | 评估 Teams 管理员 Remote Control 策略 |
| 安全团队 | 审查移动端 PR 合并权限与 artifact 敏感数据 |

---

## 特性二：Customize 页 — 统一扩展管理（3.9 @ 2026-06-22，无更新）

### 是什么（机制说明）

Cursor 3.9 **Customize** 页集中管理 Plugins、Skills、MCPs、Subagents、Rules、Commands、Hooks，支持 **User/Team/Workspace** 三级作用域。**Marketplace leaderboard** 展示团队最受欢迎扩展；**Plugin canvases** 含 Hex、Atlassian 模板；**Team Marketplaces** 支持 GitLab、BitBucket、Azure DevOps 导入。

### 适用场景

- **适合**：企业统一 MCP/插件；多项目复用 skills
- **不适合**：仅用基础补全的轻量用户

### 前置条件

- Cursor 桌面 ≥ 3.9；Team/Enterprise（Team Marketplaces）

### 详细使用步骤（业务用户）

1. **Settings → Customize**
2. **Plugins**：浏览 leaderboard，安装 Hex/Atlassian canvases
3. **MCPs**：Add MCP → 配置 `.cursor/mcp.json`
4. **Skills**：启用 `/automate`
5. **Team Marketplaces**：Connect GitLab/BitBucket/Azure DevOps

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

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.9 | ✅ 6/22，6/29 无桌面更新 |
| Customize 页 GUI | ⚠️ 未实测（Cloud Agent 无 GUI） |

### 问题与解决方案

**MCP 未连接**：检查 `mcp.json` 路径。**Marketplace 导入失败**：验证 token。**Canvas 失败**：确认 Team 订阅。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 | ✅ Customize、leaderboard、canvases |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Tech Lead | leaderboard 发现高频 MCP，标准化分发 |
| Cloud Agent | 通过 `mcp.json` 替代 GUI |

---

## 特性三：Automations — Cron 与 Computer Use（3.8 @ 2026-06-18）

### 是什么（机制说明）

Automations 用 **always-on Cloud Agent** 自动化重复任务。3.8 引入 **`/automate` skill**、Slack emoji、5 种 GitHub 触发器；支持 **Cron**、**Computer use** artifact、默认 **Open PR**、**AutomationMemory**。本 DayAI 任务：**`0 22 * * *` UTC** 定时生成 `summaries/YYYY-MM-DD/` 并 push。

### 适用场景

- **适合**：每日报告、CI 巡检、定时代码审查
- **不适合**：即时交互；无 Cloud Agent 配额用户

### 前置条件

- Cursor ≥ 3.8；`.cursor/environment.json`；Automations 权限

### 详细使用步骤（业务用户）

1. **Automations → Create**（或 `/automate`）
2. 触发器选 Cron：`0 22 * * *`
3. Instructions 填入任务 Prompt
4. 启用 Computer use、OpenGitPr
5. **Automations → Run History** 查看日志与 artifact

### 命令与配置示例

```json
// .cursor/environment.json
{
  "install": "cd tools && npm install",
  "terminals": []
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本任务执行 | ✅ cron 触发成功（Cloud Agent） |
| Automations UI | ⚠️ 未实测 GUI |

### 问题与解决方案

**Cron 未触发**：检查 Automations 启用状态与配额。**PR 未创建**：确认 OpenGitPr 工具已启用。**Memory 冲突**：在 Instructions 中提示清理过时 memory。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 | ✅ `/automate`、cron、computer use |
| 本 DayAI 实例 | ✅ cron `0 22 * * *` 运行中 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 运维 | cron 巡检 + GitHub workflow 触发器 |
| 内容团队 | 本 DayAI 模式可复用 |

---

## 特性四：Bugbot `/review` — 推送前代码审查（3.7+）

### 是什么（机制说明）

Bugbot 平均审查时间从 ~5 分钟降至 **~90 秒**；每次审查发现 bug 数从 0.56 升至 0.62，成本降 ~22%（Composer 2.5 驱动）。`/review` 可在推送前运行 Bugbot 与 Security Review；与 GitHub/GitLab Bugbot 同步——若 `/review` 后开 PR 同 diff，Bugbot 跳过重复审查。

### 适用场景

- **适合**：PR 前自检、安全敏感代码库
- **不适合**：无 Git 集成的纯本地项目

### 前置条件

- Cursor 3.7+；Bugbot 订阅或包含于计划

### 详细使用步骤（业务用户）

1. 本地 Agent 会话中输入 `/review`
2. 选择 Bugbot 和/或 Security Review
3. 或直接 `/review-bugbot`、`/review-security`
4. 修复建议后 push；开 PR 时 Bugbot 识别已审查 diff

### 命令与配置示例

```bash
# 在 Cursor Agent 会话内
/review
/review-bugbot
/review-security
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog Bugbot | ✅ ~90s、Composer 2.5 |
| `/review` 实测 | ⚠️ 未实测（Cloud Agent CLI 即将支持） |

### 问题与解决方案

**审查过慢**：检查 model block list 配置。**重复审查**：确认 `/review` 与 PR diff 一致。**CLI 不可用**：Changelog 称 CLI 支持 coming soon。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/10 | ✅ `/review`、Bugbot 性能提升 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开发者 | push 前 `/review` 养成习惯 |
| 安全团队 | 启用 Security Review |

---

## 特性五：Cloud Agent 环境与 Handoff（3.7 @ 2026-06-17）

### 是什么（机制说明）

Cloud Agent 在隔离 VM 运行，通过 `.cursor/environment.json` 配置环境快照。3.7 引入 **agent-led setup**（<10 分钟）、**`/in-cloud` subagent**、**`/babysit` PR 看护**、本地↔云端 **handoff**。环境快照存入可复用 snapshot，未来 Agent 启动更快。

### 适用场景

- **适合**：长程任务、并行多 Agent、笔记本合上继续运行
- **不适合**：需极低延迟的交互式编辑

### 前置条件

- 付费计划；源控制 read-write 权限；`.cursor/environment.json`

### 详细使用步骤（业务用户）

1. 首次：Agent 引导 setup 或手写 `environment.json`
2. 桌面选 **Cloud** 启动 Agent
3. 长任务用 `/in-cloud` 隔离 subagent
4. PR 用 `/babysit` 或 quick-action pill
5. 需要本地测试时 handoff 回桌面

### 命令与配置示例

```json
{
  "snapshot": "node-20-base",
  "install": "npm ci",
  "start": "npm run dev",
  "terminals": [
    { "name": "dev", "command": "npm run dev" }
  ]
}
```

```bash
# Agent 会话内
/in-cloud Fix the failing CI pipeline
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本任务 Cloud Agent | ✅ 环境 setup 成功 |
| `/in-cloud` GUI | ⚠️ 未实测 |

### 问题与解决方案

**环境 setup 失败**：检查 `install` 命令与网络。**handoff 丢上下文**：升级至 3.7+ 修复版。**secrets 不可用**：在 cursor.com/dashboard/cloud-agents 添加。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7 | ✅ setup、/in-cloud、handoff |
| Cursor Docs | ✅ environment.json 格式一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈团队 | 提交 environment.json 至 repo |
| 个人 | 先用 agent-led setup 快速入门 |

---

## 版本对照表

| 版本/日期 | 关键变更 |
|-----------|----------|
| 6/29 Changelog | **Cursor for iOS 公测**（新） |
| 3.9 @ 6/22 | Customize 页、Marketplace leaderboard |
| 3.8 @ 6/18 | Automations `/automate`、cron、computer use |
| 3.7 @ 6/17 | Cloud setup、/in-cloud、handoff |

## 今日研究员结论

6/29 最大变化是 **Cursor for iOS 公测**，补齐「移动端指挥 Agent」闭环，与 Codex Remote GA、Claude Code Remote Control 形成竞争。桌面版 3.9 无更新，但 Automations（本任务）、Customize、Bugbot 仍是本周主线。建议：移动办公用户优先体验 iOS App；企业评估 Remote Control 管理员策略；Cloud Agent 用户务必维护 `environment.json`。

---
