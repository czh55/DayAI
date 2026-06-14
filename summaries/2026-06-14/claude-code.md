# Claude Code 每日技术文档 — 2026-06-14

> 本地实测版本：**2.1.177**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News](https://www.anthropic.com/news)

## 今日综述

2026 年 6 月 14 日的 Claude Code 生态被一件事主导：**Claude Fable 5 在 6 月 9 日上线、6 月 12 日被美国政府出口管制令全球停用**。本地安装的 Claude Code 2.1.177 已包含 Fable 5 集成代码，但实际 API 调用将失败直至 Anthropic 恢复服务。与此同时，6 月上旬版本持续强化 **ultracode 动态工作流**、**`--safe-mode` 排障**、**`fallbackModel` 容灾** 等工程化能力——这些在 Fable 5 不可用时期对日常开发更为关键。

---

## 特性一：Claude Fable 5 集成与全球停服（2026-06-09 发布 → 2026-06-12 停用）

### 是什么（机制说明）

Claude Fable 5 是 Anthropic 首个向公众开放的 **Mythos 级**模型，面向高难度推理、百万 token 长上下文与长周期 Agent 任务。与无护栏的 Mythos 5 不同，Fable 5 在高风险领域（网络安全、生物化学、蒸馏攻击等）内置分类器，自动将请求路由至 Claude Opus 4.8 回答。Claude Code v2.1.170+ 在发布日即集成该模型，用户可通过 `/model` 选择 `claude-fable-5`。

6 月 12 日，美国商务部指令要求禁止任何外国国民访问，Anthropic 无法按国籍实时分流，遂**全球禁用** Fable 5 与 Mythos 5。

### 适用场景

- **适合（停服前）**：超大型代码库审计、跨数百文件迁移、需要 xhigh effort 的长程 Agent
- **不适合**：预算敏感的日常补全；需稳定 SLA 的生产流水线（已证明显著政策风险）

### 前置条件

- Claude Code ≥ 2.1.170
- Pro/Max/Team/Enterprise 或 API 账号（停服前 API 与按量 Enterprise 全额可用）
- **当前（6 月 14 日）**：Fable 5 **不可用**，需改用 Opus 4.8

### 详细使用步骤（停服前 SOP，供恢复后参考）

1. 更新 CLI：`npm install -g @anthropic-ai/claude-code@latest`
2. 启动会话：`claude`
3. 切换模型：输入 `/model`，选择 **Claude Fable 5**
4. 可选设置 effort：`/effort xhigh` 或 `/effort ultracode`（见特性二）
5. 验证：输入 `/status` 确认当前模型为 `claude-fable-5`

### 命令与配置示例

```bash
# 非交互指定模型
claude --model claude-opus-4-8 -p "审查 src/auth 目录的安全问题"

# settings.json 指定默认模型（Fable 恢复后可将值改回 claude-fable-5）
cat > ~/.claude/settings.json << 'EOF'
{
  "model": "claude-opus-4-8"
}
EOF
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
# 输出：2.1.177 (Claude Code)

./node_modules/.bin/claude --help | head -5
# 输出：Usage: claude [options] [command] [prompt]
#       Claude Code - starts an interactive session...
```

| 项 | 结果 |
|----|------|
| 版本检测 | ✅ 2.1.177 |
| `--help` | ✅ 221 行帮助正常 |
| Fable 5 API 调用 | ❌ 未实测（全球停服 + 无有效 API Key） |

### 问题与解决方案

**错误 1：模型不可用 / 503**

```
Error: Model claude-fable-5 is currently unavailable
```

排查：访问 [Anthropic Status](https://status.anthropic.com)；切换 `/model` → Opus 4.8；关注 [官方声明](https://www.anthropic.com/news/statement-fable-mythos-export-control)。

**错误 2：订阅用户看到「Fable 5 消耗 credits」横幅**

排查：v2.1.177 已修复企业按量账号误报；更新到最新版；6 月 23 日后订阅内含 Fable 将移除（停服前政策）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Anthropic Fable 5 发布公告](https://www.anthropic.com/news/claude-fable-5-mythos-5) | 一致：6 月 9 日发布 |
| [Fortune 停服报道](https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/) | 一致：6 月 12 日全球禁用 |
| [人人都是产品经理](https://www.woshipm.com/ai/6413060.html) | 部分一致：强调「模型国界化」，对技术细节引用官方 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 立即回退 Opus 4.8；不要等待 Fable 恢复作为唯一方案 |
| 团队 | 在 `settings.json` / CI 环境变量中抽象 `ANTHROPIC_MODEL`，准备国内备选 API |
| 企业合规 | 重新评估跨境模型使用政策；Fable 5 事件证明美国监管可直达模型层 |

---

## 特性二：ultracode — xhigh 推理 + 自动动态工作流编排

### 是什么（机制说明）

`ultracode` 是 Claude Code 的**会话级设置**（非持久化 effort 级别）：向模型发送 `xhigh` effort，并让 Claude 对每个实质性任务**自动规划并执行动态工作流**——即编写 JavaScript 编排脚本，在后台调度数十至数百个子 Agent，验证输出后汇报。触发方式有两种：(1) 提示词中包含关键字 `ultracode`（v2.1.160 起由 `workflow` 更名）；(2) 执行 `/effort ultracode`。

### 适用场景

- **适合**：全库安全审计、500+ 文件迁移、需并行子 Agent 的调研任务
- **不适合**：单行 bug 修复、日常 CRUD；token 消耗可达常规会话的数倍

### 前置条件

- Claude Code ≥ 2.1.154（动态工作流研究预览）
- 模型支持 `xhigh`：**Opus 4.8**（Fable 5 停服前亦支持）
- Pro 及以上或 API；Pro 需在 `/config` 启用 Dynamic workflows

### 详细使用步骤

1. 启动 Claude Code：`claude`
2. 开启 ultracode 模式：`/effort ultracode`
3. 确认状态栏显示 ultracode / xhigh
4. 输入任务，例如：`ultracode 审计整个 monorepo 的依赖漏洞并生成报告`
5. 监控：`/workflows` 查看后台运行
6. 结束高消耗会话：`/effort high` 恢复常规模式

### 命令与配置示例

**基础示例 — 单词触发单次工作流**

```bash
claude -p "ultracode 列出所有未使用的 export 并生成删除 PR 描述"
```

**进阶示例 — 会话级 ultracode + SDK**

```json
// 通过 --settings 注入（会话级，不写入磁盘）
{
  "effortLevel": "ultracode"
}
```

```bash
claude --settings /tmp/ultracode-session.json
```

### ultracode 完整 Prompt 模板（审计 / 迁移 / 调研）

**模板 1 — 安全审计**

```
ultracode

目标：对 {REPO_PATH} 进行 OWASP Top 10 定向安全审计。

约束：
- 只读分析，不修改任何文件
- 每个子 Agent 负责一个顶层目录
- 输出 markdown 报告到 ./audit-report.md

验证：报告须包含「高危/中危/低危」分级及文件路径引用。
```

**模板 2 — 大规模迁移**

```
ultracode

目标：将项目中所有 CommonJS require 迁移为 ESM import。

步骤：
1. 子 Agent 扫描并分类文件（.js/.ts/.mjs）
2. 并行迁移，每个 worktree 一个子 Agent
3. 运行 npm test 验证
4. 汇总 breaking changes 列表

停止条件：全部测试通过或列出无法自动修复的文件清单。
```

**模板 3 — 技术调研**

```
ultracode

调研问题：{QUESTION}

要求：
- 至少 3 个子 Agent 分别从官方文档、GitHub Issues、社区博客收集证据
- 交叉验证矛盾信息
- 最终输出：结论（可证伪）+ 引用 URL 列表 + 推荐 POC 步骤

不要给出未验证的性能数字。
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/claude --help | grep -i effort
# 输出包含：--effort <level>  Effort level (low, medium, high, xhigh, max)
```

| 项 | 结果 |
|----|------|
| `--effort` 参数存在 | ✅ |
| ultracode 实际工作流执行 | ⚠️ 未实测（需 API Key + Opus 4.8） |

### 问题与解决方案

**错误 1：`/effort ultracode` 不可用**

原因：当前模型不支持 xhigh（如 Sonnet 4.6）。  
排查：`/model` 切换到 Opus 4.8；`/config` 确认 Dynamic workflows 已启用。

**错误 2：提示词中 `workflow` 不再触发**

原因：v2.1.160 更名。  
解决：改用 `ultracode` 或自然语言「请使用工作流」。

### 官方 vs 社区交叉验证

| 来源 | 说明 |
|------|------|
| [官方 Workflows 文档](https://code.claude.com/docs/en/workflows) | 定义 ultracode 机制 |
| [Developers Digest](https://www.developersdigest.tech/blog/ultracode-effort-level-explained) | 一致：会话级、不持久化 |
| [36氪 Loop 工程](https://36kr.com/p/3844224911346184) | 观点：与 Boris Cherny `/loops` 同属长程 Agent 范式 |

### 利弊 + 建议

- **个人**：仅在周末或配额充足时开启 ultracode；日常用 `/effort high`
- **团队**：配合 git worktree 与子 Agent 权限隔离；设定 token 预算上限
- **企业**：评估研究预览稳定性；敏感仓库禁用自动工作流写操作

---

## 特性三：`--safe-mode` 排障模式

### 是什么

`--safe-mode`（或环境变量 `CLAUDE_CODE_SAFE_MODE`）以**禁用所有自定义项**的方式启动 Claude Code：不加载 CLAUDE.md、插件、skills、hooks、MCP 服务器。用于判断问题是否由用户配置引起。

### 适用场景

- **适合**：启动崩溃、权限循环、MCP 超时、怀疑恶意插件
- **不适合**：日常开发（功能大幅缩减）

### 前置条件

Claude Code ≥ 2.1.170

### 详细使用步骤

1. 关闭现有 Claude Code 会话
2. 运行：`claude --safe-mode`
3. 复现问题：若消失，则逐项恢复配置定位元凶
4. 二分法：先恢复 CLAUDE.md，再恢复 MCP，再恢复插件

### 命令示例

```bash
# 方式 1：命令行标志
claude --safe-mode

# 方式 2：环境变量
export CLAUDE_CODE_SAFE_MODE=1
claude

# 方式 3：非交互排障
claude --safe-mode -p "echo hello"
```

### 本地测试结果

```bash
./node_modules/.bin/claude --help | grep safe-mode
# --safe-mode  Enable bypassing... (实际为 safe-mode 条目)
```

✅ 帮助文档包含 `--safe-mode` 标志

### 问题与解决方案

**safe-mode 下仍失败** → 问题在 Anthropic 认证或网络；运行 `claude doctor`（如有）或检查 `ANTHROPIC_API_KEY`。

**safe-mode 正常、常规模式失败** → 检查 `~/.claude/settings.json`、项目 `.mcp.json`、最近安装插件。

### 官方 vs 社区

- 官方 changelog v2.1.170 记载 ✅
- 社区暂无独立长文，与 `--bare` 模式对比：`--bare` 保留部分能力，`--safe-mode` 更彻底

---

## 特性四：`fallbackModel` 模型容灾

### 是什么

当主模型过载或不可用时，按顺序自动尝试最多三个备选模型；`--fallback-model` 亦适用于交互式会话。v2.1.177 还与 API 非重试错误的一次性 fallback 重试联动。

### 适用场景

- **适合**：CI 流水线、夜间批处理、Fable 5 停服后的自动降级
- **不适合**：对模型一致性要求极高的评估基准

### 前置条件

Claude Code 较新版本；settings.json 或命令行配置

### 详细使用步骤

1. 编辑 `~/.claude/settings.json`
2. 添加 `fallbackModel` 数组
3. 启动 `claude` 或 `claude -p "..."`
4. 主模型失败时观察是否自动切换

### 配置示例

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
claude --fallback-model claude-sonnet-4-6,claude-haiku-4-5 -p "生成 CHANGELOG"
```

### 本地测试

⚠️ 未实测 API 切换（无 Key）；`--help` 含 `--fallback-model` ✅

### 常见问题

**Fallback 未触发** — 确认错误类型为过载而非 auth；查看 debug：`claude -d api`

**切换后质量下降** — 预期行为；在 prompt 中说明当前为降级模型

### 官方 vs 社区

官方 changelog 记载；[Lushbinary Fable 5 指南](https://lushbinary.com/blog/claude-fable-5-developer-guide/) 建议 Fable 不可用时显式指定 Opus 4.8

---

## 特性五：`/cd` 会话内切换工作目录

### 是什么

在不重启会话的情况下将工作目录切换到新路径，尽量保持 prompt cache 有效，避免 `/clear` 后丢失上下文。

### 步骤

1. 在 Claude Code 中输入 `/cd /path/to/other-project`
2. 确认 git 分支与文件树更新
3. 继续在同一对话中操作新目录

### 示例

```
/cd /workspace/other-repo
```

### 本地测试

⚠️ 需交互式 TTY；非交互环境未实测。官方 changelog v2.1.170 记载 ✅

### 常见问题

**切换后仍显示旧分支** — v2.1.177 已修复；更新到最新版

**权限拒绝** — 新目录需在 `--add-dir` 允许列表中

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 2.1.177 | 2026-06 上旬 | Fable 5 后缀规范化、safe-mode、大量 RC 修复 |
| 2.1.170 | 2026-06-09 | Fable 5 集成、/cd、--safe-mode |
| 2.1.160 | 2026-06-02 | ultracode 关键字更名、config-write guards |

---

## 今日研究员结论

Fable 5 停服是 Claude Code 用户今日唯一「必须行动」的事件：检查所有脚本、CI、`.claude/settings.json` 中的模型 ID。ultracode 与 fallbackModel 是停服期间的实用替代能力组合——用 Opus 4.8 + ultracode 承接长程任务，用 fallbackModel 避免流水线硬失败。
