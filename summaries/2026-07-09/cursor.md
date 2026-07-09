# Cursor 每日技术文档 — 2026-07-09

> 本地实测版本：**—**（Cloud Agent 无 GUI）｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 9 日 [Cursor Changelog](https://cursor.com/changelog) **仍无新条目**，最近更新为 **3.10（2026-06-30）** Team MCPs 与 organization groups——连续第 **9** 日空窗。本 DayAI Automation cron（`0 22 * * *` UTC）连续第 **9** 日触发。产品能力仍以 6/17–6/30 批次（Cloud Agents、Automations、iOS、Team MCP）为主。

---

## 特性一：Team MCPs 与 Organization Groups（3.10，6/30 仍最新）

### 是什么（机制说明）

Cursor 3.10 扩展 Team Marketplaces：管理员可一次性配置 **Team MCP servers**，分发至 cloud agents、Agents Window、IDE 与 CLI。Dashboard → Integrations & MCP 设置后，成员可从 team marketplace 一键安装已批准集成，无需自行配置 MCP 服务器。

同时支持 **organization groups** 限制 marketplace 访问（除 SCIM directory groups 外）。已有 SCIM 配置的 marketplace 保持不变。

### 适用场景

- **适合**：企业统一 MCP 策略、减少开发者手动配置成本
- **不适合**：个人开发者无 Team 计划

### 前置条件

- Cursor Teams 或 Enterprise 计划
- 管理员 Dashboard 权限
- MCP 服务器已部署或选用官方集成

### 详细使用步骤（业务用户）

1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. Integrations & MCP → 配置 Team MCP servers
3. Plugins → Team Marketplaces → 发布至团队
4. 可选：限制访问至特定 organization groups
5. 成员端：Customize 页面 → Team Marketplace → 一键安装

### 命令与配置示例

```json
// .cursor/mcp.json 团队分发后成员本地示例（概念性）
{
  "mcpServers": {
    "team-approved-server": {
      "url": "https://mcp.example.com/sse",
      "type": "http"
    }
  }
}
```

```bash
# CLI 侧（若团队启用 CLI MCP）
cursor --help | grep -i mcp
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.10 | ✅ 6/30 发布，7/9 无更新 |
| Dashboard Team MCP | ⚠️ 未实测（Cloud Agent 无 GUI） |
| marketplace 安装 | ⚠️ 未实测 |

### 问题与解决方案

**成员看不到 marketplace**：确认管理员已发布且 organization group 包含该成员。**MCP auth 失败**：Automations 3.8 支持 incomplete state 保存，可先配置 auth 再继续。**迁移旧 Team MCP**：查阅 [官方迁移文档](https://cursor.com/docs)。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 3.10 | ✅ |
| Cursor Docs MCP | ✅ |
| 虎嗅 Agent Control Plane 叙事 | ✅ 趋势一致，无 7/9 产品更新 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 7/9 空窗期可用于完善 Team MCP 配置 |
| 开发者 | 从 marketplace 安装而非手动写 mcp.json |
| 安全团队 | 用 organization groups 限制范围 |

---

## 特性二：Cursor Automations Cron（3.8+，本任务第 9 日）

### 是什么（机制说明）

Cursor Automations 是 always-on agent 系统。本 DayAI 任务配置为 cron `0 22 * * *`（UTC），每日 22:02 触发 Cloud Agent 执行资讯检索、7 文件生成、`build-index.js`、push main。3.8 引入 `/automate` skill、computer use、GitHub 五类新触发器、默认开启 PR。

7/9 为连续第 **9** 日 cron 触发（7/1–7/9），Changelog 空窗不影响 Automation 运行。

### 适用场景

- **适合**：每日重复文档/CI 巡检任务
- **不适合**：需实时人工交互的创意工作

### 前置条件

- Cursor 付费计划
- GitHub 仓库连接（czh55/DayAI）
- Automation Instructions + cron 触发器

### 详细使用步骤（业务用户）

1. Cursor → Automations → 编辑本任务
2. 确认 cron schedule 与 Instructions
3. 启用 `open_git_pr` MCP（若需自动开 PR）
4. 监控每次运行的 commit 与 `index.json` 更新

### 命令与配置示例

```yaml
# 本任务触发配置
trigger:
  type: cron
  schedule: "0 22 * * *"
  triggeredAt: "2026-07-09T22:02:15Z"
```

```bash
cd /workspace
node tools/build-index.js
git add summaries/2026-07-09/ index.json
git commit -m "docs: add daily summary 2026-07-09"
git push origin main
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 Automation 触发 | ✅ 2026-07-09T22:02:15Z |
| cron 连续运行 | ✅ 第 9 日（7/1–7/9） |
| cloud agent 环境 | ✅ `/workspace` 可写 |

### 问题与解决方案

**build-index 跳过当日**：检查 README 6 板块表格。**push 冲突**：`git pull --rebase origin main`。**Changelog 空窗**：以最近 3.10 文档为准，非 Automation 故障。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 Automations | ✅ |
| 本任务 7/9 运行 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DayAI 维护者 | 继续 cron，空窗期文档引用最近 Changelog |
| 其他团队 | 参考 Instructions 模板自建 Automation |

---

## 特性三：Cloud Agents 与 Environment Setup（3.7+）

### 是什么（机制说明）

Cloud agents 在隔离 VM 运行完整开发环境。3.7 引入 cloud environment setup（<10 分钟）、可复用 snapshot、`.cursor/environment.json`。3.9 扩展 iOS Remote Control、Live Activities、push 通知。虎嗅引用 Cursor 数据：企业云端 Agent 使用率从 15–20% 升至 **75%**。

### 适用场景

- **适合**：长时任务、并行 agent、笔记本关闭后继续
- **不适合**：需本地 GPU 的任务

### 前置条件

- Cursor Pro+ 或 Team
- GitHub 仓库连接
- 可选 `.cursor/environment.json`

### 详细使用步骤（业务用户）

1. Agents Window → 选 repo → 选 Cloud
2. 首次：agent setup 环境并生成 snapshot
3. 提交 `environment.json` 加速后续启动
4. `/in-cloud` 派发子 agent；`/babysit` 看护 PR
5. local ↔ cloud handoff 测试变更

### 命令与配置示例

```json
// .cursor/environment.json
{
  "snapshot": "dayai-daily",
  "install": "cd tools && npm install",
  "start": "node tools/build-index.js"
}
```

```bash
/in-cloud Investigate flaky CI on branch feature-x
/babysit Prepare PR for merge
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本任务 cloud VM | ✅ 运行中 |
| environment.json | ⚠️ 本仓库未提交专用配置 |
| iOS Remote Control | ⚠️ 未实测 |

### 问题与解决方案

**setup 超时**：精简 install 脚本。**snapshot 过期**：重新 setup。**handoff 丢上下文**：完整 session 迁移。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7/3.9 | ✅ |
| 虎嗅 75% 企业 cloud agent | ✅ 趋势一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 本 Automation | 已用 cloud agent，可提交 environment.json 加速 |
| 团队 | 统一 snapshot 配置 |
| 移动用户 | iOS + Remote Control |

---

## 特性四：Composer 与 Bugbot（持续有效，7/9 无版本公告）

### 是什么（机制说明）

**Composer** 为 Cursor 核心编码模型（公开信息指向 Composer 2.5）。**Bugbot** 自动审查 PR；Agent 会话中 `/review` 触发代码审查。7/9 Changelog 无 Composer 版本更新。36氪等媒体报道 Cursor 3.0 Agent 模式底层集成 Claude Code SDK 争议（4 月稿），与当前 3.10 产品线并存。

### 适用场景

- **适合**：日常编码、多文件 agent 编辑、PR 审查
- **不适合**：需 Fable 5 级推理——须切换模型

### 前置条件

- Cursor IDE
- GitHub 集成（Bugbot）

### 详细使用步骤（业务用户）

1. IDE 编码，Composer 自动补全
2. Agent 模式描述任务
3. PR 后 Bugbot 自动审查（若启用）
4. `/review` 即时审查

### 命令与配置示例

```bash
/review

# Settings → Models → Composer 2.5
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer IDE | ⚠️ 未实测（无 GUI） |
| Bugbot | ⚠️ 未实测 |
| Changelog Composer 更新 | ❌ 7/9 无 |

### 问题与解决方案

**模型不可用**：检查计划与模型选择器。**Bugbot 未触发**：确认 GitHub App 权限。**套壳争议**：关注 Anthropic 第三方访问政策变化。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 36氪 Cursor 套壳报道 | ⚠️ 社区逆向，非官方确认 |
| Changelog 无 7/9 更新 | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 日常开发者 | Composer 仍为主力 |
| 合规敏感 | 关注 Claude SDK 依赖与国内禁令 |
| 审查流程 | 启用 Bugbot + `/review` |

---

## 特性五：`.cursor/permissions.json` 与 SDK Custom Tools（文档能力）

### 是什么（机制说明）

Cursor 支持 `.cursor/permissions.json` 细粒度控制 agent 工具权限（读/写/终端/MCP）。SDK custom tools 允许扩展 agent 工具集。7/9 无相关 Changelog 更新，但为企业治理 Automations 与 Cloud Agent 的基础配置。

### 适用场景

- **适合**：企业限制 agent 写操作、Automation 最小权限
- **不适合**：个人快速原型（可能过度限制）

### 前置条件

- Cursor 0.4x+（permissions.json 支持）
- 仓库根目录或 `.cursor/` 路径

### 详细使用步骤（业务用户）

1. 创建 `.cursor/permissions.json`
2. 定义 allow/deny 规则（文件路径、命令、MCP）
3. Cloud Agent / Automation 自动读取
4. 结合 Team MCP marketplace 统一策略

### 命令与配置示例

```json
// .cursor/permissions.json 示例
{
  "allow": [
    "read summaries/**",
    "write summaries/**",
    "run node tools/build-index.js",
    "run git *"
  ],
  "deny": [
    "write index.html",
    "write tools/build-index.js"
  ]
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| permissions.json | ⚠️ 本仓库未配置专用文件 |
| Automation 遵守禁止事项 | ✅ Instructions 禁止改 build-index.js |

### 问题与解决方案

**agent 被拒绝写文件**：检查 permissions allow 列表。**与 Team MCP 冲突**：管理员策略优先。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Docs permissions | ✅ |
| 7/9 Changelog | ❌ 无更新 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| DayAI 仓库 | 可添加 permissions.json 限制 Automation 范围 |
| 企业 | 统一 permissions + Team MCP |

---

## 版本对照表

| 版本 | 日期 | 关键变更 |
|------|------|----------|
| 3.10 | 6/30 | Team MCPs、organization groups |
| 3.9 | 6/29 | Cursor iOS、Remote Control |
| 3.8 | 6/18 | Automations、/automate、computer use |
| 3.7 | 6/17 | Cloud environment setup、/in-cloud |

## 今日研究员结论

Cursor 7/9 连续第 9 日 Changelog 空窗，不代表产品停滞——Automations、Cloud Agent、Team MCP 仍为核心能力。国内语境下须关注 Cursor Agent 与 Claude Code SDK 依赖及阿里/工信部合规连锁反应。建议团队利用空窗期完善 Team MCP 与 `environment.json`，并监控 7 月中下旬是否恢复 Changelog 节奏。

---
