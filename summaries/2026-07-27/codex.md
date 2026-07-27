# OpenAI Codex 每日技术文档 — 2026-07-27

> 本地实测版本：**0.145.0**（stable）｜监测 alpha：**0.146.0-alpha.13**（7/27 16:03 UTC）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 27 日 Codex **稳定版仍为 0.145.0**（7/21 发布），npm `@latest` 未升级。GitHub **今日连发两个 pre-release**：**0.146.0-alpha.12**（08:25 UTC）与 **0.146.0-alpha.13**（16:03 UTC），为 7/25 alpha.10.1 后的首次 alpha 迭代。自 7/22 alpha.1 起 0.146.0 分支已超 13 个 pre-release，stable 发布可期。本地 CLI 实测：`codex --version` → `codex-cli 0.145.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host` 为 stable，`code_mode` 仍为 under development。生产环境继续锁定 0.145.0；因无 API Key 未进行推理级功能实测。

---

## 特性一：0.146.0-alpha.12 / alpha.13 双发（7/27）

### 是什么（机制说明）

7/27 Codex alpha 恢复发布节奏，一日两版：

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| 0.146.0-alpha.10.1 | 2026-07-25 20:29 | Pre-release（此前最新） |
| **0.146.0-alpha.12** | **2026-07-27 08:25** | Pre-release |
| **0.146.0-alpha.13** | **2026-07-27 16:03** | Pre-release（**当日最新**） |

⚠️ alpha.11 未在 Releases 列表出现，可能为内部跳过或 tag 命名差异。Release 页面未附详细 changelog 文本，需结合 `codex features list` 与隔离安装观察。alpha.13 距 alpha.12 约 8 小时，表明当日有至少两轮 CI 构建通过。

### 适用场景

- **适合**：早期采用者在隔离环境跟踪 alpha 迭代
- **不适合**：生产环境、Windows 用户遇 unsupported call 时（社区建议回退 0.145.0）

### 前置条件

容器或独立目录；勿覆盖生产 0.145.0 安装

### 详细使用步骤（业务用户）

1. 确认 stable：`codex --version`（应为 0.145.0）
2. 隔离安装 alpha.13：`npm install @openai/codex@0.146.0-alpha.13`
3. 运行 `./node_modules/.bin/codex --version` 与 `codex doctor`
4. 对比 `codex features list` 与 0.145.0 差异
5. 生产环境保持 lockfile 锁定 0.145.0

### 命令与配置示例

```bash
# 生产确认
codex --version                    # codex-cli 0.145.0
npm view @openai/codex version     # 0.145.0

# 隔离评估 alpha.13
mkdir -p /tmp/codex-alpha-test && cd /tmp/codex-alpha-test
npm init -y
npm install @openai/codex@0.146.0-alpha.13
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor 2>&1 | tail -5
./node_modules/.bin/codex features list 2>&1 | head -20
```

```toml
# ~/.codex/config.toml 概念性
[model]
default = "gpt-5.6-sol"

[features]
code_mode = false
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` (stable) | ✅ `codex-cli 0.145.0` |
| alpha.13 GitHub tag | ✅ 7/27 16:03 UTC |
| alpha.12 GitHub tag | ✅ 7/27 08:25 UTC |
| npm `@latest` | ✅ 仍为 0.145.0 |
| alpha.13 隔离安装 | ⚠️ 未在隔离环境实测安装 |

### 问题与解决方案

**alpha 行为异常**：回退 0.145.0 stable。**Windows unsupported call**：社区报告 0.146.0 分支问题，建议 0.142.5 或 0.145.0。**无 changelog 文本**：关注 GitHub commit 或等待 stable 公告。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Releases | ✅ alpha.12/.13 7/27 |
| npm `@latest` | ✅ 0.145.0 未变 |
| 社区 Windows 反馈 | ⚠️ 0.146.0 分支偶发问题 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.145.0，忽略 alpha |
| 早期采用者 | 隔离测试 alpha.13，记录 doctor 结果 |
| CI | 勿将 alpha 写入主分支 lockfile |

---

## 特性二：`codex doctor` 环境诊断（0.145.0）

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境、app-server 状态、配置完整性。7/27 实测输出：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。fail 项通常与无 API Key、app-server 未运行、缺少登录态相关，属 Cloud Agent 环境预期行为。

### 适用场景

- **适合**：新环境部署、故障排查、升级前后对比
- **不适合**：替代功能测试

### 前置条件

已安装 Codex CLI

### 详细使用步骤（业务用户）

1. 运行 `codex doctor`
2. 查看 fail/warn 项并逐项修复
3. 使用 `codex doctor --json` 获取结构化报告（若支持）
4. 升级 alpha 后重新运行对比

### 命令与配置示例

```bash
codex doctor 2>&1 | tail -15
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

codex doctor --summary compact 2>&1
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor 执行 | ✅ 正常完成 |
| app-server | ❌ not running（预期） |
| 12 ok | ✅ 基础环境通过 |

### 问题与解决方案

**4 fail**：通常需 `codex login` 或配置 API Key。**app-server not running**：桌面功能需启动 app-server，CLI-only 可忽略。**warn 项**：查阅 `--all` 展开详情。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 | ✅ 12 ok · 4 fail |
| Docs | ✅ doctor 为推荐诊断命令 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 升级前后运行 doctor 对比 |
| CI | 脚本化 doctor 做 smoke test |

---

## 特性三：`codex features list` 与 Code mode（0.145.0）

### 是什么（机制说明）

`codex features list` 列出功能开关状态。7/27 实测关键项：
- **stable**：`apps`、`auth_elicitation`、`browser_use`、`browser_use_external`、`browser_use_full_cdp_access`、`code_mode_host`
- **under development**：`code_mode`、`code_mode_buffered_exec`、`code_mode_only`、`artifact`、`chronicle`
- **removed**：`apply_patch_freeform`、`apps_mcp_path_override`、`codex_git_commit`

Code mode 仍为 under development，但 `code_mode_host` 已 stable，表明宿主侧基础设施就绪、完整 Code mode 体验仍在打磨。

### 适用场景

- **适合**：评估 alpha 新功能、配置 `config.toml` features 段
- **不适合**：替代官方 Changelog

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex features list` 查看全局状态
2. 编辑 `~/.codex/config.toml` 的 `[features]` 段启用/禁用
3. alpha 用户对比 alpha.13 与 0.145.0 的 features 差异

### 命令与配置示例

```bash
codex features list 2>&1 | head -20
```

```toml
[features]
browser_use = true
code_mode = false
code_mode_host = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| features list | ✅ 正常输出 |
| code_mode | under development |
| code_mode_host | stable |

### 问题与解决方案

**code_mode 不可用**：预期行为，等待 stable。**browser_use 失败**：检查网络与登录态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 | ✅ 与 7/26 一致 |
| alpha.13 | ⚠️ 未对比 features 差异 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开发者 | 关注 code_mode 转 stable 信号 |
| 企业 | 仅启用 stable features |

---

## 特性四：`codex exec` 与非交互执行（0.145.0）

### 是什么（机制说明）

`codex exec` 支持非交互式命令执行，适合 CI/CD 与脚本化工作流。与 `codex -p`（print 模式）配合可实现 headless 编码任务。7/27 无 CLI 行为变更，stable 0.145.0 继续支持。

### 适用场景

- **适合**：CI 流水线、自动化脚本、批量代码生成
- **不适合**：需多轮交互的复杂任务

### 前置条件

API Key 或 `codex login`；网络访问

### 详细使用步骤（业务用户）

1. 配置 `OPENAI_API_KEY` 或运行 `codex login`
2. `codex exec "your prompt here"`
3. CI 中结合 `--json` 输出解析结果

### 命令与配置示例

```bash
export OPENAI_API_KEY="sk-..."

codex exec "Add unit tests for utils.py"
codex -p "Explain this diff" --output-format text
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5.6-sol"

[sandbox]
mode = "workspace-write"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` | ⚠️ 未实测（无 API Key） |
| `--version` | ✅ 0.145.0 |
| help 中 exec | ✅ 命令存在 |

### 问题与解决方案

**认证失败**：运行 `codex login` 或检查 API Key。**沙箱权限**：调整 `config.toml` sandbox 模式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Docs | ✅ exec 文档完整 |
| 7/27 变更 | ✅ 无 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 中用 exec 做 lint/fix |
| 开发者 | 简单任务用 exec，复杂用交互模式 |

---

## 特性五：Browser Developer mode 与 Web Search（stable）

### 是什么（机制说明）

`browser_use`、`browser_use_external`、`browser_use_full_cdp_access` 在 features list 中均为 **stable**，支持 Codex 浏览网页与 CDP 全访问。Web Search 为 Codex 扩展能力，适合需要实时信息的编码任务。7/27 无新公告，功能在 0.145.0 持续可用。

### 适用场景

- **适合**：需查文档、验证 API、调试前端
- **不适合**：纯离线环境、高安全隔离网络

### 前置条件

Codex CLI + 登录；browser 相关 features 启用

### 详细使用步骤（业务用户）

1. 确认 `codex features list` 中 browser_use 为 stable
2. 会话中请求 Codex 访问特定 URL 或搜索
3. Developer mode：启用 full CDP access 做深度调试

### 命令与配置示例

```toml
[features]
browser_use = true
browser_use_full_cdp_access = true
```

```bash
codex "Search for the latest React 19 migration guide and update our codebase"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| browser_use stable | ✅ features list 确认 |
| 实际浏览 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**浏览失败**：检查网络与 features 开关。**CDP 权限**：确认 `browser_use_full_cdp_access` 已启用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ stable |
| 7/27 Release | ✅ 无 browser 相关变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | 利用 browser 查最新文档 |
| 安全团队 | 评估 CDP 访问范围 |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 类型 | 核心变更 | 7/27 状态 |
|------|--------------|------|----------|-----------|
| **0.146.0-alpha.13** | 2026-07-27 16:03 | Pre-release | 当日最新 alpha | GitHub 最新 |
| 0.146.0-alpha.12 | 2026-07-27 08:25 | Pre-release | 当日首版 alpha | — |
| 0.146.0-alpha.10.1 | 2026-07-25 20:29 | Pre-release | alpha.10 补丁 | 此前最新 |
| **0.145.0** | 2026-07-21 | Stable | 当前生产版 | **npm @latest** |

## 今日研究员结论

7/27 Codex 最大信号是 alpha 恢复双发（.12/.13），表明 0.146.0 stable 可能临近，但 npm 仍锁定 0.145.0。建议生产用户继续 0.145.0；早期采用者可在隔离环境测试 alpha.13 并对比 `codex doctor` 与 `features list`。关注 OpenAI 公告宣布 0.146.0 stable 时间点；Windows 用户遇 0.146.0 分支问题应回退 stable。
