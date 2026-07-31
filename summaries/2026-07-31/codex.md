# OpenAI Codex 每日技术文档 — 2026-07-31

> 本地实测版本：**0.146.0** stable（npm `@latest` 维持第 3 日）｜监测 alpha：**0.147.0-alpha.4**（7/31 17:54 UTC，今日三连发）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Learn Changelog](https://learn.chatgpt.com/docs/changelog)、[npm @openai/codex](https://www.npmjs.com/package/@openai/codex)、[36氪 Codex 千万周活](https://www.36kr.com/p/3915298041834883)

## 今日综述

2026 年 7 月 31 日 Codex **稳定版 npm `@latest` 仍为 0.146.0**（7/29 01:42 UTC stable 落地，维持第 3 日）。GitHub 于 **0.147 周期出现罕见三连发**：**09:48 UTC** 发布 **0.147.0-alpha.1.1**、**15:36 UTC** 发布 **alpha.3**、**17:54 UTC** 发布 **alpha.4**（tag `rust-v0.147.0-alpha.4`），为迄今最密集迭代日，**各 release body 均为空**。

**行业背景**：Codex 周活破 **1000 万**（36氪 7/29）；DeepSeek V4-Flash（7/31）适配 Codex。

本地 CLI 实测：`codex --version` → `codex-cli 0.146.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host`、`goals` 为 stable，`code_mode` 仍为 under development。因无 API Key 未进行推理级功能实测。

---

## 特性一：0.147.0-alpha.4 三连发——0.147 周期最密集迭代日

### 是什么（机制说明）

7/31 单日 GitHub 发布 **3 个 pre-release**，节奏显著快于 7/30 的 alpha.2 单发：

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| **0.147.0-alpha.4** | **2026-07-31 17:54** | **Pre-release（最新 alpha）** |
| 0.147.0-alpha.3 | 2026-07-31 15:36 | Pre-release |
| 0.147.0-alpha.1.1 | 2026-07-31 09:48 | Pre-release（alpha.1 补丁） |
| 0.147.0-alpha.2 | 2026-07-30 01:04 | Pre-release |
| **0.146.0** | 2026-07-29 01:42 | **Stable（npm `@latest`）** |

alpha.3 → alpha.4 间隔仅 **2 小时 18 分**，暗示密集回归测试。npm `@latest` **未跟随**，仍为 **0.146.0**。

### 适用场景

- **适合**：早期采用者隔离跟踪 0.147 变更、评估 `code_mode` GA 进展
- **不适合**：生产环境、CI lockfile 依赖 pre-release

### 前置条件

Node.js / npm；隔离测试目录；勿覆盖生产 `~/.codex/` 配置

### 详细使用步骤（业务用户）

1. 确认 stable：`codex --version`（应为 0.146.0）
2. 隔离安装：`npm install @openai/codex@0.147.0-alpha.4 --no-save`
3. 对比 `codex doctor` 与 `codex features list`
4. GitHub compare：`rust-v0.147.0-alpha.3...rust-v0.147.0-alpha.4`
5. 关注 8 月上旬 0.147 stable 落地（⚠️ 媒体推测，可证伪）

### 命令与配置示例

```bash
npm view @openai/codex version          # 0.146.0
npm install @openai/codex@0.147.0-alpha.4 --no-save
npx codex --version
# https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.4
```

```toml
# package.json: "@openai/codex": "0.146.0"  # 生产勿写 alpha
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| npm `@latest` | ✅ 0.146.0 |
| 三连发 tag | ✅ alpha.1.1 / alpha.3 / alpha.4 |
| release body | ✅ 均为空 |
| alpha.4 安装 | ⚠️ 未实测 |

### 问题与解决方案

**误写 alpha 到 lockfile**：回退 0.146.0。**行为异常**：回退 alpha.3 或 stable。

### 官方 vs 社区交叉验证

GitHub 确认三连发；npm 确认 `@latest` 0.146.0。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.146.0 |
| 早期采用者 | 隔离跟踪 alpha.4 |

---

## 特性二：0.146.0 stable 能力延续（7/31 维持第 3 日）

### 是什么（机制说明）

**0.146.0 stable** 7/31 仍为 npm `@latest`（第 3 日）。核心能力：会话命名/pin、Agent Plugins、Fork threads、全链路代理、releases.openai.com + R2。

### 适用场景

- **适合**：生产升级评估、多任务并行、企业插件生态
- **不适合**：Windows unsupported call 未验证回退时盲目升级

### 前置条件

Codex CLI 0.146.0；升级前备份 `~/.codex/`

### 详细使用步骤（业务用户）

1. `codex --version` → 0.146.0；TUI `/new <名称>` + pin 线程
2. Settings → Plugins 浏览市场；长线程 fork 探索
3. 企业代理环境验证插件与 MCP

### 命令与配置示例

```bash
codex --version
codex features list 2>&1 | grep -E "plugin|fork"
npm install @openai/codex@0.146.0
```

```toml
[features]
plugins = true
code_mode = false
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| version / plugins | ✅ 0.146.0 · stable |
| 会话/fork | ⚠️ 未实测 |

### 问题与解决方案

**行为异常**：回退 0.145.0。**fork 丢失审批**：0.146.0 已修复（#34664）。

### 官方 vs 社区交叉验证

7/29 Release Notes 与 7/31 npm 一致。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 维持 0.146.0 |
| 多任务开发者 | 命名 + pin + fork |

---

## 特性三：`codex exec` 与 `/goal`——非交互与长程循环

### 是什么（机制说明）

**`codex exec`**（别名 `e`）非交互执行 agent 任务，含 `resume`、`review` 子命令；`unified_exec` **stable**。**`/goal`**（TUI）设定长程目标循环推进；`goals` **stable**，状态存 `~/.codex/goals_1.sqlite`。同属 Loop Engineering 范式。DeepSeek V4-Flash（7/31）适配 Codex，为多模型 `exec` 路由提供新选项。

### 适用场景

- **适合**：CI 夜间修复、`codex exec review`、overnight `/goal`
- **不适合**：无 API Key 期望完整执行；无停止条件的无限循环

### 前置条件

CLI 0.146.0；API Key 或 `codex login`；可选 `config.toml`

### 详细使用步骤（业务用户）

1. 单次：`codex exec "Run npm test and fix failures"`
2. 审查：`codex exec review`；长程 TUI `/goal <验证条件>`
3. 编辑 `config.toml` 设默认模型；CI 脚本集成 `codex exec`

### 命令与配置示例

```bash
codex exec "Add unit tests for utils/date.ts"
codex exec review
codex exec -c model="gpt-5.6-sol" "Refactor auth module"
# TUI: /goal 重构 auth 模块，确保所有测试通过
```

```toml
[model]
default = "gpt-5.6-sol"
[features]
goals = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 含 resume/review |
| `goals` / `unified_exec` | ✅ stable, true |
| 推理执行 | ⚠️ 未实测 |

### 问题与解决方案

**exec 挂起**：检查 Key 与网络。**`/goal` 无限循环**：设明确验证条件。

### 官方 vs 社区交叉验证

CLI 与 `features list` 一致；Loop 叙事经 36氪交叉验证。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | exec 接入 CI |
| 个人 | `/goal` 长任务 |

---

## 特性四：`code_mode`、`features list` 与 `config.toml`

### 是什么（机制说明）

**`code_mode`**：**under development, false**；`code_mode_host` **stable, true**。**`codex features list`** 为能力边界权威来源。7/31 关键项：

| 功能 | 状态 | 启用 |
|------|------|------|
| apps / browser_use / code_mode_host | stable | true |
| code_mode | under development | false |
| goals / plugins / unified_exec | stable | true |
| network_proxy | experimental | false |

**`~/.codex/config.toml`** 管理模型、provider、feature flags、MCP、sandbox；`-c key=value` CLI 覆盖。DeepSeek V4-Flash 可通过 `[model_providers.deepseek]` 接入（见 [`china-ai.md`](./china-ai.md)）。

### 适用场景

- **适合**：部署前确认 flag、多 provider 路由、企业代理管控
- **不适合**：生产依赖 under development 特性

### 前置条件

CLI 0.146.0；实验特性仅隔离环境启用

### 详细使用步骤（业务用户）

1. `codex features list` → 编辑 `config.toml` `[features]` 段
2. 配置 `[model_providers.*]` 接入 V4-Flash 等第三方模型
3. 变更后 `codex doctor` 验证；`code_mode` 仅隔离测试

### 命令与配置示例

```bash
codex features list 2>&1 | grep -E "code_mode|goals|plugin"
```

```toml
[features]
plugins = true
code_mode = false
[model_providers.deepseek]
base_url = "https://api.deepseek.com/v1"
api_key_env_var = "DEEPSEEK_API_KEY"
[profiles.deepseek-flash]
model_provider = "deepseek"
model = "deepseek-v4-flash"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` | ✅ 完整输出 |
| `code_mode` | ✅ under development, false |
| `goals` / `plugins` | ✅ stable, true |
| 多 provider 推理 | ⚠️ 未实测 |

### 问题与解决方案

**code_mode 不可用**：跟踪 0.147 alpha。**多 provider 失败**：检查 `api_key_env_var`。

### 官方 vs 社区交叉验证

`features list` 与 Release Notes 一致。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 跟踪 `code_mode` GA |
| 多模型用户 | V4-Flash profile |

---

## 特性五：`codex doctor` 环境诊断（7/31 实测）

### 是什么（机制说明）

`codex doctor` 检查 CLI、app-server、auth、网络、websocket、sandbox。7/31 实测：**12 ok · 1 warn · 4 fail**。fail 项与无 API Key、app-server 未运行、TERM=dumb 相关，属 Cloud Agent 预期。支持 `--summary compact`、`--json`。

### 适用场景

- **适合**：新环境部署、升级前后对比、alpha 跟踪前后对比
- **不适合**：替代功能或推理质量测试

### 前置条件

已安装 Codex CLI 0.146.0

### 详细使用步骤（业务用户）

1. `codex doctor` 查看 fail/warn → `codex features list` 确认开关
2. 升级或 alpha 跟踪后重复对比；CI 用 `--json` 集成

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex --version    # codex-cli 0.146.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor | ✅ 12 ok · 1 warn · 4 fail |
| auth / websocket | ✗/⚠️ 无 Key（预期） |

### 问题与解决方案

**4 fail 正常吗**：无 Key 时预期。

### 官方 vs 社区交叉验证

7/31 实测与 7/29–7/30 模式一致。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 先 doctor + features list |
| CI | `--json` 集成 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 状态 | 要点 |
|------|----------------|------|------|
| **0.147.0-alpha.4** | **2026-07-31 17:54** | **Pre-release（最新，body 空）** | 三连发终版 |
| 0.147.0-alpha.3 | 2026-07-31 15:36 | Pre-release | 三连发第二版 |
| 0.147.0-alpha.1.1 | 2026-07-31 09:48 | Pre-release | alpha.1 补丁 |
| 0.147.0-alpha.2 | 2026-07-30 01:04 | Pre-release | 第二版 |
| 0.147.0-alpha.1 | 2026-07-29 09:13 | Pre-release | 周期首日 |
| **0.146.0** | **2026-07-29 01:42** | **Stable（`@latest` 第 3 日）** | Plugins、Fork、代理、R2 |
| 0.145.0 | 2026-07-21 | Stable | Windows 回退备选 |

## 今日研究员结论

Codex 7/31 **双轨加速日**：stable **0.146.0 维持第 3 日**；GitHub **0.147 三连发**（alpha.1.1 → alpha.3 → alpha.4，空 body），0.147 stable 或于 8 月上旬落地（⚠️ 可证伪）。

本地实测：0.146.0；doctor 12 ok · 1 warn · 4 fail；`goals`/`unified_exec` stable，`code_mode` under development。推理级功能均 ⚠️ 未实测。

**升级建议**：生产锁定 0.146.0；alpha.4 仅隔离 diff；关注 `code_mode` GA 与 V4-Flash 在 `config.toml` 中的表现。
