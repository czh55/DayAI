# Claude Code 每日深度 — 2026-06-11

> 官方源：[code.claude.com/docs](https://code.claude.com/docs)、[GitHub CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)  
> 本地实测：`claude 2.1.173`（`/workspace/tools/node_modules/.bin/claude`）  
> 当日最新稳定版：**v2.1.173**（2026-06-11T05:41 UTC 发布）

---

## 今日总览

2026-06-11 的 Claude Code 以**维护性发布**为主：v2.1.173 修复 Fable 5 模型 ID 后缀与 Windows 沙箱误报警。更值得关注的是 **6/10 发布的 v2.1.172**——首次允许子 Agent **最多 5 层嵌套**，以及 **6/9 前后 v2.1.170 接入 Claude Fable 5**（Mythos 级公开模型）。这三条共同指向 Anthropic 对「长程、多层 Agent 编排」的产品押注。

社区交叉验证：[Releasebot Claude Code 追踪](https://releasebot.io/updates/claude-code)、[虎嗅 Loop Engineering 解读](https://www.huxiu.com/article/4865348.html) 与官方 `/loop`、`/goal` 方向一致。

---

## 特性一：Fable 5 模型名 `[1m]` 后缀自动归一化（v2.1.173）

### 是什么（机制说明，非一句话）

Claude Fable 5 默认即带 **100 万 token 上下文**，API 模型 ID 为 `claude-fable-5`，无需再手动附加 `[1m]` 后缀。但在 v2.1.172 及更早版本中，用户或环境变量（如 `ANTHROPIC_DEFAULT_OPUS_MODEL`）若仍使用 `claude-fable-5[1m]` 这类历史写法，可能导致模型选择器重复后缀（`[1M][1m]`）或 Bedrock 路由异常。v2.1.173 在客户端**启动与 `/model` 选择时自动剥离 `[1m]` 后缀**，与官方「Fable 5 默认 1M」文档对齐。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 从 Opus/Sonnet 1M 迁移到 Fable 5 且配置里仍写 `[1m]` | 需要强制非 1M 上下文（Fable 5 本身不支持关闭 1M 默认窗） |
| 企业 `availableModels` 白名单含带后缀的模型 ID | 依赖后缀区分不同计费档位的自定义封装（应改用语义化 alias） |

### 前置条件

- Claude Code **≥ 2.1.173**
- 账户具备 **Fable 5** 使用权（Pro/Max/Team 至 6/22 免费窗口，或 API/Bedrock 已开通）
- 若走 Bedrock：需单独开启 `provider_data_share`（推理数据 30 天留存，见 `industry.md`）

### 详细使用步骤

1. 升级 CLI：`npm install -g @anthropic-ai/claude-code@latest` 或在项目内 `npm install @anthropic-ai/claude-code@latest`
2. 确认版本：`claude --version` 输出含 `2.1.173`
3. 若 `settings.json` 或环境变量中写了 `claude-fable-5[1m]`，**可保留不改**——客户端会自动归一化；也可手动改为 `claude-fable-5`
4. 交互验证：启动 `claude`，输入 `/model`，选择 Fable 5，执行 `/status` 查看当前模型 ID

### 命令与配置示例

```bash
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest
./node_modules/.bin/claude --version

# 显式指定模型（print 模式）
export ANTHROPIC_API_KEY="your-key-here"
./node_modules/.bin/claude -p --model claude-fable-5[1m] "用一句话介绍你自己"
```

`~/.claude/settings.json` 片段：

```json
{
  "model": "claude-fable-5[1m]",
  "effort": "high"
}
```

### 本地测试结果

```text
$ ./node_modules/.bin/claude --version
2.1.173 (Claude Code)
```

✅ 版本与 npm latest 一致；❌ 未配置 `ANTHROPIC_API_KEY`，未实测 API 调用归一化后的 model 字段（需有效 Key）。

### 问题与解决方案

| 错误现象 | 排查 |
|----------|------|
| `/model` 仍显示重复后缀 `[1M][1m]` | 确认版本 ≥2.1.173；检查是否混用 `opusplan[1m]` 与 `ANTHROPIC_DEFAULT_OPUS_MODEL` |
| Bedrock 报模型不存在 | 核对区域（商业区 us-east-1 / eu-north-1）；GovCloud 暂无 Fable 5 |
| 会话因 1M 无 usage credits 卡住 | v2.1.172 已修复自动 compact；升级并购买 credits |

### 官方 vs 社区交叉验证

| 来源 | 链接 | 一致性 |
|------|------|--------|
| GitHub Release v2.1.173 | https://github.com/anthropics/claude-code/releases/tag/v2.1.173 | 一致 |
| Claude API 文档 Fable 5 默认 1M | https://platform.claude.com/docs/zh-CN/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5 | 一致 |
| 量子位 Fable 5 定价与窗口 | https://www.qbitai.com/2026/06/434571.html | 一致（6/22 前 Pro 免费） |

### 利弊分析 + 分角色建议

- **个人开发者**：直接升级，清理历史 `[1m]` 配置可选；6/22 前用 Pro 试 Fable 5 长任务。
- **团队**：在 `managed-settings` 统一模型白名单为 `claude-fable-5`，避免成员手写后缀。
- **企业合规**：Bedrock 上 Fable 5 需 `provider_data_share`，与 ZDR 冲突——微软内部已限制员工使用（见 `industry.md`）。

---

## 特性二：Windows 沙箱「依赖缺失」误报警修复（v2.1.173）

### 是什么

在 Windows 上于 `settings.json` 启用 sandbox 时，旧版可能在**依赖实际已满足**的情况下仍弹出 “sandbox dependencies missing” 启动警告。v2.1.173 修正检测逻辑，仅在实际缺失时提示。

### 适用场景

适合：Windows + `sandbox.enabled: true` 的企业托管环境。  
不适合：Linux/macOS（本条为 Windows 专项）。

### 前置条件

- Claude Code 2.1.173+
- Windows 10/11，已按[官方沙箱文档](https://code.claude.com/docs)安装依赖

### 详细使用步骤

1. 打开 `%USERPROFILE%\.claude\settings.json`
2. 确认 `"sandbox": { "enabled": true }` 或等价配置
3. 升级后重启终端，运行 `claude`，观察启动是否仍有误报警
4. 若仍报警，运行 `claude doctor` 查看沙箱依赖检查结果

### 命令与配置示例

```json
{
  "sandbox": {
    "enabled": true,
    "network": "restricted"
  }
}
```

```powershell
claude --version
claude doctor
```

### 本地测试结果

⚠️ **未实测**——当前环境为 Ubuntu 24.04，无法复现 Windows 路径。官方 Release Note 与 CHANGELOG 一致。

### 问题与解决方案

1. **误报警仍在**：确认非 WSL 内嵌 Windows 路径混用；用 `claude update` 强制重装。
2. **沙箱真正缺依赖**：按 doctor 输出安装 Windows Sandbox 组件或 WSL2 后端。

### 官方 vs 社区

- 官方：https://github.com/anthropics/claude-code/releases/tag/v2.1.173  
- 社区：Windows 用户 GitHub Issues 在 2.1.172 周期有同类反馈，2.1.173 关闭

---

## 特性三：子 Agent 嵌套至多 5 层（v2.1.172）

### 是什么

此前子 Agent（通过 `Task` 工具派生）不能再派生子 Agent。v2.1.172 起，**子 Agent 可继续 spawn 子 Agent，最大深度 5 层**，形成树状编排：例如「架构师 → 模块负责人 → 测试编写 → 单测执行 → 日志收集」。

机制上，每一层保持**独立上下文窗口与系统提示**；父层通过 `Task` 返回摘要，避免全量历史灌入父会话（与 [虎嗅 Harness 拆解](https://m.huxiu.com/article/4848419.html) 描述的子 Agent 隔离一致）。

### 适用场景

| 适合 | 不适合 |
|------|--------|
| 大型重构分模块并行 | 简单单文件 bugfix（嵌套增加延迟与成本） |
| 代码审查 + 专项安全审计分叉 | 深度 >5 的递归分解（会被硬性截断） |
| CI 中 `claude agents` 多会话编排 | 无 git worktree 隔离的共享 checkout 并发写 |

### 前置条件

- Claude Code **≥ 2.1.172**
- 模型支持 `Task` 工具（Fable 5 / Opus 4.8 / Sonnet 4.6 等）
- 建议启用 git worktree 或分支隔离（背景 Agent 共享 checkout 在 2.1.172 有多项修复）

### 详细使用步骤

1. 在项目根启动：`claude`
2. 用自然语言描述多层任务，或显式要求：「先派 reviewer 子 agent，再由 reviewer 派 security 子 agent」
3. 打开 Agent 面板：`claude agents` 或 TUI 内切换 Tab 查看各层状态
4. 停止嵌套：在父会话 `/stop` 或停止具体子 Agent；v2.1.172 修复了停止嵌套后子 Agent 仍显示 active 的问题
5. 非交互：`claude agents --json --all` 查看 `id`、`state`、`waitingFor`

### 命令与配置示例

```bash
# 基础：单会话内多层 Task（交互）
claude "请用子 agent 扫描 src/ 的安全问题，每个子目录再派一个子 agent 做 grep 审计，最多 3 层"

# 进阶：后台 agents 面板
claude agents --json --all | jq '.[] | {id, state, waitingFor}'

# 限制组织内可用模型（子 agent 继承修复见 2.1.172）
# managed-settings.json 片段
```

```json
{
  "availableModels": ["claude-fable-5", "claude-opus-4-8", "claude-sonnet-4-6"]
}
```

### 本地测试结果

```bash
$ ./node_modules/.bin/claude --help | grep -i agent
  --agent <agent>                       Agent for the current session...
  --agents <json>                       JSON object defining custom agents...
```

✅ CLI 暴露 `--agents` JSON 定义；❌ 未跑完整 5 层嵌套（需 API Key 与长时会话）。

### 问题与解决方案

1. **子 Agent 模型不在白名单**：升级 ≥2.1.172；检查 `availableModels` 是否覆盖子 agent override。
2. **嵌套后仍显示 Working 30s**：已知 bug 已在 2.1.172 修复，确认版本。
3. **背景 Agent 读到错误目录 .mcp.json**：2.1.172 修复预 warm worker 目录串扰；重启 daemon。

### 官方 vs 社区

| 来源 | 判断 |
|------|------|
| CHANGELOG 2.1.172 | 5 层硬上限 |
| Google DeepMind Agent Scaling 论文（36氪转述） | 社区提醒：多 Agent 并非越多越好，3–4 个可能是甜点——与 Claude 5 层上限不矛盾，需人工拆任务 |

### 分角色建议

- **个人**：先用 2 层（实现 + 审查），观察 token 账单。
- **团队**：用 `CLAUDE.md` 规定何时允许嵌套、最大深度。
- **企业**：配合 `allowedMcpServers` 防止深层 Agent 拉起未审批 MCP。

---

## 特性四：Claude Fable 5 接入 Claude Code（v2.1.170+）

### 是什么

2026-06-09 Anthropic 发布 **Claude Fable 5**（`claude-fable-5`），Mythos 级、默认 1M 上下文、自适应思考常开。Claude Code **2.1.170** 起可在 `/model` 选择 Fable 5，用于长程软件工程与 Agent 循环。Fable 5 带安全分类器，触发时降级到 Opus 4.8（<5% 会话，官方称）。

Stripe 案例：约 5000 万行 Ruby 一天完成迁移（[Anthropic 新闻](https://www.anthropic.com/news/claude-fable-5-mythos-5)）。

### 前置条件

- Claude Code ≥ 2.1.170（建议 2.1.173）
- 订阅 Pro/Max/Team（6/9–6/22 免费 Fable 5）或 API Key / Bedrock 开通
- API 定价：输入 $10/MTok，输出 $50/MTok

### 详细使用步骤

1. `claude update` 或 npm 安装 latest
2. `claude login`（OAuth）或配置 `ANTHROPIC_API_KEY`
3. 会话内 `/model` → 选 **Claude Fable 5**
4. 长任务：配合 `/loop` 或 `/goal`（注意 remote 会话不推广 `/loop`）
5. 降 effort 省钱：`/effort low`（量子位实测部分任务 low 档总成本低于 Opus）

### 命令与配置示例

```bash
claude --effort high --model claude-fable-5

# API 直连（OpenAI 兼容之外的原生 Messages API）
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-fable-5",
    "max_tokens": 8192,
    "messages": [{"role": "user", "content": "列出当前目录下 md 文件"}]
  }'
```

### 本地测试结果

❌ 无 API Key，未调用 Fable 5。✅ CHANGELOG 与 [平台文档](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) 模型 ID 一致。

### 问题与解决方案

1. **`stop_reason: refusal`**：分类器触发，换 Opus 4.8 或改写请求；检查 `stop_details`。
2. **6/23 后 Pro 用户需 credits**：提前在 claude.ai 购买 usage credits。
3. **Microsoft 员工内网受限**：ZDR 政策冲突，用 Foundry 外部租户或 Sonnet（见 industry.md）。

### 官方 vs 社区

- 官方：https://www.anthropic.com/news/claude-fable-5-mythos-5  
- 36氪：https://36kr.com/p/3847186618239236（SWE-bench Pro 80.3% 等数据与官方一致）  
- 量子位：https://www.qbitai.com/2026/06/433590.html（免费窗口、降级机制）

---

## 特性五：ultracode 动态工作流与 `/code-review ultra`（近期版本）

### 是什么

**ultracode**（原 trigger 关键词 `workflow`，已 rename）是 Claude Code 内的**高投入动态工作流**：在输入中触发后，以 xhigh effort 编排多步自动化（审计、迁移、调研类任务）。`/code-review` 的 **ultra** 选项则对接**云端多 Agent 并行审查**（需 claude.ai 账号）。

v2.1.172：未登录 claude.ai 时仍**显示 ultra 选项**并解释需登录，避免用户困惑。

### 前置条件

- 支持 xhigh effort 的模型（Fable 5 / 部分 Opus）
- 云端 ultra review：claude.ai 登录 + 网络
- 非交互 CI：`claude ultrareview [target] --json`

### 详细使用步骤

1. 交互审计：在 prompt 中加入 **ultracode** 关键词，或 `/code-review` 选 ultra
2. 配置 effort：`/effort xhigh` 或 `ultracode` 单次触发
3. CI：`claude ultrareview --json origin/main...HEAD`
4. 排查：若 ultracode 不可用，检查模型是否支持 xhigh（2.1.166+ 不再对不支持模型提供 ultracode）

### ultracode 完整 Prompt 模板（3 个）

**模板 A — 安全审计**

```text
ultracode

对当前仓库做安全审计：
1. 枚举所有对外 HTTP 入口与鉴权中间件
2. 检查 SQL/命令注入与路径遍历
3. 输出分级报告：Critical / High / Medium，每条含文件路径、行号、修复建议
4. 对 Critical 项直接提交修复 patch（需我确认后 apply）
约束：不修改 tests/fixtures 下数据；所有 Bash 限定在仓库根目录
```

**模板 B — 框架迁移**

```text
ultracode

将 src/legacy/ 下 CommonJS 模块迁移到 ESM：
1. 先只读扫描依赖图，列出循环依赖
2. 按拓扑序逐文件迁移，每批最多 5 个文件
3. 每批后运行 npm test
4. 失败则回滚该批并记录原因
目标 Node >= 20，保留原有 public API
```

**模板 C — 技术调研**

```text
ultracode

调研「本仓库是否适合引入 OpenTelemetry」：
1. 阅读现有日志与 metrics 代码
2. 列出 3 种集成方案（agent / SDK / sidecar）及改动面
3. 估算每个方案的 person-day 与运行时开销
4. 输出 Markdown 报告到 docs/otel-research.md，不要改业务代码
```

### 命令与配置示例

```bash
claude ultrareview --json main...HEAD
claude -p --effort xhigh "ultracode 审计 package.json 依赖漏洞"
```

### 本地测试结果

```bash
$ ./node_modules/.bin/claude --help | grep ultrareview
  ultrareview [options] [target]        Run a cloud-hosted multi-agent code
```

✅ 子命令存在；❌ 未登录 claude.ai，未跑云端 ultra。

### 问题与解决方案

1. **提示 dynamic workflows 错误**：升级并换支持 xhigh 的模型。  
2. **ultra review 无法启动**：`/login` claude.ai；企业网检查 `code.claude.com`。  
3. **成本过高**：改用 `/effort medium` + 单层子 Agent，避免 ultracode 全仓库扫描。

### 官方 vs 社区

- 官方 CHANGELOG：`workflow` → `ultracode` rename  
- 虎嗅 Loop Engineering：https://www.huxiu.com/article/4865348.html — 与 `/loop` 长周期互补，ultracode 偏单次高投入 burst

---

## 特性六：`--safe-mode` 故障排查模式（v2.1.169）

### 是什么

`--safe-mode`（或 `CLAUDE_CODE_SAFE_MODE=1`）启动时**禁用** CLAUDE.md、插件、skills、hooks、MCP，用于判断问题是否来自自定义配置。

### 步骤

1. `claude --safe-mode`
2. 复现问题；若消失，逐项恢复配置定位元凶
3. 结合 `/doctor` 与 `claude --debug api,hooks`

### 示例

```bash
CLAUDE_CODE_SAFE_MODE=1 claude -p "hello"
claude --safe-mode --debug hooks
```

### 本地测试

✅ `--help` 含 `--safe-mode` 说明。

---

## 版本对照与升级建议

| 版本 | 日期 | 要点 |
|------|------|------|
| 2.1.173 | 2026-06-11 | Fable `[1m]` 归一化、Windows 沙箱警告 |
| 2.1.172 | 2026-06-10 | 5 层嵌套子 Agent、Bedrock region、插件搜索 |
| 2.1.170 | 2026-06-09 | Fable 5 上线 |
| 2.1.169 | 2026-06-08 | `--safe-mode`、`/cd`、post-session hook |

**建议**：所有 Fable 5 用户立即升到 **2.1.173**；企业 Windows 沙箱用户同。长程 Agent 团队重点测试 **2.1.172 嵌套 + worktree 隔离**。

---

## 参考链接

- https://github.com/anthropics/claude-code/releases/tag/v2.1.173  
- https://github.com/anthropics/claude-code/releases/tag/v2.1.172  
- https://www.anthropic.com/news/claude-fable-5-mythos-5  
- https://www.qbitai.com/2026/06/433590.html  
- https://www.huxiu.com/article/4865348.html  
