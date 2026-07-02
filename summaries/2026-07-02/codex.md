# OpenAI Codex 每日技术文档 — 2026-07-02

> 本地实测版本：**0.142.5**（stable）｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 2 日本地 `npm install @openai/codex@latest` 实测稳定版 **0.142.5**（与 7/1 相同）。GitHub 预发布线 **一日双更**：**0.143.0-alpha.33**（01:58Z）与 **0.143.0-alpha.34**（21:42Z），release note 无详细 changelog 条目。`codex doctor` 报告 **12 ok · 1 idle · 5 notes · 1 warn · 4 fail**；`features list` 显示 `browser_use` stable、`code_mode` under development。无 API Key，推理未实测。

---

## 特性一：稳定版 0.142.5 — WebSocket Trace 日志安全修复（2026-07-01）

### 是什么（机制说明）

**0.142.5**（`rust-v0.142.5`）为当前 **Latest** 稳定版，核心修复：**防止完整 Responses WebSocket 请求 payload 写入 trace 日志**（#30771）。属隐私/安全补丁，无新用户可见功能。与 0.142.4 相比仅此一修复项。

### 适用场景

- **适合**：生产环境启用 trace 日志的团队；所有 stable 用户升级
- **不适合**：已锁定旧版且未启用 trace 的孤立环境（仍建议升级）

### 前置条件

- Node.js 或 npm 全局/本地安装
- OpenAI 账户（推理需 API Key）

### 详细使用步骤（业务用户）

1. `cd tools && npm install @openai/codex@latest`
2. `codex --version` 确认 `0.142.5`
3. `codex doctor` 检查环境
4. 若启用 trace，确认升级后日志不再含完整 WS payload
5. 日常使用 `codex` 或 `codex exec` 不变

### 命令与配置示例

```bash
npm install @openai/codex@0.142.5
codex --version
# codex-cli 0.142.5
```

```bash
codex doctor 2>&1 | tail -10
```

```toml
# ~/.codex/config.toml 片段
# trace 相关配置以官方 schema 为准
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `codex-cli 0.142.5` |
| `doctor` | ✅ 12 ok · 1 warn · 4 fail（无 API Key 预期） |
| trace 修复验证 | ⚠️ 未实测 trace 输出 |

### 问题与解决方案

**doctor 4 fail**：常见为未登录/API Key 缺失；`codex login` 或设置 `OPENAI_API_KEY`。**升级后行为变化**：0.142.5 功能面等同 0.142.4，异常应报 issue。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub rust-v0.142.5 | ✅ #30771 |
| npm @latest | ✅ 0.142.5 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产团队 | 立即升级 |
| 个人开发者 | `@latest` 即可 |

---

## 特性二：预发布 0.143.0-alpha.33 / alpha.34 — 一日双更（2026-07-02）

### 是什么（机制说明）

**alpha.33** 发布 **2026-07-02T01:58:50Z**（`ad4928c`）；**alpha.34** 发布 **2026-07-02T21:42:01Z**（`af6bfc2`）。两版均为简短 pre-release，**未列用户可见 changelog**（alpha 线惯例）。暗示 0.143 stable 临近。npm `@latest` 仍指向 0.142.5，需显式安装 alpha 标签。

### 适用场景

- **适合**：早期尝鲜、CI 预发布验证
- **不适合**：生产默认依赖

### 前置条件

- 隔离测试环境
- 接受无 changelog 的风险

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@0.143.0-alpha.34`
2. `codex --version` 确认 alpha 版本
3. `codex features list` 对比 stable 差异
4. 在沙箱 repo 运行典型 `codex exec` 任务
5. 发现问题回退 `npm install @openai/codex@0.142.5`

### 命令与配置示例

```bash
npm install @openai/codex@0.143.0-alpha.34
./node_modules/.bin/codex --version
# codex-cli 0.143.0-alpha.34
```

```bash
codex features list 2>&1 | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| stable npm @latest | ✅ 0.142.5（未变） |
| alpha.34 GitHub 发布时间 | ✅ 7/2 21:42Z |
| alpha 安装实测 | ⚠️ 今日实测保持 stable 0.142.5 |

### 问题与解决方案

**alpha 无 changelog**：对比 GitHub commit `ad4928c`…`af6bfc2` 或等 stable release notes。**一日双更频繁**：锁定具体 alpha 版本号避免 CI 漂移。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Releases | ✅ 两版时间戳 |
| npm @latest | ✅ 仍 stable |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 尝鲜开发者 | 试 alpha.34 |
| 企业 CI | pin 0.142.5 至 stable 发布 |

---

## 特性三：`codex doctor` 环境诊断（全版本）

### 是什么（机制说明）

`codex doctor` 扫描 CLI、app-server、沙箱、认证、网络等子系统，输出 **ok / idle / notes / warn / fail** 摘要。Cloud Agent 无 GUI 时仍是验证安装的首选命令。

### 适用场景

- **适合**：新环境首次安装、升级后冒烟测试
- **不适合**：替代功能级集成测试

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. `codex doctor` 全量输出
2. `codex doctor 2>&1 | tail -10` 看摘要行
3. 对 fail 项逐条 `--all` 展开
4. 修复 auth/sandbox 后重跑

### 命令与配置示例

```bash
codex doctor
codex doctor --summary
codex doctor --json  # 若支持
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 摘要行 | ✅ `12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed` |
| app-server | ⚠️ status not running（headless 环境预期） |

### 问题与解决方案

**app-server not running**：桌面完整体验需启动 app-server；纯 CLI 可能 idle。**4 fail**：检查 `OPENAI_API_KEY` 与 `codex login`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官方 docs CLI 章节 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 运维 | 纳入 CI smoke |
| 开发者 | 升级前后各跑一次 |

---

## 特性四：`codex features list` 与 Code Mode 路线图

### 是什么（机制说明）

`codex features list` 列出功能 flag 状态：**stable** / **under development** / **removed**。今日实测：`browser_use` 系列 **stable**；`code_mode`、`code_mode_only`、`chronicle` **under development**；`collaboration_modes` **removed** true。

### 适用场景

- **适合**：判断某能力是否可在当前版本启用
- **不适合**：替代官方 docs 详细说明

### 前置条件

- codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex features list 2>&1 | head -30`
2. 关注目标特性状态（如 `code_mode`）
3. 查阅 [Codex Features docs](https://developers.openai.com/codex) 启用方式
4. 在 `config.toml` 中配置（若文档要求）

### 命令与配置示例

```bash
codex features list 2>&1 | grep -E "code_mode|browser"
```

```toml
# ~/.codex/config.toml 示例（以 config-schema.json 为准）
# [features]
# browser_use = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` | ✅ 正常输出 |
| `code_mode` | under development false |
| `browser_use` | stable true |

### 问题与解决方案

**特性显示 stable 但不可用**：可能需 Plus/Team 或额外 flag。**`collaboration_modes` removed**：勿依赖旧文档。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list 输出 | ✅ |
| developers.openai.com | ✅ 文档同步查 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 功能规划者 | 跟踪 `code_mode` 转 stable |
| 日常用户 | 优先 `browser_use` stable 能力 |

---

## 特性五：`codex exec` 与非交互 Agent（stable 能力）

### 是什么（机制说明）

`codex exec`（及历史别名）在终端 **非交互** 执行 coding agent 任务，适合 CI/script 集成。与 Claude Code `-p/--print` 类似。0.142.5 功能面延续 0.142.x 系列。

### 适用场景

- **适合**：脚本化修复、批量 refactor、CI 集成
- **不适合**：需多轮交互探索的模糊需求

### 前置条件

- API Key 已配置
- 仓库 git 状态清晰（agent 可能改文件）

### 详细使用步骤（业务用户）

1. 在目标 repo 根目录
2. `codex exec "fix all eslint errors in src/"`
3. 审查 git diff
4. CI 中限制 sandbox 与网络权限

### 命令与配置示例

```bash
export OPENAI_API_KEY="sk-..."
codex exec "Add type hints to all functions in utils/"
```

```bash
codex exec --help
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 可调用 |
| 实际 exec 推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**exec 超时**：拆分任务；检查 sandbox 网络。**意外改文件**：用 git stash/branch 隔离。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 中 pin 0.142.5 |
| 开发者 | 交互用 `codex`，批处理用 `codex exec` |

---

## 版本对照表

| 版本 | 发布日 | 通道 | 要点 |
|------|--------|------|------|
| **0.143.0-alpha.34** | 2026-07-02 21:42Z | pre-release | 无公开 changelog |
| **0.143.0-alpha.33** | 2026-07-02 01:58Z | pre-release | 无公开 changelog |
| **0.142.5** | 2026-07-01 01:15Z | **Latest stable** | WS trace 日志修复 #30771 |
| 0.143.0-alpha.32 | 2026-07-01 03:47Z | pre-release | — |
| 0.142.4 | 2026-06-29 | stable | 维护补丁 |

## 今日研究员结论

Codex **stable 维持 0.142.5**，生产环境无需因 7/2 alpha 双更而急于升级。alpha.33/34 一日连发值得跟踪 **0.143 stable 发布节奏**；`code_mode` 仍 under development，与 Claude Code `/loops`、Cursor cloud subagent 形成行业「长程 coding agent」同台竞技。本地务必保持 `codex doctor` 冒烟；无 Key 时仍可验证 CLI 安装链完整。

---
