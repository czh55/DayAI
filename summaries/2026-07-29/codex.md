# OpenAI Codex 每日技术文档 — 2026-07-29

> 本地实测版本：**0.146.0** stable（npm `@latest` 今日已升级！）｜监测 alpha：**0.147.0-alpha.1**（7/29 09:13 UTC）  
> 监测源：[Codex GitHub Releases](https://github.com/openai/codex/releases)、[Codex Learn Changelog](https://learn.chatgpt.com/docs/changelog)、[npm @openai/codex](https://www.npmjs.com/package/@openai/codex)

## 今日综述

2026 年 7 月 29 日 Codex **稳定版 0.146.0 正式发布**（01:42 UTC，tag `rust-v0.146.0`），npm `@latest` **同日跟随升级至 0.146.0**（此前为 7/21 的 0.145.0）。这是 0.146.0 分支历经十余个 alpha pre-release 后的首次 stable 落地。核心新特性包括：**会话命名**（`/new` / `/clear`）、**线程固定**（pin threads）、**Agent Plugins** 与 Bedrock / Claude Code 插件市场、**Fork threads** 与分页历史、**全链路代理**改进、远程 Code Mode WebSocket、自定义模型独立 Web Search，以及发布基础设施迁移至 **releases.openai.com + Cloudflare R2**。同日 09:13 UTC 再发布 **0.147.0-alpha.1**，开启下一开发周期。

本地 CLI 实测：`codex --version` → `codex-cli 0.146.0`；`codex doctor` → **12 ok · 1 warn · 4 fail**；`codex features list` 显示 `apps`、`browser_use`、`code_mode_host` 为 stable，`code_mode` 仍为 under development。生产环境可评估从 0.145.0 升级；因无 API Key 未进行推理级功能实测。

---

## 特性一：0.146.0 stable 正式发布

### 是什么（机制说明）

7/29 01:42 UTC，OpenAI Codex GitHub 发布 **0.146.0 stable**（tag `rust-v0.146.0`），npm `@openai/codex@latest` 同日跟随升级。这是自 7/22 alpha.1 起历经 alpha.2–alpha.14 十余个 pre-release 后的首次 stable 落地。

| 版本 | 发布时间 (UTC) | 状态 |
|------|----------------|------|
| 0.145.0 | 2026-07-21 | Stable（已被 superseded） |
| **0.146.0** | **2026-07-29 01:42** | **Stable（npm `@latest`）** |
| 0.146.0-alpha.14 | 2026-07-28 04:28 | Pre-release（stable 前最新 alpha） |
| **0.147.0-alpha.1** | **2026-07-29 09:13** | Pre-release（下一周期首日） |

Release 附完整 changelog，涵盖会话管理、Agent Plugins、Fork threads、代理、发布基础设施等数百项 commit。同日 alpha.1 表明 0.147.0 开发周期已启动。

### 适用场景

- **适合**：生产环境从 0.145.0 升级评估、多任务并行开发者、企业代理环境、插件生态早期采用者
- **不适合**：Windows 用户遇 unsupported call 时（社区建议回退 0.145.0 备选）、尚未完成 doctor 对比的盲目升级

### 前置条件

Node.js / npm 环境；升级前备份 `~/.codex/` 配置与 state DB

### 详细使用步骤（业务用户）

1. 确认当前版本：`codex --version`（应为 0.145.0 或更早）
2. 升级：`npm install -g @openai/codex@latest` 或项目内 `npm install @openai/codex@0.146.0`
3. 运行 `codex doctor` 对比 fail/warn 项
4. 运行 `codex features list` 确认功能开关状态
5. 在隔离环境验证关键工作流后再推广至团队

### 命令与配置示例

```bash
# 确认升级
codex --version                    # codex-cli 0.146.0
npm view @openai/codex version     # 0.146.0

# 项目内锁定
npm install @openai/codex@0.146.0

# 升级前后对比
codex doctor 2>&1 | tail -3
codex features list 2>&1 | head -20
```

```toml
# ~/.codex/config.toml 概念性
[model]
default = "gpt-5.6-sol"

[features]
code_mode = false
plugins = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.146.0` |
| npm `@latest` | ✅ 0.146.0（今日升级） |
| GitHub stable tag | ✅ 7/29 01:42 UTC |
| alpha.1 tag | ✅ 7/29 09:13 UTC |
| 推理级功能 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**升级后行为异常**：回退 `npm install @openai/codex@0.145.0`。**Windows unsupported call**：社区报告 0.146.0 分支偶发问题，可暂用 0.145.0。**doctor fail 增多**：对比逐项修复，多数与无 API Key / app-server 未运行相关。

### 官方 vs 社区交叉验证

GitHub Release Notes、Learn Changelog、npm 三重确认 0.146.0 stable；社区 Windows 反馈偶发 unsupported call（⚠️）。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 评估升级，先跑 doctor 对比 |
| 早期采用者 | 跟踪 0.147.0-alpha.1 隔离测试 |
| CI | lockfile 锁定 0.146.0 |
| Windows 用户 | 升级前在测试机验证，备 0.145.0 回退 |

---

## 特性二：会话命名 `/new` `/clear` 与线程固定

### 是什么（机制说明）

0.146.0 引入会话命名与线程固定能力（#34605、#34840、#35011）：

- **`/new`** / **`/clear`**：创建新会话时可命名，便于区分多任务上下文
- **Pin threads**：将重要线程固定，避免在长列表中丢失
- **Side conversations**：切换侧边对话时保持打开状态，无需关闭当前线程

这些改进直接针对多 Agent 并行场景——与同日 Cursor iPad Inbox + 多 Agent 侧边栏形成行业共振，审查与合并正移出桌面。

### 适用场景

- **适合**：同时处理多个功能分支、PR 审查、长程 Goal 任务的开发者
- **不适合**：单线程简单问答（命名收益有限）

### 前置条件

Codex CLI 0.146.0 或 Codex App 最新版；app-server 运行时可获完整体验

### 详细使用步骤（业务用户）

1. 在 TUI 中输入 `/new <名称>` 创建命名会话
2. 使用 `/clear` 清空并命名新会话
3. 在线程列表中 pin 重要线程
4. 打开侧边对话处理并行任务，切换主线程时侧边对话保持
5. App 侧通过侧边栏管理多 Agent 并行

### 命令与配置示例

```bash
# TUI 内 slash 命令（概念性）
/new refactor-auth-module
/clear bugfix-session-0729
codex --cwd /path/to/repo
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| slash 命令存在 | ⚠️ 未实测（无 API Key / 非交互 TUI） |
| `features list` title | ✅ `title` stable，project-name 启用 |
| app-server pin | ⚠️ 未实测（app-server not running） |

### 问题与解决方案

**命名不持久**：检查 `~/.codex/state_*.sqlite` 权限。**pin 丢失**：确认 app-server 正常运行。**侧边对话关闭**：0.146.0 已修复切换时关闭问题（#35011）。

### 官方 vs 社区交叉验证

GitHub #34605/#34840/#35011 与 Learn Changelog 一致；本地 TUI 交互 ⚠️ 未实测。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 多任务开发者 / 团队 Lead | 采用命名 + pin，制定会话规范 |
| 纯 CLI 用户 | TUI slash 命令即可 |

---

## 特性三：Agent Plugins 与插件市场（Bedrock、Claude Code）

### 是什么（机制说明）

0.146.0 大幅扩展 Agent Plugins 生态（#35105、#35254、#34931、#34979）：

- **Agent Plugins manifest**：标准化插件描述与能力声明
- **Workspace 插件发布**：团队内共享自定义插件
- **Amazon Bedrock 插件市场**：通过 API plugin marketplace 接入（#34931）
- **Claude Code 插件市场**：自动推断 bundled Claude Code marketplace（#34979）
- **远程插件目录缓存**：按 scope 缓存远程 catalog（#34849）
- **Git 插件 SHA checkout 校验**（#34644）

`codex features list` 实测：`plugins` stable true、`plugin_sharing` stable true、`remote_plugin` stable true。

### 适用场景

- **适合**：需要统一 Agent 工具链的企业、AWS Bedrock 用户、Claude Code 插件迁移者
- **不适合**：无插件需求的极简工作流

### 前置条件

Codex CLI 0.146.0；网络可达插件市场；企业环境注意代理配置（见特性五）

### 详细使用步骤（业务用户）

1. 运行 `codex features list` 确认 `plugins = true`
2. 在 TUI 中 `@` 引用已安装插件 skills
3. 通过 Settings → Plugins 浏览 Bedrock / Claude Code 市场
4. Workspace 管理员发布团队插件 manifest
5. 代理环境下验证插件下载与 MCP 授权

### 命令与配置示例

```bash
codex features list 2>&1 | grep -E "plugin"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `plugins` feature | ✅ stable, true |
| `plugin_sharing` | ✅ stable, true |
| `remote_plugin` | ✅ stable, true |
| 插件市场浏览 | ⚠️ 未实测（无 API Key） |
| Bedrock marketplace | ⚠️ 未实测（无 Bedrock 凭证） |

### 问题与解决方案

**插件下载失败**：检查代理配置（0.146.0 已全链路修复）。**MCP 连接过期**：0.146.0 支持认证变更时重连（#34952）。**技能 catalog 截断**：注意 context budget 警告（#34997）。

### 官方 vs 社区交叉验证

GitHub Release Notes 与 `features list`（plugins stable）一致；社区早期反馈待积累。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 / Bedrock 用户 | 评估 marketplace 集成 |
| Claude Code / 插件开发者 | 尝试互迁与 manifest 发布 |

---

## 特性四：Fork threads 与分页历史

### 是什么（机制说明）

0.146.0 引入线程 fork 与分页历史能力（#35220、#35251、#34563、#34621）：

- **Fork threads**：从现有线程分叉出新分支，保留审批设置与历史上下文（#34664）
- **分页历史**：`Page through inherited thread history`（#34563），长线程不再一次性加载
- **临时 fork**：不出现在线程列表中的 ephemeral fork，适合试探性探索
- **Rollout lineage**：跨 rollout 行加载分页 model context（#34621）
- **Fork history 保护**：rollout cleanup 时保护 fork 引用（#34566）

与 Cursor 多 PR 会话、Codex Goal 长任务形成互补——开发者可在同一线程族内并行探索多条解决路径。

### 适用场景

- **适合**：长程编码任务、多方案对比、A/B 实现探索、审查后 fork 修复
- **不适合**：一次性简单问答

### 前置条件

Codex CLI 0.146.0；足够磁盘空间存储 rollout DB

### 详细使用步骤（业务用户）

1. 在长线程中选择 fork 操作（TUI 或 App）
2. 在 fork 分支中探索替代实现
3. 使用临时 fork 做快速试探（不污染线程列表）
4. 分页浏览历史 turn，避免 context 溢出
5. 合并或丢弃 fork 分支

### 命令与配置示例

```bash
codex doctor 2>&1 | grep -A5 rollout
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| fork 功能 | ⚠️ 未实测（无 API Key） |
| rollout DB | ✅ doctor 显示 state paths 可检查 |
| `remote_compaction_v2` | ✅ stable, true |
| 分页历史 | ⚠️ 未实测（无历史线程） |

### 问题与解决方案

**fork 丢失审批设置**：0.146.0 已修复（#34664）。**历史加载慢**：分页机制应改善；检查 rollout DB 大小。**临时 fork 找不到**：设计上不在列表中，通过父线程访问。

### 官方 vs 社区交叉验证

GitHub #35220/#35251 与 changelog 分页/fork 保护 commit 一致；本地 fork 交互 ⚠️ 未实测。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程任务 / 审查者 | 使用 fork 探索多方案或独立修复 |
| 存储敏感环境 | 监控 rollout DB 增长 |

---

## 特性五：全链路代理支持与 releases.openai.com 发布基础设施

### 是什么（机制说明）

0.146.0 在代理与发布基础设施两方面有重大改进：

**全链路代理**（#34479 等）：认证、插件下载、MCP、远程执行、WebSocket、LM Studio 均 honor proxy；路由感知 HTTP client pool；`network_proxy` 为 experimental。

**远程 Code Mode**（#35078、#35098）：app-server 可通过 WebSocket 连接远程 Code Mode host；`code_mode_host` stable，`code_mode` 仍为 under development。

**发布基础设施**（#34505、#34910）：
- Release artifacts、channel metadata、installer aliases 迁移至 **OpenAI 托管**（releases.openai.com + **Cloudflare R2**）
- GitHub 作为 fallback
- Standalone installer 优先使用 releases.openai.com（#34910）
- macOS helper 签名与 notarization（#35264）
- 企业计划识别与 in-app 更新管理员控制（#35238、#35537）

### 适用场景

- **适合**：企业代理环境、受限网络部署、macOS 安全合规团队、需要可控更新的企业 IT
- **不适合**：直连公网的无代理个人环境（改进无负面影响）

### 前置条件

配置系统 proxy 或 `HTTP_PROXY`/`HTTPS_PROXY` 环境变量；企业管理员控制 in-app 更新策略

### 详细使用步骤（业务用户）

1. 配置代理环境变量或系统 proxy
2. 运行 `codex doctor` 检查 Connectivity → network / websocket 项
3. 验证插件下载与 MCP 连接在代理下正常
4. 使用 releases.openai.com installer 安装（自动优先）
5. 企业管理员配置 in-app 更新策略

### 命令与配置示例

```bash
export HTTP_PROXY=http://proxy.corp:8080
export HTTPS_PROXY=http://proxy.corp:8080
codex doctor 2>&1 | grep -A3 proxy
curl -I https://releases.openai.com/codex/latest 2>/dev/null | head -5
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| proxy env vars | ✅ doctor 显示 none（本环境无代理） |
| websocket | ⚠️ 1 warn（401 无 auth，预期） |
| `network_proxy` feature | ✅ experimental, false |
| releases.openai.com | ⚠️ 未实测 installer 下载 |
| R2 artifacts | ✅ GitHub Release 确认迁移 |

### 问题与解决方案

**代理下插件下载失败**：0.146.0 已修复，确认 proxy 环境变量。**WebSocket 失败**：doctor 显示 HTTPS fallback 可能仍可用；检查防火墙 WebSocket 策略。**installer 源切换**：releases.openai.com 优先，GitHub fallback 自动。

### 官方 vs 社区交叉验证

GitHub Release Notes（代理 + R2 + releases.openai.com）与 codex-http-client 文档 #34669 一致；本地 doctor 显示 proxy none、websocket warn。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT / 安全团队 | 验证代理连通与 R2/notarization 合规 |
| 个人用户 | 无需额外配置，自动受益 |

---

## 特性六：`codex doctor` 环境诊断（0.146.0）

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境、app-server 状态、配置完整性。7/29 实测输出：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。fail 项通常与无 API Key、app-server 未运行、本地 npm 与 global npm 路径不一致、TERM=dumb 相关，属 Cloud Agent 环境预期行为。0.146.0 新增/改进多项检查项：route-aware proxy、rollout DB 扫描、SQLite home 一致性（#34994）、enterprise plan 识别。

### 适用场景

- **适合**：新环境部署、0.145.0 → 0.146.0 升级前后对比、故障排查
- **不适合**：替代功能测试

### 前置条件

已安装 Codex CLI 0.146.0

### 详细使用步骤（业务用户）

1. 运行 `codex doctor`
2. 查看 fail/warn 项并逐项修复
3. 使用 `codex doctor --summary compact` 获取紧凑摘要
4. 升级后重新运行对比
5. 企业环境关注 sandbox 与 proxy 检查项

### 命令与配置示例

```bash
codex doctor
codex doctor 2>&1 | tail -5
codex doctor --summary compact
codex doctor --json 2>/dev/null | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| runtime version | ✅ 0.146.0 |
| app-server | ○ not running（预期） |
| auth | ✗ no credentials（预期） |
| websocket | ⚠️ 401 Unauthorized（无 Key，预期） |
| features | ✅ 38 enabled |

```
12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**4 fail 正常吗**：Cloud Agent 无 Key 时预期。**install/updates fail**：本地 npm 与 global 路径不一致，不影响项目内安装。**app-server 未运行**：桌面 App 功能，CLI 可独立使用。**websocket warn**：配置 API Key 后应恢复。

### 官方 vs 社区交叉验证

7/29 实测 12 ok · 4 fail，与 7/28（0.145.0）模式一致；0.146.0 新增 proxy/rollout 检查项可见。

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 先跑 doctor 再配置 |
| 升级用户 | 前后对比 doctor 输出 |
| CI | `--json` 集成检查 |

**附：`codex features list` 关键项（0.146.0）**

| 功能 | 状态 | 启用 |
|------|------|------|
| apps / browser_use / code_mode_host | stable | true |
| code_mode | under development | false |
| plugins / plugin_sharing / remote_plugin | stable | true |
| network_proxy | experimental | false |

```bash
codex features list 2>&1 | grep -E "apps|browser|code_mode|plugin"
```

---

## 版本对照表

| 版本 | 发布日期 (UTC) | 状态 | 要点 |
|------|----------------|------|------|
| **0.147.0-alpha.1** | 2026-07-29 09:13 | Pre-release | 下一周期首日 |
| **0.146.0** | **2026-07-29 01:42** | **Stable (npm `@latest`)** | 会话命名、Plugins、Fork、代理、R2 |
| 0.146.0-alpha.14 | 2026-07-28 04:28 | Pre-release | stable 前最新 alpha |
| 0.145.0 | 2026-07-21 | Stable | 已被 superseded，Windows 回退备选 |
| 0.144.x | 2026-07 更早 | Stable | 已 superseded |

## 今日研究员结论

Codex 7/29 **里程碑日**：**0.146.0 stable 正式发布**，npm `@latest` 同日升级，结束逾一周 alpha 密集迭代。核心交付——会话命名与 pin、Agent Plugins（Bedrock + Claude Code 市场）、Fork threads 分页历史、全链路代理、releases.openai.com + R2 发布基础设施——标志着 OpenAI 编程 CLI 进入新稳定周期，与 Cursor iPad 移动端 Agent 工作流同日强化，行业竞争焦点向「会话管理 + 移动审查」延伸。

本地实测：`codex --version` → 0.146.0；`codex doctor` → 12 ok · 1 warn · 4 fail（Cloud Agent 预期）；`features list` 正常，plugins/code_mode_host stable。所有推理级功能（会话命名交互、fork、插件市场、Code Mode WebSocket）均 ⚠️ 未实测（无 API Key）。

**升级建议**：生产环境可评估 0.145.0 → 0.146.0，先 `codex doctor` 对比；Windows 用户备 0.145.0 回退。关注 0.147.0-alpha.1 隔离跟踪，勿将 alpha 写入主分支 lockfile。
