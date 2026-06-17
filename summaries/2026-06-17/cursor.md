# Cursor 每日技术文档 — 2026-06-17

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cloud Agents Docs](https://cursor.com/docs/cloud-agent/capabilities)

## 今日综述

**2026 年 6 月 17 日** Cursor 发布 **3.7** 重大更新，核心围绕 **Cloud Agents** 工程化：**10 分钟云环境快照**（`.cursor/environment.json`）、**`/in-cloud` 云子代理**、**`/babysit` PR 看护**、**本地/云端会话 handoff**。这与 6 月 10 日 Bugbot（Composer 2.5，~90 秒/次）及 `/review` 预推送审查形成「审查 + 执行 + 环境」完整链路。本环境无法 GUI 实测，以下以官方 Changelog + Docs 为准。

---

## 特性一：云环境 10 分钟快照（2026-06-17）

### 是什么（机制说明）

Cursor 可在 **Agents Window** 中帮助你在 **10 分钟内** 完成云开发环境配置：Agent 在共享终端会话中安装依赖、配置工具链，并将结果捕获为 **可复用 snapshot**。配置写入 `.cursor/environment.json` 提交到仓库后，团队后续 Cloud Agent 冷启动更快，且可在云中运行软件验证变更。

### 适用场景

- **适合**：复杂依赖项目（monorepo、多语言栈）；团队统一云 Agent 环境
- **不适合**：纯静态站点等零配置项目

### 前置条件

- Cursor **3.7+** 桌面端
- 付费 Cursor 计划（Cloud Agents 需付费计划）
- GitHub/GitLab 仓库连接

### 详细使用步骤（业务用户）

1. 打开 **Cursor → Agents Window**（或 Agent 输入框旁 Cloud 下拉）
2. 选择 **Set up cloud environment** / 让 Agent 协助配置
3. 在共享终端观看 Agent 安装依赖（npm/pip/docker 等）
4. 完成后保存 snapshot 到 **`.cursor/environment.json`**
5. commit 并 push，团队成员 Cloud Agent 自动继承环境
6. 后续 Agent 启动时跳过重复安装，直接 `npm test` 等验证

### 命令与配置示例

**`.cursor/environment.json` 示例结构**

```json
{
  "snapshot": "team-node-20-postgres",
  "setup": [
    "npm ci",
    "cp .env.example .env.test"
  ],
  "start": "npm run dev",
  "test": "npm test"
}
```

> 实际字段以 Cursor Docs 为准；上例为示意。

**触发云环境配置**

```
在 Agents Window 输入：
"Help me set up the cloud dev environment for this repo"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 云环境快照 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 6/17 | ✅ 官方发布 |

### 问题与解决方案

**错误 1：snapshot 未复用**

排查：确认 `.cursor/environment.json` 已 commit 到默认分支；检查 Cloud Dashboard 环境绑定。

**错误 2：依赖安装超时**

排查：拆分 setup 步骤；在 environment.json 预装系统级依赖；使用 Docker base image。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog 6/17](https://cursor.com/changelog) | 官方 |
| [Cloud Agents Docs](https://cursor.com/docs/cloud-agent/capabilities) | VM 隔离、MCP 支持一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Tech Lead | 维护 `.cursor/environment.json` 作为团队标准 |
| 个人开发者 | 复杂项目首次花 10 分钟配置，长期省时 |
| CI 维护者 | 对齐 Cloud setup 与 CI 脚本，减少环境漂移 |

---

## 特性二：`/in-cloud` 云子代理（2026-06-17）

### 是什么（机制说明）

`/in-cloud` 在 **独立 VM 与分支** 上启动云子代理执行下一任务，本地工作区保持干净响应。子代理可在后台运行，父 Agent 可继续在本地或云端工作。适合长时 CI 修复、并行调查、代码库探索。

### 适用场景

- **适合**：修 CI、调查 issue、并行 feature 探索
- **不适合**：需频繁本地调试 UI 的细粒度交互

### 前置条件

- Cursor 3.7+
- Cloud 环境已配置（见特性一）
- 付费计划 + Cloud Agent 额度

### 详细使用步骤（业务用户）

1. 在 Agent 输入框输入 `/in-cloud`
2. 描述子任务，如「Investigate why CI lint fails on main」
3. 子代理在云端 VM + 独立分支运行
4. 父会话继续本地编码或发起其他云任务
5. 子代理完成后提交 PR 或返回摘要

### 命令与配置示例

```
/in-cloud
Fix the failing GitHub Actions workflow for the backend tests
```

```
/in-cloud
Explore the authentication module and summarize the OAuth flow
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/in-cloud` | ⚠️ 未实测 |
| Docs Computer Use | ✅ 云 VM 可浏览器自验证 |

### 问题与解决方案

**错误 1：子代理无法访问 secrets**

排查：Cloud Dashboard → Environment → 添加 environment-scoped secrets。

**错误 2：分支冲突**

排查：子代理使用独立分支；合并前人工 review。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | `/in-cloud` 官方 |
| DevOps.com 2 月报道 | 35% 内部 PR 来自云 Agent |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | CI 修复 offload 到 `/in-cloud` |
| 团队 | 并行 3–5 个子代理，注意 API 成本 |
| 开源维护者 | issue 调查用子代理，本地保持 focus |

---

## 特性三：`/babysit` PR 看护（2026-06-17）

### 是什么（机制说明）

`/babysit` 让云子代理 **远程迭代 PR** 直至可合并：响应 review comment、修 CI、更新测试。可通过 quick-action pill 或命令触发，不占用本地会话。

### 适用场景

- **适合**：PR 已开但 CI/review 需多轮迭代
- **不适合**：需复杂产品决策的架构变更

### 前置条件

- 已有 open PR
- Bugbot/CI 集成（GitHub Actions）
- Cursor 3.7+ Cloud

### 详细使用步骤（业务用户）

1. 打开含 open PR 的 Agent 会话
2. 点击 PR 旁 **babysit** quick-action pill，或输入 `/babysit`
3. 云 Agent 监控 CI 状态与 review comments
4. 自动 push 修复 commit 直至 green
5. 本地收到通知后 final review 并 merge

### 命令与配置示例

```
/babysit
```

```
/babysit
Address all Bugbot comments and fix the failing unit tests
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/babysit` | ⚠️ 未实测 |
| Cloud Agent CI fix | ✅ Docs 支持 GitHub Actions |

### 问题与解决方案

**错误 1：无限迭代循环**

排查：设置最大迭代次数或人工介入点；检查 environment.json 测试命令是否正确。

**错误 2：误改业务逻辑**

排查：启用 PR 增量审查；require human approval before merge。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | 官方 `/babysit` |
| 6/10 Bugbot | 审查与看护互补 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | 睡前 `/babysit`，早晨 review green PR |
| 团队 | 结合 Bugbot 增量审查减少噪音 |
| 安全敏感 | 限制 auto-merge，人工终审 |

---

## 特性四：本地/云端 Handoff（2026-06-17）

### 是什么（机制说明）

Agent 会话可在 **本地计算机与云端** 之间可靠迁移：offload 长时任务到云，需要时 pull 回本地测试；支持 **并行多个云 Agent**。

### 适用场景

- **适合**：本地资源有限；需本地手动验证 UI
- **不适合**：无网络或严格数据出境限制的环境

### 前置条件

- Cursor 3.7+
- 同一账号登录桌面端与 cursor.com/agents

### 详细使用步骤（业务用户）

1. 本地 Agent 会话中，选择 **Move to Cloud** / offload 选项
2. 任务在云端 VM 继续执行
3. 需要本地测试时，选择 **Pull to Local**
4. 本地 checkout 云 Agent 分支，手动验证
5. 可同时在云端运行多个 Agent 并行

### 命令与配置示例

```
# Agent 输入框旁 UI 操作：
# Local → Cloud → Pull back to Local

# Web 端：
# https://cursor.com/agents → 选择会话 → Handoff
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Handoff UI | ⚠️ 未实测 |
| Changelog | ✅ 6/17 官方强调可靠性提升 |

### 问题与解决方案

**错误 1：Handoff 后会话状态丢失**

排查：升级 3.7+；检查网络；避免跨账号 handoff。

**错误 2：本地分支与云分支不一致**

排查：handoff 前 commit；使用 Cloud Agent 提供的分支名 checkout。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | 官方 |
| Cloud API v1 | agent + runs 模型支持持久会话 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 笔记本用户 | 长任务 offload，省电省热 |
| 需要本地 GPU 测试 | pull back 做推理/渲染验证 |
| 管理者 | 监控并行云 Agent 数量与成本 |

---

## 特性五：Bugbot + `/review`（2026-06-10，仍有效）

### 是什么（机制说明）

6 月 10 日更新：Bugbot 由 **Composer 2.5** 驱动，审查 ~90 秒（原 ~5 分钟），成本 -22%，检出 +10%。`/review` 支持 push 前审查；与 GitHub Bugbot 同步，相同 diff 不重复审。

### 适用场景

- **适合**：PR 质量门禁；push 前自检
- **不适合**：无 Git 集成的纯本地流

### 前置条件

- Cursor 3.7+
- Bugbot 已连接 GitHub/GitLab

### 详细使用步骤（业务用户）

1. **Settings → Bugbot** 连接仓库
2. 本地 commit 后 `/review` 或 `/review-bugbot`
3. 修复问题后 push
4. 开 PR 时 Bugbot 识别已审 diff

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

```json
{
  "permissions": {
    "autoRun": {
      "allow_instructions": ["Read-only inspections of ./dist are fine."],
      "block_instructions": ["Always pause delete operations."]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/review` | ⚠️ 未实测 |
| Changelog 数据 | ✅ ~90s、0.62 bugs/review |

### 问题与解决方案

**错误 1：审查仍慢**

排查：检查 model block list；大 diff 超时正常。

**错误 2：重复审查**

排查：确认 `/review` 与 PR diff 一致；启用「仅审新变更」。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/10 | 官方指标 |
| SDK 6/4 autoReview | permissions.json 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全员 | push 前 `/review-bugbot` |
| 安全团队 | 叠加 `/review-security` |
| 与 6/17 云能力组合 | `/babysit` + Bugbot 形成闭环 |

---

## 版本对照表

| 版本/日期 | 要点 |
|-----------|------|
| 3.7 @ 2026-06-17 | 云环境快照、`/in-cloud`、`/babysit`、handoff |
| 3.7 @ 2026-06-10 | Bugbot Composer 2.5、`/review` |
| 3.7 @ 2026-06-04 | SDK custom tools、nested subagents |

## 今日研究员结论

**6/17 是 Cursor 云 Agent 工程化里程碑**：从「能跑云 Agent」升级为「环境可复用、子任务可隔离、PR 可看护、会话可 handoff」。团队应立即评估维护 `.cursor/environment.json`。与 Claude Code `/loops`、Codex Automations 的竞争维度已从 IDE 功能转向 **Agent Control Plane** 完整度。本环境 ⚠️ 未 GUI 实测，建议桌面用户升级 3.7 后优先试用云环境快照 + `/in-cloud`。

---
