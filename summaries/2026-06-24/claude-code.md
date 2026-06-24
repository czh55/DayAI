# Claude Code 每日技术文档 — 2026-06-24

> 本地实测版本：**2.1.191**｜监测源：[Claude Code Changelog](https://code.claude.com/docs/en/changelog.md)、[Anthropic News](https://www.anthropic.com/news/introducing-claude-tag)

## 今日综述

2026 年 6 月 24 日本地实测 **2.1.191**（npm `@anthropic-ai/claude-code@latest`）。Changelog 最新为 **2.1.190（6/24）** 维护 patch；**2.1.187（6/23）** 带来 `sandbox.credentials` 与企业模型限制。**今日最大事件：Anthropic 6/23 发布 Claude Tag**——Slack 内团队级 Agent，官方称内部 65% 产品代码由其参与完成，卡帕西称「LLM UI 第三次变革」。

---

## 特性一：Claude Tag — Slack 内团队 Agent（2026-06-23 发布）

### 是什么（机制说明）

Claude Tag 是 Anthropic 面向 **Claude Enterprise / Team** 用户的 Slack 集成，将 Claude 从个人聊天机器人升级为 **频道级共享 AI 队友**：

- **@Claude 派活**：在授权频道 @Claude 分配任务，Claude 理解线程上下文并拆解为多阶段执行
- **共享记忆**：频道内所有成员共享同一 Claude 身份与工作状态，可接续他人对话
- **Ambient 模式**：主动提醒遗漏讨论、跟进待办、跨频道汇总信息（需授权）
- **异步执行**：用户离开 Slack 后 Claude 继续推进，完成后在线程汇报
- **Agent Identity**：管理员为不同频道配置独立身份、工具权限与记忆隔离

集成：GitHub、Salesforce、Datadog、Snowflake、Linear、Figma 等。旧 Slack Claude 应用 **30 天内** 迁移，**8/3/2026** 强制切换。

### 适用场景

- **适合**：Slack 为中心的研发/产品团队；跨工具长程任务（改代码 + 开 PR + 通知频道）；Enterprise 合规管控
- **不适合**：无 Slack Enterprise 的个人开发者；需 Fable 5 Frontier Code 的复杂任务（当前仅 Opus 4.8）；国内无 Anthropic Enterprise 的团队

### 前置条件

- Claude Enterprise 或 Team 订阅
- Slack 工作区管理员完成连接、工具授权、预算设置
- Claude Tag Beta 访问权限

### 详细使用步骤（业务用户）

1. 管理员：Claude 控制台 → Integrations → Slack → Connect Workspace
2. 配置 **Agent Identity**：为 `#product-eng` 等频道创建独立 Claude 身份
3. 授权工具：GitHub repo 只读/读写、Datadog dashboard 等按频道粒度配置
4. 邀请 Claude 进入频道：`/invite @Claude`
5. 派活：在线程中 `@Claude 请分析 cadence picker 需求并实现 PR`
6. 查看进度：Claude 在线程发布 checklist 与阶段性更新
7. Ambient：管理员在 Identity 设置中启用 proactive nudges

### 命令与配置示例

**Slack 内派活（自然语言）**

```
@Claude 在 repo anthropic-apps/demo 中实现 cadence picker，
完成后开 PR 并 @channel 通知 review
```

**Claude Code CLI 对照 — 同类任务在终端**

```bash
claude -p "Analyze cadence picker requirements in this repo and create a PR"
```

**settings.json — 与 Claude Tag 并行的本地 Claude Code 配置**

```json
{
  "model": "claude-opus-4-8-20250514",
  "attribution": {
    "sessionUrl": true
  }
}
```

### 本地测试结果

Claude Tag 为 Slack 云端服务，Cloud Agent 环境无法实测 Slack 集成。

| 项 | 结果 |
|----|------|
| 官方文档可访问 | ✅ [Slack 文档](https://code.claude.com/docs/en/slack) |
| CLI 版本 | ✅ 2.1.191 |
| Slack @Claude 派活 | ⚠️ 未实测（无 Enterprise Slack） |

### 问题与解决方案

**错误 1：频道内 @Claude 无响应**

排查：确认 Claude 已被 invite 到频道；检查管理员是否授予该频道 Agent Identity；验证 Team/Enterprise 订阅有效。

**错误 2：Claude 无法访问 GitHub repo**

排查：Agent Identity 工具授权中是否包含目标 repo；OAuth token 是否过期；repo 权限是否为 read-only 而任务需 write。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Anthropic 官方博客 | ✅ 65% 内部代码、四大能力、Beta 开放 |
| TechCrunch | ✅ Ambient 模式、频道记忆、8/3 迁移日期 |
| 量子位 6/24 | ✅ 核心事实一致；「Fable 5 没消息」为媒体观察 |
| Reuters | ✅ Beta 面向 Enterprise/Team；计划扩展至更多平台 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 研发负责人 | 试点 1–2 个频道（如 #eng-launches），配置 Agent Identity 隔离法务/工程 |
| 个人开发者 | 继续用 Claude Code CLI；关注 Anthropic「数周内扩展平台」承诺 |
| 安全合规 | 优先审核跨频道记忆权限与工具 OAuth 范围 |
| 国内团队 | 评估飞书/钉钉集成时间表；短期用 Cursor Automations Slack 触发替代 |

---

## 特性二：sandbox.credentials 沙箱凭据隔离（2.1.187 @ 6/23）

### 是什么（机制说明）

新增 `sandbox.credentials` 设置，阻止 **沙箱内执行的命令** 读取凭据文件（如 `.env`、`~/.aws/credentials`）及 secret 环境变量，降低 Agent 意外泄露密钥的风险。

### 适用场景

- **适合**：CI/CD 中运行 Claude Code；多租户 Cloud Agent；不信任代码库的第三方 PR 审查
- **不适合**：需要沙箱内访问 AWS/GCP 凭据的部署自动化（需显式 opt-out 或改用非沙箱模式）

### 前置条件

- Claude Code ≥ 2.1.187
- 沙箱模式已启用（默认或 `sandbox.enabled: true`）

### 详细使用步骤（业务用户）

1. 编辑 `~/.claude/settings.json` 或项目级 `.claude/settings.json`
2. 添加 `"sandbox": { "credentials": true }`（或按文档键名配置）
3. 运行 `claude --version` 确认 ≥ 2.1.187
4. 在沙箱会话中验证：Agent 执行 `cat .env` 应被阻止
5. 企业部署：通过 managed settings 统一下发

### 命令与配置示例

**基础 — settings.json**

```json
{
  "sandbox": {
    "credentials": true
  }
}
```

**进阶 — 与 allowAppleEvents 等企业策略组合**

```json
{
  "sandbox": {
    "credentials": true,
    "allowAppleEvents": false
  },
  "permissions": {
    "allow": ["Bash(npm test)", "Read"],
    "deny": ["Bash(curl *)"]
  }
}
```

### 本地测试结果

```bash
cd /workspace/tools
./node_modules/.bin/claude --version
# 2.1.191 (Claude Code)
```

| 项 | 结果 |
|----|------|
| 版本 ≥ 2.1.187 | ✅ |
| 沙箱凭据阻止实测 | ⚠️ 未实测（无 API Key 无法启动完整沙箱会话） |
| Changelog 条目 | ✅ 2.1.187 官方确认 |

### 问题与解决方案

**错误 1：沙箱内合法工具调用失败（需读 .env）**

排查：将所需变量通过 `permissions` 白名单注入非 secret 配置；或对该任务禁用沙箱。

**错误 2：升级后沙箱行为变化**

排查：`claude /doctor` 检查沙箱配置；对比 `settings.json` 与 managed settings 冲突。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.187 | ✅ 官方 |
| 无独立社区稿 | — |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DevOps | CI 流水线默认开启 `sandbox.credentials` |
| 应用开发者 | 本地开发可保持默认，部署脚本单独配置 |
| 安全团队 | 纳入 Agent 安全基线，与 `.cursor/permissions.json` 对照 |

---

## 特性三：组织级模型限制（2.1.187 @ 6/23）

### 是什么（机制说明）

组织管理员配置的 **model restrictions** 现同步到：

- 交互式 model picker
- `--model` CLI 参数
- `/model` slash command
- `ANTHROPIC_MODEL` 环境变量

选择受限模型时显示 **「restricted by your organization's settings」**。

### 适用场景

- **适合**：Enterprise 统一管控高成本模型（Fable 5、Opus）；合规要求禁用特定模型
- **不适合**：需要绕过组织策略的个人实验（应使用非企业账号）

### 前置条件

- Enterprise / Team 组织管理员已在控制台配置 model restrictions
- Claude Code ≥ 2.1.187

### 详细使用步骤（业务用户）

1. 管理员：Claude 控制台 → Organization Settings → Model Restrictions
2. 添加限制规则（如禁止 `claude-fable-5` 或限制为 Sonnet only）
3. 开发者：`/model` 查看可用列表，受限项显示提示
4. CLI：`claude --model claude-fable-5` 若受限将报错或回退

### 命令与配置示例

**基础 — 查看当前模型**

```
/model
```

**CLI 指定模型**

```bash
claude --model claude-sonnet-4-6-20250514 -p "Summarize this file"
```

**环境变量**

```bash
export ANTHROPIC_MODEL=claude-sonnet-4-6-20250514
claude -p "Run tests"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `--model` 参数存在 | ✅ `--help` 可见 |
| 组织限制实测 | ⚠️ 未实测（非 Enterprise 账号） |

### 问题与解决方案

**错误 1：「restricted by your organization's settings」**

排查：联系管理员调整 restrictions；使用允许的 fallback 模型。

**错误 2：`-p` 模式与交互模式限制不一致**

排查：确认 2.1.187+ 已修复 deprecated model 警告覆盖 agent frontmatter；升级至 2.1.191。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.187 | ✅ |
| 2.1.183 deprecated model 警告 | ✅ 互补（subagent spawn 场景） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 结合 Fable 5 credits 政策统一限制高成本模型 |
| 开发者 | 配置 `fallbackModel` 避免工作流中断 |
| 独立开发者 | 不受此特性影响 |

---

## 特性四：claude mcp login/logout CLI 认证（2.1.186 @ 6/22）

### 是什么（机制说明）

新增 CLI 级 MCP 服务器认证，无需打开交互式 `/mcp` 菜单：

```bash
claude mcp login <server-name>
claude mcp logout <server-name>
```

支持 `--no-browser` 在 SSH 环境通过 stdin redirect 完成 OAuth。

### 适用场景

- **适合**：远程服务器、CI、headless Cloud Agent 配置 MCP
- **不适合**：需要可视化 OAuth 同意的首次本地配置（仍可用 `/mcp`）

### 前置条件

- Claude Code ≥ 2.1.186
- `~/.claude.json` 或项目 MCP 配置中已声明 server

### 详细使用步骤（业务用户）

1. 配置 MCP server：编辑 `~/.claude.json` 添加 server 定义
2. 登录：`claude mcp login my-github-mcp`
3. SSH 环境：`claude mcp login my-github-mcp --no-browser`，按提示粘贴 redirect URL
4. 验证：`claude mcp get my-github-mcp`
5. 登出：`claude mcp logout my-github-mcp`

### 命令与配置示例

**基础**

```bash
claude mcp login github
claude mcp get github
claude mcp logout github
```

**SSH headless**

```bash
claude mcp login github --no-browser
# 按终端提示完成 OAuth
```

**mcp.json 配置片段**

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### 本地测试结果

```bash
./node_modules/.bin/claude mcp --help 2>&1 | head -10
```

| 项 | 结果 |
|----|------|
| `mcp login` 子命令 | ✅ 2.1.191 存在 |
| 实际 OAuth 流程 | ⚠️ 未实测（无 MCP server 配置） |

### 问题与解决方案

**错误 1：`mcp get` 报 server name typo**

排查：2.1.186+ 会建议最接近的 server 名并截断长列表。

**错误 2：远程 MCP 工具 hang 5 分钟**

排查：2.1.187 修复——现会 abort；可设 `CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT` 覆盖。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.186 | ✅ |
| Claude Tag GitHub 集成 | ✅ 互补（Slack vs CLI 两条路径） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| SRE/平台工程师 | 将 `mcp login` 纳入 Cloud Agent 启动脚本 |
| 安全团队 | 审计 MCP OAuth token 存储位置 |
| 个人开发者 | 本地仍可用 `/mcp` 图形流程 |

---

## 特性五：! bash 自动响应（2.1.186 @ 6/22）

### 是什么（机制说明）

在交互会话中执行 `!command` bash 命令后，Claude **自动响应输出**（此前仅将输出加入上下文不主动回复）。可通过 `"respondToBashCommands": false` 恢复旧行为。

### 适用场景

- **适合**：快速验证脚本输出并获 Agent 解读；调试 CI 日志
- **不适合**：频繁 bash 导致 token 消耗激增的长会话

### 前置条件

- Claude Code ≥ 2.1.186
- 交互模式（非 `-p`）

### 详细使用步骤（业务用户）

1. 启动 `claude` 交互会话
2. 输入 `!npm test` 或 `!git status`
3. 观察 Claude 是否在输出后主动分析结果
4. 若需关闭：Settings → 或 `settings.json` 设 `"respondToBashCommands": false`

### 命令与配置示例

**交互示例**

```
> !npm run lint
# Claude 自动解读 lint 结果并建议修复
```

**关闭自动响应**

```json
{
  "respondToBashCommands": false
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 确认 | ✅ 2.1.186 |
| 交互 bash 实测 | ⚠️ 未实测（无 API Key） |

### 问题与解决方案

**错误 1：bash 输出后 Claude 过度解读**

排查：设 `respondToBashCommands: false`；或用 `-p` 模式精确控制。

**错误 2：bash 命令被沙箱阻止**

排查：检查 `permissions` 与 `sandbox` 配置；2.1.183 auto mode 安全规则可能 block 破坏性 git 命令。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 2.1.186 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | 默认开启，提升 `!` 工作流效率 |
| 自动化脚本 | 使用 `-p` 避免意外多轮对话 |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 2.1.191 | npm @latest（6/24 实测） | 最新 npm 包 |
| 2.1.190 | 2026-06-24 | Bug fixes and reliability improvements |
| 2.1.187 | 2026-06-23 | sandbox.credentials、org model restrictions、mouse click menus |
| 2.1.186 | 2026-06-22 | mcp login/logout、! bash auto response、/review 统一引擎 |
| 2.1.185 | 2026-06-20 | Stream-stall hint 文案与 20s 触发 |

## 今日研究员结论

**Claude Tag** 是今日最重要战略发布，将 Claude Code 能力延伸至 Slack 协作层，与本地 CLI 形成「频道 Agent + 终端 Agent」双轨。CLI 侧 **2.1.187–191** 聚焦企业安全（沙箱凭据、模型限制）与 MCP headless 认证。建议开发者：Enterprise 团队试点 Claude Tag；个人/CI 继续跟踪 npm 更新并配置 `sandbox.credentials`；关注 Fable 5 是否后续接入 Claude Tag（目前仅 Opus 4.8，媒体报道）。

---
