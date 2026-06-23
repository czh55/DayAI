# OpenAI Codex 每日技术文档 — 2026-06-23

> 本地实测版本：**0.142.0**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 23 日本地实测 **codex-cli 0.142.0**（较 6/20 的 0.141.0 **+1 minor**）。**0.142.0** 于 6/22 22:19 UTC 发布稳定版，新增 `/usage` credits 兑换、`/plugins` 分区推荐、rollout token 预算、indexed web-search、多 agent delegation 配置。6/23 同日 alpha 线已推至 **0.143.0-alpha.9**。`codex doctor` 显示 12 ok · 1 warn · 4 fail（auth 未登录）。

---

## 特性一：`/usage` Credits 显示与兑换（0.142.0）

### 是什么（机制说明）

0.142.0 新增 `/usage` 命令，可：

- 显示当前 usage 状态与 earned **usage-limit reset credits**
- 确认、重试并刷新 credits 可用状态
- 与 Fable 5 切换日形成对标——Codex 侧强化用量可视化

### 适用场景

- **适合**：接近 usage limit 的开发者、团队用量管理员
- **不适合**：无 usage limit 的 unlimited 计划（可能显示简化信息）

### 前置条件

- Codex CLI ≥ 0.142.0
- 已登录 OpenAI 账号（`codex login`）

### 详细使用步骤（业务用户）

1. 升级：`cd /workspace/tools && npm install @openai/codex@latest`
2. 验证：`./node_modules/.bin/codex --version` → `0.142.0`
3. 登录：`codex login`（本环境未登录）
4. 交互模式输入：`/usage`
5. 按提示确认兑换 earned credits
6. 观察 refreshed availability 状态

### 命令与配置示例

**基础**

```
/usage
```

**进阶 — config.toml 用量相关**

```toml
# ~/.codex/config.toml
[usage]
show_remaining_budget = true
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.142.0

./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.142.0 |
| `/usage` | ⚠️ 未实测（auth 未登录） |
| Release notes | ✅ GitHub 0.142.0 确认 |

### 问题与解决方案

**错误 1：`/usage` 无 credits 可兑换**

排查：credits 需通过特定活动赚取；检查账户 plan。

**错误 2：兑换后状态未刷新**

排查：0.142.0 含 retry 逻辑；重新 `/usage` 或 `codex doctor`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [GitHub 0.142.0 Release](https://github.com/openai/codex/releases/tag/rust-v0.142.0) | ✅ #28154, #28793 |
| Changelog | ✅ 交叉一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 定期 `/usage` 避免意外断服 |
| 团队 Admin | 结合 rollout token budget 双重治理 |

---

## 特性二：`/plugins` 分区与智能推荐（0.142.0）

### 是什么（机制说明）

`/plugins` 现按以下分区组织远程 plugins：

- **OpenAI Curated**：官方精选
- **Workspace**：工作区插件
- **Shared with me**：他人分享

Eligible turns 可**推荐并自动安装**相关 plugins（#26703, #28399, #28400）。

与 Cursor Customize 页 + Marketplace leaderboard 形成生态对标。

### 适用场景

- **适合**：快速扩展 Agent 能力（MCP、skills、tools）
- **不适合**：严格插件审计环境（需审查后再装）

### 前置条件

- Codex CLI ≥ 0.142.0
- 网络访问 plugin catalog

### 详细使用步骤（业务用户）

1. Codex 交互会话：`/plugins`
2. 浏览 OpenAI Curated / Workspace / Shared with me
3. 接受 Agent 推荐的 plugin 安装提示
4. 安装后 tools 立即刷新（0.142.0 修复 #28951）

### 命令与配置示例

**基础**

```
/plugins
/plugins install <plugin-name>
```

**进阶 — config.toml plugin 路径**

```toml
[plugins]
marketplace_url = "https://plugins.openai.com"
auto_recommend = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/plugins` | ⚠️ 未实测（auth 未登录） |
| `features list` | ✅ `apps` stable=true |

### 问题与解决方案

**错误 1：Plugin 安装后 tools 未更新**

排查：0.142.0 修复 immediate tool refresh；重启 session。

**错误 2：Root marketplace layout 解析失败**

排查：0.142.0 修复 root layout + manifest fallback（#28771）。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 从 Curated 区开始 |
| 团队 | 建立 Workspace plugins |
| 企业 | 审查 Shared with me 来源 |

---

## 特性三：Rollout Token Budgets 跨 Thread 治理（0.142.0）

### 是什么（机制说明）

可配置的 **rollout token budgets**：

- 跨 agent threads 追踪 token 用量
- 提供 remaining-budget 提醒
- 预算耗尽时 **abort turn**（#28746, #28494, #28707, #29423）

企业级用量治理特性，防止长程 agent 意外超支。

### 适用场景

- **适合**：多 agent 并行、长程自主任务、团队共享配额
- **不适合**：单次短问答

### 前置条件

- Codex CLI ≥ 0.142.0
- Admin 或用户配置 budget

### 详细使用步骤（业务用户）

1. 编辑 `~/.codex/config.toml` 设置 budget
2. 启动 `codex` 或 `codex exec` 长程任务
3. 观察 remaining-budget 提醒
4. 预算耗尽时 turn 自动中止

### 命令与配置示例

**config.toml**

```toml
[rollout]
token_budget = 500000
warn_at_percent = 80
abort_on_exhaust = true
```

**codex exec 带 budget**

```bash
codex exec --max-tokens 100000 "Refactor the authentication module"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Budget 配置 | ⚠️ 未实测（无 auth） |
| Release notes | ✅ 官方确认 |

### 问题与解决方案

**错误 1：Turn 意外中止**

排查：检查 `token_budget` 是否过低；调高或分阶段 `codex exec`。

**错误 2：多 thread 预算未汇总**

排查：确认 0.142.0+ 且 `rollout` 配置启用跨 thread 追踪。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Lead | 为每项目设独立 budget |
| 个人 | 长程任务前设 warn_at 80% |
| 成本敏感 | 结合 `/usage` credits |

---

## 特性四：Indexed Web-Search 与多 Agent Delegation（0.142.0）

### 是什么（机制说明）

- **Indexed web-search mode**：允许实时搜索，但限制直接页面访问为**服务端批准 URL**（#28489）——平衡时效性与安全
- **Multi-agent delegation**：app-server 客户端可配置 disabled / explicit-request-only / proactive（#28685, #28792, #29324）
- **UTC time reminders**：Codex 可接收定时提醒并直接查询当前时间（#28822 系列）

### 适用场景

- **适合**：需联网调研的 coding 任务、多 agent 协作复杂项目
- **不适合**：离线/air-gapped 环境

### 前置条件

- Codex CLI ≥ 0.142.0
- Web search feature 启用（`features list` 显示相关项）

### 详细使用步骤（业务用户）

1. `codex features list` 确认 web search 状态
2. 配置 delegation：`config.toml` 中 `[agents] delegation = "explicit-request-only"`
3. 在会话中请求联网调研
4. 观察仅 approved URL 被直接访问

### 命令与配置示例

**features list 片段**

```bash
./node_modules/.bin/codex features list 2>&1 | head -15
# browser_use: stable true
# computer_use: stable true
# code_mode: under development false
```

**config.toml delegation**

```toml
[agents]
delegation = "explicit-request-only"
max_subagents = 4
```

**codex exec 联网任务**

```bash
codex exec "Research latest React 19 migration guide and update our codebase"
```

### 本地测试结果

```bash
./node_modules/.bin/codex features list 2>&1 | head -15
```

| Feature | Status |
|---------|--------|
| browser_use | ✅ stable |
| computer_use | ✅ stable |
| code_mode | under development |
| web search indexed | ⚠️ 未单独列出（release notes 确认） |

### 问题与解决方案

**错误 1：Subagent 错误未传到 parent**

排查：0.142.0 修复 #28375——parent 现收到 terminal subagent errors。

**错误 2：Goal-first threads 丢失**

排查：0.142.0 修复 #28808——`thread/list` 现返回 goal-first threads。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 调研型任务 | 启用 indexed web-search |
| 安全敏感 | delegation = explicit-request-only |
| 并行开发 | proactive delegation + subagent cap |

---

## 特性五：`codex exec`、`codex doctor` 与 Code Mode 路线图（0.141.0–0.142.0）

### 是什么（机制说明）

- **`codex exec`**：非交互 headless 执行，适合 CI/pipeline
- **`codex doctor`**：环境诊断（auth、sandbox、app-server、features）
- **Code mode**：`features list` 显示 `under development`——未来 IDE 深度集成方向
- **0.142.0 性能**：defer DNS、warm model cache、parallelize skill metadata（#28542 系列）

### 适用场景

- **适合**：CI 自动修复、脚本化 code review、环境排查
- **不适合**：需交互式确认的敏感操作（用交互模式）

### 前置条件

- Codex CLI ≥ 0.141.0（exec）；0.142.0（性能优化）
- 有效 OpenAI 认证

### 详细使用步骤（业务用户）

1. 环境检查：`codex doctor`
2. 修复 fail 项（通常 auth、sandbox）
3. Headless 执行：`codex exec "fix lint errors in src/"`
4. CI 集成：GitHub Actions 中 `npx @openai/codex exec ...`

### 命令与配置示例

**doctor 完整输出摘要**

```bash
cd /workspace/tools
./node_modules/.bin/codex doctor 2>&1 | tail -10
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

**config.toml 基础**

```toml
model = "gpt-5.5-codex"
sandbox_mode = "workspace-write"

[sandbox]
network_access = false
```

**CI 示例**

```yaml
- name: Codex fix
  run: npx @openai/codex@latest exec "Fix failing tests"
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### 本地测试结果

| 命令 | 结果 |
|------|------|
| `codex --version` | ✅ 0.142.0 |
| `codex doctor` | ✅ 12 ok · 4 fail（auth 相关） |
| `codex features list` | ✅ 15+ features 列出 |
| `codex exec` 推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：doctor 4 fail — auth 未登录**

排查：`codex login`；设置 `OPENAI_API_KEY`。

**错误 2：Linux TUI Ctrl+Z 后渲染损坏**

排查：0.142.0 修复 #28342；升级后 `fg` 恢复正常。

**错误 3：Remote environment 路径不一致**

排查：0.142.0 修复 executor-native paths + `AGENTS.md` discovery（#28146 系列）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.142.0 | ✅ |
| `codex doctor` 本地 | ✅ 版本匹配 |
| InfoQ Agent Loop 稿 | ✅ 架构描述与 exec 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | `codex exec` 集成 CI |
| 个人 | 先 `doctor` 再工作 |
| 企业 | sandbox + token budget 组合 |

---

## 版本对照表

| 版本 | 日期 | 核心变更 |
|------|------|----------|
| 0.142.0 | 6/22 22:19 UTC | `/usage` credits、`/plugins` 分区、rollout budget、indexed web-search |
| 0.141.0 | 6/19 前后 | 稳定基线（6/20 实测） |
| 0.143.0-alpha.9 | 6/23 18:56 UTC | alpha 预发布（本地 npm 未安装） |

## 今日研究员结论

**0.142.0** 是 6 月下旬重要稳定 release：用量治理（`/usage` + rollout budget）与插件生态（`/plugins` 分区）双轮驱动。建议立即升级并运行 `codex doctor` 修复 auth fail；团队配置 `config.toml` token budget。Alpha 0.143.0 线 6/23 密集发布，生产环境暂用 0.142.0。无 API Key 环境下 CLI 基础设施已验证 ✅。

---
