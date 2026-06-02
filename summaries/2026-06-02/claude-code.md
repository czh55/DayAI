# Claude Code 每日深度 — 2026-06-02

- **本地实测版本**：`2.1.161`（`/workspace/tools/node_modules/.bin/claude --version`）
- **文档最低版本要求**：Dynamic Workflows 需 **≥ 2.1.154**（[官方 Workflows 文档](https://code.claude.com/docs/en/workflows)）
- **交叉验证**：官方 [Platform 6/2 说明](https://platform.claude.com/docs/en/release-notes/overview)、[Dynamic Workflows 博客 5/28](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)、社区 [Ken Huang Substack](https://kenhuangus.substack.com/p/claude-code-orchestration-dynamic)

---

## 本地 CLI 实测总览

| 命令 | 结果 | 说明 |
|------|------|------|
| `claude --version` | ✅ `2.1.161` | 满足 Workflows 版本门槛 |
| `claude --help` | ✅ | 含 `--effort`、`agents`、`ultrareview` 等 |
| `claude agents --json` | ✅ `[]` | 无后台会话时为空数组 |
| 交互式 `/effort ultracode`、`/workflows` | ⚠️ 未实测 | 无 TTY + 无 Anthropic 登录；见各节官方 SOP |

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
./node_modules/.bin/claude --help
./node_modules/.bin/claude agents --json
```

---

## 特性 1：Dynamic Workflows（动态工作流，研究预览）

### 是什么（机制说明）

Dynamic Workflows 让 Claude **为当前任务生成 JavaScript 编排脚本**，由独立 runtime 在后台调度最多 **1000** 个子代理（并发上限通常 **16**，受 CPU 限制）。与「单会话里 Claude 逐轮派 subagent」不同：计划写在脚本变量里，**中间结果不挤进主对话 context**，最终只把汇总结果回传。runtime 支持阶段 `phase()`、暂停/恢复、对已完成的 agent **复用缓存结果**。首次触发会展示阶段计划并请求确认（视权限模式而定）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 全库安全审计、数百文件迁移、需交叉验证的研究 | 改一两个文件的日常修补 |
| 需要可复用编排脚本、团队共享 `.claude/workflows/` | 强依赖中途人工逐步签字的多阶段审批 |
| Max/Team/Enterprise（Enterprise 需管理员开启） | 免费层；Pro 需在 `/config` 手动开启 |

### 前置条件

- Claude Code **≥ 2.1.154**（本地 2.1.161 ✅）
- 付费计划：Pro / Max / Team / Enterprise（Enterprise 默认关闭，管理员开启）
- Pro：在 `/config` 打开 **Dynamic workflows** 行
- 未设置 `CLAUDE_CODE_DISABLE_WORKFLOWS=1` 且 `settings.json` 无 `"disableWorkflows": true`

### 详细使用步骤

1. 启动 Claude Code：`cd your-repo && claude`
2. 输入 `/config`，确认 **Dynamic workflows** 为开启（Pro）或联系管理员（Enterprise）
3. 用自然语言或 `ultracode` 关键词描述任务（见特性 2），或运行 `/deep-research 你的问题`
4. 在 CLI 审批卡片选择 **Yes, run it** 或 **View raw script**（`Ctrl+G` 在编辑器中打开脚本）
5. 运行中执行 `/workflows`，方向键选择运行实例，查看阶段与 token
6. 结束后按 `s` 将脚本保存到 `.claude/workflows/`（团队）或 `~/.claude/workflows/`（个人）

### 命令与配置示例

```bash
# 安装（与 DayAI 仓库一致）
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest

# 非交互单次任务（无工作流确认 UI，需知悉权限模式）
./node_modules/.bin/claude -p "ultracode: 审计 src/api 下所有路由的鉴权缺失" \
  --permission-mode acceptEdits

# 持久关闭工作流（启动前环境变量）
export CLAUDE_CODE_DISABLE_WORKFLOWS=1
./node_modules/.bin/claude
```

`~/.claude/settings.json` 片段：

```json
{
  "disableWorkflows": false
}
```

### 本地测试结果

- `claude --version` → **2.1.161** ✅  
- 实际触发 workflow：⚠️ **未实测**（无 OAuth/API Key 登录、环境 `stdin` 非 TTY）  
- 官方机制与社区 [Medium 逆向脚本 API](https://alirezarezvani.medium.com/claude-code-workflows-build-deterministic-agent-runs-eaf2c6ac52d5) 一致；社区提醒脚本 API **非公开、可能变**

### 问题与解决方案

| 问题 | 排查 | 解决 |
|------|------|------|
| 提示需要更新版本 | `claude --version` | `npm install @anthropic-ai/claude-code@latest` |
| Enterprise 无 workflow 选项 | 问管理员 | Claude Code admin 打开 Dynamic workflows |
| 运行极耗 token | `/workflows` 看每 agent token | 先小范围试点；`/model` 对非关键阶段指定更小模型 |

### 官方 vs 社区交叉验证

- 官方：[Workflows 文档](https://code.claude.com/docs/en/workflows) — 1000 agent 上限、16 并发、`/deep-research`  
- 社区：Substack 称最多 1000、并发 16 — **一致**；早期 `CLAUDE_CODE_EXPERIMENTAL_*` 环境变量已废弃，以 `/config` 关闭为准 — **与 Medium 一致**

### 利弊分析 + 分角色建议

- **利**：复杂任务成功率显著高于单会话；脚本可保存复用。  
- **弊**：token 与耗时成倍；子代理默认 `acceptEdits`，文件改动自动批准。  
- **个人开发者**：仅在「单次搞不定」时启用；日常 `/effort high` 即可。  
- **Tech Lead**：把验证过的 workflow 存进 `.claude/workflows/` 并 code review 脚本。  
- **安全/合规**：长运行前扩充 tool allowlist，避免中途频繁弹窗；敏感环境用 `disableWorkflows`。

---

## 特性 2：Ultracode 与 `/effort ultracode`

### 是什么（机制说明）

**Ultracode** 将 **`xhigh` 推理力度** 与 **自动 workflow 编排** 绑定：开启后，Claude 对每个「实质性任务」自行判断是否启动 workflow，且可能在单条用户请求内串联「理解 → 修改 → 验证」多轮 workflow。**仅当前会话有效**，新开会话需重新设置。支持 `xhigh` 的模型才在 `/effort` 菜单显示 ultracode。另可在提示词中加入关键词 **`ultracode`**（v2.1.160+ 前字面量为 `workflow`）单次触发，而不改变全局 effort。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 架构级重构、跨模块调研+落地+测试 | 改 typo、写单测一条 case |
| 你愿意用 token 换成功率的长会话 | 套餐用量紧张 |

### 前置条件

- Dynamic Workflows 已开启（见特性 1）  
- 模型支持 `xhigh` / ultracode（如 Opus 4.8 系列）  
- Auto 权限模式下首次 workflow 可能自动记录同意（官方表）

### 详细使用步骤

1. `claude` 进入项目目录  
2. 输入 `/effort ultracode` 并回车  
3. 用自然语言描述任务，或写 `ultracode: <任务描述>`  
4. 观察输入框中 **ultracode 高亮**；误触可用 `Alt+W`（Linux/Win）取消本次高亮  
5. 任务结束后 `/effort high` 恢复常规力度  

### 命令与配置示例

```text
/effort ultracode

ultracode: 将 monolith 的支付模块拆到 packages/payments，保持 API 兼容并补集成测试
```

`/config` 中可关闭 **Ultracode keyword trigger**，避免误触关键词。

### 本地测试结果

- `claude --help` 显示 `--effort <level>` 含 `low, medium, high, xhigh, max` ✅  
- `/effort ultracode` 交互：⚠️ 未实测（无登录 TTY）

### 问题与解决方案

| 问题 | 排查 | 解决 |
|------|------|------|
| 菜单无 ultracode | `/model` 是否支持 xhigh | 切换 Opus 4.8 等 |
| 每条消息都变慢 | 是否仍处于 ultracode 会话 | `/effort high` 或新开会话 |
| 关键词不触发 | `/config` Ultracode keyword | 打开触发或改用自然语言「use a workflow」 |

### 官方 vs 社区

- 官方：ultracode = xhigh + 自动 orchestration — [Workflows#ultracode](https://code.claude.com/docs/en/workflows)  
- 社区 Substack：understand-change-verify 三环 — **与官方描述一致**

### 利弊 + 建议

- **利**：少打「请用 workflow」；适合「扔一个大目标」  
- **弊**：**整会话** token 膨胀  
- **建议**：只在「项目级」半天以上会话开 ultracode；平时 `high` + 单次 `ultracode:` 更省

### 附：Ultracode 完整 Prompt 模板（3 个）

**模板 A — 安全审计**

```text
ultracode: 对仓库进行安全审计。范围：所有对外 HTTP 路由、鉴权中间件、环境变量与密钥引用。
交付：按 OWASP API Top 10 分类的问题清单；每个问题含文件路径、行号、风险等级、修复建议、是否可利用的简要理由。
约束：不要修改生产配置；如需 PoC，仅在 tests/ 下生成隔离脚本。
验证阶段：单独 workflow 对每条高危项做静态复查并标记误报。
```

**模板 B — 大规模迁移**

```text
ultracode: 将 src/legacy/**/*.js 迁移到 TypeScript（strict），按目录分 phase。
每 phase：理解依赖图 → 改写并生成 .ts → 运行 tsc 与现有 jest → 仅在本 phase 目录 green 后进入下一 phase。
保持 public API 与 package exports 不变；生成 MIGRATION.md 记录破坏性变更（应无）。
```

**模板 C — 技术调研**

```text
ultracode: 调研「在 Kubernetes 上运行 Claude Code Agent SDK 会话」的可行方案。
需要：官方文档要点、网络/出口要求、密钥管理、与 GitHub Actions 对比、成本粗算。
输出：带引用链接的决策备忘录 + 推荐架构图（Mermaid）+ 风险表。
使用 /deep-research 补充外部来源并与代码库约束交叉验证。
```

---

## 特性 3：`/deep-research` 内置对抗式调研工作流

### 是什么

`/deep-research` 是官方捆绑 workflow：多角度 **WebSearch**、抓取、**交叉验证**、对声明进行内部「投票」，过滤未通过检验的结论，输出 **带引用** 的报告。比普通单次搜索更强调 **证伪** 而非确认偏误。

### 适用场景

适合：技术选型、法规/竞品快照、版本差异核实。不适合：纯仓库内重构（应用 ultracode 指代码库）。

### 前置条件

- Workflows 已开启  
- **WebSearch** 工具可用（企业策略可能禁用）  
- 愿意在首次运行时批准 workflow

### 详细使用步骤

1. `claude` 进入任意目录  
2. 输入：`/deep-research What changed in the Node.js permission model between v20 and v22?`  
3. 在权限提示选 **Yes, run it**  
4. `/workflows` 查看阶段进度  
5. 完成后在会话中阅读报告；需要复现时保存脚本（`s`）

### 命令与配置示例

```text
/deep-research 比较 PostgreSQL 16 与 17 的 logical replication 行为差异，附官方文档链接
```

### 本地测试结果

⚠️ 未实测（无 WebSearch 授权会话）。CLI `--help` 未单独列出子命令，属 TUI 斜杠命令 ✅（官方文档明确）

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| WebSearch 不可用 | 检查计划与 `/config` 工具策略 |
| 报告过短 | 问题收窄；或要求更多 phase |

### 官方 vs 社区

- 官方文档表格列出 `/deep-research` — ✅  
- Substack 强调 adversarial — **与官方「filter claims」一致**

### 建议

技术写作者、架构师用于 **发版前核实**；勿替代人工对关键合规结论签字。

---

## 特性 4：`/workflows` 监控、暂停与脚本保存

### 是什么

`/workflows` 打开 **运行仪表板**：列出进行中/已完成 workflow，展示每阶段 agent 数、token、耗时；支持 `p` 暂停、`x` 停止 agent/整 run、`r` 重启 agent、`s` 保存脚本为可复用 `/命令`。

### 适用场景

适合：长运行监视、中断失控 agent、将成功编排固化为团队命令。

### 前置条件

至少有一个 workflow 正在运行或已完成于 **当前会话**（退出 Claude Code 后无法 resume 未完成 run，官方说明）。

### 详细使用步骤

1. 启动任意 workflow 后输入 `/workflows`  
2. `↑/↓` 选择 run，`Enter` 进入阶段视图  
3. `→` 进入 agent 详情查看 tool 调用  
4. 需要暂停时按 `p`；确认浪费 token 时按 `x`  
5. 满意后按 `s`，Tab 切换保存到项目或 home，Enter 确认  

### 命令与配置示例

```text
/workflows
```

保存后调用：

```text
/triage-issues on issues 1024, 1025, 1030
```

（官方示例：`args` 全局变量接收结构化参数）

### 本地测试结果

⚠️ 未实测 TUI。机制来自官方文档 ✅

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 列表为空 | 是否在同一 session；是否 workflow 已结束且 session 已退出 |
| 项目/个人命令冲突 | 同名时 **项目** `.claude/workflows/` 优先 |

### 官方 vs 社区

与 [Workflows#watch](https://code.claude.com/docs/en/workflows) 快捷键表一致。

### 建议

长任务时保持 `/workflows` 开着；Tech Lead 要求 **保存脚本进 Git** 便于审计。

---

## 特性 5：`claude agents` 统一后台会话视图

### 是什么

`claude agents` 子命令管理 **background agents**（`claude --bg` 等派生的会话）：统一列表、可为派发会话指定默认 `--model`、`--effort`、`--permission-mode`、`--agent`、`--mcp-config` 等，与 `settings.json` 的 `agent` 字段对齐。

### 适用场景

同时跑多个后台修复任务、CI 式派发、脚本化列出活跃 session。

### 前置条件

- Claude Code 2.1.x 近期版本（本地 2.1.161）  
- 实际后台任务需有效认证

### 详细使用步骤

1. 终端 A：`claude --bg` 或从 Agent 视图派发（Desktop/IDE）  
2. 终端 B：`claude agents` 进入管理 TUI，或 `claude agents --json` 脚本化  
3. 派发前可带：`claude agents --model claude-opus-4-8 --effort high`  
4. 用 `--cwd /path/to/repo` 过滤某目录下启动的后台会话  

### 命令与配置示例

```bash
./node_modules/.bin/claude agents --json
./node_modules/.bin/claude agents --help
./node_modules/.bin/claude agents --cwd /workspace --model claude-sonnet-4-6 --effort medium
```

### 本地测试结果

```bash
$ ./node_modules/.bin/claude agents --json
[]
```
✅ 命令可执行；无后台 session 时返回空数组。

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 列表始终为空 | 确认是否用 `--bg` 启动；是否同 `cwd` 过滤 |
| JSON 脚本失败 | 加 `--json` 不需要 TTY（官方 help 写明） |

### 官方 vs 社区

Platform 6/2 提到 expanded Auto mode 与 agent 字段 — 与 `claude agents --agent` 帮助 **一致**。

### 建议

平台工程师用 `--json` 接入内部 dashboard；个人开发者用 TUI 即可。

---

## 特性 6：Opus 4.8、Fast Mode 与 Auto 模式（平台联动）

### 是什么

2026-05-28 平台发布 **Claude Opus 4.8**（1M context、adaptive thinking、effort 默认 high）。Claude Code 侧：**Max 用户默认 fast mode on Opus 4.8**；**Auto 模式**向更多用户开放用于长任务；Opus 4.6 fast mode 弃用。6/2 release notes 再次点名 Claude Code 文档。

### 适用场景

需要最快反馈的 Max 用户（fast）；长任务希望自动切换模型/模式的用 Auto。

### 前置条件

- 对应订阅（Max / Team / Enterprise）  
- Claude Code 已登录

### 详细使用步骤

1. `claude` 内 `/model` 选择 Opus 4.8  
2. Max 用户检查 fast mode 是否默认开启（Settings 或 `/config`）  
3. 长任务尝试 **Auto mode**（官方称 expanded availability，具体入口见 Claude Code 设置）  
4. 从 Opus 4.6 fast 迁移到 **Opus 4.8 或 4.7 fast**（API 文档 Migration）

### 命令与配置示例

```bash
./node_modules/.bin/claude --effort high -p "解释当前目录的模块边界"
```

### 本地测试结果

`--effort` 在 `--help` 中存在 ✅；fast/auto 交互 ⚠️ 未实测

### 问题与解决方案

| 问题 | 解决 |
|------|------|
| 账单激增 | fast mode 溢价；大任务避免与 ultracode 同开 |
| 400 sampling 错误 | Opus 4.8 非默认 temperature/top_p — 见 API 迁移指南 |

### 官方 vs 社区

[Platform release notes 5/28 & 6/2](https://platform.claude.com/docs/en/release-notes/overview) — 权威。

### 建议

**Max**：日常 fast，攻坚再 ultracode。**Team**：统一在 managed settings 控制 fast 与 workflows。

---

## 特性 7：关闭 Workflows（个人 / 组织）

### 是什么

三套等价关闭：TUI `/config` 关 Dynamic workflows；`~/.claude/settings.json` 的 `"disableWorkflows": true`；环境变量 `CLAUDE_CODE_DISABLE_WORKFLOWS=1`（启动时读取）。组织级用 managed settings 或 Claude Code admin。

### 详细使用步骤

1. 个人：编辑 `~/.claude/settings.json`  
2. 或 `export CLAUDE_CODE_DISABLE_WORKFLOWS=1` 后启动  
3. 组织：管理员在 admin 控制台关闭  
4. 验证：`ultracode` 不再高亮，`/effort` 无 ultracode 项  

### 配置示例

```json
{
  "disableWorkflows": true
}
```

```bash
export CLAUDE_CODE_DISABLE_WORKFLOWS=1
claude
```

### 本地测试结果

环境变量未在本次 shell 持久化 ⚠️；配置项与官方文档 ✅ 一致

### 建议

金融/医疗等 **强审计** 环境默认组织级关闭，仅批准项目临时开启。

---

## 自检清单（本文覆盖特性）

| 特性 | 8 项自检 |
|------|----------|
| Dynamic Workflows | ✅ 全部 |
| Ultracode | ✅ 含 3 模板 |
| /deep-research | ✅ |
| /workflows | ✅ |
| claude agents | ✅ 含 CLI 输出 |
| Opus 4.8 / Auto / fast | ✅（交互未测标明） |
| disableWorkflows | ✅ |

---

## 参考链接

- https://code.claude.com/docs/en/workflows  
- https://claude.com/blog/introducing-dynamic-workflows-in-claude-code  
- https://platform.claude.com/docs/en/release-notes/overview  
- https://kenhuangus.substack.com/p/claude-code-orchestration-dynamic  
