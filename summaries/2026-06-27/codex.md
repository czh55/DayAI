# OpenAI Codex 每日技术文档 — 2026-06-27

> 本地实测版本：**0.142.3**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 27 日 Codex **稳定版维持 0.142.3**（6/26 21:29Z，npm `@latest` 实测确认）。GitHub Pre-release 推送 **0.143.0-alpha.27**（18:35Z）与 **alpha.28**（20:15Z），body 均为空。**Codex Remote GA**（6/25）余波持续。本地 `codex doctor`：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。`features list`：`goals` stable、`code_mode` 仍 under development。

---

## 特性一：Codex CLI 0.142.3 — 稳定版维持（纯维护 Patch）

### 是什么（机制说明）

0.142.3（`rust-v0.142.3`）为 **maintenance-only** 更新：依赖安全更新、内部构建修复，与 0.142.2 **用户体验完全一致**。6/27 无新 stable 发布。

### 适用场景

- **适合**：0.142.2 零风险升级；CI pin `@latest`
- **不适合**：期待新功能者（跟踪 alpha 线）

### 前置条件

Node.js 18+；`npm install @openai/codex@0.142.3`

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.142.3`
3. `codex doctor` + `codex features list`
4. `codex login`（若 auth fail）

### 命令与配置示例

```bash
npm install @openai/codex@0.142.3
codex --version && codex doctor
codex exec "Run npm test and fix failures"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.142.3 |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| vs 0.142.2 | ✅ 无 user-facing 变更 |

### 问题与解决方案

**doctor fail**：`codex login` 或 `OPENAI_API_KEY`。**npm 双路径 fail**：统一 PATH 指向同一 package root。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub / npm @latest | ✅ maintenance-only，6/27 无变 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 继续 pin 0.142.3 |
| 早期测试者 | 关注 alpha.28 |

---

## 特性二：0.143.0-alpha.27 / alpha.28 — 预发布线加速

### 是什么（机制说明）

**alpha.27**（2026-06-27T18:35Z）与 **alpha.28**（20:15Z）同日连续预发布（`rust-v0.143.0-alpha.27/28`）。body 为空——CI 自动推送，推测含 `code_mode`、`artifact`、`chronicle` 进展。stable 与 alpha **勿混装**。

### 适用场景

- **适合**：早期测试者跟踪下一 stable
- **不适合**：生产、CI 主分支

### 前置条件

隔离环境；`npm install @openai/codex@alpha`

### 详细使用步骤（业务用户）

1. 创建隔离环境 → `npm install @openai/codex@alpha`
2. `codex features list` 对比 0.142.3 baseline
3. 记录差异后卸载，勿污染 stable

### 命令与配置示例

```bash
npm install @openai/codex@alpha
codex --version   # 可能 0.143.0-alpha.28
codex features list 2>&1 | rg "code_mode|chronicle|artifact"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GitHub alpha.27/28 | ✅ 18:35Z / 20:15Z |
| 本地安装 | ⚠️ 未安装（保持 stable） |

### 问题与解决方案

**混装**：勿同一 node_modules 装 alpha 与 stable。**行为突变**：对比 0.142.3 同任务日志。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Pre-release | ✅ 今日两版，频率较 6/26 上升 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 锁定 0.142.3 |
| code_mode 关注者 | 隔离试 alpha.28 |

---

## 特性三：Codex Remote GA — 手机遥控桌面 Agent（6/25 余波）

### 是什么（机制说明）

6/25 Remote 从 beta 进入 **GA**：ChatGPT 移动 App 连接已配对 Mac/Windows 主机，启动/继续任务、审查进度、**批准操作**；QR 一对一配对；6/8 后连接保持有效。

### 适用场景

- **适合**：长程 Agent 移动端审批；通勤/会议监控
- **不适合**：无 ChatGPT App；纯 CLI 环境

### 前置条件

Codex App + ChatGPT iOS/Android 最新版；QR 配对完成

### 详细使用步骤（业务用户）

1. 桌面 Codex App 启用 Remote → 显示 QR
2. 手机 ChatGPT App → Codex Remote → 扫描
3. 桌面启动长程任务；手机批准敏感操作

### 命令与配置示例

```bash
codex   # TUI 启动长程任务
# ChatGPT App → Codex Remote → Approve pending actions
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Remote GA 公告 | ✅ 6/25 Changelog |
| 手机配对 | ⚠️ 未实测 |

### 问题与解决方案

**配对失败**：两端 App 最新；6/8 前连接重配 QR。**看不到 task**：主机 App 运行中。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/25 | ✅ GA |
| vs Claude Tag / Cursor Cloud | Slack 异步 / IDE VM vs 手机控桌面 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent | 升级 App 测审批流 |
| 安全团队 | 评估 QR 配对审计 |

---

## 特性四：`codex exec` 与 `/goal` — 非交互与长程循环

### 是什么（机制说明）

**`codex exec`**（别名 `e`）非交互执行 Agent 任务，支持 `exec resume`、`exec review`——与 Claude `claude -p`、Cursor Automations cron 同类。**`/goal`**（TUI）让 Agent 循环直至验证条件满足，`goals` flag **stable**，状态存于 `~/.codex/goals_1.sqlite`。0.140.0+ 保留大文本与图片附件。

### 适用场景

- **exec**：CI 修复、nightly 脚本
- **/goal**：overnight 修复、验证驱动循环
- **不适合**：5 分钟内单次任务（用 exec 即可）

### 前置条件

Codex CLI ≥ 0.142.0；auth 已配置

### 详细使用步骤（业务用户）

1. `codex doctor` 确认 auth
2. 单次：`codex exec "<prompt>"`；长程：`codex` → `/goal <目标>`
3. Remote 用户手机审批；检查 git diff

### 命令与配置示例

```bash
codex exec "Run npm test and fix failures"
codex exec review
codex
# /goal 重构 auth 模块 @diagram.png
# /goal all unit tests pass and linter clean
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| exec help | ✅ |
| goals feature | ✅ stable true |
| 推理/`/goal` 实测 | ⚠️ 无 API Key |

### 问题与解决方案

**exec 超时**：检查 auth/网络。**goal 不停止**：明确验证条件。**未 commit**：prompt 明确 commit 策略。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| CLI help / features list | ✅ exec + goals stable |
| vs Claude `/loops` | ✅ 同类 Loop Engineering |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 用户 | exec + doctor preflight |
| 个人 | overnight `/goal` |
| Remote 用户 | 手机审批 + 桌面 goal |

---

## 特性五：Code mode、`codex features list` 与 `config.toml`

### 是什么（机制说明）

**`codex features list`** 显示 flags 的 stability 与 enabled 状态（0.142.3 共 33 enabled）。**Code mode**（`code_mode`、`code_mode_only`）仍 **under development false**。**`~/.codex/config.toml`** 管理代理、feature flags、MCP、模型。stable 亮点：`browser_use`、`auto_compaction`、`computer_use`、`goals`、`hooks`。

### 适用场景

- **适合**：升级后 flag 审计；企业代理；实验特性隔离
- **不适合**：生产启用 under development flags

### 前置条件

Codex CLI ≥ 0.142.0

### 详细使用步骤（业务用户）

1. `codex features list` 查看全量 flags
2. 编辑 `~/.codex/config.toml` `[features]` 或 `codex --enable <FEATURE>`
3. `codex doctor` 验证配置加载

### 命令与配置示例

```toml
[network]
respect_system_proxy = true

[features]
browser_use = true
auto_compaction = true
code_mode = false
goals = true
```

```bash
codex features list 2>&1 | rg "code_mode|browser_use"
codex --enable browser_use exec "Search docs and fix bug"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| code_mode | ✅ under development false |
| browser_use / goals | ✅ stable true |
| config 加载 | ✅ doctor config ok |
| 0.142.3 新 flag | ✅ 无 |

### 问题与解决方案

**under development 不稳定**：仅测试环境启用。**代理 auth 失败**：`respect_system_proxy = true`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| doctor --all | ✅ 33 enabled · 0 overridden |
| alpha.28 推测 | ⚠️ code_mode 可能转正 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT | 仅 stable flags + 系统代理 |
| code_mode 关注者 | 对比 alpha.28 features diff |

---

## 特性六：MCP Tool Search（0.142.2）与 `codex doctor`

### 是什么（机制说明）

**MCP tool search**（0.142.2 引入，0.142.3 保持）改进 Agent 在大量 MCP 工具中的检索效率，配合 `codex mcp` 管理外部 servers。**`codex doctor`** 扫描版本、auth、config、MCP、网络、sandbox，输出 **`12 ok · 1 idle · 5 notes · 1 warn · 4 fail`**（6/27 实测）。支持 `--summary compact`、`--all`、`--json`。

### 适用场景

- **MCP tool search**：多 MCP 集成、工具密集型工作流
- **doctor**：升级验证；CI preflight；排查 auth/MCP/网络

### 前置条件

Codex CLI ≥ 0.142.2（tool search）；CLI 已安装（doctor）

### 详细使用步骤（业务用户）

1. `codex mcp` 配置 servers；编辑 config.toml 代理段
2. `codex doctor` → 修复 fail（auth、install path、terminal）
3. 对比 0.142.0 vs 0.142.3 工具调用日志验证 tool search

### 命令与配置示例

```bash
codex mcp list
codex doctor
codex doctor --json > doctor-report.json
codex exec "Use MCP tools to query database schema"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor 摘要 | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| idle | ✅ app-server ephemeral |
| fail | ✅ auth、install、updates、terminal |
| MCP servers | ✅ 0 configured |
| bundled rg search | ✅ search provider bundled |

### 问题与解决方案

**tool search 行为变**：对比日志；必要时 pin 0.142.0。**auth fail**：`codex login`。**install fail**：统一 npm PATH。**terminal fail**：`TERM=xterm-256color`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.142.2 Release | ✅ MCP tool search |
| 6/26 doctor | ✅ fail 项一致，计数格式细化 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| MCP 重度用户 | 确认 0.142.2+ tool search 行为 |
| CI | `--json` preflight gate |
| 个人 | 每次升级后跑 doctor |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 0.142.3 | 6/26 21:29Z | 纯维护 patch；6/27 稳定维持 |
| 0.142.2 | 6/25 | MCP tool search、代理、安全加固 |
| 0.143.0-alpha.28 | 6/27 20:15Z | 最新 alpha，body 空 |
| 0.143.0-alpha.27 | 6/27 18:35Z | 同日较早 alpha |
| 0.143.0-alpha.26 | 6/26 20:08Z | 昨日 alpha |
| Remote GA | 6/25 | 手机遥控桌面 Agent |

## 今日研究员结论

**6/27 是 Codex alpha 加速日、stable 静默日**：npm `@latest` 维持 **0.142.3**，GitHub 同日推送 **alpha.27/28**，暗示 **0.143.0 GA 可能临近**。建议生产 pin 0.142.3 并跑 `codex doctor`（**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**）；长程用户测 **Remote GA** + **`/goal`**；`code_mode` 关注者隔离对比 **alpha.28**；MCP 用户确认 **0.142.2 tool search** 行为稳定。与 Claude Code 2.1.195、Cursor 3.9 同日无 stable 更新对照，三大 CLI 进入 **stable 静默 + alpha 活跃** 节奏。
