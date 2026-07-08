# Cursor 每日技术文档 — 2026-07-08

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)、[Automations](https://cursor.com/docs/agent/automations)

## 今日综述

2026 年 7 月 8 日 Cursor 官方 Changelog **连续第 8 日无新条目**——最新仍为 **3.10（2026-06-30）Team MCPs in team marketplaces**。本 DayAI Automation cron 第 8 日连续触发（schedule `0 22 * * *` UTC），验证 Automations 基础设施稳定运行。以下详述 6/30 后仍在生效的核心能力及操作 SOP。

---

## 特性一：Team MCPs in Team Marketplaces（3.10，6/30）

### 是什么（机制说明）

Cursor 3.10 扩展 team marketplaces 支持 **Team MCPs** 与 **organization groups**。管理员可在 Dashboard → Integrations & MCP 一次性配置 Team MCP 服务器，分发至 cloud agents、agents window、IDE 和 CLI。团队成员可从 team marketplace 一键安装已批准集成，无需自行配置 MCP 服务器。

### 适用场景

- **适合**：企业团队统一 MCP 策略、cloud agent 与本地 IDE 共享工具集
- **不适合**：个人免费用户（需 Team/Enterprise 计划）

### 前置条件

- Cursor Team 或 Enterprise 计划
- 管理员权限（Dashboard 访问）
- MCP 服务器端点可访问

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. 导航至 **Integrations & MCP**
3. 配置 Team MCP 服务器（URL、认证方式）
4. 进入 **Plugins → Team Marketplaces**
5. 将 MCP 发布到 marketplace；可选限制至特定 organization groups
6. 团队成员在 IDE → Customize 页面从 marketplace 安装

### 命令与配置示例

```json
// .cursor/mcp.json 团队下发示例（成员安装后生成）
{
  "mcpServers": {
    "team-jira": {
      "command": "npx",
      "args": ["-y", "@company/jira-mcp"],
      "env": {
        "JIRA_TOKEN": "${JIRA_TOKEN}"
      }
    }
  }
}
```

```json
// .cursor/permissions.json 片段
{
  "mcp": {
    "team-jira": {
      "allowedTools": ["search_issues", "create_ticket"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.10 内容 | ✅ 官方页面确认 6/30 发布 |
| Team MCP 配置 | ⚠️ 未实测（Cloud Agent 无 Dashboard 访问） |
| IDE marketplace 安装 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**成员看不到 marketplace**：确认管理员已发布且 organization group 包含该成员。**MCP 启动失败**：检查 `codex doctor` 式诊断——确认 token 和 endpoint。**cloud agent 与 IDE MCP 不一致**：确保 Team MCP 配置勾选所有目标环境。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.10 | ✅ |
| Cursor Docs MCP 迁移指南 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 优先配置 Team MCP 再开放 marketplace |
| 开发者 | 从 marketplace 安装而非手动配置 |
| 安全团队 | 用 organization groups 限制 MCP 访问范围 |

---

## 特性二：Cursor Automations 与 Cron 触发（3.8+，本任务实例）

### 是什么（机制说明）

Cursor Automations 是 always-on agent 系统，支持 cron、GitHub、Slack 等触发器。本 DayAI 任务即 Automations cron 实例：`0 22 * * *`（UTC 每日 22:01）触发，agent 在 cloud VM 中执行资讯检索、文档生成、git push。3.8 引入 `/automate` skill、computer use 工具、GitHub 五类新触发器。

### 适用场景

- **适合**：每日重复任务（资讯汇总、CI 巡检、依赖更新检查）
- **不适合**：需要实时人工交互的创意工作

### 前置条件

- Cursor 付费计划（Pro+）
- GitHub 仓库连接（本任务：czh55/DayAI）
- Automation 配置 Instructions + 触发器

### 详细使用步骤（业务用户）

1. Cursor → Automations → Create New
2. 选择触发器类型（Cron / GitHub / Slack / Webhook）
3. 配置 schedule（如 `0 9 * * *` 北京时间约 17:00 UTC）
4. 编写 Instructions（任务描述、输出格式、禁止事项）
5. 启用 computer use（如需 GUI 演示）和 open_git_pr
6. 保存并等待首次触发

### 命令与配置示例

```yaml
# Automation 触发配置示例（概念性）
trigger:
  type: cron
  schedule: "0 22 * * *"  # UTC
instructions: |
  你是 DayAI 每日资讯研究员...
  生成 summaries/YYYY-MM-DD/ 下 7 个文件
  运行 node tools/build-index.js
  push 到 main
tools:
  - computer_use
  - open_git_pr
```

```bash
# 本地验证 build-index（Automation 产出的一部分）
cd /workspace
node tools/build-index.js
node tools/build-index.js --check
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 Automation 触发 | ✅ 2026-07-08T22:01:04Z 成功触发 |
| cron 连续运行 | ✅ 第 8 日连续（7/1–7/8） |
| cloud agent git push | ✅ 历史运行已验证 |

### 问题与解决方案

**Automation 未完成**：检查 Instructions 是否含完整自检清单。**build-index 跳过当日**：确认 README.md 含 6 个板块名表格。**push 失败**：`git pull --rebase origin main` 后重试。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.8 Automations | ✅ |
| 本任务实际运行 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 内容运营 | cron + Instructions 模板化日更 |
| 工程团队 | GitHub trigger 做 PR review 自动修复 |
| 成本敏感者 | 控制 cron 频率和 agent 运行时长 |

---

## 特性三：Cloud Agents 与 `/in-cloud` 子 Agent（3.7+）

### 是什么（机制说明）

Cloud agents 在隔离 VM 中运行完整开发环境。3.7 引入 cloud environment setup（<10 分钟）、`/in-cloud` 子 agent（独立 VM + branch）、`/babysit` PR 看护、local↔cloud handoff。3.9 扩展至 iOS 移动端 Remote Control。

### 适用场景

- **适合**：长时 CI 修复、并行探索、笔记本关闭后继续运行
- **不适合**：需要本地 GPU/特殊硬件的任务

### 前置条件

- Cursor Pro+ 或 Team 计划
- `.cursor/environment.json` 配置（可选，加速后续启动）
- GitHub 仓库连接

### 详细使用步骤（业务用户）

1. Agents Window → 选择 repo
2. 描述任务，选择 **Cloud** 运行环境
3. 首次运行：agent 自动 setup 环境并生成 snapshot
4. 长任务中用 `/in-cloud` 派发子 agent 到独立 VM
5. PR 阶段用 `/babysit` 让 cloud agent 迭代至可合并
6. 需要本地测试时 handoff 回 local

### 命令与配置示例

```json
// .cursor/environment.json 示例
{
  "snapshot": "dayai-daily-summary",
  "install": "cd tools && npm install",
  "start": "node tools/build-index.js"
}
```

```bash
# Agents Window 斜杠命令
/in-cloud Fix CI lint errors in parallel
/babysit Prepare PR #42 for merge
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本任务 cloud agent 环境 | ✅ 运行在 cloud VM |
| `/in-cloud` | ⚠️ 未实测（本任务未使用子 agent） |
| iOS Remote Control | ⚠️ 未实测（无移动设备） |

### 问题与解决方案

**环境 setup 超时**：检查 `environment.json` install 脚本。**子 agent 分支冲突**：每个 `/in-cloud` 使用独立 branch。**handoff 丢上下文**：确保 session 完整迁移而非新建。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7 cloud setup | ✅ |
| Changelog 3.9 iOS | ✅ |
| 虎嗅 75% 企业用 cloud agent | ✅ 趋势一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | 用 cloud agent 跑长时测试 |
| 团队 Tech Lead | 提交 environment.json 统一团队环境 |
| 移动场景 | iOS app + Remote Control |

---

## 特性四：Composer 与 Bugbot（持续有效）

### 是什么（机制说明）

Cursor 核心 AI 模型 **Composer** 持续迭代（公开信息指向 Composer 2.5，基于 Kimi 基模 + Cursor RL 训练管线）。**Bugbot** 自动审查 PR 中的潜在 bug；`/review` 命令在 agent 会话中触发代码审查。Changelog 3.10 前无 Composer 版本更新公告。

### 适用场景

- **适合**：日常编码补全、多文件编辑、PR 自动审查
- **不适合**：需要特定闭源模型（如 Fable 5）的高难推理——需切换模型

### 前置条件

- Cursor IDE 或 Copilot app
- GitHub 集成（Bugbot）
- 付费计划（部分功能）


### 详细使用步骤（业务用户）

1. IDE 中正常编码，Composer 自动补全
2. Agent 模式：描述任务，Composer 执行多文件编辑
3. PR 创建后 Bugbot 自动审查（若已启用）
4. Agent 会话中输入 `/review` 触发即时审查

### 命令与配置示例

```bash
# Agent 会话中
/review

# 模型选择（Settings → Models）
# Composer 2.5 / 其他 frontier models
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer 版本 | ⚠️ 未实测（无 GUI） |
| Bugbot | ⚠️ 未实测 |
| `/review` | ⚠️ 未实测 |

### 问题与解决方案

**Composer 输出质量下降**：尝试切换模型或增加 rules。**Bugbot 误报**：在 PR 中标注 false positive。**审查遗漏**：配合 CI 测试而非仅依赖 AI review。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 量子位 Composer 2.5 分析 | ✅ |
| Changelog 无新 Composer 公告 | ✅ 8 日空窗 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | Composer 默认即可 |
| 质量守门人 | Bugbot + `/review` 双保险 |
| 模型极客 | 关注 Changelog 是否发布新 Composer |

---

## 特性五：SDK Custom Tools 与 `.cursor/permissions.json`（持续有效）

### 是什么（机制说明）

Cursor SDK 支持 custom tools 扩展 agent 能力。`.cursor/permissions.json` 控制 agent 可使用的工具、MCP、文件访问范围。Team 计划可通过 Dashboard 下发策略。Changelog 3.10 将 Team MCP 与 permissions 体系进一步整合。

### 适用场景

- **适合**：企业定制 agent 工具链、限制 agent 文件/system 访问
- **不适合**：无定制需求的标准用户

### 前置条件

- Cursor SDK 文档访问
- 项目根目录 `.cursor/` 配置权限

### 详细使用步骤（业务用户）

1. 项目根创建 `.cursor/permissions.json`
2. 定义允许/禁止的工具、路径、命令
3. SDK 集成：按 [Cursor Docs](https://cursor.com/docs) 注册 custom tool
4. Team 管理员在 Dashboard 下发全局策略

### 命令与配置示例

```json
// .cursor/permissions.json 完整示例
{
  "allow": [
    "read",
    "write",
    "shell(npm test)",
    "shell(node tools/*)"
  ],
  "deny": [
    "shell(rm -rf *)",
    "write(.env)",
    "write(**/secrets/**)"
  ],
  "mcp": {
    "*": {
      "allowedTools": ["*"]
    }
  }
}
```

```typescript
// SDK custom tool 概念示例
import { tool } from "@cursor/sdk";

export const deployTool = tool({
  name: "deploy",
  description: "Deploy to staging",
  parameters: { branch: { type: "string" } },
  execute: async ({ branch }) => {
    // deployment logic
    return { status: "deployed", branch };
  }
});
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| permissions.json 格式 | ✅ 文档确认 |
| SDK custom tools | ⚠️ 未实测 |
| Team 策略下发 | ⚠️ 未实测 |

### 问题与解决方案

**agent 被拒绝执行命令**：检查 permissions.json deny 规则。**MCP tool 不可见**：确认 marketplace 安装且 permissions 允许。**SDK tool 未注册**：检查 export 和 agent 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs permissions | ✅ |
| Changelog 3.10 Team MCP 整合 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业安全 | 严格 permissions.json + Team 策略 |
| 开源维护者 | 提供项目级 permissions 模板 |
| SDK 开发者 | custom tools 扩展 domain 能力 |

---

## 版本对照表

| 版本 | 发布日期 | 关键变更 |
|------|----------|----------|
| **3.10** | 2026-06-30 | Team MCPs、organization groups |
| 3.9 | 2026-06-29 | iOS app、Remote Control、cloud agents mobile |
| 3.9 | 2026-06-22 | Customize page、marketplace leaderboard |
| 3.8 | 2026-06-18 | Automations、`/automate`、computer use |
| 3.7 | 2026-06-17 | Cloud environment setup、`/in-cloud` |

## 今日研究员结论

Cursor 进入 6/30 后第 8 日 Changelog 空窗，但 Automations + Cloud Agent 基础设施持续稳定（本任务为实证）。Team MCP 是企业落地的关键能力，建议国内团队关注工信部 Claude Code 定调后 Cursor 作为替代方案的合规评估。下一步关注 Cursor 是否发布对标 Codex 0.143.0 远程插件/系统代理能力。
