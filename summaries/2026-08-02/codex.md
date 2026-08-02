# OpenAI Codex 每日技术文档 — 2026-08-02

> 本地实测版本：**0.146.0** stable（npm `@latest` 维持第 **5** 日）｜监测 alpha：**0.147.0-alpha.4**（7/31 17:54 UTC，**8/2 无新 release，观望第 3 日**）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Learn Changelog](https://learn.chatgpt.com/docs/changelog)、[npm @openai/codex](https://www.npmjs.com/package/@openai/codex)、[codex-plugin-cc](https://github.com/openai/codex-plugin-cc)、[Okta Enterprise AI Index](https://www.okta.com/newsroom/articles/the-okta-enterprise-ai-index/)

## 今日综述

2026 年 8 月 2 日 Codex **稳定版 npm `@latest` 仍为 0.146.0**（7/29 01:42 UTC stable 落地，维持第 **5** 日）。GitHub **8/2 无新 release**——最新 pre-release 仍为 **0.147.0-alpha.4**（7/31 17:54 UTC，tag `rust-v0.147.0-alpha.4`），进入 alpha.4 **观望第 3 日**；7/31 三连发后节奏放缓，**各 release body 仍为空**。

**行业背景**：Okta Enterprise AI Index（8/1）将 OpenAI 列为增速第二（指数 66.9），Codex App GA（2026/2）被标注为 Agentic 范式节点；DeepSeek Flash 第 3 日原生 Codex 适配（[china-ai.md](./china-ai.md)）；`codex-plugin-cc` 推动与 Claude Code 叠用（[industry.md](./industry.md)）。

本地 CLI 实测：`codex --version` → `codex-cli 0.146.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`features list` 显示 `apps`、`browser_use`、`code_mode_host` stable，`code_mode` under development。因无 API Key 未进行推理级功能实测。

---

## 特性一：0.147.0-alpha.4 观望第 3 日——8/2 无新 release

### 是什么（机制说明）

7/31 三连发后，**8/2 全天 GitHub 无新 Codex tag/release**。alpha.4 仍为 0.147 周期最新 pre-release，距终版已逾 48 小时无跟进。npm `@latest` **未跟随**，仍为 **0.146.0**。

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| **0.147.0-alpha.4** | **2026-07-31 17:54** | **Pre-release（8/2 无更新，观望第 3 日）** |
| 0.147.0-alpha.3 | 2026-07-31 15:36 | Pre-release |
| **0.146.0** | **2026-07-29 01:42** | **Stable（npm `@latest` 第 5 日）** |

### 适用场景

- **适合**：早期采用者隔离跟踪 alpha.4、评估 `code_mode` GA
- **不适合**：生产环境、CI lockfile 依赖 pre-release

### 前置条件

Node.js / npm；隔离测试目录；勿覆盖生产 `~/.codex/` 配置

### 详细使用步骤（业务用户）

1. 确认 stable：`codex --version`（应为 0.146.0）
2. 确认 8/2 无新 GitHub tag；隔离安装 alpha.4 并对比 `doctor` / `features list`
3. 关注 8 月上旬 0.147 stable 是否落地

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
| 8/2 GitHub release | ✅ 无新 tag（alpha.4 仍为最新） |
| release body | ✅ 均为空 |
| alpha.4 安装 | ⚠️ 未实测 |

### 问题与解决方案

**三连发后为何停更**：可能进入 stable 打包；勿假设每日发版。**误写 alpha 到 lockfile**：回退 0.146.0。

### 官方 vs 社区交叉验证

GitHub API 8/2 确认无新 release；npm 确认 `@latest` 0.146.0。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.146.0，忽略 alpha |
| 早期采用者 | 维持 alpha.4 隔离跟踪，勿急于升级 |
| CI | lockfile 禁止 alpha 前缀 |

---

## 特性二：0.146.0 stable 能力延续（8/2 维持第 5 日）

### 是什么（机制说明）

**0.146.0 stable** 8/2 仍为 npm `@latest`（第 **5** 日）。核心能力：会话命名/pin、Agent Plugins、Fork threads、全链路代理、releases.openai.com + R2。与 [Cursor iPad 第 5 日](./cursor.md)、[Claude Code 2.1.220 冻结第 9 日](./claude-code.md) 形成竞品「维护期」对照。Okta 指数标注 Codex App GA（2026/2）为 Agentic 范式节点。

### 适用场景

- **适合**：生产升级评估、多任务并行、企业插件生态
- **不适合**：Windows unsupported call 未验证回退时盲目升级

### 前置条件

Codex CLI 0.146.0；升级前备份 `~/.codex/`

### 详细使用步骤（业务用户）

1. `codex --version` → 0.146.0；TUI `/new <名称>` + pin 线程
2. Settings → Plugins 浏览市场；长线程 fork 探索；与 `codex-plugin-cc` 叠用时保持版本一致

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
| npm `@latest` 第 5 日 | ✅ 维持 0.146.0 |
| 会话/fork | ⚠️ 未实测 |

### 问题与解决方案

**行为异常**：回退 0.145.0。**fork 丢失审批**：0.146.0 已修复（#34664）。

### 官方 vs 社区交叉验证

7/29 Release Notes 与 8/2 npm 一致；Okta Agentic 时间线确认 Codex App GA 2026/2。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 维持 0.146.0 |
| 多任务开发者 | 命名 + pin + fork |

---

## 特性三：`codex exec` 与 `/goal`——非交互与长程循环

### 是什么（机制说明）

**`codex exec`**（别名 `e`）非交互执行 agent 任务，含 `resume`、`review` 子命令；`unified_exec` **stable**。**`/goal`**（TUI）设定长程目标循环推进；`goals` **stable**，状态存 `~/.codex/goals_1.sqlite`。同属 Loop Engineering 范式，与 `codex-plugin-cc` 的 `/codex:review` 形成 CLI 与竞品插件双轨审查能力。DeepSeek Flash 第 3 日原生 Codex 适配使 `codex exec` 可指向低成本后端（[china-ai.md](./china-ai.md)）。

### 适用场景

- **适合**：CI 夜间修复、`codex exec review`、overnight `/goal`、与 Claude Code 分工
- **不适合**：无 API Key 期望完整执行；无停止条件的无限循环

### 前置条件

CLI 0.146.0；API Key 或 `codex login`；可选 `config.toml`

### 详细使用步骤（业务用户）

1. 单次：`codex exec "Run npm test and fix failures"`；审查：`codex exec review`
2. 长程 TUI `/goal <验证条件>`；CI 脚本集成 `codex exec`
3. Claude Code 内可用 `/codex:review` 替代部分 exec review 场景
4. 低成本后端：配置 DeepSeek Flash Responses API（见 china-ai.md SOP）

### 命令与配置示例

```bash
codex exec "Add unit tests for utils/date.ts"
codex exec review
# TUI: /goal 重构 auth 模块，确保所有测试通过
```

```toml
[features]
goals = true
unified_exec = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 含 resume/review |
| `goals` / `unified_exec` | ✅ stable, true |
| 推理执行 | ⚠️ 未实测 |

### 问题与解决方案

**exec 挂起**：检查 Key 与网络。**`/goal` 无限循环**：设明确验证条件。**与 plugin-cc 重复审查**：定义边界——CLI exec 用于 CI，plugin 用于交互会话。

### 官方 vs 社区交叉验证

CLI `--help` 与 `features list` 一致；DeepSeek Codex 适配经 API 文档确认。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | exec 接入 CI |
| 个人 | `/goal` 长任务 |
| Claude Code 用户 | plugin-cc 审查 + exec 批处理互补 |
| 成本敏感 | DeepSeek Flash 作 exec 后端 |

---

## 特性四：`codex doctor` 与 `features list`——环境诊断（8/2 实测）

### 是什么（机制说明）

`codex doctor` 检查 CLI、app-server、auth、网络、websocket、sandbox。8/2 实测：**12 ok · 1 warn · 4 fail**。fail 项与无 API Key、app-server 未运行、TERM=dumb 相关，属 Cloud Agent 预期。支持 `--summary compact`、`--json`。

**`codex features list`** 为能力边界权威来源。8/2 关键项：

| 功能 | 状态 | 启用 |
|------|------|------|
| apps / browser_use / code_mode_host | stable | true |
| code_mode | under development | false |
| goals / plugins / unified_exec | stable | true |
| network_proxy | experimental | false |

### 适用场景

- **适合**：新环境部署、升级前后对比、plugin-cc 叠用前基线检查
- **不适合**：替代功能或推理质量测试

### 前置条件

已安装 Codex CLI 0.146.0

### 详细使用步骤（业务用户）

1. `codex doctor` 查看 fail/warn → `codex features list` 确认开关
2. 升级或 alpha 跟踪后重复对比；CI 用 `--json` 集成
3. 确认 `apps`、`browser_use`、`code_mode_host` 为 stable 后再启用相关工作流

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex --version    # codex-cli 0.146.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
codex doctor --summary compact
codex features list 2>&1 | grep -E "apps|browser|code_mode|goals"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor | ✅ 12 ok · 1 warn · 4 fail |
| `apps` / `browser_use` / `code_mode_host` | ✅ stable, true |
| `code_mode` | ✅ under development, false |
| `goals` / `plugins` / `unified_exec` | ✅ stable, true |
| auth / websocket | ✗/⚠️ 无 Key（预期） |

### 问题与解决方案

**4 fail 正常吗**：无 Key 时预期。**code_mode false**：8/2 仍为 under development，跟踪 0.147 stable。

### 官方 vs 社区交叉验证

8/2 实测与 7/29–8/1 模式一致；`features list` 与 Release Notes 描述一致。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 先 doctor + features list |
| CI | `--json` 集成 |

---

## 特性五：`codex-plugin-cc` + DeepSeek Codex 适配——可组合栈与低成本后端

### 是什么（机制说明）

OpenAI 发布 **`codex-plugin-cc`**（Apache 2.0），直接在 **Anthropic Claude Code** 内集成 Codex 子 Agent，提供 `/codex:review`、`/codex:adversarial-review`、`/codex:rescue`。Okta 指数显示企业同时采购 Anthropic + OpenAI + Cursor，plugin-cc 是「审查层」叠用的官方桥梁。

并行：**DeepSeek V4-Flash**（8/2 第 3 日）原生 Responses API + Codex 适配，使 Codex 生态可指向 $0.14/$0.28 per Mtok 低成本后端，无需改 model ID（`deepseek-v4-flash`）。

### 适用场景

- **适合**：已用 Claude Code 2.1.220 的团队、需要双模型审查、低成本 Agent 后端
- **不适合**：未安装 Claude Code、期望零订阅叠加

### 前置条件

Claude Code 已安装（2.1.220）；Codex CLI 0.146.0+；双方 API 凭证；可选 DeepSeek API Key

### 详细使用步骤（业务用户）

1. Claude Code 安装 `codex-plugin-cc`（Settings → Plugins）
2. 定义边界：Cursor 编排 → Claude Code 写码 → `/codex:review` 审查
3. 低成本路径：Codex 指向 DeepSeek Flash Responses API（见 [china-ai.md](./china-ai.md)）
4. 卡住时 `/codex:rescue`；批处理用 `codex exec review`

### 命令与配置示例

```bash
# Claude Code 内
/codex:review
/codex:rescue
# CLI 层互补
codex exec review
```

```toml
# ~/.codex/config.toml DeepSeek 示例
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
api_key_env_var = "DEEPSEEK_API_KEY"
wire_api = "responses"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| codex-plugin-cc GitHub | ✅ Apache 2.0 |
| Claude Code 2.1.220 | ✅ 本地正常 |
| plugin 斜杠命令 | ⚠️ 未实测 |
| DeepSeek Codex 适配 | ✅ API 文档确认（⚠️ 未实测调用） |

### 问题与解决方案

**三工具同时改同一分支**：定义清晰边界（见 [industry.md](./industry.md)）。**订阅叠加**：评估是否仅需 plugin-cc 审查 + DeepSeek 后端降本。

### 官方 vs 社区交叉验证

codex-plugin-cc GitHub 确认 Apache 2.0；DeepSeek 7/31 Changelog 确认 Codex 适配；Okta 多平台采购印证叠用趋势。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Claude Code 用户 | 试用 `/codex:review` + `/codex:rescue` |
| 成本敏感者 | DeepSeek Flash 作 Codex 后端 |
| 企业 Tech Lead | plugin-cc 审查 + Cursor 编排 + M365 办公 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 状态 | 要点 |
|------|----------------|------|------|
| **0.147.0-alpha.4** | **2026-07-31 17:54** | **Pre-release（最新，8/2 无更新，观望第 3 日，body 空）** | 三连发终版 |
| 0.147.0-alpha.3 | 2026-07-31 15:36 | Pre-release | 三连发第二版 |
| 0.147.0-alpha.1.1 | 2026-07-31 09:48 | Pre-release | alpha.1 补丁 |
| **0.146.0** | **2026-07-29 01:42** | **Stable（`@latest` 第 5 日）** | Plugins、Fork、代理、R2 |
| 0.145.0 | 2026-07-21 | Stable | Windows 回退备选 |

## 今日研究员结论

Codex 8/2 **静默观望日**：stable **0.146.0 维持 npm `@latest` 第 5 日**；GitHub **无新 release**，0.147.0-alpha.4（7/31 17:54 UTC）仍为最新 pre-release，三连发后进入消化期，0.147 stable 或于 8 月上旬落地（⚠️ 可证伪）。

本地实测：0.146.0；doctor **12 ok · 1 warn · 4 fail**；`apps`/`browser_use`/`code_mode_host`/`goals`/`unified_exec` stable，`code_mode` under development。推理级功能均 ⚠️ 未实测。

**生态转向**：`codex-plugin-cc` + DeepSeek Flash Codex 适配推动「编排—执行—审查—低成本后端」四层栈（见 [industry.md](./industry.md)）。Okta 指数确认 OpenAI 增速第二，Codex App GA 为 Agentic 范式节点。

**升级建议**：生产锁定 0.146.0；alpha.4 仅隔离 diff；已用 Claude Code 者可试用 `/codex:review`；成本敏感者评估 DeepSeek Flash 后端。昨日见 [../2026-08-01/codex.md](../2026-08-01/codex.md)。
