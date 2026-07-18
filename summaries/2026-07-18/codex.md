# OpenAI Codex 每日技术文档 — 2026-07-18

> 本地实测版本：**0.144.6**（stable，今日发布）｜监测 alpha：**0.145.0-alpha.23**（7/17 22:39 UTC）  
> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 18 日 Codex CLI 实测与发布节奏：

- **稳定版 0.144.6** 于 **13:51 UTC** 发布，npm `@latest` 已跟随；核心变更为 GPT-5.6 Sol/Terra/Luna 内置指令刷新与上下文窗口修正为 **272K tokens**
- **预发布 0.145.0-alpha.23** 于 7/17 22:39 UTC 发布，npm 未跟随
- **5 小时滚动限额临时移除**（7/12 Tibo 公告）仍生效，周限额有效；Codex 周活突破 900 万（7/16）
- **本地 CLI 诊断**：`doctor` 12 ok · 1 warn · 4 fail；`features list` 显示 `browser_use` stable、`code_mode` under development；推理能力 ⚠️ 未实测（无 API Key）

---

## 特性一：稳定版 0.144.6 GPT-5.6 模型元数据刷新（今日发布）

### 是什么（机制说明）

[0.144.6 release](https://github.com/openai/codex/releases/tag/rust-v0.144.6)（7/18 13:51 UTC）为 hotfix 级别更新：

> Refreshed bundled instructions for GPT-5.6 Sol, Terra, and Luna, and corrected their context windows to 272,000 tokens. (#33972, #34009)

刷新 GPT-5.6 三档模型（Sol/Terra/Luna）的内置指令（bundled instructions），并修正上下文窗口标注为 **272,000 tokens**。此前可能存在标注不一致导致 prompt 规划偏差。

### 适用场景

- **适合**：使用 GPT-5.6 系列模型的所有 Codex 用户
- **不适合**：仍使用 GPT-5.5 或更早模型的用户（需手动切换 model）

### 前置条件

Node.js 18+ 或 GitHub release 二进制；Codex CLI ≥ 0.144.6

### 详细使用步骤（业务用户）

1. 升级：`npm install -g @openai/codex@latest`
2. 确认版本：`codex --version` 应显示 `codex-cli 0.144.6`
3. 运行 `codex doctor` 检查环境
4. 以 272K 上下文重新评估长任务 prompt 预算

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
| `codex features list` | ✅ browser_use stable, code_mode under development |
| GPT-5.6 指令刷新 | ⚠️ 未实测推理（无 API Key） |

### 问题与解决方案

**版本仍为 0.144.5**：`npm cache clean --force && npm install -g @openai/codex@latest`。**上下文规划偏差**：以 272K 为准重新计算 token 预算。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.6 | ✅ 7/18 13:51 UTC |
| npm @latest | ✅ 0.144.6 |
| PR #33972、#34009 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有 Codex 用户 | 立即升级至 0.144.6 |
| 长上下文用户 | 以 272K 重新规划 prompt |

---

## 特性二：GPT-5.6 Sol/Terra/Luna 三档模型体系（持续）

### 是什么（机制说明）

GPT-5.6 系列三档模型在 Codex 中的定位（0.144.6 刷新后）：

| 模型 | 定位 | 上下文 |
|------|------|--------|
| **Sol** | 旗舰，编程/网安/科学 SOTA | 272K |
| **Terra** | 均衡型，日常工作 | 272K |
| **Luna** | 快速且实惠 | 272K |

ChatGPT 桌面端拆分为 Chat / Work / Codex 三种模式，Codex 模式专注软件开发。ChatGPT Work 由 Codex + GPT-5.6 驱动，面向研究成果型任务。

### 适用场景

- **Sol**：复杂编程、安全审计、长周期 Agent 任务
- **Terra**：日常代码审查、文档生成、中等复杂度任务
- **Luna**：快速补全、简单重构、成本敏感场景

### 前置条件

ChatGPT Plus/Pro/Business/Enterprise；Codex CLI 已登录

### 详细使用步骤（业务用户）

1. 在 Codex CLI 中通过 `/model` 或 `config.toml` 选择模型
2. Plus 用户默认 Terra；Pro 用户可选 Sol/Terra/Luna
3. 在 ChatGPT 桌面端切换 Codex 模式专注开发任务

### 命令与配置示例

```bash
# Codex CLI 中切换模型
/model gpt-5.6-sol
/model gpt-5.6-terra
/model gpt-5.6-luna
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5.6-sol"

[model.gpt-5.6-sol]
reasoning_effort = "high"
```

```bash
# codex exec 指定模型
codex exec --model gpt-5.6-sol "Refactor the auth module with full test coverage"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 模型配置 | ✅ config.toml 文档确认 |
| 实际推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**模型不可用**：确认订阅等级（Sol 需 Plus+）。**Token 消耗过高**：尝试 Luna 或降低 reasoning_effort。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| OpenAI GPT-5.6 发布公告 | ✅ |
| 0.144.6 bundled instructions | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 专业开发者 | Sol 用于复杂任务，Luna 用于日常 |
| 成本敏感用户 | 默认 Terra，按需切换 Luna |

---

## 特性三：`codex exec` 与 `/goal` 目标循环（持续能力）

### 是什么（机制说明）

`codex exec` 为非交互模式执行 Agent 任务，适合 CI/CD 和自动化。`/goal` 启动目标循环：每次 Codex 想停止时，评估器模型对照用户标准判断是否达标，未达标则继续执行直到目标达成或轮数耗尽。

配合 0.144.5 引入的危险命令检测（`is_dangerous_command` 扩展），`codex exec` 在自动化环境中更安全。

### 适用场景

- **适合**：CI/CD pipeline、定时任务、长周期自动化修复
- **不适合**：需要频繁人工介入的探索性任务

### 前置条件

Codex CLI ≥ 0.144.5；API Key 或 ChatGPT 登录

### 详细使用步骤（业务用户）

1. 编写任务描述（自然语言或结构化）
2. `codex exec "task description"` 或在交互模式用 `/goal`
3. 观察输出和退出码
4. 在 CI 中集成 `codex exec` 并检查 exit code

### 命令与配置示例

```bash
# 非交互执行
codex exec "Fix all TypeScript errors in src/ and run tests"

# 目标循环（交互模式）
/goal All unit tests pass and coverage > 80%

# CI 集成
codex exec --model gpt-5.6-terra "Run linter and fix all warnings" && echo "OK" || echo "FAIL"
```

```toml
# ~/.codex/config.toml
[sandbox]
mode = "workspace-write"

[approval]
mode = "on-failure"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 命令可用 |
| 危险命令检测 | ⚠️ 未实测（无 API Key） |
| `/goal` 循环 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**命令被危险检测拦截**：阅读拒绝原因，拆分命令或加人工确认（0.144.5+）。**exec 超时**：增加 timeout 或拆分任务。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.144.5 危险命令检测 | ✅ |
| Codex docs exec | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | 在 staging CI 中试点 `codex exec` |
| 开发者 | 用 `/goal` 做有明确验收标准的任务 |

---

## 特性四：Browser Developer Mode 与 Web Search（持续能力）

### 是什么（机制说明）

`codex features list` 显示以下功能状态（0.144.6 实测）：

| Feature | 状态 |
|---------|------|
| `browser_use` | stable |
| `browser_use_external` | stable |
| `browser_use_full_cdp_access` | stable |
| `code_mode` | under development |
| `code_mode_host` | stable |
| `auth_elicitation` | stable |

Browser Developer mode 允许 Codex 通过 CDP 控制浏览器进行 Web 测试和调试。Web Search 支持在 Agent 任务中检索外部信息。

### 适用场景

- **适合**：Web 应用测试、E2E 验证、需要外部文档检索的开发任务
- **不适合**：纯后端/CLI 项目（无需浏览器）

### 前置条件

Codex CLI ≥ 0.144.0；Browser Developer mode 需在设置中启用

### 详细使用步骤（业务用户）

1. 在 Codex 设置中启用 Browser Developer mode
2. 描述需要浏览器交互的任务
3. Codex 自动启动浏览器并通过 CDP 操作
4. 查看截图和日志验证结果

### 命令与配置示例

```bash
codex features list 2>&1 | grep browser
# browser_use                          stable             true
# browser_use_external                 stable             true
# browser_use_full_cdp_access          stable             true
```

```toml
# ~/.codex/config.toml
[browser]
enabled = true
headless = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` | ✅ browser_use stable |
| 实际浏览器操作 | ⚠️ 未实测（无 API Key + 无 GUI） |

### 问题与解决方案

**Browser 未启动**：确认 `browser.enabled = true` 且系统有 Chrome/Chromium。**CDP 连接失败**：检查防火墙和端口占用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list 实测 | ✅ |
| Codex docs browser | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 前端开发者 | 利用 browser_use 做 E2E 验证 |
| 后端开发者 | 无需启用，专注 code_mode |

---

## 特性五：`codex doctor` 环境诊断与 5h 限额松绑（持续）

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境、配置、网络、认证等状态。0.144.6 实测输出：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。

自 7/12 起，OpenAI 临时移除 Codex **5 小时滚动限额**（Tibo 公告），周限额仍有效。Codex 周活从 600 万突破 900 万（7/16），显示用户增长强劲。

### 适用场景

- **适合**：新安装后环境验证、故障排查、评估是否适合重度使用
- **不适合**：无（所有用户都应定期运行 doctor）

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex doctor` 查看完整诊断
2. `codex doctor --summary` 查看紧凑输出
3. 根据 warn/fail 项修复环境
4. 关注周限额使用情况（5h 限额已临时移除）

### 命令与配置示例

```bash
codex doctor
codex doctor --summary
codex doctor --json 2>&1 | head -20

# 查看功能列表
codex features list 2>&1 | head -15
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `codex features list` | ✅ 正常输出 |
| 5h 限额 | ✅ 官方确认临时移除（7/12 起） |

### 问题与解决方案

**4 fail 项**：通常为 API Key 未配置或网络问题，不影响 `--version`/`--help`。**周限额耗尽**：等待下周重置或升级订阅。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 doctor 实测 | ✅ |
| Tibo 7/16 公告 | ✅ 900 万用户 |
| 量子位 7/17 报道 | ✅ 5h 限额移除 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后先跑 `codex doctor` |
| 重度用户 | 利用 5h 限额松绑窗口充分体验，但注意周限额 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 核心变更 |
|------|----------------|----------|
| **0.144.6** | 2026-07-18 13:51 | GPT-5.6 指令刷新、272K 上下文修正 |
| 0.145.0-alpha.23 | 2026-07-17 22:39 | 预发布，npm 未跟随 |
| 0.144.5 | 2026-07-16 02:54 | 危险命令检测强化 |
| 0.145.0-alpha.22 | 2026-07-17 17:29 | 预发布 |

## 今日研究员结论

0.144.6 是今日必升版本，主要修正 GPT-5.6 模型元数据。5h 限额松绑窗口仍在，但周限额有效——重度用户应规划使用节奏。alpha.23 显示 0.145 stable 临近，建议关注下周发布。与 Claude Fable 5 明日截止形成直接竞争，Codex 900 万用户里程碑显示 OpenAI 在 Agent 编程市场的强势地位。

---
