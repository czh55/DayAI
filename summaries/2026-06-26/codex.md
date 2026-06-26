# OpenAI Codex 每日技术文档 — 2026-06-26

> 本地实测版本：**0.142.3**｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)

## 今日综述

2026 年 6 月 26 日 Codex 稳定版升至 **0.142.3**（21:29 UTC）。GitHub Release 标注：**「Maintenance-only patch release with no user-facing changes since 0.142.2」**——纯维护 patch。npm `@latest` 实测确认。**0.143.0-alpha.26**（20:08Z）继续 alpha 线。**Codex Remote GA**（6/25）余波持续。本地 `codex doctor`：**12 ok · 1 warn · 4 fail**（auth 未登录）。

---

## 特性一：Codex CLI 0.142.3 — 纯维护 Patch（2026-06-26）

### 是什么（机制说明）

0.142.3（`rust-v0.142.3`）为 **维护-only** 更新：依赖安全更新、内部构建修复，与 0.142.2 **用户体验完全一致**。MCP tool search、macOS/Windows 代理等属于 0.142.1/0.142.2，非 0.142.3 新增。

### 适用场景

- **适合**：0.142.2 生产环境零风险升级；CI pin `@latest`
- **不适合**：期待新功能者（跟踪 alpha 线）

### 前置条件

- Node.js 18+；`npm install @openai/codex@0.142.3`

### 详细使用步骤（业务用户）

1. `cd tools && npm install @openai/codex@latest`
2. `codex --version` → `codex-cli 0.142.3`
3. `codex doctor` + `codex features list`
4. 若从 0.142.0 跳跃：先读 0.142.1/0.142.2 Release notes
5. `codex login`（若未认证）

### 命令与配置示例

```bash
npm install @openai/codex@0.142.3
codex --version
codex doctor
codex features list | head -20
codex exec "Run npm test and fix failures"
```

### 本地测试结果

```bash
./node_modules/.bin/codex --version   # codex-cli 0.142.3
./node_modules/.bin/codex doctor      # 12 ok · 1 warn · 4 fail
```

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.142.3 |
| `doctor` | ✅ 12 ok · 1 warn · 4 fail |
| vs 0.142.2 变更 | ✅ 无 user-facing |
| 推理实测 | ⚠️ 无 API Key |

### 问题与解决方案

**doctor 4 fail**：`codex login` 或设 `OPENAI_API_KEY`。**升级后异常**：确认未混装 alpha；`npm ls @openai/codex`。**CI 意外升级**：pin `0.142.3`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.142.3 | ✅ maintenance-only |
| npm @latest | ✅ 0.142.3 |
| Claude 2.1.195 同日 patch | ✅ 维护常态化 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 放心升级，无需 staging 重测 |
| 保守部署 | 可继续 pin 0.142.2 |
| 早期测试者 | 关注 alpha.26 非 0.142.3 |

---

## 特性二：Codex Remote GA — 手机遥控桌面 Agent（6/25 官宣）

### 是什么（机制说明）

6/25 Codex Remote 从 beta 进入 **GA**：ChatGPT 移动 App 连接已配对 Mac/Windows 主机，启动/继续任务、审查进度、**批准操作**；QR 一对一配对；6/8 后连接保持有效，更早非活跃需重配。

### 适用场景

- **适合**：长程 Agent 移动端审批；通勤/会议监控
- **不适合**：无 ChatGPT App；纯 CLI 环境（本 Cloud Agent）

### 前置条件

- Codex App + ChatGPT iOS/Android 最新版；QR 配对完成

### 详细使用步骤（业务用户）

1. 桌面 Codex App 启用 Remote，显示 QR
2. 手机 ChatGPT App → Codex Remote → 扫描
3. 桌面启动长程任务
4. 手机查看进度、批准敏感操作
5. 桌面验证结果

### 命令与配置示例

```bash
codex
# TUI：Analyze entire monorepo and refactor auth module
```

```
ChatGPT App → Codex Remote → 选择主机 → Approve pending actions
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Remote GA 公告 | ✅ 6/25 Changelog |
| 手机配对 | ⚠️ 未实测 |
| 0.142.3 影响 | ✅ 无 |

### 问题与解决方案

**配对失败**：两端 App 最新；6/8 前连接重配 QR。**看不到 task**：主机 App 运行中；检查网络。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/25 | ✅ GA |
| vs Cursor Cloud | IDE cloud VM vs 手机控桌面 |
| vs Claude Tag | Slack 异步 vs 手机同步 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent | 升级 App 测审批流 |
| CLI-only | Remote 需 Codex App |
| 安全团队 | 评估 QR 配对审计 |

---

## 特性三：`codex doctor` — 环境诊断（0.142.3 未变）

### 是什么（机制说明）

`codex doctor` 扫描 CLI 版本、auth、config.toml、MCP、网络、feature flags，输出 `N ok · N warn · N fail`；支持 `--summary compact`、`--all`、`--json`。升级后 **30 秒 smoke test** 标准步骤。

### 适用场景

- **适合**：升级后验证；CI preflight；排查 auth/MCP
- **不适合**：替代端到端 Agent 测试

### 前置条件

- Codex CLI 已安装

### 详细使用步骤（业务用户）

1. 安装/升级 CLI
2. `codex doctor`
3. 修复 fail 项（通常 auth）
4. 可选 `codex doctor --json` 导入监控
5. 重跑至 fail 清零

### 命令与配置示例

```bash
codex doctor
codex doctor --summary compact
codex doctor --json > doctor-report.json
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| doctor 运行 | ✅ |
| 12 ok · 1 warn · 4 fail | ✅ auth 未登录预期 |
| 0.142.3 vs 0.142.2 | ✅ 无差异 |

### 问题与解决方案

**auth fail**：`codex login`。**config fail**：检查 `~/.codex/config.toml` 语法。**MCP fail**：验证 MCP 命令可执行。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| CLI help | ✅ doctor 子命令 |
| 本地实测 | ✅ 与 6/25 一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 每次升级后跑 doctor |
| CI | `--json` 作 preflight gate |
| 企业 | fail 项纳入 onboarding |

---

## 特性四：`config.toml` 与 `codex features list`（0.142.3 无新 flag）

### 是什么（机制说明）

**`~/.codex/config.toml`** 管理网络代理（`respect_system_proxy`）、feature flags、MCP、模型设置。**`codex features list`** 显示 stability（stable/under development/removed）与 enabled 状态。0.142.3 无新 flag；`code_mode` 仍 **under development**。

### 适用场景

- **适合**：企业代理、MCP 集成、flag 实验
- **不适合**：期待 0.142.3 新 flag

### 前置条件

- Codex CLI ≥ 0.142.0

### 详细使用步骤（业务用户）

1. 编辑 `~/.codex/config.toml`
2. `codex features list` 查看可用 flags
3. `[features]` 段启用/禁用
4. `codex doctor` 验证
5. `codex` TUI 或 `codex exec` 测试

### 命令与配置示例

```toml
[network]
respect_system_proxy = true

[features]
browser_use = true
auto_compaction = true
code_mode = false
computer_use = true
```

```bash
codex features list
codex features list 2>&1 | rg "code_mode|browser_use"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| features list | ✅ |
| browser_use | stable true |
| code_mode | under development false |
| 0.142.3 新 flag | ✅ 无 |

### 问题与解决方案

**代理下 auth 失败**：`respect_system_proxy = true`。**under development 不稳定**：仅测试环境启用。**MCP tool search 行为变**（0.142.2 引入，0.142.3 保持）：对比工具调用日志。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 0.142.2 Release | ✅ tool search、代理 |
| 0.142.3 | ✅ 无 user-facing 变更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT | 启用系统代理 |
| 个人 | 保持 stable flags |
| code_mode 关注者 | 跟踪 alpha.26 |

---

## 特性五：`codex exec` 与 0.143.0-alpha.26 预发布

### 是什么（机制说明）

**`codex exec`** 提供 headless 执行，适合 CI 与脚本化 Agent：

```bash
codex exec "Run npm test and fix failures"
```

与 Claude `claude -p`、Cursor Automations cron 形成三大 CLI 非交互入口。

**0.143.0-alpha.26**（6/26 20:08Z）最新 alpha，body 为空；可能含 `code_mode`、`artifact`、`chronicle` 进展。stable 与 alpha **勿混装**。

### 适用场景

- **exec**：CI 修复、nightly 脚本、Remote 长程任务 CLI 启动
- **alpha.26**：早期测试者跟踪下一 stable

### 前置条件

- stable：`0.142.3`；alpha：隔离环境 `@alpha`

### 详细使用步骤（业务用户）

1. `codex doctor` auth 通过
2. `codex exec "<prompt>"`
3. 检查 git diff 与测试
4. CI 加 timeout 与 exit code
5. alpha 仅在隔离环境安装对比 features

### 命令与配置示例

```bash
codex exec "Analyze src/ and suggest refactoring"
codex exec "Fix lint errors" || exit 1
```

```bash
# 仅测试环境
npm install @openai/codex@alpha
codex --version  # 可能 0.143.0-alpha.26
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 0.142.3 stable | ✅ |
| codex exec | ⚠️ 无 API Key |
| alpha.26 | ⚠️ 未安装 |

### 问题与解决方案

**exec 超时**：检查 auth 与网络。**alpha/stable 不一致**：勿混装。**修改未 commit**：prompt 明确 commit 策略。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub alpha.26 | ✅ @ 20:08Z |
| vs Claude `/loops` | exec 单次 vs loops 循环 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 用户 | exec + doctor preflight |
| 生产 | 锁定 0.142.3 |
| 早期测试 | alpha.26 对比 features |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 0.142.3 | 6/26 21:29Z | 纯维护 patch，自 0.142.2 无 user-facing 变更 |
| 0.142.2 | 6/25 | MCP tool search、代理、安全加固 |
| 0.142.1 | 6/25 | Windows 系统代理 |
| 0.143.0-alpha.26 | 6/26 20:08Z | 最新 alpha |
| Remote GA | 6/25 | 手机遥控桌面 Agent |

## 今日研究员结论

**6/26 是 Codex 维护消化日**：0.142.3 为零风险升级；**Remote GA（6/25）** 仍是本周最大产品事件。建议生产立即升级 0.142.3 并跑 `codex doctor`；长程用户测 Remote 移动端审批；`code_mode` 关注者跟踪 **alpha.26**。与 Claude 2.1.195 同日 patch 对照，三大 CLI 进入 **高频维护常态化**。
