# Cursor 每日技术文档 — 2026-07-07

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 7 月 7 日 Cursor 官方 Changelog **仍无 6/30 之后新条目**（连续第 **7** 日空窗）。最新版本 **3.10（2026-06-30）** 聚焦 **Team MCPs in team marketplaces** 与 **organization groups** 访问控制。本仓库 Automations cron（`0 22 * * *` UTC）今日第 7 次连续触发 DayAI 日更——本身即为 Cursor Automations 生产用例。桌面功能以官方 changelog + 操作 SOP 代替实测，标注 ⚠️ 未实测。

---

## 特性一：Team MCPs in Team Marketplaces（3.10，6/30）

### 是什么（机制说明）

Cursor 3.10 允许管理员在 Dashboard → Integrations & MCP 配置 **Team MCP servers** 一次，分发至 **cloud agents、agents window、IDE、CLI**。团队成员可从 team marketplace 一键安装已批准集成，无需自行配置 server。同时支持 **organization groups**（除 SCIM directory groups 外）限制 marketplace 访问（Dashboard → Plugins → Team Marketplaces）。

### 适用场景

- **适合**：企业统一 MCP 策略、合规审批集成、降低成员配置门槛
- **不适合**：纯个人开发者无 Team 席位

### 前置条件

- Cursor Teams 或 Enterprise 计划
- 管理员 Dashboard 权限
- 已有或计划部署的 MCP server（HTTP/stdio）

### 详细使用步骤（业务用户）

**管理员：**
1. 登录 [Cursor Dashboard](https://cursor.com/dashboard)
2. Integrations & MCP → 配置 Team MCP server（URL/命令/认证）
3. Plugins → Team Marketplaces → 发布到组织
4. 可选：限制至特定 organization group

**成员：**
1. Cursor IDE → Settings → MCP 或 Customize 页
2. Team Marketplace → 浏览已批准 MCP → 一键安装
3. 在 Agent 会话中验证 MCP 工具可用

### 命令与配置示例

```json
// .cursor/mcp.json 示例（成员本地安装后生成）
{
  "mcpServers": {
    "team-jira": {
      "url": "https://mcp.corp.example.com/jira"
    }
  }
}
```

```bash
# CLI（若团队启用）
cursor agent --mcp-list
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 3.10 内容 | ✅ 与官网一致 |
| Team MCP 安装 | ⚠️ 未实测（Cloud Agent 无 GUI） |
| organization groups | ⚠️ 未实测 |

### 问题与解决方案

**成员看不到 marketplace**：确认管理员已发布且 group 权限包含该成员。**MCP 连接失败**：检查企业网络与 OAuth 配置；参考 [Migrating Team MCPs 文档](https://cursor.com/docs)。

**与 Claude Code Team MCP 差异**：Cursor 侧重 IDE/Cloud Agent 分发；Claude Code 侧重 `claude mcp` CLI——企业可双轨治理。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| cursor.com/changelog 3.10 | ✅ |
| Claude Code 2.1.203 MCP type 提示 | ✅ 生态互补 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 企业管理员 | 本周完成 Team MCP 清单与 group 策略 |
| 个人开发者 | 继续自建 `.cursor/mcp.json` |
| 安全团队 | 审计 marketplace 批准流程 |

---

## 特性二：Cursor Automations Cron 连续触发（本仓库用例）

### 是什么（机制说明）

Cursor Automations（3.8 引入 `/automate`、cron/GitHub/Slack 触发、computer use）允许 always-on agent 按日程执行 Instructions。本 DayAI 仓库 automation id `61ca50c1-f6ab-461f-b46a-1101418993d0` 配置 **`0 22 * * *` UTC**（北京时间次日 06:00），每日生成 `summaries/YYYY-MM-DD/` 并 push 更新 GitHub Pages。

### 适用场景

- **适合**：重复性文档/报告、定时巡检、日更数据流水线
- **不适合**：需实时人工判断的一次性任务

### 前置条件

- Cursor 付费计划 + Automations 功能
- GitHub 仓库连接与 push 权限
- 完整 Instructions 模板（见仓库根目录 prompt）

### 详细使用步骤（业务用户）

1. Cursor → Automations → New Automation
2. Trigger：Cron `0 22 * * *`（或所需时区换算）
3. Instructions：粘贴 DayAI prompt 全文
4. Tools：启用 `open_git_pr`、shell、web 等
5. 保存并观察首次运行日志

### 命令与配置示例

```bash
# 本地模拟日更后半段
node tools/build-index.js
node tools/build-index.js --check  # 可选；generated_at 每次不同可能失败
git add summaries/ index.json && git commit -m "docs: add daily summary YYYY-MM-DD"
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 run 触发时间 | ✅ 2026-07-07T22:02:52Z |
| Cloud Agent 环境 | ✅ 可执行 CLI 与 git |
| GUI Automations 配置 | ⚠️ 未实测 |

### 问题与解决方案

**build-index 跳过当日**：检查 README「今日一句话结论」6 板块名。**push 失败**：`git pull --rebase origin main` 后重试。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 Automations | ✅ |
| 本仓库连续 7 日运行 | ✅ 生产验证 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 内容运营 | 参考 cron + Instructions 模板 |
| 工程师 | 拆分「检索」「写入」「发布」步骤便于 debug |
| 成本敏感者 | 控制 Instructions 长度与 web 调用次数 |

---

## 特性三：Cloud Agents 与 `/in-cloud` 子代理（3.7 回顾，仍生效）

### 是什么（机制说明）

3.7 引入 **Cloud environment setup**（`.cursor/environment.json` 快照）、**`/in-cloud`** 独立 VM 子代理、**`/babysit`** PR 看护、本地↔云端 handoff。6/30 后无新 changelog，但机制仍为 Cloud Agent 核心能力。本 run 即在 Cloud Agent VM 中执行。

### 适用场景

- **适合**：长时 CI 修复、并行探索、笔记本合盖后继续
- **不适合**：需本地 GPU/特殊硬件的任务

### 前置条件

- Cursor 付费计划
- 仓库含 `.cursor/environment.json`（可选，加速启动）
- GitHub 连接

### 详细使用步骤（业务用户）

1. Agents Window → 选择仓库 → Launch Cloud Agent
2. 长任务中用 `/in-cloud` .spawn 子 VM 处理并行 work
3. PR 准备阶段：`/babysit` 让 cloud agent 远程迭代
4. 需要本地验证时：handoff 回本地会话

### 命令与配置示例

```json
// .cursor/environment.json 示例
{
  "snapshot": "node-20-tools",
  "install": "npm install --prefix tools",
  "terminals": []
}
```

```
/in-cloud Fix failing CI on branch cursor/dayai-5d85
/babysit
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本 Cloud Agent run | ✅ 正常执行检索与文件写入 |
| `/in-cloud` 子 VM | ⚠️ 未单独触发 |
| environment.json | ⚠️ 以仓库现有配置为准 |

### 问题与解决方案

**Cloud Agent 启动慢**：提交 `environment.json` 快照。**子 agent 分支冲突**：使用独立 branch 命名规范。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.7 | ✅ |
| Claude Code background agents | ✅ 竞品对标 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人开发者 | 长任务 offload 到 cloud |
| 团队 | 统一 environment.json |
| 安全 | 审查 cloud VM 网络 egress |

---

## 特性四：Cursor for iOS 公测（3.9，6/29 回顾）

### 是什么（机制说明）

3.9 发布 Cursor for iOS 公测（全付费计划）：移动端启动 cloud agents、语音输入、slash 命令、Live Activities、push 通知、Artifacts/SCM 审查与合并 PR。**Remote Control** 可遥控本地正在运行的 agent。

### 适用场景

- **适合**：通勤中审批 agent、查看 demo/截图、紧急 follow-up
- **不适合**：大量代码编辑（仍建议桌面 IDE）

### 前置条件

- iOS 设备 + Cursor 付费账户
- App Store 下载 Cursor for iOS
- Teams/Enterprise 可能需管理员启用 Remote Control

### 详细使用步骤（业务用户）

1. App Store 安装 Cursor for iOS
2. 登录同一账户 → 选择 repo → Launch Agent
3. 本地桌面 agent 运行时：Agents Window → Remote Control → 手机继续指挥
4. 开启 push 通知获取完成/需输入提醒

### 命令与配置示例

```
# 移动端可用 slash 命令示例
/review
/model
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| iOS app | ⚠️ 未实测（Cloud Agent 无 iOS） |
| Changelog 3.9 | ✅ |

### 问题与解决方案

**Remote Control 不可用**：Teams 需管理员在 Dashboard 启用。**通知未达**：检查 iOS 通知权限。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.9 | ✅ |
| Claude Code RC 2.1.203 修复 | ✅ 移动生态竞争 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 移动办公者 | 试用 iOS + RC 组合 |
| 企业 | 评估 MDM 与 Remote Control 策略 |

---

## 特性五：Changelog 空窗第 7 日——监测与应对

### 是什么（机制说明）

自 2026-06-30 3.10 发布后至 2026-07-07，官网 Changelog 无新日期条目。历史空窗后曾集中发布 Automations（3.8）、iOS（3.9）、Team MCP（3.10）。⚠️ 推测：下一批更新可能含 Composer 版本 bump 或 Bugbot 增强——**非官方确认**。

### 适用场景

- **适合**：依赖 Changelog 跟踪版本的团队建立备用监测（npm、论坛、X）
- **不适合**：因空窗而停用 Cursor——3.10 特性仍有效

### 前置条件

- 订阅 Cursor 更新通知或关注 [changelog RSS](https://cursor.com/changelog)

### 详细使用步骤（业务用户）

1. 每周一次检查 cursor.com/changelog
2. IDE 内 Help → About 核对客户端版本
3. 关注 Composer 模型下拉是否有新版本

### 命令与配置示例

```bash
# 监测用（无官方 CLI version 时以 IDE 为准）
curl -sL https://cursor.com/changelog | head -50
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 7/7 changelog 检查 | ✅ 仍止于 6/30 |
| IDE 版本 | ⚠️ Cloud Agent 无桌面 IDE |

### 问题与解决方案

**误以为停更**：3.10 仍为最新公开版本。**功能异常**：与空窗无必然联系，查论坛/status。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| 官网 changelog | ✅ 6/30 最后 |
| 社区 Composer 2.5 讨论 | ⚠️ 非 changelog 确认 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 早期采用者 | 保持自动更新，关注博客 |
| 企业 | 空窗期不阻断 3.10 Team MCP 落地 |
| DayAI 研究员 | 继续每日轮询 changelog |

---

## 版本对照表

| 版本 | 日期 | 要点 |
|------|------|------|
| 3.10 | 2026-06-30 | Team MCPs marketplace；organization groups |
| 3.9 | 2026-06-29 | iOS 公测；Remote Control；push 通知 |
| 3.8 | 2026-06-18 | Automations `/automate`；GitHub/Slack 触发；computer use |
| 3.7 | 2026-06-17 | Cloud env setup；`/in-cloud`；handoff |

## 今日研究员结论

Cursor 今日无版本新闻，但 **Team MCP marketplace（3.10）** 与 **Automations cron** 仍是企业场景最可落地能力。建议国内团队关注 **阿里禁 Claude** 背景下 Cursor 作为独立 IDE 的合规地位——Cursor 自研 Composer 与国产模型接入或成差异化路径。下一 changelog 发布前，以 3.10 文档为准规划 MCP 治理。

---
