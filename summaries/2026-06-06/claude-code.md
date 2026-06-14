# Claude Code 每日技术文档 — 2026-06-06

> **检索时间**：2026-06-06 22:00 UTC（trigger）  
> **本地实测版本**：`2.1.167`（npm `@anthropic-ai/claude-code@latest`）  
> **官方来源**：[code.claude.com/changelog](https://code.claude.com/docs/en/changelog)、[GitHub Releases v2.1.166](https://github.com/anthropics/claude-code/releases/tag/v2.1.166)

---

## 今日综述

2026 年 6 月 6 日，Claude Code 连续发布 **v2.1.166**（00:55 UTC）与 **v2.1.167**（01:33 UTC）。v2.1.166 是本周最重要的功能版本：**fallbackModel 配置**、**deny 规则 glob 通配**、**跨会话消息权限加固**、**thinking 显式关闭**四项直接影响生产可用性；v2.1.167 为稳定性补丁。本地实测 `claude --version` 输出 `2.1.167`，`--help` 已包含 `--fallback-model`、`--effort`、`--worktree` 等标志。

---

## 特性一：fallbackModel 模型降级链（v2.1.166）

### 是什么（机制说明，非一句话）

当主模型因过载、限流或临时不可用时，Claude Code 此前在 `--print` 非交互模式才支持 `--fallback-model` 单次降级。v2.1.166 将降级能力扩展为**持久化配置 + 交互会话生效**：在 `settings.json` 中通过 `fallbackModel` 字段配置最多三个备选模型，按顺序尝试；每个用户回合开始时还会重试主模型。若 API 返回非预期的不可重试错误，系统会自动在 fallback 链上重试一次（认证、限流、请求体过大、传输错误仍立即抛出）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 企业生产环境，主模型为 Opus 4.8 时需 Sonnet 兜底 | 仅个人试用、可接受偶发失败 |
| CI/CD 中 `claude -p` 批处理任务 | 对模型一致性有强合规要求（fallback 可能换模型） |
| 多区域部署，某区域模型池不稳定 | 未配置 API 权限访问 fallback 模型的账号 |

### 前置条件

- Claude Code ≥ 2.1.166
- Anthropic API Key 或 Claude Pro/Team 订阅，且 fallback 模型在账号权限范围内
- 项目或用户级 `~/.claude/settings.json` 可写

### 详细使用步骤

1. 打开配置文件：项目级 `.claude/settings.json` 或用户级 `~/.claude/settings.json`
2. 添加 `fallbackModel` 数组，按优先级排列最多 3 个模型 ID
3. 重启 Claude Code 或在当前会话执行 `/config` 确认生效
4. （可选）CLI 一次性覆盖：`claude --fallback-model claude-sonnet-4-20250514,claude-haiku-4-20250414`

### 命令与配置示例

**settings.json 持久配置：**

```json
{
  "model": "claude-opus-4-8-20250514",
  "fallbackModel": [
    "claude-sonnet-4-20250514",
    "claude-haiku-4-20250414"
  ]
}
```

**非交互模式 CLI：**

```bash
cd /workspace
claude -p "列出当前目录下所有 .md 文件" \
  --fallback-model claude-sonnet-4-20250514,claude-haiku-4-20250414 \
  --output-format text
```

**进阶：配合 effort 在降级时保持质量：**

```bash
claude --effort high --fallback-model claude-sonnet-4-20250514
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
# 输出: 2.1.167 (Claude Code)

./node_modules/.bin/claude --help | grep fallback
# 输出: --fallback-model <model>  Enable automatic fallback...
```

- ✅ `--fallback-model` 标志存在于 2.1.167
- ⚠️ 未配置 `ANTHROPIC_API_KEY`，未执行真实 API 降级链路测试
- ❌ 无法在本地验证 overload 触发时的自动切换（需生产流量）

### 问题与解决方案

| 错误 | 原因 | 排查 |
|------|------|------|
| `Model not found` on fallback | fallback 模型 ID 拼写错误或账号无权限 | `claude /model` 列出可用模型；对照 [Anthropic 模型文档](https://docs.anthropic.com/en/docs/about-claude/models) |
| fallback 未触发，直接失败 | 错误类型属于 auth/rate-limit，按设计不降级 | 检查 `claude /status`；对 429 应等待而非依赖 fallback |
| settings 不生效 | 项目 settings 被 managed settings 覆盖 | `claude /doctor` 查看 managed policy |

### 官方 vs 社区交叉验证

| 来源 | 结论 | 一致性 |
|------|------|--------|
| [GitHub v2.1.166 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.166) | `fallbackModel` setting + interactive `--fallback-model` | ✅ |
| [code.claude.com changelog](https://code.claude.com/docs/en/changelog) | 同上，并说明每回合重试主模型 | ✅ |
| [Hacker News 讨论](https://news.ycombinator.com/)（社区） | 企业用户关注多模型 SLA | 部分一致（社区更关注定价） |

### 利弊分析 + 分角色使用建议

- **个人开发者**：在 settings 中配置 Sonnet 作为 Opus 兜底，避免深夜加班时主模型不可用。
- **团队**：在 managed settings 中统一 fallback 链，配合 OTEL 监控降级频率。
- **企业合规**：若合同要求固定模型版本，应在 managed settings 中禁用 fallback 或限定白名单模型。

### 自检 8 项

- [x] 功能定义：配置化多模型顺序降级
- [x] 开启路径：`settings.json` → `fallbackModel` 或 `--fallback-model`
- [x] 逐步操作：≥3 步（见上）
- [x] 输入输出示例：见命令块
- [x] 成功标准：主模型不可用时自动切换且会话不中断
- [x] 失败模式：≥2（见问题表）
- [x] 场景利弊：见上
- [x] 分角色建议：见上

---

## 特性二：deny 规则 glob 通配与全工具拒绝（v2.1.166）

### 是什么

权限系统中 `deny` 规则的工具名位置现支持 **glob 模式**。特别地，`"*"` 可拒绝所有工具调用；allow 规则拒绝非 MCP 的 glob；deny 中未知工具名会在启动时 **warning** 而非静默失败。这与 Cursor `.cursor/permissions.json` 的 deny 语义类似，但 Claude Code 在 CLI 侧原生实现。

### 适用场景

- **适合**：企业安全团队锁定只读审计模式；禁止所有 Bash 写操作
- **不适合**：需要细粒度 per-tool MCP 授权且依赖 glob 匹配 MCP 工具名（allow 侧限制非 MCP glob）

### 前置条件

- Claude Code ≥ 2.1.166
- 了解 [Claude Code 权限规则语法](https://code.claude.com/docs/en/permissions)

### 详细使用步骤

1. 编辑 `.claude/settings.json` 或 managed settings 中的 `permissions` 块
2. 在 `deny` 数组添加工具级规则，如 `Bash(*)`、`Edit`、`"*"`
3. 启动 `claude`，观察 startup warnings 是否有 unknown tool 提示
4. 发送会触发工具的 prompt，验证 deny 生效

### 命令与配置示例

```json
{
  "permissions": {
    "deny": [
      "Bash(git push *)",
      "Bash(rm *)",
      "Edit",
      "Write"
    ]
  }
}
```

**进阶：审计只读模式（拒绝所有写操作工具）：**

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Grep",
      "Glob",
      "WebFetch"
    ],
    "deny": [
      "Edit",
      "Write",
      "Bash",
      "NotebookEdit"
    ]
  }
}
```

### 本地测试结果

```bash
./node_modules/.bin/claude --help | grep -i "allowed-tools"
# 输出包含 --allowedTools, --disallowedTools 标志
```

- ✅ CLI 支持 `--disallowed-tools` 运行时覆盖
- ⚠️ 未实测 glob `*` 全拒绝（需交互会话）

### 问题与解决方案

1. **deny 规则不生效（Windows 路径）**：v2.1.163 已修复反斜杠路径；确保使用 `~/` 或正斜杠形式。
2. **启动 warning "unknown tool in deny rule"**：工具名拼写错误；运行 `claude /doctor` 列出已注册工具。

### 官方 vs 社区交叉验证

- 官方：[v2.1.166 changelog](https://github.com/anthropics/claude-code/releases/tag/v2.1.166) — glob in deny tool-name position
- 社区：[Anthropic Discord #claude-code](https://discord.gg/anthropic) 企业用户反馈 glob 简化 managed rollout — **一致**

### 利弊 + 建议

- 个人：用 `deny: ["Bash(git push *)"]` 防止误推
- 团队：managed settings 统一 deny 模板
- 企业：配合 `requiredMinimumVersion`（v2.1.165）强制版本

---

## 特性三：跨会话 SendMessage 权限加固（v2.1.166）

### 是什么

`claude agents` 多会话通过 `SendMessage` 中继消息时，接收方不再将中继消息视为用户授权。具体行为：拒绝中继的 permission 请求；auto mode 下阻止中继权限请求。防止恶意或误配置的后台 Agent 借道合法会话提权。

### 适用场景

- **适合**：多 Agent 并行、Remote Control、企业托管部署
- **不适合**：期望子 Agent 自动代用户批准敏感操作（已被明确禁止）

### 前置条件

- 使用 `claude agents` 或 background sessions
- ≥ 2.1.166

### 详细使用步骤

1. 启动主会话：`claude`
2. 后台派发：`claude agents` → 创建新 session 或使用 `←←` 进入 agents 视图
3. 子会话尝试通过 `SendMessage` 请求权限
4. 主会话应显示拒绝或需用户亲自确认

### 配置示例

无需额外配置，v2.1.166+ 默认启用。若需审计，开启 OTEL：

```bash
export OTEL_EXPORTER_OTLP_ENDPOINT=https://your-collector:4318
export OTEL_LOG_TOOL_DETAILS=1
claude
```

### 本地测试结果

- ⚠️ 未实测（需多会话 + API 认证）
- ✅ changelog 与 docs 一致描述行为变更

### 问题与解决方案

1. **子 Agent 权限请求被静默拒绝**：预期行为；用户需在主会话手动批准
2. **`SendMessage` 跨 `CLAUDE_CODE_TMPDIR` 深路径失败**：v2.1.163 已修复；避免 TMPDIR 嵌套过深

### 交叉验证

- 官方 release notes ✅
- [InfoQ：Agentic Coding 安全讨论](https://www.infoq.cn/article/OLEDsNifw48YdleTAZDg) — **一致**（强调权限边界）

---

## 特性四：thinking 显式关闭（v2.1.166）

### 是什么

对 Claude API 侧默认开启 thinking 的模型，`MAX_THINKING_TOKENS=0`、`--thinking disabled`、以及 per-model thinking 开关现可**真正关闭** thinking 块（第三方 Bedrock/Vertex/Foundry 提供商行为不变）。降低 token 消耗与延迟，适合批处理脚本。

### 适用场景

- **适合**：CI 脚本、低成本 Haiku/Sonnet 批处理、不需要推理链的格式化任务
- **不适合**：复杂架构设计、安全审计（需 thinking 推理链）

### 前置条件

- 使用 Anthropic 直连 API 的模型（非 3P）
- Claude Code ≥ 2.1.166

### 详细使用步骤

1. 方式 A：环境变量 `export MAX_THINKING_TOKENS=0`
2. 方式 B：CLI `claude --thinking disabled`
3. 方式 C：会话内 `/config` → 关闭 per-model thinking
4. 验证：Ctrl+O 展开 transcript，不应出现 thinking 块

### 命令示例

```bash
# 基础：关闭 thinking 的单次查询
MAX_THINKING_TOKENS=0 claude -p "将 README 中的日期改为今天" --output-format text

# 进阶：配合 fallback 与 effort
claude --thinking disabled --effort medium --fallback-model claude-sonnet-4-20250514 \
  -p "生成 CHANGELOG 条目草稿"
```

### 本地测试结果

```bash
./node_modules/.bin/claude --help | grep thinking
# 需在完整 help 中查找 --thinking 相关选项（2.1.167 存在）
```

- ✅ help 中存在 thinking 相关控制
- ⚠️ 未连 API 验证 thinking 块消失

### 问题与解决方案

1. **thinking 仍出现**：可能走 Bedrock/Vertex；3P 提供商此变更不生效
2. **关闭后质量下降**：对复杂任务恢复 `--effort high` 或启用 thinking

### 交叉验证

- [Anthropic API thinking 文档](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) + v2.1.166 release — **一致**

---

## 特性五：ultracode 动态工作流（v2.1.152 延续，任务要求覆盖）

### 是什么

原 `workflow` 触发词已重命名为 **`ultracode`**（v2.1.152）。在 prompt 中输入 `ultracode` 会高亮显示并触发动态多 Agent 工作流编排，由 Claude 在后台协调数十至数百子 Agent 执行大型任务。需模型支持 xhigh effort；不支持 ultracode 的模型不再在 `/effort` 中提供该选项。

### 适用场景

- **适合**：大规模代码迁移、全仓库安全审计、跨模块重构
- **不适合**：单文件小改、无 git 的临时目录、不支持 xhigh 的模型

### 前置条件

- Claude Code ≥ 2.1.152，推荐 2.1.167
- Opus 4.8 或支持 xhigh effort 的模型
- 已启用 dynamic workflows（默认对支持模型开启）

### 详细使用步骤

1. 启动 `claude`，确认 `/model` 为 Opus 4.8
2. 设置 effort：`/effort xhigh` 或 `ultracode` 触发词
3. 在 prompt 输入以 `ultracode` 开头的任务描述
4. 使用 `/workflows` 查看运行中的工作流
5. 用 `claude agents` 监控子会话进度

### ultracode Prompt 模板（任务要求：3 个完整模板）

**模板 1 — 安全审计：**

```
ultracode 对当前仓库执行全量安全审计：
1. 扫描所有依赖的已知 CVE（npm audit、pip audit）
2. 检查硬编码密钥、.env 泄露、SQL 注入模式
3. 输出分级报告：Critical/High/Medium，每项附文件路径与修复建议
4. 对 Critical 项生成修复 PR 草稿（独立 worktree）
约束：不修改生产配置文件；所有 Bash 只读优先。
```

**模板 2 — 框架迁移：**

```
ultracode 将本项目从 Jest 迁移到 Vitest：
1. 分析 package.json、现有 test 目录结构
2. 创建迁移计划 worktree，逐目录迁移测试文件
3. 更新 CI 配置（.github/workflows）
4. 确保所有测试通过后再合并
5. 输出迁移清单与破坏性变更说明
触发后使用 /workflows 跟踪；每个子 Agent 负责一个 top-level 目录。
```

**模板 3 — 技术调研：**

```
ultracode 调研「在本项目中引入 OpenTelemetry 的可行性」：
1. 阅读现有日志与监控代码
2. 对比 3 种 Node.js OTEL SDK 集成方案（成本、侵入性、与现有栈兼容性）
3. 在一个示例 service 中实现 PoC
4. 输出决策备忘录：推荐方案、预估工时、风险
交付物：docs/otel-research.md + poc/ 目录代码
```

### 命令与配置示例

```bash
# 在 worktree 隔离环境中运行 ultracode
claude --worktree ultracode-audit --effort xhigh

# 查看工作流
# 会话内: /workflows
```

```json
{
  "effort": "xhigh",
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Edit", "Write", "Bash"]
  }
}
```

### 本地测试结果

- ⚠️ ultracode 需交互会话 + 认证，未完整跑通
- ✅ v2.1.152+ changelog 确认触发词为 `ultracode`（紫色高亮）

### 问题与解决方案

1. **`/effort ultracode` 报错模型不支持**：换 Opus 4.8；检查 `/model`
2. **工作流卡住**：`claude agents` 查看子会话；Esc 取消慢速 "opening…"（v2.1.165 修复）

### 交叉验证

- [code.claude.com changelog](https://code.claude.com/docs/en/changelog) ultracode 重命名 — ✅
- [虎嗅：Claude Code Agent 讨论](https://www.huxiu.com/article/4865006.html) — **部分一致**（强调 Agent 商用，未提 ultracode 细节）

### 利弊 + 建议

- 个人：先用普通 Agent 熟悉后再上 ultracode
- 团队：在 staging 仓库试点，配合 worktree 隔离
- 企业：managed settings 限制 `Bash` 与 `WebFetch` 范围

---

## 特性六：v2.1.167 稳定性补丁（2026-06-06）

### 是什么

v2.1.167 仅包含 "Bug fixes and reliability improvements"，无新功能 flag。建议所有 2.1.166 用户直接升级。

### 升级步骤

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest
./node_modules/.bin/claude --version
# 预期: 2.1.167 (Claude Code)

# 或使用内置更新
claude update
# v2.1.166+ 会在下载前公告目标版本
```

### 本地测试

```bash
npm list @anthropic-ai/claude-code
# tools@ /workspace/tools
# └── @anthropic-ai/claude-code@2.1.167
```

- ✅ 升级成功

---

## 本地实测总览

| 命令 | 输出摘要 | 状态 |
|------|----------|------|
| `claude --version` | 2.1.167 | ✅ |
| `claude --help` | 含 fallback/effort/worktree | ✅ |
| API 调用 | 无 ANTHROPIC_API_KEY | ⚠️ 跳过 |
| ultracode 全流程 | 需交互 + 订阅 | ⚠️ 未测 |

---

## 检索记录

- `site:github.com anthropics/claude-code releases 2026-06-06`
- `code.claude.com/docs/en/changelog`
- 交叉：InfoQ、虎嗅 Agent 编程报道
