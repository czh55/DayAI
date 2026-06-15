# Cursor 每日技术文档 — 2026-06-15

> 本地实测版本：**—（Cloud Agent 无 GUI）**｜监测源：[Cursor Changelog](https://cursor.com/changelog)、[Cursor Docs](https://cursor.com/docs)

## 今日综述

**2026 年 6 月 15 日 Cursor 官方 Changelog 无新条目**。最新发布仍为 **2026 年 6 月 10 日** 的 Bugbot 重大更新：Composer 2.5 驱动下审查提速至约 **90 秒**（原 ~5 分钟），成本降约 22%，bug 检出率升 10%。同日发布的 **`/review` 预推送审查** 与 **PR 增量审查** 配置仍是当前最值得开发者关注的能力。本环境 ⚠️ 无法实测桌面 GUI，以下基于官方文档与 6/10 Changelog。

---

## 特性一：Bugbot 3 倍提速（Composer 2.5 驱动）（2026-06-10）

### 是什么（机制说明）

Bugbot 是 Cursor 的 AI 代码审查 Agent，集成于 GitHub/GitLab PR 流程与本地 IDE。6 月 10 日更新后，Bugbot 由 **Composer 2.5** 模型驱动，平均审查时间从 ~5 分钟降至 **~90 秒**，每次审查平均发现 bug 数从 0.56 升至 0.62（+10%），单次运行成本降约 22%。

Bugbot 尊重组织的 **model block lists**，速度与性能因配置而异。

### 适用场景

- **适合**：PR 合并前自动化审查、安全漏洞初筛、团队 code review 减负
- **不适合**：需要深度架构评审的场景；无 Git 集成的纯本地项目

### 前置条件

- Cursor **3.7+** 或 [cursor.com/agents](https://cursor.com/agents)
- Bugbot 已在 GitHub/GitLab 仓库启用
- CLI 支持「coming soon」（截至 6/15 仍以 IDE/Cloud 为主）

### 详细使用步骤（业务用户）

1. 打开 Cursor → **Settings** → **Bugbot** → 连接 GitHub/GitLab
2. 在目标仓库启用 Bugbot
3. 创建 PR 后 Bugbot 自动运行（或手动触发）
4. 查看 PR 评论中的审查结果
5. 可选：Settings → Bugbot → 配置「仅审查自上次 review 以来的新变更」

### 命令与配置示例

**Cloud Agent 触发（cursor.com/agents）**

```
在 PR #123 上运行 Bugbot 审查
```

**`.cursor/permissions.json` 示例（Agent 权限）**

```json
{
  "permissions": {
    "bugbot": {
      "autoRun": true,
      "models": ["composer-2.5"]
    }
  }
}
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Bugbot GUI 实测 | ⚠️ 未实测（Cloud Agent 无 Cursor 桌面） |
| Changelog 数据 | ✅ 官方确认 90 秒/次 |

### 问题与解决方案

**Bugbot 未在 PR 触发**

排查：确认 Cursor GitHub App 已安装且有 repo 权限；检查 model block list 是否阻止 Composer 2.5。

**审查结果与本地 `/review` 重复**

排查：6/10 更新后 Bugbot 会识别已 `/review` 的 diff 并跳过；见特性二。

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| [Cursor Changelog 6/10](https://cursor.com/changelog) | 官方 |
| [量子位 Composer 2.5 报道](https://www.qbitai.com/2026/05/419990.html) | 部分一致：强调 Colossus 2 训练背景 |

### 利弊分析 + 分角色建议

| 角色 | 建议 |
|------|------|
| 个人 | 在 side project 启用 Bugbot 体验 90 秒审查 |
| Tech Lead | 配置增量审查减少重复 feedback |
| 企业 | 评估 Bugbot 与现有 SAST 工具的分工 |

---

## 特性二：`/review` 预推送本地审查（2026-06-10）

### 是什么（机制说明）

开发者可在 **push 前** 于 Cursor 中运行 `/review`，选择 Bugbot 和/或 Security Review Agent。若随后用**相同 diff** 开 PR，Bugbot 识别已审查内容并跳过，在 PR 留 comment 说明。

快捷命令：`/review-bugbot`、`/review-security`。

### 适用场景

- **适合**：希望 push 前消灭低级 bug 的开发者；减少 PR review cycle
- **不适合**：需要审查完整 git history 的场景

### 前置条件

- Cursor 3.7+
- Bugbot 已配置

### 详细使用步骤

1. 在 Cursor 编辑器中完成代码修改
2. 打开 Agent 输入框，输入 `/review`
3. 选择要运行的 Agent（Bugbot / Security Review）
4. 查看 inline 审查结果并修复
5. Push 并开 PR — Bugbot 应识别已审查 diff

### 命令与配置示例

```
/review
/review-bugbot
/review-security
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| `/review` | ⚠️ 未实测 GUI |

### 问题与解决方案

**`/review` 与 PR Bugbot 仍重复审查**

排查：确认 push 的 diff 与 `/review` 时完全一致；检查 Bugbot sync 是否启用。

---

## 特性三：PR 增量审查配置（2026-06-10）

### 是什么（机制说明）

Bugbot 可配置为**仅审查 PR 中自上次 review 以来的新 commit**，避免对已批准代码重复 comment，聚焦最新变更。

### 详细使用步骤

1. Cursor → Settings → Bugbot
2. 启用 **「Only review what's new since last review」**
3. 在 PR 更新后 Bugbot 仅扫描 delta

### 官方 vs 社区交叉验证

| 来源 | 一致性 |
|------|--------|
| Cursor Changelog | 官方 |
| Cursor Docs | 需查阅 Bugbot 配置章节 |

---

## 特性四：Composer 2.5 与 Cloud Agent（维护更新）

### 是什么（机制说明）

Composer 2.5 是 Cursor 自研 Agent 模型，85% 训练算力用于 RL 后训练（量子位报道）。支持并行 Agent、Cloud Agent（独立 VM）、Slack/GitHub 集成。Bugbot 6/10 更新将其作为审查后端。

### 适用场景

- **适合**：多文件重构、IDE 内 Agent 工作流
- **不适合**：纯终端/headless 场景（Claude Code/Codex CLI 更合适）

### 前置条件

- Cursor Pro/Teams 订阅
- 网络访问 Cursor Cloud Agent 服务

### 详细使用步骤

1. Cursor → 打开 Composer（Cmd+I / Ctrl+I）
2. 选择 **Composer 2.5** 模型
3. 描述多文件任务
4. 可选：启用 Cloud Agent 在远程 VM 执行

### 命令与配置示例

**SDK custom tools（Cursor Agent SDK）**

```typescript
import { CursorAgent } from "@cursor/agent-sdk";

const agent = new CursorAgent({
  model: "composer-2.5",
  tools: [myCustomTool],
});
```

### 本地测试结果

| 项 | 结果 |
|----|------|
| Composer 2.5 | ⚠️ 未实测 |
| Cloud Agent | ⚠️ 本环境为 Cursor Cloud Agent 但无桌面 IDE |

---

## 特性五：`.cursor/permissions.json` Agent 权限（维护更新）

### 是什么（机制说明）

`.cursor/permissions.json` 定义 Agent 可执行的操作边界（文件读写、终端命令、MCP 工具等），是企业/团队治理 Cursor Agent 的核心配置文件。

### 命令与配置示例

```json
{
  "permissions": {
    "allow": ["Read", "Edit(src/**)"],
    "deny": ["Shell(rm -rf *)", "Read(.env)"],
    "ask": ["Shell(git push *)"]
  }
}
```

### 问题与解决方案

**Agent 越权执行命令**

排查：检查 `.cursor/permissions.json` 是否提交到 repo；参考 Claude Code deny rules 设计最小权限。

---

## 版本对照表

| 日期 | 变更 |
|------|------|
| 2026-06-10 | Bugbot 3x 提速、`/review`、PR 增量审查 |
| 2026-05 | Composer 2.5 发布 |
| 2026-03 | Cursor 3.7 Cloud Agent 增强 |

## 今日研究员结论

Cursor 6 月 15 日无 changelog 更新，但 6/10 Bugbot 提速对日常 PR 流程影响显著。建议团队：**push 前跑 `/review` → PR 开 Bugbot 增量审查**，形成双层防线。Fable 5 停服后 Cursor 的 model-agnostic 优势凸显——可在 Composer 中切换 Opus 4.8/GPT-5.5 等 frontier 模型而不绑定单一 vendor。
