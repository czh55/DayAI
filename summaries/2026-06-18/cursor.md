# Cursor 每日技术文档 — 2026-06-18

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Automations Docs](https://cursor.com/docs/cloud-agent/automations)

## 今日综述

**2026 年 6 月 18 日 Cursor 发布 Automations 重大更新**：`/automate` skill、Slack emoji 触发、5 项 GitHub 新 trigger、默认 **Computer Use**、自动化可存草稿/默认开 PR/可删 memory。**6 月 17 日** 配套发布云环境快照（`.cursor/environment.json`）、**`/in-cloud`** 子 Agent 与本地↔云 handoff。本环境 ⚠️ 无法 GUI 实测，以下基于官方 Changelog + Docs。

---

## 特性一：`/automate` skill 与 Automations 入口（2026-06-18）

### 是什么（机制说明）

**Cursor Automations** 是在后台运行的 always-on 云 Agent，可按 **cron** 或 **GitHub/Slack/Webhook/Linear** 等事件触发。6/18 起可在 **本地 Agent 会话** 用 **`/automate` skill**：用自然语言描述工作流，Cursor 自动配置 trigger、instructions 与 tools。

创建入口：Agents Window、[cursor.com/automations](https://cursor.com/automations)、Marketplace 模板、或本地 `/automate`。

### 适用场景

- **适合**：每日资讯 cron、PR review 自动修复、Slack triage、failed Actions 调查
- **不适合**：需毫秒级响应的在线服务；严格数据不出境场景（云 Agent 在 Cursor 云端）

### 前置条件

- Cursor 最新版（Changelog 建议 update to latest）
- Cursor 账号与 Cloud Agent 额度
- Automations **始终以 Max Mode 计费**（无关闭选项）

### 详细使用步骤（业务用户）

1. 打开 Cursor → **Agents Window** 或本地 Agent 输入 `/automate`
2. 用自然语言描述：「每天 UTC 22:00 生成资讯并 push 到 main」
3. 选择 **trigger**（如 Scheduled cron `0 22 * * *`）
4. 编写 **instructions**（等同 cloud agent prompt）
5. 选择 **tools**：Send to Slack、Comment on PR、MCP、Computer Use 等
6. 选择 **repository**：无仓库 / 单仓库 / multi-repo environment
7. 设置 **Permissions**：Private / Team Visible / Team Owned
8. Save & Activate

### 命令与配置示例

**本地 `/automate` 自然语言**

```
/automate
每天北京时间 9 点检索 AI 编程资讯，写入 summaries/ 并开 PR
```

**cron trigger 预设或自定义**

```
0 1 * * *    # UTC 01:00 = 北京 09:00
```

**instructions 片段（本仓库 DayAI 风格）**

```markdown
你是 DayAI 研究员。触发时：
1. 检索 Claude/Cursor/Codex 官方 changelog
2. 在 summaries/YYYY-MM-DD/ 写 7 个 md
3. node tools/build-index.js
4. commit & push
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor GUI `/automate` | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 6/18 | ✅ 官方确认 |
| 本任务即 Automation 实例 | ✅ cron 触发运行中 |

### 问题与解决方案

**错误 1：Automation 未触发**

排查：确认已 Activate；cron 可能延迟但不早于设定时间；检查 repo 权限。

**错误 2：Unexpected Max Mode 费用**

排查：Automations 强制 Max Mode；Team Owned 计入团队池，Private 计入创建者。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog 6/18](https://cursor.com/changelog) | 一致 |
| [Automations Docs](https://cursor.com/docs/cloud-agent/automations) | 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 从 Marketplace「fix PR review comments」模板起步 |
| 团队 Lead | Team Owned + 明确 PR 质量门槛防 spam |
| 本仓库维护者 | cron + GitHub push 路径已验证可行 |

---

## 特性二：GitHub 五项新 Trigger（2026-06-18）

### 是什么（机制说明）

Automations 新增 GitHub 事件：

- **Issue comment**（非 PR issue 上的评论）
- **PR review comment**（PR diff 行内评论）
- **PR review submitted**（提交 review）
- **Review thread updated**（thread resolve/unresolve）
- **Workflow run completed**（Actions 运行结束）

Marketplace 新增 **failed Actions triage** 与 **auto-fix PR review comments** 模板。

### 适用场景

- **适合**：CI 红灯自动调查、review comment 自动修复、issue triage
- **不适合**：fork PR（官方：fork PR 触发失败，除 merged 事件）

### 前置条件

- GitHub 仓库连接 Cursor
- Automation 绑定目标 repo（GitHub trigger **必须**指定 repo）

### 详细使用步骤（业务用户）

1. cursor.com/automations → New
2. Trigger → **GitHub** → 选择事件类型（如 Workflow run completed）
3. 连接仓库 `owner/repo`
4. Instructions：「调查失败 job 日志，若能修复则开 PR」
5. 启用 **Pull request creation**（6/18 起默认开启）
6. Save

### 命令与配置示例

**instructions — Actions 失败**

```markdown
当 workflow run failed：
1. 读取 logs 定位根因
2. 若能安全修复，修改代码并开 PR
3. 否则在 PR/issue comment 说明阻塞点
```

**permissions.json（若本地 Agent 联动）**

```json
{
  "autoRun": {
    "allow_instructions": ["read CI logs", "run tests"],
    "block_instructions": ["delete production", "force push"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GitHub trigger | ⚠️ 未实测 |
| Docs trigger 列表 | ✅ 与 Changelog 一致 |

### 问题与解决方案

**错误 1：`Fork pull requests not supported`**

排查：官方限制；将分支 push 到 upstream repo 再开 PR。

**错误 2：Automation 开了 unwanted PR**

排查：instructions 加决策规则「仅当测试通过才开 PR」；可手动关默认 PR tool。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog + Docs | 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开源维护者 | workflow completed + failed Actions 模板 |
| 审查严格团队 | review comment 自动化需人工 approve 门槛 |

---

## 特性三：Slack Emoji 触发与 Computer Use（2026-06-18）

### 是什么（机制说明）

- **Emoji reaction trigger**：对 Slack 消息加指定 emoji 即触发 Automation（Cursor 内部工作流用法）
- **Computer Use**：每条 Automation 的 cloud agent **默认启用**，可操作浏览器、截图、录屏产出 demo

需在 instructions 中要求 agent「包含工作 demo」以有效利用 Computer Use。

### 适用场景

- **适合**：Slack 一键 triage、UI 变更录屏验证、demo 自动化
- **不适合**：无头 CI-only 环境；未配置 dev environment 的 automation

### 前置条件

- Cursor Slack 集成
- 云 dev environment 已配置（Computer Use 有效前提）
- 仅 **public Slack channels** 对 trigger 可见（Docs 当前限制）

### 详细使用步骤（业务用户）

1. 连接 Slack integration
2. New Automation → Trigger → **Emoji reaction** → 选 emoji（如 🚀）
3. Tools → 确认 **Computer use** 已启用（默认 on）
4. Instructions：「修复后录 30s 屏幕演示关键路径」
5. 在频道对消息 react 触发

### 命令与配置示例

**instructions 含 demo 要求**

```markdown
完成修改后：
1. 启动 dev server
2. 用 computer use 录制修复前后对比
3. 将录屏链接附在 PR 描述
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Slack emoji | ⚠️ 未实测 |
| Computer use | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：Computer use 无输出**

排查：检查 environment.json 是否配置；instructions 是否明确要求 demo。

**错误 2：看不到 private channel**

排查：Docs 称仅 public channel；改用 webhook trigger。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/18 | 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 产品团队 | emoji triage + demo 录屏降沟通成本 |
| 后端团队 | 可关闭 computer use 省额度 |

---

## 特性四：云环境快照与 `/in-cloud`（2026-06-17）

### 是什么（机制说明）

**Cloud environment setup**：Agent 在共享终端中安装依赖，生成可复用 **snapshot**，写入 **`.cursor/environment.json`** 供团队复用；未来 cloud agent 冷启动更快并可跑软件验证。

**`/in-cloud`**：在独立 VM 启动 **cloud subagent** 处理下一任务，不污染本地 workspace。**`/babysit`**：远程迭代 PR 至可合并。

### 适用场景

- **适合**：长时 CI 修复、并行探索、本地机器性能不足
- **不适合**：需本地硬件调试（嵌入式等）

### 前置条件

- Cursor 3.7+ Agents Window
- 云 Agent 额度

### 详细使用步骤（业务用户）

1. Agents Window → 首次 cloud task → 跟随 setup wizard
2. 观察共享 terminal 安装依赖
3. 确认 snapshot → commit `.cursor/environment.json`
4. 本地会话输入 `/in-cloud fix flaky test in module X`
5. PR 准备：点击 pill 或 `/babysit`

### 命令与配置示例

**`.cursor/environment.json`（示意）**

```json
{
  "snapshot": "team-node-20-postgres",
  "install": "npm ci && npm run build",
  "start": "npm run dev"
}
```

```
/in-cloud investigate memory leak in worker pool
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud setup | ⚠️ 未实测 |
| Changelog 6/17 | ✅ |

### 问题与解决方案

**错误 1：snapshot 过期**

排查：依赖变更后重新 run setup；更新 environment.json。

**错误 2：handoff 丢上下文**

排查：6/17 称 handoff 改进；确保同一 thread ID。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 | commit environment.json 统一云环境 |
| 个人 | 长任务 offload 到 `/in-cloud` 保本地响应 |

---

## 特性五：Bugbot `/review` 与 Composer 2.5（2026-06-10，仍有效）

### 是什么（机制说明）

Bugbot 由 **Composer 2.5** 驱动：~90s/次审查（原 ~5min），bug 0.62/次，成本 -22%。**`/review`** 支持 push 前审查；与 GitHub Bugbot 同步跳过重复 diff。

### 适用场景

- **适合**：push 前自检、PR 增量审查
- **不适合**：无 Git 集成项目

### 前置条件

- Cursor 3.7+
- Bugbot GitHub/GitLab 集成

### 详细使用步骤（业务用户）

1. Settings → Bugbot → 连接 GitHub
2. 本地 commit 后 `/review-bugbot`
3. 同 diff 开 PR 时 Bugbot 跳过重复
4. 可选：仅审查自上次 review 以来变更

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/review` | ⚠️ 未实测 |
| Changelog 数据 | ✅ ~90s |

### 问题与解决方案

**错误 1：审查仍慢**

排查：检查 model block list；大 diff 例外。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/10 | 官方 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全员 | push 前 `/review` 成习惯 |

---

## 版本对照表

| 日期 | 版本/主题 | 要点 |
|------|-----------|------|
| 2026-06-18 | Automations | `/automate`、GitHub×5、emoji、computer use |
| 2026-06-17 | Cloud 3.7 | environment.json、`/in-cloud`、`/babysit` |
| 2026-06-10 | Bugbot | Composer 2.5、~90s、`/review` |
| 2026-06-04 | SDK | custom tools、auto-review、nested subagents |

## 今日研究员结论

**6/17–6/18 是 Cursor「自动化运营」里程碑**：从个人编码助手扩展到 **always-on 云 Agent 平台**。开发者应优先试用 **`/automate` + cron/GitHub trigger**；团队务必在 instructions 中写清 **开 PR 门槛** 并监控 **Max Mode 用量**。本 DayAI 仓库自身即为 Cursor Automation 的生产实例。
