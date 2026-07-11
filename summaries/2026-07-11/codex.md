# OpenAI Codex 每日技术文档 — 2026-07-11

> 本地实测版本：**0.144.1**｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Developers Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 11 日 npm `@openai/codex@latest` 实测仍为 **0.144.1**（与 7/9 23:02Z 发布版一致，**连续第三日无 stable 变更**）。GitHub 预发布线同日推至 **0.145.0-alpha.4**（**2026-07-11 00:10 UTC**）。7/9 Changelog「**Codex joins ChatGPT desktop app**」与 7/10 **GPT-5.6 全量上线 + ChatGPT Work** 入口进入发布次日观察期——产品面合并，CLI 稳定通道保持克制。

---

## 特性一：稳定版 0.144.1 维持 + 预发布 0.145.0-alpha.4 推进

### 是什么（机制说明）

**稳定通道**：`rust-v0.144.1`（2026-07-09 23:02 UTC）仍为 GitHub **Latest** 与 npm `@latest`，内容为 0.144.0 后的维护修复：Standalone 安装器 metadata 解析（#31913）、macOS `code_mode_host` 暴露、host 不可用时 embedded runtime 回退。

**预发布通道**：[rust-v0.145.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.4) 于 **2026-07-11 00:10 UTC** 发布（commit `8a63816`），距 alpha.3（7/10 23:11Z）约 1 小时。Release body 仅标注「Release 0.145.0-alpha.4」，无详细 changelog——⚠️ 需对照 GitHub compare 或后续 stable 说明。

### 适用场景

- **适合（0.144.1）**：生产环境、CI 锁定、macOS code_mode_host 用户
- **适合（alpha.4）**：隔离环境尝鲜、跟踪 0.145 stable 前特性
- **不适合**：生产直接安装 `@openai/codex@0.145.0-alpha.4`

### 前置条件

Node.js / npm 或 standalone 安装器；尝鲜 alpha 需独立目录，避免覆盖 `@latest` PATH。

### 详细使用步骤（业务用户）

1. 确认稳定版：`codex --version` → 期望 `codex-cli 0.144.1`
2. 生产保持：`npm install @openai/codex@latest`（勿追 alpha）
3. 尝鲜 alpha（隔离）：`npm install @openai/codex@0.145.0-alpha.4`
4. 对比特性：`codex features list` 与 0.144.1 逐项 diff
5. 健康检查：`codex doctor` 确认安装无回归

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex --version          # codex-cli 0.144.1
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
./node_modules/.bin/codex features list 2>&1 | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.144.1` |
| npm `@latest` | ✅ 仍为 0.144.1 |
| `0.145.0-alpha.4` 安装 | ⚠️ 未实测（本环境锁定 stable） |
| `codex doctor` | ✅ `12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed` |
| `features list` | ✅ 可执行，约 92 项 |

### 问题与解决方案

**`@latest` 未变是否落后**：0.144.1 为当前官方稳定推荐。**想试 alpha.4**：隔离安装，勿混用 PATH。**alpha.4 无 release notes**：关注 compare `rust-v0.144.1...rust-v0.145.0-alpha.4`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Latest = 0.144.1 | ✅ |
| npm `@latest` = 0.144.1 | ✅ 本地实测 |
| alpha.4 @ 7/11 00:10Z | ✅ |
| alpha.4 详细变更 | ⚠️ Release body 无条目 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 维持 0.144.1，每日 `codex doctor` |
| 尝鲜开发者 | 隔离跟踪 alpha.4，记录 features diff |
| CI 运维 | 锁定 `"@openai/codex": "0.144.1"` |

---

## 特性二：Codex 并入 ChatGPT 桌面端 + GPT-5.6 全量与 ChatGPT Work（7/9–7/10 余波）

### 是什么（机制说明）

[2026-07-09 Changelog](https://developers.openai.com/codex/changelog) 宣布 **Codex joins the ChatGPT desktop app**（macOS/Windows）。现有用户可更新并保留项目、设置与工作流；可将 Codex 设为默认视图，macOS 可保留 Codex 图标。新能力：应用内编辑 Markdown/代码、内联批注、侧边栏 GitHub PR 审查、单项目跨仓库工作；GPT-5.6 Computer Use 加速、任务进度跟踪改进。

**7/10 行业层面**：OpenAI 全量发布 **GPT-5.6**（Sol / Terra / Luna），产品矩阵拆为三入口——**Chat**（对话）、**Codex**（编码）、**ChatGPT Work**（通用办公：接任务、读上下文、调用工具、分步执行、交付结果）。CLI 稳定版未因桌面合并跳版，形成「桌面大更新 + CLI 维护节奏」双轨。

### 适用场景

- **适合**：ChatGPT 桌面端开发者、GPT-5.6 Sol 专业工作流用户
- **不适合**：仅需 headless CLI 的 CI

### 前置条件

ChatGPT 桌面应用 7/9 后版本；或 Codex CLI ≥ 0.144.0；OpenAI 账户认证。

### 详细使用步骤（业务用户）

1. 更新 ChatGPT 桌面应用至最新版
2. Settings → 将 Codex 设为默认视图（可选）
3. 探索 **ChatGPT Work** 处理非编码办公任务
4. 侧边栏打开 PR 审查 diff 与 reviewer 反馈
5. CLI 用户：`npm install @openai/codex@latest` 保持认证对齐

### 命令与配置示例

```bash
codex --version   # 0.144.1
codex features list 2>&1 | grep -E "computer_use|code_mode_host|goals"
# computer_use    stable    true
# code_mode_host  stable    true
# goals           stable    true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI 0.144.1 | ✅ |
| ChatGPT 桌面端 / Work | ⚠️ 未实测（Linux Cloud VM 无 GUI） |
| GPT-5.6 模型调用 | ⚠️ 未实测（无完整 API Key） |
| PR 侧边栏审查 | ⚠️ 未实测 |

### 问题与解决方案

**桌面端找不到 Codex**：确认 7/9 后版本并登录。**Work 与 Codex 混淆**：Work 面向办公，Codex 保留编码入口——⚠️ 部分媒体「Codex 改名 Work」为简化表述。**CLI 与桌面设置不同步**：分别以 Settings / `config.toml` 为准。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Developers Changelog 7/9 | ✅ |
| GPT-5.6 全量（7/10） | ✅ |
| ChatGPT Work 三入口 | ✅ 36氪 / 虎嗅 |
| 「Codex 被 Work 取代」 | ⚠️ 媒体简化 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 桌面用户 | 升级应用，评估 Work vs Codex 分工 |
| CLI 重度用户 | 继续 CLI，关注 PR 审查是否回流 |
| 成本敏感用户 | GPT-5.6 跑分 vs 实测账单 A/B 后再切换 |

---

## 特性三：Code Mode 架构与 `code_mode_host` 稳定态

### 是什么（机制说明）

Code mode 在专用 host 进程中运行代码任务，与 embedded runtime 形成双层架构。0.144.x：`code_mode_host` **stable true**（0.144.1 修复 macOS host 暴露与 embedded 回退）；`code_mode` / `code_mode_only` 仍为 **under development false**。0.144.0 引入 `writes` app-approval mode——只读自动、写入需确认（#30482）。

### 适用场景

- **适合**：隔离代码执行的 Agent 任务、macOS `code_mode_host` 工作流
- **不适合**：简单问答无需 code mode

### 前置条件

Codex ≥ 0.144.1；`code_mode_host` stable；可选 `~/.codex/config.toml` 配置 approval。

### 详细使用步骤（业务用户）

1. `codex features list | grep code_mode` 确认状态
2. `config.toml` 配置 `[approvals] mode = "writes"`（若需写入控制）
3. 交互会话触发 code mode 任务
4. host 失败时 0.144.1 自动回退 embedded
5. `codex doctor` 检查 app-server / host 状态

### 命令与配置示例

```bash
codex features list 2>&1 | grep code_mode
# code_mode          under development  false
# code_mode_host     stable             true
# code_mode_only     under development  false
```

```toml
# ~/.codex/config.toml
[approvals]
mode = "writes"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| code_mode_host stable | ✅ |
| code_mode under dev | ✅ false |
| host 进程 | ⚠️ app-server not running（idle 正常） |
| writes approval | ⚠️ 未实测交互写入 |

### 问题与解决方案

**code_mode 不可用**：`code_mode` 仍 under development，勿强行启用。**host 崩溃**：0.144.1 回退 embedded；`codex doctor --all`。**macOS 无 host binary**：升级 0.144.1。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ |
| 0.144.1 release notes | ✅ #31913 |
| 0.144.0 writes mode | ✅ #30482 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Agent 开发者 | 关注 code_mode → stable 进展 |
| macOS 用户 | 0.144.1 必升 |
| 保守用户 | 仅用 stable features |

---

## 特性四：Web Search 与 Browser Developer mode（`browser_use` 稳定族）

### 是什么（机制说明）

**Browser Developer mode** 基于 `browser_use` 特性族，赋予 Agent 浏览器自动化；**Web Search** 提供实时检索。本环境 `features list` 摘录：`browser_use` / `browser_use_external` / `browser_use_full_cdp_access` / `in_app_browser` / `computer_use` 均为 **stable true**；`standalone_web_search` 为 **under development false**；`web_search_cached` / `web_search_request` 标记 **deprecated**——⚠️ 实际搜索可能经 browser 或内置 search tool 实现。

### 适用场景

- **适合**：网页抓取、填表、UI 验证、结合 GPT-5.6 Computer Use 的桌面自动化
- **不适合**：纯本地代码编辑

### 前置条件

Codex ≥ 0.144.1；`browser_use` stable；网络与 sandbox 许可。

### 详细使用步骤（业务用户）

1. `codex features list | grep -E "browser|search|computer"` 确认开关
2. 交互中描述浏览/搜索任务
3. 首次浏览器操作可能触发 approval
4. 失败时 `codex doctor` 查 sandbox
5. 非交互：`codex exec "..."` 配合 browser 任务 ⚠️

### 命令与配置示例

```bash
codex features list 2>&1 | grep -E "browser|search|computer"
# browser_use               stable    true
# computer_use                stable    true
# standalone_web_search       under development  false
```

```bash
codex exec "Search official docs for codex exec usage and summarize"  # ⚠️ 需认证
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `browser_use` / `computer_use` stable | ✅ |
| `standalone_web_search` | ✅ under development false |
| 浏览器 / Web Search 端到端 | ⚠️ 未实测（无 API Key / 无 GUI） |

### 问题与解决方案

**browser_use 失败**：`codex doctor --all` 查 sandbox。**Web Search 无结果**：`standalone_web_search` 未 stable。**CDP 权限不足**：检查 `browser_use_full_cdp_access` 与 approval。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list browser 族 | ✅ stable |
| Changelog Computer Use | ✅ 7/9 性能改进 |
| standalone_web_search 落地 | ⚠️ 尚无 stable 日期 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Agent 工程师 | 优先 `browser_use` stable 族 |
| 安全合规 | 审查 `full_cdp_access` 策略 |
| 保守用户 | 等 `standalone_web_search` stable |

---

## 特性五：`codex exec`、`/goal`、`config.toml` 与 `codex doctor` / `features list`

### 是什么（机制说明）

**`codex exec`**（别名 `e`）：非交互执行，适合 CI 与脚本化任务。**`/goal`**：交互模式设置持续目标，对应 `goals` **stable true**——与 Loop Engineering（time/goal/turn/proactive）叙事一致。

**`~/.codex/config.toml`**：CLI 主配置，承载 model、approval、MCP、sandbox 等。0.144.0+ 支持 `writes` approval；`auth_elicitation` **stable true**。

**`codex doctor`**：诊断安装/配置/认证/运行时，摘要 `12 ok · 1 idle · 5 notes · 1 warn · 4 fail`；支持 `--all`、`--json`。

**`codex features list`**：约 92 项 feature flag（stable / under development / deprecated / removed），判断 Code mode、Browser、Goals、Web Search 能力的权威入口。

### 适用场景

- **适合**：CI 集成、长程 `/goal` 循环、安装后健康检查、特性调研
- **不适合**：敏感写操作无 approval 的非交互场景

### 前置条件

Codex CLI 0.143+；`codex login` 或 API Key；可选编辑 `config.toml`。

### 详细使用步骤（业务用户）

1. 非交互：`codex exec "Summarize git diff and suggest commit message"`
2. 交互目标：`/goal Fix all failing tests in auth module`
3. 配置 approval：`config.toml` → `[approvals] mode = "writes"`
4. MCP：在 `config.toml` 添加 `[[mcp_servers]]` 块
5. 每日三连：`codex doctor` → `codex features list` → 确认版本

### 命令与配置示例

```bash
codex exec "Run unit tests and report failures"    # ⚠️ 需认证
codex review
codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
codex features list 2>&1 | grep -E "goals|unified_exec|auth_elicitation"
# goals              stable    true
# unified_exec       stable    true
# auth_elicitation   stable    true
```

```toml
# ~/.codex/config.toml
[approvals]
mode = "writes"
# model = "gpt-5.6-sol"   # ⚠️ 以账户可用模型为准
# [[mcp_servers]]
# name = "my-tools"
# command = "npx"
# args = ["-y", "my-mcp-server"]
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 子命令存在 |
| `goals` / `unified_exec` / `auth_elicitation` | ✅ stable true |
| `codex doctor` | ✅ `12 ok · 1 idle · 5 notes · 1 warn · 4 fail` |
| `features list` | ✅ ~92 项 |
| `codex exec` / `/goal` 推理 | ⚠️ 未实测（无 API Key） |
| `doctor --json` | ⚠️ 未深入解析 |
| `config.toml` 写入 | ⚠️ 未修改本环境 |

### 问题与解决方案

**exec 认证失败**：`codex login` 或检查 `config.toml`。**4 fail 是否阻塞**：多为认证/app-server idle，`--all` 确认。**Loop 成本过高**：从小目标试 `/goal`。**写操作误触**：`writes` approval + `codex sandbox`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| `codex --help` exec | ✅ |
| goals / doctor 本地输出 | ✅ 与 7/10 一致 |
| Automations 定时触发 | ⚠️ 桌面端为主 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 自动化工程师 | `codex exec` + CI webhook |
| 新用户 | 安装后 `doctor` + `features list` |
| 企业运维 | 版本锁定 + 统一 approval 策略 |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 要点 |
|------|-------------|------|
| **0.145.0-alpha.4** | 2026-07-11 00:10 | 预发布，无详细 release notes |
| 0.145.0-alpha.3 | 2026-07-10 23:11 | 预发布 |
| **0.144.1** (@latest) | 2026-07-09 23:02 | 安装器修复、macOS code_mode_host、embedded 回退 |
| 0.144.0 | 2026-07-09 16:47 | ChatGPT 桌面合并、writes 审批 |
| 0.143.0 | 2026-07-08 | 远程插件、MCP tool search |

## 今日研究员结论

7/11 Codex 叙事是「**桌面产品大合并后的平静日**」：stable **0.144.1** 连续第三日不变；**0.145.0-alpha.4** 仅 GitHub 预发布推进，Release body 无详细说明。7/9 **Codex joins ChatGPT desktop** 与 7/10 **GPT-5.6 + ChatGPT Work** 构成本周主线——CLI 侧 `browser_use`、`goals`、`code_mode_host` 均已 stable，可在 `codex exec` + `/goal` + `config.toml` 上构建自动化，推理链路本环境均标 ⚠️。

建议：`npm install @openai/codex@latest` → `codex doctor` → `codex features list` 三连检；桌面用户分清 Codex / Work 入口；关注 alpha.4 合入 stable 及 `standalone_web_search` 晋升时间。

---
