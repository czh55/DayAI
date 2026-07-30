# OpenAI Codex 每日技术文档 — 2026-07-30

> 本地实测版本：**0.146.0** stable（npm `@latest` 维持）｜监测 alpha：**0.147.0-alpha.2**（7/30 01:04 UTC，release body 为空）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Learn Changelog](https://learn.chatgpt.com/docs/changelog)、[npm @openai/codex](https://www.npmjs.com/package/@openai/codex)、[OpenAI GPT-5.6 博客](https://openai.com/index/gpt-5-6/)

## 今日综述

2026 年 7 月 30 日 Codex **稳定版 npm `@latest` 仍为 0.146.0**（7/29 01:42 UTC stable 落地，维持第 2 日）。GitHub 于 **01:04 UTC** 发布 **0.147.0-alpha.2**（tag `rust-v0.147.0-alpha.2`），为 0.147 开发周期第二版 pre-release，**release body 为空**，无附 changelog。

**行业主事件**：OpenAI 公布 **GPT-5.6 Sol** 通过 **Codex** 接入生产推理栈，自主重写 Triton/Gluon GPU 内核、优化负载均衡与 KV 缓存，对外服务成本降 **20%**、token 生成效率升 **15%+**（推测解码改进）。标志 AI 编程从「写业务代码」延伸至「写基础设施代码」。

本地 CLI 实测：`codex --version` → `codex-cli 0.146.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host` 为 stable，`code_mode` 仍为 under development。生产环境继续锁定 0.146.0；alpha.2 仅隔离跟踪。因无 API Key 未进行推理级功能实测。

---

## 特性一：0.147.0-alpha.2 发布——0.147 周期第二版 pre-release

### 是什么（机制说明）

7/30 01:04 UTC，OpenAI Codex GitHub 发布 **0.147.0-alpha.2**（tag `rust-v0.147.0-alpha.2`）。Release **body 为空**，无附详细 changelog，延续 alpha 快速迭代节奏。npm `@openai/codex@latest` **未跟随**，仍为 **0.146.0** stable。

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| **0.147.0-alpha.2** | **2026-07-30 01:04** | **Pre-release（最新 alpha）** |
| 0.147.0-alpha.1 | 2026-07-29 09:13 | Pre-release |
| **0.146.0** | 2026-07-29 01:42 | **Stable（npm `@latest`）** |
| 0.145.0 | 2026-07-21 | Stable（已被 superseded） |

0.147 周期于 7/29 alpha.1 开启，alpha.2 为第二版；具体 commit 差异需从 GitHub compare 或本地 git log 推断，官方未在 release body 汇总。

### 适用场景

- **适合**：早期采用者隔离跟踪下一周期变更、评估是否与 GPT-5.6 推理效率相关的新 CLI 能力
- **不适合**：生产环境、CI lockfile 直接依赖 pre-release、未读 commit diff 的盲目升级

### 前置条件

Node.js / npm 环境；隔离测试目录；勿覆盖生产 `~/.codex/` 配置

### 详细使用步骤（业务用户）

1. 确认当前 stable：`codex --version`（应为 0.146.0）
2. 隔离安装 alpha：`npm install @openai/codex@0.147.0-alpha.2`（项目内，非 global 生产）
3. 对比 `codex doctor` 与 `codex features list` 输出
4. 查阅 GitHub tag compare：`rust-v0.147.0-alpha.1...rust-v0.147.0-alpha.2`
5. 验证关键工作流后再考虑是否跟进 stable 发布

### 命令与配置示例

```bash
# 确认 stable 未变
npm view @openai/codex version          # 0.146.0
codex --version                         # codex-cli 0.146.0

# 隔离跟踪 alpha.2
npm install @openai/codex@0.147.0-alpha.2 --no-save
npx codex --version                     # 应显示 0.147.0-alpha.2

# GitHub 发布页
# https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.2
```

```toml
# 生产 lockfile 概念性——勿写 alpha
# package.json: "@openai/codex": "0.146.0"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| npm `@latest` | ✅ 0.146.0（未跟随 alpha.2） |
| GitHub alpha.2 tag | ✅ 7/30 01:04 UTC |
| release body | ✅ 确认为空 |
| alpha.2 本地安装 | ⚠️ 未实测（生产锁定 0.146.0） |
| alpha.2 功能 diff | ⚠️ 未解析 commit（body 为空） |

### 问题与解决方案

**误将 alpha 写入生产 lockfile**：回退 `npm install @openai/codex@0.146.0`。**release body 为空如何评估**：用 GitHub compare 或 `git log`  между tags。**alpha.2 行为异常**：回退 alpha.1 或 stable 0.146.0。

### 官方 vs 社区交叉验证

GitHub Releases 确认 alpha.2 时间与 tag；npm registry 确认 `@latest` 仍为 0.146.0；社区对空 body 无额外 changelog 解读（⚠️ 待积累）。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 继续锁定 0.146.0 |
| 早期采用者 | 隔离跟踪 alpha.2，关注 GPT-5.6 相关 commit |
| CI | lockfile 禁止 alpha 前缀 |
| 安全团队 | 空 body 更需人工 review diff |

---

## 特性二：GPT-5.6 Sol 通过 Codex 重写生产 GPU 内核——成本降 20%、效率升 15%+

### 是什么（机制说明）

2026 年 7 月 29–30 日，OpenAI 官方与 Greg Brockman 公布：**GPT-5.6 Sol** 通过 **Codex** 接入 OpenAI **生产推理栈**，自主分析真实流量、重写 **Triton/Gluon** 生产 GPU 内核、优化负载均衡与 **KV 缓存**，并在推测解码环节针对 draft 模型设计并运行数百次架构实验。

量化结果（官方确认）：
- 对外 **服务成本降低 20%**
- **Token 生成效率提升超过 15%**（推测解码改进）

Codex 负责人 Tibo 概括内部打法：先训强模型，再用模型优化运行它自己的基础设施、推理栈与内核。这是承载十亿级日请求的**生产系统**，非演示 Demo；部署仍经 FpSan 等审核工具验证。模型优化的是「运货的卡车和路线」（内核与配置），尚未在线改动主体权重。

### 适用场景

- **适合**：理解 Codex 能力边界的企业架构师、关注 API 价格/吞吐趋势的开发团队、GPU 内核/推理栈优化研究者
- **不适合**：期望个人 CLI 复现生产级内核优化的普通开发者（需 OpenAI 内部环境与流量数据）

### 前置条件

理解 Codex CLI（0.146.0+）与 OpenAI 生产栈为不同部署层级；个人用户无法直接触发「重写生产内核」工作流

### 详细使用步骤（业务用户）

1. 阅读 [OpenAI GPT-5.6 博客](https://openai.com/index/gpt-5-6/) 与 [Frontier Intelligence & Efficiency](https://openai.com/index/gpt-5-6-frontier-intelligence-efficiency/)
2. 区分「Codex CLI 个人工作流」与「OpenAI 内部 Codex 接入生产栈」
3. 评估 API 定价/限流是否随效率提升调整（⚠️ 官方未承诺个人 tier 即时降价）
4. 团队内讨论：Agent 是否应参与基础设施优化类任务（内核、配置、负载均衡）
5. 跟踪 0.147 周期是否向 CLI 暴露相关 `exec`/kernel 优化能力

### 命令与配置示例

```bash
# 个人 CLI 层面——概念性长程任务（⚠️ 无法复现生产内核优化）
codex -p "Analyze Triton kernel for matmul and suggest optimizations" --cwd /path/to/kernels

# 关注 GPT-5.6 默认模型
codex features list 2>&1 | grep -i model
```

```toml
# ~/.codex/config.toml 概念性
[model]
default = "gpt-5.6-sol"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GPT-5.6 官方博客 | ✅ 20% 成本降、15%+ 效率升 |
| Codex CLI 生产内核接入 | ⚠️ 内部工作流，CLI 不可复现 |
| API 价格即时变化 | ⚠️ 未观测（无 API Key） |
| 内核重写交互 | ⚠️ 未实测 |

### 问题与解决方案

**能否用 CLI 重写自家 GPU 内核**：Codex CLI 可辅助 kernel 代码，但无 OpenAI 生产流量与部署管线。**「autonomously」是否无人参与**：官方强调仍经审核工具验证，非完全无人值守。**个人 API 为何未降价**：效率提升可能先内化于 OpenAI 成本结构，定价调整滞后（⚠️ 推测）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| OpenAI 官方博客 | ✅ 20% / 15%+ |
| Greg Brockman X | ✅ 自优化叙事 |
| 36氪/新智元 7/30 | ✅ 报道一致 |
| 「完全自进化」质疑 | ⚠️ 社区区分内核优化 vs 权重自改 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| API 用户 | 关注定价公告，短期继续按量计费 |
| 基础设施工程师 | 研究 Triton/Gluon 优化模式，评估内部 Agent 工作流 |
| 竞品（[claude-code.md](./claude-code.md)） | 观察 Anthropic 是否回应基础设施 Agent 叙事 |
| 普通开发者 | 不必焦虑「AI 写内核」，聚焦业务 Agent 工作流 |

---

## 特性三：0.146.0 stable 能力延续——会话命名、Agent Plugins、Fork threads（7/29 落地，7/30 维持）

### 是什么（机制说明）

**0.146.0 stable** 于 7/29 01:42 UTC 落地，npm `@latest` 7/30 仍为 0.146.0。核心能力（7/30 无 stable 更新，延续有效）：

- **会话命名**：`/new` / `/clear` 命名会话；**pin threads** 固定重要线程
- **Agent Plugins**：manifest、Workspace 发布、Bedrock / Claude Code 插件市场
- **Fork threads**：线程分叉保留审批设置；**分页历史**避免长线程一次性加载
- **全链路代理**：认证、插件、MCP、WebSocket honor proxy
- **发布基础设施**：releases.openai.com + Cloudflare R2

与 [Cursor Inbox + PR Review 第 2 日](./cursor.md) 形成「多任务追踪 + 移动审查」行业共振。

### 适用场景

- **适合**：生产环境从 0.145.0 升级评估、多任务并行、企业插件生态、长程 fork 探索
- **不适合**：Windows 遇 unsupported call 且未验证回退路径时盲目升级

### 前置条件

Codex CLI 0.146.0；升级前备份 `~/.codex/` 配置与 state DB

### 详细使用步骤（业务用户）

1. 确认版本：`codex --version` → 0.146.0
2. TUI：`/new <名称>` 创建命名会话；pin 重要线程
3. Settings → Plugins 浏览 Bedrock / Claude Code 市场
4. 长线程 fork 探索替代实现
5. 企业代理环境验证插件下载与 MCP

### 命令与配置示例

```bash
codex --version
codex features list 2>&1 | grep -E "plugin|title|fork"
npm install @openai/codex@0.146.0
```

```toml
[features]
plugins = true
code_mode = false
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.146.0` |
| npm `@latest` | ✅ 0.146.0（7/30 维持） |
| `plugins` feature | ✅ stable, true |
| 会话命名 / fork 交互 | ⚠️ 未实测（无 API Key） |
| 插件市场浏览 | ⚠️ 未实测 |

### 问题与解决方案

**升级后行为异常**：回退 `npm install @openai/codex@0.145.0`。**Windows unsupported call**：社区报告 0.146.0 分支偶发问题，备 0.145.0。**fork 丢失审批**：0.146.0 已修复（#34664）。

### 官方 vs 社区交叉验证

7/29 Release Notes 与 7/30 npm 维持一致；`features list` 确认 plugins stable；TUI 交互 ⚠️ 未实测。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 维持 0.146.0，定期 `codex doctor` |
| 多任务开发者 | 采用命名 + pin + fork |
| 企业 | 评估 Bedrock / Claude Code 插件市场 |

---

## 特性四：全链路代理与 releases.openai.com 发布基础设施（0.146.0）

### 是什么（机制说明）

0.146.0 在代理与发布基础设施两方面有重大改进（7/30 stable 维持）：

**全链路代理**（#34479 等）：认证、插件下载、MCP、远程执行、WebSocket、LM Studio 均 honor proxy；`network_proxy` 为 experimental。

**远程 Code Mode**（#35078、#35098）：app-server 可通过 WebSocket 连接远程 Code Mode host；`code_mode_host` stable，`code_mode` 仍为 under development。

**发布基础设施**（#34505、#34910）：artifacts 迁移至 **releases.openai.com + Cloudflare R2**；GitHub fallback；macOS notarization；企业 in-app 更新控制。

### 适用场景

- **适合**：企业代理环境、受限网络、macOS 安全合规、可控更新策略
- **不适合**：直连公网个人环境（改进无负面影响）

### 前置条件

配置 `HTTP_PROXY`/`HTTPS_PROXY` 或系统 proxy；企业管理员控制 in-app 更新

### 详细使用步骤（业务用户）

1. 配置代理环境变量
2. `codex doctor` 检查 Connectivity → network / websocket
3. 验证插件下载与 MCP 在代理下正常
4. 使用 releases.openai.com installer（自动优先）
5. 关注 `code_mode` under development 进展（7/30 仍为 false）

### 命令与配置示例

```bash
export HTTP_PROXY=http://proxy.corp:8080
export HTTPS_PROXY=http://proxy.corp:8080
codex doctor 2>&1 | grep -A3 proxy
codex features list 2>&1 | grep -E "code_mode|network_proxy"
curl -I https://releases.openai.com/codex/latest 2>/dev/null | head -5
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| proxy env vars | ✅ doctor 显示 none（本环境无代理） |
| websocket | ⚠️ 1 warn（401 无 auth，预期） |
| `code_mode` | ✅ under development, false |
| `code_mode_host` | ✅ stable, true |
| `network_proxy` | ✅ experimental, false |
| releases.openai.com installer | ⚠️ 未实测下载 |

### 问题与解决方案

**代理下插件失败**：0.146.0 已修复，确认 proxy 变量。**WebSocket 失败**：doctor 显示 HTTPS fallback 可能仍可用。**code_mode 不可用**：7/30 仍为 under development，勿在生产依赖。

### 官方 vs 社区交叉验证

GitHub Release Notes 与 `features list` 一致；本地 doctor 显示 proxy none、websocket warn。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT | 验证代理连通与 R2/notarization |
| 个人用户 | 无需额外配置 |
| Code Mode 早期用户 | 跟踪 0.147 alpha 是否推进 code_mode |

---

## 特性五：`codex doctor` 与 `codex features list` 环境诊断（0.146.0）

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境、app-server 状态、配置完整性。7/30 实测输出：**12 ok · 1 warn · 4 fail**。fail 项通常与无 API Key、app-server 未运行、本地 npm 与 global npm 路径不一致、TERM=dumb 相关，属 Cloud Agent 环境预期行为。

`codex features list` 7/30 关键项：

| 功能 | 状态 | 启用 |
|------|------|------|
| apps / browser_use / code_mode_host | stable | true |
| code_mode | under development | false |
| plugins / plugin_sharing / remote_plugin | stable | true |
| network_proxy | experimental | false |

### 适用场景

- **适合**：新环境部署、0.145.0 → 0.146.0 升级前后对比、alpha.2 隔离测试前后对比
- **不适合**：替代功能测试

### 前置条件

已安装 Codex CLI 0.146.0

### 详细使用步骤（业务用户）

1. 运行 `codex doctor`
2. 查看 fail/warn 项并逐项修复
3. 运行 `codex features list` 确认功能开关
4. 升级或 alpha 跟踪后重新对比
5. 企业环境关注 sandbox 与 proxy 检查项

### 命令与配置示例

```bash
codex doctor
codex doctor 2>&1 | tail -5
codex doctor --summary compact
codex features list 2>&1 | grep -E "apps|browser|code_mode|plugin"
```

```bash
cd /workspace/tools
./node_modules/.bin/codex --version    # codex-cli 0.146.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| runtime version | ✅ 0.146.0 |
| app-server | ○ not running（预期） |
| auth | ✗ no credentials（预期） |
| websocket | ⚠️ 401 Unauthorized（无 Key，预期） |
| `apps` / `browser_use` | ✅ stable, true |
| `code_mode` | ✅ under development, false |

```
12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**4 fail 正常吗**：Cloud Agent 无 Key 时预期。**install/updates fail**：本地 npm 与 global 路径不一致，不影响项目内安装。**code_mode false**：7/30 仍为 under development，等待 stable 发布。

### 官方 vs 社区交叉验证

7/30 实测 12 ok · 4 fail，与 7/29（0.146.0 首日）模式一致；features list 与 Changelog 描述一致。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 先跑 doctor + features list 再配置 |
| 升级用户 | 前后对比 doctor 输出 |
| alpha 跟踪者 | alpha.2 安装后重复 doctor 对比 |
| CI | `--json` 集成检查 |

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 状态 | 要点 |
|------|----------------|------|------|
| **0.147.0-alpha.2** | **2026-07-30 01:04** | **Pre-release（最新 alpha，body 空）** | 0.147 周期第二版 |
| 0.147.0-alpha.1 | 2026-07-29 09:13 | Pre-release | 0.147 周期首日 |
| **0.146.0** | **2026-07-29 01:42** | **Stable (npm `@latest`，维持第 2 日)** | 会话命名、Plugins、Fork、代理、R2 |
| 0.146.0-alpha.14 | 2026-07-28 04:28 | Pre-release | stable 前最新 alpha |
| 0.145.0 | 2026-07-21 | Stable | Windows 回退备选 |

## 今日研究员结论

Codex 7/30 **双轨日**：stable **0.146.0 维持 npm `@latest` 第 2 日**，生产可继续评估/锁定；GitHub **0.147.0-alpha.2**（01:04 UTC，**空 release body**）开启下一周期快速迭代，须隔离跟踪、勿写生产 lockfile。

**行业里程碑**：**GPT-5.6 Sol 通过 Codex 重写生产 GPU 内核**，成本降 **20%**、token 效率升 **15%+**，标志 OpenAI 将 Codex 从「开发者 CLI」延伸至「优化自身推理栈」的内部基础设施 Agent——与 [Cursor 移动 PR 闭环第 2 日](./cursor.md)、[Claude Code 2.1.220 冻结第 6 日](./claude-code.md) 形成「基础设施优化 vs 移动审查 vs 模型能力」三角竞争。

本地实测：`codex --version` → 0.146.0；`codex doctor` → 12 ok · 1 warn · 4 fail（Cloud Agent 预期）；`features list` 正常，`apps`/`browser_use` stable，`code_mode` under development。所有推理级功能（会话命名、fork、插件市场、内核优化复现）均 ⚠️ 未实测（无 API Key）。

**升级建议**：生产锁定 0.146.0；alpha.2 仅隔离 diff；Windows 用户备 0.145.0 回退。关注 0.147 stable 是否向 CLI 暴露 GPT-5.6 效率相关能力，以及 API 定价是否随 20% 内部降本外溢。
