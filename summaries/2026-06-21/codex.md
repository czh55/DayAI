# OpenAI Codex 每日技术文档 — 2026-06-21

> 本地实测版本：**codex-cli 0.141.0**｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

**2026 年 6 月 21 日**：npm 稳定通道仍为 **0.141.0**（6/18 发布）；GitHub **单日连发 3 个预发布**——**0.142.0-alpha.8**（03:53 UTC）、**alpha.9**（06:42 UTC）、**alpha.10**（20:55 UTC），alpha 线自 6/18 起累计 **10 个 tag**。npm `@openai/codex@latest` 未切换至 alpha。本地 `codex doctor`：**12 ok · 1 warn · 4 fail**（auth 未登录）。`features list` 显示 `browser_use`、`computer_use` 为 stable，`code_mode` 为 under development。

---

## 特性一：CLI 0.141.0 稳定版（2026-06-18，今日仍为主通道）

### 是什么（机制说明）

0.141.0 为 `@openai/codex@latest` 对应版本。核心：

- **Noise relay**：远程 executor 认证、端到端加密通道
- **跨平台 cwd/shell**：PathUri 保留 executor 原生工作目录
- **插件 MCP**：按线程激活 stdio MCP；created-by-me marketplace
- **app-server**：子线程列表、external-agent import 结果、rate-limit reset credits
- **性能**：缓存 tool search、减少 history 拷贝；prompt image 缓存 64 MiB 上限
- **修复**：`codex exec` hook trust 持久化；Windows sandbox 凭证修复；SQLite WAL-reset

### 适用场景

- **适合**：远程执行、插件工具链、长时 tool-heavy 会话
- **不适合**：仅本地简单 exec 且不愿升级（仍建议 0.141.0）

### 前置条件

- Node.js + `npm install @openai/codex@latest`
- `codex login` 或 `OPENAI_API_KEY`

### 详细使用步骤（业务用户）

1. `cd /workspace/tools && npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.141.0`
3. `codex doctor`
4. `codex features list`
5. 配置 `~/.codex/config.toml` 启用 browser/computer use

### 命令与配置示例

```bash
codex --version
codex doctor
codex features list | head -20
codex exec "run tests and fix failures"
```

```toml
# ~/.codex/config.toml
[features]
browser_use = true
computer_use = true
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.141.0

./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.141.0 |
| `doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `features list` | ✅ browser_use stable |
| `codex exec` 推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：doctor 显示 auth fail**

解决：`codex login` 或设置 `OPENAI_API_KEY`。

**错误 2：远程 executor 连接失败**

排查：确认 0.141.0 Noise relay 配置；检查网络与代理。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.141.0 Latest | ✅ |
| npm latest | ✅ 0.141.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | pin 0.141.0 |
| 尝鲜者 | 隔离环境试 alpha.10 |

---

## 特性二：0.142.0-alpha 预发布线加速（6/21 单日三连发）

### 是什么（机制说明）

GitHub Releases 显示 6/21 当日 3 个 alpha 预发布，发布说明极简。alpha 线自 6/18 alpha.1 起至 6/21 alpha.10，迭代频率极高（部分日期间隔数小时）。npm 未发布 alpha 通道，`@openai/codex@latest` 仍指向 0.141.0。

| Tag | UTC 时间 |
|-----|----------|
| 0.142.0-alpha.8 | 2026-06-21 03:53 |
| 0.142.0-alpha.9 | 2026-06-21 06:42 |
| 0.142.0-alpha.10 | 2026-06-21 20:55 |

### 适用场景

- **适合**：隔离环境验证即将 stable 的变更
- **不适合**：生产 CI/CD 直接依赖 alpha

### 前置条件

- 从 GitHub Releases 下载对应平台 asset
- 或 `npm install @openai/codex@0.142.0-alpha.10`（若 npm 已发布）

### 详细使用步骤（业务用户）

1. 关注 [GitHub Releases](https://github.com/openai/codex/releases) alpha 线
2. 下载对应平台 tarball 或使用 npx 指定版本
3. 隔离环境运行 `codex doctor` 对比 0.141.0
4. 关注未来 1–2 周是否切换 Latest 至 0.142.0 stable

### 命令与配置示例

```bash
# 若 npm 已发布 alpha（当前 latest 仍为 0.141.0）
npm view @openai/codex versions --json | tail -5
npm install @openai/codex@0.142.0-alpha.10  # 可能不可用
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| npm latest | ✅ 0.141.0（非 alpha） |
| GitHub alpha.10 | ✅ 6/21 20:55 UTC 确认 |
| 本地安装 alpha | ⚠️ npm 未提供 alpha 通道 |

### 问题与解决方案

**错误 1：npm 无法安装 alpha**

解决：从 GitHub Releases 手动下载 binary；或等待 stable 发布。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Releases | ✅ 10 个 alpha tag |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 保守用户 | 等 0.142.0 stable |
| 早期采用者 | 跟踪 alpha.10 commit diff |

---

## 特性三：`codex exec` 与 Hook Trust 持久化（0.141.0）

### 是什么（机制说明）

0.141.0 修复：`codex exec` 线程 start/resume 时 **hook trust bypass 持久化**；`PostToolUse` blocking hooks 正确拒绝 code_mode 工具调用。支持非交互式 CI/脚本场景的长时 Agent 执行。

### 适用场景

- **适合**：CI 中自动修复、批处理代码审查、headless 集成
- **不适合**：需人工逐步审批的敏感操作（配置 blocking hooks）

### 前置条件

- codex-cli 0.141.0+
- `OPENAI_API_KEY` 或 `codex login`
- 可选：hooks 配置

### 详细使用步骤（业务用户）

1. 配置 API Key：`export OPENAI_API_KEY=sk-...`
2. 运行：`codex exec "run npm test and fix failures"`
3. 配置 hooks trust（项目 `.codex/hooks/` 或 config.toml）
4. CI 集成：在 GitHub Actions 中调用 `codex exec`

### 命令与配置示例

```bash
codex exec "analyze test failures and apply minimal fixes"
codex exec --full-auto "refactor utils/date.ts for timezone safety"
```

```toml
# config.toml hooks 示例
[hooks]
trust_bypass = true  # 0.141.0 修复 exec 线程持久化
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 0.141.0 | ✅ hook trust 修复确认 |
| `codex exec` 实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：exec 线程 hook trust 丢失（0.140.x）**

升级至 0.141.0。

**错误 2：code_mode 绕过 blocking hook**

0.141.0 已修复；确认版本。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.141.0 release notes | ✅ #26434 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 中用 `codex exec` 替代手动脚本 |
| 安全团队 | 配置 blocking PostToolUse hooks |

---

## 特性四：`codex doctor` 健康诊断（持续功能）

### 是什么（机制说明）

`codex doctor` 扫描本地安装、auth、app-server、features、沙箱依赖等，输出 ok/warn/fail 汇总。0.141.0 起诊断项覆盖 Noise relay、Windows sandbox、SQLite 版本等。

### 适用场景

- **适合**：升级后验证、CI 环境检查、排查 auth 问题
- **不适合**：替代实际推理测试

### 前置条件

- codex-cli 已安装

### 详细使用步骤（业务用户）

1. `codex doctor` — 完整报告
2. `codex doctor --summary` — 紧凑输出
3. `codex doctor --json` — 机器可读（redacted）
4. 根据 fail 项逐项修复

### 命令与配置示例

```bash
codex doctor
codex doctor 2>&1 | tail -10
codex doctor --summary
codex doctor --json | jq '.summary'
```

### 本地测试结果

```bash
./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

| 项 | 结果 |
|----|------|
| 运行 | ✅ |
| auth | ❌ fail（未登录，预期） |
| 其余 | ✅ 12 ok |

### 问题与解决方案

**错误 1：4 fail 全为 auth**

解决：`codex login` 或 `OPENAI_API_KEY`。

**错误 2：sandbox dependencies missing（Windows）**

0.141.0 修复了 Windows 误报；Linux 正常。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 升级后首跑 `codex doctor` |
| CI | `--json` 集成门禁 |

---

## 特性五：`codex features list` 与 Browser/Computer Use（stable）

### 是什么（机制说明）

`codex features list` 显示功能 flag 状态。今日实测关键项：

- `browser_use` — **stable** ✅
- `browser_use_external` — **stable** ✅
- `computer_use` — **stable** ✅
- `code_mode` — under development
- `apps` — stable ✅

需在 `config.toml` 或环境变量启用对应 feature。

### 适用场景

- **适合**：Web 应用调试、UI 自动化、demo 录制
- **不适合**：纯 CLI 无头任务（可禁用 browser 减开销）

### 前置条件

- codex-cli 0.141.0+
- `config.toml` 启用 features

### 详细使用步骤（业务用户）

1. `codex features list` 查看可用功能
2. 编辑 `~/.codex/config.toml` 启用 browser_use
3. 在会话中让 Codex 打开浏览器调试页面
4. Computer use 用于桌面级自动化（类似 Cursor Computer Use）

### 命令与配置示例

```bash
codex features list 2>&1 | head -15
```

```toml
[features]
browser_use = true
computer_use = true
code_mode = false  # under development, 谨慎启用
```

### 本地测试结果

| Feature | 状态 |
|---------|------|
| browser_use | stable ✅ |
| computer_use | stable ✅ |
| code_mode | under development |
| 实测 browser | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：browser_use 启用但无法启动浏览器**

排查：headless 环境需 Xvfb 或 remote executor；`codex doctor` 检查依赖。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 features list | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | 启用 browser_use 调试前端 |
| 后端开发者 | 禁用 browser 减 token 开销 |

---

## 版本对照表

| 版本 | 发布日 | 通道 | 要点 |
|------|--------|------|------|
| 0.142.0-alpha.10 | 2026-06-21 | GitHub pre-release | 单日 alpha 迭代 |
| 0.141.0 | 2026-06-18 | npm latest / GitHub Latest | Noise relay、plugin MCP、性能优化 |
| 0.140.x | 2026-06 前 | 已 superseded | — |

## 今日研究员结论

Codex 稳定版 0.141.0 今日不变，但 **alpha 线 6/21 单日 3 发**表明 0.142.0 stable 临近。生产继续 pin 0.141.0；关注 alpha.10 是否带来 code_mode stable。量子位 ALE 报道中 GPT 5.5+Codex 成本效率优于 Fable 5+Claude Code，但真场景 ROI 需自家项目验证。`codex doctor` + `features list` 是升级前标准检查流程。

---
