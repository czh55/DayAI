# OpenAI Codex 每日技术文档 — 2026-07-23

> 本地实测版本：**0.145.0**（stable）｜监测 alpha：**0.146.0-alpha.5**（7/23 20:02 UTC）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 23 日 Codex **稳定版仍为 0.145.0**（7/21 发布），npm `@latest` 未升级。GitHub 今日连发 **0.146.0-alpha.4**（00:46 UTC）与 **alpha.5**（20:02 UTC），自 7/22 起 alpha.1 至 alpha.5 共五版快速迭代，0.146.0 stable 发布在即。本地 CLI 实测：`codex --version` → `codex-cli 0.145.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host` 为 stable，`code_mode` 仍为 under development。生产环境继续锁定 0.145.0，alpha 仅用于隔离测试。

---

## 特性一：0.146.0-alpha 系列快速迭代（7/23 alpha.4、alpha.5）

### 是什么（机制说明）

自 7/22 起，Codex 进入 0.146.0 预发布冲刺期，两日连发五个 alpha 版本：

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| 0.146.0-alpha.1 | 2026-07-22 05:01 | Pre-release |
| 0.146.0-alpha.2 | 2026-07-22 07:22 | Pre-release |
| 0.146.0-alpha.3 | 2026-07-22 21:51 | Pre-release |
| **0.146.0-alpha.4** | **2026-07-23 00:46** | Pre-release |
| **0.146.0-alpha.5** | **2026-07-23 20:02** | Pre-release（最新） |

7/23 一日两版表明团队密集修复与验证，stable 可能数日内落地。npm `@latest` 始终指向 0.145.0，未跟随 alpha。

### 适用场景

- **适合**：早期采用者、CI 冒烟测试、评估 0.146.0 新能力
- **不适合**：生产环境、无回退预案的升级

### 前置条件

愿意承担 alpha 风险；建议容器或独立环境隔离

### 详细使用步骤（业务用户）

1. 确认 stable：`codex --version`（应为 0.145.0）
2. 隔离环境安装：`npm install -g @openai/codex@0.146.0-alpha.5`
3. 运行 `codex doctor` 与 `codex features list` 对比 stable 差异
4. 测试后回退：`npm install -g @openai/codex@0.145.0`

### 命令与配置示例

```bash
codex --version                    # codex-cli 0.145.0
npm install -g @openai/codex@0.146.0-alpha.5
codex features list | head -20
codex doctor
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.145.0` |
| alpha.4 / alpha.5 | ✅ 7/23 00:46 / 20:02 UTC |
| npm `@latest` | ✅ 仍为 0.145.0 |
| alpha.1–5 时间线 | ✅ 7/22–7/23 共五版 |

### 问题与解决方案

**alpha 行为异常**：回退 `npm install -g @openai/codex@0.145.0`。**release notes 为空**：查看 GitHub compare。**一日多版难跟踪**：锁定具体版本号，勿用浮动 `@alpha` 标签。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.5 | ✅ 7/23 20:02 UTC |
| npm `@latest` | ✅ 未跟随 alpha |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 继续 0.145.0 stable |
| 早期采用者 | 容器内测试 alpha.5 |
| CI/CD | 锁定 0.145.0，不自动升级 alpha |

---

## 特性二：`/import` 从 Cursor/Claude Code 迁移（0.145.0 stable）

### 是什么（机制说明）

0.145.0（7/21）扩展 `/import` 命令，可从 Cursor 和 Claude Code 迁移：设置、MCP 服务器、插件、会话、命令、项目级记忆。在 Fable 5 分层定价背景下，这是承接 Pro 用户分流的核心功能。7/23 无 stable 更新，但 `/import` 仍是当前版本最大亮点。

### 适用场景

- **适合**：从 Cursor/Claude Code 评估或迁移至 Codex 的用户
- **不适合**：全新安装且无迁移需求

### 前置条件

Codex 0.145.0+；源工具配置存在于默认路径

### 详细使用步骤（业务用户）

1. 安装：`npm install -g @openai/codex@latest`
2. 启动 `codex`，输入 `/import`
3. 选择源工具（Cursor 或 Claude Code）
4. 勾选迁移项：settings、MCP、plugins、commands、memories
5. 运行 `codex doctor` 验证 MCP 连接

### 命令与配置示例

```bash
codex
> /import
# Source: [Cursor | Claude Code]
# Items: [x] Settings [x] MCP [x] Plugins [x] Commands [x] Memories

codex doctor
codex features list | grep -i mcp
```

```toml
# ~/.codex/config.toml — 导入后检查
[mcp]
# 导入的 MCP 服务器

[plugins]
# 导入的插件配置
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/import` 功能 | ✅ 0.145.0 release notes 确认 |
| 实际迁移 | ⚠️ 未实测（无源工具本地配置） |

### 问题与解决方案

**MCP 连接失败**：`codex doctor` 后重新 OAuth 认证。**Sessions 不完整**：重要会话手动备份。**设置 schema 差异**：对比源工具字段，手动补全。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.145.0 Release | ✅ Expanded /import |
| GitHub PR #31672, #33411 | ✅ 确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Cursor 用户 | 迁移 MCP，并行测试 |
| Claude Code Pro | 迁移 commands，评估分流 |
| 团队 Lead | 制定迁移 SOP |

---

## 特性三：`codex doctor` 环境诊断（持续有效）

### 是什么（机制说明）

`codex doctor` 扫描本地安装、认证、MCP 连接、沙箱配置等，输出分级报告：**ok**（通过）、**warn**（警告）、**fail**（失败）。本地实测（7/23）：**12 ok · 1 warn · 4 fail**。Cloud Agent 无 API Key 时 4 fail 属预期；生产用户目标 **12+ ok、0 fail**。

### 适用场景

- **适合**：安装/升级后验证；`/import` 后检查 MCP；CI 健康门禁
- **不适合**：替代实际推理测试

### 前置条件

Codex CLI 已安装；建议 0.145.0+

### 详细使用步骤（业务用户）

1. 运行 `codex doctor`
2. 关注 warn 和 fail 项，按提示修复
3. 认证问题：`codex login` 或设置 `OPENAI_API_KEY`
4. 重新运行直至 fail 清零或确认为环境限制
5. 纳入升级 SOP：每次 `npm update` 后执行

### 命令与配置示例

```bash
codex doctor
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

codex doctor 2>&1 | tail -3

npm install -g @openai/codex@latest && codex --version && codex doctor
```

```toml
# ~/.codex/config.toml
model = "gpt-5.6-sol"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| 无 API Key 环境 | ✅ 4 fail 属预期 |
| 与 7/22 对比 | ✅ 结果一致 |

### 问题与解决方案

**4 fail 因无 API Key**：`codex login` 或设置环境变量。**MCP OAuth 过期**：按提示重新授权。**warn 持续**：通常非阻塞，查阅具体说明。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 7/23 | ✅ 12 ok · 1 warn · 4 fail |
| 本地实测 7/22 | ✅ 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 每次升级后运行 doctor |
| 迁移用户 | `/import` 后立即验证 |
| Cloud 环境 | 接受认证 fail，关注 ok 项 |

---

## 特性四：`codex features list` 与功能开关（持续有效）

### 是什么（机制说明）

`codex features list` 展示所有功能开关及成熟度：

| 功能 | 状态（7/23 实测） |
|------|-------------------|
| `apps` | **stable** |
| `browser_use` | **stable** |
| `code_mode_host` | **stable** |
| `code_mode` | **under development** |
| `multi_agent_v2` | stable |

通过 `~/.codex/config.toml` 的 `[features]` 段控制。stable 可放心启用；under development 可能不稳定。

### 适用场景

- **适合**：升级后确认功能可用性；团队统一功能策略
- **不适合**：替代 release notes

### 前置条件

Codex 0.145.0+；了解 config.toml 语法

### 详细使用步骤（业务用户）

1. `codex features list` 查看全部功能
2. 筛选：`codex features list | grep -E "code_mode|browser|agent"`
3. 在 `config.toml` `[features]` 段启用所需功能
4. 重启 Codex，`codex doctor` 验证依赖

### 命令与配置示例

```bash
codex features list
codex features list | grep -E "apps|browser|code_mode|multi_agent"
```

```toml
[features]
multi_agent_v2 = true
browser_use = true
code_mode = true          # under development，谨慎启用
web_search = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `apps` / `browser_use` / `code_mode_host` | ✅ stable |
| `code_mode` | ⚠️ under development |
| 与 7/22 对比 | ✅ 无变化 |

### 问题与解决方案

**`code_mode` 不可用**：用 stable 的 `code_mode_host`。**启用无效果**：检查 config.toml 语法并重启。**团队不一致**：统一 config 模板并版本管理。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 7/23 | ✅ 与 7/22 一致 |
| 0.145.0 Release | ✅ multi_agent_v2 稳定化 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端开发者 | 启用 `browser_use`（stable） |
| 脚本用户 | 用 `code_mode_host`，暂避 `code_mode` |
| 保守用户 | 仅启用 stable 功能 |

---

## 特性五：多智能体 V2 与 `codex exec` 非交互执行（0.145.0 stable）

### 是什么（机制说明）

0.145.0 两项 Agent 基础设施成熟化：

**多智能体 V2**（stable）：可配置子智能体模型、推理级别、并发数；恢复角色；改进导航；配合 `/goal` 委派子任务。

**`codex exec`**：脚本化/CI 集成，支持 `--goal` 分解复杂任务；与 `code_mode_host`（stable）协同。

### 适用场景

- **适合**：大型项目并行多 Agent；CI/CD 自动化；批量代码修复
- **不适合**：简单单次问答；需交互调试的场景

### 前置条件

Codex 0.145.0+；`multi_agent_v2` 为 stable；CI 需 API Key

### 详细使用步骤（业务用户）

1. `config.toml` 启用 `multi_agent_v2 = true`
2. 配置子智能体模型、并发数
3. TUI 委派：`/goal 分析 frontend 和 backend，派两个 agent`
4. 非交互：`codex exec "运行测试并报告失败用例"`
5. 复杂任务：`codex exec --goal "重构 auth 模块" .`

### 命令与配置示例

```toml
[features]
multi_agent_v2 = true

[multi_agent]
max_concurrent = 5
default_subagent_model = "gpt-5.6-sol"
reasoning_level = "high"
```

```bash
codex exec "修复 src/auth.ts 中的类型错误"
codex exec --goal "重构 auth 模块" .
codex features list | grep multi
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `multi_agent_v2` | ✅ stable |
| `codex exec` | ⚠️ 未实测（无 API Key） |
| `code_mode_host` | ✅ stable |

### 问题与解决方案

**多智能体未启用**：检查 `multi_agent_v2 = true`。**exec 超时**：用 `--goal` 分解任务。**子智能体不可用**：确认模型在 catalog 且有权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.145.0 Release | ✅ multi-agent V2 stabilized |
| features list | ✅ multi_agent_v2 stable |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 从 2–3 并发开始 |
| DevOps | `codex exec` 集成 CI |
| 团队 Lead | 统一子智能体模型策略 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 渠道 | 核心变更 |
|------|----------------|------|----------|
| **0.146.0-alpha.5** | 2026-07-23 20:02 | GitHub pre-release | 最新 alpha |
| 0.146.0-alpha.4 | 2026-07-23 00:46 | GitHub pre-release | 7/23 凌晨迭代 |
| 0.146.0-alpha.3 | 2026-07-22 21:51 | GitHub pre-release | — |
| 0.146.0-alpha.2 | 2026-07-22 07:22 | GitHub pre-release | — |
| 0.146.0-alpha.1 | 2026-07-22 05:01 | GitHub pre-release | alpha 起点 |
| **0.145.0** | 2026-07-21 18:21 | **stable / npm @latest** | `/import`、Bedrock、多智能体 V2、`codex exec` |
| 0.144.6 | 2026-07-18 13:51 | stable（已替代） | GPT-5.6 提示词刷新 |

## 今日研究员结论

Codex 7/23 无 stable 更新，但 alpha 系列两日五版表明 **0.146.0 stable 发布在即**。生产环境继续锁定 **0.145.0**，其 `/import`、多智能体 V2、`codex exec` 已是重大升级。今日重点在运维侧：`codex doctor` 保持健康环境、`codex features list` 确认成熟度后再启用功能。alpha.5 发布后关注 stable 是否引入 breaking changes，发布后 48h 内评估升级。

---
