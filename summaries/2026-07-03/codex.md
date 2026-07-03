# OpenAI Codex 每日技术文档 — 2026-07-03

> 本地实测版本：**0.142.5**（stable）｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 3 日本地 `npm install @openai/codex@latest` 实测稳定版 **0.142.5**（与 7/1 相同）。GitHub 预发布线 **连续第 3 日** 更新：**0.143.0-alpha.35** 于 **2026-07-03T02:33Z** 发布（commit `5969673`）。npm 可装 `@openai/codex@0.143.0-alpha.35` 但 `@latest` 仍指向 stable。`codex doctor`：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**；`features list` 显示 `browser_use` stable、`code_mode` under development。无 API Key，推理未实测。

---

## 特性一：稳定版 0.142.5 — WebSocket Trace 安全修复（2026-07-01，仍 Latest）

### 是什么（机制说明）

**0.142.5**（`rust-v0.142.5`）为当前 **Latest** 稳定版。核心修复：**防止完整 Responses WebSocket 请求 payload 写入 trace 日志**（#30771）。隐私/安全补丁，无新用户可见功能面。

### 适用场景

- **适合**：生产环境启用 trace 的团队；所有 stable 用户
- **不适合**：无（建议全员升级）

### 前置条件

- npm 或系统包管理器安装 Codex CLI
- OpenAI 账户（推理需 API Key）

### 详细使用步骤（业务用户）

1. `cd tools && npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.142.5`
3. `codex doctor` 检查环境
4. 若启用 trace，确认升级后日志不含完整 WS payload
5. 日常使用 `codex` 或 `codex exec`

### 命令与配置示例

```bash
npm install @openai/codex@0.142.5
codex --version
```

```bash
codex doctor 2>&1 | tail -10
```

```toml
# ~/.codex/config.toml
# trace 相关键以官方 schema 为准
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `codex-cli 0.142.5` |
| `doctor` | ✅ 12 ok · 1 warn · 4 fail（无 Key 预期） |
| trace 修复 | ⚠️ 未实测 trace 输出 |

### 问题与解决方案

**doctor 4 fail**：通常未登录；`codex login` 或 `OPENAI_API_KEY`。**升级无感知变化**：预期，仅安全修复。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub rust-v0.142.5 | ✅ #30771 |
| npm @latest | ✅ 0.142.5 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产团队 | 保持 @latest stable |
| 安全团队 | 审计 trace 配置 |

---

## 特性二：预发布 0.143.0-alpha.35 — 三日连更（2026-07-03）

### 是什么（机制说明）

**0.143.0-alpha.35** 于 **2026-07-03T02:33Z** 发布，延续 7/2 的 alpha.33（01:58Z）、alpha.34（21:42Z）节奏。Release note 无详细 changelog（alpha 惯例）。npm 已发布 `0.143.0-alpha.35` 包。

### 适用场景

- **适合**：尝鲜者、CI 预发布轨道测试
- **不适合**：生产默认依赖

### 前置条件

- 隔离环境或独立 `node_modules`

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@0.143.0-alpha.35`
2. `codex --version` 确认 alpha 版本号
3. `codex features list` 对比 stable 差异
4. `codex doctor` 检查兼容性
5. 勿与 production `@latest` 混用

### 命令与配置示例

```bash
npm install @openai/codex@0.143.0-alpha.35
./node_modules/.bin/codex --version
# codex-cli 0.143.0-alpha.35
```

```bash
codex features list 2>&1 | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| npm 存在 alpha.35 | ✅ `npm view` 确认 |
| `@latest` 指向 | ✅ 仍 0.142.5 |
| alpha.35 安装运行 | ⚠️ 本任务用 @latest，未切换安装 |

### 问题与解决方案

**alpha 与 stable 行为差异**：仅在沙箱测试。**三日连更无 changelog**：关注 GitHub 是否出现带说明的 stable 0.143。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.35 时间戳 | ✅ 7/3 02:33Z |
| npm 版本号 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 隔离环境试 alpha.35 |
| 生产 | 等 0.143 stable |

---

## 特性三：`codex doctor` 环境诊断（持续）

### 是什么（机制说明）

`codex doctor` 扫描 CLI、app-server、认证、配置等子系统，输出 **ok / idle / notes / warn / fail** 汇总。本日实测：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**；app-server status **not running**（ephemeral mode）。

### 适用场景

- **适合**：首次安装、升级后、CI 健康检查
- **不适合**：替代功能测试

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. `codex doctor`
2. 阅读 fail 项（常见：未登录）
3. `codex doctor --json` 获取机器可读报告（若支持）
4. 修复后重跑直至 fail 清零（或仅余 Key 相关）

### 命令与配置示例

```bash
codex doctor 2>&1 | tail -10

codex doctor --summary compact
codex doctor --all
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor 汇总 | ✅ 12 ok · 4 fail |
| app-server | ⚠️ not running（预期 ephemeral） |

### 问题与解决方案

**4 fail 无 Key**：`export OPENAI_API_KEY=...` 或 `codex login`。**app-server missing**：CLI-only 使用可忽略。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本日实测 | ✅ 与 7/2 模式一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 升级后跑 doctor |
| CI | 集成 `--json` 检查 |

---

## 特性四：`codex features list` — 功能开关矩阵（持续）

### 是什么（机制说明）

`codex features list` 列出 CLI/App 功能及状态：**stable**、**under development**、**removed**。本日要点：

- **stable**：`apps`、`auto_compaction`、`browser_use`、`browser_use_external`、`browser_use_full_cdp_access`
- **under development**：`code_mode`、`chronicle`、`artifact`、`auth_elicitation`
- **removed**：`collaboration_modes`、`codex_git_commit` 等

### 适用场景

- **适合**：判断某能力是否生产可用
- **不适合**：替代官方 docs

### 前置条件

- codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex features list`
2. 关注目标功能状态
3. `under development` 功能勿依赖生产 SLA
4. 对比 alpha vs stable 输出差异（若安装 alpha）

### 命令与配置示例

```bash
codex features list 2>&1 | head -15
```

```bash
codex features list 2>&1 | rg "code_mode|browser_use"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` head | ✅ 正常 |
| `code_mode` | under development |
| `browser_use` | stable |

### 问题与解决方案

**功能不可用**：检查 list 状态是否为 removed/under development。**Browser Developer mode**：依赖 `browser_use*` stable 族。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本日 CLI 输出 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Agent 开发者 | 优先 browser_use stable |
| 尝鲜者 | 关注 code_mode 进展 |

---

## 特性五：`codex exec` 与非交互自动化（持续）

### 是什么（机制说明）

`codex exec` 在脚本/CI 中非交互执行 Codex 任务，对标 Claude Code `-p/--print`。配合 `config.toml` 定义模型、沙箱、功能开关。本日无 exec 行为变更公告，仍为 stable 能力。

### 适用场景

- **适合**：CI 修 lint、批量 refactor、Automations 集成
- **不适合**：需多轮人工审批的敏感变更

### 前置条件

- API Key 或 `codex login`
- 明确 repo 工作目录

### 详细使用步骤（业务用户）

1. 配置 `~/.codex/config.toml`
2. `cd your-repo`
3. `codex exec "fix TypeScript errors in src/"`
4. 检查 git diff
5. CI 中设置 `OPENAI_API_KEY` secret

### 命令与配置示例

```bash
codex exec "Add missing unit tests for utils/parser.ts"
```

```toml
# ~/.codex/config.toml 片段
# model = "gpt-5.3-codex"  # 以官方可用 ID 为准
```

```bash
codex exec --help
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `exec --help` | ⚠️ 未单独跑（无 Key） |
| 推理执行 | ⚠️ 未实测 |

### 问题与解决方案

**exec 超时**：调整任务粒度。**沙箱拒绝**：检查 `config.toml` sandbox 设置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官方 docs | ✅ exec 为 documented 能力 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 集成 exec + doctor |
| 个人 | 先交互 `codex` 熟悉再 exec |

---

## 版本对照表

| 版本 | 日期 (UTC) | 通道 | 要点 |
|------|------------|------|------|
| 0.143.0-alpha.35 | 2026-07-03 02:33 | pre-release | 无详细 changelog |
| 0.143.0-alpha.34 | 2026-07-02 21:42 | pre-release | — |
| 0.143.0-alpha.33 | 2026-07-02 01:58 | pre-release | — |
| 0.142.5 | 2026-07-01 01:15 | **Latest** | WebSocket trace #30771 |
| 0.142.4 | 2026-06-29 | stable | 无用户可见变更 |

## 今日研究员结论

生产继续 **0.142.5**；alpha 线三日连更暗示 **0.143 stable** 临近。`browser_use` 已 stable 而 `code_mode` 仍开发中——Agent 浏览器能力可投入评估，Code mode 再等 stable。无 API Key，仅 CLI 层实测完成。
