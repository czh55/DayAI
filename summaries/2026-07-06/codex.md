# OpenAI Codex 每日技术文档 — 2026-07-06

> 本地实测版本：**0.142.5**（stable `@latest`）/ **0.143.0-alpha.37**（预发布，本地安装）｜监测源：[Codex Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 6 日 Codex 预发布线更新至 **0.143.0-alpha.37**（7/6 18:11Z），距 alpha.36（7/5 01:02Z）约 41 小时。npm `@openai/codex@latest` **仍指向稳定版 0.142.5**（7/1，WebSocket trace 修复），生产通道无变化。本地实测 alpha.37：`codex --version` → `codex-cli 0.143.0-alpha.37`；`codex doctor` → **12 ok · 1 idle · 5 notes · 1 warn · 4 fail**；`features list` 显示 **`code_mode_host`** under development、`browser_use` 族 stable。GPT-5.6 Sol/Terra/Luna 仍 **limited preview**（6/26 官方），社区 7/7–9 窗口倒计时 1 天——⚠️ 非官方确认。

---

## 特性一：预发布 0.143.0-alpha.37（2026-07-06 18:11Z）— 今日主更新

### 是什么（机制说明）

GitHub [rust-v0.143.0-alpha.37](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.37) 于 7/6 18:11Z 发布，标记 **Pre-release**。Release notes 仅「Release 0.143.0-alpha.37」，无详细 changelog（与 alpha.33–36 惯例一致）。npm 可装 `@openai/codex@0.143.0-alpha.37`，`@latest` 未跟进。相较 alpha.36，`features list` 结构一致，`code_mode_host` 旗标延续。稳定版 **0.142.5** 今日无更新，生产仍应锁定 `@latest`。

### 适用场景

- **适合**：跟踪 0.143 分支的早期采用者、CI 金丝雀
- **不适合**：生产依赖、无回退计划团队

### 前置条件

- 显式安装 `@openai/codex@0.143.0-alpha.37`；隔离环境勿覆盖全局 stable

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@0.143.0-alpha.37` → `codex --version` 确认
2. `codex doctor` + `codex features list` 对比 stable
3. 回退：`npm install @openai/codex@0.142.5`

### 命令与配置示例

```bash
npm install @openai/codex@0.143.0-alpha.37 && codex --version
npm view @openai/codex version   # 0.142.5
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| alpha.37 安装 | ✅ |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| `code_mode_host` | ✅ under development false |
| npm `@latest` | ✅ 仍 0.142.5 |
| 推理实测 | ⚠️ 无 API Key |

### 问题与解决方案

**alpha/stable 差异**：`codex features list` diff。**误装 alpha**：`npm install @openai/codex@latest` 回退。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.37 7/6 18:11Z | ✅ |
| npm 可安装 / `@latest` 0.142.5 | ✅ |
| 详细 changelog | ❌ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人尝鲜 | 虚拟机测试 alpha.37 |
| 企业 | 等 stable 0.143 GA |

---

## 特性二：`codex doctor` 环境诊断（alpha.37 实测）

### 是什么（机制说明）

`codex doctor` 扫描 CLI、app-server、认证、配置、git、reachability 等，输出 **ok / idle / notes / warn / fail**。alpha.37 实测：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**；app-server **not running**（ephemeral，CLI-only 预期）；`auth.credentials` fail（无 `~/.codex/auth.json`）；`config.toml` missing 但 `config.load` ok（默认配置 + 33 flags 启用）。

### 适用场景

- **适合**：首次安装、升级后、CI 健康检查
- **不适合**：替代推理或功能测试

### 前置条件

- 已安装 codex CLI

### 详细使用步骤（业务用户）

1. `codex doctor` 阅读汇总 → `--all` 展开 fail
2. `codex doctor --json` 用于 CI
3. 修复：`codex login` 或 `OPENAI_API_KEY`

### 命令与配置示例

```bash
codex doctor 2>&1 | tail -3
codex doctor --json | jq '.checks["auth.credentials"].status'
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 汇总 | ✅ 12 ok · 4 fail |
| app-server | ○ ephemeral not running |
| auth | ✗ no credentials |
| config.load | ✓ ok（toml missing） |

### 问题与解决方案

**4 fail 无 Key**：`codex login` 或 `OPENAI_API_KEY`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本日 alpha.37 | ✅ 与 7/5 模式一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 升级后跑 doctor |
| CI | `--json` 检查关键项 |

---

## 特性三：`codex features list` 与 `browser_use` stable 族

### 是什么（机制说明）

`codex features list` 列出功能开关状态：stable / under development / removed。alpha.37：**browser_use、browser_use_external、browser_use_full_cdp_access** 均为 **stable true**；**code_mode、code_mode_host、code_mode_only** 为 **under development false**；`collaboration_modes` removed。doctor JSON 亦确认 `browser_use` 等 33 项 flags 已启用。

### 适用场景

- **适合**：排查功能不可用、对比 alpha/stable
- **不适合**：替代官方 docs

### 前置条件

- Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex features list`（`--all` / `--json`）
2. 关注 `browser_use*` 与 `code_mode*` 状态

### 命令与配置示例

```bash
codex features list 2>&1 | rg "browser_use|code_mode"
```

### 本地测试结果

| 功能 | alpha.37 |
|------|----------|
| browser_use 族 | ✅ stable true |
| code_mode_host | ⚠️ under dev false |
| computer_use | ✅ stable true |

### 问题与解决方案

**code_mode_host 不可用**：等后续 alpha。**browser_use 失败**：`codex doctor` 查 sandbox。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 + doctor flags | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Agent 开发者 | 优先 browser_use stable |
| Code mode 关注者 | 跟踪 code_mode_host 转正 |

---

## 特性四：`config.toml` 配置体系

### 是什么（机制说明）

Codex 通过 `~/.codex/config.toml` 或项目级 `config.toml` 配置 model、approval、sandbox、日志。`codex doctor` 的 `config.load` 列出 CODEX_HOME、config 路径、enabled flags、model provider。本环境 `~/.codex/config.toml` **missing**，CLI 以默认运行；doctor 仍 **config loaded**，33 flags 启用，`model = <default>`。

### 适用场景

- **适合**：统一团队 model/approval、sandbox 定制
- **不适合**：替代 `codex login`

### 前置条件

- 了解 [Codex 配置文档](https://developers.openai.com/codex/cli/config)

### 详细使用步骤（业务用户）

1. 创建 `~/.codex/config.toml` 或项目 `config.toml`
2. 设 model / approval / sandbox → `codex doctor` 验证

### 命令与配置示例

```toml
model = "gpt-5.3-codex"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| config.toml | ⚠️ missing |
| config.load | ✅ ok |
| enabled flags | ✅ 33 |

### 问题与解决方案

**不生效**：查 `CODEX_HOME`。**sandbox 拒绝**：调 `sandbox_mode`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| doctor + 官方文档 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 | 版本控制项目 config.toml |
| 个人 | 全局设默认 model |

---

## 特性五：`codex exec` 非交互模式（稳定能力）

### 是什么（机制说明）

`codex exec` 非交互执行 Codex 任务，适合 CI、脚本化代码生成；配合 `config.toml` 指定 model/sandbox/approval。与 `browser_use` stable 结合可支持自动化浏览器任务（需认证与 sandbox 许可）。

### 适用场景

- **适合**：CI 自动修复、batch 审查
- **不适合**：多轮人机协作设计

### 前置条件

- Codex CLI + API 认证；`config.toml` 已配置

### 详细使用步骤（业务用户）

1. 配置 `config.toml` → `codex exec "fix lint errors in src/"`
2. 检查 diff / 退出码；CI 可用 `--full-auto`

### 命令与配置示例

```bash
codex exec "Add unit tests for utils/parser.ts"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec` | ⚠️ 未实测推理 |
| `--help` | ✅ |

### 问题与解决方案

**认证失败**：`codex login` 或 `OPENAI_API_KEY`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Codex CLI 文档 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 集成 exec + doctor |
| 个人 | 交互 `codex` 更灵活 |

---

## 特性六：GPT-5.6 Sol 预览仍受限（6/26 官方，7/6 窗口前夜）

### 是什么（机制说明）

OpenAI 6/26 宣布 **GPT-5.6 Sol**（旗舰）、**Terra**（均衡 2× 便宜于 5.5）、**Luna**（快速低价）**有限预览**，经 API/Codex 向 trusted partners 开放，非全体可用。社区传闻 Codex App 源码含 `gpt-5.6-sol/terra/luna`，**7/7–9** 全面发布——⚠️ 推测。alpha.37 持续日更或为先导信号，但本日 `features list` 与 `config.toml` **未显示** GPT-5.6 公开可用。

### 适用场景

- **适合**：等待 5.6 的 Codex 用户、partner 持有者
- **不适合**：基于泄露日期排期

### 前置条件

- partner 资格或等待 GA；关注最新 alpha

### 详细使用步骤（业务用户）

1. 每日查 [GitHub releases](https://github.com/openai/codex/releases) 与 `features list`
2. 7/7 前后关注 [官方博客](https://openai.com/index/previewing-gpt-5-6-sol/)

### 命令与配置示例

```toml
model = "gpt-5.6-terra"   # ⚠️ 推测，当前未开放
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GPT-5.6 可用 | ❌ 未开放 |
| limited preview | ✅ 与官方一致 |
| 7/7 传闻 | ⚠️ 未确认 |

### 问题与解决方案

**无法访问 5.6**：等 GA 或申请 partner。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| OpenAI 6/26 博客 | ✅ limited preview |
| 7/7 定档 | ⚠️ 未官方确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Codex 用户 | 7/6–7/9 紧盯 releases |
| 成本敏感者 | Terra/Luna 或优于 Fable 5 |

## 版本对照表

| 版本 | 日期 | 通道 | 要点 |
|------|------|------|------|
| 0.143.0-alpha.37 | 7/6 18:11Z | pre-release | **今日更新**；`code_mode_host` 延续 |
| 0.143.0-alpha.36 | 7/5 01:02Z | pre-release | 首现 `code_mode_host` |
| 0.143.0-alpha.35 | 7/3 | pre-release | — |
| 0.142.5 | 7/1 | **stable** | WS trace；npm `@latest` |

## 今日研究员结论

Codex **7/6 有预发布更新**：alpha.37 显示 0.143 活跃，release notes 仍无详细说明，**生产仍推荐 0.142.5**（`@latest` 未变）。体检 **12 ok · 4 fail** 与前几日一致，缺口在认证；`browser_use` stable 可用于 Agent，`code_mode_host` 仍开发中。最大变量 **GPT-5.6 窗口**（limited preview + 社区 7/7 传闻）。建议：生产锁定 0.142.5；尝鲜者隔离跟踪 alpha.37；7/7 起每日查 releases。
