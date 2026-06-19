# Cursor 每日技术文档 — 2026-06-19

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Automations Docs](https://cursor.com/docs/cloud-agent/automations)

## 今日综述

**2026 年 6 月 19 日 Cursor 无新 Changelog 条目**；最新仍为 **6/18 发布的 3.8**：Automations 引入 `/automate` skill、Slack emoji 触发、5 项 GitHub 新 trigger、默认 **Computer Use**，以及可存草稿/默认开 PR/删 memory。**6/17 的 3.7** 云环境快照与 `/in-cloud` 子 Agent 仍在消化期。本环境 ⚠️ 无法 GUI 实测；以下基于官方 Changelog + Docs + secondary 汇总（Releasebot 6/19）。

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
| [Releasebot 6/19](https://releasebot.io/updates/cursor) | ✅ 二次汇总 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | Marketplace「fix PR review comments」模板起步 |
| 团队 Lead | Team Owned + PR 质量门槛 |
| 本仓库 | cron Automation 已验证可行 |

---

## 特性二：GitHub 五项新 Trigger（2026-06-18）

### 是什么（机制说明）

新增 GitHub 事件：

- **Issue comment**（非 PR issue）
- **PR review comment**（diff 行内）
- **PR review submitted**
- **Review thread updated**（resolve/unresolve）
- **Workflow run completed**

Marketplace 模板：**failed Actions triage**、**auto-fix PR review comments**。

### 适用场景

- **适合**：CI 红灯调查、review comment 自动修复
- **不适合**：fork PR（除 merged 外多数 trigger 失败）

### 前置条件

- Cursor 3.8+
- GitHub App 已授权目标仓库

### 详细使用步骤（业务用户）

1. Automations → New → GitHub trigger
2. 选事件如 **Workflow run completed**
3. 限定 branch/PR 范围（可选）
4. instructions 写明：读 logs、定位失败、开 fix PR
5. 启用 **Open PR by default**（6/18 新默认）
6. Activate 并 push 测试 commit 触发

### 命令与配置示例

**instructions — CI triage**

```markdown
当 GitHub Actions workflow run failed：
1. 读取 run logs
2. 定位 root cause
3. 若能安全修复，开 PR 并 @ 相关作者
4. 否则在 PR/issue 留言说明
```

**permissions.json（本地 Agent 参考）**

```json
{
  "autoRun": {
    "allow_instructions": "Read CI logs and run tests",
    "block_instructions": "Delete branches or force push"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GitHub trigger | ⚠️ 未实测（无 GUI） |
| Docs | ✅ 五项事件列出 |

### 问题与解决方案

**错误 1：fork PR 不触发**

排查：官方限制；仅 merged 等少数事件可用。

**错误 2：Automation 开 PR 过多**

排查：instructions 加「仅当 CI 失败且可自动修复」；人工 review 门槛。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |
| JoinNextDev 6/18 博客 | 解读为 DevOps Agent 平台化 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 维护者 | Workflow run completed + triage 模板 |
| 开源项目 | 限制 auto-fix 仅 maintainer 分支 |

---

## 特性三：Slack Emoji 触发（2026-06-18）

### 是什么（机制说明）

对 Slack 消息 **react 指定 emoji** 即可启动 Automation。Cursor 内部用此从 Slack 触发特定工作流。

### 适用场景

- **适合**：on-call 告警 triage、人工审批后启动 Agent
- **不适合**：高频自动化（emoji 易误触）

### 前置条件

- Cursor 3.8+
- Slack workspace 集成已授权

### 详细使用步骤（业务用户）

1. Automations → New → Slack trigger
2. 配置 workspace/channel
3. 指定 emoji（如 🚀）
4. 写 instructions：读到消息后执行何操作
5. 在 Slack 对目标消息 react 测试

### 命令与配置示例

**trigger 配置概念**

```
Channel: #eng-alerts
Emoji: :robot_face:
Action: 启动 Cloud Agent 调查告警并回复 thread
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Slack emoji | ⚠️ 未实测 |

### 问题与解决方案

**错误 1：react 无响应**

排查：Slack App 权限；Automation 是否 Activate；channel 是否在范围。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| On-call | emoji 作「人工批准」闸门，非全自动 |

---

## 特性四：Computer Use 默认开启（2026-06-18）

### 是什么（机制说明）

Automation 触发的 **Cloud Agent 默认启用 Computer Use**，可在独立计算机上操作以产出 **demo/artifact**。instructions 中说明「include a demo」即可。

### 适用场景

- **适合**：UI 变更录屏、自动化报告附图、可复现 demo
- **不适合**：无审核的高权限生产环境

### 前置条件

- Cursor 3.8+
- Cloud Agent 额度

### 详细使用步骤（业务用户）

1. 创建 Automation 时 Computer Use **默认 on**
2. instructions 末尾加：「Include a demo or screenshot of your work」
3. 运行后检查 artifact 链接/附件
4. 若不需：在 tools 配置中关闭 Computer Use

### 命令与配置示例

```markdown
完成修复后，使用 computer 打开本地预览并截图附在 PR 描述中。
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Computer Use | ⚠️ 未实测（本环境即 Cloud Agent） |

### 问题与解决方案

**错误 1：无 demo 产出**

排查：instructions 是否明确要求；额度是否耗尽。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |
| Cursor blog Automations | ✅ 与 Bugbot 审查流水线叙事一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 安全 | 限制 Computer Use 到非生产 repo |
| 产品 | demo artifact 提升 Automation 可解释性 |

---

## 特性五：云环境快照与 `/in-cloud`（2026-06-17，持续有效）

### 是什么（机制说明）

**3.7** 引入：Cursor 帮你在云端 <10 分钟搭 dev 环境，进度可在共享 terminal 观看；环境写入 **`.cursor/environment.json` 快照** 供后续 Agent 复用。**`/in-cloud`** 在独立 VM 跑子 Agent；**`/babysit`** 远程迭代 PR。

### 适用场景

- **适合**：长时 CI 修复、并行探索、PR babysit
- **不适合**：强本地硬件依赖（GPU 调试等）

### 前置条件

- Cursor 3.7+
- 仓库可提交 `.cursor/environment.json`

### 详细使用步骤（业务用户）

1. Agents Window → 设置 Cloud Environment
2. 观看 Agent 安装依赖并保存快照
3. commit `.cursor/environment.json` 给团队复用
4. 本地会话输入 `/in-cloud fix flaky tests`
5. PR 页用 `/babysit` 让云 Agent 迭代

### 命令与配置示例

**`.cursor/environment.json` 概念**

```json
{
  "snapshot": "team-node-20-snapshot-id",
  "install": "npm ci && npm test"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/in-cloud` | ⚠️ 未实测 GUI；本任务在 Cloud Agent 环境运行 |
| environment.json | 本仓库若存在则团队可复用 |

### 问题与解决方案

**错误 1：快照过期**

排查：重新跑 environment setup；更新 snapshot id。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 | 共享 environment.json 降冷启动 |
| 个人 | `/in-cloud` 隔离长任务 |

---

## 版本对照表

| 版本/日期 | 要点 |
|-----------|------|
| 3.8 / 2026-06-18 | `/automate`、GitHub×5、Slack emoji、Computer Use |
| 3.7 / 2026-06-17 | 云环境快照、`/in-cloud`、`/babysit` |
| 3.7 / 2026-06-10 | Bugbot ~90s、`/review` |

## 今日研究员结论

6/19 **无新版本**，但 6/18 **Automations 3.8** 足以改变工作流——Cursor 正从 IDE 扩展为 **事件驱动研发自动化平台**。建议团队本周完成：① 选 1 个 GitHub trigger 试点；② 评估 Computer Use 权限边界；③ 将 `.cursor/environment.json` 纳入仓库标准。本 DayAI cron Automation 即为最佳实践样例。
