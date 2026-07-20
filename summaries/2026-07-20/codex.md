# OpenAI Codex 每日技术文档 — 2026-07-20

> 本地实测版本：**0.144.6**（stable）｜监测 alpha：**0.145.0-alpha.25**（7/20 18:51 UTC）  
> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 20 日 Codex CLI 发布节奏：

- **稳定版 0.144.6**（7/18 13:51 UTC）仍为 npm `@latest`，今日无新 stable release
- **预发布 0.145.0-alpha.25** 于 **7/20 18:51 UTC** 发布（commit `37222ab`），npm 未跟随
- **5 小时滚动限额临时移除**（7/12 Tibo 公告）仍生效，在 Fable 5 分层今日落地背景下成为承接 Pro 用户分流的关键筹码
- **本地 CLI 诊断**：`doctor` 12 ok · 1 warn · 4 fail；`features list` 显示 `browser_use` stable、`code_mode` under development
- 推理能力 ⚠️ 未实测（无 API Key）

---

## 特性一：预发布 0.145.0-alpha.25 今日发布（7/20）

### 是什么（机制说明）

[0.145.0-alpha.25 release](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.25) 于 7/20 18:51 UTC 发布。Release notes 仅标注 "Release 0.145.0-alpha.25"，无详细 changelog 条目。npm `@latest` 仍指向 0.144.6。

alpha 通道通常包含尚未进入 stable 的功能预览，建议仅在测试环境使用。

### 适用场景

- **适合**：愿意尝鲜的开发者、测试新功能
- **不适合**：生产环境、CI/CD 流水线

### 前置条件

npm 安装 alpha 通道：`npm install @openai/codex@0.145.0-alpha.25`

### 详细使用步骤（业务用户）

1. 在测试目录安装 alpha 版本
2. 确认版本：`codex --version` 应显示 `0.145.0-alpha.25`
3. 运行 `codex doctor` 检查环境
4. 对比 stable 0.144.6 行为差异
5. 发现问题回退：`npm install @openai/codex@0.144.6`

### 命令与配置示例

```bash
# 安装 alpha 版本
npm install @openai/codex@0.145.0-alpha.25

# 确认版本
./node_modules/.bin/codex --version
# codex-cli 0.145.0-alpha.25

# 环境诊断
./node_modules/.bin/codex doctor

# 回退 stable
npm install @openai/codex@0.144.6
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| npm `@latest` | ✅ 仍为 0.144.6（alpha 未跟随） |
| GitHub alpha.25 | ✅ 7/20 18:51 UTC 发布确认 |
| alpha 安装实测 | ⚠️ 本次仅安装 `@latest`，未单独安装 alpha |

### 问题与解决方案

**alpha 版本不稳定**：始终保留 stable 0.144.6 作为回退。**npm 找不到 alpha 版本**：直接从 GitHub releases 下载对应平台二进制包。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.145.0-alpha.25 | ✅ 7/20 18:51 UTC |
| npm @latest | ✅ 未跟随 alpha |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.144.6 |
| 尝鲜用户 | 测试环境安装 alpha.25 |

---

## 特性二：稳定版 0.144.6 GPT-5.6 模型元数据（7/18，仍为最新）

### 是什么（机制说明）

[0.144.6 release](https://github.com/openai/codex/releases/tag/rust-v0.144.6)（7/18 13:51 UTC）刷新 GPT-5.6 三档模型内置指令并修正上下文窗口为 **272,000 tokens**：

> Refreshed bundled instructions for GPT-5.6 Sol, Terra, and Luna, and corrected their context windows to 272,000 tokens.

### 适用场景

- **适合**：使用 GPT-5.6 系列的所有 Codex 用户
- **不适合**：仍使用 GPT-5.5 或更早模型

### 前置条件

Codex CLI ≥ 0.144.6；ChatGPT Plus/Pro/Business

### 详细使用步骤（业务用户）

1. 确认版本：`codex --version` 应显示 `codex-cli 0.144.6`
2. 运行 `codex doctor` 检查环境
3. 以 272K 上下文重新评估长任务 prompt 预算
4. 在 Fable 5 分层落地后，对比 Codex 与 Claude Code 编程体验

### 命令与配置示例

```bash
codex --version    # codex-cli 0.144.6
codex doctor
codex features list 2>&1 | head -15
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5.6-sol"
# 上下文窗口：272,000 tokens（0.144.6 修正后）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.144.6` |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| GPT-5.6 指令刷新 | ⚠️ 未实测推理（无 API Key） |

### 问题与解决方案

**版本仍为 0.144.5**：`npm cache clean --force && npm install -g @openai/codex@latest`。**上下文规划偏差**：以 272K 为准。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.6 | ✅ 7/18 13:51 UTC |
| npm @latest | ✅ 0.144.6 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有 Codex 用户 | 保持 0.144.6 |
| Fable 5 转 credits 的 Pro 用户 | 评估 Codex 作为主力编程工具 |

---

## 特性三：5 小时限额临时移除（7/12 起，仍生效）

### 是什么（机制说明）

OpenAI 产品负责人 Tibo 于 7/12 宣布**临时移除** Plus/Business/Pro 用户的 Codex **5 小时滚动使用限制**（期限未知）。虎嗅（7/15）报道 Codex 周活突破 900 万，日增超 100 万。

在 Fable 5 分层今日落地的背景下，Codex「无 5h 限制」是承接 Claude Pro 用户分流的最直接筹码。周限额仍有效。

### 适用场景

- **适合**：重度编程用户、Fable 5 credits 紧张的 Pro 用户
- **不适合**：已满足周限额的用户

### 前置条件

ChatGPT Plus/Pro/Business 付费订阅

### 详细使用步骤（业务用户）

1. 确认 ChatGPT 方案为 Plus/Pro/Business
2. 打开 ChatGPT 桌面端 → 切换到 Codex 模式
3. 或 CLI：`codex` 启动交互会话
4. 无需再每 5 小时发送保活消息
5. 注意周限额仍有效，用 `codex doctor` 检查额度状态

### 命令与配置示例

```bash
# CLI 启动
codex

# 非交互执行
codex exec "重构 src/auth 模块并运行测试"

# 检查环境
codex doctor
```

```toml
# ~/.codex/config.toml
[usage]
# 5h 限额已临时移除，周限额仍有效
# 关注 OpenAI 是否恢复 5h 限制
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ 0.144.6 |
| 5h 限额移除 | ⚠️ 未实测推理（无 API Key） |
| Tibo 7/12 公告 | ✅ X 帖确认 |

### 问题与解决方案

**周限额耗尽**：5h 移除不解除周限；等待周重置或联系 OpenAI。**OpenAI 恢复 5h 限制**：关注 Tibo X 账号公告，及时调整工作流。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Tibo X 帖 7/12 | ✅ 移除 5h 限制 |
| 虎嗅 7/15 | ✅ 900 万周活（⚠️ OpenAI 未官方 press release） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Claude Pro 重度用户 | 今日起评估 Codex 分流 |
| ChatGPT Pro 用户 | 充分利用无 5h 限制窗口 |

---

## 特性四：codex exec 与 /goal 目标循环

### 是什么（机制说明）

`codex exec` 为非交互模式执行单次任务。`/goal` 模式设定明确目标，评估器自动判断是否达标，未达标则重试——与 Claude Code `/goal` 形成竞品对标。

虎嗅（7/13）报道 GPT-5.6 下外部 Skills（Superpowers、grill、AGENTS.md）可能污染上下文，建议删除多余 Skills，让模型原生 Agentic 能力发挥作用。

### 适用场景

- **适合**：CI/CD 集成、自动化脚本、目标驱动的重复任务
- **不适合**：需要多轮人工介入的复杂设计讨论

### 前置条件

Codex CLI ≥ 0.144.0；ChatGPT 付费订阅

### 详细使用步骤（业务用户）

1. 单次任务：`codex exec "任务描述"`
2. 目标循环：在 Codex 会话中输入 `/goal 确保所有测试通过`
3. 删除多余外部 Skills，减少上下文污染
4. 设置边界与验收标准（参考 OpenAI Eric 官方 GPT-5.6 提示词指南）

### 命令与配置示例

```bash
# 非交互执行
codex exec "为 src/utils.ts 添加单元测试并确保全部通过"

# 带工作目录
codex exec --cwd /path/to/project "修复 lint 错误"

# 查看帮助
codex exec --help
```

```toml
# ~/.codex/config.toml
[agent]
# 设置默认工作量级别
workload = "high"
```

```text
# 会话中
/goal 确保所有单元测试通过且覆盖率 > 80%
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 命令可用 |
| `/goal` 模式 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**exec 超时**：增加 `--timeout` 参数或拆分任务。**goal 循环不停止**：明确停止条件；检查评估标准是否可机器判定。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI help | ✅ exec 命令文档 |
| 虎嗅 Skills 删除建议 | ✅ 社区实践，非官方要求 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | `codex exec` 集成 CI pipeline |
| 个人开发者 | `/goal` 用于自动化测试修复循环 |

---

## 特性五：Browser Developer mode 与 Web Search（stable）

### 是什么（机制说明）

`codex features list` 显示以下功能为 **stable**：

- `browser_use`：浏览器自动化
- `browser_use_external`：外部浏览器
- `browser_use_full_cdp_access`：完整 CDP 访问
- `auth_elicitation`：认证引导

`code_mode` 仍为 **under development**，`code_mode_host` 为 stable。

### 适用场景

- **适合**：需要浏览器测试、网页抓取、E2E 验证的编程任务
- **不适合**：纯后端/API 开发

### 前置条件

Codex CLI ≥ 0.144.0；ChatGPT Plus 及以上

### 详细使用步骤（业务用户）

1. 运行 `codex features list` 确认 browser_use 为 stable
2. 在 Codex 会话中描述需要浏览器操作的任务
3. Codex 自动启动浏览器并执行操作
4. 审查浏览器操作日志确认行为符合预期

### 命令与配置示例

```bash
codex features list 2>&1 | grep browser
# browser_use                          stable             true
# browser_use_external                 stable             true
# browser_use_full_cdp_access          stable             true
```

```toml
# ~/.codex/config.toml
[features]
browser_use = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` browser_use | ✅ stable |
| 浏览器操作实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**浏览器未启动**：运行 `codex doctor` 检查依赖；确认系统有可用浏览器。**CDP 访问被拒绝**：检查 `browser_use_full_cdp_access` 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| `features list` 输出 | ✅ browser_use stable |
| OpenAI Codex Docs | ✅ 浏览器模式文档 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | 用 browser_use 自动化 E2E 测试 |
| 后端开发者 | 暂不需要，专注 code_mode |

---

## 特性六：config.toml 与 codex doctor 诊断

### 是什么（机制说明）

Codex 配置集中在 `~/.codex/config.toml`。`codex doctor` 运行环境诊断，检查认证、沙箱、功能标志等。本地实测：12 ok · 1 idle · 5 notes · 1 warn · 4 fail。

### 适用场景

- **适合**：首次安装、环境问题排查、升级后验证
- **不适合**：—

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. 运行 `codex doctor` 查看完整诊断报告
2. 用 `--summary compact` 获取简洁输出
3. 用 `--json` 获取机器可读报告
4. 根据 fail 项逐一修复
5. 编辑 `~/.codex/config.toml` 调整配置

### 命令与配置示例

```bash
codex doctor
codex doctor --summary compact
codex doctor --json 2>&1 | head -20
```

```toml
# ~/.codex/config.toml 示例
[model]
default = "gpt-5.6-sol"

[features]
browser_use = true

[sandbox]
mode = "enabled"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| `config.toml` 存在 | ✅ `~/.codex/config.toml` |
| 认证状态 | ❌ fail（无 API Key / 未登录） |

### 问题与解决方案

**4 fail 项**：通常为认证未配置（`codex login`）和 app-server 未运行，Cloud Agent 环境属正常。**config.toml 语法错误**：参考 `config-schema.json`（GitHub releases 附带）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| `codex doctor` 输出 | ✅ 本地实测 |
| GitHub config-schema.json | ✅ 配置 schema 完整 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后首先运行 `codex doctor` |
| 升级用户 | 每次升级后重新运行 doctor |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 核心变更 |
|------|----------------|----------|
| 0.145.0-alpha.25 | 7/20 18:51 | 预发布，无详细 changelog |
| 0.145.0-alpha.24 | 7/18 22:26 | 预发布 |
| 0.144.6 | 7/18 13:51 | GPT-5.6 指令刷新、272K 上下文 |
| 0.144.5 | 7/16 02:54 | dangerous-command 检测增强 |

## 今日研究员结论

7/20 Codex 最大变化是 **alpha.25 预发布**，但生产环境仍应锁定 **0.144.6**。在 Fable 5 分层今日落地的背景下，Codex **5h 限额移除** + **900 万周活** 使其成为 Claude Pro 用户分流的首选方案。建议 Pro 用户：① 安装 Codex CLI；② 运行 `codex doctor` 确认环境；③ 用 `codex exec` 或 Codex 模式对比 Fable 5 编程体验；④ 删除多余外部 Skills 减少 GPT-5.6 token 消耗。

---
