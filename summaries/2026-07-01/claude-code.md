# Claude Code 每日技术文档 — 2026-07-01

> 本地实测版本：**2.1.198**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5)、[Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)

## 今日综述

2026 年 7 月 1 日 npm `@anthropic-ai/claude-code@latest` 实测 **2.1.198**（较昨日 2.1.197 **+1 patch**，npm 发布于 2026-07-01T16:50:16Z）。行业侧最大变化：**Fable 5 / Mythos 5 全球访问恢复**（官方 Jul 1 Update 确认）。Claude Code 用户可重新在 `/model` 选用 Fable 5（视套餐与 7/7 前 50% 周用量政策）。**Sonnet 5** 仍为默认模型（2.1.197+ 引入）。Changelog 滚动条目仍以 2.1.197 时代的大量维护修复为主（background agents、MCP OAuth、Remote Control 等）。

---

## 特性一：Fable 5 全球恢复 — Claude Code 极限编程模型回归（2026-07-01）

### 是什么（机制说明）

**Claude Fable 5**（`claude-fable-5`）因 6/12 美国出口管制于 6/12–6/30 期间对全球用户暂停。**2026 年 7 月 1 日** Anthropic 确认重新部署，可在 **Claude Code**、Claude.ai、API、Cowork 全球访问。Fable 5 与 Mythos 5 共享底层，Fable 5 带强化安全分类器；触发高风险网络安全请求时 **自动回退 Opus 4.8**。

Pro/Max/Team 及部分 Enterprise：**至 2026-07-07**，Fable 5 占用每周用量上限的 **50%** 且不额外计费；之后需 usage credits。

### 适用场景

- **适合**：Frontier 级软件工程（SWE-bench Pro 80.3%）、长链复杂 refactor、高难 debug
- **不适合**：日常低成本编码（用 Sonnet 5）；易触发安全分类器的漏洞 exploit 演示（会被回退）

### 前置条件

- Claude Code 最新版（实测 2.1.198）
- 含 Fable 5 权限的 Anthropic 订阅或 API credits
- 了解 7/7 后计费政策变化

### 详细使用步骤（业务用户）

1. `npm install @anthropic-ai/claude-code@latest`
2. 启动 `claude`，输入 `/model`
3. 选择 **Fable 5**（或 API：`--model claude-fable-5`）
4. 若请求被分类器拦截，界面将提示并回退 **Opus 4.8**——可改述 prompt 或换 Sonnet 5
5. 7/7 前关注 Dashboard 用量，利用 50% 周限额窗口评估 Fable 5 价值

### 命令与配置示例

```bash
claude --model claude-fable-5 -p "Analyze this repo's auth module for security issues"
```

```bash
export ANTHROPIC_MODEL=claude-fable-5
claude
```

```json
{
  "model": "claude-fable-5"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--version` | ✅ `2.1.198 (Claude Code)` |
| Fable 5 官方恢复公告 | ✅ Jul 1, 2026 Update |
| Fable 5 推理实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**模型列表无 Fable 5**：确认订阅含 Fable 5；Enterprise 标准席位可能仅 credits 可用。**频繁回退 Opus 4.8**：官方称改进分类器可能增加误拦；安全相关 prompt 改用语义更明确的防御性表述。**6/12 后旧会话模型不可用**：新建会话并 `/model` 重选。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5) Jul 1 Update | ✅ 官方确认恢复 |
| 虎嗅 Fable 5 实测稿 | ⚠️ 社区关注误拦与成本，与官方「99%+ bypass 阻断」叙事部分分歧 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | 默认 Sonnet 5 即可；Fable 5 留给极限任务 |
| 安全研究员 | 7/1 起可重新评估；关注 HackerOne jailbreak 项目 |
| 企业管理员 | 7/7 前制定 Fable 5 credits 预算政策 |

---

## 特性二：Claude Sonnet 5 默认模型 — 1M 上下文 Agent（2026-06-30 发布，今日仍有效）

### 是什么（机制说明）

**Claude Sonnet 5** 为 Claude Code **默认模型**（2.1.197+），1M token 上下文，促销 API **$2/$10 per Mtok 至 2026-08-31**。SWE-bench Pro 63.2%，Terminal-Bench 2.1 80.4%。2.1.198 为 Sonnet 5 时代的首个维护 patch，未改变默认模型策略。

### 适用场景

- **适合**：日常 Agent 编码、长上下文仓库、多 Agent 并行（成本低于 Opus）
- **不适合**：需 Fable 级 Frontier Code 质量的极限任务

### 前置条件

- Claude Code **≥ 2.1.197**（今日 2.1.198）
- Anthropic 账户

### 详细使用步骤（业务用户）

1. `claude --version` 确认 ≥ 2.1.197
2. 新会话自动使用 Sonnet 5
3. `/model` 可切换 Org default / Opus / Fable 等
4. 用 `/cost` 或 API dashboard 监控 token（注意新 tokenizer）

### 命令与配置示例

```bash
claude --model claude-sonnet-5 -p "Refactor the payment module across all files"
```

```bash
/model
# 选择 Sonnet 5 或查看 "Org default"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 默认版本链 | ✅ 2.1.198 ≥ 2.1.197 |
| Sonnet 5 推理 | ⚠️ 未实测 |

### 问题与解决方案

**Token 账单高于预期**：量子位报道新 tokenizer 可能 1.0–2× 消耗；用真实任务 benchmark。**无法使用 Sonnet 5**：升级 CLI；检查 org 模型限制（Changelog：org-configured model restrictions）。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Anthropic Sonnet 5 官方 | ✅ |
| 量子位 7 月成本稿 | ⚠️ 质疑隐性 token 成本 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| Free/Pro 用户 | 默认 Sonnet 5 即最强可用默认 |
| 成本敏感团队 | 8/31 前密集使用促销价 |
| API 集成者 | 设置 `fallbackModel` 备用 Opus |

---

## 特性三：组织默认模型与 `/model` 选择器（2.1.197+ 维护）

### 是什么（机制说明）

Changelog 条目：**组织管理员可在 org console 设置 default model**；用户未自行选择时 `/model` 显示 **「Org default」** 或 **「Role default」**。配合 **org-configured model restrictions**，受限模型会显示「restricted by your organization's settings」。

### 适用场景

- **适合**：企业统一模型政策、合规团队锁定可用模型列表
- **不适合**：个人开发者无 org 管理权限场景

### 前置条件

- Claude Enterprise / Team 管理员权限
- Claude Code 2.1.197+

### 详细使用步骤（业务用户）

1. 管理员登录 Anthropic org console
2. 设置组织默认模型（如 Sonnet 5）
3. 可选：配置 model restrictions 白名单/黑名单
4. 成员启动 `claude` → `/model` 查看 Org default
5. 成员尝试 `--model` 选受限模型时将看到限制提示

### 命令与配置示例

```bash
claude --model claude-opus-4-8
# 若被 org 限制，stderr 提示 restricted
```

```json
{
  "model": "claude-sonnet-5"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 条目 | ✅ 2.1.197 时代引入 |
| Org 策略实测 | ⚠️ 未实测（无 Enterprise org） |

### 问题与解决方案

**`/model` 显示空/陈旧**：Changelog 修复「`/model` stale after `/login`」——先 `/login` 刷新。**成员看不到 Fable 5**：检查 org 是否启用 credits 与模型 restrictions。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |
| 企业文档 | ✅ org console 路径 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| IT 管理员 | 7/1 Fable 5 恢复后重新评估 org 默认模型 |
| 开发者 | 遵守 Org default，避免擅自 `--model` 受限模型 |

---

## 特性四：Background Agents 与 `claude agents` 可靠性修复（2.1.197 滚动维护）

### 是什么（机制说明）

近期 Changelog 密集修复 background agent：**长命令在进程重启/更新后存活**（含 Windows handoff）、**daemon 重启后自动 resume**、**停止 agent 后永久停止（不再复活）**、`claude agents` 状态显示修复（Done vs Needs input）、PR 链接可点击等。与 Sonnet 5 默认模型叠加，多 Agent 并行更实用。

### 适用场景

- **适合**：并行 fix CI、后台 code review、长时间测试任务
- **不适合**：需实时交互的单会话精细 pair programming

### 前置条件

- Claude Code 2.1.198
- 足够订阅额度（多 agent 并行消耗 token）

### 详细使用步骤（业务用户）

1. 在会话中用 `←←`（双左箭头）将任务 **background**
2. 打开 `claude agents` 面板查看状态
3. 点击行打开子 agent 会话；完成后显示 PR 链接（若有）
4. 用 `x` 或 stop 永久终止不需要的 agent
5. Esc Esc 在 idle prompt 可打开 rewind（2.1.197 修复回归）

### 命令与配置示例

```bash
claude agents
claude agents --dangerously-skip-permissions  # 须显示 bypass 免责声明
```

```bash
# 后台启动
claude --bg "Run full test suite and fix failures"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude agents --help` | ✅ 命令存在 |
| 多 agent 并行实测 | ⚠️ 未实测 |

### 问题与解决方案

**Agent 卡在 working**：升级 2.1.198；Changelog 修复 structured output 缺失导致的状态卡住。**Phantom resumed agent**：2.1.197 修复 backgrounding main turn 产生 phantom subagent。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 多条 background 修复 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 全栈开发者 | Sonnet 5 默认 + 2–3 并行 agent 性价比高 |
| Windows 用户 | 2.1.197+ background shell handoff 值得升级 |

---

## 特性五：MCP 安全加固 — `claude mcp list` 不再自动 spawn 未信任服务器（2.1.197+）

### 是什么（机制说明）

**安全变更**：`claude mcp list` / `get` **不再 spawn** 由 repo 内 `.claude/settings.json` 自批准的 `.mcp.json` 服务器；不可信 workspace 显示 `⏸ Pending approval`。另：`claude mcp login/logout` CLI 命令（2.1.197 滚动）、MCP OAuth scope 修复（避免请求 IdP 全量 scopes 导致 `invalid_scope`）。

### 适用场景

- **适合**：克隆不可信仓库的开发者、企业 MCP 治理
- **不适合**：期望 list 时自动探测所有 MCP 的旧脚本

### 前置条件

- Claude Code 2.1.198
- 项目含 `.mcp.json` 或用户级 MCP 配置

### 详细使用步骤（业务用户）

1. 克隆新仓库后运行 `claude mcp list`
2. 待批准服务器显示 `⏸ Pending approval` → 在 `/mcp` 或提示中批准
3. 认证服务器：`claude mcp login <server>`（SSH 用 `--no-browser`）
4. 登出：`claude mcp logout <server>`

### 命令与配置示例

```bash
claude mcp list
claude mcp login github --no-browser
claude mcp get my-server
```

```json
// .mcp.json（项目级，需用户批准后方可在不可信 workspace spawn）
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `claude mcp --help` | ✅ 子命令存在 |
| 不可信 repo spawn 行为 | ⚠️ 未实测 |

### 问题与解决方案

**GitLab 自建 IdP OAuth 失败**：升级修复 `invalid_scope`。**MCP 工具 hang 5 分钟**：设置 `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 安全条目 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开源贡献者 | 克隆陌生 repo 后先审 MCP 再批准 |
| 企业 | 结合 Cursor Team MCP 治理形成双端策略 |

---

## 版本对照表

| 版本 | npm 发布时间 (UTC) | 要点 |
|------|-------------------|------|
| 2.1.198 | 2026-07-01 16:50 | 今日 patch；Fable 5 恢复日维护 |
| 2.1.197 | 2026-06-30 13:31 | Sonnet 5 默认模型、大量 agent/MCP 修复 |
| 2.1.196 | 2026-06-29 20:08 | Sonnet 5 前最后一版 |
| 2.1.195 | 2026-06-26 18:16 | 昨日对比基线 |

## 今日研究员结论

**7 月 1 日 Claude Code 主线是「Fable 5 回来 + Sonnet 5 默认」**：升级至 **2.1.198**，日常用 Sonnet 5，极限任务在 **7/7 前** 评估 Fable 5 含订阅额度。关注分类器误拦与量子位所述 token 隐性成本，用真实 workload 验证账单后再批量迁移工作流。
