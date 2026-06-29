# OpenAI Codex 每日技术文档 — 2026-06-29

> 本地实测版本：**0.142.4**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 29 日 Codex **稳定版升至 0.142.4**（**05:04Z 今日发布**，npm `@latest` 实测确认）。GitHub Release body 标注 **「No user-facing changes」**——纯 maintenance patch。预发布线最新仍为 **0.143.0-alpha.29**（6/28 00:30Z）。**Codex Remote GA**（6/25）余波持续；OpenAI **GPT-5.6 预览**（6/27）或将影响未来 Codex 默认模型。本地 `codex doctor`：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。`features list`：`browser_use` stable、`code_mode` 仍 under development。

---

## 特性一：Codex CLI 0.142.4 — 稳定版维护 Patch（今日新）

### 是什么（机制说明）

0.142.4（`rust-v0.142.4`）于 **2026-06-29T05:04:25Z** 发布为正式 stable。Release body 明确：**「No user-facing changes were identified for this release」**——依赖安全更新、内部构建修复，与 0.142.3 用户体验完全一致。npm `@openai/codex@latest` 已同步。

### 适用场景

- **适合**：0.142.3 零风险升级；CI pin `@latest` 自动跟进
- **不适合**：期待新功能者（跟踪 alpha 线）

### 前置条件

Node.js 18+；`npm install @openai/codex@latest`

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.142.4`
3. `codex doctor` + `codex features list`
4. `codex login`（若 auth fail）

### 命令与配置示例

```bash
npm install @openai/codex@0.142.4
codex --version && codex doctor
codex exec "Run npm test and fix failures"
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5-codex"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.142.4 |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| vs 0.142.3 | ✅ 无 user-facing 变更（官方确认） |

### 问题与解决方案

**doctor fail**：`codex login` 或 `OPENAI_API_KEY`。**npm 双路径 fail**：统一 PATH 指向同一 package root。**误装 alpha**：`npm ls @openai/codex` 确认版本。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub rust-v0.142.4 | ✅ maintenance-only |
| npm @latest | ✅ 0.142.4 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 放心升级 0.142.4 |
| CI 维护者 | pin `@latest` 或显式 0.142.4 |
| 早期测试者 | 继续跟踪 alpha.29 |

---

## 特性二：0.143.0-alpha.29 — 预发布线（6/28，仍最新）

### 是什么（机制说明）

**alpha.29**（2026-06-28T00:30:41Z）为当前最新 Pre-release（`rust-v0.143.0-alpha.29`），body 仅「Release 0.143.0-alpha.29」。alpha 线自 6/26 起几乎每日推送（alpha.26 → alpha.29），推测含 `code_mode`、`artifact`、`chronicle` 进展。6/29 无新 alpha 发布。stable 与 alpha **勿混装**。

### 适用场景

- **适合**：早期测试者跟踪下一 stable
- **不适合**：生产、CI 主分支

### 前置条件

隔离环境；`npm install @openai/codex@alpha`

### 详细使用步骤（业务用户）

1. 创建隔离环境 → `npm install @openai/codex@alpha`
2. `codex features list` 对比 0.142.4 baseline
3. 记录差异后卸载，勿污染 stable

### 命令与配置示例

```bash
npm install @openai/codex@alpha
codex --version   # 可能 0.143.0-alpha.29
codex features list 2>&1 | rg "code_mode|chronicle|artifact"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| stable @latest | ✅ 0.142.4（未装 alpha） |
| alpha 对比 | ⚠️ 未在隔离环境实测 |

### 问题与解决方案

**stable/alpha 冲突**：分目录或 nvm 隔离。**alpha 功能不可用**：`features list` 确认 flag 状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.29 | ✅ 6/28 最新 pre-release |
| 6/29 无新 alpha | ✅ 确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 忽略 alpha，用 0.142.4 |
| 早期采用者 | 每周检查 alpha 新 tag |

---

## 特性三：Codex Remote GA — 移动端远程控制（6/25）

### 是什么（机制说明）

Codex Remote 于 6/25 宣布 GA：手机通过 QR 码配对桌面 Codex App，远程查看与控制 Agent 会话。与 Cursor iOS Remote Control（6/29）、Claude Code Remote Control 形成「移动端指挥三角」。支持查看 transcript、发送 follow-up、审查 artifact。

### 适用场景

- **适合**：出差/通勤时跟进长程 Agent 任务
- **不适合**：需精细本地 IDE 编辑的场景

### 前置条件

Codex App 桌面版运行中；手机安装 Codex App 或支持 QR 配对的客户端

### 详细使用步骤（业务用户）

1. 桌面 Codex App 启动 Agent 会话
2. 点击 Remote / QR 码图标
3. 手机扫码配对
4. 手机查看进度、发送指令、审查输出

### 命令与配置示例

```bash
# CLI 侧启动长程任务
codex exec --full-auto "Implement the auth refactor with tests"
# 然后在 App 中启用 Remote 供手机接入
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Remote GA Changelog | ✅ 6/25 官方确认 |
| QR 配对实测 | ⚠️ 未实测（Cloud Agent 无 GUI/手机） |

### 问题与解决方案

**配对失败**：确认桌面 App 与手机同账号。**会话断开**：检查网络与 App 后台限制。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex Changelog 6/25 | ✅ Remote GA |
| Cursor iOS 6/29 | ✅ 竞品同步推出移动端 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动办公 | 对比 Codex Remote vs Cursor iOS |
| 安全团队 | 审查远程会话权限 |

---

## 特性四：`codex exec` 与 Code Mode（under development）

### 是什么（机制说明）

`codex exec` 为非交互式 headless 执行模式，适合 CI 与脚本集成。`code_mode` 在 `features list` 中标记为 **under development**——推测为深度代码编辑模式，尚未 GA。`codex exec` 支持 `--full-auto` 低监督运行（需配置 permissions）。

### 适用场景

- **适合**：CI pipeline、定时任务、脚本化代码修复
- **不适合**：需频繁人工确认的交互式开发（用交互模式）

### 前置条件

Codex CLI ≥ 0.142.0；API Key 或 `codex login`；可选 `config.toml` permissions

### 详细使用步骤（业务用户）

1. `codex login` 或设 `OPENAI_API_KEY`
2. `codex exec "task description"` 单次执行
3. CI 中加 `--full-auto` 与 sandbox 配置
4. 跟踪 `code_mode` flag 等待 GA

### 命令与配置示例

```bash
codex exec "Fix all TypeScript errors in src/"
codex exec --full-auto "Run tests and fix failures"
```

```toml
# ~/.codex/config.toml
[sandbox]
mode = "workspace-write"

[permissions]
allow = ["npm test", "git commit"]
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 命令存在 |
| exec 推理实测 | ⚠️ 未实测（无 API Key） |
| `code_mode` flag | ✅ under development |

### 问题与解决方案

**exec 挂起**：检查 API Key 与网络。**sandbox 拒绝写入**：调整 `config.toml` sandbox mode。**code_mode 不可用**：等待 stable 发布，勿依赖 alpha。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| `features list` | ✅ code_mode under development |
| InfoQ codex-plugin-cc | ✅ exec 与 Claude Code 协作场景 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | `codex exec` 接入 CI |
| 开发者 | 交互模式为主，exec 为辅 |

---

## 特性五：`codex doctor` 与 `features list` — 环境诊断（稳定）

### 是什么（机制说明）

`codex doctor` 全面检查 CLI 安装、auth、app-server、update loop、config 等子系统，输出 ok/idle/notes/warn/fail 统计。`features list` 列出所有 feature flag 及 stable/under development/removed 状态——是判断 `code_mode`、`browser_use`、`goals` 等能力是否可用的权威来源。

### 适用场景

- **适合**：首次安装、升级后验证、排查 auth 问题
- **不适合**：—（所有用户建议使用）

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex doctor` 查看完整报告
2. `codex doctor --summary` 紧凑输出
3. `codex features list` 查看功能 flag
4. 针对 fail 项按提示修复（通常 `codex login`）

### 命令与配置示例

```bash
codex doctor
codex doctor --summary
codex doctor --json 2>/dev/null | head -20
codex features list 2>&1 | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| `features list` | ✅ browser_use stable, code_mode under development |
| fail 原因 | ⚠️ 无 API Key / app-server 未运行（预期） |

```bash
# 实测输出摘要
codex-cli 0.142.4
# doctor: 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
# features: apps stable, browser_use stable, code_mode under development
```

### 问题与解决方案

**4 fail**：通常 auth + app-server；`codex login` 修复 auth。**app-server not running**：交互模式会自动启动；headless 可忽略。**warn 项**：阅读 doctor 详细输出逐条处理。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官方 CLI | ✅ doctor/features 为标准诊断工具 |
| 本环境 | ✅ 与 0.142.3 诊断结构一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后第一件事 `codex doctor` |
| CI | `codex doctor --json` 门禁检查 |
| 升级后 | 对比 `features list` 变化 |

---

## 版本对照表

| 版本 | 发布 | 关键变更 |
|------|------|----------|
| **0.142.4** | **6/29 05:04Z** | **今日新 stable；maintenance-only** |
| 0.142.3 | 6/26 21:29Z | 上一 stable |
| 0.143.0-alpha.29 | 6/28 00:30Z | 最新 pre-release |

## 今日研究员结论

Codex 今日最大变化是 **0.142.3 → 0.142.4** 维护升级，无 user-facing 变更，生产可放心跟进。GPT-5.6 预览（6/27）或将在未来几周进入 Codex 默认模型链，值得关注。移动端 Remote GA + Cursor iOS 公测标志「随时指挥 Agent」成为 Q3 标配。建议：pin 0.142.4；用 `doctor` + `features list` 跟踪能力；期待 `code_mode` GA 前勿依赖。

---
