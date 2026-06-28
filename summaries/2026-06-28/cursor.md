# Cursor 每日技术文档 — 2026-06-28

> 本地实测版本：**—（桌面未实测）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 28 日 Cursor 官方 Changelog 无新条目。** 最新版本仍为 **3.9（2026-06-22）**。本周主线：**Customize 页**、**Automations**（`/automate`、cron、computer use）、**Cloud Agent**、**Bugbot `/review`**、**`.cursor/permissions.json`**。本 DayAI 任务即 **3.8 cron 实例**（`0 22 * * *` UTC，触发时间 2026-06-28T22:00:26Z）。⚠️ **Cloud Agent 无法 GUI 测试** Customize 页、Design Mode、Automations UI、本地 `/review`。

---

## 特性一：Customize 页 — 统一扩展管理（3.9 @ 2026-06-22，无更新）

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
| Changelog 3.9 | ✅ 6/22，6/28 无更新 |
| Customize 页 GUI | ⚠️ 未实测（Cloud Agent 无 GUI） |
| mcp.json 文件配置 | ✅ Cloud 可通过文件间接配置 |

### 问题与解决方案

**MCP 未连接**：检查 `mcp.json` 路径与 `npx`。**Marketplace 导入失败**：验证 token 与 plugin 格式。**Canvas 失败**：确认 Team 订阅与网络。

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
| Cloud Agent | 通过 `mcp.json` 替代 GUI |

---

## 特性二：Automations — `/automate` Skill 与 Cron 触发（3.8 @ 2026-06-18）

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

```
/automate
# 每天 UTC 22:00 生成 AI 资讯总结并 push 到 main
```

```
0 22 * * *     # 本 DayAI 任务
0 9 * * 1-5    # 工作日 09:00
```

```json
{
  "snapshot": "dayai-base",
  "install": "cd tools && npm install",
  "terminals": []
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本任务 cron | ✅ 2026-06-28T22:00:26Z 触发 |
| Automations UI | ⚠️ 未实测 GUI |
| Cloud 写文件/push | ✅ 本环境执行中 |
| `/automate` | ⚠️ Changelog 确认，GUI 未测 |

### 问题与解决方案

**触发未完成**：检查 Instructions 与 `environment.json`。**push 失败**：`git pull --rebase origin main`。**MCP auth 中断**：利用 3.8 未完成状态保存。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 | ✅ cron、GitHub 触发器 |
| DayAI 实践 | ✅ 连续多日 cron 运行 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | workflow_run completed 触发 CI 修复 |
| 内容团队 | cron + Computer use 定时报告 |
| 安全 | 配合 permissions.json 限制写权限 |

---

## 特性三：Computer Use — Automation 屏幕操作（3.8 @ 2026-06-18）

### 是什么（机制说明）

**Computer use** 允许 Cloud Agent 控制 VM 桌面：截图、点击、键盘、**RecordScreen**。3.8 起 **Automation 默认启用**；Instructions 要求「包含演示」即可产出 artifact。

### 适用场景

- **适合**：Automation 录屏、GUI 回归、文档配图
- **不适合**：本地 GPU；高精度设计（用 Design Mode）

### 前置条件

- Cursor ≥ 3.8；Cloud Agent；Instructions 描述 GUI 流程

### 详细使用步骤（业务用户）

1. Automation 确认 **Computer use** 已启用
2. Instructions 追加：`Record a screen demo showing …`
3. Web 演示：`environment.json` 配置 dev server terminal
4. **Run History → Artifacts** 下载 recording

### 命令与配置示例

```
Use Computer use to record a 30-second demo of the daily index page.
```

```json
{
  "terminals": [{ "name": "dev-server", "command": "npm run dev" }]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| RecordScreen | ✅ Cloud Agent 可用 |
| Customize GUI 演示 | ⚠️ 未实测 |
| Changelog 3.8 | ✅ |

### 问题与解决方案

**录屏黑屏**：确认 dev server 启动。**权限被拒**：检查 `permissions.json`。**artifact 缺失**：Instructions 需显式要求 demo。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 文档作者 | cron + Computer use 自动演示 |
| 前端 | Design Mode 优先 |
| 安全 | 配置 permissions.json deny |

---

## 特性四：Cloud Agent 与 `/in-cloud` 子 Agent（3.7 @ 2026-06-17）

### 是什么（机制说明）

Cloud Agent 在独立 VM 运行：**environment setup** <10 分钟生成 snapshot；**`/in-cloud`** 启动 cloud subagent；**`/babysit`** 远程迭代 PR；**Handoff** 本地↔云端迁移。

### 适用场景

- **适合**：长程任务、并行 Agent、CI 修复、定时 Automation
- **不适合**：本地 GPU；需桌面 GUI 验证的功能

### 前置条件

- Cursor 3.7+；`.cursor/environment.json`；Cloud Agent 配额

### 详细使用步骤（业务用户）

1. 创建 `.cursor/environment.json`
2. 首次运行观察 setup，snapshot 自动保存
3. 本地输入 **`/in-cloud`** 派发子任务
4. PR 旁 **`/babysit`** 远程迭代
5. **Settings → Agents → Cloud** 查看配额与历史

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
| 本环境运行 | ✅ 执行 6/28 DayAI cron |
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

Bugbot 由 **Composer 2.5** 驱动：review ~90 秒、bug 发现 +10%、成本 -22%。**`/review`** push 前运行 Bugbot + Security Review；与 GitHub/GitLab 同步避免重复 review。

### 适用场景

- **适合**：PR 门禁；push 前自检；安全敏感项目
- **不适合**：Cloud Agent 无 GUI（需桌面或 GitHub 集成）

### 前置条件

- Cursor 3.7+；Bugbot 启用

### 详细使用步骤（业务用户）

1. 完成代码修改
2. 输入 **`/review`**（或 `/review-bugbot`、`/review-security`）
3. 修复问题后 push
4. **Settings → Bugbot → Review only new changes since last review**

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 性能数据 | ✅ 官方披露 |
| `/review` 本地 | ⚠️ 未实测（Cloud 无 GUI） |
| cursor.com/agents | ✅ 3.7+ |

### 问题与解决方案

**重复 review**：先本地 `/review` 再开 PR。**时间过长**：应 ~90 秒。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/10 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开发者 | push 前 `/review`（桌面） |
| Tech Lead | 配置「仅 review 新变更」 |
| Cloud Agent | 依赖 GitHub Bugbot 集成 |

---

## 特性六：`.cursor/permissions.json` — Agent 权限治理（SDK 6/4 延续）

### 是什么（机制说明）

**`.cursor/permissions.json`** 定义 Agent 操作边界：文件读写、Shell/MCP、自动运行策略。SDK **`local.autoReview`** 配合 `autoRun.allow/block_instructions` 自然语言 steer 分类器。对 **Computer use + cron Automation** 尤为关键。

### 适用场景

- **适合**：企业 Agent 治理；Automation 最小权限；SDK headless CI
- **不适合**：纯聊天、不启用 Agent 工具

### 前置条件

- Agent / Cloud Agent / SDK 环境

### 详细使用步骤（业务用户）

1. 仓库根创建 `.cursor/permissions.json`
2. 定义 `allow` / `deny` / `ask`
3. **Settings → Cursor Settings → Rules and Permissions → Edit permissions.json**
4. 提交 Git，Automation 运行时自动加载

### 命令与配置示例

```json
{
  "permissions": {
    "allow": ["Read(**/*)", "Edit(summaries/**/*)", "Shell(git)", "Shell(npm)"],
    "deny": ["Shell(rm -rf *)", "Edit(.env*)", "Read(.env*)"],
    "ask": ["Shell(git push *)"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| JSON 语法 | ✅ 可写入项目 |
| Cloud deny 拦截 | ⚠️ 未单独隔离测试 |

### 问题与解决方案

**越权执行**：检查 deny glob 覆盖。**autoReview 未拦截**：补充 `block_instructions`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/4 SDK | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 安全/合规 | permissions 纳入安全基线 |
| DevOps | cron Automation 限制 push |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 3.9 | 6/22 | Customize、leaderboard、Plugin canvases、Team Marketplaces |
| 3.8 | 6/18 | `/automate`、cron、GitHub 触发器、computer use |
| 3.7 | 6/17 | Cloud setup、`/in-cloud`、`/babysit` |
| 3.7 | 6/10 | Bugbot Composer 2.5、`/review` |

## 今日研究员结论

Cursor **6/28 仍为消化期**：无新 Changelog。本 DayAI 验证 cron + Cloud Agent 闭环（触发 22:00:26Z）；⚠️ Cloud 无法 GUI 测试 Customize、Design Mode、`/review`。

**行动建议**：桌面升级 3.9；Automation 必配 permissions.json；push 前 `/review`；Cloud 用配置文件替代 GUI。
