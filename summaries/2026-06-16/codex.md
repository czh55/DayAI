# OpenAI Codex 每日技术文档 — 2026-06-16

> 本地实测版本：**codex-cli 0.140.0**｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

**2026 年 6 月 16 日 Codex 头条是 App 侧区域扩展**：官方 Changelog 宣布 **EEA、英国与瑞士** 用户获得 Computer Use、Codex Chrome 扩展、Memories（默认 off）与 Chronicle（Pro macOS 预览）。CLI 稳定版仍为 **0.140.0**（6/15 发布），GitHub 同日活跃 **0.141.0-alpha.3** 预发布线。Fable 5 停服背景下，0.140.0 的 **`/import`** 仍是承接 Claude Code 用户的官方迁移入口。

---

## 特性一：EEA/UK/瑞士 Computer Use 与 Chrome 扩展（2026-06-16 App）

### 是什么（机制说明）

此前 Computer Use 在 EEA/UK/CH **因合规未开放**（5/29 Windows 上线时明确 exclude）。6/16 Changelog 宣布 rollout：

- **Computer Use**：macOS/Windows 上见屏、点击、输入本地 GUI 应用
- **Codex Chrome 扩展**：已登录 Chrome 上下文跨标签后台任务
- **Memories**：偏好/工作流/技术栈记忆；**EEA/UK/CH 默认关闭**
- **Chronicle**：ChatGPT Pro + macOS opt-in，从屏幕上下文构建记忆

### 适用场景

- **适合**：欧洲开发者 GUI 自动化、浏览器 signed-in 工作流、跨会话偏好记忆
- **不适合**：无 GUI 的纯 CLI/Linux server 环境；不愿启用数据保留的用户

### 前置条件

- Codex App 最新版（changelog 未单独标 build 号，建议 App 内检查更新）
- 账号位于 EEA/UK/CH
- Computer Use：Screen Recording + Accessibility（macOS）或 Windows 前台可见 app

### 详细使用步骤（业务用户）

1. 更新 Codex App
2. **Settings → Computer Use → Install** 安装插件
3. macOS：授予 Screen Recording 与 Accessibility
4. Windows：保持目标 app 在 active desktop
5. 安装 **Codex Chrome 扩展** 处理浏览器任务
6. 可选：**Settings → Memories** 手动启用（EEA 默认 off）
7. Pro 用户 macOS：**Chronicle** opt-in

### 命令与配置示例

**App 内自然语言**

```
打开 Xcode 并运行当前 scheme 的单元测试
```

**Chrome 扩展场景**

```
在已登录的 GitHub 上检查 PR #42 的 CI 状态
```

**config.toml（CLI 独立，不受 App 区域限制）**

```toml
# ~/.codex/config.toml
[features]
browser_use = true
computer_use = false  # CLI 侧 feature flag；App Computer Use 为独立插件
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| EEA App rollout | ⚠️ 未实测（Cloud Agent 无 Codex App GUI） |
| Changelog | ✅ 2026-06-16 官方条目 |
| `codex features list` | ✅ `computer_use` stable；`browser_use` stable |

```bash
cd /workspace/tools
./node_modules/.bin/codex features list 2>&1 | grep -E "computer|browser|chronicle"
# browser_use                          stable             true
# browser_use_external                 stable             true
# computer_use                         stable             true
# chronicle                            under development  false
```

### 问题与解决方案

**错误 1：Computer Use plugin unavailable（EEA 用户历史问题）**

排查：6/16 前属预期；更新 App 后应可用。x64 macOS 曾有 bundle 缺 plugin 问题（GitHub #18258）——更新至最新 build。

**错误 2：Memories 找不到**

排查：EEA/UK/CH 默认 off，需 Settings 手动启用并阅读 GDPR 说明。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [OpenAI Changelog 6/16](https://developers.openai.com/codex/changelog) | 官方 |
| Digg/OpenAI 员工 X | secondary 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 欧洲前端开发者 | 优先 App Computer Use + Chrome 扩展 |
| 合规团队 | Memories 启用前完成 DPIA |
| 美国用户 | 无变化；Computer Use 早已可用 |

---

## 特性二：`/import` 从 Claude Code 迁移（0.140.0 稳定版）

### 是什么（机制说明）

0.140.0（6/15 21:06 UTC）新增 **`/import`** 与 external agent import picker，选择性导入 Claude Code 的 setup、项目配置、近期聊天记录。与 App 26.608「Migrate to Codex」形成 CLI 闭环，是 Fable 5 停服后的**官方迁移路径**。

### 适用场景

- **适合**：Claude Code 用户考虑切换；需保留 instructions/MCP 配置
- **不适合**：深度 Claude 专属 hooks 且无 Codex 对等能力

### 前置条件

- Codex CLI **0.140.0+**
- `codex login`
- 本地 `~/.claude/` 等 Claude Code 配置

### 详细使用步骤（业务用户）

1. `npm install -g @openai/codex@0.140.0`
2. `codex login`
3. 启动 `codex`，输入 `/import`
4. Picker 选择 setup / project config / recent chats
5. `codex doctor` 验证
6. 测试简单 coding 任务

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.140.0

./node_modules/.bin/codex
# TUI: /import
```

```toml
# ~/.codex/config.toml
model = "gpt-5.5"
approval_policy = "on-request"

[projects."/path/to/repo"]
trust_level = "trusted"
instructions_file = "AGENTS.md"
```

```bash
codex exec "继续 Claude Code 未完成的 refactor"
```

### 本地测试结果

```bash
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.140.0 |
| `/import` 实际导入 | ⚠️ 未实测（无 API Key / 无 Claude 配置） |

### 问题与解决方案

**错误 1：import picker 为空**

排查：确认 `~/.claude/` 存在；Claude Code 曾在此 machine 登录。

**错误 2：MCP 导入后不可用**

排查：逐 server 在 `/mcp` 检查；OAuth 凭证需重新授权（0.140.0 加密存储改进）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.140.0 release notes | 官方 |
| Fortune/Fable 停服报道 | 迁移动机一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Fable 5 受影响用户 | 测试环境先 `/import` 小范围试点 |
| 双栈团队 | 保留 Claude Code 只读，Codex 写路径 |

---

## 特性三：`/usage` 用量视图（0.140.0）

### 是什么（机制说明）

0.140.0 新增 **`/usage`**：日/周/累计 token 活动视图，回应企业 Token 预算失控（InfoQ 米哈游/Uber 案例）的治理需求。

### 适用场景

- **适合**：Max/Team 账号成本监控、个人用量自省
- **不适合**：无登录的 headless `codex exec`（需交互 TUI）

### 前置条件

- Codex CLI 0.140.0+
- 已登录 ChatGPT/Codex 账号

### 详细使用步骤（业务用户）

1. `codex login`
2. TUI 输入 `/usage`
3. 切换 daily / weekly / cumulative 视图
4. 对照组织预算调整 model 与 approval_policy

### 命令与配置示例

```bash
codex
/usage
```

**配合 config 降本**

```toml
model = "gpt-5.5-codex-mini"  # 若组织提供 fast tier
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/usage` | ⚠️ 未实测（auth 未登录，doctor 4 fail） |

### 问题与解决方案

**错误 1：usage 显示为空**

排查：`codex login`；检查账号是否有 Codex  entitlement。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.140.0 release | 官方 |
| InfoQ Token 成本文 | 产品动机一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 工程经理 | 周会 review `/usage` |
| 个人开发者 | 设 mental budget 防 Agent 空转 |

---

## 特性四：`codex doctor` 与 `features list`（本地实测）

### 是什么（机制说明）

`codex doctor` 诊断 auth、app-server、sandbox、feature flags；`codex features list` 列出各 feature 状态（stable / under development / removed）。

### 适用场景

- **适合**：新环境 setup、CI 预检、迁移后验证
- **不适合**：已稳定运行的 daily driver（除非升级后）

### 前置条件

- Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex --version`
2. `codex doctor` 查看 fail 项
3. `codex features list` 确认所需 feature enabled
4. 修复 auth：`codex login`

### 命令与配置示例

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor 2>&1 | tail -10
./node_modules/.bin/codex features list 2>&1 | head -20
```

### 本地测试结果

| 项 | 输出 | 结果 |
|----|------|------|
| version | codex-cli 0.140.0 | ✅ |
| doctor | 12 ok · 1 warn · 4 fail | ⚠️ auth/app-server 未配置 |
| features | browser/computer stable | ✅ |

### 问题与解决方案

**错误 1：4 fail（auth）**

排查：预期无 Key 环境；运行 `codex login`。

**错误 2：app-server not running**

排查：headless 环境正常；App 功能需 Desktop。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| CLI help | 官方 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 加 `codex doctor --json` gate |
| 新用户 | 首次 setup 必跑 doctor |

---

## 特性五：0.141.0-alpha 预发布线与 remote compaction v2（观察）

### 是什么（机制说明）

6/16 GitHub 发布 **0.141.0-alpha.3**（06:07 UTC），alpha.2/alpha.1 同日更早。0.140.0 changelog 已含 **remote compaction v2 default**、token budget context tool、context remaining tool 等 PR——alpha 线验证下一稳定版。

### 适用场景

- **适合**：早期尝鲜、贡献 codex 开源
- **不适合**：生产 CI pin `@latest`

### 前置条件

- 明确接受 alpha 不稳定

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@0.141.0-alpha.3`
2. 隔离目录测试
3. 关注 GitHub releases 转 stable 信号

### 命令与配置示例

```bash
npm install @openai/codex@0.141.0-alpha.3
codex --version
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| alpha 安装 | ⚠️ 本任务 pin @latest=0.140.0 |
| GitHub releases | ✅ alpha.3 @ 2026-06-16T06:07Z |

### 问题与解决方案

**错误 1：alpha 与 stable 行为差异**

排查：勿混用；生产 stay 0.140.0。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub releases | 官方 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 贡献者 | 跟 alpha 提 issue |
| 生产用户 | 等待 0.141 stable |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| App changelog | 2026-06-16 | EEA/UK/CH Computer Use、Chrome、Memories、Chronicle |
| 0.141.0-alpha.3 | 2026-06-16 | 预发布迭代 |
| 0.140.0 | 2026-06-15 | `/import`、`/usage`、delete、Bedrock auth |
| App 26.609 | 2026-06-11 | Browser Developer mode、Computer Use Enterprise |

## 今日研究员结论

**6/16 最大增量在 App 合规扩展**，CLI 生产仍应 pin **0.140.0**。欧洲开发者终于获得与北美对等的 Computer Use——Memories 默认 off 是 GDPR 正确姿势。Fable 5 停服第 5 天，建议 Claude Code 用户评估 **`/import` 试点** 并跑 `codex doctor`。alpha 0.141 线活跃但勿上生产；关注 remote compaction v2 对长会话成本的改善。

---
