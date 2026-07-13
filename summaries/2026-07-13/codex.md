# OpenAI Codex 每日技术文档 — 2026-07-13

> 本地实测版本：**0.144.3**（stable）｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)、[npm @openai/codex](https://www.npmjs.com/package/@openai/codex)

## 今日综述

2026 年 7 月 13 日 npm `@openai/codex@latest` 实测已从 **0.144.1 升至 0.144.3**——同日连发两个 stable 补丁。**0.144.2**（04:39 UTC）回滚 Guardian auto-review 提示词回归；**0.144.3**（06:12 UTC）为无代码变更的 version-only release。预发布 **0.145.0-alpha.7**（10:49 UTC）尚未晋升 stable。

行业侧进入 **Fable 5 credits 计费首日** + **GPT-5.6 全量上线消化期第 4 日**。CLI 侧连发补丁表明 OpenAI 在 stable 通道保持高频维护，与 ChatGPT 桌面三入口大更新形成双轨节奏。`doctor` 12 ok · 1 warn · 4 fail；`browser_use`、`auth_elicitation`、`code_mode_host` 均为 stable。

---

## 特性一：0.144.2 Guardian auto-review 回滚（7/13 04:39 UTC）

### 是什么（机制说明）

[GitHub Release 0.144.2](https://github.com/openai/codex/releases/tag/rust-v0.144.2) 唯一功能性变更：

> Restored the previous Guardian auto-review policy, request format, and tool behavior after rolling back a prompting regression. ([#32672](https://github.com/openai/codex/pull/32672))

0.144.0 引入的 auto-review 提示词更新（[#31480](https://github.com/openai/codex/pull/31480)）在部分场景导致审查行为异常——过度审查或漏检。0.144.2 完整回滚至先前策略。

### 适用场景

- **适合**：使用 `/review` 或 Guardian auto-review 的开发者；0.144.0–0.144.1 用户
- **不适合**：从未启用 auto-review 的用户（影响有限）

### 前置条件

Codex CLI ≥ 0.144.2；Git 仓库（review 功能）。

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@latest` 升级至 0.144.3（含 0.144.2 修复）
2. `codex --version` 确认 `codex-cli 0.144.3`
3. 在仓库中触发 `/review` 验证审查行为恢复
4. 对比 0.144.0 与 0.144.3 的 review 输出差异
5. CI 流水线锁定 `0.144.3` 避免回退

### 命令与配置示例

```bash
npm install @openai/codex@latest
codex --version
# codex-cli 0.144.3

# 在 Codex 交互会话中
/review
```

```toml
# ~/.codex/config.toml — review 相关（概念示例）
[review]
auto_review = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `@latest` → 0.144.3 | ✅ 含 0.144.2 修复 |
| `/review` 行为 | ⚠️ 未实测（无 API Key + 需交互） |
| GitHub #32672 | ✅ 官方 release 确认 |

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.144.3
```

### 问题与解决方案

**review 仍异常**：确认版本 ≥ 0.144.2；`codex doctor --all` 检查。**误装 0.144.0**：立即升级 `@latest`。**CI 锁定旧版**：更新 `package.json` 至 `^0.144.3`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.2 release | ✅ 回滚确认 |
| npm @latest 0.144.3 | ✅ |
| 社区讨论 | ⚠️ 尚无 OpenAI 博客二次解读 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| review 重度用户 | 立即升级 0.144.3 |
| CI 维护者 | 锁定 0.144.3 |
| 未用 review 用户 | 常规升级即可 |

---

## 特性二：0.144.3 version-only release + alpha.7 预发布观察

### 是什么（机制说明）

- **0.144.3**（7/13 06:12 UTC）：自 0.144.2 以来无合并 PR 变更的纯版本发布（version-only release with no merged pull request changes）
- **0.145.0-alpha.7**（7/13 10:49 UTC）：预发布通道最新版，GitHub Actions 自动发布，尚未晋升 `@latest`

npm 通道：`@latest` → 0.144.3；`@0.145.0-alpha.7` → 尝鲜。

### 适用场景

- **适合**：生产环境用 stable 0.144.3；尝鲜用户跟踪 alpha
- **不适合**：生产 CI 使用 alpha

### 前置条件

Node.js 18+；npm registry 访问。

### 详细使用步骤（业务用户）

1. 生产：`npm install @openai/codex@latest` → 0.144.3
2. 尝鲜：`npm install @openai/codex@0.145.0-alpha.7`
3. `codex doctor` 验证环境
4. 关注 GitHub releases 页面 alpha → stable 晋升

### 命令与配置示例

```bash
npm install @openai/codex@latest
codex --version    # 0.144.3

# 尝鲜 alpha（非生产）
npm install @openai/codex@0.145.0-alpha.7
codex --version    # 0.145.0-alpha.7
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `@latest` → 0.144.3 | ✅ 较昨日 0.144.1 升级 |
| alpha.7 存在 | ✅ GitHub 7/13 10:49Z |
| alpha 功能差异 | ⚠️ 未安装 alpha 对比 |

### 问题与解决方案

**误装 alpha**：生产环境锁定 `@latest` 或 `package.json` 版本号。**alpha 崩溃**：回退 0.144.3。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub releases | ✅ 0.144.3 + alpha.7 |
| npm @latest | ✅ 0.144.3 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 升级 0.144.3 |
| 尝鲜用户 | 跟踪 alpha.7，勿用于 CI |
| DayAI 维护者 | tools/package.json 锁定 ^0.144.3 |

---

## 特性三：`codex doctor` 环境诊断与 `features list`

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境：认证、app-server、sandbox、配置等。本环境输出：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**（app-server not running 为 idle 正常态）。

`codex features list` 列出特性成熟度：`stable` / `under development` / `removed` / `deprecated`。

### 适用场景

- **适合**：首次安装、升级后验证、排障
- **不适合**：已验证环境无需每次运行

### 前置条件

Codex CLI 已安装。

### 详细使用步骤（业务用户）

1. `codex doctor` 查看摘要
2. `codex doctor --all` 展开截断列表
3. `codex doctor --json` 获取结构化报告（敏感信息已脱敏）
4. `codex features list` 确认所需特性是否 stable

### 命令与配置示例

```bash
codex doctor 2>&1 | tail -10
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

codex features list 2>&1 | head -15
# apply_patch_freeform    removed            false
# apps                    stable             true
# auth_elicitation        stable             true
# browser_use             stable             true
# code_mode_host          stable             true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `features list` | ✅ 正常输出 |
| app-server | ⚠️ not running（idle 正常） |

### 问题与解决方案

**4 fail**：通常因无 API Key 或 app-server 未启动；`--all` 查看详情。**warn**：检查认证状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本环境实测 0.144.3 | ✅ 与 0.144.1 结果结构一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后首跑 `doctor` |
| CI 用户 | `doctor --json` 集成健康检查 |
| 排障 | `doctor --all` 展开详情 |

---

## 特性四：Codex 并入 ChatGPT 桌面端 + GPT-5.6 消化期（7/9–10）

### 是什么（机制说明）

[2026-07-09 Changelog](https://developers.openai.com/codex/changelog) 宣布 **Codex joins the ChatGPT desktop app**（macOS/Windows）。7/10 OpenAI 全量发布 **GPT-5.6**（Sol / Terra / Luna），产品矩阵拆为三入口：

- **Chat**：对话、搜索、头脑风暴
- **Codex**：编码（仓库、PR、diff、review、多仓库）
- **ChatGPT Work**：通用办公（接任务、读上下文、调用工具、分步执行、交付结果）

7/13 进入消化期第 4 日；CLI 连发 0.144.2/0.144.3 与桌面端大更新形成双轨。

### 适用场景

- **适合**：ChatGPT 桌面端开发者、GPT-5.6 Sol 专业工作流用户
- **不适合**：仅需 headless CLI 的 CI（继续用 0.144.3）

### 前置条件

ChatGPT 桌面应用 7/9 后版本；或 Codex CLI ≥ 0.144.3；OpenAI 账户认证。

### 详细使用步骤（业务用户）

1. 更新 ChatGPT 桌面应用至最新版
2. **Settings** → 将 Codex 设为默认视图（可选，macOS 可保留原图标）
3. 探索 **ChatGPT Work** 处理非编码办公任务
4. 侧边栏打开 PR 审查 diff 与 reviewer 反馈
5. CLI 用户：`npm install @openai/codex@latest` 保持 0.144.3

### 命令与配置示例

```bash
codex --version
# codex-cli 0.144.3

codex features list 2>&1 | grep -E "computer_use|code_mode_host|browser"
# browser_use             stable             true
# code_mode_host          stable             true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| CLI 0.144.3 | ✅ `@latest` 已升级 |
| ChatGPT 桌面端 / Work | ⚠️ 未实测（Linux Cloud VM 无 GUI） |
| GPT-5.6 模型调用 | ⚠️ 未实测（无完整 API Key） |

### 问题与解决方案

**桌面端找不到 Codex**：确认 7/9 后版本并登录。**Work 与 Codex 混淆**：Work 面向办公，Codex 保留编码入口。**Fable 5 截止后模型选择**：评估 GPT-5.6 Sol 作为 Codex 默认。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Developers Changelog 7/9 | ✅ |
| 36氪 / 虎嗅 7/10 | ✅ 三入口架构 |
| 「Codex 被 Work 取代」 | ⚠️ 媒体简化表述 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 桌面用户 | 升级应用，评估 Work vs Codex 分工 |
| CLI 重度用户 | 升级 0.144.3，关注 alpha 晋升 |
| Fable 5 credits 用户 | 评估 GPT-5.6 Sol A/B |

---

## 特性五：`codex exec`、`/goal`、Code Mode 与 `config.toml`

### 是什么（机制说明）

- **`codex exec`**：非交互执行 Agent 任务，适合 CI/Automation
- **`/goal`**（goals feature）：目标导向长程任务
- **Code Mode**：`code_mode_host` stable；`code_mode` under development
- **`config.toml`**：主配置文件位于 `~/.codex/config.toml`
- **`writes` approval mode**（0.144.0+）：只读自动、写入需确认

CircleCI Chunk Sidecars（7/13）代表行业趋势——在 `codex exec` 前嵌入 test/lint 校验。

### 适用场景

- **适合**：CI 自动化、长程目标导向任务、pre-push 校验
- **不适合**：简单一次性问答

### 前置条件

Codex ≥ 0.144.3；有效认证。

### 详细使用步骤（业务用户）

1. 编辑 `~/.codex/config.toml` 配置 approval 与模型
2. `codex exec "run tests and fix failures"` 非交互执行
3. 交互会话中使用 `/goal` 设定长程目标
4. 在 Agent 内循环嵌入 `npm test && npm run lint`（Sidecars 思路）
5. `codex features list | grep code_mode` 确认状态

### 命令与配置示例

```bash
codex exec --help
codex exec "fix all TypeScript errors in src/"
```

```toml
# ~/.codex/config.toml
[approvals]
mode = "writes"

[model]
default = "gpt-5.6-sol"
```

```bash
codex features list 2>&1 | grep code_mode
# code_mode          under development  false
# code_mode_host     stable             true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 命令存在 |
| code_mode_host stable | ✅ |
| exec 实际执行 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**exec 认证失败**：`codex doctor` 检查认证。**code_mode 不可用**：`code_mode` 仍 under development，用 code_mode_host。**长程任务中断**：尝试 `/goal` 模式。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| features list | ✅ |
| InfoQ CircleCI Sidecars | ✅ pre-push 校验趋势 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI/Automation | `codex exec` + pre-push lint/test |
| Agent 开发者 | 关注 code_mode → stable |
| 保守用户 | 仅用 stable features |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 通道 | 要点 |
|------|-------------|------|------|
| 0.144.3 | 7/13 06:12 | stable @latest | version-only release |
| 0.144.2 | 7/13 04:39 | stable | Guardian auto-review 回滚 |
| 0.145.0-alpha.7 | 7/13 10:49 | pre-release | 预发布观察 |
| 0.144.1 | 7/09 23:02 | stable（已 superseded） | installer、code-mode 修复 |
| 0.144.0 | 7/09 16:47 | stable | writes approval、MCP auth elicitation |

## 今日研究员结论

Codex **今日最大变更**是 stable 通道 **0.144.1 → 0.144.3** 连发两补丁，核心修复为 **Guardian auto-review 回滚**。生产用户应立即 `npm install @openai/codex@latest`。预发布 **0.145.0-alpha.7** 节奏加快，预计 7/20 前可能晋升 stable。Fable 5 credits 计费首日使 GPT-5.6 Sol 成为 Codex 默认模型候选——建议小规模 A/B 对比账单与质量。⚠️ 无 API Key，exec/review/模型调用未实测。
