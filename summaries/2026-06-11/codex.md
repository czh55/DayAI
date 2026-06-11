# OpenAI Codex 每日深度 — 2026-06-11

> 官方源：[developers.openai.com/codex/changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)  
> 本地实测：**codex-cli 0.139.0**（2026-06-09 稳定版）  
> 2026-06-11：GitHub 仅有 **0.140.0-alpha.\*** 预发布，无新 stable tag

---

## 今日总览

稳定通道最新为 **v0.139.0**（6/9）。核心增量：**Code mode 独立 Web 搜索**、**MCP 工具 schema 保留 `oneOf`/`allOf`**、**`codex doctor` 增强编辑器/分页器诊断**、**插件市场 JSON 含 source**、**`resume --last` / `fork --last` 尾随参数作 prompt 修复**。对开发者，搜索与 schema 修复直接改善 Agent 调复杂 MCP 工具的可靠性。

---

## 特性一：Code mode 独立 Web 搜索（v0.139.0）

### 是什么

在 **code mode** 下，Agent 可**直接调用独立 Web 搜索**（含嵌套 JavaScript 工具调用路径），返回**纯文本搜索结果**，无需先切到专用 search 子命令。对应 feature flag `standalone_web_search`（`codex features list` 显示 under development，但 0.139.0 release note 已落地核心能力）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 查最新 API 文档、CVE、发行说明 | 离线/air-gapped 环境 |
| 结合 code mode 边搜边改 | 严禁外联的合规仓库（应禁网 sandbox） |

### 前置条件

- Codex CLI **0.139.0+**
- 有效 OpenAI/Codex 认证（`codex login` 或 `OPENAI_API_KEY`）
- 网络 sandbox 允许外联（默认 restricted，可能需审批）

### 详细使用步骤

1. 升级：`npm install -g @openai/codex@latest`
2. 登录：`codex login`
3. 进入 TUI：`codex`
4. 启用 code mode（按提示或配置 `features.code_mode`）
5. 提示：「搜索 OpenAI Codex 0.139.0 release notes 并总结 Web 搜索改动」
6. 观察工具调用是否出现 web search 且无 JSON 包裹错误

### 命令与配置示例

```bash
cd /workspace/tools
npm install @openai/codex@latest
./node_modules/.bin/codex --version

# 启用 feature（若默认关闭）
./node_modules/.bin/codex --enable standalone_web_search

# 非交互（需认证）
./node_modules/.bin/codex -p "用 web search 查 rust-v0.139.0 新特性并列表"
```

`~/.codex/config.toml` 片段：

```toml
[features]
standalone_web_search = true
```

### 本地测试结果

```text
$ ./node_modules/.bin/codex --version
codex-cli 0.139.0

$ ./node_modules/.bin/codex features list | grep standalone_web_search
standalone_web_search                under development  false
```

✅ 版本正确；❌ **无 API Key**，未触发真实搜索；feature list 仍标 under development（与 release note「New Features」并存，以实际 TUI 行为为准）。

### 问题与解决方案

1. **搜索无结果**：`codex doctor` 检查 network / websocket；企业代理设 `HTTPS_PROXY`。  
2. **sandbox 拦截**：`/debug-config` 查看 effective sandbox；按需 `codex -P` 权限 profile（0.139.0 新增 alias）。  
3. **嵌套 JS 工具失败**：升级 0.139.0+；检查 #26719 相关修复。

### 官方 vs 社区

- GitHub Release：https://github.com/openai/codex/releases/tag/rust-v0.139.0 (#26719)  
- OpenAI Changelog：https://developers.openai.com/codex/changelog — 2026-06-09 CLI 0.139.0  
- InfoQ Codex Harness 文：https://www.infoq.cn/article/vblM3MlOEs86dmVdH8d1 — 一致肯定 Codex 使用量增长

---

## 特性二：MCP 工具 schema `oneOf` / `allOf` 保留（v0.139.0）

### 是什么

压缩大型 MCP 工具 input schema 时，旧版会过度扁平化，破坏 **`oneOf`/`allOf`** 语义，导致模型传参错误。0.139.0 在 compact 时**多保留一层结构**，兼容 richer MCP 工具（如多形态 API gateway）。

### 步骤

1. 连接含复杂 schema 的 MCP server（`codex mcp` 配置）
2. 让 Agent 调用该工具并观察参数校验错误是否减少
3. 大 schema 工具：对比 0.138 vs 0.139 行为

### 配置示例

```toml
# ~/.codex/config.toml
[[mcp_servers]]
name = "complex-api"
command = "npx"
args = ["-y", "my-mcp-server"]
```

### 本地测试

❌ 未配置 MCP server，未实测调用。✅ Release diff #24118、#27084 与 changelog 一致。

### 问题与解决方案

1. **仍报 schema validation error**：检查 MCP server 是否输出 draft-07 合法 JSON Schema。  
2. **启动 spinner 卡住**：0.139.0 修复子 Agent MCP 警告串扰父线程 (#26639)。

---

## 特性三：`codex doctor` 编辑器与分页器环境（v0.139.0）

### 是什么

`codex doctor` 本地报告新增 **EDITOR/VISUAL/PAGER** 等环境信息；`--json` 输出对敏感值**脱敏**，便于 CI 附诊断日志。

### 步骤

1. `codex doctor`
2. 查看 Environment → system 段 `EDITOR`、`VISUAL`
3. CI：`codex doctor --json > doctor.json`

### 本地测试结果

```text
Environment
  ✓ system       en-US
      EDITOR                   not set
      VISUAL                   not set
...
12 ok · 1 idle · 5 notes · 1 warn · 4 fail
```

✅ doctor 可运行；❌ auth 失败、TERM=dumb 警告（预期 headless）。

### 问题与解决方案

1. **TERM=dumb**：`export TERM=xterm-256color`  
2. **双份 npm 安装**：doctor 提示 global vs local 路径不一致——统一 `PATH` 或用项目内 `./node_modules/.bin/codex`

---

## 特性四：插件市场 `list --json` 含 source（v0.139.0）

### 是什么

`codex plugin marketplace list --json` 现在返回每个 marketplace 的 **source** 字段；插件列表可**先返回缓存远程目录再后台刷新**（#27009、#26932）。

### 管理员开启 SOP（Plugins / Marketplace）

1. **选定信任源**：仅添加组织批准的 marketplace URL 或 git 源  
2. 编辑 `~/.codex/config.toml` 或企业下发配置，注册 marketplace  
3. 运行 `codex plugin marketplace add <url>`（以当前版本子命令为准，`codex plugin --help`）  
4. 验证：`codex plugin marketplace list --json | jq '.[].source'`  
5. 审计：定期对比 JSON 输出与内部软件清单  
6. 禁用未授权源：从配置移除并 `codex plugin marketplace remove`

### 业务用户使用 SOP

1. 确保管理员已注册 marketplace  
2. `codex plugin list` 查看可用插件  
3. `codex plugin install <plugin-id>`  
4. 重启 `codex` TUI 或 `codex app-server`（若用 daemon）  
5. 在会话中用自然语言调用插件能力；首次工具调用走权限审批  
6. 问题上报管理员时附带 `codex doctor --json`

### 命令示例

```bash
./node_modules/.bin/codex plugin marketplace list --json
./node_modules/.bin/codex plugin marketplace list --help
```

### 本地测试

```bash
$ ./node_modules/.bin/codex plugin marketplace list --json
# 无 marketplace 时输出空列表或提示，命令可执行 ✅
```

### 问题与解决方案

1. **列表一直 loading**：等待后台 refresh；检查网络。  
2. **恶意 marketplace**：管理员仅白名单内部 GitLab raw 源。

### 官方 vs 社区

Release #27009；与 **Plugins stable**（`features list`: plugins stable true）一致。

---

## 特性五：Codex Sites 管理员与业务用户 SOP

> **Sites** 指 Codex 将本地或远程 Web 应用作为 Agent 操作面的集成能力（与 `in_app_browser`、`browser_use` feature 相关）。以下基于 0.139.0 feature flags 与官方架构惯例整理；具体子命令以 `codex sites --help` 为准。

### 管理员开启 SOP

1. 确认组织允许 **in_app_browser** / **browser_use**（`codex features list`）  
2. 在 `config.toml` 启用：

```toml
[features]
in_app_browser = true
browser_use = true
```

3. 配置网络 sandbox：仅允许目标域名（企业 proxy）  
4. 部署 **codex-app-server**（若团队共享）：`codex serve` 或 daemon 模式  
5. 为 Sites 绑定 TLS 与 SSO（企业反向代理）  
6. 文档化允许访问的 origin 白名单  
7. 开启审计日志：`~/.codex/log`

### 业务用户使用 SOP

1. `codex login` 完成认证  
2. 启动：`codex`  
3. 在 TUI 打开 Site / 内置浏览器面板  
4. 描述任务：「在该 Site 上完成 X 表单填写并截图」  
5. 审批浏览器/文件权限提示  
6. 结束后 `/new` 或 `codex resume` 清理会话敏感状态

### 本地测试

⚠️ headless 未启用浏览器 Site；`browser_use` stable=true 在 features list ✅。

---

## 特性六：`resume --last` / `fork --last` 尾随 prompt 修复（v0.139.0）

### 是什么

此前 `codex resume --last "fix the bug"` 会把 `"fix the bug"` 误当作 session ID。0.139.0 将其正确解析为**初始用户 prompt**。

### 步骤

1. 完成一次交互会话并退出  
2. `codex resume --last "继续上次未完成的重构"`  
3. 确认进入最近会话且首条用户消息为给定 prompt

### 示例

```bash
codex resume --last "从第三步继续：为 auth 模块补测试"
codex fork --last "尝试另一种实现：用 JWT 而非 session"
```

### 本地测试

```bash
$ ./node_modules/.bin/codex resume --help
  --last          Continue the most recent session without showing the picker
  [PROMPT]        Optional user prompt to start the session
```

✅ help 文本与 release note 一致；❌ 无历史 session 未跑通 resume。

### 问题与解决方案

1. **picker 无会话**：加 `--include-non-interactive` 或先跑交互会话。  
2. **fork 丢 cloud requirements**：0.139.0 修复 `/new` `/clear` `/fork` 丢云配置 (#25177)。

---

## 特性七：沙箱与镜像路径修复（v0.139.0 合集）

### 是什么

- 镜像编辑走**精确引用路径** (#26486)  
- 沙箱保留已批准 escalation (#24981)  
- 强制 network proxy (#27035)  
- TUI 含 `~` 的 URL 完整 linkify (#27088)

### 示例

附加图片后提示：「裁剪 attachments/foo.png 左上角」——应操作 foo.png 而非历史猜测路径。

### 本地测试

❌ 未在 TUI 测图片编辑。

---

## 本地实测总览

```bash
cd /workspace/tools
./node_modules/.bin/codex --version          # codex-cli 0.139.0 ✅
./node_modules/.bin/codex doctor             # 12 ok, auth fail ❌
./node_modules/.bin/codex features list      # plugins stable ✅
./node_modules/.bin/codex resume --help      # --last + PROMPT ✅
```

---

## 升级建议

| 用户类型 | 建议 |
|----------|------|
| 日常 TUI | `npm i -g @openai/codex@0.139.0` |
| MCP 重度 | 优先 0.139.0 schema 修复 |
| CI headless | 固定版本 + `codex doctor --json` 作 preflight |
| 尝鲜 | 不依赖 0.140.0-alpha 生产 |

---

## 参考

- https://github.com/openai/codex/releases/tag/rust-v0.139.0  
- https://developers.openai.com/codex/changelog  
- https://www.infoq.cn/article/vblM3MlOEs86dmVdH8d1  
