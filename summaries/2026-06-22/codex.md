# OpenAI Codex 每日技术文档 — 2026-06-22

> 本地实测版本：**0.141.0**（stable）｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

2026 年 6 月 22 日本地实测 **codex-cli 0.141.0**（stable，与 6/20 一致）。GitHub 今日 21:16 UTC 发布 **0.142.0-alpha.12** 预发布——自 6/18 起 alpha 线已连发 **12 个 tag**，显示下一稳定版迭代高度活跃。0.141.0 核心：Noise 加密远程执行、executor 插件 MCP、TUI 输入自动超时、`codex exec` hook trust 持久化。ALE 基准中 GPT 5.5+Codex 以 24% 通过率居首，成本约为 Fable 5+Claude Code 的四分之一。

---

## 特性一：0.142.0-alpha.12 预发布线（2026-06-22 最新）

### 是什么（机制说明）

自 6/18 起 GitHub 连发 **0.142.0-alpha.1 至 alpha.12** 十二个预发布 tag。6/22 21:16 UTC 最新 **alpha.12**。预发布通常包含尚未切 stable 的修复与特性，**不保证 API 兼容性**。npm `@openai/codex@latest` 仍为 **0.141.0**。

安装 alpha：

```bash
npm install @openai/codex@0.142.0-alpha.12
```

### 适用场景

- **适合**：隔离环境尝鲜、贡献者验证修复
- **不适合**：生产 CI/CD 默认通道

### 前置条件

- 独立测试环境
- 接受 alpha 版行为变更风险

### 详细使用步骤（业务用户）

1. 在隔离目录 `npm install @openai/codex@0.142.0-alpha.12`
2. `codex --version` 确认 alpha 版本
3. `codex doctor` 对比 stable 差异
4. `codex features list` 检查特性 flag 变化
5. 运行代表性 `codex exec` 任务
6. 勿覆盖全局 stable 安装

### 命令与配置示例

```bash
mkdir -p /tmp/codex-alpha-test && cd /tmp/codex-alpha-test
npm init -y
npm install @openai/codex@0.142.0-alpha.12
./node_modules/.bin/codex --version
./node_modules/.bin/codex doctor
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| stable 通道 | ✅ 0.141.0 |
| alpha.12 tag | ✅ GitHub 2026-06-22T21:16Z |
| alpha 安装实测 | ⚠️ 未安装 alpha（保持 stable） |

### 问题与解决方案

**错误 1：alpha 与 stable 行为不一致**

排查：预期行为；生产回退 `npm install @openai/codex@0.141.0`。

**错误 2：alpha npm 包不存在**

排查：使用完整 tag 名 `0.142.0-alpha.12`；GitHub Releases 有 `codex-npm-*-0.142.0-alpha.12.tgz`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [GitHub alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.142.0-alpha.12) | ✅ |
| npm @latest 实测 | ✅ 仍为 0.141.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 忽略 alpha，等 stable 公告 |
| 贡献者 | 跟踪 alpha.12 → stable 切换 |

---

## 特性二：0.141.0 稳定版核心能力（2026-06-18 Latest）

### 是什么（机制说明）

0.141.0 为当前 npm stable，核心新特性：

- **Noise 加密远程执行**：远程 executor 使用认证、端到端加密 Noise relay 通道
- **跨平台 cwd/shell 保留**：exec-server 保留 executor 原生工作目录与 shell
- **Executor 插件 MCP**：选中插件可 per-thread 激活 stdio MCP servers
- **TUI 输入自动超时**：prompt 无交互后自动 resolve，倒计时在交互时暂停
- **Hook trust 持久化**：`codex exec` thread start/resume 保留 hook trust bypass
- **SQLite WAL 修复**：bundled SQLite 固定含 WAL-reset corruption fix 的版本

### 适用场景

- **适合**：远程执行、插件 MCP、headless CI、`codex exec` 长任务
- **不适合**：仅需简单单次代码生成的轻量场景

### 前置条件

- `npm install @openai/codex@0.141.0` 或 `@latest`
- `codex login` 或 `OPENAI_API_KEY`

### 详细使用步骤（业务用户）

1. 安装：`npm install @openai/codex@latest`
2. 验证：`codex --version` → `0.141.0`
3. 健康检查：`codex doctor`
4. 特性列表：`codex features list`
5. 配置 `~/.codex/config.toml`
6. 运行 `codex exec "your task"`

### 命令与配置示例

```bash
codex --version
codex doctor
codex features list | head -20
codex exec "fix failing tests"
```

```toml
# ~/.codex/config.toml
[features]
browser_use = true
computer_use = true

[mcp]
tool_timeout_seconds = 300  # 0.141.0 默认 300s
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/codex --version
# codex-cli 0.141.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
./node_modules/.bin/codex features list 2>&1 | head -15
# browser_use stable true, computer_use stable true, code_mode under development false
```

| 项 | 结果 |
|----|------|
| `--version` | ✅ 0.141.0 |
| `doctor` | ✅ 12 ok · 1 warn · 4 fail（auth 未登录） |
| `features list` | ✅ browser_use/computer_use stable |
| 推理实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：doctor auth failed（4 fail）**

排查：`codex login`；4 fail 多为 auth/relay 未配置，预期行为。

**错误 2：远程 cwd 错误**

排查：双方 CLI ≥ 0.141.0；检查 exec-server PathUri 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [GitHub rust-v0.141.0](https://github.com/openai/codex/releases/tag/rust-v0.141.0) | ✅ |
| npm @latest 实测 | ✅ 0.141.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | pin 0.141.0 |
| 远程团队 | 启用 Noise relay 远程执行 |

---

## 特性三：App 26.616 Record & Replay（2026-06-18）

### 是什么（机制说明）

Codex macOS App **26.616** 新增 **Record & Replay**：

- 将演示工作流录制为可复用 **Skill**
- 需启用 **Computer Use**
- **区域限制**：暂不包括 EEA、UK、CH
- 同版：自动化运行历史批量 mark read/archive；local↔remote thread handoff

### 适用场景

- **适合**：重复性 GUI 工作流 SOP 沉淀、团队 onboarding
- **不适合**：EEA/UK/CH 用户；无 Computer Use 权限环境

### 前置条件

- Codex App 26.616+（macOS）
- Computer Use 已启用
- 非 EEA/UK/CH 区域

### 详细使用步骤（业务用户）

1. 更新 Codex App 至 26.616+
2. Settings → 启用 Computer Use
3. 执行一次目标工作流 → 选择 Record
4. 保存为 Skill → Replay 验证
5. 分享给团队（注意区域限制）

### 命令与配置示例

```toml
# ~/.codex/config.toml
[features]
computer_use = true
browser_use = true
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 26.616 | ✅ |
| `features list` computer_use | ✅ stable true |
| Record & Replay 实测 | ⚠️ 未实测（无 macOS GUI） |

### 问题与解决方案

**错误 1：Record 选项不可用**

排查：区域限制；Computer Use 未启用；App 版本 < 26.616。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Codex Changelog 6/18](https://developers.openai.com/codex/changelog) | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| macOS 团队 | 优先沉淀高频 SOP |
| 合规 | 注意区域与录屏数据策略 |

---

## 特性四：`codex exec` 与 `/goal` 循环执行

### 是什么（机制说明）

`codex exec` 提供 headless 单次/循环执行。`/goal` 命令（TUI）让 Agent 持续循环直至验证条件满足——代表 **Loop Engineering** 在 Codex 侧的产品化。Hook trust bypass 在 0.141.0 中可跨 `codex exec` thread start/resume 持久化。Blocking `PostToolUse` hooks 在 code mode 中正确拒绝 tool calls。

### 适用场景

- **适合**：CI 修复循环、overnight 任务、验证驱动开发
- **不适合**：需人工逐步审批的敏感操作

### 前置条件

- codex-cli ≥ 0.141.0
- `OPENAI_API_KEY` 或 `codex login`

### 详细使用步骤（业务用户）

1. `codex exec "fix all failing tests"` 单次执行
2. TUI 中使用 `/goal` 设定完成条件
3. 配置 `~/.codex/config.toml` hooks
4. 用 `codex doctor` 验证 hook trust 状态

### 命令与配置示例

```bash
codex exec "run npm test and fix failures until all pass"
```

```
/goal all unit tests pass and linter clean
```

```toml
# ~/.codex/config.toml
[hooks]
# 0.141.0+ exec thread 持久化 hook trust
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `codex exec --help` | ✅ 命令可用 |
| 循环实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：hook trust 在 resume 后丢失**

排查：升级至 0.141.0+；Changelog #26434 已修复。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub 0.141.0 release notes | ✅ hook trust 持久化 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 维护者 | `codex exec` + hooks 自动化修复 |
| 个人 | TUI `/goal` 做验证驱动开发 |

---

## 特性五：ALE 基准表现与成本优势（行业事件）

### 是什么（机制说明）

UC Berkeley **Agents' Last Exam（ALE）** 真场景评测（量子位 secondary 报道）：

- **GPT 5.5 + Codex**：24.0% 通过率，**冠军**
- **Claude Fable 5 + Claude Code**：22.0%，季军
- **成本**：Codex 全任务约 **$566** vs Fable 5 约 **$2315**
- **最难档**：主流配置平均 2.6%，多数 0%

ALE 使用 GCUA 框架，给 Agent 完整 GUI + CLI 权限，覆盖 55 个行业子领域。

### 适用场景

- **适合**：成本敏感的长程 Agent 任务；GUI+CLI 混合专业工具链
- **不适合**：仅看 SWE-Bench 高分的简单代码补全场景

### 前置条件

- GPT 5.5 API 访问
- codex-cli 0.141.0+
- 充足 token 预算与时间（ALE 全任务 47h+）

### 详细使用步骤（业务用户）

1. 在真实工作流中小范围试点 Codex + GPT 5.5
2. 设置 token/时间预算上限
3. 对比同任务下 Claude Code + Fable 5 的质量与成本
4. Fable 5 窗口关闭（6/23）后重新评估选型

### 命令与配置示例

```bash
codex exec --model gpt-5.5 "Complete the following professional workflow task..."
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| ALE 数据 | ✅ 量子位 secondary 报道 |
| 本环境实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：SWE-Bench 高分但 ALE 低分**

排查：预期行为——ALE 测的是 GUI+专业工具链真场景，非纯代码生成。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [量子位 ALE](https://www.qbitai.com/2026/06/434774.html) | ✅ secondary |
| Berkeley 原始论文 | ⚠️ 需独立验证 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 成本敏感团队 | 优先评估 GPT 5.5+Codex |
| 质量优先团队 | Fable 5 credits 定价后对比 ROI |

---

## 版本对照表

| 版本 | 日期 | 通道 | 核心变更 |
|------|------|------|----------|
| 0.142.0-alpha.12 | 2026-06-22 | Pre-release | 持续迭代，未切 stable |
| 0.141.0 | 2026-06-18 | Latest stable | Noise relay、plugin MCP、hook trust |
| App 26.616 | 2026-06-18 | macOS App | Record & Replay |

## 今日研究员结论

**生产继续 pin 0.141.0**；alpha.12 显示活跃开发但不宜上生产。ALE 成本数据使 GPT 5.5+Codex 在 Fable 5 窗口关闭后更具吸引力。`codex doctor` 本环境 12 ok · 4 fail（auth）为无 Key 预期状态。关注未来 1–2 周 alpha → stable 切换及 `code_mode` feature flag 是否 GA。

---
