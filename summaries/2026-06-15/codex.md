# OpenAI Codex 每日技术文档 — 2026-06-15

> 本地实测版本：**codex-cli 0.140.0**｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

**2026 年 6 月 15 日是 Codex 生态的里程碑日**：GitHub 于 **21:06 UTC** 发布 **0.140.0 稳定版**，npm `@latest` 同步升级（本地实测 `codex-cli 0.140.0`，较昨日 0.139.0 跃升 major-minor）。核心亮点为 **`/import` 从 Claude Code 迁移**、**`/usage` 用量视图**、**永久会话删除** 与 **Amazon Bedrock API Key 托管认证**。App 侧最新仍为 **26.609**（6/11 Browser Developer mode）。Fable 5 停服背景下，`/import` 成为 OpenAI 承接 Claude Code 用户的关键工程入口。

---

## 特性一：`/import` 从 Claude Code 迁移（0.140.0）

### 是什么（机制说明）

Codex 0.140.0 新增 **`/import` 命令**与配套 external agent import picker UX，允许用户**选择性导入** Claude Code 的：

- Setup 配置（认证、偏好）
- 项目配置（instructions、MCP、plugins）
- 近期聊天记录

这与 App 26.608（6/9）的「Migrate to Codex from Claude Code」形成 CLI 闭环，是 Fable 5 停服后用户迁移的**官方路径**。

### 适用场景

- **适合**：Claude Code 用户因 Fable 5 停服/政策不确定性考虑切换；需保留 CLAUDE.md 等价 instructions 的团队
- **不适合**：深度依赖 Claude 专属 MCP/hooks 且 Codex 无对等功能的项目（需手动验证）

### 前置条件

- Codex CLI **0.140.0+**
- 已 `codex login`
- 本地存在 Claude Code 配置（`~/.claude/` 等）

### 详细使用步骤（业务用户）

1. 安装最新版：`npm install -g @openai/codex@0.140.0`
2. 登录：`codex login`
3. 启动交互：`codex`
4. 输入 `/import`
5. 在 picker UI 中选择要导入的类别（setup / project config / recent chats）
6. 确认导入后运行 `codex doctor` 验证
7. 在项目目录测试一个简单任务验证上下文连续性

### 命令与配置示例

**基础 — 交互式导入**

```bash
cd /workspace/tools
./node_modules/.bin/codex
# 在 TUI 中输入：
/import
```

**进阶 — 导入后 config.toml 微调**

```toml
# ~/.codex/config.toml
model = "gpt-5.5"
approval_policy = "on-request"

[projects."/path/to/repo"]
trust_level = "trusted"
instructions_file = "AGENTS.md"
```

```bash
codex exec "继续昨天 Claude Code 会话中未完成的 refactor 任务"
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.140.0

./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.140.0 |
| `/import` 实际执行 | ⚠️ 未实测（无 auth + 无 Claude Code 历史配置） |
| `doctor` | ✅ 运行正常；auth 4 fail |

### 问题与解决方案

**错误 1：import picker 为空**

```
No external agent configurations found
```

排查：确认 `~/.claude/` 存在且含 settings.json；Claude Code 至少运行过一次。

**错误 2：导入后 MCP 不可用**

排查：逐一验证 MCP server 在 Codex 中的兼容性；运行 `codex mcp list`；部分 Claude 专属 MCP 需手动重新配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [GitHub 0.140.0 Release](https://github.com/openai/codex/releases) | 官方 |
| [Changelog 26.608 Migrate](https://developers.openai.com/codex/changelog) | 一致：App 侧 6/9 已有迁移流 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Claude Code 用户 | 在测试 repo 先 `/import` 试点，对比 1 周后再决定主力工具 |
| 团队 | 建立 AGENTS.md 作为工具无关 instructions 源，降低迁移成本 |
| 企业 | 评估导入过程中的凭证与聊天记录合规性 |

---

## 特性二：`/usage` 用量视图（0.140.0）

### 是什么（机制说明）

Codex 0.140.0 新增 **`/usage` 命令**，展示账户 token 活动的**日/周/累计**视图，帮助开发者监控 Agent 长程任务的 token 消耗——在 Loop/Goal 模式下尤为重要。

### 适用场景

- **适合**：Codex Max/Plus 用户监控配额；长程 `/goal` 任务成本追踪
- **不适合**：API 按量计费用户（应使用 OpenAI Platform dashboard）

### 详细使用步骤

1. `codex login`
2. 启动 `codex`
3. 输入 `/usage`
4. 切换日/周/累计视图
5. 结合 `/goal` 任务评估 ROI

### 命令与配置示例

```bash
# TUI 中
/usage

# App 26.609 亦有 rate-limit reset banking（Plus/Pro）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/usage` | ⚠️ 未实测（无 auth） |

### 问题与解决方案

**用量显示为 0**

排查：确认已 login；检查是否为 Team workspace 成员（用量可能在 org 级别）。

---

## 特性三：永久会话删除（0.140.0）

### 是什么（机制说明）

0.140.0 引入**永久删除**会话能力，覆盖：

- CLI：`codex delete`
- TUI：`/delete`
- App-server API：`thread/delete`

含确认 safeguards 与 subagent cleanup，满足 GDPR/企业数据Retention 需求。

### 适用场景

- **适合**：清理含敏感代码的会话；离职交接前删除个人 Codex 历史
- **不适合**：需保留审计 trail 的合规场景（删除不可逆）

### 详细使用步骤

1. 列出会话：`codex threads list`（或 TUI session picker）
2. 删除指定会话：`codex delete <thread-id>`
3. 确认 prompts
4. 验证：会话不再出现在 resume 列表

### 命令与配置示例

```bash
# CLI 删除
codex delete thread_abc123

# TUI
/delete
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 删除命令 | ⚠️ 未实测（无 auth） |

### 问题与解决方案

**误删后会话无法恢复**

排查：删除前 export 重要 transcript；企业可考虑禁用 delete 权限（managed policy）。

---

## 特性四：Amazon Bedrock API Key 托管认证（0.140.0）

### 是什么（机制说明）

0.140.0 新增 **managed Amazon Bedrock API-key authentication**，CLI 与 MCP OAuth 凭证支持**加密本地存储**。配合 6/1 GPT-5.5/Codex GA on Bedrock，企业可在 AWS 环境内闭环运行 Codex 而无需 OpenAI 直连。

### 适用场景

- **适合**：AWS 为主云的企业；需 data residency 的团队
- **不适合**：纯 OpenAI API 用户

### 前置条件

- Codex CLI 0.140.0+
- AWS Bedrock 中 Codex/GPT-5.5 访问权限
- Bedrock API Key 或 IAM 角色

### 详细使用步骤

1. 在 AWS Console 创建 Bedrock API Key
2. 配置 Codex：

```toml
# ~/.codex/config.toml
[auth]
mode = "bedrock_api_key"
bedrock_api_key = "your-key"
bedrock_region = "us-east-1"
```

3. 运行 `codex doctor` 验证 Bedrock 连接
4. 启动 `codex exec "hello world"`

### 命令与配置示例

```bash
codex doctor --json | jq '.checks[] | select(.name | contains("bedrock"))'
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bedrock auth | ⚠️ 未实测（无 AWS 凭证） |

---

## 特性五：SQLite 自动恢复与 MCP 可靠性（0.140.0）

### 是什么（机制说明）

0.140.0 修复 corrupted SQLite state database 问题：**自动备份并从 rollout 数据重建**。MCP 方面：重试 transient startup failures、OAuth 凭证不可用时报告 logged out、保留显式 disabled 的 servers。

### 适用场景

- **适合**：长程会话用户（state DB 损坏风险）；重度 MCP 用户
- **不适合**：无 MCP 的轻量用户

### 命令与配置示例

```bash
# 诊断
codex doctor

# MCP 列表
codex mcp list

# features
codex features list | head -20
```

### 本地测试结果

```bash
./node_modules/.bin/codex features list 2>&1 | head -15
# apply_patch_freeform                 removed            false
# browser_use                          stable             true
# code_mode                            under development  false
# computer_use                         stable             true
```

| 项 | 结果 |
|----|------|
| `features list` | ✅ 正常输出 |
| SQLite 恢复 | ⚠️ 未触发损坏场景 |

### 问题与解决方案

**MCP server 启动失败**

排查：0.140.0 自动重试 transient failures；检查 `codex mcp get <name>` 的 timeout 配置（sub-1000ms 值被忽略）。

**state DB 损坏**

排查：0.140.0 自动 recovery；手动备份 `~/.codex/` 目录。

---

## 特性六：`/goal` 大文本与图片保留（0.140.0）

### 是什么（机制说明）

`/goal` 现在保留 oversized text、large pasted blocks 和 image attachments，包括 remote app-server sessions。配合 App 26.609 的 goal timer 与 Codex Mobile `/goal` 支持，长程 Goal 任务的输入完整性显著提升。

### 命令与配置示例

```bash
# TUI 中创建 goal
/goal 重构 auth 模块，附带架构图 @diagram.png
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/goal` | ⚠️ 未实测 |

---

## 版本对照表

| 版本 | 日期 | 关键变更 |
|------|------|----------|
| **0.140.0** | 2026-06-15 | `/import`、`/usage`、delete、Bedrock auth、SQLite recovery |
| 0.139.0 | 2026-06-09 | Code mode Web Search、0.139 stable |
| App 26.609 | 2026-06-11 | Browser Developer mode (CDP)、Computer Use EEA 扩展 |

## 今日研究员结论

Codex 0.140.0 是 **OpenAI 在 Fable 5 停服窗口期的高明工程动作**：`/import` 降低迁移摩擦，`/usage` 回应 Loop 工程时代的成本焦虑，Bedrock auth 锁定企业 AWS 客户。建议 Claude Code 用户：**先在分支 repo 试运行 `/import` + 1 个 `/goal` 任务**，对比 Opus 4.8 与 GPT-5.5 在你代码库上的 Harness 表现后再做主力工具决策。
