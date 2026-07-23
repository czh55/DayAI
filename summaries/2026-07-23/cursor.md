# Cursor 每日技术文档 — 2026-07-23

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Router Blog](https://cursor.com/blog/router)

## 今日综述

2026 年 7 月 23 日 Cursor **无新 Changelog 条目**。最近更新仍为 **7/22 Cursor Router**——面向 Teams 与 Enterprise 的智能模型路由系统，进入发布次日观察期。三档优化模式（Intelligence / Balance / Cost）基于 **60 万+** 真实请求训练，早期客户报告 **31–52%** 成本节省。本文另覆盖 Admin 治理、Side Chats、Conversation Search、Cloud Agent Hooks、Slack 集成与 `.cursor/permissions.json`。

---

## 特性一：Cursor Router 智能模型路由（7/22，发布次日观察）

### 是什么（机制说明）

Cursor Router 取代 Auto 模式下的简单启发式，分析每个 Agent 请求并路由到最合适模型。基于 60 万+ 真实请求训练，数百万请求 A/B 测试验证。

**三档优化模式**：

| 模式 | 定位 | 官方宣称 |
|------|------|----------|
| **Intelligence** | 前沿质量 | 接近前沿满意度，成本节省约 **60%** |
| **Balance** | 日常驾驶级质量 | 高于 Opus 4.8 满意度，成本节省约 **36%** |
| **Cost** | 优化 token 花费 | 此前 Auto 的固定单价模式 |

Balance 与 Intelligence 按路由模型实际费率计费。Teams 默认开启；Enterprise 管理员从 Dashboard 启用。覆盖 Desktop、Web、iOS、CLI、SDK。

### 适用场景

- **适合**：Teams/Enterprise 降本保质；日常与复杂任务混合工作流
- **不适合**：个人 Pro（暂不可用）；需固定前沿模型每一请求的场景

### 前置条件

Cursor Teams 或 Enterprise 订阅；各平台客户端更新到 7/22 之后版本

### 详细使用步骤（业务用户）

1. Cursor IDE → 模型选择器 → **Auto**
2. 选择优化模式：**Intelligence** / **Balance** / **Cost**
3. 发送 Agent 请求，Router 自动路由
4. Admin：Dashboard → Settings → Cursor Router 配置启用、模式限制、默认模式、模型 allow/block list
5. 发布次日建议：从 **Balance** 开始试用 1–2 周，对比质量与账单

### 命令与配置示例

```text
Cursor → 模型选择器 → Auto → Intelligence / Balance / Cost

Dashboard → Settings → Cursor Router
  - Enable per team/group
  - Restrict optimization modes / Set default mode
  - Allow/block underlying models
  - Show/hide routed model name
```

```bash
cursor agent --model auto --router-mode balance "重构这个模块"
```

```json
{
  "router": {
    "enabled": true,
    "defaultMode": "balance",
    "allowedModes": ["balance", "cost"],
    "showRoutedModel": false
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cursor Router 三档模式 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 7/22 | ✅ 官方确认 |
| Blog 成本数据 | ✅ Intelligence ~60%、Balance ~36% |

### 问题与解决方案

**Router 不可用**：确认 Teams/Enterprise 订阅。**质量不稳定**：切换 Intelligence 或固定前沿模型。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| cursor.com/changelog 7/22 | ✅ |
| cursor.com/blog/router | ✅ |
| 7/23 社区 | ⚠️ brownfield 质量 trade-off 仍有分歧 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Teams Admin | Balance 起步，观察 1–2 周后调整 |
| 成本/质量敏感团队 | Cost + routed model 显示 / Intelligence + 监控满意度 |

---

## 特性二：Admin 控制与企业治理（7/22）

### 是什么（机制说明）

Cursor Router 提供企业级 Admin 控制，与 `.cursor/permissions.json` 形成「路由策略 + 操作权限」双层治理：

- 按团队/组织组启用/禁用 Router
- 限制优化模式、设置默认模式
- 模型 allow/block list（Grok 4.5 为 price-efficient 候选）
- 显示/隐藏 routed model（默认隐藏）
- Soft/hard enforcement 强制 Auto 默认

### 适用场景

- **适合**：Enterprise 统一 AI 策略与成本控制
- **不适合**：个人开发者

### 前置条件

Cursor Enterprise 或 Teams；Admin 权限

### 详细使用步骤（业务用户）

1. 登录 cursor.com/dashboard → Settings → Cursor Router
2. 选择目标团队或组织组
3. 配置启用、允许模式、默认模式、模型 allow/block list
4. 选择 routed model 显示与 Auto 强制策略
5. 结合 `.cursor/permissions.json` 限制 Agent 操作范围

### 命令与配置示例

```text
Dashboard → Settings → Cursor Router
- Allowed modes: [Balance, Cost]
- Default mode: Balance
- Model block list: [grok-4.5]
- Auto enforcement: Soft
```

```json
{
  "allow": ["read:**", "write:src/**", "bash:npm test"],
  "deny": ["write:.env*", "bash:rm -rf*"],
  "router": { "defaultMode": "balance", "allowedModes": ["balance", "cost"] }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Admin Dashboard | ⚠️ 未实测（无 Enterprise 账号） |
| Changelog Admin controls | ✅ |

### 问题与解决方案

**成员看不到 Router**：确认团队已启用。**模式被限制**：联系 Admin。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog + Blog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Enterprise Admin | 先用 soft enforcement 观察采纳率 |
| 安全团队 | 利用 model block list 限制特定模型 |
| 财务 | Cost 模式作默认降低支出 |

---

## 特性三：Side Chats 与 Conversation Search（3.11 / 7/10）

### 是什么（机制说明）

**Side Chats**（`/side`、`/btw`）：主 Agent 运行时开启并行探索对话，不中断主线程；持久完整对话，可 @mention 拉回主线程；默认侧重读/搜/答。

**Conversation Search**：Agents Window **Cmd+K** 全局搜索 transcripts；单对话 **Cmd+F** 跳转匹配项。

### 适用场景

- **适合**：长任务并行探索分支方案；回溯历史技术决策
- **不适合**：简单单次问答；并行修改同一文件集

### 前置条件

Cursor 3.11+

### 详细使用步骤（业务用户）

1. 主 Agent 会话中输入 `/side` 或 `/btw`，或点击 `+` 按钮
2. Side Chat 中探索分支问题，主 Agent 继续运行
3. 结论 @mention 回主线程
4. Agents Window → **Cmd+K** 搜索历史；单对话 **Cmd+F** 精确定位

### 命令与配置示例

```text
/side 这个重构方案有没有更简单的替代？
/btw 顺便检查一下测试覆盖率
Cmd+K → 输入 "Router" → 选择匹配对话
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Side Chats | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Conversation Search | ⚠️ 未实测 |
| Changelog 3.11 | ✅ |

### 问题与解决方案

**Side chat 不继承上下文**：确认 ≥ 3.11。**搜索无结果**：等待本地索引首次构建完成。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度 Agent 用户 | 善用 Side Chat 避免主线程污染 |
| Tech Lead | side chat 做架构 sanity-check，结论 @mention 回主 PR |

---

## 特性四：Cloud Agent 对话级 Hooks（3.11）

### 是什么（机制说明）

3.11 新增对话级 hooks，观察和控制 Agent 对话本身：

| Hook | 用途 |
|------|------|
| `beforeSubmitPrompt` | 提交前拦截/修改/过滤敏感信息 |
| `afterAgentResponse` | 响应后审计/记录/webhook |
| `afterAgentThought` | 观察推理输出 |
| `stop` | turn 完成时触发 |
| `subagentStart` | 子 Agent 启动时控制工具集 |

与 Router 配合可实现「路由降本 + 合规审计」。

### 适用场景

- **适合**：企业合规流水线、自纠错循环、subagent 编排
- **不适合**：无 Team/Enterprise 计划的个人用户

### 前置条件

Cursor Teams 或 Enterprise；Cloud Agent 环境

### 详细使用步骤（业务用户）

1. Dashboard → Cloud Agent / Hooks 配置，或项目根创建 `.cursor/hooks.json`
2. 注册 `beforeSubmitPrompt` 过滤敏感信息
3. 注册 `afterAgentResponse` 归档日志
4. 注册 `subagentStart` 限制子 Agent 工具集
5. 启动 Cloud Agent 验证 hooks 触发

### 命令与配置示例

```json
{
  "hooks": [
    { "event": "beforeSubmitPrompt", "command": "node scripts/validate-prompt.js" },
    { "event": "afterAgentResponse", "command": "node scripts/log-response.js" },
    { "event": "subagentStart", "command": "node scripts/limit-subagent-tools.js" }
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent Hooks | ⚠️ 未实测 |
| Changelog 3.11 | ✅ |

### 问题与解决方案

**Hooks 不触发**：确认 `.cursor/hooks.json` 路径正确，在 Cloud 环境运行。**beforeSubmitPrompt 阻塞**：检查脚本退出码。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.11 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 平台工程师 | 构建自纠错循环与审计 pipeline |
| 安全团队 | `beforeSubmitPrompt` 过滤敏感信息 |

---

## 特性五：Slack 集成与 `.cursor/permissions.json`（7/17 + 持续有效）

### 是什么（机制说明）

**7/17 Slack 改进**：

1. **计划先行**：任务前分享执行计划，用户可早期纠偏
2. **多仓库环境**：named multi-repo environment + **Switch repository** 续跑
3. **跨频道工作流**：读取/发送其他频道上下文
4. **UI 精简**：footer 链接 + 分步状态更新

**`.cursor/permissions.json`**：定义 Cloud Agent 操作边界（文件读写、Shell/MCP），与 Router、Hooks 形成「远程执行 + 路由降本 + 权限控制」闭环。

### 适用场景

- **适合**：Slack 协作团队、多仓库微服务、需限制危险操作的远程自动化
- **不适合**：纯本地 IDE、单仓库简单项目

### 前置条件

Team/Enterprise + Slack 集成；仓库根 `.cursor/permissions.json`

### 详细使用步骤（业务用户）

1. Slack @Cursor 描述任务 → 审阅计划 → 确认或修正
2. Dashboard → Environments 配置 multi-repo environment
3. 执行中观察状态更新；跨频道拉取上下文
4. 项目根创建 `.cursor/permissions.json` 定义 allow/deny
5. Settings → Rules and Permissions → Edit permissions.json

### 命令与配置示例

```text
@Cursor 请审查 #1234 的 JWT 过期逻辑
@Cursor 计划里请加上单元测试，不要改 public API
```

```json
{
  "repos": [
    {"name": "frontend", "path": "/workspace/frontend"},
    {"name": "backend", "path": "/workspace/backend"}
  ]
}
```

```json
{
  "allow": ["read:**", "write:src/**", "bash:npm test", "bash:git status"],
  "deny": ["write:.env*", "bash:rm -rf*", "bash:curl*"]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Slack 集成 | ⚠️ 未实测 |
| permissions.json | ⚠️ 未实测 |
| Changelog 7/17 | ✅ |

### 问题与解决方案

**计划不出现**：确认 Slack 集成 ≥ 7/17。**Agent 操作被拒绝**：检查 permissions.json allow 规则。**permissions 不生效**：确认文件在 `.cursor/` 下。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 7/17 + Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Lead | multi-repo environment + 计划先行对齐任务 |
| 安全敏感项目 | 默认 deny-all，逐步放开 |

---

## 版本对照表

| 版本/日期 | 核心变更 |
|-----------|----------|
| **7/23/2026** | 无新 Changelog；Router 发布次日观察 |
| **7/22/2026** | Cursor Router（Intelligence/Balance/Cost） |
| 7/17/2026 | Slack 计划先行、多仓库、跨频道 |
| 3.11 (7/10) | Side Chats、Conversation Search、Cloud Agent Hooks |

## 今日研究员结论

Cursor 7/23 无新更新，**Cursor Router**（7/22）进入发布次日观察期。Teams/Enterprise 建议从 **Balance** 试用 1–2 周，监控 routed model 与账单；brownfield 质量 trade-off 社区仍在讨论。桌面与 Slack ⚠️ 未实测。permissions.json、Router Admin、Hooks 形成完整治理栈。
