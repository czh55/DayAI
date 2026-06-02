# OpenAI Codex 每日深度 — 2026-06-02

- **本地实测版本**：`codex-cli 0.136.0`（`@openai/codex@latest` in `/workspace/tools`）
- **同日企业发布**：Sites（预览）、角色插件、Annotations — [OpenAI 博客 2026-06-02](https://openai.com/index/codex-for-every-role-tool-and-workflow/)
- **CLI 发布说明**：[GitHub rust-v0.136.0](https://github.com/openai/codex/releases/tag/rust-v0.136.0)

---

## 本地 CLI 实测总览

```bash
cd /workspace/tools
npm install @openai/codex@latest @anthropic-ai/claude-code@latest

./node_modules/.bin/codex --version
# codex-cli 0.136.0

./node_modules/.bin/codex doctor
# 12 ok · 1 warn · 4 fail — 主要 fail: auth、PATH 与全局 npm 不一致、TERM=dumb

./node_modules/.bin/codex features list
# plugins: stable=true, plugin_sharing: stable=true

./node_modules/.bin/codex plugin list
# No marketplace plugins found.

./node_modules/.bin/codex archive --help
# 正常显示 SESSION 参数说明
```

| 检查项 | 结果 |
|--------|------|
| 版本 | ✅ 0.136.0 |
| `doctor` | ⚠️ 无 `codex login`；WebSocket 401（缺 bearer） |
| `features list` | ✅ 退出码 0 |
| `plugin list` | ✅ 无 marketplace 配置时为空 |
| `sandbox setup` | ❌ Linux 上 `Failed to execvp setup`（Windows 专用路径） |
| 交互 TUI `/archive` | ❌ 未实测（无 auth + 非 TTY） |

---

## 特性 1：会话归档 `codex archive` / `codex unarchive`

### 是什么（机制说明）

0.136.0 起可将已保存会话 **归档**：归档后 **无法 resume/fork**，直至 `unarchive`。TUI 内可用 `/archive`；CLI 用 `codex archive <SESSION>`，其中 SESSION 为 UUID 或会话名（UUID 解析优先）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 清理已完成实验会话 | 仍需继续的活跃 thread |
| 合规保留但禁止误恢复 | 把归档当「删除」且不备份 |

### 前置条件

- Codex CLI 0.136.0+  
- 已存在可识别的 saved session（需先有过交互会话）  
- 已 `codex login`（归档写入状态 DB）

### 详细使用步骤

1. `codex login` 完成认证  
2. `codex` 交互创建会话，或 `codex exec` 产生可恢复会话  
3. 记下 session id：`codex resume` 选择器或状态目录  
4. 执行：`codex archive <session-id>`  
5. 验证：`codex resume` 中该会话不可选或提示已归档  
6. 恢复：`codex unarchive <session-id>`

### 命令与配置示例（基础）

```bash
cd /workspace/tools
./node_modules/.bin/codex archive 00000000-0000-0000-0000-000000000001
```

### 命令与配置示例（进阶）

```bash
# 按会话名归档（当名称唯一且非 UUID 形态时）
./node_modules/.bin/codex archive my-feature-auth-refactor

# 归档后尝试 resume 应失败（预期行为）
./node_modules/.bin/codex resume --last
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex archive --help
Archive a saved session by id or session name
Usage: codex archive [OPTIONS] <SESSION>
```
✅ help 可用；**未执行真实归档**（`~/.codex/state_5.sqlite` missing，doctor 报告无历史 rollout）

### 问题与解决方案

| 问题 | 排查 | 解决 |
|------|------|------|
| `SESSION not found` | `ls ~/.codex` 与 resume 列表 | 确认 id；先创建会话 |
| 归档后仍能 resume | 版本 < 0.136 | `npm install @openai/codex@latest` |
| 无状态 DB | `codex doctor` → state DB missing | 先完成一次登录交互 |

### 官方 vs 社区

- [GitHub Release 0.136.0](https://github.com/openai/codex/releases/tag/rust-v0.136.0) — ✅  
- [Releasebot](https://releasebot.io/updates/openai/codex) — ✅ 一致

### 利弊 + 建议

- **利**：防误恢复旧上下文；列表更干净  
- **弊**：归档≠删除，敏感内容仍在磁盘  
- **建议**：周度把完成项归档；合规环境配合磁盘加密

---

## 特性 2：TUI Markdown — OSC 8 可点击链接与紧凑表格

### 是什么

终端富文本渲染改进：**网页链接** 带 OSC 8 超链接元数据可点击；**拥挤表格** 转为可读 **key-value** 记录且保留链接目标。

### 适用场景

适合：在终端读 Agent 输出的文档链接、参数表。不适合：不支持 OSC 8 的极简终端（链接可能退化为纯文本）。

### 前置条件

- Codex 0.136.0 TUI  
- 终端支持 OSC 8（iTerm2、WezTerm、Windows Terminal 等新版本）

### 详细使用步骤

1. 设置 `export TERM=xterm-256color`（doctor 建议，本环境曾为 `dumb`）  
2. `codex` 进入 TUI  
3. 让 Agent 输出含 URL 与 Markdown 表格的说明  
4. 用终端 Cmd/Ctrl+点击链接验证  
5. 窄窗口下观察表格是否变为 key-value

### 本地测试结果

```bash
$ echo $TERM
dumb
```
doctor：✗ terminal — **本环境颜色与光标控制禁用** ⚠️  
OSC 8 点击 ❌ 未实测

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 链接不可点 | `export TERM=xterm-256color`；换终端 |
| NO_COLOR=1 | 取消 `NO_COLOR` 以改善可读性（非必须可点） |

### 官方 vs 社区

Release notes #24472 #24636 — 与 Releasebot 摘要 **一致** ✅

---

## 特性 3：`codex app-server --stdio` 与线程恢复分页

### 是什么

**App-server** 面向 IDE/集成：0.136.0 支持 `codex app-server --stdio` 作为 stdio 模式别名；resume thread 时可带 **初始 turns 页**；MCP server 状态信息更丰富。

### 适用场景

适合：自建 IDE 插件、长期守护进程。不适合：只想偶尔问一句的开发（直接 `codex` TUI 即可）。

### 前置条件

- Codex 0.136.0+  
- 理解 app-server 为 **experimental**

### 详细使用步骤

1. `codex app-server --help` 查看子命令  
2. 启动：`codex app-server --stdio`（由父进程通过 stdin/stdout 驱动）  
3. 客户端按 app-server 协议发送 resume，请求 turns page  
4. `codex doctor` 查看 **Background Server** 段是否 running  
5. 生产集成参考 exec-server / app-server 文档（release 称已更新）

### 命令示例

```bash
./node_modules/.bin/codex app-server --help
./node_modules/.bin/codex app-server --stdio
```

### 本地测试结果

`app-server --help` ✅ 显示 `daemon`, `proxy`, `generate-ts` 等；**未启动长驻 stdio 服务**（无集成客户端）

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| daemon not running | `codex app-server daemon` 子命令（见 help） |
| 协议版本不匹配 | 锁定 codex 版本与 TS binding 生成版本 |

### 官方 vs 社区

GitHub release + Releasebot — ✅

---

## 特性 4：远程执行 `CODEX_API_KEY` 与 server token

### 是什么

远程 **exec-server** 注册现支持用 **`CODEX_API_KEY`** 向批准的 OpenAI host 认证；**remote-control WebSocket** 改用 **短生命周期 server token**，而非长期 ChatGPT access token（降低泄露面）。

### 适用场景

适合：企业自建远程执行节点、CI 远程 runner。不适合：把 API key 提交进 Git。

### 前置条件

- 组织批准的主机与 key 发放流程  
- Codex 0.136.0+

### 详细使用步骤

1. 管理员在 OpenAI 控制台/企业流程创建 **CODEX_API_KEY**  
2. 在远程主机 `export CODEX_API_KEY=sk-...`（勿写入仓库）  
3. 按 [exec-server 文档](https://developers.openai.com/codex/) 注册节点  
4. 本地 `codex` 配置 remote 地址连接  
5. 验证 remote-control 使用 server token（抓包应见短效 token 轮换）

### 配置示例

```bash
export CODEX_API_KEY="your-server-key-from-admin"
export CODEX_HOME="$HOME/.codex"
./node_modules/.bin/codex exec-server --help
```

### 本地测试结果

❌ 未实测远程注册（无企业 key）。`doctor` Connectivity：WebSocket **401 Missing bearer** — 符合无 key 预期 ✅

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 401 Unauthorized | 检查 key 环境变量名是否为 `CODEX_API_KEY` |
| 仍用 ChatGPT token | 升级到 0.136+ 并迁移集成 |

### 官方 vs 社区

Release #24666 #24141 — VentureBeat/Releasebot 未否定 — ✅

---

## 特性 5：CLI 插件管理 `codex plugin`

### 是什么

插件将 **skills、ChatGPT apps、MCP servers** 打包为可安装单元。CLI 提供 `codex plugin add/list/marketplace/remove`；TUI 内 `/plugins` 浏览。`features list` 显示 `plugins` 与 `plugin_sharing` 为 **stable**。

### 适用场景

安装 Slack/Gmail/Security 等 curated 插件；团队通过 marketplace 共享自研插件。

### 前置条件

- 已配置 plugin marketplace（否则 `plugin list` 为空）  
- ChatGPT 账户与 workspace 权限（部分 app 需 OAuth）

### 详细使用步骤（用户）

1. `codex login`  
2. 运行 `codex`，输入 `/plugins` 或 CLI：`codex plugin marketplace` 添加源  
3. `codex plugin list` 浏览  
4. 选择 Install，完成 OAuth  
5. 新 thread 中 `@插件名` 或自然语言「用 Slack 插件总结今日未读」  
6. 禁用：`~/.codex/config.toml` 设 `enabled = false` 后重启

### 命令示例（基础）

```bash
./node_modules/.bin/codex plugin --help
./node_modules/.bin/codex plugin list
```

### 命令示例（进阶）

```bash
./node_modules/.bin/codex plugin marketplace add https://github.com/your-org/codex-marketplace.git
./node_modules/.bin/codex plugin add security@openai-curated
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex plugin list
No marketplace plugins found.
```
✅ 命令正常；⚠️ 未配置 marketplace，与预期一致

`config.toml` 禁用示例（官方文档）：

```toml
[plugins."gmail@openai-curated"]
enabled = false
```

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 列表为空 | `plugin marketplace add` |
| 安装后无 skill | 新开会话 thread；检查 enabled |

### 官方 vs 社区

[developers.openai.com/codex/plugins](https://developers.openai.com/codex/plugins) 与 VentureBeat 62 apps — **范围一致**（企业插件包）

---

## 特性 6：Sites（预览）— 管理员开启 SOP

### 是什么

**Sites** 让 Codex 将想法/分析变为 **OpenAI 托管** 的交互式 Web 应用（仪表盘、规划器、看板等），通过 **workspace URL** 分享。Business 默认包含；**Enterprise 需 RBAC 开启**。

### 适用场景

企业内：财务情景模拟、发布 hub、客户健康看板。不适合：须完全自建托管、数据不出 OpenAI 区域的合规场景（需法务评估）。

### 前置条件（管理员）

- ChatGPT **Enterprise**（或 Business，按官方）  
- Codex **App** 可用  
- 管理员 access 到 ChatGPT / Codex admin settings

### 管理员开启 SOP（逐步）

1. 登录 ChatGPT **Enterprise Admin** / Workspace 设置  
2. 导航至 **Codex** 或 **Apps** 相关 **Admin settings**（名称以控制台为准，官方称 “enable sites in admin settings”）  
3. 找到 **Sites** 预览开关 → **Enable**  
4. 在 **RBAC** 中为角色勾选可使用 Sites 的成员组（如 Finance、PM，避免全员默认）  
5. 配置 **托管环境变量与 secrets** 策略（Sites 侧栏可管理 secrets — Releasebot）  
6. 记录审计：谁可部署、URL 是否仅限 workspace  
7. 通知用户安装 **Sites 插件**（插件目录中 “Install Sites”）  
8. 试点：指定 1 个团队创建测试 Site，验证 URL 权限  
9. 发布内部政策：禁止在 Sites 放 PII/生产密钥  
10. 监控用量与 OpenAI 数据条款更新

### 业务用户使用 SOP

见 **特性 7**。

### 本地测试结果

❌ 未实测 — 需 Enterprise/Business 登录与 Codex App。CLI 0.136.0 **不包含** `codex sites` 子命令；官方称 Sites **经 Codex App + Sites 插件**，与 [VentureBeat](https://venturebeat.com/orchestration/openais-codex-update-lets-agents-build-interactive-enterprise-workspaces-via-sites-and-role-specific-plugins) **一致** ✅

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 侧栏无 Sites | 管理员是否开启 RBAC |
| 同事无法打开 URL | 同 workspace；检查分享范围 |

### 建议

管理员先 **小范围 RBAC**；工程师负责 secrets 轮换，业务用户只改业务参数。

---

## 特性 7：Sites — 业务用户使用 SOP

### 前置条件

- 管理员已开启 Sites（特性 6）  
- 已安装 **Sites 插件**  
- 有 Codex App 访问权

### 详细使用步骤

1. 打开 **Codex App**（桌面或网页，以组织部署为准）  
2. 侧栏进入 **Sites**（或 Open Sites）  
3. 新建项目：用自然语言描述，例如：「把附件这份 Q2 销售 CSV 做成可筛选仪表盘，按区域汇总」  
4. 根据提示连接数据源（若需 Google Sheets / Drive，完成 OAuth）  
5. 预览生成应用，在 App 内点击 **Deploy**（或等价动作）  
6. 复制 **workspace URL** 发给同事  
7. 同事浏览器打开 URL，调整假设参数（如情景规划滑块）  
8. 数据变更时在同一 thread 说：「用最新 CSV 更新 Site」  
9. 不再使用时在 Sites 侧栏 **归档或删除** 项目  
10. 敏感迭代改用 **Annotations** 就地改 UI 文案而非重建

### 命令与配置示例

Sites 以 App 为主；CLI 用户可在安装 Sites 插件后于 TUI 请求：

```text
@Sites 创建一个内部工具：展示我们团队本周 Jira 燃尽图，数据来自只读 API（勿硬编码 key）
```

### 本地测试结果

❌ 未实测（无 Business/Enterprise 租户）

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 部署失败 | 检查 secrets 是否在 Sites 环境变量页配置 |
| 数据过期 | 明确让 Codex「定时刷新」或配合 Automation |

### 官方 vs 社区

[OpenAI 博客](https://openai.com/index/codex-for-every-role-tool-and-workflow/) 与 VentureBeat — ✅

---

## 特性 8：角色插件（Plugins）— 管理员开启 SOP

### 是什么

2026-06-02 发布 **6 个角色向插件**（工程、产品、设计、销售等），捆绑 **62** 个企业应用与 **110** skills，把 Codex 变成跨 SaaS 的编排层。

### 管理员 SOP

1. Enterprise Admin → **Workspace settings** → **Apps / Codex plugins**  
2. 审查默认开放的 **OpenAI curated** 与 **role-specific** 插件列表  
3. 按部门启用/禁用插件（避免销售组安装过多工程向 MCP）  
4. 在 **RBAC** 映射：谁可安装新插件、谁只能使用已批准插件  
5. 配置底层 **ChatGPT Connector / App permissions**（Salesforce、Snowflake 等）  
6. 发布内部文档：哪些客户数据可进 Codex thread  
7. 可选：搭建 **团队 marketplace Git 仓库**，`codex plugin marketplace add` 分发内部插件  
8. 安全评审：启用 **Codex Security** 插件扫描自研代码  
9. 审计：定期 `plugin list` 导出（需自建脚本调用 CLI）  
10. 培训：见下方用户 SOP

### 业务用户使用 SOP

1. 打开 Codex App 或 CLI `codex` → `/plugins`  
2. 浏览 **Curated by OpenAI** → 选择本角色插件（如 Product、Finance）→ **Install**  
3. 按提示连接 Slack、Drive、Salesforce 等（组织已批准的应用）  
4. 新开 **thread**（安装后必须新 thread）  
5. **基础用法**：直接说结果 — 「总结今日 #product 频道未读并标优先级」  
6. **进阶用法**：`@插件名` 或 `@skill名` 显式指定  
7. 若需停用但保留安装：`~/.codex/config.toml` 设 `enabled = false`  
8. 卸载：插件浏览器 → Uninstall（ChatGPT 侧 app 可能仍需单独管理）  
9. 遇权限弹窗：阅读 tool 请求，拒绝不明 MCP 写操作  
10. 跨插件协作：「用 Finance 插件拉 Stripe MRR，再用 Sheets 插件写回表格」

### CLI 示例（基础 + 进阶）

```bash
# 基础
codex
/plugins

# 进阶：命令行添加市场并安装（需市场 URL）
codex plugin marketplace add https://github.com/openai/codex-plugins.git
codex plugin add finance-role@openai-curated
```

### 本地测试结果

`codex plugin --help` ✅；`plugin list` 空 ⚠️ 无 market；App 内安装 ❌ 未测

### 官方 vs 社区

[Plugins 文档](https://developers.openai.com/codex/plugins) + VentureBeat 62 apps — ✅

### 建议

**管理员**默认最小权限；**业务用户**优先用角色插件而非裸 MCP；**工程师**维护内部 marketplace。

---

## 特性 9：Windows `codex sandbox setup --elevated`（alpha）

### 是什么

Windows 管理员可用提升权限路径配置沙箱；并支持限制允许的 Windows sandbox 实现。

### 本地测试结果

在 **Linux** 运行 `codex sandbox setup` 触发 panic：`Failed to execvp setup` ❌ 预期行为；**未实测 Windows**。

### 未实测原因 + 官方 SOP

- 原因：当前 VM 为 Ubuntu，非 Windows。  
- 官方：在 **提升权限的 PowerShell** 运行 `codex sandbox setup --elevated`（release #24831）。  
- 社区坑点：企业 GPO 可能阻止 sandbox 驱动；需 allowlist 实现类型。

---

## 特性 10：Python SDK `pip install openai-codex`

### 是什么

0.136.0 文档与包元数据统一 **`pip install openai-codex`** 路径；公开类型名 `CodexConfig` 配置 `Codex` / `AsyncCodex`。

### 示例（未在本仓库执行 pip 安装）

```bash
pip install openai-codex
python -c "from openai_codex import Codex, CodexConfig; print(CodexConfig())"
```

本地：❌ 未实测 Python 包（仅 npm CLI）。

---

## 参考链接

- https://github.com/openai/codex/releases/tag/rust-v0.136.0  
- https://developers.openai.com/codex/plugins  
- https://openai.com/index/codex-for-every-role-tool-and-workflow/  
- https://venturebeat.com/orchestration/openais-codex-update-lets-agents-build-interactive-enterprise-workspaces-via-sites-and-role-specific-plugins  
