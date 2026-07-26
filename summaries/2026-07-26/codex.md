# OpenAI Codex 每日技术文档 — 2026-07-26

> 本地实测版本：**0.145.0**（stable）｜监测 alpha：**0.146.0-alpha.10.1**（7/25 20:29 UTC，7/26 无新 alpha）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 26 日 Codex **稳定版仍为 0.145.0**（7/21 发布），npm `@latest` 未升级。GitHub **7/26 无新 Release**，最新 pre-release 仍为 **0.146.0-alpha.10.1**（7/25 20:29 UTC）。自 7/22 alpha.1 起 alpha 冲刺在 7/25 一日三版后进入短暂静默，0.146.0 stable 发布仍可期但今日无信号。本地 CLI 实测：`codex --version` → `codex-cli 0.145.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host` 为 stable，`code_mode` 仍为 under development。生产环境继续锁定 0.145.0；因无 API Key 未进行推理级功能实测。

---

## 特性一：0.146.0-alpha 静默期与 stable 展望（7/26）

### 是什么（机制说明）

7/25 Codex alpha 密集发布后，7/26 GitHub Releases 无新 tag。当前 alpha 时间线：

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| 0.146.0-alpha.8 | 2026-07-24 23:23 | Pre-release |
| 0.146.0-alpha.9 | 2026-07-25 00:34 | Pre-release |
| 0.146.0-alpha.10 | 2026-07-25 02:18 | Pre-release |
| **0.146.0-alpha.10.1** | **2026-07-25 20:29** | Pre-release（**仍为最新**） |
| 7/26 | — | **无新 Release** |

alpha.10.1 为 alpha.10 的补丁（post1），可能含 npm 包元数据或构建修复。7/26 静默可能表示团队正在整合变更准备 0.146.0 stable。npm `@latest` 始终指向 0.145.0。

### 适用场景

- **适合**：生产用户继续观察；早期采用者保持 alpha.10.1 隔离测试
- **不适合**：期待 7/26 alpha 新功能的用户

### 前置条件

生产：0.145.0 锁定；评估：容器隔离 alpha.10.1

### 详细使用步骤（业务用户）

1. 确认 stable：`codex --version`（应为 0.145.0）
2. 检查 GitHub Releases 是否有 7/26 新 tag（今日无）
3. 若已测 alpha.10.1，继续观察稳定性，勿急于升级未知版本
4. 关注 OpenAI 公告或 Changelog 是否宣布 0.146.0 stable
5. 生产环境保持 lockfile 锁定 0.145.0

### 命令与配置示例

```bash
codex --version                    # codex-cli 0.145.0
npm view @openai/codex version     # 0.145.0
npm view @openai/codex dist-tags   # latest: 0.145.0

# 隔离评估 alpha（可选）
npm install @openai/codex@0.146.0-alpha.10.1
./node_modules/.bin/codex --version
```

```toml
# ~/.codex/config.toml 概念性
[model]
default = "gpt-5.6-sol"

[features]
code_mode = false  # stable 仍为 under development
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.145.0` |
| 7/26 新 Release | ✅ 无 |
| alpha.10.1 仍为最新 | ✅ 7/25 20:29 UTC |
| npm `@latest` | ✅ 0.145.0 |
| alpha 安装 | ⚠️ 未在隔离环境实测 alpha.10.1 |

### 问题与解决方案

**7/26 无 alpha 是否正常**：是，密集发布后常有整合期。**alpha 行为异常**：回退 0.145.0。**急于测新 alpha**：等待官方 7/26+ 发布或 stable 公告。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 7/26 | ✅ 无新 Release |
| alpha.10.1 | ✅ 仍为最新 pre-release |
| npm `@latest` | ✅ 0.145.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 继续 0.145.0，无需操作 |
| 早期采用者 | 保持 alpha.10.1 隔离测试，等待 stable |
| CI/CD | 锁定 0.145.0 |

---

## 特性二：`codex exec` 与 `/goal`（0.145.0 stable，第 6 日巩固）

### 是什么（机制说明）

0.145.0 stable 提供 `codex exec` 非交互执行与 `/goal` 目标驱动模式。`codex exec` 适合 CI/CD 与脚本化任务；`/goal` 将高层目标分解为可执行步骤。7/26 无 stable 更新，但仍是当前版本核心能力，值得在第 6 个观察日巩固用法。

### 适用场景

- **适合**：自动化脚本、CI 流水线、目标导向长任务
- **不适合**：需频繁交互的探索性开发

### 前置条件

Codex 0.145.0+；有效 OpenAI API 认证

### 详细使用步骤（业务用户）

1. 确认 `codex --version` 为 0.145.0
2. 非交互：`codex exec "run tests and fix failures"`
3. 会话内：`/goal Fix all lint errors in src/`
4. 配置 `~/.codex/config.toml` 设默认模型与权限
5. 运行 `codex doctor` 确保环境就绪

### 命令与配置示例

```bash
# 非交互执行
codex exec "Add unit tests for utils.ts"

# 带工作目录
codex exec --cwd /path/to/repo "Refactor auth module"

# 环境检查
codex doctor
codex --help | head -10
```

```toml
# ~/.codex/config.toml
[default]
model = "gpt-5.6-sol"
approval_policy = "on-request"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` | ⚠️ 未实测推理（无 API Key） |
| `codex --help` | ✅ 命令存在 |
| `codex --version` | ✅ `codex-cli 0.145.0` |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |

### 问题与解决方案

**exec 超时**：增加 timeout 或拆分任务。**权限被拒**：检查 approval_policy。**doctor 4 fail**：常见为 auth、sandbox 未配置，有 API Key 后应改善。**7/26 无更新**：exec 行为与 7/25 一致。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.145.0 Release | ✅ exec 支持 |
| Changelog | ✅ `/goal` 描述 |
| 7/26 | ✅ 无 stable 变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | `codex exec` 接入 CI |
| 开发者 | `/goal` 做重构 |
| 企业 | doctor 通过后再上生产 |

---

## 特性三：Code mode 与 `code_mode_host`（alpha 演进，7/26 观察）

### 是什么（机制说明）

Codex Code mode 在隔离环境中执行代码，`code_mode_host` 为 stable 特性，`code_mode` 本体仍为 under development。`codex features list` 显示：
- `code_mode_host` → stable
- `code_mode` → under development
- `code_mode_buffered_exec` → under development

7/26 alpha 静默期可能意味着团队正在准备将 code_mode 标为 stable 的 0.146.0 发布，但今日无证据。

### 适用场景

- **适合**：需安全沙箱执行、复杂多文件修改
- **不适合**：简单单文件编辑

### 前置条件

Codex 0.145.0+；features 中 code_mode_host 可用

### 详细使用步骤（业务用户）

1. `codex features list` 确认 code_mode_host 为 stable
2. 在 config.toml 启用相关 feature（若需）
3. 会话内触发 Code mode（具体入口见 Docs）
4. 7/26：关注 Changelog 是否宣布 code_mode stable
5. alpha 用户保持 alpha.10.1 隔离，对比 features 状态

### 命令与配置示例

```bash
codex features list | grep code_mode
# code_mode_host                      stable             true
# code_mode                           under development  false
# code_mode_buffered_exec             under development  false
```

```toml
# config.toml 概念性
[features]
code_mode = false
code_mode_host = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `code_mode_host` | ✅ stable |
| `code_mode` | ✅ under development |
| Code mode 实测 | ⚠️ 未实测（无 API Key） |
| 7/26 feature 变更 | ✅ 无 |

### 问题与解决方案

**Code mode 不可用**：确认 feature flag 与版本。**沙箱失败**：运行 `codex doctor` 检查 sandbox 组件。**等待 stable**：7/26 无信号，继续 0.145.0 + code_mode_host。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ code_mode_host stable |
| 7/26 Release | ✅ 无 alpha 更新 |
| stable 展望 | ⚠️ 推测 0.146.0 可能推进 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 跟踪 alpha.10.1，等待 0.146.0 stable |
| 生产 | 仅用 code_mode_host stable 部分 |

---

## 特性四：Web Search 与 Browser Developer mode（0.145.0）

### 是什么（机制说明）

`codex features list` 显示 `browser_use`、`browser_use_external`、`browser_use_full_cdp_access` 均为 **stable**。Web Search 与 Browser Developer mode 支持 Agent 浏览网页与调试。7/26 无 stable 更新，但为当前 Agent 能力组成部分，适合与 Claude Opus 5、Cursor Router 同日对比多工具浏览器能力。

### 适用场景

- **适合**：需查文档、调试前端、跨域信息检索
- **不适合**：纯离线代码任务

### 前置条件

Codex 0.145.0+；browser 相关 features 启用

### 详细使用步骤（业务用户）

1. `codex features list` 确认 browser_use stable
2. 会话中请求 Codex 搜索或打开网页
3. Developer mode 用于 CDP 级调试（高级）
4. 安全敏感环境：评估 `browser_use_external` 风险

### 命令与配置示例

```bash
codex features list | grep browser
# browser_use                          stable             true
# browser_use_external                 stable             true
# browser_use_full_cdp_access          stable             true
```

```toml
[features]
browser_use = true
browser_use_external = false  # 企业可禁用外部浏览器
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| browser features | ✅ 均为 stable |
| 浏览器实测 | ⚠️ 未实测（无 API Key / GUI） |
| 7/26 更新 | ✅ 无 |

### 问题与解决方案

**浏览器启动失败**：doctor 检查依赖。**CDP 权限**：确认 full_cdp_access 已启用。**企业合规**：禁用 browser_use_external。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ browser stable |
| 0.145.0 Docs | ✅ Web Search 描述 |
| 7/26 | ✅ 无变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发 | 利用 browser 查文档 |
| 安全敏感 | 限制 external browser |

---

## 特性五：`/import` 从 Cursor/Claude Code 迁移（0.145.0）

### 是什么（机制说明）

0.145.0 扩展 `/import`，可从 Cursor 和 Claude Code 迁移设置、MCP 服务器、插件、会话、命令、项目记忆。在 Opus 5 第 3 日与 Cursor Router 第 5 日背景下，多工具用户可评估 Codex 作为统一 Agent 平台的可行性。7/26 无 stable 更新，但 `/import` 仍是当前版本战略亮点。

### 适用场景

- **适合**：从 Cursor/Claude Code 评估或迁移至 Codex
- **不适合**：全新安装无迁移需求

### 前置条件

Codex 0.145.0+；源工具配置存在于默认路径

### 详细使用步骤（业务用户）

1. 安装 Codex 0.145.0
2. 启动 `codex`，输入 `/import`
3. 选择源：Cursor 或 Claude Code
4. 勾选要迁移项：MCP、settings、plugins 等
5. 确认并重启，运行 `codex doctor` 验证

### 命令与配置示例

```bash
codex
> /import
# 按提示选择 Cursor 或 Claude Code

# 迁移后验证
codex doctor
codex mcp list  # 若支持
```

```toml
# 迁移后 ~/.codex/config.toml 可能包含
[mcp]
servers = ["github", "filesystem"]
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/import` | ⚠️ 未实测（无源工具配置） |
| 0.145.0 Release | ✅ import 扩展确认 |
| 7/26 更新 | ✅ 无 |

### 问题与解决方案

**迁移不完整**：手动检查 MCP 与 settings 路径。**路径冲突**：备份后重试 import。**Claude Code 2.1.220 配置**：迁移前确认源版本兼容性。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.145.0 Release | ✅ Cursor + Claude Code |
| Changelog | ✅ 一致 |
| 7/26 | ✅ 无变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多工具用户 | 用 `/import` 降低切换成本 |
| 团队 | 统一迁移 SOP，对比三工具后决策 |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 类型 | 备注 | 7/26 状态 |
|------|--------------|------|------|-----------|
| 0.146.0-alpha.10.1 | 2026-07-25 20:29 | alpha | 最新 pre-release | **仍为最新** |
| 0.146.0-alpha.10 | 2026-07-25 02:18 | alpha | | — |
| 0.146.0-alpha.9 | 2026-07-25 00:34 | alpha | | — |
| 0.145.0 | 2026-07-21 | stable | npm `@latest` | **当前生产版** |
| 7/26 | — | — | 无新 Release | 静默期 |

## 今日研究员结论

7/26 Codex 稳定版与 alpha 均无新发布，进入 7/25 密集 alpha 冲刺后的短暂静默期。生产继续锁定 0.145.0；评估通道保持 `0.146.0-alpha.10.1`。`codex doctor` 12 ok · 1 warn · 4 fail 为常见无 auth 状态，有 API Key 后应改善。关注 0.146.0 stable 是否在未来数日发布，以及 Code mode 是否转正。推理与浏览器实测需在本地有 Key 后补测。
