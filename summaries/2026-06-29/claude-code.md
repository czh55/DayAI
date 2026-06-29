# Claude Code 每日技术文档 — 2026-06-29

> 本地实测版本：**2.1.195**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News](https://www.anthropic.com/news)

## 今日综述

2026 年 6 月 29 日本地实测 **2.1.195**（npm `@anthropic-ai/claude-code@latest`，**与昨日无变化**）。Anthropic 官方 **6/29 无新产品发布**（最近 Claude Tag @ 6/23）；Changelog **维护线延续**。行业侧：微软 E+D 部门 Copilot CLI 迁移倒计时 **剩最后 1 天**（**6/30** 截止）——内部数千工程师须从 Claude Code 切换至 GitHub Copilot CLI，外部订阅不受影响。维护线重点：`autoMode.classifyAllShell`、OTel Assistant 响应日志、`/rewind`、`/loops`、MCP 可靠性、`sandbox.credentials`、`--safe-mode`。

---

## 特性一：`autoMode.classifyAllShell` — Auto Mode 全 Shell 分类（近期 Changelog）

### 是什么（机制说明）

`autoMode.classifyAllShell` 将 auto mode 下 Shell 命令安全分类从「部分破坏性命令（arbitrary-code-execution patterns）」扩展为 **全量 Bash/PowerShell 分类**，再决定确认或拦截。与 2.1.181 起对 `git reset --hard`、`terraform destroy` 等的拦截一脉相承；2.1.185+ 在 subagent spawn 前亦运行分类器。降低夜间 `/loops` 自主运行时的误操作风险。

### 适用场景

- **适合**：企业 auto mode 流水线、夜间 `/loops`、CI 无人值守 Agent
- **不适合**：需频繁高风险命令且不愿确认的场景（应关闭 auto mode 或显式 permissions）

### 前置条件

- Claude Code ≥ 2.1.190；auto mode 已启用；可选 `permissions.json` 双层管控

### 详细使用步骤（业务用户）

1. `claude --version` 确认 2.1.195
2. **Settings → Auto Mode** 或 `/config` 启用 auto mode
3. 发起低监督任务，观察 Shell 执行前确认/拦截
4. 需放行时在 prompt 明确授权或添加 allow 规则
5. 夜间 loop：结合 `/loops` + permissions deny

### 命令与配置示例

```json
{ "autoMode": { "classifyAllShell": true } }
```

```json
{ "permissions": { "deny": ["Bash(git reset --hard:*)", "Bash(terraform destroy:*)"] } }
```

```bash
claude --safe-mode "Refactor the auth module with tests"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI `--version` / `--help` | ✅ 2.1.195 |
| Changelog 条目 | ✅ 确认 `classifyAllShell` |
| auto mode 拦截实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**误拦截**：prompt 明确意图；检查 deny 规则是否过宽。**未拦截**：确认 auto mode 开启；勿用 `--allow-dangerously-skip-permissions`。**subagent 绕过**：升级 2.1.185+ 确保 spawn 前分类。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog](https://code.claude.com/docs/en/changelog.md) | ✅ classifyAllShell |
| InfoQ Loop 工程 | ✅ auto mode 与 `/loops` 叙事一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 SRE | auto mode + classifyAllShell + 默认 deny |
| 个人开发者 | 明确授权破坏性操作 |
| 夜间 loop 用户 | permissions.json 双重保险 |

---

## 特性二：OTel Assistant 响应日志 — OpenTelemetry 可观测性（近期 Changelog）

### 是什么（机制说明）

新增 **OpenTelemetry Assistant 响应日志**（`claude_code.assistant_response`），将 Agent assistant 响应结构化导出至 OTel 兼容后端。解决 Loop 时代 Token 成本 3–8 倍、长程 Agent 难审计痛点——团队可追踪 latency、token 用量、tool call 链路。注意：若已启用 `OTEL_LOG_USER_PROMPTS`，升级后默认亦导出响应内容；设 `OTEL_LOG_ASSISTANT_RESPONSES=0` 可保持仅 prompt。

### 适用场景

- **适合**：企业合规审计、Loop 成本分析、多 subagent 链路追踪
- **不适合**：无 OTel 基础设施的个人用户（可用本地 transcript 替代）

### 前置条件

- Claude Code ≥ 2.1.190；OTel collector 或兼容后端（Jaeger、Datadog 等）

### 详细使用步骤（业务用户）

1. 配置 OTel 环境变量
2. 启动 Claude Code 会话
3. 在 OTel 后端搜索 `claude_code.assistant_response` 事件
4. 设 `OTEL_LOG_ASSISTANT_RESPONSES=0` 若仅需 prompt 日志

### 命令与配置示例

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_LOG_USER_PROMPTS=1
export OTEL_LOG_ASSISTANT_RESPONSES=1
claude
```

```bash
# 仅 prompt，不导出响应
export OTEL_LOG_ASSISTANT_RESPONSES=0
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 条目 | ✅ `claude_code.assistant_response` |
| OTel 导出实测 | ⚠️ 未实测（无 API Key + 无 collector） |

### 问题与解决方案

**升级后意外导出响应**：设 `OTEL_LOG_ASSISTANT_RESPONSES=0`。**无事件**：确认 OTel endpoint 可达；检查 exporter 配置。**敏感数据泄露**：生产环境默认关闭 `OTEL_LOG_ASSISTANT_RESPONSES`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ 官方新增 |
| 虎嗅 Loop 成本讨论 | ✅ 可观测性为社区痛点，OTel 为官方回应 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 平台工程师 | 接入 OTel，设 Token 预算告警 |
| 合规团队 | 审计响应日志，注意 PII 脱敏 |
| 个人用户 | 可跳过，用 `--print` 本地日志 |

---

## 特性三：`/loops` — 原生循环自动化（近期 Changelog）

### 是什么（机制说明）

`/loops` 在 **持续存在的 Claude Code 会话** 中运行循环任务，保留上下文窗口、工具权限与 MCP 连接——区别于外部 cron 包裹 `claude -p` 的「冷启动」模式。支持最长 3 天运行、可禁用、绑定当前会话。InfoQ 将其与 Loop Engineering 范式关联：Boris Cherny 分享「夜间运行数千 Agent」工作流的核心基础设施。

### 适用场景

- **适合**：每日报告生成、CI 巡检、定时代码审查、长期重构
- **不适合**：需完全隔离的单次任务（用 `claude -p` 或外部 cron）

### 前置条件

- Claude Code ≥ 2.1.170；API Key 或订阅；建议配合 permissions.json

### 详细使用步骤（业务用户）

1. 启动 Claude Code 交互会话
2. 输入 `/loops` 创建循环
3. 配置间隔、停止条件、任务描述
4. `/loops list` 查看活跃循环
5. `/loops stop <id>` 终止指定循环

### 命令与配置示例

```bash
# 在 Claude Code 会话内
/loops create --interval 1h --task "Run npm test and fix failures"
/loops list
/loops stop loop-abc123
```

```json
{
  "permissions": {
    "deny": ["Bash(rm -rf:*)", "Bash(git push --force:*)"]
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog `/loops` 条目 | ✅ 确认 |
| 循环创建实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**循环失控**：设 Token 预算；用 permissions deny 限制破坏性命令。**上下文膨胀**：定期 `/clear` 或设较短 interval。**MCP 断连**：Loops 绑定会话，确保 MCP 在会话启动时已认证。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ `/loops` 原生支持 |
| InfoQ Boris Cherny | ✅ 夜间数千 Agent 叙事 |
| Codex CLI | ⚠️ Codex 无对等原生 loop 命令 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 从小范围 cron（如每日文档）验证 ROI |
| 团队 Lead | 设 permissions + OTel 监控 |
| 成本敏感用户 | 注意虎嗅报道 3–8 倍 Token 消耗 |

---

## 特性四：`/model` 与 `fallbackModel` — 模型选择与降级（近期 Changelog）

### 是什么（机制说明）

`/model` 命令切换当前会话模型；`fallbackModel` 设置主模型不可用时的降级目标。2.1.195 维护线修复 `/model` 在 `/login` 后显示 stale 状态、版本标签与 `ANTHROPIC_DEFAULT_SONNET_MODEL` 不一致等问题。组织可通过 `availableModels` allowlist 限制可选模型。

### 适用场景

- **适合**：多模型 A/B 测试、成本优化（Sonnet vs Opus）、组织合规限制
- **不适合**：已 pin 单一模型的 CI 流水线（用 `ANTHROPIC_MODEL` 环境变量）

### 前置条件

- 有效订阅或 API Key；模型访问权限

### 详细使用步骤（业务用户）

1. 会话内输入 `/model`
2. 从 picker 选择目标模型（Opus / Sonnet / Haiku 等）
3. 或在 settings.json 设 `fallbackModel`
4. CI 场景用 `ANTHROPIC_MODEL=claude-sonnet-4-20250514 claude -p "..."`

### 命令与配置示例

```bash
# 交互会话
/model
```

```json
{
  "model": "claude-opus-4-20250514",
  "fallbackModel": "claude-sonnet-4-20250514"
}
```

```bash
ANTHROPIC_MODEL=claude-sonnet-4-20250514 claude -p "Summarize this repo"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--help` 列出 `/model` | ✅ |
| 模型切换实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**picker 为空**：检查 `availableModels` allowlist 与组织策略。**fallback 未触发**：确认主模型确实不可用（非速率限制误判）。**版本标签错误**：升级至 2.1.195 修复 stale 显示。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ `/model` 修复条目 |
| Anthropic News Fable 5 | ✅ 2.1.170+ 支持 Fable 5 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发 | Sonnet 默认，复杂任务切 Opus |
| 企业 | allowlist + fallbackModel 双层 |
| CI | 环境变量 pin，避免交互 picker |

---

## 特性五：MCP 登录 CLI 与可靠性增强（近期 Changelog）

### 是什么（机制说明）

2.1.195 维护线新增 `claude mcp login <server>` / `claude mcp logout <server>` CLI 命令，支持 `--no-browser` 在 SSH 环境完成 OAuth。MCP 能力发现（`tools/list` 等）对瞬态网络错误增加短 backoff 重试；OAuth 发现与 token 请求亦重试一次。`headersHelper` auth 在 401/403 时自动重跑并重连。

### 适用场景

- **适合**：SSH 远程开发、headless CI、多 MCP server 管理
- **不适合**：仅本地 stdio MCP 且无需认证的场景

### 前置条件

- Claude Code ≥ 2.1.190；MCP server 配置于 `.claude/settings.json` 或项目 settings

### 详细使用步骤（业务用户）

1. 配置 MCP server 于 settings
2. `claude mcp login <server-name>` 认证
3. SSH 环境加 `--no-browser`，按提示粘贴 URL
4. 会话内 `/mcp` 验证连接状态

### 命令与配置示例

```bash
claude mcp login brave-search
claude mcp login github --no-browser
claude mcp get brave-search
```

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": { "BRAVE_API_KEY": "..." }
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude mcp --help` | ✅ 命令存在 |
| MCP 连接实测 | ⚠️ 未实测（无 API Key + 无 MCP server） |

### 问题与解决方案

**OAuth 循环**：用 `--no-browser` 手动粘贴。**401 未自动重连**：确认 `headersHelper` 配置；升级至最新版。**工具列表为空**：检查 server 启动命令与 env 变量。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ mcp login/logout、重试机制 |
| MCP 官方 spec | ✅ OAuth 流程兼容 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 远程开发者 | `mcp login --no-browser` 标准流程 |
| 团队 | 统一 MCP 配置于项目 settings |
| 安全团队 | 审计 MCP 权限与 OAuth scope |

---

## 版本对照表

| 版本 | 发布 | 关键变更 |
|------|------|----------|
| 2.1.195 | 维护线 | 当前 @latest；无 6/29 新 release |
| 2.1.170 | 2 月 | Claude Fable 5 支持 |
| 2.1.154+ | 1 月 | `/loops`、auto mode 增强 |

## 今日研究员结论

Claude Code 2.1.195 今日无版本变化，但 **微软 6/30 迁移截止** 使 Copilot CLI vs Claude Code 竞争成为行业焦点。维护线 OTel、`/loops`、MCP 可靠性持续强化 Loop/Harness 叙事。建议：外部用户不受影响；企业用户评估「可控平台」vs「最强 Agent」权衡；启用 `/loops` 前务必设 permissions + Token 预算。

---
