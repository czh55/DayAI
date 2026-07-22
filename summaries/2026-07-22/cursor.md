# Cursor 每日技术文档 — 2026-07-22

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Router Blog](https://cursor.com/blog/router)

## 今日综述

2026 年 7 月 22 日 Cursor 发布 **Cursor Router**——面向 Teams 与 Enterprise 的智能模型路由系统，是今日最重要的更新。Auto 模式不再使用简单启发式，而是按任务类型与复杂度分析每个请求，路由到最合适的前台或性价比模型。三档优化模式（Intelligence / Balance / Cost）覆盖成本-智能帕累托前沿的不同位置。同日 Claude Code 2.1.218 与 Codex 0.146.0-alpha.3 发布，形成国际三强同日更新的格局。

---

## 特性一：Cursor Router 智能模型路由（7/22 新发布）

### 是什么（机制说明）

Cursor Router 是 Cursor 的智能模型选择器，分析每个 Agent 请求的任务类型与复杂度，将工作分发给最合适的前台模型或性价比模型。基于 60 万+ 真实请求训练，在数百万请求 A/B 测试中验证。

**三档优化模式**：

| 模式 | 定位 | 官方宣称 |
|------|------|----------|
| **Intelligence** | 前沿质量，匹配最贵最强模型 | 接近 Fable 满意度，成本低约 60% |
| **Balance** | 日常驾驶级质量 | 高于 Opus 4.8 满意度，成本低约 36% |
| **Cost** | 在可用智能上限内优化 token 花费 | 此前 Auto 的固定单价模式 |

Balance 与 Intelligence 按路由模型的实际费率计费。每个模式在成本-智能帕累托前沿上移动。

### 适用场景

- **适合**：Teams/Enterprise 团队希望降低 AI 成本同时保持质量；日常任务与复杂任务混合的工作流
- **不适合**：个人 Pro 用户（暂不可用）；需要固定前沿模型每一请求的场景

### 前置条件

Cursor Teams 或 Enterprise 订阅；Router 对 Teams 默认开启，Enterprise 需 Dashboard 启用

### 详细使用步骤（业务用户）

1. 打开 Cursor IDE → 模型选择器
2. 选择 **Auto** 模式
3. 在 Auto 下选择优化模式：**Intelligence** / **Balance** / **Cost**
4. 发送 Agent 请求，Router 自动分析并路由
5. 查看路由模型（默认隐藏，Admin 可配置显示）
6. Admin：Dashboard → 按团队/组织组启用 Router、限制模式、设置默认、允许/屏蔽底层模型

### 命令与配置示例

```text
# IDE 操作路径
Cursor → 模型选择器 → Auto → Intelligence / Balance / Cost

# Admin Dashboard 配置
Dashboard → Settings → Cursor Router
  - Enable per team/group
  - Restrict optimization modes
  - Set default mode (Intelligence/Balance/Cost)
  - Allow/block underlying models
  - Show/hide routed model name
  - Soft/hard enforcement for Auto as team default
```

```json
// .cursor/permissions.json — 团队权限示例（若适用）
{
  "router": {
    "enabled": true,
    "defaultMode": "balance",
    "allowedModes": ["balance", "cost"],
    "showRoutedModel": false
  }
}
```

```bash
# CLI 中也支持 Router（7/22 Changelog 确认）
cursor agent --model auto --router-mode balance "重构这个模块"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor Router | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 确认 | ✅ 7/22 条目存在 |
| Blog 数据 | ✅ Intelligence $6.76/commit, Balance $4.63/commit |

### 问题与解决方案

**Router 不可用**：确认 Teams/Enterprise 订阅，Enterprise 需在 Dashboard 启用。**路由模型质量不稳定**：尝试切换到 Intelligence 模式或固定前沿模型。**Admin 无法限制模式**：检查 Dashboard → Router 设置中的 per-group 配置。**Grok 4.5 未出现**：Grok 4.5 为 price-efficient 路由选项之一，确认未被 Admin 屏蔽。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| cursor.com/changelog 7/22 | ✅ 官方 |
| cursor.com/blog/router | ✅ 详细数据 |
| Cursor Forum 7/22 | ✅ Colin 官方帖确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Teams Admin | 从 Balance 模式开始，观察 1 周后调整 |
| 个人 Pro | 暂不可用，关注后续 rollout |
| 成本敏感团队 | Cost 模式 + 监控 routed model 显示 |

---

## 特性二：Admin 控制与企业治理（7/22）

### 是什么（机制说明）

Cursor Router 提供完整的企业级 Admin 控制：

- 按团队或组织组启用/禁用 Router
- 限制成员可选择的优化模式
- 设置团队默认模式
- 允许或屏蔽特定底层模型
- 显示或隐藏路由后的模型名称（默认隐藏）
- Soft/hard enforcement 强制团队使用 Auto

Grok 4.5 作为 price-efficient 路由选项被纳入。

### 适用场景

- **适合**：Enterprise 需要统一 AI 使用策略的团队
- **不适合**：个人开发者

### 前置条件

Cursor Enterprise 订阅；Admin 权限

### 详细使用步骤（业务用户）

1. 登录 Cursor Dashboard（cursor.com/dashboard）
2. 进入 Settings → Cursor Router
3. 选择目标团队或组织组
4. 配置启用状态、允许的模式、默认模式
5. 设置模型 allow/block list
6. 选择 routed model 显示策略
7. 配置 Auto 强制策略（soft/hard）

### 命令与配置示例

```text
# Dashboard 路径
cursor.com/dashboard → Settings → Cursor Router

# 配置项
- Per-team enablement: ON/OFF
- Per-group enablement: ON/OFF
- Allowed modes: [Intelligence, Balance, Cost]
- Default mode: Balance
- Model allow list: [claude-opus-4.8, gpt-5.6-sol, grok-4.5]
- Model block list: []
- Show routed model: Hidden (default)
- Auto enforcement: Soft
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Admin 控制 | ⚠️ 未实测（无 Enterprise 账号） |
| Changelog 确认 | ✅ Admin controls 章节 |

### 问题与解决方案

**成员看不到 Router 选项**：确认团队已启用且成员在允许的组织组中。**模式被限制**：联系 Admin 调整 allowed modes。**模型被屏蔽**：检查 block list，Grok 4.5 可能被 Admin 禁用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog Admin controls | ✅ |
| Blog | ✅ 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Enterprise Admin | 先用 soft enforcement，观察采纳率 |
| 安全团队 | 利用 model block list 限制特定模型 |
| 财务 | 用 Cost 模式作为默认降低支出 |

---

## 特性三：全平台覆盖与 Grok 4.5 路由（7/22）

### 是什么（机制说明）

Cursor Router 覆盖全平台：

- Desktop IDE
- Web
- iOS
- CLI
- SDK

Grok 4.5 被纳入 price-efficient 路由选项，在 Cost 模式下可能路由到 Grok 4.5 处理适合的任务。

### 适用场景

- **适合**：跨平台团队协作；需要移动端 Agent 的团队
- **不适合**：仅使用单一平台的个人用户

### 前置条件

Teams/Enterprise 订阅；各平台客户端更新到最新版

### 详细使用步骤（业务用户）

1. 确保各平台 Cursor 客户端为最新版
2. 在 Desktop 配置 Router 后，Web/iOS/CLI 自动继承团队设置
3. CLI 使用 `--model auto` 触发 Router
4. SDK 集成中指定 auto 模式

### 命令与配置示例

```bash
# CLI 使用 Router
cursor agent --model auto "分析这个 PR"

# SDK 示例（概念性）
import { CursorAgent } from '@cursor/sdk';
const agent = new CursorAgent({ model: 'auto', routerMode: 'balance' });
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 全平台覆盖 | ✅ Changelog 确认 |
| Grok 4.5 路由 | ✅ Improvements 列表确认 |
| CLI/SDK 实测 | ⚠️ 未实测 |

### 问题与解决方案

**iOS 上 Router 不可用**：确认 App 已更新且团队已启用。**CLI 未路由**：检查 `--model auto` 参数。**Grok 4.5 质量不满意**：Admin 可将 Grok 4.5 加入 block list。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ available across desktop, web, iOS, CLI, SDK |
| Blog | ✅ Grok 4.5 mentioned |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动开发者 | 利用 iOS Router 在手机上发起 Agent |
| CLI 用户 | 脚本中使用 auto 模式降本 |
| SDK 集成者 | 在应用中嵌入 Router 能力 |

---

## 特性四：7/17 Slack 集成（仍为有效功能）

### 是什么（机制说明）

7/17 Changelog 三项核心改进仍有效：

1. **计划先行**：Slack 中任务开始前分享执行计划
2. **多仓库环境**：named multi-repo environment 支持
3. **跨频道工作流**：读取/发送其他频道消息

### 适用场景

- **适合**：Slack 协作团队、多仓库微服务
- **不适合**：纯本地 IDE 工作流

### 前置条件

Cursor Team/Enterprise + Slack 集成

### 详细使用步骤（业务用户）

1. Slack 中 @Cursor 发消息
2. Cursor 回复计划，确认或调整
3. 配置 multi-repo environment
4. 任务中跨频道拉取上下文

### 命令与配置示例

```json
{
  "repos": [
    {"name": "frontend", "path": "/workspace/frontend"},
    {"name": "backend", "path": "/workspace/backend"}
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Slack 集成 | ⚠️ 未实测 |

### 问题与解决方案

**计划不出现**：确认 Slack 集成版本 ≥ 7/17。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Lead | 结合 Router 在 Slack 中降本 |
| 个人开发者 | 若不用 Slack 可忽略 |

---

## 特性五：3.11 Side Chats 与 Cloud Agent Hooks（7/10，仍有效）

### 是什么（机制说明）

Cursor 3.11（7/10）引入 Side Chats（`/side`、`/btw`）、Conversation Search（Cmd+K）、Cloud Agent Hooks（`beforeSubmitPrompt`、`afterAgentResponse`、`subagentStart` 等）。

### 适用场景

- **适合**：需要并行探索想法不中断主 Agent 的场景
- **不适合**：简单单线程任务

### 前置条件

Cursor 3.11+

### 详细使用步骤（业务用户）

1. 主 Agent 运行时输入 `/side` 或 `/btw` 打开并行对话
2. Cmd+K 在 Agents Window 搜索历史对话
3. 配置 Cloud Agent Hooks 观察/控制 Agent 行为

### 命令与配置示例

```text
/side 这个重构方案有没有更简单的替代？
/btw 顺便检查一下测试覆盖率
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Side Chats | ⚠️ 未实测 |

### 问题与解决方案

**Side chat 无上下文**：确认从主会话发起而非独立新会话。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | Side chat 是保持 flow 的利器 |
| 平台工程师 | 利用 Hooks 构建自纠错循环 |

---

## 版本对照表

| 版本/日期 | 核心变更 |
|-----------|----------|
| **7/22/2026** | Cursor Router 发布（Intelligence/Balance/Cost） |
| 7/17/2026 | Slack 计划先行、多仓库、跨频道 |
| 3.11 (7/10) | Side Chats、Conversation Search、Cloud Agent Hooks |

## 今日研究员结论

Cursor Router 是 7/22 最大亮点，标志着 Cursor 从「固定模型选择」转向「智能路由降本」。对 Teams/Enterprise 用户，建议从 Balance 模式开始试用，观察 1–2 周的质量与成本数据。个人 Pro 用户暂不受影响，但 Router 逻辑可能未来下放。与 Codex `/import` 形成竞争：两边都在降低多工具切换成本。

---
