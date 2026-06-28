# OpenAI Codex 每日技术文档 — 2026-06-28

> 本地实测版本：**0.142.3**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 28 日 Codex **稳定版维持 0.142.3**（6/26 21:29Z，npm `@latest` 实测确认）。GitHub Pre-release 推送 **0.143.0-alpha.29**（**00:30Z 今日**），body 为空。**Codex Remote GA**（6/25）余波持续。InfoQ 引 Codex 负责人 Michael Bolin 称 Harness 应「尽可能小」——与 Anthropic 加厚 Harness 形成行业分歧。本地 `codex doctor`：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。`features list`：`goals` stable、`code_mode` 仍 under development。

---

## 特性一：Codex CLI 0.142.3 — 稳定版维持（纯维护 Patch）

### 是什么（机制说明）

0.142.3（`rust-v0.142.3`）为 **maintenance-only** 更新：依赖安全更新、内部构建修复，与 0.142.2 **用户体验完全一致**。6/28 无新 stable 发布。

### 适用场景

- **适合**：0.142.2 零风险升级；CI pin `@latest`
- **不适合**：期待新功能者（跟踪 alpha 线）

### 前置条件

Node.js 18+；`npm install @openai/codex@0.142.3`

### 详细使用步骤（业务用户）

1. `npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.142.3`
3. `codex doctor` + `codex features list`
4. `codex login`（若 auth fail）

### 命令与配置示例

```bash
npm install @openai/codex@0.142.3
codex --version && codex doctor
codex exec "Run npm test and fix failures"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.142.3 |
| `doctor` | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| vs 0.142.2 | ✅ 无 user-facing 变更 |

### 问题与解决方案

**doctor fail**：`codex login` 或 `OPENAI_API_KEY`。**npm 双路径 fail**：统一 PATH 指向同一 package root。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub / npm @latest | ✅ maintenance-only，6/28 无变 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 继续 pin 0.142.3 |
| 早期测试者 | 关注 alpha.29 |

---

## 特性二：0.143.0-alpha.29 — 预发布线持续加速（今日新）

### 是什么（机制说明）

**alpha.29**（2026-06-28T00:30:41Z）为今日最新 Pre-release（`rust-v0.143.0-alpha.29`），body 为空——CI 自动推送。alpha 线自 6/26 起几乎每日推送（alpha.26 → alpha.29），推测含 `code_mode`、`artifact`、`chronicle` 进展。stable 与 alpha **勿混装**。

### 适用场景

- **适合**：早期测试者跟踪下一 stable
- **不适合**：生产、CI 主分支

### 前置条件

隔离环境；`npm install @openai/codex@alpha`

### 详细使用步骤（业务用户）

1. 创建隔离环境 → `npm install @openai/codex@alpha`
2. `codex features list` 对比 0.142.3 baseline
3. 记录差异后卸载，勿污染 stable

### 命令与配置示例

```bash
npm install @openai/codex@alpha
codex --version   # 可能 0.143.0-alpha.29
codex features list 2>&1 | rg "code_mode|chronicle|artifact"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| GitHub alpha.29 | ✅ 2026-06-28T00:30Z |
| 本地安装 | ⚠️ 未安装（保持 stable） |

### 问题与解决方案

**混装**：勿同一 node_modules 装 alpha 与 stable。**行为突变**：对比 0.142.3 同任务日志。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Pre-release | ✅ 今日 alpha.29，频率持续 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 锁定 0.142.3 |
| code_mode 关注者 | 隔离试 alpha.29 |

---

## 特性三：Codex Remote GA — 手机遥控桌面 Agent（6/25 余波）

### 是什么（机制说明）

6/25 Remote 从 beta 进入 **GA**：ChatGPT 移动 App 连接已配对 Mac/Windows 主机，启动/继续任务、审查进度、**批准操作**；QR 一对一配对；6/8 后连接保持有效。

### 适用场景

- **适合**：长程 Agent 移动端审批；通勤/会议监控
- **不适合**：无 ChatGPT App；纯 CLI 环境

### 前置条件

Codex App + ChatGPT iOS/Android 最新版；QR 配对完成

### 详细使用步骤（业务用户）

1. 桌面 Codex App 启用 Remote → 显示 QR
2. 手机 ChatGPT App → Codex Remote → 扫描
3. 桌面启动长程任务；手机批准敏感操作

### 命令与配置示例

```bash
codex   # TUI 启动长程任务
# ChatGPT App → Codex Remote → Approve pending actions
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Remote GA 公告 | ✅ 6/25 Changelog |
| 手机配对 | ⚠️ 未实测 |

### 问题与解决方案

**配对失败**：两端 App 最新；6/8 前连接重配 QR。**看不到 task**：主机 App 运行中。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/25 | ✅ GA |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent | 升级 App 测审批流 |
| 安全团队 | 评估 QR 配对审计 |

---

## 特性四：`codex exec` 与 `/goal` — 非交互与长程循环

### 是什么（机制说明）

**`codex exec`**（别名 `e`）非交互执行 Agent 任务。**`/goal`**（TUI）让 Agent 循环直至验证条件满足，`goals` flag **stable**，状态存于 `~/.codex/goals_1.sqlite`。与 Claude `/loops`、Cursor Automations cron 同属 Loop Engineering。

### 适用场景

- **exec**：CI 修复、nightly 脚本
- **/goal**：overnight 修复、验证驱动循环

### 前置条件

Codex CLI ≥ 0.142.0；auth 已配置

### 详细使用步骤（业务用户）

1. `codex doctor` 确认 auth
2. 单次：`codex exec "<prompt>"`；长程：`codex` → `/goal <目标>`
3. Remote 用户手机审批；检查 git diff

### 命令与配置示例

```bash
codex exec "Run npm test and fix failures"
codex exec review
codex
# /goal 重构 auth 模块 @diagram.png
# /goal all unit tests pass and linter clean
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| exec help | ✅ |
| goals feature | ✅ stable true |
| 推理/`/goal` 实测 | ⚠️ 无 API Key |

### 问题与解决方案

**exec 超时**：检查 auth/网络。**goal 不停止**：明确验证条件。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| CLI help / features list | ✅ exec + goals stable |
| vs Claude `/loops` | ✅ 同类 Loop Engineering |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 用户 | exec + doctor preflight |
| 个人 | overnight `/goal` |

---

## 特性五：Harness「做薄」论 — Michael Bolin 访谈（InfoQ 6 月）

### 是什么（机制说明）

InfoQ 报道 Codex 开源负责人 Michael Bolin 观点：理想 Harness 应「**尽可能小**」，模型应「尽可能强」；减少工具数量、避免过度干预，让模型在接近真实终端环境中自主探索。安全与沙箱隔离是 Harness 不可替代的核心职责。与 Anthropic「长时运行 Harness 设计」形成对比。

### 适用场景

- **适合**：理解 Codex 产品哲学；评估 Harness 投资方向
- **不适合**：作为唯一工程实践标准（长程任务仍需验收闭环）

### 前置条件

阅读 [InfoQ 报道](https://www.infoq.cn/article/vblM3MlOEs86dmVdH8d1)

### 详细使用步骤（业务用户）

1. 对比 Claude Code 厚 Harness（permissions、classifyAllShell、OTel）与 Codex 薄 Harness
2. 按任务选择：交互式短任务偏薄；长程无人值守偏厚
3. `codex features list` 审计 enabled flags

### 命令与配置示例

```bash
codex features list 2>&1 | head -20
codex doctor --summary
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| features list | ✅ 33 enabled flags |
| doctor | ✅ 12 ok · 4 fail（auth 相关） |
| Bolin 访谈 | ✅ InfoQ 可溯源 |

### 问题与解决方案

**哲学 vs 实践**：薄 Harness 不意味着无沙箱——`codex doctor` 仍检查 sandbox。**长程失控**：结合 `/goal` 验证条件 + Remote 手机审批。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| InfoQ 引 Bolin | ✅ 访谈可溯源 |
| Anthropic Harness 博客 | ⚠️ 观点分歧（非矛盾，定位不同） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 架构师 | 按任务厚度选 Harness 策略 |
| 企业 | 不盲从单一哲学，建立验收闭环 |

---

## 特性六：`codex doctor` 与 `config.toml`

### 是什么（机制说明）

**`codex doctor`** 扫描版本、auth、config、MCP、网络、sandbox。**`~/.codex/config.toml`** 管理代理、feature flags、MCP、模型。6/28 实测：**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**。

### 适用场景

- **doctor**：升级验证；CI preflight；排查 auth/MCP/网络
- **config.toml**：企业代理；实验特性隔离

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. `codex doctor` → 修复 fail 项
2. 编辑 `~/.codex/config.toml`
3. `codex features list` 验证 flags

### 命令与配置示例

```toml
[network]
respect_system_proxy = true

[features]
browser_use = true
auto_compaction = true
goals = true
```

```bash
codex doctor
codex doctor --json > doctor-report.json
codex features list 2>&1 | head -15
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor 摘要 | ✅ 12 ok · 1 idle · 5 notes · 1 warn · 4 fail |
| features list | ✅ browser_use/goals stable；code_mode under development |
| auth fail | ⚠️ 无 API Key（预期） |

### 问题与解决方案

**auth fail**：`codex login` 或 `OPENAI_API_KEY`。**install fail**：统一 npm PATH。**terminal fail**：`TERM=xterm-256color`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 6/27–28 doctor | ✅ fail 项一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI | `--json` preflight gate |
| 个人 | 每次升级后跑 doctor |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 0.142.3 | 6/26 21:29Z | 纯维护 patch；6/28 稳定维持 |
| 0.143.0-alpha.29 | 6/28 00:30Z | **今日最新** alpha，body 空 |
| 0.143.0-alpha.28 | 6/27 20:15Z | 昨日 alpha |
| 0.143.0-alpha.27 | 6/27 18:35Z | 同日较早 alpha |
| Remote GA | 6/25 | 手机遥控桌面 Agent |

## 今日研究员结论

**6/28 是 Codex alpha 持续加速日、stable 静默日**：npm `@latest` 维持 **0.142.3**，GitHub 今日推送 **alpha.29**。建议生产 pin 0.142.3 并跑 `codex doctor`（**12 ok · 1 idle · 5 notes · 1 warn · 4 fail**）；`code_mode` 关注者隔离对比 **alpha.29**；关注 Harness「做薄 vs 做厚」行业分歧对产品设计的影响。
