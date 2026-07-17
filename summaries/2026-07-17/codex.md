# OpenAI Codex 每日技术文档 — 2026-07-17

> 本地实测版本：**0.144.5**（stable，第二日）｜监测 alpha：**0.145.0-alpha.22**（7/17 17:29 UTC）｜npm `@latest` 仍为 **0.144.5**  
> 监测源：[GitHub openai/codex releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 7 月 17 日 Codex CLI 实测与发布节奏：

- **稳定版 0.144.5** 进入发布第二日，npm `@latest` 与本地安装均锁定该版本；核心变更为危险命令检测强化（#33455）
- **预发布 0.145.0-alpha.22** 于 17:29 UTC 发布，7/17 已连发 alpha.19–22，显示 0.145 stable 临近
- **5 小时滚动限额临时移除**（7/12 Tibo 公告）仍生效，周限额有效；官方未宣布恢复日期
- **竞品语境**：xAI **Grok Build** 7/16 全面开源，与 Codex 闭源生态形成对标
- **本地 CLI 诊断**：`doctor` 12 ok · 1 warn · 4 fail；`features list` 显示 `browser_use` stable、`code_mode` under development；推理能力 ⚠️ 未实测（无 API Key）

---

## 特性一：稳定版 0.144.5 危险命令检测强化（发布第二日）

### 是什么（机制说明）

[0.144.5 release](https://github.com/openai/codex/releases/tag/rust-v0.144.5)（7/16 02:54 UTC）为安全导向补丁，今日为 npm `@latest` 第二日：

> Improved dangerous-command detection, including more forced `rm` forms, and provides clearer rejection reasons when commands are denied. (#33455)

扩展 `is_dangerous_command` 对强制 `rm` 变体的识别，并在命令被拒时输出更明确原因。检测在交互模式与 `codex exec` 下均生效。[官方 Changelog 7/16](https://developers.openai.com/codex/changelog) 已同步。

### 适用场景

- **适合**：`codex exec` 自动化、CI/CD、多 Agent 并行环境
- **不适合**：依赖边缘 case `rm` 变体的遗留脚本（需人工审查）

### 前置条件

Node.js 18+ 或 GitHub release 二进制；Codex CLI ≥ 0.144.5

### 详细使用步骤（业务用户）

1. 安装/确认 0.144.5 → `codex --version` + `codex doctor`
2. 测试环境重跑脚本，观察误拦；阅读拒绝原因，必要时拆分命令

### 命令与配置示例

```bash
codex --version    # codex-cli 0.144.5
codex doctor
codex features list 2>&1 | head -15
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5.6-sol"
# 危险命令检测为内置行为，无需额外配置
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex --version` | ✅ `codex-cli 0.144.5` |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `codex features list` | ✅ browser_use stable, code_mode under development |
| 危险命令拦截 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**合法脚本被误拦**：检查强制 `rm` 变体，拆分命令或加人工确认。**版本仍为 0.144.4**：`npm cache clean --force && npm install -g @openai/codex@latest`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.5 | ✅ 7/16 02:54 UTC |
| npm @latest | ✅ 0.144.5（7/17 第二日） |
| PR #33455 / Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 维持或立即升级至 0.144.5 |
| DevOps | 审查 CI 中 `rm` / `chmod` 等敏感命令 |
| 早期采用者 | stable 与 alpha 分开跟踪 |

---

## 特性二：0.145.0-alpha.22 预发布（7/17 17:29 UTC）

### 是什么（机制说明）

GitHub [0.145.0-alpha.22](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.22) 于 **2026-07-17 17:29 UTC** 发布（commit `8969776`）。7/17 alpha 连发：

| 版本 | 发布时间 (UTC) |
|------|---------------|
| 0.145.0-alpha.19 | 16 Jul 22:10 |
| 0.145.0-alpha.20 | 17 Jul 03:03 |
| 0.145.0-alpha.22 | **17 Jul 17:29** |

npm `@latest` **未跟随** alpha。安装：`npm install -g @openai/codex@0.145.0-alpha.22`。

### 适用场景

- **适合**：隔离环境测试 0.145 新特性；CI 预发布验证
- **不适合**：生产环境、关键业务仓库

### 前置条件

承担 alpha 不稳定风险；建议容器或独立 prefix 隔离

### 详细使用步骤（业务用户）

1. 显式安装 alpha.22 → `codex --version` → `codex features list` 对比 stable
2. 隔离环境测试，问题反馈 GitHub Issues

### 命令与配置示例

```bash
npm install -g @openai/codex@0.145.0-alpha.22
codex --version    # codex-cli 0.145.0-alpha.22
codex features list 2>&1 | grep -E "under development|stable"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| alpha.22 GitHub | ✅ 2026-07-17T17:29 UTC |
| npm @latest | ✅ 仍为 0.144.5 |
| alpha 安装 / 推理 | ⚠️ 未实测 |

### 问题与解决方案

**安装失败**：Node.js ≥ 18。**PATH 冲突**：`npx @openai/codex@0.145.0-alpha.22 --version`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub releases | ✅ alpha.19–22 时间戳 |
| npm @latest | ✅ 未指向 alpha（预期） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 隔离测试 alpha.22 |
| 生产用户 | 锁定 0.144.5 |

---

## 特性三：5 小时滚动限额临时移除（7/12 起，仍生效）

### 是什么（机制说明）

Tibo（@thsottiaux）**2026-07-12** 宣布：临时移除 Plus/Business/Pro 的 **5h 滚动限额**、GPT-5.6 Sol 效率优化、一次性用量重置。长会话不再被 5h 窗口打断，**周限额仍有效**。截至 7/17（第五日）无恢复公告。

### 适用场景

- **适合**：长程 refactor、多文件迁移、端到端交付
- **不适合**：误以为完全 unlimited

### 前置条件

ChatGPT Plus/Business/Pro；Codex CLI 或 ChatGPT 桌面端

### 详细使用步骤（业务用户）

1. 确认 Plus/Pro 订阅 → 启动长程任务
2. 监控周限额（Settings → Usage）；⚠️ 趁窗口完成积压

### 命令与配置示例

```bash
codex exec "Refactor auth module to JWT"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 5h 限额移除 | ✅ Tibo X + 媒体交叉验证 |
| 长程 / 周限额 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**仍遇限额**：查周限额。**恢复**：随时可能，建议密集利用。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Tibo X 7/12 | ✅ 仍生效 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent 用户 | 立即利用窗口完成积压 |
| 团队管理员 | 通知团队窗口有限，协调用量 |

---

## 特性四：`codex exec`、`codex doctor`、`features list` 与 `config.toml`

### 是什么（机制说明）

| 命令 / 文件 | 功能 |
|-------------|------|
| `codex exec` | 非交互 Agent 任务，适合 CI；0.144.5 危险命令检测同样生效 |
| `codex doctor` | 环境健康检查（ok/warn/fail） |
| `codex features list` | 功能开关及成熟度 |
| `~/.codex/config.toml` | 模型默认、沙箱、特性开关 |

实测：**12 ok · 1 warn · 4 fail**；stable 含 `browser_use`、`code_mode_host`；under development 含 `code_mode`、`artifact`、`chronicle`。

### 适用场景

- **适合**：部署验证、CI 集成、功能探索
- **不适合**：跳过 doctor 直接生产 exec

### 前置条件

CLI 已安装；exec 推理需 API Key

### 详细使用步骤（业务用户）

1. `codex doctor` + `features list` 确认 stable 特性
2. 编辑 `config.toml` → `codex exec` 集成 CI

### 命令与配置示例

```bash
codex doctor --summary
codex features list 2>&1 | grep stable
codex exec "Add unit tests for UserService"
cat task.md | codex exec
```

```toml
[model]
default = "gpt-5.6-sol"
[features]
browser_use = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| `features list` | ✅ browser_use stable, code_mode under development |
| `codex exec --help` | ✅ |
| exec 推理 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**4 fail**：headless 环境 app-server 预期行为。**exec 超时**：拆分任务。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 0.144.5 | ✅ |
| CLI `--help` / Configuration 文档 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有用户 | 升级后运行 doctor + features list |
| DevOps | exec 集成 CI，配合 0.144.5 安全检测 |

---

## 特性五：Grok Build 开源——Codex CLI 竞品语境

### 是什么（机制说明）

xAI **2026-07-16** 发布 [xai-org/grok-build](https://github.com/xai-org/grok-build)（7.7k Star）：Rust 终端 Agent、Grok 4.5、`config.toml` 连本地模型、取消服务器端限额。Codex 优势：GPT-5.6 Sol 生态、`browser_use` stable、ChatGPT 集成、企业合规。Grok Build 优势：源码可审计、可自建、数据不出境。

### 适用场景

- **Codex**：已订阅 Plus/Pro、需 browser_use、走 OpenAI 企业通道
- **Grok Build**：数据出境敏感、需读源码、本地推理、无限额约束

### 前置条件

Codex：订阅 + API Key；Grok Build：Rust + Grok 4.5 或兼容端点

### 详细使用步骤（业务用户）

1. **Codex**：安装 latest → 配置 `config.toml` → 利用 5h 窗口
2. **Grok Build**：clone → 读源码 → 配置本地端点 → 隔离对比

### 命令与配置示例

```bash
codex exec "Fix lint errors"                              # Codex
git clone https://github.com/xai-org/grok-build           # Grok Build
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Codex 0.144.5 | ✅ 已验证 |
| Grok Build 仓库 | ✅ 7/16 发布 |
| 双栈对比 | ⚠️ 未实测（无 API Key / 无端点） |

### 问题与解决方案

**选型**：集成 + 模型质量选 Codex；隐私 + 自建选 Grok Build。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| xAI GitHub / 36氪 7/16 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业合规 | Codex 走 OpenAI；Grok Build 作源码参考 |
| 个人开发者 | 5h 窗口内用 Codex；关注 Grok Build |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 类型 | 核心变更 |
|------|-------------|------|----------|
| **0.145.0-alpha.22** | **2026-07-17 17:29** | **alpha** | **预发布（8969776）** |
| 0.145.0-alpha.20 | 2026-07-17 03:03 | alpha | 预发布 |
| 0.145.0-alpha.19 | 2026-07-16 22:10 | alpha | 预发布 |
| **0.144.5** | **2026-07-16 02:54** | **stable** | **危险命令检测 (#33455)** |
| 0.144.4 | 2026-07-14 05:08 | stable | 无用户可见变更 |

npm `@latest` → **0.144.5**（7/17 第二日）；alpha 需 `@0.145.0-alpha.22`；Changelog 最新条目仍为 0.144.5（7/16）。

## 今日研究员结论

Codex 稳定版 0.144.5 第二日，危险命令检测（#33455）为 baseline 安全要求。alpha.19–22 继续迭代，生产锁定 0.144.5。5h 限额移除第五日仍生效，为当前最大用户利好。`browser_use` stable；`code_mode` under development。Grok Build 7/16 开源提供可审计替代。推理 ⚠️ 未实测（无 API Key）。

---
