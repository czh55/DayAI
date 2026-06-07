# OpenAI Codex 每日技术文档 — 2026-06-07

> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[developers.openai.com/codex](https://developers.openai.com/codex)  
> 本地实测：**codex-cli 0.137.0**（npm `@openai/codex@latest` 稳定通道）  
> 预发布跟踪：**0.138.0-alpha.6**（2026-06-06 发布）

---

## 今日综述

2026 年 6 月 4–6 日，Codex 开源仓库密集推送 **0.138.0-alpha** 系列，核心主题是企业云配置、Multi-Agent v2、插件生态加固与远程控制 RPC。npm 稳定包仍停留在 **0.137.0**（本环境实测）。行业叙事上，36氪等国内媒体在 6 月初重新热议 **GPT-5.3-Codex-Spark** 实时协作模型（OpenAI 官方 2 月发布，Cerebras 低延迟推理），与本周 CLI 基础设施更新形成「模型速度 vs 工程 Harness」双线。

---

## 特性一：Multi-Agent v2（per-thread runtime）

### 是什么（机制说明）

Multi-Agent v2 让**每个 thread 独立选择 runtime**（本地/远程/多 Agent 拓扑），并持久化 `multi-agent runtime metadata`。子 Agent 通过 `followup_task`（原 `assign_task` 更名）接续工作，spawn 的 listener 继承 raw events。与 v1 相比，dogfood 默认更激进，适合「主 Agent 写代码 + 子 Agent 并行跑测试/搜网」。

### 适用场景

**适合：** 大型 repo 并行探索、web search + codegen 分工、长时程 goal extension  
**不适合：** 单文件问答、无 ChatGPT/Codex 订阅的纯 API 用户（部分能力需 app-server）

### 前置条件

- Codex **≥ 0.138.0-alpha.1**（GitHub release 2026-06-04）
- `codex features list` 中 `multi_agent` 为 stable；`multi_agent_v2` 为 under development
- 已 `codex login` 或配置 `OPENAI_API_KEY`

### 详细使用步骤

1. 升级：`npm install @openai/codex@latest` 或安装 alpha 资产
2. `codex login` 完成 ChatGPT 或 API 认证
3. 启动交互：`codex`
4. 在 prompt 中描述需要并行子任务的目标
5. 用 `/status` 或 thread 列表查看子 thread
6. 审查各 thread diff 后合并

### 命令与配置示例

**基础示例：**

```bash
cd /workspace
codex "Split work: one agent fixes unit tests in tests/, another updates README for API changes"
```

**进阶 — config.toml 片段（`~/.codex/config.toml`）：**

```toml
[features]
multi_agent = true

[permissions]
approval_policy = "on-request"
```

**查看 feature 状态：**

```bash
codex features list | grep multi_agent
```

### 本地测试结果

```bash
$ cd /workspace/tools && ./node_modules/.bin/codex --version
codex-cli 0.137.0

$ ./node_modules/.bin/codex features list | grep multi_agent
multi_agent                             stable             true
multi_agent_v2                          under development  false
```

- ✅ 0.137.0 已启用 stable `multi_agent`
- ⚠️ `multi_agent_v2` 在稳定通道为 false，需 alpha 构建
- ❌ 无 auth，未实测 spawn 子 thread

### 问题与解决方案

**问题 1：子 Agent 未 spawn**

- 排查：`codex doctor` auth；`multi_agent` feature 是否 true
- 解决：`codex login`；升级至 0.138-alpha

**问题 2：子 thread 丢失 parent 关联**

- 排查：0.138 修复 `parent_thread_id` 暴露；检查是否 0.137 已知限制
- 解决：升级；用 `codex threads`（如可用）列出关联

### 官方 vs 社区

| 来源 | 说法 | 一致 |
|------|------|------|
| [GitHub Release 0.138.0-alpha.1](https://github.com/openai/codex/releases) | multi-agent v2 metadata | ✅ |
| [InfoQ Harness 争议](https://www.infoq.cn/article/vblM3MlOEs86dmVdH8d1) | Codex 主张薄 Harness | ✅ 与 multi-agent 编排互补 |

---

## 特性二：企业云配置包（Cloud Config Bundle）

### 是什么

Enterprise/EDU workspace 可通过**云托管 config bundle** 下发统一策略：月度 credit 限额展示、权限 profile 派生、MITM 代理 CA 注入子进程、环境级 `request_permissions` 授权键（`environmentId`）。

### 适用场景

**适合：** 数百人规模 Codex  rollout、需集中禁用插件/MCP、需统一 sandbox 策略  
**不适合：** 个人开发者（无 admin dashboard）

### 管理员开启 SOP

1. 登录 [ChatGPT Enterprise / Edu admin](https://chatgpt.com/admin)
2. 导航 **Codex** → **Managed configuration** → **Create bundle**
3. 上传或编辑 TOML/JSON bundle（含 `requirements layers`）
4. 绑定到 workspace / OU
5. 通知用户重启 Codex app/CLI
6. 抽查：`codex doctor` 应显示 cloud-managed config loaded

### 业务用户使用 SOP

1. 安装官方 Codex app 或 `npm i -g @openai/codex`
2. `codex login` 使用企业账号
3. 启动后状态栏可见 **monthly credit limit**（0.138+）
4. 遵守企业 approval policy；敏感操作等待 admin 预批规则
5. 遇 block 联系 admin 调整 bundle 中 `permission profiles`

### 配置示例（示意，以 app-server schema 为准）

```toml
# enterprise-bundle.toml (admin 下发)
[credits]
show_monthly_limit = true

[permissions]
default_profile = "restricted"
environment_scoped_grants = true

[sandbox]
filesystem = "restricted"
network = "restricted"
```

### 本地测试结果

- ❌ 无 Enterprise workspace，未实测 cloud bundle 注入
- ✅ changelog #24617–#24622 与 release notes 一致

### 问题与解决方案

**问题 1：CLI 未拉取到 bundle**

- 排查：账号是否 Enterprise；`codex doctor` connectivity
- 解决：重新 login；检查 MITM 是否拦截 bundle endpoint

**问题 2：子进程不信任企业 CA**

- 解决：0.138 将 managed MITM CA 导出到 child env（#22668）

---

## 特性三：插件 `codex plugin list --json`

### 是什么

插件工作流增加机器可读输出，远程 catalog 建议缓存，修复 manifest 顺序与 skills 字段校验。

### 前置条件

- Codex 0.138.0-alpha.1+
- 已安装至少一个 plugin

### 详细使用步骤

1. `codex plugin install <name>`（按官方 catalog）
2. `codex plugin list --json` 输出 JSON
3. CI 脚本解析 `enabled`/`version` 字段
4. 管理员用 JSON 审计团队插件合规

### 命令示例

```bash
codex plugin list --json | jq '.plugins[] | {name, version, enabled}'
```

### 本地测试结果

```bash
$ cd /workspace/tools && ./node_modules/.bin/codex plugin list --json 2>&1
# 无 auth 时可能报错；feature plugins = stable true
```

- ⚠️ 无登录未拿到真实 JSON 列表
- ✅ `plugins` feature stable

### 管理员 vs 用户 SOP

| 角色 | 动作 |
|------|------|
| 管理员 | 维护 approved plugin 列表；bundle 中 `deny` 非白名单 |
| 用户 | `plugin list --json` 自检；仅 install 批准项 |

---

## 特性四：远程控制配对（Remote Control Pairing RPC）

### 是什么

app-server v2 RPC 支持远程客户端：**发起配对**、**列出/撤销 controller grants**，便于手机或另一台机器控制桌面 Codex 会话。

### 前置条件

- Codex app + app-server daemon 运行
- 0.138.0-alpha.1+

### 详细使用步骤（用户）

1. 桌面 Codex 设置 → Remote Control → Enable
2. 移动客户端选择 Pair new device
3. 确认配对码
4. 远程查看 thread、发送 follow-up
5. 失窃设备：Settings → Revoke all controllers

### 本地测试结果

- ❌ `codex doctor` 显示 app-server not running (ephemeral mode)
- 未实测原因：需 GUI app + 配对设备

---

## 特性五：Rollout 压缩与本地历史安全

### 是什么

冷 rollout 压缩并行化、压缩后搜索 snippet 复用、取消无输出 prompt 时恢复 draft/attachments、Windows SQLite intrinsics 修复。

### 适用场景

长会话本地存储占磁盘、Windows 首次启动崩溃

### 使用步骤

1. 正常使用 `codex`，无需手动开启
2. 磁盘紧张时清理 `~/.codex/` archived rollouts
3. Windows 用户升级至 0.138 修复 SQLite

### 本地测试结果

```bash
$ ./node_modules/.bin/codex doctor | grep -A2 "rollout"
      active rollouts          0 files · 0 B
```

- ✅ doctor 可检查 rollout DB 状态

---

## 特性六：GPT-5.3-Codex-Spark（行业热点，模型层）

### 是什么

OpenAI 首个面向**实时协作**的 Codex 变体，Cerebras WSE-3 上 **1000+ tok/s**，128k 上下文，Pro 用户 research preview。与本周 CLI 0.138 基础设施更新不同层，但国内媒体 6 月初集中报道。

### 前置条件

- ChatGPT **Pro** 订阅
- Codex app / CLI / VS Code 最新版
- 独立 rate limit（不占标准额度，预览期政策）

### 详细使用步骤

1. 更新 Codex 客户端
2. `/model` 或设置中选择 **GPT-5.3-Codex-Spark**
3. 打开小范围文件进行**交互式编辑**（非长时程 agent）
4. 需要深度推理时切回 **GPT-5.3-Codex** 旗舰
5. 混合工作流：旗舰写计划 → Spark 逐步执行（社区 [Code With Seb](https://www.codewithseb.com/blog/gpt-5-3-codex-spark-1000-tokens-real-time-coding-guide) 推荐）

### 命令示例

```bash
# CLI 中选择模型（以实际 TUI 为准）
codex
# 在会话内: /model gpt-5.3-codex-spark
```

### 本地测试结果

- ❌ Spark 需 Pro + 特定模型路由；本环境 codex 0.137.0 无 Spark
- ⚠️ npm 稳定通道落后于 Spark 集成

### 官方 vs 社区

| 来源 | 说法 | 一致 |
|------|------|------|
| [OpenAI 官方](https://openai.com/index/introducing-gpt-5-3-codex-spark/) | 1000+ tps, Pro preview | ✅ |
| [36氪 2026-06](https://www.36kr.com/p/3681165079539328) | 与 Gemini Deep Think 同日「代码核弹」 | ✅ 行业叙事 |
| [Ars Technica](https://arstechnica.com/ai/2026/02/openai-sidesteps-nvidia-with-unusually-fast-coding-model-on-plate-sized-chips/) | Cerebras 非 Nvidia | ✅ |

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

./node_modules/.bin/codex --version
# codex-cli 0.137.0

./node_modules/.bin/codex doctor
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail
# 主要 fail: auth, install path 与 global 不一致, TERM=dumb

./node_modules/.bin/codex features list
# plugins/multi_agent/goals/hooks/unified_exec = stable
```

**排查 install path 警告：**

```bash
export PATH="/workspace/tools/node_modules/.bin:$PATH"
codex doctor
```

---

## 升级与 alpha 跟踪

```bash
# 稳定
npm install @openai/codex@latest

# 跟踪 alpha（谨慎生产）
npm install @openai/codex@0.138.0-alpha.6
```

---

## 参考链接

- [Releases 0.138.0-alpha.1 Notes](https://github.com/openai/codex/releases/tag/rust-v0.138.0-alpha.1)
- [Releases 0.138.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.138.0-alpha.6)
- [OpenAI Codex Spark](https://openai.com/index/introducing-gpt-5-3-codex-spark/)
- [developers.openai.com/codex](https://developers.openai.com/codex)
