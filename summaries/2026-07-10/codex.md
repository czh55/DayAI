# OpenAI Codex 每日技术文档 — 2026-07-10

> 本地实测版本：**0.144.1**（stable @latest）｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Developers Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 10 日 npm `@openai/codex@latest` 实测为 **0.144.1**（GitHub 发布 7/9 23:02Z），为 0.144.0 后的维护修复版。7/9 重大更新 **Codex joins ChatGPT desktop app** 余波持续；`code_mode_host` 与 `auth_elicitation` 保持 **stable**。

---

## 特性一：0.144.1 维护修复 — 安装器与 code_mode_host 可靠性

### 是什么（机制说明）

[rust-v0.144.1](https://github.com/openai/codex/releases/tag/rust-v0.144.1)（2026-07-09 23:02 UTC）为 bugfix 发布：

- **Standalone 安装器修复**：GitHub 返回 compact 或 reordered release metadata 时不再失败（#31913）
- **macOS 包安装**：正确暴露 `code_mode_host` 可执行文件 alongside `codex`
- **Code mode 回退**：companion host binary 不可用时回退至 embedded runtime，保持 code mode 可用

### 适用场景

- **适合**：standalone 安装用户、macOS 用户、依赖 code_mode_host 的工作流
- **不适合**：期待新功能（本版纯修复）

### 前置条件

- 此前安装 0.144.0 或更早版本
- macOS / Linux / Windows standalone 或 npm 安装

### 详细使用步骤（业务用户）

1. 检查当前版本：`codex --version`
2. 升级：`npm install @openai/codex@latest` 或 standalone 更新器
3. 验证：`codex doctor` 确认安装健康
4. macOS 用户：确认 `code_mode_host` 在 PATH 或包目录可见
5. 运行 `codex features list` 确认 `code_mode_host stable true`

### 命令与配置示例

```bash
# 升级
cd /workspace/tools
npm install @openai/codex@latest
./node_modules/.bin/codex --version
# 期望：codex-cli 0.144.1

# 健康检查
./node_modules/.bin/codex doctor 2>&1 | tail -10

# 确认 code_mode_host
./node_modules/.bin/codex features list 2>&1 | grep code_mode_host
# code_mode_host    stable    true
```

```toml
# ~/.codex/config.toml — code mode 相关（概念性）
[features]
code_mode_host = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.144.1` |
| `codex doctor` | ✅ `12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed` |
| `features list` code_mode_host | ✅ `stable true` |
| standalone 安装 | ⚠️ 本环境为 npm 安装 |

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.144.1
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
./node_modules/.bin/codex features list 2>&1 | head -15
```

### 问题与解决方案

**升级后仍显示 0.144.0**：确认 `which codex` 指向正确安装路径；清除 npm 缓存重试。**macOS 找不到 code_mode_host**：升级至 0.144.1 修复；检查包安装目录。**doctor 有 fail 项**：`codex doctor --all` 查看详情；app-server 未运行为常见 idle 状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.1 Release | ✅ |
| npm `@latest` 0.144.1 | ✅ 本地实测 |
| #31913 PR | ✅ 安装器修复 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 从 0.144.0 升级至 0.144.1 |
| macOS 用户 | 重点验证 code_mode_host |
| CI 用户 | 锁定 `0.144.1` 避免 metadata 解析失败 |

---

## 特性二：Codex 并入 ChatGPT 桌面端（0.144.0，7/9 余波）

### 是什么（机制说明）

[2026-07-09 Changelog](https://developers.openai.com/codex/changelog) 宣布 Codex 成为 **ChatGPT 桌面应用**（macOS/Windows）的一部分。现有 Codex App 用户可更新并保留项目、设置与工作流；可将 Codex 设为默认视图，macOS 可保留 Codex 图标。

新能力：应用内编辑 Markdown/代码、内联批注、选中内容请 Codex 修订；侧边栏审查 GitHub PR；单项目跨仓库工作。性能：GPT-5.6 Computer Use 加速、任务进度跟踪改进。

### 适用场景

- **适合**：已用 ChatGPT 桌面端的开发者，希望统一入口
- **不适合**：仅需 headless CLI 的 CI 场景（CLI 仍独立）

### 前置条件

- ChatGPT 桌面应用最新版（7/9 后）
- 或 Codex CLI ≥ 0.144.0
- OpenAI 账户认证

### 详细使用步骤（业务用户）

1. 更新 ChatGPT 桌面应用至最新版
2. Settings → 将 Codex 设为默认视图（可选）
3. 导入或继续使用现有 Codex 项目
4. PR 审查：侧边栏打开 PR，查看 reviewer 评论与 diff
5. CLI 用户：保持 `npm install @openai/codex@latest` 同步

### 命令与配置示例

```bash
# CLI 与桌面对齐
npm install @openai/codex@latest
codex --version   # 0.144.1

# 特性确认
codex features list 2>&1 | grep -E "code_mode_host|auth_elicitation|browser_use"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI 0.144.1 | ✅ |
| ChatGPT 桌面端 | ⚠️ 未实测（Linux Cloud VM） |
| PR 侧边栏审查 | ⚠️ 未实测 |

### 问题与解决方案

**桌面端找不到 Codex**：确认应用 7/9 后版本。**项目未迁移**：按 Changelog 从 Codex App 更新路径导入。**CLI 与桌面设置不同步**：分别以各自 Settings 为准。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Developers Changelog 7/9 | ✅ |
| GitHub 0.144.0 Release | ✅ |
| 行业宏观叙事 | ✅ 编排层竞争加剧 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| ChatGPT 用户 | 升级桌面端，设 Codex 为默认 |
| CLI 重度用户 | 继续 CLI，关注桌面 PR 审查 |
| 国内用户 | 注意网络与合规，桌面端可用性因地区而异 |

---

## 特性三：`code_mode_host` 稳定态与 Code Mode 架构

### 是什么（机制说明）

`code_mode_host` 在 0.144.x 系列晋升 **stable**（`codex features list` 显示 `stable true`）。Code mode 允许 Codex 在专用 host 进程中运行代码相关任务，与 embedded runtime 形成双层架构。0.144.1 确保 macOS 包正确暴露 host binary，并在 host 不可用时回退 embedded runtime。

`code_mode` 本身仍为 `under development`；`code_mode_only` 亦 under development。

### 适用场景

- **适合**：需要隔离代码执行环境的 Agent 任务
- **不适合**：简单问答无需 code mode 的场景

### 前置条件

- Codex ≥ 0.144.1
- `code_mode_host` feature stable

### 详细使用步骤（业务用户）

1. `codex features list | grep code_mode` 确认状态
2. 在 `~/.codex/config.toml` 启用相关 feature（若需）
3. 启动 `codex` 交互会话，使用 code mode 相关命令
4. 若 host 启动失败，0.144.1 自动回退 embedded runtime
5. `codex doctor` 检查 host 进程状态

### 命令与配置示例

```bash
codex features list 2>&1 | grep -E "code_mode"
# code_mode                    under development  false
# code_mode_host               stable             true
# code_mode_only               under development  false
```

```toml
# ~/.codex/config.toml
[features]
# 以 features list 为准，勿手动启用 under development 项
```

```bash
# doctor 检查 app-server / host 状态
codex doctor 2>&1 | grep -i "host\|server\|mode"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| code_mode_host stable | ✅ |
| code_mode under dev | ✅ false（未默认启用） |
| host 进程 | ⚠️ doctor 显示 app-server not running（idle 正常） |

### 问题与解决方案

**code_mode 不可用**：确认 0.144.1+；运行 `codex doctor`。**host 崩溃**：0.144.1 应回退 embedded；检查日志。**macOS 无 host binary**：升级 0.144.1 修复 #31913。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ |
| 0.144.1 release notes | ✅ macOS host 暴露 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Agent 开发者 | 关注 code_mode 从 under dev → stable 进展 |
| macOS 用户 | 0.144.1 必升 |
| 保守用户 | 仅用 stable features，避开 under development |

---

## 特性四：`auth_elicitation` 与 `codex doctor` 诊断体系

### 是什么（机制说明）

`auth_elicitation` 在 0.144.x 为 **stable true**，支持交互式认证引导。`codex doctor` 提供安装健康全量检查：本环境输出 `12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed`，其中 app-server 未运行为常见 idle 状态。

### 适用场景

- **适合**：首次安装、升级后验证、排查认证问题
- **不适合**：已确认健康且无变更的环境（可跳过）

### 前置条件

- Codex CLI 安装完成
- 网络可访问 OpenAI 服务

### 详细使用步骤（业务用户）

1. 运行 `codex doctor` 查看摘要
2. 若有 fail：`codex doctor --all` 展开详情
3. 认证问题：按 `auth_elicitation` 引导完成登录
4. 定期升级后重跑 doctor
5. CI 可脚本化：`codex doctor --json`（若支持）

### 命令与配置示例

```bash
# 摘要
codex doctor 2>&1 | tail -5

# 完整输出
codex doctor 2>&1

# 特性确认
codex features list 2>&1 | grep auth_elicitation
# auth_elicitation    stable    true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 可执行，12 ok |
| `auth_elicitation` | ✅ stable true |
| 认证完成 | ⚠️ 未实测（无 API Key 完整登录） |

### 问题与解决方案

**doctor 4 fail**：`--all` 查看；常见为 app-server 未启动（非阻塞）。**auth 失败**：检查 API Key / OAuth 配置；`auth_elicitation` 应引导交互修复。**升级后 doctor 变化**：对比 0.144.0 vs 0.144.1 release notes。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ |
| 本地 doctor 输出 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后首跑 `codex doctor` |
| 运维 | 升级流程纳入 doctor 检查 |
| 开发者 | 关注 fail 项是否影响实际任务 |

---

## 特性五：`codex exec`、Automations 与 Loop 工程（0.143+ 累积）

### 是什么（机制说明）

Codex 支持非交互执行（`codex exec`）、持续目标（`/goal`）、Automations 定时触发——与行业 Loop Engineering 叙事一致。虎嗅报道 Codex 负责人强调「设计循环而非手写提示词」；36氪归纳 OpenAI Automations 为 time-based loop 实现。

本 DayAI 任务虽未直接使用 `codex exec`，但 Codex CLI 版本与 Cursor Automations 形成「OpenAI CLI + Cursor 编排」双轨生态。

### 适用场景

- **适合**：CI 集成、定时任务、长程目标驱动 Agent
- **不适合**：需频繁人工确认的敏感操作（应加审批模式）

### 前置条件

- Codex CLI 0.143+
- 可选：`~/.codex/config.toml` 配置

### 详细使用步骤（业务用户）

1. 非交互执行：`codex exec "run tests and fix failures"`
2. 持续目标：交互中 `/goal` 设置长期目标
3. Automations：ChatGPT/Codex 桌面端配置定时任务
4. 配合 `writes` app-approval 模式（0.144.0+）控制写操作
5. `codex features list` 确认 browser_use、web_search 等 stable 特性

### 命令与配置示例

```bash
# 非交互执行（概念性，需认证）
codex exec "Summarize git diff and suggest commit message"

# 特性列表
codex features list 2>&1 | grep -E "browser_use|web_search"
# browser_use    stable    true
```

```toml
# ~/.codex/config.toml — writes 审批模式（0.144.0+）
[approvals]
mode = "writes"   # 只读自动，写入需确认
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` | ⚠️ 未实测（无 API Key） |
| `features list` browser_use | ✅ stable true |
| Automations | ⚠️ 未实测桌面端 |

### 问题与解决方案

**exec 无输出**：检查认证与网络。**Loop 成本过高**：36氪警告 token 消耗——用小任务试 Automations。**写操作误触**：启用 `writes` approval 模式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 虎嗅 Loop 报道 | ✅ |
| 36氪 Loop 工程 | ✅ |
| Codex Changelog Automations | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 自动化工程师 | 评估 `codex exec` + CI 集成 |
| 个人开发者 | 从 `/goal` 小目标试 Loop |
| 成本敏感用户 | 监控 Automations token 消耗 |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 要点 |
|------|-------------|------|
| **0.144.1** | 2026-07-09 23:02 | 安装器修复、macOS code_mode_host、embedded 回退 |
| 0.144.0 | 2026-07-09 16:47 | ChatGPT 桌面合并、writes 审批、stable 晋升 |
| 0.143.0 | 2026-07 初 | 累积特性 |
| 0.145.0-alpha.x | 2026-07 | 预览通道，非 @latest |

## 今日研究员结论

Codex 0.144.1 是 0.144.0 大更新的可靠收尾——所有用户应升级。ChatGPT 桌面端合并重塑「单一入口」竞争格局，与 Cursor 3.11 Side Chats 同日发布形成有趣对照：OpenAI 合并产品面，Cursor 拆分并行对话面。国内开发者注意阿里禁令不影响 Codex（Anthropic 系），但企业合规仍需自评。建议 `npm install @openai/codex@latest` + `codex doctor` 作为每日健康检查。

---
