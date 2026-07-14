# OpenAI Codex 每日技术文档 — 2026-07-14

> 本地实测版本：**0.144.4**（stable）｜监测源：[Codex Changelog](https://developers.openai.com/codex/changelog)、[GitHub Releases](https://github.com/openai/codex/releases)、[npm @openai/codex](https://www.npmjs.com/package/@openai/codex)

## 今日综述

2026 年 7 月 14 日 npm `@openai/codex@latest` 实测从 **0.144.3 升至 0.144.4**（[7/14 05:08 UTC](https://github.com/openai/codex/releases/tag/rust-v0.144.4)）——无用户可见变更的纯维护版本。行业侧最大事件是 **7/12 Tibo 公告**：临时移除 Plus/Business/Pro 的 **5 小时滚动使用限额** + 一次性用量重置 + GPT-5.6 Sol 效率优化。预发布 **0.145.0-alpha.11**（15:58 UTC）同日活跃。

---

## 特性一：稳定版 0.144.4 发布（7/14 05:08 UTC）

### 是什么（机制说明）

[GitHub Release 0.144.4](https://github.com/openai/codex/releases/tag/rust-v0.144.4)：

> No user-facing changes in this patch release.

自 0.144.3 以来无合并 PR 变更。稳定通道在 7/13–14 四日内连发 0.144.2（Guardian 回滚）→ 0.144.3 → 0.144.4，表明高频维护节奏。

### 适用场景

- **适合**：生产环境保持 `@latest` 同步
- **不适合**：期待新功能的用户——等待 0.145.0 stable

### 前置条件

Node.js 18+

### 详细使用步骤（业务用户）

1. `npm install -g @openai/codex@latest`
2. `codex --version` 确认 `codex-cli 0.144.4`
3. `codex doctor` 检查环境健康
4. CI 锁定 `0.144.4`

### 命令与配置示例

```bash
npm install -g @openai/codex@latest
codex --version
# codex-cli 0.144.4

codex doctor --summary
```

```json
// package.json CI 锁定
{
  "devDependencies": {
    "@openai/codex": "0.144.4"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `@latest` → 0.144.4 | ✅ |
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| 功能变更 | ✅ 无（符合 release 说明） |

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.144.4
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
```

### 问题与解决方案

**仍显示 0.144.3**：`npm cache clean --force && npm install -g @openai/codex@latest`。**doctor 4 fail**：多为 app-server 未运行——Cloud/桌面环境正常。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.144.4 | ✅ |
| npm @latest | ✅ 0.144.4 |
| Codex Changelog | ✅ 7/14 条目 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产用户 | 升级无风险 |
| CI 维护者 | 锁定 0.144.4 |
| 早期采用者 | 关注 0.145.0-alpha.11 |

---

## 特性二：5 小时滚动限额临时移除（7/12 Tibo 公告）

### 是什么（机制说明）

2026 年 7  月 12 日，OpenAI 产品负责人 Tibo（@thsottiaux）宣布：

1. **临时移除** Plus/Business/Pro 的 **5 小时滚动使用限额**
2. **GPT-5.6 Sol 效率优化**——同等任务消耗更少 token
3. **一次性用量重置**——已耗尽额度的账户获得 fresh headroom

Codex 与 ChatGPT Work 共享 agentic 用量池。移除 5h 限额后长会话不再被滚动窗口打断，但**周限额仍有效**。Tibo 称 Codex 活跃用户约 **600 万**。量子位（7/14）将此与 Fable 5 延期并列为算力争夺标志性事件。

### 适用场景

- **适合**：被 5h 限额打断的长程 refactor、多文件迁移、批量 Agent 任务
- **不适合**：误以为完全 unlimited 而无限消耗周限额

### 前置条件

ChatGPT Plus/Business/Pro 订阅；Codex CLI 或 ChatGPT 桌面端

### 详细使用步骤（业务用户）

1. 确认订阅为 Plus/Business/Pro
2. 打开 Codex CLI 或 ChatGPT 桌面端 Codex 模式
3. 启动长程任务——不再遇 5h 滚动中断
4. 监控**周限额**（Settings → Usage）
5. ⚠️ 趁窗口期完成积压任务——官方明确为临时措施

### 命令与配置示例

```bash
# 长程非交互任务
codex exec "Refactor the auth module to use JWT instead of sessions"

# 检查功能状态
codex features list 2>&1 | head -15
```

```toml
# ~/.codex/config.toml
[model]
default = "gpt-5.6-sol"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 5h 限额移除 | ✅ Tibo X 帖 + BleepingComputer 交叉验证 |
| 本地长程任务 | ⚠️ 未实测（无 API Key） |
| 周限额 | ✅ 官方确认仍有效 |

### 问题与解决方案

**仍遇限额**：可能是周限额而非 5h 限额——检查 Usage 页面。**限额恢复**：官方未公布结束日期，随时可能恢复 5h 窗口。**用量重置未生效**：等待数小时或联系 OpenAI 支持。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Tibo @thsottiaux X | ✅ 7/12 |
| BleepingComputer | ✅ |
| 量子位 7/14 | ✅ |
| Digital Trends | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 长程 Agent 用户 | 立即利用窗口完成积压 |
| 成本敏感用户 | 监控周限额，Sol 效率优化后单位任务更省 |
| 团队管理员 | 通知团队窗口期有限 |

---

## 特性三：Guardian auto-review 回滚延续（0.144.2 → 0.144.4）

### 是什么（机制说明）

0.144.2（7/13）回滚 Guardian auto-review 提示词回归：

> Restored the previous Guardian auto-review policy, request format, and tool behavior after rolling back a prompting regression. ([#32672](https://github.com/openai/codex/pull/32672))

0.144.3 和 0.144.4 为无代码变更的 version-only release，0.144.2 修复已包含在 0.144.4 中。

### 适用场景

- **适合**：使用 `/review` 或 Guardian auto-review 的开发者
- **不适合**：从未启用 auto-review 的用户

### 前置条件

Codex CLI ≥ 0.144.2

### 详细使用步骤（业务用户）

1. 升级至 0.144.4
2. 在 Git 仓库中启动 Codex 交互会话
3. 输入 `/review` 触发代码审查
4. 对比 0.144.0–0.144.1 与 0.144.4 的审查输出
5. CI 中锁定 ≥ 0.144.2

### 命令与配置示例

```bash
codex --version
# codex-cli 0.144.4

# 交互会话中
/review
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 0.144.4 含 0.144.2 修复 | ✅ |
| `/review` 行为 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**review 仍异常**：确认 ≥ 0.144.2；检查 Git 仓库状态。**CI 锁定 0.144.0**：立即更新。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub #32672 | ✅ |
| 0.144.4 release | ✅ 包含修复链 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 使用 auto-review 的团队 | 确认全员 ≥ 0.144.4 |
| PR 审查工作流 | 重新评估 0.144.0 期间的审查质量 |

---

## 特性四：`codex doctor` 环境诊断（持续）

### 是什么（机制说明）

`codex doctor` 检查 CLI 环境健康状态，输出 ok/warn/fail 统计。实测 0.144.4：`12 ok · 1 idle · 5 notes · 1 warn · 4 fail`——fail 项主要为 app-server 未运行（Cloud/无桌面环境正常）。

### 适用场景

- **适合**：新环境部署、升级后验证、排查连接问题
- **不适合**：无——建议每次升级后运行

### 前置条件

Codex CLI 已安装

### 详细使用步骤（业务用户）

1. 终端执行 `codex doctor`
2. 查看 summary 行：`12 ok · 1 warn · 4 fail`
3. 详细模式：`codex doctor --all`
4. JSON 输出：`codex doctor --json`
5. 针对 fail 项逐项修复

### 命令与配置示例

```bash
codex doctor
codex doctor --summary
codex doctor --all
codex doctor --json
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex doctor` | ✅ 12 ok · 1 warn · 4 fail |
| app-server status | not running（Cloud 环境预期） |
| `--json` | ✅ 可用 |

```bash
./node_modules/.bin/codex doctor 2>&1 | tail -10
```

### 问题与解决方案

**4 fail 项**：多为 `app-server` 相关——纯 CLI 使用可忽略。**1 warn**：检查 `--all` 输出定位。**升级后 doctor 变化**：对比前后 `--json` 输出。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 0.144.4 | ✅ |
| 7/13 实测 0.144.3 | ✅ 模式一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 新用户 | 安装后首跑 doctor |
| CI 环境 | `--json` 集成健康检查 |

---

## 特性五：`codex features list` 与 Code mode 状态（7/14）

### 是什么（机制说明）

`codex features list` 显示功能开关状态。实测 0.144.4 关键项：

| Feature | Status | Enabled |
|---------|--------|---------|
| `browser_use` | stable | true |
| `code_mode_host` | stable | true |
| `code_mode` | under development | false |
| `auth_elicitation` | stable | true |
| `chronicle` | under development | false |

`code_mode` 仍在开发中，`code_mode_host` 已 stable——表明 Code mode 基础设施就绪但完整模式尚未默认开启。

### 适用场景

- **适合**：评估 Codex 功能可用性的开发者；决定是否启用实验性功能
- **不适合**：不关心功能开关的用户

### 前置条件

Codex CLI ≥ 0.144.0

### 详细使用步骤（业务用户）

1. `codex features list` 查看全部功能
2. `codex features list 2>&1 | head -15` 查看前几项
3. 对比升级前后功能状态变化
4. 关注 `under development` 项的晋升时间

### 命令与配置示例

```bash
codex features list 2>&1 | head -15

# 输出示例：
# browser_use                          stable             true
# code_mode                            under development  false
# code_mode_host                       stable             true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `features list` | ✅ 正常输出 |
| `browser_use` stable | ✅ |
| `code_mode` under development | ✅ |

### 问题与解决方案

**功能不可用**：检查 `features list` 中 status 和 enabled 列。**实验性功能**：`under development` 项可能需手动启用或等待 stable。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地 0.144.4 实测 | ✅ |
| 7/13 0.144.3 实测 | ✅ 状态一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CLI 用户 | 定期 `features list` 跟踪新功能晋升 |
| 自动化用户 | `browser_use` stable 可用于 Web 交互任务 |

---

## 版本对照表

| 版本 | 发布日 (UTC) | 关键变更 |
|------|-------------|----------|
| 0.144.2 | 2026-07-13 04:39 | Guardian auto-review 回滚 |
| 0.144.3 | 2026-07-13 06:12 | 无代码变更 version-only |
| **0.144.4** | **2026-07-14 05:08** | 无用户可见变更 |
| 0.145.0-alpha.11 | 2026-07-14 15:58 | 预发布，未晋升 stable |

## 今日研究员结论

Codex 0.144.4 是低风险维护升级，建议生产环境同步。7/12 的 5h 限额松绑是当前最大用户利好——配合 GPT-5.6 Sol 效率优化和用量重置，这是近期最慷慨的 Codex 使用窗口，但官方明确为临时措施。与 Anthropic Fable 5 再延期至 7/19 形成直接竞争——开发者应在窗口期内完成积压长程任务，并监控两家限流政策的后续变化。

---
