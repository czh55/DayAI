# Claude Code 每日技术文档 — 2026-06-13

> 监测源：[code.claude.com/docs](https://code.claude.com/docs)、[GitHub CHANGELOG](https://github.com/anthropics/claude-code/releases)、[Anthropic 新闻](https://www.anthropic.com/news)  
> 本地实测版本：**2.1.177**（`npm install @anthropic-ai/claude-code@latest`）  
> 检索时间：UTC 2026-06-13 22:15

## 今日综述

本周 Claude Code 的主线是两件事叠加：**模型能力跃迁（Fable 5）** 与 **工程可靠性补丁潮（2.1.170–2.1.177）**。6 月 9 日 v2.1.170 正式接入 Mythos 级模型 Fable 5；6 月 10–12 日连续发布嵌套 Sub-agent、`availableModels` 治理、VSCode 用量归因等；**6 月 12 日 Anthropic 宣布应美国商务部要求暂停 Fable 5 / Mythos 5 全球访问**，对 CLI 用户的 `/model` 选择与长程任务产生直接影响。本文档对 trigger 日前后每个值得关注的特性逐项展开，并附本地 CLI 实测。

---

## 特性一：Claude Fable 5 接入（v2.1.170）

### 是什么（机制说明）

Fable 5 是 Anthropic 首个对公众开放的 **Mythos 级** 模型：同一底座上，面向一般用户的是带安全护栏的 **Fable 5**（部分高风险话题会回退到 Opus 4.8 回答），面向少数可信伙伴的是无部分限制的 **Mythos 5**。Claude Code v2.1.170 起，终端 Agent 可通过 `/model` 或环境变量选用 Fable 5，获得更长自主运行窗口、更强软件工程与百万级上下文（默认含 1M，无需 `[1m]` 后缀——v2.1.173 专门修复了后缀规范化问题）。

定价（官方）：输入 $10/MTok，输出 $50/MTok，约为 Mythos Preview 的一半。

**重要状态（6/12 更新）**：Anthropic 公告称已应美国商务部出口管制指令暂停所有客户对 Fable 5 与 Mythos 5 的访问，正在争取恢复。CLI 用户若选 Fable 5 可能遇到不可用或自动回退。

### 适用场景

**适合**：超大型代码库迁移、跨模块重构、需要数小时连续推理的审计/调研、复杂多文件 PR 生成。  
**不适合**：对延迟极度敏感的单文件补全；在 Fable 暂停期间依赖该模型的生产流水线；需完全可预测输出且不能容忍安全分类器误杀的场景。

### 前置条件

- Claude Code ≥ **2.1.170**
- 账号具备 Fable 5 额度（Max / Team Premium / Enterprise 或 API 计费账户，具体以 `/model` 可见项为准）
- 网络可访问 Anthropic API（国内直连可能不稳定，企业常走代理或 Bedrock/Vertex）
- **合规**：6/12 起美国出口管制可能导致非美国人员无法使用，以 Anthropic 最新公告为准

### 详细使用步骤

1. 升级 CLI：`cd /workspace/tools && npm install @anthropic-ai/claude-code@latest`
2. 登录：`claude login`（或配置 `ANTHROPIC_API_KEY`）
3. 进入项目目录：`cd /your/project`
4. 启动交互会话：`./node_modules/.bin/claude`
5. 切换模型：输入 `/model`，选择 **Fable 5**（或 Opus 行下的 Fable 条目；v2.1.174 修复了 Default 解析行被隐藏的问题）
6. 验证：输入 `/status` 查看当前模型与上下文上限

### 命令与配置示例

```bash
# 升级并查看版本
cd /workspace/tools
npm install @anthropic-ai/claude-code@latest
./node_modules/.bin/claude --version

# 非交互单次调用（需已登录或 API Key）
export ANTHROPIC_API_KEY="sk-ant-..."
./node_modules/.bin/claude -p "列出 src 目录下所有 TODO 并按模块归类" --model claude-fable-5

# 通过环境变量固定默认模型（组织策略允许时）
export ANTHROPIC_DEFAULT_OPUS_MODEL="claude-fable-5"
./node_modules/.bin/claude
```

```json
// ~/.claude/settings.json 片段 — 限制可用模型（与 v2.1.175 enforceAvailableModels 配合）
{
  "availableModels": ["claude-fable-5", "claude-sonnet-4-6", "claude-opus-4-8"]
}
```

### 本地测试结果

```bash
$ cd /workspace/tools && ./node_modules/.bin/claude --version
2.1.177 (Claude Code)

$ ./node_modules/.bin/claude --help | head -5
Usage: claude [options] [command] [prompt]
Claude Code - starts an interactive session by default, use -p/--print for
non-interactive output
```

- ✅ 版本与 help 正常  
- ⚠️ 未配置 `ANTHROPIC_API_KEY` / 未 `login`，无法实测 Fable 5 推理（`Not logged in · Please run /login`）  
- ⚠️ 6/12 后 Fable 5 可能已被暂停，实测前请查阅 [Anthropic 公告](https://www.anthropic.com/news/claude-fable-5-mythos-5)

### 问题与解决方案

| 错误 | 排查 |
|------|------|
| `Model fable-5 not available` | 查 Anthropic 暂停公告；改选 Sonnet/Opus；企业查 `availableModels` 白名单 |
| `[1m]` 后缀导致模型 ID 异常 | 升级至 ≥2.1.173；移除手动 `[1m]`，Fable 5 默认 1M |
| auto mode 在 Fable 上报错（无 Opus 4.8） | v2.1.176+：分类器回退到组织内最佳 Opus |

```bash
claude /status
claude /model
echo $ANTHROPIC_DEFAULT_OPUS_MODEL
```

### 官方 vs 社区交叉验证

| 来源 | 结论 | 一致性 |
|------|------|--------|
| [Anthropic Fable 5 发布公告](https://www.anthropic.com/news/claude-fable-5-mythos-5) | 6/9 发布，6/12 暂停 | — |
| [GitHub v2.1.170](https://github.com/anthropics/claude-code/releases/tag/v2.1.170) | CLI 接入 Fable 5 | ✅ 一致 |
| [虎嗅 2026-06-10](https://www.huxiu.com/article/4866177.html) | 安全护栏可能导致「无感降级」 | ⚠️ 部分一致（社区担忧与官方「<5% 会话触发」有温差） |
| [TechPolicy.Press 2026-06-12](https://www.techpolicy.press/anthropics-mythos-recall-and-the-white-houses-missing-ai-safety-playbook/) | 商务部出口管制导致全球暂停 | ✅ 与官方 Update 一致 |

### 利弊分析 + 分角色建议

- **个人开发者**：暂停期间勿绑定 Fable；恢复后用于「一周工作量压缩到一天」类任务，注意 Token 账单。  
- **团队**：在 `availableModels` 中显式列出 Fable，配合 v2.1.175 `enforceAvailableModels` 防止 Default 绕过。  
- **企业合规**：将 Fable/Mythos 视为「可召回资产」；关键流水线准备 Sonnet/Opus 回退与多供应商架构。

---

## 特性二：嵌套 Sub-agent（最深 5 层，v2.1.172）

### 是什么（机制说明）

Sub-agent 是 Claude Code 内由主 Agent 通过 `Task` 工具派生的子会话，各自可有独立 prompt、模型与工具权限。v2.1.172 起，**子 Agent 可再派生子 Agent，最多 5 层嵌套**，形成「审查者 → 测试编写者 → 单测执行者」类树状协作，而无需人工串联上下文。

### 适用场景

**适合**：大型 PR 的多阶段流水线（lint → test → doc）、并行探索多个技术方案、安全审计与修复分离。  
**不适合**：简单单文件修改（嵌套反而增加延迟与费用）；对权限极度敏感且未配置 `availableModels` 的组织（子 Agent 模型绕过曾在旧版存在，2.1.172 已加固）。

### 前置条件

- Claude Code ≥ **2.1.172**
- 主会话已启用 Agent 相关工具（默认交互模式即可）
- 建议配置 `availableModels` 限制子 Agent 可用模型

### 详细使用步骤

1. 启动 `claude` 进入项目根目录  
2. 用自然语言描述需要拆分的任务，例如：「先派 reviewer 子 agent 审查 `src/auth`，再派 test-writer 根据审查结果补测试」  
3. 主 Agent 调用 `Task` 创建子 Agent；子 Agent 可在其上下文中再次 `Task`  
4. 用 `claude agents` 查看后台/并行会话状态（v2.1.172 修复了嵌套停止后 UI 卡在 active 的问题）  
5. 合并结果前检查各层 `git diff`

### 命令与配置示例

```bash
# 查看所有 agent 会话（含后台）
./node_modules/.bin/claude agents

# JSON 输出（CI 集成）
./node_modules/.bin/claude agents --json --all

# 非交互：要求主 agent 使用子 agent 结构
./node_modules/.bin/claude -p "
请使用子 agent 完成：
1) 子 agent A：扫描 pkg/ 下所有 SQL 注入风险
2) 子 agent B：基于 A 的报告生成修复补丁
最多嵌套 3 层，每层输出 markdown 摘要
"
```

```json
// .claude/settings.json — 子 agent 模型约束示例
{
  "availableModels": ["claude-sonnet-4-6", "claude-opus-4-8"],
  "agents": {
    "reviewer": {
      "description": "只读审查",
      "prompt": "你是代码审查员，禁止修改文件，只输出 findings"
    }
  }
}
```

### 本地测试结果

```bash
$ ./node_modules/.bin/claude --help | rg -i "agent"
  --agent <agent>                       Agent for the current session
  --agents <json>                       JSON object defining custom agents
```

- ✅ CLI 暴露 `--agent` / `--agents` 参数  
- ⚠️ 未登录，未实测嵌套 Task 执行链

### 问题与解决方案

1. **子 Agent 卡在 active**：升级 ≥2.1.172；`claude agents` 查看并手动停止僵死 worker  
2. **子 Agent 用了被禁模型**：检查 `availableModels`；v2.1.172 已修复 dispatch picker 绕过

```bash
claude agents
claude /status
grep availableModels ~/.claude/settings.json .claude/settings.json
```

### 官方 vs 社区交叉验证

- 官方：[v2.1.172 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.172)  
- 社区：[虎嗅 loop 工程 2026-06-11](https://www.huxiu.com/article/4866448.html) 将 Claude Code `/goal` 与嵌套 loop 并列为「产品化 ralph」——与嵌套 Agent 方向一致，但 `/goal` 侧重长循环而非仅树状拆分。

### 分角色建议

- 个人：嵌套 2 层足够（审查 + 实现）  
- 团队：在 `CLAUDE.md` 中规定子 Agent 命名与输出格式  
- 企业：OTEL 指标 v2.1.172 起含 `model` 属性，便于按子 Agent 分摊成本

---

## 特性三：`/code-review ultra`（云端深度审查，v2.1.172 可见性改进）

### 是什么（机制说明）

`/code-review` 是 Claude Code 内置的代码审查斜杠命令。其中 **`ultra` 选项** 将审查工作 offload 到 **claude.ai 云端** 的深度审查管线（需 claude.ai 账号登录），适合全库级、长上下文、比本地 Sonnet 更激进的缺陷挖掘。v2.1.172 改进：未登录时仍**显示** `ultra` 选项并解释需登录，避免用户以为功能不存在。

### 适用场景

**适合**：合并前全量 diff 审计、安全敏感模块、需要与云端审查结果对齐的合规流程。  
**不适合**：离线/air-gapped 环境；不愿将代码 diff 上传到 claude.ai 的企业（需评估数据政策）。

### 前置条件

- Claude Code ≥ 2.1.172  
- 本地 `claude login` 关联 **claude.ai** 账号（ultra 专用）  
- 仓库为 git 项目且有可审查的变更

### 详细使用步骤

1. `cd` 到 git 仓库根目录  
2. 运行 `claude` 启动会话  
3. 输入 `/code-review`  
4. 在交互菜单中选择审查范围（如 staged / branch / custom）  
5. 选择 **`ultra`** 模式（若未登录会提示登录 claude.ai）  
6. 等待云端返回 findings，按建议修改后再次 `/code-review` 验证

### 命令与配置示例

```bash
# 确保已登录
./node_modules/.bin/claude login

# 交互式审查
./node_modules/.bin/claude
# 在会话中输入：
/code-review
```

#### ultra 模式 Prompt 模板 1：安全审计

```text
/code-review ultra

审查范围：当前分支相对 origin/main 的全部 diff
重点：
- OWASP Top 10（注入、SSRF、鉴权绕过）
- 密钥与 PII 是否进入日志
- 依赖供应链（新增 npm/pip 包）
输出：按严重程度分级的 markdown 报告，每条含文件路径、行号、修复建议、可利用性评估
忽略：格式化与纯注释变更
```

#### ultra 模式 Prompt 模板 2：遗留系统迁移

```text
/code-review ultra

审查范围：packages/legacy-cobol-migrator/ 目录最近 3 次提交
重点：
- COBOL → Java 迁移是否保留定点十进制语义
- 批处理作业 idempotency
- 字符集 EBCDIC/UTF-8 边界
输出：迁移风险矩阵 + 建议增加的集成测试列表
参考：Anthropic COBOL modernization 手册中的检查项
```

#### ultra 模式 Prompt 模板 3：架构调研（只读）

```text
/code-review ultra

审查范围：整个 monorepo（只读，禁止提出自动修复补丁）
任务：绘制模块依赖图（mermaid），标出循环依赖、上帝模块、缺失边界测试的区域
输出：
1) 架构图
2) Top 5 技术债
3) 若拆分为 3 个微服务，建议的切割面与风险
不修改任何文件
```

### 本地测试结果

- ✅ `claude --help` 确认支持交互斜杠命令体系  
- ⚠️ 未登录 claude.ai，未触发 ultra 云端管线

### 问题与解决方案

| 现象 | 处理 |
|------|------|
| ultra 灰色/提示登录 | `claude login`，浏览器完成 claude.ai OAuth |
| 审查范围过大超时 | 缩小为 `--staged` 或指定子目录 |
| 企业禁用云端 | 仅用本地 `/code-review` 标准档，或自建 MCP 审查工具 |

### 官方 vs 社区

- 官方：v2.1.172 changelog「`/code-review` now keeps the `ultra` option visible...」  
- 社区：[机器之心 2026-02](https://www.jiqizhixin.com/articles/2026-02-25-3) 报道 Claude Code COBOL 能力引发 IBM 股价波动——与模板 2 迁移审计场景呼应。

### 分角色建议

- 个人：PR 前用 ultra 做一次「第二双眼睛」  
- 团队：规定 release 分支必须附带 ultra 审查摘要  
- 企业：法务确认 diff 上传 claude.ai 是否符合数据出境/保密协议

---

## 特性四：VSCode 用量归因对话框（v2.1.174）

### 是什么（机制说明）

在 VS Code 扩展中，`/usage`（Account & usage 对话框）新增 **usage attribution**：过去 24 小时或 7 天内，用量可按 **cache miss、长上下文、subagents、skill、agent、plugin、MCP** 等维度拆分，便于判断「钱花在哪儿」。

### 适用条件

- Claude Code VS Code 扩展 + CLI ≥ 2.1.174  
- 使用 claude.ai 或 API 计费账号

### 详细使用步骤

1. VS Code 打开已安装 Claude Code 扩展的工作区  
2. 打开 Claude Code 侧边栏或命令面板  
3. 运行命令 **Claude Code: Usage** 或在聊天输入 `/usage`  
4. 切换时间范围 **24h / 7d**  
5. 展开 subagents / skills / MCP 行查看占比

### 命令与配置示例

```bash
# 终端侧查看版本确保扩展匹配
./node_modules/.bin/claude --version
# 应 ≥ 2.1.174
```

### 本地测试结果

- ⚠️ 当前环境无 VS Code GUI，**未实测**扩展对话框  
- ✅ 变更已列于 [v2.1.174 release](https://github.com/anthropics/claude-code/releases/tag/v2.1.174)

### 问题与解决方案

1. **对话框无 subagent 分项**：确认会话确实使用了 Task 子 agent；时间范围扩大到 7d  
2. **与账单门户数字不一致**：归因含 cache 统计口径差异，以 Anthropic Console 为准

### 分角色建议

- 团队 Tech Lead：每周导出 7d 归因，优化「高成本低产出」的 MCP/skill  
- 企业 FinOps：与 `claude_code.lines_of_code.count` OTEL（v2.1.172 含 model 维度）合并看板

---

## 特性五：`enforceAvailableModels` 托管策略（v2.1.175）

### 是什么

新增托管设置 **`enforceAvailableModels`**：启用后，`availableModels` 白名单也约束 **Default** 模型解析；若 Default 会落到禁用模型，则回退到白名单第一项。用户/项目设置不能再扩大托管白名单。

### 使用步骤（管理员）

1. 在 Enterprise managed settings 下发 `enforceAvailableModels: true`  
2. 配置 `availableModels: ["claude-sonnet-4-6"]`  
3. 开发者运行 `claude`，`/model` 中 Default 不得解析到 Fable/Opus（若未在白名单）  
4. 审计：抽查 `/status` 与违规上报

### 本地测试

- ⚠️ 无 Enterprise 托管环境，未实测  
- 官方：[v2.1.175 release 2026-06-12](https://github.com/anthropics/claude-code/releases)

### 对开发者意味着什么

企业可真正封住「环境变量 `ANTHROPIC_DEFAULT_*` 绕过白名单」漏洞（v2.1.176 继续修补 alias 绕行）。个人 OSS 贡献者通常无感。

---

## 本地实测总览

| 命令 | 输出摘要 | 结果 |
|------|----------|------|
| `npm install @anthropic-ai/claude-code@latest` | added 4 packages | ✅ |
| `claude --version` | 2.1.177 | ✅ |
| `claude --help` | 完整 options 列表 | ✅ |
| `claude models list` | Not logged in | ⚠️ |
| Fable 5 端到端推理 | 无 API Key + 可能已暂停 | ❌/⚠️ |

## 检索记录

- `site:github.com/anthropics/claude-code releases 2026-06`  
- `Claude Fable 5 Mythos export control June 2026`  
- 社区：`site:huxiu.com Fable5 Mythos5`
