# OpenAI Codex 每日技术文档 — 2026-06-13

> 监测源：[developers.openai.com/codex/changelog](https://developers.openai.com/codex/changelog)、[GitHub openai/codex releases](https://github.com/openai/codex/releases)  
> 本地实测：**codex-cli 0.139.0**（`npm install @openai/codex@latest`）  
> 检索时间：UTC 2026-06-13 22:25

## 今日综述

Trigger 窗口内，Codex 主线更新为：**CLI 0.139.0（6/9）** 的 Code mode 独立 Web Search 与 MCP Schema 增强；**App 26.609（6/11）** 的 Browser Developer mode、`/init`、Computer Use 企业扩展。GitHub 上 **0.140.0-alpha** 预发布持续迭代，但 npm `@latest` 仍为 **0.139.0**。以下按特性逐项说明，含管理员/用户双 SOP（Plugins/Sites 相关以 App 26.608–609 为准）。

---

## 特性一：Code mode 独立 Web Search（CLI 0.139.0）

### 是什么（机制说明）

此前 Web Search 与 Code mode 的集成有限；**0.139.0** 起，Agent 在 **Code mode** 内可直接调用 **standalone web search**，包括从嵌套 JavaScript 工具调用中发起，并以**纯文本搜索结果**返回。这使「查最新 API 文档 → 写代码」可在同一线程内闭环，无需切换 Chat 模式。

`codex features list` 显示 `standalone_web_search` 状态为 **under development**（功能标志可能因渠道渐进开放），但 0.139.0 release notes 已声明启用。

### 适用场景

**适合**：依赖实时文档（npm 版本、RFC、CVE）的编码任务；Research-heavy 的脚本生成。  
**不适合**：离线环境；企业禁止外网搜索的策略下（需在管理员策略关闭 Browser/Search）。

### 前置条件

- Codex CLI **≥ 0.139.0**  
- `codex login` 或 `OPENAI_API_KEY`  
- 网络沙箱策略允许搜索端点（默认 sandbox 为 restricted network，可能需审批）

### 详细使用步骤

1. 安装：`cd /workspace/tools && npm install @openai/codex@latest`  
2. 登录：`./node_modules/.bin/codex login`  
3. 进入仓库：`cd /your/project`  
4. 启动 TUI：`./node_modules/.bin/codex`  
5. 进入 Code mode（默认或 `/mode code`）  
6. 提示：「查 React 19 useActionState 官方用法并实现示例组件」  
7. 观察工具调用链中出现 web search，再生成代码

### 命令与配置示例

```bash
# 安装与版本
cd /workspace/tools
npm install @openai/codex@latest
./node_modules/.bin/codex --version

# 非交互（print 模式，需 auth）
export OPENAI_API_KEY="sk-..."
./node_modules/.bin/codex exec \
  "使用 web search 查 Python 3.13 的 typing 新特性，写 50 行示例代码" \
  --full-auto
```

```toml
# ~/.codex/config.toml 片段 — 沙箱与审批
approval_policy = "on-request"
[sandbox]
filesystem = "restricted"
network = "restricted"
```

#### 基础示例：查文档并写函数

```text
在 Code mode 中输入：

搜索 OpenAI Codex 0.139.0 changelog 中关于 web search 的说明，
然后在当前目录创建 docs/codex-search-notes.md 总结要点，
并写一个简单的 Node 脚本 scripts/fetch-changelog-title.mjs 演示 fetch。
```

#### 进阶示例：嵌套 JS 工具 + 搜索

```text
创建一个可复用的 JS 工具函数 resolvePackageLatestVersion(name)，
内部先 web search npm 上该包的最新稳定版，
再返回 { name, version, url }。
用该工具查询 'zod' 和 'vitest' 并输出 JSON。
若搜索失败，回退到读取本地 package-lock.json。
```

### 本地测试结果

```bash
$ ./node_modules/.bin/codex --version
codex-cli 0.139.0

$ ./node_modules/.bin/codex features list | rg search
search_tool                          removed            false
standalone_web_search                under development  false
web_search_cached                    deprecated         false
web_search_request                   deprecated         false

$ ./node_modules/.bin/codex doctor
✗ auth  no Codex credentials were found
⚠ websocket  Responses WebSocket failed; HTTPS fallback may still work
```

- ✅ 版本 0.139.0 安装成功  
- ⚠️ 无 API Key，**未实测**搜索调用  
- ⚠️ feature flag 显示 under development，与 release note 并存——以登录后实际行为为准

### 问题与解决方案

| 错误 | 处理 |
|------|------|
| `no Codex credentials` | `codex login` 或 export `OPENAI_API_KEY` |
| 搜索被 sandbox 拦截 | `codex doctor` 查看 network sandbox；审批或调整 policy |
| `resume --last` 误解析 prompt | 已于 0.139.0 修复，升级即可 |

```bash
./node_modules/.bin/codex doctor --all
./node_modules/.bin/codex features list
```

### 官方 vs 社区交叉验证

| 来源 | 内容 | 一致 |
|------|------|------|
| [GitHub rust-v0.139.0](https://github.com/openai/codex/releases/tag/rust-v0.139.0) | Code mode standalone web search #26719 | — |
| [LoreAI 简报](https://buttondown.com/loreai/archive/anthropic-ships-fable-5-and-mythos-5-the-biggest/) | 转述 0.139.0 web search | ✅ |
| [36氪 Agent 指南](https://www.36kr.com/p/3808851537174018) | 推荐 Codex CLI 做终端推理 | 场景一致 |

### 分角色建议

- 个人：升级 0.139.0 后优先用搜索+代码一体任务  
- 团队：CI 用 `codex exec` 时记录搜索次数评估成本  
- 企业：在 Codex Cloud Policies 禁用 Browser/Search 若合规要求

---

## 特性二：MCP 工具 Schema 增强（oneOf / allOf，0.139.0）

### 是什么

连接器与 MCP 工具的 input JSON Schema 在压缩时保留更多 **`oneOf` / `allOf`** 结构，大型 schema 少丢层级，提升与复杂 MCP（如数据库多表、条件字段）的兼容性。

### 使用步骤

1. 在 `~/.codex/config.toml` 配置 MCP server  
2. 启动 `codex`，观察 MCP 工具列表  
3. 调用含联合类型的工具，验证参数校验  
4. 若失败，`-d api,mcp` 调试

### 配置示例

```toml
# ~/.codex/config.toml
[mcp.servers.mydb]
command = "npx"
args = ["-y", "@example/mcp-db"]
```

```json
{
  "oneOf": [
    { "type": "object", "properties": { "query": { "type": "string" } }, "required": ["query"] },
    { "type": "object", "properties": { "table": { "type": "string" } }, "required": ["table"] }
  ]
}
```

### 本地测试：⚠️ 未配置 MCP server

### 问题与解决方案

- **工具参数被截断**：升级 0.139.0+；简化 schema 体积  
- **子 agent 重复 MCP 警告**：0.139.0 修复线程归属 #26639

---

## 特性三：`codex doctor` 增强（Editor/Pager 环境，0.139.0）

### 是什么

`codex doctor` 在本地报告中展示 **EDITOR/VISUAL/PAGER** 等环境；JSON 输出对敏感值脱敏。

### 使用步骤

1. `codex doctor`  
2. 查看 Environment → editor/pager  
3. CI 用 `codex doctor --json` 归档

### 本地测试结果

```bash
$ ./node_modules/.bin/codex doctor --summary compact
12 ok · 1 idle · 5 notes · 1 warn · 4 fail
# 失败项：auth、install path、updates path、terminal TERM=dumb
```

- ✅ doctor 可运行  
- ⚠️ TERM=dumb 导致颜色与光标控制禁用——自动化环境设 `export TERM=xterm-256color`

### 排查命令

```bash
export TERM=xterm-256color
./node_modules/.bin/codex doctor
```

---

## 特性四：Codex App 26.609 — Browser Developer mode

### 是什么（机制说明）

**Developer mode** 为 Browser use 提供受控 **Chrome DevTools Protocol (CDP)** 访问，可分析性能、网络、控制台、DOM、样式。默认**用户级关闭**；Workspace **管理员**可在 Cloud Settings → Policies 全局禁用。

### 管理员开启 SOP

1. 登录 [Codex Cloud](https://chatgpt.com/codex) 管理员账号  
2. 进入 **Settings → Policies & Configurations**  
3. 找到 **Browser Developer mode** / CDP 相关策略  
4. 选择 **Allow for workspace** 或 **Disable for all members**  
5. 通知开发者合规要求（禁止抓客户 PII 页面等）  
6. 审计：定期导出策略变更日志

### 业务用户使用 SOP

1. 安装/更新 **Codex Desktop App ≥ 26.609**  
2. App → **Settings → Browser** → 开启 **Developer mode**  
3. 在 Composer 启用 Browser use 任务  
4. 需要性能分析时允许 CDP 权限弹窗  
5. 任务结束后关闭敏感标签页

### 配置示例（用户 settings 概念项）

```json
{
  "browser": {
    "developerMode": true,
    "allowedOrigins": ["https://staging.mycompany.com"]
  }
}
```

### 本地测试：⚠️ 无 Codex Desktop GUI

### 官方 vs 社区

- [OpenAI Codex Changelog 2026-06-11](https://developers.openai.com/codex/changelog)  
- [Releasebot OpenAI June 2026](https://releasebot.io/updates/openai) 转述 Developer mode

### 分角色建议

- 管理员：默认关闭，仅对前端组开放  
- 开发者：仅对 localhost/staging 开 CDP  
- 合规：Developer mode 等同高权限浏览器插件，纳入安全培训

---

## 特性五：App `/init` 与 AGENTS.md 脚手架（26.609）

### 是什么

App Composer 新增 **`/init`**，与 CLI 相同工作流：扫描项目生成 **AGENTS.md** 指令文件。

### 用户使用步骤

1. 打开 Codex App，选择项目目录  
2. Composer 输入 `/init`  
3. 审查生成的 AGENTS.md  
4. 提交到 git 供团队共用

### CLI 等价

```bash
./node_modules/.bin/codex
# 在 TUI 中：
/init
```

### 基础 + 进阶示例

**基础**：

```text
/init
然后根据 AGENTS.md 中的测试命令运行单测并修复失败用例
```

**进阶**：

```text
/init
在 AGENTS.md 末尾增加「安全」章节：禁止提交 .env；
然后 fork 当前线程专门做依赖漏洞扫描
```

### 本地测试：⚠️ 需交互 TUI

---

## 特性六：Plugins 与市场（26.608–609）— 管理员 vs 用户

### 是什么

26.608 重构 **Plugins** 界面（分类、键盘导航）；26.609 增强市场列表 JSON 含 **marketplace source**；CLI 0.139.0 同步 `codex plugin marketplace list --json`。

### 管理员开启 SOP

1. Codex Cloud → **Plugins / Marketplace policies**  
2. 允许或封禁第三方 marketplace URL  
3. 配置 **plugin_sharing** 是否允许跨 workspace  
4. 下发允许列表给成员  
5. 监控 `codex plugin marketplace list --json` 异常源

### 业务用户使用 SOP

1. App → **Plugins** 页签  
2. 浏览 Marketplace → Install  
3. Composer 中 `@plugin-name` 调用  
4. 更新：`codex plugin update --all`（CLI）

### 命令示例

```bash
./node_modules/.bin/codex plugin marketplace list --json
./node_modules/.bin/codex plugin install @official/example-plugin
```

### 本地测试

```bash
$ ./node_modules/.bin/codex features list | rg plugin
plugins                              stable             true
plugin_sharing                       stable             true
```

- ✅ plugins feature stable  
- ⚠️ 未登录，未拉 marketplace

---

## 特性七：CLI 0.138.0 Desktop Handoff（`/app`）

### 是什么（简述，6/8 发布）

macOS/Windows 上 **`/app`** 可将当前 CLI 线程 **handoff 到 Codex Desktop**，便于在 GUI 继续长任务。

### 步骤

1. CLI 中运行至需要 GUI 的点  
2. 输入 `/app`  
3. Desktop 弹出并承接线程  
4. 在 Desktop 完成 browser/computer use

### 本地测试：⚠️ Linux 环境无 Desktop handoff

---

## 特性八：`codex resume --last` / `fork --last` 修复（0.139.0）

### 是什么

尾随参数现正确视为 **initial prompt**，而非 session ID。

### 示例

```bash
./node_modules/.bin/codex resume --last "继续实现 JWT 刷新逻辑"
./node_modules/.bin/codex fork --last "只跑测试不要改生产配置"
```

### 本地测试：⚠️ 无历史 session

---

## 本地实测总览

| 命令 | 结果 |
|------|------|
| `npm install @openai/codex@latest` | ✅ 0.139.0 |
| `codex doctor` | ⚠️ 无 auth，4 fail |
| `codex features list` | ✅ 87 flags |
| Web search 实调 | ❌ 无 key |
| Plugin marketplace | ❌ 无 auth |

## 对普通开发者意味着什么

0.139.0 把「查资料」和「写代码」缝进同一条 Code mode 流水线，与 Claude Code Fable 5 的长程自主形成竞品对照；App 26.609 的 Developer mode 则让前端调试不必再手动复制控制台日志。升级成本低（npm），但需处理 **auth + sandbox 审批** 两道门槛。

## 检索记录

- developers.openai.com/codex/changelog June 2026  
- github.com/openai/codex/releases rust-v0.139.0  
- releasebot.io OpenAI Codex June 2026
