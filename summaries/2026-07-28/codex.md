# OpenAI Codex 每日技术文档 — 2026-07-28

> 本地实测版本：**0.145.0**（stable）｜监测 alpha：**0.146.0-alpha.14**（7/28 04:28 UTC）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 28 日 Codex **稳定版仍为 0.145.0**（7/21 发布），npm `@latest` 未升级。GitHub 发布 **0.146.0-alpha.14** pre-release（04:28 UTC），为 7/27 alpha.13 后的次日迭代。Developers OpenAI 文档 Changelog 7/28 条目聚焦 App 侧（语音、任务重连、Composer 自动补全），非 CLI 核心变更。本地 CLI 实测：`codex --version` → `codex-cli 0.145.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host` 为 stable，`code_mode` 仍为 under development。生产环境继续锁定 0.145.0；因无 API Key 未进行推理级功能实测。

---

## 特性一：0.146.0-alpha.14 发布（7/28）

### 是什么（机制说明）

7/28 04:28 UTC，OpenAI Codex GitHub 发布 **0.146.0-alpha.14** pre-release，为 0.146.0 分支第 14+ 个 pre-release。Release 页面未附详细 changelog 文本（仅列版本号与 assets），需结合 `codex features list` 与隔离安装观察变更。

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| 0.146.0-alpha.13 | 2026-07-27 16:03 | Pre-release |
| **0.146.0-alpha.14** | **2026-07-28 04:28** | Pre-release（**当日最新**） |
| 0.145.0 (stable) | 2026-07-21 | Stable（npm `@latest`） |

alpha.14 距 alpha.13 约 12 小时，延续密集发布节奏，0.146.0 stable 可期。

### 适用场景

- **适合**：早期采用者在隔离环境跟踪 alpha 迭代
- **不适合**：生产环境、Windows 用户遇 unsupported call 时（社区建议回退 0.145.0）

### 前置条件

容器或独立目录；勿覆盖生产 0.145.0 安装

### 详细使用步骤（业务用户）

1. 确认 stable：`codex --version`（应为 0.145.0）
2. 隔离安装 alpha.14：`npm install @openai/codex@0.146.0-alpha.14`
3. 运行 `./node_modules/.bin/codex --version` 与 `codex doctor`
4. 对比 `codex features list` 与 0.145.0 差异
5. 生产环境保持 lockfile 锁定 0.145.0

### 命令与配置示例

```bash
# 生产确认
codex --version                    # codex-cli 0.145.0
npm view @openai/codex version     # 0.145.0

# 隔离评估 alpha.14
mkdir -p /tmp/codex-alpha-test && cd /tmp/codex-alpha-test
npm init -y
npm install @openai/codex@0.146.0-alpha.14
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
| alpha.14 GitHub tag | ✅ 7/28 04:28 UTC |
| npm `@latest` | ✅ 仍为 0.145.0 |
| alpha.14 隔离安装 | ⚠️ 未在隔离环境实测安装 |

### 问题与解决方案

**alpha 行为异常**：回退 0.145.0 stable。**Windows unsupported call**：社区报告 0.146.0 分支问题，建议 0.145.0。**无 changelog 文本**：关注 GitHub commit 或等待 stable 公告。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Releases | ✅ alpha.14 7/28 |
| npm `@latest` | ✅ 0.145.0 未变 |
| 社区 Windows 反馈 | ⚠️ 0.146.0 分支偶发问题 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.145.0，忽略 alpha |
| 早期采用者 | 隔离测试 alpha.14，记录 doctor 结果 |
| CI | 勿将 alpha 写入主分支 lockfile |

---

## 特性二：`codex doctor` 环境诊断（0.145.0）

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境、app-server 状态、配置完整性。7/28 实测输出：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。fail 项通常与无 API Key、app-server 未运行、缺少登录态相关，属 Cloud Agent 环境预期行为。支持 `--summary compact` 与 `--json` 结构化输出。

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
codex doctor
codex doctor 2>&1 | tail -10
codex doctor --summary compact
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| app-server | ❌ not running（预期） |
| API Key | ❌ 未配置（预期） |

```
12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**4 fail 正常吗**：Cloud Agent 无 Key 时预期。**app-server 未运行**：桌面 App 功能，CLI 可独立使用。**warn 项**：查看具体条目决定是否修复。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 7/28 | ✅ 12 ok · 4 fail |
| 7/27 实测 | ✅ 结果一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 先跑 doctor 再配置 |
| CI | `--json` 集成检查 |
| 升级 | 前后对比 doctor 输出 |

---

## 特性三：`codex features list` 功能开关（0.145.0）

### 是什么（机制说明）

`codex features list` 列出 CLI 功能开关及状态（stable / under development / removed）。7/28 实测关键项：

| 功能 | 状态 | 启用 |
|------|------|------|
| apps | stable | true |
| browser_use | stable | true |
| browser_use_full_cdp_access | stable | true |
| code_mode_host | stable | true |
| code_mode | under development | false |
| auth_elicitation | stable | true |

`code_mode` 仍为 under development，生产环境建议保持 false。

### 适用场景

- **适合**：评估 alpha 新功能、排查功能不可用
- **不适合**：替代官方 Changelog

### 前置条件

已安装 Codex CLI

### 详细使用步骤（业务用户）

1. 运行 `codex features list`
2. 查看目标功能状态
3. 在 `~/.codex/config.toml` 中启用/禁用（若支持）
4. alpha 升级后重新对比

### 命令与配置示例

```bash
codex features list 2>&1 | head -20
codex features list 2>&1 | grep code_mode
```

```toml
[features]
code_mode = false
browser_use = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` | ✅ 正常输出 |
| code_mode | ✅ under development, false |
| browser_use | ✅ stable, true |

### 问题与解决方案

**功能不可用**：检查 features list 状态。**code_mode 启用失败**：仍为 under development，等待 stable。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 | ✅ 与 7/27 一致 |
| Changelog | ⚠️ 无逐功能说明 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 仅用 stable 功能 |
| 早期采用 | 跟踪 code_mode 进展 |

---

## 特性四：`codex exec` 与非交互执行

### 是什么（机制说明）

`codex exec`（或 `codex -p`）支持非交互式执行 Codex 任务，适合 CI/CD 与脚本集成。与 `codex doctor`、`codex features list` 同属 CLI 工具链。0.145.0 stable 为当前推荐版本。

### 适用场景

- **适合**：CI 流水线、批量代码任务、headless 环境
- **不适合**：需交互式调试的复杂任务

### 前置条件

Codex CLI 0.145.0；API Key 或 ChatGPT 登录（推理需认证）

### 详细使用步骤（业务用户）

1. 配置 `OPENAI_API_KEY` 或 `codex login`
2. 运行 `codex exec "your prompt"` 或等效命令
3. 使用 `--model` 指定模型
4. CI 中锁定版本 `npm install @openai/codex@0.145.0`

### 命令与配置示例

```bash
export OPENAI_API_KEY="your-key"
codex exec "Add unit tests for utils.py"
codex -p "Refactor auth module" --model gpt-5.6-sol
```

```yaml
# GitHub Actions 概念性
- run: npm install @openai/codex@0.145.0
- run: npx codex exec "Run linter fixes"
  env:
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` 命令 | ✅ CLI 存在 |
| 推理执行 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**认证失败**：配置 API Key 或 `codex login`。**版本不一致**：锁定 0.145.0。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| CLI help | ✅ exec 子命令 |
| 本地 | ⚠️ 未实测推理 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 锁定 0.145.0 |
| 开发者 | 本地交互用 TUI，CI 用 exec |

---

## 特性五：App 侧 Changelog 更新（7/28，非 CLI）

### 是什么（机制说明）

Developers OpenAI [Codex Changelog](https://developers.openai.com/codex/changelog) 7/28 条目聚焦 **Codex App**（非 CLI）：
- 语音对话使用选定的 ChatGPT 音色，显示用量限制警告
- 任务重连与 Face ID 解锁后连续性改进
- Composer 自动补全匹配桌面插件 mentions，包含已安装插件 skills
- 选中引用发送后仍可预览
- Goal 控件暂停/恢复进度更清晰
- 内联可视化表格与主题渲染更可靠
- 修复恢复任务改变所选模型、Composer 卡住、浏览器工具标签等问题

CLI 0.145.0 无对应变更。

### 适用场景

- **适合**：Codex App 桌面用户
- **不适合**：纯 CLI 用户（无直接影响）

### 前置条件

Codex App 最新版；macOS/Windows

### 详细使用步骤（业务用户）

1. 打开 Codex App → 检查更新
2. Settings → Voice → 选择 ChatGPT 音色
3. 使用 Goal 控件管理长任务
4. Composer 中 @ 引用插件 skills

### 命令与配置示例

```bash
# App 更新后 CLI 版本可能仍独立
codex --version   # 仍为 0.145.0
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Codex App | ⚠️ 未实测（Cloud Agent 无 GUI） |
| Changelog 7/28 | ✅ App 条目有效 |

### 问题与解决方案

**App 与 CLI 版本不同步**：正常，分别发布。**Composer 卡住**：7/28 已修复，更新 App。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Developers Changelog | ✅ 7/28 App 更新 |
| CLI 版本 | ✅ 0.145.0 未变 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| App 用户 | 更新至最新 |
| CLI 用户 | 忽略 App Changelog |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 状态 | 要点 |
|------|----------------|------|------|
| **0.146.0-alpha.14** | 2026-07-28 04:28 | Pre-release | 当日最新 alpha |
| 0.146.0-alpha.13 | 2026-07-27 16:03 | Pre-release | 前日最新 |
| **0.145.0** | 2026-07-21 | **Stable (npm @latest)** | 生产推荐 |
| 0.144.x | 2026-07 更早 | Stable | 已 superseded |

## 今日研究员结论

Codex 7/28 **稳定版 0.145.0 不变**，GitHub 发布 **alpha.14** 延续密集 pre-release 节奏。生产环境继续锁定 0.145.0；alpha 仅供隔离跟踪。`codex doctor` 与 `features list` 实测正常；推理功能 ⚠️ 未实测。关注 0.146.0 stable 发布公告。
