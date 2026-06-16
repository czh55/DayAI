# Cursor 每日技术文档 — 2026-06-16

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 16 日 Cursor 官方 Changelog 无新条目**。最新发布仍为 **2026 年 6 月 10 日** Bugbot 更新：Composer 2.5 驱动下审查提速至约 **90 秒**（原 ~5 分钟），成本降约 22%，bug 检出率升 10%。**`/review` 预推送审查** 与 **PR 增量审查** 配置仍是当前最值得开发者关注的能力。虎嗅/量子位 6 月稿件持续讨论 Composer 2.5 基于 Kimi K2.5 + RL 的训练路径，属行业背景而非 6/16 产品更新。

---

## 特性一：Bugbot 3 倍提速（Composer 2.5 驱动）（2026-06-10）

### 是什么（机制说明）

Bugbot 是 Cursor 的 AI 代码审查 Agent，集成于 GitHub/GitLab PR 与 IDE。6 月 10 日更新后由 **Composer 2.5** 驱动：平均审查 **~90 秒**（原 ~5 分钟），每次发现 bug 数 0.56→0.62（+10%），单次成本约 -22%。Bugbot 尊重组织 **model block lists**。

### 适用场景

- **适合**：PR 合并前自动化审查、安全初筛、团队 review 减负
- **不适合**：深度架构评审；无 Git 集成的纯本地项目

### 前置条件

- Cursor **3.7+** 或 [cursor.com/agents](https://cursor.com/agents)
- Bugbot 已在 GitHub/GitLab 仓库启用

### 详细使用步骤（业务用户）

1. **Cursor → Settings → Bugbot** → 连接 GitHub/GitLab
2. 目标仓库启用 Bugbot
3. 创建 PR 后自动运行或手动触发
4. 查看 PR 评论审查结果
5. 可选：Settings → Bugbot →「仅审查自上次 review 以来新变更」

### 命令与配置示例

**IDE 内 `/review`（3.7+）**

```
/review              # 选择 Bugbot / Security Review
/review-bugbot       # 直接跑 Bugbot
/review-security     # 直接跑 Security Review
```

**`.cursor/permissions.json`**

```json
{
  "permissions": {
    "bugbot": {
      "autoRun": true,
      "models": ["composer-2.5"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bugbot PR 审查 | ⚠️ 未实测（无 GUI / 无 GitHub 集成） |
| Changelog 数据 | ✅ 官方：~90s、0.62 bugs/review |

### 问题与解决方案

**错误 1：Bugbot 仍很慢**

排查：确认 Composer 2.5 未被 block list 禁用；大 diff 仍可能超时。

**错误 2：model block list 冲突**

排查：Settings → Models → 检查组织 block list；Bugbot 会 respect 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Cursor Changelog 6/10](https://cursor.com/changelog) | 官方数据 |
| 虎嗅 Composer 2.5 训练文 | 背景：Composer 2.5 为 Bugbot 引擎 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Tech Lead | 启用 PR 增量审查，避免重复 feedback |
| 个人开发者 | push 前 `/review-bugbot` 减少 CI 往返 |
| 安全敏感项目 | 叠加 `/review-security` |

---

## 特性二：`/review` 预推送审查（2026-06-10）

### 是什么（机制说明）

开发者可在 **push 前** 于 IDE 或 cursor.com/agents 运行 `/review`，选择 Bugbot 或 Security Review。若之后用**相同 diff** 开 PR，Bugbot 识别已审查 diff，跳过重复 review 并在 PR 留 comment 说明。

### 适用场景

- **适合**：本地 commit 后 push 前自检、减少 PR 等待
- **不适合**：需要 CI 环境专属测试的场景

### 前置条件

- Cursor 3.7+
- Bugbot 已配置

### 详细使用步骤（业务用户）

1. 本地完成代码变更并 commit
2. 在 Cursor Agent 输入 `/review`
3. 选择 Bugbot 和/或 Security Review
4. 修复发现的问题
5. push 并开 PR——Bugbot 应识别已审 diff

### 命令与配置示例

```
/review
# 或
/review-bugbot
```

**Cloud Agent（cursor.com/agents）**

```
对当前 workspace diff 运行 Bugbot 审查
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/review` 流程 | ⚠️ 未实测（Cloud Agent 无 Cursor IDE） |
| PR diff 同步逻辑 | ✅ 官方 changelog 描述 |

### 问题与解决方案

**错误 1：PR 上 Bugbot 仍重复审查**

排查：确认 PR diff 与本地 `/review` diff 一致；amend commit 会改变 diff hash。

**错误 2：CLI 不可用**

排查：官方注明「CLI support coming soon」——截至 6/16 仍以 IDE/Cloud 为主。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog | 官方 |
| GitHub PR 评论 | 社区待观察 adoption |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 高频 commit 开发者 | push 前 habit：`/review-bugbot` |
| 开源维护者 | 减少 contributor PR 上重复 Bot 评论 |

---

## 特性三：Composer 2.5 与 SDK 嵌套 Subagent（2026-06-04 Changelog，仍有效）

### 是什么（机制说明）

6 月 4 日 Cursor SDK 更新：**嵌套 Subagent 无限深度**（reviewer → test-writer → …）、**custom tools**（`local.customTools`）、**auto-review**（`local.autoReview` + permissions.json 自然语言指令）、**JSONL store** 替代 SQLite。

Composer 2 slug 自动路由至 Composer 2.5；Bugbot 6/10 更新确认 Composer 2.5 为审查引擎。

### 适用场景

- **适合**：headless CI Agent、自定义 MCP 替代、需版本控制 Agent 状态
- **不适合**：仅使用 IDE Tab 补全的用户

### 前置条件

- `@cursor/sdk` 最新或 `cursor-sdk` Python 0.1.6+
- Node.js / Python 环境

### 详细使用步骤（业务用户）

1. `npm install @cursor/sdk` 或 `pip install cursor-sdk`
2. 创建 Agent 并定义 `local.customTools`
3. 配置 `.cursor/permissions.json` 的 `autoRun.allow_instructions`
4. 可选：`local.store: JsonlLocalAgentStore`

### 命令与配置示例

**TypeScript custom tool**

```typescript
import { Agent } from "@cursor/sdk";

const agent = await Agent.create({
  local: {
    customTools: [{
      name: "run_linter",
      description: "Run ESLint on a file",
      parameters: { type: "object", properties: { path: { type: "string" } } },
      execute: async ({ path }) => { /* ... */ },
    }],
  },
});
```

**auto-review permissions.json**

```json
{
  "autoRun": {
    "allow_instructions": ["Read-only inspections of ./dist are fine."],
    "block_instructions": ["Always pause delete operations."]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| SDK 安装 | ⚠️ 未在本任务 scope 实测 |
| 嵌套 Subagent | ✅ 官方 changelog 确认自动启用 |

### 问题与解决方案

**错误 1：`composer-2` 404**

排查：SDK 自动路由 Composer 2.5；更新 SDK 包。

**错误 2：custom tool 不可见**

排查：custom tools 通过内置 MCP `custom-user-tools` 暴露；检查 Agent.create 参数。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 6/4 | 官方 |
| 虎嗅 Composer 训练报告 | RL 管线与 SDK Agent 场景一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Platform 工程师 | JSONL store 便于 diff Agent 状态 |
| 库维护者 | custom tools 免自建 stdio MCP |

---

## 特性四：Cloud Agent 与 `.cursor/permissions.json`（持续）

### 是什么（机制说明）

Cursor Cloud Agent（cursor.com/agents、Automation）在远程 VM 运行，支持 GitHub PR、定时任务。权限通过 **`.cursor/permissions.json`** 控制 auto-run、MCP、shell 等；6/4 SDK 的 `autoRun.allow_instructions` 与 IDE permissions 哲学一致。

### 适用场景

- **适合**：定时 doc 生成、PR 自动化、无 GUI CI 替代
- **不适合**：需本地 GUI（Design Mode、Browser）的任务

### 前置条件

- Cursor 账号与 Cloud Agent 额度
- 仓库 `.cursor/permissions.json`（可选但推荐）

### 详细使用步骤（业务用户）

1. 连接 GitHub 仓库至 cursor.com/agents
2. 根目录添加 `.cursor/permissions.json`
3. 配置 Automation 或手动触发 Agent
4. 审查 Agent 分支/PR 输出

### 命令与配置示例

```json
{
  "permissions": {
    "shell": {
      "allow": ["npm test", "npm run build"]
    },
    "write": {
      "allow": ["summaries/**", "docs/**"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent GUI | ⚠️ 本环境为 Cloud Agent，无 Cursor 桌面 |
| permissions.json | ✅ 仓库内存在类似模式 |

### 问题与解决方案

**错误 1：Agent 权限被拒绝**

排查：检查 permissions.json path glob；Cloud 与 local 策略可能不同。

**错误 2：Composer 版本不明**

排查：Settings → Models 查看 Composer 2.5；changelog 无 6/16 更新。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| cursor.com/docs | 官方 |
| 虎嗅 5 亿 ARR 文 | Agent-first UI 战略一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开源维护者 | DayAI 类 cron Automation 是典型用例 |
| 企业 | 严格 permissions.json + model block list |

---

## 特性五：Design Mode 与 Browser（3.7，6/5 Changelog 背景）

### 是什么（机制说明）

Cursor 3.7 **Design Mode**：浏览器/canvas 内点击、多选元素、语音输入指导 Agent 改 UI。6/5 更新强调 multi-select 与 voice input 在 agent mid-run 仍可用。

### 适用场景

- **适合**：前端 UI 迭代、canvas/dashboard 编辑
- **不适合**：纯后端 API 项目

### 前置条件

- Cursor 3.7+ 桌面
- 启用 Browser / Canvas 功能

### 详细使用步骤（业务用户）

1. 打开 Cursor Browser 或 Canvas
2. 进入 Design Mode overlay
3. 点击或多选 UI 元素
4. 文字或语音描述变更
5. Agent 执行修改

### 命令与配置示例

```
# Agent 自然语言
让选中的按钮样式与导航栏一致
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Design Mode | ⚠️ 未实测（无 GUI） |

### 问题与解决方案

**错误 1：无法选中元素**

排查：确认内置 browser 已启用；检查页面 DOM 是否可访问。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/5 | 官方 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端开发者 | 减少「描述 CSS」的文字成本 |
| 后端开发者 | 低优先级 |

---

## 版本对照表

| 日期 | 版本/主题 | 要点 |
|------|----------|------|
| 2026-06-10 | Bugbot | Composer 2.5、~90s、`/review` |
| 2026-06-05 | 3.7 | Design Mode multi-select、voice |
| 2026-06-04 | SDK | custom tools、nested subagents、JSONL |
| 2026-02 | Composer 1.5/2.5 | 自研模型、Kimi K2.5 基座（官方+虎嗅） |

## 今日研究员结论

6 月 16 日 **无 Cursor 产品 changelog 更新**，开发者应继续消化 6/10 Bugbot/`/review` 能力并配置 PR 增量审查。行业讨论焦点在 Composer 2.5 训练栈（Kimi 基座 + Cursor RL）与 Claude Code/Codex 的竞争——对 Cursor 用户而言，**Harness 层（Agents 布局、Bugbot、Cloud Agent）仍是护城河**，而非 base model 来源标签。建议 push 前 `/review-bugbot`，并 pin Composer 2.5 于 Bugbot 配置。

---
