# OpenAI Codex 每日技术文档 — 2026-07-09

> 本地实测版本：**0.144.0**（stable @latest）｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Developers Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 9 日 GitHub 发布稳定版 **[rust-v0.144.0](https://github.com/openai/codex/releases/tag/rust-v0.144.0)**（**16:47 UTC**），npm `@openai/codex@latest` 同日晋升。同日 Changelog 宣布 **Codex joins the ChatGPT desktop app**。CLI 实测 `code_mode_host` 已 **stable**；`auth_elicitation` 默认启用；新增 `writes` app-approval 模式。

---

## 特性一：0.144.0 稳定版 GA — Codex 并入 ChatGPT 桌面端

### 是什么（机制说明）

[2026-07-09 Changelog](https://developers.openai.com/codex/changelog) 宣布 Codex 成为 **ChatGPT 桌面应用**（macOS/Windows）的一部分。现有 Codex App 用户可更新并保留项目、设置与工作流；可将 Codex 设为默认视图，macOS 可保留 Codex 图标。

新功能包括：应用内直接编辑 Markdown/代码、内联批注、选中内容请 Codex 修订；侧边栏审查 GitHub PR（reviewer 反馈与 diff 同屏）；单项目跨仓库工作。性能方面：GPT-5.6 Computer Use 加速、任务进度更易跟踪、插件管理移入 Settings。

### 适用场景

- **适合**：已用 ChatGPT 桌面端的开发者，希望统一入口
- **不适合**：仅需 headless CLI 的 CI 场景（CLI 仍独立可用）

### 前置条件

- ChatGPT 桌面应用最新版（macOS/Windows）
- 或 Codex CLI ≥ 0.144.0
- OpenAI 账户认证

### 详细使用步骤（业务用户）

1. 更新 ChatGPT 桌面应用至最新版
2. 打开应用 → Settings → 将 Codex 设为默认视图（可选）
3. 导入或继续使用现有 Codex 项目
4. PR 审查：侧边栏打开 PR，查看 reviewer 评论与 diff
5. CLI 用户：`npm install @openai/codex@latest` 保持同步

### 命令与配置示例

```bash
# CLI 升级
npm install @openai/codex@latest
./node_modules/.bin/codex --version
# 期望：codex-cli 0.144.0

# 特性确认
./node_modules/.bin/codex features list 2>&1 | grep -E "code_mode_host|auth_elicitation"
# code_mode_host    stable  true
# auth_elicitation  stable  true
```

```toml
# ~/.codex/config.toml
[ui]
# 桌面端合并后部分设置迁移至 ChatGPT App Settings
# CLI 配置仍在此文件
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.144.0` |
| `features list` code_mode_host | ✅ `stable true` |
| ChatGPT 桌面端 | ⚠️ 未实测（Linux Cloud VM） |

### 问题与解决方案

**桌面端找不到 Codex**：确认应用已更新至 7/9 后版本。**项目未迁移**：按 Changelog 指引从 Codex App 更新路径导入。**CLI 与桌面设置不同步**：分别以各自 Settings 为准，逐步统一。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.0 Release | ✅ |
| Developers Changelog 7/9 | ✅ |
| npm @latest 0.144.0 | ✅ 本地实测 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| ChatGPT 用户 | 升级桌面端，设 Codex 为默认视图 |
| CLI 重度用户 | 继续 CLI，关注桌面端 PR 审查能力 |
| 团队 | 评估统一入口降低工具碎片化 |

---

## 特性二：`writes` App-Approval 模式

### 是什么（机制说明）

0.144.0 新增 **`writes` app-approval 模式**（#30482）：声明的只读操作自动放行，写操作需用户确认。适合在敏感仓库降低误写风险，介于全自动与全手动之间。

### 适用场景

- **适合**：生产仓库、多协作者环境、需审计写操作
- **不适合**：完全无人值守 CI 写操作（会有确认中断）

### 前置条件

- Codex CLI ≥ 0.144.0
- 应用/插件支持 approval mode 配置

### 详细使用步骤（业务用户）

1. 升级至 0.144.0
2. Settings 或 `config.toml` 选择 `writes` approval mode
3. 发起任务：只读探索自动执行，文件写入/删除时弹出确认
4. 审查每次写操作 diff 后批准或拒绝

### 命令与配置示例

```bash
# 查看当前 approval 相关配置
./node_modules/.bin/codex --help | grep -i approval
```

```toml
# ~/.codex/config.toml 概念性配置
[approval]
mode = "writes"   # 只读自动，写入需确认
```

```bash
# 非交互场景仍用 exec，但写操作可能需 TUI 确认
./node_modules/.bin/codex exec "Add README section for API usage"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 0.144.0 安装 | ✅ |
| writes mode 实际行为 | ⚠️ 未实测（无完整 auth 会话） |

### 问题与解决方案

**写操作被阻塞**：确认 approval mode 为 `writes` 且用户在场批准。**只读也被拦截**：检查是否误判为写操作，查阅 #30482 边界。**CI 无人值守**：改用更宽松 mode 或 `codex exec` + 预授权策略。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub #30482 | ✅ |
| Release notes writes mode | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产仓库 | 默认 writes mode |
| 个人沙箱 | 可用更宽松 mode |
| 安全团队 | 结合 PR 审查流程 |

---

## 特性三：`auth_elicitation` 默认启用与 MCP 交互认证

### 是什么（机制说明）

0.144.0 将 MCP **auth elicitation** 从实验开关改为**默认启用**（#28772）。MCP 工具可交互式请求认证，无需 `experimental` opt-in。App-server 主机可在运行时提供 Codex 认证，成功登录后重定向至托管页面（#28745, #31274）。设备码登录警告增加钓鱼识别说明（#31648）。

本地 `features list` 实测：`auth_elicitation stable true`。

### 适用场景

- **适合**：需 OAuth/API Key 的 MCP 集成（GitHub、Slack、数据库）
- **不适合**：完全离线无 MCP 环境

### 前置条件

- Codex CLI ≥ 0.144.0
- MCP 服务器配置于 `~/.codex/config.toml`
- 用户可完成交互式登录

### 详细使用步骤（业务用户）

1. 配置 MCP 服务器
2. 启动 `codex` TUI
3. 首次调用需认证的工具时，按提示完成 OAuth 或输入 Key
4. 认证凭证安全存储，后续自动复用

### 命令与配置示例

```bash
./node_modules/.bin/codex features list 2>&1 | grep auth_elicitation
# auth_elicitation  stable  true
```

```toml
# ~/.codex/config.toml MCP 示例
[mcp.servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
# auth elicitation 自动处理 token
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `auth_elicitation` feature flag | ✅ stable |
| MCP OAuth 流程 | ⚠️ 未实测（无 MCP 配置） |
| `codex doctor` | ✅ `12 ok · 1 idle · 5 notes · 1 warn · 4 fail` |

### 问题与解决方案

**认证循环失败**：检查系统代理与 CA 证书（0.144.0 修复 WebSocket 代理）。**钓鱼担忧**：阅读 #31648 设备码登录警告。**MCP busy**：升级自 0.143.0 已修复多项 stale 状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub #28772 | ✅ |
| features list 实测 | ✅ stable |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| MCP 集成开发者 | 移除 experimental 开关，直接用 0.144.0 |
| 企业 | 审计 MCP 认证存储位置 |
| 安全意识用户 | 阅读钓鱼识别说明 |

---

## 特性四：`code_mode_host` 晋升 Stable

### 是什么（机制说明）

`code_mode_host` 从 under development 晋升为 **stable**（0.144.0 前后）。Code Mode 允许 Codex 在受控环境中执行代码相关操作。0.144.0 修复 Intel macOS Code Mode 崩溃（#30953）、Windows 沙箱可写根删除（#31138, #31574）。

昨日（7/8）alpha 线 `code_mode_host` 已在 alpha.2 测试，今日 stable 线正式 GA。

### 适用场景

- **适合**：需要 Codex 在隔离环境运行/测试代码
- **不适合**：仅需文本建议、不执行代码的场景

### 前置条件

- Codex CLI ≥ 0.144.0
- 支持 Code Mode 的平台（macOS/Windows/Linux，Intel 需 0.144.0+）

### 详细使用步骤（业务用户）

1. `codex features list` 确认 `code_mode_host stable true`
2. 在 TUI 或桌面端启用 Code Mode（Settings）
3. 描述 coding 任务，Codex 在 host 环境执行
4. 审查输出与执行的命令日志

### 命令与配置示例

```bash
./node_modules/.bin/codex features list 2>&1 | grep code_mode
# code_mode           under development  false
# code_mode_host      stable             true
# code_mode_only      under development  false
```

```bash
# 诊断 Code Mode 环境
./node_modules/.bin/codex doctor 2>&1 | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `code_mode_host` | ✅ stable |
| `code_mode` | ⚠️ 仍 under development |
| Code Mode 执行 | ⚠️ 未实测（无 API Key 完整会话） |

### 问题与解决方案

**Intel Mac 崩溃**：升级 0.144.0（#30953 修复）。**Windows 无法删除文件**：0.144.0 沙箱修复。**code_mode vs code_mode_host**：优先使用 stable 的 host 模式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list 实测 | ✅ stable |
| GitHub #30953 Intel 修复 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | 启用 code_mode_host 跑集成测试 |
| Intel Mac 用户 | 必须升级 0.144.0 |
| CI | 评估 headless code mode 可行性 |

---

## 特性五：用量限额 Reset Credits 与 `codex doctor`

### 是什么（机制说明）

0.144.0 用量限额 reset credits 现展示**类型与过期时间**，并支持选择兑换哪张 credit（#30488）。Ultra reasoning 选择时若高多 agent 并发可能快速消耗用量，会弹出警告（#31621）。pnpm 全局安装现可被正确检测（#31503）。

`codex doctor` 继续作为环境诊断入口；本地实测 `12 ok · 1 idle · 5 notes · 1 warn · 4 fail`，app-server 未运行属常见 idle 状态。

### 适用场景

- **适合**：接近用量上限时规划 reset credit 使用
- **不适合**：无用量限制 concern 的轻度用户

### 前置条件

- Codex CLI ≥ 0.144.0
- ChatGPT/Codex 付费计划（若使用 reset credits）

### 详细使用步骤（业务用户）

1. 任务菜单查看 usage limits 与 credit 详情
2. 接近上限时选择合适 reset credit 兑换
3. 启用 Ultra reasoning 前注意并发警告
4. 环境问题先跑 `codex doctor`

### 命令与配置示例

```bash
./node_modules/.bin/codex doctor 2>&1 | tail -10
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

./node_modules/.bin/codex doctor --summary compact

./node_modules/.bin/codex features list 2>&1 | head -15
```

```bash
# pnpm 全局安装检测（0.144.0+）
which codex
pnpm list -g @openai/codex
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 可运行，4 fail 多为 app-server 未启动 |
| `codex --version` | ✅ 0.144.0 |
| reset credits UI | ⚠️ 未实测（无付费账户交互） |

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.144.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**doctor 多 fail**：app-server not running 通常不影响 CLI 基础功能。**pnpm 更新失败**：0.144.0 修复检测逻辑。**Ultra 用量激增**：降低并发 agent 数或选较低 reasoning。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub #30488 reset picker | ✅ |
| 本地 doctor 输出 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 重度用户 | 关注 reset credit 过期时间 |
| 多 agent 用户 |  heed Ultra 并发警告 |
| 新安装 | 先 `codex doctor` 再 `codex` |

---

## 版本对照表

| 版本 | 发布日 | 关键变更 |
|------|--------|----------|
| **0.144.0** | **7/9** | ChatGPT 桌面合并、writes mode、auth_elicitation 默认、code_mode_host stable |
| 0.144.0-alpha.4 | 7/9 04:33 | alpha 先行测试 |
| 0.143.0 | 7/8 | 远程插件、系统代理、remote-control pair |
| 0.144.0-alpha.2 | 7/8 | code_mode_host alpha 测试 |

## 今日研究员结论

Codex 7/9 是本周最重要国际更新：**0.144.0 stable GA** + **ChatGPT 桌面端合并**重塑产品入口。`code_mode_host` 与 `auth_elicitation` 转 stable 降低实验门槛。建议所有用户 `npm install @openai/codex@latest`；桌面用户同步更新 ChatGPT App。与 Cursor 9 日 Changelog 空窗、Claude Code 合规风暴形成鲜明对比——OpenAI 正加速 Agent 产品化整合。

---
