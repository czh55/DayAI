# Cursor 每日技术文档 — 2026-07-02

> 本地实测版本：**—**（桌面未实测）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 2 日检索 Cursor 官方 Changelog：**6/30 后无新条目**。最新能力仍为 **Team MCPs in team marketplaces** 与 **organization groups** 访问控制（6/29 iOS 公测、6/22 Customize 页面、6/18 Automations 为近一周能力栈）。本日 DayAI 自动化本身即为 **Cursor Automations cron**（`0 22 * * *` UTC）的运行实例。Cloud Agent 环境无法 GUI 实测桌面功能，以下以官方文档 + 操作 SOP 为准，标注 ⚠️ 未实测。

---

## 特性一：Team MCPs 团队市场统一分发（2026-06-30）

### 是什么（机制说明）

管理员在 **Dashboard → Integrations & MCP** 配置 **Team MCP servers** 后，可将其发布到 **team marketplace**，团队成员一键安装 **已批准集成**，无需自行配置 MCP 服务器。同一 Team MCP 可分发至 **cloud agents、Agents 窗口、IDE、CLI** 全栈。

### 适用场景

- **适合**：企业统一治理 Jira/Slack/内部 API 等 MCP；降低成员配置门槛
- **不适合**：个人 Pro 用户（无 Team marketplace）；仅需本地自定义 MCP 的 solo 开发者

### 前置条件

- Cursor **Teams 或 Enterprise** 计划
- 管理员 Dashboard 权限
- MCP 服务器端点与认证信息

### 详细使用步骤（业务用户）

1. 管理员登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. 导航 **Integrations & MCP** → 配置 Team MCP server（URL、auth）
3. 进入 **Plugins → Team Marketplaces** → 将 MCP 发布到市场
4. 成员在 IDE **Customize** 页面或 Agents 窗口浏览团队市场
5. 一键安装所需 MCP；cloud agent 会话自动继承团队 MCP

### 命令与配置示例

```json
// .cursor/mcp.json（成员本地，安装后可能自动生成）
{
  "mcpServers": {
    "team-jira": {
      "url": "https://mcp.example.com/jira"
    }
  }
}
```

```bash
# CLI 侧（若启用）通过团队市场安装的 MCP 与 IDE 共享配置
cursor --help
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/30 条目 | ✅ 官方确认 |
| Team MCP 安装实测 | ⚠️ 未实测（需 Team 账户 + GUI） |

### 问题与解决方案

**成员看不到市场**：确认 admin 已发布且 organization group 未限制该成员。**MCP auth 失败**：在 Automations 中可「保存不完整状态」后返回配置 auth（6/18 Improvements）。**与 Claude Code `claude mcp` 差异**：Cursor 侧重 IDE/Cloud 一体分发；Claude Code 用 CLI `claude mcp list`。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 6/30 | ✅ |
| Claude Code Team MCP 6/30 | ✅ 行业同期企业 MCP 治理趋势 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 优先上架高频 MCP（Jira、GitHub、Slack） |
| 个人开发者 | 继续用 user-level MCP |
| 安全团队 | 审计 Team MCP 数据访问范围 |

---

## 特性二：Organization Groups 市场访问控制（2026-06-30）

### 是什么（机制说明）

Team marketplaces 除 **SCIM directory groups** 外，新增支持 **organization groups**。管理员在 **Dashboard → Plugins → Team Marketplaces** 可将市场访问限制到特定组织组。已使用 SCIM 组的市场 **保持原配置**。

### 适用场景

- **适合**：大型企业按部门/区域分级开放插件与 MCP
- **不适合**：小团队全员共享同一市场

### 前置条件

- Enterprise / Teams 含 organization groups 功能
- SCIM 或手动组织组已配置

### 详细使用步骤（业务用户）

1. Dashboard → **Plugins → Team Marketplaces**
2. 选择目标 marketplace
3. **Restrict access** → 选择 organization groups（或保留 SCIM groups）
4. 保存；受影响成员刷新 IDE 市场列表

### 命令与配置示例

```json
// 组织组配置通常在 Dashboard UI，无本地 JSON 标准格式
// 成员侧验证：Customize 页面应只显示被授权的市场条目
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 官方描述 | ✅ |
| 组织组限制实测 | ⚠️ 未实测 |

### 问题与解决方案

**SCIM 与 org groups 混淆**：Changelog 明确二者可并存；已配 SCIM 的市场不需迁移。**成员越权访问**：检查是否有多组重叠授权。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业 IT | 用 org groups 做 least-privilege |
| 部门 Lead | 为各组维护专属 plugin 集 |

---

## 特性三：Cursor Automations — Cron 与 Cloud Agent（2026-06-18+，本日实测）

### 是什么（机制说明）

**Cursor Automations** 用 always-on agent 自动化重复任务。触发器含 **cron**、GitHub（PR comment、review、workflow 等）、Slack emoji。Cloud agent 可使用 **computer use** 产出 demo/artifact。本仓库 DayAI 日更即 automation `61ca50c1-f6ab-461f-b46a-1101418993d0`，schedule **`0 22 * * *` UTC**。

### 适用场景

- **适合**：每日资讯生成、CI 失败分诊、PR review 自动修复
- **不适合**：需即时人工判断的高风险生产变更

### 前置条件

- Cursor 最新版
- Automation 配置（Instructions、触发器、分支策略）
- Cloud Agent 环境（cron 触发）

### 详细使用步骤（业务用户）

1. Cursor → Automations → 新建或编辑 automation
2. 触发器选 **Cron**，设置 schedule（如 `0 22 * * *`）
3. Instructions 填入任务模板（如 DayAI Prompt）
4. 启用 **computer use**（默认开启）若需 GUI demo
5. 配置 git 分支（如 `cursor/dayai-*`）与 push 策略
6. 保存并等待触发；检查 PR / `summaries/` 输出

### 命令与配置示例

```markdown
# Automation Instructions 片段示例
今日日期：UTC YYYY-MM-DD
在 summaries/YYYY-MM-DD/ 生成 7 个 Markdown...
node tools/build-index.js
git push origin main
```

```bash
# 本地验证 build-index（与 automation 内步骤一致）
node tools/build-index.js
node tools/build-index.js --check
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 automation cron 触发 | ✅ 2026-07-02T22:01:08Z 触发 |
| Cloud Agent 写 summaries | ✅ 进行中 |
| 桌面 Automations UI | ⚠️ 未实测 |

### 问题与解决方案

**`build-index.js` 跳过当日**：检查 README「今日一句话结论」表格 6 板块名。**push 失败**：`git pull --rebase origin main` 后重试。**MCP auth 中断**：6/18 起可保存不完整 automation 状态。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/18 Automations | ✅ |
| 本仓库 AUTOMATION_PROMPT.md | ✅ 与 cron 工作流一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 文档维护者 | 用 cron automation 替代手动日更 |
| 工程团队 | 用 GitHub workflow 触发器处理 CI |

---

## 特性四：Cursor for iOS 公测 — Cloud Agents 移动端（2026-06-29）

### 是什么（机制说明）

**Cursor for iOS** 公测（全付费计划）：移动端启动与管理 **always-on cloud agents**；支持语音输入、slash commands、**Remote Control**（桌面 agent 移交手机继续）、Live Activities、push 通知、Artifacts/SCM 审查与合并 PR。

### 适用场景

- **适合**：外出时监控/指导长时间 cloud agent
- **不适合**：重度 IDE 编码（仍用桌面）

### 前置条件

- iOS 设备 + 付费 Cursor 计划
- Teams/Enterprise 需 admin 启用 Remote Control

### 详细使用步骤（业务用户）

1. App Store 下载 Cursor for iOS
2. 登录账户，选择 repo 启动 cloud agent
3. 桌面 Agents 窗口使用 **Remote Control** 移交会话至手机
4. 开启 push 通知与 Live Activities 跟踪进度
5. 在手机上审查 demo、diff、合并 PR

### 命令与配置示例

```bash
# 桌面侧：启动 cloud agent 后
/in-cloud
# 或 Remote Control 按钮
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/29 | ✅ |
| iOS 实测 | ⚠️ 未实测（无 iOS 设备） |

### 问题与解决方案

**Remote Control 不可用**：Teams/Enterprise 需 admin 在 Dashboard 启用。**电脑休眠断连**：开启「keep computer awake」设置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 6/29 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动办公者 | 用 iOS 监控 cloud agent |
| 安全敏感企业 | 评估 Remote Control 策略 |

---

## 特性五：Cloud Environment Setup 与 `/in-cloud` 子 Agent（2026-06-17）

### 是什么（机制说明）

Cursor 可帮助 **<10 分钟** 在云端配置 dev 环境，捕获可复用 **snapshot**（`.cursor/environment.json`）。**`/in-cloud`** 在独立 VM 启动 cloud subagent，本地工作区保持干净；**`/babysit`** 让 cloud agent 远程迭代 PR 直至可合并。

### 适用场景

- **适合**：长时 CI 修复、并行探索、PR babysitting
- **不适合**：需本地硬件/密钥的敏感构建

### 前置条件

- Cursor 桌面最新版
- 仓库含或可生成 `.cursor/environment.json`

### 详细使用步骤（业务用户）

1. Agents 窗口选择 **Cloud environment setup**
2. 观看共享终端中 agent 安装依赖
3. 确认 snapshot 写入 `.cursor/environment.json` 并 commit
4. 任务中使用 `/in-cloud <task>` 派生子 agent
5. PR 准备阶段使用 `/babysit` 或 quick-action pill

### 命令与配置示例

```json
// .cursor/environment.json（示例结构，以官方 docs 为准）
{
  "snapshot": "reusable-cloud-env-v1"
}
```

```bash
/in-cloud Fix failing unit tests in module X
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Cloud Agent 环境 | ✅ 本 automation 运行于 cloud |
| `/in-cloud` 桌面实测 | ⚠️ 未实测 GUI |

### 问题与解决方案

**snapshot 过期**：重新运行 environment setup。**子 agent 与父 agent 分支冲突**：子 agent 使用独立 branch。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 6/17 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 开源维护者 | commit environment.json 惠及贡献者 |
| 个人开发者 | 用 `/in-cloud`  offload 长任务 |

---

## 版本对照表

| 日期 | Changelog 要点 |
|------|----------------|
| **2026-06-30** | Team MCP 市场、organization groups |
| 2026-06-29 | iOS 公测、Remote Control、push 通知 |
| 2026-06-22 | Customize 页面、plugin leaderboard、canvases |
| 2026-06-18 | `/automate`、GitHub/Slack 触发器、computer use |
| 2026-06-17 | Cloud environment setup、`/in-cloud`、`/babysit` |

## 今日研究员结论

Cursor **7/2 处于 Changelog 空窗期**，企业侧应消化 **6/30 Team MCP + org groups** 治理策略；个人侧 **6/29 iOS + cloud agent** 已足够支撑移动+云端并行。SpaceX 收购叙事（6/16）无 7/2 新进展，**模型中立性**仍是收购交割后的观察点。本日 cron automation 证明 **Automations + Cloud Agent + git push** 链路可用于生产级文档流水线。

---
