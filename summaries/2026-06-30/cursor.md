# Cursor 每日技术文档 — 2026-06-30

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

2026 年 6 月 30 日检索 Cursor Changelog **无新条目**；最近发布为 **6 月 29 日 3.9：Cursor for iOS 公测**。付费用户可从 iPhone 启动 Cloud Agent、Remote Control 桌面会话、接收 Live Activities 推送、审阅 Artifacts 并合并 PR。本仓库运行于 **Cursor Cloud Agent** 环境，**无法 GUI 实测**桌面或 iOS 功能，以下以官方 Changelog + Docs 为准，标注 ⚠️ 未实测。

---

## 特性一：Cursor for iOS 公测 — 移动端 Cloud Agent（2026-06-29 发布）

### 是什么（机制说明）

**Cursor for iOS** 于 2026-06-29 进入 **public beta**，面向 **全部付费计划**（Pro 及以上）。用户可在手机选择仓库、启动与桌面一致的 **Cloud Agent**，选择 frontier 模型、使用 **语音输入** 与 **slash commands**。Cloud Agent 运行在隔离 VM 中，可测试、验证并 demo 工作；支持将本地会话 **offload 到 cloud** 以便合盖继续运行。

### 适用场景

- **适合**：通勤中指挥 Agent、合盖长任务、审阅 PR/截图/日志
- **不适合**：需大屏 IDE 精细编辑的场景（应用内偏指挥与审阅）

### 前置条件

- Cursor **付费订阅**（Pro/Team/Enterprise）
- iOS 设备 + TestFlight/App Store 下载 Cursor for iOS（见官方公告）
- 已配置 Cloud Agent 权限的仓库

### 详细使用步骤（业务用户）

1. 在 iPhone 安装 **Cursor for iOS**（官方下载链接见 Changelog 底部）
2. 登录与桌面相同的 Cursor 账户
3. **Open the Cursor mobile app** → 选择 repo → 描述任务 → 启动 Agent
4. 使用语音或文字输入；可用 `/review` 等 slash commands
5. 通过 **Live Activities** 在锁屏查看进度；完成后 push 通知
6. 在 **Artifacts and SCM** 区审阅 demo、diff，留 follow-up 或 **直接 merge PR**

### 命令与配置示例

```text
# iOS Agent 会话内（与桌面 slash commands 类似）
/review
/review-bugbot
/in-cloud
```

```json
// .cursor/environment.json（团队 cloud 环境快照，提交后全员受益）
{
  "snapshot": "nodejs-20",
  "install": "npm ci"
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/29 条目 | ✅ 官方确认 iOS 公测 |
| iOS App 实测 | ⚠️ 未实测（Cloud Agent 无 iOS GUI） |
| Cloud Agent 本环境 | ✅ 当前自动化即 Cloud Agent 实例 |

### 问题与解决方案

**找不到 iOS 应用**：确认付费计划；查看 [Cursor Changelog](https://cursor.com/changelog) 下载链接。**Agent 无法启动**：检查 repo 权限与 Cloud 配额。**通知未达**：系统设置中允许 Cursor 通知与 Live Activities。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog 6/29 | ✅ 官方 |
| Cursor Docs | ✅ Cloud agents on mobile 描述一致 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 独立开发者 | 通勤时审阅 Agent 产出 |
| 团队 Lead | 移动端 merge PR 需配合 branch protection |
| 企业管理员 | Teams/Enterprise 须单独启用 Remote Control |

---

## 特性二：Remote Control — 手机接管桌面 Agent（2026-06-29）

### 是什么（机制说明）

**Remote Control** 允许在 **Agents Window** 中将 **本机正在运行的 Agent** 交接到手机继续指挥。可开启 **keep computer awake** 设置，离开工位时机器保持可达。**Teams/Enterprise** 需管理员在 **Cursor Dashboard** 启用。

### 适用场景

- **适合**：桌面启动长任务后外出、需要随时 inject 指令
- **不适合**：无稳定网络或无法保持桌面在线的环境

### 前置条件

- Cursor 3.9+（6/29 changelog）
- 桌面 Cursor 与 iOS 同账户
- Teams/Enterprise：Dashboard → Remote Control 已启用

### 详细使用步骤（业务用户）

1. 桌面 **Agents Window** 启动本地 Agent
2. 点击 **Remote Control**（或 Changelog 描述之入口）
3. iOS 端连接同一会话，继续发指令
4. **Settings** 中可选 **keep computer awake**
5. 企业用户：管理员登录 **cursor.com/dashboard** 启用策略

### 命令与配置示例

```text
# 桌面 Agents Window
Remote Control → Connect from mobile
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog | ✅ Remote Control 描述 |
| 桌面+iOS 联机 | ⚠️ 未实测 |

### 问题与解决方案

**企业无法使用**：联系管理员开启 Dashboard Remote Control。**桌面休眠断连**：启用 keep awake 或调整电源策略。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog + Docs | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 现场工程师 | 部署后手机监控 CI fix Agent |
| 安全团队 | 评估 Remote Control 数据暴露面 |
| 管理员 | 默认关闭再按需开放 |

---

## 特性三：Live Activities 与 Push Notifications（2026-06-29）

### 是什么（机制说明）

iOS **Live Activities** 在锁屏显示 Agent 状态；**push notifications** 在 Agent 完成、需输入或待 review 时提醒用户。

### 适用场景

- **适合**：长时 Cloud Agent、异步等待人工输入
- **不适合**：禁用通知的合规环境

### 前置条件

- Cursor iOS + 系统通知权限

### 详细使用步骤（业务用户）

1. 首次打开 iOS App 时允许通知
2. 启动 Cloud Agent 后锁屏查看 Live Activity
3. 收到 push 后打开 App 处理 input/review

### 命令与配置示例

```text
# 无 CLI；纯 App 设置
iOS Settings → Cursor → Notifications → Allow
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 官方描述 | ✅ |
| 真机推送 | ⚠️ 未实测 |

### 问题与解决方案

**无推送**：检查 Focus 模式与 App 通知权限。**Live Activity 不显示**：确认 iOS 版本支持 Live Activities。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog | ✅ |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 异步工作流用户 | 与 `/babysit` cloud subagent 搭配 |
| 合规环境 | 评估通知内容是否含代码片段 |

---

## 特性四：Bugbot `/review` 与 Composer 2.5（2026-06 持续有效）

### 是什么（机制说明）

虽非 6/30 新发布，仍是 Cursor 编程工作流核心：**Bugbot** 由 **Composer 2.5** 驱动，平均 review ~90s；**`/review`** 可在 push 前运行 Bugbot + Security Review，并与 GitHub/GitLab PR 同步（同 diff 免重复 review）。CLI 支持 coming soon。

### 适用场景

- **适合**：PR 前自检、降低 CI review 成本
- **不适合**：无 Git 集成的纯本地实验

### 前置条件

- Cursor 3.7+
- Bugbot 已连接 GitHub/GitLab

### 详细使用步骤（业务用户）

1. 桌面或 **cursor.com/agents** 打开 Agent
2. 输入 `/review` 选择 Bugbot / Security
3. 或 `/review-bugbot`、`/review-security` 直达
4. Push 后开 PR — Bugbot 识别已 review diff 并 skip

### 命令与配置示例

```text
/review
/review-bugbot
/review-security
```

```json
// Bugbot 配置：仅 review 自上次 review 后的新变更（Docs）
{
  "bugbot": {
    "reviewOnlyNewChanges": true
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Changelog 6/10 Bugbot | ✅ Composer 2.5 驱动 |
| `/review` 实测 | ⚠️ 未实测（无桌面 GUI） |

### 问题与解决方案

**与 GitHub Bugbot 不同步**：确认同一 diff；检查 repo 集成。**review 过慢**：检查 model block list 配置。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog Jun 10 | ✅ ~90s、+10% bugs |
| Docs | ✅ reviewOnlyNewChanges |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 提交者 | push 前 `/review` 养成习惯 |
| Reviewer | 配置 only-new-changes 减噪 |
| 开源维护者 | 等 CLI 支持后接入 CI |

---

## 特性五：Cursor Automations + Cloud Agent（本任务运行环境）

### 是什么（机制说明）

**Cursor Automations**（3.8+）支持 cron/GitHub/Slack 触发 Cloud Agent。本 DayAI 每日任务即 **cron 触发**（`0 22 * * *` UTC）的 Cloud Agent 实例：可读写仓库、执行 shell、调用 MCP（如 `open_git_pr`），但 **无桌面 GUI、无 iOS**。

### 适用场景

- **适合**：定时文档生成、CI 巡检、PR 自动更新
- **不适合**：需本地 IDE 交互的 UI 测试（可用 computer use 部分弥补）

### 前置条件

- Cursor Automations 已配置（Instructions + cron trigger）
- 仓库 `.cursor/` 或 automation 模板

### 详细使用步骤（业务用户）

1. Cursor → **Automations** → Create
2. 触发器选 **Schedule**（如 `0 22 * * *` UTC）
3. Instructions 填入任务 prompt（如本 DayAI 模板）
4. 启用 **computer use** 若需 GUI demo（可选）
5. 保存后等待触发或手动 Run

### 命令与配置示例

```bash
# Cloud Agent 环境内典型发布流（本任务执行）
node tools/build-index.js
git add summaries/2026-06-30/ index.json
git commit -m "docs: add daily summary 2026-06-30"
git push origin main
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| 本自动化运行 | ✅ 正在执行 |
| cron 触发 | ✅ 2026-06-30T22:01:18Z |
| 桌面 Automations UI | ⚠️ 未实测 |

### 问题与解决方案

**Automation 未触发**：检查 cron 时区（UTC）。**push 失败**：`git pull --rebase origin main` 后重试。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Changelog 3.8 Automations | ✅ cron/GitHub/Slack |
| 本仓库实践 | ✅ DayAI 日更 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 文档/运维团队 | cron + Cloud Agent 做日更 |
| 开发团队 | GitHub PR trigger 做 review 自动修复 |
| 安全 | 限制 automation 仓库写权限 |

---

## 版本对照表

| 版本/日期 | 要点 |
|-----------|------|
| **3.9 / 2026-06-29** | **Cursor for iOS 公测**、Remote Control、Live Activities |
| 3.8 / 2026-06-18 | Automations `/automate`、GitHub triggers、computer use |
| 3.7 / 2026-06-17 | Cloud environment setup、`/in-cloud`、`/babysit` |

## 今日研究员结论

6/30 **无 Cursor 桌面端新版本**，行业焦点在 **6/29 iOS 公测** 补齐「移动 + Cloud」闭环，与 Anthropic Sonnet 5 同日发布形成「随处可用 Agent」共振。本环境为 Cloud Agent，已验证 git/shell 流水线；iOS/桌面 GUI 功能请以官方 Changelog 操作 SOP 为准，标注 ⚠️ 未实测。
