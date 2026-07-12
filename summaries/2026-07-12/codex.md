# OpenAI Codex 每日技术文档 — 2026-07-12

> 本地实测版本：**0.144.1**（stable）｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)、[npm @openai/codex](https://www.npmjs.com/package/@openai/codex)

## 今日综述

2026 年 7 月 12 日 npm `@openai/codex@latest` 实测仍为稳定版 **0.144.1**；GitHub 最新预发布 **0.145.0-alpha.4**（7/11 00:10Z）尚未晋升 stable。行业焦点进入 **GPT-5.6 全量上线 + Codex 并入 ChatGPT 桌面端**（7/9–10）消化期，与 **Claude Fable 5 周额度今日截止**形成「OpenAI vs Anthropic」模型选型拐点。CLI 侧 `doctor` 12 ok · 1 warn · 4 fail；`browser_use`、`computer_use`、`code_mode_host` 均为 stable。

---

## 特性一：Codex 并入 ChatGPT 桌面端 + GPT-5.6 全量（7/9–10 消化期）

### 是什么（机制说明）

[2026-07-09 Changelog](https://developers.openai.com/codex/changelog) 宣布 **Codex joins the ChatGPT desktop app**（macOS/Windows）。7/10 OpenAI 全量发布 **GPT-5.6**（Sol / Terra / Luna），产品矩阵拆为三入口：

- **Chat**：对话、搜索、头脑风暴
- **Codex**：编码（仓库、PR、diff、review、多仓库）
- **ChatGPT Work**：通用办公（接任务、读上下文、调用工具、分步执行、交付结果）

CLI 稳定版未因桌面合并跳版，形成「桌面大更新 + CLI 维护节奏」双轨。7/12 进入消化期：独立 Codex App 用户可更新并保留设置。

### 适用场景

- **适合**：ChatGPT 桌面端开发者、GPT-5.6 Sol 专业工作流用户
- **不适合**：仅需 headless CLI 的 CI（继续用 0.144.1）

### 前置条件

ChatGPT 桌面应用 7/9 后版本；或 Codex CLI ≥ 0.144.0；OpenAI 账户认证。

### 详细使用步骤（业务用户）

1. 更新 ChatGPT 桌面应用至最新版
2. **Settings** → 将 Codex 设为默认视图（可选，macOS 可保留原图标）
3. 探索 **ChatGPT Work** 处理非编码办公任务
4. 侧边栏打开 PR 审查 diff 与 reviewer 反馈
5. CLI 用户：`npm install @openai/codex@latest` 保持认证对齐

### 命令与配置示例

```bash
codex --version
# codex-cli 0.144.1

codex features list 2>&1 | grep -E "computer_use|code_mode_host|goals"
# computer_use    stable    true
# code_mode_host  stable    true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI 0.144.1 | ✅ `@latest` 仍为稳定版 |
| ChatGPT 桌面端 / Work | ⚠️ 未实测（Linux Cloud VM 无 GUI） |
| GPT-5.6 模型调用 | ⚠️ 未实测（无完整 API Key） |

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.144.1
```

### 问题与解决方案

**桌面端找不到 Codex**：确认 7/9 后版本并登录。**Work 与 Codex 混淆**：Work 面向办公，Codex 保留编码入口。**CLI 与桌面设置不同步**：分别以 Settings / `config.toml` 为准。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Developers Changelog 7/9 | ✅ |
| 36氪 / 虎嗅 7/10 | ✅ 三入口架构 |
| 「Codex 被 Work 取代」 | ⚠️ 媒体简化表述 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 桌面用户 | 升级应用，评估 Work vs Codex 分工 |
| CLI 重度用户 | 继续 CLI 0.144.1，关注 alpha 晋升 |
| Fable 5 截止日用户 | 评估 GPT-5.6 Sol 作为替代，小规模 A/B |

---

## 特性二：0.144.1 稳定版维护 + 0.145.0-alpha.4 预发布观察

### 是什么（机制说明）

- **0.144.1**（stable）：macOS `code_mode_host` 暴露修复、embedded runtime 回退改进
- **0.145.0-alpha.4**（7/11 00:10Z 预发布）：GitHub Actions 自动发布，尚未晋升 `@latest`

`npm install @openai/codex@latest` 仍安装 0.144.1。预发布用户可 `npm install @openai/codex@0.145.0-alpha.4` 尝鲜。

### 适用场景

- **适合**：生产环境用 stable；尝鲜用户跟踪 alpha
- **不适合**：生产 CI 使用 alpha 版本

### 前置条件

Node.js 18+；npm registry 访问。

### 详细使用步骤（业务用户）

1. 生产：`npm install @openai/codex@latest` → 0.144.1
2. 尝鲜：`npm install @openai/codex@0.145.0-alpha.4`
3. `codex doctor` 验证环境
4. 关注 GitHub releases 页面 alpha → stable 晋升

### 命令与配置示例

```bash
npm install @openai/codex@latest
codex --version    # 0.144.1

# 尝鲜 alpha（非生产）
npm install @openai/codex@0.145.0-alpha.4
codex --version    # 0.145.0-alpha.4
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `@latest` → 0.144.1 | ✅ |
| alpha.4 存在 | ✅ GitHub 7/11 00:10Z |
| alpha 功能差异 | ⚠️ 未安装 alpha 对比 |

### 问题与解决方案

**误装 alpha**：生产环境锁定 `@latest` 或 `package.json` 版本号。**alpha 崩溃**：回退 0.144.1。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub releases | ✅ alpha.4 7/11 |
| npm @latest | ✅ 仍为 0.144.1 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 保持 0.144.1 |
| 尝鲜用户 | 跟踪 alpha.4，勿用于 CI |
| DayAI 维护者 | tools/package.json 锁定 ^0.144.1 |

---

## 特性三：`codex doctor` 环境诊断与 `features list`

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境：认证、app-server、sandbox、配置等。本环境输出：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**（app-server not running 为 idle 正常态）。

`codex features list` 列出特性成熟度：`stable` / `under development` / `removed` / `deprecated`。

### 适用场景

- **适合**：首次安装、升级后验证、排障
- **不适合**：已验证环境无需每次运行

### 前置条件

Codex CLI 已安装。

### 详细使用步骤（业务用户）

1. `codex doctor` 查看摘要
2. `codex doctor --all` 展开截断列表
3. `codex doctor --json` 获取结构化报告（敏感信息已脱敏）
4. `codex features list` 确认所需特性是否 stable

### 命令与配置示例

```bash
codex doctor 2>&1 | tail -10
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

codex features list 2>&1 | head -15
# apply_patch_freeform    removed            false
# apps                    stable             true
# browser_use             stable             true
# code_mode_host          stable             true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `features list` | ✅ 正常输出 |
| app-server | ⚠️ not running（idle 正常） |

### 问题与解决方案

**4 fail**：通常因无 API Key 或 app-server 未启动；`--all` 查看详情。**warn**：检查认证状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本环境实测 | ✅ 与 7/11 结果一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后首跑 `doctor` |
| CI 用户 | `doctor --json` 集成健康检查 |
| 排障 | `doctor --all` 展开详情 |

---

## 特性四：Code Mode 架构与 `config.toml` 配置

### 是什么（机制说明）

Code mode 在专用 host 进程中运行代码任务。0.144.x 状态：

- `code_mode_host`：**stable true**
- `code_mode` / `code_mode_only`：**under development false**
- `writes` approval mode（0.144.0）：只读自动、写入需确认

配置位于 `~/.codex/config.toml`。

### 适用场景

- **适合**：隔离代码执行的 Agent 任务
- **不适合**：简单问答

### 前置条件

Codex ≥ 0.144.1。

### 详细使用步骤（业务用户）

1. `codex features list | grep code_mode` 确认状态
2. 编辑 `~/.codex/config.toml` 配置 approval
3. 交互会话触发 code mode 任务
4. host 失败时 0.144.1 自动回退 embedded

### 命令与配置示例

```toml
# ~/.codex/config.toml
[approvals]
mode = "writes"
```

```bash
codex features list 2>&1 | grep code_mode
# code_mode          under development  false
# code_mode_host     stable             true
# code_mode_only     under development  false
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| code_mode_host stable | ✅ |
| config.toml 编辑 | ⚠️ 未实测交互写入 |

### 问题与解决方案

**code_mode 不可用**：`code_mode` 仍 under development。**host 崩溃**：升级 0.144.1 自动回退 embedded。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ |
| 0.144.1 release notes | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Agent 开发者 | 关注 code_mode → stable 进展 |
| 保守用户 | 仅用 stable features |

---

## 特性五：`codex exec`、`/goal`、Browser Developer mode 与 Web Search

### 是什么（机制说明）

- **`codex exec`**：非交互执行 Agent 任务
- **`/goal`**（goals feature）：目标导向长程任务
- **Browser Developer mode**：`browser_use` 稳定族，浏览器自动化
- **Web Search**：`standalone_web_search` 仍 under development；实际搜索可能经 browser 实现
- **`computer_use`**：stable，GPT-5.6 加速（7/9 Changelog）

### 适用场景

- **适合**：CI 自动化、网页抓取、长程目标导向任务
- **不适合**：纯本地代码编辑

### 前置条件

Codex ≥ 0.144.1；认证；网络与 sandbox 许可。

### 详细使用步骤（业务用户）

1. `codex features list | grep -E "browser|search|computer|goals"` 确认开关
2. 非交互：`codex exec "your task description"`
3. 交互中描述浏览/搜索/长程目标
4. 首次浏览器操作可能触发 approval

### 命令与配置示例

```bash
codex exec "List files in current directory and summarize project structure"
# ⚠️ 需认证

codex features list 2>&1 | grep -E "browser|search|computer|goals"
# browser_use               stable    true
# computer_use              stable    true
# goals                     stable    true
# standalone_web_search     under development  false
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `browser_use` / `computer_use` / `goals` stable | ✅ |
| `codex exec` 端到端 | ⚠️ 未实测（无 API Key） |
| Web Search 端到端 | ⚠️ 未实测 |

### 问题与解决方案

**exec 认证失败**：`codex doctor` 检查认证。**browser_use 失败**：查 sandbox 权限。**Web Search 无结果**：`standalone_web_search` 未 stable。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ stable 族确认 |
| Changelog 7/9 Computer Use | ✅ GPT-5.6 加速 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 用户 | `codex exec` 自动化脚本 |
| Agent 工程师 | `browser_use` + `goals` 组合 |
| Fable 5 迁移者 | 评估 GPT-5.6 Sol + Codex 框架 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 渠道 | 核心变更 |
|------|----------------|------|----------|
| **0.144.1** | stable | `@latest` | code_mode_host macOS 修复、embedded 回退 |
| 0.145.0-alpha.4 | 2026-07-11 00:10 | pre-release | 预发布观察 |
| 0.144.0 | 2026-07-06 | stable | writes approval mode、GA 里程碑 |
| 0.143.0 | 2026-07-03 | stable | 维护更新 |

## 今日研究员结论

Codex CLI **0.144.1 稳定版未变**，0.145.0-alpha.4 预发布待观察。行业焦点是 **GPT-5.6 全量 + ChatGPT 桌面三入口合并**消化期，与 **Fable 5 今日截止**形成 OpenAI vs Anthropic 模型选型拐点。CLI 用户保持 0.144.1，桌面用户升级 ChatGPT 应用探索 Work/Codex 分工。建议 Fable 5 用户小规模 A/B 对比 GPT-5.6 Sol + Codex 后再大规模迁移。
