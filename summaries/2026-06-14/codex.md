# OpenAI Codex 每日技术文档 — 2026-06-14

> 本地实测版本：**codex-cli 0.139.0**｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 6 月 14 日 Codex 生态的最新稳定 CLI 为 **0.139.0**（6 月 9 日发布），alpha 线 0.140.0-alpha.19 于 6 月 14 日 02:03 UTC 持续迭代。桌面端 **Codex app 26.609**（6 月 11 日）带来 Browser **Developer mode（CDP）**、Enterprise **Computer Use** 扩展与 `/init` 命令。CLI 侧 Code mode 可**独立调用 Web Search** 是开发者最应关注的工程变更。

---

## 特性一：Code Mode 独立 Web Search（CLI 0.139.0）

### 是什么（机制说明）

Codex 的 **Code mode** 允许 Agent 在沙箱内执行 JavaScript 等代码编排工具调用。0.139.0 起，Code mode 可**直接调用独立 Web Search**，包括从嵌套 JS tool 调用中发起，并接收**纯文本**搜索结果——无需再经过已移除的 standalone search tool 路径。

### 适用场景

- **适合**：需实时文档/API 信息的编码任务、依赖版本查询、CVE 检索
- **不适合**：离线/air-gapped 环境；严格禁止外联的企业沙箱

### 前置条件

- Codex CLI 0.139.0+
- 已 `codex login` 或配置 `OPENAI_API_KEY`
- Feature flag `standalone_web_search`（`codex features list` 显示为 under development，但 0.139.0 release notes 已启用）

### 详细使用步骤

1. 安装：`npm install -g @openai/codex@0.139.0`
2. 登录：`codex login`
3. 启动交互：`codex`
4. 在 Code mode 任务中要求搜索，例如：「查 React 19 useActionState 官方文档并写示例」
5. Agent 在 code mode 内发起 web search 并整合结果

### 命令与配置示例

**基础示例**

```bash
cd /workspace/tools
./node_modules/.bin/codex exec "使用 code mode 搜索 OpenAI Codex 0.139.0 release notes 并总结 web search 变更"
```

**进阶示例 — config.toml 指定模型与沙箱**

```toml
# ~/.codex/config.toml
model = "gpt-5.5"
approval_policy = "on-request"
filesystem_sandbox = "restricted"
network_sandbox = "restricted"
```

```bash
codex exec -c model=gpt-5.5 "搜索并对比 Rust 1.87 vs 1.86 破坏性变更"
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.139.0

./node_modules/.bin/codex features list | grep standalone_web_search
# standalone_web_search  under development  false

./node_modules/.bin/codex doctor 2>&1 | head -20
# Codex Doctor v0.139.0 · linux-x86_64
# ✗ auth  no Codex credentials were found
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.139.0 |
| `doctor` | ✅ 运行正常；⚠️ 无 auth |
| Web Search 实际调用 | ❌ 未实测（无 API Key） |

### 问题与解决方案

**搜索被沙箱拦截** — `codex doctor` 检查 `network_sandbox`；企业策略可能禁止外联

**feature list 显示 false 但 release notes 称已启用** — 以 0.139.0 GitHub release 为准；升级至最新稳定版

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [GitHub rust-v0.139.0](https://github.com/openai/codex/releases/tag/rust-v0.139.0) | 一致 |
| [Blake Crosley 中文参考](https://blakecrosley.com/zh-Hans/guides/codex) | 一致 |

---

## 特性二：MCP Schema 保留 oneOf/allOf（0.139.0）

### 是什么

工具与 connector 的 input schema 在压缩时保留 `oneOf`/`allOf` 结构，改善与复杂 MCP 工具的兼容性。

### 适用场景

- **适合**：企业 MCP 服务器带联合类型 schema；大型 OpenAPI 生成工具
- **不适合**：极简单参数工具（无感知差异）

### 步骤

1. 在 `~/.codex/config.toml` 配置 MCP server
2. `codex mcp list` 验证连接
3. 运行依赖该 MCP 的 `codex exec` 任务
4. 检查 tool 调用是否因 schema 解析失败

### 配置示例

```toml
# ~/.codex/config.toml
[mcp_servers.my_api]
command = "npx"
args = ["-y", "my-mcp-server"]
```

```bash
codex mcp list
codex exec "调用 my_api 的 createUser 工具，参数类型为联合类型"
```

### 本地测试

⚠️ 未配置 MCP server；`codex mcp` 子命令存在 ✅

### 常见问题

**仍报 schema 错误** — 更新 MCP server 与 Codex 同为 0.139.0+；检查 schema 体积是否触发过度压缩

---

## 特性三：`codex doctor` 编辑器/分页器环境报告（0.139.0）

### 是什么

`codex doctor` 在本地报告中新增 **EDITOR/VISUAL/PAGER** 等环境详情；JSON 输出中对敏感值脱敏。

### 步骤

1. `codex doctor`
2. 查看 Environment → system 段
3. 故障排查：`codex doctor --json` 导入工单

### 示例

```bash
cd /workspace/tools
./node_modules/.bin/codex doctor 2>&1 | grep -A5 "EDITOR"
# EDITOR                   not set
# VISUAL                   not set
```

```bash
export EDITOR=vim
export TERM=xterm-256color
codex doctor
```

### 本地测试结果

✅ doctor 完整输出 12 ok · 5 notes · 4 fail（auth/terminal 预期失败）

### 常见问题

**TERM=dumb 警告** — `export TERM=xterm-256color` 后重试

**双 npm 安装路径冲突** — doctor 提示 global vs local 路径不一致；统一使用 `which codex`

---

## 特性四：`resume --last` / `fork --last` 提示词解析修复（0.139.0）

### 是什么

`codex resume --last "prompt"` 与 `codex fork --last "prompt"` 现将尾部参数正确解析为**初始 prompt**，而非误读为 session ID。

### 示例

```bash
codex resume --last "继续完成上一个 PR 的测试用例"
codex fork --last "基于上次方案尝试 B 计划"
```

### 本地测试

⚠️ 无历史 session；`codex resume --help` 存在 ✅

### 常见问题

**无会话可恢复** — 先运行交互式 `codex` 产生 session

---

## 特性五：Plugin Marketplace JSON 增强（0.139.0）

### 是什么

`codex plugin marketplace list --json` 现包含每个 marketplace **source**；列表可先从缓存 catalog 返回再后台刷新。

### 管理员开启 SOP（Plugins / Sites）

1. 组织管理员在 Codex App → **Settings** → **Plugins** → 启用 marketplace
2. 配置允许的 marketplace sources（企业版）
3. 开发者 `codex plugin marketplace list --json` 审计来源
4. `codex plugin install <id>` 安装

### 业务用户使用 SOP

1. `codex plugin list`
2. `codex plugin marketplace list` 浏览
3. 安装团队批准插件
4. 在 `AGENTS.md` 中引用插件能力

### 示例

```bash
codex plugin marketplace list --json | jq '.[].source'
codex plugin list
```

### 本地测试

⚠️ 未登录；子命令 `codex plugin` 存在 ✅

---

## 特性六：Codex App 26.609 — Browser Developer Mode（2026-06-11）

### 是什么

Chrome 与 Codex 内置浏览器的 **Developer mode** 授予受控 **CDP（Chrome DevTools Protocol）** 访问，用于性能分析、网络流量、控制台与页面状态深度调试。Browser use 据称通过 CDP/DOM 优化**最高 2x 加速**。

### 适用场景

- **适合**：前端性能调优、复杂 SPA 调试、Browser use Agent
- **不适合**：无 GUI 的纯 CI 环境

### 前置条件

Codex App 26.609+；Chrome 或内置浏览器

### 管理员 SOP

1. 组织控制台启用 Browser use / Developer mode
2. 配置可访问域名白名单
3. 审计 CDP 权限范围

### 业务用户 SOP

1. 更新 Codex App 至 26.609
2. Settings → Browser → 启用 **Developer mode**
3. 在 Composer 中请求 Browser use 任务
4. 打开 DevTools 面板查看 CDP 采集数据

### 本地测试

❌ 无 macOS/Windows Codex App GUI

### 交叉验证

[OpenAI Changelog 2026-06-11](https://developers.openai.com/codex/changelog) ✅

---

## 特性七：Enterprise Computer Use 区域扩展（26.609）

### 是什么

Enterprise 用户在 **EEA/UK/瑞士以外** 可使用 Computer Use；Windows 支持按应用配置访问控制。

### 管理员 SOP

1. Enterprise 合同确认 Computer Use 条款
2. Admin → Computer Use → 区域策略
3. Windows：配置 per-app ACL

### 业务用户 SOP

1. 确认账号在允许区域
2. `codex` 或 App 中选择 Computer Use 模式
3. 首次运行完成 OS 权限授权

### 本地测试

❌ 需 Enterprise 账号

---

## 特性八：`/app` 桌面交接（CLI 0.138.0，仍相关）

### 是什么

CLI 会话可通过 `/app` 移交至 macOS/Windows Codex 桌面应用继续，含本地图片路径暴露给模型等。

### 示例

```bash
codex
# 会话中输入：
/app
```

### 本地测试

❌ Linux 环境无桌面 App

---

## Codex Sites/Plugins 分角色 SOP 汇总

| 角色 | Sites（云端） | Plugins |
|------|---------------|---------|
| 管理员 | 控制台启用 Sites、绑定域名、SSO | 审批 marketplace、锁定 source |
| 开发者 | 部署静态站点预览 | `codex plugin install` + AGENTS.md |
| 企业合规 | 数据驻留区域选择 | 仅允许内部 registry |

---

## 版本路线图

| 版本 | 日期 | 类型 |
|------|------|------|
| 0.139.0 | 2026-06-09 | 稳定 |
| 0.140.0-alpha.19 | 2026-06-14 | 预发布 |
| App 26.609 | 2026-06-11 | 桌面 |

---

## 今日研究员结论

生产环境应锁定 **0.139.0** 而非 alpha。Code mode Web Search 与 MCP schema 修复直接改善「会查文档的 Agent」可靠性；与 Claude Fable 5 停服对比，Codex 栈（GPT-5.5 默认）成为跨境长程编码的相对稳定选项——但仍需关注美国出口管制是否会扩展至 OpenAI 下一代模型。
