# OpenAI Codex 每日技术文档 — 2026-07-24

> 本地实测版本：**0.145.0**（stable）｜监测 alpha：**0.146.0-alpha.7**（7/24 18:24 UTC）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 24 日 Codex **稳定版仍为 0.145.0**（7/21 发布），npm `@latest` 未升级。GitHub 今日连发 **0.146.0-alpha.6**（05:31 UTC）与 **alpha.7**（18:24 UTC），自 7/22 起 alpha.1 至 alpha.7 共七版快速迭代，0.146.0 stable 发布在即。本地 CLI 实测：`codex --version` → `codex-cli 0.145.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host` 为 stable。生产环境继续锁定 0.145.0，alpha 仅用于隔离测试。

---

## 特性一：0.146.0-alpha 系列持续迭代（7/24 alpha.6、alpha.7）

### 是什么（机制说明）

自 7/22 起，Codex 进入 0.146.0 预发布冲刺期，七日七版：

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| 0.146.0-alpha.1 | 2026-07-22 05:01 | Pre-release |
| 0.146.0-alpha.2 | 2026-07-22 07:22 | Pre-release |
| 0.146.0-alpha.3 | 2026-07-22 21:51 | Pre-release |
| 0.146.0-alpha.3.1 | 2026-07-23 23:26 | Pre-release |
| 0.146.0-alpha.4 | 2026-07-23 00:46 | Pre-release |
| 0.146.0-alpha.5 | 2026-07-23 20:02 | Pre-release |
| **0.146.0-alpha.6** | **2026-07-24 05:31** | Pre-release |
| **0.146.0-alpha.7** | **2026-07-24 18:24** | Pre-release（最新） |

7/24 一日两版延续密集修复节奏。npm `@latest` 始终指向 0.145.0，未跟随 alpha。alpha release notes 较简略，详细变更需查看 GitHub commit diff。

### 适用场景

- **适合**：早期采用者、CI 冒烟测试、评估 0.146.0 新能力
- **不适合**：生产环境、无回退预案的升级

### 前置条件

愿意承担 alpha 风险；建议容器或独立环境隔离

### 详细使用步骤（业务用户）

1. 确认 stable：`codex --version`（应为 0.145.0）
2. 隔离环境安装：`npm install @openai/codex@0.146.0-alpha.7`
3. 运行 `codex doctor` 与 `codex features list` 对比 stable 差异
4. 测试后回退：`npm install @openai/codex@0.145.0`

### 命令与配置示例

```bash
codex --version                    # codex-cli 0.145.0
npm install @openai/codex@0.146.0-alpha.7
./node_modules/.bin/codex --version
codex features list | head -20
codex doctor
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.145.0` |
| alpha.6 / alpha.7 | ✅ 7/24 05:31 / 18:24 UTC |
| npm `@latest` | ✅ 仍为 0.145.0 |
| alpha.1–7 时间线 | ✅ 7/22–7/24 共七版 |

### 问题与解决方案

**alpha 行为异常**：回退 `npm install @openai/codex@0.145.0`。**release notes 为空**：查看 GitHub compare。**一日多版难跟踪**：锁定具体版本号，勿用浮动 `@alpha` 标签。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.7 | ✅ 7/24 18:24 UTC |
| npm `@latest` | ✅ 未跟随 alpha |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 继续 0.145.0 stable |
| 早期采用者 | 容器内测试 alpha.7 |
| CI/CD | 锁定 0.145.0，不自动升级 alpha |

---

## 特性二：`/import` 从 Cursor/Claude Code 迁移（0.145.0 stable）

### 是什么（机制说明）

0.145.0（7/21）扩展 `/import` 命令，可从 Cursor 和 Claude Code 迁移：设置、MCP 服务器、插件、会话、命令、项目级记忆。在 Opus 5 发布与 Cursor Router 降本背景下，这是承接多工具用户的战略功能。7/24 无 stable 更新，但 `/import` 仍是当前版本最大亮点。

### 适用场景

- **适合**：从 Cursor/Claude Code 评估或迁移至 Codex 的用户
- **不适合**：全新安装且无迁移需求

### 前置条件

Codex 0.145.0+；源工具配置存在于默认路径

### 详细使用步骤（业务用户）

1. 安装：`npm install -g @openai/codex@latest`
2. 启动 Codex：`codex`
3. 输入 `/import`
4. 选择源：Cursor 或 Claude Code
5. 选择迁移项：设置、MCP、插件、会话、命令、记忆
6. 确认并应用

### 命令与配置示例

```bash
# 启动后交互式导入
codex
> /import

# 检查迁移结果
> /mcp list
cat ~/.codex/config.toml
```

```toml
# ~/.codex/config.toml（迁移后可能包含）
[model]
default = "gpt-5.6-sol"

[mcp.servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/import` 命令 | ⚠️ 未实测（无源工具配置/API Key） |
| 0.145.0 release notes | ✅ `/import` 扩展确认 |

### 问题与解决方案

**源配置未找到**：确认 Cursor/Claude Code 使用默认路径。**MCP 迁移失败**：手动检查 `~/.codex/config.toml`。**会话迁移不完整**：部分会话格式可能不兼容。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.145.0 Release | ✅ #31672 #33411 等 PR |
| Cursor Router 竞争 | ⚠️ 不同迁移策略（一键 vs 路由） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多工具用户 | 用 `/import` 快速评估 Codex |
| 团队迁移 | 先单人试点，再批量推广 |
| Cursor 用户 | 对比 Router 降本 vs Codex 迁移成本 |

---

## 特性三：`codex exec` 与非交互式执行（0.145.0 stable）

### 是什么（机制说明）

`codex exec` 允许非交互式执行 Codex 任务，适合 CI/CD 与脚本化工作流。配合 `codex doctor` 健康检查与 `codex features list` 功能开关查询，构成 Codex CLI 运维三件套。

### 适用场景

- **适合**：CI/CD 流水线、自动化脚本、headless 环境
- **不适合**：需交互式调试的复杂任务

### 前置条件

Codex 0.145.0+；API Key 已配置（`OPENAI_API_KEY` 或 `codex login`）

### 详细使用步骤（业务用户）

1. 配置 API Key：`export OPENAI_API_KEY=...` 或 `codex login`
2. 健康检查：`codex doctor`
3. 查看功能：`codex features list`
4. 非交互执行：`codex exec "Fix the failing tests"`

### 命令与配置示例

```bash
# 健康检查
codex doctor

# 功能列表
codex features list | head -15

# 非交互执行
codex exec "Run npm test and fix any failures"

# CI 示例
codex exec --model gpt-5.6-sol "Review this PR for security issues"
```

```toml
# ~/.codex/config.toml
[exec]
timeout = 600
sandbox = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `codex features list` | ✅ apps/browser_use stable |
| `codex exec` | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**doctor 4 fail**：检查 API Key、网络、app-server 状态。**exec 超时**：增加 config.toml timeout。**sandbox 限制**：检查 permissions 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 doctor 输出 | ✅ 12 ok · 1 warn · 4 fail |
| GitHub 0.145.0 | ✅ exec 功能稳定 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | `codex exec` 集成 CI |
| 开发者 | 先 `doctor` 排查环境问题 |
| 企业 | 统一 config.toml 模板 |

---

## 特性四：Code mode 与 Browser Developer mode（0.145.0 stable）

### 是什么（机制说明）

Codex 支持多种工作模式：
- **Code mode**：专注软件开发的模式，`code_mode_host` 为 stable，`code_mode` 仍为 under development
- **Browser Developer mode**：`browser_use`、`browser_use_external`、`browser_use_full_cdp_access` 均为 stable
- **Web Search**：standalone web search 支持

`codex features list` 可查询各功能状态。

### 适用场景

- **适合**：Web 应用开发、浏览器自动化测试、需要 Web 搜索的编码任务
- **不适合**：纯后端/CLI 项目（可禁用 browser 功能）

### 前置条件

Codex 0.145.0+；browser 功能需相应权限

### 详细使用步骤（业务用户）

1. 启动 Codex：`codex`
2. 切换 Code mode：在 UI 或 config 中启用
3. Browser 模式：Agent 可自动打开浏览器调试
4. 检查功能状态：`codex features list | grep browser`

### 命令与配置示例

```bash
# 查看 browser 相关功能
codex features list | grep browser
# browser_use                          stable             true
# browser_use_external                 stable             true
# browser_use_full_cdp_access          stable             true

# config.toml 配置
```

```toml
# ~/.codex/config.toml
[features]
browser_use = true
code_mode = false  # under development
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` browser | ✅ 三项均为 stable |
| code_mode | ✅ under development |
| Browser 实测 | ⚠️ 未实测（无 API Key/GUI） |

### 问题与解决方案

**Browser 无法启动**：检查 headless 环境是否支持。**code_mode 不稳定**：使用 stable 的 code_mode_host。**CDP 访问被拒**：检查 browser_use_full_cdp_access 权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 features list | ✅ browser stable |
| GitHub 0.145.0 | ✅ browser 相关 PR |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端开发者 | 利用 browser_use 自动调试 |
| 后端开发者 | 可禁用 browser 减少开销 |
| 全栈团队 | Code mode + browser 组合 |

---

## 特性五：多智能体 V2 与 `/goal`（0.145.0 stable）

### 是什么（机制说明）

0.145.0 稳定化 opt-in 多智能体 V2 体验：可配置子 Agent 模型、推理级别、并发、角色恢复与导航改进。`/goal` 命令用于设定长期目标导向任务。配合分页线程历史（experimental）支持高效 resume 与搜索。

### 适用场景

- **适合**：复杂多步骤任务、需要子 Agent 并行、长期目标导向开发
- **不适合**：简单单步补全

### 前置条件

Codex 0.145.0+；多智能体 V2 已 opt-in 启用

### 详细使用步骤（业务用户）

1. 启用多智能体 V2：config 或 feature flag
2. 设定目标：`/goal Build a REST API with tests`
3. 配置子 Agent 模型与并发
4. 使用分页历史 resume 长期任务

### 命令与配置示例

```bash
# 设定目标
codex
> /goal Implement user authentication with JWT

# 多智能体配置
```

```toml
# ~/.codex/config.toml
[multi_agent]
enabled = true
max_concurrency = 4
sub_agent_model = "gpt-5.6-sol"
reasoning_level = "high"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 多智能体 V2 | ⚠️ 未实测（无 API Key） |
| 0.145.0 release notes | ✅ #33550 等 PR 确认 |
| `/goal` | ⚠️ 未实测 |

### 问题与解决方案

**子 Agent 不启动**：检查 multi_agent.enabled 与并发配置。**目标偏离**：在 `/goal` 中提供更具体约束。**历史 resume 失败**：检查分页线程存储状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.145.0 | ✅ 多智能体 V2 稳定化 |
| Claude Code 嵌套 depth 3 | ⚠️ 竞品对照 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 复杂项目 | opt-in 多智能体 V2 |
| 简单任务 | 保持单 Agent |
| 长期任务 | `/goal` + 分页历史 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 核心变更 |
|------|----------------|----------|
| **0.146.0-alpha.7** | **2026-07-24 18:24** | alpha 通道最新（release notes 简略） |
| 0.146.0-alpha.6 | 2026-07-24 05:31 | alpha 通道 |
| 0.146.0-alpha.5 | 2026-07-23 20:02 | alpha 通道 |
| **0.145.0** | **2026-07-21** | **stable：`/import`、Bedrock、多智能体 V2、分页历史** |

## 今日研究员结论

Codex 7/24 稳定版不变，**alpha 通道七日七版**显示 0.146.0 stable  imminent。生产继续锁定 0.145.0，`/import` 迁移与多智能体 V2 是当前最大亮点。本地 `doctor` 12 ok · 1 warn · 4 fail，`features list` 确认 browser 功能 stable。无 API Key 未实测推理与 `/goal`。关注 7/25 前后 stable 0.146.0 发布。
