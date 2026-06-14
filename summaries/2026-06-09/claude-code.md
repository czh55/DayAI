# Claude Code 每日深度 — 2026-06-09

> 监测源：[code.claude.com/docs](https://code.claude.com/docs)、[GitHub CHANGELOG](https://github.com/anthropics/claude-code/releases)、[Anthropic 新闻](https://www.anthropic.com/news)  
> 本地实测版本：**2.1.170**（`./node_modules/.bin/claude --version`）  
> 今日核心：**Claude Fable 5 正式接入**（v2.1.170）+ 昨日 v2.1.169 排查/多会话增强

---

## 版本时间线（trigger 日前后）

| 版本 | 发布日 | 级别 |
|------|--------|------|
| **2.1.170** | 2026-06-09 | 🔴 今日：Fable 5 模型、VS Code 终端 transcript 修复 |
| 2.1.169 | 2026-06-08 | `--safe-mode`、`/cd`、`disableBundledSkills` 等 |
| 2.1.168 | 2026-06-06 | 稳定性修复 |
| 2.1.165 | 2026-06-06 | `fallbackModel`、跨会话消息安全加固 |

---

## 特性一：Claude Fable 5 模型接入（v2.1.170）

### 是什么（机制说明，非一句话）

2026-06-09，Anthropic 发布 **Claude Fable 5**——首个对公众开放的 **Mythos 级**模型。Fable 5 与受限版 Claude Mythos 5 共享同一底层权重，但 Fable 5 叠加安全分类器：在网络安全、生物、化学、模型蒸馏等高风险域，请求会被拦截并 **回退到 Claude Opus 4.8**。Claude Code **2.1.170** 起可在 CLI 中选择该模型进行交互式与 `-p` 非交互式编码。

API 模型 ID：`claude-fable-5`。定价：输入 $10/MTok、输出 $50/MTok（约为 Opus 4.8 的两倍）。订阅用户 2026-06-09～06-22 可免费使用，06-23 起需 usage credits（API/按量企业不受影响）。

### 适用场景（适合 / 不适合）

| 适合 | 不适合 |
|------|--------|
| 复杂多文件重构、长程 Agent、高难度推理 | 预算敏感、高频短问答 |
| 需要当前 Anthropic 公开最强编码能力 | 高风险安全研究（会触发回退） |
| 企业合规可接受 30 天流量留存 | 要求零数据留存的敏感项目（Mythos 级强制 30 天监控） |

### 前置条件

- Claude Code ≥ **2.1.170**
- Pro / Max / Team / Enterprise 订阅，或有效 API Key
- 网络可访问 Anthropic API
- 了解 Fable 5 在敏感域会回退 Opus 4.8

### 详细使用步骤

1. 升级 CLI：`cd /workspace/tools && npm install @anthropic-ai/claude-code@latest`
2. 验证版本：`./node_modules/.bin/claude --version` 应显示 `2.1.170`
3. 交互式指定模型：`claude --model claude-fable-5`
4. 或在会话内：`/model claude-fable-5`
5. 非交互式：`claude -p --model claude-fable-5 "审查 src/auth 模块的安全问题"`

### 命令与配置示例

```bash
# 基础：单次代码审查
cd /your/project
claude -p --model claude-fable-5 \
  "阅读 packages/api/src 下所有路由文件，列出未鉴权端点，输出 Markdown 表格"

# 进阶：配合 ultracode 动态工作流（见下文特性五）
claude --model claude-fable-5
# 在提示词中包含：ultracode 对 monorepo 做安全审计，分模块 fan-out 子 agent
```

`settings.json` 持久默认模型：

```json
{
  "model": "claude-fable-5"
}
```

### 本地测试结果

```bash
$ cd /workspace/tools && ./node_modules/.bin/claude --version
2.1.170 (Claude Code)
```

- ✅ 版本号确认 2.1.170，help 中可见 `--model` 选项
- ❌ 未执行真实 API 调用（环境无 `ANTHROPIC_API_KEY` / OAuth）
- ⚠️ Fable 5 实际推理需有效订阅或 API 凭证

### 问题与解决方案

| 错误 | 排查 |
|------|------|
| `model not found: claude-fable-5` | 确认 CLI ≥2.1.170；`claude update` |
| 敏感问题被回退到 Opus 4.8 | 预期行为；见 [官方说明](https://www.anthropic.com/news/claude-fable-5-mythos-5) |
| 订阅无法选用 Fable 5 | 06-09～22 分批 rollout；检查计划 tier |

```bash
claude doctor
claude --version
```

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| Anthropic 官方 | https://www.anthropic.com/news/claude-fable-5-mythos-5 | 定价、回退机制、订阅窗口 |
| GitHub Release | https://github.com/anthropics/claude-code/releases/tag/v2.1.170 | ✅ 一致 |
| TechCrunch | https://techcrunch.com/2026/06/09/anthropics-claude-fable-5-is-a-version-of-mythos-the-public-can-access-today/ | ✅ 一致 |
| 量子位（转载链） | 网易科技 2026-06-09 21:42 引量子位 | ✅ 定价与护栏描述一致 |

### 利弊分析 + 分角色建议

- **个人开发者**：06-22 前抓紧免费窗口做高难度 side project；之后评估 credits。
- **团队**：在 CI 中暂不建议默认 Fable 5（成本高）；用于 PR 安全审计等关键路径。
- **企业合规**：确认 30 天流量留存政策；敏感代码库可能需继续使用 Opus 4.8 或私有化方案。

### 自检 8 项

- [x] 功能定义：Mythos 级公开模型 + 安全回退
- [x] 启用路径：`--model` / `/model` / settings.json
- [x] 逐步操作 ≥3 步
- [x] 输入输出示例
- [x] 成功标准：2.1.170 + 模型可用
- [x] 失败模式 ≥2
- [x] 场景利弊
- [x] 分角色建议

---

## 特性二：`--safe-mode` 安全排查模式（v2.1.169）

### 是什么

`--safe-mode`（环境变量 `CLAUDE_CODE_SAFE_MODE=1`）启动时 **禁用全部自定义层**：`CLAUDE.md`、plugins、skills、hooks、MCP servers。用于判断「问题出在项目配置还是 CLI/模型本身」。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| MCP 导致启动卡死 | 日常开发（失去项目上下文） |
| 怀疑恶意/错误 hooks | 需要 MCP 工具的生产任务 |
| 企业支持工单复现 | |

### 前置条件

- Claude Code ≥ 2.1.169
- 知道如何在不带 safe-mode 的情况下复现问题

### 详细使用步骤

1. 在项目目录执行：`claude --safe-mode`
2. 或：`CLAUDE_CODE_SAFE_MODE=1 claude -p "hello"`
3. 对比：去掉 flag 后是否仍失败
4. 若 safe-mode 正常 → 逐项恢复 MCP/plugins/CLAUDE.md 定位元凶
5. 排查完退出，正常启动：`claude`

### 命令与配置示例

```bash
# 基础
claude --safe-mode

# 进阶：safe-mode + 指定目录，排除 .claude 污染
claude --safe-mode --add-dir /tmp/clean-sandbox

# 环境变量方式（CI 排查）
export CLAUDE_CODE_SAFE_MODE=1
claude -p "运行 npm test 并报告失败用例"
```

### 本地测试结果

```bash
$ ./node_modules/.bin/claude --help | grep safe-mode
  --safe-mode                           Start with all customizations
```

✅ help 已暴露 `--safe-mode`  
❌ 未启动完整 TUI 会话验证禁用效果（无交互终端）

### 问题与解决方案

| 错误 | 解决 |
|------|------|
| safe-mode 仍异常 | 检查 Anthropic 服务状态、`claude doctor` |
| 忘记关闭 safe-mode | 新开 shell 或不设环境变量 |

### 官方 vs 社区

- 官方：https://github.com/anthropics/claude-code/releases/tag/v2.1.169
- 社区：36氪 Loop Engineering 文间接引用 Claude Code 稳定性讨论 — 部分一致

### 分角色建议

- **个人**：遇到「以前能用现在不行」首选 safe-mode
- **团队**：写入 runbook，要求上报前先 safe-mode 复现
- **企业**：配合 managed settings 审计 MCP 白名单

---

## 特性三：`/cd` 会话内切换工作目录（v2.1.169）

### 是什么

`/cd <path>` 在 **不中断 prompt cache** 的前提下，将会话工作目录迁移到新路径。区别于退出重开（会冷启动上下文）。

### 适用场景

- monorepo 内跨 package 连续开发
- 先全局规划再进入子模块实现

### 前置条件

- v2.1.169+
- 目标目录在权限允许范围内

### 详细使用步骤

1. 在 `claude` 交互会话输入：`/cd packages/frontend`
2. 确认 footer 或 `pwd` 工具输出已变更
3. 继续在同一对话中编辑新目录文件
4. 需要回到根目录：`/cd ../..` 或绝对路径

### 命令示例

```text
/cd /workspace/my-app/services/api
现在为 api 服务添加健康检查端点 /healthz
```

### 本地测试

⚠️ 需交互 TUI，本环境 `TERM=dumb` 未实测 `/cd` 行为；help 与 release notes 已确认存在。

### 常见错误

| 问题 | 排查 |
|------|------|
| 权限拒绝 | `--add-dir` 预授权父目录 |
| cache 仍失效 | 确认未用外部 `cd`+新进程 |

### 交叉验证

- 官方 release v2.1.169 ✅
- 36氪 Claude Code 工作流文 — 未单独提及 `/cd`，无矛盾

---

## 特性四：`disableBundledSkills` 隐藏内置技能（v2.1.169）

### 是什么

设置 `disableBundledSkills: true` 或 `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1` 后，模型侧 **不可见** Anthropic 捆绑的 skills、workflows、内置 slash commands，减少上下文噪音与误触发。

### 前置条件

- v2.1.169+
- 团队自有 skills 覆盖所需工作流

### 详细使用步骤

1. 编辑 `~/.claude/settings.json` 或项目 `.claude/settings.json`
2. 添加 `"disableBundledSkills": true`
3. 重启 `claude`
4. 输入 `/` 观察菜单是否仅剩自定义项
5. 或用环境变量：`CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1 claude`

### 配置示例

```json
{
  "disableBundledSkills": true
}
```

```bash
export CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1
claude
```

### 本地测试

❌ 未改 settings 实测菜单；release notes 与 env 名已验证。

### 利弊

- **利**：企业统一工作流、减少 ultracode 等误触发
- **弊**：新用户失去内置教程型命令

---

## 特性五：ultracode 动态工作流（Dynamic Workflows，v2.1.160+）

### 是什么

用户在提示词中包含触发词 **`ultracode`**（原 `workflow` 已弃用）时，Claude Code 用 **Opus 4.8+** 即时生成 JavaScript 编排脚本，协调多个子 Agent（fork / worktree / teammate 模式），执行 fan-out、对抗验证、竞赛等模式。适合超大规模审计、迁移、调研。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 全库安全审计、依赖升级 | 单文件小改 |
| 需要并行子 agent | token 预算有限 |

### 前置条件

- 支持 ultracode 的模型（Fable 5 / Opus 4.8；不支持时 `/effort ultracode` 会提示）
- 足够上下文与 API 配额

### 详细使用步骤

1. `claude --model claude-fable-5`（或 Opus 4.8）
2. 输入含 `ultracode` 的任务描述
3. 观察生成的 `.js` 工作流与 spawn 的子 agent
4. 审查各子 agent 输出后由主 agent 汇总
5. 可配合 `/loop` + `/goal` 做周期性 ultracode 任务

### 三个完整 Prompt 模板

**模板 A — 安全审计**

```text
ultracode：对当前 monorepo 做 OWASP Top 10  oriented 安全审计。
要求：fan-out 按 top-level package 分子 agent；每个子 agent 在独立 worktree；
对抗验证：第二个 agent 复核第一个的 findings；输出统一 Markdown 报告到 docs/security-audit-2026-06-09.md
```

**模板 B — 框架迁移**

```text
ultracode：将 apps/web 从 React 17 + CRA 迁移到 Vite 6 + React 19。
classify-and-act：先分类组件（类组件/函数组件/测试），再分派；
生成并测试：每个模块迁移后运行 vitest；失败则回滚该模块 diff
```

**模板 C — 技术调研**

```text
ultracode：调研「本仓库是否适合引入 Rust 重写 hot path」。
tournament：3 个子 agent 分别论证 Pro/Con/混合方案；
汇总对比 latency、人力、风险；附可运行 benchmark 命令（不实际执行，只写脚本）
```

### 本地测试

❌ 需 API + 交互会话；未执行 ultracode 全流程。  
✅ v2.1.160 release 与 36氪动态工作流专题一致。

### 常见错误

| 错误 | 解决 |
|------|------|
| ultracode 不可用 | 换 Fable 5/Opus 4.8；检查 dynamic workflows 设置 |
| 子 agent 成本爆炸 | 缩小 fan-out 范围；用 Sonnet 子 agent |

### 交叉验证

- 官方：https://github.com/anthropics/claude-code/releases/tag/v2.1.160
- 36氪：https://www.36kr.com/p/3839611362658569 — ✅ 模式名称与机制一致

### 分角色建议

- **个人**：先用小 repo 试 ultracode 熟悉 fan-out 成本
- **团队**：规定 ultracode 必须 code review 工作流脚本
- **企业**：在 managed settings 限制子 agent 数量与网络

---

## 特性六：VS Code 集成终端 transcript 修复（v2.1.170）

### 是什么

修复从 VS Code 集成终端（或继承 Claude Code 环境变量的 shell）启动时，**会话 transcript 未保存**、**`--resume` 列表缺失** 的问题。

### 使用步骤

1. 升级至 2.1.170
2. 从 VS Code 终端运行 `claude`，完成一轮对话
3. 退出后 `claude --resume` 应能看到该会话
4. 若仍失败：检查是否多个 `CLAUDE_CODE_*` 冲突，`claude doctor`

### 本地测试

❌ 无 VS Code GUI 环境未实测；release note 已记录修复项。

---

## 本地实测总览

| 命令 | 结果 |
|------|------|
| `claude --version` | 2.1.170 ✅ |
| `claude --help` | 含 `--safe-mode`、`--fallback-model` ✅ |
| `claude -p` | ❌ 无 API Key |
| `claude --safe-mode` | help 可见，TUI 未测 ⚠️ |

---

## 今日研究员结论

2026-06-09 对 Claude Code 用户而言，**升级 2.1.170 以试用 Fable 5** 是首要动作；同时建议将 v2.1.169 的 `--safe-mode` 纳入团队排障手册。ultracode + Fable 5 组合可能成为本周最强「全库自动化」栈，但需严控 token 与 30 天数据留存合规。
