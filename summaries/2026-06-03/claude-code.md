# Claude Code 每日深度 — 2026-06-03

- **本地版本**：`2.1.161`（`npm install @anthropic-ai/claude-code@latest`）
- **上游发布**：v2.1.161（2026-06-02 UTC）、v2.1.160（同日，含 ultracode 重命名）
- **交叉验证**：[GitHub CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)、[Release v2.1.161](https://github.com/anthropics/claude-code/releases/tag/v2.1.161)、[ClaudeUpdates.dev](https://www.claudeupdates.dev/version/2.1.161)

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest
./node_modules/.bin/claude --version
# 2.1.161 (Claude Code)

./node_modules/.bin/claude --help | wc -l
# 209

./node_modules/.bin/claude agents --json
# []

./node_modules/.bin/claude mcp list
# No MCP servers configured. Use `claude mcp add` to add a server.
```

| 命令 | 结果 |
|------|------|
| `--version` | ✅ 2.1.161 |
| `--help` | ✅ 209 行，含 `--bare`、`--effort`、`--agent` 等 |
| `agents --json` | ✅ 空列表（无后台会话） |
| `mcp list` | ✅ 无泄露密钥（无配置服务器） |
| 实际对话 / OAuth | ❌ 未实测 — 环境无 `ANTHROPIC_API_KEY` |

---

## 特性 1：并行工具调用 — 单条 Bash 失败不再取消同批其他调用（2.1.161）

### 是什么（机制说明）

在 **同一轮** 中 Claude 可并行发起多个工具调用（如同时 `Read` 三个文件 + 一个 `Bash`）。旧行为：若其中一个 **Bash 退出码非 0**，整批并行调用可能被 **整体取消**，导致无关工具结果丢失。2.1.161 改为 **各工具独立返回结果**，失败 Bash 仅影响自身条目，不拖垮同批只读操作。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 批量测试 + 并行读文件（部分测试失败仍需日志） | 强依赖「全有或全无」事务脚本（应单条 Bash 内用 `set -e`） |
| CI 式 `claude -p` 非交互流水线 | 需要原子回滚的多步写操作（应串行或显式锁） |

### 前置条件

- Claude Code **≥ 2.1.161**
- 模型支持 parallel tool use（Opus 4.8 / Sonnet 等，以账号为准）
- 非 `--bare` 或已按 bare 文档显式提供工具策略

### 详细使用步骤

1. 升级：`cd /workspace/tools && npm install @anthropic-ai/claude-code@latest`
2. 确认版本：`./node_modules/.bin/claude --version` → `2.1.161`
3. 在仓库内启动：`./node_modules/.bin/claude`（或已登录环境）
4. 提示词示例：「并行读取 `src/a.ts` 和 `src/b.ts`，并运行 `npm test`」
5. 人为制造失败：在测试中保留一个失败用例
6. 观察：读文件结果仍应出现在 transcript，而非整轮报错中断
7. 非交互验证：`claude -p "..." --output-format json` 检查 `tool_result` 数组条数

### 命令与配置示例

```bash
cd /workspace/your-repo
export ANTHROPIC_API_KEY="sk-ant-..."   # 或已 claude login

/workspace/tools/node_modules/.bin/claude -p \
  "Read package.json and README.md in parallel, then run npm test. Report all outputs even if tests fail." \
  --output-format json
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 版本号 | ✅ 2.1.161 |
| 带 API 的并行失败场景 | ❌ 未实测 — 无 API Key |
| CHANGELOG 与 Release 描述 | ✅ 一致 |

### 问题与解决方案

| 错误现象 | 排查 | 解决 |
|----------|------|------|
| 仍整批失败 | 版本 `< 2.1.161` | 升级并重开会话 |
| JSON 中缺某工具结果 | 检查是否为模型未发起并行 | 在 prompt 中要求 parallel |
| `-p` 输出混乱 | 可能与 2.1.161 另一修复「后台子代理污染 stdout」混淆 | 升级后重试；见特性 2 |

### 官方 vs 社区交叉验证

- [CHANGELOG 2.1.161](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) — ✅  
- [ClaudeUpdates 分析](https://www.claudeupdates.dev/version/2.1.161) 归类为 Agentic 可靠性 — ✅ 一致  

### 利弊 + 分角色建议

- **利**：减少误杀、提高自动化脚本鲁棒性  
- **弊**：部分失败可能被忽略，需 prompt 要求「汇总所有错误」  
- **个人开发者**：在 refactor 任务中默认开启并行读  
- **团队**：在 CI 用 `-p` 时配合 `jq` 解析每条 `tool_result`  
- **企业合规**：失败 Bash 仍应记入 OTEL（见特性 5）

---

## 特性 2：`claude mcp` 密钥脱敏与 `${VAR}` 不展开（2.1.161）

### 是什么

`claude mcp list` / `get` / `add` 曾在终端 **打印展开后的密钥** 或 **未脱敏的 Header/URL secret**。2.1.161 对 `${VAR}` **不再展开**，并对 credential headers、URL secrets **打码显示**，降低 shoulder-surfing 与 CI 日志泄露风险。

### 适用场景

适合：团队共享屏幕演示、CI 打印配置审计。不适合：替代密钥管理（仍应用 Vault/环境变量注入）。

### 前置条件

- Claude Code ≥ 2.1.161  
- 已配置 MCP 服务器（`claude mcp add`）

### 详细使用步骤

1. 添加测试 MCP（stdio 示例）：  
   `claude mcp add demo --command npx --args -y @modelcontextprotocol/server-filesystem /tmp`
2. 运行 `claude mcp list` 与 `claude mcp get demo`
3. 若配置含 `Authorization: Bearer ${MY_TOKEN}`，确认输出为 **脱敏** 而非明文
4. 在 CI 中捕获日志，确认无 secret 泄漏
5. 需要真正取值时，仅在运行进程环境变量中设置，不依赖 CLI 打印

### 命令与配置示例

```bash
# 示例：HTTP MCP 使用环境变量（勿把真实 key 写入仓库）
export GITHUB_PAT="ghp_xxxxxxxx"
claude mcp add github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer \${GITHUB_PAT}"

claude mcp list
claude mcp get github
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 无 MCP 时 `mcp list` | ✅ 无密钥输出 |
| 含 secret 的 MCP 配置 | ❌ 未实测 — 未配置带密钥服务器 |

### 问题与解决方案

| 现象 | 排查 | 解决 |
|------|------|------|
| MCP 连接失败 | 环境变量未注入 | `export` 后重启 `claude` |
| 仍看到明文 | 旧版本 | `claude --version` ≥ 2.1.161 |
| 无法复制配置 | 故意脱敏 | 从密码管理器或 IaC 源读取 |

### 官方 vs 社区

- GitHub Release 2.1.161 — ✅  
- ClaudeUpdates 列为「MCP Security」主题 — ✅  

### 建议

**安全管理员**：将 `claude mcp list` 纳入允许运行的只读审计命令；**禁止**在录屏中运行旧版 CLI。

---

## 特性 3：Dynamic Workflows 触发词改为 `ultracode`（2.1.160）

### 是什么

**Dynamic Workflows**（原 `/workflows` 编排多代理后台任务）此前可用提示词中的 **`workflow`** 关键字触发；2.1.160 起 **仅 `ultracode`** 作为高亮触发词，普通英文 “workflow” **不再自动触发**，避免误启动大规模代理编排。仍可用自然语言请求工作流。`/effort ultracode` 在模型不支持 xhigh 时不再误报为「动态工作流未开启」。

### 适用场景

适合：大型迁移、全库审计、多模块并行重构（需 Opus 4.8 + 高 effort）。不适合：小改动、无预算的长时编排。

### 前置条件

- Claude Code ≥ 2.1.160  
- 账号支持 **Dynamic Workflows**（研究预览，企业/Max 策略以官方为准）  
- 模型支持 **xhigh/max effort**（`/effort` 菜单可见）

### 详细使用步骤

1. 升级至 2.1.161（包含 2.1.160 行为）
2. 在交互会话输入包含 **`ultracode`** 的指令（词在输入框内 **紫色高亮** 表示识别）
3. 或：`/effort` 选择 **ultracode** / xhigh（视模型）
4. 运行中：`/workflows` 查看后台运行
5. 完成后审查各子代理 diff，勿盲目 merge

### 命令与配置示例

```bash
# 非交互仅适合简单任务；ultracode 建议交互式
claude
# 在 TUI 输入：
# ultracode：将本 monorepo 从 Jest 迁移到 Vitest，分模块提交 PR 计划
```

### ultracode Prompt 模板 1：安全审计

```text
ultracode：对本仓库做安全审计。范围：依赖漏洞（npm audit）、硬编码密钥、危险 eval、CI 密钥泄露。
输出：按 P0/P1/P2 分级的问题清单 + 每个问题的文件路径与修复补丁建议。
约束：不要修改生产配置文件；只读扫描优先，必要时在 worktree 内验证。
```

### ultracode Prompt 模板 2：框架迁移

```text
ultracode：将 packages/api 从 Express 4 迁移到 Fastify 5。
步骤：先出迁移计划与子 PR 列表 → 逐包实现 → 每步跑测试。
隔离：每个子任务使用独立 git worktree（若 settings 启用 isolation）。
交付：迁移指南 markdown + 通过 CI 的 PR 描述草稿。
```

### ultracode Prompt 模板 3：技术调研

```text
ultracode：调研「本仓库是否适合引入 OpenTelemetry 2.x」。
对比：现状埋点、依赖树、CI 体积、与 Claude Code OTEL 变量兼容性。
交付：决策备忘录（采纳/暂缓/拒绝）+ 若采纳则 3 天 POC 任务拆分。
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `ultracode` 触发 UI | ❌ 未实测 — 无 OAuth |
| CHANGELOG 2.1.160 | ✅ |

### 问题与解决方案

| 现象 | 排查 | 解决 |
|------|------|------|
| 输入 workflow 无反应 | 预期行为 | 改用 `ultracode` 或自然语言描述 |
| 提示不支持 xhigh | 模型/区域限制 | 换 Opus 4.8 或降 effort |
| 子代理占满配额 | `/workflows` 查看 | `claude agents` 停止多余会话 |

### 官方 vs 社区

- [CHANGELOG 2.1.160](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) — ✅  
- [code.claude.com docs](https://code.claude.com/docs) — 建议对照 Dynamic Workflows 页（本地未抓全站）  

### 建议

**个人**：先用单代理验证命令，再 ultracode 扩大范围。**企业**：在 managed settings 中限制 `ultracode` 仅技术负责人账号。

---

## 特性 4：企业登录策略不再阻断 Bedrock / Vertex / Foundry（2.1.161）

### 是什么

当管理员配置 **`forceLoginOrgUUID`** / **`forceLoginMethod`** 强制组织登录时，2.1.146 回归会导致 **第三方推理提供商**（AWS Bedrock、Google Vertex、Microsoft Foundry、Mantle）会话被误拦。2.1.161 修复：**组织 pin 与第三方 provider 可并存**。

### 适用场景

适合：企业统一 Anthropic 账单 + 部分团队用 Bedrock 私有 VPC。不适合：试图用个人账号绕过组织策略（仍受 managed settings 约束）。

### 前置条件

- Claude Code 2.1.161  
- 已配置对应云厂商凭证（如 `AWS_REGION`、`GOOGLE_APPLICATION_CREDENTIALS`）  
- Auto mode（2.1.158+）：`CLAUDE_CODE_ENABLE_AUTO_MODE=1` 用于 Bedrock/Vertex/Foundry 上 Opus 4.7/4.8

### 详细使用步骤

1. 升级 CLI  
2. 设置云凭证（Bedrock 示例）：  
   `export AWS_REGION=us-east-1`  
   `export CLAUDE_CODE_USE_BEDROCK=1`（以官方 Bedrock 文档为准）  
3. 若需 Auto mode：`export CLAUDE_CODE_ENABLE_AUTO_MODE=1`  
4. 启动 `claude`，`/status` 确认 provider  
5. 组织用户：确认不再出现「必须仅 Anthropic 登录」误报

### 命令与配置示例

```bash
export CLAUDE_CODE_ENABLE_AUTO_MODE=1
export AWS_REGION=us-east-1
# 按 https://code.claude.com/docs 配置 Bedrock 模型 ID

claude --model claude-opus-4-8-20260201
```

### 本地测试结果

❌ 未实测 — 无 Bedrock/企业 org pin 环境。CHANGELOG + Release — ✅。

### 问题与解决方案

| 现象 | 排查 | 解决 |
|------|------|------|
| 仍无法连接 | 凭证/区域 | `aws sts get-caller-identity` |
| Auto mode 不可用 | 未设 env | `CLAUDE_CODE_ENABLE_AUTO_MODE=1` |
| 组织策略冲突 | IT 下发的 managed-settings.json | 联系管理员更新策略版本 |

### 建议

**云架构师**：在 IaC 中固定 region 与 model ARN；**开发者**：本地用 `claude doctor` 等价检查 `/status`。

---

## 特性 5：OTEL `OTEL_RESOURCE_ATTRIBUTES` 进入指标标签（2.1.161）

### 是什么

OpenTelemetry 导出时，`OTEL_RESOURCE_ATTRIBUTES`（如 `team=platform,repo=dayai`）中的键值现会作为 **metric datapoint labels**，便于在 Grafana/Datadog 按团队/仓库切片 Claude Code 用量。

### 适用场景

适合：平台工程团队统一观测；不适合：无 OTEL 收集器的小项目（可跳过）。

### 前置条件

- 2.1.161+  
- 配置 OTEL exporter（`OTEL_EXPORTER_OTLP_ENDPOINT` 等，见官方 observability 文档）  
- 2.1.161 另修复：telemetry 初始化前发出的 log events 不再 **静默丢弃**

### 详细使用步骤

1. 在 shell profile 或 CI 设置：  
   `export OTEL_RESOURCE_ATTRIBUTES="team=ai-platform,repo=dayai,env=ci"`  
2. 启用 log 详情（可选）：`export OTEL_LOG_TOOL_DETAILS=1`  
3. 运行 `claude -p "..."` 或交互会话  
4. 在指标后端查询 `team` / `repo` 标签  
5. 验证 2.1.161 之前缺失的 `user_prompt` 等 log 是否出现

### 命令与配置示例

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_RESOURCE_ATTRIBUTES="service.name=claude-code,team=platform"
export OTEL_LOG_TOOL_DETAILS=1

cd /workspace && /workspace/tools/node_modules/.bin/claude -p "Run git status" --output-format json
```

### 本地测试结果

❌ 未实测 — 无 OTLP collector。CHANGELOG — ✅。

### 问题与解决方案

| 现象 | 排查 | 解决 |
|------|------|------|
| 无标签 | 属性格式错误 | 使用 `key=value` 逗号分隔 |
| 仍无早期 log | 旧版本 | 升级 2.1.161 |
| 敏感信息泄露 | `OTEL_LOG_TOOL_DETAILS` | 生产环境关闭或脱敏 |

### 建议

**SRE**：把 Claude Code 与 CI runner 标签对齐；**合规**：禁止在 attributes 中放用户 PII。

---

## 特性 6：Linux 全屏剪贴板 `wl-copy` / `xclip` / `xsel`（2.1.161）

### 是什么

全屏 TUI 模式下，复制选中内容时优先调用 Linux 剪贴板工具，并同时写入 **PRIMARY** selection（中键粘贴）。终端提示的「按住某键原生选择」会根据终端类型显示 **正确按键名**。

### 适用场景

适合：Linux 桌面 + Wayland/X11 开发者。不适合：纯 SSH 无 DISPLAY（OSC 52 回退）。

### 前置条件

- 2.1.161  
- 安装 `wl-copy`（Wayland）或 `xclip`/`xsel`（X11）之一

### 详细使用步骤

1. `sudo apt install wl-clipboard` 或 `xclip`  
2. `claude` 进入全屏（按官方键位）  
3. 鼠标选中输出，使用复制快捷键  
4. 在中键粘贴目标验证 PRIMARY  
5. VS Code 集成终端乱码时运行 `/terminal-setup` 或禁用 GPU 加速（同版本 VSCode tip）

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud VM `TERM=dumb` | ⚠️ 非真实终端，未测剪贴板 |
| CHANGELOG | ✅ |

### 问题与解决方案

| 现象 | 解决 |
|------|------|
| 复制无效 | 安装 `wl-clipboard` |
| WSL 复制失败 | 2.1.160 已改 PowerShell 互操作，见 CHANGELOG |

### 建议

**Linux 桌面用户**：升级后立刻验证复制链路；**远程 SSH**：继续用 OSC 52 或 `claude -p` 重定向文件。

---

## 版本对照与升级命令

| 版本 | 日期 | 要点 |
|------|------|------|
| 2.1.161 | 2026-06-02 | 并行工具、MCP 脱敏、OTEL、Bedrock 登录修复 |
| 2.1.160 | 2026-06-02 | ultracode、shell 启动文件写入前确认 |
| 2.1.158 | 更早 | Bedrock/Vertex/Foundry Auto mode |

```bash
# 推荐安装方式（npm 已标注 deprecated，生产用官方 install.sh）
curl -fsSL https://claude.ai/install.sh | bash
# 本仓库实测仍可用：
cd /workspace/tools && npm install @anthropic-ai/claude-code@latest
```

**未实测原因汇总**：Cloud Agent 无 Anthropic OAuth/API Key、无 Bedrock 角色、无 Dynamic Workflows 企业开关；行为以官方 CHANGELOG + Release 为准，建议在具备密钥的环境复现「并行 Bash + MCP list」两项即可验证 2.1.161 核心价值。
