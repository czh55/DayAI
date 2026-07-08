# OpenAI Codex 每日技术文档 — 2026-07-08

> 本地实测版本：**0.143.0**（stable @latest）｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Developers Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 8 日 GitHub 发布稳定版 **0.143.0**（**01:31 UTC**），npm `@openai/codex@latest` 同日晋升。这是自 0.142.0 以来最大规模稳定更新：远程插件默认启用、macOS/Windows 系统代理、MCP tool search 默认、`codex remote-control pair`、Amazon Bedrock GPT-5.6 系列。alpha 线同日推至 **0.144.0-alpha.2**（21:46 UTC）。

---

## 特性一：0.143.0 稳定版 GA — 远程插件与 Marketplace

### 是什么（机制说明）

[rust-v0.143.0](https://github.com/openai/codex/releases/tag/rust-v0.143.0) 将 **remote plugins 默认启用**。Catalog 行更丰富，支持 npm marketplace 源，远程/本地版本可见。插件安装请求按 ID 追踪；marketplace source 准入要求强制执行。本地 curated plugins 在 remote catalog 激活时被忽略。

### 适用场景

- **适合**：需要扩展 Codex 能力的企业团队、插件开发者
- **不适合**：无网络环境或禁止远程插件的安全隔离环境

### 前置条件

- Codex CLI ≥ 0.143.0
- 网络可访问 npm marketplace
- OpenAI API 认证

### 详细使用步骤（业务用户）

1. 升级：`npm install @openai/codex@latest`
2. 确认版本：`codex --version` → `0.143.0`
3. 查看插件 catalog：`codex plugins list`（或相关子命令）
4. 安装远程插件并按提示完成认证
5. 用 `codex features list` 确认 `apps: stable`

### 命令与配置示例

```bash
# 升级至 0.143.0
npm install @openai/codex@latest
./node_modules/.bin/codex --version

# 查看特性状态
./node_modules/.bin/codex features list 2>&1 | head -20
```

```toml
# ~/.codex/config.toml 插件相关片段
[plugins]
# remote plugins 默认启用，无需显式配置
# 如需禁用 remote catalog，查阅官方文档最新选项
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.143.0` |
| `features list` apps | ✅ `stable true` |
| 远程插件安装 | ⚠️ 未实测（无完整 auth） |

```bash
./node_modules/.bin/codex features list 2>&1 | grep apps
# apps                                 stable             true
```

### 问题与解决方案

**插件 catalog 为空**：检查网络和 npm registry 可达性。**版本冲突**：`features list` 显示 remote/local 版本对比。**安装失败**：检查 marketplace source 准入要求。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.143.0 release notes | ✅ |
| npm 0.143.0 @latest | ✅ |
| features list apps stable | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业团队 | 评估 remote plugin 安全策略后启用 |
| 插件开发者 | 发布至 npm marketplace |
| 安全隔离环境 | 查阅禁用 remote catalog 选项 |

---

## 特性二：系统代理路由（macOS/Windows）

### 是什么（机制说明）

0.143.0 新增 Codex 认证和 Responses API 流量通过 **macOS 和 Windows 系统代理**路由的能力，包括 **PAC** 和 **WPAD** 配置。解决企业网络环境下 Codex 无法连接的问题。

### 适用场景

- **适合**：企业代理网络、VPN 环境、需 PAC 自动配置的场景
- **不适合**：已手动配置 `HTTP_PROXY` 且工作正常的简单环境

### 前置条件

- Codex CLI ≥ 0.143.0
- macOS 或 Windows 操作系统
- 系统代理已正确配置

### 详细使用步骤（业务用户）

1. 确认系统代理设置（系统偏好设置 → 网络 → 代理）
2. 升级 Codex 至 0.143.0
3. 运行 `codex doctor` 检查网络连通性
4. 正常使用 `codex` 交互或 `codex exec`——代理自动应用

### 命令与配置示例

```bash
# 诊断网络
./node_modules/.bin/codex doctor 2>&1 | grep -i proxy

# 验证连通性
./node_modules/.bin/codex -p "echo hello" 2>&1 | head -5
```

```toml
# ~/.codex/config.toml
# 系统代理自动检测，通常无需手动配置
# 如需覆盖，查阅官方网络配置文档
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Linux 环境 | ⚠️ 系统代理特性为 macOS/Windows 专属 |
| `codex doctor` | ✅ `12 ok · 1 idle · 5 notes · 1 warn · 4 fail` |
| 代理路由实测 | ⚠️ 未实测（Linux cloud VM 无系统代理） |

### 问题与解决方案

**代理未生效**：确认 OS 版本 ≥ 0.143.0 且为 macOS/Windows。**PAC 解析失败**：检查 WPAD 配置。**doctor 网络 fail**：常见为 app-server 未运行，不影响 CLI 基础功能。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub #26708 PAC Windows | ✅ |
| GitHub #26709 PAC macOS | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业开发者 | 升级后移除手动 proxy 环境变量 |
| IT 管理员 | 用 PAC 统一 Codex 出站策略 |
| Linux 用户 | 仍用 `HTTP_PROXY`/`HTTPS_PROXY` 环境变量 |

---

## 特性三：`codex remote-control pair` 与 MCP Tool Search

### 是什么（机制说明）

0.143.0 新增 `codex remote-control pair` 命令，从运行中的 daemon 生成手动配对码，便于远程控制 Codex 会话。MCP tools 默认使用 **tool search**（`features list` 不直接显示，但 release notes 确认）。ChatGPT 托管 MCP 服务器可显式使用 session 认证。

### 适用场景

- **适合**：远程开发、daemon 模式、多 MCP 工具环境
- **不适合**：仅本地单次 CLI 使用的简单场景

### 前置条件

- Codex CLI ≥ 0.143.0
- daemon 模式运行中（`codex` app-server）
- MCP 服务器配置

### 详细使用步骤（业务用户）

1. 启动 Codex daemon（通常随 `codex` TUI 自动启动）
2. 在另一终端运行 `codex remote-control pair`
3. 获取配对码，在远程设备输入
4. MCP 工具自动通过 tool search 发现（无需手动列举全部）

### 命令与配置示例

```bash
# 生成配对码
./node_modules/.bin/codex remote-control pair

# 检查 daemon 状态
./node_modules/.bin/codex doctor 2>&1 | grep -A3 "app-server"

# MCP 配置
cat ~/.codex/config.toml | grep -A10 mcp
```

```toml
# ~/.codex/config.toml MCP 片段
[mcp]
# tool search 默认启用（0.143.0+）
# ChatGPT-hosted MCP 可配置 session auth
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `remote-control pair` | ⚠️ daemon not running（doctor 显示 not running） |
| `features list` MCP 相关 | ✅ `browser_use: stable` |
| tool search | ⚠️ 未实测（无 MCP 服务器配置） |

```bash
./node_modules/.bin/codex doctor 2>&1 | tail -5
# status                   not running
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**pair 失败**：先启动 daemon（运行 `codex` TUI）。**MCP 启动 busy**：0.143.0 修复 stale TUI safety prompt 导致的 busy 状态。**token 刷新风暴**：0.143.0 修复 remote-control token refresh retry storms。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub #29913 remote-control pair | ✅ |
| GitHub #29486 MCP tool search | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 远程开发者 | 用 pair 命令连接 daemon |
| MCP 重度用户 | 享受 tool search 自动发现 |
| 运维 | 监控 daemon 状态避免 pair 失败 |

---

## 特性四：Amazon Bedrock GPT-5.6 与 `codex exec`

### 是什么（机制说明）

0.143.0 新增 **Amazon Bedrock GPT-5.6 Sol、Terra、Luna** 模型支持，含 `max` reasoning effort 一等公民支持。`codex exec` 命令用于非交互执行 Codex 任务。Bedrock 凭证过期错误改进（#28992）。

### 适用场景

- **适合**：AWS Bedrock 企业用户、CI/CD 非交互 Codex 调用
- **不适合**：无 Bedrock 访问权限的用户

### 前置条件

- Codex CLI ≥ 0.143.0
- AWS Bedrock 凭证配置
- 模型访问权限（Sol/Terra/Luna 可能需 allowlist）

### 详细使用步骤（业务用户）

1. 配置 AWS 凭证（`~/.aws/credentials` 或环境变量）
2. 在 `config.toml` 中指定 Bedrock provider 和模型
3. 交互模式：`codex` → 选择 Bedrock 模型
4. 非交互：`codex exec "fix lint errors in src/"`

### 命令与配置示例

```bash
# 非交互执行
./node_modules/.bin/codex exec "Add unit tests for utils/parser.ts"

# 指定模型（以官方文档为准）
./node_modules/.bin/codex exec --model gpt-5.6-sol "Refactor auth module"
```

```toml
# ~/.codex/config.toml Bedrock 片段
[model]
provider = "bedrock"
name = "gpt-5.6-sol"
reasoning_effort = "max"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` 命令 | ✅ 存在于 CLI |
| Bedrock 模型调用 | ⚠️ 未实测（无 AWS 凭证） |
| GPT-5.6 Sol GA | ⚠️ limited preview（release notes 确认支持） |

### 问题与解决方案

**Bedrock 凭证过期**：0.143.0 改进错误提示。**模型不可用**：确认 allowlist 和 region。**exec 超时**：调整 timeout 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub #30285 Bedrock Sol | ✅ |
| GitHub #30467 reasoning effort max | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| AWS 企业用户 | 评估 Bedrock GPT-5.6 替代 OpenAI 直连 |
| CI 工程师 | `codex exec` 集成 pipeline |
| 成本优化者 | 对比 Bedrock vs OpenAI API 定价 |

---

## 特性五：Code Mode 与 alpha 线（0.144.0-alpha.2）

### 是什么（机制说明）

稳定版 0.143.0 含 Code mode 基础设施改进（world state、session budget error、compacted history replacement）。alpha 线 7/8 连推 **0.143.0-alpha.39**、**0.144.0-alpha.1**、**0.144.0-alpha.2**。`code_mode_host` 仍为 `under development`；`code_mode` 同状态。

### 适用场景

- **适合**：抢先评估 Code mode 架构的贡献者
- **不适合**：生产 CI/CD 默认依赖 alpha 渠道

### 前置条件

- alpha 安装：`npm install @openai/codex@0.144.0-alpha.2`
- OpenAI API 访问（Code mode 可能需 allowlist）

### 详细使用步骤（业务用户）

1. 隔离环境安装 alpha
2. `codex features list | grep code_mode` 查看状态
3. 生产环境锁定 `0.143.0` stable
4. 关注 developers.openai.com 文档更新

### 命令与配置示例

```bash
# 安装 alpha
npm install @openai/codex@0.144.0-alpha.2
./node_modules/.bin/codex --version

# 检查 Code mode 特性
./node_modules/.bin/codex features list 2>&1 | grep code_mode

# 回退 stable
npm install @openai/codex@latest
./node_modules/.bin/codex --version   # 0.143.0
```

```toml
# ~/.codex/config.toml Code mode 相关
[features]
# code_mode / code_mode_host 配置项随 alpha 变化——升级前备份
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| stable 0.143.0 code_mode | ✅ `under development false` |
| stable code_mode_host | ✅ `under development false` |
| alpha 安装 | ⚠️ 本次实测使用 stable 0.143.0 |
| Code mode 实际运行 | ⚠️ 未实测（under development） |

```bash
./node_modules/.bin/codex features list 2>&1 | grep code_mode
# code_mode                            under development  false
# code_mode_host                       under development  false
# code_mode_only                       under development  false
```

### 问题与解决方案

**alpha 与 stable 行为不一致**：生产锁定 0.143.0。**code_mode_host 无文档**：等待官方更新。**doctor 4 fail**：app-server 未运行，对 CLI 基础功能影响有限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.2 release | ✅ |
| features list code_mode | ✅ |
| 昨日 alpha.38 code_mode_host 资产 | ✅ 架构持续演进 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 隔离环境跟踪 alpha |
| 生产团队 | 锁定 0.143.0 stable |
| 架构关注者 | 关注 code_mode_host 拆分趋势 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 渠道 | 关键变更 |
|------|----------------|------|----------|
| **0.143.0** | 2026-07-08 01:31 | stable @latest | 远程插件、系统代理、MCP tool search、Bedrock |
| 0.144.0-alpha.2 | 2026-07-08 21:46 | alpha | 预发布迭代 |
| 0.144.0-alpha.1 | 2026-07-08 20:13 | alpha | 预发布迭代 |
| 0.143.0-alpha.39 | 2026-07-07 23:52 | alpha | 预发布迭代 |
| 0.142.5 | 2026-07-01 | stable（已取代） | WebSocket trace 日志修复 |

## 今日研究员结论

Codex 0.143.0 是 2026 年 Q3 迄今最重要的稳定版更新——远程插件和系统代理直接解决企业落地痛点。建议生产环境立即升级 stable，alpha 线仅供评估。与 Claude Code 2.1.205、Cursor 3.10（6/30）形成当日三平台格局：Codex 今日最活跃，Claude Code 日更 patch，Cursor 持续空窗。
