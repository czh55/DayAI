# Cursor 每日技术文档 — 2026-07-27

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Router 公告](https://cursor.com/blog/router)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 27 日 Cursor **无新 Changelog 条目**，最新仍为 7/22 的 **Cursor Router**。Router 进入发布第 **6** 日，Teams 计划默认启用，Enterprise 需 Admin 手动开启。Auto mode 现由智能路由器驱动，提供 Intelligence / Balance / Cost 三档优化。同日 Kimi K3 权重开源与 Anthropic 开放权重立场文发布，行业政策叙事升温，但 Cursor 官方无新功能公告。本地无法实测 Cursor 桌面功能，以下基于官方 Changelog、博客与第三方 rollout 指南。

---

## 特性一：Cursor Router 三档优化模式（7/22，第 6 日观察）

### 是什么（机制说明）

Cursor Router 分析每个请求的任务类型与复杂度，将工作路由至最合适的底层模型。用户选择 Auto 后，再选优化模式：
- **Intelligence**：前沿质量，匹配最贵最强模型
- **Balance**：强质量，匹配多数人日常使用的 frontier 模型（推荐默认）
- **Cost**：在可用智能范围内优化 token 花费

Balance 与 Intelligence 按路由模型费率计费。第 6 日观察：K3 开源后，部分团队可能评估是否将 Kimi 类模型纳入自定义路由（⚠️ 非官方 Router 能力，需自行配置 API）。

### 适用场景

- **适合**：Teams 日常混合任务、成本敏感团队
- **不适合**：需固定特定模型做合规/可复现的场景

### 前置条件

Cursor Teams 或 Enterprise；**Grok 4.5 必须启用**（路由底座）

### 详细使用步骤（业务用户）

1. 打开 Cursor → Chat/Composer
2. 模型选择器选 **Auto**
3. 选择优化模式：Intelligence / Balance / Cost
4. Admin：Dashboard → Cursor Router → 配置团队默认

### 命令与配置示例

```bash
cursor chat --model auto --router-mode balance "Refactor auth module"
```

```json
{
  "router": {
    "enabled": true,
    "defaultMode": "balance",
    "allowedModes": ["balance", "cost", "intelligence"],
    "showRoutedModel": true
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面 Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 官方 Changelog 7/27 | ✅ 无新条目 |
| 官方 Changelog 7/22 | ✅ Router 条目有效 |

### 问题与解决方案

**Router 不可用**：确认 Teams 计划。**Cost 模式质量不足**：切换 Balance 或 Intelligence。**无法排除 Grok 4.5**：Docs 要求其为路由底座。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/22 | ✅ 三档模式 |
| 7/27 更新 | ✅ 无新发布 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 第 6 日固化 Balance 默认 |
| Team Lead | 形成团队模式选择指南 |
| Admin | 评估 soft vs hard enforcement |

---

## 特性二：Admin 控制与 model allow/block lists（7/22，第 6 日巩固）

### 是什么（机制说明）

Enterprise Admin 可：按团队/组织组启用 Router、限制优化模式、设置默认模式、配置 model allowlist/blocklist、soft/hard enforcement。覆盖桌面、Web、iOS、CLI、SDK。

### 适用场景

- **适合**：企业统一模型策略、合规限制
- **不适合**：个人开发者

### 前置条件

Cursor Enterprise；Admin 权限

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. Settings → Cursor Router
3. 按组启用、设默认模式、配置 allow/block list

### 命令与配置示例

```json
{
  "router": {
    "enabled": true,
    "defaultMode": "cost",
    "allowedModes": ["cost", "balance"],
    "modelAllowlist": ["claude-opus-5", "composer-2.5", "grok-4.5"],
    "enforcement": "soft"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Dashboard | ⚠️ 未实测（无 Enterprise 账户） |
| 7/27 Changelog | ✅ 无 Admin 相关更新 |

### 问题与解决方案

**成员无法切模式**：检查 allowedModes。**Opus 5 不在 allowlist**：若账户有权限，考虑添加。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ Admin controls |
| 7/27 | ✅ 无变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| IT Admin | 审查 enforcement 效果 |
| 财务 | 默认 Cost，关键项目例外 |

---

## 特性三：Cloud Agent 与 `.cursor/permissions.json`（持续可用）

### 是什么（机制说明）

Cloud Agent 在隔离 VM 运行完整开发环境，支持 `.cursor/permissions.json` 细粒度权限。Router 覆盖 Cloud Agent 平台。本 DayAI 自动化环境即 Cloud Agent 实例，7/27 继续以此方式生成每日摘要。

### 适用场景

- **适合**：长时后台任务、PR 自动化、无本地 GUI 环境
- **不适合**：需即时交互的短任务

### 前置条件

Cursor 付费订阅；GitHub 仓库连接

### 详细使用步骤（业务用户）

1. Cursor → Agents → Cloud
2. 选择仓库与环境
3. 配置 `.cursor/permissions.json`
4. 启动 Agent

### 命令与配置示例

```json
{
  "allow": [
    "Shell(npm *)",
    "Shell(git *)",
    "Read(**)",
    "Write(summaries/**)"
  ],
  "deny": [
    "Shell(rm -rf *)"
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent | ✅ 本环境正在运行 |
| permissions.json | ✅ 项目内已配置 |
| 桌面 GUI | ⚠️ 未实测 |

### 问题与解决方案

**权限被拒**：检查 `.cursor/permissions.json` allow 规则。**长任务中断**：使用 Remote Control 从移动端跟进。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Docs | ✅ Cloud Agent 完整 |
| 本环境 | ✅ 实测生成摘要 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 自动化用户 | 利用 Cloud Agent + permissions 做受限写入 |
| 团队 | 统一 permissions 模板 |

---

## 特性四：Bugbot 与 `/review`（持续可用）

### 是什么（机制说明）

Bugbot 自动审查 PR 中的潜在 bug；`/review` 命令触发代码审查。Cloud Agent 支持 team hooks 扩展审查流程。7/27 无新功能，但 Opus 5 第 4 日可能改善审查质量（若 Router 路由至 Opus 5）。

### 适用场景

- **适合**：PR 质量门禁、团队 code review 自动化
- **不适合**：无 Git 集成的纯本地项目

### 前置条件

Cursor 付费计划；GitHub/GitLab 连接

### 详细使用步骤（业务用户）

1. 在 PR 或 Chat 中输入 `/review`
2. 或启用 Bugbot 自动审查（Settings → Bugbot）
3. Cloud Agent hooks：`beforeSubmitPrompt`、`afterAgentResponse` 等

### 命令与配置示例

```
/review
/review ultra
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/review` | ⚠️ 未实测（无 GUI） |
| Bugbot | ⚠️ 未实测 |
| Changelog | ✅ 功能持续可用 |

### 问题与解决方案

**审查质量不足**：尝试 `/review ultra` 或切换 Intelligence 档 Router。**Bugbot 误报**：调整团队规则或禁用特定检查。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9+ | ✅ Bugbot 与 hooks |
| 7/27 | ✅ 无更新 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开发者 | PR 前手动 `/review` |
| Team Lead | 启用 Bugbot 做第一道门禁 |

---

## 特性五：Composer 与 SDK custom tools（持续可用）

### 是什么（机制说明）

Composer 为 Cursor 多文件编辑 Agent；SDK 支持 custom tools 扩展。Router 覆盖 Composer 请求。7/27 无 Composer 版本更新公告；历史稿提及 Composer 2.5 与 xAI Colossus 2 训练合作。

### 适用场景

- **适合**：多文件重构、跨模块功能开发
- **不适合**：单行修改

### 前置条件

Cursor 付费计划

### 详细使用步骤（业务用户）

1. Cmd+I（Mac）或 Ctrl+I（Win）打开 Composer
2. 选择 Auto + Router 模式
3. SDK 用户：参考 [Cursor SDK docs](https://cursor.com/docs) 配置 custom tools

### 命令与配置示例

```typescript
// SDK custom tool 概念示例
const tools = [
  {
    name: "search_codebase",
    description: "Search the codebase for patterns",
    parameters: { query: { type: "string" } },
    execute: async ({ query }) => { /* ... */ }
  }
];
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer GUI | ⚠️ 未实测 |
| SDK | ⚠️ 未实测 |
| Changelog 7/27 | ✅ 无 Composer 更新 |

### 问题与解决方案

**Composer 质量不稳定**：尝试 Intelligence 档 Router。**SDK 工具未触发**：检查 tool schema 与权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ Composer 持续迭代 |
| 量子位 5 月稿 | ✅ Composer 2.5 与 xAI 合作（历史） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | Composer + Balance 模式日常 |
| 平台团队 | SDK custom tools 集成内部 API |

---

## 版本对照表

| 功能/版本 | 发布日 (UTC) | 7/27 状态 |
|-----------|--------------|-----------|
| Cursor Router | 2026-07-22 | **最新 Changelog 条目** |
| Slack 多仓库 | 2026-07-17 | 持续可用 |
| Side chats / 对话搜索 | 2026-07-10 (3.11) | 持续可用 |
| Cloud Agent hooks | 2026-07-10 | 持续可用 |
| iOS 公测 | 2026-06-29 (3.9) | 持续可用 |

## 今日研究员结论

7/27 Cursor 维持 7/22 Router 为最新官方更新，无新功能发布。建议 Teams 用户继续以 Balance 为默认 Router 模式；Cloud Agent 用户（含本 DayAI 自动化）保持 `.cursor/permissions.json` 最小权限原则。关注 K3 开源后行业是否出现 Cursor 侧模型路由或合作伙伴公告，但截至今日无官方信号。
