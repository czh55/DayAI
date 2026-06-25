# Cursor 每日技术文档 — 2026-06-25

> 本地实测版本：**—（桌面未实测）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 25 日 Cursor 官方 Changelog 无新条目。** 最新版本仍为 **3.9（2026-06-22）**。今日行业对照：**OpenAI Codex Remote GA**（手机遥控桌面 Agent）与 Cursor **Cloud Agent + Automations cron**（本 DayAI 任务即 3.8 引入的 cron 触发实例）形成「移动端 vs 定时自动化」两种「离开桌面」路径。媒体 6/25 聚焦 AI 编程孤独感，Cursor 侧无直接回应。

---

## 特性一：Customize 页统一扩展管理（3.9 @ 2026-06-22，无更新）

### 是什么（机制说明）

Cursor 3.9 引入 **Customize** 页面，集中管理：

- **Plugins**、**Skills**、**MCPs**、**Subagents**、**Rules**、**Commands**、**Hooks**
- 支持 **User / Team / Workspace** 三级作用域
- **Marketplace leaderboard**：团队内最受欢迎插件/技能/MCP 排行
- **Plugin canvases**：Hex（数据可视化）、Atlassian（Issue/项目实时视图）预置模板
- **Team Marketplaces**：支持 GitLab、BitBucket、Azure DevOps 插件仓库导入

### 适用场景

- **适合**：企业统一管理 MCP 与插件；多项目复用 skills
- **不适合**：仅使用基础补全的轻量用户

### 前置条件

- Cursor 桌面 ≥ 3.9
- Team/Enterprise 订阅（Team 级配置）

### 详细使用步骤（业务用户）

1. 打开 Cursor → **Settings（齿轮）→ Customize**
2. **Plugins**：浏览 Marketplace leaderboard，一键安装
3. **MCPs**：Add MCP → 配置 `mcp.json`
4. **Skills**：启用 `/automate` 等技能
5. **Team Marketplaces**：连接 GitLab/BitBucket/Azure DevOps 仓库

### 命令与配置示例

**项目级 MCP `.cursor/mcp.json`**

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

**权限 `.cursor/permissions.json`**

```json
{
  "allow": ["Shell(npm)", "Shell(git)", "Read", "Write"],
  "deny": ["Shell(rm -rf *)"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.9 | ✅ 6/22 发布，6/25 无更新 |
| 桌面 Customize 页 | ⚠️ 未实测（Cloud Agent 无 GUI） |

### 问题与解决方案

**错误 1：MCP 在 Customize 页显示未连接**

排查：检查 `mcp.json` 路径；验证 `npx` 命令可执行；重启 Cursor。

**错误 2：Team Marketplace 导入失败**

排查：确认 GitLab/BitBucket/Azure DevOps token 权限；检查仓库是否为有效 plugin 格式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.9 | ✅ |
| Cursor Docs | ✅ Customize 页文档 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Tech Lead | 用 leaderboard 发现团队高频 MCP，标准化分发 |
| 个人开发者 | User 级配置即可；关注 Plugin canvases 模板 |
| 与 Codex 对照 | Codex 今日推 Remote GA；Cursor Customize 偏桌面扩展生态 |

---

## 特性二：Cursor Automations — Cron 定时触发（3.8 @ 2026-06-18）

### 是什么（机制说明）

Cursor Automations 支持多种触发器，包括 **Cron 定时**：

- 按 cron 表达式定时启动 Cloud Agent
- 本 DayAI 每日资讯任务即为实例：`0 22 * * *`（UTC 22:00）
- 配合 **Computer use** 工具可产出演示/录屏 artifact
- 可默认开启 PR 创建；支持 AutomationMemory 持久记忆

3.8 还引入 `/automate` skill、Slack emoji 触发、5 种新 GitHub 触发器。

### 适用场景

- **适合**：每日报告、CI 巡检、定时代码审查、文档生成
- **不适合**：需要即时响应的交互任务；无 Cloud Agent 配额的免费用户

### 前置条件

- Cursor ≥ 3.8
- Cloud Agent 环境配置（`.cursor/environment.json`）
- Automations 功能访问权限

### 详细使用步骤（业务用户）

1. Cursor 桌面 → **Automations** → **Create**
2. 触发器选择 **Cron**，输入表达式如 `0 22 * * *`
3. Instructions 填入任务 Prompt（如 DayAI 每日资讯模板）
4. 工具：启用 Computer use、OpenGitPr 等
5. 保存并启用；到点自动触发 Cloud Agent
6. 查看运行历史与 artifact

### 命令与配置示例

**Agent 会话中创建 Automation**

```
/automate
# 描述：每天 UTC 22:00 生成 AI 资讯总结并 push 到 main
```

**cron 表达式示例**

```
0 22 * * *     # 每天 UTC 22:00
0 9 * * 1-5    # 工作日 UTC 09:00
0 */6 * * *    # 每 6 小时
```

**environment.json 片段**

```json
{
  "snapshot": "dayai-base",
  "install": "cd tools && npm install",
  "terminals": []
}
```

**GitHub 触发器（3.8 新增）**

- Issue comment（非 PR issue）
- PR review comment
- PR review submitted
- Review thread updated
- Workflow run completed

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本任务触发 | ✅ cron `0 22 * * *` @ 2026-06-25T22:02:49Z |
| 桌面 Automations UI | ⚠️ 未实测（Cloud Agent 环境） |
| Computer use | ✅ 工具可用（RecordScreen 等） |

### 问题与解决方案

**错误 1：Automation 触发但未完成**

排查：检查 Instructions 是否完整；验证 `environment.json` 依赖安装；查看 Cloud Agent 日志。

**错误 2：push 到 main 失败**

排查：按 Prompt 先 `git pull --rebase origin main`；确认分支权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 | ✅ cron、GitHub 触发器、computer use |
| 本仓库实践 | ✅ DayAI 自动化运行中 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 运维/DevOps | 用 workflow_run completed 触发自动修复 CI |
| 内容团队 | cron + Computer use 产出定时报告 |
| 与 Codex Remote 对照 | Cursor cron = 定时启动；Codex Remote = 手机遥控已运行任务 |

---

## 特性三：Cloud Agent 与 `/in-cloud` 子 Agent（3.7 @ 2026-06-17）

### 是什么（机制说明）

Cloud Agent 在独立 VM 中运行，不占用本地资源：

- **Cloud environment setup**：<10 分钟自动配置 dev 环境，生成可复用 snapshot
- **`/in-cloud`**：启动 cloud subagent 在独立 VM/branch 工作
- **`/babysit`**：远程迭代 PR 直至可合并
- **Handoff**：本地 ↔ 云端会话可靠迁移

### 适用场景

- **适合**：长程任务、并行多 Agent、CI 修复、PR babysit
- **不适合**：需本地硬件/GPU 的任务；离线开发

### 前置条件

- Cursor 3.7+
- `.cursor/environment.json` 提交到仓库
- Cloud Agent 配额

### 详细使用步骤（业务用户）

1. 项目根目录创建 `.cursor/environment.json`
2. 首次 Cloud Agent 运行时观察 setup 进度（共享终端）
3. setup 完成后 snapshot 自动保存
4. 本地 Agent 会话中输入 `/in-cloud` 派发子任务
5. 或点击 PR 旁 quick-action pill 使用 `/babysit`
6. 完成后 pull cloud branch 到本地验证

### 命令与配置示例

**启动 cloud subagent**

```
/in-cloud
Fix the failing CI tests on branch feature/auth
```

**babysit PR**

```
/babysit
# 或点击 PR 旁 quick-action pill
```

**environment.json 完整示例**

```json
{
  "snapshot": "nodejs-20",
  "install": "npm ci",
  "start": "npm run dev",
  "terminals": [
    {
      "name": "dev-server",
      "command": "npm run dev"
    }
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本环境运行 | ✅ Cloud Agent 正在执行本任务 |
| `/in-cloud` 桌面操作 | ⚠️ 未实测 GUI |
| environment.json | ✅ 仓库含 tools/ 环境 |

### 问题与解决方案

**错误 1：Cloud setup 超过 10 分钟**

排查：简化 `install` 脚本；检查网络依赖下载；使用预构建 snapshot。

**错误 2：handoff 后会话状态丢失**

排查：确保 3.7+ 版本；避免在 handoff 中途关闭本地会话。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7 | ✅ cloud setup、/in-cloud、/babysit |
| DayAI 实践 | ✅ cron 触发 Cloud Agent 成功 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | 用 `/in-cloud` 并行修 CI 与写功能 |
| 团队 | 提交 `environment.json` 统一 Cloud snapshot |
| 与 Codex Remote 对照 | Cursor = IDE 内 cloud VM；Codex Remote = 手机控桌面 Codex App |

---

## 特性四：Bugbot 与 `/review`（3.7 @ 2026-06-10 更新）

### 是什么（机制说明）

Bugbot 由 **Composer 2.5** 驱动（3.7 更新）：

- 平均 review 时间 ~90 秒（原 ~5 分钟）
- 每 review 发现 bug 数 +10%（0.62 vs 0.56）
- 每次运行成本 -22%
- **`/review`**：push 前运行 Bugbot + Security Review
- 与 GitHub/GitLab Bugbot 同步：同 diff 不重复 review
- 可配置仅 review 自上次 review 后的新变更

### 适用场景

- **适合**：PR 质量门禁；push 前自检；安全敏感项目
- **不适合**：极小改动（可用 `/review-bugbot` 单独运行）

### 前置条件

- Cursor 3.7+
- Bugbot 启用（GitHub/GitLab 集成或本地 `/review`）
- CLI 支持「coming soon」（截至 6/25 Changelog 未宣布 GA）

### 详细使用步骤（业务用户）

1. 完成代码修改
2. Agent 会话输入 `/review`
3. 选择 Bugbot 和/或 Security Review
4. 或直接 `/review-bugbot`、`/review-security`
5. 修复发现的问题后 push
6. 开 PR 时 Bugbot 识别已 review diff 并跳过

### 命令与配置示例

**push 前 review**

```
/review
```

**仅 Bugbot**

```
/review-bugbot
```

**GitHub PR 配置 — 仅 review 新变更**

```
Settings → Bugbot → Review only new changes since last review
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 性能数据 | ✅ 官方披露 |
| `/review` 本地执行 | ⚠️ 未实测（无桌面 GUI） |
| cursor.com/agents | ✅ 3.7+ 支持 |

### 问题与解决方案

**错误 1：Bugbot 与 GitHub PR 重复 review**

排查：确保先本地 `/review` 再开 PR；检查 diff 一致性。

**错误 2：review 时间过长**

排查：Composer 2.5 应 ~90 秒；检查 model block list 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/10 | ✅ 性能提升数据 |
| Composer 2.5 | ✅ 官方确认驱动 Bugbot |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开发者 | 养成 push 前 `/review` 习惯 |
| Tech Lead | 配置「仅 review 新变更」减少噪音 |
| 与 Claude Code 对照 | Claude 无内置 PR review；可用 Cursor Bugbot 互补 |

---

## 特性五：Design Mode 浏览器编辑（3.7 @ 2026-06-05）

### 是什么（机制说明）

Cursor 内置浏览器 **Design Mode**：

- **多选元素**：点击 2+ 元素，Agent 理解布局关系
- **语音输入**：Design Mode 叠加层麦克风，Agent 运行中可排队语音指令
- 配合 Computer use 实现 UI 迭代

### 适用场景

- **适合**：前端 UI 微调；非开发者描述视觉变更
- **不适合**：纯后端项目；无浏览器的 headless 环境

### 前置条件

- Cursor 3.7+
- 项目可本地启动 dev server
- 浏览器 Design Mode 入口可用

### 详细使用步骤（业务用户）

1. 启动项目 dev server
2. Cursor → 打开内置浏览器 → 进入 **Design Mode**
3. 点击目标元素（可多选）
4. 文字或语音描述变更：「让这个按钮与左边卡片对齐」
5. Agent 修改代码并热更新预览
6. 满意后 commit

### 命令与配置示例

**Agent 会话引用 Design Mode**

```
Open the app in Design Mode and make the header sticky on scroll
```

**多选操作示例**

```
Select these two cards and make them the same height
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Design Mode | ⚠️ 未实测（Cloud Agent 无 GUI 浏览器） |
| Changelog 3.7 | ✅ 多选 + 语音 |

### 问题与解决方案

**错误 1：Agent 无法识别选中元素**

排查：确认 Design Mode 已激活；检查元素是否在 iframe 内。

**错误 2：语音输入无响应**

排查：检查麦克风权限；确认 Agent 未处于阻塞状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7 | ✅ |
| 社区 | 前端开发者正面反馈为主 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端开发者 | Design Mode 加速像素级调整 |
| PM/设计师 | 语音描述降低沟通成本 |
| 与 Codex Record&Replay 对照 | Cursor = 实时 UI 编辑；Codex = 录制桌面操作复用 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 3.9 | 6/22 | Customize 页、Marketplace leaderboard、Plugin canvases |
| 3.8 | 6/18 | Automations `/automate`、cron、GitHub 触发器、computer use |
| 3.7 | 6/17 | Cloud Agent setup、`/in-cloud`、`/babysit` |
| 3.7 | 6/10 | Bugbot Composer 2.5、`/review` |
| 3.7 | 6/05 | Design Mode 多选 + 语音 |

## 今日研究员结论

Cursor 6/25 为 **消化期**：3.9 Customize 页仍是本周主线，无新 Changelog。与今日 **Codex Remote GA** 对照，Cursor 的差异化在 **IDE 内 Cloud Agent + Automations 生态**（本任务即 cron 实例）。建议团队继续消化 3.9 Customize 页统一 MCP/插件管理；关注 Cursor 是否跟进「移动端遥控」或「Slack 频道级 Agent 身份」以回应 Claude Tag 与 Codex Remote 竞争。
