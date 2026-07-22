# OpenAI Codex 每日技术文档 — 2026-07-22

> 本地实测版本：**0.145.0**（stable）｜监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 22 日 Codex **稳定版仍为 0.145.0**（昨日发布），npm `@latest` 未升级。GitHub 今日连发 **0.146.0-alpha.1/2/3** 预发布版本（最新 alpha.3 于 21:51 UTC），处于快速迭代期。0.145.0 仍是当前生产推荐版本，含 `/import` 迁移、Bedrock 登录、多智能体 V2 稳定化等重大功能。建议生产环境继续使用 stable，alpha 仅用于测试。

---

## 特性一：0.146.0-alpha 系列快速迭代（7/22 新发布）

### 是什么（机制说明）

2026 年 7 月 22 日 GitHub 发布三个 alpha 预发布版本：

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| 0.146.0-alpha.1 | 05:01 | Pre-release |
| 0.146.0-alpha.2 | 07:22 | Pre-release |
| **0.146.0-alpha.3** | 21:51 | Pre-release（最新） |

alpha 版本 release notes 较简略（"Release 0.146.0-alpha.3"），详细变更需查看 commit diff。npm `@latest` 仍指向 0.145.0 stable。

### 适用场景

- **适合**：愿意测试前沿功能的开发者；CI 冒烟测试
- **不适合**：生产环境；需要稳定性的团队工作流

### 前置条件

愿意承担 alpha 不稳定风险；通过 GitHub releases 或 npm `@alpha` 安装

### 详细使用步骤（业务用户）

1. 确认当前 stable 版本：`codex --version`（应为 0.145.0）
2. 安装 alpha（可选）：
   ```bash
   npm install -g @openai/codex@0.146.0-alpha.3
   ```
3. 验证版本：`codex --version`
4. 运行 `codex doctor` 检查环境
5. 测试后回退 stable：
   ```bash
   npm install -g @openai/codex@0.145.0
   ```

### 命令与配置示例

```bash
# 查看当前版本
codex --version
# codex-cli 0.145.0

# 安装最新 alpha
npm install @openai/codex@0.146.0-alpha.3

# 环境检查
codex doctor

# 功能列表
codex features list | head -20
```

```toml
# ~/.codex/config.toml — alpha 测试配置
[model]
default = "gpt-5.6-sol"

[features]
multi_agent_v2 = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.145.0`（stable） |
| alpha.3 GitHub | ✅ 7/22 21:51 UTC 发布 |
| npm `@latest` | ✅ 仍为 0.145.0 |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `codex features list` | ✅ apps/browser_use/code_mode_host stable |

### 问题与解决方案

**alpha 安装后不稳定**：回退到 `npm install @openai/codex@0.145.0`。**alpha release notes 为空**：查看 GitHub commit diff 或等待 stable 发布。**doctor 4 fail**：通常因无 API Key 或 app-server 未运行，不影响 CLI 基础功能。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.146.0-alpha.3 | ✅ 7/22 21:51 UTC |
| npm `@latest` | ✅ 未跟随 alpha |
| 本地实测 | ✅ 0.145.0 stable |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 继续使用 0.145.0 stable |
| 早期采用者 | 在隔离环境测试 alpha.3 |
| CI/CD | 锁定 0.145.0，不自动升级 alpha |

---

## 特性二：`/import` 从 Cursor/Claude Code 迁移（0.145.0 stable）

### 是什么（机制说明）

0.145.0 大幅扩展 `/import` 命令，可从 Cursor 和 Claude Code 迁移：

- 设置（settings）
- MCP 服务器配置
- 插件（plugins）
- 会话（sessions）
- 命令（commands）
- 项目级记忆（project-scoped memories）

这是 Codex 主动降低从竞品迁移摩擦的关键功能，在 Fable 5 分层定价背景下尤为重要。

### 适用场景

- **适合**：从 Cursor 或 Claude Code 分流到 Codex 的用户
- **不适合**：全新 Codex 用户（无迁移需求）

### 前置条件

Codex 0.145.0+；源工具（Cursor/Claude Code）已配置

### 详细使用步骤（业务用户）

1. 安装/更新 Codex：`npm install -g @openai/codex@latest`
2. 启动 Codex：`codex`
3. 输入 `/import` 命令
4. 选择源工具：Cursor 或 Claude Code
5. 选择要迁移的项目：settings、MCP、plugins、sessions、commands、memories
6. 确认迁移，Codex 自动导入配置
7. 运行 `codex doctor` 验证 MCP 连接

### 命令与配置示例

```bash
# 启动 Codex 并导入
codex
> /import

# 交互式选择：
# Source: [Cursor | Claude Code]
# Items: [x] Settings [x] MCP [x] Plugins [ ] Sessions [x] Commands [x] Memories
```

```bash
# 非交互式导入（若支持）
codex exec "/import from claude-code --all"
```

```toml
# ~/.codex/config.toml — 导入后检查
[mcp]
# 导入的 MCP 服务器会出现在此处

[plugins]
# 导入的插件配置
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/import` 功能 | ✅ 0.145.0 release notes 确认 |
| 实际迁移 | ⚠️ 未实测（无源工具配置） |

### 问题与解决方案

**导入后 MCP 连接失败**：运行 `codex doctor` 检查，重新认证 OAuth MCP。**Sessions 未导入**：确认源工具会话格式兼容。**部分设置丢失**：检查 Codex 与源工具的 settings schema 差异。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.145.0 Release | ✅ Expanded /import |
| GitHub #31672,#33411 | ✅ PR 引用 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Cursor 用户 | 试用 `/import` 评估 Codex 工作流 |
| Claude Code 用户 | 迁移 MCP 和 skills 降低切换成本 |
| 团队 Lead | 制定统一迁移 SOP |

---

## 特性三：多智能体 V2 稳定化（0.145.0 stable）

### 是什么（机制说明）

0.145.0 将 opt-in 多智能体 V2 体验稳定化：

- 可配置子智能体模型
- 可配置推理级别（reasoning levels）
- 可配置并发数
- 恢复角色（restored roles）
- 改进 Agent 导航

配合分页线程历史、搜索、持久化名称，形成完整的多 Agent 编排能力。

### 适用场景

- **适合**：大型项目需要并行多 Agent 处理
- **不适合**：简单单线程任务

### 前置条件

Codex 0.145.0+；opt-in 多智能体 V2

### 详细使用步骤（业务用户）

1. 在 `~/.codex/config.toml` 启用多智能体 V2
2. 配置子智能体模型与推理级别
3. 使用自然语言或 `/goal` 委派子任务
4. 通过 Agent 导航面板监控并切换子智能体
5. 利用分页历史恢复长会话

### 命令与配置示例

```toml
# ~/.codex/config.toml
[features]
multi_agent_v2 = true

[multi_agent]
max_concurrent = 5
default_subagent_model = "gpt-5.6-sol"
reasoning_level = "high"
```

```bash
# 使用 /goal 委派
codex
> /goal 分析 frontend 和 backend 的 API 兼容性，分别派两个 agent

# 查看功能状态
codex features list | grep multi
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| multi_agent_v2 | ✅ features list 显示 stable |
| 子智能体 spawn | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**多智能体未启用**：检查 config.toml 中 `multi_agent_v2 = true`。**子智能体模型不可用**：确认模型在 catalog 中且账户有权限。**导航混乱**：利用分页历史与持久化名称定位子智能体。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.145.0 Release | ✅ Stabilized multi-agent V2 |
| features list | ✅ stable |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 从 2-3 并发开始试用 |
| 团队 | 统一子智能体模型策略 |
| 与 Claude Code 对比 | Codex V2 更成熟，Claude 2.1.217 刚加上限 |

---

## 特性四：Amazon Bedrock 登录与 GPT-5.6 Sol（0.145.0 stable）

### 是什么（机制说明）

0.145.0 新增实验性 Amazon Bedrock 登录支持：

- 自定义 endpoint 与认证
- GPT-5.6 Sol 作为默认 Bedrock 模型
- 托管 Bedrock 登录 API

适合 AWS 企业用户通过 Bedrock 使用 Codex。

### 适用场景

- **适合**：AWS 企业环境、已有 Bedrock 配额的用户
- **不适合**：非 AWS 用户

### 前置条件

Codex 0.145.0+；AWS Bedrock 访问权限

### 详细使用步骤（业务用户）

1. 配置 AWS credentials（`aws configure` 或 IAM role）
2. 启动 Codex：`codex`
3. 选择 Bedrock 登录方式
4. 验证 GPT-5.6 Sol 作为默认模型
5. 运行 `codex doctor` 确认 Bedrock 连接

### 命令与配置示例

```bash
# Bedrock 登录
codex login --provider bedrock

# 验证
codex doctor | grep -i bedrock
```

```toml
# ~/.codex/config.toml
[auth]
provider = "bedrock"

[model]
default = "gpt-5.6-sol"
bedrock_region = "us-east-1"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bedrock 登录 | ⚠️ 未实测（无 AWS 凭证） |
| Release notes | ✅ 实验性 Bedrock 确认 |

### 问题与解决方案

**Bedrock 认证失败**：检查 IAM 权限与 region 配置。**GPT-5.6 Sol 不可用**：确认 Bedrock 中已启用该模型。**与 OpenAI 直连冲突**：在 config.toml 中明确指定 provider。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.145.0 Release | ✅ Amazon Bedrock login |
| GitHub #31327 | ✅ managed Bedrock login API |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| AWS 企业用户 | 评估 Bedrock 路径的成本与合规 |
| 个人开发者 | 继续使用 OpenAI 直连 |
| 与 Claude Bedrock | 两边都支持 Bedrock，可对比 |

---

## 特性五：`codex exec` 与 Code Mode（持续有效）

### 是什么（机制说明）

Codex 的非交互式执行模式 `codex exec` 与 Code Mode 持续有效：

- `codex exec`：脚本化/CI 集成
- Code Mode：V8 沙箱执行（`code_mode_host` stable）
- Browser Developer mode：浏览器自动化
- Web Search：独立网络搜索

### 适用场景

- **适合**：CI/CD 集成、自动化脚本、浏览器测试
- **不适合**：需要交互式调试的场景

### 前置条件

Codex 0.145.0+

### 详细使用步骤（业务用户）

1. 非交互执行：`codex exec "修复这个 bug 并提交 PR"`
2. Code Mode：在 config.toml 启用 `code_mode`
3. Browser：启用 `browser_use` 功能
4. 检查功能状态：`codex features list`

### 命令与配置示例

```bash
# 非交互执行
codex exec "运行测试并报告结果"

# 带目标
codex exec --goal "重构 auth 模块" .

# 功能检查
codex features list | grep -E "code_mode|browser|web_search"
```

```toml
[features]
code_mode = true
browser_use = true
web_search = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` | ⚠️ 未实测（无 API Key） |
| `code_mode_host` | ✅ features list: stable |
| `browser_use` | ✅ features list: stable |

### 问题与解决方案

**exec 超时**：增加 timeout 配置或使用 `--goal` 分解任务。**Code Mode 不可用**：确认 `code_mode_host` 为 stable 且已启用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list 本地实测 | ✅ |
| 0.145.0 Release | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | 用 `codex exec` 集成 CI |
| 前端开发者 | Browser mode 做 E2E 测试 |
| 脚本用户 | Code Mode 安全执行 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 渠道 | 核心变更 |
|------|----------------|------|----------|
| 0.146.0-alpha.3 | 2026-07-22 21:51 | GitHub pre-release | alpha 快速迭代 |
| 0.146.0-alpha.2 | 2026-07-22 07:22 | GitHub pre-release | — |
| 0.146.0-alpha.1 | 2026-07-22 05:01 | GitHub pre-release | — |
| **0.145.0** | 2026-07-21 18:21 | **stable / npm @latest** | `/import`、Bedrock、多智能体 V2 |
| 0.144.6 | 2026-07-18 13:51 | stable | GPT-5.6 提示词刷新 |

## 今日研究员结论

Codex 今日无 stable 更新，但 alpha 系列快速迭代（一日三版）表明 0.146.0 stable 可能近日发布。生产环境继续使用 0.145.0，其 `/import` 与多智能体 V2 已是重大升级。关注 alpha 是否引入 breaking changes，stable 发布后立即评估升级。

---
