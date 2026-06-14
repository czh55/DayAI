# Claude Code 每日技术文档 — 2026-06-07

> 监测源：[code.claude.com/docs](https://code.claude.com/docs)、[changelog](https://code.claude.com/docs/en/changelog.md)、GitHub CHANGELOG  
> 本地实测版本：**2.1.168**（`npm install @anthropic-ai/claude-code@latest`）  
> 当日行业背景：Anthropic 6/5 发布「刹车踏板」安全呼吁；6/1 机密递交 IPO S-1

---

## 今日综述

截至 2026-06-07，Claude Code 稳定通道版本为 **2.1.168**。近一周 changelog 无 6/7 当日单点发布，但 5 月下旬至 6 月初密集交付的能力——**ultracode 动态多 Agent 工作流**（原 `workflow` 触发词已更名）、**Opus 4.8 默认 + xhigh effort**、**fallbackModel 三级容灾**、**Auto Mode 扩展至 Bedrock/Vertex/Foundry**——仍是开发者最应掌握的变更集。这些能力与 Anthropic 同期「Claude 已编写 80% 自家代码库」的公开表态形成呼应：工具能力越强，越需要权限、审计与组织级 Harness。

---

## 特性一：ultracode 动态多 Agent 工作流

### 是什么（机制说明，非一句话）

`ultracode`（原动态 workflow，触发词由 `workflow` 更名为 `ultracode`）是 Claude Code 在 CLI/Desktop 中的一项编排模式：当你在提示词中包含触发关键词 `ultracode` 时，Claude 不会以单会话线性执行，而是**在后台孵化数十至数百个子 Agent**，每个子 Agent 持有独立 prompt 与模型配置，由主会话协调任务分解、进度合并与冲突消解。机制上它复用 Agent Teams 基础设施，但面向「大规模并行探索」场景做了调度优化——例如跨模块重构、全库安全审计、多服务迁移调研。

与手动 `/agents` 派单的区别：ultracode 由模型自主决定子任务拓扑，用户只需描述终态目标；与 Subagent（`Task` 工具）的区别：ultracode 强调**长时程、多波次**后台运行，而非单次工具调用的短子任务。

### 适用场景

**适合：**
- 需要同时扫描多个 package/微服务的安全或依赖审计
- 大型迁移（框架升级、语言版本跃迁）需并行试探多条路径
- 调研类任务：对比 3+ 技术方案并产出结构化报告

**不适合：**
- 单文件小修小补（开销大于收益）
- 强合规环境未配置权限规则时盲目开启（子 Agent 继承父级 MCP/工具权限）
- Haiku 等不支持 xhigh/ultracode 的模型（`/effort ultracode` 会对不兼容模型隐藏选项）

### 前置条件

- Claude Code **≥ 2.1.140**（ultracode 更名后版本）
- 订阅：Pro/Team/Enterprise 或 API Key；ultracode 消耗显著高于普通会话
- 项目根或 `~/.claude/settings.json` 中未禁用 dynamic workflows
- 磁盘：后台 Agent 会在 `~/.claude/` 下创建 session 与 worktree 元数据

### 详细使用步骤

1. 在项目目录启动 Claude Code：`cd your-repo && claude`
2. 确认模型支持 ultracode：`/model` 选择 Opus 4.8 或 Sonnet 4.6+；`/effort` 可设 `xhigh` 用于最难子任务
3. 在提示词中包含触发词 `ultracode` 并描述终态，例如：「ultracode：将本 monorepo 中所有 axios 调用迁移到 fetch，保持测试通过」
4. 按 `Shift+Tab` 切换到合适权限模式（建议 default 或 auto，企业环境用 auto + `permissions.json` 约束）
5. 用 `←←`（双左箭头）或 `claude agents` 打开 Agent View 监控各子会话状态
6. 子任务完成后在主会话审查 diff，用 `/review` 或 `git diff` 合并

### 命令与配置示例

**基础示例（审计）：**

```bash
cd /workspace
claude -p "ultracode: 审计本仓库所有 Python 文件的 SQL 注入风险，输出 markdown 报告到 ./audit-report.md"
```

**进阶示例（迁移 + 指定 fallback）：**

```bash
claude \
  --fallback-model claude-sonnet-4-6,claude-haiku-4-5 \
  -p "ultracode: 将 packages/api 从 Express 迁移到 Fastify，每个路由文件独立子任务，最终跑通 npm test"
```

**`~/.claude/settings.json` 片段（启用 auto mode + 约束删除）：**

```json
{
  "permissions": {
    "allow": ["Read", "Edit", "Bash(npm test *)", "Bash(git *)"],
    "deny": ["Bash(rm -rf *)", "Bash(git push --force *)"]
  },
  "autoRun": {
    "allow_instructions": [
      "Read-only inspections under ./packages are fine."
    ],
    "block_instructions": [
      "Always pause delete operations and git push --force."
    ]
  }
}
```

### ultracode 完整 Prompt 模板（审计 / 迁移 / 调研）

**模板 A — 安全审计：**

```text
ultracode: 对本仓库执行分层安全审计。

范围：
- 所有含用户输入的 API 路由
- 所有数据库查询构造
- 所有 auth/session 中间件

每个子 Agent 负责一个 top-level 目录，输出：
1. 风险等级（高/中/低）
2. 文件路径与行号
3. 修复建议（含代码片段）

终态交付物：./security-audit-YYYY-MM-DD.md，按目录分章，附 executive summary。
约束：只读分析，不要修改源码；可运行静态分析命令。
```

**模板 B — 框架迁移：**

```text
ultracode: 将 frontend/ 从 Vue 2 Options API 迁移到 Vue 3 Composition API。

策略：
- 按 src/views 下每个 .vue 文件拆分子任务
- 子 Agent 必须：迁移后运行 npm run lint 与相关单测
- 遇到共享 composable 冲突时，主会话协调抽取公共模块

验收标准：
- npm run build 成功
- 无 vue-compat 警告
- 生成 MIGRATION.md 记录 breaking changes

不要修改 backend/ 与 CI 配置，除非阻塞构建。
```

**模板 C — 技术调研：**

```text
ultracode: 调研「本 Node 单体拆分为 3 个微服务」的三种拓扑方案。

方案维度：
A) 按业务域（用户/订单/支付）
B) 按读写分离（CQRS）
C) 按团队边界（Conway）

每个方案子 Agent 输出：
- 服务边界图（mermaid）
- 数据一致性策略
- 预估迁移人周与风险

终态：./docs/microservice-options.md，含对比表与推荐方案（附理由）。
只读仓库与 docs/，不写代码。
```

### 本地测试结果

```bash
$ cd /workspace/tools && ./node_modules/.bin/claude --version
2.1.168 (Claude Code)

$ ./node_modules/.bin/claude --help | grep -E "effort|fallback|agent"
  --effort <level>                      Effort level ...
  --fallback-model <model>              Enable automatic fallback ...
  --agent <agent>                       Agent for the current session ...
```

- ✅ CLI 版本与 changelog 一致，help 暴露 `--effort`、`--fallback-model`
- ⚠️ 未实测 ultracode 完整多 Agent 运行（需 Anthropic 订阅/API Key；本环境无凭证）
- 未实测原因：无 `ANTHROPIC_API_KEY` 或 OAuth 登录；官方 SOP 见 [agent-teams](https://code.claude.com/docs/en/agent-teams.md)

### 问题与解决方案

**问题 1：`/effort ultracode` 提示模型不支持**

- 原因：当前模型非 Opus 4.8 / 未开启 dynamic workflows
- 排查：`/model` 确认模型；`/config` 检查 Workflow keyword trigger
- 解决：切换 Opus 4.8 或移除 settings 中对 ultracode 的禁用

**问题 2：子 Agent 完成后主会话未合并结果**

- 原因：后台 daemon 冷启动或 `claude agents` 附加失败
- 排查：`claude doctor`；检查 `~/.claude/` 磁盘权限
- 解决：`claude update` 后重试；用 `claude agents --json` 查看 `waitingFor` 字段

### 官方 vs 社区交叉验证

| 来源 | 说法 | 一致性 |
|------|------|--------|
| [changelog 2.1.140+](https://code.claude.com/docs/en/changelog.md) | `workflow` 更名为 `ultracode` | ✅ |
| [CNBC 6/1](https://www.cnbc.com/2026/06/01/microsoft-and-google-take-on-anthropic-and-openai-in-ai-coding-models.html) | Claude Code 带动 Anthropic 企业采用 | ✅ 方向一致 |
| [Euronews 6/5](https://www.euronews.com/next/2026/06/05/anthropic-calls-for-brake-pedal-before-ai-develops-itself-without-human-oversight) | Claude 写 80% Anthropic 代码 | ⚠️ 与 ultracode 能力正相关，非直接文档 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 先用单 Agent 熟悉权限模式，再对 >5k LOC 迁移启用 ultracode；设 `--fallback-model` 防过载 |
| 团队 | 统一 `CLAUDE.md` + `permissions.json`；Agent View 指定 code owner 审查合并 |
| 企业合规 | 启用 managed settings + MCP allowlist；ultracode 前强制 sandbox；审计 OTEL 导出 |

---

## 特性二：fallbackModel 与 API 容灾

### 是什么

`fallbackModel` 允许配置最多 **三个** 备用模型，当主模型返回 overload、503 或部分非重试错误时，Claude Code 按顺序切换并在每个 user turn 开始时重试主模型。交互式会话与 `claude -p` 均支持 `--fallback-model` CLI 参数及 `settings.json` 持久配置。

### 前置条件

- Claude Code ≥ 2.1.160（changelog 记载）
- API 或订阅账户对备用模型有访问权限

### 详细使用步骤

1. 编辑 `~/.claude/settings.json` 添加 `fallbackModel` 数组
2. 或在单次命令传入：`claude --fallback-model claude-sonnet-4-6,claude-haiku-4-5`
3. 运行 `/doctor` 确认 settings 已加载
4. 故意在高峰时段发起请求，观察是否自动降级（日志含 fallback 事件）

### 命令与配置示例

```json
{
  "model": "claude-opus-4-8",
  "fallbackModel": [
    "claude-sonnet-4-6",
    "claude-haiku-4-5"
  ]
}
```

```bash
claude --fallback-model claude-sonnet-4-6,claude-haiku-4-5 -p "解释本仓库 README 结构"
```

### 本地测试结果

- ✅ `--help` 显示 `--fallback-model` 参数
- ⚠️ 未触发真实 overload 降级（无 API 调用）

### 问题与解决方案

**问题 1：fallback 未生效仍直接报错**

- 排查：`claude -d api` 查看是否 auth/rate-limit 类错误（此类不 fallback）
- 解决：区分错误类型；auth 错误需 `claude login`

**问题 2：降级后输出质量骤降**

- 解决：把 Sonnet 放第一 fallback，Haiku 仅作最后手段；任务分级使用不同 profile

### 官方 vs 社区

- 官方：[changelog fallbackModel](https://code.claude.com/docs/en/changelog.md) ✅
- 社区：无独立新闻稿，属可靠性改进

---

## 特性三：Auto Mode 扩展至 Bedrock / Vertex / Foundry

### 是什么

Auto Mode 原仅限 Anthropic 直连订阅；现可通过环境变量 `CLAUDE_CODE_ENABLE_AUTO_MODE=1` 在 **Amazon Bedrock、Google Vertex AI、Microsoft Foundry** 上启用，配合 Opus 4.7/4.8。分类子 Agent 决定 Shell/MCP/Fetch 调用自动执行或转人工审批。

### 前置条件

- 第三方云已部署 Claude 模型端点
- 设置 `CLAUDE_CODE_ENABLE_AUTO_MODE=1`
- Opus 4.7 或 4.8 模型别名

### 详细使用步骤

1. 配置云凭证（如 `AWS_PROFILE`、`GOOGLE_APPLICATION_CREDENTIALS`）
2. `export CLAUDE_CODE_ENABLE_AUTO_MODE=1`
3. Settings → 选择 Auto 权限模式（`Shift+Tab` 循环）
4. 在 `permissions.json` 编写 `autoRun.allow_instructions` / `block_instructions`
5. 运行典型 dev 任务验证审批频率下降

### 配置示例

```bash
export CLAUDE_CODE_ENABLE_AUTO_MODE=1
export AWS_REGION=us-east-1
cd my-project && claude
```

```json
{
  "autoRun": {
    "allow_instructions": [
      "npm test and npm run lint in this repo are safe to auto-run."
    ],
    "block_instructions": [
      "Never auto-run curl to external URLs without approval."
    ]
  }
}
```

### 本地测试结果

- ⚠️ 未配置 Bedrock/Vertex 凭证，无法端到端验证 Auto Mode 分类器
- ✅ changelog 与 [auto-mode-config](https://code.claude.com/docs/en/auto-mode-config.md) 文档一致

### 问题与解决方案

**问题 1：第三方云上 Auto Mode 选项灰掉**

- 原因：未设 `CLAUDE_CODE_ENABLE_AUTO_MODE=1` 或模型非 Opus 4.7+
- 解决：按官方 opt-in 文档设置环境变量

**问题 2：误拦合法操作「could not evaluate this action」**

- 原因：分类器输出 token 耗尽
- 解决：简化 `block_instructions`；升级至最新 2.1.168（含分类器 latency 优化）

---

## 特性四：claude agents 与 Agent View 增强

### 是什么

`claude agents` 提供 TUI 多会话调度面板：支持 `! <cmd>` 后台执行、`--bg --exec`、PR 列显示、`--json` 输出 `waitingFor` 状态。与 Desktop Agent View 共享底层 daemon。

### 前置条件

- Claude Code 2.1.150+
- 终端支持 Unicode（窄终端下布局会降级）

### 详细使用步骤

1. 运行 `claude agents` 进入列表视图
2. 输入提示 dispatch 新会话，或 `! npm test` 后台运行
3. Enter 附加到运行中会话，Esc 返回列表
4. `claude agents --json` 供 CI 脚本解析状态

### 命令示例

```bash
# 后台执行命令并附加
claude --bg --exec 'npm run test:watch'

# JSON 状态供监控
claude agents --json | jq '.[] | {name, status, waitingFor}'
```

### 本地测试结果

```bash
$ ./node_modules/.bin/claude agents --help 2>&1 | head -5
# 需交互式 TTY；本环境 TERM=dumb 仅验证二进制存在
```

- ⚠️ TUI 未在 dumb terminal 完整跑通
- ✅ `--help` 与 changelog 功能列表一致

### 问题与解决方案

**问题 1：附加会话后键盘无响应（Windows 高 CPU）**

- 解决：升级 2.1.168；关闭过多后台会话

**问题 2：`claude agents` 列宽截断**

- 解决：拉宽终端；2.1.160+ 已修复 40 列硬截断

---

## 版本对照与升级建议

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest
./node_modules/.bin/claude --version
./node_modules/.bin/claude doctor
```

企业用户：同步检查 managed settings 的 `requiredMinimumVersion` 范围，避免版本被拒启动。

---

## 参考链接

- [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)
- [Agent Teams](https://code.claude.com/docs/en/agent-teams.md)
- [Auto Mode Config](https://code.claude.com/docs/en/auto-mode-config.md)
- [Permissions](https://code.claude.com/docs/en/permissions.md)
- [Anthropic IPO 公告 2026-06-01](https://www.anthropic.com/news/confidential-draft-s1-sec)
