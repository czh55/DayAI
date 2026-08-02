# Claude Code 每日技术文档 — 2026-08-02

> 本地实测版本：**2.1.220**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News](https://www.anthropic.com/news)、[GitHub Releases](https://github.com/anthropics/claude-code/releases)、[Okta Enterprise AI Index](https://www.okta.com/newsroom/articles/the-okta-enterprise-ai-index/)

## 今日综述

2026 年 8 月 2 日 Claude Code **无新版本发布**，npm `@latest` 与 Changelog 首条仍为 **2.1.220**（7/25 01:35 UTC，bug fixes and reliability improvements）。自 7/25 起已连续 **9 日**无功能迭代，进入维护冻结第 **9** 日。**Opus 5**（`claude-opus-5`）于 7/24 随 2.1.219 成为默认 Opus 模型，8/2 进入发布第 **10** 日。

行业叙事焦点转向 **Okta Enterprise AI Index**（8/1 发布）：Anthropic 以指数 100 位列企业 AI 应用增速第一，Claude Code 被报告标注为关键增长引擎（GA 2025/5）。Boris Cherny Harness 哲学余温仍在（[china-media.md](./china-media.md)）；DeepSeek V4-Flash 公测第 3 日（[china-ai.md](./china-ai.md)）；Codex **0.146.0** stable 第 5 日（[codex.md](./codex.md)）；Cursor iPad PR Review 第 5 日（[cursor.md](./cursor.md)）。

本地实测：`/workspace/tools/node_modules/.bin/claude --version` → `2.1.220 (Claude Code)`；⚠️ 无 API Key 未进行 Opus 5 推理、子智能体 spawn、沙箱网络及 MCP 连接实测。

---

## 特性一：Opus 5 第 10 日观察——`claude-opus-5`、1M context、`/effort` 与 `/fast`（7/24 起）

### 是什么（机制说明）

Opus 5（`claude-opus-5`）是 Anthropic 7/24 发布的前沿 Opus 模型，随 **2.1.219** 成为默认 Opus 选项；2.1.219 修复 `/model` 显示「Opus (1M context)」标签。核心能力：**1M context** 窗口；**effort 调速**（low/medium/high/xhigh）；**Fast mode**（`/fast`，约 2.5x 速度、2x 价格 $10/$50 per Mtok）；API 标准定价 $5/$25 per Mtok。8/2 第 10 日 CLI 无变更；Okta 指数将 Anthropic 企业增速与 Claude Code Agent 范式关联（[industry.md](./industry.md)）。

### 适用场景

- **适合**：长程 Agent 编码、复杂推理、大型 monorepo、知识工作
- **不适合**：简单补全、成本极度敏感短请求、无需 1M context 的轻量任务

### 前置条件

Claude Code **2.1.219+**（建议 2.1.220）；Claude Max/Pro 或 API Key；Fast mode 需 Pro/Max

### 详细使用步骤（业务用户）

1. `claude --version` 确认 2.1.220；启动后 `/model` 选 **Opus (1M context)**
2. 日常 `/effort medium`；复杂 Agent `/effort xhigh`；紧急 `/fast`（2x 单价）
3. 非交互：`claude -p "任务" --model claude-opus-5`；模型换代后审计 CLAUDE.md 对齐 Boris「做减法」

### 命令与配置示例

```bash
> /model
> /effort medium
> /fast
claude -p "Refactor auth module" --model claude-opus-5 --effort high
```

```json
{ "model": "claude-opus-5", "effort": "medium", "fastMode": false }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude --version` | ✅ `2.1.220 (Claude Code)` |
| `/model` `/effort` `/fast` | ✅ help 可见 |
| Opus 5 推理 / Fast mode | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**看不到 Opus 5**：确认版本 ≥ 2.1.219 与订阅 tier；Enterprise 需 Admin 启用。**effort 无效或成本超预期**：确认模型为 `claude-opus-5`；避免日常用 xhigh/fast。**API model not found**：ID 为 `claude-opus-5`；检查区域与 Bedrock 接入。**旧 Harness 拖后腿**：模型升级后精简 CLAUDE.md，勿堆叠 2024 年 Copilot 时代规则。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Anthropic News 7/24 | ✅ Opus 5 发布 |
| Changelog 2.1.219 | ✅ 默认 Opus |
| 8/2 更新 | ✅ 无 |
| Okta Index 8/1 | ✅ Anthropic 增速第一，Claude Code 为增长引擎 |
| Boris YC 访谈 | ✅ 删 80% prompt |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 默认 medium；复杂升 xhigh；季度审计 Harness |
| API 集成商 | 渐进迁移，定价不变；模型换代时重测验收标准 |
| 成本敏感 | 日常 Sonnet 5，Opus 仅关键任务 |
| 企业 Admin | 固化 effort 上限；配合 Harness 半年复审制度 |

---

## 特性二：嵌套子智能体 depth 3 与 `/loops`（2.1.219）

### 是什么（机制说明）

2.1.219 将子智能体嵌套 spawn 深度默认从 1 提升至 **3**（`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`）。depth-2+ 子智能体在 `--forward-subagent-text` 时可在 stream-json 输出中可见。`/loops` 与 background subagent 配合支持长程循环；`/code-review` 改为 background 运行。并发上限 `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` 默认 20。8/2 无变更；Okta 报告 Agentic 范式（Claude Code GA 2025/5）驱动企业增速，depth 3 是企业级多 Agent 工作流的基础设施。

### 适用场景

- **适合**：多 Agent 并行审查、Dynamic workflow、长程 bug 修复
- **不适合**：单文件小改动、资源受限环境

### 前置条件

Claude Code **2.1.219+**；建议配合 `--max-budget-usd`

### 详细使用步骤（业务用户）

1. 确认版本 ≥ 2.1.219；默认 depth 3，紧张时 `export CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=1`
2. `/loops` 设 max iterations；`/code-review` 自动 background
3. CI：`--forward-subagent-text` + `stream-json`；用测试/CI 结果验收而非逐行读子 Agent 输出

### 命令与配置示例

```bash
export CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH=3
export CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS=5
claude --max-budget-usd 10 -p "Review modules" --forward-subagent-text
```

```json
{ "CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH": 3, "CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS": 10 }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| depth 3 默认 | ✅ Release notes 确认 |
| `--forward-subagent-text` / `/loops` | ✅ flag 与斜杠命令可见 |
| 嵌套 spawn 实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**子智能体过多/费用失控**：降 `MAX_CONCURRENT_SUBAGENTS`；设 `--max-budget-usd`。**`/loops` 停不下来**：显式设 max iterations。**headless 无子 Agent 输出**：加 `--forward-subagent-text`；格式须 `stream-json`。**过度编排**：Boris 提醒 Unhobbling——depth 3 够用即可，勿为嵌套而嵌套。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| v2.1.219 Release | ✅ depth 3 |
| Changelog 2.1.218 | ✅ `/code-review` background |
| 8/2 更新 | ✅ 无变更 |
| Okta Agentic 时间线 | ✅ Claude Code GA 2025/5 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 复杂项目 | depth 3 + `/loops` + 测试验收 |
| 资源敏感 / CI | `SPAWN_DEPTH=1`；`--forward-subagent-text` 捕获日志 |

---

## 特性三：`sandbox.network.strictAllowlist` 与 `--safe-mode`（2.1.219）

### 是什么（机制说明）

2.1.219 新增 **`sandbox.network.strictAllowlist`**：沙箱命令访问非白名单主机**直接拒绝**，不弹权限提示。与 `sandbox.network.allowlist` 配合形成显式允许 + 严格模式。`**--safe-mode**` 启动额外安全层，限制 customizations，适合 CI 与高合规场景。8/2 无变更；Okta 指数显示企业采购加速，strictAllowlist 成企业采纳 Claude Code 的关键合规门槛。

### 适用场景

- **适合**：CI/CD、高合规企业、防 Agent 意外外联
- **不适合**：需 Agent 自由访问网络的本地探索开发

### 前置条件

Claude Code **2.1.219+**；沙箱已启用；已知所需域名清单

### 详细使用步骤（业务用户）

1. 列出 Agent 需访问的外部主机，编辑 `~/.claude/settings.json` 或 `.claude/settings.json`
2. 配置 `allowlist` 数组 + `strictAllowlist: true`；高合规用 `claude --safe-mode`
3. 验证：非白名单 `curl` 应被拒绝；配合 verification loop 跑测试而非信任 Agent 自述

### 命令与配置示例

```json
{
  "sandbox": {
    "network": {
      "allowlist": ["api.github.com", "registry.npmjs.org", "api.anthropic.com", "pypi.org"],
      "strictAllowlist": true
    }
  }
}
```

```bash
claude --safe-mode -p "Run tests in sandbox" --allowed-tools "Bash(npm test)"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--safe-mode` | ✅ help 可见 |
| strictAllowlist | ✅ Changelog 2.1.219 |
| 沙箱拒绝实测 | ⚠️ 未实测（无沙箱会话） |

### 问题与解决方案

**合法请求被拒**：补全 allowlist 子域名（如 `api.github.com` vs `github.com`）。**CI 仍弹窗卡住**：确认 `strictAllowlist: true`；CI 用 `--safe-mode`。**企业策略覆盖**：与 Admin 确认 managed settings 优先级。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.219 | ✅ strictAllowlist |
| Sandbox Docs | ✅ 配置格式 |
| 8/2 更新 | ✅ 无变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 / CI | strictAllowlist + 最小 allowlist；CI 用 `--safe-mode` |
| 个人 | 本地可关 strict，CI 启用 |

---

## 特性四：MCP `mcp_server_errors` 启动诊断（2.1.219）

### 是什么（机制说明）

2.1.219 增强 MCP 诊断：`claude mcp list` 与 `/mcp` 连接失败时显示 **HTTP 状态**与**错误文本**；对配置值隐藏首尾空白发警告。headless stream-json init 事件新增 **`mcp_server_errors`**，列出 `--mcp-config` 被跳过条目。`--strict-mcp-config` 仅使用指定 MCP 配置。8/2 无变更；Codex `codex-plugin-cc` 官方插件持续推动与 Claude Code 叠用（[codex.md](./codex.md)），MCP 治理成跨工具共性需求。

### 适用场景

- **适合**：多 MCP 集成、CI headless、企业 MCP 治理
- **不适合**：无 MCP 的简单会话

### 前置条件

Claude Code **2.1.219+**；MCP 服务器配置

### 详细使用步骤（业务用户）

1. `claude mcp add <name> -- <command> [args]`；`claude mcp list` 或 `/mcp` 检查状态
2. headless：检查 init 事件 `mcp_server_errors`；企业用 `--strict-mcp-config` 锁定配置源
3. 定期审计 MCP 列表——Boris「Harness 半年保质期」同样适用

### 命令与配置示例

```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /workspace
claude mcp list
claude --strict-mcp-config --mcp-config ~/.claude/mcp.json -p "List PRs"
```

```json
{ "mcpServers": { "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"] } } }
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude mcp list` / `--strict-mcp-config` | ✅ 命令与 flag 存在 |
| MCP 连接 / `mcp_server_errors` | ⚠️ 未配置 MCP / 未实测 headless |

### 问题与解决方案

**连接失败无细节**：升级 ≥ 2.1.219；手动运行 MCP command 排查。**CI 静默跳过 MCP**：检查 init 事件 `mcp_server_errors`；`${VAR}` 须在 startup env 注入。**隐藏空白字符**：编辑 mcp.json 去首尾空格。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.219 | ✅ mcp_server_errors |
| MCP Docs | ✅ mcp.json 格式 |
| 8/2 更新 | ✅ 无变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 集成商 / 企业 | CI 检查 `mcp_server_errors` 为零；`--strict-mcp-config` |
| 个人 | 从 filesystem MCP 起步 |

---

## 特性五：2.1.220 维护冻结第 9 日 + Okta 企业增速叙事

### 是什么（机制说明）

**2.1.220** 于 7/25 01:35 UTC 发布，Changelog 标注「bug fixes and reliability improvements」，无新功能。8/2 为 npm `@latest` **冻结第 9 日**。2.1.220 承载 2.1.219 全部能力（Opus 5、depth 3、strictAllowlist、MCP 诊断、workflowSizeGuideline medium），属稳定性补丁层。

并行行业叙事：**Okta Enterprise AI Index**（8/1）确认 Anthropic 为企业增速第一 AI 应用，Claude Code 被标注为 Agentic 范式关键节点（GA 2025/5）。Boris Cherny Harness 哲学（删 80% prompt、半年保质期）余温仍在（[china-media.md](./china-media.md)）。

### 适用场景

- **适合**：生产环境锁定稳定版、企业变更管控、模型换代时 Harness 审计
- **不适合**：急需未发布新功能、拒绝定期删减 rules 的团队

### 前置条件

npm 全局或项目本地安装；企业环境需确认 managed settings 锁定策略；CLAUDE.md / AGENTS.md 可编辑权限

### 详细使用步骤（业务用户）

1. `claude --version` 确认当前版本；升级 `npm install -g @anthropic-ai/claude-code@latest`（当前仍为 2.1.220）
2. 锁定：项目 `package.json` 固定 `"@anthropic-ai/claude-code": "2.1.220"`
3. **Harness 审计**（Boris 方法论）：列出 CLAUDE.md / rules 每条约束 → 逐条删除并跑回归测试 → 保留仅模型仍需要的条目
4. 监控 Changelog 等待 2.1.221+；staging 验证后升级

### 命令与配置示例

```bash
claude --version
npm view @anthropic-ai/claude-code version   # 2.1.220
npm install -g @anthropic-ai/claude-code@2.1.220
```

**Harness 审计**（每半年）：导出行数基线 → 删 20% 最旧规则并跑 CI → 通过则继续删、失败回滚 → 目标为同等任务集下规则总量下降。

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude --version` | ✅ `2.1.220 (Claude Code)` |
| npm `@latest` / Changelog 8/2 | ✅ 2.1.220，无新条目 |
| 升级路径 | ✅ `npm install -g` 可用 |
| Okta 增速第一 | ✅ 8/1 官方报告 |

### 问题与解决方案

**版本不一致**：全局与项目本地可能不同；用 `which claude` 定位。**误升旧版**：企业 managed settings 可能 pin 版本。**长期冻结担忧**：2.1.219→2.1.220 仅 bug fix，功能完整。**不敢删 Harness**：从非关键规则起步；用测试集替代「感觉会坏」的直觉。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.220 | ✅ 7/25 发布 |
| npm registry / GitHub Releases | ✅ `@latest` = 2.1.220，8/2 无新 tag |
| Okta Enterprise AI Index | ✅ Anthropic 增速第一 |
| 昨日（[../2026-08-01/claude-code.md](../2026-08-01/claude-code.md)） | ✅ 冻结第 8→9 日 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 / CI | 锁定 2.1.220；`package-lock.json` 固定版本 |
| 企业 Admin | pin 策略 + 半年 Harness 复审 |
| 规则维护者 | Boris 减法：少写 prompt、多写测试 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 要点 |
|------|----------------|------|
| **2.1.220** | 2026-07-25 01:35 | Bug fixes and reliability improvements（**当前 `@latest`，冻结第 9 日**） |
| 2.1.219 | 2026-07-24 | Opus 5、depth 3、strictAllowlist、MCP 诊断、workflowSizeGuideline medium |
| 2.1.218 | 2026-07-23 | `/code-review` background、`context: fork` 后台 |
| 2.1.217 | 2026-07-22 | 并发子智能体上限、多项修复 |
| 2.1.216 | 2026-07-21 | 维护与稳定性更新 |

## 今日研究员结论

Claude Code 8/2 处于 **2.1.220 维护冻结第 9 日**，无新版本。Opus 5 第 **10** 日 CLI 无变更。**今日最大增量不在 Changelog，而在 Okta 企业增速数据**：Anthropic 增速第一印证 Claude Code Agent 范式的企业采纳加速。建议巩固：`/model`+`/effort`+`/fast`、depth 3+`/loops`、strictAllowlist+`--safe-mode`、MCP `mcp_server_errors`、Harness 半年审计。竞品 Codex 0.146 第 5 日（[codex.md](./codex.md)）、Cursor iPad 第 5 日（[cursor.md](./cursor.md)）。生产保持 2.1.220，关注 2.1.221+。推理级功能 ⚠️ 未实测（无 API Key）。昨日见 [../2026-08-01/claude-code.md](../2026-08-01/claude-code.md)。
