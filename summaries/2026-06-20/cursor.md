# Cursor 每日技术文档 — 2026-06-20

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Automations Docs](https://cursor.com/docs/cloud-agent/automations)

## 今日综述

**2026 年 6 月 20 日 Cursor 无新 Changelog 条目**；最新仍为 **6/18 发布的 3.8**：Automations 引入 `/automate` skill、Slack emoji 触发、5 项 GitHub 新 trigger、默认 **Computer Use**，以及可存草稿/默认开 PR/删 memory。**6/17 的 3.7** 云环境快照与 `/in-cloud` 子 Agent 仍在消化期。本环境 ⚠️ 无法 GUI 实测；以下基于官方 Changelog + Docs + secondary 汇总。

---

## 特性一：`/automate` skill 与 Automations 入口（2026-06-18）

### 是什么（机制说明）

**Cursor Automations** 是 always-on 云 Agent，按 **cron** 或 **GitHub/Slack/Webhook/Linear** 等事件触发。6/18 起可在本地 Agent 会话使用 **`/automate` skill**：自然语言描述工作流，Cursor 自动配置 trigger、instructions 与 tools。

入口：Agents Window、[cursor.com/automations](https://cursor.com/automations)、Marketplace 模板、本地 `/automate`。

### 适用场景

- **适合**：每日 cron 任务、PR review 自动修复、Slack triage、failed Actions 调查
- **不适合**：毫秒级在线服务；严格数据不出境（云 Agent 在 Cursor 云端）

### 前置条件

- Cursor 3.8+（Changelog 建议 update to latest）
- Cursor 账号与 Cloud Agent 额度
- Automations **始终以 Max Mode 计费**

### 详细使用步骤（业务用户）

1. Cursor → **Agents Window** 或输入 `/automate`
2. 描述任务：「每天 UTC 22:00 生成资讯并 push」
3. 选 **trigger**：Scheduled cron `0 22 * * *`
4. 写 **instructions**（等同 cloud agent prompt）
5. 选 **tools**：Slack、PR、MCP、Computer Use
6. 选 **repository** 与 **Permissions**（Private / Team Visible / Team Owned）
7. Save & Activate

### 命令与配置示例

**本地 `/automate`**

```
/automate
每天北京时间 9 点检索 AI 编程资讯，写入 summaries/ 并 push 到 main
```

**cron**

```
0 1 * * *    # UTC 01:00 = 北京 09:00
```

**instructions 片段**

```markdown
触发时：
1. 检索 Claude/Cursor/Codex 官方 changelog
2. 在 summaries/YYYY-MM-DD/ 写 7 个 md
3. node tools/build-index.js
4. commit & push origin main
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GUI `/automate` | ⚠️ 未实测（无 GUI） |
| Changelog 6/18 | ✅ 官方确认 |
| 本 DayAI Automation | ✅ cron 触发实例运行中 |

### 问题与解决方案

**错误 1：Automation 未触发**

排查：确认 Activate；cron 不早于设定；检查 repo 权限。

**错误 2：意外 Max Mode 费用**

排查：Automations 强制 Max Mode；Team Owned 计入团队池。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog 6/18](https://cursor.com/changelog) | ✅ |
| DayAI 本仓库 Automation | ✅ 实测可行 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | Marketplace「fix PR review comments」模板起步 |
| 团队 Lead | Team Owned + PR 质量门槛 |
| 本仓库 | cron Automation 已验证可行 |

---

## 特性二：GitHub 五项新 Trigger（2026-06-18）

### 是什么（机制说明）

Automations 新增 5 个 GitHub 事件触发器：

- **Issue comment**：非 PR issue 上的评论
- **PR review comment**：PR diff 内联评论
- **PR review submitted**：PR review 提交
- **Review thread updated**：review thread 标记 resolved/unresolved
- **Workflow run completed**：PR/branch 上 Actions 运行完成

Marketplace 新增「triage failed GitHub actions」「auto-fix PR review comments」模板。

### 适用场景

- **适合**：CI 红灯自动分诊、PR review 自动回复、issue triage
- **不适合**：需人工审批的合规敏感 PR

### 前置条件

- Cursor 3.8+
- GitHub App 授权 Cursor 访问目标 repo

### 详细使用步骤（业务用户）

1. cursor.com/automations → New Automation
2. Trigger 选 **GitHub** → 选择上述 5 项之一
3. 配置 repo 范围与 branch 过滤
4. instructions 写明修复策略与 PR 策略
5. 启用 **Open PR by default**（3.8 默认行为）

### 命令与配置示例

**Workflow run completed 触发 instructions**

```markdown
当 GitHub Actions 在 PR 上失败时：
1. 读取 failed workflow logs
2. 定位 root cause
3. 若可自动修复，commit 到 PR branch
4. 在 PR 留言说明修复内容
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog | ✅ 5 项 trigger 确认 |
| 实测触发 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：trigger 未捕获 event**

排查：确认 GitHub App 权限含 checks/actions；repo 在 Automation 配置范围内。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/18 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 维护者 | 从 workflow_run_completed 起步 |
| 开源项目 | PR review comment 自动修复需谨慎授权 |

---

## 特性三：Computer Use 默认开启（2026-06-18）

### 是什么（机制说明）

Cloud Agent 被 Automation 触发后，默认启用 **Computer Use** 工具——Agent 可操作独立计算机产出 demo、截图、artifact。instructions 中写明「include a demo of your work」即可引导使用。

### 适用场景

- **适合**：需要可视化 demo 的 Automation（UI 变更、文档截图）
- **不适合**：纯后端/API 变更；高安全合规环境

### 前置条件

- Cursor 3.8+ Automation
- Cloud Agent 额度

### 详细使用步骤（业务用户）

1. 创建 Automation 时 Computer Use 默认 enabled
2. instructions 添加：「Produce a demo screenshot or recording of the result」
3. 审阅 Agent 产出的 artifact
4. 若不需 Computer Use，在 tools 中显式禁用

### 命令与配置示例

**instructions**

```markdown
After completing the code changes, use Computer Use to:
1. Start the dev server
2. Open the changed page in browser
3. Capture a screenshot and attach to PR description
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 默认开启 | ✅ |
| 实测 Computer Use | ⚠️ 未实测（Cloud Agent 环境限制） |

### 问题与解决方案

**错误 1：Agent 误操作生产环境**

排查：限制 Automation 到 staging branch；`.cursor/permissions.json` 限制破坏性操作。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 产品团队 | demo artifact 提升 PR 可审阅性 |
| 安全团队 | 默认禁用或严格 permissions |

---

## 特性四：Cloud Subagents `/in-cloud` 与 `/babysit`（2026-06-17，3.7）

### 是什么（机制说明）

Cursor 3.7 引入云子 Agent：

- **`/in-cloud`**：在独立 VM/branch 启动云 subagent，本地工作区保持干净
- **`/babysit`**：云 Agent 远程迭代 PR 直至可合并
- **环境快照**：`.cursor/environment.json` 捕获可复用 dev 环境，未来 cloud agent 启动更快

### 适用场景

- **适合**：长时 CI 修复、并行探索、PR babysitting
- **不适合**：需本地硬件/内网资源的任务

### 前置条件

- Cursor 3.7+
- Cloud 环境已 setup（<10 分钟 guided setup）

### 详细使用步骤（业务用户）

1. Agents Window → Cloud environment setup（首次）
2. 提交任务时使用 `/in-cloud fix the failing CI on this PR`
3. 或点击 PR quick-action pill → `/babysit`
4. 本地继续其他工作；云 subagent 后台运行
5. 完成后 handoff 回本地测试

### 命令与配置示例

```
/in-cloud investigate why integration tests fail on branch feature/auth
/babysit
```

```json
// .cursor/environment.json（示例结构，以官方 docs 为准）
{
  "snapshot": "team-node-20-postgres-15"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.7 | ✅ |
| `/in-cloud` 实测 | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：云环境 setup 超时**

排查：检查依赖安装脚本；commit `environment.json` 供团队复用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | CI 修复优先 `/in-cloud` |
| 团队 | 共享 environment.json 快照 |

---

## 特性五：SDK Custom Tools 与 `.cursor/permissions.json` auto-review（2026-06-04）

### 是什么（机制说明）

TypeScript/Python SDK 6/4 更新：

- **`local.customTools`**：函数定义即可暴露为 MCP 工具（`custom-user-tools`）
- **`local.autoReview`**：headless 运行时通过分类器决定自动执行 vs 暂停
- **`autoRun.allow_instructions` / `block_instructions`**：自然语言权限策略
- **JSONL store**：替代 SQLite 的 append-only 元数据持久化
- **Nested subagents**：任意深度嵌套

### 适用场景

- **适合**：CI 脚本、生产 Agent 集成、自定义业务能力暴露
- **不适合**：仅需 IDE 内补全的简单场景

### 前置条件

- `@cursor/sdk` 或 `cursor-sdk` 最新版
- `.cursor/permissions.json` 配置

### 详细使用步骤（业务用户）

1. `npm install @cursor/sdk`
2. 创建 Agent 并传入 customTools
3. 配置 permissions.json auto-review 策略
4. headless `send()` 运行

### 命令与配置示例

```typescript
import { Agent } from '@cursor/sdk';

const agent = await Agent.create({
  local: {
    customTools: [myDeployTool],
    autoReview: true,
  },
});
```

```json
{
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections of build artifacts under ./dist are fine."
    ],
    "block_instructions": [
      "Always pause delete operations so I get a chance to review them."
    ]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/4 | ✅ |
| SDK 实测 | ⚠️ 未实测（本任务未安装 @cursor/sdk） |

### 问题与解决方案

**错误 1：custom tool 不可见**

排查：确认工具传给 `Agent.create()` 或 per-`send()`；subagent 自动继承父级 custom tools。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog Jun 4 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 平台工程师 | customTools + autoReview 是生产必备 |
| 个人 IDE 用户 | 可忽略 SDK，用 GUI Agent |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 3.8 | 2026-06-18 | Automations `/automate`、5 GitHub triggers、Computer Use 默认 |
| 3.7 | 2026-06-17 | Cloud env setup、`/in-cloud`、`/babysit` |
| 3.7 | 2026-06-10 | Bugbot ~90s、`/review` 推送前审查 |
| 3.7 | 2026-06-05 | Design Mode 多选+语音 |
| SDK | 2026-06-04 | customTools、autoReview、JSONL store |

## 今日研究员结论

Cursor 6/20 无新版本，**3.8 Automations 进入消化期**。对本仓库而言，cron Automation 已是最佳实践验证路径。企业用户应关注 Computer Use 默认开启的安全 implications，并尽早配置 `.cursor/permissions.json`。Compile 大会披露的 1.5T 自研模型与 Origin Git 平台（InfoQ 6/17 secondary）预示 Cursor 长期从 IDE 向「通用 AI + 智能体 Git」演进，但 6/20 无新官方 Changelog 佐证。

---
