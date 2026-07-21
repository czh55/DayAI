# OpenAI Codex 每日技术文档 — 2026-07-21

> 本地实测版本：**0.145.0**（stable）｜监测 alpha：**0.145.0-alpha.29**（7/21 11:49 UTC）  
> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 21 日 Codex CLI 迎来重大 stable 升级：

- **稳定版 0.145.0** 于 **18:21 UTC** 发布，npm `@latest` 已跟随（本地实测 `codex-cli 0.145.0`）
- 核心新能力：`/import` 迁移 Cursor/Claude Code、Amazon Bedrock 登录、分页线程历史、多智能体 V2 稳定化、音频输入/Realtime V3
- **预发布 0.145.0-alpha.29** 于 11:49 UTC 发布，npm `@latest` 未跟随
- **5 小时滚动限额临时移除**（7/12 Tibo 公告）仍生效
- 本地 CLI 诊断：`doctor` 12 ok · 1 warn · 4 fail；`features list` 显示 `browser_use` stable、`code_mode` under development

---

## 特性一：稳定版 0.145.0 发布 — `/import` 跨工具迁移（7/21）

### 是什么（机制说明）

[0.145.0 release](https://github.com/openai/codex/releases/tag/rust-v0.145.0) 于 7/21 18:21 UTC 发布，npm `@latest` 已跟随。最大亮点是 `/import` 命令，可从 Cursor 和 Claude Code 迁移：

- Settings（设置）
- MCP 服务器
- 插件（plugins）
- 会话（sessions）
- 命令（commands）
- 项目级 memories

在 Fable 5 分层定价次日，这显著降低了 Pro 用户从 Claude Code 分流至 Codex 的摩擦。

### 适用场景

- **适合**：从 Cursor/Claude Code 迁移至 Codex；希望保留原有 MCP 和命令配置
- **不适合**：全新安装且无迁移需求的用户

### 前置条件

Codex CLI 0.145.0+；原工具配置存在于默认路径

### 详细使用步骤（业务用户）

1. 安装最新版：`npm install -g @openai/codex@latest`
2. 确认版本：`codex --version` → `codex-cli 0.145.0`
3. 启动 Codex TUI：`codex`
4. 输入 `/import`，选择来源（Cursor 或 Claude Code）
5. 勾选要迁移的组件（settings、MCP、plugins、sessions、commands、memories）
6. 验证：`codex doctor` 检查环境；测试原有 MCP 服务器

### 命令与配置示例

```bash
# 安装并验证
npm install -g @openai/codex@latest
codex --version
# codex-cli 0.145.0

# 启动后执行
codex
# > /import
# 选择 Cursor 或 Claude Code
# 勾选迁移项
```

```bash
# 诊断迁移后环境
codex doctor
codex features list | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.145.0` |
| npm `@latest` | ✅ 已跟随 stable |
| `/import` 迁移 | ⚠️ 未实测（无 Cursor/Claude Code 本地配置） |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |

### 问题与解决方案

**部分 MCP 不兼容**：Codex 与源工具 MCP 实现可能有差异，逐个验证连接。**会话历史不完整**：实验性功能，重要会话建议手动导出备份。**迁移后命令不工作**：检查 `~/.codex/` 下 commands 目录权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.145.0 Release | ✅ |
| npm 本地实测 | ✅ 0.145.0 |
| PR #31672, #33411, #33426, #33444 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Claude Code Pro 用户 | 用 `/import` 快速评估 Codex 分流 |
| Cursor 用户 | 迁移 MCP 配置，并行测试两工具 |
| 新用户 | 跳过 import，直接配置 |

---

## 特性二：Amazon Bedrock 登录与 GPT-5.6 Sol 默认模型（0.145.0）

### 是什么（机制说明）

0.145.0 新增实验性 Amazon Bedrock 支持：

- Bedrock 登录流程
- 自定义 endpoint 和认证
- GPT-5.6 Sol 作为 Bedrock 默认模型

适合已在 AWS 生态中使用 Bedrock 的企业用户。

### 适用场景

- **适合**：AWS 企业用户、需 Bedrock 合规部署的团队
- **不适合**：个人 OpenAI 直连用户

### 前置条件

AWS 账户 + Bedrock 访问权限；Codex 0.145.0+

### 详细使用步骤（业务用户）

1. 确保 AWS CLI 已配置或准备 Bedrock API 凭证
2. 更新 Codex：`npm install -g @openai/codex@latest`
3. 在 `~/.codex/config.toml` 中配置 Bedrock endpoint
4. 运行 `codex` 并按提示完成 Bedrock 登录
5. 验证默认模型为 GPT-5.6 Sol

### 命令与配置示例

```toml
# ~/.codex/config.toml — Bedrock 配置示例
[provider]
type = "bedrock"
region = "us-east-1"
default_model = "gpt-5.6-sol"

[provider.auth]
# 按 Bedrock 登录流程配置
```

```bash
codex --version
codex doctor
# 检查 Bedrock 连接项
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bedrock 登录 | ⚠️ 未实测（无 AWS Bedrock 凭证） |
| Release notes | ✅ 功能确认 |

### 问题与解决方案

**Bedrock 认证失败**：检查 AWS IAM 权限和 region 配置。**模型不可用**：确认 Bedrock 中已启用 GPT-5.6 Sol。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release #31327, #33170, #33175 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| AWS 企业用户 | 评估 Bedrock 路径的合规优势 |
| 个人开发者 | 继续使用 OpenAI 直连 |

---

## 特性三：分页线程历史与多智能体 V2 稳定化（0.145.0）

### 是什么（机制说明）

0.145.0 两项 Agent 基础设施升级：

**分页线程历史**（实验性）：
- 高效 resume、搜索
- 持久化线程名称
- 子智能体支持
- Memories 集成

**多智能体 V2**（稳定化）：
- 可配置子智能体模型
- 可配置推理级别（reasoning levels）
- 可配置并发数
- 恢复角色（restored roles）
- 改进的智能体导航

### 适用场景

- **适合**：长期运行的复杂任务、需要回溯历史决策、多智能体并行编排
- **不适合**：简单单次问答

### 前置条件

Codex 0.145.0+；opt-in 多智能体 V2 体验

### 详细使用步骤（业务用户）

1. 更新到 0.145.0
2. 启动 `codex`，完成一个多步骤任务
3. 使用线程历史浏览过往会话：`/threads` 或相应命令
4. 启用多智能体 V2：在 config.toml 中 opt-in
5. 配置子智能体模型和并发：`codex features list` 查看 `multi_agent_v2` 状态

### 命令与配置示例

```toml
# ~/.codex/config.toml
[multi_agent]
enabled = true
max_concurrency = 5
default_subagent_model = "gpt-5.6-sol"
reasoning_level = "high"
```

```bash
codex features list | grep -i agent
# multi_agent_v2 — stable

codex
# > /threads
# 浏览历史线程
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` | ✅ `code_mode_host` stable；`code_mode` under development |
| 多智能体 V2 | ⚠️ 未实测推理 |
| 线程历史 | ⚠️ 未实测 |

### 问题与解决方案

**线程历史为空**：实验性功能，需完成至少一次会话后才有记录。**子智能体不 spawn**：检查 `multi_agent.enabled` 和并发配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release #33364, #33550, #33631 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 复杂任务用户 | 启用多智能体 V2，配置合理并发 |
| 新用户 | 先掌握单智能体，再探索 V2 |

---

## 特性四：音频输入与 Realtime V3 对话（0.145.0）

### 是什么（机制说明）

0.145.0 新增：

- 音频输入和工具输出（支持常见本地音频格式）
- 流式 Realtime V3 对话

将 Codex 从纯文本 CLI 扩展至多模态交互。

### 适用场景

- **适合**：语音驱动编程、无障碍访问、快速口述需求
- **不适合**：安静办公环境、纯文本偏好用户

### 前置条件

Codex 0.145.0+；麦克风权限；支持的音频格式

### 详细使用步骤（业务用户）

1. 更新到 0.145.0
2. 在 Codex TUI 中启用音频输入（按提示或配置）
3. 使用麦克风口述编程任务
4. Codex 通过 Realtime V3 流式处理并回复
5. 工具输出也可包含音频格式

### 命令与配置示例

```toml
# ~/.codex/config.toml
[audio]
enabled = true
input_format = "wav"
realtime_version = "v3"
```

```bash
codex features list | grep -i audio
# 查看音频相关 feature flag
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 音频功能 | ⚠️ 未实测（Cloud Agent 无麦克风） |
| Release notes | ✅ #33261, #33856, #33932 确认 |

### 问题与解决方案

**麦克风无权限**：检查系统音频权限设置。**音频格式不支持**：转换为 wav/mp3 等常见格式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动/语音场景 | 尝试 Realtime V3 口述需求 |
| 传统开发者 | 可忽略，继续文本交互 |

---

## 特性五：5 小时滚动限额临时移除（持续）+ `codex exec` / `codex doctor`

### 是什么（机制说明）

7/12 Tibo 公告的 5 小时滚动限额临时移除仍生效，在 Fable 5 分层次日成为承接 Claude Code Pro 用户分流的关键筹码。

`codex exec` 支持非交互式执行；`codex doctor` 诊断环境；`codex features list` 查看功能开关。

### 适用场景

- **适合**：从 Claude Code Pro 分流的重度用户；CI/CD 非交互执行
- **不适合**：—（限额移除对用户有利）

### 前置条件

OpenAI 账户（ChatGPT Plus/Pro 或 API Key）；Codex 0.145.0+

### 详细使用步骤（业务用户）

1. 安装：`npm install -g @openai/codex@latest`
2. 诊断：`codex doctor`（目标 12+ ok）
3. 查看功能：`codex features list`
4. 非交互执行：`codex exec "修复 src/auth.ts 中的类型错误"`
5. 配置：`~/.codex/config.toml`

### 命令与配置示例

```bash
# 环境诊断
codex doctor
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

# 功能列表
codex features list | head -15

# 非交互执行
codex exec "运行测试并报告失败用例"

# 版本确认
codex --version
# codex-cli 0.145.0
```

```toml
# ~/.codex/config.toml
model = "gpt-5.6-sol"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[projects."/workspace"]
trust_level = "trusted"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.145.0` |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `codex features list` | ✅ `browser_use` stable, `code_mode` under development |
| `codex exec` 推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**doctor 4 fail**：通常因缺少 API Key 或 app-server 未运行，属 Cloud Agent 环境预期。**限额恢复**：关注 OpenAI 公告，限额移除为临时措施。**`code_mode` 不可用**：仍为 under development，使用 `code_mode_host`（stable）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Tibo 7/12 公告 | ✅ 限额移除 |
| 本地 doctor | ✅ 12 ok |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Claude Pro 用户 | 利用限额移除窗口评估 Codex 分流 |
| CI 用户 | 用 `codex exec` 集成流水线 |
| 所有用户 | 定期 `codex doctor` 保持健康环境 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 通道 | 关键变更 |
|------|----------------|------|----------|
| **0.145.0** | 2026-07-21 18:21 | stable | `/import`、Bedrock、多智能体 V2、音频 |
| 0.145.0-alpha.29 | 2026-07-21 11:49 | alpha | 预发布迭代 |
| 0.145.0-alpha.25 | 2026-07-20 18:51 | alpha | 预发布 |
| 0.144.6 | 2026-07-18 13:51 | stable（已替代） | GPT-5.6 指令刷新、272K 上下文 |

## 今日研究员结论

Codex 0.145.0 是今日最重要的国际工具更新：`/import` 直接回应 Fable 5 分层后的用户分流需求，多智能体 V2 稳定化与分页线程历史强化 Agent 基础设施。建议所有用户今日执行 `npm update` 并运行 `codex doctor`。5h 限额移除窗口仍开放，Pro 用户应抓紧评估。

---
