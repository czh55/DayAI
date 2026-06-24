# Cursor 每日技术文档 — 2026-06-24

> 本地实测版本：**—（桌面未实测）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 24 日 Cursor 官方 Changelog 无新条目。** 最新版本为 **3.9（2026-06-22）**——Customize 页统一管理 plugins/skills/MCP、Marketplace leaderboard、Plugin canvases（Hex/Atlassian）、Team Marketplaces 支持 GitLab/BitBucket/Azure DevOps。今日行业对照：Anthropic 同日段发布 **Claude Tag**（Slack 协作 Agent），形成「桌面 IDE Agent vs 频道协作 Agent」竞争格局。

---

## 特性一：Customize 页统一扩展管理（3.9 @ 2026-06-22）

### 是什么（机制说明）

Cursor 3.9 引入 **Customize** 页面，将此前分散的扩展能力集中到一处管理：

- **Plugins**：市场插件与团队私有插件
- **Skills**：可复用技能包（含 `/automate` 等）
- **MCPs**：Model Context Protocol 服务器（含自定义 MCP）
- **Subagents**：子 Agent 配置
- **Rules**：项目/用户级规则
- **Commands**：自定义 slash 命令
- **Hooks**：生命周期钩子

支持 **User / Team / Workspace** 三级作用域。

### 适用场景

- **适合**：需要统一管理团队 MCP 与插件的企业；多项目复用 skills 的团队
- **不适合**：仅使用基础 Tab 补全、不启用 Agent 的轻量用户

### 前置条件

- Cursor 桌面 ≥ 3.9
- Team/Enterprise 订阅（Team 级配置需相应权限）

### 详细使用步骤（业务用户）

1. 打开 Cursor 桌面应用
2. 导航：**Settings（齿轮）→ Customize**（或 Command Palette `Customize`）
3. **Plugins** 标签：浏览 Marketplace，一键安装
4. **MCPs** 标签：Add MCP → 填写 `mcp.json` 或选择预设
5. **Skills** 标签：启用/禁用技能，管理团队分发
6. **Rules** 标签：编辑 `.cursor/rules` 等效 UI
7. Workspace 级：在仓库根目录 `.cursor/` 下配置，Customize 页同步显示

### 命令与配置示例

**项目级 MCP 配置 `.cursor/mcp.json`**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    }
  }
}
```

**权限配置 `.cursor/permissions.json`**

```json
{
  "allow": [
    "Shell(npm)",
    "Shell(git)",
    "Read",
    "Write"
  ],
  "deny": [
    "Shell(rm -rf *)"
  ]
}
```

**Agent 会话中引用 skill**

```
/automate 每天 09:00 运行 DayAI 资讯生成并 push 到 main
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.9 | ✅ 官方 6/22 发布 |
| Customize 页 GUI | ⚠️ 未实测（Cloud Agent 无桌面 GUI） |
| Cloud Agent Automations | ✅ 本任务即 Automations cron 触发实例 |

### 问题与解决方案

**错误 1：Customize 页找不到 Team 级选项**

排查：确认 Team/Enterprise 订阅；检查组织管理员是否启用 Team Marketplaces。

**错误 2：MCP 安装后 Agent 无法调用**

排查：Customize → MCPs 检查连接状态；重启 Agent 会话；验证 `mcp.json` 路径。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.9 | ✅ |
| Cursor Docs customize-cursor | ✅ |
| Releasebot 6/24 汇总 | ✅ 引用 3.9 为最新 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 团队 Tech Lead | 在 Customize 页统一分发 MCP 与 rules，避免成员各自配置 |
| 个人开发者 | 优先配置 2–3 个高频 MCP（GitHub、filesystem） |
| 与 Claude Tag 对照 | Slack 协作用 Claude Tag；IDE 内编码用 Cursor Customize |

---

## 特性二：Marketplace Leaderboard 团队热门榜（3.9 @ 2026-06-22）

### 是什么（机制说明）

Customize 页新增 **Marketplace Leaderboard**，展示团队内最受欢迎的 plugins、skills、MCPs，支持一键添加到个人配置。促进团队内最佳实践扩散。

### 适用场景

- **适合**：10+ 人研发团队发现同事在用的高效插件
- **不适合**：单人开发者（leaderboard 需团队数据）

### 前置条件

- Cursor Team 订阅
- 团队成员已有 Marketplace 使用数据

### 详细使用步骤（业务用户）

1. Settings → Customize
2. 查看 **Leaderboard** 区域（Plugins/Skills/MCP 分类）
3. 点击 **Add to my setup** 一键安装
4. 团队管理员可 pin 推荐插件到 Team Marketplace

### 命令与配置示例

**浏览 Marketplace（浏览器）**

```
https://cursor.com/marketplace
```

**Automations 模板示例**

```
https://cursor.com/marketplace/automations/triage-github-workflow-failures
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Marketplace URL | ✅ 可访问 |
| Leaderboard GUI | ⚠️ 未实测 |

### 问题与解决方案

**错误 1：Leaderboard 为空**

排查：团队使用数据不足；需更多成员安装插件后刷新。

**错误 2：安装插件与本地 MCP 冲突**

排查：Customize → 检查重复 MCP server 名；移除旧配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 工程经理 | 每月 review leaderboard，推广高效 automations |
| 新成员 | 入职时从 leaderboard 一键同步团队标准配置 |

---

## 特性三：Plugin Canvases 预置模板（3.9 @ 2026-06-22）

### 是什么（机制说明）

插件现支持 **Canvases**——团队可复用的预置设置模板：

- **Hex Canvas**：数据可视化工作流
- **Atlassian Canvas**：Jira/Confluence 实时 Issue 与文档视图

### 适用场景

- **适合**：数据团队（Hex）、使用 Atlassian 栈的研发团队
- **不适合**：无 Hex/Atlassian 许可证的团队

### 前置条件

- Cursor 3.9+
- 相应第三方服务账号（Hex、Atlassian）

### 详细使用步骤（业务用户）

1. Customize → Plugins → 安装含 Canvas 的插件
2. 打开 **Hex Canvas** 或 **Atlassian Canvas**
3. 按模板连接数据源（Hex project、Jira board）
4. 在 Agent 会话中引用 Canvas 上下文提问
5. 团队管理员可将配置好的 Canvas 分享为团队模板

### 命令与配置示例

**Agent 会话示例**

```
使用 Atlassian Canvas 查看当前 sprint 未关闭的 P0 bug，
并生成修复优先级建议
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 描述 | ✅ Hex + Atlassian 双 Canvas |
| Canvas 实测 | ⚠️ 未实测（无桌面 + 无 Atlassian 集成） |

### 问题与解决方案

**错误 1：Canvas 无法连接 Atlassian**

排查：OAuth 授权是否完成；Jira 项目权限；企业防火墙。

**错误 2：Hex 数据不同步**

排查：Hex API token 有效期；Canvas 刷新间隔。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 | ✅ |
| Claude Tag Atlassian 集成 | ✅ 竞品亦支持 Atlassian（Slack 路径不同） |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 数据分析师 | 优先试用 Hex Canvas |
| Scrum Master | Atlassian Canvas 替代手动 Jira 查询 |

---

## 特性四：Team Marketplaces 多 Git 托管导入（3.9 @ 2026-06-22）

### 是什么（机制说明）

[Team Marketplaces](https://cursor.com/docs/plugins#team-marketplaces) 现支持从 **GitLab、BitBucket、Azure DevOps** 导入插件仓库（此前主要支持 GitHub），便于企业内部分发私有插件。

### 适用场景

- **适合**：使用 GitLab 私有化部署的企业；Azure DevOps 为核心的微软生态团队
- **不适合**：仅使用 GitHub 的小团队（现有流程已足够）

### 前置条件

- Cursor Team/Enterprise
- 目标 Git 托管的访问 token

### 详细使用步骤（业务用户）

1. Cursor Dashboard → Team Settings → Marketplaces
2. **Add Repository** → 选择 GitLab / BitBucket / Azure DevOps
3. 填写 repo URL 与 access token
4. 团队成员在 Customize 页浏览 Team Marketplace 安装
5. 更新插件：push 到 repo 后 Marketplace 自动同步

### 命令与配置示例

**插件仓库结构示例**

```
my-team-plugin/
├── plugin.json
├── skills/
│   └── my-skill/
│       └── SKILL.md
└── README.md
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Docs 页面 | ✅ team-marketplaces 章节存在 |
| 多 Git 导入实测 | ⚠️ 未实测 |

### 问题与解决方案

**错误 1：GitLab token 权限不足**

排查：token 需 `read_repository`；私有 subgroup 需额外授权。

**错误 2：插件安装后 skills 不显示**

排查：验证 `plugin.json` schema；检查 SKILL.md frontmatter。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 | ✅ |
| Cursor Docs plugins | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 平台团队 | 将内部 CLI 工具封装为 Team Marketplace 插件 |
| 微软生态团队 | 优先 Azure DevOps 导入，与 6/30 Copilot CLI 迁移协同 |

---

## 特性五：Cursor Automations 与 Claude Tag 对照（3.8 延续，无 6/24 更新）

### 是什么（机制说明）

Cursor 3.8（6/18）发布的 **Automations** 提供 always-on Cloud Agent，支持：

- `/automate` skill 自然语言创建自动化
- **Slack emoji 触发**、**GitHub 多类 trigger**
- **Computer use** 生成 demo 录像

与 Claude Tag 的差异：

| 维度 | Cursor Automations | Claude Tag |
|------|-------------------|------------|
| 入口 | IDE + cursor.com/agents + cron | Slack @Claude |
| 记忆 | Automation memory 文件 | 频道级共享记忆 |
| 触发 | cron/GitHub/Slack emoji | @mention + Ambient |
| 目标用户 | 开发者自动化 | 全团队（含非工程师） |

### 适用场景

- **适合**：CI 定时任务、PR 自动修复、每日资讯生成（如本 DayAI 任务）
- **不适合**：需要 Slack 频道内非技术同事直接 @Agent 的场景

### 前置条件

- Cursor 订阅含 Cloud Agent
- Automations 配置权限

### 详细使用步骤（业务用户）

1. cursor.com → Automations → New Automation
2. 选择 Trigger：Cron `0 22 * * *`（UTC）等
3. 填写 Instructions（如 DayAI Prompt 全文）
4. 可选：启用 GitHub PR、Slack emoji 等附加 trigger
5. 保存并观察首次运行日志

### 命令与配置示例

**本地 Agent 创建 automation**

```
/automate 每天 UTC 22:00 生成 DayAI 资讯并 push main
```

**Cron 表达式（本任务）**

```
0 22 * * *
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 Cloud Agent 任务 | ✅ cron 触发执行中 |
| Slack emoji trigger | ⚠️ 未实测 |
| Computer use demo | ⚠️ 未实测 |

### 问题与解决方案

**错误 1：Automation push 到错误分支**

排查：Instructions 中明确 `git push origin main`；检查 `git branch` 配置。

**错误 2：build-index.js 跳过当日**

排查：README.md 须含 `## 今日一句话结论` 及 6 个板块名。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 | ✅ |
| Cloud Agent docs | ✅ |
| 本日 DayAI 执行 | ✅ 实证 Automations 可用 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开源维护者 | cron + GitHub workflow-failure 模板 |
| 与 Claude Tag 并存 | IDE/CI 用 Cursor；Slack 协作派活用 Claude Tag |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 3.9 | 2026-06-22 | Customize 页、Leaderboard、Canvases、Team Marketplaces 多 Git |
| 3.8 | 2026-06-18 | Automations、/automate、Slack emoji、GitHub triggers、computer use |
| 3.7 | 2026-06-17 | Cloud environment setup、/in-cloud、/babysit、/review |
| 3.7 | 2026-06-10 | Bugbot 3× faster、/review 本地运行 |

## 今日研究员结论

6/24 无 Cursor 新版本，但 **3.9 Customize 生态** 与 **Anthropic Claude Tag** 形成本周最重要的产品对照。建议：已升级 3.9 的团队在 Customize 页统一 MCP/skills；评估 Slack 协作需求时对比 Claude Tag（Enterprise）与 Cursor Automations（开发者自动化）；关注 CLI `/review` 支持 coming soon 的 Changelog 承诺。

---
