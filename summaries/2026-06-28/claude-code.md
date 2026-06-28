# Claude Code 每日技术文档 — 2026-06-28

> 本地实测版本：**2.1.195**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News](https://www.anthropic.com/news)

## 今日综述

2026 年 6 月 28 日本地实测 **2.1.195**（npm `@anthropic-ai/claude-code@latest`，**与昨日 2.1.195 无变化**）。Anthropic 官方 **6/28 无新产品发布**（最近 Claude Tag @ 6/23）；Changelog **维护线延续**。行业侧：微软 E+D 部门 Copilot CLI 迁移倒计时 **剩 2 天**（**6/30** 截止）——内部数千工程师须从 Claude Code 切换至 GitHub Copilot CLI，外部订阅不受影响。维护线重点：`autoMode.classifyAllShell`、OTel Assistant 响应日志、`/rewind`、`/loops`、MCP 可靠性、`sandbox.credentials`、`--safe-mode`。

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

- **适合**：企业合规审计、Loop/`/loops` 成本监控、多 subagent 调试
- **不适合**：无 OTel 基础设施的个人用户

### 前置条件

- Claude Code ≥ 2.1.193；OTel collector 已部署

### 详细使用步骤（业务用户）

1. 部署 OTel collector 并配置 exporter endpoint
2. 启动 `claude` 交互或 `-p` 会话，执行含 tool call 的 Agent 任务
3. 在可观测平台查看 assistant response spans
4. 建立 dashboard：token/turn 趋势、tool 失败率

### 命令与配置示例

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="https://otel-collector.example.com:4318"
export OTEL_SERVICE_NAME="claude-code-dev"
export OTEL_LOG_ASSISTANT_RESPONSES=1
claude
```

```json
{ "telemetry": { "enabled": true, "exporter": "otlp" } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI `--version` / `--help` | ✅ 2.1.195 正常 |
| Changelog OTel 条目 | ✅ 确认 |
| OTel exporter 实测 | ⚠️ 未实测（无 API Key + 无 collector） |

### 问题与解决方案

**spans 未出现**：验证 endpoint 可达；确认 `telemetry.enabled=true`。**敏感内容泄露**：配置 redaction；设 `OTEL_LOG_ASSISTANT_RESPONSES=0`。**Loop span 过多**：降低采样率；按 service name 分环境。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog](https://code.claude.com/docs/en/changelog.md) | ✅ OTel logging |
| 虎嗅 Loop 成本 | ✅ 可观测性为 Loop 前置条件 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 平台工程 | OTel 纳入企业 rollout 标准 |
| 小团队 | 先用 `tee` 日志，再迁移 OTel |
| 合规 | 审计响应是否含 secret 后再全量导出 |

---

## 特性三：`/loops` — 会话内循环 Agent（2.1.181+）

### 是什么（机制说明）

**`/loops`** 在 **同一会话内** 循环执行任务，保留上下文、MCP 连接与 permissions，优于 shell 包裹 `claude -p`。Boris Cherny 工作流核心，与 Cursor Automations cron、Codex `/goal` 同属 Loop Engineering。支持最小 1 分钟间隔、最长 3 天、绑定当前会话（关终端即停）。

### 适用场景

- **适合**：夜间修复 flaky tests、周期代码审查、长程重构
- **不适合**：一次性短任务；无 permissions 管控的高风险仓库

### 前置条件

- Claude Code ≥ 2.1.181；建议 ≥ 2.1.195 以获 classifyAllShell + OTel

### 详细使用步骤（业务用户）

1. 启动 `claude`，`/config effort=high` 设置 effort
2. 输入 `/loops` 配置周期任务与停止条件
3. 观察 loop 迭代；误操作时用 `/rewind` 恢复
4. 企业 cron：`claude -p "Run /loops: fix flaky tests"`

### 命令与配置示例

```
/config effort=high
/loops
```

```bash
0 2 * * * cd /project && claude -p "Run /loops: fix flaky tests"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI `--version` / `--help` | ✅ 2.1.195 |
| Changelog `/loops` | ✅ 2.1.181+ 确认 |
| loop 实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**loop 丢上下文**：用 `/loops` 非 `claude -p` 包裹；避免中途 `/clear`。**Token 成本飙升**：设 effort=medium；配合 OTel 监控。**误操作破坏性命令**：启用 classifyAllShell + permissions deny。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog](https://code.claude.com/docs/en/changelog.md) 2.1.181 | ✅ `/loops` |
| 虎嗅 Loop 工程 | ✅ Boris `/loops` 工作流 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 先小范围 loop，再扩大任务 |
| DevOps | cron + OTel + sandbox.credentials |
| 企业 | loop 前同步 permissions 与 OTel 采样策略 |

---

## 特性四：`/model` 与 `fallbackModel` — 模型选择与降级（维护线）

### 是什么（机制说明）

`/model` 命令与 `--model` flag 切换当前会话模型；`fallbackModel` 设置主模型不可用时的降级路径。2.1.193 修复 `/model` 在 `/login` 后显示 stale/empty 状态。常见组合：Opus 规划 + Sonnet 执行（虎嗅/InfoQ 报道 Anthropic 简化 Harness 趋势）。

### 适用场景

- **适合**：按任务切换模型；企业 org 限制模型时查看可用列表
- **不适合**：无多模型订阅的用户

### 前置条件

- 有效 Anthropic 订阅；Claude Code ≥ 2.1.193（`/login` 后 UI 修复）

### 详细使用步骤（业务用户）

1. 会话内输入 `/model` 打开模型选择器
2. 选择目标模型（如 `claude-opus-4-8`）
3. settings 配置 `fallbackModel` 作为降级
4. 企业 org 限制时查看「restricted by your organization's settings」提示

### 命令与配置示例

```
/model
```

```bash
claude --model claude-sonnet-4-6
```

```json
{
  "model": "claude-opus-4-8",
  "fallbackModel": "claude-sonnet-4-6"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI `--version` / `--help` | ✅ 2.1.195 |
| `/model` in help | ✅ 确认 |
| 模型切换实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**`/login` 后 `/model` 空白**：升级 ≥ 2.1.193。**org 限制**：联系管理员调整 allowed models。**降级未触发**：确认 `fallbackModel` 在 settings 正确层级。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog](https://code.claude.com/docs/en/changelog.md) 2.1.193 | ✅ `/model` 修复 |
| InfoQ Opus+Sonnet 组合 | ✅ 社区实践一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 成本敏感 | Sonnet 执行 + Opus 仅规划 |
| 企业 | org 限制 + fallbackModel 兜底 |
| Loop 用户 | loop 前固定模型避免中途切换 |

---

## 特性五：`sandbox.credentials` 与 `--safe-mode` — 安全沙箱与排障（2.1.170+ / 2.1.187+）

### 是什么（机制说明）

**`sandbox.credentials`**（2.1.187）：沙箱内命令无法读取 `.env`、`~/.aws/credentials` 及 secret env。**`--safe-mode`**（2.1.170+）：禁用 CLAUDE.md、plugins、skills、hooks、MCP，用于排障与不可信仓库审计。

### 适用场景

- **sandbox.credentials**：CI/Cloud Agent、不可信代码库、fork PR 审查
- **--safe-mode**：排障、审计 fork、CVE 响应

### 前置条件

- sandbox：≥ 2.1.187；safe-mode：≥ 2.1.170

### 详细使用步骤（业务用户）

1. settings 启用 `sandbox.credentials`
2. 异常时 `claude --safe-mode` 隔离 hooks/MCP 问题
3. 排查完成后关闭 safe-mode

### 命令与配置示例

```json
{ "sandbox": { "credentials": true } }
```

```bash
claude --safe-mode
export CLAUDE_CODE_SAFE_MODE=1
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI `--version` / `--help` | ✅ 2.1.195 |
| `--safe-mode` in help | ✅ 确认 |
| 沙箱隔离实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**仍需 .env 非 secret 变量**：通过 CLAUDE.md 显式注入。**safe-mode 仍加载 MCP**：检查 env 覆盖。**凭证仍被读取**：确认 sandbox 模式已启用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Changelog](https://code.claude.com/docs/en/changelog.md) | ✅ |
| 微软迁移案例 | ✅ 企业倾向可控平台 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 默认 `sandbox.credentials` |
| 安全审查 | 不可信仓库必 `--safe-mode` |
| 排障 | safe-mode 二分法定位 hooks/MCP |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 2.1.195 | 6/26–28 实测 | npm @latest **无变化**；维护线特性齐全 |
| 2.1.193 | 6/25 | classifyAllShell、OTel |
| 2.1.187 | 6/23 | `sandbox.credentials` |
| 2.1.181 | 6/18 | `/loops` |

## 今日研究员结论

Claude Code 6/28 为 **版本冻结维护日**：npm @latest 仍为 **2.1.195**。微软 E+D **6/30 迁移 Copilot CLI 剩 2 天**——外部开发者不受影响，但预示企业采购更倾向「可控 CLI 平台」。本地 CLI **`--version` / `--help` 正常**；推理 **未实测（无 API Key）**。建议保持 2.1.195；`/loops` 前同步 OTel + `sandbox.credentials`。详见 [Changelog](https://code.claude.com/docs/en/changelog.md)。
