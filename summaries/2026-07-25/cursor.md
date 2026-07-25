# Cursor 每日技术文档 — 2026-07-25

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Router 公告](https://cursor.com/blog/router)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 25 日 Cursor **无新 Changelog 条目**，最新仍为 7/22 的 **Cursor Router**。Router 进入发布第 4 日，Teams 计划默认启用，Enterprise 需 Admin 手动开启。Auto mode 现由智能路由器驱动，提供 Intelligence / Balance / Cost 三档优化，需启用 Grok 4.5 作为价格高效路由选项。本地无法实测 Cursor 桌面功能，以下基于官方 Changelog、博客与第三方 rollout 指南。Opus 5 于 7/24 发布，Cursor 社区关注 Router 是否将 Opus 5 纳入路由池。

---

## 特性一：Cursor Router 三档优化模式（7/22，第 4 日观察）

### 是什么（机制说明）

Cursor Router 分析每个请求的任务类型与复杂度，将工作路由至最合适的底层模型。用户选择 Auto 后，再选优化模式：
- **Intelligence**：前沿质量，匹配最贵最强模型
- **Balance**：强质量，匹配多数人日常使用的 frontier 模型（推荐默认）
- **Cost**：在可用智能范围内优化 token 花费

Balance 与 Intelligence 按路由模型费率计费。Classifier 基于 60 万+ 线上请求训练。

### 适用场景

- **适合**：Teams 日常混合任务、成本敏感团队、不愿手动选模型的用户
- **不适合**：需固定特定模型做合规/可复现的场景

### 前置条件

Cursor Teams 或 Enterprise；Teams 默认已启用；**Grok 4.5 必须启用**（路由底座，不可 blocklist 排除）

### 详细使用步骤（业务用户）

1. 打开 Cursor → Chat/Composer
2. 模型选择器选 **Auto**
3. 选择优化模式：Intelligence / Balance / Cost
4. 默认 routed model 隐藏；可在设置中显示
5. Admin：Dashboard → Cursor Router → 配置团队默认与允许模式

### 命令与配置示例

```bash
# Cursor CLI（概念性，Auto + Router）
cursor chat --model auto --router-mode balance "Refactor auth module"
```

```json
// Dashboard Router 配置（概念性）
{
  "router": {
    "enabled": true,
    "defaultMode": "balance",
    "allowedModes": ["balance", "cost", "intelligence"],
    "showRoutedModel": false
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor 桌面 Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| 官方 Changelog | ✅ 7/22 Router 条目 |
| Grok 4.5 要求 | ✅ Docs 明确 |

### 问题与解决方案

**Router 不可用**：确认 Teams 计划；Enterprise 需 Admin 启用。**Cost 模式质量不足**：对关键任务切换 Balance 或 Intelligence。**无法排除 Grok 4.5**：Docs 要求其为路由底座。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/22 | ✅ 三档模式 |
| Digital Applied 博客 | ✅ 7/22 上线 |
| DEV Community | ✅ Balance 为推荐起点 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 若用 Teams，从 Balance 开始 |
| Team Lead | 按任务类型 A/B 测试三档 |
| Admin | 先 soft enforcement |

---

## 特性二：Admin 控制与 model allow/block lists（7/22）

### 是什么（机制说明）

Enterprise Admin 可：
- 按团队/组织组启用 Router
- 限制可用优化模式（最多禁用 2 档）
- 设置默认模式
- 配置 model allowlist/blocklist
- Soft/hard enforcement 标准化 Auto

覆盖桌面、Web、iOS、CLI、SDK。

### 适用场景

- **适合**：企业统一模型策略、合规限制、成本中心管控
- **不适合**：个人开发者

### 前置条件

Cursor Enterprise；Admin 权限

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. Settings → Cursor Router
3. 按组启用、设默认模式、配置 allow/block list
4. 选择 enforcement 级别

### 命令与配置示例

```json
{
  "router": {
    "enabled": true,
    "defaultMode": "cost",
    "allowedModes": ["cost", "balance"],
    "modelAllowlist": ["claude-opus-5", "composer-2.5"],
    "modelBlocklist": [],
    "enforcement": "soft"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Dashboard | ⚠️ 未实测（无 Enterprise 账户） |
| 官方 Docs | ✅ Admin 控制完整 |

### 问题与解决方案

**成员无法切模式**：检查 allowedModes。**模型被屏蔽**：检查 blocklist（Grok 4.5 不可排除）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ Admin controls |
| Blog | ✅ 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| IT Admin | soft → hard 过渡 |
| 财务 | 默认 Cost |
| 安全 | allowlist 限制 |

---

## 特性三：Cloud Agent 与 `.cursor/permissions.json`（持续可用）

### 是什么（机制说明）

Cloud Agent 在隔离 VM 运行完整开发环境，支持 `.cursor/permissions.json` 细粒度权限。Router 覆盖 Cloud Agent 平台。Remote Control 允许 Web/移动端跟进长时间任务。

### 适用场景

- **适合**：长时后台任务、PR 自动化、无本地 GUI 环境（如本 DayAI 自动化）
- **不适合**：需即时交互的短任务

### 前置条件

Cursor 付费订阅；GitHub 仓库连接

### 详细使用步骤（业务用户）

1. Cursor → Agents → Cloud
2. 选择仓库与环境
3. 配置 `.cursor/permissions.json`
4. 启动 Agent；Auto 模式将使用 Router（若已启用）

### 命令与配置示例

```json
// .cursor/permissions.json
{
  "allow": [
    "Shell(npm *)",
    "Shell(git *)",
    "Read(**)",
    "Write(summaries/**)"
  ],
  "deny": [
    "Shell(rm -rf *)",
    "Write(.env*)"
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent | ⚠️ 本环境即 Cloud Agent，无 Cursor 桌面 |
| permissions.json | ✅ 格式基于官方 Docs |
| Router + Cloud | ⚠️ 推测 Auto 在 Cloud 同样可用 |

### 问题与解决方案

**权限被拒**：检查 allow/deny。**超时**：检查环境与网络。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs | ✅ permissions.json |
| Changelog Router | ✅ 覆盖 CLI/SDK/Cloud |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 自动化 | 用 Cloud Agent + permissions |
| 团队 | 统一 permissions 模板 |

---

## 特性四：Composer 2.5 与 Opus 5 路由观察（持续）

### 是什么（机制说明）

Composer 2.5 为 Cursor 自研 Agent 模型（基于 Kimi K2.5 后训练）。7/25 无 Composer 版本更新。Opus 5 于 7/24 发布，Anthropic 称 CursorBench 接近 Fable 5；⚠️ 推测 Router 未来可能将 Opus 5 纳入 Intelligence 档路由池，尚无官方 7/25 公告。

### 适用场景

- **适合**：Cursor 原生 Agent、长时编程任务
- **不适合**：仅使用外部 CLI 的用户

### 前置条件

Cursor 订阅；Composer 可用

### 详细使用步骤（业务用户）

1. Chat/Composer 选择 Composer 2.5
2. 或选 Auto + Router 让系统路由
3. 关注 Changelog 是否宣布 Opus 5 入池

### 命令与配置示例

```typescript
// SDK 概念性
const agent = new CursorAgent({ model: "composer-2.5" });
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer 2.5 | ⚠️ 未实测 |
| Opus 5 入 Router | ⚠️ 推测，待官方确认 |

### 问题与解决方案

**Composer 限流**：检查订阅额度。**想用手动 Opus 5**：暂选手动选模型（若账户有权限）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 量子位 Composer 2.5 | ✅ Kimi 基模 + RL |
| Anthropic Opus 5 | ✅ CursorBench 评价 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发 | Composer 2.5 或 Auto Balance |
| 前沿任务 | 关注 Opus 5 手动选项 |

---

## 特性五：Bugbot 与 `/review`（持续可用）

### 是什么（机制说明）

Bugbot 为 Cursor 的 PR 审查自动化；`/review` 为会话内代码审查命令。7/25 无新变更，仍为当前 PR 工作流组成部分。与 Router 配合时，审查任务可能被路由至 Intelligence 档以保质量。

### 适用场景

- **适合**：PR 自动化、代码审查流程
- **不适合**：无 Git 集成的场景

### 前置条件

GitHub 集成；Bugbot 已启用（若用 PR 自动化）

### 详细使用步骤（业务用户）

1. 连接 GitHub 仓库
2. 启用 Bugbot（Settings → Integrations）
3. 会话内 `/review` 或依赖 PR 触发 Bugbot

### 命令与配置示例

```
/review
/review ultra
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bugbot | ⚠️ 未实测 |
| `/review` | ✅ Changelog 历史支持 |

### 问题与解决方案

**Bugbot 未触发**：检查 GitHub App 权限。**审查质量**：尝试 Router Intelligence 模式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 历史 Changelog | ✅ Bugbot、`/review` |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 | Bugbot + Router Balance |
| 个人 | `/review` 手动触发 |

---

## 版本对照表

| 日期 (UTC) | 条目 | 核心变更 |
|------------|------|----------|
| 2026-07-22 | Cursor Router | Auto 智能路由、三档模式、Admin 控制 |
| 2026-07-17 | Slack 集成 | 计划预览、多 repo |
| 2026-07-08 | Grok 4.5 | 路由底座模型 |

## 今日研究员结论

7/25 无 Cursor 新发布，焦点仍在 Router 第 4 日落地与 Opus 5 生态反应。Teams 用户应熟悉三档模式并确认 Grok 4.5 已启用；Enterprise 需 Admin 主动配置。本地 GUI 功能无法在 Cloud Agent 环境实测，以官方 Changelog 与操作 SOP 为准。
