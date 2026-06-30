# Claude Code 每日技术文档 — 2026-06-30

> 本地实测版本：**2.1.197**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News — Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)

## 今日综述

2026 年 6 月 30 日 npm `@anthropic-ai/claude-code@latest` 实测 **2.1.197**（较昨日 2.1.195 **+2 patch**）。Changelog 顶部宣布：**Claude Sonnet 5 成为默认模型**，需 2.1.197+ 且配合 Anthropic 账户/API；原生 **1M token 上下文**，促销 API 定价 **$2/$10 per Mtok 至 2026-08-31**。行业侧：**微软 E+D 内部 Claude Code 许可今日（6/30）截止**，外部用户不受影响。维护线同步含：组织默认模型、会话默认命名、MCP 安全加固、background agent 可靠性等数十项修复。

---

## 特性一：Claude Sonnet 5 默认模型 — 1M 上下文 Agent 升级（2026-06-30 发布）

### 是什么（机制说明）

**Claude Sonnet 5**（`claude-sonnet-5`）是 Anthropic 2026-06-30 发布的 mid-tier 模型，官方称其为「迄今最具 Agent 能力的 Sonnet」。在 Claude Code 中，**2.1.197 起成为默认模型**，无需手动 `/model` 切换（仍可改用 Opus/Fable 等，视套餐与权限而定）。支持 **1M token 原生上下文**，适合大仓 refactor、长程 debug 与多文件 Agent 任务。促销 API 价：**$2 输入 / $10 输出 per Mtok**（至 8/31），之后 **$3/$15**。

### 适用场景

- **适合**：日常 Agent 编码、长上下文仓库分析、成本敏感型企业流水线、Free/Pro 用户追求接近 Opus 的体验
- **不适合**：极高难度网络安全 exploit 开发（官方建议 Opus 4.8+）；需 Fable 级 Frontier Code 质量的极限工程任务

### 前置条件

- Claude Code **≥ 2.1.197**
- 有效 Anthropic 订阅或 API Key
- 网络可访问 Anthropic API（Bedrock/Vertex 用户走对应端点）

### 详细使用步骤（业务用户）

1. 升级 CLI：`cd tools && npm install @anthropic-ai/claude-code@latest`
2. 验证：`./node_modules/.bin/claude --version` → `2.1.197`
3. 启动 `claude`，新会话默认使用 Sonnet 5
4. 手动切换：`/model` → 选择 Sonnet 5 / Opus 4.8 / 其他可用模型
5. API 用户：设置 `ANTHROPIC_MODEL=claude-sonnet-5` 或 `--model claude-sonnet-5`

### 命令与配置示例

```bash
npm install @anthropic-ai/claude-code@latest
claude --version
claude --model claude-sonnet-5 -p "Summarize the auth module architecture"
```

```bash
export ANTHROPIC_MODEL=claude-sonnet-5
claude
```

```json
{
  "model": "claude-sonnet-5"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `2.1.197 (Claude Code)` |
| Changelog Sonnet 5 条目 | ✅ 确认默认模型 + 1M 上下文 |
| Sonnet 5 推理实测 | ⚠️ 未实测（无 API Key） |

```bash
./node_modules/.bin/claude --version
# 2.1.197 (Claude Code)
./node_modules/.bin/claude --help 2>&1 | head -5
# Usage: claude [options] [command] [prompt]
```

### 问题与解决方案

**版本不足无法使用 Sonnet 5**：升级至 2.1.197+；`npm ls @anthropic-ai/claude-code` 检查全局/本地双安装冲突。**Token 用量上升**：Sonnet 5 新 tokenizer 可能使同等文本映射 1.0–1.35× token；促销价已部分抵消。**模型不可用**：检查套餐是否含 Sonnet 5；企业用户查看 org 模型限制。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Anthropic Sonnet 5 发布](https://www.anthropic.com/news/claude-sonnet-5) | ✅ 官方 |
| [Claude Code Changelog](https://code.claude.com/docs/en/changelog.md) | ✅ 2.1.197 条目 |
| The Verge / VentureBeat 6/30 | ✅ 发布日一致 |
| 36氪前期 Fennec 爆料 | ✅ 时间线吻合（此前为媒体报道） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 8/31 前充分利用促销价做 Agent 实验 |
| 企业架构师 | 评估 Sonnet 5 是否可替代部分 Opus 调用以降本 |
| 安全团队 | 网络安全任务仍用 Opus 4.8+；Sonnet 5 默认启用 cyber safeguards |

---

## 特性二：组织默认模型（Org default）— `/model` 企业管控（2.1.197 Changelog）

### 是什么（机制说明）

管理员可在 **组织控制台** 配置 **organization default model**；用户未自行选择时，`/model` 显示 **「Org default」** 或 **「Role default」**。与 Sonnet 5 默认策略叠加：企业可统一锁定合规模型，个人偏好被 org 策略覆盖。

### 适用场景

- **适合**：Enterprise/Team 统一模型合规、防止员工误用高成本 Fable/Opus
- **不适合**：需自由切换模型的个人 Pro 用户（无 org 限制时无影响）

### 前置条件

- Claude Code ≥ 2.1.197
- 组织管理员已在 Anthropic Console 配置默认模型

### 详细使用步骤（业务用户）

1. **管理员**：Anthropic Console → Organization → Model settings → 设置 default model
2. **用户**：启动 Claude Code → `/model` 查看当前为「Org default」或已选模型
3. 若 org 限制某模型，选择时会显示 **「restricted by your organization's settings」**

### 命令与配置示例

```bash
claude
# 会话内输入：
/model
```

```json
{
  "permissions": {
    "model": "claude-sonnet-5"
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 条目 | ✅ `organization default models` |
| Org 策略实测 | ⚠️ 未实测（无 Enterprise org） |

### 问题与解决方案

**`/model` 显示空/陈旧**：2.1.197 修复了 `/login` 后 client-data 未刷新问题——重新 `/login` 或重启 CLI。**被限制模型**：联系管理员调整 org policy 或使用允许的 fallback。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.197 | ✅ 官方 |
| Enterprise 文档 | ✅ org console 路径一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| IT 管理员 | Sonnet 5 发布后评估设为 org default 以平衡成本与能力 |
| 开发者 | 熟悉 `/model` 查看是否被 org 覆盖 |
| 合规官 | 结合 model restriction + cyber safeguards 双层管控 |

---

## 特性三：`claude mcp list` 安全加固 — 不信任仓库不再自启 MCP（2.1.197）

### 是什么（机制说明）

`claude mcp list` / `get` **不再为** 通过 committed `.claude/settings.json` 自批准的 `.mcp.json` 服务器自动 spawn 进程。不信任工作区显示 **`⏸ Pending approval`**。降低克隆恶意仓库时 MCP 自动执行风险。

### 适用场景

- **适合**：开源贡献者、多仓库开发者、安全敏感企业
- **不适合**：依赖「零配置 MCP 自启动」的极简工作流（需显式批准）

### 前置条件

- Claude Code ≥ 2.1.197
- 项目含 `.mcp.json` 与 `.claude/settings.json`

### 详细使用步骤（业务用户）

1. 克隆含 MCP 配置的仓库
2. 运行 `claude mcp list` — 待批准项显示 `⏸ Pending approval`
3. 在 `/mcp` 或 trust 流程中显式批准
4. 批准后 MCP 正常连接

### 命令与配置示例

```bash
claude mcp list
claude mcp get my-server-name
```

```bash
# 会话内
/mcp
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 安全条目 | ✅ 确认 |
| 恶意仓库模拟 | ⚠️ 未实测 |

### 问题与解决方案

**MCP 不自动连接**：预期行为；在 `/mcp` 批准。**已信任项目仍 pending**：检查 workspace trust 状态与 settings 路径。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog Security 条目 | ✅ 官方 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开源维护者 | 文档中说明 MCP 需用户批准 |
| 安全工程师 | 纳入 supply chain 检查清单 |
| 个人用户 | 克隆陌生 repo 后先审 `.mcp.json` |

---

## 特性四：Background Agent 可靠性增强 — Windows 移交与自动恢复（2.1.197 维护线）

### 是什么（机制说明）

2.1.197 维护线改进 background session：**长命令在进程停止/重启/更新后仍可存活**（含 Windows 下 shell 移交而非杀死）；daemon 重启后 worker **自动从断点恢复**；修复 background job 永久删除会话、rate-limit 闪烁、agents 面板状态错误等多项 bug。

### 适用场景

- **适合**：`/bg`、`claude agents`、夜间 `/loops`、Windows 开发者
- **不适合**：需完全隔离的一次性任务（用 `claude -p`）

### 前置条件

- Claude Code ≥ 2.1.197
- Background mode 已启用（`←←` 或 `--bg`）

### 详细使用步骤（业务用户）

1. 启动任务后按 `←←` background 或 `claude --bg "task"`
2. `claude agents` 查看运行状态
3. 更新 CLI 后重新打开 agents 视图 — worker 应自动恢复
4. Windows：background shell 移交而非强杀

### 命令与配置示例

```bash
claude --bg "Run the full test suite and fix failures"
claude agents
```

```bash
# 会话内 background 当前 turn
# 按 ←←（单按打开 agents 视图，2.1.197 行为调整）
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 条目 | ✅ background reliability |
| 长任务恢复实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**Agent 卡在 working**：升级 2.1.197（修复 structured output 缺失导致的状态错误）。**会话丢失**：检查是否误触发旧版 transcript 删除 bug（2.1.197 已修复）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ 多项 background 修复 |
| InfoQ Loop 叙事 | ✅ 长程 Agent 可靠性为社区痛点 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Windows 开发者 | 优先升级 2.1.197 |
| 夜间 loop 用户 | 结合 permissions.json + background 恢复 |
| SRE | 监控 background agent 失败率 |

---

## 特性五：`/model` 与促销定价 — Sonnet 5 成本优化窗口（业务向）

### 是什么（机制说明）

Sonnet 5 在 Claude Code 与 API 同步上线促销价。`/model` 可切换 effort level（含 xhigh）以在成本与质量间权衡；官方提高 Chat/Cowork/Code/Platform rate limits 以适配高 effort 的 token 消耗。

### 适用场景

- **适合**：预算有限但需要 Agent 能力的团队；A/B 测试 Sonnet 5 vs Opus 4.8
- **不适合**：不计成本追求极限质量（直接用 Opus/Fable）

### 前置条件

- Claude Code 2.1.197+；了解套餐 token 配额

### 详细使用步骤（业务用户）

1. `/model` 选择 Sonnet 5
2. 调整 effort（若 UI 提供档位）
3. 监控 `/usage` 或 Console 用量
4. **8/31 前** 规划促销结束后的预算

### 命令与配置示例

```bash
# 会话内
/model
/usage
```

```bash
claude --model claude-sonnet-5 --effort high -p "Refactor payment module"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 定价文档 | ✅ Anthropic 官方 $2/$10 至 8/31 |
| effort 切换实测 | ⚠️ 未实测 |

### 问题与解决方案

**额度耗尽**：检查 Free/Pro 限额；考虑 API 按量。**8/31 后账单上升**：提前在 Console 设 budget alert。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Anthropic 新闻稿 | ✅ 定价 |
| VentureBeat IPO 分析 | ✅ 战略性降价叙事 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 初创 CTO | 促销窗内锁定 Agent 工作流 |
| 财务 | 8/31 后成本模型重算 |
| 个人 | Free 默认 Sonnet 5 为重大升级 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| **2.1.197** | 2026-06-30 | **Sonnet 5 默认**、1M 上下文、org default model、MCP 安全、background 可靠性 |
| 2.1.195 | 2026-06-28~29 | 维护线；无 Sonnet 5 |
| 2.1.190 | 2026-06-26 前后 | Fable 5 配额字符串、auto mode 等 |

## 今日研究员结论

**今日最大变更**是 Sonnet 5 + 2.1.197 组合：中端 Agent 能力显著跃升且促销价友好。建议所有 Claude Code 用户 **立即升级**。微软内部今日停服 Claude Code **不影响公众**，但提醒企业关注 CLI 工具锁定。无 API Key 环境下已验证 CLI 2.1.197 可安装运行；推理能力需用户自行登录验证。
