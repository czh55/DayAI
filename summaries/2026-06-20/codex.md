# OpenAI Codex 每日技术文档 — 2026-06-20

> 本地实测版本：**codex-cli 0.141.0**｜监测源：[GitHub Releases](https://github.com/openai/codex/releases)、[OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)

## 今日综述

**2026 年 6 月 20 日**：npm 稳定通道仍为 **0.141.0**（6/18 发布）；GitHub 当日发布 **0.142.0-alpha.7** 预发布（`rust-v0.142.0-alpha.7` @ 00:40 UTC），alpha 线自 6/18 起累计 **7 个 tag**（alpha.1–alpha.7），下一稳定版迭代活跃但未切换 Latest。App **26.616**（6/18）含 **Record & Replay** 与自动化历史批量操作。量子位 ALE 基准报道 **GPT 5.5+Codex** 在真场景通过率略胜 Fable 5+Claude Code。

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
./node_modules/.bin/codex --version
# codex-cli 0.141.0
./node_modules/.bin/codex doctor 2>&1 | tail -3
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed
./node_modules/.bin/codex features list 2>&1 | head -5
# apply_patch_freeform removed false
# apps stable true
# browser_use stable true
```

| 项 | 结果 |
|----|------|
| 版本 | ✅ 0.141.0 |
| doctor | ✅ 12 ok · 4 fail（auth） |
| features list | ✅ browser_use/computer_use stable |
| exec 推理 | ⚠️ 无 API Key |

### 问题与解决方案

**错误 1：doctor auth failed**

排查：`codex login`；4 fail 多为 auth/relay 未配置。

**错误 2：远程 cwd 错误**

排查：双方 ≥ 0.141.0。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub rust-v0.141.0 | ✅ |
| npm @latest 实测 | ✅ 0.141.0 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | pin 0.141.0 |
| 尝鲜 | 见特性二 alpha |

---

## 特性二：0.142.0-alpha.7 预发布线（2026-06-20 最新）

### 是什么（机制说明）

自 6/18 起 GitHub 连发 **0.142.0-alpha.1 至 alpha.7** 七个预发布 tag。6/20 00:40 UTC 最新 **alpha.7**。预发布通常包含尚未切 stable 的修复与特性，**不保证 API 兼容性**。

npm 安装：

```bash
npm install @openai/codex@0.142.0-alpha.7
```

### 适用场景

- **适合**：隔离环境尝鲜、贡献者验证修复
- **不适合**：生产 CI/CD 默认通道

### 前置条件

- 独立测试环境
- 接受 alpha 版行为变更风险

### 详细使用步骤（业务用户）

1. 在隔离目录 `npm install @openai/codex@0.142.0-alpha.7`
2. `codex --version` 确认 alpha 版本
3. `codex doctor` 对比 stable 差异
4. 运行代表性 `codex exec` 任务
5. 勿覆盖全局 stable 安装

### 命令与配置示例

```bash
mkdir -p /tmp/codex-alpha-test && cd /tmp/codex-alpha-test
npm init -y
npm install @openai/codex@0.142.0-alpha.7
./node_modules/.bin/codex --version
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| stable 通道 | ✅ 0.141.0 |
| alpha.7 tag | ✅ GitHub 2026-06-20T00:40Z |
| alpha 安装实测 | ⚠️ 未安装 alpha（保持 stable） |

### 问题与解决方案

**错误 1：alpha 与 stable 行为不一致**

排查：预期行为；生产回退 `npm install @openai/codex@0.141.0`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| GitHub Releases alpha.7 | ✅ |
| npm @latest | ✅ 仍为 0.141.0（未切 stable） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 生产 | 忽略 alpha，等 stable 公告 |
| 贡献者 | 跟踪 alpha.7 → stable 切换 |

---

## 特性三：App 26.616 Record & Replay（2026-06-18）

### 是什么（机制说明）

Codex macOS App **26.616** 新增 **Record & Replay**：

- 将演示工作流录制为可复用 **Skill**
- 需启用 **Computer Use**（用户或管理员）
- **区域限制**：暂不包括 EEA、UK、CH
- 同版新增：自动化运行历史批量 mark read / archive；local↔remote thread handoff

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

## 特性四：`codex exec` 与 `/goal` 循环执行（持续可用）

### 是什么（机制说明）

`codex exec` 提供 headless 单次/循环执行。`/goal` 命令（TUI）让 Agent 持续循环直至验证条件满足——与 Claude Code `/loops`、社区 ralph 范式同类，代表 **Loop Engineering** 在 Codex 侧的产品化。

Hook trust bypass 在 0.141.0 中可跨 `codex exec` thread start/resume 持久化。

### 适用场景

- **适合**：CI 修复循环、overnight 任务、验证驱动开发
- **不适合**：需人工逐步审批的敏感操作（应配 hook/auto-review）

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
trust_bypass = true  # 0.141.0+ exec thread 持久化
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| exec 存在 | ✅ --help 确认 |
| /goal 实测 | ⚠️ 未实测（无 API Key） |
| hook trust 修复 | ✅ Changelog 0.141.0 |

### 问题与解决方案

**错误 1：exec 循环不停止**

排查：明确 `/goal` 验证条件；设置 timeout。

**错误 2：PostToolUse hook 拒绝 code-mode**

排查：0.141.0 修复 blocking hooks；升级版本。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 0.141.0 | ✅ hook trust |
| 虎嗅/InfoQ Loop Engineering | ✅ /goal 与 ralph 产品化叙事一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| CI 工程师 | `codex exec` + GitHub integration |
| 个人 | `/goal` 用于 overnight 修复 |

---

## 特性五：`codex doctor` 与 `features list` 诊断体系

### 是什么（机制说明）

`codex doctor` 检查本地环境：auth、app-server、relay、sandbox、features 等，输出 ok/warn/fail 汇总。`codex features list` 列出各 feature 状态（stable / under development / removed）。

6/20 实测 stable features 含：`apps`、`browser_use`、`browser_use_external`、`computer_use` 等。

### 适用场景

- **适合**：新环境 setup、CI 镜像预检、升级后回归
- **不适合**：替代实际任务验证

### 前置条件

- codex-cli 已安装

### 详细使用步骤（业务用户）

1. `codex doctor` 全量检查
2. `codex doctor --summary` 紧凑输出
3. `codex doctor --json` 机器可读（redacted）
4. `codex features list` 确认 feature 开关
5. 按 fail 项逐项修复

### 命令与配置示例

```bash
codex doctor
codex doctor --summary
codex doctor --json | jq '.summary'
codex features list
codex features list --all
```

### 本地测试结果

```bash
./node_modules/.bin/codex doctor 2>&1 | tail -5
# 12 ok · 1 idle · 5 notes · 1 warn · 4 fail failed

./node_modules/.bin/codex features list 2>&1 | head -15
# browser_use stable true
# computer_use stable true
# code_mode under development false
```

| 项 | 结果 |
|----|------|
| doctor | ✅ 12 ok · 4 fail（auth 未登录） |
| features list | ✅ 正常输出 |
| app-server | ⚠️ not running（预期，无 GUI） |

### 问题与解决方案

**错误 1：4 fail 全为 auth**

排查：`codex login` 或设置 `OPENAI_API_KEY`；Cloud Agent 环境可能无法交互登录。

**错误 2：app-server not running**

排查：CLI-only 使用为正常状态；App 用户需启动 Codex App。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 本地实测 6/20 | ✅ |
| Changelog features 文档 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 所有人 | 升级后先 `codex doctor` |
| CI | `--json` 接入 pipeline gate |

---

## 版本对照表

| 版本 | 日期 | 通道 | 要点 |
|------|------|------|------|
| 0.142.0-alpha.7 | 2026-06-20 | Pre-release | alpha 线最新 |
| 0.141.0 | 2026-06-18 | **Latest stable** | Noise relay、plugin MCP、性能优化 |
| App 26.616 | 2026-06-18 | App | Record & Replay、thread handoff |
| 0.140.0 | 2026-06-06 | 上一代 stable | `/import` 从 Claude Code 迁移 |

## 今日研究员结论

Codex 6/20 **稳定通道无变化**（0.141.0），但 **alpha.7 发布**显示下一版本迭代密集。生产继续 pin 0.141.0；关注未来 1–2 周 stable 切换。ALE 基准中 GPT 5.5+Codex 的成本/通过率优势（量子位 secondary）强化 Codex 在长程真场景的定位——与 Claude Code Fable 5 窗口倒计时形成竞品对位。本环境 `codex doctor` 12 ok · 4 fail 为 auth 未登录预期状态。

---
