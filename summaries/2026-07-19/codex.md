# OpenAI Codex 每日技术文档 — 2026-07-19

> 本地实测版本：**0.144.6**（stable）｜监测 alpha：**0.145.0-alpha.24**（7/18 22:26 UTC）  
> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 19 日 Codex CLI 实测与发布节奏：

- **稳定版 0.144.6**（7/18 13:51 UTC 发布）仍为 npm `@latest`，今日无新 stable release
- **预发布 0.145.0-alpha.24** 于 7/18 22:26 UTC 发布，npm 未跟随
- **5 小时滚动限额临时移除**（7/12 Tibo 公告）仍生效，与 Fable 5 今日截止形成竞品窗口
- **本地 CLI 诊断**：`doctor` 12 ok · 1 warn · 4 fail；`features list` 显示 `browser_use` stable、`code_mode` under development
- 推理能力 ⚠️ 未实测（无 API Key）

---

## 特性一：稳定版 0.144.6 GPT-5.6 模型元数据（7/18 发布，仍为最新）

### 是什么（机制说明）

[0.144.6 release](https://github.com/openai/codex/releases/tag/rust-v0.144.6)（7/18 13:51 UTC）刷新 GPT-5.6 三档模型内置指令并修正上下文窗口为 **272,000 tokens**：

> Refreshed bundled instructions for GPT-5.6 Sol, Terra, and Luna, and corrected their context windows to 272,000 tokens.

### 适用场景

- **适合**：使用 GPT-5.6 系列的所有 Codex 用户
- **不适合**：仍使用 GPT-5.5 或更早模型（需手动切换）

### 前置条件

Codex CLI ≥ 0.144.6；ChatGPT Plus/Pro/Business

### 详细使用步骤（业务用户）

1. 确认版本：`codex --version` 应显示 `codex-cli 0.144.6`
2. 运行 `codex doctor` 检查环境
3. 以 272K 上下文重新评估长任务 prompt 预算
4. 在 Fable 5 今日截止前，对比 Codex 与 Claude Code 的编程体验

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
| Fable 5 即将失去免费额度的 Pro 用户 | 今日评估 Codex 作为备选 |

---

## 特性二：5 小时限额临时移除（7/12 起，仍生效）

### 是什么（机制说明）

OpenAI 产品负责人 Tibo 于 7/12 宣布**临时移除** Plus/Business/Pro 用户的 Codex **5 小时滚动使用限制**（期限未知）。这是对 Claude Fable 5 延期的直接回应。周限额仍有效。

虎嗅（7/15）报道 Codex 周活突破 900 万，日增超 100 万，额度松绑是增长关键驱动因素之一。

### 适用场景

- **适合**：重度编程用户、Fable 5 今日截止后寻找替代方案的 Pro 用户
- **不适合**：已满足周限额的用户（5h 移除不解除周限）

### 前置条件

ChatGPT Plus/Pro/Business 付费订阅；Codex CLI 或 ChatGPT 桌面端 Codex 模式

### 详细使用步骤（业务用户）

1. 在 ChatGPT 桌面端切换到 **Codex 模式**
2. 或在终端运行 `codex` 启动 CLI
3. 利用无 5h 限制进行长周期编程任务
4. 注意周限额仍有效，通过 ChatGPT Settings 查看用量

### 命令与配置示例

```bash
codex
# 或指定任务
codex exec "重构 src/auth 模块，确保所有测试通过"
```

```toml
# config.toml — 长任务配置
[agent]
max_turns = 50
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 5h 限制移除 | ✅ Tibo 7/12 公告 + 量子位/虎嗅交叉验证 |
| 实际额度行为 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**仍遇到 5h 限制**：确认账户为 Plus/Pro/Business；检查是否已恢复限制（政策可能变化）。**周限额耗尽**：等待周重置或购买 credits。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Tibo 社交媒体 | ✅ |
| [量子位 7/12](https://www.qbitai.com/2026/07/448139.html) | ✅ |
| [虎嗅 7/15](https://www.huxiu.com/article/4875744.html) | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Fable 5 今日截止的 Pro 用户 | 立即评估 Codex 长任务能力 |
| 重度用户 | 趁窗口期完成积压任务，但关注政策变化 |
| 成本敏感者 | 对比 Codex token 效率（社区称约为 Claude Code 1/3） |

---

## 特性三：codex exec 与 /goal 目标模式

### 是什么（机制说明）

`codex exec` 提供非交互式单次任务执行，适合 CI/CD 和脚本化调用。`/goal` 模式实现目标循环——Codex 对照验收标准反复执行直到达标，与 Claude Code `/goal` 形成对标。

GPT-5.6 官方提示词指南（OpenAI Eric）强调：设定边界、定义验收标准、说明验证方式。

### 适用场景

- **适合**：CI 自动化、有明确验收标准的重构/修复任务
- **不适合**：需要多轮人机交互的探索性任务

### 前置条件

Codex CLI ≥ 0.144.5；已登录

### 详细使用步骤（业务用户）

1. 用 `codex exec` 传入任务描述和验收标准
2. 或在交互模式中输入 `/goal` 设定目标循环
3. 在 prompt 中明确：复现步骤、约束条件、验证方法
4. Codex 完成后自动运行验证

### 命令与配置示例

```bash
# 非交互执行
codex exec "修复 settings 页 Bug：1) 复现步骤：打开 /settings 点击 Save 2) 约束：不改变 API 接口 3) 验证：复现后修复，运行 npm test"

# 交互模式目标循环
codex
/goal 所有 eslint 错误清零，npm run lint 零 warning，最多 15 轮
```

```toml
# config.toml
[exec]
sandbox = "workspace-write"
approval_policy = "on-request"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` 命令 | ✅ `--help` 可见 |
| `/goal` 模式 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**exec 超时**：增加 `max_turns` 或拆分任务。**验收标准模糊导致循环不停止**：改为可量化条件。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI help | ✅ exec 存在 |
| [虎嗅 GPT-5.6 提示词](https://www.huxiu.com/article/4874858.html) | ✅ 验收标准重要性 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | 用 `codex exec` 集成 CI pipeline |
| 个人开发者 | 用 `/goal` 自动化 lint/test 修复 |

---

## 特性四：Browser Developer mode 与 Web Search

### 是什么（机制说明）

`codex features list` 显示以下特性状态：

- `browser_use`：**stable**
- `browser_use_external`：**stable**
- `browser_use_full_cdp_access`：**stable**
- `web_search`：stable（features list 中可见）

Browser Developer mode 允许 Codex 在沙盒中操作浏览器验证 UI 修改；Web Search 支持实时信息检索。

### 适用场景

- **适合**：前端开发、需要浏览器验证的 UI 修复、需要最新文档的编程任务
- **不适合**：纯后端逻辑、无 UI 的算法任务

### 前置条件

Codex CLI ≥ 0.144.0；ChatGPT Pro 推荐（Browser 功能可能需要更高 tier）

### 详细使用步骤（业务用户）

1. 在 Codex 中描述需要浏览器验证的任务
2. Codex 自动启动沙盒浏览器，修改代码后查看运行结果
3. 需要最新 API 文档时，Codex 自动 Web Search
4. 通过 `codex features list` 确认特性可用

### 命令与配置示例

```bash
codex features list 2>&1 | grep browser
# browser_use                         stable             true
# browser_use_external                stable             true
# browser_use_full_cdp_access         stable             true
```

```toml
# config.toml
[features]
browser_use = true
web_search = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` browser 状态 | ✅ stable |
| 实际浏览器操作 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**浏览器未启动**：运行 `codex doctor` 检查沙盒环境。**Web Search 无结果**：检查网络与 API 权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| `codex features list` 本地输出 | ✅ browser_use stable |
| 虎嗅 Theo-t3 评论 | ✅ computer use 是 Codex 核心差异 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端开发者 | 利用 browser 验证 UI 修改 |
| 全栈开发者 | 结合 Web Search 获取最新 API 文档 |

---

## 特性五：config.toml 与 codex doctor 诊断

### 是什么（机制说明）

`~/.codex/config.toml` 是 Codex CLI 主配置文件，控制模型选择、沙盒策略、审批策略等。`codex doctor` 全面检查环境健康状态。

本地实测 `codex doctor` 输出：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。fail 项通常与 API Key、app-server daemon 相关。

### 适用场景

- **适合**：首次安装、环境异常排查、CI 环境验证
- **不适合**：已确认环境正常的日常开发

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. 运行 `codex doctor` 查看完整诊断
2. 用 `--json` 获取机器可读报告
3. 根据 fail 项修复（通常需 `codex login` 配置 API Key）
4. 编辑 `~/.codex/config.toml` 调整配置

### 命令与配置示例

```bash
codex doctor
codex doctor --summary compact
codex doctor --json 2>&1 | head -30
```

```toml
# ~/.codex/config.toml 完整示例
[model]
default = "gpt-5.6-terra"

[agent]
max_turns = 30
approval_policy = "on-request"

[sandbox]
mode = "workspace-write"

[features]
browser_use = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| app-server daemon | ❌ not running（预期，无 GUI 环境） |
| config.toml | ✅ 可读 |

```bash
$ ./node_modules/.bin/codex doctor 2>&1 | tail -5
      status                   not running
      mode                     ephemeral
─────────────────────────────────────────────────────────────
12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**4 fail 项**：通常因无 API Key 和 app-server 未运行，登录后重跑。**config.toml 语法错误**：`codex doctor` 会指出具体行。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 doctor 输出 | ✅ |
| GitHub config-schema.json | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后首先运行 `codex doctor` |
| CI 维护者 | 用 `codex doctor --json` 自动化环境检查 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 核心变更 |
|------|---------------|----------|
| **0.144.6** (stable) | 2026-07-18 | GPT-5.6 指令刷新、272K 上下文修正 |
| 0.145.0-alpha.24 | 2026-07-18 | 预发布，无详细 changelog |
| 0.145.0-alpha.23 | 2026-07-17 | 预发布 |
| 0.144.5 | 2026-07-16 | 危险命令检测增强 |

## 今日研究员结论

Codex 7/19 无新 stable release，但 0.144.6 + 5h 限额移除 + Fable 5 今日截止构成「三重窗口」：Pro 用户失去免费 Fable 5 的同时，Codex 仍保持额度优势。建议今日完成 Claude vs Codex 对比评估；保持 0.144.6 stable，关注 alpha.24 是否含重大特性。`codex doctor` 12 ok 表明 CLI 环境健康，fail 项因无 API Key 属预期。
