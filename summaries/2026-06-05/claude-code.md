# Claude Code 每日技术文档 — 2026-06-05

> 本地 CLI 版本：**2.1.165**（`npm install @anthropic-ai/claude-code@latest`）  
> 官方文档：[Dynamic Workflows](https://code.claude.com/docs/en/workflows) | 博客：[Harness for every task](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code)（2026-06-02）

## 今日综述

2026-06-05 当日 **Claude Code CLI 无独立 changelog 条目**，npm 包版本为 **2.1.165**（高于 Dynamic Workflows 最低要求 2.1.154）。今日行业侧最大关联事件是 Anthropic 6/4 报告 [When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)：Claude 已合并 Anthropic 内部 80%+ 代码，直接印证 Claude Code 在生产研发中的权重。

本周产品焦点仍是 **Dynamic Workflows（研究预览）** 与 **`/effort ultracode`** 组合；6/2 官方博客补充了 9 类编排模式与 prompt 模板。6/5 Claude 博客列表出现《How one Anthropic seller rebuilt his team's workflows with Claude Code》，指向非工程岗位的工作流实践（销售/运营场景）。

---

## 本地实测总览

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest

./node_modules/.bin/claude --version
# 输出：2.1.165 (Claude Code)

./node_modules/.bin/claude --help | rg effort
# --effort <level>  Effort level (low, medium, high, xhigh, max)
```

| 项 | 结果 |
|----|------|
| 安装 | ✅ |
| `--version` | ✅ 2.1.165 |
| `--help` | ✅ 含 `--effort`、agents、MCP、权限相关 flags |
| 交互会话 / OAuth | ❌ 未实测（无 ANTHROPIC_API_KEY / 无交互登录） |

---

## 特性一：Dynamic Workflows（动态工作流）

### 是什么（机制说明）

Dynamic Workflow 是 Claude Code 在**研究预览**中提供的编排机制：Claude 根据任务**现场生成 JavaScript 编排脚本**，由独立 runtime 在后台执行，协调 **数十至数百个子 Agent**，主会话保持响应。脚本通过专用 API（如 spawn subagent、等待结果、分支循环）持有**中间状态**，避免全部挤入主上下文，从而缓解 **agentic laziness、self-preferential bias、goal drift**（官方 6/2 博客术语）。

与静态 `claude -p` 或多 Agent SDK 的区别：**计划写在可 rerun 的脚本里**，而非由主 Claude 逐步即兴调度。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 全库安全审计、大规模迁移（数百文件） | 单文件小修 |
| 深度调研需交叉验证来源 | 简单问答 |
| 对抗式评审（多 Agent 互相挑错） | 低 token 预算的日常编码 |
| 简历排序、Slack 历史挖掘等非代码任务 | 需要运行中频繁人类插话的多阶段签核 |

### 前置条件

- Claude Code **≥ 2.1.154**（本地 2.1.165 ✅）
- 付费计划：**Pro / Max / Team / Enterprise**（Enterprise 默认关闭，Admin 可开）；API / Bedrock / Vertex / Foundry 亦支持
- Pro 用户需在 `/config` 打开 **Dynamic workflows**
- 需要 **WebSearch** 的工具（如 `/deep-research`）须未被禁用

### 详细使用步骤

1. 确认版本：`claude update` 或 `npm install -g @anthropic-ai/claude-code@latest`
2. 打开配置：在 CLI 输入 `/config`，启用 **Dynamic workflows** 行
3. **方式 A — 单次任务**：在 prompt 中加入 `ultracode` 或自然语言「use a workflow」
4. **方式 B — 整会话**：输入 `/effort ultracode`（会话级，新会话失效）
5. 审批：Default 模式下会展示阶段列表，选 Yes / View raw script / No
6. 监控：输入 `/workflows`，方向键选择运行，Enter 查看阶段与 token
7. 保存：在 `/workflows` 视图按 `s`，选择项目 `.claude/workflows/` 或 `~/.claude/workflows/`

### 命令与配置示例

**基础 — 触发单次工作流审计**

```text
ultracode: audit every API endpoint under src/routes/ for missing auth checks
```

**进阶 — 会话级 ultracode + 明确对抗验证**

```text
/effort ultracode

Go through my last 50 sessions and mine them for corrections I keep making; use adversarial verification before writing CLAUDE.md rules.
```

**禁用工作流（企业或节省 token）**

```json
// ~/.claude/settings.json
{
  "disableWorkflows": true
}
```

或环境变量：

```bash
export CLAUDE_CODE_DISABLE_WORKFLOWS=1
```

### 本地测试结果

| 命令 | 输出 | 状态 |
|------|------|------|
| `claude --version` | 2.1.165 | ✅ |
| `claude --help` | 含 `--effort` | ✅ |
| 实际启动 workflow | 未执行 | ⚠️ 需 OAuth/API Key 与付费计划 |

### 问题与解决方案

**问题 1：`/effort` 菜单没有 ultracode**

- 排查：`/config` 中 Dynamic workflows 是否关闭；settings 是否 `disableWorkflows: true`；环境变量 `CLAUDE_CODE_DISABLE_WORKFLOWS=1`
- 命令：`rg disableWorkflows ~/.claude/settings.json`

**问题 2：工作流启动后立即失败 / 无 WebSearch**

- 排查：当前 plan 与工具 allowlist；Enterprise 是否 Admin 禁用
- 解决：Admin 在 Claude Code 管理页开启；或在 prompt 中改用 codebase 内调研

### 官方 vs 社区交叉验证

| 来源 | URL | 一致性 |
|------|-----|--------|
| 官方 Docs | https://code.claude.com/docs/en/workflows | 基准 |
| 官方博客 6/2 | https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code | 一致，补充 9 种模式 |
| 社区 Ultracode 指南 | https://claudefa.st/blog/guide/development/ultracode | 一致；强调 ultracode = xhigh + 自动 workflow |

### 利弊分析 + 分角色建议

- **个人开发者**：大型 refactor 时用 ultracode；日常用 `high` 省 token
- **团队**：将验证通过的 workflow 存 `.claude/workflows/` 入库共享
- **企业合规**：Enterprise 默认关；先在隔离 repo 试点；配合权限 allowlist 避免子 Agent 执行危险 shell

---

## 特性二：Ultracode 与 `/effort` 档位

### 是什么

`ultracode` 是 Claude Code 的**会话级 effort 档位**，组合 **xhigh 推理** + **自动 Dynamic Workflow 编排**。对「 substantive 任务」Claude 会自行判断是否写 workflow，而非等你输入 "workflow" 关键词。

### 前置条件

- 模型支持 **xhigh**（如 Opus 4.8 / 4.7）
- Dynamic workflows **已启用**
- Max / Team / API 等（Pro 需手动开 workflows）

### 详细使用步骤

1. `/config` 确认 Dynamic workflows 为 ON
2. 输入 `/effort ultracode`
3. 提交复杂任务（迁移、调研、全库扫描）
4. 任务完成后 `/effort high` 恢复日常档位
5. 可选：在 `/config` 关闭 **Ultracode keyword trigger**，避免误触高亮关键词

### 命令示例

```text
/effort ultracode
ultracode: rename User model to Account across the entire monorepo with test verification
```

```bash
# 非交互（需 API Key，且权限模式可能跳过审批）
claude -p --effort xhigh "Summarize security findings" 
# 注：ultracode 为交互档位名；非交互用 xhigh 近似推理强度
```

### 本地测试

`claude --help` 显示 `--effort <level>` 支持 low/medium/high/xhigh/max — ✅

### 常见错误

1. **Token 账单激增**：ultracode 对每任务 spawn 多 Agent → 设 prompt 内 token 预算「use 10k tokens」
2. **Opus 4.6 无 xhigh**：菜单不显示 ultracode → 切换 `/model` 到 Opus 4.8

### 交叉验证

- 官方 workflows 文档 ✅
- claudefa.st ultracode 指南 ✅（说明 v2.1.154 起可用）

### 分角色建议

- 个人：仅里程碑任务开 ultracode
- 团队：Code review 负责人默认 high，发布前 ultracode 全量审计
- 企业：Finance 审批 ultracode 会话配额

---

## 特性三：内置 `/deep-research` 工作流

### 是什么

Bundled workflow：多路 web 搜索 → 抓取 → **对抗式交叉验证** → 输出带引用报告。是体验 Dynamic Workflows 的**最快路径**。

### 使用步骤

1. 确保 WebSearch 可用
2. 输入：

```text
/deep-research What changed in the Node.js permission model between v20 and v22?
```

3. 首次允许 workflow 权限（可选「不再询问」）
4. `/workflows` 查看进度
5. 完成后阅读带引用的合成报告

### 基础 + 进阶示例

**基础**

```text
/deep-research Compare MIT and Apache-2.0 patent clauses for SaaS backends
```

**进阶（结合代码库）**

```text
/deep-research How does our auth middleware compare to OWASP session management best practices? Read src/auth/ first, then web sources.
```

### 本地测试

未实测（需联网 + 认证）— 官方 SOP 完整 ✅

### 常见错误

- **地区/计划无 WebSearch**：换 API 部署或手动 `@browser` 工具
- **报告缺少引用**：prompt 中强调 "cite every claim"

### 交叉验证

- 官方 docs Bundled workflows 表 ✅
- 6/2 博客 Deep research 小节 ✅

---

## Ultracode 完整 Prompt 模板（审计 / 迁移 / 调研）

### 模板 1：安全审计

```text
/effort ultracode

ultracode: Perform a security audit on this repository.
Scope: all routes under src/api/, all SQL builders, and env secret loading.
Use adversarial verification: for each finding, spawn a separate agent to attempt to refute it.
Output: markdown report with severity, file:line, reproduction steps, and suggested fix PRs.
Do not modify production configs without listing them in a quarantine section.
```

### 模板 2：大规模迁移

```text
ultracode: Migrate all imports from legacy `@company/ui-v1` to `@company/ui-v2` across packages/apps/*.
Break work by package in parallel subagents; each subagent runs tests in its own worktree.
After each merge candidate, run adversarial review against the test suite log.
Stop when zero test failures and grep shows zero remaining ui-v1 imports.
```

### 模板 3：跨源调研

```text
/deep-research

Question: What are the 2026 best practices for MCP server auth in enterprise IDE agents?
Also search our internal CLAUDE.md and docs/security/ for existing standards.
Cross-check official Anthropic, Cursor, and OpenAI docs; flag contradictions.
Deliver: decision table for our team (columns: vendor, auth mode, audit log, data residency).
```

---

## 特性四：Anthropic「When AI Builds Itself」对 Claude Code 用户的含义（6/4）

### 是什么

研究所报告，非 CLI 功能，但解释 Claude Code 战略位置：Anthropic 声称 **80%+ 内部合并代码由 Claude 编写**，工程师产出约为 2024 年 **8 倍**。

### 对使用者的实际影响

- Claude Code 迭代速度可能继续加快（功能如 workflows 更密）
- 企业采购可能增加「人类 oversight」条款
- 报告提议全球暂停机制 — 极端情况下 frontier 模型更新节奏或变

### 交叉验证

- 官方：https://www.anthropic.com/institute/recursive-self-improvement
- Scientific American 2026-06-05：https://www.scientificamerican.com/article/anthropic-warns-ai-may-soon-begin-recursive-self-improvement/
- 一致性：✅ 数据与论点一致

---

## 特性五：Skills 与 `/config`（6/3 官方博客延伸）

### 是什么

Anthropic 6/3 博客《Lessons from building Claude Code: How we use skills》强调：Skills 是**可复用指令包**，团队应把重复 correction 沉淀为 skill 而非加长 CLAUDE.md。

### 使用步骤

1. 在项目中创建 `.claude/skills/<name>/SKILL.md`
2. 在会话中用 `/skill-name` 或让 Claude 自动加载
3. 结合 workflow：在 skill 中引用 `.claude/workflows/*.js` 模板

### 示例

```markdown
<!-- .claude/skills/release/SKILL.md -->
# Release skill
When user asks for a release, always run tests, update CHANGELOG, and create annotated tag.
Never push to main without explicit user confirmation.
```

### 本地测试

Skills 解析依赖项目目录 — 本仓库未配置 skill 文件，未实测加载 — ⚠️

---

## 版本与升级

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest
./node_modules/.bin/claude --version
```

---

## 参考链接

- Workflows 文档：https://code.claude.com/docs/en/workflows
- Dynamic workflows 介绍（5/28）：https://claude.com/blog/introducing-dynamic-workflows-in-claude-code
- Harness 模式详解（6/2）：https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code
- 递归自改进报告（6/4）：https://www.anthropic.com/institute/recursive-self-improvement
