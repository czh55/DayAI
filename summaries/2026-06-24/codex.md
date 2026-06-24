# OpenAI Codex 每日技术文档 — 2026-06-24

> 本地实测版本：**0.142.0**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 24 日本地实测稳定版 **codex-cli 0.142.0**（与 6/22 发布一致，无新稳定版）。**0.143.0-alpha** 预发布线当日密集推送 **alpha.13、alpha.14、alpha.15**（最新 19:41 UTC），Release body 为空。`codex doctor`：**12 ok · 1 warn · 4 fail**（auth 未登录）；`features list` 显示 `browser_use`、`auto_compaction` 为 stable，`code_mode` 仍为 under development。

---

## 特性一：稳定版 0.142.0 功能集（2026-06-22 发布）

### 是什么（机制说明）

0.142.0 为当前 npm `@openai/codex@latest` 稳定版（本环境实测确认），主要包含 6/22 前后累积特性：

- **`/usage`**：credits 兑换与用量查看
- **`/plugins`**：分区推荐与插件管理增强
- **Rollout token 预算**：控制长任务 token 消耗
- **Indexed web-search**：索引化网页搜索提升 Agent 检索效率

### 适用场景

- **适合**：生产环境 CLI Agent；CI 非交互 `codex exec`；日常编码辅助
- **不适合**：需要 `code_mode` stable 的场景（仍为 under development）

### 前置条件

- Node.js 18+
- OpenAI / ChatGPT 账号与 API 访问
- `npm install @openai/codex@latest`

### 详细使用步骤（业务用户）

1. 安装：`cd tools && npm install @openai/codex@latest`
2. 验证：`./node_modules/.bin/codex --version` → `codex-cli 0.142.0`
3. 诊断：`codex doctor` 检查环境
4. 登录：`codex login`（交互式 OAuth）
5. 交互会话：`codex` 启动 TUI
6. 查看用量：会话内 `/usage`
7. 管理插件：会话内 `/plugins`

### 命令与配置示例

**版本与诊断**

```bash
codex --version
codex doctor
codex features list | head -20
```

**非交互执行**

```bash
codex exec "Run npm test and fix any failures"
```

**config.toml 基础片段 `~/.codex/config.toml`**

```toml
[model]
default = "gpt-5.4"

[approval]
mode = "suggest"

[features]
browser_use = true
auto_compaction = true
```

**查看 feature flags**

```bash
codex features list 2>&1 | rg "stable|under development"
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.142.0

./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

./node_modules/.bin/codex features list 2>&1 | head -15
# browser_use stable true
# code_mode under development false
```

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.142.0 |
| `doctor` | ✅ 12 ok · 1 warn · 4 fail（auth 未登录） |
| `features list` | ✅ 正常输出 |
| 推理实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：doctor 4 fail — auth 相关**

排查：运行 `codex login`；检查 `OPENAI_API_KEY` 或 ChatGPT 订阅状态。

**错误 2：app-server not running**

排查：doctor 显示 ephemeral mode 正常；首次启动 `codex` 会自动拉起。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Release 0.142.0 @ 6/22 | ✅ |
| npm @latest | ✅ 0.142.0 |
| Changelog 6/22 iOS 条目 | ✅ 同期发布波 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 锁定 0.142.0，勿用 alpha |
| 新用户 | 先 `codex doctor` 再 `codex login` |
| 与 Claude Tag 对照 | 团队协作选 Claude Tag；终端/CI 选 Codex CLI |

---

## 特性二：0.143.0-alpha 预发布线（2026-06-24 密集推送）

### 是什么（机制说明）

6 月 24 日 GitHub Releases 单日发布 3 个 alpha 版本：

| Tag | 发布时间 (UTC) |
|-----|----------------|
| rust-v0.143.0-alpha.13 | 2026-06-24T03:24Z |
| rust-v0.143.0-alpha.14 | 2026-06-24T05:42Z |
| rust-v0.143.0-alpha.15 | 2026-06-24T19:41Z |

Release body 均为空，表明 CI 自动构建推送，尚未撰写公开 release notes。推测 0.143.0 稳定版将包含 `code_mode` 等 under development 特性转正。

### 适用场景

- **适合**：愿意承担风险的早期测试者；跟踪 OpenAI Agent 路线图
- **不适合**：生产 CI/CD；需要稳定 API 的企业部署

### 前置条件

- 手动安装 alpha tag（非 npm @latest）
- 独立测试环境

### 详细使用步骤（业务用户）

1. ⚠️ 不推荐生产使用
2. 跟踪 [GitHub Releases](https://github.com/openai/codex/releases) 等待 0.143.0 稳定版与 release notes
3. 对比 `codex features list` 在 alpha vs 0.142.0 的 diff
4. 稳定版发布后：`npm install @openai/codex@latest`

### 命令与配置示例

**安装特定 alpha（仅测试）**

```bash
npm install @openai/codex@0.143.0-alpha.15
./node_modules/.bin/codex --version
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| npm @latest | ✅ 仍为 0.142.0（未自动升级 alpha） |
| alpha.15 GitHub | ✅ 存在，body 空 |
| alpha 安装 | ⚠️ 未安装（保持生产稳定版） |

### 问题与解决方案

**错误 1：误装 alpha 导致 CI 不稳定**

排查：package.json pin `"@openai/codex": "0.142.0"`；勿用 `@latest` 若 npm 未来指向 alpha。

**错误 2：alpha 与 0.142.0 config 不兼容**

排查：备份 `~/.codex/config.toml`；查阅稳定版 migration guide。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Releases | ✅ 3 版/日 |
| npm dist-tags | ✅ latest → 0.142.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 普通开发者 | 忽略 alpha，等稳定版 |
| 平台团队 | 在 staging 环境跟踪 alpha feature flag 变化 |

---

## 特性三：codex doctor 环境诊断（0.142.0）

### 是什么（机制说明）

`codex doctor` 输出结构化健康检查，涵盖：

- CLI 版本与配置路径
- Auth 状态
- App-server daemon 状态
- Feature flags 可用性
- 汇总：`N ok · N warn · N fail`

支持 `--summary` 紧凑输出与 `--json` 脱敏报告。

### 适用场景

- **适合**：首次安装排错；CI 预检；升级后验证
- **不适合**：替代实际推理测试

### 前置条件

- codex-cli 已安装

### 详细使用步骤（业务用户）

1. `codex doctor` 全量检查
2. `codex doctor --summary` 快速查看
3. 针对 fail 项逐项修复（通常 auth 优先）
4. 修复后重跑至 0 fail（或接受预期 warn）

### 命令与配置示例

**基础**

```bash
codex doctor
codex doctor 2>&1 | tail -3
```

**JSON 报告（CI 集成）**

```bash
codex doctor --json > codex-health.json
```

### 本地测试结果

```
12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

| 分类 | 结果 |
|------|------|
| CLI 安装 | ✅ ok |
| Auth | ❌ fail（未登录，预期） |
| App-server | ⚠️ not running（ephemeral 模式正常） |

### 问题与解决方案

**错误 1：4 fail 全为 auth**

排查：`codex login`；设置 `OPENAI_API_KEY`。

**错误 2：warn 关于 update-loop pid file missing**

排查：非致命；首次运行或 ephemeral 模式下可忽略。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| CLI --help | ✅ doctor 子命令存在 |
| 本日实测 | ✅ 与 6/23 结果一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 加入 `codex doctor --summary` 门禁 |
| 开发者 | 升级前后各跑一次对比 |

---

## 特性四：codex features list 与 code_mode 路线图（0.142.0）

### 是什么（机制说明）

`codex features list` 列出所有 feature flag 及状态：

- **stable**：生产可用（如 `browser_use`、`auto_compaction`、`computer_use`）
- **under development**：实验性（如 `code_mode`、`chronicle`、`artifact`）
- **removed**：已移除

`code_mode` 仍为 under development，暗示未来 dedicated 代码模式可能与 Claude Code `--safe-mode` 对标。

### 适用场景

- **适合**：确认某特性是否可用；编写依赖特定 feature 的脚本前预检
- **不适合**：替代官方文档的完整特性说明

### 前置条件

- codex-cli 已安装

### 详细使用步骤（业务用户）

1. `codex features list` 查看全表
2. `codex features list 2>&1 | rg code_mode` 过滤关注项
3. 在 `config.toml` 中启用 stable feature
4. under development 特性等待稳定版或联系 OpenAI 早期访问

### 命令与配置示例

```bash
codex features list 2>&1 | head -20
codex features list 2>&1 | rg "code_mode|browser_use|chronicle"
```

**启用 browser_use（stable）**

```toml
[features]
browser_use = true
browser_use_external = true
```

### 本地测试结果

| Feature | 状态 | enabled |
|---------|------|---------|
| browser_use | stable | true |
| code_mode | under development | false |
| auto_compaction | stable | true |
| chronicle | under development | false |

### 问题与解决方案

**错误 1：config 启用 under development feature 无效**

排查：等待 0.143.0 稳定版；或使用 alpha 风险自担。

**错误 2：features list 输出截断**

排查：管道至 `less` 或 `--all` 展开（若支持）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本日实测 | ✅ |
| Changelog Developer mode @ 6/11 | ✅ browser 相关 stable 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 编码 Agent 用户 | 关注 `code_mode` 转 stable 时机 |
| 安全审查 | 谨慎启用 under development feature |

---

## 特性五：codex exec 与 /goal 非交互工作流（延续特性）

### 是什么（机制说明）

`codex exec` 在非交互模式执行单次任务，适合 CI/CD。App 端 `/goal` 支持长程目标分解（Changelog 6/15 iOS 条目提及 goal workflows 改进）。CLI 与 App 共享 `~/.codex/config.toml` 配置。

### 适用场景

- **适合**：CI 自动修复测试；夜间 batch 任务；与 GitHub Action 集成
- **不适合**：需要多轮交互微调的 UI 开发

### 前置条件

- Auth 已配置
- 项目目录可写

### 详细使用步骤（业务用户）

1. 配置 auth：`codex login`
2. 进入项目目录
3. 运行：`codex exec "your task description"`
4. 检查 git diff 与测试
5. App 用户：Composer 中使用 `/goal` 设定长程目标

### 命令与配置示例

**CI 脚本**

```bash
#!/bin/bash
set -e
codex exec "Fix all eslint errors in src/ and run npm test"
git diff --stat
```

**config.toml approval 模式**

```toml
[approval]
mode = "auto-edit"  # 或 suggest / full-auto（按文档）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 子命令存在 |
| 实际 exec 推理 | ⚠️ 未实测（无 auth） |

### 问题与解决方案

**错误 1：exec 超时**

排查：增大 timeout 配置；拆分任务为更小 exec 单元。

**错误 2：exec 修改了意外文件**

排查：`config.toml` 限制 workspace；使用 git stash 保护。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI docs | ✅ exec 文档存在 |
| GitHub Action 模板 | ✅ 官方提供 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 维护者 | 从 `codex exec "run tests"` 小任务起步 |
| 与 Claude Code 对照 | Claude `-p` 对标 `codex exec` |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 0.142.0 | 2026-06-22 | 稳定版；/usage、/plugins、rollout token、indexed web-search |
| 0.143.0-alpha.15 | 2026-06-24 | 预发布；body 空 |
| 0.143.0-alpha.9 | 2026-06-23 | 前日 alpha 线 |
| App 26.616 | 2026-06-18 | Record & Replay、thread handoff |

## 今日研究员结论

**0.142.0** 继续作为生产锚点；**0.143.0-alpha** 单日 3 版暗示稳定版临近但尚无公开 notes。建议：日常开发锁定 0.142.0 + `codex doctor` 门禁；跟踪 `code_mode` 转 stable；与今日 Claude Tag 发布对照——Codex 强于终端/CI 自动化，Claude Tag 强于 Slack 协作派活。

---
