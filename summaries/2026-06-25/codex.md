# OpenAI Codex 每日技术文档 — 2026-06-25

> 本地实测版本：**0.142.2**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 25 日为 Codex **重大发布日**：稳定版从 0.142.0 跃升至 **0.142.2**（07:32 UTC），npm `@openai/codex@latest` 实测确认。同日 **Codex Remote 正式 GA**（手机遥控桌面 Agent）、**DigitalOcean 插件**上线、**codex-zsh v0.1.0** 预发布。**0.143.0-alpha.25** 继续密集预发布。`codex doctor`：**12 ok · 1 warn · 4 fail**（auth 未登录）。

---

## 特性一：Codex CLI 0.142.2 — MCP Tool Search 与安全加固（2026-06-25）

### 是什么（机制说明）

0.142.2（`rust-v0.142.2`）为今日核心稳定版更新：

**新功能**
- **MCP tools 默认启用 tool search**（#29486）：改善工具发现，兼容旧模型与 provider
- **macOS 系统代理**：`respect_system_proxy` 支持 PAC/WPAD（#26709）
- **插件 dark-mode logo**（#29488）：本地 manifest 与远程 catalog
- **安全缓冲 UI 元数据**（#29473）：server 提供 visibility 与 faster-model metadata

**Bug 修复**
- 远程插件 catalog 返回 curated featured-plugin 排名（#29485）
- 过期 Amazon Bedrock 凭据给出可操作的恢复指引（#28992）
- 远程 stdio MCP 接受远程平台路径格式的绝对 cwd（#29493）
- 远程 HTTP(S) 图片输入返回明确 model-visible 错误（#29417,#29419）
- PowerShell 不可检查 AST 区域需审批（#24092）
- Code Mode 缺少 model metadata 时警告（#29490）

**维护**
- OpenSSL 3.6.3、esbuild 0.28.1 安全更新
- formatter 成功时静默输出（#29467）

### 适用场景

- **适合**：生产 CLI Agent；多 MCP 集成项目；macOS/Windows 企业代理环境
- **不适合**：锁定 0.142.0 且不愿验证 MCP 行为变化的保守部署

### 前置条件

- Node.js 18+
- `npm install @openai/codex@0.142.2` 或 `@latest`

### 详细使用步骤（业务用户）

1. 升级：`cd tools && npm install @openai/codex@latest`
2. 验证：`./node_modules/.bin/codex --version` → `codex-cli 0.142.2`
3. 诊断：`codex doctor`
4. 检查 feature flags：`codex features list`
5. 若使用 MCP：观察 Agent 工具选择是否因 tool search 改变
6. 登录：`codex login`（若尚未认证）

### 命令与配置示例

**升级与验证**

```bash
npm install @openai/codex@0.142.2
codex --version
codex doctor
codex features list | head -20
```

**config.toml — macOS 系统代理**

```toml
[network]
respect_system_proxy = true
```

**config.toml — MCP 与 feature flags**

```toml
[features]
browser_use = true
auto_compaction = true
code_mode = false  # 仍为 under development

[mcp]
# tool search 默认启用，无需额外配置
```

**非交互执行**

```bash
codex exec "Run npm test and fix failures"
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.142.2

./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

./node_modules/.bin/codex features list 2>&1 | head -15
# browser_use stable true
# code_mode under development false
# collaboration_modes removed true
```

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.142.2 |
| `doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `features list` | ✅ 正常 |
| 推理实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：doctor 4 fail — auth**

排查：运行 `codex login`；检查 `OPENAI_API_KEY`；验证 ChatGPT 订阅。

**错误 2：MCP tool search 改变 Agent 行为**

排查：对比 0.142.0 vs 0.142.2 同任务工具调用日志；必要时在 issue 反馈或临时 pin 0.142.0。

**错误 3：PowerShell 命令被意外 block**

排查：0.142.2 对不可检查 AST 区域需审批——检查脚本是否含动态执行段。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release 0.142.2 | ✅ |
| Codex Changelog 6/25 | ✅ |
| npm @latest | ✅ 0.142.2 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 从 0.142.0 升级；先在 staging 验证 MCP 行为 |
| 企业 IT | 启用 `respect_system_proxy` 适配公司代理 |
| 安全团队 | 关注 PowerShell AST 审批新规则 |

---

## 特性二：Codex Remote GA — 手机遥控桌面 Agent（2026-06-25）

### 是什么（机制说明）

Codex Remote 从 beta 进入 **General Availability**：

- 通过 **ChatGPT 移动 App** 连接已配对的 Mac/Windows 主机
- 启动/继续 Codex 任务、审查进度、**批准操作**
- **QR 一对一配对**：每台手机与每台主机独立认证
- 6/8/2026 后建立的连接保持有效；更早非活跃连接需重新配对
- 需更新 ChatGPT 移动 App 与 Codex App 至最新版

### 适用场景

- **适合**：长程 Agent 需移动端审批；通勤/会议中监控任务
- **不适合**：无 ChatGPT 移动 App 的用户；纯 CLI 无 GUI 工作流

### 前置条件

- Codex App 最新版（Mac/Windows）
- ChatGPT iOS/Android 最新版
- 主机与手机完成 QR 配对

### 详细使用步骤（业务用户）

1. 在 Mac/Windows 打开 **Codex App** 最新版
2. 启用 Remote 连接，显示 QR 码
3. 手机打开 **ChatGPT App** → Codex Remote → 扫描 QR
4. 完成一对一配对
5. 在桌面启动 Codex 长程任务
6. 手机上查看进度、批准敏感操作
7. 任务完成后在桌面验证结果

### 命令与配置示例

**桌面启动长程任务**

```bash
codex
# 在 TUI 中：Analyze entire monorepo and refactor auth module
```

**手机端操作（ChatGPT App UI）**

```
1. 打开 Codex Remote 面板
2. 选择已配对主机
3. 查看 running tasks
4. Tap "Approve" on pending actions
```

**故障排查文档**

```
参见官方 Remote connections 文档：
https://developers.openai.com/codex/
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Remote GA 官方公告 | ✅ Changelog 6/25 |
| 手机配对实测 | ⚠️ 未实测（Cloud Agent 无手机） |
| 桌面 Codex App | ⚠️ 未实测（仅 CLI 环境） |

### 问题与解决方案

**错误 1：配对失败**

排查：确认两端 App 均为最新版；6/8 前旧连接需重新 QR 配对。

**错误 2：手机看不到 running task**

排查：检查主机 Codex App 是否运行；验证网络连通性；重启 Remote 连接。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex Changelog | ✅ GA 公告 |
| 与 Cursor Cloud Agent | 互补：Cursor = IDE cloud VM；Codex Remote = 手机控桌面 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent 用户 | 升级 App 并测试移动端审批流 |
| 与 Claude Tag 对照 | Tag = Slack 异步；Remote = 手机同步审批 |
| 安全团队 | 评估 QR 配对策略与操作审批审计 |

---

## 特性三：DigitalOcean 插件 — 一键远程 Workspace（2026-06-25）

### 是什么（机制说明）

新 **DigitalOcean 插件** 允许 Codex：

1. 自动 provision DigitalOcean Droplet
2. 配置 SSH 访问
3. 将 Droplet 接入 Codex App 作为 **remote workspace**

降低远程开发环境搭建门槛，与 Codex Remote GA 形成「云主机 + 手机遥控」组合。

### 适用场景

- **适合**：需隔离 VM 跑 Agent；无本地 GPU/资源的开发者；安全敏感项目
- **不适合**：已有完善 devcontainer/VM 流程的团队

### 前置条件

- DigitalOcean 账号与 API token
- Codex App 最新版
- 插件市场安装 DigitalOcean 插件

### 详细使用步骤（业务用户）

1. Codex App → **Plugins** → 安装 **DigitalOcean**
2. 配置 DO API token 与 SSH key
3. 选择 Droplet 规格（region、size）
4. Codex 自动 provision + SSH 配置
5. 在 remote workspace 中启动 Agent 任务
6. 可选：通过手机 Codex Remote 监控

### 命令与配置示例

**插件配置（示意）**

```toml
# ~/.codex/config.toml 或插件 manifest
[plugins.digitalocean]
api_token = "${DO_API_TOKEN}"
default_region = "nyc3"
default_size = "s-2vcpu-4gb"
ssh_key_name = "codex-default"
```

**provision 后 SSH 验证**

```bash
ssh root@<droplet-ip>
codex --version
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 官方 Changelog 公告 | ✅ |
| 实际 provision Droplet | ⚠️ 未实测（无 DO 账号） |

### 问题与解决方案

**错误 1：provision 失败**

排查：验证 DO API token 权限；检查账户余额；确认 region 可用性。

**错误 2：SSH 连接超时**

排查：检查 Droplet 防火墙规则；确认 SSH key 已注入。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex Changelog 6/25 | ✅ |
| DigitalOcean 官方 | 待独立公告 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | 评估 DO Droplet 成本 vs 本地 Agent |
| 企业 | 用 isolated VM 跑不可信代码库 Agent |
| 与 Cursor Cloud 对照 | Cursor snapshot 偏 IDE；DO 插件偏通用 VM |

---

## 特性四：codex-zsh v0.1.0 预发布（2026-06-25 21:02Z）

### 是什么（机制说明）

GitHub 发布 **codex-zsh v0.1.0** 预发布版——为 Zsh shell 提供 Codex 集成（具体功能以 Release notes 为准，body 极简）。

可能与 CLI 补全、shell 钩子或快捷命令相关。

### 适用场景

- **适合**：Zsh 重度用户；终端工作流优化
- **不适合**：生产环境（pre-release）；Bash/Fish 用户

### 前置条件

- Zsh shell
- 愿意试用 pre-release 组件

### 详细使用步骤（业务用户）

1. 关注 [GitHub codex-zsh releases](https://github.com/openai/codex/releases/tag/codex-zsh-v0.1.0)
2. 按 Release 说明安装（待官方文档完善）
3. 在 Zsh 中测试集成功能
4. 反馈 issue 至 openai/codex

### 命令与配置示例

```bash
# 安装方式待官方 Release _assets 说明
# 预发布版，谨慎用于生产

codex --version  # 确认 CLI 0.142.2 兼容
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Release 存在 | ✅ codex-zsh-v0.1.0 @ 21:02Z |
| 实际安装 | ⚠️ 未实测（pre-release，环境为 bash） |

### 问题与解决方案

**注意**：pre-release 可能不稳定；建议在隔离环境测试。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release | ✅ tag 存在 |
| 文档 | ⚠️ Release body 极简，细节待补充 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Zsh 用户 | 关注后续 stable 发布 |
| 生产用户 | 等待 stable + 文档 |

---

## 特性五：0.142.1 Windows 系统代理 + 0.143.0-alpha 线（2026-06-25）

### 是什么（机制说明）

**0.142.1**（6/25 00:36Z）：Windows 系统代理支持（PAC、WPAD、静态代理、bypass 规则），与 0.142.2 macOS 代理形成跨平台覆盖。

**0.143.0-alpha.25**（6/25 21:55Z）：最新 alpha 预发布，Release body 为空。同日还有 alpha.16、alpha.21、alpha.22 等多个 alpha 推送。

`codex features list` 显示 `code_mode` 仍为 **under development**。

### 适用场景

- **0.142.1/0.142.2**：企业代理环境生产部署
- **alpha 线**：早期测试者跟踪下一稳定版信号

### 前置条件

- 0.142.2 为推荐生产版本
- alpha 需 `--tag alpha` 或 GitHub pre-release 安装

### 详细使用步骤（业务用户）

1. 生产：锁定 `0.142.2`
2. Windows 企业用户：0.142.1+ 启用系统代理
3. 早期测试：`npm install @openai/codex@alpha`（谨慎）
4. 跟踪 alpha 是否带来 `code_mode` stable 信号

### 命令与配置示例

**Windows 代理 config.toml**

```toml
[network]
respect_system_proxy = true
# Windows: PAC, WPAD, static proxy, bypass rules
```

**pin 生产版本**

```bash
npm install @openai/codex@0.142.2
```

**查看 alpha feature 变化**

```bash
codex features list 2>&1 | rg "code_mode|chronicle|artifact"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 0.142.2 stable | ✅ 实测 |
| alpha.25 | ⚠️ 未安装（生产环境不推荐） |
| code_mode | under development |

### 问题与解决方案

**错误 1：企业代理下 auth 失败**

排查：0.142.1/0.142.2 新增代理支持；确认 `respect_system_proxy = true`；检查 bypass 规则。

**错误 2：alpha 与 stable 行为不一致**

排查：勿混用；alpha 仅供测试环境。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.142.1/0.142.2 | ✅ |
| alpha.25 | ✅ tag 存在，body 空 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 Windows | 升级 0.142.2 获取代理支持 |
| 个人开发者 | 锁定 0.142.2，忽略 alpha |
| code_mode 关注者 | 跟踪 alpha 至 stable 发布 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 0.142.2 | 6/25 07:32Z | MCP tool search、dark logo、macOS 代理、安全加固 |
| 0.142.1 | 6/25 00:36Z | Windows 系统代理 |
| 0.142.0 | 6/22 | 昨日稳定版；/usage、rollout token 预算 |
| 0.143.0-alpha.25 | 6/25 21:55Z | 最新 alpha |
| codex-zsh v0.1.0 | 6/25 21:02Z | Zsh 集成 pre-release |

## 今日研究员结论

**6/25 是 Codex 本周最重要发布日**：稳定版 0.142.2 带来 MCP tool search 与企业代理支持；**Codex Remote GA** 将 Agent 控制延伸至手机端，与 Claude Tag（Slack）和 Cursor Cloud Agent（IDE VM）形成三足鼎立。建议生产用户立即升级 0.142.2 并验证 MCP 行为；长程任务用户测试 Remote 移动端审批流；关注 `code_mode` 何时从 under development 转 stable。
