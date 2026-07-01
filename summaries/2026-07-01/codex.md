# OpenAI Codex 每日技术文档 — 2026-07-01

> 本地实测版本：**0.142.5**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 7 月 1 日 npm `@openai/codex@latest` 实测稳定版升至 **0.142.5**（`rust-v0.142.5`，发布于 **2026-07-01T01:15:02Z**）。核心变更：**防止完整 Responses WebSocket 请求 payload 写入 trace 日志**（#30771），属安全/隐私补丁。预发布线同步 **0.143.0-alpha.32**（7/1 03:47Z）。本地 `codex doctor`：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**；`features list` 显示 `browser_use` stable、`code_mode` under development。

---

## 特性一：Codex CLI 0.142.5 — WebSocket Trace 日志安全修复（2026-07-01）

### 是什么（机制说明）

**0.142.5** 修复：当启用 trace 日志时，**完整 Responses WebSocket 请求 payload 可能被写入日志** 的问题。修复后避免敏感 prompt/响应内容意外落盘。无其他用户可见功能变更；与 0.142.4 行为一致，仅日志安全性提升。

### 适用场景

- **适合**：生产环境、CI、启用 trace 调试的企业团队
- **不适合**：需要旧版完整 payload trace 的深度调试（应改用显式 debug 标志）

### 前置条件

- Node.js 18+
- `npm install @openai/codex@latest`

### 详细使用步骤（业务用户）

1. `cd tools && npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.142.5`
3. `codex doctor` 确认环境
4. 若生产启用 trace，验证日志不再含完整 WebSocket payload
5. 继续 `codex exec` 日常任务

### 命令与配置示例

```bash
npm install @openai/codex@0.142.5
codex --version
codex doctor
```

```toml
# ~/.codex/config.toml
[logging]
# trace 行为已修复；按需启用
trace = false
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `codex-cli 0.142.5` |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| vs 昨日 0.142.4 | ✅ +1 patch |

```bash
./node_modules/.bin/codex --version
# codex-cli 0.142.5
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**doctor 4 fail**：通常 auth 或 app-server — `codex login`。**升级后版本仍显示 0.142.4**：检查 `npm ls @openai/codex` 全局/本地冲突。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub rust-v0.142.5 | ✅ #30771 |
| npm @latest 7/1 | ✅ 0.142.5 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 立即升级 0.142.5 |
| 安全合规 | 审计历史 trace 日志是否曾泄露 payload |
| 个人开发者 | 低风险升级，无功能变化 |

---

## 特性二：0.143.0-alpha.32 预发布线（2026-07-01）

### 是什么（机制说明）

**0.143.0-alpha.32**（`rust-v0.143.0-alpha.32`）于 2026-07-01T03:47:02Z 发布，Release body 为简短「Release 0.143.0-alpha.32」，无详细 changelog 条目。alpha 线通常预览下一 minor 特性，stable 用户无需跟进。

### 适用场景

- **适合**：愿意承担不稳定风险的早期采用者、OpenAI 内部测试者
- **不适合**：生产 CI pin `@latest`

### 前置条件

- 明确安装 alpha 标签版本

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@0.143.0-alpha.32`
2. 在隔离环境测试新特性
3. 勿与 stable 0.142.5 混用同一全局安装

### 命令与配置示例

```bash
npm install @openai/codex@0.143.0-alpha.32
codex --version
codex features list 2>&1 | head -20
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| stable @latest | ✅ 0.142.5（非 alpha） |
| alpha.32 安装 | ⚠️ 未单独安装 alpha |

### 问题与解决方案

**alpha 与 stable 行为差异**：始终在 Docker/分支环境测试。**features 显示 under development**：`code_mode` 等仍非 stable。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub pre-release | ✅ alpha.32 存在 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 保持 0.142.5 |
| 尝鲜者 | 跟踪 alpha release notes |

---

## 特性三：`codex doctor` 环境诊断（持续有效）

### 是什么（机制说明）

`codex doctor` 扫描 CLI 安装、auth、app-server、control socket、sandbox 等子系统，输出 **ok / idle / notes / warn / fail** 摘要。本环境典型结果：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**（auth 与 app-server 未运行导致 fail）。

### 适用场景

- **适合**：首次安装、升级后验证、CI 环境检查
- **不适合**：替代实际 `codex exec` 任务测试

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. `codex doctor` 查看完整报告
2. `codex doctor --summary compact` 紧凑输出
3. `codex doctor --json` 机器可读（redacted）
4. 针对 fail 项：`codex login`、启动 app-server（桌面用户）
5. 重跑 doctor 确认

### 命令与配置示例

```bash
codex doctor
codex doctor 2>&1 | tail -10
codex doctor --summary compact
codex login
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor 摘要 | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| app-server | idle / not running（云环境预期） |

### 问题与解决方案

**4 fail 在云 CI**：通常无桌面 app-server，可忽略若仅用 `codex exec`。**auth fail**：`codex login` 或设置 `OPENAI_API_KEY`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官方 CLI help | ✅ |
| 本环境 7/1 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后第一步跑 doctor |
| CI | `--json` 接入 pipeline gate |

---

## 特性四：`codex features list` — 特性开关一览（持续有效）

### 是什么（机制说明）

`codex features list` 列出 CLI/App 特性及状态：**stable**、**under development**、**removed**。本环境 7/1 摘录：`browser_use` stable、`code_mode` under development、`auto_compaction` stable、`collaboration_modes` removed 等。用于判断当前版本是否支持 Code mode、Web Search、Browser Developer mode 等。

### 适用场景

- **适合**：升级后确认特性可用性、编写依赖特定特性的脚本
- **不适合**：查看未在 features 注册的细粒度配置

### 前置条件

- codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex features list` 查看全部
2. `codex features list 2>&1 | head -15` 快速浏览
3. 对照 [developers.openai.com/codex/changelog](https://developers.openai.com/codex/changelog) 了解 stable 晋升
4. 在 `~/.codex/config.toml` 启用 under development 特性（若文档允许）

### 命令与配置示例

```bash
codex features list 2>&1 | head -15
codex features list 2>&1 | grep -E "code_mode|browser"
```

```toml
# ~/.codex/config.toml（示例，以官方文档为准）
[features]
# 部分特性需显式启用
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` | ✅ 正常输出 |
| `browser_use` | stable |
| `code_mode` | under development |

### 问题与解决方案

**Code mode 不可用**：检查 features 状态与模型 metadata（0.142.2 起 warn 缺 metadata）。**browser_use 失败**：检查 sandbox 与网络权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.142.2 changelog Code mode warn | ✅ |
| 本环境 features list | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 自动化脚本 | 升级后先 `features list` 再改 workflow |
| 前端全栈 | 关注 browser_use stable |

---

## 特性五：`codex exec` 与 `/goal` — 非交互任务执行（0.142.x 持续）

### 是什么（机制说明）

**`codex exec`** 在 headless 模式执行单次任务，适合 CI 与脚本。**`/goal`**（App/交互模式）设定长程目标由 agent 自主推进。0.142.2 引入 MCP tool search 默认启用、Code mode 警告等，0.142.5 继承全部 stable 行为。

### 适用场景

- **适合**：CI 自动修测试、批量 refactor 脚本、长程工程任务（App）
- **不适合**：需精细逐步确认的 pair programming（用交互 TUI）

### 前置条件

- `codex login` 或有效 API Key
- 项目目录可写（sandbox 策略）

### 详细使用步骤（业务用户）

1. 进入项目根目录
2. `codex exec "Run npm test and fix any failures"`
3. 审阅 diff，确认后提交
4. App 用户：打开 Codex App → 输入 `/goal` + 长程目标描述
5. 配置 `~/.codex/config.toml` 默认模型与 sandbox

### 命令与配置示例

```bash
codex exec "Add unit tests for utils/date.ts"
codex exec --full-auto "Fix lint errors in src/"
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5-codex"

[sandbox]
mode = "workspace-write"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 命令存在 |
| 实际 exec 推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**exec 无输出**：检查 auth。**PowerShell 安全拒绝**：0.142.2 起未检查 AST 区域需 approval。**远程图片错误**：0.142.2 改为 model-visible 错误文本。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.142.2 feature list | ✅ MCP tool search |
| GitHub releases | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | `codex exec` 接入 nightly fix 流水线 |
| 个人 | App `/goal` 处理跨文件长任务 |

---

## 版本对照表

| 版本 | 发布时间 (UTC) | 要点 |
|------|---------------|------|
| 0.142.5 | 2026-07-01 01:15 | WebSocket trace 日志修复（今日 stable） |
| 0.143.0-alpha.32 | 2026-07-01 03:47 | 预发布 |
| 0.142.4 | 2026-06-29 05:04 | maintenance-only |
| 0.142.2 | 2026-06-25 07:32 | MCP tool search、Code mode warn |

## 今日研究员结论

**7/1 Codex 主线是 stable 升至 0.142.5 的安全补丁**——生产环境建议立即 `npm install @openai/codex@latest`。功能面与 0.142.4 相同；追新特性继续盯 alpha.32 与 `features list` 中 `code_mode` 晋升 stable 信号。与 Anthropic Fable 5 恢复、Cursor Team MCP 同日，三大 Agent CLI 工具链均在「企业安全 + 稳定维护」方向迭代。
