# Claude Code 每日技术文档 — 2026-07-06

> 本地实测版本：**2.1.201**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)、[Models Overview](https://docs.anthropic.com/en/docs/about-claude/models/overview)

## 今日综述

2026 年 7 月 6 日 npm `@anthropic-ai/claude-code@latest` 实测仍为 **2.1.201**（**7/6 无新 patch 晋升 @latest**；2.1.201 首发 **7/3 20:52 UTC**）。`dist-tags`：`latest=2.1.201`、`next=2.1.202`（未推广为默认）。CLI 进入 **维护消化日**：2.1.201 Sonnet 5 harness 修复 + 2.1.200 Manual 默认与 background agent 修复包继续生效。

**倒计时**：Fable 5 周额度 **明日 7/7（UTC）截止** → 之后需 **usage credits** 按 **$10/$50 per Mtok**（[Models Overview](https://docs.anthropic.com/en/docs/about-claude/models/overview)）。今日应盘点剩余额度并规划 7/8 后模型路由。

---

## 特性一：Fable 5 周额度截止与 usage credits（明日 7/7）

### 是什么（机制说明）

[Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)：Pro/Max/Team 及部分 Enterprise 席位 **至 2026-07-07** 可将每周用量 **50%** 用于 Fable 5 且不额外计费。7/7 后脱离订阅额度，须 **usage credits**（Settings → Usage），费率同 API：**$10/input Mtok、$50/output Mtok**。配备四类网络安全分类器；触发 safety margin 可 **降级 Opus 4.8**（[Fable Safeguards & CJS](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)）。

### 适用场景

- **适合**：7/6 用尽周额度做高难 SWE、长程迁移
- **不适合**：未评估 credits 就长期默认 Fable 5；频繁误拦的日常调试

### 前置条件

- Claude Code ≥ 2.1.197；Pro/Max/Team 席位
- 7/8 起：控制台启用 usage credits

### 详细使用步骤（业务用户）

1. 查看本周 Fable 5 消耗；`/model` 选 Fable 5 跑高价值任务
2. 7/7 前夜：Settings → Usage 启用 credits
3. 7/8 起日常 Sonnet 5；降级频繁则换模型或改 prompt

### 命令与配置示例

```bash
/model   # claude-fable-5
claude --model claude-fable-5 -p "Refactor auth with tests"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `2.1.201 (Claude Code)` |
| `/model` Fable 5 | ⚠️ 未实测（无 API Key） |
| 周额度 / credits | ⚠️ 以控制台为准 |

### 问题与解决方案

**7/7 后无法选 Fable 5**：启用 credits。**账单超预期**：配合 `/effort` 与 caching。**频繁降级**：换 Sonnet 5。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Redeploying Fable 5 7/7 截止 | ✅ |
| Models Overview $10/$50 | ✅ |
| 虎嗅/36氪误拦报道 | ⚠️ 体验痛点，机制与官方一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Fable 重度用户 | 今日用尽额度；今夜配 credits |
| 成本敏感者 | 7/8 起默认 Sonnet 5 |
| 企业管理员 | 下发 credits 预算与模型策略 |

---

## 特性二：Sonnet 5 Harness Reminder 修复（2.1.201）

### 是什么（机制说明）

2.1.201（[Changelog](https://code.claude.com/docs/en/changelog.md) 首条）：Sonnet 5 的 **harness reminder** 不再以 **mid-conversation system role** 注入，修复长会话 system 消息与上下文混淆、异常 tool call 模式。单条维护修复；2.1.200 变更均继承。

### 适用场景

- **适合**：Sonnet 5 长会话、多 subagent、20+ 轮工具调用
- **不适合**：无 harness 问题却锁旧版（仍建议 2.1.201）

### 前置条件

- Claude Code ≥ 2.1.201；Sonnet 5 为当前模型

### 详细使用步骤（业务用户）

1. `npm install @anthropic-ai/claude-code@latest`；验证 `2.1.201`
2. 跑长程 agentic 任务；异常时 `/clear` 或 `/context`

### 命令与配置示例

```bash
claude --version
claude -p "Summarize repo" --model claude-sonnet-5
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `2.1.201 (Claude Code)` |
| `--help` 前 5 行 | ✅ 正常 |
| harness 长会话 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**仍丢上下文**：查 auto-compaction、用 `/rewind`。**回退 2.1.200**：不推荐。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.201 | ✅ |
| npm `@latest` 7/6 | ✅ 仍为 2.1.201 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Sonnet 5 用户 | 保持 2.1.201 |
| 企业管理员 | org 最低版本 ≥ 2.1.201 |

---

## 特性三：Manual 默认权限（2.1.200）

### 是什么（机制说明）

2.1.200：**「default」→「Manual」** 为默认权限模式（CLI、VS Code、JetBrains 统一）。Bash/Write/MCP 等需 **显式批准**。`AskUserQuestion` 默认 **不再 idle 自动继续**；旧行为须在 `/config` 启用 timeout。`bypassPermissions` 仍需 `--dangerously-skip-permissions`。

### 适用场景

- **适合**：企业代码库、需审计工具调用的团队
- **不适合**：追求无人值守 auto-run 的快速原型

### 前置条件

- Claude Code ≥ 2.1.200（2.1.201 继承）

### 详细使用步骤（业务用户）

1. 观察 Manual 批准对话框；`/config` 调整权限与 timeout
2. 企业下发 `.claude/settings.json` 的 `defaultMode`

### 命令与配置示例

```bash
claude --permission-mode manual -p "List src/"
```

```json
{ "defaultMode": "manual" }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--help` permission flags | ✅ 可见 |
| Manual 实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**变慢**：`acceptEdits` 或 rules。**恢复 auto-continue**：`/config` idle timeout。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.200 | ✅ Manual 默认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业开发者 | Manual + `.claude/rules/` |
| 个人用户 | `--permission-mode` 按需调整 |

---

## 特性四：Background Sub-agents 默认后台（2.1.200）

### 是什么（机制说明）

[Changelog](https://code.claude.com/docs/en/changelog.md)：**Subagents now run in the background by default**——主会话继续工作，完成时通知（gradual rollout 已全面默认）。含 **20+ 条** daemon handover、`daemon.lock`、Linux ~50s 自杀、SSH macOS audit、rate limit partial 返回等修复。permission prompt 现 **surfacing 到主会话**（Esc 仅拒该 agent 单次工具）。

### 适用场景

- **适合**：`claude agents`、`/background`、多 subagent 并行
- **不适合**：停留 2.1.196 且遇 daemon 问题

### 前置条件

- Claude Code ≥ 2.1.200；理解 Notification hook

### 详细使用步骤（业务用户）

1. `←` 或 `/background` 后台化；spawn subagent 默认后台运行
2. `claude agents` 查看 roster；异常时 `claude stop` 重启

### 命令与配置示例

```bash
claude agents
claude stop
/background
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ 2.1.201 |
| `claude agents` | ✅ `--help` 可见 |
| 后台长跑 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**Reconnecting**：升级 2.1.200+。**主会话弹窗增多**：background 权限 surfacing 属预期。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.200 | ✅ 多条 background 修复 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多 agent 用户 | 保持最新 patch |
| 新手 | Manual 下主会话仍须批准 subagent 工具 |

---

## 特性五：`/loop`、/model、`/effort` — 模型与成本

### 是什么（机制说明）

- **`/loop`**（别名 `/proactive`）：会话内按间隔循环执行（如 `/loop 5m check deploy`）；社区 Loop Engineering 常称 **`/loops`**。remote session 不推广（容器无法保活 pending loops）。
- **`/model`**：模型选择器；Org default、Fable 5、Sonnet 5 等；`s` 改当前会话，`d` 设新会话默认。
- **`/effort`**：推理努力程度；Sonnet 5 默认 **high**；CLI 支持 `--effort`。

Sonnet 5 促销 **$2/$10 per Mtok 至 8/31**（[Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)）；tokenizer 约 **1.0–1.35×** token。

### 适用场景

- **适合**：7/6 Fable 5 窗口；7/8 起 Sonnet 5 + `/effort medium`；夜间 `/loop` 巡检
- **不适合**：不评估 token 就 `/effort xhigh` + Fable 5

### 前置条件

- Claude Code ≥ 2.1.197；`/loop` 需 telemetry（Bedrock/Vertex 早期受限见 Changelog）

### 详细使用步骤（业务用户）

1. `/model` 选模型（7/6 可用 Fable 5）；`/effort` 调成本
2. `/loop 30m run tests`；7/8 前切回 Sonnet 5 默认

### 命令与配置示例

```bash
/model
/effort medium
/loop 1h check CI and open issues
claude --model claude-sonnet-5 --effort high -p "Implement X"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--help` `--model`/`--effort` | ✅ 可见 |
| 会话内切换 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**账单超预期**：自测 token。**`/loop` remote 不可用**：用本地会话。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog `/loop` | ✅ |
| Sonnet 5 tokenizer | ✅ 1.0–1.35× |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Loop 实践者 | `/loop` + Manual + 成本监控 |
| Fable 用户 | 今日最后一天周额度窗口 |

---

## 特性六：`--safe-mode` 与 MCP 排障

### 是什么（机制说明）

**`--safe-mode`**（`CLAUDE_CODE_SAFE_MODE`）：禁用 `CLAUDE.md`、plugins、skills、hooks、**MCP**；auth/model/permissions 仍正常。用于排障自定义配置。

**MCP**：`claude mcp` 管理 server；2.1.201 修复 `.claude.json` 非数组 MCP 配置致崩溃；2.1.200 起 untrusted workspace 显示 `⏸ Pending approval`。

### 适用场景

- **适合**：升级崩溃、MCP OAuth 失败、plugin 冲突
- **不适合**：日常开发（无 MCP/CLAUDE.md 增强）

### 前置条件

- Claude Code ≥ 2.1.201

### 详细使用步骤（业务用户）

1. 崩溃时 `claude --safe-mode` 二分排查
2. `claude mcp list` 批准 pending server；排障后去掉 safe-mode

### 命令与配置示例

```bash
claude --safe-mode
claude mcp list
claude --mcp-config ./mcp.json --strict-mcp-config -p "Query"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--help` `--safe-mode` | ✅ 可见 |
| MCP OAuth | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**safe-mode 仍崩溃**：查 Node/网络。**MCP pending**：显式批准 workspace。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog safe-mode / MCP | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 排障工程师 | safe-mode 为第一诊断步 |
| 日常开发者 | 排障后恢复 MCP |

---

## 版本对照表

| 版本 | 发布 (UTC) | npm tag | 要点 |
|------|------------|---------|------|
| **2.1.201** | 7/3 20:52 | **@latest** | Sonnet 5 harness 修复 |
| 2.1.202 | 7/6 20:41 | `next` | 未晋升 @latest |
| 2.1.200 | 7/3 04:33 | — | Manual 默认、background 大修复 |
| 2.1.197 | 6/30 | — | Sonnet 5 默认 |

## 今日研究员结论

7/6 为 **CLI 维护消化日**：`@latest` 连续第 3 日 **2.1.201**。2.1.200 **Manual 默认** 与 **background subagent 默认后台** 应已消化；2.1.201 harness 修复值得保持。

**明日 7/7**：Fable 5 周额度关闭 → **usage credits $10/$50 per Mtok**。今日用尽额度；今夜启用 credits；7/8 起日常 Sonnet 5。本地 **`--version`/`--help` 正常**；推理 **未实测（无 API Key）⚠️**。
