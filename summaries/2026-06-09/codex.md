# OpenAI Codex 每日深度 — 2026-06-09

> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[developers.openai.com/codex/changelog](https://developers.openai.com/codex/changelog)  
> 本地实测：**codex-cli 0.139.0**（2026-06-09 发布）

---

## 版本概览

| 版本 | 日期 | 要点 |
|------|------|------|
| **0.139.0** | **2026-06-09** | Code mode Web 搜索、schema oneOf/allOf、doctor 增强、插件市场 JSON |
| 0.138.0 | 2026-06-08 | `/app` 移交 Desktop、图像路径暴露、goal 修复 |
| 0.137.0 | 2026-06-04 | 远程配对 RPC、插件 list --json、多 agent v2 |
| App 26.602 | 2026-06-04 | Profile 活动洞察、Computer Use 改进 |
| **Sites** | 2026-06-02 | 预览：Sites 插件建站 |

---

## 特性一：Code Mode 独立 Web 搜索（0.139.0）

### 是什么

Code mode 现可 **直接调用独立 Web 搜索工具**，包括从嵌套 JavaScript 工具调用中发起；结果以 **纯文本** 返回模型，无需先切 TUI 模式或外部 curl。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| Agent 脚本内查最新 API 文档 | 离线/air-gapped |
| code-only 流水线补全外部知识 | 企业禁止出站搜索 |

### 前置条件

- Codex CLI ≥ 0.139.0
- `codex login` 或有效 API Key
- feature flag `standalone_web_search`（0.139.0 changelog；`codex features list` 显示为 under development，以运行版本为准）

### 详细使用步骤

1. `npm install @openai/codex@0.139.0`
2. `codex login`
3. 启用/确认 code mode 配置（`~/.codex/config.toml`）
4. `codex exec "在 code mode 下搜索 OpenAI Responses API 2026-06 变更并总结"`
5. 检查输出是否含搜索引用片段

### 命令示例

```bash
# 基础
codex exec "使用 web 搜索查 @openai/codex 0.139.0 release notes 三条要点"

# 进阶：非交互 + 明确 code mode
codex -c 'features.code_mode=true' exec \
  "编写脚本读取 package.json 并搜索该依赖最新安全公告"
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex --version
codex-cli 0.139.0

$ ./node_modules/.bin/codex features list | grep standalone_web_search
standalone_web_search                under development  false
```

- ✅ 版本 0.139.0 已安装
- ❌ 无 auth，未执行真实搜索
- ⚠️ feature list 仍标 under development，与 changelog「已启用」存在展示滞后

### 问题与解决方案

| 错误 | 排查 |
|------|------|
| 搜索不可用 | `codex doctor`；确认未禁用网络沙箱 |
| 401 | `codex login` |
| 无搜索结果 | 检查企业策略是否禁用 web tools |

```bash
codex doctor --json
codex features list --all
```

### 交叉验证

- 官方 changelog 2026-06-09 ✅
- GitHub PR #26719 ✅

---

## 特性二：MCP 工具 Schema `oneOf` / `allOf` 保留（0.139.0）

### 是什么

工具与 connector 输入 schema 在压缩时 **保留 oneOf/allOf**，大 schema 多保留一层结构，提升富 MCP 工具兼容性。

### 使用步骤

1. 在 `~/.codex/config.toml` 配置 MCP server（含复杂 JSON schema）
2. `codex mcp list`
3. 启动 TUI `codex`，调用该 MCP 工具
4. 观察多分支参数是否被正确校验
5. 若失败：升级 0.139.0 前对比 0.138 行为

### 配置示例

```toml
# ~/.codex/config.toml 片段
[mcp_servers.my_api]
command = "npx"
args = ["-y", "my-mcp-server"]
```

### 本地测试

❌ 无 MCP server 实测；changelog #24118 #27084 已记录。

---

## 特性三：`codex doctor` 编辑器与分页器环境（0.139.0）

### 是什么

`codex doctor` 本地报告新增 **EDITOR/VISUAL/PAGER** 等环境诊断；`--json` 输出对原始值脱敏。

### 详细使用步骤

1. `codex doctor`
2. 查看 **Environment** 段 `EDITOR`、`VISUAL`
3. 若 TUI 分页异常，按建议设置 `export EDITOR=vim`
4. `codex doctor --json` 供 CI 采集（脱敏）

### 本地实测输出摘录

```text
Codex Doctor v0.139.0 · linux-x86_64
  EDITOR                   not set
  VISUAL                   not set
  TERM                     dumb
12 ok · 1 idle · 5 notes · 1 warn · 4 fail
```

- ✅ doctor 运行成功
- ❌ auth fail（预期）
- ⚠️ TERM=dumb 导致颜色与光标禁用

### 常见错误

| 问题 | 解决 |
|------|------|
| `TERM=dumb` | `export TERM=xterm-256color` |
| npm 路径分裂 | 统一使用 `npx @openai/codex` 或修正 PATH |

---

## 特性四：插件市场 `list --json` 含 source（0.139.0）

### 是什么

`codex plugin marketplace list --json` 返回每个市场的 **source**；`plugin list` 可先用远程缓存再后台刷新，降低等待。

### 管理员开启 SOP（Plugins / Marketplace）

1. 企业管理员在 ChatGPT Enterprise / Codex Admin 启用 **Plugins** 与 **Marketplace**
2. 配置允许的 marketplace URL 或 curated catalog
3. 下发 `config.toml` 或 cloud-managed config bundle（0.137+ 支持）
4. 开发者机器 `codex plugin marketplace add <url>`
5. 审计：`codex plugin marketplace list --json`

### 业务用户使用 SOP

1. `codex plugin list` 查看已装插件
2. `codex plugin install <name>` 安装团队批准插件
3. 在会话中用插件提供的 skills / MCP
4. 更新：`codex update`

### 命令示例

```bash
codex plugin marketplace list --json
codex plugin list --json
codex plugin install sites
```

### 本地测试

```bash
$ codex plugin marketplace list --json
# 失败：无 auth（预期）
```

❌ 需登录后实测 JSON 字段。

### 交叉验证

- changelog #27009 #26932 ✅

---

## 特性五：`resume --last` / `fork --last` 提示词解析修复（0.139.0）

### 是什么

`codex resume --last "继续修 bug"` 与 `codex fork --last "新方向"` 现在将 **尾部引号参数视为初始 prompt**，不再误判为 session ID。

### 使用步骤

1. 完成一次 `codex` 交互会话
2. `codex resume --last "在上次基础上添加单元测试"`
3. 确认进入最近会话且首条用户消息正确
4. `codex fork --last "改用 Rust 重写模块"` 应 fork 而非报 session 找不到

### 示例

```bash
codex resume --last "检查上次未提交的 diff 并写 commit message"
codex fork --last "仅重构 auth 包，不动其他目录"
```

### 本地测试

❌ 无历史 session DB（`~/.codex/state_5.sqlite` missing）。

---

## 特性六：沙箱与网络代理一致性（0.139.0）

### 是什么

沙箱执行保留已批准的 escalation 决策；配置的 **proxy-only** 网络策略执行更一致（#24981 #27035）。

### 使用步骤

1. 在 `config.toml` 设置 sandbox profile
2. `/debug-config`（TUI）查看 effective sandbox modes（0.139.0）
3. 触发需 escalation 的命令，批准一次后再次运行应记住决策
4. 企业 MITM：确认 CA bundle 导出到子进程

### 配置示例

```toml
[sandbox]
approval_policy = "on-request"
filesystem = "restricted"
network = "restricted"
```

```bash
codex sandbox run -- echo hello
codex -P restricted exec "npm test"
```

---

## 特性七：Codex Sites（2026-06-02 预览）

### 是什么

**Sites 插件**（Codex App 侧边栏）可创建、保存、部署网站/仪表盘/内部工具/小游戏，由 OpenAI 托管；管理环境变量与密钥。

### 管理员开启 SOP

1. **ChatGPT Business**：Sites 默认包含  
2. **ChatGPT Enterprise**：管理员在 RBAC 中为角色启用 Sites  
3. 批准 **Sites 插件** 出现在组织插件目录  
4. 配置组织级 secrets 策略（哪些 env 可注入站点）  
5. 审计已部署站点列表

### 业务用户使用 SOP

1. 打开 Codex App → 侧边栏 **Sites**
2. `codex plugin install sites`（CLI 侧若需）
3. 对话描述站点需求：「创建一个团队 OKR 仪表盘」
4. 在 Sites UI 管理 **环境变量 / secrets**
5. 一键 deploy → 获取托管 URL
6. 迭代：在同一 Site 项目继续对话修改

### 命令示例

```bash
codex plugin install sites
# 主要在 App UI 操作；CLI 用于关联同一线程
codex /app   # 0.138+ macOS/Windows 可移交 Desktop
```

### 本地测试

❌ 无 Codex Desktop GUI；官方 2026-06-02 公告已确认预览状态。

### 交叉验证

- https://developers.openai.com/codex/changelog （2026-06-02 Sites）✅

---

## 特性八：`/app` Desktop 移交（0.138.0，仍属活跃）

### 是什么

TUI 命令 `/app` 将当前 CLI 线程 **handoff 到 Codex Desktop**（macOS / 原生 Windows）。

### 使用步骤

1. CLI 中开发到需要 GUI 预览
2. 输入 `/app`
3. Desktop 打开同 thread 继续
4. Windows workspace 可 deep link 直开 Desktop

### 本地测试

❌ 无 Desktop。

---

## 特性九：Amazon Bedrock 提供商（2026-06-01）

### 是什么

Codex 可配置 **Amazon Bedrock** 为模型提供商，用 AWS 鉴权与账单。

### 配置步骤

1. 准备 Bedrock 上可用的 OpenAI 兼容模型访问
2. 编辑 `~/.codex/config.toml` 切换 `model_provider`
3. 配置 AWS credentials（环境变量或 profile）
4. `codex doctor` 验证 reachability
5. `codex exec "hello"`

### 示例

```toml
# 示意 — 以官方 Bedrock 文档为准
model_provider = "bedrock"
```

### 本地测试

❌ 无 AWS 凭证。

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @openai/codex@latest

./node_modules/.bin/codex --version
# codex-cli 0.139.0 ✅

./node_modules/.bin/codex doctor
# 12 ok, 4 fail (auth, TERM, npm prefix) ⚠️

./node_modules/.bin/codex features list
# 70+ flags ✅
```

| 项目 | 状态 |
|------|------|
| 版本 | 0.139.0 ✅ |
| auth | ❌ 未配置 |
| WebSocket | ⚠️ 401（无 token） |
| bundled rg | ✅ |

---

## 今日研究员结论

**0.139.0 是 6/9 最值得升级的 Codex 版本**：Code mode 搜索 + schema 修复直接改善「自动化脚本 + 富 MCP」场景。企业应同步检查 **Sites/Plugins RBAC** 与 **cloud config bundle**。无 auth 环境下务必先 `codex doctor` 再排查网络/沙箱，避免误判为版本回归。
