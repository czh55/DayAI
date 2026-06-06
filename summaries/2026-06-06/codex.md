# OpenAI Codex 每日技术文档 — 2026-06-06

> **检索时间**：2026-06-06 22:00 UTC  
> **本地实测版本**：`codex-cli 0.137.0`（npm `@openai/codex@latest`；GitHub 最新 pre-release 为 `0.138.0-alpha.6`）  
> **官方来源**：[developers.openai.com/codex/changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

---

## 今日综述

**6 月 6 日**：GitHub 发布 pre-release `0.138.0-alpha.6`（03:23 UTC），changelog 正文仅标注 "Release 0.138.0-alpha.6"，属 alpha 渠道常规构建。**6 月 4 日**的 **Codex CLI 0.137.0** 才是本周功能大版本：Multi-agent v2、云托管配置包、插件 JSON 输出、并行 Web 搜索、企业月度额度展示等。本地 `npm install @openai/codex@latest` 安装为 **0.137.0**；`codex doctor` 报告 12 ok / 4 fail（主要为无 auth、TERM=dumb）。

---

## 特性一：Multi-Agent v2 运行时元数据（0.137.0）

### 是什么（机制说明）

Multi-agent v2 将 **运行时选择（runtime choice）与每个 thread 绑定**：spawn 的子 agent 继承可配置的 runtime profile，支持 `followup_task`（原 `assign_task` 重命名）、per-thread metadata 持久化、启动 prewarm 与 resolved runtime 对齐。`hide_spawn_agent_metadata` 默认为 true，减少 TUI 噪音。适合「一主多从」并行编码：主 thread 拆任务，子 thread 在隔离环境执行。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 大型 feature 分支多模块并行 | 单文件 typo 修复 |
| 需要 per-thread 不同 sandbox 策略 | 未启用 `multi_agent` feature 的旧配置 |
| 企业统一 runtime 模板 | 无 `codex login` 的离线环境 |

### 前置条件

- Codex CLI ≥ 0.137.0
- Feature flag `multi_agent` stable（`codex features list` 显示 `stable true`）
- `multi_agent_v2` 为 under development，dogfood 默认可能已开

### 详细使用步骤

1. `codex login` 完成认证
2. 编辑 `~/.codex/config.toml`，确认 `[features]` 中 `multi_agent = true`
3. 启动 `codex`，在 prompt 中要求 spawn 子 agent
4. 使用 `/status` 查看 multi-agent runtime
5. 子任务完成后主 thread 用 followup 合并

### 命令与配置示例

**config.toml 片段：**

```toml
[features]
multi_agent = true

[model]
provider = "openai"
```

**基础 — 单会话 spawn：**

```bash
codex
# 在 TUI 中输入：
# 「Spawn two agents: one fixes tests in pkg/a, one updates docs in pkg/b」
```

**进阶 — exec 非交互 + 明确子任务：**

```bash
codex exec \
  --prompt "Use multi-agent: agent-1 refactor auth middleware, agent-2 add integration tests. Merge when both pass." \
  --sandbox restricted
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.137.0

./node_modules/.bin/codex features list | grep multi_agent
# multi_agent                             stable             true
# multi_agent_v2                          under development  false
```

- ✅ version 与 features 可查
- ❌ 无 auth，无法 spawn 真实子 agent
- ⚠️ `multi_agent_v2` flag 为 under development

### 问题与解决方案

1. **子 agent 无法启动**：检查 `multi_agent` feature；`codex doctor` 看 auth
2. **metadata 不显示**：v0.137+ 默认 `hide_spawn_agent_metadata=true`，属预期
3. **MAv2 close_agent self-target 被拒**：v0.137 changelog #26144 修复；升级即可

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [developers.openai.com 2026-06-04](https://developers.openai.com/codex/changelog) | ✅ |
| [GitHub 0.137.0 release](https://github.com/openai/codex/releases) | ✅ |
| [36氪 Codex 桌面报道](https://www.36kr.com/p/3667252017193607) | 部分（谈 App 指挥中心，未提 v2 metadata） |

### 利弊 + 建议

- 个人：先用单 agent 熟悉再开 multi-agent
- 团队：统一 config.toml runtime profile
- 企业：配合 permission profiles（#25739）审计子 agent 工具调用

---

## 特性二：Cloud-Managed Config Bundles 企业配置包（0.137.0）

### 是什么

企业/教育账号可通过云端下发 **config bundle**：分层 requirements（transport types → compose layers → cloud-managed layer → runtime switch）。管理员在 OpenAI 企业控制台定义策略，客户端启动时拉取并合并到本地 `config.toml` 之上，实现集中管控 sandbox、模型、插件白名单等。

### 适用场景

- **适合**：ChatGPT Enterprise / EDU workspace 统一 Codex 策略
- **不适合**：个人免费账号、无企业合约

### 前置条件

- Codex 0.137.0+
- 企业管理员已在控制台配置 bundle
- 账号属于支持 cloud config 的 workspace（含 EDU，#25963）

### 管理员开启 SOP

1. 登录 OpenAI Enterprise Admin → **Codex** → **Configuration Bundles**
2. 创建 bundle：定义 `sandbox_permissions`、`approval_policy`、`allowed_plugins` 等 layer
3. 将 bundle 绑定到 workspace 或 OU
4. 发布 bundle version；通知开发者 `codex login` 刷新
5. 审计：Admin 面板查看客户端上报的 bundle hash

### 业务/开发者使用 SOP

1. `codex login` 使用企业账号
2. 启动 `codex`，启动日志应显示 loaded cloud config layer
3. `codex doctor` → Configuration 段查看 merged config
4. 若策略冲突，本地 `config.toml` 被企业 layer 覆盖（以官方文档为准）
5. 遇阻联系管理员调整 bundle，勿本地绕过

### 配置示例

```toml
# ~/.codex/config.toml — 用户层（可被 cloud bundle 覆盖）

[features]
plugins = true

[sandbox]
approval_policy = "on_request"
```

```bash
# 验证加载
codex doctor --json | head -100
```

### 本地测试结果

```bash
./node_modules/.bin/codex doctor
# ✗ auth  no Codex credentials were found
# ✓ config  loaded (本地默认 config.toml)
```

- ⚠️ 无企业账号，无法验证 cloud bundle 拉取
- ✅ changelog #24617–#24622、#25963 描述完整链路

### 问题与解决方案

1. **bundle 未生效**：token 过期 → `codex login` 重登
2. **EDU 账号无法拉 bundle**：确认 #25963 已包含 EDU；联系管理员

### 交叉验证：官方 changelog + app-server schema 更新 — ✅

---

## 特性三：`codex plugin list --json` 与插件目录缓存（0.137.0）

### 是什么

插件工作流新增机器可读输出：`codex plugin list --json` 返回已安装/可用插件结构化列表；远程 catalog 建议带缓存（#25457），加快 TUI 补全。配合 `plugins` feature stable，支持 Sites、Skills 等扩展。

### 适用场景

- CI 检查插件合规
- 脚本化批量安装
- 不适合：无网络环境拉 remote catalog

### 前置条件

- Codex 0.137.0+
- `features.plugins = true`

### 详细使用步骤

1. 配置 marketplace：`~/.codex/config.toml` 中 `[plugins]`
2. 运行 `codex plugin list`
3. 加 `--json` 管道给 `jq`
4. 加 `--available` 包含未安装项
5. 管理员用 JSON 输出做合规扫描

### 命令示例

```bash
# 基础
codex plugin list

# 进阶 — CI 合规检查
codex plugin list --json --available | jq '.plugins[] | select(.name=="sites")'

# 安装 Sites 插件（需登录）
codex plugin install sites
```

### 本地测试结果

```bash
./node_modules/.bin/codex plugin list --help
# 输出含 --json, --available 标志 ✅

./node_modules/.bin/codex plugin list --json
# 预期需 auth；无 key 时失败 ❌
```

### 问题与解决方案

1. **JSON 为空**：未配置 marketplace → 参考 [Codex Plugins 文档](https://developers.openai.com/codex/docs/plugins)
2. **重复插件**：#25681 修复 local/remote 去重；升级 0.137+

### 交叉验证：官方 changelog #25330 #25457 — ✅

---

## 特性四：并行 Standalone Web Search（0.137.0）

### 是什么

在 code-mode 流程中，**standalone web search** 可并行发起多路搜索（#25702）；hosted web/image 工具在更多 code-only 模式可见（#25890、#25923）。降低调研类任务总延迟。

### 适用场景

- 技术调研、多主题并行查文档
- 不适合： air-gapped 企业网络（network sandbox restricted）

### 前置条件

- 0.137.0+
- `standalone_web_search` feature（under development，可能需显式开启）

### 步骤

1. `codex features list | grep standalone_web_search`
2. 若需开启：`codex --enable standalone_web_search`
3. prompt 中要求「并行搜索 A、B、C 三个主题」
4. TUI 应显示多路 search activity（#24693）

### 示例

```bash
codex --enable standalone_web_search
# prompt: 「In parallel, search for: 1) OpenTelemetry Node SDK 2) Codex multi-agent docs 3) Claude fallbackModel」
```

### 本地测试

```bash
./node_modules/.bin/codex features list | grep standalone
# standalone_web_search                   under development  false
```

- ⚠️ feature 默认 false，未实测搜索
- ✅ help/features 一致

### 问题：搜索无结果 — 检查 network sandbox、`codex doctor` connectivity

### 交叉验证：官方 changelog — ✅

---

## 特性五：企业月度 Credit 额度展示（0.137.0）

### 是什么

Enterprise/admin 流程在 status 界面展示 **monthly credit limits**（#24812），与 ChatGPT 计费对齐，避免团队超支无感知。

### 适用场景

企业管理员与 Tech Lead 监控用量

### 步骤

1. 企业账号 `codex login`
2. TUI `/status` 或 App Profile 查看 credits
3. Admin 控制台设置月度上限

### 示例

```bash
codex
# 输入 /status
# 应显示 monthly credit limits（企业账号）
```

### 本地测试：❌ 无企业 auth

### 交叉验证：官方 + app-server docs — ✅

---

## 特性六：Codex Sites 插件（2026-06-02，本周延续）

### 是什么

**Sites** 在 Codex App 预览可用：通过 Sites 插件创建、保存、部署网站/仪表盘/内部工具。ChatGPT Business 默认包含；Enterprise 需 RBAC 开启。

### 管理员开启 SOP

1. Enterprise Admin → **Codex** → **Plugins** → 启用 **Sites**
2. RBAC：为 Developer 角色勾选 Sites 权限
3. 配置托管环境变量与 secrets（App 侧边栏 Sites → Environment）
4. 审计部署域名与白名单

### 业务用户使用 SOP

1. 打开 Codex App → 侧边栏 **Sites**
2. 安装/启用 Sites 插件：`codex plugin install sites`
3. 对话：「Create a landing page for our API docs with dark mode」
4. 预览 → Deploy → 在 Sites 面板管理 URL
5. 迭代：选中组件要求修改样式

### 命令示例

```bash
codex plugin install sites
codex
# 「Build an internal dashboard showing GitHub PR metrics, deploy to Sites」
```

### 本地测试：❌ 需 Codex App + 登录；CLI 0.137 仅支持 plugin 框架

### 问题与解决方案

1. **Sites 菜单不可见**：Business/Enterprise 权限未开 → 联系管理员
2. **部署失败**：检查 secrets 是否配置

### 交叉验证

- [developers.openai.com 2026-06-02 Sites](https://developers.openai.com/codex/changelog) — ✅
- 社区：OpenAI 官方 blog — ✅

---

## 特性七：0.138.0-alpha.6 Pre-release（2026-06-06）

### 是什么

6 月 6 日 alpha 构建，无公开 feature 列表，仅二进制与 npm 包 `codex-npm-0.138.0-alpha.6.tgz`。生产环境建议继续使用 **0.137.0 stable npm**。

### 安装 alpha（不推荐生产）

```bash
npm install @openai/codex@0.138.0-alpha.6
codex --version
```

### 本地测试

```bash
npm view @openai/codex versions --json | tail -5
# 含 0.138.0-alpha.6
```

- ✅ alpha 包存在于 npm registry
- ⚠️ `npm install @latest` 仍解析到 0.137.0

---

## 特性八：Amazon Bedrock 提供商（2026-06-01 延续）

### 是什么

Codex 可配置 Amazon Bedrock 为 model provider，用 AWS 身份与计费。

### 配置示例

```toml
[model]
provider = "bedrock"
# 配合 AWS_REGION / AWS_DEFAULT_REGION
```

### 本地测试：❌ 无 AWS 凭证

### 交叉验证：官方 2026-06-01 changelog — ✅

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest @openai/codex@latest

./node_modules/.bin/codex --version
# codex-cli 0.137.0

./node_modules/.bin/codex doctor
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail
# 主要 fail: auth, install path 不一致, terminal TERM=dumb

./node_modules/.bin/codex features list
# 27 enabled features 输出完整列表 ✅
```

| 项目 | 状态 |
|------|------|
| 版本号 | ✅ 0.137.0 |
| doctor | ✅ 可运行（无 auth） |
| features list | ✅ |
| plugin list --json | ⚠️ 需 auth |
| multi-agent 实跑 | ❌ 无 auth |

---

## 检索记录

- `developers.openai.com/codex/changelog` June 2026
- `github.com/openai/codex/releases` 2026-06-06
- `codex features list` 本地 2026-06-06
