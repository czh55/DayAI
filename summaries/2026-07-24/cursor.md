# Cursor 每日技术文档 — 2026-07-24

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Router Blog](https://cursor.com/blog/router)、[Cursor Router Docs](https://cursor.com/docs/cursor-router)

## 今日综述

2026 年 7  月 24 日 Cursor **无新 Changelog 条目**，最新发布仍为 **7/22 Cursor Router**。今日进入 Router 企业落地观察第 3 日，同日 Anthropic 发布 Opus 5 并在官方 early-access 评价中引用 CursorBench 数据，加剧「智能路由 + 半价前沿模型」竞争叙事。本地无法实测 Cursor 桌面功能（Cloud Agent 无 GUI），以下基于官方 Changelog、Blog 与 Docs 编写操作 SOP，标注 ⚠️ 未实测。

---

## 特性一：Cursor Router 智能模型路由（7/22 发布）

### 是什么（机制说明）

Cursor Router 是 Cursor Auto 模式的智能模型路由器，分析每个请求并按任务类型与复杂度分发至合适模型。前沿模型处理高复杂度任务，性价比模型处理其余请求。基于 60 万+ 真实请求训练。

三档优化模式：

| 模式 | 定位 | 计费 |
|------|------|------|
| **Intelligence** | 前沿质量，接近最贵最强模型 | 按路由模型费率 |
| **Balance** | 强质量，接近大多数人日常驾驶的前沿模型 | 按路由模型费率 |
| **Cost** | 在可用智能上限内优化 token 花费 | 按路由模型费率 |

Teams 计划默认开启，Enterprise 需 Dashboard 启用。Grok 4.5 作为 price-efficient 路由选项必选。

### 适用场景

- **适合**：Teams/Enterprise 日常编码、成本敏感的前沿智能需求、多模型切换繁琐的团队
- **不适合**：需精确控制每次请求使用特定模型的场景、复杂 brownfield 代码库（社区质疑路由可预测性）

### 前置条件

Cursor Teams 或 Enterprise 订阅；Router 已由 Admin 启用（Teams 默认开启）

### 详细使用步骤（业务用户）

1. 打开 Cursor → Settings → Models
2. 选择 **Auto** 模式
3. 选择优化档位：Intelligence / Balance / Cost
4. （可选）Settings → 开启「显示路由模型」（默认隐藏）
5. Admin：Dashboard → Settings → Cursor Router → 按团队/组织组配置

### 命令与配置示例

```json
// .cursor/settings.json（团队级配置示例）
{
  "cursor.router.enabled": true,
  "cursor.router.defaultMode": "balance",
  "cursor.router.showRoutedModel": true
}
```

```bash
# CLI 使用 Auto 模式（若 CLI 支持）
cursor --model auto

# SDK 配置
# cursor.json
{
  "model": "auto",
  "routerOptimization": "balance"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面 Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 7/22 | ✅ Router 发布确认 |
| Opus 5 路由 | ⚠️ 推测 7/25 后纳入（待 Changelog 确认） |

### 问题与解决方案

**Auto 模式不可用**：确认 Teams/Enterprise 订阅，联系 Admin 启用 Router。**路由模型不透明**：开启 showRoutedModel 设置。**brownfield 质量下降**：切换 Intelligence 模式或指定具体模型。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 7/22 | ✅ 三档模式 |
| Cursor Blog | ✅ 31–52% 成本节省 |
| 社区反馈 | ⚠️ brownfield 可预测性存疑 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Teams Admin | 默认 Balance，允许 Intelligence 给高级用户 |
| 个人 Pro | 暂不受影响，关注后续 rollout |
| 成本敏感团队 | 先试 Cost 模式，监控质量 |

---

## 特性二：Admin 控制与企业治理（7/22）

### 是什么（机制说明）

Cursor Router 提供企业级 Admin 控制：
- 按团队或组织组启用/禁用 Router
- 限制成员可用的优化模式
- 设置默认优化模式
- 允许或屏蔽底层模型（model allow/block lists）
- Soft 与 hard enforcement 选项标准化 Auto 使用

覆盖桌面、Web、iOS、CLI 与 SDK。

### 适用场景

- **适合**：Enterprise 统一模型策略、合规要求限制特定模型、成本中心管控
- **不适合**：个人开发者、小团队无治理需求

### 前置条件

Cursor Enterprise 订阅；Admin 或 Owner 权限

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. 进入 Settings → Cursor Router
3. 按团队/组织组启用 Router
4. 配置允许的模式（Intelligence/Balance/Cost）
5. 设置默认模式
6. 配置 model allowlist/blocklist
7. 选择 enforcement 级别（soft/hard）

### 命令与配置示例

```json
// Dashboard 配置导出示例（概念性）
{
  "router": {
    "enabled": true,
    "defaultMode": "balance",
    "allowedModes": ["balance", "cost"],
    "modelAllowlist": ["claude-opus-5", "gpt-5.6-sol"],
    "modelBlocklist": ["grok-4.5"],
    "enforcement": "soft"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Dashboard 配置 | ⚠️ 未实测（无 Enterprise 账户） |
| 官方 Docs | ✅ Admin 控制描述完整 |

### 问题与解决方案

**成员无法切换模式**：检查 allowedModes 配置。**特定模型被屏蔽**：检查 modelBlocklist。**Hard enforcement 过严**：考虑 soft enforcement 过渡。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/22 | ✅ Admin controls 列表 |
| Docs | ✅ 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| IT Admin | 先 soft enforcement，收集反馈后 hard |
| 安全团队 | 用 blocklist 限制高风险模型 |
| 财务 | 默认 Cost 模式控制 spend |

---

## 特性三：Cloud Agent 与 `.cursor/permissions.json`（持续可用）

### 是什么（机制说明）

Cursor Cloud Agent 支持在隔离 VM 中运行完整开发环境，含 `.cursor/permissions.json` 细粒度权限控制。7/24 无新变更，但 Cloud Agent 是 Router 覆盖平台之一。相关能力（3.10 团队 MCP、3.9 iOS 公测）仍为当前生态组成部分。

`.cursor/permissions.json` 示例：

```json
{
  "allow": ["Shell(npm *)", "Shell(git *)", "Read(**)"],
  "deny": ["Shell(rm -rf *)", "Write(/etc/**)"]
}
```

### 适用场景

- **适合**：长时间后台任务、PR 自动化、无本地 GUI 的 Cloud Agent 环境
- **不适合**：需即时交互的短任务

### 前置条件

Cursor 付费订阅；Cloud Agent 已启用；仓库已连接 GitHub

### 详细使用步骤（业务用户）

1. Cursor → Agents Window → 选择 Cloud
2. 选择仓库与环境
3. 配置 `.cursor/permissions.json` 限制 Agent 权限
4. 启动 Agent 任务
5. 通过 Web/移动端 Remote Control 跟进（Teams/Enterprise 需 Admin 启用）

### 命令与配置示例

```json
// .cursor/permissions.json
{
  "allow": [
    "Shell(npm install)",
    "Shell(npm test)",
    "Shell(git *)",
    "Read(**)",
    "Write(src/**)"
  ],
  "deny": [
    "Shell(rm -rf *)",
    "Shell(sudo *)",
    "Write(.env*)"
  ]
}
```

```bash
# Cloud Agent 通过 CLI（概念性）
cursor agent run --cloud --repo owner/repo --prompt "Fix the failing tests"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent GUI | ⚠️ 未实测（Cloud Agent 环境无 Cursor 桌面） |
| permissions.json | ✅ 格式基于官方 Docs |
| Router + Cloud | ⚠️ 推测 Auto 模式在 Cloud 同样可用 |

### 问题与解决方案

**权限被拒绝**：检查 permissions.json allow/deny 规则。**Cloud Agent 超时**：检查环境配置与网络。**Remote Control 不可用**：Teams/Enterprise 需 Admin 启用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs Cloud Agent | ✅ permissions.json 支持 |
| Changelog 3.9 iOS | ✅ Remote Control 描述 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 用 Cloud Agent 跑长任务 |
| 团队 | 统一 permissions.json 模板 |
| 安全敏感 | deny 敏感路径与危险 shell |

---

## 特性四：Composer 与 SDK Custom Tools（持续演进）

### 是什么（机制说明）

Cursor Composer 系列（如 Composer 2.5）是 Cursor 自研 Agent 模型，通过强化学习提升长时任务表现。SDK 支持 custom tools 扩展 Agent 能力。7/24 无 Composer 版本更新，但 Opus 5 发布后 Cursor 官方评价其在 CursorBench 接近 Fable 5，暗示未来 Router 可能将 Opus 5 纳入路由池。

### 适用场景

- **适合**：Cursor 原生 Agent 工作流、需 custom tools 的企业集成
- **不适合**：仅使用外部 CLI（Claude Code/Codex）的用户

### 前置条件

Cursor 订阅；Composer 模型可用

### 详细使用步骤（业务用户）

1. Cursor → Chat → 选择 Composer 模型
2. SDK 集成：参考 [Cursor SDK Docs](https://cursor.com/docs)
3. 定义 custom tools 扩展 Agent 能力
4. 关注 Changelog 是否将 Opus 5 纳入 Router

### 命令与配置示例

```typescript
// Cursor SDK custom tool 示例（概念性）
import { CursorAgent } from "@cursor/sdk";

const agent = new CursorAgent({
  model: "composer-2.5",
  tools: [{
    name: "deploy",
    description: "Deploy to staging",
    execute: async (args) => { /* ... */ }
  }]
});
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer 模型 | ⚠️ 未实测 |
| SDK custom tools | ⚠️ 未实测 |
| Opus 5 路由 | ⚠️ 推测（待官方确认） |

### 问题与解决方案

**Composer 质量不如预期**：尝试 Router Intelligence 模式或切换 Claude/GPT 模型。**Custom tool 不触发**：检查 tool schema 与 Agent 权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Anthropic Opus 5 页 Cursor 评价 | ✅ CursorBench 数据 |
| Cursor Changelog | ⚠️ 7/24 无 Opus 5 路由更新 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Cursor 重度用户 | 关注 Opus 5 纳入 Router 的 Changelog |
| SDK 集成商 | 利用 custom tools 扩展工作流 |
| 多工具用户 | Router 降本 vs Codex `/import` 迁移评估 |

---

## 特性五：Bugbot 与 `/review`（持续可用）

### 是什么（机制说明）

Cursor Bugbot 是 PR 自动审查工具，集成 GitHub PR 流程。`/review` 命令在会话内触发代码审查。7/24 无 Bugbot 更新，但与 Anthropic `/code-review` 后台子智能体（2.1.218）形成竞品对照。

### 适用场景

- **适合**：GitHub PR 工作流、团队代码审查自动化
- **不适合**：非 GitHub 托管项目

### 前置条件

Cursor 订阅；GitHub 仓库已连接；Bugbot 已启用

### 详细使用步骤（业务用户）

1. GitHub PR 页面：Bugbot 自动评论审查结果
2. Cursor 会话：`/review` 触发本地审查
3. 配置 Bugbot 规则：Dashboard → Integrations → Bugbot

### 命令与配置示例

```bash
# 会话内审查
> /review

# Bugbot GitHub 集成（自动触发于 PR）
# 无需手动命令
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bugbot | ⚠️ 未实测 |
| `/review` | ⚠️ 未实测 |

### 问题与解决方案

**Bugbot 未触发**：检查 GitHub App 权限。**审查质量不佳**：尝试 Router Intelligence 模式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs Bugbot | ✅ 功能描述 |
| Claude Code `/code-review` | ⚠️ 竞品对照（后台子智能体） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Lead | Bugbot + `/review` 双层审查 |
| 个人开发者 | `/review` 快速自查 |
| 多工具团队 | 评估 Bugbot vs Claude `/code-review` |

---

## 版本对照表

| 日期 (UTC) | 版本/功能 | 核心变更 |
|------------|-----------|----------|
| **2026-07-22** | **Cursor Router** | Auto 智能路由、三档优化、Admin 控制 |
| 2026-07-17 | Slack 集成 | 计划预览、多 repo、跨频道 |
| 2026-07-10 | 3.11 | Side chats、对话搜索、项目选择器重构 |
| 2026-06-30 | 3.10 | Team MCPs、组织组 marketplace |

## 今日研究员结论

Cursor 7/24 无新版本，**Router 进入第 3 日落地观察**。同日 Opus 5 发布加剧「路由降本 + 半价前沿模型」竞争，建议 Teams 用户开启 routed model 显示并监控质量。Cloud Agent 与 permissions.json 仍是企业自动化核心。本地 ⚠️ 未实测，操作 SOP 基于官方文档。关注 7/25 前后 Changelog 是否将 Opus 5 纳入 Router 路由池。
