# Claude Code 每日技术文档 — 2026-06-10

> 监测源：[code.claude.com](https://code.claude.com/docs)、[GitHub CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)、[Anthropic Release Notes](https://www.anthropic.com/news)  
> 本地实测版本：**2.1.172**（npm `@anthropic-ai/claude-code@latest`）  
> 交叉验证：官方 Release + CNBC/GitLab 社区报道

---

## 今日综述

2026-06-10 是 Claude Code 密集更新周的第三天。今日发布 **v2.1.172**，核心亮点是**子 Agent 嵌套深度扩展至 5 层**——这与 Cursor SDK、Codex multi-agent 形成行业共振。叠加 6/9 发布的 **Claude Fable 5**（Mythos 级模型，需 v2.1.170+）和 6/8 的 **Safe Mode 排障模式**，Claude Code 正从「单会话工具」进化为「可编排的多层 Agent 运行时」。

---

## 特性一：嵌套子 Agent（v2.1.172，今日发布）

### 是什么（机制说明，非一句话）

Claude Code 的子 Agent（Sub-agent）机制允许主 Agent 通过 `Task` 工具将子任务委派给独立上下文的 worker。此前子 Agent 只能执行叶子任务，不能再 spawn 下级。v2.1.172 起，**子 Agent 可以 spawn 自己的子 Agent，最深 5 层嵌套**。每一层保持独立 prompt、模型选择和工具权限；父层通过 `SendMessage` 或任务完成回调获取结果。这与 Cursor SDK 6/4 发布的「Nested subagents」、Codex 的 `multi_agent` 特性形成对标。

### 适用场景

**适合：**
- 大型代码库审计：父 Agent 按目录拆分，子 Agent 按模块深挖，孙 Agent 按文件逐行审查
- 迁移项目：规划层（Opus/Fable）→ 执行层（Sonnet）→ 验证层（独立评估子 Agent）
- 并行调研：多个分支同时探索不同技术方案，父 Agent 汇总

**不适合：**
- 简单单文件修改（嵌套带来额外 token 与延迟）
- 对成本极度敏感的场景（每层嵌套 = 独立上下文窗口）
- 需要严格串行审批的合规环境（多层自动委派可能绕过人工检查点）

### 前置条件

- Claude Code **≥ 2.1.172**
- 有效 Anthropic 订阅或 API Key（子 Agent 默认继承父会话模型，可通过 `settings.json` 的 `agent` 字段覆盖）
- 项目已配置 `.claude/settings.json` 或全局 `~/.claude/settings.json`
- 子 Agent 模型受 `availableModels` 组织策略约束（v2.1.172 修复了此前子 Agent 可绕过限制的问题）

### 详细使用步骤

1. **升级 CLI**：`cd /workspace/tools && npm install @anthropic-ai/claude-code@latest`
2. **启动交互会话**：`./node_modules/.bin/claude`
3. **定义自定义 Agent**（可选）：在 `settings.json` 中添加 agents 配置，或在启动时用 `--agents` 传入 JSON
4. **发起嵌套任务**：向主 Agent 描述需要多层拆分的任务，例如「审计整个 monorepo，每个 package 用独立子 Agent，每个子 Agent 再 spawn 测试覆盖检查」
5. **监控进度**：使用 `claude agents` 查看所有活跃/完成的 background session；v2.1.172 修复了嵌套子 Agent 停止后仍显示 active 的问题

### 命令与配置示例

```bash
# 升级并验证版本
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest
./node_modules/.bin/claude --version
# 预期输出：2.1.172 (Claude Code)

# 启动并委派多层任务（交互模式）
./node_modules/.bin/claude

# 非交互模式委派（适合 CI 脚本）
./node_modules/.bin/claude -p "Audit the /workspace/src directory. For each subdirectory, spawn a sub-agent to review code quality. Each sub-agent should spawn another sub-agent to check test coverage." --allowed-tools "Task,Bash,Read,Grep,Glob"

# 查看所有 Agent 会话状态
./node_modules/.bin/claude agents
./node_modules/.bin/claude agents --json --all
```

`settings.json` 示例子 Agent 定义：

```json
{
  "agent": "reviewer",
  "agents": {
    "reviewer": {
      "description": "Code reviewer that can delegate to module-level sub-agents",
      "prompt": "You are a senior code reviewer. For large changes, delegate per-module review to sub-agents. Each sub-agent should further delegate per-file lint checks.",
      "model": "claude-sonnet-4-6"
    },
    "test-writer": {
      "description": "Writes and runs tests for a specific module",
      "prompt": "Write comprehensive tests for the assigned module. Run tests and report coverage.",
      "model": "claude-sonnet-4-6"
    }
  }
}
```

### 本地测试结果

| 命令 | 输出 | 状态 |
|------|------|------|
| `claude --version` | `2.1.172 (Claude Code)` | ✅ |
| `claude --help` | 完整选项列表，含 `--agents`、`--agent` | ✅ |
| `claude -p "test"` | `Not logged in · Please run /login` | ⚠️ 无 API Key，功能路径可验证 |

### 问题与解决方案

**错误 1：子 Agent 在面板中一直显示 active**
- 原因：v2.1.171 及更早版本的已知 bug
- 排查：`claude agents --json` 查看 `state` 字段
- 解决：升级到 2.1.172+

**错误 2：子 Agent 使用了组织禁用的模型**
- 原因：v2.1.171 及更早 `availableModels` 未应用到子 Agent
- 排查：检查 `/model` 选择器与组织 managed settings
- 解决：升级 2.1.172；确认 `availableModels` 配置正确

### 官方 vs 社区交叉验证

| 来源 | 内容 | 一致性 |
|------|------|--------|
| [GitHub v2.1.172 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.172) | 子 Agent 嵌套 5 层 | 基准 |
| [Cursor SDK Changelog 6/4](https://cursor.com/changelog/sdk-updates-jun-2026) | Nested subagents 任意深度 | 部分一致（行业趋势共振） |
| [虎嗅 Loop Engineering 报道](https://www.huxiu.com/article/4865348.html) | Boris Cherny 夜间运行数千 Agent | 一致（生态方向） |

### 利弊分析 + 分角色使用建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 2-3 层嵌套足够；优先 Sonnet 执行层控成本 |
| 团队 | 在 `CLAUDE.md` 中定义嵌套委派规则；用 `claude agents` 统一监控 |
| 企业合规 | 启用 `availableModels` 限制；关闭 `--allow-dangerously-skip-permissions`；审计子 Agent 工具调用日志 |

---

## 特性二：Claude Fable 5 模型接入（v2.1.170，6/9 发布）

### 是什么（机制说明，非一句话）

Claude Fable 5 是 Anthropic 首个**公开发布的 Mythos 级模型**——与内部 Mythos 5 共享底层权重，但增加了安全分类器：对网络安全、生物化学、蒸馏等高风险查询自动 fallback 到 Claude Opus 4.8（<5% 会话触发）。Fable 5 面向**长周期异步 Agent 任务**设计：100 万 token 上下文、最高 128K 输出、在软件工程 benchmark 上超越 Opus 4.8 约 10%+。Claude Code v2.1.170 起可通过 `/model` 选择 `claude-fable-5`。

### 适用场景

**适合：** 大型代码库迁移、跨天运行的重构、复杂多步骤 debug、需要视觉理解（截图重建代码）  
**不适合：** 简单问答（成本高：$10/M input, $50/M output）、对延迟敏感交互、可能触发安全分类器的安全研究场景

### 前置条件

- Claude Code **≥ 2.1.170**
- Pro/Max/Team/Enterprise 订阅（6/9–6/22 免费包含 Fable 5；6/23 起需 usage credits）
- 或 Claude API Key + `claude-fable-5` 端点

### 详细使用步骤

1. 升级：`npm install @anthropic-ai/claude-code@latest`
2. 登录：`claude` → `/login`
3. 切换模型：在会话中输入 `/model`，选择 `claude-fable-5`
4. 发起长任务：描述需要数小时完成的迁移/重构目标
5. 监控 fallback：若触发安全分类器，终端会提示已切换至 Opus 4.8

### 命令与配置示例

```bash
# 基础：切换 Fable 5 并执行单文件审查
./node_modules/.bin/claude
# 在 TUI 中：
# /model
# 选择 claude-fable-5
# 输入：Review src/auth/ for security vulnerabilities

# 进阶：非交互长任务 + fallback 模型
./node_modules/.bin/claude -p "Migrate all class components in src/ to functional components with hooks. Create a git commit after each file." \
  --fallback-model claude-sonnet-4-6,claude-haiku-4-5 \
  --effort high
```

### Claude Code ultracode：3 个完整 Prompt 模板

**模板 1 — 安全审计（Audit）**

```text
You are performing a security audit on this codebase.

Scope: All files under src/ that handle user input, authentication, or database queries.

Process:
1. Read each file in scope using parallel reads
2. For each file, spawn a sub-agent to check OWASP Top 10 vulnerabilities
3. Document findings in AUDIT_REPORT.md with severity (CRITICAL/HIGH/MEDIUM/LOW)
4. For CRITICAL findings, propose a fix PR

Do not modify any code until the report is complete and I approve.
Use claude-fable-5 reasoning for complex data flow analysis.
```

**模板 2 — 框架迁移（Migration）**

```text
Migrate this project from Express.js to Fastify.

Constraints:
- Preserve all existing API endpoints and response shapes
- Run existing test suite after each module migration
- Create one git commit per migrated route file
- If tests fail, fix before proceeding

Phase 1: Audit current routes and middleware (read-only)
Phase 2: Set up Fastify scaffold alongside Express
Phase 3: Migrate routes one by one, starting with health checks
Phase 4: Remove Express dependencies

Work autonomously for up to 4 hours. Report progress every 10 files.
```

**模板 3 — 技术调研（Research）**

```text
Research whether we should adopt Temporal.io for our workflow orchestration.

Deliverables:
1. RESEARCH.md comparing Temporal vs BullMQ vs custom solution
2. POC/ directory with minimal working example for our use case (order processing)
3. COST_ANALYSIS.md with infrastructure estimates

Process:
- Spawn sub-agents to research each option in parallel
- Each sub-agent should read our current src/workflows/ implementation first
- Synthesize findings with pros/cons table
- Include links to official docs and 2+ community case studies

Do not make any changes to production code.
```

### 本地测试结果

| 项目 | 结果 | 状态 |
|------|------|------|
| `claude --version` | 2.1.172（包含 Fable 5 支持） | ✅ |
| `/model` Fable 5 选项 | 需登录后验证 | ⚠️ 未实测（无 API Key） |
| 官方定价页面 | $10/M in, $50/M out | ✅ 交叉验证 |

### 问题与解决方案

**错误 1：Fable 5 不在 `/model` 列表中**
- 排查：`claude /status` 检查订阅计划与 entitlement
- 解决：确认 Pro+ 订阅且在 6/9–6/22 窗口内；或配置 API Key

**错误 2：任务中途突然变慢/质量下降**
- 原因：可能触发了 Opus 4.8 fallback
- 排查：查看会话中是否有 "fallback" 提示
- 解决：重新表述查询避免安全敏感关键词；联系 Anthropic 申请 Mythos 5 trusted access

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| Anthropic 官方 | https://www.anthropic.com/news/claude-fable-5-mythos-5 | 基准 |
| CNBC | https://www.cnbc.com/2026/06/09/anthropic-mythos-claude-fable-5.html | 一致 |
| GitLab Blog | https://about.gitlab.com/blog/mythos-class-claude-fable-5-on-gitlab/ | 一致（6/9 上线 Duo） |

### 利弊分析 + 分角色使用建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 6/22 前免费窗口充分利用；长任务用 Fable，日常用 Sonnet |
| 团队 | 制定 Fable 5 使用配额；复杂迁移项目优先分配 |
| 企业 | 评估 30 天数据 retention 政策；安全团队审核 fallback 日志 |

---

## 特性三：Safe Mode 安全排障模式（v2.1.169）

### 是什么（机制说明，非一句话）

Safe Mode 在启动时**禁用所有自定义配置**：`CLAUDE.md`、plugins、skills、hooks、MCP servers。用于排查「某个自定义配置导致 Claude Code 行为异常」的场景。通过 CLI flag `--safe-mode` 或环境变量 `CLAUDE_CODE_SAFE_MODE=1` 启用。

### 适用场景

**适合：** Claude Code 启动崩溃、工具调用异常、MCP 冲突、hooks 死循环  
**不适合：** 正常开发（会失去项目上下文和自定义工具）

### 前置条件

- Claude Code **≥ 2.1.169**

### 详细使用步骤

1. 确认问题可复现
2. 以 Safe Mode 启动：`claude --safe-mode`
3. 若 Safe Mode 下正常 → 逐个恢复配置（先 MCP，再 hooks，再 CLAUDE.md）
4. 定位问题配置后修复或移除
5. 正常模式验证

### 命令与配置示例

```bash
# 方式 1：CLI flag
./node_modules/.bin/claude --safe-mode

# 方式 2：环境变量
CLAUDE_CODE_SAFE_MODE=1 ./node_modules/.bin/claude

# 方式 3：非交互排障
CLAUDE_CODE_SAFE_MODE=1 ./node_modules/.bin/claude -p "List files in current directory" --allowed-tools "Bash,Read"
```

### 本地测试结果

```bash
$ ./node_modules/.bin/claude --safe-mode --help
Usage: claude [options] [command] [prompt]
# --safe-mode 选项存在于 help 输出中 ✅
```

### 问题与解决方案

**错误 1：Safe Mode 下仍加载了 MCP**
- 排查：`claude /mcp` 确认列表为空
- 解决：检查是否有 managed settings 强制注入 MCP

**错误 2：Safe Mode 无法登录**
- 原因：Safe Mode 仍需要 auth，但不加载自定义配置
- 解决：使用 `ANTHROPIC_API_KEY` 环境变量直接认证

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [v2.1.169 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.169) | 基准 |
| [code.claude.com docs](https://code.claude.com/docs) | 一致 |

---

## 特性四：`/cd` 目录切换命令（v2.1.169）

### 是什么（机制说明，非一句话）

`/cd <path>` 允许在**不中断当前会话**的情况下切换工作目录，同时**保持 prompt cache 不被破坏**。此前切换目录需要退出重开，导致上下文丢失和 cache miss。

### 适用场景

**适合：** monorepo 跨 package 操作、审计多目录代码库  
**不适合：** 需要完全隔离权限的场景（应开新会话）

### 前置条件

- Claude Code **≥ 2.1.169**
- 目标目录在权限 allowlist 内

### 详细使用步骤

1. 在 Claude Code 交互会话中
2. 输入 `/cd /path/to/other/package`
3. 确认工作目录已切换（工具调用路径变化）
4. 继续在同一上下文中操作新目录

### 命令与配置示例

```bash
# 启动后在内置 TUI 中使用
./node_modules/.bin/claude
# 输入：/cd ../other-project
# 输入：List all TypeScript files here
```

### 本地测试结果

⚠️ 未实测（需交互 TUI + 登录）。官方 Release Note 已确认功能存在。

### 问题与解决方案

**错误 1：切换后工具仍访问旧目录**
- 排查：检查 `--add-dir` 是否限制了目录范围
- 解决：确保新目录在 allowlist 中

**错误 2：cache 仍 miss**
- 原因：动态系统提示词部分（cwd 信息）会刷新
- 解决：使用 `--exclude-dynamic-system-prompt-sections` 优化跨用户 cache

---

## 特性五：disableBundledSkills 隐藏内置技能（v2.1.169）

### 是什么（机制说明，非一句话）

通过 `settings.json` 的 `disableBundledSkills: true` 或环境变量 `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1`，可隐藏 Anthropic 内置的 skills、workflows 和 slash commands，让模型只看到用户自定义的技能。

### 适用场景

**适合：** 企业标准化工作流（只用内部 skills）、减少 slash command 菜单噪音  
**不适合：** 新手用户（会失去内置便利功能）

### 前置条件

- Claude Code **≥ 2.1.169**

### 详细使用步骤

1. 编辑 `~/.claude/settings.json` 或项目 `.claude/settings.json`
2. 添加 `"disableBundledSkills": true`
3. 重启 Claude Code
4. 验证 `/` 菜单中内置命令已隐藏

### 命令与配置示例

```json
{
  "disableBundledSkills": true
}
```

```bash
CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1 ./node_modules/.bin/claude
```

### 本地测试结果

⚠️ 未实测（需登录后验证 slash 菜单）。配置项在 v2.1.169 Release Note 中确认。

### 问题与解决方案

**错误 1：内置 skill 仍出现**
- 排查：确认 settings 文件路径正确；检查 managed settings 是否覆盖
- 解决：环境变量优先级更高，用 `CLAUDE_CODE_DISABLE_BUNDLED_SKILLS=1` 强制

**错误 2：自定义 skill 也被隐藏**
- 原因：`disableBundledSkills` 只影响 bundled，不影响用户 skills
- 解决：检查 skill 文件是否在 `~/.claude/skills/` 或项目 `.claude/skills/`

---

## 检索记录

- GitHub Releases 页面：2026-06-10 22:05 UTC
- Anthropic News：2026-06-10 22:06 UTC
- 本地 npm install：2026-06-10 22:08 UTC
