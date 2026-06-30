# OpenAI Codex 每日技术文档 — 2026-06-30

> 本地实测版本：**0.142.4**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 30 日 npm `@openai/codex@latest` 实测稳定版仍为 **0.142.4**（与昨日一致，6/29 05:04Z maintenance release）。预发布线更新至 **0.143.0-alpha.31**（**2026-06-29T23:21:34Z**，较 alpha.29 **+2**）。行业侧：ALE 基准报道中 **GPT-5.5 + Codex** 组合领先；OpenAI **GPT-5.6 预览**（6/27）余波持续。本地 `codex doctor`：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**；`features list` 显示 `browser_use` stable、`code_mode` under development。

---

## 特性一：Codex CLI 0.142.4 — 稳定版维持（maintenance-only）

### 是什么（机制说明）

**0.142.4**（`rust-v0.142.4`）于 2026-06-29T05:04:25Z 发布，GitHub Release body 标注 **「No user-facing changes were identified for this release」**——依赖与安全补丁，用户体验与 0.142.3 一致。npm `@latest` 在 6/30 检索仍为 0.142.4。

### 适用场景

- **适合**：生产环境、CI pin `@latest`、零风险日常升级
- **不适合**：追逐 alpha 新特性（应跟踪 0.143.0-alpha.x）

### 前置条件

- Node.js 18+
- `npm install @openai/codex@latest`

### 详细使用步骤（业务用户）

1. `cd tools && npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.142.4`
3. `codex doctor` 检查 auth/sandbox
4. `codex login` 若 auth fail
5. `codex exec "your task"` 执行任务

### 命令与配置示例

```bash
npm install @openai/codex@0.142.4
codex --version
codex doctor
codex exec "Run npm test and summarize failures"
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5-codex"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `codex-cli 0.142.4` |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| vs 昨日 | ✅ 无变化 |

```bash
./node_modules/.bin/codex --version
# codex-cli 0.142.4
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**doctor 4 fail**：通常 auth 或 app-server 未运行 — `codex login`。**双版本冲突**：`npm ls @openai/codex` 检查全局/本地。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub rust-v0.142.4 | ✅ maintenance-only |
| npm @latest 6/30 | ✅ 0.142.4 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 保持 0.142.4，无需日更 |
| CI | pin 0.142.4 或 `@latest` 均可 |
| 早期采用者 | 转 alpha.31 隔离测试 |

---

## 特性二：0.143.0-alpha.31 — 预发布线最新（2026-06-29 23:21Z）

### 是什么（机制说明）

**alpha.31**（`rust-v0.143.0-alpha.31`，commit `8f86689`）于 **2026-06-29T23:21:34Z** 发布，body 仅「Release 0.143.0-alpha.31」——无详细 changelog。较 **alpha.29**（6/28 00:30Z）推进两个 alpha 版本，推测含 `code_mode`、`artifact`、`chronicle` 等 under development 特性进展。**勿与 stable 混装**。

### 适用场景

- **适合**：隔离环境跟踪下一 stable 功能
- **不适合**：生产、本仓库 `tools/` 主环境

### 前置条件

- 独立目录或容器
- `npm install @openai/codex@alpha` 或指定 `0.143.0-alpha.31`

### 详细使用步骤（业务用户）

1. 创建测试目录 `mkdir /tmp/codex-alpha && cd /tmp/codex-alpha`
2. `npm init -y && npm install @openai/codex@alpha`
3. `npx codex --version` 确认 alpha.31
4. `npx codex features list` 对比 stable baseline
5. 记录差异后退出，勿污染 `tools/node_modules`

### 命令与配置示例

```bash
npm install @openai/codex@0.143.0-alpha.31
codex --version
codex features list 2>&1 | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| stable `tools/` | ✅ 保持 0.142.4（未装 alpha） |
| GitHub alpha.31 发布时间 | ✅ 2026-06-29T23:21:34Z |
| alpha 功能实测 | ⚠️ 未安装 alpha（避免污染 stable） |

### 问题与解决方案

**误装 alpha 到生产**：`npm install @openai/codex@latest` 回退 stable。**features 无变化**：alpha body 无细节，以 `features list` diff 为准。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Pre-release | ✅ alpha.31 存在 |
| npm @latest | ✅ 未晋升 stable（符合预期） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 平台工程师 | 每周 diff alpha features list |
| 普通用户 | 忽略 alpha 直至 stable 发布公告 |
| 安全团队 | alpha 不进生产镜像 |

---

## 特性三：`codex exec` — 非交互 Agent 执行（stable）

### 是什么（机制说明）

`codex exec` 在终端以 **非交互** 模式运行 Codex Agent，适合脚本、CI 与 automation。支持传入自然语言任务，Agent 自主调用工具完成。与 Claude Code `-p/--print` 类似，是 headless 集成首选。

### 适用场景

- **适合**：CI 修测试、批量 refactor、cron 任务
- **不适合**：需多轮人工微调的探索性开发（用交互 `codex`）

### 前置条件

- Codex CLI 0.142.4+；已 `codex login`
- 工作目录为 git 仓库（推荐）

### 详细使用步骤（业务用户）

1. `cd your-repo`
2. `codex login`（首次）
3. `codex exec "Run lint and fix auto-fixable issues"`
4. 检查 git diff 与测试
5. CI 中：`codex exec --full-auto`（若策略允许，注意权限）

### 命令与配置示例

```bash
codex exec "Add unit tests for utils/date.ts"
```

```bash
codex exec "Fix the failing GitHub Actions workflow" 2>&1 | tee codex.log
```

```toml
# ~/.codex/config.toml
[sandbox]
mode = "workspace-write"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `exec` 帮助 | ✅ 命令存在 |
| 实际任务执行 | ⚠️ 未实测（无 API Key，doctor auth fail） |

### 问题与解决方案

**auth fail**：`export OPENAI_API_KEY=...` 或 `codex login`。**sandbox 拒绝写**：调整 `config.toml` sandbox mode（注意安全）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI Docs | ✅ exec 文档齐全 |
| ALE 报道 GPT-5.5+Ccodex | ✅ 框架组合被第三方评测使用 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | 失败 Actions 触发 `codex exec` 修复 |
| 开发者 | 本地先试再进 CI |
| 安全 | 限制 exec 在沙箱内 |

---

## 特性四：`codex doctor` + `features list` — 环境诊断（stable）

### 是什么（机制说明）

`codex doctor` 输出安装、auth、sandbox、app-server 等组件健康检查；`codex features list` 列出 feature flag 及 stable/under development/removed 状态。本日实测：`browser_use` **stable**；`code_mode` **under development false**（未启用）。

### 适用场景

- **适合**：首次安装、升级后验证、排查 CI 失败
- **不适合**：替代功能文档（仅状态快照）

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. `codex doctor` — 查看 summary 行
2. `codex doctor --all` 展开详情（若支持）
3. `codex features list` — 确认目标特性是否 stable
4. 对 fail 项逐项修复（常见：login、app-server）

### 命令与配置示例

```bash
codex doctor 2>&1 | tail -10
codex features list 2>&1 | head -15
codex doctor --json 2>/dev/null | head -5
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor summary | ✅ `12 ok · 1 idle · 5 notes · 1 warn · 4 fail` |
| features 采样 | ✅ `browser_use stable`；`code_mode under development false` |
| 与昨日 | ✅ 一致 |

```bash
./node_modules/.bin/codex features list 2>&1 | head -15
# apply_patch_freeform                 removed            false
# browser_use                          stable             true
# code_mode                            under development  false
```

### 问题与解决方案

**app-server not running**：ephemeral mode 下可能正常；需 persistent 时查文档启动 daemon。**4 fail**：优先修 auth。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本环境多日实测 | ✅ doctor 模式稳定 |
| OpenAI Changelog 0.142.2 | ✅ MCP tool search 等已在更早 stable |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后第一件事 `doctor` |
| CI | `codex doctor --json` 门禁 |
| 功能规划 | 用 `features list` 判断是否等 stable |

---

## 特性五：ALE 基准与 GPT-5.5/5.6 — Codex 框架外部评测语境

### 是什么（机制说明）

虽非 Codex 6/30 代码发布，但是当日行业透镜：**Agents Last Exam（ALE）** 报道显示 **GPT-5.5 + OpenAI Codex 框架** 通过率约 **24%** 居榜首（量子位 6/27–29）。**GPT-5.6 预览**（6/27 媒体泄露）或影响未来 Codex 默认模型。Codex 作为 **Agent 执行框架** 与模型解耦，评测组合强调「模型 + Harness」整体。

### 适用场景

- **适合**：评估是否将 Codex 纳入长程跨行业 Agent 栈
- **不适合**：仅用 SWE-bench 判断 Codex 适用性

### 前置条件

- 了解 ALE 与 SWE-bench 评测维度差异
- [ALE Leaderboard](https://agents-last-exam.org/leaderboard)

### 详细使用步骤（业务用户）

1. 阅读 ALE 方法论（GCUA、真实专家任务）
2. 对比自身任务更接近 ALE-CLI 还是 SWE-bench
3. 若接近 ALE：对 Codex 做 **端到端试点** 而非只看榜单
4. 关注 OpenAI 是否将 GPT-5.6 设为 Codex 新 default

### 命令与配置示例

```bash
# 未来模型切换（示意，以官方为准）
# ~/.codex/config.toml
[model]
default = "gpt-5.6-codex"  # ⚠️ 预览名，未官方确认
```

```bash
codex exec "Complete a multi-step data pipeline task with browser and shell"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| ALE 榜单 | ✅ 第三方公开（量子位引用一致） |
| GPT-5.6 默认模型 | ⚠️ 推测，未官方确认 |
| Codex 长程任务 | ⚠️ 未实测 |

### 问题与解决方案

**榜单与体验落差**：ALE 最难档平均 2.6% — 预期管理。**模型名无效**：以 `codex features list` 与 release notes 为准。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| agents-last-exam.org | ✅ 官方基准 |
| 量子位 ALE 稿 | ✅ 排名数据一致 |
| GPT-5.6 泄露 | ⚠️ 媒体报道，非 OpenAI 正式稿 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 架构师 | 分层看「模型 vs Codex Harness」 |
| 评测爱好者 | ALE + SWE-bench 双维参考 |
| 采购 | 等 GPT-5.6 stable 再改 config default |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| **0.142.4** | 2026-06-29 | stable maintenance-only（**6/30 仍为 @latest**） |
| **0.143.0-alpha.31** | 2026-06-29 23:21Z | 最新 pre-release |
| 0.143.0-alpha.29 | 2026-06-28 | 前序 alpha |
| 0.142.2 | 2026-06-25 | MCP tool search default 等 user-facing |

## 今日研究员结论

Codex **6/30 无新 stable 发布**；生产继续 **0.142.4**。alpha.31 供早期测试跟踪。与 Anthropic Sonnet 5 同日对比：OpenAI 侧今日无对等模型发布，但 ALE 叙事中 Codex 框架仍居评测前列。本地已验证 CLI 与 doctor/features；推理需 API Key。建议 stable 用户 **无需日更**，关注 alpha → stable 晋升时机与 GPT-5.6 官方公告。
